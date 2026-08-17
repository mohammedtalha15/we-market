import Link from "next/link";
import type { Project } from "@/lib/data/projects";
import { industries } from "@/lib/data/industries";

function accentFor(slug: string) {
  return industries.find((i) => i.slug === slug)?.accent ?? "#74e6bf";
}

/** Editorial project list — static rows, no hover preview. */
export function FeaturedWorkList({ projects }: { projects: Project[] }) {
  return (
    <ul className="border-t border-line-onDark">
      {projects.map((project, i) => {
        const a = accentFor(project.industrySlug);
        const metric = project.result?.split("·")[0].split(" in ")[0].trim();
        return (
          <li key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              style={{ ["--accent" as string]: a }}
              className="relative grid grid-cols-[auto_1fr_auto] items-center gap-5 overflow-hidden border-b border-line-onDark py-7 md:gap-10 md:py-9"
            >
              <span className="relative font-mono text-xs text-fg-onDark-muted">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="relative flex min-w-0 flex-col gap-2">
                <span className="font-display text-[clamp(1.75rem,1rem+3vw,3.5rem)] font-extrabold leading-[0.98] tracking-tight text-fg-onDark">
                  {project.client}
                </span>
                <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-fg-onDark-muted">
                  <span>{project.industry}</span>
                  <span aria-hidden className="opacity-40">
                    /
                  </span>
                  <span>{project.services.slice(0, 3).join(" · ")}</span>
                </span>
              </span>

              <span className="relative flex items-center gap-5 md:gap-8">
                {metric && (
                  <span
                    className="hidden text-right font-display text-lg font-extrabold tracking-tight md:block md:text-2xl"
                    style={{ color: a }}
                  >
                    {metric}
                  </span>
                )}
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-onDark-strong text-fg-onDark"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h11M7.5 2.5 12 7l-4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
