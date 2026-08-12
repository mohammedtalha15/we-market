"use client";

import { useRef, useState } from "react";
import { pillars } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";
import { contactNextSteps } from "@/lib/data/contact";
import {
  payloadFromFormData,
  submitLead,
  validateLeadFormClient,
} from "@/lib/leads/client";
import type { LeadFieldErrors } from "@/lib/leads/types";
import { site } from "@/lib/data/site";
import { cn } from "@/lib/utils";

const fieldBase = cn(
  "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-[0.95rem] text-fg",
  "outline-none transition-[border-color,box-shadow] duration-300",
  "placeholder:text-fg-muted/50",
  "focus:border-teal focus:shadow-[0_0_0_3px_rgba(15,143,120,0.14)]",
);

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<LeadFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const payload = payloadFromFormData(form);
    const clientErrors = validateLeadFormClient(payload);

    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setFormError("Please check the highlighted fields and try again.");
      setStatus("error");
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
        className="flex flex-col items-start gap-5 rounded-[var(--radius-card)] border border-line bg-white p-8 md:p-10"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-mint text-ink">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 12.5l5 5L20 6.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight text-fg">
          Thanks — your enquiry has been received.
        </h3>
        <p className="max-w-md text-fg-muted leading-relaxed">
          Our team will review your requirements and get in touch.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-2 text-sm font-semibold text-teal underline underline-offset-4 transition-colors hover:text-teal-deep"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div id="enquiry-form" className="scroll-mt-28">
      <header className="mb-10 max-w-xl">
        <h2 className="font-display text-[length:var(--text-h2)] font-extrabold text-fg">
          Tell us what you&apos;re building.
        </h2>
        <p className="mt-4 text-[length:var(--text-lead)] leading-relaxed text-fg-muted">
          Share your business, goals and challenges. We&apos;ll review what you need
          and recommend the right mix of strategy, creative, technology and growth.
        </p>
      </header>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {contactNextSteps.map((step) => (
          <div
            key={step.index}
            className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-line bg-white/60 px-5 py-4"
          >
            <span className="font-display text-2xl font-extrabold text-teal/80">
              {step.index}
            </span>
            <p className="text-sm font-semibold text-fg">{step.title}</p>
            <p className="text-[0.85rem] leading-snug text-fg-muted">{step.body}</p>
          </div>
        ))}
      </div>

      {status === "error" && formError && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-8 rounded-[var(--radius-card)] border border-coral/30 bg-coral/5 px-5 py-4"
        >
          <p className="text-sm font-semibold text-fg">{formError}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="text-teal underline underline-offset-2 transition-colors hover:text-teal-deep"
            >
              Call WeMarket
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="text-teal underline underline-offset-2 transition-colors hover:text-teal-deep"
            >
              Email WeMarket
            </a>
          </div>
        </div>
      )}

      <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-10" noValidate>
        {/* Honeypot — hidden from users */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <FormGroup title="About you">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Full name" htmlFor="contact-name" required error={fieldErrors.name}>
              <input
                id="contact-name"
                name="name"
                required
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                autoComplete="name"
                className={cn(fieldBase, fieldErrors.name && "border-coral")}
                placeholder="Your name"
              />
            </Field>
            <Field label="Company" htmlFor="contact-company" error={fieldErrors.company}>
              <input
                id="contact-company"
                name="company"
                autoComplete="organization"
                className={fieldBase}
                placeholder="Company name"
              />
            </Field>
            <Field label="Email" htmlFor="contact-email" required error={fieldErrors.email}>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                autoComplete="email"
                className={cn(fieldBase, fieldErrors.email && "border-coral")}
                placeholder="you@company.com"
              />
            </Field>
            <Field label="Phone" htmlFor="contact-phone" error={fieldErrors.phone}>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={fieldBase}
                placeholder="+91 "
              />
            </Field>
          </div>
        </FormGroup>

        <FormGroup title="About your business">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Industry" htmlFor="contact-industry" required error={fieldErrors.industry}>
              <SelectWrapper>
                <select
                  id="contact-industry"
                  name="industry"
                  required
                  aria-invalid={Boolean(fieldErrors.industry)}
                  aria-describedby={fieldErrors.industry ? "contact-industry-error" : undefined}
                  className={cn(fieldBase, "appearance-none pr-10", fieldErrors.industry && "border-coral")}
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
              label="Services required"
              htmlFor="contact-service"
              required
              error={fieldErrors.service}
            >
              <SelectWrapper>
                <select
                  id="contact-service"
                  name="service"
                  required
                  aria-invalid={Boolean(fieldErrors.service)}
                  aria-describedby={fieldErrors.service ? "contact-service-error" : undefined}
                  className={cn(fieldBase, "appearance-none pr-10", fieldErrors.service && "border-coral")}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a capability
                  </option>
                  {pillars.map((p) => (
                    <option key={p.id} value={p.slug}>
                      {p.name} — {p.category}
                    </option>
                  ))}
                  <option value="multiple">Multiple / not sure yet</option>
                </select>
              </SelectWrapper>
            </Field>
          </div>
        </FormGroup>

        <FormGroup title="Your goals">
          <Field
            label="What are you trying to achieve?"
            htmlFor="contact-goal"
            required
            error={fieldErrors.goal}
          >
            <textarea
              id="contact-goal"
              name="goal"
              required
              rows={5}
              aria-invalid={Boolean(fieldErrors.goal)}
              aria-describedby={fieldErrors.goal ? "contact-goal-error" : undefined}
              className={cn(fieldBase, "resize-none", fieldErrors.goal && "border-coral")}
              placeholder="Tell us about your business, your goals and the growth you're after."
            />
          </Field>
        </FormGroup>

        <FormGroup title="Preferred contact">
          <fieldset className="flex flex-col gap-3">
            <legend className="sr-only">Preferred contact method</legend>
            <div className="flex flex-wrap gap-2">
              {["Email", "Phone", "WhatsApp"].map((m, i) => (
                <label
                  key={m}
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-fg transition-[border-color,background-color] duration-300 has-[:checked]:border-teal has-[:checked]:bg-teal/5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal/30"
                >
                  <input
                    type="radio"
                    name="preferredContact"
                    value={m}
                    defaultChecked={i === 0}
                    className="accent-[color:var(--color-teal)]"
                  />
                  {m}
                </label>
              ))}
            </div>
          </fieldset>
        </FormGroup>

        <div className="flex flex-col gap-4 border-t border-line pt-8">
          <button
            type="submit"
            disabled={status === "submitting"}
            aria-busy={status === "submitting"}
            className={cn(
              "group inline-flex items-center justify-center gap-2 self-start rounded-full bg-ink px-7 py-3.5 text-[0.95rem] font-semibold text-white",
              "transition-[background-color,transform,opacity] duration-300 hover:bg-teal",
              "disabled:pointer-events-none disabled:opacity-60",
              status === "submitting" && "cursor-wait",
            )}
          >
            {status === "submitting" ? "Sending…" : "Start a Project"}
            {status !== "submitting" && (
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            )}
          </button>
          <p className="max-w-md text-[0.82rem] leading-relaxed text-fg-muted">
            By submitting, you agree we may use your details to respond to your enquiry.
            See our{" "}
            <a href="/privacy" className="font-semibold text-teal underline underline-offset-2">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
}

function FormGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="eyebrow text-fg-muted">{title}</h3>
      {children}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = `${htmlFor}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-fg">
        {label}
        {required && (
          <span className="text-teal" aria-hidden>
            {" "}
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="text-[0.82rem] font-medium text-coral">
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
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
}
