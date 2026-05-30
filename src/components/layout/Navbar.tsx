"use client";

import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/data/site";
import { BRAND_LOGO } from "@/data/brand";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn, scrollToId } from "@/lib/utils";
import Link from "next/link";

const NAVBAR_LOGO_HEIGHT = BRAND_LOGO.sizes.navbarDesktop;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border/60 bg-white/95 shadow-md backdrop-blur-md"
          : "bg-gradient-to-b from-navy-deep/90 via-navy-deep/50 to-transparent"
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 lg:py-3.5"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="relative inline-flex h-11 w-[11rem] shrink-0 items-center sm:h-12 sm:w-[12rem] md:h-[3.25rem] md:w-[13.5rem]"
          aria-label={BRAND_LOGO.alt}
        >
          <BrandLogo
            variant="reverse"
            height={NAVBAR_LOGO_HEIGHT}
            visible={!scrolled}
            className="absolute left-0 top-1/2 h-full w-auto max-w-none -translate-y-1/2"
          />
          <BrandLogo
            variant="primary"
            height={NAVBAR_LOGO_HEIGHT}
            visible={scrolled}
            className="absolute left-0 top-1/2 h-full w-auto max-w-none -translate-y-1/2"
          />
        </Link>

        <ul className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              {link.href.startsWith("/#") ? (
                <button
                  type="button"
                  onClick={() => scrollToId(link.href.replace("/#", ""))}
                  className={cn(
                    "text-sm font-medium transition hover:text-gold",
                    scrolled ? "text-navy" : "text-white/90"
                  )}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition hover:text-gold",
                    scrolled ? "text-navy" : "text-white/90"
                  )}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button
            variant={scrolled ? "gold" : "secondary"}
            size="sm"
            onClick={() => scrollToId("qualify")}
          >
            AI Concierge
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "min-h-[44px] min-w-[44px] rounded-luxury p-2.5 lg:hidden",
            scrolled ? "text-navy" : "text-white"
          )}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-navy-deep px-4 py-4 lg:hidden">
          <div className="mb-4 border-b border-white/10 pb-4">
            <BrandLogo
              variant="reverse"
              height={BRAND_LOGO.sizes.mobileMenu}
              className="h-10 w-auto"
            />
          </div>
          {NAV_LINKS.map((link) =>
            link.href.startsWith("/#") ? (
              <button
                key={link.href}
                type="button"
                onClick={() => {
                  scrollToId(link.href.replace("/#", ""));
                  setOpen(false);
                }}
                className="block w-full py-3.5 text-left text-[16px] text-white/90 hover:text-gold"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block w-full py-3.5 text-left text-[16px] text-white/90 hover:text-gold"
              >
                {link.label}
              </Link>
            )
          )}
          <Button
            variant="gold"
            size="sm"
            className="mt-2 w-full"
            onClick={() => {
              scrollToId("qualify");
              setOpen(false);
            }}
          >
            Get Matched
          </Button>
        </div>
      )}
    </header>
  );
}
