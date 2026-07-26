import { describe, expect, it } from 'vitest'
import { formatPrice } from '../app/utils/format'

describe('formatPrice', () => {
  it('formats RUB with ru-RU grouping', () => {
    expect(formatPrice(2200)).toBe('2\u00a0200 ₽')
  })
})
