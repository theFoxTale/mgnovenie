import { describe, expect, it } from 'vitest'
import { normalizeSiteOrigin, toAbsoluteUrl } from '../app/utils/site-url'

describe('site-url helpers', () => {
  it('normalizes origin and builds canonical URLs', () => {
    expect(normalizeSiteOrigin('https://mgnovenie.example/')).toBe('https://mgnovenie.example')
    expect(toAbsoluteUrl('https://mgnovenie.example', '/')).toBe('https://mgnovenie.example')
    expect(toAbsoluteUrl('https://mgnovenie.example', '/collection')).toBe(
      'https://mgnovenie.example/collection',
    )
    expect(toAbsoluteUrl('https://mgnovenie.example', 'product/hvoinyi-les')).toBe(
      'https://mgnovenie.example/product/hvoinyi-les',
    )
  })
})
