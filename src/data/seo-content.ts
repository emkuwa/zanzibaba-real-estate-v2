import { VISUAL_SYSTEM, type VisualAsset } from "./visual-system";

export const WHY_INVEST = {
  eyebrow: "Why Invest in Zanzibar",
  title: "A rising luxury destination with compelling returns",
  intro:
    "Zanzibar real estate combines Indian Ocean lifestyle with one of East Africa's fastest-growing tourism markets. International investors, diaspora buyers, and luxury property seekers are acquiring beachfront villas, off-plan developments, and investment land across Unguja.",
  pillars: [
    {
      title: "Tourism growth",
      description:
        "Visitor arrivals continue to rise, driving demand for luxury villas, holiday homes, and hospitality assets across Paje, Nungwi, and Stone Town.",
      image: VISUAL_SYSTEM.lifestyle.tourism,
    },
    {
      title: "ROI potential",
      description:
        "Zanzibar investment property — especially Airbnb-ready homes — can deliver attractive rental yields with professional short-stay management.",
      image: VISUAL_SYSTEM.offerings.airbnb,
    },
    {
      title: "Beachfront demand",
      description:
        "Beachfront property in Zanzibar remains scarce. Coastal land and luxury villas command premium pricing with long-term appreciation potential.",
      image: VISUAL_SYSTEM.propertyTypes.land,
    },
    {
      title: "Luxury tourism market",
      description:
        "Five-star resorts and boutique hospitality are expanding, elevating the island's profile among international luxury travellers.",
      image: VISUAL_SYSTEM.lifestyle.beach,
    },
    {
      title: "Emerging opportunities",
      description:
        "Off-plan property in Zanzibar offers flexible payments, early investor pricing, and access to pre-completion appreciation.",
      image: VISUAL_SYSTEM.areas.fumba,
    },
  ],
} as const;

export const INVESTMENT_AREAS = [
  {
    slug: "paje",
    name: "Paje",
    headline: "East-coast lifestyle & Airbnb yield",
    description:
      "Paje is the heart of Zanzibar's kitesurfing and boutique villa scene. Property for sale in Paje suits Airbnb investors, holiday home buyers, and developers seeking east-coast frontage.",
    highlights: ["Strong short-stay demand", "Villa & land opportunities", "East Coast Office nearby"],
    image: VISUAL_SYSTEM.areas.paje,
  },
  {
    slug: "nungwi",
    name: "Nungwi",
    headline: "North-coast luxury & resort corridor",
    description:
      "Nungwi attracts luxury villas Zanzibar buyers seek — premium beachfront, resort adjacency, and high-end holiday home demand from international buyers.",
    highlights: ["Luxury villa market", "Resort corridor", "Premium pricing"],
    image: VISUAL_SYSTEM.areas.nungwi,
  },
  {
    slug: "jambiani",
    name: "Jambiani",
    headline: "Authentic coast & emerging development",
    description:
      "Jambiani offers a quieter alternative to Paje with growing villa development and land for sale in Zanzibar's south-east coast.",
    highlights: ["Emerging villa plots", "Authentic village setting", "Value entry points"],
    image: VISUAL_SYSTEM.areas.jambiani,
  },
  {
    slug: "kiwengwa",
    name: "Kiwengwa",
    headline: "Resort-grade rental market",
    description:
      "Kiwengwa's resort strip drives consistent rental occupancy — ideal for Zanzibar holiday homes and hospitality investment.",
    highlights: ["Resort adjacency", "Rental occupancy", "Beach access"],
    image: VISUAL_SYSTEM.areas.kiwengwa,
  },
  {
    slug: "matemwe",
    name: "Matemwe",
    headline: "Pristine beaches & boutique hospitality",
    description:
      "Matemwe features white-sand beaches and boutique hotel opportunities for investors targeting the luxury tourism market.",
    highlights: ["Boutique hospitality", "Pristine coastline", "Exclusive positioning"],
    image: VISUAL_SYSTEM.areas.matemwe,
  },
  {
    slug: "stone-town",
    name: "Stone Town",
    headline: "Heritage, culture & urban yield",
    description:
      "Stone Town heritage apartments and character homes appeal to diaspora buyers, retirees, and investors seeking cultural capital alongside rental yield.",
    highlights: ["UNESCO-adjacent districts", "Heritage apartments", "Walkable Old Town"],
    image: VISUAL_SYSTEM.areas["stone-town"],
  },
] as const;

export const PROPERTY_TYPES = [
  {
    slug: "villas",
    title: "Luxury Villas",
    badge: "featured" as const,
    location: "Paje · Nungwi · East Coast",
    priceFrom: "From $350,000",
    description:
      "Beachfront and near-beach luxury villas with title coordination and investor-grade documentation.",
    image: VISUAL_SYSTEM.propertyTypes.villas,
  },
  {
    slug: "apartments",
    title: "Apartments",
    badge: "new-listing" as const,
    location: "Stone Town · Coastal Residences",
    priceFrom: "From $120,000",
    description:
      "Modern apartments and heritage residences for yield-focused international buyers.",
    image: VISUAL_SYSTEM.propertyTypes.apartments,
  },
  {
    slug: "land",
    title: "Beachfront Land",
    badge: "beachfront" as const,
    location: "East & North Coast",
    priceFrom: "From $45,000",
    description:
      "Development plots with clear boundaries — suited to villas, hotels, or phased programmes.",
    image: VISUAL_SYSTEM.propertyTypes.land,
  },
  {
    slug: "hotels",
    title: "Hotels & Hospitality",
    badge: "investment" as const,
    location: "Island-wide",
    priceFrom: "From $500,000",
    description:
      "Boutique hotel and hospitality assets for luxury tourism investors.",
    image: VISUAL_SYSTEM.propertyTypes.hotels,
  },
  {
    slug: "commercial",
    title: "Commercial Spaces",
    badge: "investment" as const,
    location: "Zanzibar City · Growth Corridors",
    priceFrom: "On Request",
    description:
      "Retail, mixed-use, and commercial property for developers and institutional buyers.",
    image: VISUAL_SYSTEM.propertyTypes.commercial,
  },
] as const;

export const OFF_PLAN = {
  eyebrow: "Off-Plan Investment",
  title: "Early access to pre-completion pricing",
  description:
    "Off-plan property in Zanzibar offers international investors flexible payment schedules, early-bird pricing, and appreciation potential before handover. Our advisory team coordinates due diligence, developer track records, and milestone-based payments.",
  image: VISUAL_SYSTEM.offerings.offPlan,
  benefits: [
    {
      title: "Flexible payments",
      text: "Structured instalments aligned to construction milestones — ideal for diaspora and international buyers.",
    },
    {
      title: "Early investor pricing",
      text: "Pre-launch and off-plan phases often price below completed comparable sales.",
    },
    {
      title: "Appreciation potential",
      text: "Capital growth between reservation and handover can enhance total returns on Zanzibar investment property.",
    },
  ],
} as const;

export type ContentWithVisual = { image: VisualAsset };

export const TESTIMONIALS = [
  {
    quote:
      "Zanzibaba guided us through villa acquisition in Paje with transparent due diligence. The process felt international-standard from first enquiry to keys.",
    name: "James M.",
    initials: "JM",
    role: "UK Investor — Holiday Home & Airbnb",
    location: "London, UK",
    rating: 5,
  },
  {
    quote:
      "As diaspora buyers, we needed a team that understood both local title processes and our timeline. Their Stone Town advisory was exceptional.",
    name: "Amina K.",
    initials: "AK",
    role: "Diaspora Buyer — Retirement Home",
    location: "Dubai, UAE",
    rating: 5,
  },
  {
    quote:
      "We evaluated three off-plan programmes before committing. The investment consultation was data-driven, not sales pressure.",
    name: "Thomas R.",
    initials: "TR",
    role: "Developer & Investor",
    location: "Berlin, Germany",
    rating: 5,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Can foreigners buy property in Zanzibar?",
    answer:
      "Foreign investors can acquire property in Zanzibar through approved structures. Zanzibaba Real Estate coordinates legal review, title verification, and compliant acquisition paths for international buyers.",
  },
  {
    question: "What is the typical ROI on Zanzibar investment property?",
    answer:
      "Returns vary by location, asset type, and management. Airbnb-ready villas in Paje and Nungwi often target 10–15% gross rental yields. All figures are indicative — we provide personalised analysis during consultation.",
  },
  {
    question: "Which areas are best for luxury villas in Zanzibar?",
    answer:
      "Paje, Nungwi, Kiwengwa, and Matemwe lead the luxury villa market. Stone Town suits heritage apartments. Our area guides detail each corridor's investor profile.",
  },
  {
    question: "Do you offer off-plan property in Zanzibar?",
    answer:
      "Yes. We advise on select off-plan developments with flexible payment plans, developer due diligence, and milestone-based instalments.",
  },
  {
    question: "How do I start investing in Zanzibar real estate?",
    answer:
      "Complete our qualification form or WhatsApp our advisory team. We match you with verified opportunities aligned to your budget, timeline, and investment goals.",
  },
  {
    question: "What types of property for sale in Zanzibar do you handle?",
    answer:
      "Beachfront villas, apartments, land plots, hospitality assets, commercial spaces, and off-plan programmes across Unguja — curated for international investors.",
  },
  {
    question: "Do you offer luxury villa rentals in Zanzibar?",
    answer:
      "Yes. We curate luxury vacation villas, beachfront monthly rentals, and long-term expat housing — not a booking engine, but a premium concierge matching you with verified properties.",
  },
  {
    question: "Can I rent long-term in Zanzibar as an expat or digital nomad?",
    answer:
      "Absolutely. We advise on monthly and extended stays in Paje, Kiwengwa, Stone Town, and north-coast corridors — ideal for expats, remote workers, and international professionals.",
  },
  {
    question: "What is a typical monthly rental budget in Zanzibar?",
    answer:
      "Luxury beachfront villas range from under $1,000 to $10,000+ per month depending on location, season, and amenities. Complete our qualification form for personalised options aligned to your budget.",
  },
] as const;

export const ROI_HIGHLIGHTS = [
  { label: "Tourism growth", value: "15", suffix: "%+", detail: "Annual visitor trend*" },
  { label: "Rental yield", value: "12", suffix: "%", detail: "Typical gross Airbnb*" },
  { label: "Price appreciation", value: "8", suffix: "%+", detail: "Coastal land trend*" },
] as const;

export const RENTAL_EXPERIENCES = [
  {
    slug: "vacation-villas",
    title: "Luxury Vacation Villas",
    headline: "Zanzibar holiday villa rentals",
    description:
      "Curated beachfront villas with private pools, concierge service, and Indian Ocean views — ideal for wealthy tourists, couples, and international travellers seeking a luxury vacation home in Zanzibar.",
    keywords: ["Zanzibar holiday villa", "luxury vacation home Zanzibar"],
    image: VISUAL_SYSTEM.rentals.vacationVillas,
    cta: "Find My Zanzibar Villa",
  },
  {
    slug: "expat-living",
    title: "Long-Term Expat Living",
    headline: "Expat housing Zanzibar",
    description:
      "Furnished villas and premium apartments for expats, retirees, and international professionals — monthly rental Zanzibar options with full advisory support.",
    keywords: ["expat housing Zanzibar", "long term rental Zanzibar"],
    image: VISUAL_SYSTEM.rentals.expatLiving,
    cta: "Get Luxury Rental Options",
  },
  {
    slug: "digital-nomad",
    title: "Digital Nomad Zanzibar Lifestyle",
    headline: "Digital nomad Zanzibar accommodation",
    description:
      "Reliable connectivity, co-working adjacency, and oceanfront villas for remote workers and digital nomads who want tropical freedom without compromising productivity.",
    keywords: ["digital nomad Zanzibar accommodation"],
    image: VISUAL_SYSTEM.rentals.digitalNomad,
    cta: "Explore Beachfront Living",
  },
  {
    slug: "beachfront-monthly",
    title: "Beachfront Monthly Rentals",
    headline: "Zanzibar beachfront rental",
    description:
      "Oceanfront villa and apartment rentals across Paje, Nungwi, and Kiwengwa — premium monthly stays with white-sand access and resort-grade amenities.",
    keywords: ["Zanzibar beachfront rental", "monthly rental Zanzibar"],
    image: VISUAL_SYSTEM.rentals.beachfrontMonthly,
    cta: "Get Matched With Properties",
  },
  {
    slug: "remote-work",
    title: "Remote Work Paradise",
    headline: "Luxury remote work lifestyle",
    description:
      "Work from beachfront villas with dedicated office space, high-speed internet, and the Indian Ocean as your backdrop — the ultimate remote work paradise in Zanzibar.",
    keywords: ["Zanzibar oceanfront villa rental"],
    image: VISUAL_SYSTEM.rentals.remoteWork,
    cta: "Talk to a Zanzibar Advisor",
  },
  {
    slug: "luxury-living",
    title: "Zanzibar Luxury Living",
    headline: "Premium tropical lifestyle",
    description:
      "Infinity pools, premium interiors, tropical outdoor lounges, and five-star hospitality — experience Zanzibar luxury living as a renter, not just an investor.",
    keywords: ["luxury villa rental Zanzibar", "luxury Airbnb Zanzibar"],
    image: VISUAL_SYSTEM.rentals.luxuryLiving,
    cta: "Find My Zanzibar Villa",
  },
] as const;

export const LIFESTYLE_MARKETING = [
  {
    title: "Work from beachfront villas",
    description:
      "Replace the commute with ocean views. Our rental portfolio includes villas designed for remote workers and international professionals.",
    image: VISUAL_SYSTEM.lifestyle.remoteWork,
  },
  {
    title: "Sunset dining & rooftop evenings",
    description:
      "From private chef experiences to rooftop sundowners — Zanzibar's luxury rental lifestyle is cinematic, aspirational, and unforgettable.",
    image: VISUAL_SYSTEM.lifestyle.dining,
  },
  {
    title: "Oceanfront living every day",
    description:
      "Wake to the Indian Ocean. Beachfront monthly rentals and holiday villas put the coast at the centre of your Zanzibar experience.",
    image: VISUAL_SYSTEM.lifestyle.beach,
  },
  {
    title: "Luxury tropical lifestyle",
    description:
      "Premium interiors, infinity pools, and tropical outdoor lounges — Instagram-worthy living without the booking-site feel.",
    image: VISUAL_SYSTEM.lifestyle.tropicalLounge,
  },
  {
    title: "Wellness & relaxation",
    description:
      "Spa-grade amenities, serene coastlines, and a pace of life that rewards rest — wellness woven into every luxury rental stay.",
    image: VISUAL_SYSTEM.lifestyle.wellness,
  },
  {
    title: "High-end hospitality",
    description:
      "Concierge coordination, airport transfers, and villa management — a premium real estate concierge, not a generic booking platform.",
    image: VISUAL_SYSTEM.lifestyle.tourism,
  },
  {
    title: "Freedom lifestyle",
    description:
      "Whether you stay two weeks or six months — investors, expats, nomads, and luxury travellers all find their rhythm in Zanzibar.",
    image: VISUAL_SYSTEM.lifestyle.couples,
  },
] as const;

export const RENTAL_CTAS = [
  {
    label: "Find My Zanzibar Villa",
    subtext: "Matched to your dates, budget, and lifestyle",
    target: "qualify",
  },
  {
    label: "Get Luxury Rental Options",
    subtext: "Beachfront villas, penthouses & private houses",
    target: "rentals",
  },
  {
    label: "Explore Beachfront Living",
    subtext: "Monthly and extended oceanfront stays",
    target: "lifestyle",
  },
  {
    label: "Talk to a Zanzibar Advisor",
    subtext: "Buy, invest, or rent — one premium concierge",
    target: "qualify",
  },
] as const;
