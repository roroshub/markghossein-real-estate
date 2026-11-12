import { neon } from '@neondatabase/serverless'
export { TARGET_PAGES } from './blog-pages'

export type Post = {
  id: number
  slug: string
  title: string
  excerpt: string
  body_html: string
  pages: string[]
  cover_image: string | null
  cover_alt: string | null
  seo_title: string | null
  meta_description: string | null
  schema_jsonld: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export type PostInput = {
  slug: string
  title: string
  excerpt: string
  body_html: string
  pages: string[]
  cover_image?: string | null
  cover_alt?: string | null
  seo_title?: string | null
  meta_description?: string | null
  schema_jsonld?: string | null
  published: boolean
}

// Lazy client so `next build` never fails when DATABASE_URL is absent at import time.
let _sql: ReturnType<typeof neon> | null = null
export function db() {
  if (!_sql) {
    const url = process.env.DATABASE_URL
    if (!url) throw new Error('DATABASE_URL is not set')
    _sql = neon(url)
  }
  return _sql
}

let schemaReady: Promise<void> | null = null
export function ensureSchema() {
  if (!schemaReady) {
    const sql = db()
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS posts (
          id          SERIAL PRIMARY KEY,
          slug        TEXT UNIQUE NOT NULL,
          title       TEXT NOT NULL,
          excerpt     TEXT NOT NULL DEFAULT '',
          body_html   TEXT NOT NULL DEFAULT '',
          pages       TEXT[] NOT NULL DEFAULT '{}',
          cover_image TEXT,
          published   BOOLEAN NOT NULL DEFAULT true,
          created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `
      // Per-post SEO overrides (added Nov 2026). Empty = fall back to title / excerpt.
      await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS seo_title TEXT`
      await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS meta_description TEXT`
      await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS cover_alt TEXT`
      await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS schema_jsonld TEXT`
      await sql`
        CREATE TABLE IF NOT EXISTS blog_images (
          id         SERIAL PRIMARY KEY,
          key        TEXT UNIQUE NOT NULL,
          mime       TEXT NOT NULL,
          data_b64   TEXT NOT NULL,
          alt        TEXT NOT NULL DEFAULT '',
          width      INTEGER,
          height     INTEGER,
          bytes      INTEGER NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `
    })()
  }
  return schemaReady
}

export async function listPublished(page?: string): Promise<Post[]> {
  await ensureSchema()
  const sql = db()
  const rows = page
    ? await sql`SELECT * FROM posts WHERE published = true AND ${page} = ANY(pages) ORDER BY created_at DESC`
    : await sql`SELECT * FROM posts WHERE published = true ORDER BY created_at DESC`
  return rows as unknown as Post[]
}

export async function listAll(): Promise<Post[]> {
  await ensureSchema()
  const rows = (await db()`SELECT * FROM posts ORDER BY created_at DESC`) as unknown as Post[]
  return rows
}

export async function getBySlug(slug: string): Promise<Post | null> {
  await ensureSchema()
  const rows = (await db()`SELECT * FROM posts WHERE slug = ${slug} LIMIT 1`) as unknown as Post[]
  return rows[0] ?? null
}

export async function getById(id: number): Promise<Post | null> {
  await ensureSchema()
  const rows = (await db()`SELECT * FROM posts WHERE id = ${id} LIMIT 1`) as unknown as Post[]
  return rows[0] ?? null
}

export async function createPost(p: PostInput): Promise<Post> {
  await ensureSchema()
  const rows = (await db()`
    INSERT INTO posts (slug, title, excerpt, body_html, pages, cover_image, cover_alt, seo_title, meta_description, schema_jsonld, published)
    VALUES (${p.slug}, ${p.title}, ${p.excerpt}, ${p.body_html}, ${p.pages as unknown as string}, ${p.cover_image ?? null},
            ${p.cover_alt ?? null}, ${p.seo_title ?? null}, ${p.meta_description ?? null}, ${p.schema_jsonld ?? null}, ${p.published})
    RETURNING *
  `) as unknown as Post[]
  return rows[0]!
}

export async function updatePost(id: number, p: PostInput): Promise<Post | null> {
  await ensureSchema()
  const rows = (await db()`
    UPDATE posts
    SET slug = ${p.slug}, title = ${p.title}, excerpt = ${p.excerpt},
        body_html = ${p.body_html}, pages = ${p.pages as unknown as string},
        cover_image = ${p.cover_image ?? null}, seo_title = ${p.seo_title ?? null},
        meta_description = ${p.meta_description ?? null}, cover_alt = ${p.cover_alt ?? null},
        schema_jsonld = ${p.schema_jsonld ?? null}, published = ${p.published},
        updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `) as unknown as Post[]
  return rows[0] ?? null
}

export async function deletePost(id: number): Promise<void> {
  await ensureSchema()
  await db()`DELETE FROM posts WHERE id = ${id}`
}
