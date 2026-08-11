import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FinalCta } from "@/components/home/FinalCta";
import { projects } from "@/lib/data/projects";
import { industries } from "@/lib/data/industries";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.client} — ${project.industry} Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const accent = industries.find((i) => i.slug === project.industrySlug)?.accent ?? "#74e6bf";
  const related = projects
    .filter((p) => p.industrySlug === project.industrySlug && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest pt-36 pb-16 text-fg-onDark md:pt-44 md:pb-20">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-24 h-[26rem] w-[26rem] rounded-full opacity-[0.16] blur-3xl"
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
          <Reveal delay={80}>
            <span className="mt-8 flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em]">
              <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: accent }} />
              <span style={{ color: accent }}>{project.industry}</span>
            </span>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="mt-5 font-display text-[length:var(--text-display)] font-extrabold text-white">
              {project.client}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-fg-onDark-muted">
              {project.description}
            </p>
          </Reveal>
          {project.result && (
            <Reveal delay={260}>
              <div className="mt-10 inline-flex items-baseline gap-3 border-t border-line-onDark pt-8">
                <span
                  className="font-display text-[clamp(2.5rem,1.5rem+4vw,4.5rem)] font-extrabold leading-none"
                  style={{ color: accent }}
                >
                  {project.result}
                </span>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Scope */}
      <section className="bg-paper py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="eyebrow text-fg-muted">Scope of work</h2>
            <p className="mt-6 font-display text-[length:var(--text-h3)] font-extrabold text-fg">
              What we delivered.
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
                    className="h-2 w-2 rounded-full"
                    style={{ background: accent }}
                  />
                  <span className="text-lg font-bold tracking-tight text-fg">{s}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-ink py-20 text-fg-onDark md:py-28">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-[length:var(--text-h2)] font-extrabold text-white">
                More {project.industry.toLowerCase()} work.
              </h2>
              <Button href="/work" tone="dark" variant="outline" className="hidden shrink-0 sm:inline-flex">
                View all
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <FinalCta />
    </>
  );
}
