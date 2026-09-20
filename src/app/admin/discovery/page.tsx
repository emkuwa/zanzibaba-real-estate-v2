import type { Metadata } from "next";
import { EcosystemPageShell } from "@/components/ecosystem/EcosystemPageShell";
import { DiscoveryDashboard } from "@/components/ecosystem/DiscoveryDashboard";

export const metadata: Metadata = {
  title: "Hotel Discovery",
  description: "Discover Zanzibar hotels from public sources, review, and import approved partners.",
  robots: { index: false, follow: false },
};

export default function AdminDiscoveryPage() {
  return (
    <EcosystemPageShell
      eyebrow="Module · Hotel Discovery"
      title="Hotel Discovery & Import"
      description="Search by area, review results, approve, and import to Partner Hotels."
    >
      <DiscoveryDashboard />
    </EcosystemPageShell>
  );
}
