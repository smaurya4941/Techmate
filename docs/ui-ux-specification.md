# Techmate Industries — Phase 2 UI/UX Specification

## 1. Executive Summary & Purpose

The Techmate Industries digital platform is an industrial B2B equipment discovery and quotation engine for the commercial food-service, bakery, and hospitality sectors. The user interface prioritizes clarity, technical veracity, and fast lead generation over consumer shopping patterns.

---

## 2. Page Hierarchy & Layout Architectures

### A. Homepage (`/`)
- **Hero Section**: Dual CTAs (`/request-quote` and `/products`), ISO certification badges, and flagship combi oven technical overview.
- **Product Search & Categories**: 6 major commercial machinery divisions.
- **Factory & Engineering Standards**: Showcase of AISI 304 food-grade sheet metal fabrication and CNC tolerances.
- **Case Studies & Applications**: Commercial projects across hotels, bakeries, and cloud kitchens.
- **Turnkey Process (01, 02, 03)**: Step-by-step guidance from 2D/3D BIM layout to factory commissioning.
- **Direct RFQ Desk**: Immediate lead capture with category and timeline pickers.

### B. Product Listing Page (`/products`)
- **Layout**: Two-column layout with fixed/sticky left filter sidebar and responsive 3-column right product grid.
- **Filter Groups**: Category filter with verified unit counts, Power source filter (Electric, Gas), and live search input.
- **Sort Controls**: Alphabetical (A-Z) and Model SKU sorting.
- **Pagination**: Scalable pagination component supporting API page slicing.
- **Mobile Experience**: Persistent filter button opening an accessible slide-over drawer on screens < 1024px.

### C. Product Detail Page (`/products/[slug]`)
- **Layout**: 2-column hero with 4:3 product schematic/photo gallery, warranty & CE badges, and direct quotation action.
- **RFQ Context Passing**: "Request Official Price Quotation" automatically encodes `product` and `sku` in query parameters to prefill the conversion form.
- **Technical Specifications**: Structured key-value parameter tables grouped by *Dimensions & Weight*, *Electrical & Thermal*, *Capacity & Output*, and *Construction & Material*.
- **Related Equipment**: 3 contextual machinery cards for turnkey configuration.

### D. Conversion Forms
- **Request a Quote (`/request-quote`)**: High-converting B2B RFQ with prefilled product context, required company credentials, and volume pickers.
- **Contact & Plant (`/contact`)**: Verified plant address in TTC Industrial Area, direct phone, and contact form.
- **Become a Distributor (`/become-a-distributor`)**: Regional channel partner application with clear legal disclaimers.
- **Service & Support (`/support`)**: Machine breakdown logging, model serial tracking, and spare parts requests.

---

## 3. Product Data Boundary & Integration Strategy

All development fixtures reside strictly in `@/lib/products-data.ts` and conform to TypeScript interfaces in `@/types/product.ts`.
This ensures a clean boundary:
```
Frontend UI Components
      ↕ (Typed Props)
Data Layer / Adapter (`@/lib/products-data.ts`)
      ↕ (Future Phase 3 Integration)
Laravel REST API (`/api/products`, `/api/quotes`)
```
- **No False Prices**: Commercial kitchen equipment is priced on customized configuration, electrical phase, and shipping freight. All prices are represented as "Commercial RFQ / Quote".
- **Verified Brand Logo**: Techmate® Bake With Mate official trademark asset used in headers, footers, and brand cards.
