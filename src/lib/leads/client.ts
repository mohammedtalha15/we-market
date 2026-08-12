import type { LeadFormPayload, LeadFieldErrors } from "@/lib/leads/types";
import { validateLeadPayload } from "@/lib/leads/validation";

export function payloadFromFormData(form: HTMLFormElement): LeadFormPayload {
  const fd = new FormData(form);
  return {
    name: String(fd.get("name") ?? ""),
    company: String(fd.get("company") ?? ""),
    email: String(fd.get("email") ?? ""),
    phone: String(fd.get("phone") ?? ""),
    industry: String(fd.get("industry") ?? ""),
    service: String(fd.get("service") ?? ""),
    goal: String(fd.get("goal") ?? ""),
    preferredContact: String(fd.get("preferredContact") ?? "Email"),
    website: String(fd.get("website") ?? ""),
  };
}

export function validateLeadFormClient(payload: LeadFormPayload): LeadFieldErrors {
  const result = validateLeadPayload(payload);
  return result.ok ? {} : result.errors;
}

export async function submitLead(payload: LeadFormPayload): Promise<
  | { ok: true; message: string }
  | { ok: false; message: string; errors?: LeadFieldErrors; code?: string }
> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return {
      ok: false,
      message:
        "Something went wrong while sending your enquiry. Please try again or contact us directly.",
    };
  }

  const data = body as {
    ok?: boolean;
    message?: string;
    errors?: LeadFieldErrors;
    code?: string;
  };

  if (response.ok && data.ok) {
    return { ok: true, message: data.message ?? "Thanks — your enquiry has been received." };
  }

  return {
    ok: false,
    message:
      data.message ??
      "Something went wrong while sending your enquiry. Please try again or contact us directly.",
    errors: data.errors,
    code: data.code,
  };
}
