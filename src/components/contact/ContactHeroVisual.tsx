/**
 * Editorial capability signal for the Contact hero — structured grid, no overlap.
 */
const capabilities = [
  { label: "Strategy", accent: "#74e6bf" },
  { label: "Creative", accent: "#f96f54" },
  { label: "Performance", accent: "#f4c531" },
  { label: "Technology", accent: "#4f74e6" },
  { label: "AI", accent: "#c7e552", wide: true },
] as const;

function CapabilityPill({
  label,
  accent,
  wide,
}: {
  label: string;
  accent: string;
  wide?: boolean;
}) {
  return (
    <div
      className={
        "flex items-center gap-3 rounded-2xl border border-line-onDark bg-forest-2/90 px-5 py-4 " +
        "shadow-[0_16px_40px_-20px_rgba(0,0,0,0.55)] backdrop-blur-sm " +
        (wide ? "justify-center" : "")
      }
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ background: accent }}
      />
      <span className="font-display text-lg font-extrabold tracking-tight text-white md:text-xl">
        {label}
      </span>
    </div>
  );
}

export function ContactHeroVisual() {
  const primary = capabilities.slice(0, 4);
  const ai = capabilities[4];

  return (
    <div className="relative w-full max-w-md lg:max-w-none" aria-hidden>
      <span className="pointer-events-none absolute -right-8 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-lime/8 blur-3xl" />

      <div className="relative flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {primary.map((c) => (
            <CapabilityPill key={c.label} label={c.label} accent={c.accent} />
          ))}
        </div>

        <div className="mx-auto w-full max-w-[68%]">
          <CapabilityPill label={ai.label} accent={ai.accent} wide />
        </div>

        <p className="pt-1 text-center font-display text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-fg-onDark-muted">
          One growth system
        </p>
      </div>
    </div>
  );
}
