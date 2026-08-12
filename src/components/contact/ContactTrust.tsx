import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contactTrustPillars } from "@/lib/data/contact";
import { site } from "@/lib/data/site";

export function ContactTrust() {
  return (
    <section className="relative overflow-hidden bg-greenblack py-20 text-fg-onDark md:py-28">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-mint/6 blur-3xl"
      />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow text-fg-onDark-muted">Why WeMarket</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[length:var(--text-h2)] font-extrabold text-white">
                Built for businesses that want to{" "}
                <span className="text-lime">grow.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-line-onDark pt-8">
                <ProofStat value={site.proof.clients} label="Clients served" />
                <ProofStat value={site.proof.experience} label="Years of experience" />
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
            {contactTrustPillars.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <article className="group flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-line-onDark bg-greenblack-2/60 p-7 transition-[border-color] duration-300 hover:border-line-onDark-strong">
                  <span
                    className="eyebrow"
                    style={{ color: p.accent }}
                  >
                    {p.label}
                  </span>
                  <h3 className="text-lg font-extrabold tracking-tight text-white">
                    {p.title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-fg-onDark-muted">
                    {p.body}
                  </p>
                  <span
                    aria-hidden
                    className="mt-auto h-0.5 w-8 rounded-full transition-[width] duration-500 group-hover:w-14"
                    style={{ background: p.accent }}
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProofStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl font-extrabold text-white md:text-5xl">
        {value}
      </div>
      <div className="mt-1 text-sm text-fg-onDark-muted">{label}</div>
    </div>
  );
}
