import { defineStore } from 'pinia'

export type CartItem = {
  productId: string
  slug: string
  name: string
  subtitle: string
  price: number
  image: string
  quantity: number
}

const STORAGE_KEY = 'mgnovenie-cart'

/**
 * Manual localStorage persistence (not pinia-plugin-persistedstate).
 * hydrate/persist are client-only — never read storage during SSR.
 * Header cart badge is wrapped in <ClientOnly> for a clean hydration boundary.
 */
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    wishlist: [] as string[],
    hydrated: false,
  }),
  getters: {
    itemCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    total: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  actions: {
    hydrate() {
      if (!import.meta.client || this.hydrated) return
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw) as { items?: CartItem[]; wishlist?: string[] }
          this.items = parsed.items || []
          this.wishlist = parsed.wishlist || []
        }
      } catch {
        // ignore broken storage
      }
      this.hydrated = true
    },
    persist() {
      if (!import.meta.client) return
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items: this.items, wishlist: this.wishlist }),
      )
    },
    addItem(item: Omit<CartItem, 'quantity'>, quantity = 1) {
      this.hydrate()
      const existing = this.items.find((i) => i.productId === item.productId)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ ...item, quantity })
      }
      this.persist()
    },
    setQuantity(productId: string, quantity: number) {
      this.hydrate()
      const item = this.items.find((i) => i.productId === productId)
      if (!item) return
      item.quantity = Math.max(1, quantity)
      this.persist()
    },
    removeItem(productId: string) {
      this.hydrate()
      this.items = this.items.filter((i) => i.productId !== productId)
      this.persist()
    },
    clear() {
      this.items = []
      this.persist()
    },
    toggleWishlist(productId: string) {
      this.hydrate()
      if (this.wishlist.includes(productId)) {
        this.wishlist = this.wishlist.filter((id) => id !== productId)
      } else {
        this.wishlist.push(productId)
      }
      this.persist()
    },
    isWishlisted(productId: string) {
      return this.wishlist.includes(productId)
    },
  },
})
