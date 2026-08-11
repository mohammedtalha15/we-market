import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { MarqueeBand } from "@/components/ui/MarqueeBand";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build what's next at WeMarket. Join a team of marketers, strategists, designers, developers and technologists solving real business problems.",
};

const values = [
  {
    accent: "#74e6bf",
    title: "Real work, real impact",
    body: "You'll work on brands people actually know, solving problems that move real businesses — not busywork.",
  },
  {
    accent: "#f4c531",
    title: "Generalists welcome",
    body: "We connect marketing, creative and technology. The best people here are curious across disciplines, not boxed into one.",
  },
  {
    accent: "#f96f54",
    title: "Ownership over hierarchy",
    body: "Good ideas win regardless of who they come from. You'll have room to lead, ship and own outcomes.",
  },
];

const teams = [
  { name: "Marketing", accent: "#0f8f78", desc: "SEO, paid media, performance, social." },
  { name: "Creative", accent: "#f96f54", desc: "Brand, content, design, video." },
  { name: "Technology", accent: "#4f74e6", desc: "Web, apps, automation, AI." },
  { name: "Strategy", accent: "#f4c531", desc: "Positioning, planning, growth." },
  { name: "Operations", accent: "#c7e552", desc: "Delivery, client success, people." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build <span className="text-lime">what&apos;s next.</span>
          </>
        }
        lead="We bring together marketers, strategists, designers, developers and technologists to solve real business problems. If that sounds like your kind of room, let's talk."
      />

      <MarqueeBand text="We're hiring curiosity" variant="lime" />

      {/* Why WeMarket */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Life at WeMarket" title={<>Why work with us.</>} />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((v) => (
              <Reveal key={v.title}>
                <div className="flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-white p-8">
                  <span
                    aria-hidden
                    className="h-3 w-3 rounded-full"
                    style={{ background: v.accent }}
                  />
                  <h3 className="text-xl font-extrabold tracking-tight text-fg">{v.title}</h3>
                  <p className="text-[0.95rem] leading-relaxed text-fg-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Teams */}
      <section className="bg-ink py-20 text-fg-onDark md:py-28">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Our teams"
            title={
              <>
                Five teams, <span className="text-lime">one system.</span>
              </>
            }
          />
          <div className="mt-14 border-t border-line-onDark">
            {teams.map((t, i) => (
              <Reveal key={t.name} delay={i * 50}>
                <div className="flex items-center gap-5 border-b border-line-onDark py-7 md:gap-10">
                  <span className="font-mono text-sm text-fg-onDark-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-display text-[clamp(1.6rem,1rem+2vw,2.5rem)] font-extrabold tracking-tight"
                    style={{ color: t.accent }}
                  >
                    {t.name}
                  </h3>
                  <p className="ml-auto max-w-xs text-right text-[0.9rem] text-fg-onDark-muted">
                    {t.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Open positions — honest: no live vacancies supplied */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Open positions" title={<>Don&apos;t see your role?</>} />
          <Reveal>
            <div className="mt-10 flex flex-col items-start gap-6 rounded-[var(--radius-card)] border border-line bg-white p-10 md:p-14">
              <p className="max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-fg-muted">
                We don&apos;t always have roles posted, but we&apos;re always meeting talented
                people. Tell us what you do best and where you want to grow — if there&apos;s a fit,
                we&apos;ll be in touch.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href={`mailto:${site.contact.email}?subject=Careers at WeMarket`} arrow>
                  Send us your work
                </Button>
                <Button href="/about" variant="outline">
                  Meet the team
                </Button>
              </div>
              <p className="text-[0.8rem] text-fg-muted">
                Applications go to {site.contact.email}. This is an open talent pool, not a specific
                job posting.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
