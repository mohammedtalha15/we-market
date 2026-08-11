import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/lib/data/site";
import { homeFaqs } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let's talk growth. Start a project with WeMarket — tell us what you're trying to achieve and we'll map the right growth system for your business.",
};

const reasons = [
  "One partner for strategy, creative, web, marketing and technology",
  "Strategies built around your industry's real buying journey",
  "Measurable outcomes — leads, conversions and growth, not vanity metrics",
  "A team that treats your business goals as the brief",
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest pt-32 pb-16 text-fg-onDark md:pt-40 md:pb-20">
        <Container className="relative">
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
              Whether you&apos;re building a brand, generating demand or launching a digital
              experience — tell us what you&apos;re trying to achieve, and we&apos;ll map the right
              growth system for your business.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Form + details */}
      <section className="bg-paper py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal delay={80}>
              <div className="flex flex-col gap-5">
                <h2 className="eyebrow text-fg-muted">Reach us directly</h2>
                <div className="flex flex-col gap-4">
                  <ContactRow label="Call" value={site.contact.phone} href={`tel:${site.contact.phoneHref}`} />
                  <ContactRow label="Email" value={site.contact.email} href={`mailto:${site.contact.email}`} />
                  <ContactRow label="Studio" value={site.contact.address} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-white p-7">
                <h2 className="text-lg font-extrabold tracking-tight text-fg">
                  Why work with WeMarket
                </h2>
                <ul className="flex flex-col gap-3">
                  {reasons.map((r) => (
                    <li key={r} className="flex gap-3 text-[0.95rem] leading-snug text-fg-muted">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex items-center gap-6 border-t border-line pt-6">
                <div>
                  <div className="font-display text-4xl font-extrabold text-fg">{site.proof.clients}</div>
                  <div className="mt-1 text-sm text-fg-muted">Clients served</div>
                </div>
                <div>
                  <div className="font-display text-4xl font-extrabold text-fg">{site.proof.experience}</div>
                  <div className="mt-1 text-sm text-fg-muted">Years of experience</div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-paper pb-24 md:pb-32">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-6 font-display text-[length:var(--text-h2)] font-extrabold text-fg">
              Before you ask.
            </h2>
          </div>
          <Accordion items={homeFaqs} />
        </Container>
      </section>
    </>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div className="group flex flex-col gap-1 border-b border-line pb-4">
      <span className="eyebrow text-fg-muted">{label}</span>
      <span className="text-[1.05rem] font-semibold tracking-tight text-fg transition-colors group-hover:text-teal">
        {value}
      </span>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}
