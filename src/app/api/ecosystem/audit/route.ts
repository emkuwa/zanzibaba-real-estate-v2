import { NextResponse } from "next/server";
import {
  getAccessToken,
  sheetsConfigured,
} from "@/lib/ecosystem/sheets-store";
import {
  listOutreach,
  OUTREACH_COLUMNS,
  OUTREACH_SHEET,
  repairOutreachPhones,
} from "@/lib/ecosystem/outreach-store";
import {
  listDiscovered,
  DISCOVERY_COLUMNS,
  DISCOVERY_SHEET,
} from "@/lib/ecosystem/discovery-store";
import { listHotels, HOTEL_COLUMNS, HOTEL_SHEET } from "@/lib/ecosystem/partners-store";
import type { NextRequest } from "next/server";

const ADMIN_KEY = process.env.ADMIN_API_KEY || "prod-audit-key";
const SHEET_ID = process.env.GOOGLE_SHEETS_ID!;

function isValidPhone(v: string): boolean {
  const s = v.trim();
  if (!s || s.includes("#ERROR") || s.includes("Formula")) return false;
  const digits = s.replace(/[^0-9]/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function isValidEmail(v: string): boolean {
  if (!v.trim()) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

function normalizeName(s: string): string {
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}

function dedupeKey(name: string, area: string): string {
  return `${normalizeName(name)}|${normalizeName(area)}`;
}

export async function GET(request: NextRequest) {
  const key = request.headers.get("x-admin-key");
  if (key !== ADMIN_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!sheetsConfigured()) {
    return NextResponse.json({ error: "sheets not configured" }, { status: 500 });
  }

  const report: Record<string, unknown> = {};

  // --- READ ALL TABS ---
  const token = await getAccessToken();
  async function readTab(sheetName: string, columns: readonly string[]): Promise<string[][]> {
    const colLetter = String.fromCharCode(64 + columns.length);
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(
        `${sheetName}!A:${colLetter}`
      )}?valueRenderOption=UNFORMATTED_VALUE`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { values?: string[][] };
    const rows = data.values ?? [];
    return rows.length > 0 && rows[0][0] === columns[0] ? rows.slice(1) : rows;
  }

  const [leadsRaw, discoveryRaw, hotelsRaw, outreachData] = await Promise.all([
    readTab("Leads", [
      "Lead ID", "Date", "Lead Type", "Name", "Country", "Email",
      "WhatsApp", "Check-in", "Check-out", "Guests", "Budget", "Area",
      "Source", "Lead Score", "Status",
    ] as const),
    readTab(DISCOVERY_SHEET, DISCOVERY_COLUMNS),
    readTab(HOTEL_SHEET, HOTEL_COLUMNS),
    listOutreach(),
  ]);

  report.recordsChecked = {
    leads: leadsRaw.length,
    discovery: discoveryRaw.length,
    hotels: hotelsRaw.length,
    outreach: outreachData.length,
    total: leadsRaw.length + discoveryRaw.length + hotelsRaw.length + outreachData.length,
  };

  // --- 1. PHONE REPAIR ---
  const discoveryPhoneMap = new Map<string, string>();
  for (const row of discoveryRaw) {
    const name = row[2] ?? "";
    const area = row[3] ?? "";
    const phone = (row[6] ?? "").trim();
    if (phone && !phone.includes("#ERROR")) {
      const key = dedupeKey(name, area);
      if (!discoveryPhoneMap.has(key)) discoveryPhoneMap.set(key, phone);
    }
  }
  // Also add Hotels tab phones
  for (const row of hotelsRaw) {
    const name = row[2] ?? "";
    const area = row[3] ?? "";
    const phone = (row[6] ?? "").trim();
    if (phone && !phone.includes("#ERROR")) {
      const key = dedupeKey(name, area);
      if (!discoveryPhoneMap.has(key)) discoveryPhoneMap.set(key, phone);
    }
  }

  const repairResult = await repairOutreachPhones(discoveryPhoneMap);
  report.phoneRepair = {
    errorRecordsFound: repairResult.found,
    repaired: repairResult.fixed,
    unrecoverable: repairResult.unrecoverable,
    details: repairResult.details,
  };

  // --- 2. DUPLICATE DETECTION ---
  const dupNameArea = new Map<string, { tab: string; names: string[] }[]>();
  function recordForDedup(name: string, area: string, tab: string) {
    const key = dedupeKey(name, area);
    if (!dupNameArea.has(key)) dupNameArea.set(key, []);
    const entry = dupNameArea.get(key)!;
    const existing = entry.find((e) => e.tab === tab);
    if (existing) existing.names.push(name);
    else entry.push({ tab, names: [name] });
  }
  for (const row of discoveryRaw) recordForDedup(row[2] ?? "", row[3] ?? "", "Discovery");
  for (const row of hotelsRaw) recordForDedup(row[2] ?? "", row[3] ?? "", "Hotels");
  for (const h of outreachData) recordForDedup(h.name, h.area, "Outreach");

  const crossTabDuplicates: { name: string; area: string; tabs: string[] }[] = [];
  const intraTabDuplicates: { tab: string; name: string; area: string; count: number }[] = [];

  for (const [key, entries] of dupNameArea) {
    const tabsWith = entries.filter((e) => e.names.length > 0);
    if (tabsWith.length > 1) {
      const [name, area] = key.split("|");
      crossTabDuplicates.push({
        name,
        area,
        tabs: tabsWith.map((e) => `${e.tab}(${e.names.length})`),
      });
    }
    for (const entry of entries) {
      if (entry.names.length > 1) {
        const [name, area] = key.split("|");
        intraTabDuplicates.push({ tab: entry.tab, name, area, count: entry.names.length });
      }
    }
  }

  report.duplicates = {
    crossTab: crossTabDuplicates.length,
    crossTabDetails: crossTabDuplicates.slice(0, 20),
    intraTab: intraTabDuplicates.length,
    intraTabDetails: intraTabDuplicates.slice(0, 20),
  };

  // --- 3. VALIDATION ---
  const missingContact: Record<string, { name: string; area: string; missing: string[] }[]> = {
    leads: [],
    discovery: [],
    hotels: [],
    outreach: [],
  };
  const invalidContact: Record<string, { name: string; area: string; field: string; value: string }[]> = {
    leads: [],
    discovery: [],
    hotels: [],
    outreach: [],
  };

  // Leads: check email (col 5), whatsapp (col 6), website (N/A)
  for (const row of leadsRaw) {
    const name = row[3] ?? "";
    const email = (row[5] ?? "").trim();
    const phone = (row[6] ?? "").trim();
    const m: string[] = [];
    if (!email) m.push("email");
    if (!phone) m.push("phone");
    if (m.length > 0) missingContact.leads.push({ name, area: "", missing: m });
    if (email && !isValidEmail(email)) invalidContact.leads.push({ name, area: "", field: "email", value: email });
    if (phone && !isValidPhone(phone)) invalidContact.leads.push({ name, area: "", field: "phone", value: phone });
  }

  // Discovery: check email (col 5), phone (col 6), website (col 4)
  for (const row of discoveryRaw) {
    const name = row[2] ?? "";
    const area = row[3] ?? "";
    const website = (row[4] ?? "").trim();
    const email = (row[5] ?? "").trim();
    const phone = (row[6] ?? "").trim();
    const m: string[] = [];
    if (!website) m.push("website");
    if (!email) m.push("email");
    if (!phone) m.push("phone");
    if (m.length > 0) missingContact.discovery.push({ name, area, missing: m });
    if (email && !isValidEmail(email)) invalidContact.discovery.push({ name, area, field: "email", value: email });
    if (phone && !isValidPhone(phone)) invalidContact.discovery.push({ name, area, field: "phone", value: phone });
  }

  // Hotels: check email (col 5), whatsapp (col 6)
  for (const row of hotelsRaw) {
    const name = row[2] ?? "";
    const area = row[3] ?? "";
    const email = (row[5] ?? "").trim();
    const phone = (row[6] ?? "").trim();
    const m: string[] = [];
    if (!email) m.push("email");
    if (!phone) m.push("phone");
    if (m.length > 0) missingContact.hotels.push({ name, area, missing: m });
    if (email && !isValidEmail(email)) invalidContact.hotels.push({ name, area, field: "email", value: email });
    if (phone && !isValidPhone(phone)) invalidContact.hotels.push({ name, area, field: "phone", value: phone });
  }

  // Outreach: check phone (col 4), website (col 3)
  for (const h of outreachData) {
    const m: string[] = [];
    if (!h.website.trim()) m.push("website");
    if (!h.phone.trim()) m.push("phone");
    if (m.length > 0) missingContact.outreach.push({ name: h.name, area: h.area, missing: m });
    if (h.phone && !isValidPhone(h.phone)) invalidContact.outreach.push({ name: h.name, area: h.area, field: "phone", value: h.phone });
  }

  report.validation = {
    missingContact: {
      leads: { count: missingContact.leads.length, details: missingContact.leads.slice(0, 10) },
      discovery: { count: missingContact.discovery.length, details: missingContact.discovery.slice(0, 10) },
      hotels: { count: missingContact.hotels.length, details: missingContact.hotels.slice(0, 10) },
      outreach: { count: missingContact.outreach.length, details: missingContact.outreach.slice(0, 10) },
    },
    invalidContact: {
      leads: { count: invalidContact.leads.length, details: invalidContact.leads.slice(0, 10) },
      discovery: { count: invalidContact.discovery.length, details: invalidContact.discovery.slice(0, 10) },
      hotels: { count: invalidContact.hotels.length, details: invalidContact.hotels.slice(0, 10) },
      outreach: { count: invalidContact.outreach.length, details: invalidContact.outreach.slice(0, 10) },
    },
  };

  // --- 4. HEALTH SCORE ---
  const totalErrors = repairResult.unrecoverable
    + crossTabDuplicates.length
    + intraTabDuplicates.length
    + Object.values(missingContact).reduce((s, v) => s + v.length, 0)
    + Object.values(invalidContact).reduce((s, v) => s + v.length, 0);

  const totalRecords = leadsRaw.length + discoveryRaw.length + hotelsRaw.length + outreachData.length;
  const healthPct = totalRecords === 0 ? 100 : Math.round((1 - totalErrors / Math.max(totalRecords, 1)) * 100);

  function tabHealth(tabName: string, data: unknown[], missing: { name: string }[], invalid: { name: string }[]): { score: number; issues: number; total: number } {
    const t = data.length;
    const issues = missing.length + invalid.length;
    return {
      total: t,
      issues,
      score: t === 0 ? 100 : Math.max(0, Math.round((1 - issues / t) * 100)),
    };
  }

  report.healthScore = {
    overall: healthPct,
    leads: tabHealth("Leads", leadsRaw, missingContact.leads, invalidContact.leads),
    discovery: tabHealth("Discovery", discoveryRaw, missingContact.discovery, invalidContact.discovery),
    hotels: tabHealth("Hotels", hotelsRaw, missingContact.hotels, invalidContact.hotels),
    outreach: tabHealth("Outreach", outreachData, missingContact.outreach, invalidContact.outreach),
  };

  // --- 5. SUMMARY ---
  report.summary = {
    recordsChecked: totalRecords,
    recordsRepaired: repairResult.fixed,
    duplicateCount: crossTabDuplicates.length + intraTabDuplicates.length,
    missingContactCount: Object.values(missingContact).reduce((s, v) => s + v.length, 0),
    healthScore: healthPct,
    recommendedAction:
      healthPct >= 90
        ? "System healthy. No immediate action needed."
        : healthPct >= 70
          ? "Moderate issues detected. Review missing contacts and duplicates above."
          : "Critical issues found. Prioritize phone repair and duplicate resolution.",
  };

  return NextResponse.json(report);
}
