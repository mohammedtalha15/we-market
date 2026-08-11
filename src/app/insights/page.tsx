import type { Metadata } from "next";
import { UpcomingPage } from "@/components/ui/UpcomingPage";
import { insightCategories } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Ideas for what's next — marketing, SEO, performance, technology, AI and business growth from the WeMarket team.",
};

export default function InsightsPage() {
  return (
    <UpcomingPage
      eyebrow="Insights"
      title={<>Ideas for what&apos;s next.</>}
      description="Perspectives on marketing, technology and growth. The editorial experience and published articles are being built next."
      sections={insightCategories}
    />
  );
}
