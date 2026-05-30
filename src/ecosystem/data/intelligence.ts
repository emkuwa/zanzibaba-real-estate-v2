import type { IntelligenceItem } from "../types";

export const INTELLIGENCE_FEED: readonly IntelligenceItem[] = [
  {
    id: "intel-001",
    slug: "zanzibar-airport-expansion-2026",
    category: "infrastructure",
    title: "Zanzibar Airport Expansion: Impact on Property & Tourism",
    excerpt:
      "Infrastructure upgrades are accelerating visitor capacity and driving north-coast and east-coast property demand.",
    publishedAt: "2026-04-15",
    href: "/intelligence#infrastructure",
  },
  {
    id: "intel-002",
    slug: "paje-airbnb-yield-report",
    category: "market-report",
    title: "Paje Airbnb Yield Report Q1 2026",
    excerpt:
      "East-coast short-stay villas continue to target 12–15% gross yields with professional management.",
    publishedAt: "2026-04-01",
    area: "Paje",
    href: "/#area-paje",
  },
  {
    id: "intel-003",
    slug: "fumba-marina-development-update",
    category: "investment-news",
    title: "Fumba Peninsula Marina: Developer Programme Update",
    excerpt:
      "Master-planned peninsula development opens early investor tranche for off-plan villas and commercial units.",
    publishedAt: "2026-03-20",
    area: "Fumba",
    href: "/developers",
  },
  {
    id: "intel-004",
    slug: "nungwi-luxury-market-growth",
    category: "area-growth",
    title: "Nungwi Luxury Market: Price Trends & Rental Demand",
    excerpt:
      "North-coast villa prices and luxury vacation rental demand continue to outperform island averages.",
    publishedAt: "2026-03-10",
    area: "Nungwi",
    href: "/#area-nungwi",
  },
  {
    id: "intel-005",
    slug: "foreign-ownership-guide-2026",
    category: "market-report",
    title: "Foreign Ownership in Zanzibar: 2026 Investor Guide",
    excerpt:
      "Approved acquisition structures, due diligence checklist, and advisory pathways for international buyers.",
    publishedAt: "2026-02-28",
    href: "/#faq",
  },
  {
    id: "intel-006",
    slug: "stone-town-expat-demand",
    category: "area-growth",
    title: "Stone Town Expat Demand: Long-Term Rental Trends",
    excerpt:
      "Heritage apartments and urban residences see rising expat and nomad long-stay demand.",
    publishedAt: "2026-02-15",
    area: "Stone Town",
    href: "/rentals",
  },
] as const;

export const INTELLIGENCE_CATEGORIES = [
  { id: "investment-news", label: "Investment News" },
  { id: "infrastructure", label: "Infrastructure Updates" },
  { id: "market-report", label: "Market Reports" },
  { id: "area-growth", label: "Area Growth Insights" },
] as const;
