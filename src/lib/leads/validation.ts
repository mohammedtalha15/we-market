import {
  ALLOWED_INDUSTRY_SLUGS,
  ALLOWED_SERVICE_SLUGS,
  FIELD_LIMITS,
} from "@/lib/leads/constants";
import {
  LEAD_SOURCE,
  PREFERRED_CONTACT_OPTIONS,
  type LeadFieldErrors,
  type LeadFormPayload,
  type LeadValidationResult,
  type PreferredContact,
} from "@/lib/leads/types";

const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitiseText(value: string, max: number): string {
  return value.replace(/\0/g, "").trim().slice(0, max);
}

function isAllowedIndustry(value: string): value is (typeof ALLOWED_INDUSTRY_SLUGS)[number] {
  return (ALLOWED_INDUSTRY_SLUGS as readonly string[]).includes(value);
}

function isAllowedService(value: string): value is (typeof ALLOWED_SERVICE_SLUGS)[number] {
  return (ALLOWED_SERVICE_SLUGS as readonly string[]).includes(value);
}

function parsePreferredContact(value: string | undefined): PreferredContact {
  if (value && (PREFERRED_CONTACT_OPTIONS as readonly string[]).includes(value)) {
    return value as PreferredContact;
  }
  return "Email";
}

/**
 * Validates and sanitises a lead form payload.
 * Shared by client (UX) and server (security).
 */
export function validateLeadPayload(
  raw: LeadFormPayload,
  meta?: { userAgent?: string | null; ipHash?: string | null },
): LeadValidationResult {
  const errors: LeadFieldErrors = {};

  const name = sanitiseText(raw.name ?? "", FIELD_LIMITS.name);
  const email = sanitiseText(raw.email ?? "", FIELD_LIMITS.email).toLowerCase();
  const companyRaw = raw.company ? sanitiseText(raw.company, FIELD_LIMITS.company) : "";
  const phoneRaw = raw.phone ? sanitiseText(raw.phone, FIELD_LIMITS.phone) : "";
  const industry = sanitiseText(raw.industry ?? "", 100);
  const service = sanitiseText(raw.service ?? "", 100);
  const goal = sanitiseText(raw.goal ?? "", FIELD_LIMITS.goal);

  if (!name) errors.name = "Please enter your full name.";
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!industry) {
    errors.industry = "Please select an industry.";
  } else if (!isAllowedIndustry(industry)) {
    errors.industry = "Please select a valid industry.";
  }

  if (!service) {
    errors.service = "Please select a service.";
  } else if (!isAllowedService(service)) {
    errors.service = "Please select a valid service.";
  }

  if (!goal) {
    errors.goal = "Please tell us what you're trying to achieve.";
  } else if (goal.length < 10) {
    errors.goal = "Please share a bit more detail about your goals.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      company: companyRaw || null,
      email,
      phone: phoneRaw || null,
      industry,
      service,
      goal,
      preferred_contact: parsePreferredContact(raw.preferredContact),
      status: "NEW",
      source: LEAD_SOURCE,
      user_agent: meta?.userAgent ?? null,
      ip_hash: meta?.ipHash ?? null,
    },
  };
}

/** Returns true when the honeypot field indicates a bot submission. */
export function isHoneypotTriggered(website: string | undefined): boolean {
  return Boolean(website && website.trim().length > 0);
}
