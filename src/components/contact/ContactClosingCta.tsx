import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/data/site";

export function ContactClosingCta() {
  return (
    <section className="relative overflow-hidden bg-lime py-20 text-ink md:py-28">
      <Container className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow flex items-center gap-2.5 text-ink/60">
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-ink" />
              Next step
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 font-display text-[length:var(--text-h1)] font-extrabold leading-[0.95] tracking-tight text-ink">
              Ready to turn your next idea into growth?
            </h2>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="flex flex-wrap gap-3">
            <Button href="#enquiry-form" tone="light" variant="solid">
              Start a Project
            </Button>
            <Button href={`tel:${site.contact.phoneHref}`} tone="light" variant="outline">
              Call WeMarket
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
