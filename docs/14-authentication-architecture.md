# 14 — Authentication & Authorization Architecture

_Enterprise-grade auth for the platform, built on the CMS (`12`) and multi-tenant
database (`13`). Defines the canonical role taxonomy, per-role permissions, MFA,
audit logging, password policy, session management, and future SSO. Traceable to
the Blueprint (`08` §7 roles, §10 ecosystem)._

> **Scope.** This governs **staff/administrator access to the CMS and admin
> surfaces**. Public visitors **do not authenticate** in this phase — enquiry and
> careers forms are anonymous (`09` §16). A client/family portal is an
> **Enterprise-tier future** (`08` §5); this architecture is designed to extend to
> it (separate end-user identity realm) without rework.

> **Role reconciliation.** This supersedes the interim 4-role list in `12` §7. The
> earlier `care-manager` → **Community Care**, `admin` → **Super Admin**;
> `editor`/`marketing` retained; **Retirement Living**, **Read Only**, **Volunteers**,
> **Future Staff** added. Access functions in `12`/`13` now read this taxonomy.
> Recorded as **DEC-013**.

---

## 0. Model: RBAC × site scope

Authorization = **Role** (what you can do) **× Site scope** (where you can do it).
Every user has one or more roles and an assigned set of **sites** (`gocsa-community-care`,
`rgha-retirement-living`, or `*` = all). Both are enforced together in Payload
access functions, which already filter by `site_id` (`13` §8).

- **Least privilege** by default; **separation of duties** (drafting ≠ publishing for
  care content); **deny by default** (no access unless a rule grants it).
- Site scope makes **Community Care** and **Retirement Living** the _same
  capabilities on different tenants_ — one model, two front doors (`08` §10).

`users` table (from `13`): `email`, `hash` (argon2id), `roles[]`, `sites[]`,
`mfa_enrolled`, `mfa_secret` (encrypted), `status`, `last_login_at`, `failed_attempts`,
`locked_until`, audit fields.

---

## 1. Roles & responsibilities

| Role                  | Purpose                                                                                 | Site scope               | Publishing lane (`12` §0.4)    |
| --------------------- | --------------------------------------------------------------------------------------- | ------------------------ | ------------------------------ |
| **Super Admin**       | Full system + security + user management + structural config                            | `*` (all sites)          | A + B + C, all sites           |
| **Marketing**         | Publish marketing content (News, Events, Testimonials, Gallery)                         | assigned site(s)         | B                              |
| **Community Care**    | Approve/publish **care** content for the Community Care site (Lane-A gatekeeper)        | `gocsa-community-care`   | A + B (its site)               |
| **Retirement Living** | Same as Community Care, scoped to RGHA                                                  | `rgha-retirement-living` | A + B (its site)               |
| **Editors**           | Create/edit **draft** content; cannot publish care content                              | assigned site(s)         | draft only (submit for review) |
| **Read Only**         | View admin/content + reports; no writes (executives, auditors)                          | assigned or `*`          | none                           |
| **Volunteers**        | Contribute limited content as drafts (e.g. Events, News) for review; no publish, no PII | assigned site            | draft (restricted types)       |
| **Future Staff**      | Provisioning placeholder — least-privilege on creation until a role is assigned         | none until assigned      | none                           |

---

## 2. Permission matrix

_Rows = capability; ✔ = allowed (within assigned site scope). Care content = Service,
Funding, Policy, care FAQ/Download/Resource. Marketing content = News, Events,
Testimonials, Gallery._

| Capability                                                       | Super Admin | Community Care | Retirement Living |     Marketing     |      Editors      |     Volunteers      |   Read Only    | Future Staff |
| ---------------------------------------------------------------- | :---------: | :------------: | :---------------: | :---------------: | :---------------: | :-----------------: | :------------: | :----------: |
| Log into admin                                                   |      ✔      |       ✔        |         ✔         |         ✔         |         ✔         |          ✔          |       ✔        | ✔ (limited)  |
| View content                                                     |   ✔(all)    |    ✔(site)     |      ✔(site)      |      ✔(site)      |      ✔(site)      |  ✔(site, limited)   |       ✔        |      ✖       |
| Create/edit **draft** content                                    |      ✔      |       ✔        |         ✔         |      ✔(mktg)      |         ✔         | ✔(Events/News only) |       ✖        |      ✖       |
| **Publish care** content (Lane A)                                |      ✔      |       ✔        |         ✔         |         ✖         |         ✖         |          ✖          |       ✖        |      ✖       |
| **Publish marketing** (Lane B)                                   |      ✔      |       ✔        |         ✔         |         ✔         |         ✖         |          ✖          |       ✖        |      ✖       |
| Edit **structural** (Globals/Nav/Footer/Forms/Redirects, Lane C) |      ✔      |       ✖        |         ✖         |         ✖         |         ✖         |          ✖          |       ✖        |      ✖       |
| Manage **Media**                                                 |      ✔      |       ✔        |         ✔         |         ✔         |         ✔         |     upload only     |       ✖        |      ✖       |
| Read **Form Submissions** (PII)                                  |      ✔      |    ✔(site)     |      ✔(site)      |  mktg-forms only  |         ✖         |          ✖          |       ✖        |      ✖       |
| **Export** PII / submissions                                     |      ✔      |    ✔(site)     |      ✔(site)      |         ✖         |         ✖         |          ✖          |       ✖        |      ✖       |
| Restore versions                                                 |      ✔      |       ✔        |         ✔         |         ✔         |      ✔(own)       |          ✖          |       ✖        |      ✖       |
| **Hard delete**                                                  |      ✔      |       ✖        |         ✖         |         ✖         |         ✖         |          ✖          |       ✖        |      ✖       |
| Manage **users & roles**                                         |      ✔      |       ✖        |         ✖         |         ✖         |         ✖         |          ✖          |       ✖        |      ✖       |
| Manage **security/SSO/settings**                                 |      ✔      |       ✖        |         ✖         |         ✖         |         ✖         |          ✖          |       ✖        |      ✖       |
| View **audit logs**                                              |      ✔      |       ✖        |         ✖         |         ✖         |         ✖         |          ✖          | read-only(opt) |      ✖       |
| Cross-site access                                                |      ✔      |       ✖        |         ✖         | if multi-assigned | if multi-assigned |          ✖          |   if scoped    |      ✖       |

**Field-level:** PII fields on `form_submissions` are role-gated + read-only except
to Super Admin / site care role; `settings.analyticsIds` and all security config are
Super-Admin-only. Volunteers never see submissions or PII.

**Separation of duties (enforced):** an Editor/Volunteer can draft a Service but the
`update`-to-`published` transition requires **Community Care / Retirement Living /
Super Admin** — no single low-trust actor can publish care/compliance content (risk R1).

---

## 3. Multi-Factor Authentication (MFA)

- **Primary method: TOTP** (authenticator apps — RFC 6238), secret encrypted at rest.
- **Required (mandatory enrolment) for privileged roles:** Super Admin, Community
  Care, Retirement Living, Marketing (anyone who can publish or see PII).
- **Recommended/enforceable per policy** for Editors, Volunteers, Read Only —
  configurable to "required for all" by Super Admin.
- **WebAuthn / passkeys (FIDO2)** supported as a stronger, phishing-resistant option
  and the preferred path once available; can be mandated for Super Admin.
- **Backup/recovery codes** issued at enrolment (one-time, hashed); **admin-assisted
  reset** with identity verification if a device is lost (never self-bypass).
- **Enrolment flow:** on first privileged login, force MFA setup before any action.
- **Step-up auth:** re-prompt MFA for high-risk actions (user/role changes, security
  settings, bulk PII export) even within an active session.
- MFA events are audit-logged (§5).

---

## 4. Password policy

Aligned to **NIST 800-63B** (length over arbitrary complexity):

- **Minimum length 12** (encourage passphrases); max ≥ 64; all characters allowed.
- **Breached-password check** on set/change via HaveIBeenPwned **k-anonymity** range
  API (only a hash prefix leaves the server) — reject known-compromised passwords.
- **No forced periodic rotation** (NIST guidance) — rotate only on suspected
  compromise or breach.
- **Hashing: argon2id** (memory-hard) with per-user salt; never reversible.
- **Reset flow:** email a single-use, time-limited (≤30 min) token; invalidate on use;
  never reveal whether an email exists (neutral responses); reset **revokes all sessions**.
- **Account lockout / throttling:** progressive delay + temporary lock after N failed
  attempts (`failed_attempts`/`locked_until`); rate-limit per IP + per account to blunt
  credential stuffing; CAPTCHA-free accessible challenge only if needed.
- **No password hints; no security-question fallback** (weak). Recovery = MFA backup
  code or admin-assisted verified reset.

---

## 5. Audit logging (auth events)

Extends the append-only `audit_logs` collection (`12` §16 / `13`) with security
events — **PII-free** payloads:

- Login **success / failure**, logout, session revocation.
- MFA **enrolment, success, failure**, backup-code use, reset.
- Password **change / reset**, lockout triggered/cleared.
- **Role/site assignment changes**, user create/disable/delete.
- Security/settings changes, PII **export**, hard deletes.
- Each entry: `{ actor_id, action, target, ip, user_agent, site_id, created_at, result }`.

**Controls:** immutable to non-Super-Admins; **time-partitioned** and long-retained
(`13` §7); **alerting** on anomalies (repeated failures, new-country login, privilege
change, bulk export). Supports incident response (risk R1/R8/R9) and access reviews.

---

## 6. Session management

- **Transport:** auth token in an **httpOnly, Secure, SameSite=Lax** cookie (never
  in localStorage/JS reach); HTTPS-only; `__Host-` prefix.
- **Lifetimes:** short **idle timeout** (e.g. 30 min) + **absolute timeout** (e.g. 8–12 h);
  privileged roles shorter. Optional refresh with rotation.
- **Server-side revocation:** a `sessions` store (DB/Redis) so tokens can be
  invalidated immediately — used by logout, "log out everywhere", password reset,
  role change, and admin disable. (Pure stateless JWT can't be revoked — hence a
  session store for enterprise control.)
- **Session listing & device management:** users can view active sessions and revoke
  them; Super Admin can revoke any user's sessions.
- **Rotation on privilege change:** re-issue session (and step-up MFA) when roles/sites change.
- **CSRF protection:** anti-CSRF tokens for state-changing admin requests (SameSite is
  defence-in-depth, not sole).
- **Concurrent sessions:** allowed but capped/configurable; suspicious concurrency alerts.
- **Idle/absolute expiry** re-prompts login; drafts autosaved (`12` §12) so no work lost.

---

## 7. Future SSO

Designed to slot in without disrupting the role model:

- **Protocols:** **OIDC** (preferred) and **SAML 2.0** for enterprise IdPs — most
  likely **Microsoft Entra ID (Microsoft 365)** or **Google Workspace** (confirm
  GOCSA's directory — new open item).
- **JIT provisioning:** first SSO login creates a user in **Future Staff** (least
  privilege) pending role assignment, or maps automatically from **IdP group → role +
  site** claims (e.g. group `RGHA-Care` → Retirement Living @ rgha site).
- **SCIM** (optional) for automated provisioning/**deprovisioning** — offboarding in
  the IdP disables CMS access immediately (closes the leaver-access gap, risk R8).
- **MFA delegation:** when SSO is active, MFA is enforced by the IdP (Entra/Google
  conditional access); local MFA remains for non-SSO/break-glass accounts.
- **Break-glass:** at least one local Super Admin with MFA retained for IdP outages;
  its use is heavily audited/alerted.
- **Fallback:** local auth stays available for volunteers/contractors not in the corporate directory.

---

## 8. Account lifecycle & enterprise controls

- **Provisioning:** Super Admin (or SSO/SCIM) creates users; default **Future Staff**
  (no access) until a role + site is assigned — safe onboarding.
- **Offboarding:** disable (not delete) → sessions revoked, MFA cleared, access removed;
  content authorship preserved via versions/audit. SCIM automates this under SSO.
- **Periodic access review:** scheduled report of users × roles × sites × last login for
  Super Admin to recertify (Read Only auditors can view).
- **Secrets:** MFA secrets, tokens, and DB creds in a managed secrets store (env,
  depends D4); nothing in the repo.
- **Hardening:** security headers (HSTS, CSP, X-Frame-Options), admin **rate limiting**,
  optional **IP allowlist** for the admin panel, brute-force protection, encryption in
  transit (TLS) and at rest (DB + backups).
- **Data protection:** PII access is role-gated, audited, exportable only by senior
  roles; aligns with Australian Privacy Principles (risk R9).

---

## Traceability & Definition of Done

Roles map to `08` §7/§10 and the tenancy of `13`; permissions extend `12`'s access
lanes; MFA, password, session, audit, and SSO are enterprise-grade and testable. An
engineer can implement authn/authz: the `users` schema, argon2id + breach checks,
TOTP/WebAuthn MFA, the role×site access functions, server-side sessions with
revocation, the auth audit stream, and an SSO-ready identity layer — all deny-by-default.

## Open items surfaced (config, not shape)

- **Corporate directory** for future SSO (Microsoft Entra vs Google Workspace) — new question for GOCSA.
- **D4** hosting → secrets store + session store (Redis) provisioning.
- Exact timeout/lockout thresholds and MFA-mandatory scope — confirm with GOCSA security preference.

## Recommended next step

Auth completes the platform-architecture set. The natural final pre-code artefact is
the **Phase 2 Engineering Implementation Plan** (repo/monorepo layout, environments &
secrets, CI/CD with accessibility + performance + security gates, and the
content-migration runbook). After that, Phase 2 implementation is near-mechanical —
pending sign-off on DEC-011 (Payload), DEC-012 (Postgres), DEC-013 (this), and D4.
