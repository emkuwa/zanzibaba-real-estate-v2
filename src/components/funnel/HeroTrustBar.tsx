import trustMetrics from "@/data/trust-metrics.json";
import { StatIcon, type StatIconName } from "@/components/ui/StatIcon";
import { cn } from "@/lib/utils";

const TRUST_EXTRAS = [
  {
    id: "licensed",
    label: "Licensed Zanzibar Advisory",
    icon: "award" as StatIconName,
  },
] as const;

export function HeroTrustBar() {
  const items = [
    ...trustMetrics.metrics.slice(0, 3).map((m) => ({
      id: m.id,
      label: `${m.value}${"suffix" in m ? m.suffix : ""} ${m.label}`,
      icon: ("icon" in m ? m.icon : "award") as StatIconName,
    })),
    TRUST_EXTRAS[0],
  ];

  return (
    <section
      aria-label="Investor trust indicators"
      className="relative z-10 border-b border-[#E2E8F0] bg-white py-5 md:py-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-center text-[13px] font-semibold uppercase tracking-[0.16em] text-[#C89B3C] md:mb-4">
          Zanzibar Investment Ecosystem · Global Platform
        </p>
        <div className={cn("grid grid-cols-2 gap-3", "md:grid-cols-4 md:gap-4")}>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-[1.5rem] border border-[#E2E8F0] bg-white px-4 py-3.5 shadow-[0_8px_32px_rgba(7,36,90,0.1)] md:px-5 md:py-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C89B3C]/15 text-[#C89B3C] ring-1 ring-[#C89B3C]/25">
                <StatIcon name={item.icon} className="h-5 w-5" />
              </div>
              <p className="text-[13px] font-semibold leading-snug text-[#0B2A6B] sm:text-[14px]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
