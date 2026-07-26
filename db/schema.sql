CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL,
  volume_ml INTEGER NOT NULL,
  burn_hours INTEGER NOT NULL,
  material TEXT NOT NULL,
  wick TEXT NOT NULL,
  scent_notes TEXT[] NOT NULL DEFAULT '{}',
  purpose TEXT[] NOT NULL DEFAULT '{}',
  composition TEXT[] NOT NULL DEFAULT '{}',
  size TEXT NOT NULL CHECK (size IN ('small', 'medium', 'large')),
  badge TEXT,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  gallery TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_hit BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS collections (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  image TEXT NOT NULL,
  product_slug TEXT NOT NULL REFERENCES products(slug)
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_comment TEXT NOT NULL DEFAULT '',
  items JSONB NOT NULL,
  total INTEGER NOT NULL,
  payment_id TEXT,
  payment_url TEXT
);

CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);
