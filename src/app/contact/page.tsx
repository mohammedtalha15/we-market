import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactDetails, MobileContactStrip } from "@/components/contact/ContactDetails";
import { ContactTrust } from "@/components/contact/ContactTrust";
import { ContactClosingCta } from "@/components/contact/ContactClosingCta";
import { contactFaqs } from "@/lib/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let's talk growth. Tell WeMarket what you're building — we'll map the right mix of strategy, creative, performance, technology and AI-enabled growth for your business.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      {/* Form + contact details */}
      <section className="bg-paper py-16 md:py-24 lg:py-28">
        <Container>
          <Reveal>
            <MobileContactStrip className="mb-10" />
          </Reveal>

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-20">
            <Reveal className="lg:col-span-7 xl:col-span-8">
              <ContactForm />
            </Reveal>

            <Reveal delay={80} className="lg:col-span-5 xl:col-span-4">
              <ContactDetails />
            </Reveal>
          </div>
        </Container>
      </section>

      <ContactTrust />

      {/* Contact-specific FAQ */}
      <section className="bg-paper py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-6 font-display text-[length:var(--text-h2)] font-extrabold text-fg">
              Common questions.
            </h2>
            <p className="mt-4 max-w-sm text-fg-muted leading-relaxed">
              Everything you might want to know before starting a conversation with us.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={contactFaqs} />
          </div>
        </Container>
      </section>

      <ContactClosingCta />
    </>
  );
}
