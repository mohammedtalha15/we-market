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
    "WeMarket is a full-funnel growth partner helping businesses build authority, generate demand and scale — combining strategy, creative, performance, technology and AI into one operating model.",

  contact: {
    phone: "+91 97405 08333",
    phoneHref: "+919740508333",
    email: "info@wemarket.in",
    address:
      "Second Floor, Samruddhi Arcade, 772, 80 Feet Rd, Opp. HDFC Bank, ITI Employees Layout, Mallathahalli, Bengaluru, Karnataka 560056",
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
