"use client";

import { useRef, useState } from "react";
import { pillars } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";
import {
  payloadFromFormData,
  submitLead,
  validateLeadFormClient,
} from "@/lib/leads/client";
import type { LeadFieldErrors } from "@/lib/leads/types";
import { site } from "@/lib/data/site";
import { cn } from "@/lib/utils";

const fieldBase = cn(
  "w-full rounded-xl border border-ink/15 bg-white/85 px-4 py-3 text-[0.95rem] text-ink",
  "outline-none transition-[border-color,box-shadow] duration-300",
  "placeholder:text-ink/40",
  "focus-visible:border-ink focus-visible:shadow-[0_0_0_3px_rgba(10,14,11,0.16)]",
);

type FormStatus = "idle" | "submitting" | "success" | "error";

function goalFromSelections(industry: string, service: string): string {
  const industryLabel =
    industry === "other"
      ? "another industry"
      : (industries.find((i) => i.slug === industry)?.name ?? industry);
  const serviceLabel =
    service === "multiple"
      ? "multiple services"
      : (pillars.find((p) => p.slug === service)?.category ?? service);
  return `Website enquiry — interested in ${serviceLabel} for ${industryLabel}.`;
}

export function CtaLeadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<LeadFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  function focusFirstError(form: HTMLFormElement, errors: LeadFieldErrors) {
    const first = (["name", "email", "phone", "industry", "service"] as const).find(
      (key) => errors[key],
    );
    if (!first) return;
    const el = form.elements.namedItem(first);
    if (el instanceof HTMLElement) el.focus();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = payloadFromFormData(form);
    payload.goal = goalFromSelections(payload.industry, payload.service);

    const clientErrors = validateLeadFormClient(payload);
    if (!payload.phone?.trim()) {
      clientErrors.phone = "Please enter your phone number.";
    }

    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setFormError("Please check the highlighted fields and try again.");
      setStatus("error");
      focusFirstError(form, clientErrors);
      return;
    }

    setFieldErrors({});
    setFormError(null);
    setStatus("submitting");

    const result = await submitLead(payload);

    if (result.ok) {
      setStatus("success");
      return;
    }

    setFieldErrors(result.errors ?? {});
    setFormError(result.message);
    setStatus("error");
    if (result.errors) focusFirstError(form, result.errors);
  }

  function resetForm() {
    formRef.current?.reset();
    setFieldErrors({});
    setFormError(null);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-ink/15 bg-white/70 px-6 py-7"
      >
        <h3 className="text-xl font-extrabold tracking-tight text-ink">
          Thanks — we&apos;ve got it.
        </h3>
        <p className="text-[0.95rem] leading-relaxed text-ink/70">
          Our team will review your enquiry and get in touch.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="self-start text-sm font-semibold text-ink underline underline-offset-4 transition-colors hover:text-teal-deep"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
      noValidate
    >
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="cta-website">Website</label>
        <input
          id="cta-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && formError && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-xl border border-coral/40 bg-white/70 px-4 py-3"
        >
          <p className="text-sm font-semibold text-ink">{formError}</p>
          <div className="mt-2 flex flex-wrap gap-4 text-sm font-semibold">
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="underline underline-offset-2 transition-colors hover:text-teal-deep"
            >
              Call WeMarket
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="underline underline-offset-2 transition-colors hover:text-teal-deep"
            >
              Email WeMarket
            </a>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="cta-name" required error={fieldErrors.name}>
          <input
            id="cta-name"
            name="name"
            required
            spellCheck={false}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "cta-name-error" : undefined}
            autoComplete="name"
            className={cn(fieldBase, fieldErrors.name && "border-coral")}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" htmlFor="cta-email" required error={fieldErrors.email}>
          <input
            id="cta-email"
            name="email"
            type="email"
            required
            spellCheck={false}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "cta-email-error" : undefined}
            autoComplete="email"
            className={cn(fieldBase, fieldErrors.email && "border-coral")}
            placeholder="you@company.com"
          />
        </Field>
        <Field label="Phone" htmlFor="cta-phone" required error={fieldErrors.phone}>
          <input
            id="cta-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            required
            spellCheck={false}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "cta-phone-error" : undefined}
            autoComplete="tel"
            className={cn(fieldBase, fieldErrors.phone && "border-coral")}
            placeholder="+91 "
          />
        </Field>
        <Field
          label="Industry"
          htmlFor="cta-industry"
          required
          error={fieldErrors.industry}
        >
          <SelectWrapper>
            <select
              id="cta-industry"
              name="industry"
              required
              aria-invalid={Boolean(fieldErrors.industry)}
              aria-describedby={fieldErrors.industry ? "cta-industry-error" : undefined}
              className={cn(
                fieldBase,
                "appearance-none pr-10",
                fieldErrors.industry && "border-coral",
              )}
              defaultValue=""
            >
              <option value="" disabled>
                Select an industry
              </option>
              {industries.map((i) => (
                <option key={i.slug} value={i.slug}>
                  {i.name}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          </SelectWrapper>
        </Field>
        <Field
          label="Service"
          htmlFor="cta-service"
          required
          error={fieldErrors.service}
          className="sm:col-span-2"
        >
          <SelectWrapper>
            <select
              id="cta-service"
              name="service"
              required
              aria-invalid={Boolean(fieldErrors.service)}
              aria-describedby={fieldErrors.service ? "cta-service-error" : undefined}
              className={cn(
                fieldBase,
                "appearance-none pr-10",
                fieldErrors.service && "border-coral",
              )}
              defaultValue=""
            >
              <option value="" disabled>
                Select a service
              </option>
              {pillars.map((p) => (
                <option key={p.id} value={p.slug}>
                  {p.category}
                </option>
              ))}
              <option value="multiple">Multiple / not sure yet</option>
            </select>
          </SelectWrapper>
        </Field>
      </div>

      <div className="flex flex-col gap-3 pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          className={cn(
            "group inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full bg-ink px-7 py-3 text-[0.95rem] font-semibold text-white",
            "transition-[background-color,opacity] duration-300 hover:bg-teal",
            "disabled:pointer-events-none disabled:opacity-60",
            status === "submitting" && "cursor-wait",
          )}
        >
          {status === "submitting" ? "Sending…" : "Start a project"}
          {status !== "submitting" && (
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          )}
        </button>
        <p className="max-w-md text-[0.78rem] leading-relaxed text-ink/70">
          By submitting, you agree we may use your details to respond. See our{" "}
          <a
            href="/privacy"
            className="font-semibold text-ink underline underline-offset-2 hover:text-teal-deep"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const errorId = `${htmlFor}-error`;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="text-ink/70" aria-hidden>
            {" "}
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="text-[0.82rem] font-medium text-ink">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/50"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
}
