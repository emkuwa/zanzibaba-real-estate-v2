import type { InvestorRecord } from "@/ecosystem/types";
import { scoreLead, type LeadScoringInput } from "./lead-scoring";
import { appendLead, readLeads, sheetsConfigured, warnOnSheetsMisconfig } from "./sheets-store";

warnOnSheetsMisconfig();

function generateId(): string {
  return `inv_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

export type CreateInvestorInput = LeadScoringInput & {
  name: string;
  email: string;
  phone: string;
  country?: string;
  source: string;
  leadType?: "accommodation" | "investment";
  qualification?: Record<string, string>;
};

export async function createInvestor(input: CreateInvestorInput): Promise<InvestorRecord> {
  const scoring = scoreLead(input);
  const now = new Date().toISOString();
  const followUp = new Date(Date.now() + scoring.followUpHours * 3600000).toISOString();

  const investor: InvestorRecord = {
    id: generateId(),
    createdAt: now,
    updatedAt: now,
    name: input.name,
    email: input.email,
    phone: input.phone,
    country: input.country,
    source: input.source,
    persona: scoring.persona,
    intent: input.qualification?.intent ?? input.qualification?.lookingFor,
    budget: input.qualification?.budget ?? input.qualification?.rentalBudget,
    leadType: input.leadType ?? (input.qualification?.intent === "Find Accommodation" ? "accommodation" : "investment"),
    qualification: input.qualification,
    funnelStage: scoring.funnelStage,
    leadScore: scoring.score,
    priority: scoring.priority,
    assignedAgent: scoring.assignedAgent,
    followUpAt: followUp,
    tags: scoring.tags,
  };

  // Sheets is the durable store. If unconfigured or fails, log and return
  // the record anyway — the API route will still send the email.
  if (!sheetsConfigured()) {
    console.warn(
      `[leads] Sheets not configured — lead ${investor.id} for ${investor.name || "unknown"} will NOT be persisted. Configure GOOGLE_SHEETS_ID and GOOGLE_SHEETS_CREDENTIALS.`
    );
    return investor;
  }

  try {
    await appendLead(investor);
    console.info(`[leads] Persisted ${investor.leadType ?? "investment"} lead ${investor.id} (${investor.name || "unknown"}) to Google Sheets.`);
  } catch (e) {
    console.error(
      `[leads] Google Sheets append FAILED for ${investor.id} — ${e instanceof Error ? e.message : String(e)}. Lead data is not persisted, but email delivery will proceed.`
    );
  }
  return investor;
}

export async function getAllInvestors(): Promise<InvestorRecord[]> {
  if (!sheetsConfigured()) {
    console.warn("[leads] Sheets not configured — getAllInvestors() returning empty list.");
    return [];
  }
  try {
    const all = await readLeads();
    return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (e) {
    console.error(
      `[leads] Google Sheets read FAILED — ${e instanceof Error ? e.message : String(e)}. Returning empty list.`
    );
    return [];
  }
}

export async function updateInvestorStage(
  id: string,
  funnelStage: InvestorRecord["funnelStage"]
): Promise<InvestorRecord | null> {
  // Stage updates are not part of the lead-capture reliability scope.
  // Sheets append-only is sufficient; CRM can re-read the latest snapshot.
  console.warn(`[leads] updateInvestorStage(${id}, ${funnelStage}) is a no-op with Sheets storage.`);
  return null;
}

/** Legacy adapter for leads-store */
export async function createInvestorInquiry(input: CreateInvestorInput) {
  return createInvestor(input);
}

export async function getAccommodationLeads(): Promise<InvestorRecord[]> {
  const investors = await getAllInvestors();
  return investors.filter((i) => i.leadType === "accommodation" || i.intent === "Find Accommodation");
}

export async function getInvestmentLeads(): Promise<InvestorRecord[]> {
  const investors = await getAllInvestors();
  return investors.filter((i) => i.leadType !== "accommodation" && i.intent !== "Find Accommodation");
}

export async function getInvestorStats() {
  const investors = await getAllInvestors();
  return {
    total: investors.length,
    accommodationLeads: investors.filter((i) => i.leadType === "accommodation" || i.intent === "Find Accommodation").length,
    byPriority: {
      critical: investors.filter((i) => i.priority === "critical").length,
      high: investors.filter((i) => i.priority === "high").length,
      medium: investors.filter((i) => i.priority === "medium").length,
      low: investors.filter((i) => i.priority === "low").length,
    },
    byPersona: investors.reduce(
      (acc, i) => {
        acc[i.persona] = (acc[i.persona] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
    byStage: investors.reduce(
      (acc, i) => {
        acc[i.funnelStage] = (acc[i.funnelStage] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
  };
}
