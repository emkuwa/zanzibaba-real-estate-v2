/**
 * Luxury visual system — realestate.zanzibaba.com
 * Single source of truth for cinematic brand imagery, alt text, and SEO.
 * Next.js Image serves WebP/AVIF automatically from these sources.
 */

const LUXURY = "/images/luxury";

export const VISUAL_SYSTEM = {
  brand: {
    tone: "Warm luxury · Golden hour · Deep ocean blues · Sand & white architecture",
    palette: ["#0A2E73", "#C89B3C", "#E8DFD0", "#07245A"],
    logo: "/brand/logos/zanzibaba-real-estate-horizontal.svg",
    logoReverse: "/brand/logos/zanzibaba-real-estate-reverse.svg",
    logoIcon: "/brand/logos/zanzibaba-real-estate-icon.svg",
    og: "/brand/og-zanzibaba-real-estate.png",
  },
  hero: {
    primary: {
      src: `${LUXURY}/hero/hero-cinematic-zanzibar.webp`,
      fallback: `${LUXURY}/hero/hero-cinematic-zanzibar.png`,
      alt: "Ultra-luxury modern beachfront villa with infinity pool overlooking the Indian Ocean at golden sunset — premium Zanzibar real estate investment",
      overlay: "cinematic" as const,
      priority: true,
    },
  },
  offerings: {
    offPlan: {
      src: `${LUXURY}/offerings/off-plan-investment.webp`,
      fallback: `${LUXURY}/offerings/off-plan-investment.png`,
      alt: "Off-plan luxury tropical property development in Zanzibar — modern architecture and investment opportunity",
    },
    holidayHome: {
      src: `${LUXURY}/offerings/holiday-home-luxury.webp`,
      fallback: `${LUXURY}/offerings/holiday-home-luxury.png`,
      alt: "Luxury Zanzibar holiday home — beachfront villa with ocean views and tropical elegance",
    },
    airbnb: {
      src: `${LUXURY}/offerings/airbnb-investment.webp`,
      fallback: `${LUXURY}/offerings/airbnb-investment.png`,
      alt: "Premium Airbnb investment villa in Zanzibar — high-return short-stay rental property",
    },
  },
  propertyTypes: {
    villas: {
      src: `${LUXURY}/offerings/villa-luxury.webp`,
      fallback: `${LUXURY}/offerings/villa-luxury.png`,
      alt: "Luxury villas Zanzibar — modern beachfront villa with infinity pool",
    },
    apartments: {
      src: `${LUXURY}/offerings/apartment-luxury.webp`,
      fallback: `${LUXURY}/offerings/apartment-luxury.png`,
      alt: "Luxury apartments and residences in Zanzibar — modern tropical architecture",
    },
    land: {
      src: `${LUXURY}/offerings/beachfront-land.webp`,
      fallback: `${LUXURY}/offerings/beachfront-land.png`,
      alt: "Beachfront land for sale in Zanzibar — premium coastal investment plots",
    },
    hotels: {
      src: `${LUXURY}/offerings/boutique-hotel.webp`,
      fallback: `${LUXURY}/offerings/boutique-hotel.png`,
      alt: "Boutique hotel and hospitality investment assets in Zanzibar",
    },
    commercial: {
      src: `${LUXURY}/offerings/commercial-luxury.webp`,
      fallback: `${LUXURY}/offerings/commercial-luxury.png`,
      alt: "Commercial and mixed-use property investment in Zanzibar",
    },
  },
  areas: {
    paje: {
      src: `${LUXURY}/areas/paje.webp`,
      fallback: `${LUXURY}/areas/paje.png`,
      alt: "Paje Zanzibar — east-coast luxury villas and Airbnb investment property",
    },
    nungwi: {
      src: `${LUXURY}/areas/nungwi.webp`,
      fallback: `${LUXURY}/areas/nungwi.png`,
      alt: "Nungwi Zanzibar — north-coast luxury villas and resort corridor property",
    },
    jambiani: {
      src: `${LUXURY}/areas/jambiani.webp`,
      fallback: `${LUXURY}/areas/jambiani.png`,
      alt: "Jambiani Zanzibar — authentic coastal villas and emerging development land",
    },
    kiwengwa: {
      src: `${LUXURY}/areas/kiwengwa.webp`,
      fallback: `${LUXURY}/areas/kiwengwa.png`,
      alt: "Kiwengwa Zanzibar — resort-grade holiday homes and rental investment",
    },
    matemwe: {
      src: `${LUXURY}/areas/matemwe.webp`,
      fallback: `${LUXURY}/areas/matemwe.png`,
      alt: "Matemwe Zanzibar — pristine beaches and boutique hospitality investment",
    },
    "stone-town": {
      src: `${LUXURY}/areas/stone-town.webp`,
      fallback: `${LUXURY}/areas/stone-town.png`,
      alt: "Stone Town Zanzibar — heritage apartments and cultural property investment",
    },
    kendwa: {
      src: `${LUXURY}/areas/kendwa.webp`,
      fallback: `${LUXURY}/areas/kendwa.png`,
      alt: "Kendwa Zanzibar — luxury north-coast beach and boutique villa rentals",
    },
    fumba: {
      src: `${LUXURY}/areas/fumba.webp`,
      fallback: `${LUXURY}/areas/fumba.png`,
      alt: "Fumba Peninsula Zanzibar — emerging marina development and off-plan investment",
    },
  },
  lifestyle: {
    investors: {
      src: `${LUXURY}/lifestyle/investors-meeting.webp`,
      fallback: `${LUXURY}/lifestyle/investors-meeting.png`,
      alt: "International investors reviewing Zanzibar property investment with luxury advisory team",
    },
    beach: {
      src: `${LUXURY}/lifestyle/beach-lifestyle.webp`,
      fallback: `${LUXURY}/lifestyle/beach-lifestyle.png`,
      alt: "Luxury Zanzibar beach lifestyle — premium tropical living on the Indian Ocean",
    },
    dining: {
      src: `${LUXURY}/lifestyle/luxury-dining.webp`,
      fallback: `${LUXURY}/lifestyle/luxury-dining.png`,
      alt: "Premium beachfront dining and sunset rooftop experiences in Zanzibar",
    },
    tourism: {
      src: `${LUXURY}/lifestyle/premium-tourism.webp`,
      fallback: `${LUXURY}/lifestyle/premium-tourism.png`,
      alt: "Exclusive premium tourism and luxury tropical lifestyle in Zanzibar",
    },
    remoteWork: {
      src: `${LUXURY}/lifestyle/remote-work-paradise.webp`,
      fallback: `${LUXURY}/lifestyle/remote-work-paradise.png`,
      alt: "Digital nomad working from a luxury beachfront villa in Zanzibar — remote work paradise",
    },
    wellness: {
      src: `${LUXURY}/lifestyle/wellness-relaxation.webp`,
      fallback: `${LUXURY}/lifestyle/wellness-relaxation.png`,
      alt: "Wellness and relaxation at a premium Zanzibar villa with infinity pool",
    },
    couples: {
      src: `${LUXURY}/lifestyle/couples-vacation.webp`,
      fallback: `${LUXURY}/lifestyle/couples-vacation.png`,
      alt: "Couple enjoying a luxury tropical vacation at a Zanzibar beachfront villa",
    },
    tropicalLounge: {
      src: `${LUXURY}/lifestyle/tropical-lounge.webp`,
      fallback: `${LUXURY}/lifestyle/tropical-lounge.png`,
      alt: "Premium tropical outdoor lounge at a luxury Zanzibar rental villa",
    },
  },
  rentals: {
    vacationVillas: {
      src: `${LUXURY}/rentals/vacation-villas.webp`,
      fallback: `${LUXURY}/rentals/vacation-villas.png`,
      alt: "Luxury vacation villa rental Zanzibar — beachfront infinity pool and ocean views",
    },
    expatLiving: {
      src: `${LUXURY}/rentals/expat-living.webp`,
      fallback: `${LUXURY}/rentals/expat-living.png`,
      alt: "Long-term expat housing Zanzibar — premium furnished apartment living",
    },
    digitalNomad: {
      src: `${LUXURY}/rentals/digital-nomad.webp`,
      fallback: `${LUXURY}/rentals/digital-nomad.png`,
      alt: "Digital nomad Zanzibar accommodation — laptop work near the beach",
    },
    beachfrontMonthly: {
      src: `${LUXURY}/rentals/beachfront-monthly.webp`,
      fallback: `${LUXURY}/rentals/beachfront-monthly.png`,
      alt: "Zanzibar beachfront rental — monthly oceanfront villa living",
    },
    remoteWork: {
      src: `${LUXURY}/rentals/remote-work.webp`,
      fallback: `${LUXURY}/rentals/remote-work.png`,
      alt: "Remote work paradise Zanzibar — luxury villa with high-speed connectivity",
    },
    luxuryLiving: {
      src: `${LUXURY}/rentals/luxury-living.webp`,
      fallback: `${LUXURY}/rentals/luxury-living.png`,
      alt: "Zanzibar luxury living — premium interiors and tropical elegance",
    },
  },
  chat: {
    aiAdvisor: {
      src: `${LUXURY}/chat/ai-advisor.webp`,
      fallback: `${LUXURY}/chat/ai-advisor.png`,
      alt: "Zanzibaba AI investment advisor — premium property consultation assistant",
    },
  },
  leadMagnet: {
    guide2026: {
      src: `${LUXURY}/lead-magnet/investment-guide-2026.webp`,
      fallback: `${LUXURY}/lead-magnet/investment-guide-2026.png`,
      alt: "2026 Zanzibar Property Investment Guide — free luxury investor report",
    },
  },
} as const;

export type VisualAsset = {
  src: string;
  fallback: string;
  alt: string;
};

/** Resolve WebP path with PNG fallback for build-time safety */
export function visualSrc(asset: VisualAsset): string {
  return asset.src;
}

export function visualFallback(asset: VisualAsset): string {
  return asset.fallback;
}

/** Legacy funnel image map — now powered by luxury visual system */
export const FUNNEL_IMAGES = {
  hero: VISUAL_SYSTEM.hero.primary.fallback,
  og: VISUAL_SYSTEM.hero.primary.fallback,
  beachSunset: VISUAL_SYSTEM.areas.paje.fallback,
  stoneTownHarbor: VISUAL_SYSTEM.areas["stone-town"].fallback,
  stoneTownPromenade: VISUAL_SYSTEM.areas["stone-town"].fallback,
  stoneTownFort: VISUAL_SYSTEM.areas["stone-town"].fallback,
  stoneTownGolden: VISUAL_SYSTEM.areas["stone-town"].fallback,
  coastalWide: VISUAL_SYSTEM.areas.jambiani.fallback,
  villaLuxury: VISUAL_SYSTEM.propertyTypes.villas.fallback,
  development: VISUAL_SYSTEM.offerings.offPlan.fallback,
} as const;

export const INVESTOR_PATHWAY_VISUALS = [
  {
    id: "holiday-home",
    title: "Holiday Home",
    mood: "Buy your dream villa in Zanzibar",
    image: VISUAL_SYSTEM.offerings.holidayHome,
    href: "#qualify",
    tag: "Buy",
  },
  {
    id: "airbnb",
    title: "Airbnb Investment",
    mood: "High-return short-stay assets",
    image: VISUAL_SYSTEM.offerings.airbnb,
    href: "#qualify",
    tag: "Invest",
  },
  {
    id: "off-plan",
    title: "Off-Plan Property",
    mood: "Future luxury investment",
    image: VISUAL_SYSTEM.offerings.offPlan,
    href: "#off-plan",
    tag: "Invest",
  },
  {
    id: "vacation-rental",
    title: "Luxury Vacation Rental",
    mood: "Beachfront villas for your stay",
    image: VISUAL_SYSTEM.rentals.vacationVillas,
    href: "#rentals",
    tag: "Rent",
  },
  {
    id: "long-term",
    title: "Long-Term Rental",
    mood: "Expat & monthly living",
    image: VISUAL_SYSTEM.rentals.expatLiving,
    href: "#rentals",
    tag: "Rent",
  },
  {
    id: "digital-nomad",
    title: "Digital Nomad Living",
    mood: "Work from paradise",
    image: VISUAL_SYSTEM.rentals.digitalNomad,
    href: "#lifestyle",
    tag: "Rent",
  },
] as const;

export const LIFESTYLE_GALLERY = [
  VISUAL_SYSTEM.lifestyle.investors,
  VISUAL_SYSTEM.lifestyle.beach,
  VISUAL_SYSTEM.lifestyle.remoteWork,
  VISUAL_SYSTEM.lifestyle.dining,
  VISUAL_SYSTEM.lifestyle.couples,
  VISUAL_SYSTEM.lifestyle.tourism,
  VISUAL_SYSTEM.lifestyle.wellness,
  VISUAL_SYSTEM.lifestyle.tropicalLounge,
] as const;
