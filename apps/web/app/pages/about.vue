<script setup lang="ts">
usePageSeo({
  title: 'О нас — MGNOVENIE',
  description:
    'MGNOVENIE — мастерская натуральных свечей из пчелиного воска для тихих вечеров и особенных подарков.',
  path: '/about',
  ogImage: `${useSiteOrigin()}/products/hvoinyi-les.webp`,
})
</script>

<template>
  <div class="stub page">
    <div class="container">
      <h1>О нас</h1>
      <p class="muted">
        MGNOVENIE — мастерская натуральных свечей из пчелиного воска. Мы создаём ароматы для тихих
        вечеров, утренней ясности и особенных подарков.
      </p>
    </div>
  </div>
</template>

<style scoped>
.stub {
  padding: 3rem 0 5rem;
}

.stub h1 {
  margin-bottom: 1rem;
  font-size: 2.6rem;
}

.stub p {
  max-width: 40rem;
}
</style>
