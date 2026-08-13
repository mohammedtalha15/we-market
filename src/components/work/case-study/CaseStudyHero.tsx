import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { CaseStudyMetrics } from "@/components/work/case-study/CaseStudyMetrics";
import type { CaseStudy } from "@/lib/data/caseStudies";
import type { Project } from "@/lib/data/projects";
import { projectIndex } from "@/lib/work";

type CaseStudyHeroProps = {
  project: Project;
  caseStudy: CaseStudy;
  accent: string;
};

export function CaseStudyHero({ project, caseStudy, accent }: CaseStudyHeroProps) {
  const index = projectIndex(project.slug);

  return (
    <section className="relative overflow-hidden bg-greenblack pt-36 pb-16 text-fg-onDark md:pt-44 md:pb-24">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-24 h-[26rem] w-[26rem] rounded-full opacity-[0.14] blur-3xl"
        style={{ background: accent }}
      />
      <Container className="relative">
        <Reveal>
          <Link
            href="/work"
            className="link-sweep inline-flex items-center gap-2 text-sm text-fg-onDark-muted hover:text-white"
          >
            ← All work
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="min-w-0">
            <Reveal delay={60}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em]">
                <span className="font-mono text-fg-onDark-muted">
                  Case study {String(index).padStart(2, "0")}
                </span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-line-onDark-strong" />
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full"
                    style={{ background: accent }}
                  />
                  <span style={{ color: accent }}>{project.industry}</span>
                </span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.12em] text-fg-onDark-muted">
                {project.client}
              </p>
              <h1 className="mt-3 font-display text-[length:var(--text-display)] font-extrabold leading-[0.95] tracking-tight text-white">
                {caseStudy.title}
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-fg-onDark-muted">
                {caseStudy.summary}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-2">
                {caseStudy.servicesDelivered.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line-onDark px-3 py-1.5 text-[0.72rem] font-semibold tracking-tight text-fg-onDark-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>

            {caseStudy.metrics.length > 0 && (
              <Reveal delay={300} className="mt-10 border-t border-line-onDark pt-8">
                <CaseStudyMetrics metrics={caseStudy.metrics} accent={accent} compact />
              </Reveal>
            )}
          </div>

          <Reveal delay={160} className="min-w-0">
            <ProjectVisual
              project={project}
              accent={accent}
              imageSrc={caseStudy.heroImage}
              aspect="hero"
              priority
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
