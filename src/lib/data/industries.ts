/**
 * Industries — dedicated /industries/[slug] pages.
 * Four approved primary verticals. Journeys are supplied in the brief; do not
 * invent additional steps.
 */
export type Industry = {
  slug: string;
  name: string;
  index: string;
  headline: string;
  short: string;
  description: string;
  journey: string[];
  /** Art-directed accent (hex) — a subtle visual identity within the WeMarket system. */
  accent: string;
};

export const industries: Industry[] = [
  {
    slug: "real-estate",
    name: "Real Estate & Construction",
    index: "01",
    headline: "Turn property searches into qualified buyers.",
    short: "Turn property searches into qualified buyers.",
    description:
      "Property is a high-consideration, trust-heavy purchase. We build the discovery, credibility and enquiry systems that move a search into a site visit — and a site visit into a sale.",
    journey: [
      "Discover",
      "Search",
      "Project Website",
      "Trust",
      "Enquiry",
      "Qualification",
      "Site Visit",
      "Sale",
    ],
    accent: "#ef7d3c", // warm orange
  },
  {
    slug: "education",
    name: "Education",
    index: "02",
    headline: "Turn digital discovery into admissions.",
    short: "Turn digital discovery into admissions.",
    description:
      "Parents and students compare before they commit. We connect search, reputation and counselling into an admissions journey that fills seats.",
    journey: [
      "Search",
      "Discover",
      "Compare",
      "Trust",
      "Enquiry",
      "Counselling",
      "Application",
      "Admission",
    ],
    accent: "#f4c531", // yellow
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    index: "03",
    headline: "Build trust before the first appointment.",
    short: "Build trust before the first appointment.",
    description:
      "Patients search, read reviews and judge credibility long before they call. We build the trust signals and local visibility that turn a search into a walk-in.",
    journey: [
      "Need",
      "Search",
      "Google / AI",
      "Reviews",
      "Website",
      "Trust",
      "Appointment",
      "Patient",
    ],
    accent: "#f96f54", // coral
  },
  {
    slug: "corporate-professional",
    name: "Corporate & Professional Services",
    index: "04",
    headline: "Build authority. Generate demand. Grow.",
    short: "Build authority. Generate demand. Grow.",
    description:
      "For professional and B2B businesses, credibility is the whole game. We build the authority, content and demand systems that shorten the path from awareness to enquiry.",
    journey: [
      "Awareness",
      "Search",
      "Authority",
      "Trust",
      "Enquiry",
      "Qualification",
      "Proposal",
      "Client",
    ],
    accent: "#4f74e6", // refined blue
  },
];
