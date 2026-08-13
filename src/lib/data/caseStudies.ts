/**
 * Rich case-study content — separate from the lightweight project index.
 * Only entries with `published: true` render the full editorial template at /work/[slug].
 * Do not add fictional narrative, metrics, or visuals. Populate when verified.
 */
import type { ServicePillar } from "@/lib/data/services";

export type ServicePillarSlug = ServicePillar["slug"];

export type CaseStudyMetric = {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
  context?: string;
};

export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string;
  /** Layout hint for the visual story section. */
  layout?: "full" | "wide" | "half" | "grid";
};

export type CaseStudyTestimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  photo?: string | null;
};

export type CaseStudyTimelineEntry = {
  phase: string;
  period?: string;
  summary: string;
};

export type CaseStudyTeamMember = {
  role: string;
  name?: string;
};

export type CaseStudySeo = {
  title?: string;
  description: string;
  ogImage?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  businessContext?: string;
  challenge: string;
  objectives: string[];
  strategy: string;
  execution: string;
  servicesDelivered: string[];
  servicePillarSlugs?: ServicePillarSlug[];
  technology?: string[];
  aiUsage?: string;
  qualitativeOutcomes?: string[];
  results: string;
  metrics: CaseStudyMetric[];
  testimonial?: CaseStudyTestimonial;
  heroImage?: string;
  gallery: CaseStudyImage[];
  timeline?: CaseStudyTimelineEntry[];
  team?: CaseStudyTeamMember[];
  relatedProjectSlugs?: string[];
  published: boolean;
  publishedAt?: string;
  seo: CaseStudySeo;
};

/**
 * Published case studies only. Unpublished drafts belong here with `published: false`
 * but will not render until verified content is complete.
 */
export const caseStudies: CaseStudy[] = [];
