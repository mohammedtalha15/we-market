import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import { industries } from "@/lib/data/industries";
import { cn } from "@/lib/utils";

function monogram(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function accentFor(industrySlug: string) {
  return industries.find((i) => i.slug === industrySlug)?.accent ?? "#74e6bf";
}

/**
 * Project card. Uses a real image when `project.image` is set, otherwise an
 * honest, on-brand placeholder canvas (monogram + label). Never fake stock.
 */
export function ProjectCard({
  project,
  size = "default",
}: {
  project: Project;
  size?: "default" | "large";
}) {
  const large = size === "large";
  const accent = accentFor(project.industrySlug);
  return (
    <Link
      href={`/work/${project.slug}`}
      style={{ ["--accent" as string]: accent }}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-colors hover:[border-color:var(--accent)]"
    >
      {/* visual */}
      <div
        className={cn(
          "relative overflow-hidden bg-ink",
          large ? "aspect-[16/10]" : "aspect-[16/11]",
        )}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.client} — ${project.industry} project`}
            fill
            sizes={large ? "(min-width:1024px) 60vw, 100vw" : "(min-width:1024px) 40vw, 100vw"}
            className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.04]"
          />
        ) : (
          <Placeholder name={project.client} accent={accent} />
        )}

        {project.result && (
          <span
            className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[0.72rem] font-bold tracking-tight text-ink accent-bg"
          >
            {project.result}
          </span>
        )}
      </div>

      {/* meta */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em]">
          <span aria-hidden className="h-2 w-2 rounded-full accent-bg" />
          <span className="text-fg-muted">{project.industry}</span>
        </div>
        <h3
          className={cn(
            "font-display font-extrabold tracking-tight text-fg",
            large ? "text-3xl md:text-4xl" : "text-2xl",
          )}
        >
          {project.client}
        </h3>
        <p className="text-[0.92rem] leading-snug text-fg-muted">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          {project.services.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line px-2.5 py-1 text-[0.72rem] text-fg-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function Placeholder({ name, accent }: { name: string; accent: string }) {
  return (
    <div className="absolute inset-0 bg-forest">
      {/* oversized ghost monogram — editorial, colourful, no grid */}
      <span
        aria-hidden
        className="absolute -right-4 -top-10 select-none font-display text-[13rem] font-extrabold leading-none opacity-25 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105"
        style={{ color: accent }}
      >
        {monogram(name)}
      </span>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 12% 110%, ${accent}22, transparent 55%)`,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-5">
        <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: accent }} />
        <span className="eyebrow text-fg-onDark-muted">Case study · preview</span>
      </div>
    </div>
  );
}
