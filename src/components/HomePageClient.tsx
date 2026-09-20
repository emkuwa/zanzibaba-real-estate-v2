"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/funnel/HeroSection";
import { FeaturedOpportunitiesSection } from "@/components/funnel/FeaturedOpportunitiesSection";
import { InvestmentAreasSection } from "@/components/funnel/InvestmentAreasSection";
import { WhyInvestSection } from "@/components/funnel/WhyInvestSection";
import { QualificationFunnel } from "@/components/funnel/QualificationFunnel";
import { TrustSection } from "@/components/funnel/TrustSection";
import { FaqSection } from "@/components/funnel/FaqSection";
import { StickyWhatsApp } from "@/components/conversion/StickyWhatsApp";

export default function HomePageClient() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Featured Properties */}
        <FeaturedOpportunitiesSection />

        {/* 3. Trust + Founder */}
        <TrustSection />

        {/* 4. Smart Property Match */}
        <QualificationFunnel />

        {/* 5. Investment Areas */}
        <InvestmentAreasSection />

        {/* 6. Why Invest */}
        <WhyInvestSection />

        {/* 7. FAQ */}
        <FaqSection />
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  );
}
