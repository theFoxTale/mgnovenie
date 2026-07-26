import { z } from 'zod'

export const productQuerySchema = z
  .object({
    scent: z.string().optional(),
    purpose: z.string().optional(),
    composition: z.string().optional(),
    size: z.string().optional(),
    sort: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(24).default(10),
    featured: z.string().optional(),
  })
  .transform((query) => ({
    scent: query.scent,
    purpose: query.purpose,
    composition: query.composition,
    size: query.size,
    sort: query.sort,
    page: query.page,
    pageSize: query.pageSize,
    featured: query.featured === 'true' || query.featured === '1',
  }))

export const productSlugParamsSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, 'Slug is required')
    .max(120)
    .regex(/^[a-z0-9-]+$/i, 'Product slug is invalid'),
})

export type ProductQueryInput = z.infer<typeof productQuerySchema>
export type ProductSlugParams = z.infer<typeof productSlugParamsSchema>
