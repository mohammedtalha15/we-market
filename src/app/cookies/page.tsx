import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How and why WeMarket uses cookies on this website.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      intro="This page explains how we use cookies and similar technologies on this website."
      sections={[
        {
          heading: "What cookies are",
          body: "Cookies are small files stored on your device that help websites work and understand how they're used.",
        },
        {
          heading: "How we use them",
          body: "We use essential cookies to run the site, and may use analytics cookies to measure and improve performance. We aim to keep this minimal.",
        },
        {
          heading: "Managing cookies",
          body: "You can control or delete cookies through your browser settings. Disabling some cookies may affect how parts of the site function.",
        },
      ]}
    />
  );
}
