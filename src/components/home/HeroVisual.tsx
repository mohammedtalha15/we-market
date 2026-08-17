"use client";

import { useEffect, useState } from "react";
import { Counter } from "@/components/ui/Counter";
import { cn } from "@/lib/utils";

/**
 *  0ms     card in view
 *  0–1400  featured number counts up
 *  0–4500  progress bar fills, then next proof
 */
const TIMING = {
  holdMs: 4500,
  countMs: 1400,
} as const;

const proofs = [
  {
    client: "Amba Constructions",
    tag: "Property",
    value: "1,450",
    suffix: "",
    label: "People who enquired",
    detail: "In one year",
    accent: "#ef7d3c",
  },
  {
    client: "Aadya Academy",
    tag: "Education",
    value: "50",
    suffix: "/mo",
    label: "New enquiries",
    detail: "Every month",
    accent: "#f4c531",
  },
  {
    client: "Healius",
    tag: "Healthcare",
    value: "5",
    suffix: "×",
    label: "More patients",
    detail: "Than before we started",
    accent: "#f96f54",
  },
] as const;

/** Proof widget — one featured result, the others as a compact list. */
export function HeroVisual() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const featured = proofs[index];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % proofs.length);
    }, TIMING.holdMs);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div className="relative w-full max-w-[440px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-8 h-48 w-48 rounded-full bg-lime/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-8 h-40 w-40 rounded-full blur-3xl"
        style={{ background: `${featured.accent}22` }}
      />

      <div
        className="relative overflow-hidden rounded-[var(--radius-card)] border border-line-onDark bg-forest-2 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          className="h-1 origin-left"
          style={{ background: `${featured.accent}33` }}
        >
          <div
            key={index}
            className="h-full origin-left motion-safe:[animation:hero-progress_4.5s_linear]"
            style={{
              background: featured.accent,
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        </div>

        <div className="p-7 md:p-8">
          <p className="eyebrow text-fg-onDark-muted">Live results</p>

          <div key={featured.client} className="result-rise mt-6">
            <span
              className="text-[0.72rem] font-bold uppercase tracking-[0.14em]"
              style={{ color: featured.accent }}
            >
              {featured.tag}
            </span>
            <div
              className="mt-3 font-display text-[clamp(3.8rem,2rem+6vw,5.75rem)] font-extrabold leading-none tracking-tight tabular-nums"
              style={{ color: featured.accent }}
              aria-live="polite"
            >
              <Counter
                value={featured.value}
                suffix={featured.suffix}
                active
                durationMs={TIMING.countMs}
              />
            </div>
            <p className="mt-3 text-xl font-extrabold tracking-tight text-white">
              {featured.label}
            </p>
            <p className="mt-1 text-[0.92rem] text-fg-onDark-muted">{featured.detail}</p>
            <p className="mt-5 text-[0.95rem] font-semibold text-fg-onDark">
              {featured.client}
            </p>
          </div>
        </div>

        <ul className="border-t border-line-onDark">
          {proofs.map((proof, i) => {
            const selected = i === index;
            return (
              <li key={proof.client} className="border-b border-line-onDark last:border-b-0">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={selected}
                  className={cn(
                    "flex w-full items-baseline justify-between gap-4 px-7 py-4 text-left md:px-8",
                    "motion-safe:transition-colors motion-safe:duration-300",
                    selected ? "bg-white/[0.04]" : "hover:bg-white/[0.03]",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white">
                      {proof.client}
                    </span>
                    <span className="mt-0.5 block text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-fg-onDark-muted">
                      {proof.tag}
                    </span>
                  </span>
                  <span
                    className="shrink-0 font-display text-xl font-extrabold tabular-nums md:text-2xl"
                    style={{ color: selected ? proof.accent : "var(--color-fg-onDark-muted)" }}
                  >
                    {proof.value}
                    {proof.suffix}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
