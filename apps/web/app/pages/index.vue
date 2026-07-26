<script setup lang="ts">
import type { CollectionCard } from '#shared/types/catalog'

const { data: collections } = await useFetch<{ items: CollectionCard[] }>('/api/collections')

const config = useRuntimeConfig()
const homeTitle = 'MGNOVENIE — натуральные свечи'
const homeDescription =
  'Натуральные свечи ручной работы из пчелиного воска. Искусство создавать мгновения.'

useSeoMeta({
  title: homeTitle,
  description: homeDescription,
  ogTitle: homeTitle,
  ogDescription: homeDescription,
  ogImage: `${config.public.siteUrl}/products/hvoinyi-les.svg`,
  ogType: 'website',
})
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero__content container">
        <div class="hero__copy">
          <h1>
            Искусство
            <br />
            создавать
            <br />
            мгновения
          </h1>
          <p class="eyebrow">Натуральные свечи ручной работы из пчелиного воска</p>
          <NuxtLink to="/collection" class="btn">
            Перейти в коллекцию
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>

        <div class="hero__visual" aria-hidden="true">
          <img src="/products/hvoinyi-les.svg" alt="" />
        </div>

        <ul class="hero__features">
          <li>
            <span>✦</span>
            Пчелиный воск
          </li>
          <li>
            <span>❀</span>
            Натуральные ароматы
          </li>
          <li>
            <span>◎</span>
            Ручная работа
          </li>
          <li>
            <span>❐</span>
            Экологичное производство
          </li>
        </ul>
      </div>
    </section>

    <section class="collections">
      <div class="container">
        <div class="collections__head">
          <h2 class="eyebrow">Коллекции</h2>
          <NuxtLink to="/collection" class="collections__all">Смотреть все →</NuxtLink>
        </div>
        <div class="collections__grid">
          <NuxtLink
            v-for="item in collections?.items || []"
            :key="item.slug"
            :to="`/product/${item.productSlug}`"
            class="collections__card"
          >
            <img :src="item.image" :alt="item.title" />
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.subtitle }}</p>
              <span>Смотреть →</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="about-strip">
      <div class="container about-strip__grid">
        <div>
          <h2 class="eyebrow">О наших свечах</h2>
          <p>
            Мы верим в силу натуральных материалов и ручного труда. Каждая свеча создана с вниманием
            к деталям и с уважением к природе.
          </p>
          <NuxtLink to="/about" class="about-strip__link">Подробнее о нас →</NuxtLink>
        </div>
        <ul class="about-strip__points">
          <li>
            <strong>Пчелиный воск</strong>
            <span>Чистый и натуральный воск с пасек России</span>
          </li>
          <li>
            <strong>Эфирные масла</strong>
            <span>Натуральные ароматы происхождения</span>
          </li>
          <li>
            <strong>Ручная работа</strong>
            <span>Каждая свеча создана вручную с любовью</span>
          </li>
          <li>
            <strong>Экологичная упаковка</strong>
            <span>Упаковка из переработанной бумаги и стекла</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: calc(100vh - var(--header-h));
  overflow: hidden;
  background:
    radial-gradient(ellipse at 70% 35%, rgba(120, 95, 60, 0.18), transparent 50%),
    linear-gradient(180deg, #1a1713 0%, #0f0e0c 100%);
}

.hero__content {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 1.2fr 0.7fr;
  gap: 1.5rem;
  align-items: center;
  min-height: calc(100vh - var(--header-h));
  padding-block: 3rem;
}

.hero__copy h1 {
  margin-bottom: 1.25rem;
  font-size: clamp(2.8rem, 6vw, 4.8rem);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.hero__copy .eyebrow {
  max-width: 18rem;
  margin-bottom: 2rem;
  line-height: 1.7;
}

.hero__visual {
  justify-self: center;
  width: min(100%, 28rem);
  animation: rise 1.1s var(--ease-out) both;
}

.hero__visual img {
  width: 100%;
  filter: drop-shadow(0 30px 50px rgba(0, 0, 0, 0.45));
}

.hero__features {
  display: grid;
  gap: 1.1rem;
  justify-self: end;
}

.hero__features li {
  display: flex;
  gap: 0.7rem;
  align-items: center;
  font-size: 0.78rem;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
}

.hero__features span {
  opacity: 0.7;
}

.collections {
  padding: 3.5rem 0;
  color: var(--color-text-on-cream);
  background: var(--color-cream);
}

.collections__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;
}

.collections__all {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
}

.collections__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.collections__card {
  display: grid;
  gap: 0.85rem;
}

.collections__card img {
  aspect-ratio: 4 / 5;
  object-fit: cover;
  background: #1c1915;
}

.collections__card h3 {
  font-size: 1.35rem;
}

.collections__card p {
  margin: 0.25rem 0 0.55rem;
  font-size: 0.88rem;
  color: rgba(42, 37, 31, 0.6);
}

.collections__card span {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.about-strip {
  padding: 3.5rem 0;
  background: var(--color-ink-soft);
  border-top: 1px solid var(--color-border);
}

.about-strip__grid {
  display: grid;
  grid-template-columns: 1.1fr 1.4fr;
  gap: 2.5rem;
  align-items: start;
}

.about-strip p {
  max-width: 28rem;
  margin-top: 1rem;
  color: var(--color-text-muted);
}

.about-strip__link {
  display: inline-block;
  margin-top: 1.5rem;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.about-strip__points {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.about-strip__points strong {
  display: block;
  margin-bottom: 0.35rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  letter-spacing: 0.06em;
}

.about-strip__points span {
  font-size: 0.88rem;
  color: var(--color-text-subtle);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 960px) {
  .hero__content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero__copy .eyebrow {
    margin-inline: auto;
  }

  .hero__features {
    grid-template-columns: 1fr 1fr;
    justify-self: center;
  }

  .collections__grid,
  .about-strip__grid,
  .about-strip__points {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .collections__grid,
  .about-strip__points,
  .hero__features {
    grid-template-columns: 1fr;
  }
}
</style>
