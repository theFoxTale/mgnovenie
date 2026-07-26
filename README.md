# MGNOVENIE

Натуральные свечи ручной работы. Vue 3 + Nuxt + TypeScript, Postgres, Docker на Debian 13 VPS.

## Local development

Requirements: Node.js 24+ (via nvm), npm.

```bash
cd apps/web
npm install
npm run dev
```

Open http://localhost:3000

### Lint & format

From `apps/web`:

```bash
npm run lint          # ESLint (flat config via @nuxt/eslint)
npm run lint:style    # Stylelint
npm run format        # Prettier write
npm run lint:all      # ESLint + Stylelint + Prettier check
```

Configs: `eslint.config.mjs`, `prettier.config.mjs`, `stylelint.config.mjs`.

Catalog: with `NUXT_DATABASE_URL` set, products/collections/orders use Postgres (`db/seed.sql`). Without it (local only), the in-memory catalog is used and orders go to `apps/web/.data/orders.json`. **Production requires Postgres** (file store is disabled when `NODE_ENV=production`).

Optional Postgres for local API against a real DB:

```bash
# from repo root
cp .env.example .env
docker compose up -d db
```

Then run the Nuxt app with `NUXT_DATABASE_URL` from `.env`.

## Project layout

- `apps/web` — Nuxt app (pages, Pinia cart, Nitro API)
- `db/` — SQL schema and seed
- `nginx/` — reverse proxy config
- `docker-compose.yml` — web + db + nginx

## Phase 1 features

- Home, collection (filters/sort/pagination), product detail
- Cart + wishlist (localStorage)
- Checkout creates an order without online payment
- Stub pages: О нас, Материалы, Отзывы, Контакты

## Deploy on Debian 13 VPS

1. Point DNS `A` record to the VPS IP.
2. Install Docker Engine + Compose plugin.
3. Clone this repository on the server.
4. Copy `.env.example` → `.env` and set secrets / `NUXT_PUBLIC_SITE_URL=https://your.domain`.
5. Start stack:

```bash
docker compose up -d --build
```

6. TLS (Let's Encrypt) — after DNS works, install certbot and either:
   - terminate TLS on the host and proxy to nginx:80, or
   - extend `nginx/nginx.conf` with a 443 server block and mount certificates into `nginx/certs`.

Example certbot (host nginx / certbot snap) is out of band; minimal HTTP reverse proxy is included for first bring-up.

## Phase 2 (T-Bank)

Not enabled yet. Planned env vars:

- `TBANK_TERMINAL_KEY`
- `TBANK_PASSWORD`
- `TBANK_NOTIFICATION_URL`

Flow: create order → Init payment → redirect to `PaymentURL` → notification webhook marks order paid.
