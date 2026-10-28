# Techmate Admin Panel (Phase 5)

Filament admin panel for managing the catalogue, website content, settings and
sales enquiries without code changes. Lives in `backend/` alongside the public
API and reads/writes the same MySQL tables the API serves.

## 1. Stack and compatibility

| Item | Version |
| --- | --- |
| PHP | 8.2.12 (runtime), `^8.2` required |
| Laravel | 12.x (`laravel/framework ^12.0`) |
| Filament | **4.16** (`filament/filament ^4.0`; Filament 4 supports Laravel 11.28+/12 and PHP 8.2+) |
| Required PHP extension | `ext-intl` (Filament dependency) |

> **Windows/XAMPP:** `intl` ships with XAMPP but is commented out in `php.ini`.
> Enable it by uncommenting `extension=intl` (and optionally `extension=gd`)
> in `C:\xampp\php\php.ini`, then restart PHP/Apache. Without it `composer install`
> and the panel will refuse to run. No other platform change was needed and no
> Laravel/PHP upgrade was performed.

No roles/permissions package was added. Roles are a column on `users` with a
single typed matrix in code (`App\Support\Permissions`), which fits four fixed
roles and avoids a second authorization system.

## 2. Access and authentication

* URL: `/admin` (login at `/admin/login`). Guests are redirected to the login page.
* Server-enforced: `Authenticate` middleware, `User::canAccessPanel()` (active
  account + known role) on every request, `AuthenticateSession` to invalidate
  other sessions after a password change.
* Login throttling: Filament's built-in limiter (5 attempts/minute per
  email+IP). Covered by a test.
* Password reset: enabled (`/admin/password-reset/request`). It uses the mailer
  in `.env` (`MAIL_MAILER=log` locally writes the link to `storage/logs`; set a
  real SMTP mailer before relying on it in production).
* No public registration route exists (`/admin/register` is 404).
* Deactivating a user (`is_active = false`) locks them out on their next
  request. Accounts are deactivated, never deleted.
* Profile page (`/admin/profile`) lets a user change name, email and password
  only. `role` and `is_active` are not mass-assignable.

### Production session settings

```
APP_ENV=production
APP_DEBUG=false
SESSION_SECURE_COOKIE=true
SESSION_ENCRYPT=true
SESSION_SAME_SITE=lax
SESSION_DOMAIN=<your admin domain>
TRUSTED_PROXIES=<load balancer IPs>   # so HTTPS and client IPs are detected
```

### Creating the first Super Admin

There is no default account and no seeded administrator.

```powershell
cd D:\Techmate\backend
php artisan techmate:create-admin --name="Full Name" --email="you@company.com"
```

The command prompts for a hidden password (min. 12 characters, mixed case +
number). It never accepts a password as an argument (shell history) and never
prints it. For automated deploys set `TECHMATE_ADMIN_PASSWORD` for that single
invocation only. `--role=` accepts `super_admin` (default), `catalogue_manager`,
`sales_executive`, `sales_manager`. Further staff are created by a Super Admin
under **Administration → Staff**.

## 3. Roles and permission matrix

Enforced by Laravel policies (`app/Policies`) and the workflow services, not by
hiding buttons. A denied direct URL returns 403, or 404 for records outside the
user's scope (so existence is not revealed).

| Capability | Super Admin | Catalogue Manager | Sales Manager | Sales Executive |
| --- | :-: | :-: | :-: | :-: |
| Staff accounts and roles | ✔ | – | – | – |
| Website settings | ✔ | – | – | – |
| Products, categories, brands (create/edit/publish/unpublish/archive/deactivate) | ✔ | ✔ | – | – |
| Product images, specifications, documents | ✔ | ✔ | – | – |
| Soft-delete / restore catalogue and CMS records | ✔ | – | – | – |
| Force-delete anything | – | – | – | – |
| CMS pages (create/edit/publish) | ✔ | ✔ | – | – |
| View leads | all | – | all | **assigned to them only** |
| Update lead status, log calls/notes, schedule/complete/cancel follow-ups | ✔ | – | ✔ | own leads only |
| Assign / reassign leads (single and bulk) | ✔ | – | ✔ | – |
| Delete or create leads in the panel | – | – | – | – |
| View quotations | all | – | all | for own leads only |
| Change quotation status (Draft→Sent→Accepted/Rejected/Expired/Cancelled) | ✔ | – | ✔ | – |
| Create/edit/delete quotation contents | – | – | – | – |
| Team dashboard counters | ✔ | – | ✔ | own only |

Rules worth knowing:

* **Self-protection:** nobody can change their own role or deactivate themselves,
  and the last active Super Admin cannot be demoted.
* **Categories** with products or sub-categories cannot be deleted at all.
* **Lead activities** are append-only (no edits, no deletes, even for Super Admin).
* **Quotations** are oversight-only in Phase 5: totals, line items and customer
  snapshots are immutable here; only the status moves along
  `Quotation::TRANSITIONS`, and accepted/rejected/expired/cancelled are final.

Adding a permission: add a constant and role mapping in `App\Support\Permissions`,
use it in a policy, and add a test row to `tests/Feature/Admin/AccessControlTest.php`.

## 4. Catalogue management

**Products** (`Catalogue → Products`): searchable, paginated table with category,
brand, status, featured and updated columns; filters for status, category,
brand, featured and archived. The form has sections for basic information,
category and brand, descriptions, pricing (optional — blank price means
"Request a quote"; a price requires a currency), primary image and publication.
After saving, the edit page shows tabs for **Gallery**, **Technical
specifications** and **Brochures & datasheets**.

* New products default to **Draft** and are invisible to the public API until
  published (row action *Publish*, bulk action, or the Status field).
* *Unpublish* returns a product to Draft; *Archive* hides it permanently but
  keeps it for history. Only a Super Admin can soft-delete.
* **Slugs** are generated from the name on create only. Editing a name never
  changes the URL; changing a slug is a deliberate edit with a warning. Slugs
  and SKUs are unique across **all** rows including archived ones (the database
  index includes them), so a retired URL is never silently reused.
* Specifications are typed (text / number / yes-no), keyed uniquely per
  product, and ordered by drag-and-drop.

**Categories:** two-level hierarchy (matching the public API), parent selector
lists only top-level categories, self-parenting and loops are rejected. Retire a
category with *Deactivate*; its products disappear from the public site but are
retained.

**Brands:** logo, description, validated http(s) website, order. Retire with
*Deactivate*; products keep the association.

## 5. Files and uploads

| Kind | Disk | Rules |
| --- | --- | --- |
| Product primary + gallery images, category images, brand logos | `public` | JPEG/PNG/WebP only (no SVG), 2–3 MB limit, alt text required for gallery |
| Product documents | `local` (private) | PDF, Word, Excel, 20 MB limit |

* Only the storage key (path) is stored in MySQL.
* Storage names are random ULIDs; the extension comes from the **sniffed file
  content**, never from the client name, and falls back to `.bin` for anything
  outside the allowlist.
* MIME types are validated server-side from the upload's content; a PHP file
  renamed `.jpg` is rejected (tested with real files).
* **Document privacy:** documents are always stored on the private disk. Only
  when *Approved for public download* is switched on is a copy placed on the
  public disk (which is what the API links to); switching it off deletes that
  copy. Staff download private files through
  `/admin/product-documents/{id}/download` (authorised, `nosniff`, no-store).
  The private directory is never exposed through `storage:link`.
* Replacing or clearing a file deletes the old one; removing a record deletes
  its files, except a file still referenced elsewhere (e.g. a gallery image set
  as the primary image). Archived/soft-deleted records keep their files.
* Run `php artisan storage:link` once so public files are reachable.
* API responses contain URLs only; no filesystem paths.

## 6. Leads, activities and follow-ups

`Sales → Enquiries & leads`. The table shows reference, customer/company, type,
status, assignee, source, next follow-up (red when overdue) and received date,
with filters for status, type, assignee, source, follow-up state
(overdue/scheduled/none) and date range. The lead page shows customer details,
the enquiry message (rendered as escaped text), requested products with their
snapshots, and tabs for the **activity timeline**, **follow-ups** and
**quotations**.

Header actions: *Log call / note*, *Schedule follow-up*, *Update status*,
*Assign/Reassign* (managers). All run through `App\Services\LeadWorkflow`,
which re-authorizes on the server, validates transitions
(`Lead::TRANSITIONS`) and writes the lead change and its `lead_activities` row
in one database transaction. Status changes record old and new values. Overdue
is derived (`pending` + past due), never stored.

Visibility is enforced in `LeadResource::getEloquentQuery()`
(`LeadPolicy::scope`), so list, direct URLs, bulk actions and relation managers
all share it.

## 7. CMS and website settings

**Pages** (`Content → Pages`) use the existing `pages` table plus two columns
added in Phase 5 (`section`, `sort_order`): `page`, `policy`, `faq`, `solution`,
`service`. Content is rich text sanitised by an allowlist
(`App\Support\HtmlSanitizer`) in the model on **every** save path: scripts,
iframes, styles, event handlers, `javascript:`/`data:` links and unknown tags
are removed. Drafts are never returned by the public API.

**Website settings** (`Administration → Website settings`, Super Admin only) is
a typed allowlist (`App\Services\SiteSettings`): company name/tagline, phone,
email, address, business hours, WhatsApp number, social links, footer text,
default SEO, and homepage hero/CTA text and links. Each key has its own
validation (URL schemes, phone, e-mail, length); unknown keys are rejected so
secrets cannot be stored. Changes are logged by key name only.

## 8. Public API integration

Existing `/api/v1` catalogue endpoints read the same tables, so admin changes
appear immediately in API responses (there is no server-side cache in front of
them). New read-only endpoints, rate-limited like the others:

* `GET /api/v1/pages?section=faq|solution|service|policy|page` — published only, no body
* `GET /api/v1/pages/{slug}` — published only, with sanitised `content`
* `GET /api/v1/settings` — filled, declared website settings

### Frontend cache behaviour

The Next.js app uses ISR with `revalidate = 60` s for catalogue calls, so by
default a change shows on the website within about a minute. For immediate
refresh, enable the optional webhook:

| Backend `.env` | Frontend `.env` |
| --- | --- |
| `FRONTEND_REVALIDATE_URL=https://<site>/api/revalidate` | `REVALIDATE_SECRET=<random string>` |
| `FRONTEND_REVALIDATE_SECRET=<same string>` | |

After any product/category/brand/page/setting/image/spec/document change the
backend POSTs to that URL (after the response, with a 5 s timeout; failures are
logged and never block the save). The route (`frontend/src/app/api/revalidate/route.ts`)
checks the secret in constant time and calls `revalidatePath('/', 'layout')`.
Leave both empty to rely on the 60-second window.

## 9. Logging

Written to the standard Laravel log with an `admin.` prefix and the actor id:
role/active changes, password changes (no value), lead assignment and status
changes, quotation status changes, settings updates (keys only), private
document downloads, failed file deletions. Lead history lives in
`lead_activities`. Passwords, tokens and customer message text are never logged.

## 10. Database changes and rollback

| Migration | Purpose |
| --- | --- |
| `2026_10_30_000001_expand_user_roles` | Replaces placeholder roles with `super_admin`, `catalogue_manager`, `sales_executive`, `sales_manager`; maps existing rows (`admin→super_admin`, `editor→catalogue_manager`, `sales→sales_executive`); replaces the CHECK constraint |
| `2026_10_30_000002_add_section_to_pages_table` | Adds `pages.section` and `pages.sort_order` for typed CMS content |

```powershell
php artisan migrate                 # apply
php artisan migrate:rollback --step=2   # revert both (sales_manager users fall back to the old 'sales' role)
```

Back up the database before migrating production. Nothing is dropped or reset.

## 11. Tests

```powershell
cd D:\Techmate\backend
php artisan test                                    # SQLite in-memory
php vendor/bin/phpunit -c phpunit.mysql.xml         # MySQL `techmate_test` (CHECK constraints, rollback)
```

Real results from the final run: see the implementation report in the Phase 5
hand-off. Suites added: `tests/Feature/Admin/*` (authentication, access control,
products & uploads, categories & brands, leads, quotations, users, CMS &
settings, revalidation) and `tests/Unit/HtmlSanitizerTest.php`.

## 12. Known limitations / deferred

* The public Next.js pages for About, Services, Solutions, FAQs, Privacy and
  Terms are still static components. The CMS and API are ready, but wiring those
  pages (and homepage hero text/CTAs, footer and contact details) to
  `/api/v1/pages` and `/api/v1/settings` is a separate frontend change.
* Structured homepage blocks (featured projects, testimonials) are not modelled:
  no approved source data exists and none was invented.
* Quotation creation, line-item editing and delivery workflows are not part of
  Phase 5 (oversight and status only).
* No bulk export/CSV actions are provided, so there is no export surface to
  secure yet; add them behind a new permission when needed.
* No two-factor authentication (Filament supports it; not enabled).
* Admin-panel browser screenshots were not captured; interface behaviour is
  verified by Livewire component tests and full-page HTTP rendering for every
  role.
