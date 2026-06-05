"use client";

import Image from "next/image";
import trustMetrics from "@/data/trust-metrics.json";
import { VISUAL_SYSTEM } from "@/data/visual-system";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { TestimonialCarousel } from "@/components/funnel/TestimonialCarousel";
import { BOOK_CALL_URL, SITE, whatsappUrl } from "@/data/site";

export function TrustSection() {
  return (
    <>
      <Section id="trust">
        <SectionHeader
          eyebrow="Investor Confidence"
          title="Licensed advisory. Real people. Local offices."
          description="Permanent offices in Paje and Stone Town with a bilingual advisory team that closes with you — from first enquiry to keys."
        />

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <MotionReveal>
            <div className="luxury-card overflow-hidden p-0">
              <div className="relative h-40 md:h-44">
                <LuxuryImage
                  asset={VISUAL_SYSTEM.lifestyle.investors}
                  overlay="minimal"
                  animate={false}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="font-serif text-[1.375rem] font-semibold text-navy md:text-2xl">
                  Local expertise, global standards
                </h3>
                <ul className="mt-4 space-y-3 md:space-y-3.5">
                  {[
                    "Title verification and due diligence coordination",
                    "Bilingual advisory for international buyers",
                    "Offices in Paje and Stone Town",
                    "WhatsApp-first for global time zones",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-snug text-muted md:text-[14px]">
                      <span className="mt-0.5 shrink-0 text-gold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="luxury-card bg-sand-light/50">
              <h3 className="font-serif text-[1.375rem] font-semibold text-navy md:text-2xl">
                Visit our offices
              </h3>
              <div className="mt-4 aspect-video overflow-hidden rounded-luxury bg-navy/5 md:mt-5">
                <iframe
                  title="Zanzibar map — Zanzibaba Real Estate offices"
                  src="https://maps.google.com/maps?q=Paje+Zanzibar&t=&z=11&ie=UTF8&iwloc=&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-3 text-[14px] text-muted">
                East Coast Office — Paje · Town Office — Stone Town
              </p>
            </div>
          </MotionReveal>
        </div>

        <div className="mt-10 md:mt-14">
          <h3 className="mb-2 text-center font-serif text-[1.375rem] font-semibold text-navy md:mb-3 md:text-2xl">
            Work directly with the founder
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-center text-[14px] text-muted md:mb-8">
            Founder-led advisory. Every investor conversation is with the person who built the
            business.
          </p>

          <article className="luxury-card mx-auto flex max-w-3xl flex-col overflow-hidden p-0 md:flex-row">
            <div className="relative flex w-full shrink-0 items-center justify-center bg-surface p-8 sm:p-10 md:h-auto md:min-h-[28rem] md:w-64 md:p-6 lg:w-72">
              {trustMetrics.founder.photo ? (
                <div className="relative h-80 w-80 shrink-0 overflow-hidden rounded-full ring-[4px] ring-gold/60 shadow-luxury sm:h-96 sm:w-96 md:h-64 md:w-64 md:ring-2 lg:h-72 lg:w-72">
                  <Image
                    src={trustMetrics.founder.photo}
                    alt={trustMetrics.founder.name}
                    fill
                    sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 256px, 288px"
                    className="object-cover object-[center_30%]"
                    priority
                  />
                </div>
              ) : (
                <div className="flex h-80 w-80 shrink-0 flex-col items-center justify-center rounded-full bg-sand-light/10 px-6 text-center ring-[4px] ring-gold/40 sm:h-96 sm:w-96 md:h-64 md:w-64 md:ring-2 lg:h-72 lg:w-72">
                  <div className="flex h-20 w-20 items-center justify-center rounded-luxury border-2 border-gold/40 bg-gold/10 text-gold">
                    <svg
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold/80">
                    Founder
                  </p>
                  <p className="mt-1 font-serif text-base font-semibold text-white">
                    {trustMetrics.founder.location}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                  {trustMetrics.founder.role}
                </p>
                <h4 className="mt-1.5 font-serif text-[1.625rem] font-semibold leading-tight text-navy-heading md:text-2xl">
                  {trustMetrics.founder.name}
                </h4>
                <p className="mt-1 text-[14px] font-medium text-navy-heading">
                  {trustMetrics.founder.company}
                </p>
                <p className="mt-0.5 text-[13px] text-muted">
                  {trustMetrics.founder.location}
                </p>
              </div>

              <p className="mt-5 text-[15px] leading-[1.7] text-body">
                {trustMetrics.founder.bio}
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <a
                  href={whatsappUrl(
                    `Hello Emmanuel, I'd like to speak with you about Zanzibar property investment.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#1ebe57]"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M17.472 14.382a.68.68 0 0 1-.33.22c-.27.09-.57.14-.86.14-.78 0-1.46-.3-2.05-.66-.96-.58-2.031-1.58-3.171-2.72-1.14-1.14-2.14-2.21-2.72-3.17-.36-.59-.66-1.27-.66-2.05 0-.29.05-.59.14-.86a.68.68 0 0 1 .22-.33c.15-.16.34-.24.54-.24h.74c.2 0 .4.09.51.25.27.4.65 1.12.89 1.68a.48.48 0 0 1-.07.49c-.12.16-.27.35-.42.51l-.28.28c.22.58.7 1.19 1.24 1.73s1.15 1.02 1.73 1.24l.28-.28c.16-.15.35-.3.51-.42a.48.48 0 0 1 .49-.07c.56.24 1.28.62 1.68.89.16.11.25.31.25.51v.74c0 .2-.08.39-.24.54z" />
                    <path d="M12.004 1.998c-5.514 0-10 4.486-10 10 0 1.878.52 3.633 1.412 5.132l-1.404 4.686 4.87-1.402a9.95 9.95 0 0 0 5.122 1.584c5.514 0 10-4.486 10-10s-4.486-10-10-10zm0 18.367a8.35 8.35 0 0 1-4.272-1.18l-.306-.183-3.003.866.877-2.936-.2-.321a8.353 8.353 0 0 1-1.294-4.596c0-4.63 3.767-8.397 8.397-8.397s8.397 3.767 8.397 8.397-3.767 8.397-8.397 8.397z" />
                  </svg>
                  WhatsApp Emmanuel
                </a>
                <a
                  href={BOOK_CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-gold-light"
                >
                  Book Consultation
                </a>
                {trustMetrics.founder.linkedin && (
                  <a
                    href={trustMetrics.founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy-heading px-5 py-2.5 text-[14px] font-semibold text-navy-heading transition hover:bg-navy-heading hover:text-white"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>

              <p className="mt-5 border-t border-border/60 pt-4 text-[12px] text-muted">
                Direct line:{" "}
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="font-medium text-navy-heading hover:text-gold"
                >
                  {SITE.phone}
                </a>
                {" · "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-medium text-navy-heading hover:text-gold"
                >
                  {SITE.email}
                </a>
              </p>
            </div>
          </article>
        </div>

        <div className="mt-10 md:mt-14">
          <h3 className="mb-4 text-center font-serif text-[1.375rem] font-semibold text-navy md:mb-5 md:text-2xl">
            What our clients say
          </h3>
          <TestimonialCarousel />
        </div>
      </Section>
    </>
  );
}
