import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export default function BrandsPage() {
  const brandLines = [
    {
      name: 'Techmate® Heavy Duty',
      category: 'Commercial Cooking Ranges & Sinks',
      desc: 'Our proprietary line of heavy-gauge stainless steel gas & electric cooking ranges, stock pot stoves, deep fryers, and fabrication tables.',
      badge: 'Proprietary OEM Brand',
    },
    {
      name: 'Techmate® Bake With Mate',
      category: 'Industrial Bakery Machinery',
      desc: 'Precision bakery dough mixers, spiral kneaders, planetary mixers, and diesel/gas rotary rack baking ovens built for 24/7 baking throughput.',
      badge: 'Core Brand Trademark',
    },
    {
      name: 'Techmate® ColdPro',
      category: 'Commercial Refrigeration & Cold Rooms',
      desc: 'Tropicalized stainless reach-in chillers, sub-zero blast freezers, undercounter prep counters, and modular insulated cold rooms.',
      badge: 'Refrigeration Division',
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F3F6FA]/50 py-8">
        <PageContainer>
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Brand Lines & Equipment Divisions' }]} />
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 mb-10 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#174A83] block mb-2 font-mono">
              MANUFACTURING &amp; DISTRIBUTION DIVISIONS
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#102B46] font-heading">
              Our Equipment Brand Lines
            </h1>
            <p className="mt-3 text-sm text-[#344054] max-w-2xl leading-relaxed">
              Techmate Industries designs, manufactures, and supports specialized commercial food-service equipment divisions engineered for demanding commercial kitchens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {brandLines.map((b, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D62836] bg-[#D62836]/10 px-2.5 py-1 rounded-full">
                      {b.badge}
                    </span>
                    <Award className="w-5 h-5 text-[#174A83]" />
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[#102B46] mb-1">
                    {b.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#174A83] mb-3">
                    {b.category}
                  </div>
                  <p className="text-xs text-[#344054] leading-relaxed mb-6">
                    {b.desc}
                  </p>
                </div>

                <Link
                  href="/products"
                  className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#F3F6FA] hover:bg-[#174A83] hover:text-white text-[#174A83] text-xs font-bold transition"
                >
                  <span>Explore Division Models</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Component Engineering Standards */}
          <div className="bg-[#102B46] text-white rounded-3xl p-8 sm:p-12">
            <h2 className="text-xl sm:text-2xl font-bold font-heading mb-3">
              Built with Global Component Standards
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed mb-6">
              Our machines incorporate globally recognized industrial components including Schneider Electric contactors, Omron digital temperature controllers, and Danfoss / Embraco tropicalized refrigeration compressors.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-gray-200">
              <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Schneider Electric Switchgear</span>
              </div>
              <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Embraco / Danfoss Compressors</span>
              </div>
              <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AISI 304 Food-Grade Steel</span>
              </div>
              <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ISO 9001:2015 Certification</span>
              </div>
            </div>
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
