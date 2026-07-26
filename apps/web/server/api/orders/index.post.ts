import { randomUUID } from 'node:crypto'
import { ZodError } from 'zod'
import { findProduct } from '../../utils/catalog'
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

  const items = []
  for (const item of body.items) {
    const product = await findProduct(item.slug)
    if (!product) {
      throw createError({ statusCode: 400, statusMessage: `Unknown product: ${item.slug}` })
    }
    items.push({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity,
    })
  }

  const total = items.reduce((sum, item) => sum + item.lineTotal, 0)
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
    items,
    total,
  }

  await saveOrder(order)

  return { id: order.id, status: order.status, total: order.total }
})
