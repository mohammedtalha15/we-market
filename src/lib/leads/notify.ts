import { Resend } from "resend";
import { industries } from "@/lib/data/industries";
import { pillars } from "@/lib/data/services";
import type { LeadEnvConfig } from "@/lib/leads/env";
import type { ValidatedLead } from "@/lib/leads/types";

function labelForIndustry(slug: string): string {
  if (slug === "other") return "Other";
  return industries.find((i) => i.slug === slug)?.name ?? slug;
}

function labelForService(slug: string): string {
  if (slug === "multiple") return "Multiple / not sure yet";
  const pillar = pillars.find((p) => p.slug === slug);
  return pillar ? `${pillar.name} — ${pillar.category}` : slug;
}

function buildEmailBody(lead: ValidatedLead, leadId: string): string {
  const submitted = new Date().toISOString();

  return [
    "NEW WEBSITE ENQUIRY",
    "",
    `Lead ID: ${leadId}`,
    "",
    `Name: ${lead.name}`,
    `Company: ${lead.company ?? "—"}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone ?? "—"}`,
    `Industry: ${labelForIndustry(lead.industry)}`,
    `Service: ${labelForService(lead.service)}`,
    `Preferred contact: ${lead.preferred_contact}`,
    "",
    "Goal:",
    lead.goal,
    "",
    `Submitted: ${submitted}`,
    `Source: ${lead.source}`,
  ].join("\n");
}

/**
 * Sends a notification email after a lead is stored.
 * Failures are logged server-side; callers should not fail the user response.
 */
export async function sendLeadNotificationEmail(
  lead: ValidatedLead,
  leadId: string,
  config: LeadEnvConfig,
): Promise<void> {
  try {
    const resend = new Resend(config.resendApiKey);

    const { error } = await resend.emails.send({
      from: config.resendFromEmail,
      to: config.leadNotifyEmail,
      replyTo: lead.email,
      subject: `New website enquiry — ${lead.name}`,
      text: buildEmailBody(lead, leadId),
    });

    if (error) {
      console.error("Lead notification email failed: provider error");
    }
  } catch {
    console.error("Lead notification email failed: unexpected error");
  }
}
