import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { JourneyFlow } from "@/components/industries/JourneyFlow";
import { FinalCta } from "@/components/home/FinalCta";
import { industries } from "@/lib/data/industries";
import { projects } from "@/lib/data/projects";
import { testimonials } from "@/lib/data/testimonials";
import { pillars } from "@/lib/data/services";
import { inkFor } from "@/lib/accents";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};
  return { title: `${industry.name} Marketing`, description: industry.description };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  const accent = industry.accent;
  const work = projects.filter((p) => p.industrySlug === industry.slug);
  const quotes = testimonials.filter((t) => t.industry === industry.name);
  const otherIndustries = industries.filter((i) => i.slug !== industry.slug);

  return (
    <>
      <PageHero
        eyebrow={`Industries · ${industry.name}`}
        title={<>{industry.headline}</>}
        lead={industry.description}
        accent={accent}
      />

      {/* Customer journey */}
      <section className="bg-ink py-20 text-fg-onDark md:py-28">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="The customer journey"
            title={
              <>
                How {industry.name.toLowerCase()} customers actually{" "}
                <span style={{ color: accent }}>decide.</span>
              </>
            }
            lead="We build for every step of the journey — not just the click. Here's the path we design around."
          />
          <div className="mt-12">
            <JourneyFlow steps={industry.journey} accent={accent} tone="dark" />
          </div>
        </Container>
      </section>

      {/* Relevant capabilities */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we bring"
            title={<>The capabilities that move this industry.</>}
          />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <Reveal key={p.id}>
                <Link
                  href={`/services/${p.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-[var(--radius-card)] border border-line bg-white p-6 transition-colors hover:border-line-strong"
                >
                  <span
                    className="font-display text-3xl font-extrabold"
                    style={{ color: inkFor(p.accent) }}
                  >
                    {p.index}
                  </span>
                  <span className="text-xl font-extrabold tracking-tight text-fg">{p.name}</span>
                  <span className="text-[0.9rem] leading-snug text-fg-muted">{p.category}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured work */}
      {work.length > 0 && (
        <section className="bg-ink py-20 text-fg-onDark md:py-28">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <SectionHeading
                tone="dark"
                eyebrow="Featured work"
                title={<>{industry.name} work.</>}
              />
              <Button
                href="/work"
                tone="dark"
                variant="outline"
                className="hidden shrink-0 sm:inline-flex"
              >
                All work
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {work.slice(0, 3).map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Testimonials */}
      {quotes.length > 0 && (
        <section className="bg-paper py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {quotes.map((q) => (
                <Reveal key={q.company}>
                  <figure
                    className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-line bg-white p-8"
                    style={{ borderTopColor: accent, borderTopWidth: 3 }}
                  >
                    <blockquote className="text-[1.2rem] font-bold leading-snug tracking-tight text-fg">
                      “{q.quote}”
                    </blockquote>
                    <figcaption className="mt-6 text-sm text-fg-muted">
                      <span className="font-bold text-fg">{q.name}</span> — {q.title}, {q.company}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Other industries */}
      <section className="bg-ink py-16 text-fg-onDark md:py-20">
        <Container>
          <p className="eyebrow text-fg-onDark-muted">Explore other industries</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {otherIndustries.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-line-onDark px-5 py-2.5 text-sm font-semibold text-fg-onDark transition-colors hover:border-white"
                style={{ ["--accent" as string]: i.accent }}
              >
                <span aria-hidden className="h-2 w-2 rounded-full accent-bg" />
                {i.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
