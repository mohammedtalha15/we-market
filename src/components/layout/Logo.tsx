import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * WeMarket wordmark. Retains brand DNA: "We" + "Market" with a mint accent mark.
 * Replace with the official logo asset when provided (keep the accent tone).
 */
export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="WeMarket — home"
      className={cn(
        "group inline-flex items-baseline text-[1.35rem] font-extrabold tracking-[-0.04em] leading-none",
        tone === "dark" ? "text-white" : "text-ink",
        className,
      )}
    >
      <span>We</span>
      <span className="text-teal">Market</span>
      <span className="ml-0.5 h-1.5 w-1.5 translate-y-[-0.05em] self-end rounded-full bg-mint transition-transform duration-500 group-hover:scale-150" />
    </Link>
  );
}
