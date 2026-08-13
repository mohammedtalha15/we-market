import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { CaseStudyRelatedWork } from "@/components/work/case-study/CaseStudyRelatedWork";
import type { Project } from "@/lib/data/projects";
import { projectIndex } from "@/lib/work";

type ProjectLightweightPageProps = {
  project: Project;
  accent: string;
  related: Project[];
};

export function ProjectLightweightPage({
  project,
  accent,
  related,
}: ProjectLightweightPageProps) {
  const index = projectIndex(project.slug);

  return (
    <>
      {/* Hero — forest / green-black editorial */}
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

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="min-w-0">
              <Reveal delay={60}>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em]">
                  <span className="font-mono text-fg-onDark-muted">
                    {String(index).padStart(2, "0")}
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
                <h1 className="mt-5 font-display text-[length:var(--text-display)] font-extrabold leading-[0.95] tracking-tight text-white">
                  {project.client}
                </h1>
              </Reveal>

              <Reveal delay={180}>
                <p className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-fg-onDark-muted">
                  {project.description}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line-onDark px-3 py-1.5 text-[0.72rem] font-semibold tracking-tight text-fg-onDark-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Reveal>

              {project.result && (
                <Reveal delay={300}>
                  <div className="mt-10 border-t border-line-onDark pt-8">
                    <span className="eyebrow text-fg-onDark-muted">Verified result</span>
                    <p
                      className="mt-3 font-display text-[clamp(2rem,1.25rem+3.5vw,3.75rem)] font-extrabold leading-none tracking-tight"
                      style={{ color: accent }}
                    >
                      {project.result}
                    </p>
                  </div>
                </Reveal>
              )}
            </div>

            <Reveal delay={160} className="min-w-0">
              <ProjectVisual project={project} accent={accent} aspect="hero" priority />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Project information */}
      <section className="bg-paper py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <h2 className="eyebrow text-fg-muted">Project information</h2>
            <p className="mt-6 font-display text-[length:var(--text-h3)] font-extrabold text-fg">
              What we delivered.
            </p>
            <p className="mt-4 max-w-md text-fg-muted">
              Scope and services for {project.client} — drawn from verified project records.
            </p>
          </div>
          <ul className="flex flex-col">
            {project.services.map((s, i) => (
              <Reveal key={s} delay={i * 60}>
                <li className="flex items-center gap-4 border-b border-line py-5">
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
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Result / impact — only when verified */}
      {project.result && (
        <section className="bg-forest py-20 text-fg-onDark md:py-28">
          <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-end lg:gap-16">
            <Reveal>
              <h2 className="eyebrow text-fg-onDark-muted">Result / impact</h2>
              <p className="mt-6 font-display text-[length:var(--text-h2)] font-extrabold text-white">
                Outcomes we can <span style={{ color: accent }}>stand behind.</span>
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p
                className="font-display text-[clamp(2.25rem,1.5rem+4vw,4.25rem)] font-extrabold leading-none tracking-tight"
                style={{ color: accent }}
              >
                {project.result}
              </p>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Visual preview — demo when no real asset */}
      {!project.image && (
        <section className="bg-ink py-20 text-fg-onDark md:py-28">
          <Container>
            <Reveal>
              <h2 className="eyebrow text-fg-onDark-muted">Project preview</h2>
              <p className="mt-6 max-w-2xl font-display text-[length:var(--text-h3)] font-extrabold text-white">
                Visual assets for this project are being prepared.
              </p>
              <p className="mt-4 max-w-xl text-fg-onDark-muted">
                The composition below is an editorial placeholder — not a photograph of client
                deliverables. Real campaign and project imagery will replace it when available.
              </p>
            </Reveal>
            <Reveal delay={100} className="mt-12">
              <ProjectVisual project={project} accent={accent} aspect="hero" />
            </Reveal>
          </Container>
        </section>
      )}

      <CaseStudyRelatedWork
        project={project}
        related={related}
        accent={accent}
      />

      <FinalCta />
    </>
  );
}
