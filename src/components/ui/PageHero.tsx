import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Consistent forest-green hero for inner pages.
 * `accent` optionally tints the eyebrow marker + a soft glow.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  accent,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  accent?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-forest pt-36 pb-16 text-fg-onDark md:pt-44 md:pb-24">
      {accent && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-24 h-[26rem] w-[26rem] rounded-full opacity-[0.14] blur-3xl"
          style={{ background: accent }}
        />
      )}
      <Container className="relative">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-2.5 text-fg-onDark-muted">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: accent ?? "var(--color-lime)" }}
            />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-7 max-w-5xl font-display text-[length:var(--text-display)] font-extrabold text-white">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={140}>
            <p className="mt-7 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-fg-onDark-muted">
              {lead}
            </p>
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
