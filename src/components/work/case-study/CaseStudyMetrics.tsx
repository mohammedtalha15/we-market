import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudyMetric } from "@/lib/data/caseStudies";
import { cn } from "@/lib/utils";

type CaseStudyMetricsProps = {
  metrics: CaseStudyMetric[];
  accent: string;
  compact?: boolean;
  tone?: "dark" | "light";
};

export function CaseStudyMetrics({
  metrics,
  accent,
  compact = false,
  tone = "dark",
}: CaseStudyMetricsProps) {
  if (metrics.length === 0) return null;

  const muted = tone === "dark" ? "text-fg-onDark-muted" : "text-fg-muted";
  const labelColor = tone === "dark" ? "text-white" : "text-fg";

  return (
    <div
      className={cn(
        "grid gap-8",
        compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {metrics.map((m, i) => (
        <Reveal key={`${m.label}-${i}`} delay={i * 80}>
          <div className={cn(!compact && "border-t border-line-onDark pt-6")}>
            <div
              className={cn(
                "font-display font-extrabold leading-none tracking-tight",
                compact
                  ? "text-[clamp(2rem,1.25rem+3vw,3rem)]"
                  : "text-[clamp(2.5rem,1.5rem+4vw,5rem)]",
              )}
              style={{ color: accent }}
            >
              <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
            </div>
            <div
              className={cn(
                "mt-3 text-sm font-semibold uppercase tracking-[0.14em]",
                labelColor,
              )}
            >
              {m.label}
            </div>
            {m.context && (
              <p className={cn("mt-2 text-[0.92rem] leading-snug", muted)}>{m.context}</p>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
