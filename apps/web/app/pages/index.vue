<script setup lang="ts">
const { data: collections } = await useFetch('/api/collections')
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero__content container">
        <div class="hero__copy">
          <h1>
            Искусство<br />
            создавать<br />
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
          <li><span>✦</span> Пчелиный воск</li>
          <li><span>❀</span> Натуральные ароматы</li>
          <li><span>◎</span> Ручная работа</li>
          <li><span>❐</span> Экологичное производство</li>
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
            Мы верим в силу натуральных материалов и ручного труда. Каждая свеча создана с вниманием к деталям и с уважением к природе.
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
  background:
    radial-gradient(ellipse at 70% 35%, rgba(120, 95, 60, 0.18), transparent 50%),
    linear-gradient(180deg, #1a1713 0%, #0f0e0c 100%);
  overflow: hidden;
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
  font-size: clamp(2.8rem, 6vw, 4.8rem);
  font-weight: 500;
  letter-spacing: 0.02em;
  margin-bottom: 1.25rem;
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
  align-items: center;
  gap: 0.7rem;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

.hero__features span {
  opacity: 0.7;
}

.collections {
  background: var(--color-cream);
  color: var(--color-text-on-cream);
  padding: 3.5rem 0;
}

.collections__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  color: rgba(42, 37, 31, 0.6);
  font-size: 0.88rem;
}

.collections__card span {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
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
  margin-top: 1rem;
  max-width: 28rem;
  color: var(--color-text-muted);
}

.about-strip__link {
  display: inline-block;
  margin-top: 1.5rem;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
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
  color: var(--color-text-subtle);
  font-size: 0.88rem;
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
    justify-self: center;
    grid-template-columns: 1fr 1fr;
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
