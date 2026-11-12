import { TARGET_PAGES } from './blog-pages'
import type { PostInput } from './blog'
import { parseSchemaInput } from './post-html'

const VALID_PAGES = new Set(TARGET_PAGES.map((p) => p.key))

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function parseInput(body: Record<string, unknown>): PostInput | { error: string } {
  const title = String(body.title ?? '').trim()
  if (!title) return { error: 'Title is required' }
  const slug = slugify(String(body.slug ?? '') || title)
  if (!slug) return { error: 'Could not derive a slug from the title' }
  const pagesRaw = Array.isArray(body.pages) ? body.pages.map(String) : []
  const pages = pagesRaw.filter((p) => VALID_PAGES.has(p))
  const schemaRaw = String(body.schema_jsonld ?? '').trim()
  const schema = parseSchemaInput(schemaRaw)
  if (!schema.ok) return { error: schema.error }
  return {
    slug,
    title,
    excerpt: String(body.excerpt ?? '').trim(),
    body_html: String(body.body_html ?? ''),
    pages,
    cover_image: body.cover_image ? String(body.cover_image).trim() : null,
    cover_alt: String(body.cover_alt ?? '').trim() || null,
    // Stored as normalised JSON (script tags stripped); rendered on the post page.
    schema_jsonld: schema.value.length ? JSON.stringify(schema.value.length === 1 ? schema.value[0] : schema.value, null, 2) : null,
    seo_title: String(body.seo_title ?? '').trim() || null,
    meta_description: String(body.meta_description ?? '').trim() || null,
    published: body.published !== false,
  }
}
