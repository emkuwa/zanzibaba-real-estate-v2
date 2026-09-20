"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE, NAV_LINKS, whatsappUrl } from "@/data/site";
import { BrandLogo } from "@/components/ui/BrandLogo";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-1.74-.87-2.88-1.55-4.03-3.52-.3-.52.3-.48.87-1.61.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-2.72 2.98 1.98 7.39 2.35 7.89 2.83 3.77 6.88 4.99 8.55 3.49.57-.51.75-1.26.82-1.7.08-.45.08-.83-.02-1.01-.1-.18-.28-.27-.58-.42M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.17 6.44 6.6 2.01 12.05 2.01a9.82 9.82 0 0 1 9.88 9.89c0 5.45-4.44 9.89-9.88 9.89M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.23-6.16-3.48-8.41" /></svg>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-[#dedbd3] bg-[#fbfaf6]/95 backdrop-blur-md">
    <nav className="mx-auto grid h-[82px] max-w-7xl grid-cols-[44px_1fr_44px] items-center px-4 md:flex md:h-[88px] md:justify-between md:px-8" aria-label="Main navigation">
      <button type="button" onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-start text-[#102f2c] md:hidden" aria-label="Toggle menu" aria-expanded={open}><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth="1.6" d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg></button>
      <Link href="/" aria-label={`${SITE.name} home`} className="justify-self-center md:justify-self-auto"><BrandLogo variant="primary" height={58} className="h-[50px] w-auto md:h-[58px]" /></Link>
      <ul className="hidden items-center gap-7 md:flex">{NAV_LINKS.slice(0, 4).map((link) => <li key={link.href}><Link href={link.href} className="text-[13px] font-medium text-[#183a36] hover:text-[#a47c3c]">{link.label}</Link></li>)}</ul>
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center justify-self-end rounded-[4px] bg-[#078b72] text-white md:h-10 md:w-10" aria-label="WhatsApp an advisor"><WhatsAppIcon className="h-5 w-5" /></a>
    </nav>
    {open && <div className="border-t border-[#dedbd3] bg-[#fbfaf6] px-5 py-5 md:hidden">{NAV_LINKS.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-[#e7e2d8] py-3 font-serif text-xl text-[#123a35]">{link.label}</Link>)}<a href={whatsappUrl()} className="mt-5 flex items-center justify-center gap-2 bg-[#073f37] px-5 py-3.5 text-xs font-semibold uppercase tracking-[.12em] text-white"><WhatsAppIcon className="h-4 w-4" /> WhatsApp an advisor</a></div>}
  </header>;
}
