import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/data/site";

export function About() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-7 font-display text-[length:var(--text-h1)] font-extrabold text-fg">
              More than a
              <br />
              <span className="text-teal">marketing agency.</span>
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col justify-end gap-8">
          <Reveal delay={120}>
            <p className="text-[length:var(--text-lead)] leading-relaxed text-fg-muted">
              WeMarket is a full-funnel growth partner helping businesses build
              authority, generate demand and scale through strategy, creative,
              technology and performance.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="grid grid-cols-2 gap-6 border-t border-line pt-8">
              <div>
                <div className="font-display text-4xl font-extrabold text-fg md:text-5xl">
                  {site.proof.clients}
                </div>
                <div className="mt-2 text-sm text-fg-muted">Clients served</div>
              </div>
              <div>
                <div className="font-display text-4xl font-extrabold text-fg md:text-5xl">
                  {site.proof.experience}
                </div>
                <div className="mt-2 text-sm text-fg-muted">Years of experience</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <Button href="/about" variant="ghost" className="-ml-1 self-start px-1">
              About WeMarket
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
