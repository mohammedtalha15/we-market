import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

const disciplines: { label: string; accent: string }[] = [
  { label: "Marketers", accent: "#74e6bf" },
  { label: "Strategists", accent: "#4f74e6" },
  { label: "Designers", accent: "#f96f54" },
  { label: "Developers", accent: "#f4c531" },
  { label: "Creators", accent: "#f2a4c6" },
  { label: "Technologists", accent: "#c7e552" },
];

export function Culture() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-fg-onDark md:py-32">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow tone="dark">Culture &amp; team</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-7 font-display text-[length:var(--text-h1)] font-extrabold text-white">
              Good work starts with good people.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-lg text-[length:var(--text-lead)] leading-relaxed text-fg-onDark-muted">
              We bring together marketers, strategists, designers, developers,
              creators and technology specialists to solve real business
              problems — one team, one system, one goal.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/about" tone="dark" variant="solid">
                Meet the Team
              </Button>
              <Button href="/careers" tone="dark" variant="outline">
                Join WeMarket
              </Button>
            </div>
          </Reveal>
        </div>

        {/* discipline collage — colourful mosaic; placeholder for real team imagery */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {disciplines.map((d, i) => (
            <Reveal key={d.label} delay={i * 60}>
              <div
                className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl p-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-1"
                style={{ backgroundColor: d.accent }}
              >
                <span
                  aria-hidden
                  className="font-display text-3xl font-extrabold leading-none text-ink/30"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative text-[0.95rem] font-bold tracking-tight text-ink">
                  {d.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
