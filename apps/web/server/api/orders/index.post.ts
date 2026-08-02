import { ZodError } from 'zod'
import type { OrderCreateResponse } from '#shared/schemas/order'
import { orderBodySchema } from '#shared/schemas/order'
import { findProduct } from '../../utils/catalog'
import { priceOrderItems } from '../../utils/order-pricing'
import { saveOrder } from '../../utils/orders'
import { randomUUID } from 'node:crypto'

defineRouteMeta({
  openAPI: {
    tags: ['Orders'],
    summary: 'Create checkout order',
    description:
      'Validates the cart payload, recalculates prices from the catalog, and stores an awaiting-manual order.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['customer', 'items'],
            properties: {
              customer: {
                type: 'object',
                required: ['name', 'phone', 'email', 'address'],
                properties: {
                  name: { type: 'string' },
                  phone: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  address: { type: 'string' },
                  comment: { type: 'string' },
                },
              },
              items: {
                type: 'array',
                minItems: 1,
                maxItems: 50,
                items: {
                  type: 'object',
                  required: ['slug', 'quantity'],
                  properties: {
                    productId: { type: 'string' },
                    slug: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                    quantity: { type: 'integer', minimum: 1, maximum: 99 },
                  },
                },
              },
            },
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Order created',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                status: { type: 'string', enum: ['awaiting_manual'] },
                total: { type: 'number' },
              },
            },
          },
        },
      },
      '400': { description: 'Invalid payload or unknown product' },
      '503': { description: 'Order storage unavailable' },
    },
  },
})

export default defineEventHandler(async (event): Promise<OrderCreateResponse> => {
  let body
  try {
    body = await readValidatedBody(event, orderBodySchema.parse)
  } catch (error) {
    if (error instanceof ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: error.issues[0]?.message || 'Invalid order payload',
      })
    }
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid order payload',
    })
  }

  const resolved = new Map<string, NonNullable<Awaited<ReturnType<typeof findProduct>>>>()
  for (const item of body.items) {
    if (resolved.has(item.slug)) continue
    const product = await findProduct(item.slug)
    if (!product) {
      throw createError({ statusCode: 400, statusMessage: `Unknown product: ${item.slug}` })
    }
    resolved.set(item.slug, product)
  }

  let priced
  try {
    priced = priceOrderItems(body.items, (slug) => resolved.get(slug) || null)
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : 'Invalid order items',
    })
  }

  const order = {
    id: randomUUID(),
    status: 'awaiting_manual' as const,
    createdAt: new Date().toISOString(),
    customer: {
      name: body.customer.name,
      phone: body.customer.phone,
      email: body.customer.email,
      address: body.customer.address,
      comment: body.customer.comment,
    },
    items: priced.items,
    total: priced.total,
  }

  await saveOrder(order)

  return { id: order.id, status: order.status, total: order.total }
})
