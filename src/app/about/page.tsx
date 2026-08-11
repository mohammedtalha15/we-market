import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { StatStrip } from "@/components/ui/StatStrip";
import { MarqueeBand } from "@/components/ui/MarqueeBand";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Culture } from "@/components/home/Culture";
import { FinalCta } from "@/components/home/FinalCta";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "WeMarket is a full-funnel growth partner — strategy, creative, technology and performance, built around real business outcomes.",
};

// Brand principles (positioning, not invented facts/metrics).
const principles = [
  {
    n: "01",
    accent: "#74e6bf",
    title: "Full-funnel, not fragments",
    body: "Most agencies sell you a service. We build the whole system — from getting found to converting and scaling — so every part compounds the others.",
  },
  {
    n: "02",
    accent: "#f4c531",
    title: "Built around your industry",
    body: "A property buyer, a parent choosing a school and a patient searching for care behave nothing alike. We design for how your industry actually decides.",
  },
  {
    n: "03",
    accent: "#f96f54",
    title: "Obsessed with outcomes",
    body: "Impressions don't pay the bills. We measure success in leads, conversions and growth — the numbers that move a business.",
  },
  {
    n: "04",
    accent: "#4f74e6",
    title: "One integrated team",
    body: "Marketers, strategists, designers, developers and technologists in one room — so strategy, creative and technology never work in silos.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About WeMarket"
        title={
          <>
            More than a <span className="text-lime">marketing agency.</span>
          </>
        }
        lead={site.description}
      >
        <StatStrip
          className="mt-10"
          stats={[
            { value: site.proof.clients, label: "Clients served" },
            { value: site.proof.experience, label: "Years of experience" },
            { value: "10+", label: "Industries served" },
          ]}
        />
      </PageHero>

      <MarqueeBand text="Strategy · Creative · Technology · Performance" variant="lime" />

      {/* Who we are */}
      <section className="bg-paper py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Who we are" title={<>We connect the dots others leave loose.</>} />
          </div>
          <div className="flex flex-col justify-center gap-6 text-[length:var(--text-lead)] leading-relaxed text-fg-muted">
            <Reveal>
              <p>
                WeMarket is a full-funnel growth partner. We bring strategy, creative, technology
                and performance marketing together so businesses can get discovered, earn trust,
                generate demand and turn digital growth into measurable outcomes.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p>
                We&apos;ve spent over a decade helping brands across education, healthcare, real
                estate and beyond — and we&apos;ve learned that growth rarely comes from a single
                channel. It comes from a system.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What sets us apart */}
      <section className="bg-ink py-20 text-fg-onDark md:py-28">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="What sets us apart"
            title={
              <>
                How we think about <span className="text-lime">growth.</span>
              </>
            }
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {principles.map((p) => (
              <Reveal key={p.n}>
                <div className="flex h-full gap-6 rounded-[var(--radius-card)] border border-line-onDark bg-ink-2/50 p-8">
                  <span
                    className="font-display text-4xl font-extrabold leading-none"
                    style={{ color: p.accent }}
                  >
                    {p.n}
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-white">{p.title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-onDark-muted">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Culture />
      <FinalCta />
    </>
  );
}
