import {
  collections as memoryCollections,
  getProductBySlug as getMemoryProductBySlug,
  products as memoryProducts,
} from '../data/catalog'
import type { CollectionCard } from '#shared/types/catalog'
import type { Product } from '#shared/types/product'
import {
  filterAndPage,
  type ProductFilterQuery,
} from '#shared/utils/filter-products'
import { hasDatabase, query } from './db'

export type ProductQuery = ProductFilterQuery

type ProductRow = {
  id: string
  slug: string
  name: string
  subtitle: string
  price: number
  volume_ml: number
  burn_hours: number
  material: string
  wick: string
  scent_notes: string[]
  purpose: string[]
  composition: string[]
  size: 'small' | 'medium' | 'large'
  badge: string | null
  description: string
  image: string
  gallery: string[]
  featured: boolean
  is_hit: boolean
}

type CollectionRow = {
  slug: string
  title: string
  subtitle: string
  image: string
  product_slug: string
}

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    subtitle: row.subtitle,
    price: row.price,
    volumeMl: row.volume_ml,
    burnHours: row.burn_hours,
    material: row.material,
    wick: row.wick,
    scentNotes: row.scent_notes || [],
    purpose: row.purpose || [],
    composition: row.composition || [],
    size: row.size,
    badge: row.badge || undefined,
    description: row.description,
    image: row.image,
    gallery: row.gallery || [],
    featured: row.featured,
    isHit: row.is_hit,
  }
}

async function loadProductsFromDb(): Promise<Product[]> {
  const result = await query<ProductRow>('SELECT * FROM products ORDER BY id')
  return result.rows.map(mapProduct)
}

async function loadCollectionsFromDb(): Promise<CollectionCard[]> {
  const result = await query<CollectionRow>('SELECT * FROM collections ORDER BY title')
  return result.rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    image: row.image,
    productSlug: row.product_slug,
  }))
}

/** Postgres when NUXT_DATABASE_URL is set; otherwise in-memory seed (local only). */
export async function getAllProducts(): Promise<Product[]> {
  if (hasDatabase()) {
    return loadProductsFromDb()
  }
  return memoryProducts
}

export async function listProducts(query: ProductQuery = {}) {
  const items = await getAllProducts()
  return filterAndPage(items, query)
}

export async function findProduct(slug: string) {
  if (hasDatabase()) {
    const result = await query<ProductRow>('SELECT * FROM products WHERE slug = $1 LIMIT 1', [slug])
    const row = result.rows[0]
    return row ? mapProduct(row) : null
  }
  return getMemoryProductBySlug(slug) || null
}

export async function relatedProducts(product: Product, limit = 5) {
  const items = await getAllProducts()
  return items.filter((p) => p.slug !== product.slug).slice(0, limit)
}

export async function listCollections() {
  if (hasDatabase()) {
    return loadCollectionsFromDb()
  }
  return memoryCollections
}
