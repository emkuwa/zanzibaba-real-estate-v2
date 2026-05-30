import type { Metadata } from "next";
import { EcosystemPageShell } from "@/components/ecosystem/EcosystemPageShell";
import { ECOSYSTEM_MODULES, INTERNAL_AGENTS } from "@/ecosystem";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zanzibar Investment Ecosystem",
  description:
    "Nine integrated modules — investor CRM, developer portal, opportunity database, intelligence hub, AI concierge, and more.",
};

export default function EcosystemPage() {
  return (
    <EcosystemPageShell
      eyebrow="Platform Architecture"
      title="The Zanzibar Investment Ecosystem"
      description="A luxury investment platform combining real estate, tourism intelligence, developer partnerships, and AI-powered concierge — built for foreigners discovering Zanzibar."
    >
      <section className="mb-12">
        <h2 className="font-serif text-2xl font-semibold text-navy-heading">Core modules</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ECOSYSTEM_MODULES.map((mod) => (
            <Link
              key={mod.id}
              href={mod.href.startsWith("/#") ? `/${mod.href}` : mod.href}
              className="luxury-card block p-5 transition hover:shadow-premium"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
                Module {mod.number}
              </span>
              <h3 className="mt-1 font-serif text-lg font-semibold text-navy-heading">{mod.title}</h3>
              <p className="mt-2 text-[14px] text-body">{mod.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="agents">
        <h2 className="font-serif text-2xl font-semibold text-navy-heading">Internal agents</h2>
        <p className="mt-2 max-w-2xl text-[15px] text-body">
          Specialist teams route leads, publish intelligence, and deliver premium concierge service.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {INTERNAL_AGENTS.map((agent) => (
            <article key={agent.id} className="luxury-card p-5">
              <h3 className="font-serif text-lg font-semibold text-navy-heading">{agent.name}</h3>
              <p className="text-[14px] font-medium text-gold">{agent.role}</p>
              <ul className="mt-3 space-y-1.5">
                {agent.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2 text-[14px] text-body">
                    <span className="text-gold">·</span>
                    {r}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </EcosystemPageShell>
  );
}
