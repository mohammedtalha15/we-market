import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudyTestimonial } from "@/lib/data/caseStudies";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

type CaseStudyTestimonialBlockProps = {
  testimonial: CaseStudyTestimonial;
  accent: string;
};

export function CaseStudyTestimonialBlock({
  testimonial,
  accent,
}: CaseStudyTestimonialBlockProps) {
  return (
    <section className="bg-paper py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <svg
              width="44"
              height="34"
              viewBox="0 0 44 34"
              className="mx-auto"
              style={{ color: accent }}
              aria-hidden
            >
              <path
                d="M0 34V20C0 9 6 2 18 0l2 6c-6 2-9 5-9 10h7v18H0zm24 0V20C24 9 30 2 42 0l2 6c-6 2-9 5-9 10h7v18H24z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
            <blockquote className="mt-8 font-display text-[clamp(1.5rem,1rem+2.2vw,2.5rem)] font-extrabold leading-[1.12] tracking-tight text-fg">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {testimonial.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={testimonial.photo}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <span
                  className="grid h-14 w-14 place-items-center rounded-full font-bold text-greenblack"
                  style={{ background: accent }}
                >
                  {initials(testimonial.name)}
                </span>
              )}
              <div className="text-center sm:text-left">
                <div className="font-bold tracking-tight text-fg">{testimonial.name}</div>
                <div className="text-sm text-fg-muted">
                  {testimonial.title}, {testimonial.company}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
