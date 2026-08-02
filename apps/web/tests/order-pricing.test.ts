import { describe, expect, it } from 'vitest'
import { priceOrderItems } from '../server/utils/order-pricing'

const catalog = new Map([
  ['hvoinyi-les', { id: '1', slug: 'hvoinyi-les', name: 'Хвойный лес', price: 2200 }],
  ['med-i-polyn', { id: '2', slug: 'med-i-polyn', name: 'Мёд и полынь', price: 2500 }],
])

describe('priceOrderItems', () => {
  it('recalculates totals from catalog prices and ignores client prices', () => {
    const priced = priceOrderItems(
      [
        { slug: 'hvoinyi-les', quantity: 2 },
        { slug: 'med-i-polyn', quantity: 1 },
      ],
      (slug) => catalog.get(slug) || null,
    )

    expect(priced.items).toEqual([
      {
        productId: '1',
        slug: 'hvoinyi-les',
        name: 'Хвойный лес',
        price: 2200,
        quantity: 2,
        lineTotal: 4400,
      },
      {
        productId: '2',
        slug: 'med-i-polyn',
        name: 'Мёд и полынь',
        price: 2500,
        quantity: 1,
        lineTotal: 2500,
      },
    ])
    expect(priced.total).toBe(6900)
  })

  it('throws for unknown product slug', () => {
    expect(() =>
      priceOrderItems([{ slug: 'missing', quantity: 1 }], (slug) => catalog.get(slug) || null),
    ).toThrow('Unknown product: missing')
  })
})
