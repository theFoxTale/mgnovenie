<script setup lang="ts">
const route = useRoute()
const cart = useCartStore()
const quantity = ref(1)
const openSection = ref<'description' | 'composition' | 'delivery'>('description')
const activeImage = ref(0)
const wishlisted = ref(false)

const { data, error } = await useFetch(() => `/api/products/${route.params.slug}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Товар не найден' })
}

const product = computed(() => data.value?.product)
const related = computed(() => data.value?.related || [])

watch(
  () => product.value?.gallery?.[0],
  () => {
    activeImage.value = 0
  },
)

watch(
  () => cart.wishlist.slice(),
  () => {
    if (product.value) wishlisted.value = cart.isWishlisted(product.value.id)
  },
)

onMounted(() => {
  cart.hydrate()
  if (product.value) wishlisted.value = cart.isWishlisted(product.value.id)
})

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

function addToCart() {
  if (!product.value) return
  cart.addItem(
    {
      productId: product.value.id,
      slug: product.value.slug,
      name: product.value.name,
      subtitle: product.value.subtitle,
      price: product.value.price,
      image: product.value.image,
    },
    quantity.value,
  )
}
</script>

<template>
  <div v-if="product" class="product page">
    <div class="container">
      <nav class="crumbs muted">Главная / Коллекция / {{ product.name }}</nav>

      <div class="product__layout">
        <aside class="thumbs">
          <button
            v-for="(image, index) in product.gallery"
            :key="image + index"
            type="button"
            class="thumbs__item"
            :class="{ 'is-active': index === activeImage }"
            @click="activeImage = index"
          >
            <img :src="image" :alt="`${product.name} ${index + 1}`" />
          </button>
        </aside>

        <div class="gallery">
          <img :src="product.gallery[activeImage] || product.image" :alt="product.name" />
        </div>

        <div class="info">
          <span v-if="product.isHit" class="badge">хит</span>
          <h1>{{ product.name }}</h1>
          <p class="info__subtitle">{{ product.subtitle }}</p>
          <p class="info__price">{{ formatPrice(product.price) }}</p>
          <p class="muted">{{ product.description }}</p>

          <ul class="specs">
            <li><span>Пчелиный воск</span></li>
            <li><span>Деревянный фитиль</span></li>
            <li>
              <span>{{ product.volumeMl }} мл — {{ product.burnHours }} часов</span>
            </li>
            <li><span>Ручная работа</span></li>
          </ul>

          <div class="actions">
            <div class="qty">
              <button type="button" @click="quantity = Math.max(1, quantity - 1)">−</button>
              <span>{{ quantity }}</span>
              <button type="button" @click="quantity += 1">+</button>
            </div>
            <button class="btn" type="button" @click="addToCart">Добавить в корзину</button>
            <button
              class="btn--icon"
              type="button"
              :aria-pressed="wishlisted"
              aria-label="В избранное"
              @click="cart.toggleWishlist(product.id)"
            >
              ♥
            </button>
          </div>
        </div>
      </div>

      <div class="details">
        <div class="accordion">
          <button type="button" @click="openSection = 'description'">
            Описание
            <span>{{ openSection === 'description' ? '−' : '+' }}</span>
          </button>
          <p v-if="openSection === 'description'" class="muted">{{ product.description }}</p>

          <button type="button" @click="openSection = 'composition'">
            Состав
            <span>{{ openSection === 'composition' ? '−' : '+' }}</span>
          </button>
          <p v-if="openSection === 'composition'" class="muted">
            {{ product.composition.join(', ') }}
          </p>

          <button type="button" @click="openSection = 'delivery'">
            Доставка и оплата
            <span>{{ openSection === 'delivery' ? '−' : '+' }}</span>
          </button>
          <p v-if="openSection === 'delivery'" class="muted">
            Доставка по России. Оплата при оформлении заказа. Онлайн-оплата через Т‑Банк — на
            следующем этапе.
          </p>
        </div>

        <dl class="meta">
          <div>
            <dt>Объём</dt>
            <dd>{{ product.volumeMl }} мл</dd>
          </div>
          <div>
            <dt>Время горения</dt>
            <dd>до {{ product.burnHours }} часов</dd>
          </div>
          <div>
            <dt>Материал</dt>
            <dd>{{ product.material }}</dd>
          </div>
          <div>
            <dt>Фитиль</dt>
            <dd>{{ product.wick }}</dd>
          </div>
          <div>
            <dt>Аромат</dt>
            <dd>{{ product.scentNotes.join(', ') }}</dd>
          </div>
          <div>
            <dt>Назначение</dt>
            <dd>{{ product.purpose.join(', ') }}</dd>
          </div>
        </dl>
      </div>

      <section class="related">
        <h2>Вам также может понравиться</h2>
        <div class="related__grid">
          <ProductCard v-for="item in related" :key="item.id" :product="item" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.product {
  padding: 1.5rem 0 4rem;
}

.crumbs {
  margin-bottom: 1.5rem;
  font-size: 0.78rem;
}

.product__layout {
  display: grid;
  grid-template-columns: 5rem 1.2fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

.thumbs {
  display: grid;
  gap: 0.65rem;
}

.thumbs__item {
  padding: 0;
  cursor: pointer;
  background: var(--color-panel);
  border: 1px solid transparent;
}

.thumbs__item.is-active {
  border-color: var(--color-border-strong);
}

.thumbs__item img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.gallery {
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--color-panel);
}

.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
  display: inline-block;
  padding: 0.2rem 0.55rem;
  margin-bottom: 0.75rem;
  font-size: 0.68rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  border: 1px solid var(--color-border-strong);
}

.info h1 {
  font-size: clamp(2rem, 4vw, 3rem);
}

.info__subtitle {
  margin: 0.4rem 0 1rem;
  color: var(--color-text-subtle);
}

.info__price {
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.specs {
  display: grid;
  gap: 0.55rem;
  margin: 1.4rem 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;
}

.qty {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border);
}

.qty button,
.qty span {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--color-text);
  background: transparent;
  border: 0;
}

.qty button {
  cursor: pointer;
}

.details {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2rem;
  padding-top: 2rem;
  margin-top: 3rem;
  border-top: 1px solid var(--color-border);
}

.accordion button {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.95rem 0;
  font-size: 0.75rem;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--color-border);
}

.accordion p {
  padding: 0.85rem 0 1.1rem;
}

.meta {
  display: grid;
  gap: 0.85rem;
}

.meta div {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.meta dt {
  color: var(--color-text-subtle);
}

.related {
  margin-top: 3.5rem;
}

.related h2 {
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
}

.related__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.1rem;
}

@media (max-width: 960px) {
  .product__layout,
  .details,
  .related__grid {
    grid-template-columns: 1fr;
  }

  .thumbs {
    grid-auto-columns: 4.5rem;
    grid-auto-flow: column;
    overflow-x: auto;
  }
}
</style>
