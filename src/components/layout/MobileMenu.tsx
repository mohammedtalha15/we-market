"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav, site } from "@/lib/data/site";
import { pillars } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] flex flex-col bg-ink text-fg-onDark transition-[opacity,visibility] duration-500 lg:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="flex items-center justify-between px-[var(--spacing-gutter)] py-5">
        <span className="text-lg font-extrabold tracking-tight">
          We<span className="text-mint">Market</span>
        </span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line-onDark-strong text-fg-onDark"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
            <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-[var(--spacing-gutter)] py-6">
        {primaryNav.map((item, i) => {
          const isMega = item.mega;
          const isOpen = expanded === item.label;
          return (
            <div key={item.label} className="border-b border-line-onDark">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="py-4 text-3xl font-extrabold tracking-tight"
                >
                  <span className="mr-3 align-middle font-mono text-xs text-mint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
                {isMega && (
                  <button
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    aria-label={`Toggle ${item.label}`}
                    aria-expanded={isOpen}
                    className="flex h-10 w-10 items-center justify-center text-mint"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      className={cn("transition-transform", isOpen && "rotate-45")}
                      aria-hidden
                    >
                      <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </button>
                )}
              </div>
              {isMega && (
                <div
                  className={cn(
                    "grid overflow-hidden transition-[grid-template-rows] duration-500",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <ul className="flex min-h-0 flex-col gap-2 overflow-hidden pb-5">
                    {(item.mega === "services" ? pillars : industries).map((entry) => (
                      <li key={entry.slug ?? entry.name}>
                        <Link
                          href={
                            item.mega === "services"
                              ? `/services/${(entry as { slug: string }).slug}`
                              : `/industries/${(entry as { slug: string }).slug}`
                          }
                          onClick={onClose}
                          className="block py-1.5 text-base text-fg-onDark-muted"
                        >
                          {entry.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="flex flex-col gap-4 border-t border-line-onDark px-[var(--spacing-gutter)] py-6">
        <Button href="/contact" tone="dark" variant="solid" className="w-full" onClick={onClose}>
          Let&apos;s Talk
        </Button>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-fg-onDark-muted">
          <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phone}</a>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </div>
      </div>
    </div>
  );
}
