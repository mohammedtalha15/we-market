"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="bg-paper py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="What clients say"
          title={
            <>
              Trusted for the <span className="text-teal">results</span> we deliver.
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          {/* active quote */}
          <div className="flex flex-col">
            <svg width="44" height="34" viewBox="0 0 44 34" className="text-teal" aria-hidden>
              <path
                d="M0 34V20C0 9 6 2 18 0l2 6c-6 2-9 5-9 10h7v18H0zm24 0V20C24 9 30 2 42 0l2 6c-6 2-9 5-9 10h7v18H24z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
            <blockquote
              key={active}
              className="mt-6 font-display text-[clamp(1.5rem,1rem+2.2vw,2.6rem)] font-extrabold leading-[1.1] tracking-tight text-fg"
              style={{ animation: "pop-in 0.5s var(--ease-out-expo)" }}
            >
              “{t.quote}”
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-ink font-bold text-mint">
                {initials(t.name)}
              </span>
              <div>
                <div className="font-bold tracking-tight text-fg">{t.name}</div>
                <div className="text-sm text-fg-muted">
                  {t.title}, {t.company} · {t.industry}
                </div>
              </div>
            </div>
          </div>

          {/* selector */}
          <div className="flex flex-col gap-2 lg:border-l lg:border-line lg:pl-10">
            {testimonials.map((item, i) => (
              <button
                key={item.company}
                onClick={() => setActive(i)}
                className={cn(
                  "group flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300",
                  i === active
                    ? "border-line-strong bg-white"
                    : "border-transparent hover:bg-white",
                )}
                aria-pressed={i === active}
              >
                <span>
                  <span
                    className={cn(
                      "block font-bold tracking-tight transition-colors",
                      i === active ? "text-fg" : "text-fg-muted",
                    )}
                  >
                    {item.company}
                  </span>
                  <span className="text-[0.8rem] text-fg-muted">{item.industry}</span>
                </span>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    i === active ? "bg-teal" : "bg-line-strong",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
