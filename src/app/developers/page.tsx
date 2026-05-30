import type { Metadata } from "next";
import Link from "next/link";
import { EcosystemPageShell } from "@/components/ecosystem/EcosystemPageShell";
import {
  DEVELOPERS,
  DEVELOPER_PROJECTS,
} from "@/ecosystem/data/developers";
import { opportunityImagePath } from "@/lib/ecosystem/utils";

export const metadata: Metadata = {
  title: "Developer Portal — Verified Projects & ROI",
  description:
    "Verified Zanzibar developers, off-plan projects, ROI estimates, galleries, and investor fit matching.",
};

export default function DevelopersPage() {
  return (
    <EcosystemPageShell
      eyebrow="Developer Portal"
      title="Verified developers & investment projects"
      description="Developer profiles, project ROI, location intelligence, and investor fit — syndicated through the Zanzibaba ecosystem."
    >
      <div className="space-y-10">
        {DEVELOPERS.map((dev) => {
          const projects = DEVELOPER_PROJECTS.filter((p) => p.developerId === dev.id);
          return (
            <section key={dev.id} className="luxury-card overflow-hidden p-0">
              <div className="border-b border-border bg-surface p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-semibold uppercase text-gold">
                      {dev.verified ? "Verified developer" : "Developer"}
                    </span>
                    <h2 className="mt-2 font-serif text-[1.5rem] font-semibold text-navy-heading">
                      {dev.name}
                    </h2>
                    <p className="text-[14px] font-medium text-gold">{dev.tagline}</p>
                    <p className="mt-2 max-w-2xl text-[15px] text-body">{dev.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {dev.areas.map((a) => (
                      <span key={a} className="rounded-full border border-border px-2.5 py-1 text-[12px]">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid gap-4 p-5 md:grid-cols-2 md:p-6">
                {projects.map((proj) => (
                  <article key={proj.id} className="rounded-luxury border border-border/70 overflow-hidden">
                    <div className="relative h-36">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={opportunityImagePath(proj.gallery[0] ?? "villa-luxury")}
                        alt={proj.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[12px] uppercase tracking-wide text-gold">
                        {proj.type} · {proj.status}
                      </p>
                      <h3 className="font-serif text-lg font-semibold text-navy-heading">{proj.title}</h3>
                      <p className="mt-1 text-[14px] text-body line-clamp-2">{proj.description}</p>
                      <p className="mt-2 font-semibold text-navy-heading">From {proj.priceFrom}</p>
                      {proj.roiEstimate && (
                        <p className="text-[13px] text-gold">{proj.roiEstimate}</p>
                      )}
                      <Link href="/#qualify" className="mt-3 inline-block text-[14px] font-semibold text-gold hover:underline">
                        Request investor briefing →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </EcosystemPageShell>
  );
}
