/** Shared lead types — safe for client and server. */

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "WON",
  "LOST",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_SOURCE = "website_contact" as const;

export const PREFERRED_CONTACT_OPTIONS = ["Email", "Phone", "WhatsApp"] as const;
export type PreferredContact = (typeof PREFERRED_CONTACT_OPTIONS)[number];

/** Raw payload from the contact form (includes honeypot). */
export type LeadFormPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  industry: string;
  service: string;
  goal: string;
  preferredContact?: string;
  /** Honeypot — must remain empty for legitimate submissions. */
  website?: string;
};

/** Validated, sanitised lead ready for persistence. */
export type ValidatedLead = {
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  industry: string;
  service: string;
  goal: string;
  preferred_contact: PreferredContact;
  status: LeadStatus;
  source: typeof LEAD_SOURCE;
  user_agent: string | null;
  ip_hash: string | null;
};

export type LeadFieldErrors = Partial<
  Record<
    "name" | "email" | "industry" | "service" | "goal" | "phone" | "company" | "preferredContact",
    string
  >
>;

export type LeadValidationResult =
  | { ok: true; data: ValidatedLead }
  | { ok: false; errors: LeadFieldErrors };

export type LeadApiSuccessResponse = {
  ok: true;
  message: string;
};

export type LeadApiErrorResponse = {
  ok: false;
  message: string;
  errors?: LeadFieldErrors;
  code?: "VALIDATION" | "RATE_LIMIT" | "DUPLICATE" | "CONFIG" | "SERVER";
};
