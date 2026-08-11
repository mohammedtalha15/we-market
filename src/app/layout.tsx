import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { site } from "@/lib/data/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "WeMarket — Full-Funnel Marketing & Digital Growth Partner",
    template: "%s — WeMarket",
  },
  description:
    "WeMarket connects strategy, creative, technology and performance marketing to help businesses build authority, generate demand and drive measurable growth.",
  keywords: [
    "digital marketing agency Bangalore",
    "performance marketing",
    "SEO",
    "web development",
    "brand & creative",
    "AI automation",
    "growth partner",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "WeMarket",
    title: "WeMarket — Build Authority. Generate Demand. Drive Growth.",
    description:
      "A full-funnel growth partner connecting strategy, creative, technology and performance marketing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WeMarket — Full-Funnel Growth Partner",
    description:
      "Build authority. Generate demand. Drive growth. Strategy, creative, technology and performance — one growth system.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="grain antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Cursor />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
