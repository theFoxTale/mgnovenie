<script setup lang="ts">
import type { Product } from '#shared/types/product'

const route = useRoute()
const router = useRouter()

function filtersFromRoute() {
  return {
    scent: typeof route.query.scent === 'string' ? route.query.scent : 'all',
    purpose: typeof route.query.purpose === 'string' ? route.query.purpose : 'all',
    composition: typeof route.query.composition === 'string' ? route.query.composition : 'all',
    size: typeof route.query.size === 'string' ? route.query.size : 'all',
    sort: typeof route.query.sort === 'string' ? route.query.sort : 'newest',
    page: Number(route.query.page || 1) || 1,
  }
}

const filters = reactive(filtersFromRoute())
let syncingFromRoute = false

const query = computed(() => ({
  scent: filters.scent,
  purpose: filters.purpose,
  composition: filters.composition,
  size: filters.size,
  sort: filters.sort,
  page: filters.page,
  pageSize: 10,
}))

// Single fetch path: useFetch watches `query` and refetches when filters change.
const { data } = await useFetch<{
  items: Product[]
  total: number
  page: number
  pageSize: number
  pageCount: number
}>('/api/products', { query })

const origin = useSiteOrigin()
const collectionTitle = 'Коллекция свечей — MGNOVENIE'
const collectionDescription =
  'Каталог натуральных свечей из пчелиного воска: фильтры по аромату, назначению и размеру.'

usePageSeo({
  title: collectionTitle,
  description: collectionDescription,
  path: '/collection',
  ogImage: () => {
    const first = data.value?.items?.[0]
    return first ? `${origin}${first.image}` : `${origin}/products/hvoinyi-les.webp`
  },
})

watch(
  () => route.query,
  () => {
    syncingFromRoute = true
    Object.assign(filters, filtersFromRoute())
    nextTick(() => {
      syncingFromRoute = false
    })
  },
)

watch(
  filters,
  () => {
    if (syncingFromRoute) return
    router.replace({
      query: {
        scent: filters.scent === 'all' ? undefined : filters.scent,
        purpose: filters.purpose === 'all' ? undefined : filters.purpose,
        composition: filters.composition === 'all' ? undefined : filters.composition,
        size: filters.size === 'all' ? undefined : filters.size,
        sort: filters.sort === 'newest' ? undefined : filters.sort,
        page: filters.page > 1 ? String(filters.page) : undefined,
      },
    })
  },
  { deep: true },
)

function setPage(page: number) {
  filters.page = page
}
</script>

<template>
  <div class="collection page">
    <div class="collection__hero">
      <div class="container">
        <nav class="crumbs muted">Главная / Коллекция</nav>
        <h1>Коллекция</h1>
        <p class="muted">
          Свечи из натурального пчелиного воска с эфирными маслами и деревянным фитилём. Для
          атмосферы и особых моментов.
        </p>
      </div>
    </div>

    <div class="container">
      <div class="filters">
        <button class="filters__label" type="button">Фильтры</button>
        <select v-model="filters.scent">
          <option value="all">Все ароматы</option>
          <option value="пихта">Пихта</option>
          <option value="мёд">Мёд</option>
          <option value="ваниль">Ваниль</option>
          <option value="лаванда">Лаванда</option>
          <option value="корица">Корица</option>
        </select>
        <select v-model="filters.purpose">
          <option value="all">Назначение</option>
          <option value="для дома">Для дома</option>
          <option value="для подарка">Для подарка</option>
        </select>
        <select v-model="filters.composition">
          <option value="all">Состав</option>
          <option value="пчелиный воск">Пчелиный воск</option>
          <option value="эфирные масла">Эфирные масла</option>
        </select>
        <select v-model="filters.size">
          <option value="all">Размер</option>
          <option value="small">Малый</option>
          <option value="medium">Средний</option>
          <option value="large">Большой</option>
        </select>
        <select v-model="filters.sort" class="filters__sort">
          <option value="newest">Сначала новые</option>
          <option value="price-asc">Цена ↑</option>
          <option value="price-desc">Цена ↓</option>
          <option value="name">По названию</option>
        </select>
      </div>

      <div class="grid">
        <ProductCard v-for="product in data?.items || []" :key="product.id" :product="product" />
      </div>

      <div class="pager">
        <button
          class="btn--icon"
          type="button"
          :disabled="filters.page <= 1"
          @click="setPage(filters.page - 1)"
        >
          ‹
        </button>
        <button
          v-for="page in data?.pageCount || 1"
          :key="page"
          class="pager__page"
          type="button"
          :class="{ 'is-active': page === filters.page }"
          @click="setPage(page)"
        >
          {{ page }}
        </button>
        <button
          class="btn--icon"
          type="button"
          :disabled="filters.page >= (data?.pageCount || 1)"
          @click="setPage(filters.page + 1)"
        >
          ›
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.collection {
  padding-bottom: 4rem;
}

.collection__hero {
  position: relative;
  padding: 2.5rem 0 2rem;
  background:
    linear-gradient(90deg, rgba(14, 12, 10, 0.88), rgba(14, 12, 10, 0.35)),
    radial-gradient(circle at 80% 20%, rgba(90, 70, 40, 0.35), transparent 45%);
}

.crumbs {
  margin-bottom: 1rem;
  font-size: 0.78rem;
}

.collection__hero h1 {
  margin-bottom: 0.85rem;
  font-size: clamp(2.4rem, 5vw, 3.6rem);
}

.collection__hero p {
  max-width: 34rem;
}

.filters {
  display: grid;
  grid-template-columns: auto repeat(4, 1fr) 1.1fr;
  gap: 0.65rem;
  padding: 0.65rem;
  margin: 1.5rem 0 2rem;
  background: rgba(233, 226, 214, 0.04);
  border: 1px solid var(--color-border);
}

.filters__label,
.filters select {
  min-height: 2.6rem;
  padding: 0 0.85rem;
  color: var(--color-text);
  background: rgba(233, 226, 214, 0.04);
  border: 1px solid var(--color-border);
}

.filters__label {
  font-size: 0.7rem;
  color: var(--color-text-on-cream);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  background: var(--color-cream);
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.25rem;
}

.pager {
  display: flex;
  gap: 0.45rem;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
}

.pager__page {
  min-width: 2.2rem;
  height: 2.2rem;
  color: var(--color-text-muted);
  cursor: pointer;
  background: transparent;
  border: 1px solid transparent;
}

.pager__page.is-active {
  color: var(--color-text);
  border-color: var(--color-border-strong);
}

@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .filters {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
