import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { StatStrip } from "@/components/ui/StatStrip";
import { MarqueeBand } from "@/components/ui/MarqueeBand";
import { WorkGrid } from "@/components/work/WorkGrid";
import { FinalCta } from "@/components/home/FinalCta";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected WeMarket work across real estate, education, healthcare and more — lead generation, web, brand and performance, with the outcomes to match.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={
          <>
            Work that <span className="text-lime">moves business.</span>
          </>
        }
        lead="Real clients. Real outcomes. A selection of the brands we've helped get discovered, earn trust and grow — across industries and channels."
      >
        <StatStrip
          className="mt-10"
          stats={[
            { value: site.proof.clients, label: "Clients served" },
            { value: site.proof.experience, label: "Years of experience" },
            { value: "10+", label: "Industries" },
            { value: "1,450", label: "Leads in a year, one client", accent: "#f96f54" },
          ]}
        />
      </PageHero>

      <MarqueeBand text="Selected Work" variant="lime" />

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <WorkGrid />
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
