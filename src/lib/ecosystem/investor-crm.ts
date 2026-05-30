import { promises as fs } from "fs";
import path from "path";
import type { InvestorRecord } from "@/ecosystem/types";
import { scoreLead, type LeadScoringInput } from "./lead-scoring";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "investors.json");

async function readInvestors(): Promise<InvestorRecord[]> {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function generateId(): string {
  return `inv_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

export type CreateInvestorInput = LeadScoringInput & {
  name: string;
  email: string;
  phone: string;
  country?: string;
  source: string;
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
    qualification: input.qualification,
    funnelStage: scoring.funnelStage,
    leadScore: scoring.score,
    priority: scoring.priority,
    assignedAgent: scoring.assignedAgent,
    followUpAt: followUp,
    tags: scoring.tags,
  };

  const investors = await readInvestors();
  investors.push(investor);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(investors, null, 2), "utf-8");
  return investor;
}

export async function getAllInvestors(): Promise<InvestorRecord[]> {
  const investors = await readInvestors();
  return investors.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateInvestorStage(
  id: string,
  funnelStage: InvestorRecord["funnelStage"]
): Promise<InvestorRecord | null> {
  const investors = await readInvestors();
  const idx = investors.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  investors[idx] = {
    ...investors[idx],
    funnelStage,
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(FILE_PATH, JSON.stringify(investors, null, 2), "utf-8");
  return investors[idx];
}

/** Legacy adapter for leads-store */
export async function createInvestorInquiry(input: CreateInvestorInput) {
  return createInvestor(input);
}

export async function getInvestorStats() {
  const investors = await getAllInvestors();
  return {
    total: investors.length,
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
