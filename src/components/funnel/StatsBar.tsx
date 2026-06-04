"use client";

import trustMetrics from "@/data/trust-metrics.json";
import { StatIcon, type StatIconName } from "@/components/ui/StatIcon";

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {trustMetrics.signals.map((signal) => {
        const icon = signal.icon as StatIconName;
        return (
          <div
            key={signal.id}
            className="luxury-card flex flex-col items-center px-4 py-5 text-center md:py-6"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/5 text-gold shadow-sm ring-1 ring-gold/20">
              <StatIcon name={icon} className="h-6 w-6" />
            </div>
            <p className="font-serif text-[1rem] font-semibold leading-snug text-navy-heading md:text-[1.125rem]">
              {signal.label}
            </p>
            {signal.detail && (
              <p className="mt-1.5 text-[12px] text-muted">{signal.detail}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
