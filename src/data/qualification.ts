/** First question — routes funnel to rental or buy/invest path */
export const INTENT_OPTIONS = [
  "Property Investment",
  "Buying a Holiday Home",
  "Luxury Vacation Rental",
  "Long-Term Rental",
  "Airbnb Investment",
  "Retirement Living",
  "Commercial Opportunity",
] as const;

export const RENTAL_INTENTS = ["Luxury Vacation Rental", "Long-Term Rental"] as const;

export function isRentalIntent(intent?: string): boolean {
  return !!intent && (RENTAL_INTENTS as readonly string[]).includes(intent);
}

export type FunnelPath = "rental" | "buy";

export function resolveFunnelPath(intent?: string): FunnelPath {
  return isRentalIntent(intent) ? "rental" : "buy";
}

export const RENTAL_TYPE_OPTIONS = [
  "Beachfront Villa",
  "Apartment",
  "Boutique Hotel",
  "Private House",
  "Luxury Penthouse",
] as const;

export const STAY_DURATION_OPTIONS = [
  "1–2 weeks",
  "1 month",
  "3 months",
  "6+ months",
] as const;

export const RENTAL_BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000–$3,000",
  "$3,000–$10,000",
  "$10,000+",
] as const;

export const LIFESTYLE_PREFER_OPTIONS = [
  "Quiet beachfront",
  "Luxury resort atmosphere",
  "Digital nomad friendly",
  "Nightlife & restaurants",
  "Family friendly",
] as const;

export const BUYING_FOR_OPTIONS = ["Investment", "Holiday Use", "Both"] as const;

export const PROPERTY_TYPE_OPTIONS = [
  "Villa",
  "Apartment",
  "Land",
  "Hotel",
  "Commercial",
] as const;

export const AREA_OPTIONS = [
  "Paje",
  "Nungwi",
  "Jambiani",
  "Kiwengwa",
  "Matemwe",
  "Stone Town",
] as const;

export const BUDGET_OPTIONS = [
  "Under $50k",
  "$50k–$150k",
  "$150k–$500k",
  "$500k+",
] as const;

export const PREFER_OPTIONS = [
  "Ready Property",
  "Off-Plan Opportunity",
  "Both",
] as const;

export const TIMELINE_OPTIONS = [
  "Immediately",
  "Within 3 months",
  "Within 6 months",
  "Researching only",
] as const;

/** @deprecated Use INTENT_OPTIONS */
export const LOOKING_FOR_OPTIONS = INTENT_OPTIONS;

export type QualificationAnswers = {
  path?: FunnelPath;
  intent?: string;
  rentalType?: string;
  stayDuration?: string;
  rentalBudget?: string;
  lifestylePrefer?: string;
  buyingFor?: string;
  propertyType?: string;
  area?: string;
  budget?: string;
  prefer?: string;
  timeline?: string;
};

export type FunnelStepKey =
  | "intent"
  | "rentalType"
  | "stayDuration"
  | "rentalBudget"
  | "lifestylePrefer"
  | "buyingFor"
  | "propertyType"
  | "area"
  | "budget"
  | "prefer"
  | "timeline";

export type FunnelStepConfig = {
  key: FunnelStepKey;
  question: string;
  options: readonly string[];
};

export const FUNNEL_STEP_CONFIG: Record<FunnelStepKey, FunnelStepConfig> = {
  intent: {
    key: "intent",
    question: "What brings you to Zanzibar?",
    options: INTENT_OPTIONS,
  },
  rentalType: {
    key: "rentalType",
    question: "What type of rental are you looking for?",
    options: RENTAL_TYPE_OPTIONS,
  },
  stayDuration: {
    key: "stayDuration",
    question: "How long will you stay?",
    options: STAY_DURATION_OPTIONS,
  },
  rentalBudget: {
    key: "rentalBudget",
    question: "What is your monthly budget?",
    options: RENTAL_BUDGET_OPTIONS,
  },
  lifestylePrefer: {
    key: "lifestylePrefer",
    question: "Preferred lifestyle?",
    options: LIFESTYLE_PREFER_OPTIONS,
  },
  buyingFor: {
    key: "buyingFor",
    question: "Are you buying for?",
    options: BUYING_FOR_OPTIONS,
  },
  propertyType: {
    key: "propertyType",
    question: "What type of property interests you?",
    options: PROPERTY_TYPE_OPTIONS,
  },
  area: {
    key: "area",
    question: "Preferred area in Zanzibar?",
    options: AREA_OPTIONS,
  },
  budget: {
    key: "budget",
    question: "What is your estimated budget?",
    options: BUDGET_OPTIONS,
  },
  prefer: {
    key: "prefer",
    question: "Would you prefer?",
    options: PREFER_OPTIONS,
  },
  timeline: {
    key: "timeline",
    question: "When are you planning to invest?",
    options: TIMELINE_OPTIONS,
  },
};

const RENTAL_STEP_KEYS: FunnelStepKey[] = [
  "intent",
  "rentalType",
  "stayDuration",
  "rentalBudget",
  "lifestylePrefer",
];

const BUY_STEP_KEYS: FunnelStepKey[] = [
  "intent",
  "propertyType",
  "area",
  "budget",
  "timeline",
];

export function getStepKeys(path: FunnelPath): FunnelStepKey[] {
  return path === "rental" ? RENTAL_STEP_KEYS : BUY_STEP_KEYS;
}

export function getStepOrder(path: FunnelPath): (FunnelStepKey | "contact")[] {
  return [...getStepKeys(path), "contact"];
}

/** @deprecated Use getStepKeys + FUNNEL_STEP_CONFIG */
export const FUNNEL_STEPS = BUY_STEP_KEYS.map((key) => FUNNEL_STEP_CONFIG[key]);

export const PERSONALIZED_TIPS: Record<string, string> = {
  Paje: "Paje offers strong Airbnb demand, digital nomad cafés, and east-coast villa rentals.",
  Nungwi: "Nungwi's north-coast luxury market attracts high-net-worth holiday home buyers and villa renters.",
  Jambiani: "Jambiani combines authentic village charm with emerging villa development and monthly rentals.",
  Kiwengwa: "Kiwengwa is a premium resort corridor with strong rental occupancy and expat-friendly amenities.",
  Matemwe: "Matemwe features pristine beaches, boutique hospitality, and exclusive villa stays.",
  "Stone Town": "Stone Town heritage apartments suit expats, long-stay renters, and cultural explorers.",
  "Luxury Vacation Rental": "Our concierge matches you with beachfront villas, private pools, and full-service hospitality.",
  "Long-Term Rental": "Monthly and extended stays across Paje, Kiwengwa, and Stone Town — ideal for expats and remote workers.",
  "Digital nomad friendly": "Paje and Stone Town offer reliable connectivity, co-working adjacency, and oceanfront living.",
  "Quiet beachfront": "Jambiani and Matemwe offer serene Indian Ocean frontage away from resort crowds.",
  "Airbnb Investment": "Short-stay properties in Paje and Nungwi can achieve 10–15% gross yields with professional management.",
  "Off-Plan Opportunity": "Early investors often benefit from flexible payment plans and pre-completion pricing.",
  "Property Investment": "We curate beachfront land, villas, and hospitality assets with investor-grade due diligence.",
};
