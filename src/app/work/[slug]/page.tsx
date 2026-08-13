import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/work/case-study/CaseStudyPage";
import { ProjectLightweightPage } from "@/components/work/ProjectLightweightPage";
import { projects } from "@/lib/data/projects";
import {
  accentForProject,
  buildProjectMetadata,
  getCaseStudy,
  getProject,
  getRelatedProjects,
  getTestimonialForProject,
  hasPublishedCaseStudy,
} from "@/lib/work";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const caseStudy = getCaseStudy(slug);
  return buildProjectMetadata(project, caseStudy?.published ? caseStudy : undefined);
}

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const accent = accentForProject(project);
  const caseStudy = getCaseStudy(slug);
  const related = getRelatedProjects(project, caseStudy);

  if (caseStudy && hasPublishedCaseStudy(slug)) {
    const linkedTestimonial = getTestimonialForProject(slug);
    return (
      <CaseStudyPage
        project={project}
        caseStudy={caseStudy}
        accent={accent}
        related={related}
        linkedTestimonial={linkedTestimonial}
      />
    );
  }

  return (
    <ProjectLightweightPage project={project} accent={accent} related={related} />
  );
}
