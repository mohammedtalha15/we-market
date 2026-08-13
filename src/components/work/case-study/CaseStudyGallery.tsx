import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudyImage } from "@/lib/data/caseStudies";
import { cn } from "@/lib/utils";

type CaseStudyGalleryProps = {
  images: CaseStudyImage[];
  client: string;
};

function layoutClass(layout: CaseStudyImage["layout"]) {
  switch (layout) {
    case "full":
      return "col-span-full";
    case "wide":
      return "col-span-full lg:col-span-8 lg:col-start-3";
    case "half":
      return "col-span-full sm:col-span-1";
    case "grid":
    default:
      return "col-span-full sm:col-span-1";
  }
}

export function CaseStudyGallery({ images, client }: CaseStudyGalleryProps) {
  if (images.length === 0) return null;

  return (
    <section className="bg-ink py-20 text-fg-onDark md:py-28">
      <Container>
        <Reveal>
          <h2 className="eyebrow text-fg-onDark-muted">Visual story</h2>
          <p className="mt-6 max-w-2xl font-display text-[length:var(--text-h3)] font-extrabold text-white">
            Campaign and project imagery.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {images.map((img, i) => (
            <Reveal key={`${img.src}-${i}`} delay={i * 80} className={layoutClass(img.layout)}>
              <figure className="group overflow-hidden rounded-[var(--radius-card)] bg-greenblack-2">
                <div
                  className={cn(
                    "relative overflow-hidden",
                    img.layout === "full" ? "aspect-[21/9]" : "aspect-[16/10]",
                  )}
                  data-cursor="image"
                >
                  <Image
                    src={img.src}
                    alt={img.alt || `${client} project`}
                    fill
                    sizes={
                      img.layout === "full"
                        ? "100vw"
                        : "(min-width:1024px) 50vw, 100vw"
                    }
                    className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.03]"
                  />
                </div>
                {img.caption && (
                  <figcaption className="px-5 py-4 text-sm text-fg-onDark-muted">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
