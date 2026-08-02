import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { query, hasDatabase } from './db'

export type StoredOrder = {
  id: string
  status: 'awaiting_manual' | 'pending_payment' | 'paid' | 'failed'
  createdAt: string
  customer: {
    name: string
    phone: string
    email: string
    address: string
    comment: string
  }
  items: Array<{
    productId: string
    slug: string
    name: string
    price: number
    quantity: number
    lineTotal: number
  }>
  total: number
}

const dataDir = path.join(process.cwd(), '.data')
const ordersFile = path.join(dataDir, 'orders.json')

async function readFileOrders(): Promise<StoredOrder[]> {
  try {
    const raw = await readFile(ordersFile, 'utf8')
    return JSON.parse(raw) as StoredOrder[]
  } catch {
    return []
  }
}

async function writeFileOrders(orders: StoredOrder[]) {
  await mkdir(dataDir, { recursive: true })
  await writeFile(ordersFile, JSON.stringify(orders, null, 2), 'utf8')
}

function assertCanUseFileStore() {
  if (process.env.NODE_ENV === 'production') {
    throw createError({
      statusCode: 503,
      statusMessage: 'Database is required in production (set NUXT_DATABASE_URL)',
    })
  }
}

export async function saveOrder(order: StoredOrder) {
  if (hasDatabase()) {
    await query(
      `INSERT INTO orders (id, status, created_at, customer_name, customer_phone, customer_email, customer_address, customer_comment, items, total)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10)`,
      [
        order.id,
        order.status,
        order.createdAt,
        order.customer.name,
        order.customer.phone,
        order.customer.email,
        order.customer.address,
        order.customer.comment,
        JSON.stringify(order.items),
        order.total,
      ],
    )
    return
  }

  assertCanUseFileStore()

  const orders = await readFileOrders()
  orders.unshift(order)
  await writeFileOrders(orders)
}
