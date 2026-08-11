import { cn } from "@/lib/utils";

type EyebrowProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "light" | "dark";
};

/** Compact tracked label with a leading marker dot. */
export function Eyebrow({ className, tone = "light", children, ...props }: EyebrowProps) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2.5",
        tone === "light" ? "text-fg-muted" : "text-fg-onDark-muted",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full bg-teal"
      />
      {children}
    </span>
  );
}
