<script setup lang="ts">
usePageSeo({
  title: 'Отзывы — MGNOVENIE',
  description: 'Отзывы о натуральных свечах MGNOVENIE. Раздел в подготовке.',
  path: '/reviews',
  ogImage: `${useSiteOrigin()}/products/hvoinyi-les.webp`,
})
</script>

<template>
  <div class="stub page">
    <div class="container">
      <h1>Отзывы</h1>
      <p class="muted">
        Раздел отзывов появится позже. Пока вы можете написать нам на странице контактов.
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
