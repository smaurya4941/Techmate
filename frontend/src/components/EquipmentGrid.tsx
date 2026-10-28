'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem, HoverCard } from '@/components/animations/MotionWrapper';
import { motion } from 'framer-motion';

export function EquipmentGrid() {
  const [activeCardId, setActiveCardId] = useState<number>(0);

  const services = [
    {
      id: 0,
      title: 'Commercial Cooking Ranges & Ovens',
      subtitle: 'Asset Allocation',
      description:
        'Our approach to cooking ranges focuses on precision thermal control, heavy-gauge AISI 304 fabrication, and maximum energy recovery across demanding 18-hour shifts.',
      href: '/products?category=cooking-ranges',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 1,
      title: 'Commercial Refrigeration & Chillers',
      subtitle: 'Risk Management',
      description:
        'Tropicalized reach-in chillers, sub-zero blast freezers, and modular cold rooms engineered for reliable performance in +43°C high-humidity environments.',
      href: '/products?category=commercial-refrigeration',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Bakery & Dough Processing Machinery',
      subtitle: 'Portfolio Management',
      description:
        'High-capacity spiral kneaders, planetary mixers, rotary rack ovens, and automated dough dividers engineered for continuous artisan baking throughput.',
      href: '/products?category=bakery-machinery',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Custom AISI 304 Stainless Fabrication',
      subtitle: 'Financial Reporting',
      description:
        'CNC laser-cut stainless prep tables, deep-drawn sinks, and high-velocity exhaust hoods with grease filters for strict commercial hygiene compliance.',
      href: '/products?category=stainless-steel-prep',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative z-20 -mt-6 rounded-t-[44px] bg-[#08090a] pt-24 pb-28 px-6 sm:px-8 border-t border-white/10" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading and "See All services" button (Fade In Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
            <FadeIn direction="left">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#1b1e24] text-xs font-semibold tracking-wider text-gray-300 uppercase mb-6 border border-white/10">
                  COMPANY SERVICES
                </span>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-8 font-heading">
                  Provide <span className="text-[#174A83] sm:text-blue-400">Services</span><br />
                  To Support New<br />
                  Startups
                </h2>

                <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                  Giving consultancy for every commercial kitchen requirement, equipment sizing, layout drawing, and lifecycle maintenance for your establishment.
                </p>
              </div>

              {/* "See All services" CTA */}
              <div className="pt-8">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Link
                    href="/products"
                    className="inline-flex items-center px-8 py-3.5 rounded-xl bg-[#22242a] hover:bg-[#2b2e36] text-white font-semibold text-sm transition-all border border-white/5 shadow-lg"
                  >
                    See All services
                  </Link>
                </motion.div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: 2x2 Services Cards Grid (Staggered Entrance) */}
          <div className="lg:col-span-7">
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.1}>
              {services.map((item) => {
                const isActive = activeCardId === item.id;
                return (
                  <StaggerItem key={item.id}>
                    <HoverCard yOffset={-6} scale={1.015}>
                      <div
                        onClick={() => setActiveCardId(item.id)}
                        onMouseEnter={() => setActiveCardId(item.id)}
                        className={`p-8 rounded-[28px] transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-xl relative overflow-hidden h-full min-h-[320px] ${
                          isActive
                            ? 'bg-[#174A83] text-white border-2 border-blue-400 shadow-blue-900/40'
                            : 'bg-[#111215] border border-white/5 hover:border-white/20 text-gray-300'
                        }`}
                      >
                        <div>
                          <h3
                            className={`text-xl font-bold mb-3 font-heading transition-colors ${
                              isActive ? 'text-white' : 'text-white group-hover:text-blue-300'
                            }`}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={`text-xs sm:text-sm leading-relaxed mb-8 ${
                              isActive ? 'text-blue-100' : 'text-gray-400'
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <Link
                            href={item.href}
                            className={`inline-flex items-center text-sm font-semibold transition-colors ${
                              isActive ? 'text-white hover:underline' : 'text-white group-hover:text-blue-400'
                            }`}
                          >
                            <span>Read more</span>
                            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                          </Link>

                          {/* Outline SVG Icon */}
                          <div
                            className={`transition-colors ${
                              isActive ? 'text-white' : 'text-blue-400'
                            }`}
                          >
                            {item.icon}
                          </div>
                        </div>
                      </div>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>

        </div>
      </div>
    </section>
  );
}
