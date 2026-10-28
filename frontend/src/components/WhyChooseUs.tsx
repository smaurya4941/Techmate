'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FadeIn, StaggerGroup, StaggerItem, HoverCard } from '@/components/animations/MotionWrapper';
import { motion } from 'framer-motion';

export function WhyChooseUs() {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(1); // Card 2 active by default as shown in Screenshot 2

  const points = [
    {
      id: 0,
      title: 'Exploration and Investigation',
      description:
        "We start by arranging an introductory discussion to grasp your company's objectives, site dimensions, and workflow obstacles.",
      icon: (
        <svg
          className="w-7 h-7 text-lime-400 group-hover:text-blue-300 transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <circle cx="11" cy="11" r="3" />
          <path d="M11 6a5 5 0 0 0-5 5" />
        </svg>
      ),
    },
    {
      id: 1,
      title: 'Modern use of Technology',
      description:
        'High-precision fiber laser cutting and argon TIG welding on food-grade AISI 304 stainless steel ensuring seamless joints and sanitary coved corners.',
      icon: (
        <svg
          className="w-7 h-7 transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v2m0 16v2m-8-10H2m20 0h-2m-3.05-6.95l-1.41 1.41M6.46 17.54l-1.41 1.41m0-12.02l1.41 1.41m11.08 11.08l1.41 1.41" />
          <circle cx="12" cy="12" r="5" />
          <path d="M12 9v3l2 2" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Expert data analysts',
      description:
        'Factory-trained engineers supervise on-site equipment commissioning, conduct electrical load testing, and train kitchen staff on recipe programming.',
      icon: (
        <svg
          className="w-7 h-7 text-lime-400 group-hover:text-blue-300 transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <circle cx="19" cy="11" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#08090a] px-6 sm:px-8 relative overflow-hidden" id="why-us">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Arched Image Mask with Overlapping Geometric Accents (Fade In Left) */}
          <div className="lg:col-span-6 flex justify-center relative">
            <FadeIn direction="left" distance={40}>
              <div className="relative">
                {/* Top-Left Dark Grey Ring Accent */}
                <div className="absolute -top-10 -left-6 sm:left-4 w-36 h-36 rounded-full border-[22px] border-[#252830] -z-0 pointer-events-none opacity-80" />

                {/* Top Apex Triangle Accent */}
                <div className="absolute -top-4 left-1/3 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-lime-400 sm:border-t-[#bbf246] -z-0 pointer-events-none drop-shadow-md" />

                {/* Arch-Mask Container with Photographic Portrait */}
                <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto arch-mask overflow-hidden border border-white/10 shadow-2xl bg-[#11141c] aspect-[3/4] group">
                  <Image
                    src="/images/why-choose-arch.jpg"
                    alt="Techmate Project Engineers and Executive Consultants"
                    fill
                    priority
                    className="object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Pill Badge, Bold Headline, and 3 Stacked Cards (Staggered Entrance) */}
          <div className="lg:col-span-6 space-y-8">
            <FadeIn direction="up">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#181d28] text-[11px] font-bold tracking-widest text-gray-300 uppercase border border-white/10 mb-5">
                  WHY CHOOSE US
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] font-heading">
                  Creating <span className="text-lime-400 sm:text-blue-400 font-extrabold">strong</span> new<br />
                  ventures in market
                </h2>
              </div>
            </FadeIn>

            {/* 3 Horizontal Cards Stack with Stagger */}
            <StaggerGroup className="space-y-4" staggerDelay={0.12}>
              {points.map((card) => {
                const isActive = activeCardIndex === card.id;

                return (
                  <StaggerItem key={card.id}>
                    <HoverCard yOffset={-4} scale={1.01}>
                      <div
                        onClick={() => setActiveCardIndex(card.id)}
                        onMouseEnter={() => setActiveCardIndex(card.id)}
                        className={`p-6 sm:p-7 rounded-[26px] transition-all duration-300 cursor-pointer group flex flex-col md:flex-row md:items-center gap-5 sm:gap-6 border ${
                          isActive
                            ? 'bg-[#141822] border-blue-500/30 shadow-xl shadow-blue-950/30'
                            : 'bg-[#11131a] border-white/5 hover:border-white/15'
                        }`}
                      >
                        {/* Left Part: Circular Icon Badge + Title */}
                        <div className="flex items-center gap-4 w-full md:w-[48%] shrink-0">
                          <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all ${
                              isActive
                                ? 'bg-lime-400 sm:bg-[#174A83] text-black sm:text-white shadow-lg'
                                : 'bg-[#181d28] border border-white/10 text-gray-300'
                            }`}
                          >
                            {card.icon}
                          </div>

                          <h3
                            className={`text-base sm:text-lg font-bold font-heading leading-snug transition-colors ${
                              isActive
                                ? 'text-white'
                                : 'text-white group-hover:text-blue-300'
                            }`}
                          >
                            {card.title}
                          </h3>
                        </div>

                        {/* Right Part: Description Text */}
                        <div className="w-full md:w-[52%]">
                          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                            {card.description}
                          </p>
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
