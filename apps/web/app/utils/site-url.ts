/** Absolute origin helper — no trailing slash. */
export function normalizeSiteOrigin(siteUrl: string) {
  return String(siteUrl || 'http://localhost:3000').replace(/\/$/, '')
}

export function toAbsoluteUrl(origin: string, path: string) {
  if (!path || path === '/') return origin
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`
}
