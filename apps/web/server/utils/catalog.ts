import { collections, getProductBySlug, products, type Product } from '../data/catalog'

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

function includesFacet(values: string[], query?: string) {
  if (!query || query === 'all') return true
  return values.some((v) => v.toLowerCase() === query.toLowerCase())
}

export function listProducts(query: ProductQuery = {}) {
  const page = Math.max(1, query.page || 1)
  const pageSize = Math.min(24, Math.max(1, query.pageSize || 10))

  let items = [...products]

  if (query.featured) {
    items = items.filter((p) => p.featured)
  }

  items = items.filter((p) => {
    return (
      includesFacet(p.scentNotes, query.scent) &&
      includesFacet(p.purpose, query.purpose) &&
      includesFacet(p.composition, query.composition) &&
      (!query.size || query.size === 'all' || p.size === query.size)
    )
  })

  switch (query.sort) {
    case 'price-asc':
      items.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      items.sort((a, b) => b.price - a.price)
      break
    case 'name':
      items.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
      break
    default:
      break
  }

  const total = items.length
  const start = (page - 1) * pageSize
  const pageItems = items.slice(start, start + pageSize)

  return {
    items: pageItems,
    total,
    page,
    pageSize,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
  }
}

export function findProduct(slug: string) {
  return getProductBySlug(slug) || null
}

export function relatedProducts(product: Product, limit = 5) {
  return products.filter((p) => p.slug !== product.slug).slice(0, limit)
}

export function listCollections() {
  return collections
}
