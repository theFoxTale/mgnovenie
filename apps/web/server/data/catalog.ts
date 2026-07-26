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

export const products: Product[] = [
  {
    id: '1',
    slug: 'hvoinyi-les',
    name: 'Хвойный лес',
    subtitle: 'пихта, кедр, ель',
    price: 2200,
    volumeMl: 120,
    burnHours: 30,
    material: 'пчелиный воск',
    wick: 'деревянный',
    scentNotes: ['пихта', 'кедр', 'ель'],
    purpose: ['для дома', 'для подарка'],
    composition: ['пчелиный воск', 'эфирные масла'],
    size: 'medium',
    badge: 'хит',
    description:
      'Аромат свежего хвойного леса наполняет пространство чистотой и спокойствием. Идеально для восстановления и уюта. Свеча создана из натурального пчелиного воска с эфирными маслами пихты, кедра и ели.',
    image: '/products/hvoinyi-les.svg',
    gallery: ['/products/hvoinyi-les.svg', '/products/gallery-2.svg', '/products/gallery-3.svg'],
    featured: true,
    isHit: true,
  },
  {
    id: '2',
    slug: 'med-i-polyn',
    name: 'Мёд и полынь',
    subtitle: 'мёд, полынь, ваниль',
    price: 2200,
    volumeMl: 120,
    burnHours: 30,
    material: 'пчелиный воск',
    wick: 'деревянный',
    scentNotes: ['мёд', 'полынь', 'ваниль'],
    purpose: ['для дома'],
    composition: ['пчелиный воск', 'эфирные масла'],
    size: 'medium',
    description: 'Тёплый медовый аромат с лёгкой горечью полыни и мягкой ванилью.',
    image: '/products/med-i-polyn.svg',
    gallery: ['/products/med-i-polyn.svg'],
    featured: true,
  },
  {
    id: '3',
    slug: 'uyutnyi-vecher',
    name: 'Уютный вечер',
    subtitle: 'тепло и комфорт',
    price: 2200,
    volumeMl: 120,
    burnHours: 28,
    material: 'пчелиный воск',
    wick: 'деревянный',
    scentNotes: ['амбра', 'ваниль'],
    purpose: ['для дома'],
    composition: ['пчелиный воск', 'эфирные масла'],
    size: 'medium',
    description: 'Мягкий вечерний аромат для спокойного отдыха.',
    image: '/products/uyutnyi-vecher.svg',
    gallery: ['/products/uyutnyi-vecher.svg'],
    featured: true,
  },
  {
    id: '4',
    slug: 'dikii-med',
    name: 'Дикий мёд',
    subtitle: 'сладость природы',
    price: 2200,
    volumeMl: 120,
    burnHours: 30,
    material: 'пчелиный воск',
    wick: 'деревянный',
    scentNotes: ['мёд', 'прополис'],
    purpose: ['для подарка'],
    composition: ['пчелиный воск', 'эфирные масла'],
    size: 'medium',
    description: 'Насыщенный медовый аромат с природной глубиной.',
    image: '/products/dikii-med.svg',
    gallery: ['/products/dikii-med.svg'],
    featured: true,
  },
  {
    id: '5',
    slug: 'teplyi-dom',
    name: 'Тёплый дом',
    subtitle: 'корица, апельсин, гвоздика',
    price: 2200,
    volumeMl: 120,
    burnHours: 32,
    material: 'пчелиный воск',
    wick: 'деревянный',
    scentNotes: ['корица', 'апельсин', 'гвоздика'],
    purpose: ['для дома', 'для подарка'],
    composition: ['пчелиный воск', 'эфирные масла'],
    size: 'medium',
    description: 'Пряный домашний аромат с цитрусовой свежестью.',
    image: '/products/teplyi-dom.svg',
    gallery: ['/products/teplyi-dom.svg'],
  },
  {
    id: '6',
    slug: 'utrennii-tuman',
    name: 'Утренний туман',
    subtitle: 'эвкалипт, мята, шалфей',
    price: 2200,
    volumeMl: 100,
    burnHours: 25,
    material: 'пчелиный воск',
    wick: 'деревянный',
    scentNotes: ['эвкалипт', 'мята', 'шалфей'],
    purpose: ['для дома'],
    composition: ['пчелиный воск', 'эфирные масла'],
    size: 'small',
    description: 'Свежий утренний аромат для ясности и лёгкости.',
    image: '/products/utrennii-tuman.svg',
    gallery: ['/products/utrennii-tuman.svg'],
  },
  {
    id: '7',
    slug: 'tabak-i-vanil',
    name: 'Табак и ваниль',
    subtitle: 'табак, ваниль, бобы тонка',
    price: 2200,
    volumeMl: 120,
    burnHours: 30,
    material: 'пчелиный воск',
    wick: 'деревянный',
    scentNotes: ['табак', 'ваниль', 'бобы тонка'],
    purpose: ['для дома'],
    composition: ['пчелиный воск', 'эфирные масла'],
    size: 'medium',
    description: 'Глубокий бархатный аромат с тёплой ванилью.',
    image: '/products/tabak-i-vanil.svg',
    gallery: ['/products/tabak-i-vanil.svg'],
  },
  {
    id: '8',
    slug: 'derevo-i-mokh',
    name: 'Дерево и мох',
    subtitle: 'дубовый мох, пачули',
    price: 2200,
    volumeMl: 150,
    burnHours: 35,
    material: 'пчелиный воск',
    wick: 'деревянный',
    scentNotes: ['дубовый мох', 'пачули'],
    purpose: ['для дома'],
    composition: ['пчелиный воск', 'эфирные масла'],
    size: 'large',
    description: 'Землистый лесной аромат с мягкой древесностью.',
    image: '/products/derevo-i-mokh.svg',
    gallery: ['/products/derevo-i-mokh.svg'],
  },
  {
    id: '9',
    slug: 'les-posle-dozhdya',
    name: 'Лес после дождя',
    subtitle: 'сосна, земля, кедр',
    price: 2200,
    volumeMl: 120,
    burnHours: 30,
    material: 'пчелиный воск',
    wick: 'деревянный',
    scentNotes: ['сосна', 'земля', 'кедр'],
    purpose: ['для дома'],
    composition: ['пчелиный воск', 'эфирные масла'],
    size: 'medium',
    description: 'Свежий влажный лес сразу после летнего дождя.',
    image: '/products/les-posle-dozhdya.svg',
    gallery: ['/products/les-posle-dozhdya.svg'],
  },
  {
    id: '10',
    slug: 'tsvetushchii-lug',
    name: 'Цветущий луг',
    subtitle: 'лаванда, ромашка, бергамот',
    price: 2200,
    volumeMl: 120,
    burnHours: 28,
    material: 'пчелиный воск',
    wick: 'деревянный',
    scentNotes: ['лаванда', 'ромашка', 'бергамот'],
    purpose: ['для подарка'],
    composition: ['пчелиный воск', 'эфирные масла'],
    size: 'medium',
    description: 'Лёгкий цветочный аромат летнего луга.',
    image: '/products/tsvetushchii-lug.svg',
    gallery: ['/products/tsvetushchii-lug.svg'],
    featured: true,
  },
]

export const collections: CollectionCard[] = [
  {
    slug: 'hvoinyi-les',
    title: 'Хвойный лес',
    subtitle: 'Свежесть и глубина',
    image: '/products/hvoinyi-les.svg',
    productSlug: 'hvoinyi-les',
  },
  {
    slug: 'uyutnyi-vecher',
    title: 'Уютный вечер',
    subtitle: 'Тепло и комфорт',
    image: '/products/uyutnyi-vecher.svg',
    productSlug: 'uyutnyi-vecher',
  },
  {
    slug: 'dikii-med',
    title: 'Дикий мёд',
    subtitle: 'Сладость природы',
    image: '/products/dikii-med.svg',
    productSlug: 'dikii-med',
  },
  {
    slug: 'tishina-utra',
    title: 'Тишина утра',
    subtitle: 'Спокойствие и умиротворение',
    image: '/products/utrennii-tuman.svg',
    productSlug: 'utrennii-tuman',
  },
]

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}
