// Helpers for rendering a stored blog post (safe to import on server or client).

/**
 * Prepare stored body HTML for the page:
 *  - the hero already renders the post title as the only <h1>, so body <h1>s become <h2>
 *  - every body image lazy-loads and decodes async unless it says otherwise
 */
export function renderBody(html: string): string {
  return html
    .replace(/<h1(\s[^>]*)?>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>')
    .replace(/<img\b([^>]*)>/gi, (_m, attrs: string) => {
      let a = attrs.replace(/\s*\/\s*$/, '')
      if (!/\sloading=/i.test(a)) a += ' loading="lazy"'
      if (!/\sdecoding=/i.test(a)) a += ' decoding="async"'
      return `<img${a}>`
    })
}

/**
 * Parse the admin's "Schema (JSON-LD)" box. Accepts raw JSON or pasted
 * <script type="application/ld+json"> tags. Returns the parsed objects or an error.
 */
export function parseSchemaInput(raw: string): { ok: true; value: object[] } | { ok: false; error: string } {
  const text = raw.trim()
  if (!text) return { ok: true, value: [] }
  const blocks = /<script/i.test(text)
    ? Array.from(text.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi), (m) => (m[1] ?? '').trim())
    : [text]
  if (blocks.length === 0) return { ok: false, error: 'Could not find JSON inside the <script> tag' }
  const out: object[] = []
  for (const b of blocks) {
    let v: unknown
    try {
      v = JSON.parse(b)
    } catch (e) {
      return { ok: false, error: `Schema is not valid JSON: ${e instanceof Error ? e.message : 'parse error'}` }
    }
    if (typeof v !== 'object' || v === null) return { ok: false, error: 'Schema must be a JSON object or array' }
    if (Array.isArray(v)) out.push(...(v as object[]))
    else out.push(v)
  }
  return { ok: true, value: out }
}

/** JSON for a <script type="application/ld+json">, safe against "</script>" inside strings. */
export const jsonLdString = (v: unknown) => JSON.stringify(v).replace(/</g, '\\u003c')
