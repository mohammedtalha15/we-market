/**
 * Accent colours are vivid for dark backgrounds and for fills/dots/borders.
 * When an accent is used as TEXT on a light background, the vivid version can
 * fail WCAG contrast — so map each to a darker, contrast-safe variant.
 */
export const accentInk: Record<string, string> = {
  "#74e6bf": "#0c7a63", // mint  → deep teal-green
  "#0f8f78": "#0d7a66", // teal
  "#c7e552": "#5f7a12", // lime  → olive
  "#f4c531": "#8a6b00", // yellow→ dark gold
  "#ef7d3c": "#c25a1c", // orange
  "#f96f54": "#c2452c", // coral
  "#f2a4c6": "#b85585", // pink
  "#4f74e6": "#3a5bc7", // blue
};

/** Contrast-safe accent for text on light backgrounds. */
export function inkFor(hex: string) {
  return accentInk[hex] ?? hex;
}
