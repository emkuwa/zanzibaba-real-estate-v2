import Image from "next/image";
import Link from "next/link";
import { whatsappUrl } from "@/data/site";

export function HeroSection() {
  return <section className="bg-[#f7f4ed] pt-[72px]">
    <div className="mx-auto max-w-7xl lg:grid lg:min-h-[760px] lg:grid-cols-[1.1fr_.9fr] lg:items-stretch">
      <div className="relative aspect-[4/3] overflow-hidden lg:order-2 lg:aspect-auto"><Image src="/images/luxury/hero/hero-cinematic-zanzibar.webp" alt="Luxury beachfront villa in Zanzibar" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div>
      <div className="flex flex-col justify-center px-6 py-9 sm:px-10 lg:order-1 lg:px-16 lg:py-20">
        <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#123a35]">Exceptional property.</p>
        <h1 className="mt-3 font-serif text-[3.15rem] font-medium italic leading-[.9] tracking-[-.045em] text-[#102f2c] sm:text-6xl lg:text-7xl">Extraordinary<br />Zanzibar.</h1>
        <p className="mt-6 max-w-lg text-[15px] leading-7 text-[#394744]">Curated villas, beachfront land, hospitality assets and off-plan opportunities for international buyers.</p>
        <div className="mt-7 grid gap-3 sm:max-w-lg sm:grid-cols-2"><Link href="/opportunities" className="flex min-h-14 items-center justify-center bg-[#073f37] px-6 text-[11px] font-semibold uppercase tracking-[.13em] text-white">Explore Properties <span className="ml-3 text-lg">→</span></Link><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-center border border-[#163d38] px-6 text-[11px] font-semibold uppercase tracking-[.11em] text-[#123a35]">◉ <span className="ml-2">WhatsApp an Advisor</span></a></div>
        <p className="mt-7 flex items-start gap-3 border-t border-[#d9d4c9] pt-5 text-xs leading-5 text-[#47534f]"><span className="text-lg">⌖</span> Local team in Zanzibar&nbsp; · &nbsp;Due diligence support&nbsp; · &nbsp;International buyer advisory</p>
      </div>
    </div>
  </section>;
}
