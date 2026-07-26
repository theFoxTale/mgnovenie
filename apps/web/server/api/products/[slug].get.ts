import { productSlugParamsSchema } from '#shared/schemas/product'
import { findProduct, relatedProducts } from '../../utils/catalog'

defineRouteMeta({
  openAPI: {
    tags: ['Catalog'],
    summary: 'Get product by slug',
    description: 'Returns a product and related items for the product page.',
    parameters: [
      {
        name: 'slug',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      },
    ],
    responses: {
      '200': { description: 'Product detail with related items' },
      '400': { description: 'Invalid slug' },
      '404': { description: 'Product not found' },
    },
  },
})

export default cachedEventHandler(
  async (event) => {
    const { slug } = await getValidatedRouterParams(event, productSlugParamsSchema.parse)

    const product = await findProduct(slug)
    if (!product) {
      throw createError({ statusCode: 404, statusMessage: 'Product not found' })
    }

    return {
      product,
      related: await relatedProducts(product),
    }
  },
  {
    maxAge: 900,
    swr: true,
    name: 'api-product-by-slug',
    getKey: (event) => `product:${getRouterParam(event, 'slug') || ''}`,
  },
)
