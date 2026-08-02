import { describe, expect, it } from 'vitest'
import { productQuerySchema, productSlugParamsSchema } from '../shared/schemas/product'

describe('productQuerySchema', () => {
  it('coerces pagination and featured flags', () => {
    const parsed = productQuerySchema.parse({
      page: '2',
      pageSize: '5',
      featured: 'true',
      scent: 'пихта',
    })

    expect(parsed).toEqual({
      scent: 'пихта',
      purpose: undefined,
      composition: undefined,
      size: undefined,
      sort: undefined,
      page: 2,
      pageSize: 5,
      featured: true,
    })
  })

  it('rejects invalid pageSize', () => {
    expect(() => productQuerySchema.parse({ pageSize: '100' })).toThrow()
  })
})

describe('productSlugParamsSchema', () => {
  it('accepts a valid slug', () => {
    expect(productSlugParamsSchema.parse({ slug: 'hvoinyi-les' }).slug).toBe('hvoinyi-les')
  })

  it('rejects empty slug', () => {
    expect(() => productSlugParamsSchema.parse({ slug: '' })).toThrow()
  })
})
