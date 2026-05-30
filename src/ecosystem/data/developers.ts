import type { DeveloperProfile, DeveloperProject } from "../types";

export const DEVELOPERS: readonly DeveloperProfile[] = [
  {
    id: "dev-coastal-luxury",
    name: "Coastal Luxury Developments",
    slug: "coastal-luxury",
    tagline: "Premium east-coast villa communities",
    description:
      "Boutique developer specialising in beachfront villas and gated communities across Paje and Jambiani — targeting international investors and diaspora buyers.",
    verified: true,
    specialties: ["Luxury villas", "Off-plan", "Beachfront land"],
    areas: ["Paje", "Jambiani"],
  },
  {
    id: "dev-north-resort",
    name: "North Coast Resort Group",
    slug: "north-coast-resort",
    tagline: "Resort-grade hospitality & villa assets",
    description:
      "Established hospitality developer with projects in Nungwi, Kendwa, and Kiwengwa — hotel, resort, and branded residence opportunities.",
    verified: true,
    specialties: ["Hotels", "Resorts", "Branded residences"],
    areas: ["Nungwi", "Kendwa", "Kiwengwa"],
  },
  {
    id: "dev-fumba-peninsula",
    name: "Fumba Peninsula Partners",
    slug: "fumba-peninsula",
    tagline: "Master-planned peninsula development",
    description:
      "Infrastructure-led developer on the Fumba Peninsula — marina adjacency, off-plan programmes, and mixed-use commercial corridors.",
    verified: true,
    specialties: ["Off-plan", "Commercial", "Marina development"],
    areas: ["Fumba", "Stone Town"],
  },
] as const;

export const DEVELOPER_PROJECTS: readonly DeveloperProject[] = [
  {
    id: "proj-paje-villas",
    developerId: "dev-coastal-luxury",
    slug: "paje-luxury-villas",
    title: "Paje Luxury Villa Collection",
    type: "villa",
    location: "Paje, East Coast",
    area: "Paje",
    status: "off-plan",
    roiEstimate: "12–15% gross Airbnb*",
    priceFrom: "$380,000",
    investorFit: ["Airbnb investors", "Holiday home buyers", "Diaspora"],
    gallery: ["villa-luxury", "holiday-home-luxury", "airbnb-investment"],
    tags: ["Luxury", "ROI", "Airbnb", "Beachfront", "Foreign Buyer"],
    description:
      "Twelve beachfront and near-beach villas with private pools, title coordination, and optional rental management.",
    highlights: ["Off-plan pricing", "Flexible payments", "Airbnb-ready design"],
  },
  {
    id: "proj-nungwi-resort",
    developerId: "dev-north-resort",
    slug: "nungwi-boutique-resort",
    title: "Nungwi Boutique Resort Residences",
    type: "resort",
    location: "Nungwi, North Coast",
    area: "Nungwi",
    status: "construction",
    roiEstimate: "8–12% hospitality yield*",
    priceFrom: "$650,000",
    investorFit: ["Hotel investors", "HNW buyers", "Institutional"],
    gallery: ["boutique-hotel", "villa-luxury", "premium-tourism"],
    tags: ["Luxury", "ROI", "Hospitality", "Foreign Buyer"],
    description:
      "Branded resort residences with hotel management agreement, spa, and north-coast beach access.",
    highlights: ["Resort management", "Spa & F&B", "Premium north coast"],
  },
  {
    id: "proj-fumba-marina",
    developerId: "dev-fumba-peninsula",
    slug: "fumba-marina-residences",
    title: "Fumba Marina Residences",
    type: "apartment",
    location: "Fumba Peninsula",
    area: "Fumba",
    status: "planning",
    roiEstimate: "Capital growth focus*",
    priceFrom: "$195,000",
    investorFit: ["Off-plan investors", "Expats", "Entrepreneurs"],
    gallery: ["off-plan-investment", "apartment-luxury", "commercial-luxury"],
    tags: ["Off-Plan", "ROI", "Foreign Buyer", "Commercial"],
    description:
      "Marina-adjacent apartments and commercial units in a master-planned peninsula community.",
    highlights: ["Early investor pricing", "Marina proximity", "Mixed-use"],
  },
  {
    id: "proj-kiwengwa-land",
    developerId: "dev-north-resort",
    slug: "kiwengwa-beachfront-land",
    title: "Kiwengwa Beachfront Land Bank",
    type: "land",
    location: "Kiwengwa Resort Strip",
    area: "Kiwengwa",
    status: "planning",
    roiEstimate: "Land appreciation 8%+*",
    priceFrom: "$85,000",
    investorFit: ["Land bankers", "Developers", "Hotel investors"],
    gallery: ["beachfront-land", "kiwengwa", "commercial-luxury"],
    tags: ["Beachfront", "ROI", "Foreign Buyer", "Hospitality"],
    description:
      "Development plots with resort-strip frontage — suited to villas, boutique hotels, or phased programmes.",
    highlights: ["Resort adjacency", "Clear boundaries", "Development ready"],
  },
] as const;

export function getDeveloperById(id: string) {
  return DEVELOPERS.find((d) => d.id === id);
}

export function getProjectsByDeveloper(developerId: string) {
  return DEVELOPER_PROJECTS.filter((p) => p.developerId === developerId);
}
