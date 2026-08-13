import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import { WorkImage } from "@/components/work/WorkImage";
import { cn } from "@/lib/utils";

type ProjectVisualProps = {
  project: Project;
  accent: string;
  imageSrc?: string | null;
  className?: string;
  aspect?: "hero" | "card" | "gallery";
  priority?: boolean;
};

const aspectClass = {
  hero: "aspect-[16/10] md:aspect-[16/9]",
  card: "aspect-[16/11]",
  gallery: "aspect-[16/10]",
} as const;

/**
 * Real project imagery when available; otherwise the honest demo visual system.
 * Demo visuals are always labelled — never presented as client deliverables.
 */
export function ProjectVisual({
  project,
  accent,
  imageSrc,
  className,
  aspect = "hero",
  priority = false,
}: ProjectVisualProps) {
  const src = imageSrc ?? project.image;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-card)] bg-ink",
        aspectClass[aspect],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={`${project.client} — ${project.industry} project`}
          fill
          priority={priority}
          sizes="(min-width:1024px) 55vw, 100vw"
          className="object-cover"
          data-cursor="image"
        />
      ) : (
        <>
          <WorkImage
            project={project}
            accent={accent}
            className="absolute inset-0 h-full w-full"
          />
          <span className="absolute bottom-4 left-4 z-10 rounded-full border border-line-onDark bg-greenblack/80 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-fg-onDark-muted backdrop-blur-sm">
            Preview visual — not client photography
          </span>
        </>
      )}
    </div>
  );
}
