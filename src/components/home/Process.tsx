import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/data/content";

export function Process() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title={<>From business problem to business outcome.</>}
          lead="A clear, repeatable path from understanding your business to scaling what works."
        />

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-0 md:grid-cols-2">
          {processSteps.map((step, i) => (
            <Reveal key={step.index} delay={(i % 2) * 80}>
              <div className="group flex gap-6 border-t border-line py-8">
                <span className="font-display text-3xl font-extrabold text-line-strong transition-colors duration-500 group-hover:text-teal md:text-4xl">
                  {step.index}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-extrabold tracking-tight text-fg">{step.title}</h3>
                  <ul className="flex flex-wrap gap-x-2 gap-y-1 text-[0.92rem] text-fg-muted">
                    {step.items.map((item, j) => (
                      <li key={item} className="flex items-center gap-2">
                        {item}
                        {j < step.items.length - 1 && (
                          <span aria-hidden className="text-teal">
                            ·
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
