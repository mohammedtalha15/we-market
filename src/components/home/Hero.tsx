import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Marquee } from "@/components/ui/Marquee";
import { HeroVisual } from "./HeroVisual";
import { site } from "@/lib/data/site";

const capabilities = [
  "Marketing",
  "Creative",
  "Web",
  "Brand",
  "Performance",
  "Technology",
  "AI",
  "Growth",
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-forest text-fg-onDark">
      <Container className="relative grid flex-1 grid-cols-1 items-center gap-10 pb-10 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* copy */}
        <div className="flex flex-col">
          <Reveal>
            <Eyebrow tone="dark">{site.positioning}</Eyebrow>
          </Reveal>

          <h1 className="mt-7 font-display text-[length:var(--text-display)] font-extrabold text-white">
            <Reveal as="span" delay={120} className="block">
              Build Authority.
            </Reveal>
            <Reveal as="span" delay={240} className="block">
              Generate Demand.
            </Reveal>
            <Reveal as="span" delay={360} className="block">
              Drive <span className="text-lime">Growth.</span>
            </Reveal>
          </h1>

          <Reveal delay={520}>
            <p className="mt-7 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-fg-onDark-muted">
              We combine strategy, creative, performance and technology — with AI
              woven through how we research, create and optimise — to help
              businesses get discovered, earn trust, generate demand and turn
              digital growth into measurable business outcomes.
            </p>
          </Reveal>

          <Reveal delay={620}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/contact" tone="dark" variant="solid">
                Start a Project
              </Button>
              <Button href="/work" tone="dark" variant="outline">
                Explore Our Work
              </Button>
            </div>
          </Reveal>

          <Reveal delay={720}>
            <div className="mt-12 flex items-center gap-3 text-fg-onDark-muted">
              <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line-onDark-strong p-1">
                <span className="h-2 w-[3px] rounded-full bg-lime [animation:float-y_1.6s_ease-in-out_infinite]" />
              </span>
              <span className="eyebrow">Scroll to explore</span>
            </div>
          </Reveal>
        </div>

        {/* visual */}
        <div className="flex justify-center lg:justify-end">
          <HeroVisual />
        </div>
      </Container>

      {/* capability marquee bar — editorial colour strip */}
      <div className="relative border-t border-line-onDark bg-lime text-ink" aria-hidden>
        <Marquee duration={30}>
          {capabilities.map((c) => (
            <span key={c} className="flex items-center gap-6 py-3.5 pr-6">
              <span className="text-lg font-extrabold tracking-tight md:text-xl">{c}</span>
              <span aria-hidden className="text-xl">
                ✳
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
