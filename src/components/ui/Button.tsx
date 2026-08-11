"use client";

import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";
type Tone = "light" | "dark";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[0.9rem] font-semibold tracking-tight transition-colors duration-300 will-change-transform";

function variantClasses(variant: Variant, tone: Tone) {
  const map: Record<Variant, Record<Tone, string>> = {
    solid: {
      light: "bg-ink text-white hover:bg-teal",
      dark: "bg-mint text-ink hover:bg-mint-bright",
    },
    outline: {
      light: "border border-line-strong text-fg hover:border-ink hover:bg-ink hover:text-white",
      dark: "border border-line-onDark-strong text-fg-onDark hover:bg-white hover:text-ink",
    },
    ghost: {
      light: "text-fg hover:text-teal",
      dark: "text-fg-onDark hover:text-mint",
    },
  };
  return map[variant][tone];
}

/** Magnetic, premium button — used for primary/secondary CTAs. */
export function Button({
  href,
  children,
  variant = "solid",
  tone = "light",
  className,
  arrow = true,
  onClick,
  type = "button",
}: ButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);

  function onMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }

  const inner = (
    <span
      ref={ref}
      className="inline-flex items-center gap-2 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]"
    >
      {children}
      {arrow && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        >
          <path
            d="M1 7h11M7.5 2.5 12 7l-4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );

  const cls = cn(base, variantClasses(variant, tone), className);

  if (href) {
    return (
      <Link href={href} className={cls} onMouseMove={onMove} onMouseLeave={onLeave}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave}>
      {inner}
    </button>
  );
}
