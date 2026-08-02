<script setup lang="ts">
import type { LocationQuery } from 'vue-router'
import type { Product } from '#shared/types/product'
import { filterAndPage } from '#shared/utils/filter-products'

const route = useRoute()
const router = useRouter()

const PAGE_SIZE = 10

type CollectionFilters = {
  scent: string
  purpose: string
  composition: string
  size: string
  sort: string
  page: number
}

function filtersFromQuery(query: LocationQuery): CollectionFilters {
  return {
    scent: typeof query.scent === 'string' ? query.scent : 'all',
    purpose: typeof query.purpose === 'string' ? query.purpose : 'all',
    composition: typeof query.composition === 'string' ? query.composition : 'all',
    size: typeof query.size === 'string' ? query.size : 'all',
    sort: typeof query.sort === 'string' ? query.sort : 'newest',
    page: Number(query.page || 1) || 1,
  }
}

function queryFromFilters(value: CollectionFilters) {
  return {
    scent: value.scent === 'all' ? undefined : value.scent,
    purpose: value.purpose === 'all' ? undefined : value.purpose,
    composition: value.composition === 'all' ? undefined : value.composition,
    size: value.size === 'all' ? undefined : value.size,
    sort: value.sort === 'newest' ? undefined : value.sort,
    page: value.page > 1 ? String(value.page) : undefined,
  }
}

function sameQuery(a: LocationQuery, b: ReturnType<typeof queryFromFilters>) {
  const keys = ['scent', 'purpose', 'composition', 'size', 'sort', 'page'] as const
  return keys.every((key) => String(a[key] ?? '') === String(b[key] ?? ''))
}

const filters = reactive<CollectionFilters>(filtersFromQuery(route.query))

// One catalog fetch — filter/sort/page locally (works without Postgres).
const { data: catalog, error: catalogError } = await useFetch<{
  items: Product[]
  total: number
}>('/api/products', {
  query: { page: 1, pageSize: 24 },
  key: 'collection-catalog',
})

const catalogItems = computed(() => catalog.value?.items || [])

const view = computed(() =>
  filterAndPage(catalogItems.value, {
    scent: filters.scent,
    purpose: filters.purpose,
    composition: filters.composition,
    size: filters.size,
    sort: filters.sort,
    page: filters.page,
    pageSize: PAGE_SIZE,
  }),
)

const origin = useSiteOrigin()
usePageSeo({
  title: 'Коллекция свечей — MGNOVENIE',
  description:
    'Каталог натуральных свечей из пчелиного воска: фильтры по аромату, назначению и размеру.',
  path: '/collection',
  ogImage: () => {
    const first = view.value.items[0] || catalogItems.value[0]
    return first ? `${origin}${first.image}` : `${origin}/products/hvoinyi-les.webp`
  },
})

function syncUrl() {
  const next = queryFromFilters(filters)
  if (sameQuery(route.query, next)) return
  return router.replace({ query: next })
}

/** Select change: v-model already updated `filters`; reset page and mirror URL. */
function onFacetChange() {
  filters.page = 1
  syncUrl()
}

function setPage(page: number) {
  filters.page = page
  syncUrl()
}

// Back/forward only — do not fight with select v-model.
onBeforeRouteUpdate((to) => {
  Object.assign(filters, filtersFromQuery(to.query))
})
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
        <span class="filters__label">Фильтры</span>
        <select v-model="filters.scent" aria-label="Аромат" @change="onFacetChange">
          <option value="all">Все ароматы</option>
          <option value="пихта">Пихта</option>
          <option value="мёд">Мёд</option>
          <option value="ваниль">Ваниль</option>
          <option value="лаванда">Лаванда</option>
          <option value="корица">Корица</option>
        </select>
        <select v-model="filters.purpose" aria-label="Назначение" @change="onFacetChange">
          <option value="all">Назначение</option>
          <option value="для дома">Для дома</option>
          <option value="для подарка">Для подарка</option>
        </select>
        <select v-model="filters.composition" aria-label="Состав" @change="onFacetChange">
          <option value="all">Состав</option>
          <option value="пчелиный воск">Пчелиный воск</option>
          <option value="эфирные масла">Эфирные масла</option>
        </select>
        <select v-model="filters.size" aria-label="Размер" @change="onFacetChange">
          <option value="all">Размер</option>
          <option value="small">Малый</option>
          <option value="medium">Средний</option>
          <option value="large">Большой</option>
        </select>
        <select
          v-model="filters.sort"
          class="filters__sort"
          aria-label="Сортировка"
          @change="onFacetChange"
        >
          <option value="newest">Сначала новые</option>
          <option value="price-asc">Цена ↑</option>
          <option value="price-desc">Цена ↓</option>
          <option value="name">По названию</option>
        </select>
      </div>

      <p v-if="catalogError" class="muted">Не удалось загрузить каталог. Обновите страницу.</p>
      <p v-else class="results muted">Найдено: {{ view.total }}</p>

      <div class="grid">
        <ProductCard v-for="product in view.items" :key="product.id" :product="product" />
      </div>

      <div v-if="view.pageCount > 1" class="pager">
        <button
          class="btn--icon"
          type="button"
          :disabled="filters.page <= 1"
          @click="setPage(filters.page - 1)"
        >
          ‹
        </button>
        <button
          v-for="page in view.pageCount"
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
          :disabled="filters.page >= view.pageCount"
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
  margin: 1.5rem 0 1rem;
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
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  color: var(--color-text-on-cream);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  background: var(--color-cream);
}

.results {
  margin-bottom: 1.25rem;
  font-size: 0.85rem;
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
