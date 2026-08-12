/**
 * Service architecture — four capability pillars.
 * Pillars map to /services/[slug] category pages.
 */
export type ServicePillar = {
  id: "grow" | "build" | "create" | "automate";
  index: string;
  name: string;
  slug: string;
  category: string;
  statement: string;
  /** Two-line editorial statement for expressive display. */
  statementLines: [string, string];
  description: string;
  services: string[];
  /** Art-directed accent (hex). */
  accent: string;
};

export const pillars: ServicePillar[] = [
  {
    id: "grow",
    index: "01",
    name: "Grow",
    slug: "digital-marketing",
    category: "Digital Marketing & Performance",
    statement: "Get found. Get chosen. Get results.",
    statementLines: ["Get found. Get chosen.", "Get results."],
    accent: "#0f8f78", // teal-green
    description:
      "We put your business in front of the right people at the right moment — across search, AI answer engines and paid media — then turn that attention into qualified demand and measurable revenue. AI sharpens the research, targeting and optimisation behind it.",
    services: [
      "SEO",
      "Generative Engine Optimization (GEO)",
      "Google Ads",
      "Meta Ads",
      "Performance Marketing",
      "Social Media",
      "Content Marketing",
      "Local SEO",
      "Email Marketing",
      "Lead Generation",
    ],
  },
  {
    id: "build",
    index: "02",
    name: "Build",
    slug: "web-digital",
    category: "Websites & Digital Experiences",
    statement: "Turn digital presence into digital experience.",
    statementLines: ["Turn digital presence", "into digital experience."],
    accent: "#4f74e6", // blue
    description:
      "Fast, conversion-focused websites and digital products engineered to earn trust and move visitors toward action.",
    services: [
      "Website Development",
      "Landing Pages",
      "E-commerce",
      "UI/UX",
      "Website Redesign",
      "Website Maintenance",
    ],
  },
  {
    id: "create",
    index: "03",
    name: "Create",
    slug: "brand-creative",
    category: "Brand, Content & Creative",
    statement: "Make your brand impossible to ignore.",
    statementLines: ["Make your brand", "impossible to ignore."],
    accent: "#f96f54", // coral
    description:
      "Brand systems, content and creative that give your business a distinct voice — and give audiences a reason to remember you.",
    services: [
      "Brand Strategy",
      "Brand Identity",
      "Logo Design",
      "Creative Design",
      "Content",
      "Video Production",
      "Social Creatives",
      "Influencer Campaigns",
      "AI Creative",
    ],
  },
  {
    id: "automate",
    index: "04",
    name: "Automate",
    slug: "ai-technology",
    category: "AI, Automation & Technology",
    statement: "Let technology do the heavy lifting.",
    statementLines: ["Let technology", "do the heavy lifting."],
    accent: "#f4c531", // yellow
    description:
      "AI, automation and custom software woven into how your business actually runs — capturing every lead, personalising engagement and removing the manual work, so your team can focus on what actually grows the business.",
    services: [
      "AI Chatbots",
      "AI Voice Agents",
      "WhatsApp Automation",
      "CRM Automation",
      "Workflow Automation",
      "Lead Management",
      "CRM Development",
      "ERP",
      "HRMS",
      "Custom Software",
      "Mobile Apps",
    ],
  },
];
