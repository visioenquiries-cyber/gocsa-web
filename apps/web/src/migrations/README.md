# Payload migrations

Generated migration files live here. They are created against the development database:

```bash
pnpm db:up                      # start local Postgres (docker-compose)
pnpm db:migrate:create initial  # generate the initial migration from the schema
pnpm db:migrate                 # apply migrations
```

Do not hand-edit generated migrations. In development, Payload can also auto-sync the
schema; migrations are the controlled path used for staging/production (no destructive
automatic production changes — docs/13). The initial migration is committed once generated
against a running database (pending — see docs/24 / R16).
