import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Project } from "@/lib/data/projects";

type CaseStudyRelatedWorkProps = {
  project: Project;
  related: Project[];
  accent?: string;
};

export function CaseStudyRelatedWork({
  project,
  related,
}: CaseStudyRelatedWorkProps) {
  if (related.length === 0) return null;

  return (
    <section className="bg-ink py-20 text-fg-onDark md:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl font-display text-[length:var(--text-h2)] font-extrabold text-white">
            More {project.industry.toLowerCase()} work.
          </h2>
          <Button
            href="/work"
            tone="dark"
            variant="outline"
            className="hidden shrink-0 sm:inline-flex"
          >
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
  );
}
