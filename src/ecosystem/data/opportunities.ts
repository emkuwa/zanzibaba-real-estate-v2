import type { Opportunity } from "../types";

export const OPPORTUNITIES: readonly Opportunity[] = [
  {
    id: "opp-001",
    slug: "paje-beachfront-villa",
    title: "Paje Beachfront Villa",
    type: "villa",
    location: "Paje, East Coast",
    area: "Paje",
    priceFrom: "$420,000",
    roiEstimate: "12–15% Airbnb*",
    tags: ["Luxury", "ROI", "Airbnb", "Beachfront", "Foreign Buyer"],
    description: "Turnkey beachfront villa with infinity pool, 4 bedrooms, and professional short-stay management available.",
    highlights: ["Direct beach access", "Airbnb-ready", "Title verified"],
    imageKey: "villa-luxury",
    status: "available",
    developerId: "dev-coastal-luxury",
  },
  {
    id: "opp-002",
    slug: "nungwi-luxury-villa",
    title: "Nungwi Luxury Villa Estate",
    type: "villa",
    location: "Nungwi, North Coast",
    area: "Nungwi",
    priceFrom: "$580,000",
    roiEstimate: "Premium holiday rental*",
    tags: ["Luxury", "Beachfront", "Foreign Buyer"],
    description: "North-coast villa with resort adjacency, private pool, and high-net-worth holiday home appeal.",
    highlights: ["Resort corridor", "Sunset views", "Luxury finishes"],
    imageKey: "holiday-home-luxury",
    status: "available",
  },
  {
    id: "opp-003",
    slug: "jambiani-development-land",
    title: "Jambiani Development Land",
    type: "land",
    location: "Jambiani, South-East Coast",
    area: "Jambiani",
    priceFrom: "$52,000",
    roiEstimate: "Emerging corridor*",
    tags: ["ROI", "Beachfront", "Foreign Buyer"],
    description: "Coastal plot with villa development potential — value entry point on the authentic south-east coast.",
    highlights: ["Villa zoning", "Reef access", "Value entry"],
    imageKey: "beachfront-land",
    status: "available",
  },
  {
    id: "opp-004",
    slug: "matemwe-boutique-hotel",
    title: "Matemwe Boutique Hotel",
    type: "hotel",
    location: "Matemwe, North-East",
    area: "Matemwe",
    priceFrom: "$720,000",
    roiEstimate: "10–14% hospitality*",
    tags: ["Luxury", "ROI", "Hospitality", "Foreign Buyer"],
    description: "Operating boutique hotel with Mnemba diving access — hospitality investment with established bookings.",
    highlights: ["Mnemba proximity", "Established operations", "Boutique positioning"],
    imageKey: "boutique-hotel",
    status: "under-offer",
  },
  {
    id: "opp-005",
    slug: "kiwengwa-resort-units",
    title: "Kiwengwa Resort Residences",
    type: "resort",
    location: "Kiwengwa Resort Strip",
    area: "Kiwengwa",
    priceFrom: "$310,000",
    roiEstimate: "Resort rental yield*",
    tags: ["Luxury", "ROI", "Foreign Buyer", "Hospitality"],
    description: "Resort-managed residences with pool, beach club access, and family-holiday rental demand.",
    highlights: ["Resort management", "Beach club", "Family market"],
    imageKey: "kiwengwa",
    status: "available",
    developerId: "dev-north-resort",
  },
  {
    id: "opp-006",
    slug: "stone-town-heritage-apartment",
    title: "Stone Town Heritage Apartment",
    type: "apartment",
    location: "Stone Town, UNESCO District",
    area: "Stone Town",
    priceFrom: "$145,000",
    roiEstimate: "Urban rental yield*",
    tags: ["ROI", "Foreign Buyer"],
    description: "Restored heritage apartment for expat rental, diaspora buyers, and cultural tourism yield.",
    highlights: ["UNESCO-adjacent", "Heritage character", "Expat demand"],
    imageKey: "stone-town",
    status: "available",
  },
  {
    id: "opp-007",
    slug: "fumba-off-plan-villas",
    title: "Fumba Off-Plan Villa Programme",
    type: "villa",
    location: "Fumba Peninsula",
    area: "Fumba",
    priceFrom: "$265,000",
    roiEstimate: "Pre-completion growth*",
    tags: ["Off-Plan", "ROI", "Foreign Buyer", "Luxury"],
    description: "Off-plan peninsula villas with milestone payments and marina-adjacent masterplan.",
    highlights: ["Flexible payments", "Marina future", "Early pricing"],
    imageKey: "fumba",
    status: "available",
    developerId: "dev-fumba-peninsula",
  },
  {
    id: "opp-008",
    slug: "zanzibar-commercial-retail",
    title: "Zanzibar City Commercial Space",
    type: "commercial",
    location: "Growth Corridor, Unguja",
    area: "Stone Town",
    priceFrom: "On Request",
    tags: ["Commercial", "ROI", "Foreign Buyer"],
    description: "Mixed-use commercial asset for retail, logistics, and institutional investors.",
    highlights: ["Growth corridor", "Mixed-use", "Institutional grade"],
    imageKey: "commercial-luxury",
    status: "reserved",
  },
] as const;

export const OPPORTUNITY_TAGS: readonly string[] = [
  "Luxury",
  "ROI",
  "Airbnb",
  "Beachfront",
  "Foreign Buyer",
  "Off-Plan",
  "Hospitality",
  "Commercial",
];

export function filterOpportunities(filters: {
  type?: string;
  area?: string;
  tag?: string;
  status?: string;
}) {
  return OPPORTUNITIES.filter((o) => {
    if (filters.type && o.type !== filters.type) return false;
    if (filters.area && o.area.toLowerCase() !== filters.area.toLowerCase()) return false;
    if (filters.tag && !o.tags.includes(filters.tag as Opportunity["tags"][number])) return false;
    if (filters.status && o.status !== filters.status) return false;
    return true;
  });
}
