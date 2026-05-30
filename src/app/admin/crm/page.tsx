import type { Metadata } from "next";
import { EcosystemPageShell } from "@/components/ecosystem/EcosystemPageShell";
import { CrmDashboard } from "@/components/ecosystem/CrmDashboard";

export const metadata: Metadata = {
  title: "Investor CRM",
  description: "Internal investor CRM — track leads, scoring, funnel stages, and agent assignments.",
  robots: { index: false, follow: false },
};

export default function AdminCrmPage() {
  return (
    <EcosystemPageShell
      eyebrow="Module 1 · Investor CRM"
      title="Investor pipeline dashboard"
      description="Track investors, buyers, developers, renters, and tourists — with lead scoring, priority routing, and follow-up workflows."
    >
      <CrmDashboard />
    </EcosystemPageShell>
  );
}
