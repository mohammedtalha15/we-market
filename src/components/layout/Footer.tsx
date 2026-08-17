import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site, primaryNav } from "@/lib/data/site";
import { pillars } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";
import { FooterCtaBand } from "./FooterCtaBand";

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="eyebrow text-fg-onDark-muted">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="link-sweep text-[0.95rem] text-fg-onDark-muted transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-fg-onDark">
      <FooterCtaBand />

      {/* Link grid */}
      <Container className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-2 flex flex-col gap-6 lg:col-span-2">
          <span className="text-2xl font-extrabold tracking-tight text-white">
            We<span className="text-mint">Market</span>
          </span>
          <p className="max-w-xs text-[0.95rem] leading-relaxed text-fg-onDark-muted">
            {site.description}
          </p>
          <div className="flex flex-col gap-1.5 text-[0.95rem]">
            <a href={`tel:${site.contact.phoneHref}`} className="hover:text-white">
              {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="hover:text-white">
              {site.contact.email}
            </a>
            <p className="mt-2 max-w-sm text-fg-onDark-muted">{site.contact.address}</p>
          </div>
        </div>

        <Column
          title="Services"
          links={pillars.map((p) => ({ label: p.name, href: `/services/${p.slug}` }))}
        />
        <Column
          title="Industries"
          links={industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` }))}
        />
        <Column
          title="Company"
          links={primaryNav
            .filter((n) => !n.mega)
            .concat([{ label: "Contact", href: "/contact" }])}
        />
        <Column title="Connect" links={site.socials.map((s) => ({ label: s.label, href: s.href }))} />
      </Container>

      {/* Oversized statement */}
      <Container className="pb-10">
        <div className="grid gap-4 border-t border-line-onDark py-12 sm:grid-cols-3">
          {site.tagline.map((line) => (
            <p
              key={line}
              className="font-display text-[clamp(1.6rem,1rem+2.6vw,3rem)] font-extrabold leading-none text-white"
            >
              {line}
            </p>
          ))}
        </div>
      </Container>

      {/* Bottom bar */}
      <Container className="flex flex-col items-start justify-between gap-4 border-t border-line-onDark py-6 text-[0.82rem] text-fg-onDark-muted sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} WeMarket. All rights reserved.</p>
        <ul className="flex flex-wrap gap-5">
          {legal.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
