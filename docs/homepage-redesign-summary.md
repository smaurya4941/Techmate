# Techmate Industries — Phase 2 Homepage Redesign & Architecture Record

**Date**: October 27, 2026  
**Project**: Techmate Industries Commercial Kitchen & Bakery Machinery  
**Repository**: `d:\Techmate`  
**Frontend**: Next.js (App Router) + Pure JS Tailwind CSS v3 + Framer Motion  
**Backend**: Laravel REST API (`http://localhost:8000/api`)

---

## 1. Executive Summary
This document serves as the persistent architectural and design memory for the comprehensive, section-by-section redesign of the Techmate Industries Homepage. The design elevates the UI/UX to match the modern corporate aesthetic of the reference screen while strictly adhering to Techmate's B2B commercial kitchen domain, verified manufacturing assets, and approved corporate color palette.

---

## 2. Approved Brand Color System & Proportions

| Color Name | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| **Techmate Corporate Blue** | `#174A83` | **Primary Brand Color**: Action buttons, active card states, navigation accents, key headings. |
| **Techmate Red** | `#D62836` | **Accent Color**: Quote buttons, highlight badges, phone icons, secondary active accents. |
| **Deep Navy** | `#102B46` | **Dark Canvas & Footers**: Dark cards, hero overlays, footer background, high-contrast headings. |
| **Dark Theme Canvas** | `#08090a` / `#0a0d14` | **Main Homepage Background**: Rich, modern dark background creating contrast. |
| **Pure White** | `#FFFFFF` | **High Contrast Elements**: Work Process cards (`01`, `02`, `03`), main headings, text contrast. |
| **Cool Light Grey** | `#F3F6FA` | **Secondary Spacers**: Badges, subtle dividers, borders (`border-white/10`). |
| **Slate Grey** | `#344054` / `#94A3B8` | **Body & Meta Text**: Descriptive copy, specs, footnotes. |

---

## 3. Section-by-Section Homepage Redesign Inventory

### Section 1: Hero Section (`src/components/Hero.tsx`)
- **Visual Asset**: Full-bleed background photograph of a commercial kitchen executive (`/images/hero-executive.jpg`).
- **Gradient Scrim**: Multi-stop cinematic gradients (`from-black/95 via-black/75 to-transparent`) ensuring readability on the left while keeping the visual clear on the right.
- **Typography**: 3-line bold heading (*"Techmate Inspires Smarter Decisions"*).
- **CTA Actions**: Frosted glass consultation button (`bg-white/15 backdrop-blur-md border-white/20`) + Catalogue link.
- **Framer Motion**: Smooth entry scale animation from `1.08` to `1.0`, staggered headline slide-up, and spring hover on buttons.

### Section 2: Metrics Ribbon & Statistics Banner (`src/components/MetricsTicker.tsx`)
- **Consultation Ribbon**: 3-category top ribbon with active pulse indicator.
- **High-Impact Stat Banner**: Full-width Corporate Blue (`#174A83`) banner with 4 primary metrics:
  - `450+` — Standard Equipment SKUs / Models
  - `35+` — Regional Operations Across India
  - `26` — Expert Consultants & Engineers
  - `100%` — Happy Clients / Inspected Before Dispatch
- **Framer Motion**: `<StaggerGroup>` and `<StaggerItem>` cascading entrance with `<HoverCard>` spring scale.

### Section 3: Company Services Grid (`src/components/EquipmentGrid.tsx`)
- **Container Geometry**: Curved top container (`rounded-t-[44px] bg-[#08090a]`) overlapping the previous section with a smooth transition.
- **Left Column**: High-impact heading (*"Provide Services To Support New Startups"*) with highlighted word and *"See All services"* button.
- **Right Column (2x2 Grid)**:
  - 4 categories: Commercial Cooking Ranges, Commercial Refrigeration, Bakery Machinery, and Custom Stainless Fabrication.
  - **Active State**: Interactive selection with `#174A83` filled background, 2px blue border, and glowing shadow (`shadow-blue-900/40`).
  - Outline SVG icons and animated hover arrow (`group-hover:translate-x-1`).

### Section 4: About / Facility Culture (`src/components/AboutFactoryBanner.tsx`)
- **Headline**: Multi-line bold heading (*"We Do Engineering For Developing An Effective Food Facility Culture"*).
- **Side-by-Side Stat**: `65K+ SQ.FT. PLANT MIDC` paired directly with commercial fabrication narrative.
- **Feature Card**: Dark container holding:
  - Video thumbnail (`/images/about-video-thumb.jpg`) with centered play button that triggers an in-person factory tour modal with `<AnimatePresence>`.
  - 4-item verified checklist with emerald check icons.
- **Direct Phone Bar**: *"Have Any Questions? +91 (022) 2778-8900"* beside the primary *"Contact Us"* button.
- **Right Photographic Visual**: High-resolution executive boardroom consultation photo (`/images/about-team-meeting.jpg`).

### Section 5: Why Choose Us (`src/components/WhyChooseUs.tsx`)
- **Arched Mask (`.arch-mask`)**: Arched top image container (`/images/why-choose-arch.jpg`) displaying senior consultants with a digital tablet and blueprints.
- **Geometric Accents**: Overlapping dark circular arc segment on the top-left and downward-pointing apex triangle accent.
- **3 Horizontal Feature Cards**:
  1. *Exploration and Investigation* (Site assessment, 2D/3D BIM layout design).
  2. *Modern use of Technology* (**Active highlighted card** with solid circular badge, CNC laser cutting, AISI 304 metallurgy).
  3. *Expert data analysts* (Commissioning, load testing, chef recipe training).

### Section 6: Case Studies Carousel (`src/components/CaseStudiesCarousel.tsx`)
- **Header**: Pill badge `CASE STUDIES`, headline (*"Explore Our Insightful Case Studies"*), and circular `<` / `>` carousel controls.
- **4 Commissioned Projects**:
  1. *5-Star Hospitality* (Radisson Blu Banquet Suite — 1,200 covers/day).
  2. *Cloud Kitchen Network* (Rebel Foods Multi-Brand Commissary — 18 delivery brands).
  3. *Industrial Bakery* (Monginis 120-Tray Automated Rotary Line — 4,500 loaves/day).
  4. *Healthcare Catering* (Apollo Hospitals Central Sterile Dietary Kitchen).
- **Bottom-Up Hover Animation**: On hover, pill badge, title, specs link, and description smoothly ascend from the bottom with staggered ease-out delays.

### Section 7: Split CTA Banner (`src/components/SplitCtaBanner.tsx`)
- **Left Column**: Photographic visual of consultants in front of an architectural diagonal ribbed wall (`/images/cta-split-execs.jpg`).
- **Right Column (Rounded CTA Card)**:
  - High-impact rounded card geometry (`rounded-[32px] bg-[#174A83]`).
  - Headline: *"Empowering Smarter Kitchen Decisions"*.
  - Dark *"Contact Us"* button linking directly to `/contact`.

### Section 8: Work Process (`src/components/ProcessSteps.tsx`)
- **Header**: `WORK PROCESS` pill badge with accented headline (*"How Techmate Operate In The Market"*).
- **Connecting Guide Line & Nodes**: Horizontal dashed line with centered `01`, `02`, `03` circular badges on the top edge of each card.
- **3 White Cards**: High-contrast white rounded cards (`bg-white rounded-[32px]`) with colored squircle icons:
  - `01` — Introduction (Handshake icon)
  - `02` — Ideas & Concept (Lightbulb icon)
  - `03` — Consultation (Users consultation icon)

### Section 9: Testimonials (`src/components/Testimonials.tsx`)
- **Left Column**: Executive portrait photograph of client director with laptop (`/images/testimonial-exec-woman.jpg`).
- **Right Column**:
  - `TESTIMONIAL` pill badge, headline (*"What Our Customers Say?"*), and large quotation mark (`”`).
  - Dark testimonial box with `<AnimatePresence>` animated quote transitions.
  - Author avatar (`/images/testimonial-avatar-eric.jpg`), name **Eric Stocklin**, and title (*Director, PRP Hospitality Group*).
  - 4 interactive carousel dots for switching verified operator feedback.

### Section 10: Featured News & Blogs (`src/components/TechnicalInsights.tsx`)
- **Header**: `LATEST NEWS` pill badge, highlighted headline (*"Featured News & Blogs From Techmate"*), and underlined *"View All Blogs"* link.
- **3 Modern Blog Cards**:
  - 16:10 rounded thumbnails with bottom-right dark date badges (`Dec 08, 2025` with calendar icon).
  - Circular author avatar with *"By Garrison Smith"*.
  - Technical articles on kitchen sizing, AISI 304 metallurgy, and industrial equipment consulting.

### Section 11: Direct Factory Desk & Quote Form (`src/components/QuoteForm.tsx`)
- **Glowing Border Container**: Gradient border with custom box-shadow (`glow-blue-border`).
- **Underline Input Styling**: Clean minimal inputs (`.input-underline`).
- **Factory Contact Widget**: Direct telephone, operating hours, and validation handling.

### Auxiliary Components
- **Floating Right Toolbar (`src/components/FloatingRightSidebar.tsx`)**: Fixed vertical sidebar on right edge with cart, devices, headset, and layout icons matching reference design.
- **Scroll To Top Button (`src/components/ScrollToTopButton.tsx`)**: Circular dark button with upward arrow (`↑`) appearing in the bottom-right corner.
- **Mobile Sticky Bar (`src/components/MobileStickyBar.tsx`)**: Sticky bottom action bar for phone call and quote submission on mobile viewports.

---

## 4. Framer Motion Architecture in Next.js App Router

To preserve Server Component rendering for SEO and fast initial HTML delivery while allowing dynamic animations, all Framer Motion wrappers are contained in:
👉 `src/components/animations/MotionWrapper.tsx`

| Wrapper | Purpose | Implementation |
| :--- | :--- | :--- |
| `<FadeIn>` | Scroll-triggered entrance with direction | `initial={{ y: 30, opacity: 0 }}` `whileInView={{ y: 0, opacity: 1 }}` `viewport={{ once: true }}` |
| `<StaggerGroup>` | Staggers lists and grids | Coordinates children transitions with `staggerChildren: 0.12s` |
| `<StaggerItem>` | Individual child inside a StaggerGroup | Fades & translates upward when parent triggers |
| `<HoverCard>` | Micro-interactions for cards and buttons | Spring physics: `whileHover={{ y: -6, scale: 1.015 }}` |

---

## 5. Critical Build & Dev Server Gotchas

1. **Avoid Concurrent `next build` and `next dev`**:
   - Running `next build` while `next dev` is running overwrites `.next/` cache hashes, causing `layout.css` to return `404 Not Found` (resulting in unstyled raw HTML).
   - **Fix**: Stop Node processes (`Stop-Process -Name node -Force`), remove `.next/`, and run `npm run dev --webpack`.
2. **Tailwind v3 Pure JS Pipeline**:
   - Pure JS Tailwind v3 stack (`tailwindcss@^3.4.19`, `postcss@^8.5.32`, `autoprefixer@^10.6.2`) is configured via `postcss.config.mjs` and `tailwind.config.ts` to ensure compatibility across all environments.
3. **TypeScript Validation**:
   - Always run `npx tsc --noEmit` to ensure clean type checks across client and server components.

---

## 6. Route & Component Reference Table

| Route | File Location | Key Components |
| :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | All 11 redesigned sections, FloatingRightSidebar, ScrollToTopButton |
| `/contact` | `src/app/contact/page.tsx` | Dark corporate contact form, MIDC Pawane factory desk details, RFQ launcher |
| `/products` | `src/app/products/page.tsx` | ProductFilterSidebar, ProductGrid, SearchInput, Pagination |
| `/products/[slug]` | `src/app/products/[slug]/page.tsx` | ProductImage gallery, ProductSpecificationList, RFQ context |
| `/request-quote` | `src/app/request-quote/page.tsx` | B2B multi-step RFQ form with prefilled product context |
