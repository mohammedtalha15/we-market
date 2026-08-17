"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  value: string; // numeric string, e.g. "52", "1,450"
  prefix?: string;
  suffix?: string;
  className?: string;
  durationMs?: number;
  /** When set, counts up when true and resets when false. Otherwise plays on scroll into view. */
  active?: boolean;
};

/** Counts up to a numeric value when scrolled into view, or when `active` becomes true. */
export function Counter({
  value,
  prefix,
  suffix,
  className,
  durationMs = 1600,
  active,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const target = Number(String(value).replace(/,/g, ""));
  const hasComma = String(value).includes(",");
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  const frame = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (Number.isNaN(target)) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stop = () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
        frame.current = 0;
      }
    };

    const play = () => {
      stop();
      started.current = true;
      if (reduce) {
        setDisplay(target);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setDisplay(Math.round(eased * target));
        if (t < 1) {
          frame.current = requestAnimationFrame(tick);
        } else {
          setDisplay(target);
        }
      };
      frame.current = requestAnimationFrame(tick);
    };

    if (active === false) {
      stop();
      started.current = false;
      setDisplay(0);
      return;
    }

    if (active === true) {
      play();
      return () => {
        stop();
        started.current = false;
      };
    }

    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
      started.current = false;
    };
  }, [active, target, durationMs]);

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
