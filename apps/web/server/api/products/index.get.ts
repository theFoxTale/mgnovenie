import { listProducts } from '../../utils/catalog'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  return listProducts({
    scent: typeof query.scent === 'string' ? query.scent : undefined,
    purpose: typeof query.purpose === 'string' ? query.purpose : undefined,
    composition: typeof query.composition === 'string' ? query.composition : undefined,
    size: typeof query.size === 'string' ? query.size : undefined,
    sort: typeof query.sort === 'string' ? query.sort : undefined,
    page: query.page ? Number(query.page) : 1,
    pageSize: query.pageSize ? Number(query.pageSize) : 10,
    featured: query.featured === 'true' || query.featured === '1',
  })
})
