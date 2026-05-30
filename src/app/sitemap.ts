import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const pages = [
    { url: base, priority: 1, freq: "weekly" as const },
    { url: `${base}/ecosystem`, priority: 0.95, freq: "weekly" as const },
    { url: `${base}/opportunities`, priority: 0.94, freq: "weekly" as const },
    { url: `${base}/developers`, priority: 0.9, freq: "weekly" as const },
    { url: `${base}/intelligence`, priority: 0.92, freq: "daily" as const },
    { url: `${base}/rentals`, priority: 0.91, freq: "weekly" as const },
    { url: `${base}/insights`, priority: 0.88, freq: "weekly" as const },
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

  return [
    ...pages.map(({ url, priority, freq }) => ({
      url,
      lastModified: now,
      changeFrequency: freq,
      priority,
    })),
    ...anchors.map((path) => ({
      url: `${base}/${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];
}
