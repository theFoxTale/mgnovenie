export type Product = {
  id: string
  slug: string
  name: string
  subtitle: string
  price: number
  volumeMl: number
  burnHours: number
  material: string
  wick: string
  scentNotes: string[]
  purpose: string[]
  composition: string[]
  size: 'small' | 'medium' | 'large'
  badge?: string
  description: string
  image: string
  gallery: string[]
  featured?: boolean
  isHit?: boolean
}

export type CollectionCard = {
  slug: string
  title: string
  subtitle: string
  image: string
  productSlug: string
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}
