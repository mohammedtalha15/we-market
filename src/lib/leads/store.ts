import { DUPLICATE_WINDOW_MS, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from "@/lib/leads/constants";
import { getSupabaseAdmin } from "@/lib/leads/supabase-admin";
import type { LeadEnvConfig } from "@/lib/leads/env";
import type { ValidatedLead } from "@/lib/leads/types";

type RateBucket = { count: number; resetAt: number };

/** In-memory rate limiter — per server instance; complements DB duplicate checks. */
const ipBuckets = new Map<string, RateBucket>();

function pruneExpiredBuckets(now: number) {
  if (ipBuckets.size < 500) return;
  for (const [key, bucket] of ipBuckets) {
    if (bucket.resetAt <= now) ipBuckets.delete(key);
  }
}

export function checkRateLimit(ipHash: string | null): boolean {
  if (!ipHash) return true;

  const now = Date.now();
  pruneExpiredBuckets(now);

  const bucket = ipBuckets.get(ipHash);
  if (!bucket || bucket.resetAt <= now) {
    ipBuckets.set(ipHash, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (bucket.count >= RATE_LIMIT_MAX) return false;
  bucket.count += 1;
  return true;
}

export async function hasRecentDuplicate(
  email: string,
  config: LeadEnvConfig,
): Promise<boolean> {
  const since = new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString();
  const supabase = getSupabaseAdmin(config);

  const { count, error } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("email", email.toLowerCase())
    .gte("created_at", since);

  if (error) {
    console.error("Lead duplicate check failed: database query error");
    return false;
  }

  return (count ?? 0) > 0;
}

export async function insertLead(
  lead: ValidatedLead,
  config: LeadEnvConfig,
): Promise<{ ok: true; id: string } | { ok: false }> {
  const supabase = getSupabaseAdmin(config);

  const { data, error } = await supabase
    .from("leads")
    .insert({
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      industry: lead.industry,
      service: lead.service,
      goal: lead.goal,
      preferred_contact: lead.preferred_contact,
      status: lead.status,
      source: lead.source,
      user_agent: lead.user_agent,
      ip_hash: lead.ip_hash,
    })
    .select("id")
    .single();

  if (error || !data?.id) {
    console.error("Lead submission failed: database insertion error");
    return { ok: false };
  }

  return { ok: true, id: data.id as string };
}
