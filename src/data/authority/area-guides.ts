import { VISUAL_SYSTEM, type VisualAsset } from "../visual-system";

export type AreaGuide = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  highlights: readonly string[];
  image: VisualAsset;
  lifestyle: string;
  investmentPotential: string;
  tourismAppeal: string;
  propertyOpportunities: string;
  rentalDemand: string;
  beachQuality: string;
  atmosphere: string;
  attractions: readonly string[];
};

export const AREA_GUIDES: readonly AreaGuide[] = [
  {
    slug: "paje",
    name: "Paje",
    headline: "East-coast lifestyle & Airbnb yield",
    description:
      "Paje is the heart of Zanzibar's kitesurfing scene, digital nomad cafés, and boutique villa development — a top corridor for property for sale in Zanzibar.",
    highlights: ["Kitesurfing capital", "Airbnb yield", "Nomad-friendly"],
    image: VISUAL_SYSTEM.areas.paje,
    lifestyle: "Active beach culture, cafés, kitesurfing, and relaxed east-coast energy.",
    investmentPotential: "Strong short-stay yields, villa development, and land banking.",
    tourismAppeal: "Kitesurfing, beach clubs, and Indian Ocean sunsets.",
    propertyOpportunities: "Beachfront villas, land plots, and boutique hospitality.",
    rentalDemand: "High — tourists, nomads, and short-stay investors.",
    beachQuality: "Wide white-sand beach with consistent wind.",
    atmosphere: "Bohemian-luxury, international, energetic.",
    attractions: ["Kitesurf schools", "The Rock restaurant", "Jozani Forest day trips"],
  },
  {
    slug: "nungwi",
    name: "Nungwi",
    headline: "North-coast luxury & resort corridor",
    description:
      "Nungwi attracts luxury villas Zanzibar buyers seek — premium beachfront, resort adjacency, and high-end holiday home demand.",
    highlights: ["Luxury villas", "Resort corridor", "Premium pricing"],
    image: VISUAL_SYSTEM.areas.nungwi,
    lifestyle: "Resort-grade amenities, sunset bars, and north-coast sophistication.",
    investmentPotential: "Premium villa market, hospitality assets, capital appreciation.",
    tourismAppeal: "Dhow cruises, diving, and north-coast beach culture.",
    propertyOpportunities: "Luxury villas, resort-adjacent land, boutique hotels.",
    rentalDemand: "Very high — luxury vacation rentals and holiday homes.",
    beachQuality: "Pristine north-coast sand, calm swimming seasons.",
    atmosphere: "Upscale, resort-oriented, international luxury.",
    attractions: ["Nungwi Aquarium", "Sunset dhow cruises", "Mnemba Atoll diving"],
  },
  {
    slug: "kendwa",
    name: "Kendwa",
    headline: "Full-moon beaches & boutique luxury",
    description:
      "Kendwa offers one of Zanzibar's most celebrated beaches — ideal for luxury travel Zanzibar seekers and premium villa rentals.",
    highlights: ["Full-moon parties", "Calm swimming", "Boutique stays"],
    image: VISUAL_SYSTEM.areas.kendwa,
    lifestyle: "Beach parties, boutique resorts, and relaxed north-coast luxury.",
    investmentPotential: "Boutique hospitality, villa rentals, and land near Nungwi corridor.",
    tourismAppeal: "Full-moon events, calm turquoise water, and resort nightlife.",
    propertyOpportunities: "Boutique villas, small hotels, and rental assets.",
    rentalDemand: "High seasonal demand from luxury tourists.",
    beachQuality: "Exceptional — calm, clear, postcard-perfect.",
    atmosphere: "Social, premium, beach-club energy.",
    attractions: ["Kendwa Rocks", "Full-moon beach events", "Nungwi proximity"],
  },
  {
    slug: "jambiani",
    name: "Jambiani",
    headline: "Authentic coast & emerging development",
    description:
      "Jambiani offers a quieter alternative to Paje with growing villa development and value-entry land for sale in Zanzibar.",
    highlights: ["Authentic village", "Value entry", "Emerging villas"],
    image: VISUAL_SYSTEM.areas.jambiani,
    lifestyle: "Village authenticity, seaweed farming culture, and peaceful coast.",
    investmentPotential: "Emerging villa plots, land banking, long-term appreciation.",
    tourismAppeal: "Authentic Zanzibar, reef walks, and cultural immersion.",
    propertyOpportunities: "Villa plots, beachfront land, guesthouses.",
    rentalDemand: "Growing — long-stay renters and eco-conscious tourists.",
    beachQuality: "Long reef-fringed coastline, tidal walks.",
    atmosphere: "Local, peaceful, emerging luxury.",
    attractions: ["Reef walks at low tide", "Village cultural tours", "Kuza Cave"],
  },
  {
    slug: "matemwe",
    name: "Matemwe",
    headline: "Pristine beaches & boutique hospitality",
    description:
      "Matemwe features white-sand beaches and boutique hotel opportunities for investors targeting the luxury tourism market.",
    highlights: ["Mnemba access", "Boutique hotels", "Exclusive coast"],
    image: VISUAL_SYSTEM.areas.matemwe,
    lifestyle: "Exclusive, quiet, and resort-adjacent north-east living.",
    investmentPotential: "Boutique hospitality, luxury villas, exclusive positioning.",
    tourismAppeal: "Mnemba Island snorkelling, diving, and pristine beaches.",
    propertyOpportunities: "Boutique hotels, luxury villas, development land.",
    rentalDemand: "Premium — high-net-worth holiday renters.",
    beachQuality: "Pristine, less crowded, exclusive feel.",
    atmosphere: "Serene, exclusive, honeymoon-grade.",
    attractions: ["Mnemba Atoll", "Diving centres", "Matemwe Beach"],
  },
  {
    slug: "kiwengwa",
    name: "Kiwengwa",
    headline: "Resort-grade rental market",
    description:
      "Kiwengwa's resort strip drives consistent rental occupancy — ideal for Zanzibar holiday homes and hospitality investment.",
    highlights: ["Resort strip", "Family-friendly", "Strong occupancy"],
    image: VISUAL_SYSTEM.areas.kiwengwa,
    lifestyle: "Resort pools, family holidays, and all-inclusive adjacency.",
    investmentPotential: "Holiday homes, hotel investment, rental yield.",
    tourismAppeal: "Resort amenities, calm beaches, and water sports.",
    propertyOpportunities: "Resort villas, apartments, hospitality assets.",
    rentalDemand: "Consistent — families, tourists, and long-stay renters.",
    beachQuality: "Long resort-fringed coastline.",
    atmosphere: "Resort-oriented, family-friendly, accessible.",
    attractions: ["Resort beach clubs", "Spice tours", "East coast excursions"],
  },
  {
    slug: "stone-town",
    name: "Stone Town",
    headline: "Heritage, culture & urban yield",
    description:
      "Stone Town heritage apartments appeal to diaspora buyers, expats, and investors seeking cultural capital alongside rental yield.",
    highlights: ["UNESCO heritage", "Expat hub", "Urban yield"],
    image: VISUAL_SYSTEM.areas["stone-town"],
    lifestyle: "Historic alleys, rooftop dining, cultural depth, and walkable urban life.",
    investmentPotential: "Heritage apartments, boutique hotels, cultural tourism assets.",
    tourismAppeal: "UNESCO sites, Forodhani Gardens, spice tours, and history.",
    propertyOpportunities: "Heritage restorations, apartments, boutique hotels.",
    rentalDemand: "Expats, long-stay renters, and cultural tourists.",
    beachQuality: "Harbour frontage — urban, not beach primary.",
    atmosphere: "Historic, cosmopolitan, culturally rich.",
    attractions: ["House of Wonders", "Forodhani night market", "Spice farms"],
  },
  {
    slug: "fumba",
    name: "Fumba",
    headline: "Peninsula development & marina future",
    description:
      "Fumba Peninsula is an emerging development zone — marina projects, resort masterplans, and infrastructure-led investment opportunities.",
    highlights: ["Marina development", "Master-planned", "Emerging zone"],
    image: VISUAL_SYSTEM.areas.fumba,
    lifestyle: "Peninsula living, sunset views, and planned resort community.",
    investmentPotential: "Off-plan programmes, land banking, marina-linked assets.",
    tourismAppeal: "Peninsula sunsets, resort access, and west-coast calm.",
    propertyOpportunities: "Off-plan villas, marina apartments, development land.",
    rentalDemand: "Emerging — resort and expat community growth.",
    beachQuality: "Peninsula beaches with sunset orientation.",
    atmosphere: "Planned, modern, development-forward.",
    attractions: ["Fumba Town development", "Sunset viewpoints", "Prison Island access"],
  },
];
