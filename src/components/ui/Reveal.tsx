"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
  /** Delay in ms before the reveal transition begins. */
  delay?: number;
  once?: boolean;
};

/**
 * Lightweight scroll reveal. Toggles [data-inview] which CSS animates.
 * Respects prefers-reduced-motion via the stylesheet.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  once = true,
  className,
  style,
  children,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-inview={inView ? "true" : "false"}
      className={className}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
