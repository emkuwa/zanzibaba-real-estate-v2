import { VISUAL_SYSTEM } from "../visual-system";

export const EXPAT_NOMAD_HUB = {
  eyebrow: "Digital Nomads & Expats",
  title: "Living in Zanzibar — relocation & remote work guide",
  intro:
    "Moving to Zanzibar? Whether you're a digital nomad, expat, retiree, or long-stay renter — this hub covers internet, coworking, costs, safety, and the best areas for expat life Zanzibar offers.",
  topics: [
    {
      title: "Working remotely",
      description:
        "Work from beachfront villas with improving connectivity. Paje and Stone Town lead for digital nomad Zanzibar communities.",
      image: VISUAL_SYSTEM.rentals.digitalNomad,
      href: "#rentals",
    },
    {
      title: "Internet & coworking",
      description:
        "4G/5G coverage expanding; cafés and co-working spaces in Paje, Stone Town, and resort corridors support remote teams.",
      image: VISUAL_SYSTEM.rentals.remoteWork,
      href: "#expat-hub",
    },
    {
      title: "Best areas for expats",
      description:
        "Paje (nomads), Stone Town (urban expats), Kiwengwa (families), Nungwi (luxury) — each offers distinct expat housing Zanzibar profiles.",
      image: VISUAL_SYSTEM.rentals.expatLiving,
      href: "#areas",
    },
    {
      title: "Long-term rentals",
      description:
        "Monthly villa and apartment rentals from $1,000–$10,000+ — furnished, managed, and concierge-coordinated.",
      image: VISUAL_SYSTEM.rentals.beachfrontMonthly,
      href: "#rentals",
    },
    {
      title: "Lifestyle costs",
      description:
        "Lower than Dubai or Europe for comparable quality. Housing, dining, transport, and healthcare vary by area and standard.",
      image: VISUAL_SYSTEM.lifestyle.tropicalLounge,
      href: "#qualify",
    },
    {
      title: "Safety, community & healthcare",
      description:
        "Generally safe for international residents. Growing expat networks, private clinics, and ferry/air links to Dar es Salaam.",
      image: VISUAL_SYSTEM.lifestyle.wellness,
      href: "#faq",
    },
  ],
} as const;
