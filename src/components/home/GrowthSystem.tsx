"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { growthSystem } from "@/lib/data/content";
import { cn } from "@/lib/utils";

/**
 *  0ms     stage selected
 *  0–500   rail fill + panel swap
 *  70ms    chips stagger in
 *  0–5000  auto-advance (paused on hover)
 */
const TIMING = {
  holdMs: 5000,
  staggerMs: 70,
} as const;

export function GrowthSystem() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stage = growthSystem[active];
  const next = growthSystem[(active + 1) % growthSystem.length];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % growthSystem.length);
    }, TIMING.holdMs);
    return () => window.clearInterval(id);
  }, [paused, active]);

  return (
    <section className="relative overflow-hidden border-t border-line-onDark bg-forest py-24 text-fg-onDark md:py-32">
      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="The WeMarket Growth System"
          title={<>Growth doesn&apos;t happen in silos.</>}
          lead="Your website, content, brand, ads, SEO, technology and data shouldn't operate independently. We connect them into one growth system — so every part compounds the others."
        />

        <div
          className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <nav
            role="tablist"
            aria-label="Growth stages"
            className="relative"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault();
                setActive((i) => (i + 1) % growthSystem.length);
              }
              if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault();
                setActive((i) => (i - 1 + growthSystem.length) % growthSystem.length);
              }
            }}
          >
            <div
              aria-hidden
              className="absolute bottom-4 left-[15px] top-4 hidden w-px bg-line-onDark md:block"
            />
            <div
              aria-hidden
              className="absolute left-[15px] top-4 hidden w-px origin-top motion-safe:transition-[height,background-color] motion-safe:duration-500 motion-safe:[transition-timing-function:var(--ease-out-expo)] md:block"
              style={{
                height: `${(active / Math.max(growthSystem.length - 1, 1)) * 100}%`,
                backgroundColor: stage.accent,
              }}
            />

            <div className="no-scrollbar flex gap-2 overflow-x-auto md:flex-col md:gap-0 md:overflow-visible">
              {growthSystem.map((item, i) => {
                const selected = i === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="growth-stage-panel"
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative flex min-h-11 shrink-0 items-center gap-4 rounded-full border px-4 py-3 text-left md:w-full md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-5",
                      "motion-safe:transition-colors motion-safe:duration-300",
                      selected
                        ? "border-transparent bg-forest-3 md:bg-transparent"
                        : "border-line-onDark bg-forest-2/40 md:bg-transparent",
                    )}
                  >
                    <span
                      aria-hidden
                      className="relative z-[1] hidden h-[13px] w-[13px] shrink-0 rounded-full border-2 md:block"
                      style={{
                        marginLeft: 9,
                        borderColor: i <= active ? stage.accent : "rgba(255,255,255,0.22)",
                        backgroundColor: selected ? stage.accent : "var(--color-forest)",
                        boxShadow: selected ? `0 0 0 4px ${stage.accent}22` : undefined,
                        transition: "border-color 0.4s var(--ease-out-expo), background-color 0.4s var(--ease-out-expo), box-shadow 0.4s var(--ease-out-expo)",
                      }}
                    />
                    <span className="flex min-w-0 flex-col gap-0.5 md:pl-4">
                      <span
                        className="font-mono text-[0.68rem] tracking-wide"
                        style={{ color: selected ? stage.accent : "var(--color-fg-onDark-muted)" }}
                      >
                        {item.index}
                      </span>
                      <span
                        className={cn(
                          "text-lg font-extrabold tracking-tight md:text-2xl",
                          selected ? "text-white" : "text-fg-onDark-muted",
                        )}
                      >
                        {item.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          <article
            id="growth-stage-panel"
            role="tabpanel"
            className="relative overflow-hidden rounded-[var(--radius-card)] border border-line-onDark bg-forest-2"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full blur-3xl"
              style={{ background: `${stage.accent}24` }}
            />

            <div
              className="h-1 origin-left"
              style={{ background: `${stage.accent}28` }}
            >
              <div
                key={stage.id}
                className="h-full origin-left motion-safe:[animation:hero-progress_5s_linear]"
                style={{
                  background: stage.accent,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            </div>

            <div key={stage.id} className="relative p-7 md:p-10 lg:p-12">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[8rem] font-extrabold leading-none text-white/[0.04] md:text-[10rem]"
              >
                {stage.index}
              </span>

              <p
                className="result-rise text-[0.72rem] font-bold uppercase tracking-[0.16em]"
                style={{ color: stage.accent }}
              >
                Stage {stage.index}
              </p>
              <h3 className="result-rise mt-4 font-display text-[clamp(2.4rem,1.4rem+3vw,4rem)] font-extrabold leading-[0.95] tracking-tight text-white">
                {stage.title}
              </h3>
              <p
                className="result-rise mt-5 max-w-md text-[length:var(--text-lead)] leading-relaxed text-fg-onDark-muted"
                style={{ animationDelay: `${TIMING.staggerMs}ms` }}
              >
                {stage.blurb}
              </p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {stage.nodes.map((node, i) => (
                  <li
                    key={node}
                    className="result-rise rounded-full border px-4 py-2 text-sm font-semibold tracking-tight"
                    style={{
                      animationDelay: `${TIMING.staggerMs * (i + 2)}ms`,
                      borderColor: `${stage.accent}55`,
                      backgroundColor: `${stage.accent}14`,
                      color: stage.accent,
                    }}
                  >
                    {node}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center justify-between gap-4 border-t border-line-onDark pt-6">
                <p className="text-sm text-fg-onDark-muted">
                  Next{" "}
                  <span className="font-semibold text-white">{next.title}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setActive((active + 1) % growthSystem.length)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-onDark-strong px-4 py-2 text-sm font-semibold text-fg-onDark motion-safe:transition-colors motion-safe:duration-300 hover:border-white hover:text-white"
                >
                  Continue
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
