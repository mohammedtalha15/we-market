import { NextResponse } from "next/server";
import { checkLeadEnv } from "@/lib/leads/env";
import { sendLeadNotificationEmail } from "@/lib/leads/notify";
import { getIpHash, getUserAgent } from "@/lib/leads/request-meta";
import {
  checkRateLimit,
  hasRecentDuplicate,
  insertLead,
} from "@/lib/leads/store";
import type { LeadApiErrorResponse, LeadApiSuccessResponse, LeadFormPayload } from "@/lib/leads/types";
import { isHoneypotTriggered, validateLeadPayload } from "@/lib/leads/validation";

export const runtime = "nodejs";

function jsonResponse<T>(body: T, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const envCheck = checkLeadEnv();
  if (!envCheck.configured) {
    const body: LeadApiErrorResponse = {
      ok: false,
      message: envCheck.message,
      code: "CONFIG",
    };
    return jsonResponse(body, envCheck.message.includes("Missing") ? 503 : 503);
  }

  const config = envCheck.config;

  let payload: LeadFormPayload;
  try {
    payload = (await request.json()) as LeadFormPayload;
  } catch {
    return jsonResponse<LeadApiErrorResponse>(
      { ok: false, message: "Invalid request.", code: "VALIDATION" },
      400,
    );
  }

  // Honeypot — silently accept without persisting.
  if (isHoneypotTriggered(payload.website)) {
    return jsonResponse<LeadApiSuccessResponse>(
      {
        ok: true,
        message: "Thanks — your enquiry has been received.",
      },
      200,
    );
  }

  const ipHash = getIpHash(request, config);
  const userAgent = getUserAgent(request);

  if (!checkRateLimit(ipHash)) {
    return jsonResponse<LeadApiErrorResponse>(
      {
        ok: false,
        message: "Too many submissions. Please try again later or contact us directly.",
        code: "RATE_LIMIT",
      },
      429,
    );
  }

  const validation = validateLeadPayload(payload, { userAgent, ipHash });
  if (!validation.ok) {
    return jsonResponse<LeadApiErrorResponse>(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        errors: validation.errors,
        code: "VALIDATION",
      },
      422,
    );
  }

  const lead = validation.data;

  if (await hasRecentDuplicate(lead.email, config)) {
    return jsonResponse<LeadApiSuccessResponse>(
      {
        ok: true,
        message: "Thanks — your enquiry has been received.",
      },
      200,
    );
  }

  const inserted = await insertLead(lead, config);
  if (!inserted.ok) {
    return jsonResponse<LeadApiErrorResponse>(
      {
        ok: false,
        message:
          "Something went wrong while sending your enquiry. Please try again or contact us directly.",
        code: "SERVER",
      },
      500,
    );
  }

  // Email is best-effort — lead is already stored.
  void sendLeadNotificationEmail(lead, inserted.id, config);

  return jsonResponse<LeadApiSuccessResponse>(
    {
      ok: true,
      message: "Thanks — your enquiry has been received.",
    },
    201,
  );
}

export function GET() {
  return jsonResponse({ ok: false, message: "Method not allowed." }, 405);
}

export function PUT() {
  return jsonResponse({ ok: false, message: "Method not allowed." }, 405);
}

export function DELETE() {
  return jsonResponse({ ok: false, message: "Method not allowed." }, 405);
}

export function PATCH() {
  return jsonResponse({ ok: false, message: "Method not allowed." }, 405);
}
