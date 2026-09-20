"use client";

import { useState } from "react";
import { OPPORTUNITIES, OPPORTUNITY_TAGS } from "@/ecosystem/data/opportunities";
import { OpportunityCard } from "./OpportunityCard";

export function OpportunityBrowser() {
  const [tag, setTag] = useState<string>("");
  const [type, setType] = useState<string>("");

  const filtered = OPPORTUNITIES.filter((o) => {
    if (tag && !o.tags.includes(tag as (typeof o.tags)[number])) return false;
    if (type && o.type !== type) return false;
    return true;
  });

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTag("")}
          className={`rounded-[3px] px-3 py-2 text-[13px] font-medium ${!tag ? "bg-navy text-white" : "border border-border bg-[#fbfaf6] text-navy"}`}
        >
          All tags
        </button>
        {OPPORTUNITY_TAGS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(t === tag ? "" : t)}
            className={`rounded-[3px] px-3 py-2 text-[13px] font-medium ${tag === t ? "bg-gold text-white" : "border border-border bg-[#fbfaf6] text-navy"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {["", "villa", "land", "hotel", "resort", "apartment", "commercial"].map((t) => (
          <button
            key={t || "all"}
            type="button"
            onClick={() => setType(t)}
            className={`rounded-[3px] px-3 py-2 text-[13px] font-medium capitalize ${type === t ? "bg-navy text-white" : "border border-border bg-[#fbfaf6] text-navy"}`}
          >
            {t || "All types"}
          </button>
        ))}
      </div>

      <p className="mb-4 text-[14px] text-muted">{filtered.length} opportunities</p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((o) => (
          <OpportunityCard key={o.id} opportunity={o} />
        ))}
      </div>
    </>
  );
}
