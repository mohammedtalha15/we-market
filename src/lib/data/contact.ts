/**
 * Contact page content — FAQs, trust pillars, and process steps.
 * Claims only; no invented pricing, timelines or guarantees.
 */
import type { Faq } from "@/lib/data/content";

export type TrustPillar = {
  id: string;
  label: string;
  title: string;
  body: string;
  accent: string;
};

export const contactNextSteps = [
  {
    index: "01",
    title: "We review your requirements",
    body: "Your goals, industry and context — so we understand what you're building toward.",
  },
  {
    index: "02",
    title: "We identify opportunities",
    body: "The right mix of strategy, creative, technology and growth for your business.",
  },
  {
    index: "03",
    title: "We connect to discuss approach",
    body: "A conversation to map the growth system that fits — no pressure, just clarity.",
  },
] as const;

export const contactTrustPillars: TrustPillar[] = [
  {
    id: "business-first",
    label: "Business-first",
    title: "Outcomes over optics",
    body: "We measure success in leads, conversions and growth — the numbers that move a business, not vanity metrics.",
    accent: "#f96f54",
  },
  {
    id: "integrated",
    label: "Integrated expertise",
    title: "One connected team",
    body: "Strategy, creative, performance and technology in one operating model — so every part compounds the others.",
    accent: "#4f74e6",
  },
  {
    id: "ai-enabled",
    label: "AI-enabled execution",
    title: "Smarter, not louder",
    body: "AI woven through how we research, create and optimise — practical acceleration, not a buzzword layer.",
    accent: "#74e6bf",
  },
  {
    id: "transparent",
    label: "Transparent collaboration",
    title: "Your goals are the brief",
    body: "We work as an extension of your team — clear communication, honest recommendations and shared accountability.",
    accent: "#f4c531",
  },
];

export const contactFaqs: Faq[] = [
  {
    q: "What happens after I submit an enquiry?",
    a: "We review what you've shared — your goals, industry and context — identify the right combination of strategy, creative, technology and growth solutions, then connect with you to discuss the approach.",
  },
  {
    q: "Do you work with businesses outside Bangalore?",
    a: "Absolutely. We're based in Bengaluru but partner with businesses across regions. Digital growth isn't limited by geography, and neither are we.",
  },
  {
    q: "Can I combine multiple services?",
    a: "Yes — that's the point. Growth doesn't happen in silos. Most clients combine marketing, web, brand and technology into one connected growth system rather than buying isolated services.",
  },
  {
    q: "Do you work with startups and established businesses?",
    a: "We partner with businesses at different stages — from brands building their first digital presence to established organisations scaling demand across channels.",
  },
  {
    q: "How do you determine which services we need?",
    a: "We start with your goals and how your industry actually buys. From there, we map the right mix of capabilities — whether that's brand, web, performance marketing, technology or a combination.",
  },
  {
    q: "Can we start with a consultation?",
    a: "Tell us what you're trying to achieve. We'll review your requirements, identify opportunities and connect to discuss the right starting point for your growth system.",
  },
];
