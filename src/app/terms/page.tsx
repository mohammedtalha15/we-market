import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that govern your use of the WeMarket website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      intro="These terms govern your use of the WeMarket website. By using the site, you agree to them."
      sections={[
        {
          heading: "Use of this site",
          body: "You may browse and use this website for lawful, personal and business purposes. You agree not to misuse the site or attempt to disrupt its operation.",
        },
        {
          heading: "Intellectual property",
          body: "The content, branding and design on this site belong to WeMarket unless stated otherwise, and may not be reproduced without permission.",
        },
        {
          heading: "Our work & clients",
          body: "Client names, projects and results shown are presented with permission and reflect specific engagements. Outcomes vary by industry, market and scope.",
        },
        {
          heading: "No warranty",
          body: "The site is provided on an 'as is' basis. We make no guarantees that it will be error-free or continuously available.",
        },
      ]}
    />
  );
}
