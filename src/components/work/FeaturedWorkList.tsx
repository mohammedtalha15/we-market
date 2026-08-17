"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/data/projects";
import { industries } from "@/lib/data/industries";
import { Counter } from "@/components/ui/Counter";
import { cn } from "@/lib/utils";

function accentFor(slug: string) {
  return industries.find((i) => i.slug === slug)?.accent ?? "#74e6bf";
}

/**
 *  0ms  row click
 *  0–500ms  panel height (grid-rows)
 *  80ms   numbers start counting
 */
const TIMING = {
  panelMs: 500,
  numberDelayMs: 80,
} as const;

/** Editorial project list — click a row to reveal improvement metrics. */
export function FeaturedWorkList({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <ul className="border-t border-line-onDark">
      {projects.map((project, i) => {
        const a = accentFor(project.industrySlug);
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${project.slug}`;
        const metrics = project.improvements ?? [];

        return (
          <li key={project.slug} className="border-b border-line-onDark">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              style={{ ["--accent" as string]: a }}
              className="relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-7 text-left md:gap-10 md:py-9"
            >
              <span className="relative font-mono text-xs text-fg-onDark-muted">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="relative flex min-w-0 flex-col gap-2">
                <span className="font-display text-[clamp(1.75rem,1rem+3vw,3.5rem)] font-extrabold leading-[0.98] tracking-tight text-fg-onDark">
                  {project.client}
                </span>
                <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-fg-onDark-muted">
                  <span>{project.industry}</span>
                  <span aria-hidden className="opacity-40">
                    /
                  </span>
                  <span>{project.services.slice(0, 3).join(" · ")}</span>
                </span>
              </span>

              <span
                aria-hidden
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-onDark-strong text-fg-onDark transition-[transform,border-color,background-color,color] duration-500 [transition-timing-function:var(--ease-out-expo)]",
                  isOpen && "border-transparent text-greenblack",
                )}
                style={isOpen ? { background: a } : undefined}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className={cn(
                    "transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]",
                    isOpen && "rotate-45",
                  )}
                >
                  <path
                    d="M7 1v12M1 7h12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-500 [transition-timing-function:var(--ease-out-expo)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
              style={{ transitionDuration: `${TIMING.panelMs}ms` }}
            >
              <div className="min-h-0">
                <div className="flex flex-col gap-8 pb-10 pl-12 md:pl-[4.25rem]">
                  <p className="max-w-2xl text-[0.95rem] leading-relaxed text-fg-onDark-muted">
                    {project.description}
                  </p>

                  {metrics.length > 0 && (
                    <div
                      className={cn(
                        "grid gap-8",
                        metrics.length === 1
                          ? "grid-cols-1 sm:max-w-sm"
                          : "grid-cols-1 sm:grid-cols-2",
                      )}
                    >
                      {metrics.map((m) => (
                        <div
                          key={m.label}
                          className="border-t pt-5"
                          style={{ borderColor: `${a}55` }}
                        >
                          <div
                            className="font-display text-[clamp(2.4rem,1.4rem+3vw,4.2rem)] font-extrabold leading-none tracking-tight tabular-nums"
                            style={{ color: a }}
                          >
                            <Counter
                              value={m.value}
                              prefix={m.prefix}
                              suffix={m.suffix}
                              active={isOpen}
                              durationMs={1400}
                            />
                          </div>
                          <div className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                            {m.label}
                          </div>
                          <p className="mt-2 max-w-xs text-[0.9rem] leading-snug text-fg-onDark-muted">
                            {m.context}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/work/${project.slug}`}
                    className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-fg-onDark transition-colors hover:text-lime"
                  >
                    View project
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
