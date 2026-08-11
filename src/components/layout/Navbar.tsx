"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { primaryNav } from "@/lib/data/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { ServicesMega, IndustriesMega } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<"services" | "industries" | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function openMega(m: "services" | "industries") {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(m);
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMega(null), 140);
  }

  // At the very top (over the dark hero) the bar is transparent → use light text.
  // Once scrolled or a mega panel opens, the bar goes to a light surface → dark text.
  const onDark = !scrolled && !activeMega;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[65] transition-[background,border-color,backdrop-filter] duration-500",
          scrolled || activeMega
            ? "border-b border-line bg-paper/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
        onMouseLeave={scheduleClose}
      >
        <Container className="flex h-[72px] items-center justify-between gap-6">
          <Logo tone={onDark ? "dark" : "light"} />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => {
              const hasMega = Boolean(item.mega);
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => (hasMega ? openMega(item.mega!) : setActiveMega(null))}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.92rem] font-medium tracking-tight transition-colors",
                      onDark
                        ? "text-fg-onDark hover:text-mint"
                        : "text-fg hover:text-teal",
                      activeMega === item.mega && (onDark ? "text-mint" : "text-teal"),
                    )}
                    aria-expanded={hasMega ? activeMega === item.mega : undefined}
                  >
                    {item.label}
                    {hasMega && (
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 10 10"
                        className={cn(
                          "mt-0.5 opacity-50 transition-transform duration-300",
                          activeMega === item.mega && "rotate-180",
                        )}
                        aria-hidden
                      >
                        <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
                      </svg>
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                "hidden items-center gap-2 rounded-full px-5 py-2.5 text-[0.9rem] font-semibold transition-colors lg:inline-flex",
                onDark
                  ? "bg-mint text-ink hover:bg-mint-bright"
                  : "bg-ink text-white hover:bg-teal",
              )}
            >
              Let&apos;s Talk
              <span aria-hidden>→</span>
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border lg:hidden",
                onDark ? "border-line-onDark-strong" : "border-line-strong",
              )}
            >
              <span className="flex flex-col gap-[5px]">
                <span className={cn("block h-[1.5px] w-5", onDark ? "bg-white" : "bg-ink")} />
                <span className={cn("block h-[1.5px] w-5", onDark ? "bg-white" : "bg-ink")} />
              </span>
            </button>
          </div>
        </Container>

        {/* Mega panel */}
        <div
          className={cn(
            "absolute inset-x-0 top-full hidden origin-top overflow-hidden lg:block",
            activeMega
              ? "pointer-events-auto"
              : "pointer-events-none",
          )}
          onMouseEnter={() => activeMega && openMega(activeMega)}
          onMouseLeave={scheduleClose}
        >
          <div
            className={cn(
              "border-b border-line bg-paper/95 backdrop-blur-xl transition-[opacity,transform] duration-300 [transition-timing-function:var(--ease-out-expo)]",
              activeMega ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
            )}
          >
            <Container className="py-10">
              {activeMega === "services" && <ServicesMega onNavigate={() => setActiveMega(null)} />}
              {activeMega === "industries" && (
                <IndustriesMega onNavigate={() => setActiveMega(null)} />
              )}
            </Container>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
