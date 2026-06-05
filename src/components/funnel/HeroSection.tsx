"use client";

import { VISUAL_SYSTEM } from "@/data/visual-system";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Section";
import { LuxuryBackground } from "@/components/ui/LuxuryImage";
import { scrollToId } from "@/lib/utils";
import { trackFormSubmit, trackCtaClick } from "@/lib/gtag";
import { useState } from "react";
import { BOOK_CALL_URL, TARGET_COUNTRIES, BUDGET_TIERS, whatsappUrl } from "@/data/site";

const inputClass =
  "min-h-[48px] w-full rounded-luxury border border-white/30 bg-navy-deep/60 px-4 py-3 text-[16px] text-white placeholder:text-white/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

const selectClass =
  "min-h-[48px] w-full rounded-luxury border border-white/30 bg-navy-deep/60 px-4 py-3 text-[16px] text-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 appearance-none bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20fill=%22none%22%20viewBox=%220%200%2024%2024%22%20stroke=%22white%22%20stroke-width=%222%22><path%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%20d=%22M19%209l-7%207-7-7%22/></svg>')] bg-[length:18px_18px] bg-[right_0.9rem_center] bg-no-repeat pr-10";

export function HeroSection() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!whatsapp.trim() || !country || !budget) return;
    setStatus("loading");
    try {
      await fetch("/api/leads/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Hero enquiry",
          email,
          phone: whatsapp,
          country,
          qualification: { budget, intent: "Property Investment" },
          source: "hero_quick_form",
        }),
      });
      setStatus("done");
      trackFormSubmit("hero_quick_form");
    } catch {
      setStatus("idle");
    }
  }

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0 z-0">
        <LuxuryBackground
          asset={VISUAL_SYSTEM.hero.primary}
          overlay="cinematic"
          priority
          className="h-full w-full"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-8 pt-[4.5rem] sm:px-6 lg:flex-row lg:items-center lg:gap-10 lg:px-8 lg:pb-14 lg:pt-28">
        <div className="max-w-2xl flex-1">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C89B3C] drop-shadow-md md:mb-4">
            For International Investors
          </p>
          <h1 className="font-serif text-[2rem] font-semibold leading-[1.1] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-[2.25rem] md:text-5xl lg:text-[3.25rem]">
            Buy verified Zanzibar beachfront villas from $350K.
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-[1.75] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] sm:mt-5 md:mt-6 md:text-lg">
            10–15% Airbnb-ready yields. Foreign-buyer compliant. Bilingual advisory in Paje and
            Stone Town.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
            <Button
              variant="gold"
              size="lg"
              className="w-full shadow-premium sm:w-auto"
              onClick={() => {
                trackCtaClick("Get Investment Brief", "hero_section");
                scrollToId("qualify");
              }}
            >
              Get My Free Investment Brief
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full border-white/40 bg-white/15 text-white hover:bg-white/25 sm:w-auto"
              onClick={() => {
                trackCtaClick("Book a Call", "hero_section");
                if (typeof window !== "undefined") window.open(BOOK_CALL_URL, "_blank", "noopener");
              }}
            >
              Book a 30-min Call
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full border-white/40 bg-white/15 text-white hover:bg-white/25 sm:w-auto"
              onClick={() => {
                trackCtaClick("View Opportunities", "hero_section");
                scrollToId("opportunities");
              }}
            >
              View Opportunities
            </Button>
          </div>

          <p className="mt-4 text-[14px] leading-relaxed text-white/80 drop-shadow md:mt-5">
            Trusted by investors from 47 countries · Replies within 4 hours
          </p>
        </div>

        <div className="mt-6 w-full max-w-md lg:mt-0">
          <GlassCard className="border-white/30 bg-[#07245A]/85 shadow-premium backdrop-blur-md">
            <h2 className="font-serif text-[1.375rem] font-semibold text-white md:text-2xl">
              Get matched with verified investment opportunities
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-white">
              No spam. A senior advisor replies within 24 hours with matched properties.
            </p>
            {status === "done" ? (
              <div className="mt-4 rounded-luxury border border-gold/40 bg-navy-deep/50 p-4">
                <p className="text-[16px] font-semibold text-gold">
                  Thank you — your brief is on its way.
                </p>
                <p className="mt-2 text-[14px] text-white/90">
                  Prefer to talk now? Reach us on WhatsApp — replies in under 2 hours.
                </p>
                <a
                  href={whatsappUrl(
                    "Hello, I just submitted the hero form. Please send me my investment brief."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[14px] font-semibold text-gold hover:underline"
                >
                  Open WhatsApp →
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="Full name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp number (with country code)"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className={inputClass}
                />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
                <select
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={selectClass}
                  aria-label="Country of residence"
                >
                  <option value="" disabled>
                    Country of residence
                  </option>
                  {TARGET_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.label} className="text-navy">
                      {c.label}
                    </option>
                  ))}
                </select>
                <select
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className={selectClass}
                  aria-label="Investment budget"
                >
                  <option value="" disabled>
                    Investment budget
                  </option>
                  {BUDGET_TIERS.map((b) => (
                    <option key={b} value={b} className="text-navy">
                      {b}
                    </option>
                  ))}
                </select>
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  className="w-full shadow-md"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending…" : "Get My Investment Brief"}
                </Button>
                <p className="text-center text-[12px] text-white/70">
                  Or{" "}
                  <a
                    href={BOOK_CALL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gold hover:underline"
                  >
                    book a 30-min call
                  </a>{" "}
                  with a senior advisor.
                </p>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
