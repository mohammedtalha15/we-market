import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudy } from "@/lib/data/caseStudies";
import { pillars } from "@/lib/data/services";
import { inkFor } from "@/lib/accents";

type CaseStudyExecutionProps = {
  caseStudy: CaseStudy;
  accent: string;
};

export function CaseStudyExecution({ caseStudy, accent }: CaseStudyExecutionProps) {
  const linkedPillars = caseStudy.servicePillarSlugs
    ? pillars.filter((p) => caseStudy.servicePillarSlugs!.includes(p.slug))
    : [];

  const hasTechnology = caseStudy.technology && caseStudy.technology.length > 0;
  const hasAi = Boolean(caseStudy.aiUsage?.trim());

  return (
    <section className="bg-paper py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="eyebrow text-fg-muted">Execution</h2>
              <p className="mt-6 font-display text-[length:var(--text-h2)] font-extrabold text-fg">
                What WeMarket delivered.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-12 lg:col-span-8">
            <Reveal delay={80}>
              <p className="text-lg leading-relaxed text-fg">{caseStudy.execution}</p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="flex flex-col">
                {caseStudy.servicesDelivered.map((s, i) => (
                  <li key={s} className="flex items-center gap-4 border-b border-line py-5">
                    <span className="font-mono text-sm text-fg-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: accent }}
                    />
                    <span className="text-lg font-bold tracking-tight text-fg">{s}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {linkedPillars.length > 0 && (
              <Reveal delay={160}>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-fg-muted">
                    Capability pillars
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {linkedPillars.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/services/${p.slug}`}
                        className="rounded-full border border-line px-4 py-2 text-sm font-semibold transition-colors hover:border-forest hover:text-forest"
                        style={{ color: inkFor(p.accent) }}
                      >
                        {p.category}
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {hasTechnology && (
              <Reveal delay={200}>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-fg-muted">
                    Technology
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {caseStudy.technology!.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-white px-3 py-1.5 text-sm text-fg-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {hasAi && (
              <Reveal delay={240}>
                <div className="rounded-[var(--radius-card)] border border-line bg-white p-8">
                  <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-fg-muted">
                    AI in this engagement
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-fg">{caseStudy.aiUsage}</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
