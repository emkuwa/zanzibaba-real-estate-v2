"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/funnel/HeroSection";
import { QualificationFunnel } from "@/components/funnel/QualificationFunnel";
import { EditorialAreas, FeaturedEditorial, FinalEditorialCta, PartnerAndAdvisor, PropertyCollections } from "@/components/funnel/EditorialSections";

export default function HomePageClient() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-[#fbfaf6]">
        <HeroSection />
        <FeaturedEditorial />
        <PropertyCollections />
        <PartnerAndAdvisor />
        <QualificationFunnel />
        <EditorialAreas />
        <FinalEditorialCta />
      </main>
      <Footer />
    </>
  );
}
