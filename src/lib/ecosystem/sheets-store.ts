import { createSign, randomUUID } from "crypto";
import type { InvestorRecord } from "@/ecosystem/types";

/**
 * Google Sheets storage adapter.
 *
 * Uses a service account (no user OAuth). Auth: sign a JWT with the
 * service account's private key, exchange for a short-lived access
 * token, then call the Sheets REST API.
 *
 * Required env:
 *   GOOGLE_SHEETS_ID              — spreadsheet ID (the long ID in the sheet URL)
 *   GOOGLE_SHEETS_CREDENTIALS     — service account JSON (full key file contents)
 *   GOOGLE_SHEETS_RANGE           — optional, defaults to "Leads!A1:O1"
 *
 * Failures are surfaced to the caller; the caller decides whether to
 * fall back or proceed (e.g. the API route logs and still sends email).
 */

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

type ServiceAccount = {
  client_email: string;
  private_key: string;
};

let warned = false;
export function warnOnSheetsMisconfig(): void {
  if (warned) return;
  warned = true;

  const id = process.env.GOOGLE_SHEETS_ID;
  const creds = process.env.GOOGLE_SHEETS_CREDENTIALS;

  if (!id || !creds) {
    console.warn(
      "[sheets] GOOGLE_SHEETS_ID and/or GOOGLE_SHEETS_CREDENTIALS not set. " +
        "Leads cannot be persisted in production. Configure Google Sheets to enable durable storage. " +
        "(Split-field env vars GOOGLE_SHEETS_CLIENT_EMAIL + GOOGLE_SHEETS_PRIVATE_KEY are also accepted.)"
    );
    return;
  }

  try {
    const parsed = JSON.parse(creds) as ServiceAccount;
    if (!parsed.client_email || !parsed.private_key) {
      console.error(
        "[sheets] GOOGLE_SHEETS_CREDENTIALS JSON is missing client_email/private_key."
      );
      return;
    }
    console.info(
      `[sheets] Google Sheets storage configured — spreadsheet ${id} via ${parsed.client_email}.`
    );
  } catch (e) {
    console.error(
      `[sheets] GOOGLE_SHEETS_CREDENTIALS is not valid JSON: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}

function getServiceAccount(): ServiceAccount | null {
  // Preferred: split fields (no newline-escape issues, more secure)
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  if (clientEmail && privateKeyRaw) {
    // Vercel CLI escapes \n in env vars; convert literal "\\n" to real newlines.
    const privateKey = privateKeyRaw.includes("\\n")
      ? privateKeyRaw.replace(/\\n/g, "\n")
      : privateKeyRaw;
    return { client_email: clientEmail, private_key: privateKey };
  }
  // Fallback: single JSON env var (may be broken if newlines weren't escaped)
  const creds = process.env.GOOGLE_SHEETS_CREDENTIALS;
  if (!creds) return null;
  try {
    const parsed = JSON.parse(creds) as ServiceAccount;
    if (!parsed.client_email || !parsed.private_key) return null;
    return parsed;
  } catch {
    return null;
  }
}

function getSheetId(): string | null {
  return process.env.GOOGLE_SHEETS_ID || null;
}

function getRange(): string {
  return process.env.GOOGLE_SHEETS_RANGE || "Leads!A:O";
}

let cachedToken: { token: string; expiresAt: number } | null = null;

function base64Url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf.toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }

  const sa = getServiceAccount();
  if (!sa) throw new Error("google_sheets_credentials_missing");

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: sa.client_email,
    scope: SCOPES.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
    jti: randomUUID(),
  };

  const signingInput =
    base64Url(JSON.stringify(header)) + "." + base64Url(JSON.stringify(claim));
  const signer = createSign("RSA-SHA256");
  signer.update(signingInput);
  const signature = base64Url(signer.sign(sa.private_key));
  const assertion = signingInput + "." + signature;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`google_token_exchange_failed: ${res.status} ${text.slice(0, 200)}`);
  }
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
}

const LEADS_COLUMNS = [
  "Lead ID",
  "Date",
  "Lead Type",
  "Name",
  "Country",
  "Email",
  "WhatsApp",
  "Check-in",
  "Check-out",
  "Guests",
  "Budget",
  "Area",
  "Source",
  "Lead Score",
  "Status",
] as const;

function getSheetName(): string {
  // getRange() returns "Sheet!A:O" — keep just the sheet name portion for tab reuse.
  const full = getRange();
  return full.split("!")[0] || "Leads";
}

export async function appendLead(record: InvestorRecord): Promise<void> {
  const q = record.qualification ?? {};
  await appendRow(getSheetName(), LEADS_COLUMNS, [
    record.id,
    record.createdAt,
    record.leadType ?? "investment",
    record.name ?? "",
    record.country ?? "",
    record.email ?? "",
    record.phone ?? "",
    (q.checkInDate as string) ?? "",
    (q.checkOutDate as string) ?? "",
    (q.guests as string) ?? "",
    (q.budgetPerNight as string) ?? (q.budget as string) ?? (q.rentalBudget as string) ?? "",
    (q.area as string) ?? "",
    record.source ?? "",
    String(record.leadScore ?? ""),
    record.funnelStage ?? "new",
  ]);
}

export async function readLeads(): Promise<InvestorRecord[]> {
  const rows = await readSheet(getSheetName(), LEADS_COLUMNS);
  return rows.map((row) => {
    const get = (idx: number) => row[idx] ?? "";
    const qualification: Record<string, string> = {};
    if (get(7)) qualification.checkInDate = get(7);
    if (get(8)) qualification.checkOutDate = get(8);
    if (get(9)) qualification.guests = get(9);
    if (get(10)) {
      qualification.budgetPerNight = get(10);
      qualification.budget = get(10);
    }
    if (get(11)) qualification.area = get(11);
    return {
      id: get(0),
      createdAt: get(1) || new Date().toISOString(),
      updatedAt: get(1) || new Date().toISOString(),
      name: get(3),
      email: get(5),
      phone: get(6),
      country: get(4),
      source: get(12),
      leadType: (get(2) as "accommodation" | "investment") || "investment",
      leadScore: Number(get(13)) || 0,
      funnelStage: (get(14) as InvestorRecord["funnelStage"]) || "new",
      qualification,
    } as InvestorRecord;
  });
}

export function sheetsConfigured(): boolean {
  return Boolean(getSheetId() && getServiceAccount());
}

const REQUIRED_TABS = ["Leads", "Discovery", "Hotels", "Assignments", "Outreach"] as const;
let tabsEnsured = false;
async function ensureTabs(): Promise<void> {
  if (tabsEnsured) return;
  tabsEnsured = true;
  const sheetId = getSheetId();
  if (!sheetId) return;
  try {
    const token = await getAccessToken();
    // Fetch existing tabs
    const meta = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets(properties(title))`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!meta.ok) return;
    const data = (await meta.json()) as { sheets?: Array<{ properties: { title: string } }> };
    const existing = new Set((data.sheets ?? []).map((s) => s.properties.title));

    const requests = REQUIRED_TABS.filter((t) => !existing.has(t)).map((title) => ({
      addSheet: { properties: { title } },
    }));
    // Always delete the default "Sheet1" once we know we have a real CRM
    if (existing.has("Sheet1") && existing.size === 1) {
      // Only one tab and it's the default — nothing to delete, just add ours
    }
    if (requests.length === 0) return;

    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ requests }),
      }
    );
  } catch (e) {
    // Reset so next call retries
    tabsEnsured = false;
    console.error(
      `[sheets] Failed to ensure tabs: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}

async function ensureHeader(sheetName: string, columns: readonly string[]): Promise<void> {
  await ensureTabs();
  const sheetId = getSheetId();
  if (!sheetId) throw new Error("google_sheets_id_missing");
  const token = await getAccessToken();
  const colLetter = String.fromCharCode(64 + columns.length);
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
      `${sheetName}!A1:${colLetter}1`
    )}?valueInputOption=RAW`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [columns as unknown as string[]] }),
    }
  );
}

export async function appendRow(
  sheetName: string,
  columns: readonly string[],
  row: string[]
): Promise<void> {
  await appendRows(sheetName, columns, [row]);
}

export async function appendRows(
  sheetName: string,
  columns: readonly string[],
  rows: string[][]
): Promise<void> {
  if (rows.length === 0) return;
  const sheetId = getSheetId();
  if (!sheetId) throw new Error("google_sheets_id_missing");
  const token = await getAccessToken();
  const colLetter = String.fromCharCode(64 + columns.length);
  const range = `${sheetName}!A:${colLetter}`;

  await ensureHeader(sheetName, columns);

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
      range
    )}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: rows }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`google_sheets_append_failed: ${res.status} ${text.slice(0, 200)}`);
  }
}

export async function updateCells(
  sheetName: string,
  updates: { row: number; col: string; value: string }[]
): Promise<void> {
  if (updates.length === 0) return;
  const sheetId = getSheetId();
  if (!sheetId) throw new Error("google_sheets_id_missing");
  const token = await getAccessToken();
  const data = updates.map((u) => ({
    range: `${sheetName}!${u.col}${u.row}`,
    values: [[u.value]],
  }));
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchUpdate`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ valueInputOption: "RAW", data }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`google_sheets_update_failed: ${res.status} ${text.slice(0, 200)}`);
  }
}

export async function readSheet(
  sheetName: string,
  columns: readonly string[]
): Promise<string[][]> {
  const sheetId = getSheetId();
  if (!sheetId) throw new Error("google_sheets_id_missing");
  const token = await getAccessToken();
  const colLetter = String.fromCharCode(64 + columns.length);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
      `${sheetName}!A:${colLetter}`
    )}?valueRenderOption=UNFORMATTED_VALUE`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`google_sheets_read_failed: ${res.status} ${text.slice(0, 200)}`);
  }
  const data = (await res.json()) as { values?: string[][] };
  const rows = data.values ?? [];
  if (rows.length === 0) return [];
  return rows[0]?.[0] === columns[0] ? rows.slice(1) : rows;
}
