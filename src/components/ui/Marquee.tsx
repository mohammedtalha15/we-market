import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  duration?: number;
  className?: string;
};

/**
 * Seamless CSS marquee. Renders the row twice; track translates -50%.
 * Pauses on hover; disabled under prefers-reduced-motion (see globals.css).
 */
export function Marquee({ children, duration = 40, className }: MarqueeProps) {
  return (
    <div
      className={cn("marquee group relative flex overflow-hidden", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div className="marquee-track flex shrink-0 items-center">
        {children}
        <span aria-hidden className="flex shrink-0 items-center">
          {children}
        </span>
      </div>
    </div>
  );
}
