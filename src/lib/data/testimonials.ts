/**
 * Testimonials — only those supplied / verified from wemarket.in.
 * Do not fabricate names, titles or companies. `photo: null` => initials avatar.
 */
export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  photo: string | null;
  /** Links testimonial to a portfolio project when verified. */
  projectSlug?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Excellent website and marketing support that genuinely enhanced our online presence and brought us consistent, quality enquiries.",
    name: "Anil Kumar",
    title: "Chairman",
    company: "Aadya Academy",
    industry: "Education",
    photo: null,
    projectSlug: "aadya-academy",
  },
  {
    quote:
      "A well-planned digital marketing strategy that delivered consistent leads — the difference in our enquiry flow was clear within months.",
    name: "Lokesh",
    title: "Director",
    company: "Knowledge Plant Academy",
    industry: "Education",
    photo: null,
  },
  {
    quote:
      "Highly effective Google Ads campaigns with quality patient inquiries. Their team understood our clinic and delivered real results.",
    name: "Dr. Vanitha",
    title: "Founder",
    company: "Pragna Clinic",
    industry: "Healthcare",
    photo: null,
    projectSlug: "pragna-clinic",
  },
];
