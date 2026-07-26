<script setup lang="ts">
const cart = useCartStore()
const route = useRoute()
const menuOpen = ref(false)

const links = [
  { to: '/collection', label: 'Коллекции' },
  { to: '/about', label: 'О нас' },
  { to: '/materials', label: 'Материалы' },
  { to: '/reviews', label: 'Отзывы' },
  { to: '/contacts', label: 'Контакты' },
]

watch(() => route.fullPath, () => {
  menuOpen.value = false
})
</script>

<template>
  <header class="header">
    <div class="header__inner container">
      <button class="header__menu" type="button" aria-label="Меню" @click="menuOpen = !menuOpen">
        <span />
        <span />
        <span />
      </button>

      <nav class="header__nav" :class="{ 'is-open': menuOpen }" aria-label="Основная навигация">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="header__link">
          {{ link.label }}
        </NuxtLink>
      </nav>

      <NuxtLink to="/" class="header__brand">
        <span class="header__logo">MGNOVENIE</span>
        <span class="header__tag">moment</span>
      </NuxtLink>

      <div class="header__actions">
        <NuxtLink to="/collection" class="header__icon" aria-label="Поиск">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </NuxtLink>
        <NuxtLink to="/cart" class="header__icon header__cart" aria-label="Корзина">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 8h12l-1 12H7L6 8z" stroke="currentColor" stroke-width="1.5" />
            <path d="M9 8a3 3 0 016 0" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <span>({{ cart.itemCount }})</span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  height: var(--header-h);
  background: var(--color-cream);
  color: var(--color-text-on-cream);
  border-bottom: 1px solid rgba(42, 37, 31, 0.08);
}

.header__inner {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
}

.header__menu {
  display: none;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.header__menu span {
  display: block;
  width: 1.15rem;
  height: 1px;
  margin: 0.28rem auto;
  background: currentColor;
}

.header__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.1rem;
  align-items: center;
}

.header__link {
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(42, 37, 31, 0.72);
  transition: color var(--dur-fast) var(--ease-out);
}

.header__link:hover,
.header__link.router-link-active {
  color: var(--color-text-on-cream);
}

.header__brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.header__logo {
  font-family: var(--font-display);
  font-size: 1.45rem;
  letter-spacing: 0.22em;
  font-weight: 500;
}

.header__tag {
  margin-top: -0.15rem;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.85rem;
  color: rgba(42, 37, 31, 0.55);
}

.header__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.85rem;
  align-items: center;
}

.header__icon {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: rgba(42, 37, 31, 0.8);
}

.header__cart span {
  opacity: 0.7;
}

@media (max-width: 900px) {
  .header__menu {
    display: block;
    justify-self: start;
  }

  .header__nav {
    position: absolute;
    top: var(--header-h);
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 0.5rem 1rem 1rem;
    background: var(--color-cream);
    border-bottom: 1px solid rgba(42, 37, 31, 0.08);
  }

  .header__nav.is-open {
    display: flex;
  }

  .header__link {
    width: 100%;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(42, 37, 31, 0.08);
  }

  .header__inner {
    grid-template-columns: auto 1fr auto;
  }
}
</style>
