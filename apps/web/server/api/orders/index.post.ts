import { randomUUID } from 'node:crypto'
import { findProduct } from '../../utils/catalog'
import { saveOrder } from '../../utils/orders'

type OrderItemInput = {
  productId: string
  slug: string
  name: string
  price: number
  quantity: number
}

type OrderBody = {
  customer: {
    name: string
    phone: string
    email: string
    address: string
    comment?: string
  }
  items: OrderItemInput[]
}

export default defineEventHandler(async (event) => {
  const body = await readBody<OrderBody>(event)

  if (!body?.customer?.name || !body?.customer?.phone || !body?.customer?.email || !body?.customer?.address) {
    throw createError({ statusCode: 400, statusMessage: 'Customer fields are required' })
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Cart is empty' })
  }

  const items = body.items.map((item) => {
    const product = findProduct(item.slug)
    if (!product) {
      throw createError({ statusCode: 400, statusMessage: `Unknown product: ${item.slug}` })
    }
    const quantity = Math.max(1, Number(item.quantity) || 1)
    return {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      lineTotal: product.price * quantity,
    }
  })

  const total = items.reduce((sum, item) => sum + item.lineTotal, 0)
  const order = {
    id: randomUUID(),
    status: 'awaiting_manual' as const,
    createdAt: new Date().toISOString(),
    customer: {
      name: body.customer.name.trim(),
      phone: body.customer.phone.trim(),
      email: body.customer.email.trim(),
      address: body.customer.address.trim(),
      comment: body.customer.comment?.trim() || '',
    },
    items,
    total,
  }

  await saveOrder(order)

  return { id: order.id, status: order.status, total: order.total }
})
