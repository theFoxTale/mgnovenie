import { normalizeSiteOrigin, toAbsoluteUrl } from '~/utils/site-url'

type MaybeRefOrGetter<T> = T | (() => T)

function resolve<T>(value: MaybeRefOrGetter<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value
}

/** Absolute origin from `runtimeConfig.public.siteUrl` (no trailing slash). */
export function useSiteOrigin() {
  const config = useRuntimeConfig()
  return normalizeSiteOrigin(String(config.public.siteUrl || ''))
}

/**
 * Phase 1 SEO: title/description, Open Graph, Twitter, and canonical from siteUrl.
 * Prefer `@nuxtjs/seo` later for sitemap modules / schema.org automation.
 */
export function usePageSeo(options: {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  path: MaybeRefOrGetter<string>
  ogImage?: MaybeRefOrGetter<string | undefined>
  ogType?: string
  robots?: MaybeRefOrGetter<string | undefined>
}) {
  const origin = useSiteOrigin()

  const canonical = computed(() => toAbsoluteUrl(origin, resolve(options.path)))
  const title = computed(() => resolve(options.title))
  const description = computed(() => resolve(options.description))
  const ogImage = computed(() => {
    if (!options.ogImage) return undefined
    return resolve(options.ogImage)
  })
  const robots = computed(() => (options.robots ? resolve(options.robots) : undefined))

  useSeoMeta({
    title: () => title.value,
    description: () => description.value,
    ogTitle: () => title.value,
    ogDescription: () => description.value,
    ogImage: () => ogImage.value,
    ogUrl: () => canonical.value,
    ogType: options.ogType || 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: () => title.value,
    twitterDescription: () => description.value,
    twitterImage: () => ogImage.value,
    robots: () => robots.value,
  })

  useHead({
    link: computed(() => [{ rel: 'canonical', href: canonical.value }]),
  })
}
