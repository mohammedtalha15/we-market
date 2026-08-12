import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-lime py-28 text-ink md:py-40">
      <Container className="relative">
        <Reveal>
          <span className="eyebrow flex items-center gap-2.5 text-ink/60">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-ink" />
            Let&apos;s work together
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-8 max-w-5xl font-display text-[clamp(2.8rem,1.4rem+5.5vw,7rem)] font-extrabold leading-[0.92] tracking-tight text-ink">
            Let&apos;s build something that grows.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 max-w-2xl text-[length:var(--text-lead)] font-medium leading-relaxed text-ink/70">
            Whether you&apos;re building a brand, generating demand, launching a
            digital experience or bringing AI into how you operate, let&apos;s
            combine human creativity and technology into the right growth system
            for your business.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button href="/contact" tone="light" variant="solid">
              Start a Project
            </Button>
            <Button href="/contact" tone="light" variant="outline">
              Talk to an Expert
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
