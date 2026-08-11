import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/lib/data/site";

export type LegalSection = { heading: string; body: string };

/** Simple, honest legal page shell. Content is intentionally high-level; the
 *  definitive policy is available on request via email. */
export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={<>{title}</>} lead={intro} />
      <section className="bg-paper py-20 md:py-28">
        <Container size="narrow">
          <div className="flex flex-col gap-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display text-[length:var(--text-h3)] font-extrabold text-fg">
                  {s.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-fg-muted">{s.body}</p>
              </div>
            ))}
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-8">
              <p className="text-fg-muted">
                For the full, up-to-date policy or any questions, contact us at{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="font-semibold text-teal underline underline-offset-4"
                >
                  {site.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
