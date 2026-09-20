/**
 * Luxury visual system — realestate.zanzibaba.com
 * Single source of truth for cinematic brand imagery, alt text, and SEO.
 * Next.js Image serves WebP/AVIF automatically from these sources.
 */

const LUXURY = "/images/luxury";
const EDITORIAL = "/images/editorial";

export const VISUAL_SYSTEM = {
  brand: {
    tone: "Natural daylight · Indian Ocean blues · Sand & white architecture",
    palette: ["#0A2E73", "#C89B3C", "#E8DFD0", "#07245A"],
    logo: "/brand/logos/zanzibaba-real-estate-horizontal.svg",
    logoReverse: "/brand/logos/zanzibaba-real-estate-reverse.svg",
    logoIcon: "/brand/logos/zanzibaba-real-estate-icon.svg",
    og: "/brand/og-zanzibaba-real-estate.png",
  },
  hero: {
    primary: {
      src: `${EDITORIAL}/villa-daylight.webp`,
      fallback: `${EDITORIAL}/villa-daylight.webp`,
      alt: "Modern beachfront villa with infinity pool overlooking the Indian Ocean in natural daylight — premium Zanzibar real estate investment",
      overlay: "cinematic" as const,
      priority: true,
    },
  },
  offerings: {
    offPlan: {
      src: `${EDITORIAL}/off-plan-daylight.webp`,
      fallback: `${EDITORIAL}/off-plan-daylight.webp`,
      alt: "Off-plan luxury tropical property development in Zanzibar — modern architecture and investment opportunity",
    },
    holidayHome: {
      src: `${EDITORIAL}/villa-daylight.webp`,
      fallback: `${EDITORIAL}/villa-daylight.webp`,
      alt: "Luxury Zanzibar holiday home — beachfront villa with ocean views and tropical elegance",
    },
    airbnb: {
      src: `${EDITORIAL}/villa-daylight.webp`,
      fallback: `${EDITORIAL}/villa-daylight.webp`,
      alt: "Premium Airbnb investment villa in Zanzibar — high-return short-stay rental property",
    },
  },
  propertyTypes: {
    villas: {
      src: `${EDITORIAL}/villa-daylight.webp`,
      fallback: `${EDITORIAL}/villa-daylight.webp`,
      alt: "Luxury villas Zanzibar — modern beachfront villa with infinity pool",
    },
    apartments: {
      src: `${EDITORIAL}/off-plan-daylight.webp`,
      fallback: `${EDITORIAL}/off-plan-daylight.webp`,
      alt: "Luxury apartments and residences in Zanzibar — modern tropical architecture",
    },
    land: {
      src: `${EDITORIAL}/investment-land-daylight.webp`,
      fallback: `${EDITORIAL}/investment-land-daylight.webp`,
      alt: "Beachfront land for sale in Zanzibar — premium coastal investment plots",
    },
    hotels: {
      src: `${EDITORIAL}/hotel-resort-daylight.webp`,
      fallback: `${EDITORIAL}/hotel-resort-daylight.webp`,
      alt: "Boutique hotel and hospitality investment assets in Zanzibar",
    },
    commercial: {
      src: `${EDITORIAL}/off-plan-daylight.webp`,
      fallback: `${EDITORIAL}/off-plan-daylight.webp`,
      alt: "Commercial and mixed-use property investment in Zanzibar",
    },
  },
  areas: {
    paje: {
      src: `${EDITORIAL}/paje-daylight.webp`,
      fallback: `${EDITORIAL}/paje-daylight.webp`,
      alt: "Paje Zanzibar — east-coast luxury villas and Airbnb investment property",
    },
    nungwi: {
      src: `${EDITORIAL}/nungwi-daylight.webp`,
      fallback: `${EDITORIAL}/nungwi-daylight.webp`,
      alt: "Nungwi Zanzibar — north-coast luxury villas and resort corridor property",
    },
    jambiani: {
      src: `${EDITORIAL}/jambiani-daylight.webp`,
      fallback: `${EDITORIAL}/jambiani-daylight.webp`,
      alt: "Jambiani Zanzibar — authentic coastal villas and emerging development land",
    },
    kiwengwa: {
      src: `${EDITORIAL}/matemwe-daylight.webp`,
      fallback: `${EDITORIAL}/matemwe-daylight.webp`,
      alt: "Kiwengwa Zanzibar — resort-grade holiday homes and rental investment",
    },
    matemwe: {
      src: `${EDITORIAL}/matemwe-daylight.webp`,
      fallback: `${EDITORIAL}/matemwe-daylight.webp`,
      alt: "Matemwe Zanzibar — pristine beaches and boutique hospitality investment",
    },
    "stone-town": {
      src: `${EDITORIAL}/stone-town-daylight.webp`,
      fallback: `${EDITORIAL}/stone-town-daylight.webp`,
      alt: "Stone Town Zanzibar — heritage apartments and cultural property investment",
    },
    kendwa: {
      src: `${EDITORIAL}/nungwi-daylight.webp`,
      fallback: `${EDITORIAL}/nungwi-daylight.webp`,
      alt: "Kendwa Zanzibar — luxury north-coast beach and boutique villa rentals",
    },
    fumba: {
      src: `${EDITORIAL}/fumba-daylight.webp`,
      fallback: `${EDITORIAL}/fumba-daylight.webp`,
      alt: "Fumba Peninsula Zanzibar — emerging marina development and off-plan investment",
    },
  },
  lifestyle: {
    investors: {
      src: `${EDITORIAL}/off-plan-daylight.webp`,
      fallback: `${EDITORIAL}/off-plan-daylight.webp`,
      alt: "International investors reviewing Zanzibar property investment with luxury advisory team",
    },
    beach: {
      src: `${EDITORIAL}/paje-daylight.webp`,
      fallback: `${EDITORIAL}/paje-daylight.webp`,
      alt: "Luxury Zanzibar beach lifestyle — premium tropical living on the Indian Ocean",
    },
    dining: {
      src: `${EDITORIAL}/hotel-resort-daylight.webp`,
      fallback: `${EDITORIAL}/hotel-resort-daylight.webp`,
      alt: "Premium beachfront dining and sunset rooftop experiences in Zanzibar",
    },
    tourism: {
      src: `${EDITORIAL}/matemwe-daylight.webp`,
      fallback: `${EDITORIAL}/matemwe-daylight.webp`,
      alt: "Exclusive premium tourism and luxury tropical lifestyle in Zanzibar",
    },
    remoteWork: {
      src: `${EDITORIAL}/villa-daylight.webp`,
      fallback: `${EDITORIAL}/villa-daylight.webp`,
      alt: "Digital nomad working from a luxury beachfront villa in Zanzibar — remote work paradise",
    },
    wellness: {
      src: `${EDITORIAL}/matemwe-daylight.webp`,
      fallback: `${EDITORIAL}/matemwe-daylight.webp`,
      alt: "Wellness and relaxation at a premium Zanzibar villa with infinity pool",
    },
    couples: {
      src: `${EDITORIAL}/jambiani-daylight.webp`,
      fallback: `${EDITORIAL}/jambiani-daylight.webp`,
      alt: "Couple enjoying a luxury tropical vacation at a Zanzibar beachfront villa",
    },
    tropicalLounge: {
      src: `${EDITORIAL}/hotel-resort-daylight.webp`,
      fallback: `${EDITORIAL}/hotel-resort-daylight.webp`,
      alt: "Premium tropical outdoor lounge at a luxury Zanzibar rental villa",
    },
  },
  rentals: {
    vacationVillas: {
      src: `${EDITORIAL}/villa-daylight.webp`,
      fallback: `${EDITORIAL}/villa-daylight.webp`,
      alt: "Luxury vacation villa rental Zanzibar — beachfront infinity pool and ocean views",
    },
    expatLiving: {
      src: `${EDITORIAL}/off-plan-daylight.webp`,
      fallback: `${EDITORIAL}/off-plan-daylight.webp`,
      alt: "Long-term expat housing Zanzibar — premium furnished apartment living",
    },
    digitalNomad: {
      src: `${EDITORIAL}/villa-daylight.webp`,
      fallback: `${EDITORIAL}/villa-daylight.webp`,
      alt: "Digital nomad Zanzibar accommodation — laptop work near the beach",
    },
    beachfrontMonthly: {
      src: `${EDITORIAL}/paje-daylight.webp`,
      fallback: `${EDITORIAL}/paje-daylight.webp`,
      alt: "Zanzibar beachfront rental — monthly oceanfront villa living",
    },
    remoteWork: {
      src: `${EDITORIAL}/villa-daylight.webp`,
      fallback: `${EDITORIAL}/villa-daylight.webp`,
      alt: "Remote work paradise Zanzibar — luxury villa with high-speed connectivity",
    },
    luxuryLiving: {
      src: `${EDITORIAL}/hotel-resort-daylight.webp`,
      fallback: `${EDITORIAL}/hotel-resort-daylight.webp`,
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
