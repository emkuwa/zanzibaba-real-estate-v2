import type { Metadata } from "next";
import { EcosystemPageShell } from "@/components/ecosystem/EcosystemPageShell";
import { OutreachDashboard } from "@/components/ecosystem/OutreachDashboard";

export const metadata: Metadata = {
  title: "Hotel Outreach CRM",
  description: "Track outreach to Zanzibar hotels — Discovered → Contacted → Interested → Subscriber.",
  robots: { index: false, follow: false },
};

export default function AdminOutreachPage() {
  return (
    <EcosystemPageShell
      eyebrow="Module · Hotel Outreach"
      title="Hotel Outreach Pipeline"
      description="Move hotels through the outreach funnel: Discovered → Not Contacted → Contacted → Interested → Trial → Subscriber."
    >
      <OutreachDashboard />
    </EcosystemPageShell>
  );
}
