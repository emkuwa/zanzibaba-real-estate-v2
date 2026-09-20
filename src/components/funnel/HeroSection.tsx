"use client";

import { VISUAL_SYSTEM } from "@/data/visual-system";
import { LuxuryBackground } from "@/components/ui/LuxuryImage";
import { SITE } from "@/data/site";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0 z-0">
        <LuxuryBackground
          asset={VISUAL_SYSTEM.hero.primary}
          overlay="cinematic"
          priority
          className="h-full w-full"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-8 pt-[4.5rem] sm:px-6 lg:px-8 lg:pb-14 lg:pt-28">
        <div className="max-w-3xl">
          <h1 className="font-serif text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]">
            Exceptional Property.
            <br />
            Extraordinary Zanzibar.
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/80 sm:text-lg lg:text-xl">
            Curated villas, beachfront land, hospitality assets and off-plan opportunities for international buyers.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/opportunities"
              className="inline-flex items-center justify-center rounded-sm bg-[#C89B3C] px-8 py-4 text-sm font-bold uppercase tracking-wider text-navy-deep transition hover:bg-[#d4ab55]"
            >
              Explore Properties
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-sm border border-white/40 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              WhatsApp an Advisor
            </a>
          </div>

          <p className="mt-8 text-[12px] font-medium uppercase tracking-[0.2em] text-white/50">
            Local team in Zanzibar · Due diligence support · International buyer advisory
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {[
              "Based in Paje and Stone Town",
              "Founder-led advisory",
              "Buyer support from search to handover",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/65">
                <span className="h-1 w-1 shrink-0 rounded-full bg-[#C89B3C]/70" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
