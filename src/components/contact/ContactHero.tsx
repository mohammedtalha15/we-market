import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ContactHeroVisual } from "./ContactHeroVisual";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-forest pt-32 pb-16 text-fg-onDark md:pt-40 md:pb-24 lg:pb-28">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-20 h-[22rem] w-[22rem] rounded-full bg-lime/10 blur-3xl"
      />
      <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
        <div className="lg:col-span-7 xl:col-span-7">
          <Reveal>
            <Eyebrow tone="dark">Contact</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-4xl font-display text-[length:var(--text-display)] font-extrabold text-white">
              Let&apos;s talk <span className="text-lime">growth.</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-7 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-fg-onDark-muted">
              We combine strategy, creative, performance and technology — with AI
              woven through how we research, create and optimise — to help businesses
              build brands, generate demand and grow.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:col-span-5 xl:col-span-5 lg:justify-self-end lg:pl-4">
          <ContactHeroVisual />
        </Reveal>
      </Container>
    </section>
  );
}
