import { listCollections } from '../../utils/catalog'

export default defineEventHandler(() => {
  return {
    items: listCollections(),
  }
})
