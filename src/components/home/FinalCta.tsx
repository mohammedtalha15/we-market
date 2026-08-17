import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CtaLeadForm } from "@/components/home/CtaLeadForm";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-lime py-16 text-ink md:py-20">
      <Container className="relative">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="max-w-xl">
            <Reveal>
              <span className="eyebrow flex items-center gap-2.5 text-ink/60">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-ink" />
                Let&apos;s work together
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-[length:var(--text-h2)] font-extrabold leading-[1.05] tracking-tight text-ink">
                Let&apos;s build something that grows.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 text-[length:var(--text-lead)] font-medium leading-relaxed text-ink/70">
                Tell us what you need — brand, demand, digital or AI — and we&apos;ll
                come back with the right next step.
              </p>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <CtaLeadForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
