/** Server-only environment configuration for lead capture. */

export type LeadEnvConfig = {
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
  resendApiKey: string;
  resendFromEmail: string;
  leadNotifyEmail: string;
  ipHashSecret: string;
  isDev: boolean;
};

export type LeadEnvCheck =
  | { configured: true; config: LeadEnvConfig }
  | { configured: false; missing: string[]; message: string };

export function checkLeadEnv(): LeadEnvCheck {
  const missing: string[] = [];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL;
  const leadNotifyEmail = process.env.LEAD_NOTIFY_EMAIL ?? "info@wemarket.in";
  const ipHashSecret = process.env.LEAD_IP_HASH_SECRET;

  if (!supabaseUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!supabaseServiceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!resendApiKey) missing.push("RESEND_API_KEY");
  if (!resendFromEmail) missing.push("RESEND_FROM_EMAIL");
  if (!ipHashSecret) missing.push("LEAD_IP_HASH_SECRET");

  if (missing.length > 0) {
    const isDev = process.env.NODE_ENV === "development";
    return {
      configured: false,
      missing,
      message: isDev
        ? `Lead capture is not configured. Missing: ${missing.join(", ")}. See .env.example.`
        : "Lead capture is temporarily unavailable. Please contact us directly.",
    };
  }

  return {
    configured: true,
    config: {
      supabaseUrl: supabaseUrl!,
      supabaseServiceRoleKey: supabaseServiceRoleKey!,
      resendApiKey: resendApiKey!,
      resendFromEmail: resendFromEmail!,
      leadNotifyEmail,
      ipHashSecret: ipHashSecret!,
      isDev: process.env.NODE_ENV === "development",
    },
  };
}
