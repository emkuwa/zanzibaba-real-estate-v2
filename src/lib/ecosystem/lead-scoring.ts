import type {
  InternalAgentId,
  LeadPriority,
  PersonaType,
  FunnelStage,
} from "@/ecosystem/types";
import { isRentalIntent } from "@/data/qualification";

const HIGH_VALUE_BUDGETS = ["$500k+", "$10,000+", "$150k–$500k", "$3,000–$10,000"];
const MEDIUM_BUDGETS = ["$50k–$150k", "$1,000–$3,000", "$150k–$500k"];

const INVESTOR_INTENTS = [
  "Property Investment",
  "Airbnb Investment",
  "Commercial Opportunity",
  "Off-Plan Property",
  "Buying a Holiday Home",
];

const RENTAL_INTENTS = ["Luxury Vacation Rental", "Long-Term Rental"];

export type LeadScoringInput = {
  source: string;
  email: string;
  phone: string;
  country?: string;
  qualification?: Record<string, string>;
};

export type LeadScoringResult = {
  score: number;
  priority: LeadPriority;
  persona: PersonaType;
  funnelStage: FunnelStage;
  assignedAgent: InternalAgentId;
  followUpHours: number;
  tags: string[];
};

function parseBudgetScore(budget?: string): number {
  if (!budget) return 0;
  if (budget.includes("$500k") || budget.includes("$10,000")) return 35;
  if (budget.includes("$150k") || budget.includes("$3,000")) return 25;
  if (budget.includes("$50k") || budget.includes("$1,000")) return 15;
  if (budget.includes("Under")) return 5;
  return 10;
}

function inferPersona(qualification?: Record<string, string>): PersonaType {
  const intent = qualification?.intent ?? qualification?.lookingFor ?? "";
  if (intent.includes("Commercial") || intent.includes("Developer")) return "entrepreneur";
  if (intent.includes("Airbnb") || intent.includes("Investment") || intent.includes("Off-Plan"))
    return "investor";
  if (RENTAL_INTENTS.some((r) => intent.includes(r.split(" ")[0]))) {
    if (intent.includes("Long-Term")) return "expat";
    return intent.includes("Luxury") ? "renter" : "nomad";
  }
  if (intent.includes("Holiday Home") || intent.includes("Retirement")) return "buyer";
  if (intent.includes("Luxury Vacation")) return "tourist";
  if (qualification?.path === "rental") return "renter";
  return "investor";
}

function assignAgent(persona: PersonaType, score: number): InternalAgentId {
  if (persona === "developer" || persona === "entrepreneur") return "developer-partnerships";
  if (persona === "renter" || persona === "tourist" || persona === "expat" || persona === "nomad")
    return "concierge";
  if (score >= 60) return "investor-relations";
  if (score >= 35) return "zanzibar-research";
  return "concierge";
}

function priorityFromScore(score: number): LeadPriority {
  if (score >= 75) return "critical";
  if (score >= 55) return "high";
  if (score >= 30) return "medium";
  return "low";
}

export function scoreLead(input: LeadScoringInput): LeadScoringResult {
  let score = 10;
  const tags: string[] = [];
  const q = input.qualification ?? {};
  const intent = q.intent ?? q.lookingFor ?? "";
  const budget = q.budget ?? q.rentalBudget ?? "";

  score += parseBudgetScore(budget);

  if (INVESTOR_INTENTS.some((i) => intent.includes(i.split(" ")[0]))) {
    score += 20;
    tags.push("investor-intent");
  }
  if (isRentalIntent(intent)) {
    score += 12;
    tags.push("rental-intent");
  }
  if (q.timeline === "Immediately" || q.stayDuration === "6+ months") {
    score += 15;
    tags.push("urgent-timeline");
  }
  if (q.timeline === "Within 3 months" || q.stayDuration === "3 months") {
    score += 10;
  }
  if (input.country && !input.country.toLowerCase().includes("tanzania")) {
    score += 8;
    tags.push("international");
  }
  if (input.source === "qualification_funnel") score += 5;
  if (input.source === "ai_chatbot") score += 3;
  if (input.phone && input.email) score += 5;

  const persona = inferPersona(q);
  const priority = priorityFromScore(score);
  const assignedAgent = assignAgent(persona, score);
  const funnelStage: FunnelStage = score >= 40 ? "qualified" : "new";
  const followUpHours = priority === "critical" ? 2 : priority === "high" ? 8 : 24;

  return {
    score: Math.min(score, 100),
    priority,
    persona,
    funnelStage,
    assignedAgent,
    followUpHours,
    tags,
  };
}
