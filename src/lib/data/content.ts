/**
 * Homepage supporting content: results, growth system, process, faqs, insights.
 * Metrics are supplied business claims — do not modify or invent.
 */

/* ---- Results / business impact ----------------------------------------- */
export type IndustryResultStat = {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
  context: string;
  accent: string;
};

export type IndustryResult = {
  slug: string;
  tab: string;
  heading: string;
  lead: string;
  stats: IndustryResultStat[];
};

export const industryResults: IndustryResult[] = [
  {
    slug: "real-estate",
    tab: "Property",
    heading: "For property businesses",
    lead: "More people found the project. More people asked to visit.",
    stats: [
      {
        value: "1,450",
        label: "People who enquired",
        context: "In one year, for a property developer.",
        accent: "#ef7d3c",
      },
      {
        value: "52",
        suffix: "×",
        label: "More enquiries than before",
        context: "How much the enquiry volume grew after we started.",
        accent: "#f96f54",
      },
      {
        value: "5",
        suffix: "%",
        label: "People who clicked the ad",
        context: "Higher than typical property ads.",
        accent: "#f4c531",
      },
    ],
  },
  {
    slug: "education",
    tab: "Education",
    heading: "For schools and colleges",
    lead: "Parents and students found the school — and asked about admissions.",
    stats: [
      {
        value: "50",
        suffix: "/mo",
        label: "New enquiries every month",
        context: "People ready to talk about admissions.",
        accent: "#f4c531",
      },
      {
        value: "4",
        suffix: "×",
        label: "More parents asking",
        context: "Admissions interest vs. before we started.",
        accent: "#ef7d3c",
      },
      {
        value: "5",
        suffix: "%",
        label: "People who clicked the ad",
        context: "Higher than typical school ads.",
        accent: "#74e6bf",
      },
    ],
  },
  {
    slug: "healthcare",
    tab: "Healthcare",
    heading: "For clinics and hospitals",
    lead: "Patients found the clinic online — then walked in.",
    stats: [
      {
        value: "142",
        label: "People who walked in",
        context: "Patients who came to the clinic in one year.",
        accent: "#f96f54",
      },
      {
        value: "5",
        suffix: "×",
        label: "More patients than before",
        context: "How much walk-ins grew after we started.",
        accent: "#74e6bf",
      },
      {
        value: "5",
        suffix: "%",
        label: "People who clicked the ad",
        context: "Higher than typical clinic ads.",
        accent: "#f4c531",
      },
    ],
  },
  {
    slug: "corporate-professional",
    tab: "Business",
    heading: "For firms and companies",
    lead: "More of the right people found the firm — and asked to talk.",
    stats: [
      {
        value: "40",
        suffix: "/mo",
        label: "New enquiries every month",
        context: "People asking to discuss work.",
        accent: "#4f74e6",
      },
      {
        value: "3",
        suffix: "×",
        label: "More people asking to talk",
        context: "Enquiry volume vs. before we started.",
        accent: "#74e6bf",
      },
      {
        value: "5",
        suffix: "%",
        label: "People who clicked the ad",
        context: "Higher than typical business ads.",
        accent: "#f4c531",
      },
    ],
  },
];

/* ---- The WeMarket Growth System ---------------------------------------- */
export type GrowthStage = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  nodes: string[];
  accent: string;
};

export const growthSystem: GrowthStage[] = [
  {
    id: "attract",
    index: "01",
    title: "Attract",
    blurb: "Be found by the right people at the moment of intent.",
    nodes: ["SEO", "Paid Media", "Social", "Content"],
    accent: "#74e6bf", // mint
  },
  {
    id: "engage",
    index: "02",
    title: "Engage",
    blurb: "Earn trust and hold attention with a brand worth remembering.",
    nodes: ["Brand", "Website", "Creative", "Experience"],
    accent: "#4f74e6", // blue
  },
  {
    id: "convert",
    index: "03",
    title: "Convert",
    blurb: "Turn interest into qualified demand and captured leads.",
    nodes: ["Landing Pages", "Lead Generation", "CRM", "Automation"],
    accent: "#f4c531", // yellow
  },
  {
    id: "scale",
    index: "04",
    title: "Scale",
    blurb: "Compound results with data, AI and continuous optimisation.",
    nodes: ["Analytics", "AI", "Optimisation", "Technology"],
    accent: "#f96f54", // coral
  },
];

/* ---- Process ----------------------------------------------------------- */
export type ProcessStep = {
  index: string;
  title: string;
  items: string[];
};

export const processSteps: ProcessStep[] = [
  { index: "01", title: "Discover", items: ["Business", "Audience", "Market", "Competition"] },
  { index: "02", title: "Strategize", items: ["Positioning", "Channels", "Customer Journey", "Roadmap"] },
  { index: "03", title: "Build", items: ["Brand", "Website", "Content", "Technology"] },
  { index: "04", title: "Activate", items: ["SEO", "Ads", "Social", "Campaigns"] },
  { index: "05", title: "Measure", items: ["Leads", "Conversions", "Performance"] },
  { index: "06", title: "Scale", items: ["Optimisation", "Automation", "AI", "Expansion"] },
];

/* ---- FAQ (homepage: max 5) --------------------------------------------- */
export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: "What does WeMarket do?",
    a: "We're a full-funnel growth partner. We connect strategy, creative, technology and performance marketing into one system that helps businesses build authority, generate demand and grow — from getting found to converting and scaling.",
  },
  {
    q: "Which industries do you work with?",
    a: "We work across real estate & construction, education, healthcare and corporate & professional services. Different industries have different buying journeys, so we build strategies around how your industry actually works.",
  },
  {
    q: "Can I combine multiple services?",
    a: "Yes — that's the point. Growth doesn't happen in silos. Most clients combine marketing, web, brand and technology into one connected growth system rather than buying isolated services.",
  },
  {
    q: "Do you work with businesses outside Bangalore?",
    a: "Absolutely. We're based in Bengaluru but partner with businesses across regions. Digital growth isn't limited by geography, and neither are we.",
  },
  {
    q: "How do I start a project?",
    a: "Tell us what you're trying to achieve. We'll map the right growth system for your business — start a project or talk to an expert, and we'll take it from there.",
  },
];

/* ---- Insights (structure ready; placeholders clearly marked) ----------- */
export type Insight = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: string;
  placeholder?: boolean;
};

export const insightCategories = [
  "Marketing",
  "SEO",
  "Performance",
  "Technology",
  "AI",
  "Business Growth",
];

// Placeholder editorial structure — replace with published articles.
export const insights: Insight[] = [
  {
    slug: "full-funnel-growth-system",
    title: "Why growth doesn't happen in silos — and what to do about it",
    category: "Business Growth",
    excerpt:
      "Most businesses buy marketing in fragments. The compounding results come from connecting brand, web, media and data into one system.",
    readingTime: "6 min",
    placeholder: true,
  },
  {
    slug: "search-intent-industries",
    title: "Search intent is different for every industry. Your strategy should be too.",
    category: "SEO",
    excerpt:
      "A property buyer, a parent choosing a school and a patient searching for care behave nothing alike. Here's how to build for each.",
    readingTime: "5 min",
    placeholder: true,
  },
  {
    slug: "ai-automation-lead-capture",
    title: "The leads you're losing after hours — and how automation fixes it",
    category: "AI",
    excerpt:
      "Every unanswered enquiry is a lost customer. AI chat, WhatsApp automation and CRM workflows close the gap between interest and action.",
    readingTime: "4 min",
    placeholder: true,
  },
];
