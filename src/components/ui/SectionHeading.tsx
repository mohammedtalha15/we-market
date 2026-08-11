import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h1" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={80}>
        <Heading
          className={cn(
            "font-display text-[length:var(--text-h2)] font-extrabold",
            tone === "dark" ? "text-fg-onDark" : "text-fg",
            align === "center" ? "max-w-4xl mx-auto" : "max-w-4xl",
          )}
        >
          {title}
        </Heading>
      </Reveal>
      {lead && (
        <Reveal delay={140}>
          <p
            className={cn(
              "text-[length:var(--text-lead)] leading-relaxed",
              tone === "dark" ? "text-fg-onDark-muted" : "text-fg-muted",
              align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
