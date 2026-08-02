import { listCollections } from '../../utils/catalog'

defineRouteMeta({
  openAPI: {
    tags: ['Catalog'],
    summary: 'List collections',
    description: 'Collection cards shown on the home page.',
    responses: {
      '200': { description: 'Collection list' },
    },
  },
})

export default cachedEventHandler(
  async () => {
    return {
      items: await listCollections(),
    }
  },
  {
    maxAge: 900,
    swr: true,
    name: 'api-collections',
  },
)
