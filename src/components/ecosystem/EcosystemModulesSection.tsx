"use client";

import Link from "next/link";
import { ECOSYSTEM_MODULES } from "@/ecosystem/data/modules";
import { Section, SectionHeader } from "@/components/ui/Section";
import { scrollToId } from "@/lib/utils";

export function EcosystemModulesSection() {
  return (
    <Section id="ecosystem" className="bg-navy-deep py-8 text-white md:py-12">
      <SectionHeader
        eyebrow="Zanzibar Investment Ecosystem"
        title="Nine modules. One premium platform."
        description="From investor CRM and developer partnerships to AI concierge, opportunity database, and intelligence publishing — the infrastructure foreigners use to discover, invest in, and experience Zanzibar."
        light
        align="center"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {ECOSYSTEM_MODULES.map((mod) => (
          <article
            key={mod.id}
            className="rounded-luxury-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-gold/30 hover:bg-white/[0.07] md:p-6"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
              Module {mod.number}
            </span>
            <h3 className="mt-2 font-serif text-[1.25rem] font-semibold text-white">{mod.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-white/70">{mod.description}</p>
            <ul className="mt-3 space-y-1">
              {mod.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[13px] text-white/60">
                  <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            {mod.href.startsWith("/#") ? (
              <button
                type="button"
                onClick={() => scrollToId(mod.href.replace("/#", ""))}
                className="mt-4 text-[14px] font-semibold text-gold hover:underline"
              >
                Open module →
              </button>
            ) : (
              <Link href={mod.href} className="mt-4 inline-block text-[14px] font-semibold text-gold hover:underline">
                Open module →
              </Link>
            )}
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/ecosystem"
          className="inline-flex rounded-full bg-gold px-8 py-3.5 text-[15px] font-semibold text-white shadow-md transition hover:bg-gold-light"
        >
          Explore Full Ecosystem →
        </Link>
      </div>
    </Section>
  );
}
