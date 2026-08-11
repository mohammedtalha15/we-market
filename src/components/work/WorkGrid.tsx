"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, projectFilters } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export function WorkGrid() {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter(
      (p) => p.industrySlug === active || p.tags.includes(active),
    );
  }, [active]);

  return (
    <div>
      {/* filter bar */}
      <div className="no-scrollbar -mx-[var(--spacing-gutter)] flex gap-2 overflow-x-auto px-[var(--spacing-gutter)] pb-2">
        {projectFilters.map((f) => {
          const isActive = active === f.value;
          return (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              aria-pressed={isActive}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold tracking-tight transition-colors",
                isActive
                  ? "border-forest bg-forest text-white"
                  : "border-line-strong text-fg-muted hover:border-forest hover:text-fg",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* count */}
      <p className="mt-6 text-sm text-fg-muted">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>

      {/* grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-line bg-white p-10">
          <p className="text-lg font-bold tracking-tight text-fg">
            Work in this category is on the way.
          </p>
          <p className="max-w-md text-fg-muted">
            We&apos;re curating case studies for this filter. In the meantime, explore our other
            work or start a conversation about your project.
          </p>
        </div>
      )}
    </div>
  );
}
