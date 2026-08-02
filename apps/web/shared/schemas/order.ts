import { z } from 'zod'

const phoneRegex = /^[+]?[\d\s()-]{7,20}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const orderBodySchema = z.object({
  customer: z.object({
    name: z.string().trim().min(2, 'Name is too short').max(100, 'Name is too long'),
    phone: z
      .string()
      .trim()
      .min(7, 'Phone is too short')
      .max(20, 'Phone is too long')
      .regex(phoneRegex, 'Phone format is invalid'),
    email: z
      .string()
      .trim()
      .min(5, 'Email is too short')
      .max(254, 'Email is too long')
      .regex(emailRegex, 'Email format is invalid')
      .transform((value) => value.toLowerCase()),
    address: z.string().trim().min(5, 'Address is too short').max(500, 'Address is too long'),
    comment: z
      .string()
      .trim()
      .max(1000, 'Comment is too long')
      .optional()
      .default(''),
  }),
  items: z
    .array(
      z.object({
        productId: z.string().trim().min(1).max(64).optional(),
        slug: z
          .string()
          .trim()
          .min(1, 'Product slug is required')
          .max(120)
          .regex(/^[a-z0-9-]+$/i, 'Product slug is invalid'),
        name: z.string().max(200).optional(),
        price: z.number().optional(),
        quantity: z.coerce.number().int().min(1).max(99),
      }),
    )
    .min(1, 'Cart is empty')
    .max(50, 'Too many line items'),
})

export type OrderBodyInput = z.infer<typeof orderBodySchema>

export type OrderCreateResponse = {
  id: string
  status: 'awaiting_manual'
  total: number
}
