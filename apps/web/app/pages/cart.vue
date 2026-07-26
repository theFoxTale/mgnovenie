<script setup lang="ts">
const cart = useCartStore()

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}
</script>

<template>
  <div class="cart page">
    <div class="container">
      <h1>Корзина</h1>

      <div v-if="!cart.items.length" class="cart__empty">
        <p class="muted">Пока пусто. Выберите свечу из коллекции.</p>
        <NuxtLink to="/collection" class="btn">Перейти в коллекцию</NuxtLink>
      </div>

      <div v-else class="cart__layout">
        <ul class="cart__list">
          <li v-for="item in cart.items" :key="item.productId" class="cart__item">
            <img :src="item.image" :alt="item.name" />
            <div>
              <NuxtLink :to="`/product/${item.slug}`">{{ item.name }}</NuxtLink>
              <p class="muted">{{ item.subtitle }}</p>
              <p>{{ formatPrice(item.price) }}</p>
            </div>
            <div class="qty">
              <button type="button" @click="cart.setQuantity(item.productId, item.quantity - 1)">−</button>
              <span>{{ item.quantity }}</span>
              <button type="button" @click="cart.setQuantity(item.productId, item.quantity + 1)">+</button>
            </div>
            <button class="cart__remove" type="button" @click="cart.removeItem(item.productId)">Удалить</button>
          </li>
        </ul>

        <aside class="summary">
          <h2>Итого</h2>
          <p class="summary__total">{{ formatPrice(cart.total) }}</p>
          <p class="muted">Доставка рассчитывается при оформлении.</p>
          <NuxtLink to="/checkout" class="btn">Оформить заказ</NuxtLink>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart {
  padding: 2.5rem 0 4rem;
}

.cart h1 {
  font-size: 2.4rem;
  margin-bottom: 1.75rem;
}

.cart__empty {
  display: grid;
  gap: 1.25rem;
  justify-items: start;
}

.cart__layout {
  display: grid;
  grid-template-columns: 1.6fr 0.8fr;
  gap: 2rem;
  align-items: start;
}

.cart__list {
  display: grid;
  gap: 1rem;
}

.cart__item {
  display: grid;
  grid-template-columns: 5.5rem 1fr auto auto;
  gap: 1rem;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.cart__item img {
  width: 5.5rem;
  aspect-ratio: 1;
  object-fit: cover;
  background: var(--color-panel);
}

.qty {
  display: inline-flex;
  border: 1px solid var(--color-border);
}

.qty button,
.qty span {
  width: 2.2rem;
  height: 2.2rem;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
}

.qty button {
  cursor: pointer;
}

.cart__remove {
  border: 0;
  background: transparent;
  color: var(--color-text-subtle);
  cursor: pointer;
}

.summary {
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  background: var(--color-panel);
  display: grid;
  gap: 0.85rem;
}

.summary__total {
  font-size: 1.6rem;
}

@media (max-width: 800px) {
  .cart__layout,
  .cart__item {
    grid-template-columns: 1fr;
  }
}
</style>
