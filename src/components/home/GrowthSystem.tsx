"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { growthSystem } from "@/lib/data/content";
import { cn } from "@/lib/utils";

export function GrowthSystem() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-forest py-24 text-fg-onDark md:py-32">
      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="The WeMarket Growth System"
          title={<>Growth doesn&apos;t happen in silos.</>}
          lead="Your website, content, brand, ads, SEO, technology and data shouldn't operate independently. We connect them into one growth system — so every part compounds the others."
        />

        {/* connector rail (desktop) */}
        <div className="relative mt-16 hidden md:block">
          <div className="absolute left-0 right-0 top-[26px] h-px bg-line-onDark" />
          <div
            className="absolute left-0 top-[26px] h-px transition-[width,background-color] duration-500 [transition-timing-function:var(--ease-out-expo)]"
            style={{
              width: `${((active + 0.5) / growthSystem.length) * 100}%`,
              backgroundColor: growthSystem[active].accent,
            }}
          />
          <div className="grid grid-cols-4 gap-6">
            {growthSystem.map((stage, i) => (
              <StageCard
                key={stage.id}
                stage={stage}
                active={i <= active}
                current={i === active}
                onEnter={() => setActive(i)}
              />
            ))}
          </div>
        </div>

        {/* stacked (mobile) */}
        <div className="mt-12 flex flex-col gap-4 md:hidden">
          {growthSystem.map((stage, i) => (
            <Reveal key={stage.id} delay={i * 60}>
              <StageCard stage={stage} active current={i === active} onEnter={() => setActive(i)} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StageCard({
  stage,
  active,
  current,
  onEnter,
}: {
  stage: (typeof growthSystem)[number];
  active: boolean;
  current: boolean;
  onEnter: () => void;
}) {
  const accent = stage.accent;
  return (
    <div
      onMouseEnter={onEnter}
      onFocus={onEnter}
      tabIndex={0}
      className={cn(
        "group relative flex flex-col gap-4 rounded-[var(--radius-card)] border p-6 outline-none transition-all duration-500 [transition-timing-function:var(--ease-out-expo)]",
        current
          ? "bg-forest-3 md:-translate-y-1.5"
          : "border-line-onDark bg-forest-2/60 hover:border-line-onDark-strong",
      )}
      style={current ? { borderColor: accent } : undefined}
    >
      {/* node marker */}
      <span
        className="hidden h-[13px] w-[13px] rounded-full border-2 transition-colors duration-500 md:block"
        style={{
          borderColor: active ? accent : "rgba(255,255,255,0.2)",
          backgroundColor: active ? accent : "var(--color-forest)",
        }}
      />
      <div className="flex items-baseline gap-3">
        <span
          className="font-mono text-xs transition-colors"
          style={{ color: current ? accent : "var(--color-fg-onDark-muted)" }}
        >
          {stage.index}
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight text-white">{stage.title}</h3>
      </div>
      <p className="text-[0.92rem] leading-snug text-fg-onDark-muted">{stage.blurb}</p>
      <ul className="mt-1 flex flex-wrap gap-2">
        {stage.nodes.map((n) => (
          <li
            key={n}
            className={cn(
              "rounded-full border px-3 py-1 text-[0.72rem] font-medium tracking-tight transition-colors duration-300",
              !current && "border-line-onDark text-fg-onDark-muted",
            )}
            style={
              current
                ? { borderColor: `${accent}55`, backgroundColor: `${accent}1a`, color: accent }
                : undefined
            }
          >
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}
