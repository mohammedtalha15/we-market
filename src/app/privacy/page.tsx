import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How WeMarket collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="We respect your privacy. This summary explains what we collect and why. The definitive policy is available on request."
      sections={[
        {
          heading: "What we collect",
          body: "When you submit an enquiry or contact form, we collect the details you provide — such as your name, email, phone, company and message — so we can respond and discuss your project.",
        },
        {
          heading: "How we use it",
          body: "We use your information solely to respond to your enquiry, provide services you request and communicate with you about your project. We do not sell your personal data.",
        },
        {
          heading: "Analytics & cookies",
          body: "We may use privacy-respecting analytics to understand how the site is used and to improve it. See our Cookie Policy for details.",
        },
        {
          heading: "Your choices",
          body: "You can request access to, correction of, or deletion of your personal data at any time by contacting us.",
        },
      ]}
    />
  );
}
