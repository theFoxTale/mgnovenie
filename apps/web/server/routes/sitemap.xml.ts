import { getAllProducts } from '../utils/catalog'

function xmlEscape(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const origin = String(config.public.siteUrl || 'http://localhost:3000').replace(/\/$/, '')

  const staticPaths = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/collection', priority: '0.9', changefreq: 'daily' },
    { path: '/about', priority: '0.5', changefreq: 'monthly' },
    { path: '/materials', priority: '0.5', changefreq: 'monthly' },
    { path: '/reviews', priority: '0.5', changefreq: 'monthly' },
    { path: '/contacts', priority: '0.5', changefreq: 'monthly' },
  ]

  const products = await getAllProducts()
  const productEntries = products.map((product) => ({
    path: `/product/${product.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
  }))

  const urls = [...staticPaths, ...productEntries]
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${xmlEscape(`${origin}${entry.path === '/' ? '' : entry.path}`)}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=600, stale-while-revalidate=3600')
  return body
})
