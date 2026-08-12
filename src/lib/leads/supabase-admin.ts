import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { LeadEnvConfig } from "@/lib/leads/env";

let adminClient: SupabaseClient | null = null;

/** Server-only Supabase client using the service role key. Never import in client code. */
export function getSupabaseAdmin(config: LeadEnvConfig): SupabaseClient {
  if (!adminClient) {
    adminClient = createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}
