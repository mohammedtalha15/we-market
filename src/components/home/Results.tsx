import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { results } from "@/lib/data/content";

export function Results() {
  return (
    <section className="bg-forest py-24 text-fg-onDark md:py-32">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Results / business impact"
          title={
            <>
              Numbers that <span className="text-lime">matter.</span>
            </>
          }
          lead="We measure success in outcomes, not vanity metrics. A few of the results we've helped clients achieve."
        />

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((r, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="flex h-full flex-col gap-4 border-t border-line-onDark pt-6">
                <div
                  className="font-display text-[clamp(3.5rem,2rem+5vw,6.5rem)] font-extrabold leading-none tracking-tight"
                  style={{ color: r.accent }}
                >
                  <Counter value={r.value} prefix={r.prefix} suffix={r.suffix} />
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
                  {r.label}
                </div>
                <p className="mt-auto text-[0.92rem] leading-snug text-fg-onDark-muted">{r.context}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-[0.8rem] text-fg-onDark-muted">
            Figures reflect results achieved for specific WeMarket clients. Individual results vary
            by industry, market and scope.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
