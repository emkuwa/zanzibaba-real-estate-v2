"use client";

import trustMetrics from "@/data/trust-metrics.json";
import { StatIcon, type StatIconName } from "@/components/ui/StatIcon";
import { AnimatedCounter } from "@/components/ui/MotionReveal";

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {trustMetrics.metrics.map((metric) => {
        const numeric = parseInt(String(metric.value).replace(/\D/g, ""), 10);
        const isNumeric = !Number.isNaN(numeric) && numeric > 0;
        const icon = ("icon" in metric ? metric.icon : "award") as StatIconName;

        return (
          <div
            key={metric.id}
            className="luxury-card flex flex-col items-center px-4 py-5 text-center md:py-6"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/5 text-gold shadow-sm ring-1 ring-gold/20">
              <StatIcon name={icon} className="h-8 w-8" />
            </div>
            <p className="font-serif text-[2rem] font-semibold leading-none text-navy-heading md:text-4xl">
              {isNumeric ? (
                <AnimatedCounter
                  value={numeric}
                  suffix={"suffix" in metric ? metric.suffix : ""}
                />
              ) : (
                metric.value
              )}
            </p>
            <p className="mt-2 text-[14px] font-semibold leading-snug text-navy-heading md:text-[15px]">
              {metric.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
