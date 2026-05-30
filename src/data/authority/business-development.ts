import { VISUAL_SYSTEM } from "../visual-system";

export const BUSINESS_DEVELOPMENT = {
  eyebrow: "Business & Development",
  title: "Zanzibar economy & emerging sectors",
  intro:
    "Infrastructure projects, hotel development opportunities, and Zanzibar business opportunities across tourism, real estate, logistics, and emerging investment sectors.",
  sectors: [
    {
      title: "Hotel & resort development",
      description:
        "Tourism investment Zanzibar drives new resort masterplans, boutique hotels, and branded hospitality along premium coastlines.",
      image: VISUAL_SYSTEM.propertyTypes.hotels,
    },
    {
      title: "Infrastructure projects",
      description:
        "Airport expansion, road networks, marina developments, and utility upgrades support long-term property and business growth.",
      image: VISUAL_SYSTEM.propertyTypes.commercial,
    },
    {
      title: "Real estate development",
      description:
        "Off-plan programmes, gated communities, and mixed-use projects in Fumba, east coast, and growth corridors.",
      image: VISUAL_SYSTEM.offerings.offPlan,
    },
    {
      title: "Tourism & experiences",
      description:
        "Beach clubs, dive centres, wellness brands, and curated experiences for the luxury travel Zanzibar market.",
      image: VISUAL_SYSTEM.lifestyle.tourism,
    },
    {
      title: "Commercial & logistics",
      description:
        "Retail, warehousing, and trade-linked commercial property serving Zanzibar's growing economy and regional links.",
      image: VISUAL_SYSTEM.propertyTypes.commercial,
    },
    {
      title: "Emerging sectors",
      description:
        "Renewable energy, agri-tourism, tech-enabled hospitality, and diaspora-led ventures entering the market.",
      image: VISUAL_SYSTEM.lifestyle.investors,
    },
  ],
} as const;
