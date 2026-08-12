"use client";

import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/** Footer CTA band — hidden on /contact to avoid redundant loops. */
export function FooterCtaBand() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <Container className="border-b border-line-onDark py-16 md:py-24">
      <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow text-fg-onDark-muted">Have a growth goal in mind?</p>
          <h2 className="mt-5 font-display text-[length:var(--text-h1)] font-extrabold text-white">
            Tell us where you want to grow.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" tone="dark" variant="solid">
            Start a Project
          </Button>
          <Button href="/contact" tone="dark" variant="outline">
            Talk to an Expert
          </Button>
        </div>
      </div>
    </Container>
  );
}
