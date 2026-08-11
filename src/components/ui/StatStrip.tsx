import { Reveal } from "@/components/ui/Reveal";

type Stat = { value: string; label: string; accent?: string };

/** Reusable stat row. `tone` sets text colour for light/dark sections. */
export function StatStrip({
  stats,
  tone = "dark",
  className,
}: {
  stats: Stat[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={
        "flex flex-wrap gap-x-12 gap-y-8 border-t pt-8 " +
        (dark ? "border-line-onDark " : "border-line ") +
        (className ?? "")
      }
    >
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 70}>
          <div>
            <div
              className="font-display text-4xl font-extrabold md:text-5xl"
              style={{ color: s.accent ?? (dark ? "#ffffff" : "var(--color-fg)") }}
            >
              {s.value}
            </div>
            <div
              className={
                "mt-1 text-sm " + (dark ? "text-fg-onDark-muted" : "text-fg-muted")
              }
            >
              {s.label}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
