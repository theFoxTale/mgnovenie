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

export default defineEventHandler(async () => {
  return {
    items: await listCollections(),
  }
})
