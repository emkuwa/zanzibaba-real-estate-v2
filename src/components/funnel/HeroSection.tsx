import Image from "next/image";
import Link from "next/link";
import { whatsappUrl } from "@/data/site";

export function HeroSection() {
  return (
    <section className="bg-[#f7f4ed]">
      <div className="mx-auto max-w-7xl lg:grid lg:min-h-[760px] lg:grid-cols-[1.1fr_.9fr] lg:items-stretch">
        <div className="relative h-[300px] overflow-hidden sm:h-[360px] lg:order-2 lg:h-auto">
          <Image
            src="/images/editorial/villa-daylight.webp"
            alt="A beachfront villa in Zanzibar in natural daylight"
            fill
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-9 sm:px-10 lg:order-1 lg:px-16 lg:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#0a5b4d]">
            Verified Property for Sale in Zanzibar
          </p>
          <h1 className="mt-3 font-serif text-[2.9rem] font-medium italic leading-[.92] tracking-[-.045em] text-[#102f2c] sm:text-6xl lg:text-7xl">
            Find Your Property
            <br />
            in Zanzibar.
          </h1>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[.1em] text-[#47605b]">
            Local team · Verified opportunities · Buyer support
          </p>
          <p className="mt-3 max-w-lg text-[15px] leading-6 text-[#394744]">
            Villas, beachfront land and off-plan opportunities available now for
            international buyers.
          </p>
          <div className="mt-6 grid gap-3 sm:max-w-lg sm:grid-cols-2">
            <Link
              href="/opportunities"
              className="flex min-h-14 items-center justify-center bg-[#073f37] px-5 text-[11px] font-semibold uppercase tracking-[.11em] text-white"
            >
              View Available Properties <span className="ml-3 text-lg">→</span>
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-center border border-[#163d38] px-5 text-[11px] font-semibold uppercase tracking-[.1em] text-[#123a35]"
            >
              ◉ <span className="ml-2">WhatsApp an Advisor</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
