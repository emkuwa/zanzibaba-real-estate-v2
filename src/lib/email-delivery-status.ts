import { promises as fs } from "fs";
import path from "path";
import nodemailer from "nodemailer";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "email-delivery-status.json");

export type DeliveryStatus = {
  lastSentAt: string | null;
  lastSentTo: string | null;
  lastSentSubject: string | null;
  lastSuccessAt: string | null;
  lastErrorAt: string | null;
  lastErrorMessage: string | null;
  lastErrorTo: string | null;
  totalSent: number;
  totalFailed: number;
};

const EMPTY: DeliveryStatus = {
  lastSentAt: null,
  lastSentTo: null,
  lastSentSubject: null,
  lastSuccessAt: null,
  lastErrorAt: null,
  lastErrorMessage: null,
  lastErrorTo: null,
  totalSent: 0,
  totalFailed: 0,
};

export function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export function resolveLeadRecipient(): { to: string; isDefault: boolean } {
  const to = process.env.LEAD_EMAIL_TO;
  if (to && to.trim()) {
    return { to: to.trim(), isDefault: false };
  }
  return { to: "info@zanzibaba.com", isDefault: true };
}

export async function readDeliveryStatus(): Promise<DeliveryStatus> {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf-8");
    const data = JSON.parse(raw);
    return { ...EMPTY, ...data };
  } catch {
    return { ...EMPTY };
  }
}async function writeDeliveryStatus(status: DeliveryStatus): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(status, null, 2), "utf-8");
}

export async function recordDeliverySuccess(input: {
  to: string;
  subject: string;
}): Promise<void> {
  try {
    const current = await readDeliveryStatus();
    const now = new Date().toISOString();
    await writeDeliveryStatus({
      ...current,
      lastSentAt: now,
      lastSentTo: input.to,
      lastSentSubject: input.subject,
      lastSuccessAt: now,
      lastErrorAt: current.lastErrorAt,
      lastErrorMessage: current.lastErrorMessage,
      lastErrorTo: current.lastErrorTo,
      totalSent: current.totalSent + 1,
    });
  } catch (e) {
    // Status persistence is best-effort. Vercel filesystem is read-only except /tmp.
    console.warn(
      `[lead-delivery] Could not persist delivery status (success) — ${e instanceof Error ? e.message : String(e)}`
    );
  }
}

export async function recordDeliveryFailure(input: {
  to: string;
  error: string;
}): Promise<void> {
  try {
    const current = await readDeliveryStatus();
    const now = new Date().toISOString();
    await writeDeliveryStatus({
      ...current,
      lastErrorAt: now,
      lastErrorMessage: input.error,
      lastErrorTo: input.to,
      lastSentAt: current.lastSentAt,
      lastSentTo: current.lastSentTo,
      lastSentSubject: current.lastSentSubject,
      lastSuccessAt: current.lastSuccessAt,
      totalFailed: current.totalFailed + 1,
    });
  } catch (e) {
    console.warn(
      `[lead-delivery] Could not persist delivery status (failure) — ${e instanceof Error ? e.message : String(e)}`
    );
  }
}

/**
 * Runs once at module load. Logs warnings for misconfigured lead delivery,
 * and (if SMTP is configured) runs a one-shot transporter.verify() to
 * confirm connectivity. Failure does not throw — app still boots.
 * Safe to call multiple times — output is throttled by a process-level flag.
 */
let warned = false;
export function warnOnLeadDeliveryMisconfig(): void {
  if (warned) return;
  warned = true;

  const { to, isDefault } = resolveLeadRecipient();
  const smtp = smtpConfigured();

  if (isDefault) {
    console.warn(
      "[lead-delivery] LEAD_EMAIL_TO is not set — using fallback info@zanzibaba.com. " +
        "Set LEAD_EMAIL_TO in .env.local to make the recipient explicit."
    );
  } else {
    console.info(`[lead-delivery] Recipient: ${to}${isDefault ? " (fallback)" : ""}`);
  }

  if (!smtp) {
    console.warn(
      "[lead-delivery] SMTP is NOT configured (SMTP_HOST/SMTP_USER/SMTP_PASS). " +
        "Accommodation leads will be SAVED to data/investors.json but NO email will be sent. " +
        "Configure SMTP in .env.local to enable email delivery."
    );
    return;
  }

  const host = process.env.SMTP_HOST!;
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  const port = Number(process.env.SMTP_PORT ?? 587);

  console.info(
    `[lead-delivery] SMTP configured — leads will be emailed to ${to}. Verifying connectivity to ${host}:${port} as ${user}…`
  );

  // Fire-and-forget; never throws into module init.
  void (async () => {
    try {
      const verifier = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        requireTLS: true,
        auth: { user, pass },
      });
      await verifier.verify();
      console.info(
        `[lead-delivery] SMTP connectivity OK — ${host}:${port} as ${user}`
      );
      verifier.close();
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      console.error(
        `[lead-delivery] SMTP connectivity FAILED — ${host}:${port} as ${user} — ${message}. ` +
          `Leads will be SAVED only until this is fixed. Check host/port/credentials/network egress.`
      );
    }
  })();
}
