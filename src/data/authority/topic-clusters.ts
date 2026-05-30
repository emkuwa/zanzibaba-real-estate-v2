/** SEO topic clusters — semantic internal linking architecture */
export const TOPIC_CLUSTERS = [
  {
    id: "real-estate",
    title: "Real Estate",
    tagline: "Luxury property & land",
    href: "#opportunities",
    keywords: [
      "Zanzibar real estate",
      "property for sale Zanzibar",
      "luxury villas Zanzibar",
      "off-plan property Zanzibar",
      "land investment Zanzibar",
    ],
    related: ["#areas", "#rentals", "#invest", "#qualify"],
  },
  {
    id: "tourism",
    title: "Tourism",
    tagline: "Travel & discovery",
    href: "#tourism",
    keywords: [
      "best places in Zanzibar",
      "luxury travel Zanzibar",
      "Zanzibar beaches",
      "Zanzibar holiday guide",
      "things to do in Zanzibar",
    ],
    related: ["#lifestyle", "#areas", "#why-zanzibar"],
  },
  {
    id: "investment",
    title: "Investment",
    tagline: "ROI & opportunities",
    href: "#invest",
    keywords: [
      "invest in Zanzibar",
      "Zanzibar business opportunities",
      "tourism investment Zanzibar",
      "hotel investment Zanzibar",
      "real estate ROI Zanzibar",
    ],
    related: ["#business", "#opportunities", "#qualify"],
  },
  {
    id: "relocation",
    title: "Relocation",
    tagline: "Living & staying long-term",
    href: "#expat-hub",
    keywords: [
      "living in Zanzibar",
      "moving to Zanzibar",
      "expat life Zanzibar",
      "digital nomad Zanzibar",
      "long-term stay Zanzibar",
    ],
    related: ["#rentals", "#expat-hub", "#areas"],
  },
  {
    id: "business",
    title: "Business & Development",
    tagline: "Economy & projects",
    href: "#business",
    keywords: [
      "developments in Zanzibar",
      "infrastructure projects Zanzibar",
      "hotel development opportunities",
      "Zanzibar economy",
      "emerging investment sectors",
    ],
    related: ["#invest", "#business", "#insights"],
  },
] as const;

export type TopicClusterId = (typeof TOPIC_CLUSTERS)[number]["id"];
