"use client";

import Image from "next/image";
import trustMetrics from "@/data/trust-metrics.json";
import { VISUAL_SYSTEM } from "@/data/visual-system";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LuxuryImage } from "@/components/ui/LuxuryImage";
import { TestimonialCarousel } from "@/components/funnel/TestimonialCarousel";
import { SITE, whatsappUrl } from "@/data/site";

const CAPABILITIES = [
  {
    value: "01",
    label: "Property Sourcing",
    body: "We search our network of agents, developers, and off-market opportunities to find properties matching your requirements.",
  },
  {
    value: "02",
    label: "Due Diligence",
    body: "Title review, legal guidance, and verification support with established local professionals.",
  },
  {
    value: "03",
    label: "Site Visits",
    body: "In-person and virtual viewings with local observation and honest area assessments.",
  },
  {
    value: "04",
    label: "Acquisition Support",
    body: "From negotiation guidance through completion coordination and handover — we remain involved throughout.",
  },
];

export function TrustSection() {
  return (
    <>
      <Section id="trust" className="bg-sand-light/30">
        <SectionHeader
          eyebrow="Your Property Partner"
          title="Your Property Partner on the Ground in Zanzibar"
          description="Direct, local advisory for international buyers — from property sourcing and site visits to due diligence coordination and acquisition support."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.label}
              className="luxury-card p-5 transition-all hover:shadow-premium"
            >
              <p className="font-serif text-2xl font-semibold text-gold">{cap.value}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-navy-heading">
                {cap.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{cap.body}</p>
            </div>
          ))}
        </div>

        {/* Founder Section */}
        <div className="mt-14 border-t border-border/60 pt-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                  Meet Your Advisor
                </p>
                <h3 className="mt-3 font-serif text-2xl font-semibold text-navy-heading sm:text-3xl">
                  {trustMetrics.founder.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{trustMetrics.founder.role}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                {trustMetrics.founder.bio}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsappUrl(
                    `Hello Emmanuel, I'm interested in property in Zanzibar.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#20b858]"
                >
                  WhatsApp Emmanuel
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-sm border border-navy px-6 py-3 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
                >
                  Book a Private Consultation
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-80 w-full max-w-md overflow-hidden rounded-luxury-lg lg:h-96">
                {trustMetrics.founder.photo ? (
                  <Image
                    src={trustMetrics.founder.photo}
                    alt={trustMetrics.founder.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <LuxuryImage
                    asset={VISUAL_SYSTEM.lifestyle.investors}
                    overlay="minimal"
                    animate={false}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-14 border-t border-border/60 pt-14">
          <h3 className="mb-5 text-center font-serif text-2xl font-semibold text-navy-heading">
            What our clients say
          </h3>
          <TestimonialCarousel />
        </div>
      </Section>
    </>
  );
}
