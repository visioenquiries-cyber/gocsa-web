# 24 — Local Development Guide

_How to run the platform locally. The database is replaceable purely via `DATABASE_URI`
(DEC-020/026); production infrastructure is selected later._

## Prerequisites

- Node 20 (`nvm use` reads `.nvmrc`)
- pnpm 9 (`corepack enable`)
- Docker (for local PostgreSQL) — or any PostgreSQL 16 reachable via `DATABASE_URI`

## Exact commands

```bash
# 1. Install dependencies
corepack pnpm@9.12.0 install --frozen-lockfile

# 2. Start PostgreSQL (docker-compose; Postgres 16, local volume, healthcheck)
pnpm db:up                       # → docker compose up -d

# 3. Configure environment (never commit .env)
cp .env.example apps/web/.env    # fill values; defaults already match docker-compose

# 4. Run migrations (create the initial migration, then apply)
pnpm db:migrate:create initial   # generates apps/web/src/migrations/* from the schema
pnpm db:migrate                  # applies migrations to the database

# 5. Load development seed data (idempotent, dev-only, demonstration content)
pnpm db:seed

# 6. Start the application (Next.js + Payload)
pnpm dev                         # → http://localhost:3000

# 7. Open the CMS admin
#    http://localhost:3000/admin      (log in as admin@example.dev / changeme-dev-only)
#    Public dev shell:  http://localhost:3000/en  and  /el
#    Health check:      http://localhost:3000/health

# 8. Run tests
corepack pnpm@9.12.0 -r run test                         # unit + a11y + CMS logic (no DB)
pnpm --filter @gocsa/web run test:integration            # integration (needs the DB)

# Reset the development database safely (drops the volume, recreates)
pnpm db:reset
```

## Notes

- **No hardcoded config:** every URL/secret/provider is read from the environment via
  `@gocsa/env` `getEnv()`; providers come from `@gocsa/platform` `createProviders()`.
- **Seed safety:** `pnpm db:seed` refuses to run unless `APP_ENV=development` and
  `ALLOW_SEED=true`. It never runs in production.
- **Media:** uploads use the local storage adapter in dev (provider-agnostic; swapped at
  deploy). Alt text + consent are enforced before publish.
- **Swapping the database:** change `DATABASE_URI` only — no code changes.

## Seeded demo logins (development only)

`admin@example.dev` (Super Admin) and one user per role
(`siteadmin@`, `care@`, `marketing@`, `editor@`, `translator@`, `reviewer@`,
`readonly@` `example.dev`), all password `changeme-dev-only`. **Demonstration accounts —
delete before any real use.**

## What CI verifies (with a Postgres service)

The `cms-runtime` CI job runs migrations, seed, integration tests, and the app build
against a real Postgres 16 service container — so the database-backed runtime is verified
in CI even where a local Docker/Postgres isn't available.
