import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { industries } from "@/lib/data/industries";

export function Industries() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Industries"
            title={
              <>
                We don&apos;t market to everyone <span className="text-teal">the same way.</span>
              </>
            }
            lead="Different industries have different customers, buying journeys and growth challenges. We build strategies around how your industry actually works."
          />
          <Reveal delay={160}>
            <Button href="/industries" variant="ghost" className="shrink-0 px-1">
              Explore Industries
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-line">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={i * 50}>
              <Link
                href={`/industries/${ind.slug}`}
                style={{ ["--accent" as string]: ind.accent }}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 overflow-hidden border-b border-line py-7 md:gap-10 md:py-9"
              >
                {/* accent wash grows on hover */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 -z-0 w-0 opacity-[0.14] transition-[width] duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:w-full accent-bg"
                />
                <span className="relative flex items-center gap-3">
                  <span
                    aria-hidden
                    className="h-3 w-3 rounded-full accent-bg transition-transform duration-500 group-hover:scale-150"
                  />
                  <span className="font-mono text-sm text-fg-muted">{ind.index}</span>
                </span>
                <div className="relative flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
                  <h3 className="font-display text-[clamp(1.7rem,1rem+2.4vw,3rem)] font-extrabold tracking-tight text-fg transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:md:translate-x-3">
                    {ind.name}
                  </h3>
                  <p className="max-w-md text-[0.95rem] text-fg-muted md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
                    {ind.headline}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-fg transition-all duration-500 group-hover:[border-color:var(--accent)] group-hover:[background-color:var(--accent)] group-hover:text-ink"
                >
                  <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
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
