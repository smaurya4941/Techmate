import React, { Suspense } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MetricsTicker } from '@/components/MetricsTicker';
import { EquipmentGrid } from '@/components/EquipmentGrid';
import { AboutFactoryBanner } from '@/components/AboutFactoryBanner';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { CaseStudiesCarousel } from '@/components/CaseStudiesCarousel';
import { SplitCtaBanner } from '@/components/SplitCtaBanner';
import { MarqueeTicker } from '@/components/MarqueeTicker';
import { ProcessSteps } from '@/components/ProcessSteps';
import { Testimonials } from '@/components/Testimonials';
import { TechnicalInsights } from '@/components/TechnicalInsights';
import { QuoteForm } from '@/components/QuoteForm';
import { Footer } from '@/components/Footer';
import { MobileStickyBar } from '@/components/MobileStickyBar';
import { FloatingRightSidebar } from '@/components/FloatingRightSidebar';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { getApiHealth } from '@/lib/api';

export const revalidate = 60; // ISR revalidation every 60s

export default async function Home() {
  // Gracefully fetch backend health to verify system status without blocking the UI
  let apiStatus: 'online' | 'offline' = 'offline';
  try {
    const health = await getApiHealth();
    if (health.isOnline) {
      apiStatus = 'online';
    }
  } catch {
    apiStatus = 'offline';
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d14] text-gray-200 antialiased selection:bg-[#D62836] selection:text-white relative">
      {/* 1. Header with Top Utility Bar & Official Techmate Brand Logo */}
      <Header apiHealthStatus={apiStatus} />

      <main className="flex-1 w-full">
        {/* 2. Hero Section (Screenshot 1: Full-Bleed Executive Background & Frosted CTA) */}
        <Hero />

        {/* 3. Metrics Section (Screenshot 2: Consultation Ribbon & High-Impact Stat Banner) */}
        <MetricsTicker />

        {/* 4. Company Services Section (Screenshot 2 & 3: 2x2 Grid with Active Highlight Card) */}
        <EquipmentGrid />

        {/* 5. About Techmate 65,000 sq.ft. Plant & Engineering Showcase */}
        <AboutFactoryBanner />

        {/* 6. Why Choose Techmate (Arched Mask & 3 Engineering Pillars) */}
        <WhyChooseUs />

        {/* 7. Case Studies Carousel with Bottom Hover Text Animation (Screenshot 1) */}
        <CaseStudiesCarousel />

        {/* 8. Split CTA Banner: Empowering Smarter Decisions & Contact Us (Screenshot 2) */}
        <SplitCtaBanner />

        {/* 8. Industrial Statement & Specifications Infinite Marquee */}
        <MarqueeTicker />

        {/* 9. Turnkey Engineering & Delivery Process (01, 02, 03) */}
        <ProcessSteps />

        {/* 10. Executive Chef & Facility Director Testimonials */}
        <Testimonials />

        {/* 11. Technical Insights & Featured Articles */}
        <TechnicalInsights />

        {/* 12. Direct Factory Desk & Appointment Form (Underline Inputs & Glowing Border) */}
        <QuoteForm />
      </main>

      {/* 13. Pre-Footer Banner & 4-Column Deep Navy Corporate Footer */}
      <Footer />

      {/* Floating Right Sidebar (from Screenshots 1, 2, 3) */}
      <FloatingRightSidebar />

      {/* Circular Scroll-to-Top Button (from Screenshots 2, 3) */}
      <ScrollToTopButton />

      {/* Mobile Sticky Call & Quote Bar (Hidden on Desktop) */}
      <MobileStickyBar />
    </div>
  );
}
