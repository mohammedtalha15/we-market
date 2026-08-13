import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudy } from "@/lib/data/caseStudies";

type CaseStudyNarrativeProps = {
  caseStudy: CaseStudy;
  accent: string;
};

export function CaseStudyNarrative({ caseStudy, accent }: CaseStudyNarrativeProps) {
  return (
    <section className="bg-paper py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="eyebrow text-fg-muted">Context / challenge</h2>
              <p className="mt-6 font-display text-[length:var(--text-h2)] font-extrabold text-fg">
                Where we <span style={{ color: accent }}>started.</span>
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-12 lg:col-span-7">
            {caseStudy.businessContext && (
              <Reveal delay={80}>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-fg-muted">
                    Business context
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-fg">{caseStudy.businessContext}</p>
                </div>
              </Reveal>
            )}

            <Reveal delay={120}>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-fg-muted">
                  The challenge
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-fg">{caseStudy.challenge}</p>
              </div>
            </Reveal>

            {caseStudy.objectives.length > 0 && (
              <Reveal delay={160}>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-fg-muted">
                    Objectives
                  </h3>
                  <ul className="mt-6 flex flex-col gap-4">
                    {caseStudy.objectives.map((obj, i) => (
                      <li key={i} className="flex gap-4 border-b border-line pb-4">
                        <span className="font-mono text-sm text-fg-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-lg font-medium leading-snug text-fg">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
