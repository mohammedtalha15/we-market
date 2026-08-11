import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MarqueeBand } from "@/components/ui/MarqueeBand";
import { FinalCta } from "@/components/home/FinalCta";
import { industries } from "@/lib/data/industries";
import { inkFor } from "@/lib/accents";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "We build strategies around how your industry actually works — real estate, education, healthcare, interior & architecture, corporate & professional.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            We don&apos;t market to everyone <span className="text-lime">the same way.</span>
          </>
        }
        lead="Different industries have different customers, buying journeys and growth challenges. We build strategies around how your industry actually works."
      />

      <MarqueeBand text="Built for your industry" variant="lime" />

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {industries.map((ind) => (
              <Reveal key={ind.slug}>
                <Link
                  href={`/industries/${ind.slug}`}
                  style={{ ["--accent" as string]: ind.accent }}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-8 transition-colors duration-500 hover:[border-color:var(--accent)] md:p-10"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40 accent-bg"
                  />
                  <div className="relative flex items-start justify-between">
                    <span
                      className="font-display text-6xl font-extrabold leading-none md:text-7xl"
                      style={{ color: inkFor(ind.accent) }}
                    >
                      {ind.index}
                    </span>
                    <span
                      aria-hidden
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-fg transition-all duration-500 group-hover:[border-color:var(--accent)] group-hover:[background-color:var(--accent)] group-hover:text-ink"
                    >
                      <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M1 7h11M7.5 2.5 12 7l-4.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="relative mt-12">
                    <h2 className="font-display text-[clamp(1.8rem,1rem+2.4vw,2.75rem)] font-extrabold tracking-tight text-fg">
                      {ind.name}
                    </h2>
                    <p className="mt-3 max-w-md text-[1rem] leading-relaxed text-fg-muted">
                      {ind.headline}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
