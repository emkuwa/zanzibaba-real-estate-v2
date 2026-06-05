export type CountryPage = {
  slug: string;
  name: string;
  region: string;
  flag: string;
  currency: string;
  currencyCode: string;
  fxNote: string;
  flightTime: string;
  timeZone: string;
  timeZoneNote: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  whyChoose: { title: string; description: string }[];
  propertyTypes: { title: string; description: string; areaSlug?: string }[];
  rentalIncome: { title: string; description: string };
  lifestyle: { title: string; description: string }[];
  popularAreas: { slug: string; name: string; angle: string }[];
  faq: { question: string; answer: string }[];
};

export const COUNTRY_PAGES: Record<string, CountryPage> = {
  "uk-investors": {
    slug: "uk-investors",
    name: "United Kingdom",
    region: "Europe",
    flag: "🇬🇧",
    currency: "British Pound (GBP)",
    currencyCode: "GBP",
    fxNote:
      "Zanzibar property is priced in USD. GBP purchasing power against USD has favoured UK buyers in recent years.",
    flightTime: "~10–11 hours from London (direct services available)",
    timeZone: "GMT / BST (2–3 hours behind EAT)",
    timeZoneNote:
      "UK time zone keeps business hours aligned with Zanzibar — same-day WhatsApp and email replies are practical.",
    hero: {
      eyebrow: "For UK Investors",
      title: "Invest in Zanzibar from the United Kingdom",
      subtitle:
        "Beachfront villas, off-plan developments, and heritage apartments — curated for UK buyers with full foreign-ownership advisory, due diligence, and on-the-ground support in Paje and Stone Town.",
    },
    whyChoose: [
      {
        title: "Direct flight access",
        description:
          "Multiple weekly direct services connect London to Zanzibar in roughly 10–11 hours. The route is well-served year-round, making site visits, residency admin, and rental-property oversight practical from the UK.",
      },
      {
        title: "Favourable time zone",
        description:
          "Zanzibar runs East Africa Time (GMT+3). The 2–3 hour difference from London means same-day communication is straightforward — calls, WhatsApp, and email align with normal UK business hours.",
      },
      {
        title: "GBP purchasing power",
        description:
          "Zanzibar property is priced in USD. The GBP/USD exchange rate has worked in favour of UK buyers in recent years, while local operating costs (staff, maintenance, services) are a fraction of UK prices.",
      },
      {
        title: "Foreign-buyer compliant",
        description:
          "UK citizens can acquire Zanzibar property through approved acquisition structures. Our advisory team coordinates legal review, title verification, due diligence, and compliant purchase paths for UK-based investors and expat buyers.",
      },
      {
        title: "Established advisory",
        description:
          "Permanent offices in Paje and Stone Town. Bilingual team covering English, plus a vetted network of local counsel, surveyors, property managers, and rental operators experienced with UK investor requirements.",
      },
    ],
    propertyTypes: [
      {
        title: "Beachfront villas",
        description:
          "Turnkey villas in Paje and Nungwi with verified title, professional short-stay management, and 10–15% gross yield potential.",
        areaSlug: "paje",
      },
      {
        title: "Off-plan programmes",
        description:
          "Pre-completion pricing on master-planned developments in Fumba with milestone-based payments and capital-growth focus.",
        areaSlug: "fumba",
      },
      {
        title: "Heritage apartments",
        description:
          "Restored UNESCO-adjacent apartments in Stone Town suited to long-stay rental, expat relocation, and lifestyle buyers.",
        areaSlug: "stone-town",
      },
      {
        title: "Hospitality assets",
        description:
          "Boutique hotels and resort residences in Matemwe and Kiwengwa with established operations and HNW holiday-rental demand.",
        areaSlug: "matemwe",
      },
    ],
    rentalIncome: {
      title: "Rental income potential for UK investors",
      description:
        "Airbnb-ready villas in Paje and Nungwi typically target 10–15% gross yields with professional management. High season runs November through April, with kitesurfing, diving, and cultural tourism driving consistent occupancy. Stone Town heritage apartments deliver more stable long-stay rental income from expats, NGO staff, and remote-working professionals. All figures are indicative — personalised yield modelling is provided during consultation.",
    },
    lifestyle: [
      {
        title: "Indian Ocean lifestyle",
        description:
          "Year-round tropical climate, white-sand beaches, world-class kitesurfing and diving, and a growing food and wellness scene.",
      },
      {
        title: "Lower cost of living",
        description:
          "Operating costs (staff, dining, services) are significantly below UK levels, allowing rental income to translate into stronger net returns.",
      },
      {
        title: "Permanent residency pathway",
        description:
          "Tanzania offers investor-class residence permits linked to qualifying investment, supporting relocation alongside property ownership.",
      },
      {
        title: "Growing expat community",
        description:
          "Established UK and European expat presence in Paje, Nungwi, and Stone Town — schools, healthcare, and social networks continue to mature.",
      },
    ],
    popularAreas: [
      { slug: "paje", name: "Paje", angle: "East-coast Airbnb & nomad hub" },
      { slug: "nungwi", name: "Nungwi", angle: "North-coast luxury villas" },
      { slug: "stone-town", name: "Stone Town", angle: "Heritage & expat rentals" },
      { slug: "fumba", name: "Fumba", angle: "Off-plan capital growth" },
      { slug: "matemwe", name: "Matemwe", angle: "Boutique hospitality" },
      { slug: "kiwengwa", name: "Kiwengwa", angle: "Resort-grade rentals" },
    ],
    faq: [
      {
        question: "Can UK citizens buy property in Zanzibar?",
        answer:
          "Yes. UK citizens can acquire property in Zanzibar through approved acquisition structures. Our advisory team coordinates legal review, title verification, due diligence, and compliant purchase paths for UK-based investors and expat buyers.",
      },
      {
        question: "What is the typical process and timeline for a UK buyer?",
        answer:
          "From first enquiry to keys, the typical process runs 8–14 weeks for ready-property purchases and longer for off-plan programmes. Steps include qualification, area and property selection, due diligence, legal review, payment in USD, title registration, and handover.",
      },
      {
        question: "Do I need to visit Zanzibar in person?",
        answer:
          "An in-person site visit is recommended before committing but not always required. We arrange video walkthroughs, virtual viewings, and detailed due-diligence packs for UK buyers who cannot travel immediately. Power of attorney can be arranged for completion if needed.",
      },
      {
        question: "Can I get a residency permit by buying property in Zanzibar?",
        answer:
          "Tanzania offers investor-class residence permits linked to qualifying investment. We coordinate with local immigration counsel to advise on eligibility and the application process for UK buyers pursuing relocation alongside property ownership.",
      },
      {
        question: "How is rental income from Zanzibar taxed in the UK?",
        answer:
          "Rental income earned abroad is generally subject to UK tax on the arising basis (or remittance basis where applicable). Foreign tax paid may be eligible for UK foreign tax relief. We recommend UK buyers obtain tailored advice from a qualified tax advisor before purchasing.",
      },
      {
        question: "What is the typical budget for a UK investor in Zanzibar?",
        answer:
          "UK buyers typically enter the Zanzibar market from around £100,000 for off-plan apartments or land, £250,000+ for Stone Town heritage apartments, and £350,000+ for turnkey beachfront villas. Off-plan and developer payment plans are available on selected programmes.",
      },
      {
        question: "Is Zanzibar a good place to retire for UK citizens?",
        answer:
          "Zanzibar is increasingly popular with UK retirees seeking an Indian Ocean lifestyle at a lower cost of living. Residency permits, established healthcare options in Stone Town, and a growing expat community support the relocation decision. We recommend a site visit before committing.",
      },
    ],
  },

  "uae-investors": {
    slug: "uae-investors",
    name: "United Arab Emirates",
    region: "Middle East",
    flag: "🇦🇪",
    currency: "UAE Dirham (AED)",
    currencyCode: "AED",
    fxNote:
      "The AED is pegged to the USD at a fixed rate, so Zanzibar's USD pricing is highly predictable for UAE-based investors.",
    flightTime: "~5 hours direct from Dubai (DXB)",
    timeZone: "Gulf Standard Time (GMT+4) — 1 hour behind EAT",
    timeZoneNote:
      "A 1-hour time difference keeps UAE investors in near-perfect sync with Zanzibar — same-day communication is the default.",
    hero: {
      eyebrow: "For UAE Investors",
      title: "Invest in Zanzibar from the United Arab Emirates",
      subtitle:
        "Beachfront villas, off-plan developments, and hospitality assets — curated for UAE-based investors with full foreign-ownership advisory, AED-USD payment structuring, and on-the-ground support in Paje and Stone Town.",
    },
    whyChoose: [
      {
        title: "Shortest flight from the Gulf",
        description:
          "Direct flights from Dubai and Abu Dhabi to Zanzibar run around 5 hours, with multiple weekly services. The route is well-served, making site visits, residency admin, and rental-property oversight practical from the UAE.",
      },
      {
        title: "USD-pegged currency alignment",
        description:
          "The AED is pegged to the USD at a fixed rate. Zanzibar property priced in USD translates cleanly for UAE investors — no currency volatility risk on the asset side, and predictable payment structuring across milestones.",
      },
      {
        title: "1-hour time-zone advantage",
        description:
          "Gulf Standard Time sits 1 hour behind East Africa Time. UAE investors can call, WhatsApp, and email the Zanzibar team during normal business hours without any scheduling friction.",
      },
      {
        title: "Familiar luxury-investor corridor",
        description:
          "UAE-based investors are already active in Indian Ocean, Mediterranean, and global luxury property markets. Zanzibar fits naturally alongside Maldives, Mauritius, and European villa portfolios — same diligence standards apply.",
      },
      {
        title: "Foreign-buyer compliant",
        description:
          "UAE citizens and residents can acquire Zanzibar property through approved acquisition structures. Our advisory team coordinates legal review, title verification, due diligence, and AED-USD payment logistics for UAE-based investors.",
      },
    ],
    propertyTypes: [
      {
        title: "Beachfront villas",
        description:
          "Turnkey villas in Paje and Nungwi with verified title, professional short-stay management, and 10–15% gross yield potential.",
        areaSlug: "paje",
      },
      {
        title: "Off-plan programmes",
        description:
          "Pre-completion pricing on master-planned developments in Fumba with milestone-based payments and capital-growth focus.",
        areaSlug: "fumba",
      },
      {
        title: "Boutique hospitality",
        description:
          "Operating boutique hotels in Matemwe and Kiwengwa with established bookings, hospitality management, and HNW holiday-rental demand.",
        areaSlug: "matemwe",
      },
      {
        title: "Resort residences",
        description:
          "Branded residences and resort-managed apartments in Nungwi and Kiwengwa with on-site rental programmes and resort amenity access.",
        areaSlug: "nungwi",
      },
    ],
    rentalIncome: {
      title: "Rental income potential for UAE investors",
      description:
        "Airbnb-ready villas in Paje and Nungwi typically target 10–15% gross yields with professional management. The high season runs November through April, with kitesurfing, diving, and cultural tourism driving consistent occupancy. Zanzibar complements UAE-based investors' existing Indian Ocean and global property portfolios — a natural seasonal counterweight to the Gulf summer. All figures are indicative — personalised yield modelling is provided during consultation.",
    },
    lifestyle: [
      {
        title: "Indian Ocean escape",
        description:
          "Year-round tropical climate, white-sand beaches, and world-class kitesurfing and diving — a 5-hour flight from Dubai.",
      },
      {
        title: "Familiar luxury infrastructure",
        description:
          "Premium hospitality, concierge services, and international-standard property management — comparable to UAE luxury-market standards.",
      },
      {
        title: "Permanent residency pathway",
        description:
          "Tanzania offers investor-class residence permits linked to qualifying investment, supporting relocation alongside property ownership.",
      },
      {
        title: "Operating-cost efficiency",
        description:
          "Staff, maintenance, and villa operating costs are significantly below UAE levels, allowing rental income to translate into stronger net returns.",
      },
    ],
    popularAreas: [
      { slug: "paje", name: "Paje", angle: "East-coast Airbnb & nomad hub" },
      { slug: "nungwi", name: "Nungwi", angle: "North-coast luxury villas" },
      { slug: "fumba", name: "Fumba", angle: "Off-plan capital growth" },
      { slug: "matemwe", name: "Matemwe", angle: "Boutique hospitality" },
      { slug: "kiwengwa", name: "Kiwengwa", angle: "Resort-grade rentals" },
      { slug: "stone-town", name: "Stone Town", angle: "Heritage & expat rentals" },
    ],
    faq: [
      {
        question: "Can UAE residents buy property in Zanzibar?",
        answer:
          "Yes. UAE citizens and residents can acquire property in Zanzibar through approved acquisition structures. Our advisory team coordinates legal review, title verification, due diligence, and AED-USD payment logistics for UAE-based investors.",
      },
      {
        question: "Why is the AED-USD alignment useful for Zanzibar property?",
        answer:
          "The AED is pegged to the USD at a fixed rate. Zanzibar property priced in USD translates predictably for UAE investors — there is no currency volatility on the asset price, and milestone payments in USD can be funded directly from AED accounts at the prevailing pegged rate.",
      },
      {
        question: "How long is the flight from Dubai to Zanzibar?",
        answer:
          "Direct flights from Dubai (DXB) to Zanzibar (ZNZ) run approximately 5 hours. Multiple airlines operate the route weekly, making site visits and ongoing property oversight practical from the UAE.",
      },
      {
        question: "Do I need a residency permit to own Zanzibar property?",
        answer:
          "Property ownership and residency are separate processes in Tanzania. UAE investors pursuing relocation alongside property ownership can apply for investor-class residence permits linked to qualifying investment. We coordinate with local immigration counsel to advise on eligibility and processing.",
      },
      {
        question: "What is the typical budget for a UAE investor in Zanzibar?",
        answer:
          "UAE buyers typically enter the Zanzibar market from around AED 400,000 for off-plan apartments or land, AED 900,000+ for Stone Town heritage apartments, and AED 1.3M+ for turnkey beachfront villas. Off-plan and developer payment plans are available on selected programmes.",
      },
      {
        question: "How is Zanzibar rental income handled for UAE tax residents?",
        answer:
          "UAE residents are generally not subject to UAE personal income tax on rental earnings. Zanzibar-sourced income may be subject to Tanzanian withholding rules and to the investor's home-country filing obligations if applicable. We recommend UAE buyers obtain tailored advice from a qualified tax advisor before purchasing.",
      },
      {
        question: "Can I manage the property remotely from Dubai?",
        answer:
          "Yes. Our partner network provides full property management — guest handling, housekeeping, maintenance, and rental-channel optimisation. UAE investors typically oversee their Zanzibar assets remotely with quarterly site visits, supported by detailed monthly reporting from the local team.",
      },
    ],
  },

  "us-investors": {
    slug: "us-investors",
    name: "United States",
    region: "North America",
    flag: "🇺🇸",
    currency: "US Dollar (USD)",
    currencyCode: "USD",
    fxNote:
      "Zanzibar property is priced in USD, so US investors buy in their home currency with no FX risk on the asset price.",
    flightTime: "~16–20 hours with one connection (no direct service)",
    timeZone: "EST (GMT-5) / PST (GMT-8) — 8 to 11 hours behind EAT",
    timeZoneNote:
      "The significant time difference means most US investor conversations happen early morning or late evening US time. We accommodate both East and West Coast schedules via the WhatsApp channel.",
    hero: {
      eyebrow: "For US Investors",
      title: "Invest in Zanzibar from the United States",
      subtitle:
        "Beachfront villas, off-plan developments, and heritage apartments — curated for US investors with foreign-ownership advisory, due diligence, title verification, and on-the-ground support in Paje and Stone Town.",
    },
    whyChoose: [
      {
        title: "USD pricing alignment",
        description:
          "Zanzibar property is priced in USD. US investors transact in their home currency, eliminating FX risk on the asset price and simplifying cross-border payment structuring.",
      },
      {
        title: "Long-stay Indian Ocean destination",
        description:
          "Zanzibar serves US investors as a long-stay alternative to Caribbean and Latin America villa markets — with comparable price points for beachfront assets and a distinct Indian Ocean positioning.",
      },
      {
        title: "Diversification beyond the US",
        description:
          "International real estate provides geographic and currency diversification for US portfolios. Zanzibar's tourism-led economy is largely uncorrelated with US domestic cycles, offering true portfolio balance.",
      },
      {
        title: "Established foreign-buyer framework",
        description:
          "Approved acquisition structures allow US citizens and residents to acquire Zanzibar property. Our advisory team coordinates legal review, title verification, due diligence, and US-source funding for the transaction.",
      },
      {
        title: "Vacation home + yield",
        description:
          "US buyers can use Zanzibar property as a vacation home for part of the year, with professional short-stay management covering operating costs during absence — combining lifestyle use with investment return.",
      },
    ],
    propertyTypes: [
      {
        title: "Beachfront villas",
        description:
          "Turnkey villas in Paje and Nungwi with verified title, professional short-stay management, and 10–15% gross yield potential.",
        areaSlug: "paje",
      },
      {
        title: "Off-plan programmes",
        description:
          "Pre-completion pricing on master-planned developments in Fumba with milestone-based payments and capital-growth focus.",
        areaSlug: "fumba",
      },
      {
        title: "Heritage apartments",
        description:
          "Restored UNESCO-adjacent apartments in Stone Town suited to long-stay rental, expat relocation, and lifestyle buyers.",
        areaSlug: "stone-town",
      },
      {
        title: "Hospitality assets",
        description:
          "Boutique hotels and resort residences in Matemwe and Kiwengwa with established operations and HNW holiday-rental demand.",
        areaSlug: "matemwe",
      },
    ],
    rentalIncome: {
      title: "Rental income potential for US investors",
      description:
        "Airbnb-ready villas in Paje and Nungwi typically target 10–15% gross yields with professional management. The high season runs November through April, with kitesurfing, diving, and cultural tourism driving consistent occupancy. Stone Town heritage apartments deliver more stable long-stay rental income from expats, NGO staff, and remote-working professionals. US buyers should consider the property as a vacation-rental hybrid, offsetting holding costs with personal-use weeks. All figures are indicative — personalised yield modelling is provided during consultation.",
    },
    lifestyle: [
      {
        title: "Indian Ocean escape",
        description:
          "Year-round tropical climate, white-sand beaches, and world-class kitesurfing and diving — a long-stay alternative to the Caribbean.",
      },
      {
        title: "Permanent residency pathway",
        description:
          "Tanzania offers investor-class residence permits linked to qualifying investment, supporting longer-term relocation alongside property ownership.",
      },
      {
        title: "Vacation + investment hybrid",
        description:
          "US buyers often use Zanzibar property for personal stays (typically December–March) and professional management for the remainder — combining lifestyle with yield.",
      },
      {
        title: "Time-zone-friendly communication",
        description:
          "WhatsApp and email work well across the 8–11 hour time difference. US investors typically connect early morning or late evening US time, with the local team responding within hours.",
      },
    ],
    popularAreas: [
      { slug: "paje", name: "Paje", angle: "East-coast Airbnb & nomad hub" },
      { slug: "nungwi", name: "Nungwi", angle: "North-coast luxury villas" },
      { slug: "stone-town", name: "Stone Town", angle: "Heritage & expat rentals" },
      { slug: "fumba", name: "Fumba", angle: "Off-plan capital growth" },
      { slug: "matemwe", name: "Matemwe", angle: "Boutique hospitality" },
      { slug: "kiwengwa", name: "Kiwengwa", angle: "Resort-grade rentals" },
    ],
    faq: [
      {
        question: "Can US citizens buy property in Zanzibar?",
        answer:
          "Yes. US citizens and residents can acquire Zanzibar property through approved acquisition structures. Our advisory team coordinates legal review, title verification, due diligence, and US-source funding for the transaction.",
      },
      {
        question: "How is Zanzibar rental income reported for US tax purposes?",
        answer:
          "US taxpayers are subject to worldwide income reporting on rental earnings, regardless of where the property is located. Foreign tax paid in Tanzania may be eligible for the US foreign tax credit. We strongly recommend US buyers consult a CPA experienced in international real estate before purchasing.",
      },
      {
        question: "Are there reporting requirements for foreign property ownership?",
        answer:
          "US persons holding financial interests in foreign accounts above certain thresholds may have FBAR (FinCEN 114) and FATCA (Form 8938) reporting obligations. Rental income and sale proceeds generally need to be reported on the US tax return. We recommend US buyers obtain tailored advice from a qualified tax advisor.",
      },
      {
        question: "What is the typical budget for a US investor in Zanzibar?",
        answer:
          "US buyers typically enter the Zanzibar market from around $100,000 for off-plan apartments or land, $250,000+ for Stone Town heritage apartments, and $350,000+ for turnkey beachfront villas. Off-plan and developer payment plans are available on selected programmes.",
      },
      {
        question: "How do I fund the purchase from the US?",
        answer:
          "US investors fund purchases via international wire transfer in USD. Our team coordinates banking documentation, source-of-funds verification, and milestone-payment scheduling. Some US banks handle wires to Tanzania without friction; we advise on the cleanest banking path during qualification.",
      },
      {
        question: "Can I use the property as a vacation home?",
        answer:
          "Absolutely. Many US buyers split personal use and rental use — typically 4–8 weeks of personal stays during the high season (December–March) with professional short-stay management for the remainder. This hybrid use often offsets a meaningful share of holding costs.",
      },
      {
        question: "How long is the flight from the US to Zanzibar?",
        answer:
          "There are no direct flights from the US to Zanzibar. Typical one-stop itineraries via Dubai, Doha, Istanbul, or Addis Ababa run 16–20 hours depending on the US departure city and connection.",
      },
    ],
  },

  "canadian-investors": {
    slug: "canadian-investors",
    name: "Canada",
    region: "North America",
    flag: "🇨🇦",
    currency: "Canadian Dollar (CAD)",
    currencyCode: "CAD",
    fxNote:
      "Zanzibar property is priced in USD. CAD/USD movements affect the effective acquisition cost for Canadian investors, so we model both currencies during qualification.",
    flightTime: "~17–22 hours with one connection (no direct service)",
    timeZone: "EST (GMT-5) / PST (GMT-8) — 8 to 11 hours behind EAT",
    timeZoneNote:
      "Like US investors, Canadians connect via WhatsApp and email. The local team accommodates early-morning or late-evening Canada-time conversations.",
    hero: {
      eyebrow: "For Canadian Investors",
      title: "Invest in Zanzibar from Canada",
      subtitle:
        "Beachfront villas, off-plan developments, and heritage apartments — curated for Canadian investors with foreign-ownership advisory, due diligence, title verification, and on-the-ground support in Paje and Stone Town.",
    },
    whyChoose: [
      {
        title: "Winter-season escape for Canadian owners",
        description:
          "Zanzibar's December–March high season aligns perfectly with Canadian winter. Owners can use the property for personal stays during the coldest months, with professional rental management covering the rest of the year.",
      },
      {
        title: "USD-priced asset, CAD-funded purchase",
        description:
          "Zanzibar property is priced in USD, funded in USD. We model the CAD/USD exposure during qualification so Canadian investors see the effective acquisition cost in their home currency.",
      },
      {
        title: "Diversification for Canadian portfolios",
        description:
          "International real estate in a tourism-led economy provides true geographic and sector diversification for Canadian investment portfolios.",
      },
      {
        title: "Established foreign-buyer framework",
        description:
          "Approved acquisition structures allow Canadian citizens and residents to acquire Zanzibar property. Our advisory team coordinates legal review, title verification, due diligence, and Canadian-source funding for the transaction.",
      },
      {
        title: "Retirement and lifestyle planning",
        description:
          "Zanzibar is increasingly popular with Canadian retirees and snowbirds seeking a long-stay Indian Ocean alternative to Florida, Arizona, and the Caribbean.",
      },
    ],
    propertyTypes: [
      {
        title: "Beachfront villas",
        description:
          "Turnkey villas in Paje and Nungwi with verified title, professional short-stay management, and 10–15% gross yield potential.",
        areaSlug: "paje",
      },
      {
        title: "Off-plan programmes",
        description:
          "Pre-completion pricing on master-planned developments in Fumba with milestone-based payments and capital-growth focus.",
        areaSlug: "fumba",
      },
      {
        title: "Heritage apartments",
        description:
          "Restored UNESCO-adjacent apartments in Stone Town suited to long-stay rental, expat relocation, and lifestyle buyers.",
        areaSlug: "stone-town",
      },
      {
        title: "Resort residences",
        description:
          "Branded residences and resort-managed apartments in Kiwengwa with on-site rental programmes and resort amenity access.",
        areaSlug: "kiwengwa",
      },
    ],
    rentalIncome: {
      title: "Rental income potential for Canadian investors",
      description:
        "Airbnb-ready villas in Paje and Nungwi typically target 10–15% gross yields with professional management. The high season runs November through April, with kitesurfing, diving, and cultural tourism driving consistent occupancy. Many Canadian buyers use the property 4–8 weeks during Canadian winter (December–March) and have it professionally managed for the rest of the year, blending lifestyle with yield. All figures are indicative — personalised yield modelling is provided during consultation.",
    },
    lifestyle: [
      {
        title: "Winter-sun retreat",
        description:
          "December through March is peak Zanzibar season — a popular escape for Canadian owners during the coldest months at home.",
      },
      {
        title: "Permanent residency pathway",
        description:
          "Tanzania offers investor-class residence permits linked to qualifying investment, supporting longer-term relocation alongside property ownership.",
      },
      {
        title: "Lower cost of living",
        description:
          "Operating costs (staff, dining, services) are significantly below Canadian levels, allowing rental income to translate into stronger net returns.",
      },
      {
        title: "Active Canadian expat community",
        description:
          "A small but growing Canadian and North American presence in Paje, Nungwi, and Stone Town — useful for orientation, social networks, and on-the-ground referrals.",
      },
    ],
    popularAreas: [
      { slug: "paje", name: "Paje", angle: "East-coast Airbnb & nomad hub" },
      { slug: "nungwi", name: "Nungwi", angle: "North-coast luxury villas" },
      { slug: "stone-town", name: "Stone Town", angle: "Heritage & expat rentals" },
      { slug: "fumba", name: "Fumba", angle: "Off-plan capital growth" },
      { slug: "matemwe", name: "Matemwe", angle: "Boutique hospitality" },
      { slug: "kiwengwa", name: "Kiwengwa", angle: "Resort-grade rentals" },
    ],
    faq: [
      {
        question: "Can Canadian citizens buy property in Zanzibar?",
        answer:
          "Yes. Canadian citizens and residents can acquire Zanzibar property through approved acquisition structures. Our advisory team coordinates legal review, title verification, due diligence, and Canadian-source funding for the transaction.",
      },
      {
        question: "How is Zanzibar rental income reported for Canadian tax purposes?",
        answer:
          "Canadian residents are subject to worldwide income reporting on rental earnings, regardless of where the property is located. Foreign tax paid in Tanzania may be eligible for the Canadian foreign tax credit. We strongly recommend Canadian buyers consult a tax advisor experienced in international real estate before purchasing.",
      },
      {
        question: "Are there reporting requirements for foreign property?",
        answer:
          "Canadian residents who own foreign property above CAD $100,000 in cost may have to file Form T1135 (Foreign Income Verification Statement). Other reporting may apply depending on income levels and entity structures. We recommend Canadian buyers obtain tailored advice from a qualified tax advisor.",
      },
      {
        question: "What is the typical budget for a Canadian investor in Zanzibar?",
        answer:
          "Canadian buyers typically enter the Zanzibar market from around CAD 135,000 for off-plan apartments or land, CAD 340,000+ for Stone Town heritage apartments, and CAD 475,000+ for turnkey beachfront villas. Off-plan and developer payment plans are available on selected programmes.",
      },
      {
        question: "How do I fund the purchase from Canada?",
        answer:
          "Canadian investors fund purchases via international wire transfer in USD. Our team coordinates banking documentation, source-of-funds verification, and milestone-payment scheduling. Most major Canadian banks handle USD wires to international destinations without friction; we advise on the cleanest banking path during qualification.",
      },
      {
        question: "Is Zanzibar a good place for a Canadian snowbird?",
        answer:
          "Yes. Many Canadian owners use Zanzibar property for 4–8 weeks during Canadian winter (December–March) and have it professionally managed for the rest of the year. The Indian Ocean climate and direct routing via Dubai or Doha make the property a practical long-stay alternative to Florida and the Caribbean.",
      },
      {
        question: "How long is the flight from Canada to Zanzibar?",
        answer:
          "There are no direct flights from Canada to Zanzibar. Typical one-stop itineraries via Dubai, Doha, London, or Amsterdam run 17–22 hours depending on the Canadian departure city and connection.",
      },
    ],
  },

  "south-african-investors": {
    slug: "south-african-investors",
    name: "South Africa",
    region: "Africa",
    flag: "🇿🇦",
    currency: "South African Rand (ZAR)",
    currencyCode: "ZAR",
    fxNote:
      "Zanzibar property is priced in USD. ZAR/USD movements affect effective acquisition cost for South African investors — we model both currencies during qualification.",
    flightTime: "~4 hours direct from Johannesburg (JNB) or Cape Town (CPT)",
    timeZone: "SAST (GMT+2) — 1 hour behind EAT",
    timeZoneNote:
      "South Africa sits 1 hour behind Zanzibar — near-perfect business-hour alignment for SA investors.",
    hero: {
      eyebrow: "For South African Investors",
      title: "Invest in Zanzibar from South Africa",
      subtitle:
        "Beachfront villas, off-plan developments, and hospitality assets — curated for South African investors with foreign-ownership advisory, ZAR-USD payment structuring, exchange-control guidance, and on-the-ground support in Paje and Stone Town.",
    },
    whyChoose: [
      {
        title: "Closest major source market",
        description:
          "Zanzibar is a 4-hour direct flight from Johannesburg and Cape Town. South Africa is the largest African source market for Zanzibar property and tourism, with established flight routes and an existing South African expat presence on the island.",
      },
      {
        title: "1-hour time-zone alignment",
        description:
          "SAST sits 1 hour behind EAT. South African investors can call, WhatsApp, and email the Zanzibar team during normal business hours without any scheduling friction.",
      },
      {
        title: "USD asset diversification",
        description:
          "Zanzibar property priced in USD gives South African investors hard-currency asset exposure — a natural hedge against ZAR volatility and a complement to SA equity and property holdings.",
      },
      {
        title: "Familiar Indian Ocean lifestyle",
        description:
          "South African buyers are accustomed to the Indian Ocean coastline, beach villa lifestyle, and the climatic / cultural context of East Africa — orientation and adaptation are typically smooth.",
      },
      {
        title: "Established advisory network",
        description:
          "Permanent offices in Paje and Stone Town with a bilingual team, vetted local counsel, surveyors, property managers, and rental operators experienced with South African investor requirements.",
      },
    ],
    propertyTypes: [
      {
        title: "Beachfront villas",
        description:
          "Turnkey villas in Paje and Nungwi with verified title, professional short-stay management, and 10–15% gross yield potential.",
        areaSlug: "paje",
      },
      {
        title: "Hospitality assets",
        description:
          "Boutique hotels and resort residences in Matemwe and Kiwengwa with established operations and HNW holiday-rental demand.",
        areaSlug: "matemwe",
      },
      {
        title: "Off-plan programmes",
        description:
          "Pre-completion pricing on master-planned developments in Fumba with milestone-based payments and capital-growth focus.",
        areaSlug: "fumba",
      },
      {
        title: "Heritage apartments",
        description:
          "Restored UNESCO-adjacent apartments in Stone Town suited to long-stay rental, expat relocation, and lifestyle buyers.",
        areaSlug: "stone-town",
      },
    ],
    rentalIncome: {
      title: "Rental income potential for South African investors",
      description:
        "Airbnb-ready villas in Paje and Nungwi typically target 10–15% gross yields with professional management. The high season runs November through April, with kitesurfing, diving, and cultural tourism driving consistent occupancy. South African investors typically benefit from the closest source market of any major economy, with a steady stream of returning visitors from SA, neighbouring African countries, and Europe. All figures are indicative — personalised yield modelling is provided during consultation.",
    },
    lifestyle: [
      {
        title: "Indian Ocean escape, 4 hours away",
        description:
          "Direct flights from Johannesburg, Cape Town, and Durban to Zanzibar — shorter than most European routes and far shorter than US or Asian alternatives.",
      },
      {
        title: "Familiar East African context",
        description:
          "South African buyers are accustomed to the Indian Ocean coastline, climate, and travel logistics of East Africa. Orientation, site visits, and ongoing oversight are straightforward.",
      },
      {
        title: "Permanent residency pathway",
        description:
          "Tanzania offers investor-class residence permits linked to qualifying investment, supporting relocation alongside property ownership.",
      },
      {
        title: "Active South African expat community",
        description:
          "Zanzibar has an established South African presence in Paje, Nungwi, and Stone Town — useful for orientation, social networks, school referrals, and on-the-ground support.",
      },
    ],
    popularAreas: [
      { slug: "paje", name: "Paje", angle: "East-coast Airbnb & nomad hub" },
      { slug: "nungwi", name: "Nungwi", angle: "North-coast luxury villas" },
      { slug: "matemwe", name: "Matemwe", angle: "Boutique hospitality" },
      { slug: "fumba", name: "Fumba", angle: "Off-plan capital growth" },
      { slug: "kiwengwa", name: "Kiwengwa", angle: "Resort-grade rentals" },
      { slug: "stone-town", name: "Stone Town", angle: "Heritage & expat rentals" },
    ],
    faq: [
      {
        question: "Can South African citizens buy property in Zanzibar?",
        answer:
          "Yes. South African citizens and residents can acquire Zanzibar property through approved acquisition structures. Our advisory team coordinates legal review, title verification, due diligence, and ZAR-USD payment logistics for SA-based investors.",
      },
      {
        question: "Are there exchange-control rules I need to follow?",
        answer:
          "South African exchange-control regulations administered by the Financial Surveillance Department (formerly the Reserve Bank) apply to outward capital movement. South African investors are generally permitted to invest abroad within their annual foreign capital allowance and subject to SARS tax clearance. We recommend SA buyers obtain current guidance from a qualified treasury or tax practitioner before initiating the transaction.",
      },
      {
        question: "How is Zanzibar rental income reported for South African tax purposes?",
        answer:
          "South African tax residents are subject to worldwide income reporting on rental earnings, regardless of where the property is located. Foreign tax paid in Tanzania may be eligible for the SA foreign tax credit (section 6quat). We strongly recommend SA buyers consult a tax advisor experienced in international real estate before purchasing.",
      },
      {
        question: "What is the typical budget for a South African investor in Zanzibar?",
        answer:
          "SA buyers typically enter the Zanzibar market from around R1.8M for off-plan apartments or land, R4.5M+ for Stone Town heritage apartments, and R6.5M+ for turnkey beachfront villas. Off-plan and developer payment plans are available on selected programmes.",
      },
      {
        question: "How do I fund the purchase from South Africa?",
        answer:
          "SA investors fund purchases via international wire transfer in USD, subject to exchange-control allowances and SARS tax clearance. Our team coordinates banking documentation, source-of-funds verification, and milestone-payment scheduling. We advise on the cleanest banking path during qualification.",
      },
      {
        question: "How long is the flight from South Africa to Zanzibar?",
        answer:
          "Direct flights from Johannesburg (JNB) to Zanzibar (ZNZ) run approximately 4 hours. Direct services also operate from Cape Town (CPT) and Durban (DUR). Multiple airlines serve the route weekly, making site visits and ongoing property oversight practical from SA.",
      },
      {
        question: "Can I manage the property remotely from South Africa?",
        answer:
          "Yes. Our partner network provides full property management — guest handling, housekeeping, maintenance, and rental-channel optimisation. Given the 4-hour flight, many SA investors visit their Zanzibar property several times a year for both oversight and personal use.",
      },
    ],
  },
};
