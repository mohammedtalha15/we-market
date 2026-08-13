/**
 * DEMO PLACEHOLDER VISUALS — not real client work, not photographs.
 *
 * Premium editorial SVG compositions, one motif per industry, tinted with the
 * project's accent over a green-black field. These stand in for real campaign
 * photography during development ONLY. Replace by setting `project.image`; a
 * real image then bypasses this component entirely. Never present these as
 * actual client deliverables.
 */
import type { Project } from "@/lib/data/projects";

function monogram(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Deterministic motif from the industry, with a creative/neutral fallback. */
function motifFor(slug: string): "estate" | "education" | "healthcare" | "corporate" | "creative" {
  if (slug === "real-estate") return "estate";
  if (slug === "education") return "education";
  if (slug === "healthcare") return "healthcare";
  if (slug === "corporate-professional") return "corporate";
  return "creative";
}

export function WorkImage({
  project,
  accent,
  className,
}: {
  project: Project;
  accent: string;
  className?: string;
}) {
  const motif = motifFor(project.industrySlug);
  const gid = `g-${project.slug}`;
  const grad = `grad-${project.slug}`;

  return (
    <svg
      data-cursor="image"
      viewBox="0 0 640 460"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${project.client} — demo placeholder visual`}
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.42" />
          <stop offset="55%" stopColor={accent} stopOpacity="0.08" />
          <stop offset="100%" stopColor="#06130d" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={gid} cx="18%" cy="112%" r="95%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="60%" stopColor={accent} stopOpacity="0.05" />
          <stop offset="100%" stopColor="#06130d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* green-black base + accent light */}
      <rect width="640" height="460" fill="#06130d" />
      <rect width="640" height="460" fill={`url(#${grad})`} />
      <rect width="640" height="460" fill={`url(#${gid})`} />

      {/* oversized editorial monogram */}
      <text
        x="612"
        y="150"
        textAnchor="end"
        style={{ fontSize: "200px", fontWeight: 800, letterSpacing: "-0.05em" }}
        fill={accent}
        opacity="0.14"
      >
        {monogram(project.client)}
      </text>

      {/* industry motif — abstract, not literal */}
      <g stroke={accent} strokeOpacity="0.85" fill="none" strokeWidth="2.5">
        {motif === "estate" && (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={70 + i * 92}
                y={300 - i * 44}
                width="66"
                height={120 + i * 44}
                rx="4"
                fill={accent}
                fillOpacity={i === 2 ? 0.22 : 0.06}
              />
            ))}
            <line x1="40" y1="420" x2="600" y2="420" strokeOpacity="0.4" />
          </g>
        )}
        {motif === "education" && (
          <g>
            <path d="M110 250 L320 180 L530 250 L320 320 Z" fill={accent} fillOpacity="0.14" />
            <path d="M320 320 L320 386" />
            <path d="M250 296 L250 356 Q320 396 390 356 L390 296" />
            <circle cx="320" cy="250" r="6" fill={accent} />
          </g>
        )}
        {motif === "healthcare" && (
          <g>
            <path
              d="M40 300 H180 L215 230 L275 370 L330 250 L365 300 H600"
              strokeWidth="3"
            />
            <circle cx="470" cy="180" r="70" fill={accent} fillOpacity="0.1" />
            <path d="M470 148 V212 M438 180 H502" strokeWidth="4" />
          </g>
        )}
        {motif === "corporate" && (
          <g>
            {[0, 1, 2, 3, 4].map((c) =>
              [0, 1, 2].map((r) => (
                <circle
                  key={`${c}-${r}`}
                  cx={140 + c * 90}
                  cy={170 + r * 80}
                  r="7"
                  fill={accent}
                  fillOpacity={(c + r) % 3 === 0 ? 0.9 : 0.18}
                />
              )),
            )}
            <path d="M140 170 L410 330 M320 90 L500 250" strokeOpacity="0.35" />
          </g>
        )}
        {motif === "creative" && (
          <g>
            <circle cx="250" cy="230" r="96" fill={accent} fillOpacity="0.12" />
            <rect x="300" y="150" width="150" height="150" rx="10" fill={accent} fillOpacity="0.2" />
            <path d="M120 360 Q320 260 520 360" strokeOpacity="0.5" />
          </g>
        )}
      </g>

      {/* demo tag — keeps it honest as a placeholder */}
      <g opacity="0.55">
        <rect x="24" y="24" width="112" height="24" rx="12" fill="#06130d" fillOpacity="0.6" />
        <text x="80" y="40" textAnchor="middle" fill={accent} style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em" }}>
          DEMO VISUAL
        </text>
      </g>
    </svg>
  );
}
