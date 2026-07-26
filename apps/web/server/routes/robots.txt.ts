export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const origin = String(config.public.siteUrl || 'http://localhost:3000').replace(/\/$/, '')

  const body = `User-agent: *
Allow: /
Disallow: /cart
Disallow: /checkout
Disallow: /api/

Sitemap: ${origin}/sitemap.xml
`

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  return body
})
