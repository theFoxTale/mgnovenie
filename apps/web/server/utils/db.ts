import pg from 'pg'

const { Pool } = pg

let pool: pg.Pool | null = null

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL)
}

export function getPool() {
  if (!hasDatabase()) {
    throw new Error('DATABASE_URL is not configured')
  }
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL })
  }
  return pool
}

export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params: unknown[] = [],
) {
  const result = await getPool().query<T>(text, params)
  return result
}
