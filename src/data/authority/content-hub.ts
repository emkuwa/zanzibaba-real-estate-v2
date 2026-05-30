/** Content marketing architecture — insights hub (articles ship incrementally) */
export const CONTENT_HUB = {
  eyebrow: "Zanzibar Intelligence",
  title: "Insights, guides & market reports",
  intro:
    "SEO authority publishing for investors, tourists, expats, and entrepreneurs — curated by the Zanzibaba advisory team.",
  categories: [
    { slug: "investment-insights", title: "Investment Insights", count: "Coming soon" },
    { slug: "tourism-guides", title: "Tourism Guides", count: "Coming soon" },
    { slug: "area-reports", title: "Area Reports", count: "8 areas" },
    { slug: "market-trends", title: "Market Trends", count: "Coming soon" },
    { slug: "foreign-ownership", title: "Foreign Ownership Guides", count: "Coming soon" },
    { slug: "development-news", title: "Development Updates", count: "Coming soon" },
  ],
  featured: [
    {
      slug: "zanzibar-area-guide-paje",
      title: "Paje Area Guide: Investment, Lifestyle & Rental Demand",
      excerpt:
        "Everything foreign investors and renters need to know about Paje — kitesurfing capital, Airbnb yields, and east-coast property.",
      category: "Area Reports",
      href: "/#area-paje",
    },
    {
      slug: "invest-in-zanzibar-2026",
      title: "Invest in Zanzibar: Real Estate ROI & Tourism Growth",
      excerpt:
        "Market overview for international investors — yields, off-plan programmes, and emerging corridors.",
      category: "Investment Insights",
      href: "/#invest",
    },
    {
      slug: "digital-nomad-zanzibar",
      title: "Digital Nomad Zanzibar: Remote Work & Long-Term Stays",
      excerpt:
        "Internet, coworking, best areas, and monthly rental budgets for remote workers relocating to Unguja.",
      category: "Relocation",
      href: "/#expat-hub",
    },
    {
      slug: "luxury-travel-zanzibar",
      title: "Luxury Travel Zanzibar: Beaches, Resorts & Experiences",
      excerpt:
        "Premium tourism guide — best beaches, beach clubs, diving, and wellness for high-net-worth travellers.",
      category: "Tourism Guides",
      href: "/#tourism",
    },
  ],
} as const;

export const AUTHORITY_FAQ = [
  {
    question: "Is Zanzibar a good place to invest in 2026?",
    answer:
      "Zanzibar combines rising tourism, scarce beachfront land, and improving infrastructure. Real estate, hospitality, and tourism businesses offer compelling opportunities — though all investments require due diligence and professional advisory.",
  },
  {
    question: "What are the best places in Zanzibar for tourists?",
    answer:
      "Nungwi and Kendwa for north-coast luxury, Paje for kitesurfing and nomads, Stone Town for culture, Matemwe for diving, and Jambiani for authentic coast. Our area guides detail each destination.",
  },
  {
    question: "How do I move to Zanzibar as an expat?",
    answer:
      "Most expats enter on business or residence permits coordinated through employers or investment structures. We advise on long-term rentals, areas, and connecting with legal and relocation specialists.",
  },
  {
    question: "What business opportunities exist in Zanzibar?",
    answer:
      "Tourism hospitality, real estate development, experience tourism, wellness, and logistics are active sectors. Hotel development and off-plan real estate remain primary foreign investment channels.",
  },
  {
    question: "Where should digital nomads live in Zanzibar?",
    answer:
      "Paje leads for nomad community and beach lifestyle. Stone Town suits urban remote workers. Kiwengwa and Nungwi suit those prioritising resort amenities and luxury villa rentals.",
  },
] as const;
