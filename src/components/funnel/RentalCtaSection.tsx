"use client";

import { RENTAL_CTAS } from "@/data/seo-content";
import { Section } from "@/components/ui/Section";
import { scrollToId } from "@/lib/utils";

export function RentalCtaSection() {
  return (
    <Section dark className="py-8 md:py-12">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-gold">
          Your Zanzibar Concierge
        </p>
        <h2 className="mt-3 font-serif text-[1.75rem] font-semibold leading-tight md:text-3xl">
          Invest, buy, or rent — one premium advisory team
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-white/80">
          From luxury villa rentals and expat housing to beachfront investment — AI-guided matching
          with human concierge support.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10">
        {RENTAL_CTAS.map((cta) => (
          <button
            key={cta.label}
            type="button"
            onClick={() => scrollToId(cta.target)}
            className="rounded-luxury-lg border border-white/15 bg-white/[0.06] p-5 text-left transition hover:border-gold/40 hover:bg-white/[0.1] md:p-6"
          >
            <span className="block font-serif text-[1.125rem] font-semibold text-white md:text-xl">
              {cta.label}
            </span>
            <span className="mt-1 block text-[14px] text-white/65">{cta.subtext}</span>
          </button>
        ))}
      </div>
    </Section>
  );
}
