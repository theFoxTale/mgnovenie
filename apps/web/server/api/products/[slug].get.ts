import { findProduct, relatedProducts } from '../../utils/catalog'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const product = await findProduct(slug)
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  return {
    product,
    related: await relatedProducts(product),
  }
})
