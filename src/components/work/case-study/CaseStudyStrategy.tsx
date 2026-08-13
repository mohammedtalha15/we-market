import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudy } from "@/lib/data/caseStudies";

type CaseStudyStrategyProps = {
  caseStudy: CaseStudy;
  accent: string;
};

export function CaseStudyStrategy({ caseStudy, accent }: CaseStudyStrategyProps) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-fg-onDark md:py-28">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-[20rem] w-[20rem] -translate-y-1/2 rounded-full opacity-[0.12] blur-3xl"
        style={{ background: accent }}
      />
      <Container className="relative">
        <Reveal>
          <h2 className="eyebrow text-fg-onDark-muted">Strategy</h2>
        </Reveal>
        <Reveal delay={100}>
          <p
            className="mt-8 max-w-5xl font-display text-[clamp(1.75rem,1rem+3vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-white"
          >
            {caseStudy.strategy.split(/(?<=[.!?])\s+/)[0]}
          </p>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-10 max-w-3xl text-[length:var(--text-lead)] leading-relaxed text-fg-onDark-muted">
            {caseStudy.strategy}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
