"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/funnel/HeroSection";
import { HeroTrustBar } from "@/components/funnel/HeroTrustBar";
import { InvestmentAreasSection } from "@/components/funnel/InvestmentAreasSection";
import { WhyInvestSection } from "@/components/funnel/WhyInvestSection";
import { QualificationFunnel } from "@/components/funnel/QualificationFunnel";
import { TrustSection } from "@/components/funnel/TrustSection";
import { FaqSection } from "@/components/funnel/FaqSection";
import { StickyWhatsApp } from "@/components/conversion/StickyWhatsApp";
import { ExitIntentPopup } from "@/components/conversion/ExitIntentPopup";
import { LeadMagnetPopup } from "@/components/conversion/LeadMagnetPopup";
import { AIChatbot } from "@/components/chat/AIChatbot";
import { FeaturedOpportunitiesSection } from "./funnel/FeaturedOpportunitiesSection";

export default function HomePageClient() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        {/* 1. Hero */}
        <HeroSection />
        
        {/* 2. Trust Bar */}
        <HeroTrustBar />
        
        {/* 3. Featured Opportunities */}
        <FeaturedOpportunitiesSection />
        
        {/* 4. Investment Areas */}
        <InvestmentAreasSection />
        
        {/* 5. Why Invest in Zanzibar */}
        <WhyInvestSection />
        
        {/* 6. Investor Concierge */}
        <QualificationFunnel />
        
        {/* 8. Testimonials */}
        <TrustSection />
        
        {/* 9. FAQ */}
        <FaqSection />
      </main>
      <Footer />
      <StickyWhatsApp />
      <ExitIntentPopup />
      <LeadMagnetPopup />
      <AIChatbot />
    </>
  );
}
