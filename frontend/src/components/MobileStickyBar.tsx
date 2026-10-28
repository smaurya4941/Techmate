'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Send, FileText } from 'lucide-react';

export function MobileStickyBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#102B46]/95 backdrop-blur-md border-t border-white/15 px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
      <a
        href="tel:+918008324628"
        className="flex-1 py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/15 transition active:scale-95"
      >
        <Phone className="w-3.5 h-3.5 text-[#D62836]" />
        <span>Call Factory</span>
      </a>

      <Link
        href="#quote-form"
        className="flex-1 py-2.5 px-3 rounded-lg bg-[#D62836] hover:bg-[#b81d29] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#D62836]/30 transition active:scale-95"
      >
        <FileText className="w-3.5 h-3.5" />
        <span>Quick Quote</span>
      </Link>
    </div>
  );
}
