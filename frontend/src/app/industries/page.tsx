import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import {
  Building2,
  Coffee,
  Wheat,
  UtensilsCrossed,
  Factory,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function IndustriesPage() {
  const industries = [
    {
      title: 'Hotels & Luxury Resorts',
      icon: <Building2 className="w-8 h-8 text-[#174A83]" />,
      desc: 'High-volume banquet cooking ranges, combi ovens, dishwashing flight conveyors, and custom walk-in cold rooms engineered for multi-outlet properties.',
      featuredEquipment: ['TM-Pro 10GN Combi Ovens', '6-Burner Ranges', 'Flight Dishwashers', 'Cold Rooms'],
    },
    {
      title: 'Commercial Bakeries & Patisseries',
      icon: <Wheat className="w-8 h-8 text-[#174A83]" />,
      desc: 'Precision dough processing equipment including dual-speed spiral kneaders, planetary mixers, proofer chambers, and diesel/gas rotary rack ovens.',
      featuredEquipment: ['Spiral Kneaders (60-120kg)', 'Planetary Mixers', 'Rotary Rack Ovens', 'Dough Dividers'],
    },
    {
      title: 'Fine Dining & QSR Chains',
      icon: <UtensilsCrossed className="w-8 h-8 text-[#174A83]" />,
      desc: 'Ergonomic cooking suites, induction cooktops, deep-drawn chip scuttles, high-recovery fryers, and undercounter refrigeration units.',
      featuredEquipment: ['Modular Cooking Suites', 'Double Well Fryers', 'Undercounter Chillers', 'Bain-Maries'],
    },
    {
      title: 'Cloud Kitchens & Delivery Hubs',
      icon: <Coffee className="w-8 h-8 text-[#174A83]" />,
      desc: 'Compact high-efficiency equipment layouts designed for fast cycle times, multi-brand prep lines, and rigorous hygiene compliance.',
      featuredEquipment: ['Touch Combi Steamers', 'Stainless Prep Tables', 'Rapid Blast Freezers', 'Ventless Hoods'],
    },
    {
      title: 'Institutional & Hospital Catering',
      icon: <Factory className="w-8 h-8 text-[#174A83]" />,
      desc: 'Heavy-gauge steam-jacketed boiling pans, tilting bratt pans, bulk rice washers, and thermal food transport trolleys for continuous service.',
      featuredEquipment: ['Steam Jacketed Kettles', 'Tilting Bratt Pans', 'Thermal Banquet Carts', 'Bulk Peelers'],
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer>
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Industries & Solutions' }]} />
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 mb-10 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#174A83] block mb-2 font-mono">
              TARGET SECTORS &amp; APPLICATIONS
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#102B46] font-heading">
              Industries We Serve
            </h1>
            <p className="mt-3 text-sm text-[#344054] max-w-2xl leading-relaxed">
              Tailored food-service machinery configurations engineered to withstand the thermal, hygienic, and volume demands of diverse commercial hospitality operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {industries.map((ind, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F3F6FA] flex items-center justify-center mb-5">
                    {ind.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#102B46] mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-[#344054] leading-relaxed mb-5">
                    {ind.desc}
                  </p>

                  <div className="space-y-1.5 border-t border-gray-100 pt-4 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                      Commonly Specified Machinery:
                    </span>
                    {ind.featuredEquipment.map((eq, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-[#174A83] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/request-quote"
                  className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#F3F6FA] hover:bg-[#174A83] hover:text-white text-[#174A83] text-xs font-bold transition"
                >
                  <span>Request Sector Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            ))}
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
