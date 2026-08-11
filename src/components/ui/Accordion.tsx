"use client";

import { useState } from "react";
import type { Faq } from "@/lib/data/content";
import { cn } from "@/lib/utils";

export function Accordion({ items, tone = "light" }: { items: Faq[]; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);
  const dark = tone === "dark";

  return (
    <div className={cn("border-t", dark ? "border-line-onDark" : "border-line")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={cn("border-b", dark ? "border-line-onDark" : "border-line")}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span
                className={cn(
                  "text-[1.15rem] font-bold tracking-tight transition-colors md:text-[1.35rem]",
                  dark ? "text-white" : "text-fg",
                  isOpen && (dark ? "text-mint" : "text-teal"),
                )}
              >
                {item.q}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
                  dark ? "border-line-onDark-strong text-fg-onDark" : "border-line-strong text-fg",
                )}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  className={cn("transition-transform duration-300", isOpen && "rotate-45")}
                  aria-hidden
                >
                  <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-500 [transition-timing-function:var(--ease-out-expo)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0">
                <p
                  className={cn(
                    "max-w-2xl pb-7 text-[1rem] leading-relaxed",
                    dark ? "text-fg-onDark-muted" : "text-fg-muted",
                  )}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
