import { describe, expect, it } from 'vitest'
import { products } from '../server/data/catalog'
import { filterAndPage } from '../server/utils/catalog'

describe('filterAndPage', () => {
  it('filters by scent note', () => {
    const result = filterAndPage(products, { scent: 'пихта', pageSize: 24 })
    expect(result.total).toBeGreaterThan(0)
    expect(result.items.every((p) => p.scentNotes.includes('пихта'))).toBe(true)
  })

  it('sorts by price ascending', () => {
    const result = filterAndPage(products, { sort: 'price-asc', pageSize: 24 })
    const prices = result.items.map((p) => p.price)
    expect(prices).toEqual([...prices].sort((a, b) => a - b))
  })

  it('paginates results', () => {
    const page1 = filterAndPage(products, { page: 1, pageSize: 2 })
    const page2 = filterAndPage(products, { page: 2, pageSize: 2 })

    expect(page1.items).toHaveLength(2)
    expect(page2.items).toHaveLength(2)
    expect(page1.items[0]?.slug).not.toBe(page2.items[0]?.slug)
    expect(page1.pageCount).toBe(Math.ceil(products.length / 2))
  })

  it('filters featured products', () => {
    const result = filterAndPage(products, { featured: true, pageSize: 24 })
    expect(result.items.length).toBeGreaterThan(0)
    expect(result.items.every((p) => p.featured)).toBe(true)
  })
})
