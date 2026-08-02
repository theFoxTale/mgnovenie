import pg from 'pg'

const { Pool } = pg

let pool: pg.Pool | null = null

export function getDatabaseUrl() {
  const config = useRuntimeConfig()
  return String(config.databaseUrl || '').trim()
}

export function hasDatabase() {
  return Boolean(getDatabaseUrl())
}

export function getPool() {
  const databaseUrl = getDatabaseUrl()
  if (!databaseUrl) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Database is not configured (NUXT_DATABASE_URL)',
    })
  }
  if (!pool) {
    pool = new Pool({ connectionString: databaseUrl })
  }
  return pool
}

export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params: unknown[] = [],
) {
  try {
    return await getPool().query<T>(text, params)
  } catch (error) {
    console.error('[db] query failed', error)
    throw createError({
      statusCode: 503,
      statusMessage: 'Database unavailable',
    })
  }
}
