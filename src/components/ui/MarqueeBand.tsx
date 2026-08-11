import { Marquee } from "@/components/ui/Marquee";

/**
 * Editorial full-bleed marquee divider. Repeats a phrase with a star separator.
 * `variant` picks the colour treatment.
 */
export function MarqueeBand({
  text,
  variant = "lime",
  duration = 26,
}: {
  text: string;
  variant?: "lime" | "forest" | "ink";
  duration?: number;
}) {
  const styles: Record<string, string> = {
    lime: "bg-lime text-ink border-y border-ink/10",
    forest: "bg-forest text-white border-y border-line-onDark",
    ink: "bg-ink text-white border-y border-line-onDark",
  };
  return (
    <div className={"relative " + styles[variant]} aria-hidden>
      <Marquee duration={duration}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="flex items-center gap-8 py-4 pr-8">
            <span className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              {text}
            </span>
            <span aria-hidden className="text-xl opacity-70">
              ✳
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
