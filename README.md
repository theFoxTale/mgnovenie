# MGNOVENIE

Натуральные свечи ручной работы. **Vue 3 + Nuxt 4.5** + TypeScript, Postgres, Docker на Debian 13 VPS.

## Stack

- **Nuxt `^4.5.0`** with the Nuxt 4 `app/` directory layout (`apps/web/app/…`), not the older Nuxt 3 root `pages/` layout
- `compatibilityDate` is pinned in `apps/web/nuxt.config.ts` — keep it when copying config snippets
- Prefer [Nuxt 4 docs](https://nuxt.com/docs/getting-started/upgrade); treat Nuxt 3 examples carefully (paths and defaults differ)

## Local development

Requirements: Node.js 24+ (via nvm), npm.

```bash
# from repo root (installs Husky hooks + root tooling)
npm install

cd apps/web
npm install
npm run dev
```

Open http://localhost:3000

### Git hooks (Husky)

From the repo root after `npm install`:

- **pre-commit** — lint-staged (ESLint / Stylelint / Prettier on staged `apps/web` files)
- **pre-push** — `npm test` (Vitest in `apps/web`)

### Lint & format

From `apps/web`:

```bash
npm run lint          # ESLint (flat config via @nuxt/eslint)
npm run lint:style    # Stylelint
npm run format        # Prettier write
npm run lint:all      # ESLint + Stylelint + Prettier check
npm test              # Vitest unit tests (catalog, order pricing, schema)
```

Configs: `eslint.config.mjs`, `prettier.config.mjs`, `stylelint.config.mjs`.

API contracts (S7): Zod schemas in `shared/schemas/`, `defineRouteMeta` OpenAPI on catalog/orders routes, Nitro `experimental.openAPI` (dev: `/_swagger`, `/_openapi.json`).

SEO (P4 Phase 1): `usePageSeo` sets title/description, OG/Twitter, and canonical from `NUXT_PUBLIC_SITE_URL`. Dynamic `/robots.txt` and `/sitemap.xml` (products + public pages). Cart/checkout are `noindex`. Later: `@nuxtjs/seo` for schema.org / module automation.

Catalog: with `NUXT_DATABASE_URL` set, products/collections/orders use Postgres (`db/seed.sql`). Without it (local only), the in-memory catalog is used and orders go to `apps/web/.data/orders.json`. **Production requires Postgres** (file store is disabled when `NODE_ENV=production`).

Optional Postgres for local API against a real DB (publishes `127.0.0.1:5432` only):

```bash
# from repo root
cp .env.example .env
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d db
```

Then run the Nuxt app with `NUXT_DATABASE_URL` from `.env`. On the VPS, use plain `docker compose up` — Postgres is not published to the host.

## Project layout

- `apps/web` — Nuxt 4.5 app (`app/` pages, Pinia cart, Nitro API)
- `db/` — SQL schema and seed
- `nginx/` — reverse proxy (TLS, security headers, ACME webroot)
- `docker-compose.yml` — web + db + nginx (db internal only)
- `docker-compose.dev.yml` — local overlay: Postgres on `127.0.0.1:5432`

## Phase 1 features

- Home, collection (filters/sort/pagination), product detail
- Cart + wishlist (localStorage)
- Checkout creates an order without online payment
- Stub pages: О нас, Материалы, Отзывы, Контакты

## Deploy on Debian 13 VPS

1. Point DNS `A` record to the VPS IP.
2. Install Docker Engine + Compose plugin.
3. Clone this repository on the server.
4. Copy `.env.example` → `.env`. Set a strong `POSTGRES_PASSWORD` and `NUXT_PUBLIC_SITE_URL=https://your.domain`. Do not use `docker-compose.dev.yml` on the server (it would publish Postgres to localhost).
5. Start stack:

```bash
docker compose up -d --build
```

6. TLS — nginx terminates HTTPS on `:443` (self-signed bootstrap on first start). HTTP `:80` serves ACME challenges and redirects to HTTPS. Security headers: HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`. Replace certs with Let's Encrypt — see `nginx/certs/README.md`.

```bash
# after DNS points at the VPS
sudo certbot certonly --webroot -w "$(pwd)/nginx/www-certbot" -d your.domain
sudo cp /etc/letsencrypt/live/your.domain/fullchain.pem nginx/certs/fullchain.pem
sudo cp /etc/letsencrypt/live/your.domain/privkey.pem nginx/certs/privkey.pem
docker compose exec nginx nginx -s reload
```

Set `NUXT_PUBLIC_SITE_URL=https://your.domain` in `.env`.

## Phase 2 (T-Bank)

Not enabled yet. Planned env vars:

- `TBANK_TERMINAL_KEY`
- `TBANK_PASSWORD`
- `TBANK_NOTIFICATION_URL`

Flow: create order → Init payment → redirect to `PaymentURL` → notification webhook marks order paid.
