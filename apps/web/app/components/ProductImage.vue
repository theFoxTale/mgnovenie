<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    width?: number
    height?: number
    loading?: 'lazy' | 'eager'
    fetchpriority?: 'high' | 'low' | 'auto'
  }>(),
  {
    width: 800,
    height: 1000,
    loading: 'lazy',
    fetchpriority: 'auto',
  },
)

const avifSrc = computed(() => props.src.replace(/\.webp$/i, '.avif'))
const hasModern = computed(() => /\.webp$/i.test(props.src))
</script>

<template>
  <picture>
    <source v-if="hasModern" type="image/avif" :srcset="avifSrc" />
    <source v-if="hasModern" type="image/webp" :srcset="src" />
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      :fetchpriority="fetchpriority"
      decoding="async"
    />
  </picture>
</template>
