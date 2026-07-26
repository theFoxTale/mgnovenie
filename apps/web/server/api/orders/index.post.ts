import { randomUUID } from 'node:crypto'
import { ZodError } from 'zod'
import { findProduct } from '../../utils/catalog'
import { priceOrderItems } from '../../utils/order-pricing'
import { orderBodySchema } from '../../utils/order-schema'
import { saveOrder } from '../../utils/orders'

export default defineEventHandler(async (event) => {
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

  const resolved = new Map<string, Awaited<ReturnType<typeof findProduct>>>()
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
