import { createSign, randomUUID } from "crypto";
import { readFileSync } from "fs";

// Load env vars from .env.prod
const envFile = readFileSync(".env.prod", "utf-8");
for (const line of envFile.split("\n")) {
  const m = line.match(/^([A-Z_]+)="(.*)"$/);
  if (m) process.env[m[1]] = m[2];
}

const SHEET_ID_RAW = process.env.GOOGLE_SHEETS_ID!;
const SHEET_ID = SHEET_ID_RAW.replace(/\\n/g, "").trim();
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL!;
const PRIVATE_KEY_RAW = process.env.GOOGLE_SHEETS_PRIVATE_KEY!;
const PRIVATE_KEY = PRIVATE_KEY_RAW.includes("\\n")
  ? PRIVATE_KEY_RAW.replace(/\\n/g, "\n")
  : PRIVATE_KEY_RAW;

function base64Url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf.toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function getToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
    jti: randomUUID(),
  };
  const input = base64Url(JSON.stringify(header)) + "." + base64Url(JSON.stringify(claim));
  const signer = createSign("RSA-SHA256");
  signer.update(input);
  const sig = base64Url(signer.sign(PRIVATE_KEY));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: input + "." + sig,
    }),
  });
  if (!res.ok) throw new Error(`token exchange failed: ${res.status}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

async function readSheet(token: string, name: string, cols: number): Promise<string[][]> {
  const colLetter = String.fromCharCode(64 + cols);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(
      `${name}!A:${colLetter}`
    )}?valueRenderOption=UNFORMATTED_VALUE`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) return [];
  const data = (await res.json()) as { values?: string[][] };
  return data.values ?? [];
}

async function updateCells(
  token: string,
  updates: { row: number; col: string; value: string }[]
): Promise<void> {
  if (updates.length === 0) return;
  const data = updates.map((u) => ({
    range: `Outreach!${u.col}${u.row}`,
    values: [[u.value]],
  }));
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ valueInputOption: "RAW", data }),
    }
  );
}

// Validators
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

function s(v: unknown): string {
  return String(v ?? "").trim();
}

function dedupeKey(name: string, area: string): string {
  return `${name.toLowerCase().trim().replace(/\s+/g, " ")}|${area.toLowerCase().trim().replace(/\s+/g, " ")}`;
}

// --- MAIN ---
async function main() {
  console.log("DATA QUALITY AUDIT — Zanzibar Accommodation CRM\n");

  const token = await getToken();

  // Read all tabs
  const [leadsRaw, discoveryRaw, hotelsRaw, outreachRaw] = await Promise.all([
    readSheet(token, "Leads", 15),
    readSheet(token, "Discovery", 15),
    readSheet(token, "Hotels", 9),
    readSheet(token, "Outreach", 11),
  ]);

  // Skip headers
  const leads = leadsRaw.length > 0 && leadsRaw[0][0] === "Lead ID" ? leadsRaw.slice(1) : leadsRaw;
  const discovery = discoveryRaw.length > 0 && discoveryRaw[0][0] === "Discovery Date" ? discoveryRaw.slice(1) : discoveryRaw;
  const hotels = hotelsRaw.length > 0 && hotelsRaw[0][0] === "Hotel ID" ? hotelsRaw.slice(1) : hotelsRaw;
  const outreach = outreachRaw.length > 0 && outreachRaw[0][0] === "Hotel ID" ? outreachRaw.slice(1) : outreachRaw;

  const total = leads.length + discovery.length + hotels.length + outreach.length;
  console.log(`Records checked: ${total}`);
  console.log(`  Leads:      ${leads.length}`);
  console.log(`  Discovery:  ${discovery.length}`);
  console.log(`  Hotels:     ${hotels.length}`);
  console.log(`  Outreach:   ${outreach.length}\n`);

  // --- 1. PHONE REPAIR ---
  const phoneLookup = new Map<string, string>();
  for (const row of discovery) {
    const phone = s(row[6]);
    if (phone && !phone.includes("#ERROR")) {
      const key = dedupeKey(s(row[2]), s(row[3]));
      if (!phoneLookup.has(key)) phoneLookup.set(key, phone);
    }
  }
  for (const row of hotels) {
    const phone = s(row[6]);
    if (phone && !phone.includes("#ERROR")) {
      const key = dedupeKey(s(row[2]), s(row[3]));
      if (!phoneLookup.has(key)) phoneLookup.set(key, phone);
    }
  }

  let errorPhones = 0;
  let repaired = 0;
  let unrecoverable = 0;
  const repairs: { row: number; col: string; value: string }[] = [];

  for (let i = 0; i < outreach.length; i++) {
    const row = outreach[i];
    const phone = s(row[4]);
    if (!phone || phone.includes("#ERROR") || phone.includes("Formula")) {
      errorPhones++;
      const name = s(row[1]);
      const area = s(row[2]);
      const key = dedupeKey(name, area);
      const correct = phoneLookup.get(key);
      if (correct) {
        repairs.push({ row: i + 2, col: "E", value: correct });
        repaired++;
      } else {
        unrecoverable++;
      }
    }
  }

  // Also clean #ERROR! from Discovery phone column
  const discRepairs: { row: number; col: string; value: string }[] = [];
  for (let i = 0; i < discovery.length; i++) {
    const phone = s(discovery[i][6]);
    if (phone.includes("#ERROR") || phone.includes("Formula")) {
      discRepairs.push({ row: i + 2, col: "G", value: "" });
    }
  }
  if (discRepairs.length > 0) {
    const discToken = await getToken();
    const data = discRepairs.map((u) => ({
      range: `Discovery!${u.col}${u.row}`,
      values: [[u.value]],
    }));
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`,
      { method: "POST", headers: { Authorization: `Bearer ${discToken}`, "Content-Type": "application/json" }, body: JSON.stringify({ valueInputOption: "RAW", data }) }
    );
    console.log(`  Cleaned ${discRepairs.length} Discovery phone cells`);
  }

  // Also clean #ERROR! from Outreach phone column
  if (repairs.length > 0) {
    await updateCells(token, repairs);
  } else {
    // No repairs possible — just clear #ERROR! text
    const outRepairs: { row: number; col: string; value: string }[] = [];
    for (let i = 0; i < outreach.length; i++) {
      const phone = s(outreach[i][4]);
      if (phone.includes("#ERROR") || phone.includes("Formula")) {
        outRepairs.push({ row: i + 2, col: "E", value: "" });
      }
    }
    if (outRepairs.length > 0) {
      await updateCells(token, outRepairs);
      console.log(`  Cleared ${outRepairs.length} Outreach phone cells (unrecoverable)`);
    }
  }
  console.log(`Phone repair: ${errorPhones} errors, ${repaired} fixed, ${unrecoverable} unrecoverable\n`);

  // Apply cleanup to in-memory data so validation reflects post-repair state
  for (const row of discovery) { const p = s(row[6]); if (p.includes("#ERROR")) row[6] = ""; }
  for (const row of hotels) { const p = s(row[6]); if (p.includes("#ERROR")) row[6] = ""; }
  for (const row of outreach) { const p = s(row[4]); if (p.includes("#ERROR")) row[4] = ""; }

  // --- 2. DUPLICATE DETECTION ---
  const nameAreaMap = new Map<string, { tab: string; name: string; area: string }[]>();
  function add(key: string, tab: string, name: string, area: string) {
    if (!nameAreaMap.has(key)) nameAreaMap.set(key, []);
    nameAreaMap.get(key)!.push({ tab, name, area });
  }
  for (const row of discovery) add(dedupeKey(s(row[2]), s(row[3])), "Discovery", s(row[2]), s(row[3]));
  for (const row of hotels) add(dedupeKey(s(row[2]), s(row[3])), "Hotels", s(row[2]), s(row[3]));
  for (const row of outreach) add(dedupeKey(s(row[1]), s(row[2])), "Outreach", s(row[1]), s(row[2]));

  let pipelineDup = 0; // hotel in Outreach + Discovery (expected)
  let intraDup = 0;    // same hotel >1 in same tab (real duplicate)
  for (const [, entries] of nameAreaMap) {
    const tabs = [...new Set(entries.map((e) => e.tab))];
    const hasHotels = tabs.includes("Hotels");
    const hasBothDiscOut = tabs.includes("Discovery") && tabs.includes("Outreach");
    const hasIntra = entries.length > new Set(entries.map((e) => e.tab)).size;
    if (hasBothDiscOut && !hasHotels) pipelineDup++;
    if (hasHotels || hasIntra) {
      const tabCounts = new Map<string, number>();
      for (const e of entries) tabCounts.set(e.tab, (tabCounts.get(e.tab) ?? 0) + 1);
      for (const [, c] of tabCounts) if (c > 1) intraDup++;
    }
  }
  const realDups = intraDup;
  console.log(`Duplicates: ${realDups} real (${pipelineDup} pipeline cross-tab expected)\n`);

  // Show intra-tab duplicates (real duplicates)
  let shown = 0;
  for (const [key, entries] of nameAreaMap) {
    const tabs = [...new Set(entries.map((e) => e.tab))];
    for (const tab of tabs) {
      const count = entries.filter((e) => e.tab === tab).length;
      if (count > 1 && shown < 15) {
        const [name, area] = key.split("|");
        console.log(`  DUP: "${name}" in ${area} appears ${count}x in ${tab}`);
        shown++;
      }
    }
  }
  if (shown > 0) console.log("");

  // --- 3. VALIDATION (per-record, not per-field) ---
  function recordIssues() {
    return {
      leads: { missing: 0, invalid: 0 },
      discovery: { missing: 0, invalid: 0 },
      hotels: { missing: 0, invalid: 0 },
      outreach: { missing: 0, invalid: 0 },
    };
  }
  const issues = recordIssues();

  for (const row of leads) {
    const name = s(row[3]);
    const email = s(row[5]);
    const phone = s(row[6]);
    if (!email || !phone) issues.leads.missing++;
    if ((email && !isValidEmail(email)) || (phone && !isValidPhone(phone))) issues.leads.invalid++;
  }

  for (const row of discovery) {
    const name = s(row[2]);
    const area = s(row[3]);
    const website = s(row[4]);
    const email = s(row[5]);
    const phone = s(row[6]);
    if (!website || !email || !phone) issues.discovery.missing++;
    if ((email && !isValidEmail(email)) || (phone && !isValidPhone(phone))) issues.discovery.invalid++;
  }

  for (const row of hotels) {
    const name = s(row[2]);
    const area = s(row[3]);
    const email = s(row[5]);
    const phone = s(row[6]);
    if (!email || !phone) issues.hotels.missing++;
    if ((email && !isValidEmail(email)) || (phone && !isValidPhone(phone))) issues.hotels.invalid++;
  }

  for (const row of outreach) {
    const name = s(row[1]);
    const area = s(row[2]);
    const website = s(row[3]);
    const phone = s(row[4]);
    if (!website || !phone) issues.outreach.missing++;
    if (phone && !isValidPhone(phone)) issues.outreach.invalid++;
  }

  const missingTotal = issues.leads.missing + issues.discovery.missing + issues.hotels.missing + issues.outreach.missing;
  const invalidTotal = issues.leads.invalid + issues.discovery.invalid + issues.hotels.invalid + issues.outreach.invalid;

  console.log(`Records with missing contacts: ${missingTotal}`);
  console.log(`  Leads:     ${issues.leads.missing}`);
  console.log(`  Discovery: ${issues.discovery.missing}`);
  console.log(`  Hotels:    ${issues.hotels.missing}`);
  console.log(`  Outreach:  ${issues.outreach.missing}`);

  console.log(`\nRecords with invalid contacts: ${invalidTotal}`);
  console.log(`  Leads:     ${issues.leads.invalid}`);
  console.log(`  Discovery: ${issues.discovery.invalid}`);
  console.log(`  Hotels:    ${issues.hotels.invalid}`);
  console.log(`  Outreach:  ${issues.outreach.invalid}`);

  // --- 4. HEALTH SCORE ---
  const totalIssues = realDups + missingTotal + invalidTotal;
  const healthPct = total === 0 ? 100 : Math.max(0, Math.round((1 - totalIssues / Math.max(total, 1)) * 100));

  function tabHealth(len: number, miss: number, inv: number): number {
    const tabIssues = len === 0 ? 0 : miss + inv;
    return len === 0 ? 100 : Math.max(0, Math.round((1 - tabIssues / len) * 100));
  }

  console.log(`\n--- SYSTEM HEALTH SCORE ---`);
  console.log(`  Overall:   ${healthPct}% (${total - totalIssues}/${total} clean)`);
  console.log(`  Leads:     ${tabHealth(leads.length, issues.leads.missing, issues.leads.invalid)}% (${leads.length} records)`);
  console.log(`  Discovery: ${tabHealth(discovery.length, issues.discovery.missing, issues.discovery.invalid)}% (${discovery.length} records)`);
  console.log(`  Hotels:    ${tabHealth(hotels.length, issues.hotels.missing, issues.hotels.invalid)}% (${hotels.length} records)`);
  console.log(`  Outreach:  ${tabHealth(outreach.length, issues.outreach.missing, issues.outreach.invalid)}% (${outreach.length} records)`);

  // --- 5. SUMMARY ---
  console.log(`\n--- SUMMARY ---`);
  console.log(`  Records checked:  ${total}`);
  console.log(`  Records repaired: ${repaired + discRepairs.length}`);
  console.log(`  Duplicate count:  ${realDups}`);
  console.log(`  Missing contacts: ${missingTotal}`);
  console.log(`  Invalid contacts: ${invalidTotal}`);
  console.log(`  Health score:     ${healthPct}%`);

  if (healthPct >= 90) console.log(`  Next action: System healthy. No immediate action needed.`);
  else if (healthPct >= 70) console.log(`  Next action: Moderate issues. Review missing contacts and duplicates.`);
  else console.log(`  Next action: Critical issues. Phone column needs re-discovery. Most hotels lack reachable contacts.`);
}

main().catch(console.error);
