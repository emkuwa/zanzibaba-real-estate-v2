"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_FAQ_ITEMS } from "@/data/authority";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { scrollToId } from "@/lib/utils";
import { trackCtaClick } from "@/lib/gtag";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-section-fade">
      <SectionHeader
        eyebrow="FAQ"
        title="Zanzibar authority FAQ"
        description="Real estate, tourism, investment, relocation, rentals, and business — answers for foreigners researching Zanzibar."
      />

      <div className="mx-auto max-w-3xl space-y-3">
        {ALL_FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question} className="luxury-card overflow-hidden p-0">
              <button
                type="button"
                className="flex min-h-[56px] w-full items-start justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <h3 className="font-serif text-[17px] font-semibold leading-snug text-navy-heading md:text-xl">
                  {item.question}
                </h3>
                <span
                  className={cn(
                    "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl font-light transition-colors duration-200",
                    isOpen
                      ? "bg-gold text-white shadow-md"
                      : "bg-surface text-gold ring-1 ring-gold/20"
                  )}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                    <p className="border-t border-border/50 px-5 pb-5 pt-3 text-[16px] leading-[1.75] text-body md:px-6 md:pb-6 md:pt-4">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-luxury-lg bg-navy p-6 text-center text-white shadow-premium ring-1 ring-gold/20 md:mt-10 md:p-10">
        <h3 className="font-serif text-[1.625rem] font-semibold leading-tight md:text-3xl">
          Ready to explore Zanzibar?
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-[16px] leading-relaxed text-white/85 md:text-[15px]">
          Connect with our AI concierge or advisory team for personalised property, investment,
          tourism, and relocation guidance.
        </p>
        <Button
          variant="gold"
          size="lg"
          className="mt-5 w-full sm:w-auto md:mt-6"
          onClick={() => {
            trackCtaClick("Talk to Zanzibar Concierge", "faq_section");
            scrollToId("qualify");
          }}
        >
          Talk to Zanzibar Concierge
        </Button>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[14px] text-white/70">
          <Link href="/foreign-ownership-guide" className="font-medium text-gold hover:underline">
            Foreign ownership guide →
          </Link>
          <Link href="/zanzibar-residency-guide" className="font-medium text-gold hover:underline">
            Expat residency guide →
          </Link>
        </div>
      </div>
    </Section>
  );
}
