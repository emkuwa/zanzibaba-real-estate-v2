export const GA_MEASUREMENT_ID = "G-EG4P702WCG";

declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string,
      config?: Record<string, string | number | boolean>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Track a GA4 event using gtag.js.
 * Follows GA4 best practices: descriptive snake_case event names, consistent parameter naming.
 *
 * Recommended GA4 event names used:
 *  - generate_lead       → form submissions with lead intent
 *  - form_submit         → general form submissions
 *  - cta_click           → CTA button clicks
 *  - whatsapp_click      → WhatsApp engagement
 *  - chat_open           → AI Concierge opened
 *  - chat_close          → AI Concierge closed
 *  - scroll_depth        → content engagement
 */
export function gtagEvent(
  action: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
}

/**
 * Track a form submission event (maps to GA4's generate_lead recommendation).
 */
export function trackFormSubmit(source: string): void {
  gtagEvent("generate_lead", {
    lead_source: source,
    value: 1,
  });
}

/**
 * Track a CTA button click.
 */
export function trackCtaClick(label: string, location?: string): void {
  gtagEvent("cta_click", {
    cta_label: label,
    cta_location: location ?? "unknown",
  });
}

/**
 * Track a WhatsApp engagement click.
 */
export function trackWhatsAppClick(location: string): void {
  gtagEvent("whatsapp_click", {
    engagement_location: location,
  });
}

/**
 * Track when the AI Concierge chat is opened or closed.
 */
export function trackChatAction(action: "open" | "close"): void {
  gtagEvent(action === "open" ? "chat_open" : "chat_close");
}
