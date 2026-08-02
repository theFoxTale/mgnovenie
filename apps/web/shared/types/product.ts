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

/** Fields needed for product cards and cart line display. */
export type ProductSummary = Pick<
  Product,
  'id' | 'slug' | 'name' | 'subtitle' | 'price' | 'image'
>
