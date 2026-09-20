import {
  appendRows,
  getAccessToken,
  readSheet,
  sheetsConfigured,
  updateCells,
  warnOnSheetsMisconfig,
} from "./sheets-store";

warnOnSheetsMisconfig();

export const OUTREACH_SHEET = "Outreach";

export const OUTREACH_STATUSES = [
  "Discovered",
  "Not Contacted",
  "Contacted",
  "Interested",
  "Trial",
  "Subscriber",
  "Rejected",
] as const;

export type OutreachStatus = (typeof OUTREACH_STATUSES)[number];

export const OUTREACH_COLUMNS = [
  "Hotel ID",
  "Hotel Name",
  "Area",
  "Website",
  "Phone",
  "Rating",
  "Discovery Date",
  "Contact Status",
  "Last Contact Date",
  "Source",
  "Notes",
] as const;

export type OutreachHotel = {
  id: string;
  name: string;
  area: string;
  website: string;
  phone: string;
  rating: string;
  discoveryDate: string;
  contactStatus: OutreachStatus;
  lastContactDate: string;
  source: string;
  notes: string;
};

function generateId(): string {
  return `out_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function parseRow(row: string[]): OutreachHotel {
  const get = (i: number) => row[i] ?? "";
  return {
    id: get(0),
    name: get(1),
    area: get(2),
    website: get(3),
    phone: get(4),
    rating: get(5),
    discoveryDate: get(6),
    contactStatus: (get(7) as OutreachStatus) || "Discovered",
    lastContactDate: get(8),
    source: get(9),
    notes: get(10),
  };
}

export async function listOutreach(): Promise<OutreachHotel[]> {
  if (!sheetsConfigured()) return [];
  try {
    const rows = await readSheet(OUTREACH_SHEET, OUTREACH_COLUMNS);
    return rows.map(parseRow);
  } catch (e) {
    console.error(
      `[outreach] Failed to read Outreach sheet: ${e instanceof Error ? e.message : String(e)}`
    );
    return [];
  }
}

export async function getOutreachStats() {
  const all = await listOutreach();
  return {
    total: all.length,
    contacted: all.filter((h) => h.contactStatus === "Contacted").length,
    interested: all.filter((h) => h.contactStatus === "Interested").length,
    subscribers: all.filter((h) => h.contactStatus === "Subscriber").length,
    byStatus: all.reduce(
      (acc, h) => {
        acc[h.contactStatus] = (acc[h.contactStatus] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
  };
}

/**
 * Add a batch of hotels to the outreach pipeline in a single Sheets append call.
 * Retries with exponential backoff on 429 throttling.
 * Falls back to per-row appends if a partial batch keeps failing.
 */
export async function addToOutreachBatch(
  inputs: Array<{
    name: string;
    area: string;
    website: string;
    phone: string;
    rating: string;
    source: string;
    initialStatus?: OutreachStatus;
    notes?: string;
  }>
): Promise<{ written: number; failed: number }> {
  if (inputs.length === 0) return { written: 0, failed: 0 };
  if (!sheetsConfigured()) {
    console.warn(
      `[outreach] Sheets not configured — ${inputs.length} hotel(s) not added to pipeline.`
    );
    return { written: 0, failed: inputs.length };
  }

  const now = new Date().toISOString();
  const records = inputs.map((input) => ({
    id: generateId(),
    name: input.name,
    area: input.area,
    website: input.website,
    phone: input.phone,
    rating: input.rating,
    discoveryDate: now,
    contactStatus: input.initialStatus ?? "Discovered",
    lastContactDate: "",
    source: input.source,
    notes: input.notes ?? "",
  }));

  const rows = records.map((r) => [
    r.id,
    r.name,
    r.area,
    r.website,
    r.phone,
    r.rating,
    r.discoveryDate,
    r.contactStatus,
    r.lastContactDate,
    r.source,
    r.notes,
  ]);

  // Exponential backoff retry on 429 / 5xx
  const MAX_RETRIES = 4;
  let attempt = 0;
  let lastError: string = "";
  while (attempt < MAX_RETRIES) {
    try {
      await appendRows(OUTREACH_SHEET, OUTREACH_COLUMNS, rows);
      return { written: rows.length, failed: 0 };
    } catch (e) {
      lastError = e instanceof Error ? e.message : String(e);
      const isThrottled = /429|500|502|503|504/.test(lastError);
      if (!isThrottled || attempt === MAX_RETRIES - 1) break;
      const delayMs = Math.min(8000, 500 * 2 ** attempt) + Math.random() * 250;
      console.warn(
        `[outreach] batch attempt ${attempt + 1} failed (${lastError.slice(0, 80)}) — retrying in ${Math.round(delayMs)}ms`
      );
      await new Promise((r) => setTimeout(r, delayMs));
      attempt++;
    }
  }
  console.error(
    `[outreach] batch write failed after ${MAX_RETRIES} attempts: ${lastError}. Falling back to per-row.`
  );
  // Fallback: per-row with retry
  let written = 0;
  let failed = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let rowAttempt = 0;
    let rowOk = false;
    while (rowAttempt < 3) {
      try {
        const { appendRow } = await import("./sheets-store");
        await appendRow(OUTREACH_SHEET, OUTREACH_COLUMNS, row);
        rowOk = true;
        break;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (rowAttempt === 2) {
          console.error(`[outreach] row ${records[i].name} failed: ${msg.slice(0, 100)}`);
        } else {
          await new Promise((r) => setTimeout(r, 500 * 2 ** rowAttempt));
        }
        rowAttempt++;
      }
    }
    if (rowOk) written++;
    else failed++;
  }
  return { written, failed };
}

/**
 * Add a single hotel. Thin wrapper that calls the batch path with one record.
 */
export async function addToOutreach(input: {
  name: string;
  area: string;
  website: string;
  phone: string;
  rating: string;
  source: string;
  initialStatus?: OutreachStatus;
  notes?: string;
}): Promise<OutreachHotel> {
  const result = await addToOutreachBatch([input]);
  if (result.written === 0) {
    console.warn(
      `[outreach] addToOutreach(${input.name}) not written — check Sheets config.`
    );
  }
  return {
    id: `out_pending_${Date.now().toString(36)}`,
    name: input.name,
    area: input.area,
    website: input.website,
    phone: input.phone,
    rating: input.rating,
    discoveryDate: new Date().toISOString(),
    contactStatus: input.initialStatus ?? "Discovered",
    lastContactDate: "",
    source: input.source,
    notes: input.notes ?? "",
  };
}

/**
 * Bulk-update contact status for a set of hotel ids.
 * Sheets append-only, so we log a warning and return the in-memory updated set
 * for the UI; durable bulk status changes are best done in the sheet directly
 * for now (the operator flow is "review, then edit the sheet").
 */
export async function bulkUpdateStatus(
  ids: string[],
  status: OutreachStatus,
  setLastContact = true
): Promise<OutreachHotel[]> {
  if (ids.length === 0) return [];
  if (!sheetsConfigured()) {
    console.warn(`[outreach] bulkUpdateStatus(${ids.length}) — Sheets not configured.`);
    return [];
  }
  try {
    const sheetId = process.env.GOOGLE_SHEETS_ID!;
    const token = await getAccessToken();
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
        "Outreach!A:K"
      )}?valueRenderOption=UNFORMATTED_VALUE`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) throw new Error(`read failed: ${res.status}`);
    const data = (await res.json()) as { values?: string[][] };
    const rows = data.values ?? [];
    const idSet = new Set(ids);
    const now = new Date().toISOString();
    const updates: { range: string; values: string[][] }[] = [];
    const updated: OutreachHotel[] = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (i === 0 && row[0] === "Hotel ID") continue; // header
      if (!idSet.has(row[0] ?? "")) continue;
      const sheetRow = i + 1;
      updates.push({ range: `Outreach!H${sheetRow}`, values: [[status]] });
      if (setLastContact) {
        updates.push({ range: `Outreach!I${sheetRow}`, values: [[now]] });
      }
      updated.push({
        ...parseRow(row),
        contactStatus: status,
        lastContactDate: setLastContact ? now : (parseRow(row).lastContactDate || ""),
      });
    }
    if (updates.length === 0) return [];
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchUpdate`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ valueInputOption: "RAW", data: updates }),
      }
    );
    return updated;
  } catch (e) {
    console.error(
      `[outreach] bulkUpdateStatus failed: ${e instanceof Error ? e.message : String(e)}`
    );
    return [];
  }
}

export async function repairOutreachPhones(
  discoveryLookup: Map<string, string>
): Promise<{ found: number; fixed: number; unrecoverable: number; details: string[] }> {
  let found = 0;
  let fixed = 0;
  let unrecoverable = 0;
  const details: string[] = [];
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  if (!sheetId) return { found, fixed, unrecoverable, details };

  try {
    const token = await getAccessToken();
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
        "Outreach!A:K"
      )}?valueRenderOption=UNFORMATTED_VALUE`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) return { found, fixed, unrecoverable, details };
    const data = (await res.json()) as { values?: string[][] };
    const rows = data.values ?? [];

    const updates: { row: number; col: string; value: string }[] = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const phone = (row[4] ?? "").trim();
      if (!phone || phone.includes("#ERROR") || phone.includes("Formula parse error")) {
        found++;
        const name = row[1] ?? "";
        const area = row[2] ?? "";
        const lookupKey = `${name.toLowerCase().trim()}|${area.toLowerCase().trim()}`;
        const correctPhone = discoveryLookup.get(lookupKey);
        if (correctPhone) {
          details.push(`REPAIR: ${name} (${area}): "${phone}" -> "${correctPhone}"`);
          updates.push({ row: i + 1, col: "E", value: correctPhone });
          fixed++;
        } else {
          details.push(`UNRECOVERABLE: ${name} (${area}): phone="${phone}" no Discovery match`);
          unrecoverable++;
        }
      }
    }

    if (updates.length > 0) {
      await updateCells(OUTREACH_SHEET, updates);
    }

    return { found, fixed, unrecoverable, details };
  } catch (e) {
    console.error(
      `[outreach] repairOutreachPhones failed: ${e instanceof Error ? e.message : String(e)}`
    );
    return { found, fixed, unrecoverable, details };
  }
}
