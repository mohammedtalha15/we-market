import { createHash } from "crypto";
import type { LeadEnvConfig } from "@/lib/leads/env";

export function hashIpAddress(ip: string, secret: string): string {
  return createHash("sha256").update(`${secret}:${ip}`).digest("hex");
}

/** Best-effort client IP from proxy headers (server-side only). */
export function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || null;
}

export function getIpHash(request: Request, config: LeadEnvConfig): string | null {
  const ip = getClientIp(request);
  if (!ip) return null;
  return hashIpAddress(ip, config.ipHashSecret);
}

export function getUserAgent(request: Request): string | null {
  const ua = request.headers.get("user-agent");
  return ua ? ua.slice(0, 500) : null;
}
