import nodemailer from "nodemailer";
import { SITE } from "@/data/site";
import {
  recordDeliveryFailure,
  recordDeliverySuccess,
  resolveLeadRecipient,
  smtpConfigured,
  warnOnLeadDeliveryMisconfig,
} from "@/lib/email-delivery-status";

warnOnLeadDeliveryMisconfig();

function formatAnswers(answers: Record<string, string | undefined>): string {
  const labelMap: Record<string, string> = {
    checkInDate: "Check-in Date",
    checkOutDate: "Check-out Date",
    guests: "Guests",
    budgetPerNight: "Budget per Night",
    area: "Preferred Area",
    rentalBudget: "Monthly Budget",
    rentalType: "Rental Type",
    stayDuration: "Stay Duration",
    lifestylePrefer: "Lifestyle Preference",
    propertyType: "Property Type",
    budget: "Budget",
    timeline: "Timeline",
  };
  return Object.entries(answers)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${labelMap[k] || k}: ${v}`)
    .join("\n");
}

export async function sendInquiryEmail(payload: {
  name: string;
  email: string;
  phone: string;
  source: string;
  country?: string;
  qualification?: Record<string, string | undefined>;
}): Promise<{ sent: boolean; reason?: string; to?: string }> {
  const isAccommodation = payload.qualification?.intent === "Find Accommodation";
  const qualLines =
    payload.qualification && typeof payload.qualification === "object"
      ? formatAnswers(payload.qualification)
      : "";

  const text = [
    `New ${isAccommodation ? "Accommodation" : "Investment"} Lead — realestate.zanzibaba.com`,
    `Source: ${payload.source}`,
    ``,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `WhatsApp/Phone: ${payload.phone}`,
    payload.country ? `Country: ${payload.country}` : "",
    ``,
    qualLines ? `Details:\n${qualLines}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const subject = `[ZRE ${isAccommodation ? "Stay" : "Lead"}] ${payload.name || "Inquiry"} — ${payload.source}`;
  const { to, isDefault } = resolveLeadRecipient();
  const smtp = smtpConfigured();

  if (!smtp) {
    console.warn(
      `[lead-delivery] SMTP not configured. Lead SAVED only — no email sent. Lead: ${payload.name || "unknown"} (${payload.email || payload.phone || "no contact"}).`
    );
    console.info(`[lead-delivery] Lead payload (would email to ${to}):\n${text}`);
    return { sent: false, reason: "smtp_not_configured", to };
  }

  const host = process.env.SMTP_HOST!;
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  const port = Number(process.env.SMTP_PORT ?? 587);

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      requireTLS: true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? `"Zanzibaba Real Estate" <${user}>`,
      to,
      replyTo: payload.email || undefined,
      subject,
      text,
    });

    console.info(
      `[lead-delivery] Email SENT to ${to}${isDefault ? " (fallback)" : ""} — subject: "${subject}"`
    );
    await recordDeliverySuccess({ to, subject });
    return { sent: true, to };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error(
      `[lead-delivery] Email FAILED to ${to} — ${message}. Lead data preserved in data/investors.json.`
    );
    await recordDeliveryFailure({ to, error: message });
    return { sent: false, reason: "send_failed", to };
  }
}

// Keep SITE import used so the file doesn't fail if SITE.email fallback path is referenced elsewhere.
export const _SITE_EMAIL_FALLBACK = SITE.email;
