"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { industryResults } from "@/lib/data/content";
import { cn } from "@/lib/utils";

const TIMING = {
  fadeMs: 180,
  heightMs: 500,
  staggerMs: 70,
} as const;

export function Results() {
  const [active, setActive] = useState(industryResults[0].slug);
  const current = industryResults.find((i) => i.slug === active) ?? industryResults[0];

  return (
    <section className="bg-forest py-24 text-fg-onDark md:py-32">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Results"
          title={
            <>
              Pick your kind of business.{" "}
              <span className="text-lime">See what changed.</span>
            </>
          }
          lead="Simple numbers from real clients. Click an industry to see how we helped businesses like yours."
        />

        <Reveal delay={160}>
          <IndustryTabs active={active} onChange={setActive} />
        </Reveal>

        <SmoothHeight>
          <div key={current.slug} className="pt-10 md:pt-12">
            <h3 className="result-rise font-display text-[length:var(--text-h3)] font-extrabold text-white">
              {current.heading}
            </h3>
            <p
              className="result-rise mt-3 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-fg-onDark-muted"
              style={{ animationDelay: `${TIMING.staggerMs}ms` }}
            >
              {current.lead}
            </p>

            <div
              className={cn(
                "mt-10 grid gap-x-10 gap-y-12",
                current.stats.length > 2
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : current.stats.length > 1
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:max-w-md",
              )}
            >
              {current.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="result-rise flex flex-col gap-3 border-t border-line-onDark pt-6"
                  style={{ animationDelay: `${TIMING.staggerMs * (i + 2)}ms` }}
                >
                  <div
                    className="font-display text-[clamp(3.2rem,1.8rem+5vw,6rem)] font-extrabold leading-none tracking-tight tabular-nums"
                    style={{ color: stat.accent }}
                  >
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      active
                      durationMs={1400}
                    />
                  </div>
                  <div className="text-[1.05rem] font-bold tracking-tight text-white">
                    {stat.label}
                  </div>
                  <p className="text-[0.92rem] leading-snug text-fg-onDark-muted">{stat.context}</p>
                </div>
              ))}
            </div>
          </div>
        </SmoothHeight>

        <p className="mt-10 text-[0.8rem] text-fg-onDark-muted">
          These numbers are from specific WeMarket clients. Results vary by business, market and
          scope.
        </p>
      </Container>
    </section>
  );
}

function IndustryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (slug: string) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const current = industryResults.find((i) => i.slug === active) ?? industryResults[0];

  useLayoutEffect(() => {
    const list = listRef.current;
    const btn = list?.querySelector<HTMLButtonElement>(`[data-slug="${active}"]`);
    if (!list || !btn) return;
    setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [active]);

  useEffect(() => {
    const onResize = () => {
      const list = listRef.current;
      const btn = list?.querySelector<HTMLButtonElement>(`[data-slug="${active}"]`);
      if (!list || !btn) return;
      setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  return (
    <div className="mt-12">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Industry results"
        className="no-scrollbar relative flex gap-1 overflow-x-auto border-b border-line-onDark"
      >
        {industryResults.map((item) => {
          const selected = item.slug === active;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              data-slug={item.slug}
              aria-selected={selected}
              onClick={() => onChange(item.slug)}
              className={cn(
                "relative shrink-0 px-4 py-3.5 text-[1.05rem] font-extrabold tracking-tight md:px-5 md:text-xl",
                "motion-safe:transition-colors motion-safe:duration-300",
                selected ? "text-white" : "text-fg-onDark-muted hover:text-white",
              )}
            >
              {item.tab}
            </button>
          );
        })}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 h-0.5 motion-safe:transition-[left,width,background-color] motion-safe:duration-500 motion-safe:[transition-timing-function:var(--ease-out-expo)]"
          style={{
            left: indicator.left,
            width: indicator.width,
            backgroundColor: current.stats[0]?.accent ?? "#c7e552",
          }}
        />
      </div>
    </div>
  );
}

function SmoothHeight({ children }: { children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setHeight(el.getBoundingClientRect().height);
    });
    ro.observe(el);
    setHeight(el.getBoundingClientRect().height);
    return () => ro.disconnect();
  }, [children]);

  return (
    <div
      className="overflow-hidden motion-safe:transition-[height] motion-safe:duration-500 motion-safe:[transition-timing-function:var(--ease-out-expo)]"
      style={{
        height: height === "auto" ? "auto" : height,
        transitionDuration: `${TIMING.heightMs}ms`,
      }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
