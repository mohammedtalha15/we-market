import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MarqueeBand } from "@/components/ui/MarqueeBand";
import { FinalCta } from "@/components/home/FinalCta";
import { pillars } from "@/lib/data/services";
import { inkFor } from "@/lib/accents";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four connected capabilities — Grow, Build, Create, Automate. Digital marketing, web, brand and AI/technology as one growth system.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services / capabilities"
        title={
          <>
            Four capabilities. <span className="text-lime">One growth system.</span>
          </>
        }
        lead="We organise everything we do into four connected pillars — so you can start with one and scale into all of them."
      />

      <MarqueeBand text="Grow · Build · Create · Automate" variant="lime" />

      <section className="bg-paper py-16 md:py-24">
        <Container className="flex flex-col gap-6">
          {pillars.map((p) => (
            <Reveal key={p.id}>
              <Link
                href={`/services/${p.slug}`}
                style={{ ["--accent" as string]: p.accent }}
                className="group grid grid-cols-1 gap-8 overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-8 transition-colors duration-500 hover:[border-color:var(--accent)] md:grid-cols-[auto_1fr_auto] md:items-center md:p-12"
              >
                <span
                  className="font-display text-7xl font-extrabold leading-none md:text-8xl"
                  style={{ color: inkFor(p.accent) }}
                >
                  {p.index}
                </span>
                <div>
                  <h2 className="font-display text-4xl font-extrabold tracking-tight text-fg md:text-5xl">
                    {p.name}
                  </h2>
                  <p
                    className="mt-2 font-display text-xl font-bold tracking-tight md:text-2xl"
                    style={{ color: inkFor(p.accent) }}
                  >
                    {p.statement}
                  </p>
                  <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-fg-muted">
                    {p.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.services.slice(0, 8).map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-line px-3 py-1 text-[0.76rem] text-fg-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <span
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center justify-self-start rounded-full border border-line-strong text-fg transition-all duration-500 group-hover:[border-color:var(--accent)] group-hover:[background-color:var(--accent)] group-hover:text-ink md:justify-self-auto"
                >
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h11M7.5 2.5 12 7l-4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
