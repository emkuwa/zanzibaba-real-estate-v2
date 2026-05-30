import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { OPPORTUNITIES } from "@/ecosystem/data/opportunities";
import { DEVELOPERS } from "@/ecosystem/data/developers";
import { ARTICLES } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const pages = [
    { url: base, priority: 1, changeFreq: "weekly" as const },
    { url: `${base}/ecosystem`, priority: 0.95, changeFreq: "weekly" as const },
    { url: `${base}/opportunities`, priority: 0.94, changeFreq: "weekly" as const },
    { url: `${base}/developers`, priority: 0.9, changeFreq: "weekly" as const },
    { url: `${base}/intelligence`, priority: 0.92, changeFreq: "daily" as const },
    { url: `${base}/rentals`, priority: 0.91, changeFreq: "weekly" as const },
    { url: `${base}/insights`, priority: 0.88, changeFreq: "weekly" as const },
  ];

  const anchors = [
    "#ecosystem",
    "#discover",
    "#why-zanzibar",
    "#invest",
    "#opportunities",
    "#rentals",
    "#areas",
    "#tourism",
    "#expat-hub",
    "#business",
    "#qualify",
    "#faq",
  ];

  // Individual opportunity detail pages (SEO depth)
  const opportunityPages = OPPORTUNITIES.map((opp) => ({
    url: `${base}/opportunities/${opp.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.87,
  }));

  // Individual developer detail pages
  const developerPages = DEVELOPERS.map((dev) => ({
    url: `${base}/developers/${dev.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.86,
  }));

  // Individual article pages
  const articlePages = ARTICLES.map((article) => ({
    url: `${base}/insights/${article.slug}`,
    lastModified: new Date(article.dateModified ?? article.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.86,
  }));

  return [
    ...pages.map(({ url, priority, changeFreq }) => ({
      url,
      lastModified: now,
      changeFrequency: changeFreq,
      priority,
    })),
    ...anchors.map((path) => ({
      url: `${base}/${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...opportunityPages,
    ...articlePages,
    ...developerPages,
  ];
}
