import { site } from "@/lib/data/site";
import { cn } from "@/lib/utils";

const mapsQuery = encodeURIComponent(site.contact.address);

/** Compact tap targets — visible on mobile before the form. */
export function MobileContactStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 lg:hidden",
        className,
      )}
    >
      <ContactAction
        label="Call"
        value={site.contact.phone}
        href={`tel:${site.contact.phoneHref}`}
        cta="Call us"
      />
      <ContactAction
        label="Email"
        value={site.contact.email}
        href={`mailto:${site.contact.email}`}
        cta="Email us"
      />
    </div>
  );
}

export function ContactDetails() {
  return (
    <aside className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
      <div className="hidden flex-col gap-6 lg:flex">
        <h2 className="eyebrow text-fg-muted">Reach us directly</h2>
        <ContactAction
          label="Phone"
          value={site.contact.phone}
          href={`tel:${site.contact.phoneHref}`}
          cta="Call us"
          prominent
        />
        <ContactAction
          label="Email"
          value={site.contact.email}
          href={`mailto:${site.contact.email}`}
          cta="Email us"
          prominent
        />
      </div>

      <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-white p-7">
        <h2 className="eyebrow text-fg-muted">Studio</h2>
        <p className="text-[0.95rem] leading-relaxed text-fg-muted">{site.contact.address}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-teal transition-colors hover:text-teal-deep"
        >
          Get directions
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
        <p className="text-sm text-fg-muted">{site.contact.city}</p>
      </div>
    </aside>
  );
}

function ContactAction({
  label,
  value,
  href,
  cta,
  prominent = false,
}: {
  label: string;
  value: string;
  href: string;
  cta: string;
  prominent?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group flex flex-col gap-2 rounded-[var(--radius-card)] border border-line bg-white transition-[border-color,box-shadow] duration-300",
        "hover:border-teal/40 hover:shadow-[0_8px_30px_-12px_rgba(15,143,120,0.25)]",
        prominent ? "p-7" : "p-5",
      )}
    >
      <span className="eyebrow text-fg-muted">{label}</span>
      <span className="text-[1.05rem] font-semibold tracking-tight text-fg transition-colors group-hover:text-teal">
        {value}
      </span>
      <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.08em] text-teal">
        {cta}
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </a>
  );
}
