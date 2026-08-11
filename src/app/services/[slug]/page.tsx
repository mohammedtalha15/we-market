import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinalCta } from "@/components/home/FinalCta";
import { pillars } from "@/lib/data/services";
import { processSteps } from "@/lib/data/content";
import { inkFor } from "@/lib/accents";

export function generateStaticParams() {
  return pillars.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pillar = pillars.find((p) => p.slug === slug);
  if (!pillar) return {};
  return { title: `${pillar.name} — ${pillar.category}`, description: pillar.description };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pillar = pillars.find((p) => p.slug === slug);
  if (!pillar) notFound();

  const accent = pillar.accent;
  const others = pillars.filter((p) => p.slug !== pillar.slug);

  return (
    <>
      <PageHero
        eyebrow={`${pillar.index} · ${pillar.category}`}
        title={
          <>
            {pillar.name}.{" "}
            <span style={{ color: accent }}>{pillar.statement}</span>
          </>
        }
        lead={pillar.description}
        accent={accent}
      />

      {/* Services list */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="What's included" title={<>Everything under {pillar.name}.</>} />
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {pillar.services.map((s, i) => (
              <Reveal key={s} delay={(i % 3) * 60} className="bg-paper">
                <div className="group flex h-full items-center gap-4 bg-paper p-6 transition-colors hover:bg-white">
                  <span className="font-mono text-sm text-fg-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-150"
                    style={{ background: accent }}
                  />
                  <span className="text-[1.05rem] font-bold tracking-tight text-fg">{s}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-ink py-20 text-fg-onDark md:py-28">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="How we work"
            title={
              <>
                From business problem to{" "}
                <span style={{ color: accent }}>business outcome.</span>
              </>
            }
          />
          <div className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => (
              <Reveal key={step.index} delay={(i % 3) * 70}>
                <div className="flex gap-5 border-t border-line-onDark py-7">
                  <span className="font-display text-3xl font-extrabold text-fg-onDark-muted/40">
                    {step.index}
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-white">{step.title}</h3>
                    <p className="mt-2 text-[0.88rem] leading-snug text-fg-onDark-muted">
                      {step.items.join(" · ")}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Other pillars */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Explore more" title={<>The rest of the system.</>} />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {others.map((p) => (
              <Reveal key={p.id}>
                <Link
                  href={`/services/${p.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-line bg-white p-6 transition-colors hover:border-line-strong"
                >
                  <span>
                    <span
                      className="block font-display text-2xl font-extrabold"
                      style={{ color: inkFor(p.accent) }}
                    >
                      {p.name}
                    </span>
                    <span className="text-[0.85rem] text-fg-muted">{p.category}</span>
                  </span>
                  <span aria-hidden className="text-fg-muted transition-transform group-hover:translate-x-1">
                    →
                  </span>
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
