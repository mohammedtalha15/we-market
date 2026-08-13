import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudyTimelineEntry } from "@/lib/data/caseStudies";

type CaseStudyTimelineProps = {
  timeline: CaseStudyTimelineEntry[];
  accent: string;
};

export function CaseStudyTimeline({ timeline, accent }: CaseStudyTimelineProps) {
  if (timeline.length === 0) return null;

  return (
    <section className="bg-ink py-20 text-fg-onDark md:py-28">
      <Container>
        <Reveal>
          <h2 className="eyebrow text-fg-onDark-muted">Timeline</h2>
          <p className="mt-6 font-display text-[length:var(--text-h3)] font-extrabold text-white">
            How the engagement unfolded.
          </p>
        </Reveal>

        <ol className="mt-12 flex flex-col">
          {timeline.map((entry, i) => (
            <Reveal key={`${entry.phase}-${i}`} delay={i * 80}>
              <li className="grid grid-cols-1 gap-4 border-t border-line-onDark py-8 md:grid-cols-[200px_1fr] md:gap-10">
                <div>
                  <span
                    className="font-display text-xl font-extrabold tracking-tight"
                    style={{ color: accent }}
                  >
                    {entry.phase}
                  </span>
                  {entry.period && (
                    <span className="mt-1 block font-mono text-sm text-fg-onDark-muted">
                      {entry.period}
                    </span>
                  )}
                </div>
                <p className="text-lg leading-relaxed text-fg-onDark-muted">{entry.summary}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
