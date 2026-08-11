import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { featuredProjects } from "@/lib/data/projects";

export function FeaturedWork() {
  const [lead, ...rest] = featuredProjects;

  return (
    <section className="bg-ink py-24 text-fg-onDark md:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            tone="dark"
            eyebrow="Featured work"
            title={
              <>
                Work that <span className="text-lime">moves business.</span>
              </>
            }
          />
          <Reveal delay={160}>
            <Button href="/work" tone="dark" variant="outline" className="shrink-0">
              View All Work
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            {lead && <ProjectCard project={lead} size="large" />}
          </Reveal>
          <div className="flex flex-col gap-6 lg:col-span-5">
            {rest.slice(0, 1).map((p) => (
              <Reveal key={p.slug} delay={80}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
          {rest.slice(1).map((p, i) => (
            <Reveal key={p.slug} delay={i * 80} className="lg:col-span-6">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
