import { VISUAL_SYSTEM } from "../visual-system";

export const INVESTMENT_OPPORTUNITIES = [
  {
    slug: "real-estate",
    title: "Real Estate",
    description:
      "Luxury villas, apartments, and beachfront land — the core of Zanzibar investment property for international buyers.",
    href: "#opportunities",
    image: VISUAL_SYSTEM.propertyTypes.villas,
  },
  {
    slug: "hotels",
    title: "Hotels & Resorts",
    description:
      "Hotel investment Zanzibar — boutique hospitality, resort partnerships, and tourism-linked assets along premium coastlines.",
    href: "#invest",
    image: VISUAL_SYSTEM.propertyTypes.hotels,
  },
  {
    slug: "tourism-business",
    title: "Tourism Businesses",
    description:
      "Tourism investment Zanzibar spans beach clubs, tour operators, wellness brands, and experience-led ventures.",
    href: "#tourism",
    image: VISUAL_SYSTEM.lifestyle.tourism,
  },
  {
    slug: "commercial",
    title: "Commercial Property",
    description:
      "Retail, mixed-use, and growth-corridor commercial spaces for developers and institutional investors.",
    href: "#opportunities",
    image: VISUAL_SYSTEM.propertyTypes.commercial,
  },
  {
    slug: "land-banking",
    title: "Land Banking",
    description:
      "Strategic coastal and development-zone land acquisition with long-term appreciation potential.",
    href: "#areas",
    image: VISUAL_SYSTEM.propertyTypes.land,
  },
  {
    slug: "airbnb",
    title: "Airbnb Investment",
    description:
      "Short-stay villa assets in Paje, Nungwi, and Kiwengwa targeting 10–15% gross yields with professional management.",
    href: "#rentals",
    image: VISUAL_SYSTEM.offerings.airbnb,
  },
  {
    slug: "off-plan",
    title: "Off-Plan Development",
    description:
      "Early access to pre-completion pricing, flexible payments, and developer-backed programmes.",
    href: "#off-plan",
    image: VISUAL_SYSTEM.offerings.offPlan,
  },
] as const;
