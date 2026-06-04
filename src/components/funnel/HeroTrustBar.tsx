"use client";

import trustMetrics from "@/data/trust-metrics.json";
import { StatIcon, type StatIconName } from "@/components/ui/StatIcon";
import { cn } from "@/lib/utils";

export function HeroTrustBar() {
  const items = trustMetrics.signals.map((s) => ({
    id: s.id,
    label: s.label,
    detail: s.detail,
    icon: s.icon as StatIconName,
  }));

  return (
    <section
      aria-label="Investor trust signals"
      className="relative z-10 border-b border-[#E2E8F0] bg-white py-5 md:py-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-center text-[13px] font-semibold uppercase tracking-[0.16em] text-[#C89B3C] md:mb-4">
          Verified · Licensed · Independent
        </p>
        <div className={cn("grid grid-cols-2 gap-3", "md:grid-cols-4 md:gap-4")}>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-[1.5rem] border border-[#E2E8F0] bg-white px-4 py-3.5 shadow-[0_8px_32px_rgba(7,36,90,0.1)] md:px-5 md:py-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C89B3C]/15 text-[#C89B3C] ring-1 ring-[#C89B3C]/25">
                <StatIcon name={item.icon} className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold leading-snug text-[#0B2A6B] sm:text-[14px]">
                  {item.label}
                </p>
                {item.detail && (
                  <p className="mt-0.5 text-[11px] leading-snug text-[#64748B] sm:text-[12px]">
                    {item.detail}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
