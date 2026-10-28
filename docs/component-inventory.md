# Techmate Industries — Phase 2 Reusable Component Inventory

This document tracks all reusable UI components, layouts, and product modules developed under Phase 2.

## 1. Design System & UI Primitives (`@/components/ui/`)

| Component | Path | Variants / Props | Description |
| :--- | :--- | :--- | :--- |
| `Button` | `Button.tsx` | `primary`, `accent`, `navy`, `outline`, `ghost` / `sm`, `md`, `lg` | Accessible button with loading spinner, icon slots, and active scale. |
| `Badge` | `Badge.tsx` | `primary`, `accent`, `navy`, `neutral`, `success`, `warning` | Status and category tags with optional pulsing dot. |
| `Card` | `Card.tsx` | `default`, `muted`, `interactive`, `bordered` | Elevated container with `CardHeader`, `CardTitle`, `CardContent`, and `CardFooter`. |
| `Input` | `Input.tsx` | `label`, `error`, `helperText`, `leftIcon`, `rightIcon`, `isRequired` | Form text input with accessible ARIA states and validation icons. |
| `SearchInput` | `Input.tsx` | Extends `Input` with search icon and clear handler | Accessible catalogue search input. |
| `TextArea` | `TextArea.tsx` | `label`, `error`, `helperText`, `isRequired`, `rows` | Multi-line text field for inquiries and technical notes. |
| `Select` | `Select.tsx` | `options`, `label`, `error`, `placeholder` | Accessible styled dropdown with chevron. |
| `Checkbox` | `Checkbox.tsx` | `label`, `description`, standard input props | Accessible checkbox for options and terms. |
| `Alert` | `Alert.tsx` | `info`, `success`, `warning`, `error` | Dismissible notification and feedback banner. |
| `EmptyState` | `EmptyState.tsx` | `icon`, `title`, `description`, `actionLabel`, `onAction` | Zero-results state with icon and action button. |
| `Skeleton` | `Skeleton.tsx` | `rect`, `circle`, `text` | Pulsing placeholder for loading states. |
| `Spinner` | `Spinner.tsx` | `primary`, `accent`, `white` / `sm`, `md`, `lg` | Rotating SVG loading indicator. |
| `Pagination` | `Pagination.tsx` | `currentPage`, `totalPages`, `onPageChange` | Numbered pagination with previous/next controls. |

---

## 2. Shared Layout Components (`@/components/layout/`)

| Component | Path | Description |
| :--- | :--- | :--- |
| `Breadcrumbs` | `Breadcrumbs.tsx` | Accessible trail (`Home > Category > Product`) with `aria-current="page"`. |
| `PageContainer`| `PageContainer.tsx`| Responsive centered container (`narrow`, `default`, `wide`, `full`). |
| `SectionHeading`| `SectionHeading.tsx`| Standardized kicker badge, H2 heading, subtitle, and optional right action. |

---

## 3. Product & Catalogue Components (`@/components/products/`)

| Component | Path | Description |
| :--- | :--- | :--- |
| `ProductCard` | `ProductCard.tsx` | Card with product image, model badge, power tag, specs, and RFQ actions. |
| `ProductGrid` | `ProductGrid.tsx` | 3-column desktop / 2-column tablet / 1-column mobile grid with empty & loading states. |
| `ProductImage`| `ProductImage.tsx`| Next.js image with automatic SVG category fallback and model identifier. |
| `ProductFilterSidebar` | `ProductFilterSidebar.tsx` | Filter panel for category, power source, and active filter counter. |
| `ProductSpecificationList` | `ProductSpecificationList.tsx` | Grouped technical data sheet with verified parameter counts. |
| `CategoryCard`| `CategoryCard.tsx`| Card representing equipment lines with icon and model count. |
| `RelatedProducts` | `RelatedProducts.tsx`| 3-column complementary machinery recommendations. |

---

## 4. Global Navigation & Page Sections (`@/components/`)

| Component | Path | Description |
| :--- | :--- | :--- |
| `Header` | `Header.tsx` | Responsive header with navy utility bar, official logo, dropdown mega-menu, search bar, and mobile drawer. |
| `Footer` | `Footer.tsx` | 4-column corporate navy footer with plant details, category links, legal links, and newsletter. |
| `Hero` | `Hero.tsx` | High-impact industrial hero section with dual CTAs and flagship combi oven tabs. |
| `EquipmentGrid` | `EquipmentGrid.tsx` | Interactive category selector with 6 equipment divisions. |
| `WhyChooseUs` | `WhyChooseUs.tsx` | 3 core engineering pillars (AISI 304, ISO 9001, Pan-India support). |
| `QuoteForm` | `QuoteForm.tsx` | Homepage direct RFQ lead capture form. |
| `MobileStickyBar` | `MobileStickyBar.tsx` | Sticky mobile action bar for quick phone call and quote navigation. |
