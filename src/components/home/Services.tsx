import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { pillars } from "@/lib/data/services";

export function Services() {
  return (
    <section className="bg-ink py-24 text-fg-onDark md:py-32">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Services / capabilities"
          title={
            <>
              Four capabilities. <span className="text-lime">One growth system.</span>
            </>
          }
          lead="We organise everything we do into four connected pillars — and use AI across each to work faster, sharper and smarter — so you can start with one and scale into all of them."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 90}>
              <Link
                href={`/services/${p.slug}`}
                style={{ ["--accent" as string]: p.accent }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line-onDark bg-ink-2/60 p-8 transition-colors duration-500 hover:[border-color:var(--accent)] md:p-10"
              >
                {/* accent wash grows from the corner on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30 accent-bg"
                />
                <div className="relative flex items-start justify-between">
                  <span
                    className="font-display text-6xl font-extrabold leading-none text-fg-onDark-muted/30 transition-colors duration-500 group-hover:[color:var(--accent)] md:text-7xl"
                  >
                    {p.index}
                  </span>
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line-onDark-strong text-fg-onDark transition-all duration-500 group-hover:[border-color:var(--accent)] group-hover:[background-color:var(--accent)] group-hover:text-ink"
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
                </div>

                <h3 className="relative mt-6 font-display text-5xl font-extrabold tracking-tight text-white md:text-6xl">
                  {p.name}
                </h3>
                <p
                  className="relative mt-4 font-display text-[1.4rem] font-bold leading-[1.05] tracking-tight md:text-[1.7rem]"
                  style={{ color: p.accent }}
                >
                  {p.statementLines[0]}
                  <br />
                  {p.statementLines[1]}
                </p>
                <p className="relative mt-4 max-w-md text-[0.95rem] leading-relaxed text-fg-onDark-muted">
                  {p.description}
                </p>

                <ul className="relative mt-6 flex flex-wrap gap-2 border-t border-line-onDark pt-6">
                  {p.services.slice(0, 6).map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line-onDark px-3 py-1 text-[0.76rem] text-fg-onDark-muted"
                    >
                      {s}
                    </li>
                  ))}
                  {p.services.length > 6 && (
                    <li
                      className="rounded-full px-3 py-1 text-[0.76rem] font-semibold"
                      style={{ color: p.accent }}
                    >
                      +{p.services.length - 6} more
                    </li>
                  )}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
