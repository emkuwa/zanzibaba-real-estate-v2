import { VISUAL_SYSTEM } from "../visual-system";

export const WHY_ZANZIBAR = {
  eyebrow: "Why Zanzibar",
  title: "The next luxury investment & lifestyle destination",
  intro:
    "Zanzibar is capturing global attention — a UNESCO heritage island, Indian Ocean paradise, and emerging investment frontier. From luxury tourism and real estate to relocation and business, Unguja offers untapped opportunity for international audiences.",
  pillars: [
    {
      title: "Tourism growth",
      description:
        "Visitor arrivals and luxury tourism investment continue to rise. Zanzibar beaches, resorts, and cultural heritage drive year-round demand from international travellers.",
      image: VISUAL_SYSTEM.lifestyle.tourism,
    },
    {
      title: "Global attention",
      description:
        "Five-star hospitality brands, infrastructure upgrades, and international media coverage position Zanzibar alongside top Indian Ocean destinations.",
      image: VISUAL_SYSTEM.lifestyle.couples,
    },
    {
      title: "Luxury tourism",
      description:
        "Beach clubs, boutique hotels, wellness retreats, and premium villa rentals define a new tier of luxury travel Zanzibar offers wealthy tourists and investors.",
      image: VISUAL_SYSTEM.propertyTypes.hotels,
    },
    {
      title: "Untapped opportunities",
      description:
        "Coastal land, off-plan developments, and hospitality assets remain accessible relative to Maldives, Dubai, and European second-home markets.",
      image: VISUAL_SYSTEM.propertyTypes.land,
    },
    {
      title: "Investment growth",
      description:
        "Real estate ROI Zanzibar targets strong rental yields, land banking, and capital appreciation — supported by tourism and diaspora demand.",
      image: VISUAL_SYSTEM.offerings.airbnb,
    },
    {
      title: "Tropical lifestyle",
      description:
        "Oceanfront living, sunset dining, kitesurfing, diving, and wellness — the lifestyle that attracts expats, digital nomads, and luxury renters.",
      image: VISUAL_SYSTEM.lifestyle.beach,
    },
  ],
} as const;
