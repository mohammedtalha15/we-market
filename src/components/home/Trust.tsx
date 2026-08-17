import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { clients } from "@/lib/data/clients";
import { site } from "@/lib/data/site";

export function Trust() {
  return (
    <section className="bg-ink py-16 text-fg-onDark md:py-20">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          <Reveal>
            <p className="eyebrow text-fg-onDark-muted">Trusted by businesses across industries</p>
          </Reveal>
          <Reveal delay={80}>
            <p className="max-w-2xl text-fg-onDark-muted">
              <span className="font-semibold text-mint">{site.proof.clients} clients</span> served
              over <span className="font-semibold text-mint">{site.proof.experience} years</span> —
              across education, healthcare, real estate and more.
            </p>
          </Reveal>
        </div>
      </Container>

      <div className="relative mt-12">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
        <Marquee duration={55}>
          {clients.map((name) => (
            <span
              key={name}
              className="mx-8 whitespace-nowrap text-xl font-bold tracking-tight text-fg-onDark-muted/60 md:text-2xl"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
