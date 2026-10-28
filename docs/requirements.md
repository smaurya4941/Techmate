# Techmate Industries — Requirements Specification (Phase 1)

## 1. Project Overview & Business Goal
**Techmate Industries** is a B2B manufacturer and distributor specializing in commercial kitchen, bakery, and refrigeration equipment.
The primary business objective is to build a modern, high-performance, and trustworthy digital platform where commercial and institutional buyers can discover equipment, examine detailed technical specifications, request quotations, and connect with sales and technical engineers.

### Business Domain
- **Commercial Kitchen Equipment:** Cooking ranges, fryers, combi ovens, preparation tables, exhaust systems, dishwashers.
- **Bakery Equipment:** Planetary mixers, spiral mixers, rotary ovens, deck ovens, proofers, dough sheeters, slicers.
- **Commercial Refrigeration Equipment:** Reach-in chillers/freezers, undercounter refrigerators, blast chillers, cold rooms, display counters.
- **Food-Service & Hospitality Solutions:** Custom stainless-steel fabrication, cafeteria counters, catering equipment.

---

## 2. Target User Groups
1. **Hotels & Fine Dining Restaurants:** Executive chefs and purchase managers looking for high-capacity, heavy-duty cooking and preservation units.
2. **Bakeries & Food Processing Units:** Production managers needing automated, precise temperature and humidity-controlled equipment.
3. **Commercial Kitchens & Cloud Kitchens:** Compact, energy-efficient, and modular cooking/prep stations.
4. **Cafés & Catering Businesses:** High-reliability beverage and quick-service commercial appliances.
5. **Institutional & Hospitality Buyers:** Hospitals, universities, corporate canteens seeking large turnkey setups.
6. **Dealers & Distribution Partners:** B2B partners inquiring about bulk ordering, dealership terms, and product catalogues.

---

## 3. Phase 1 Scope (Technical Foundation)
Phase 1 focuses on creating a robust, secure, and production-ready technical architecture for Techmate Industries.

Included in Phase 1:
- [x] Monorepo workspace organization (`frontend/`, `backend/`, `docs/`, `scripts/`).
- [x] Frontend foundation using Next.js App Router, React, TypeScript (strict mode), and Tailwind CSS.
- [x] Backend REST API using Laravel (PHP 8.2+), structured routing, and centralized error handling.
- [x] Database foundation with MySQL / MariaDB (UTF-8 `utf8mb4`), environment-based configuration, and migrations.
- [x] Standardized Health Check endpoint (`GET /api/health`).
- [x] Resilient frontend-backend integration with server-side fetching and graceful degradation when backend is offline.
- [x] Standardized CORS policy configuration.
- [x] Source control hygiene (secure `.gitignore`, sanitized `.env.example`).
- [x] Full documentation suite and automated test suites.

---

## 4. Out-of-Scope for Phase 1 (Future Milestones)
The following modules will be built in subsequent phases and are intentionally excluded from Phase 1 to maintain architectural focus:
- Public product catalogue browsing and dynamic filtering.
- Product specification sheets, PDF brochure downloads, and high-resolution CAD/diagram displays.
- Interactive multi-item quotation request cart ("Request a Quote").
- CRM integration and lead management pipeline.
- Customer account portal and dealer login.
- Full Admin CMS for managing products, categories, leads, and assets.
- Payment gateways and e-commerce checkout (Techmate is quotation-based B2B).
- Third-party email / SMS notification gateways.

---

## 5. Acceptance Criteria
1. **Frontend Foundation:**
   - Next.js App Router with TypeScript runs cleanly with no type errors.
   - Foundation dashboard displays Techmate Industries identity, system health status, and environment information.
   - Server-side data fetching safely handles both API availability and connection failures without crashing the application.
2. **Backend API:**
   - Laravel application boots and serves `/api/health`.
   - Health endpoint outputs dynamic JSON adhering to the specified schema:
     `{"success": true, "application": "Techmate API", "message": "API is running successfully.", "environment": "local"}`.
   - Automated tests in PHPUnit/Pest assert 200 OK and JSON structure.
3. **Database Connectivity:**
   - Configurable host, port (e.g. 3308 / 3306), database name (`techmate_db`), and credentials via `.env`.
   - Migration system verified and operational.
4. **Security & Cleanliness:**
   - No hardcoded secrets, database credentials, or sensitive tokens in version control.
   - Clean, documented monorepo structure.

---

## 6. Assumptions Requiring Confirmation
- **MySQL Configuration:** Default local port is detected as `3308` on this environment (with root credentials), configurable for production staging via standard environment variables.
- **Product Hierarchy:** Phase 2 will introduce a two-tier category hierarchy (Main Category -> Subcategory -> Products) with flexible attribute specifications.
- **Brochure Storage:** Future phases will determine whether assets are stored on local disk or AWS S3/Cloudflare R2.
