import { listCollections } from '../../utils/catalog'

export default defineEventHandler(async () => {
  return {
    items: await listCollections(),
  }
})
