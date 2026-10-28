'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Phone,
  Mail,
  Clock,
  Award,
  Lock,
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Activity,
  Layers,
} from 'lucide-react';
import { CATEGORIES_DATA } from '@/lib/products-data';

interface HeaderProps {
  apiHealthStatus?: 'online' | 'offline' | 'checking';
}

export function Header({ apiHealthStatus }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [equipmentDropdownOpen, setEquipmentDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setEquipmentDropdownOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEquipmentDropdownOpen(false);
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Catalogue', href: '/products' },
    { label: 'About Us', href: '/about' },
    { label: 'Industries', href: '/industries' },
    { label: 'Services', href: '/services' },
    { label: 'Support', href: '/support' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* 1. TOP UTILITY BAR (Deep Navy) */}
      <div className="bg-[#102B46] text-gray-200 text-xs py-2.5 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Contact Details */}
          <div className="flex items-center space-x-6">
            <a
              href="tel:+918008324628"
              className="flex items-center space-x-2 text-gray-200 hover:text-[#D62836] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D62836]" />
              <span className="font-semibold">+91 800-TECHMATE (832-4628)</span>
            </a>
            <a
              href="mailto:sales@techmateindustries.com"
              className="flex items-center space-x-2 text-gray-200 hover:text-[#D62836] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#D62836]" />
              <span>sales@techmateindustries.com</span>
            </a>
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>Mon - Sat: 8:30 AM - 7:00 PM IST</span>
            </div>
          </div>

          {/* Right Credential Badges & Portals */}
          <div className="flex items-center space-x-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#174A83]/60 text-blue-100 text-[11px] font-semibold border border-blue-400/30">
              <Award className="w-3 h-3 text-[#D62836]" /> ISO 9001:2015 Certified
            </span>

            {/* Backend health status badge */}
            {apiHealthStatus && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                  apiHealthStatus === 'online'
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-900/60 text-amber-300 border border-amber-500/30'
                }`}
                title={`REST API is ${apiHealthStatus}`}
              >
                <Activity className="w-2.5 h-2.5" /> API: {apiHealthStatus}
              </span>
            )}

            <Link
              href="/become-a-distributor"
              className="hover:text-white transition-colors flex items-center gap-1 font-medium text-xs text-gray-300 hover:underline"
            >
              <Lock className="w-3 h-3 text-gray-300" /> Dealer & OEM Portal
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-32 sm:w-36 flex items-center">
                <Image
                  src="/images/techmate-logo.png"
                  alt="Techmate Industries - Bake With Mate"
                  width={144}
                  height={48}
                  className="object-contain group-hover:scale-105 transition-transform"
                  priority
                />
              </div>
              <div className="hidden sm:block pl-2 border-l border-gray-200">
                <div className="text-[10px] tracking-widest text-[#174A83] font-extrabold uppercase leading-none">
                  COMMERCIAL EQUIPMENT
                </div>
                <div className="text-[9px] tracking-wider text-[#D62836] font-bold uppercase mt-1">
                  KITCHEN • BAKERY • COLD CHAIN
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 font-medium text-sm text-[#344054]">
              <Link
                href="/"
                className={`transition-colors py-2 ${
                  pathname === '/' ? 'text-[#174A83] font-bold' : 'hover:text-[#174A83]'
                }`}
              >
                Home
              </Link>

              {/* Equipment Dropdown */}
              <div
                ref={dropdownRef}
                className="relative py-2"
                onMouseEnter={() => setEquipmentDropdownOpen(true)}
                onMouseLeave={() => setEquipmentDropdownOpen(false)}
              >
                <Link
                  href="/products"
                  className={`hover:text-[#174A83] transition-colors flex items-center gap-1 font-medium ${
                    pathname?.startsWith('/products') ? 'text-[#174A83] font-bold' : ''
                  }`}
                  aria-expanded={equipmentDropdownOpen}
                >
                  Equipment
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                      equipmentDropdownOpen ? 'rotate-180 text-[#174A83]' : ''
                    }`}
                  />
                </Link>

                {equipmentDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 text-xs z-50">
                    <div className="px-4 py-2 border-b border-gray-100 text-[11px] font-bold uppercase text-[#174A83] tracking-wider flex items-center justify-between">
                      <span>Machinery Categories</span>
                      <Link
                        href="/products"
                        className="text-[#D62836] text-[10px] font-semibold hover:underline"
                      >
                        All Lines
                      </Link>
                    </div>
                    {CATEGORIES_DATA.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/products?category=${cat.slug}`}
                        className="block px-4 py-2.5 hover:bg-[#F3F6FA] hover:text-[#174A83] font-semibold text-[#344054] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-gray-400 font-normal">
                            {cat.itemCount} units
                          </span>
                        </div>
                      </Link>
                    ))}
                    <div className="px-4 pt-2 border-t border-gray-100 mt-2">
                      <Link
                        href="/products"
                        className="text-[#D62836] font-bold flex items-center gap-1 hover:underline text-[11px]"
                      >
                        Browse all 450+ models <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`transition-colors py-2 ${
                  pathname === '/about' ? 'text-[#174A83] font-bold' : 'hover:text-[#174A83]'
                }`}
              >
                About Us
              </Link>
              <Link
                href="/industries"
                className={`transition-colors py-2 ${
                  pathname === '/industries' ? 'text-[#174A83] font-bold' : 'hover:text-[#174A83]'
                }`}
              >
                Industries
              </Link>
              <Link
                href="/services"
                className={`transition-colors py-2 ${
                  pathname === '/services' ? 'text-[#174A83] font-bold' : 'hover:text-[#174A83]'
                }`}
              >
                Services
              </Link>
              <Link
                href="/support"
                className={`transition-colors py-2 ${
                  pathname === '/support' ? 'text-[#174A83] font-bold' : 'hover:text-[#174A83]'
                }`}
              >
                Support
              </Link>
              <Link
                href="/contact"
                className={`transition-colors py-2 ${
                  pathname === '/contact' ? 'text-[#174A83] font-bold' : 'hover:text-[#174A83]'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:text-[#174A83] hover:border-[#174A83] flex items-center justify-center transition"
                title="Search Equipment Catalogue"
                aria-label="Search Equipment"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Primary Request a Quote Button (Techmate Red) */}
              <Link
                href="/request-quote"
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#D62836] hover:bg-[#b81d29] shadow-md shadow-[#D62836]/25 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Request a Quote</span>
                <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#D62836]" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Modal Bar */}
        {searchOpen && (
          <div className="bg-[#F3F6FA] border-t border-gray-200 py-3 px-4 sm:px-6">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-[#174A83] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search equipment: combi oven, planetary mixer, blast chiller, cold room, work table..."
                className="w-full bg-white px-4 py-2 rounded-lg text-sm border border-gray-300 focus:outline-none focus:border-[#174A83] text-[#344054]"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#174A83] text-white text-xs font-bold rounded-lg hover:bg-[#123a67] transition shrink-0"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-xs font-bold text-gray-500 hover:text-[#D62836] shrink-0"
              >
                Close
              </button>
            </form>
          </div>
        )}

        {/* Mobile Slide-Out Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-6 py-6 shadow-2xl animate-fade-in max-h-[80vh] overflow-y-auto">
            <div className="space-y-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#174A83] font-bold text-base py-2 border-b border-gray-100"
              >
                Home
              </Link>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#344054] font-medium text-base py-2 border-b border-gray-100"
              >
                Equipment Catalogue (All)
              </Link>
              <div className="py-2 border-b border-gray-100">
                <div className="font-bold text-xs uppercase tracking-wider text-[#174A83] mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Equipment Lines
                </div>
                <div className="space-y-2 pl-3">
                  {CATEGORIES_DATA.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products?category=${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm text-[#344054] hover:text-[#174A83] py-1"
                    >
                      • {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#344054] font-medium text-base py-2 border-b border-gray-100"
              >
                About Techmate
              </Link>
              <Link
                href="/industries"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#344054] font-medium text-base py-2 border-b border-gray-100"
              >
                Industries & Applications
              </Link>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#344054] font-medium text-base py-2 border-b border-gray-100"
              >
                Engineering & Turnkey Services
              </Link>
              <Link
                href="/support"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#344054] font-medium text-base py-2 border-b border-gray-100"
              >
                Technical Support & Service
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#344054] font-medium text-base py-2 border-b border-gray-100"
              >
                Contact & Factory
              </Link>
              <Link
                href="/become-a-distributor"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[#174A83] font-semibold text-sm py-2 border-b border-gray-100"
              >
                Dealer & OEM Portal
              </Link>

              {/* Mobile Quick Action Details */}
              <div className="pt-4 space-y-3">
                <a
                  href="tel:+918008324628"
                  className="w-full py-3 px-4 rounded-lg bg-[#102B46] text-white flex items-center justify-center gap-2 font-bold text-sm"
                >
                  <Phone className="w-4 h-4 text-[#D62836]" />
                  <span>Call: +91 800-TECHMATE</span>
                </a>
                <Link
                  href="/request-quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 px-4 rounded-lg bg-[#D62836] text-white flex items-center justify-center gap-2 font-bold text-sm shadow-md"
                >
                  <span>Request Instant Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
