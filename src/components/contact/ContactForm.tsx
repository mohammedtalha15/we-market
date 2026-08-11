"use client";

import { useState } from "react";
import { pillars } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";
import { cn } from "@/lib/utils";

/**
 * Project enquiry form. Front-end only: on submit it shows a success state.
 * TODO(integration): POST to your CRM / email endpoint (e.g. /api/enquiry).
 * This form never collects credentials or payment details.
 */
const fieldBase =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-fg outline-none transition-colors placeholder:text-fg-muted/60 focus:border-teal";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Front-end demo only — wire to your backend/CRM here.
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-line bg-white p-10">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-mint text-ink">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight text-fg">Thanks — we&apos;ll be in touch.</h3>
        <p className="max-w-md text-fg-muted">
          Your enquiry has been captured. A member of the WeMarket team will reach out shortly to
          map the right growth system for your business.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-semibold text-teal underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate={false}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" required>
          <input name="name" required autoComplete="name" className={fieldBase} placeholder="Your name" />
        </Field>
        <Field label="Company">
          <input name="company" autoComplete="organization" className={fieldBase} placeholder="Company name" />
        </Field>
        <Field label="Email" required>
          <input name="email" type="email" required autoComplete="email" className={fieldBase} placeholder="you@company.com" />
        </Field>
        <Field label="Phone">
          <input name="phone" type="tel" autoComplete="tel" className={fieldBase} placeholder="+91 " />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Industry">
          <select name="industry" className={cn(fieldBase, "appearance-none")} defaultValue="">
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
        </Field>
        <Field label="Services required">
          <select name="service" className={cn(fieldBase, "appearance-none")} defaultValue="">
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
        </Field>
      </div>

      <Field label="What are you trying to achieve?" required>
        <textarea
          name="goal"
          required
          rows={4}
          className={cn(fieldBase, "resize-none")}
          placeholder="Tell us about your business, your goals and the growth you're after."
        />
      </Field>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm font-semibold text-fg">Preferred contact method</legend>
        <div className="flex flex-wrap gap-2">
          {["Email", "Phone", "WhatsApp"].map((m, i) => (
            <label
              key={m}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm text-fg has-[:checked]:border-teal has-[:checked]:bg-teal/5"
            >
              <input type="radio" name="preferredContact" value={m} defaultChecked={i === 0} className="accent-[color:var(--color-teal)]" />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="group mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full bg-ink px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-teal"
      >
        Start a Conversation
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-fg">
        {label}
        {required && <span className="text-teal"> *</span>}
      </span>
      {children}
    </label>
  );
}
