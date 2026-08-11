import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UpcomingPage } from "@/components/ui/UpcomingPage";
import { insights } from "@/lib/data/content";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((i) => i.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = insights.find((i) => i.slug === slug);
  if (!post) notFound();

  return (
    <UpcomingPage
      eyebrow={`Insight · ${post.category}`}
      title={<>{post.title}</>}
      description={post.excerpt}
      sections={[post.readingTime, "Draft — full article coming soon"]}
    />
  );
}
