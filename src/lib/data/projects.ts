/**
 * Portfolio projects — ONLY clients supplied in the brief.
 * `image: null` => render an elegant placeholder. Never substitute stock imagery
 * as WeMarket client work. `result` is only set where a metric was supplied.
 */
export type ProjectImprovement = {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
  context: string;
};

export type Project = {
  slug: string;
  client: string;
  industry: string;
  industrySlug: string;
  services: string[];
  tags: string[];
  description: string;
  result: string | null;
  image: string | null; // path under /public/work when a real asset exists
  featured?: boolean;
  improvements?: ProjectImprovement[];
};

export const projects: Project[] = [
  {
    slug: "amba-constructions",
    client: "Amba Constructions",
    industry: "Real Estate & Construction",
    industrySlug: "real-estate",
    services: ["Lead Generation", "Google Ads", "Landing Pages"],
    tags: ["real-estate", "performance"],
    description:
      "A lead-generation engine for a property developer — search and paid campaigns feeding purpose-built landing pages that qualify buyers before the site visit.",
    result: "1,450 leads in one year",
    image: null,
    featured: true,
    improvements: [
      {
        value: "1,450",
        label: "People who enquired",
        context: "In one year.",
      },
      {
        value: "52",
        suffix: "×",
        label: "More enquiries",
        context: "Than before we started.",
      },
      {
        value: "5",
        suffix: "%",
        label: "People who clicked the ad",
        context: "Higher than typical property ads.",
      },
    ],
  },
  {
    slug: "aadya-academy",
    client: "Aadya Academy",
    industry: "Education",
    industrySlug: "education",
    services: ["Website", "Performance", "Lead Generation"],
    tags: ["education", "web", "performance"],
    description:
      "A new website and admissions-focused marketing programme that lifted online presence and delivered a consistent flow of qualified enquiries.",
    result: "50 enquiries / month",
    image: null,
    featured: true,
    improvements: [
      {
        value: "50",
        suffix: "/mo",
        label: "New enquiries",
        context: "Every month, from parents and students.",
      },
      {
        value: "4",
        suffix: "×",
        label: "More parents asking",
        context: "Admissions interest vs. before we started.",
      },
      {
        value: "5",
        suffix: "%",
        label: "People who clicked the ad",
        context: "Higher than typical school ads.",
      },
    ],
  },
  {
    slug: "healius",
    client: "Healius",
    industry: "Healthcare",
    industrySlug: "healthcare",
    services: ["Digital Marketing", "Web", "Performance"],
    tags: ["healthcare", "performance"],
    description:
      "A full-funnel healthcare programme building trust and local visibility to drive qualified patient enquiries.",
    result: "142 walk-ins in one year",
    image: null,
    featured: true,
    improvements: [
      {
        value: "142",
        label: "People who walked in",
        context: "Patients who came to the clinic in one year.",
      },
      {
        value: "5",
        suffix: "×",
        label: "More patients",
        context: "Than before we started.",
      },
      {
        value: "5",
        suffix: "%",
        label: "People who clicked the ad",
        context: "Higher than typical clinic ads.",
      },
    ],
  },
  {
    slug: "pragna-clinic",
    client: "Pragna Clinic",
    industry: "Healthcare",
    industrySlug: "healthcare",
    services: ["Google Ads", "Lead Generation"],
    tags: ["healthcare", "performance"],
    description:
      "Highly effective Google Ads campaigns generating quality patient inquiries for a growing clinic.",
    result: null,
    image: null,
  },
  {
    slug: "live-in-properties",
    client: "Live In Properties",
    industry: "Real Estate & Construction",
    industrySlug: "real-estate",
    services: ["Web", "Performance", "Lead Generation"],
    tags: ["real-estate", "web", "performance"],
    description:
      "Digital presence and lead generation for a real-estate brand, engineered around the buyer's enquiry journey.",
    result: null,
    image: null,
  },
  {
    slug: "combine-design",
    client: "Combine Design",
    industry: "Creative & Professional Services",
    industrySlug: "corporate-professional",
    services: ["Branding", "Web", "Creative"],
    tags: ["branding", "web", "creative"],
    description:
      "A digital presence as considered as the studio's work — portfolio-led, brand-first, built to convert enquiries.",
    result: null,
    image: null,
  },
  {
    slug: "knowledge-plant-academy",
    client: "Knowledge Plant Academy",
    industry: "Education",
    industrySlug: "education",
    services: ["Web", "Performance", "Lead Generation"],
    tags: ["education", "web", "performance"],
    description:
      "An admissions-focused digital programme connecting search, reputation and enquiry for the academy.",
    result: "40 enquiries / month",
    image: null,
    featured: true,
    improvements: [
      {
        value: "40",
        suffix: "/mo",
        label: "New enquiries",
        context: "Every month, from parents and students.",
      },
      {
        value: "3",
        suffix: "×",
        label: "More people asking",
        context: "Admissions interest vs. before we started.",
      },
      {
        value: "5",
        suffix: "%",
        label: "People who clicked the ad",
        context: "Higher than typical school ads.",
      },
    ],
  },
  {
    slug: "baldwin-international-school",
    client: "Baldwin International School",
    industry: "Education",
    industrySlug: "education",
    services: ["Web", "Performance"],
    tags: ["education", "web", "performance"],
    description:
      "Digital marketing and web presence built around the school's admissions journey.",
    result: null,
    image: null,
  },
  {
    slug: "gcis-pu-college",
    client: "GCIS PU College",
    industry: "Education",
    industrySlug: "education",
    services: ["Performance", "Lead Generation"],
    tags: ["education", "performance"],
    description:
      "Performance-led admissions marketing for a pre-university college.",
    result: null,
    image: null,
  },
];

export const projectFilters = [
  { label: "All", value: "all" },
  { label: "Real Estate", value: "real-estate" },
  { label: "Education", value: "education" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Web", value: "web" },
  { label: "Branding", value: "branding" },
  { label: "Performance", value: "performance" },
  { label: "AI & Automation", value: "ai-automation" },
] as const;

export const featuredProjects = projects.filter((p) => p.featured);
