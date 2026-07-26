import { productQuerySchema } from '#shared/schemas/product'
import { listProducts } from '../../utils/catalog'

defineRouteMeta({
  openAPI: {
    tags: ['Catalog'],
    summary: 'List products',
    description: 'Filter, sort, and paginate the candle catalog.',
    parameters: [
      { name: 'scent', in: 'query', schema: { type: 'string' } },
      { name: 'purpose', in: 'query', schema: { type: 'string' } },
      { name: 'composition', in: 'query', schema: { type: 'string' } },
      { name: 'size', in: 'query', schema: { type: 'string' } },
      { name: 'sort', in: 'query', schema: { type: 'string' } },
      { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1 } },
      { name: 'pageSize', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 24 } },
      { name: 'featured', in: 'query', schema: { type: 'string', enum: ['true', '1'] } },
    ],
    responses: {
      '200': { description: 'Paginated product list' },
      '400': { description: 'Invalid query' },
    },
  },
})

export default cachedEventHandler(
  async (event) => {
    const query = await getValidatedQuery(event, productQuerySchema.parse)
    return listProducts(query)
  },
  {
    maxAge: 600,
    swr: true,
    name: 'api-products-list',
    getKey: (event) => {
      const q = getQuery(event)
      return [
        'products',
        q.scent ?? '',
        q.purpose ?? '',
        q.composition ?? '',
        q.size ?? '',
        q.sort ?? '',
        q.page ?? '1',
        q.pageSize ?? '10',
        q.featured ?? '',
      ].join(':')
    },
  },
)
