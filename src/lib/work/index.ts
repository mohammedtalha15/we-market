import type { Metadata } from "next";
import { caseStudies, type CaseStudy } from "@/lib/data/caseStudies";
import { industries } from "@/lib/data/industries";
import { projects, type Project } from "@/lib/data/projects";
import { testimonials, type Testimonial } from "@/lib/data/testimonials";

const DEFAULT_ACCENT = "#74e6bf";

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function hasPublishedCaseStudy(slug: string): boolean {
  const study = getCaseStudy(slug);
  return study?.published === true;
}

export function accentForProject(project: Project): string {
  return industries.find((i) => i.slug === project.industrySlug)?.accent ?? DEFAULT_ACCENT;
}

export function projectIndex(slug: string): number {
  const i = projects.findIndex((p) => p.slug === slug);
  return i >= 0 ? i + 1 : 0;
}

export function getRelatedProjects(
  project: Project,
  caseStudy?: CaseStudy,
): Project[] {
  if (caseStudy?.relatedProjectSlugs?.length) {
    return caseStudy.relatedProjectSlugs
      .map((s) => getProject(s))
      .filter((p): p is Project => p != null && p.slug !== project.slug)
      .slice(0, 3);
  }
  return projects
    .filter((p) => p.industrySlug === project.industrySlug && p.slug !== project.slug)
    .slice(0, 3);
}

/** Match testimonial by explicit projectSlug or verified company name. */
export function getTestimonialForProject(slug: string): Testimonial | undefined {
  const project = getProject(slug);
  if (!project) return undefined;

  return testimonials.find(
    (t) => t.projectSlug === slug || t.company === project.client,
  );
}

export function buildProjectMetadata(project: Project, caseStudy?: CaseStudy): Metadata {
  if (caseStudy?.published) {
    const title =
      caseStudy.seo.title ?? `${caseStudy.title} — ${project.client} Case Study`;
    return {
      title,
      description: caseStudy.seo.description,
      ...(caseStudy.seo.ogImage
        ? { openGraph: { images: [{ url: caseStudy.seo.ogImage }] } }
        : {}),
      alternates: { canonical: `/work/${project.slug}` },
    };
  }

  return {
    title: `${project.client} — ${project.industry}`,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
  };
}
