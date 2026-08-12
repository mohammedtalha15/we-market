"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/data/projects";
import { industries } from "@/lib/data/industries";
import { WorkImage } from "./WorkImage";
import { cn } from "@/lib/utils";

function accentFor(slug: string) {
  return industries.find((i) => i.slug === slug)?.accent ?? "#74e6bf";
}

/**
 * Editorial project list with a spring/inertial cursor-following preview.
 * Hovering a row reveals its (demo) image near the cursor, lagging slightly
 * behind, and the row's own metadata brightens. Fine-pointer only; on touch it
 * degrades to a plain tap-through list. Reduced-motion snaps instead of springs.
 */
export function FeaturedWorkList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [interactive, setInteractive] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<number | null>(null);
  const state = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const setActiveBoth = (i: number | null) => {
    activeRef.current = i;
    setActive(i);
  };

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setInteractive(true);

    const s = state.current;
    s.x = s.tx = window.innerWidth / 2;
    s.y = s.ty = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => {
      s.tx = e.clientX;
      s.ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      const k = reduce ? 1 : 0.12;
      const prevX = s.x;
      s.x += (s.tx - s.x) * k;
      s.y += (s.ty - s.y) * k;
      const el = previewRef.current;
      if (el) {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        let x = s.x + 28;
        let y = s.y - h / 2;
        x = Math.min(x, window.innerWidth - w - 16);
        y = Math.min(Math.max(y, 16), window.innerHeight - h - 16);
        const vel = reduce ? 0 : Math.max(-8, Math.min(8, (s.x - prevX) * 0.5));
        const scale = activeRef.current != null ? 1 : 0.86;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${vel}deg) scale(${scale})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const activeProject = active != null ? projects[active] : null;
  const activeAccent = activeProject ? accentFor(activeProject.industrySlug) : "#74e6bf";

  return (
    <div onMouseLeave={() => setActiveBoth(null)}>
      <ul className="border-t border-line-onDark">
        {projects.map((project, i) => {
          const a = accentFor(project.industrySlug);
          const isActive = active === i;
          // Concise lead metric only, e.g. "1,450 leads", "5× growth"
          const metric = project.result?.split("·")[0].split(" in ")[0].trim();
          return (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                onMouseEnter={() => setActiveBoth(i)}
                onFocus={() => setActiveBoth(i)}
                style={{ ["--accent" as string]: a }}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 overflow-hidden border-b border-line-onDark py-7 md:gap-10 md:py-9"
              >
                {/* accent wash grows from the left on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 -z-0 w-0 opacity-[0.09] transition-[width] duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:w-full accent-bg"
                />

                {/* index */}
                <span
                  className="relative font-mono text-xs transition-colors duration-300"
                  style={{ color: isActive ? a : "var(--color-fg-onDark-muted)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* name + metadata */}
                <span className="relative flex min-w-0 flex-col gap-2">
                  <span
                    className={cn(
                      "font-display text-[clamp(1.75rem,1rem+3vw,3.5rem)] font-extrabold leading-[0.98] tracking-tight transition-[color,transform] duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:md:translate-x-2",
                      isActive ? "text-fg-onDark" : "text-fg-onDark-muted",
                    )}
                  >
                    {project.client}
                  </span>
                  <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-fg-onDark-muted">
                    <span style={{ color: isActive ? a : undefined }}>{project.industry}</span>
                    <span aria-hidden className="opacity-40">/</span>
                    <span>{project.services.slice(0, 3).join(" · ")}</span>
                  </span>
                </span>

                {/* metric + arrow */}
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
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500"
                    style={
                      isActive
                        ? { borderColor: a, background: a, color: "var(--color-greenblack)" }
                        : { borderColor: "rgba(255,255,255,0.2)", color: "var(--color-fg-onDark)" }
                    }
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

      {/* spring-following preview (fine-pointer only) */}
      {interactive && (
        <div
          ref={previewRef}
          aria-hidden
          className={cn(
            "pointer-events-none fixed left-0 top-0 z-40 h-[300px] w-[380px] overflow-hidden rounded-xl border border-line-onDark shadow-[0_30px_80px_-30px_rgba(0,0,0,0.75)] transition-opacity duration-300",
            activeProject ? "opacity-100" : "opacity-0",
          )}
          style={{ willChange: "transform" }}
        >
          {activeProject &&
            (activeProject.image ? (
              <Image src={activeProject.image} alt="" fill sizes="380px" className="object-cover" />
            ) : (
              <WorkImage project={activeProject} accent={activeAccent} className="h-full w-full" />
            ))}
          {activeProject && (
            <span
              className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-greenblack"
              style={{ background: activeAccent }}
            >
              View project →
            </span>
          )}
        </div>
      )}
    </div>
  );
}
