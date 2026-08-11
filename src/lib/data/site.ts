/**
 * Global site configuration — real WeMarket details.
 * Source of truth. Do not invent values; use PLACEHOLDER markers where unknown.
 */
export const site = {
  name: "WeMarket",
  url: "https://wemarket.in",
  positioning: "Full-Funnel Marketing & Digital Growth Partner",
  tagline: ["Build Authority.", "Generate Demand.", "Drive Growth."],
  description:
    "WeMarket is a full-funnel growth partner helping businesses build authority, generate demand and scale through strategy, creative, technology and performance.",

  contact: {
    phone: "+91 97405 08333",
    phoneHref: "+919740508333",
    email: "info@wemarket.in",
    address:
      "Magaji Inspire, 1A, Outer Ring Rd, 3rd Block, BDA Layout, 2nd Stage, Nagarabhavi, Bengaluru, Karnataka 560072",
    city: "Bengaluru",
  },

  socials: [
    { label: "Instagram", handle: "@wemarket_dm", href: "https://instagram.com/wemarket_dm" },
    { label: "Facebook", href: "https://facebook.com/wemarket" },
    // NOTE: confirm/replace with verified handles before launch.
    { label: "LinkedIn", href: "https://www.linkedin.com/company/wemarket" },
  ],

  // Verified headline figures from wemarket.in
  proof: {
    clients: "280+",
    experience: "10+",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  mega?: "services" | "industries";
};

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services", mega: "services" },
  { label: "Industries", href: "/industries", mega: "industries" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];
