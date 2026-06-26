export type Insight = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  published: string;
  readTime: string;
  featured: boolean;
};

export const insights: Insight[] = [
  {
    slug: "why-this-site-uses-firebase-app-hosting",
    title: "Why This Website Uses Firebase App Hosting",
    summary:
      "A practical architecture decision covering the requirements, alternatives, tradeoffs, and deployment model behind the McQueen Cloud Advisory website.",
    category: "Architecture Decision",
    published: "June 2026",
    readTime: "7 minute read",
    featured: true,
  },
];