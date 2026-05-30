import type { InternalAgent } from "../types";

export const INTERNAL_AGENTS: readonly InternalAgent[] = [
  {
    id: "investor-relations",
    name: "Investor Relations",
    role: "High-value investor advisory & conversion",
    responsibilities: [
      "Qualify international investors and HNW buyers",
      "Coordinate due diligence and site visits",
      "Manage follow-up cadence for hot leads",
      "Convert qualified enquiries to advisory calls",
    ],
    handlesPersonas: ["investor", "buyer", "entrepreneur"],
  },
  {
    id: "developer-partnerships",
    name: "Developer Partnerships",
    role: "Developer onboarding & project syndication",
    responsibilities: [
      "Verify developer track records and projects",
      "Publish off-plan and hospitality opportunities",
      "Match projects to investor profiles",
      "Coordinate milestone-based investor updates",
    ],
    handlesPersonas: ["developer", "investor", "entrepreneur"],
  },
  {
    id: "seo-intelligence",
    name: "SEO Intelligence",
    role: "Search authority & content distribution",
    responsibilities: [
      "Maintain topic clusters and internal linking",
      "Publish market reports and area guides",
      "Optimise for Google and AI search discovery",
      "Track keyword performance across pillars",
    ],
    handlesPersonas: ["tourist", "investor", "nomad", "expat"],
  },
  {
    id: "zanzibar-research",
    name: "Zanzibar Research",
    role: "Market intelligence & area analysis",
    responsibilities: [
      "Monitor infrastructure and policy updates",
      "Produce area growth and ROI insights",
      "Validate opportunity data and pricing bands",
      "Support concierge with area recommendations",
    ],
    handlesPersonas: ["investor", "developer", "buyer"],
  },
  {
    id: "concierge",
    name: "Concierge",
    role: "Rentals, relocation & lifestyle advisory",
    responsibilities: [
      "Match luxury villa and long-term rentals",
      "Support expat and nomad relocation queries",
      "Coordinate WhatsApp and AI chatbot handoffs",
      "Deliver premium hospitality-grade service",
    ],
    handlesPersonas: ["renter", "tourist", "expat", "nomad"],
  },
] as const;
