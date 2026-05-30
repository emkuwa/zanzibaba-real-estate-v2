import type { Metadata } from "next";
import Link from "next/link";
import { EcosystemPageShell } from "@/components/ecosystem/EcosystemPageShell";
import { RENTAL_EXPERIENCES } from "@/data/seo-content";
import { EXPAT_NOMAD_HUB } from "@/data/authority";

export const metadata: Metadata = {
  title: "Rentals & Relocation — Luxury Stays, Expats & Digital Nomads",
  description:
    "Long-term rentals, expat relocation, digital nomad accommodation, and luxury villa concierge in Zanzibar.",
};

export default function RentalsPage() {
  return (
    <EcosystemPageShell
      eyebrow="Rentals & Relocation"
      title="Live, work, and stay in Zanzibar"
      description="Luxury villa rentals, monthly beachfront stays, expat housing, and digital nomad relocation — coordinated by our concierge team."
    >
      <section className="mb-10">
        <h2 className="font-serif text-xl font-semibold text-navy-heading">Rental experiences</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {RENTAL_EXPERIENCES.map((r) => (
            <article key={r.slug} className="luxury-card p-5">
              <h3 className="font-serif text-lg font-semibold text-navy-heading">{r.title}</h3>
              <p className="mt-2 text-[14px] text-body">{r.description}</p>
              <Link href="/#qualify" className="mt-3 inline-block text-[14px] font-semibold text-gold hover:underline">
                {r.cta} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-xl font-semibold text-navy-heading">{EXPAT_NOMAD_HUB.title}</h2>
        <p className="mt-2 text-[15px] text-body">{EXPAT_NOMAD_HUB.intro}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXPAT_NOMAD_HUB.topics.map((t) => (
            <article key={t.title} className="luxury-card p-4">
              <h3 className="font-semibold text-navy-heading">{t.title}</h3>
              <p className="mt-1 text-[14px] text-body">{t.description}</p>
            </article>
          ))}
        </div>
      </section>
    </EcosystemPageShell>
  );
}
