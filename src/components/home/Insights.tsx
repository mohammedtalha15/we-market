import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { insights } from "@/lib/data/content";
import { inkFor } from "@/lib/accents";

const categoryAccent: Record<string, string> = {
  Marketing: "#f4c531",
  SEO: "#4f74e6",
  Performance: "#ef7d3c",
  Technology: "#c7e552",
  AI: "#f96f54",
  "Business Growth": "#0f8f78",
};

export function Insights() {
  return (
    <section className="bg-forest py-24 text-fg-onDark md:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            tone="dark"
            eyebrow="Insights"
            title={
              <>
                Ideas for <span className="text-lime">what&apos;s next.</span>
              </>
            }
          />
          <Reveal delay={160}>
            <Button href="/insights" tone="dark" variant="ghost" className="shrink-0 px-1">
              All Insights
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {insights.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <Link
                href={`/insights/${post.slug}`}
                style={{ ["--accent" as string]: categoryAccent[post.category] ?? "#0f8f78" }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-7 transition-colors hover:[border-color:var(--accent)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100 accent-bg"
                />
                <div className="flex items-center justify-between text-[0.72rem] font-semibold uppercase tracking-[0.12em]">
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="h-2 w-2 rounded-full accent-bg" />
                    <span style={{ color: inkFor(categoryAccent[post.category] ?? "#0f8f78") }}>
                      {post.category}
                    </span>
                  </span>
                  <span className="font-normal normal-case tracking-normal text-fg-muted">
                    {post.readingTime}
                  </span>
                </div>
                <h3 className="mt-6 text-[1.35rem] font-extrabold leading-tight tracking-tight text-fg">
                  {post.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-snug text-fg-muted">{post.excerpt}</p>
                <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold text-fg transition-colors group-hover:text-teal">
                  Read insight
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    <path
                      d="M1 7h11M7.5 2.5 12 7l-4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
