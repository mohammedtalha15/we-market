import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FeaturedWorkList } from "@/components/work/FeaturedWorkList";
import { projects } from "@/lib/data/projects";

function bySlug(slug: string) {
  return projects.find((p) => p.slug === slug)!;
}

// Curated editorial list — every project in the same format, metric-forward.
const showcase = [
  "amba-constructions",
  "aadya-academy",
  "healius",
  "knowledge-plant-academy",
].map(bySlug);

export function FeaturedWork() {
  return (
    <section className="bg-greenblack py-24 text-fg-onDark md:py-32">
      <Container>
        {/* Header — 12-col editorial grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow tone="dark">Selected work</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[length:var(--text-h2)] font-extrabold text-fg-onDark">
                Work that <span className="text-lime">moves business.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-fg-onDark-muted">
                A curated look at brands we&apos;ve helped get discovered, earn trust and grow —
                across industries and channels.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Reveal delay={200}>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full border border-line-onDark-strong px-6 py-3 text-[0.9rem] font-semibold text-fg-onDark transition-colors hover:border-lime hover:text-lime"
              >
                View all work
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Unified editorial list */}
        <Reveal>
          <div className="mt-14 lg:mt-16">
            <FeaturedWorkList projects={showcase} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
