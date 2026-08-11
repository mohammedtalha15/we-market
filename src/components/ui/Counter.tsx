"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  value: string; // numeric string, e.g. "52", "1,450"
  prefix?: string;
  suffix?: string;
  className?: string;
  durationMs?: number;
};

/** Counts up to a numeric value when scrolled into view. */
export function Counter({ value, prefix, suffix, className, durationMs = 1600 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const target = Number(value.replace(/,/g, ""));
  const hasComma = value.includes(",");
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target)) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(target);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          // easeOutExpo
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(Math.round(eased * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, durationMs]);

  const formatted = Number.isNaN(target)
    ? value
    : hasComma
      ? display.toLocaleString("en-IN")
      : String(display);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
