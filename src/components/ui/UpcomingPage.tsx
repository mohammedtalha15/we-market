import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

/**
 * On-brand placeholder for pages that are scaffolded but not yet fully built.
 * Keeps the site fully navigable (no 404s) and honest about status.
 */
export function UpcomingPage({
  eyebrow,
  title,
  description,
  sections,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  sections?: string[];
}) {
  return (
    <section className="relative overflow-hidden bg-forest text-fg-onDark">
      <Container className="relative flex min-h-[80vh] flex-col justify-center py-32">
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        <h1 className="mt-7 max-w-4xl font-display text-[length:var(--text-display)] font-extrabold text-white">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-fg-onDark-muted">
          {description}
        </p>

        {sections && (
          <div className="mt-12 flex flex-wrap gap-2">
            {sections.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line-onDark px-4 py-2 text-sm text-fg-onDark-muted"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/contact" tone="dark" variant="solid">
            Start a Project
          </Button>
          <Button href="/" tone="dark" variant="outline" arrow={false}>
            Back to Home
          </Button>
        </div>

        <p className="mt-10 text-[0.8rem] text-fg-onDark-muted">
          This page is in production. The full experience is being built as part of the
          WeMarket site rollout.
        </p>
      </Container>
    </section>
  );
}
