import type { Product } from '#shared/types/product'

export type ProductFilterQuery = {
  scent?: string
  purpose?: string
  composition?: string
  size?: string
  sort?: string
  page?: number
  pageSize?: number
  featured?: boolean
}

function includesFacet(values: string[], facet?: string) {
  if (!facet || facet === 'all') return true
  return values.some((v) => v.toLowerCase() === facet.toLowerCase())
}

/** Pure catalog filter/sort/pagination — shared by API and collection page. */
export function filterAndPage(items: Product[], query: ProductFilterQuery = {}) {
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
