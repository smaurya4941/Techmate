# Techmate Industries — Phase 2 Responsive Behavior & Breakpoints

## 1. Breakpoint Strategy

Techmate Industries implements a mobile-first responsive architecture using Tailwind CSS standards:

| Viewport Name | Min Width | Target Devices | Key Layout Adaptation |
| :--- | :--- | :--- | :--- |
| **Small Mobile** | `320px` – `375px` | iPhone SE, small Android | Single-column stack, sticky bottom call/quote bar, compact headers. |
| **Standard Mobile** | `390px` – `430px` | iPhone 14/15/16, Galaxy S23 | Touch-optimized 44px tap targets, full-width inputs, drawer navigation. |
| **Tablet** | `768px` (`md:`) | iPad, Surface, Android tablets | 2-column product grid, top utility bar visible, expanded form fields. |
| **Laptop / Desktop**| `1024px` (`lg:`) | 13-15" Laptops | Sticky 4-column filter sidebar, 3-column product grid, mega-dropdown. |
| **Wide Desktop** | `1440px`+ (`xl:`) | 24-27" Monitors | Max container clamped at `1280px` (`max-w-7xl`), generous breathing room. |

---

## 2. Component Adaptations by Screen Size

### Global Navigation Header
- **Desktop (≥ 1024px)**: Top navy bar with factory contact numbers, ISO status, and dealer portal. Full navigation bar with dropdown equipment menu, search toggle, and primary red "Request a Quote" CTA.
- **Mobile (< 1024px)**: Utility bar hidden to prioritize screen height. Hamburger button opens an accessible slide-over drawer with expandable category accordions, tap-to-call button, and sticky quote bar at bottom.

### Product Listing Catalogue (`/products`)
- **Desktop**: Persistent left sidebar (`col-span-1`) with category pills, power toggles, and project assistance card. Right area (`col-span-3`) displays 3 products per row.
- **Mobile**: Persistent filter sidebar hidden. An accessible "Filters" button with active badge count launches a full-height drawer with backdrop blur. Product cards display 1 per row for optimal readability of specs.

### Product Detail Page (`/products/[slug]`)
- **Desktop**: 5-column left area (4:3 product image with model badge and warranty pillars) + 7-column right area (highlights checklist, prefilled quotation button, technical help link). Specifications table displays key-value pairs in 3 columns.
- **Mobile**: Content stacks vertically in a natural reading hierarchy: Breadcrumbs → Image → Model Tag → Title → Description → Highlights → CTAs → Specifications Table.

### Conversion & Lead Forms
- **Desktop**: Two-column side-by-side inputs for Name/Email and Phone/Company.
- **Mobile**: Single-column vertical flow with minimum 44px tap target heights, explicit error messages below fields, and full-width submit buttons.
