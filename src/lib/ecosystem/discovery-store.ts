import { appendRow, appendRows, readSheet, sheetsConfigured, warnOnSheetsMisconfig, getAccessToken } from "./sheets-store";

warnOnSheetsMisconfig();

export const DISCOVERY_COLUMNS = [
  "Discovery Date",
  "Hotel ID",
  "Hotel Name",
  "Area",
  "Website",
  "Email",
  "Phone",
  "Category",
  "Address",
  "Google Rating",
  "Reviews Count",
  "Coordinates",
  "Source",
  "Approval Status",
  "Contacted Status",
] as const;

export const DISCOVERY_SHEET = "Discovery";

export const APPROVAL_STATUSES = ["pending", "approved", "rejected", "imported"] as const;
export const CONTACTED_STATUSES = ["not_contacted", "contacted", "responded", "no_response"] as const;
export type PriorityTier = "high" | "medium" | "low";

export type ScoredHotel = {
  hotel: DiscoveredHotel;
  score: number;
  tier: PriorityTier;
  reasons: string[];
};

/**
 * Score a discovered hotel 0-100 based on outreach-readiness signals.
 *   - Website: 25
 *   - Phone:   25
 *   - Rating:  up to 25 (rating * 5, capped at 5)
 *   - Reviews: up to 25 (log scale: 1=5, 10=10, 100=15, 500=20, 1000+=25)
 */
export function scoreHotel(h: DiscoveredHotel): ScoredHotel {
  let score = 0;
  const reasons: string[] = [];

  if (h.website) {
    score += 25;
    reasons.push("website");
  }
  if (h.phone) {
    score += 25;
    reasons.push("phone");
  }
  const rating = Number(h.googleRating);
  if (rating > 0) {
    const r = Math.min(rating, 5) * 5;
    score += r;
    if (rating >= 4) reasons.push(`rating ${rating}`);
  }
  const reviews = Number(h.reviewsCount);
  if (reviews > 0) {
    const logScore = Math.min(25, Math.round(Math.log10(Math.max(reviews, 1)) * 8.5));
    score += logScore;
    if (reviews >= 50) reasons.push(`${reviews} reviews`);
  }

  const tier: PriorityTier = score >= 70 ? "high" : score >= 40 ? "medium" : "low";
  return { hotel: h, score, tier, reasons };
}

export async function listScored(area?: string): Promise<ScoredHotel[]> {
  const all = await listDiscovered();
  const filtered = area ? all.filter((h) => h.area === area) : all;
  return filtered.map(scoreHotel).sort((a, b) => b.score - a.score);
}

/**
 * Auto-import hotels that meet a minimum score threshold directly into Outreach.
 * Skips hotels that already have a Discovery approvalStatus of "imported" to avoid duplicates.
 * Writes a per-area batch in one Sheets call.
 */
export async function autoImportToOutreach(
  minScore: number,
  areas?: string[]
): Promise<{ imported: number; skipped: number; byArea: Record<string, number> }> {
  const { addToOutreachBatch } = await import("./outreach-store");
  const scored = await listScored();
  const eligible = scored
    .filter((s) => s.score >= minScore)
    .filter((s) => s.hotel.approvalStatus !== "imported")
    .filter((s) => !areas || areas.includes(s.hotel.area));

  const byArea: Record<string, number> = {};
  let imported = 0;
  let skipped = 0;

  if (eligible.length === 0) return { imported, skipped, byArea };

  // Sub-batch by area so each Sheets append is smaller and easier to retry on 429.
  const byAreaBucket: Record<string, typeof eligible> = {};
  for (const s of eligible) {
    if (!byAreaBucket[s.hotel.area]) byAreaBucket[s.hotel.area] = [];
    byAreaBucket[s.hotel.area].push(s);
  }

  for (const [area, items] of Object.entries(byAreaBucket)) {
    const inputs = items.map((s) => ({
      name: s.hotel.name,
      area: s.hotel.area,
      website: s.hotel.website,
      phone: s.hotel.phone,
      rating: s.hotel.googleRating,
      source: s.hotel.source,
      initialStatus: "Discovered" as const,
      notes: `Auto-imported. Score ${s.score}/100 (${s.tier}). Reasons: ${s.reasons.join(", ") || "none"}.`,
    }));
    const result = await addToOutreachBatch(inputs);
    imported += result.written;
    skipped += result.failed;
    byArea[area] = result.written;
  }
  return { imported, skipped, byArea };
}

export type ApprovalStatus = (typeof APPROVAL_STATUSES)[number];
export type ContactedStatus = (typeof CONTACTED_STATUSES)[number];

export type DiscoveredHotel = {
  discoveryDate: string;
  id: string;
  name: string;
  area: string;
  website: string;
  email: string;
  phone: string;
  category: string;
  address: string;
  googleRating: string;
  reviewsCount: string;
  coordinates: string;
  source: string;
  approvalStatus: ApprovalStatus;
  contactedStatus: ContactedStatus;
};

export const SUPPORTED_AREAS = [
  "Jambiani",
  "Paje",
  "Nungwi",
  "Kendwa",
  "Matemwe",
  "Kiwengwa",
] as const;

function generateId(): string {
  return `disc_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function normalize(s: string): string {
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}

function dedupeKey(h: { name: string; area: string; phone: string }): string {
  return `${normalize(h.name)}|${normalize(h.area)}|${normalize(h.phone)}`;
}

function parseRow(row: string[]): DiscoveredHotel {
  const get = (i: number) => row[i] ?? "";
  return {
    discoveryDate: get(0),
    id: get(1),
    name: get(2),
    area: get(3),
    website: get(4),
    email: get(5),
    phone: get(6),
    category: get(7),
    address: get(8),
    googleRating: get(9),
    reviewsCount: get(10),
    coordinates: get(11),
    source: get(12),
    approvalStatus: (get(13) as ApprovalStatus) || "pending",
    contactedStatus: (get(14) as ContactedStatus) || "not_contacted",
  };
}

export async function listDiscovered(): Promise<DiscoveredHotel[]> {
  if (!sheetsConfigured()) return [];
  try {
    const rows = await readSheet(DISCOVERY_SHEET, DISCOVERY_COLUMNS);
    return rows.map(parseRow);
  } catch (e) {
    console.error(
      `[discovery] Failed to read Discovery sheet: ${e instanceof Error ? e.message : String(e)}`
    );
    return [];
  }
}

export async function saveDiscoveredBatch(
  raw: Omit<DiscoveredHotel, "id" | "discoveryDate" | "approvalStatus" | "contactedStatus">[]
): Promise<{ saved: number; duplicates: number }> {
  if (raw.length === 0) return { saved: 0, duplicates: 0 };
  if (!sheetsConfigured()) {
    console.warn(`[discovery] Sheets not configured — ${raw.length} discovered hotels not persisted.`);
    return { saved: 0, duplicates: 0 };
  }

  const existing = await listDiscovered();
  const seen = new Set(existing.map(dedupeKey));

  let saved = 0;
  let duplicates = 0;
  const now = new Date().toISOString();

  // Build all new records, then batch-append in one request
  const newRecords: DiscoveredHotel[] = [];
  for (const h of raw) {
    const key = dedupeKey(h);
    if (seen.has(key)) {
      duplicates++;
      continue;
    }
    seen.add(key);
    newRecords.push({
      ...h,
      id: generateId(),
      discoveryDate: now,
      approvalStatus: "pending",
      contactedStatus: "not_contacted",
    });
  }

  if (newRecords.length === 0) return { saved, duplicates };

  if (!sheetsConfigured()) {
    console.warn(`[discovery] Sheets not configured — ${newRecords.length} discovered hotels not persisted.`);
    return { saved, duplicates };
  }

  try {
    const rows = newRecords.map((record) => [
      record.discoveryDate,
      record.id,
      record.name,
      record.area,
      record.website,
      record.email,
      record.phone,
      record.category,
      record.address,
      record.googleRating,
      record.reviewsCount,
      record.coordinates,
      record.source,
      record.approvalStatus,
      record.contactedStatus,
    ]);
    await appendRows(DISCOVERY_SHEET, DISCOVERY_COLUMNS, rows);
    saved = newRecords.length;
  } catch (e) {
    console.error(
      `[discovery] Batch append FAILED: ${e instanceof Error ? e.message : String(e)}`
    );
  }
  return { saved, duplicates };
}

export async function updateDiscovery(
  id: string,
  patch: Partial<Pick<DiscoveredHotel, "approvalStatus" | "contactedStatus">>
): Promise<DiscoveredHotel | null> {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  if (!sheetId) return null;
  try {
    const token = await getAccessToken();
    // Read the full Discovery tab to find the row matching the id (col B = index 1)
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
        "Discovery!A:O"
      )}?valueRenderOption=UNFORMATTED_VALUE`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { values?: string[][] };
    const rows = data.values ?? [];
    // Find row where col B matches the id
    const rowIdx = rows.findIndex((r) => (r[1] ?? "") === id);
    if (rowIdx < 0) return null;
    const headerRow = 1; // header on row 1
    const sheetRow = rowIdx + 1; // 0-indexed findIndex, sheet rows are 1-indexed; but if rowIdx==0 that's the header
    // If the matched row IS the header (col B = "Hotel ID"), skip
    if (rows[rowIdx][0] === "Discovery Date") return null;
    const targetRow = rowIdx + 1; // +1 because row 1 is the header
    // Column N = 14 (1-indexed) = approvalStatus, Column O = 15 = contactedStatus
    const updates: { range: string; values: string[][] }[] = [];
    if (patch.approvalStatus) {
      updates.push({
        range: `Discovery!N${targetRow}`,
        values: [[patch.approvalStatus]],
      });
    }
    if (patch.contactedStatus) {
      updates.push({
        range: `Discovery!O${targetRow}`,
        values: [[patch.contactedStatus]],
      });
    }
    if (updates.length === 0) return null;
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchUpdate`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          valueInputOption: "RAW",
          data: updates,
        }),
      }
    );
    // Return the updated record
    const updated = parseRow(rows[rowIdx]);
    return { ...updated, ...patch };
  } catch (e) {
    console.error(
      `[discovery] updateDiscovery failed: ${e instanceof Error ? e.message : String(e)}`
    );
    return null;
  }
}
