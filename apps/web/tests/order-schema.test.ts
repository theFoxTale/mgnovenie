import { describe, expect, it } from 'vitest'
import { orderBodySchema } from '../server/utils/order-schema'

const validCustomer = {
  name: 'Анна',
  phone: '+7 999 123-45-67',
  email: 'Anna@Example.com',
  address: 'Москва, ул. Примерная, 1',
}

describe('orderBodySchema', () => {
  it('accepts a valid payload and lowercases email', () => {
    const parsed = orderBodySchema.parse({
      customer: validCustomer,
      items: [{ slug: 'hvoinyi-les', quantity: 2, price: 1 }],
    })

    expect(parsed.customer.email).toBe('anna@example.com')
    expect(parsed.customer.comment).toBe('')
    expect(parsed.items[0]?.quantity).toBe(2)
  })

  it('rejects empty cart and invalid email', () => {
    expect(() =>
      orderBodySchema.parse({
        customer: { ...validCustomer, email: 'not-an-email' },
        items: [{ slug: 'hvoinyi-les', quantity: 1 }],
      }),
    ).toThrow()

    expect(() =>
      orderBodySchema.parse({
        customer: validCustomer,
        items: [],
      }),
    ).toThrow(/Cart is empty/)
  })

  it('caps quantity at 99', () => {
    expect(() =>
      orderBodySchema.parse({
        customer: validCustomer,
        items: [{ slug: 'hvoinyi-les', quantity: 100 }],
      }),
    ).toThrow()
  })
})
