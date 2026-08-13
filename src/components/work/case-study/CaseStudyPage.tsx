import { FinalCta } from "@/components/home/FinalCta";
import { CaseStudyExecution } from "@/components/work/case-study/CaseStudyExecution";
import { CaseStudyGallery } from "@/components/work/case-study/CaseStudyGallery";
import { CaseStudyHero } from "@/components/work/case-study/CaseStudyHero";
import { CaseStudyNarrative } from "@/components/work/case-study/CaseStudyNarrative";
import { CaseStudyRelatedWork } from "@/components/work/case-study/CaseStudyRelatedWork";
import { CaseStudyResults } from "@/components/work/case-study/CaseStudyResults";
import { CaseStudyStrategy } from "@/components/work/case-study/CaseStudyStrategy";
import { CaseStudyTestimonialBlock } from "@/components/work/case-study/CaseStudyTestimonial";
import { CaseStudyTimeline } from "@/components/work/case-study/CaseStudyTimeline";
import type { CaseStudy } from "@/lib/data/caseStudies";
import type { Project } from "@/lib/data/projects";
import type { Testimonial } from "@/lib/data/testimonials";

type CaseStudyPageProps = {
  project: Project;
  caseStudy: CaseStudy;
  accent: string;
  related: Project[];
  linkedTestimonial?: Testimonial;
};

export function CaseStudyPage({
  project,
  caseStudy,
  accent,
  related,
  linkedTestimonial,
}: CaseStudyPageProps) {
  const testimonial =
    caseStudy.testimonial ??
    (linkedTestimonial
      ? {
          quote: linkedTestimonial.quote,
          name: linkedTestimonial.name,
          title: linkedTestimonial.title,
          company: linkedTestimonial.company,
          photo: linkedTestimonial.photo,
        }
      : undefined);

  return (
    <>
      <CaseStudyHero project={project} caseStudy={caseStudy} accent={accent} />

      <CaseStudyNarrative caseStudy={caseStudy} accent={accent} />

      <CaseStudyStrategy caseStudy={caseStudy} accent={accent} />

      <CaseStudyExecution caseStudy={caseStudy} accent={accent} />

      <CaseStudyGallery images={caseStudy.gallery} client={project.client} />

      <CaseStudyResults caseStudy={caseStudy} accent={accent} />

      {testimonial && (
        <CaseStudyTestimonialBlock testimonial={testimonial} accent={accent} />
      )}

      {caseStudy.timeline && caseStudy.timeline.length > 0 && (
        <CaseStudyTimeline timeline={caseStudy.timeline} accent={accent} />
      )}

      <CaseStudyRelatedWork project={project} related={related} accent={accent} />

      <FinalCta />
    </>
  );
}
