import { SITE, whatsappUrl, NAV_LINKS, FOOTER_AUTHORITY_LINKS } from "@/data/site";
import { BRAND_LOGO } from "@/data/brand";
import { BrandLogo } from "@/components/ui/BrandLogo";
import Link from "next/link";

const SOCIAL = [
  { label: "Facebook", href: "https://www.facebook.com/ZanzibabaCompanyLimited" },
  { label: "Instagram", href: "https://www.instagram.com/zanzibaragroup" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zanzibaba-company-limited" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLogo
              variant="reverse"
              height={BRAND_LOGO.sizes.footer}
              className="mb-5 h-10 w-auto md:h-12"
            />
            <p className="max-w-xs text-sm leading-relaxed text-white/65">
              Local property advisory in Zanzibar — beachfront villas, development
              land, and off-plan opportunities for international buyers.
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20b858]"
            >
              WhatsApp an advisor
            </a>
            <div className="mt-5 flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                  aria-label={s.label}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Properties</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors duration-300 hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Resources</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {FOOTER_AUTHORITY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors duration-300 hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold/70">Phone</span>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="mt-1 block text-base font-medium text-white transition-colors duration-300 hover:text-gold"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold/70">Email</span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-1 block text-base font-medium text-white transition-colors duration-300 hover:text-gold"
                >
                  {SITE.email}
                </a>
              </li>
              {SITE.offices.map((o) => (
                <li key={o.name}>
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold/70">{o.name}</span>
                  <span className="mt-1 block text-white/65">{o.location}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {SITE.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/contact" className="transition-colors hover:text-gold">Contact</Link>
            <Link href="/foreign-ownership-guide" className="transition-colors hover:text-gold">Foreign Ownership</Link>
            <Link href="/insights" className="transition-colors hover:text-gold">Insights</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
