"use client";

import { VISUAL_SYSTEM } from "@/data/visual-system";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Section";
import { LuxuryBackground } from "@/components/ui/LuxuryImage";
import { scrollToId } from "@/lib/utils";
import { useState } from "react";

const inputClass =
  "min-h-[48px] w-full rounded-luxury border border-white/30 bg-navy-deep/60 px-4 py-3 text-[16px] text-white placeholder:text-white/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

export function HeroSection() {
  const [quickEmail, setQuickEmail] = useState("");
  const [quickName, setQuickName] = useState("");
  const [quickStatus, setQuickStatus] = useState<"idle" | "loading" | "done">("idle");

  async function handleQuickSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!quickEmail.trim()) return;
    setQuickStatus("loading");
    try {
      await fetch("/api/leads/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quickName || "Hero enquiry",
          email: quickEmail,
          phone: "",
          source: "hero_quick_form",
        }),
      });
      setQuickStatus("done");
    } catch {
      setQuickStatus("idle");
    }
  }

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden" aria-label="Hero">
      {/* Background layer — z-0 */}
      <div className="absolute inset-0 z-0">
        <LuxuryBackground
          asset={VISUAL_SYSTEM.hero.primary}
          overlay="cinematic"
          priority
          className="h-full w-full"
        />
      </div>

      {/* Content layer — z-10, always visible (no opacity animations) */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-8 pt-[4.5rem] sm:px-6 lg:flex-row lg:items-center lg:gap-10 lg:px-8 lg:pb-14 lg:pt-28">
        <div className="max-w-2xl flex-1">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C89B3C] drop-shadow-md md:mb-4">
            Zanzibar Investment Ecosystem
          </p>
          <h1 className="font-serif text-[2rem] font-semibold leading-[1.1] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-[2.25rem] md:text-5xl lg:text-[3.25rem]">
            Discover. Invest. Relocate. Experience Zanzibar.
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-[1.75] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] sm:mt-5 md:mt-6 md:text-lg">
            A luxury investment platform and intelligence network — real estate, developer
            partnerships, AI concierge, and premium relocation for global audiences.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
            <Button
              variant="gold"
              size="lg"
              className="w-full shadow-premium sm:w-auto"
              onClick={() => scrollToId("ecosystem")}
            >
              Explore Ecosystem
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full border-white/40 bg-white/15 text-white hover:bg-white/25 sm:w-auto"
              onClick={() => scrollToId("qualify")}
            >
              AI Concierge Match
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full border-white/40 bg-white/15 text-white hover:bg-white/25 sm:w-auto"
              onClick={() => scrollToId("invest")}
            >
              View Opportunities
            </Button>
          </div>

          <p className="mt-4 text-[14px] leading-relaxed text-white/80 drop-shadow md:mt-5">
            Investors · Developers · Tourists · Expats · Nomads · Entrepreneurs
          </p>
        </div>

        <div className="mt-6 w-full max-w-md lg:mt-0">
          <GlassCard className="border-white/30 bg-[#07245A]/85 shadow-premium backdrop-blur-md">
            <h2 className="font-serif text-[1.375rem] font-semibold text-white md:text-2xl">
              Get matched with properties & rentals
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-white">
              Receive curated villas, investment opportunities, or luxury rental options matched to
              your goals.
            </p>
            {quickStatus === "done" ? (
              <p className="mt-4 text-[16px] font-medium text-[#C89B3C]">
                Thank you — our advisory team will contact you shortly.
              </p>
            ) : (
              <form onSubmit={handleQuickSubmit} className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="Full name"
                  value={quickName}
                  onChange={(e) => setQuickName(e.target.value)}
                  className={inputClass}
                />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={quickEmail}
                  onChange={(e) => setQuickEmail(e.target.value)}
                  className={inputClass}
                />
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  className="w-full shadow-md"
                  disabled={quickStatus === "loading"}
                >
                  {quickStatus === "loading" ? "Sending…" : "Get Matched With Properties"}
                </Button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
