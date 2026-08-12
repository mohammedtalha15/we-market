import { industries } from "@/lib/data/industries";
import { pillars } from "@/lib/data/services";

/** Allowed industry values — existing verticals plus "other". */
export const ALLOWED_INDUSTRY_SLUGS = [
  ...industries.map((i) => i.slug),
  "other",
] as const;

/** Allowed service values — existing pillars plus "multiple". */
export const ALLOWED_SERVICE_SLUGS = [
  ...pillars.map((p) => p.slug),
  "multiple",
] as const;

export const FIELD_LIMITS = {
  name: 200,
  company: 200,
  email: 254,
  phone: 40,
  goal: 5000,
} as const;

/** Window for duplicate email protection (milliseconds). */
export const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;

/** Basic rate limit: max submissions per IP hash in the window. */
export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
