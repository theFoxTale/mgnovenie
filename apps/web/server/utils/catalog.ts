import {
  collections as memoryCollections,
  getProductBySlug as getMemoryProductBySlug,
  products as memoryProducts,
} from '../data/catalog'
import type { CollectionCard } from '#shared/types/catalog'
import type { Product } from '#shared/types/product'
import { hasDatabase, query } from './db'

export type ProductQuery = {
  scent?: string
  purpose?: string
  composition?: string
  size?: string
  sort?: string
  page?: number
  pageSize?: number
  featured?: boolean
}

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

function includesFacet(values: string[], facet?: string) {
  if (!facet || facet === 'all') return true
  return values.some((v) => v.toLowerCase() === facet.toLowerCase())
}

export function filterAndPage(items: Product[], query: ProductQuery = {}) {
  const page = Math.max(1, query.page || 1)
  const pageSize = Math.min(24, Math.max(1, query.pageSize || 10))

  let filtered = [...items]

  if (query.featured) {
    filtered = filtered.filter((p) => p.featured)
  }

  filtered = filtered.filter((p) => {
    return (
      includesFacet(p.scentNotes, query.scent) &&
      includesFacet(p.purpose, query.purpose) &&
      includesFacet(p.composition, query.composition) &&
      (!query.size || query.size === 'all' || p.size === query.size)
    )
  })

  switch (query.sort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
      break
    default:
      break
  }

  const total = filtered.length
  const start = (page - 1) * pageSize

  return {
    items: filtered.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
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
