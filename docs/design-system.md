# Techmate Industries — Phase 2 Design System Specification

## 1. Corporate Brand Identity & Mandatory Color Palette

Techmate Industries utilizes a disciplined, industrial B2B color palette reflecting reliability, engineering excellence, and safety standards:

| Token Name | Hex Value | Semantic Usage | Proportion |
| :--- | :--- | :--- | :--- |
| **Primary Blue** | `#174A83` | Primary buttons, links, active navigation, key icons, badges | ~15% |
| **Accent Red** | `#D62836` | Quotation CTAs, urgent action highlights, key metric accents | ~5% |
| **Deep Navy** | `#102B46` | Header utility bar, footer, dark hero backdrop, contrast cards | ~10% |
| **Light Background** | `#F3F6FA` | Page backgrounds, subtle section separation, card containers | ~20% |
| **Pure White** | `#FFFFFF` | Cards, forms, header surfaces, content sections | ~50% |
| **Body Slate Text** | `#344054` | Paragraphs, descriptions, technical parameters, table copy | N/A |

### Additional Semantic & Status Colors
- **Success**: `#16A34A` (B2B direct supply indicators, CE & ISO certification badges)
- **Warning**: `#D97706` (Maintenance alerts, non-standard lead times)
- **Error**: `#DC2626` (Form validation errors, input boundary failures)
- **Muted Border**: `#E2E8F0` / `#E5E7EB` (Subtle dividers, input borders)

---

## 2. Centralized CSS Custom Properties (`globals.css`)

```css
:root {
  --color-primary: #174A83;
  --color-primary-hover: #123a67;
  --color-primary-light: #e8f0f8;
  --color-accent: #D62836;
  --color-accent-hover: #b81d29;
  --color-accent-light: #fbe9ea;
  --color-navy: #102B46;
  --color-navy-light: #16395c;
  --color-navy-dark: #0a1b2d;
  --color-background: #F3F6FA;
  --color-surface: #FFFFFF;
  --color-text: #344054;
  --color-muted: #64748B;
  --color-border: #E2E8F0;
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-error: #DC2626;
  --color-focus: #174A83;
}
```

---

## 3. Typography Scale & Hierarchy

- **Heading Font**: `Plus Jakarta Sans` (`--font-heading`), modern geometric sans-serif for industrial headings.
- **Body Font**: `Inter` (`--font-sans`), optimized for tabular data and technical specifications.

| Level | Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | `2.5rem` – `3.75rem` (40–60px) | 800 (Extrabold) | 1.12 | Primary landing hero headlines |
| **Section H2**| `1.75rem` – `2.25rem` (28–36px) | 800 (Extrabold) | 1.25 | Major page section headers |
| **Card H3** | `1.125rem` – `1.25rem` (18–20px) | 700 (Bold) | 1.35 | Product card titles, category cards |
| **Subheadings**| `0.875rem` – `1rem` (14–16px) | 600 (Semibold) | 1.50 | Group titles, parameter labels |
| **Body Copy** | `0.875rem` (14px) | 400 (Regular) | 1.60 | Descriptions, articles, guidance |
| **Captions** | `0.75rem` (12px) | 500 (Medium) | 1.40 | Form helpers, metadata, timestamps |
| **Mono Badges**| `0.6875rem` (11px) | 700 (Bold) | 1.00 | Model SKUs (e.g. `TM-CO-10GN`), statuses |

---

## 4. Spacing, Borders, and Radii

- **Container Max-Width**: `1280px` (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`)
- **Card Radii**: `1rem` (`rounded-2xl`) and `1.5rem` (`rounded-3xl` for major feature blocks)
- **Input / Button Radii**: `0.5rem` (`rounded-lg`) to `0.75rem` (`rounded-xl`)
- **Restrained Shadows**: `shadow-sm` on rest, `shadow-xl` on interactive hover, avoided excessive blur or neon glows.

---

## 5. Accessibility & Interaction Principles

1. **Focus Rings**: All interactive controls feature visible `focus-visible:ring-2 focus-visible:ring-[#174A83] focus-visible:ring-offset-2`.
2. **Contrast Compliance**:
   - White text on Corporate Blue `#174A83`: **6.3:1** (WCAG AAA for large, AA for small text).
   - White text on Deep Navy `#102B46`: **12.4:1** (WCAG AAA compliant).
   - White text on Accent Red `#D62836`: **4.8:1** (WCAG AA compliant for bold interactive controls).
   - Slate Text `#344054` on White `#FFFFFF`: **7.9:1** (WCAG AAA compliant).
3. **Reduced Motion**: Respects `prefers-reduced-motion` with subtle opacity and scale transitions (`duration-200` to `duration-300`).
