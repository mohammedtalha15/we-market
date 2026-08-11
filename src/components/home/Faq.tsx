import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { homeFaqs } from "@/lib/data/content";

export function Faq() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="FAQ" title={<>Questions, answered.</>} />
          <Reveal delay={160}>
            <div className="mt-8">
              <Button href="/contact" variant="outline">
                Still curious? Talk to us
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <Accordion items={homeFaqs} />
        </Reveal>
      </Container>
    </section>
  );
}
