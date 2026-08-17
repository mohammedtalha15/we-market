import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/data/site";

const offerings = [
  { id: "meta", label: "Meta Ads", icon: MetaLogo },
  { id: "instagram", label: "Instagram", icon: InstagramLogo },
  { id: "react", label: "React", icon: ReactLogo },
  { id: "whatsapp", label: "WhatsApp", icon: WhatsAppLogo },
] as const;

export function Services() {
  return (
    <section className="bg-ink py-16 text-fg-onDark md:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow tone="dark">Who we are</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[length:var(--text-h2)] font-extrabold text-white">
                More than a{" "}
                <span className="text-lime">marketing agency.</span>
              </h2>
            </Reveal>
          </div>
          <div className="flex flex-col gap-6">
            <Reveal delay={120}>
              <p className="text-[length:var(--text-lead)] leading-relaxed text-fg-onDark-muted">
                {site.description}
              </p>
            </Reveal>
            <Reveal delay={180}>
              <Button href="/about" tone="dark" variant="ghost" className="-ml-1 self-start px-1">
                About WeMarket
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 border-t border-line-onDark pt-12">
          <Reveal>
            <p className="eyebrow text-fg-onDark-muted">What we offer</p>
          </Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-10 sm:gap-12">
            {offerings.map((item, i) => (
              <Reveal key={item.id} delay={i * 70}>
                <span
                  className="inline-flex items-center justify-center"
                  role="img"
                  aria-label={item.label}
                >
                  <item.icon />
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function MetaLogo() {
  return (
    <svg viewBox="0 0 36 24" className="h-14 w-auto md:h-20" fill="#0668E1" aria-hidden>
      <path d="M24.45 2.8c-2.52 0-4.55 2.05-6.45 5.4C16.1 4.85 14.07 2.8 11.55 2.8 7.2 2.8 3.6 7.05 3.6 12.55c0 4.95 3.15 8.85 7.35 8.85 2.6 0 4.7-1.7 7.05-5.2 2.35 3.5 4.45 5.2 7.05 5.2 4.2 0 7.35-3.9 7.35-8.85C32.4 7.05 28.8 2.8 24.45 2.8Zm-13.2 16.1c-2.5 0-4.35-2.55-4.35-6.15 0-3.7 2-6.55 4.6-6.55 1.9 0 3.55 1.6 5.65 4.95-2.2 3.5-3.85 7.75-5.9 7.75Zm13.5 0c-2.05 0-3.7-4.25-5.9-7.75 2.1-3.35 3.75-4.95 5.65-4.95 2.6 0 4.6 2.85 4.6 6.55 0 3.6-1.85 6.15-4.35 6.15Z" />
    </svg>
  );
}

function InstagramLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-16 w-16 md:h-20 md:w-20" aria-hidden>
      <defs>
        <radialGradient id="ig-g" cx="30%" cy="110%" r="120%">
          <stop offset="0%" stopColor="#fccc63" />
          <stop offset="50%" stopColor="#f96f54" />
          <stop offset="100%" stopColor="#d62976" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-g)" />
      <rect
        x="6.4"
        y="6.4"
        width="11.2"
        height="11.2"
        rx="3.4"
        fill="none"
        stroke="white"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="2.7" fill="none" stroke="white" strokeWidth="1.7" />
      <circle cx="16.15" cy="7.85" r="0.95" fill="white" />
    </svg>
  );
}

function ReactLogo() {
  return (
    <svg viewBox="-11.5 -10.23 23 20.46" className="h-[4.25rem] w-[4.25rem] md:h-24 md:w-24" aria-hidden>
      <circle r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function WhatsAppLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-16 w-16 md:h-20 md:w-20" fill="#25D366" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
