<script setup lang="ts">
import type { ProductSummary } from '#shared/types/product'

const props = defineProps<{
  product: ProductSummary
}>()

const cart = useCartStore()
const wishlisted = ref(false)

function syncWishlist() {
  wishlisted.value = cart.isWishlisted(props.product.id)
}

onMounted(() => {
  cart.hydrate()
  syncWishlist()
})

watch(
  () => cart.wishlist.slice(),
  () => syncWishlist(),
)

function addToCart() {
  cart.addItem({
    productId: props.product.id,
    slug: props.product.slug,
    name: props.product.name,
    subtitle: props.product.subtitle,
    price: props.product.price,
    image: props.product.image,
  })
}
</script>

<template>
  <article class="card">
    <NuxtLink :to="`/product/${product.slug}`" class="card__media">
      <ProductImage :src="product.image" :alt="product.name" loading="lazy" />
      <button
        class="card__wish"
        type="button"
        :aria-pressed="wishlisted"
        aria-label="В избранное"
        @click.prevent="cart.toggleWishlist(product.id)"
      >
        ♥
      </button>
    </NuxtLink>
    <div class="card__body">
      <div>
        <NuxtLink :to="`/product/${product.slug}`" class="card__title">{{ product.name }}</NuxtLink>
        <p class="card__subtitle">{{ product.subtitle }}</p>
      </div>
      <div class="card__row">
        <span class="card__price">{{ formatPrice(product.price) }}</span>
        <button class="btn--icon" type="button" aria-label="В корзину" @click="addToCart">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 8h12l-1 12H7L6 8z" stroke="currentColor" stroke-width="1.5" />
            <path d="M9 8a3 3 0 016 0" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.card__media {
  position: relative;
  display: block;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background:
    radial-gradient(circle at 30% 20%, rgba(233, 226, 214, 0.08), transparent 45%),
    var(--color-panel);
}

.card__media picture {
  display: block;
  width: 100%;
  height: 100%;
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--dur-med) var(--ease-out);
}

.card__media:hover img {
  transform: scale(1.04);
}

.card__wish {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 2rem;
  height: 2rem;
  color: var(--color-text-muted);
  cursor: pointer;
  background: rgba(20, 18, 16, 0.35);
  border: 0;
  border-radius: 50%;
}

.card__wish[aria-pressed='true'] {
  color: var(--color-cream);
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card__title {
  font-family: var(--font-display);
  font-size: 1.25rem;
}

.card__subtitle {
  margin-top: 0.2rem;
  font-size: 0.82rem;
  color: var(--color-text-subtle);
}

.card__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card__price {
  font-size: 0.92rem;
  letter-spacing: 0.04em;
}
</style>
