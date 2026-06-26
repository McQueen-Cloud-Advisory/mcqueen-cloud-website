import type { MetadataRoute } from "next";
import { insights } from "@/data/insights";
import { projects } from "@/data/projects";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mcqueencloud.com"
).replace(/\/+$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/work`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/insights`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    changeFrequency: "monthly",
    priority: project.featured ? 0.9 : 0.8,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: `${siteUrl}/insights/${insight.slug}`,
    changeFrequency: "monthly",
    priority: insight.featured ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...insightRoutes];
}
