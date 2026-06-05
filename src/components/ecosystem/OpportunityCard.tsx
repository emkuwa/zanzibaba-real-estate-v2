import Link from "next/link";
import type { Opportunity } from "@/ecosystem/types";
import { opportunityImagePath } from "@/lib/ecosystem/utils";
import { cn } from "@/lib/utils";

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <article className="luxury-card group overflow-hidden p-0 transition hover:shadow-premium">
      <div className="relative h-52 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={opportunityImagePath(opportunity.imageKey)}
          alt={opportunity.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent" />
        <span
          className={cn(
            "absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
            opportunity.status === "available"
              ? "bg-gold text-white"
              : "bg-white/20 text-white backdrop-blur-sm"
          )}
        >
          {opportunity.status.replace("-", " ")}
        </span>
      </div>
      <div className="p-4 md:p-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-gold">
          {opportunity.type} · {opportunity.area}
        </p>
        <h3 className="mt-1 font-serif text-[1.125rem] font-semibold text-navy-heading md:text-xl">
          {opportunity.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-body">
          {opportunity.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {opportunity.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] font-medium text-navy-heading"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-[13px] text-muted">From</p>
            <p className="font-serif text-lg font-semibold text-navy-heading">
              {opportunity.priceFrom}
            </p>
          </div>
          {opportunity.roiEstimate && (
            <p className="text-right text-[13px] font-medium text-gold">{opportunity.roiEstimate}</p>
          )}
        </div>
        <Link
          href="/#qualify"
          className="mt-4 inline-block text-[14px] font-semibold text-gold hover:underline"
        >
          Request advisory →
        </Link>
      </div>
    </article>
  );
}
