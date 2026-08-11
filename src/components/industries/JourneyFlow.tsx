import { Reveal } from "@/components/ui/Reveal";

/**
 * Customer-journey flow — the supplied journey steps as an editorial accent path.
 * Horizontal wrap on desktop, vertical on mobile.
 */
export function JourneyFlow({
  steps,
  accent,
  tone = "dark",
}: {
  steps: string[];
  accent: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <ol className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-stretch md:gap-3">
      {steps.map((step, i) => (
        <Reveal
          as="li"
          key={step}
          delay={i * 55}
          className="flex items-center gap-3 md:flex-1 md:basis-[calc(25%-0.75rem)]"
        >
          <div
            className={
              "flex w-full items-center gap-3 rounded-2xl border px-4 py-4 " +
              (dark ? "border-line-onDark" : "border-line")
            }
            style={{ borderColor: `${accent}40` }}
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.72rem] font-bold text-ink"
              style={{ background: accent }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={
                "text-[0.95rem] font-bold tracking-tight " + (dark ? "text-white" : "text-fg")
              }
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <span aria-hidden className="hidden shrink-0 md:block" style={{ color: accent }}>
              →
            </span>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
