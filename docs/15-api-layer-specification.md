# 15 — API Layer Specification

_Specification of the platform's API surface — built on Payload (`12`), Postgres
(`13`), and the auth model (`14`). Recommendations and contracts only; **no
implementation**. Traceable to the content model (`09`) and Blueprint (`08`)._

---

## 0. Principles

- **The content model is the API.** Payload auto-generates REST + GraphQL from the
  collections/globals in `09`/`12`; we specify _policy_ (which surface, who, limits,
  caching, validation) rather than hand-build CRUD.
- **Same access rules everywhere.** Every surface (REST, GraphQL, Local) runs the
  identical access functions from `14` — there is no "back door" API that bypasses
  roles, site scope, or publish state.
- **Public sees published only.** Unauthenticated reads return published, indexable,
  site-scoped content; drafts/PII require auth.
- **Deny by default; least data.** Endpoints return the minimum; PII fields are gated.

---

## 1. REST vs GraphQL vs Local API — recommendation (DEC-014)

Payload exposes three surfaces; each has a job:

| Surface                                 | Use it for                                                                                               | Why                                                                                                                                    |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Local API** (in-process, server-side) | **All server-rendered page data** (SSR/ISR templates, sitemaps, feeds)                                   | No HTTP hop → fastest, most secure (runs inside the app, honours access with the request user). Primary data path for the public site. |
| **REST** (`/api/...`)                   | **Client-side interactions** — on-site search, form submission, incremental loads; simple external reads | Cache-friendly (HTTP verbs/status/ETags), easy to rate-limit per path, simplest for third parties. **Primary external + browser API.** |
| **GraphQL** (`/api/graphql`)            | **Complex nested reads & future integrations** needing selective fields in one round-trip                | Avoids over/under-fetching for rich consumers (a future app, dashboards). Offered, not mandated.                                       |

**Recommendation (DEC-014):** **Local API for SSR, REST as the primary public/browser
API, GraphQL available for complex and integration use.** Rationale: the public site
is server-rendered (SEO/performance, `05`/`08`), so most reads never touch HTTP;
browser features and external partners get REST's cacheability and simple limiting;
GraphQL is there for consumers that genuinely benefit. GraphQL Playground/introspection
**disabled in production**.

---

## 2. Endpoint catalogue

_Payload conventions shown; `{collection}` ∈ the 18 collections (`12` §1).
`locale`, `depth`, `where`, `limit`, `page`, `sort` are standard query params (§4)._

### 2.1 Content (auto-generated REST)

| Method · Path                   | Purpose             | Auth                               | Notes                             |
| ------------------------------- | ------------------- | ---------------------------------- | --------------------------------- |
| `GET /api/{collection}`         | List/query          | public (published) / auth (drafts) | filter via `where`; paginated     |
| `GET /api/{collection}/{id}`    | Fetch one by id     | as above                           | —                                 |
| `POST /api/{collection}`        | Create              | **auth + role** (`14`)             | draft by default                  |
| `PATCH /api/{collection}/{id}`  | Update              | **auth + role**                    | publish transition gated (Lane A) |
| `DELETE /api/{collection}/{id}` | Soft delete         | **auth + role**                    | hard delete Super Admin only      |
| `GET /api/globals/{slug}`       | Settings/Nav/Footer | public (read)                      | per site                          |
| `POST /api/globals/{slug}`      | Update global       | **Super Admin**                    | Lane C                            |

### 2.2 Custom endpoints (specified, to build)

| Method · Path                                  | Purpose                       | Auth               | Key rules                                                                                                    |
| ---------------------------------------------- | ----------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| `GET /api/content/by-slug?type=&slug=&locale=` | Resolve a page by slug+locale | public (published) | convenience over `where`; returns 404 if unpublished                                                         |
| `POST /api/forms/{key}/submit`                 | Submit enquiry/careers/etc.   | **public**         | validated, consent required, anti-spam, rate-limited, routed by locale (`09` §16 / J4); **PII never in URL** |
| `GET /api/search?q=&locale=&type=&page=`       | On-site search                | public             | queries `search` index (`13` §4); published + site scoped                                                    |
| `GET /api/redirects/resolve?path=`             | Migration redirect lookup     | public             | 301 map from old site (`13`)                                                                                 |
| `GET /api/sitemap.xml` · `/robots.txt`         | SEO                           | public             | generated; hreflang en/el                                                                                    |
| `GET /api/preview?secret=&type=&slug=&locale=` | Enter draft preview           | **signed token**   | enables draft mode; drafts never public (`12` §13)                                                           |
| `POST /api/revalidate`                         | Cache purge webhook           | **shared secret**  | called by `afterChange` hooks (§6)                                                                           |
| `GET /api/health`                              | Liveness/readiness            | internal           | ops/monitoring                                                                                               |

### 2.3 Auth endpoints (from `14`)

| Method · Path                                         | Purpose                    | Notes                                                                     |
| ----------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------- |
| `POST /api/users/login`                               | Password login             | rate-limited; returns httpOnly cookie; triggers MFA challenge if enrolled |
| `POST /api/users/mfa/verify`                          | Submit TOTP/WebAuthn       | step-up capable                                                           |
| `POST /api/users/logout`                              | End session                | server-side revoke                                                        |
| `POST /api/users/refresh-token`                       | Rotate session             | if refresh enabled                                                        |
| `GET /api/users/me`                                   | Current user + permissions | drives admin UI                                                           |
| `POST /api/users/forgot-password` · `/reset-password` | Recovery                   | neutral responses; token ≤30 min; revokes sessions                        |
| `GET /api/graphql` (POST)                             | GraphQL                    | introspection off in prod                                                 |

_(SSO/OIDC callback routes added when SSO lands — `14` §7.)_

---

## 3. Permissions (API enforcement)

- **Single source:** the role × site × lane matrix in `14` §2, executed by Payload
  access functions on **every** operation and surface. GraphQL and REST cannot exceed
  Local API rights.
- **Read scope:** anonymous → published + indexable + site-scoped; authenticated →
  their sites + drafts per role.
- **Write scope:** create/update require role; **publish of care content** (Lane A)
  requires Community Care / Retirement Living / Super Admin — enforced at the API, so
  even a crafted PATCH from an Editor is denied.
- **Field-level:** PII on `form_submissions` filtered out unless the caller is a
  permitted senior role; `settings.analyticsIds` and security config Super-Admin-only.
- **Draft/preview:** only via signed short-lived tokens or an authenticated session.
- **Site isolation:** `site_id` filter applied server-side to every query (`13` §8) —
  cross-tenant reads impossible unless the user is scoped to both.

---

## 4. Request/response conventions

- **Localization:** `?locale=en|el` (default `en`); `all` for editor tooling; fallback
  per `09` §0.2. hreflang honoured in generated URLs.
- **Pagination:** `limit` (default 20, **max 100** — enforced), `page`; responses
  include `totalDocs`, `totalPages`, `hasNextPage`.
- **Filtering/sort:** Payload `where` operators; `sort` whitelisted per collection.
- **Depth:** `depth` controls relationship population; **capped (e.g. ≤3)** to bound
  query cost; GraphQL query **depth + complexity limits** to prevent abusive nesting.
- **Errors:** consistent JSON `{ errors: [{ message, field?, code }] }`; correct HTTP
  status (400 validation, 401 unauthenticated, 403 forbidden, 404, 409 conflict, 422,
  429 rate-limited, 500). No stack traces or internal detail leaked in production.
- **Versioning:** path-prefix strategy reserved (`/api/v1/...` for custom endpoints)
  so future breaking changes don't break integrations; auto-generated Payload routes
  are stable per major Payload version.
- **Content types:** JSON; file upload multipart for media (auth only).

---

## 5. Validation

- **Schema-driven:** field types, required, min/max, enums, formats from `09` are the
  validation contract — enforced by Payload field validation on every write, on all surfaces.
- **Sanitisation:** RichText restricted to allowed marks (H2–H4, links, lists — **no
  raw HTML/scripts**, `09` §0.1); URLs/emails/phones format-checked; slugs regex-validated.
- **Hard publish gates** (rejected at API, not just UI): image alt text, person-photo
  consent, testimonial consent, form privacy-consent field (`09` §0.7/§16).
- **Form submissions:** every field validated to its definition; **consent checkbox
  required**; accessible anti-spam (honeypot/accessible challenge — no image CAPTCHA);
  payload size limits; server-side, never trusting client validation.
- **Uploads:** MIME + extension allowlist, size caps (`09` §0.7), optional AV scan
  (future), images processed to safe variants.
- **Query safety:** reject unknown `sort`/`where` fields; clamp `limit`/`depth`;
  parameterised queries (ORM) → no SQL injection; GraphQL complexity budget.
- **Referential integrity:** relationship targets must exist and be in-scope; delete
  blocked while referenced (`13` §2) returns 409 with a helpful message.

---

## 6. Caching

Layered, matching `13` §6; **authenticated/draft/PII responses are never cached**:

| Layer            | Applies to                                           | Policy                                                                                                                              |
| ---------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **CDN / edge**   | Public GET pages, `by-slug`, search (short), sitemap | SSR/ISR with **on-demand revalidation** via `POST /api/revalidate` fired by write hooks; care/price content revalidates immediately |
| **HTTP headers** | Public REST GETs                                     | `Cache-Control` per resource; **ETag / 304**; `Vary: Accept-Language`/locale                                                        |
| **Application**  | Resolved queries, nav/footer/settings                | short TTL + tag-bust on write; Redis at scale                                                                                       |
| **No-store**     | `/users/me`, drafts, submissions, any authed request | `Cache-Control: no-store`; auth cookie excluded from cache keys                                                                     |

- **GraphQL:** POST is not HTTP-cached by default; use persisted queries / app-layer
  cache for hot integration reads if needed.
- **Invalidation is event-driven** (never blind TTL for care content): a Service
  publish revalidates that service + its group + menu + home.

---

## 7. Rate limiting

Per-IP and per-token, stricter on sensitive paths; `429` with `Retry-After`:

| Endpoint class                               | Limit (indicative — tune with GOCSA)                               | Why                                         |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------- |
| `POST /users/login`, `/forgot-password`, MFA | very tight (e.g. 5–10 / 15 min / account+IP) + progressive lockout | credential stuffing / brute force (`14` §4) |
| `POST /forms/*/submit`                       | tight per IP (e.g. 3–5 / min) + honeypot                           | spam / abuse of public forms                |
| `GET /api/search`                            | moderate per IP                                                    | scraping / cost control                     |
| Public content GETs                          | generous (CDN absorbs most)                                        | normal browsing                             |
| Authenticated writes                         | moderate per token                                                 | accidental loops / abuse                    |
| GraphQL                                      | complexity budget + per-token cap                                  | expensive-query protection                  |

**Enforcement:** at the edge/WAF and app layer; bot protection on auth + forms;
global ceiling to protect the DB. Limits configurable per environment.

---

## 8. CORS & transport security

- **CORS allowlist:** only GOCSA front-end origin(s) (and RGHA's, when live) may call
  browser endpoints; credentials mode for cookie auth; no wildcard on authed routes.
- **HTTPS only**, HSTS; security headers (CSP, X-Frame-Options, X-Content-Type-Options).
- **CSRF** protection on state-changing admin/browser requests (`14` §6).
- **Service-to-service** (future integrations) use **scoped API keys / service
  accounts**, not user cookies; keys in the secrets store (D4), rotatable, audited.

---

## 9. Future integrations

Designed as clean seams, not built now:

**Outbound (platform → other systems):**

- **Enquiry routing → email/CRM:** on `forms/*/submit`, route to the right inbox and,
  later, create a CRM/HubSpot record — via a queued job + **outbound webhook**
  (retry/backoff), so the submit response stays fast (`09` §16, J4).
- **Newsletter/email** (Mailchimp/etc.), **analytics** events, **social** auto-post of News/Events.
- **Webhooks** with signed payloads for any subscriber (RGHA, dashboards).

**Inbound (other systems → platform):**

- **My Aged Care / referral** context pages (informational now; a referral API only if
  GOCSA later wants it — Enterprise).
- **Service accounts / API keys** for partners; scoped, rate-limited, audited.

**Consumers:**

- **RGHA site** and any **future mobile app** consume the same REST/GraphQL — the
  multi-tenant, tokenised design (`13` §8, `10` §19) means no new backend.
- **AI/semantic search** (Enterprise) reads the same `search` index + future pgvector
  (`13` §4) — no content-model change.

**Discipline:** all integrations honour the same auth, rate limits, validation, and
audit; secrets never in the repo; each integration is versioned behind `/api/v1`.

---

## Traceability & Definition of Done

Every endpoint derives from a `09`/`12` collection or a stated need in `08`; access
matches `14`; caching matches `13`; validation enforces `09`. An engineer can
implement the API layer knowing the surface strategy, endpoint contracts, permission
enforcement points, request/response conventions, validation rules, caching and
invalidation, rate limits, CORS/security, and integration seams — **no further
questions, no code prescribed**.

## Open items (config, not shape)

- **DEC-014** (surface strategy) + platform sign-offs (Payload/Postgres/auth, D4).
- Exact rate-limit thresholds, CORS origins (final domains), and which CRM/email
  system enquiries route to (new question for GOCSA).

## Recommended next step

This completes the platform's specification stack (`08`–`15`). The final pre-code
artefact is the **Phase 2 Engineering Implementation Plan** (repo/monorepo layout,
environments & secrets, CI/CD with accessibility + performance + security gates, and
the content-migration runbook). After that — and sign-off on DEC-011/012/013/014 +
D4 — Phase 2 implementation is near-mechanical.
