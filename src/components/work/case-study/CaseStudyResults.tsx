import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyMetrics } from "@/components/work/case-study/CaseStudyMetrics";
import type { CaseStudy } from "@/lib/data/caseStudies";

type CaseStudyResultsProps = {
  caseStudy: CaseStudy;
  accent: string;
};

export function CaseStudyResults({ caseStudy, accent }: CaseStudyResultsProps) {
  return (
    <section className="bg-forest py-20 text-fg-onDark md:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="eyebrow text-fg-onDark-muted">Results</h2>
            <p className="mt-6 font-display text-[length:var(--text-h2)] font-extrabold text-white">
              Outcomes that <span style={{ color: accent }}>matter.</span>
            </p>
            <p className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-fg-onDark-muted">
              {caseStudy.results}
            </p>
          </Reveal>

          {caseStudy.metrics.length > 0 && (
            <CaseStudyMetrics metrics={caseStudy.metrics} accent={accent} tone="dark" />
          )}
        </div>

        {caseStudy.qualitativeOutcomes && caseStudy.qualitativeOutcomes.length > 0 && (
          <Reveal delay={120} className="mt-16 border-t border-line-onDark pt-12">
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {caseStudy.qualitativeOutcomes.map((outcome, i) => (
                <li
                  key={i}
                  className="flex gap-4 text-[0.95rem] leading-relaxed text-fg-onDark-muted"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: accent }}
                  />
                  {outcome}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
