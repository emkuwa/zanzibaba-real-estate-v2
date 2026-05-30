import { SITE, whatsappUrl, NAV_LINKS, FOOTER_AUTHORITY_LINKS } from "@/data/site";
import { BRAND_LOGO } from "@/data/brand";
import { BrandLogo } from "@/components/ui/BrandLogo";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="flex flex-col gap-7 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <BrandLogo
              variant="reverse"
              height={BRAND_LOGO.sizes.footer}
              className="mb-4 h-10 w-auto md:mb-5 md:h-12"
            />
            <p className="max-w-sm text-[16px] leading-[1.7] text-white/75">
              {SITE.tagline}
            </p>
            <p className="mt-2 text-[14px] text-white/50">
              A division of {SITE.legalName}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:col-span-4">
            <div>
              <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold">
                Navigate
              </h3>
              <ul className="space-y-2.5 text-[15px]">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/80 transition hover:text-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold">
                Authority Hub
              </h3>
              <ul className="space-y-2.5 text-[15px]">
                {FOOTER_AUTHORITY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/80 transition hover:text-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold">
              Contact
            </h3>
            <ul className="space-y-2.5 text-[16px]">
              <li>
                <a href={`mailto:${SITE.email}`} className="text-white/80 hover:text-gold">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phoneTel}`} className="text-white/80 hover:text-gold">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-gold hover:underline"
                >
                  WhatsApp Concierge
                </a>
              </li>
            </ul>
            <h3 className="mb-3 mt-6 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold">
              Offices
            </h3>
            <ul className="space-y-3">
              {SITE.offices.map((office) => (
                <li
                  key={office.name}
                  className="rounded-luxury border-l-2 border-gold/40 bg-white/[0.04] py-2 pl-4"
                >
                  <strong className="block text-[16px] text-white">{office.name}</strong>
                  <span className="text-[14px] text-white/70">{office.location}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-6 text-[14px] text-white/50 md:mt-8 md:flex-row md:items-center md:justify-between md:pt-7">
          <p>© {year} {SITE.legalName}. All rights reserved.</p>
          <p className="text-white/40">Indicative figures — not audited financials.</p>
        </div>
      </div>
    </footer>
  );
}
