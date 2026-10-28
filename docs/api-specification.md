# Techmate Industries — API Specification (Phase 1)

## 1. Overview
The Techmate API is a RESTful API powering the Techmate Industries B2B commercial kitchen, bakery, and refrigeration platform. All endpoints are routed under the `/api` prefix and return standard JSON payloads.

---

## 2. Global Standards & Headers

### Request Headers
- `Accept: application/json`
- `Content-Type: application/json` (for write operations)

### Response Headers
- `Content-Type: application/json`
- Standard CORS headers based on configured origins.

### Standard Response Structure
Every response adheres to a predictable JSON wrapper:

**Success Response Envelope:**
```json
{
  "success": true,
  "data": { ... } // or flat top-level metadata for health endpoints
}
```

**Error Response Envelope:**
```json
{
  "success": false,
  "message": "Human-readable error description.",
  "errors": {
    "field_name": ["Specific validation error message."]
  }
}
```

---

## 3. Implemented Endpoints (Phase 1)

### 3.1 Health Check Endpoint
Returns application operational readiness without exposing sensitive internal credentials or server configurations.

- **Method:** `GET`
- **Route:** `/api/health`
- **Authentication:** Public / Unauthenticated
- **Query Parameters:** None

#### Success Response
- **HTTP Status:** `200 OK`
- **Body:**
```json
{
  "success": true,
  "application": "Techmate API",
  "message": "API is running successfully.",
  "environment": "local"
}
```

#### Field Definitions
| Field | Type | Description |
| :--- | :--- | :--- |
| `success` | `boolean` | Always `true` on successful health check. |
| `application` | `string` | Display name of the API service (`Techmate API`). |
| `message` | `string` | Brief status confirmation message. |
| `environment` | `string` | Current runtime environment dynamically extracted from `app()->environment()` (e.g. `local`, `production`). |

#### Error Responses
- **HTTP Status:** `500 Internal Server Error` / `503 Service Unavailable`
- **Body:**
```json
{
  "success": false,
  "message": "API health check failed.",
  "environment": "local"
}
```

---

## 4. Public REST API v1 (Phase 4)

Base URL: `{APP_URL}/api/v1` (local: `http://127.0.0.1:8000/api/v1`). The Phase 1 health check remains at `/api/health` with its original envelope. Everything under `/api/v1` uses the envelope below.

Requests: `Accept: application/json`; writes also send `Content-Type: application/json`. Allowed browser origins come from `CORS_ALLOWED_ORIGINS` (no credentials). In production the API forces HTTPS URL generation and assumes TLS terminates at a proxy listed in `TRUSTED_PROXIES`.

### 4.1 Response envelopes

| Case | Status | Body |
| :--- | :--- | :--- |
| Collection (paginated) | 200 | `{ "message", "data": [...], "meta": { "current_page", "per_page", "total", "last_page" } }` |
| Collection (unpaginated: categories) | 200 | `{ "message", "data": [...], "meta": { "total" } }` |
| Detail | 200 | `{ "message", "data": {...} }` |
| Submission | 201 | `{ "message", "data": { "reference": "TM-XXXXXXXXXX" } }` |
| Validation error | 422 | `{ "message", "errors": { "field": ["..."] }, "request_id" }` |
| Not found / unavailable | 404 | `{ "message": "Resource not found.", "request_id" }` |
| Method not allowed | 405 | `{ "message", "request_id" }` |
| Rate limited | 429 | `{ "message": "Too many requests. Please try again later.", "request_id" }` + `Retry-After` header |
| Unexpected error | 500 | `{ "message": "Something went wrong on our side. Please try again later.", "request_id" }` |

Every response carries an `X-Request-Id` header (a sane inbound value is honoured). Quote it when reporting problems; the same id is attached to server log entries. Responses never contain stack traces, SQL, paths or environment values.

### 4.2 Catalogue (public, read-only)

Visibility rule used everywhere: a product is public when `status = published`, `published_at` is null or in the past, it is not soft-deleted, and its category is active and not deleted. A missing, draft, archived, future-dated or deleted product returns the same 404. Inactive/deleted brands are never shown (a product with such a brand simply returns `brand: null`). Only documents with `is_public = true` are returned. Costs, supplier data, audit columns, `status` and `sort_order` are never serialized. `price` is `null` for quote-only products (price on request) and is indicative only.

| Endpoint | Notes |
| :--- | :--- |
| `GET /categories` | Active root categories, each with its active direct children (**two levels, bounded**; deeper levels are not listed but are reachable by slug). `product_count` counts published products. |
| `GET /brands` | Active brands, paginated (`page`, `per_page` default 24, max 100). |
| `GET /products` | Filterable, sortable, paginated listing. |
| `GET /products/{slug}` | Detail: category, brand, ordered images, specifications grouped by `group`, public documents. |
| `GET /categories/{slug}/products` | Same query parameters/rules as `/products`. Includes the category's **active direct subcategories**; the `category` query parameter is ignored (the path decides scope). Unknown/inactive category: 404. |

`/products` query parameters (invalid values return 422):

| Parameter | Rule |
| :--- | :--- |
| `page` | integer 1-100000, default 1 |
| `per_page` | integer 1-100, default 12 |
| `search` | string, max 100. Case-insensitive **literal substring** match (`%`/`_` are escaped) over name, SKU, short description, brand name and category name. This is not relevance-ranked full-text search. |
| `category` | category slug; also matches its direct subcategories. Unknown slug returns an empty list. |
| `brand` | brand slug. Unknown slug returns an empty list. |
| `featured` | `true`, `false`, `1` or `0` |
| `sort_by` | `sort_order` (default), `name`, `published_at` |
| `sort_direction` | `asc` (default) or `desc`. `id` is always the final tie-breaker so pages are stable. |

Example: `GET /api/v1/products?search=oven&category=ovens&featured=1&sort_by=name&per_page=24`

### 4.3 Submissions (public, write-only)

No endpoint lists or reads back leads, applications or quotations. Rate limit (per client IP and per route): `API_SUBMIT_RATE_PER_MINUTE` (default 6) and `API_SUBMIT_RATE_PER_HOUR` (default 30); reads: `API_READ_RATE_PER_MINUTE` (default 120). Client IP is the socket address unless the request comes from a proxy listed in `TRUSTED_PROXIES`.

Fields only staff may set are **rejected with 422** if sent: `status`, `priority`, `assigned_to`, `public_reference`, `reference`, `internal_notes`, `reviewed_by`, `reviewed_at`, `lead_type`, `closed_at`, `price`, `unit_price`, `discount`, `tax`, `total`, `subtotal`, `currency_code` (and `items.*.price`, `items.*.unit_price`). `hp_field` is an invisible honeypot: any value is rejected with 422. No CAPTCHA is integrated.

Common contact fields: `customer_name` (2-150), `email` (RFC, max 255), `phone` (7-15 digits, optional leading `+`), `company_name` (max 200), `city`, `state` (max 100), `postal_code` (max 20), `country_code` (ISO alpha-2, upper-cased), `consent` (boolean; sets `consent_at` when true).

**`POST /enquiries`** - general contact enquiry, stored as a `leads` row (`lead_type = general`, `status = new`, `priority = normal`, unassigned) plus one `lead_activities` note, in one transaction.
Required: `customer_name`, `email`, `subject` (3-200), `message` (10-5000). Optional: `phone`, `company_name`, location fields, `consent`, `source` (`website`, `contact_page`, `home_page`).

**`POST /quote-requests`** - stored as a `leads` row (`lead_type = quotation`) plus `lead_products` rows plus a creation activity, in one transaction. It does **not** create a `quotations` row; formal quotations are issued later by staff.
Required: `customer_name`, `email`, `phone`, `items` (1-20). Optional: `company_name`, location, `message` (max 3000), `business_type` (`restaurant|bakery|cloud-kitchen|catering|dealer|other`), `source`, `consent`.
Each item: `quantity` (integer 1-1000, required) and either `product` (public product slug; must be currently public) or `name` (a described custom requirement, 2-200), plus optional `notes` (max 1000). Duplicate `product` slugs are rejected (422). For catalogue products the stored name/SKU snapshot comes from the catalogue, never from the client. Any ineligible product fails the whole request; nothing is saved.

**`POST /distributor-applications`** - stored in the dedicated `distributor_applications` table (reference prefix `DA-`, `status = new`).
Required: `contact_name`, `company_name`, `email`, `phone`, `business_type` (`dealer|bakery-supplier|refrigeration-mep|turnkey-consultant|other`), `regions_served` (1-10 distinct strings, 2-100 chars). Optional: `city`, `state`, `country_code`, `website_url` (http/https), `experience_range` (`0-2|3-5|6-10|10+`), `product_interests` (max 10), `message` (max 3000), `consent`.

Success example (`201`):

```json
{ "message": "Enquiry submitted successfully.", "data": { "reference": "TM-7K3QH9ZP2A" } }
```

Validation example (`422`):

```json
{ "message": "The given data was invalid.", "errors": { "email": ["The email field must be a valid email address."] }, "request_id": "0b1c..." }
```

### 4.4 Implemented vs deferred

| Workflow | State |
| :--- | :--- |
| Categories, brands, products, product detail, category products | Implemented |
| General enquiries | Implemented (`leads`) |
| Quote requests | Implemented (`leads` + `lead_products`) |
| Distributor applications | Implemented; new table `distributor_applications` because `leads` cannot hold territory/business-focus data or the review workflow |
| `POST /service-requests` | **Deferred, intentionally not routed** (returns 404). No service/maintenance workflow is defined in the requirements or schema; it will be added with its own table once approved |
| Admin / staff endpoints | Out of scope for Phase 4. Only the existing Sanctum-protected `GET /api/user` exists; there are no unauthenticated administrative routes |

### 4.5 Email and queues

Each saved submission queues two notifications (Laravel notifications on the `QUEUE_CONNECTION`, default `database`, queue `TECHMATE_NOTIFICATION_QUEUE`): an acknowledgement to the customer (reference and greeting only) and an alert to `TECHMATE_SALES_EMAIL` (skipped when unset). They are dispatched after the database commit, retried 3 times with 60 s / 300 s back-off, and failures are logged (`Queued job failed.`, no recipients or bodies) and kept in `failed_jobs`. A queueing error never fails the request because the record is already saved. "Queued" does not mean "delivered": monitor `failed_jobs`.

Run a worker: `php artisan queue:work --tries=3` (or `composer dev`, which includes `queue:listen`). Development default is `MAIL_MAILER=log` (messages land in `storage/logs`). Automated tests use fakes and need no SMTP account.

### 4.6 Environment variables (names only)

Backend: `APP_URL`, `CORS_ALLOWED_ORIGINS`, `DB_*`, `QUEUE_CONNECTION`, `MAIL_*`, `TECHMATE_SALES_EMAIL`, `TECHMATE_NOTIFICATION_QUEUE`, `TRUSTED_PROXIES`, `API_READ_RATE_PER_MINUTE`, `API_SUBMIT_RATE_PER_MINUTE`, `API_SUBMIT_RATE_PER_HOUR`.
Frontend: `API_BASE_URL` (server-side, ends in `/api`), `NEXT_PUBLIC_API_BASE_URL` (browser form submissions, same value locally).

### 4.7 Run, verify and test

```bash
cd backend
php artisan migrate               # applies 2026_10_29_000001_create_distributor_applications_table
php artisan serve                 # http://127.0.0.1:8000
php artisan queue:work --tries=3  # in a second terminal
php artisan route:list --path=api/v1
curl http://127.0.0.1:8000/api/health            # database connectivity
curl "http://127.0.0.1:8000/api/v1/products?per_page=5"

php artisan test                                         # SQLite in memory
php artisan test --configuration=phpunit.mysql.xml       # MySQL, database techmate_test (disposable)
```
