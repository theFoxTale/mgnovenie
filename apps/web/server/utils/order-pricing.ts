import type { Product } from '#shared/types/product'

export type OrderLineRequest = {
  slug: string
  quantity: number
}

export type PricedCatalogProduct = Pick<Product, 'id' | 'slug' | 'name' | 'price'>

export type PricedOrderLine = {
  productId: string
  slug: string
  name: string
  price: number
  quantity: number
  lineTotal: number
}

/**
 * Build order lines from the catalog. Client-sent prices are ignored.
 */
export function priceOrderItems(
  items: OrderLineRequest[],
  resolveProduct: (slug: string) => PricedCatalogProduct | null,
) {
  const lines: PricedOrderLine[] = []

  for (const item of items) {
    const product = resolveProduct(item.slug)
    if (!product) {
      throw new Error(`Unknown product: ${item.slug}`)
    }
    lines.push({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity,
    })
  }

  return {
    items: lines,
    total: lines.reduce((sum, line) => sum + line.lineTotal, 0),
  }
}
