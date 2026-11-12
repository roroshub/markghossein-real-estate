import { describe, it, expect } from 'vitest'
import { renderBody, parseSchemaInput, jsonLdString } from '@/lib/post-html'
import { parseInput } from '@/lib/blog-input'
import { imageKey } from '@/lib/blog-images'

describe('renderBody', () => {
  it('demotes body <h1> to <h2>, keeping attributes', () => {
    expect(renderBody('<h1 class="x">Probate</h1><p>a</p><h1>B</h1>')).toBe(
      '<h2 class="x">Probate</h2><p>a</p><h2>B</h2>',
    )
  })
  it('lazy-loads body images unless loading is already set', () => {
    expect(renderBody('<img src="/a.webp" alt="A" />')).toBe('<img src="/a.webp" alt="A" loading="lazy" decoding="async">')
    expect(renderBody('<img src="/a.webp" loading="eager">')).toBe('<img src="/a.webp" loading="eager" decoding="async">')
  })
  it('leaves <h10>-like and other tags alone', () => {
    expect(renderBody('<header><h2>x</h2></header>')).toBe('<header><h2>x</h2></header>')
  })
})

describe('parseSchemaInput', () => {
  const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [] }
  it('accepts empty input', () => {
    expect(parseSchemaInput('  ')).toEqual({ ok: true, value: [] })
  })
  it('accepts raw JSON', () => {
    expect(parseSchemaInput(JSON.stringify(faq))).toEqual({ ok: true, value: [faq] })
  })
  it('accepts a pasted <script> tag, and several of them', () => {
    const tag = `<script type="application/ld+json">${JSON.stringify(faq)}</script>`
    expect(parseSchemaInput(tag)).toEqual({ ok: true, value: [faq] })
    expect(parseSchemaInput(tag + '\n' + tag)).toEqual({ ok: true, value: [faq, faq] })
  })
  it('flattens arrays', () => {
    expect(parseSchemaInput(JSON.stringify([faq, faq]))).toEqual({ ok: true, value: [faq, faq] })
  })
  it('rejects invalid JSON and non-objects', () => {
    expect(parseSchemaInput('{"@type": "FAQPage",}').ok).toBe(false)
    expect(parseSchemaInput('"just a string"').ok).toBe(false)
  })
})

describe('jsonLdString', () => {
  it('cannot close the surrounding script tag', () => {
    const out = jsonLdString({ name: '</script><script>alert(1)</script>' })
    expect(out).not.toContain('</script>')
    expect(JSON.parse(out)).toEqual({ name: '</script><script>alert(1)</script>' })
  })
})

describe('parseInput (blog admin)', () => {
  const base = { title: 'What Probate Means', body_html: '<p>x</p>' }
  it('keeps SEO title, meta description and cover alt; blanks become null', () => {
    const p = parseInput({ ...base, seo_title: ' Probate in Ottawa ', meta_description: '', cover_alt: 'House' })
    expect(p).toMatchObject({ seo_title: 'Probate in Ottawa', meta_description: null, cover_alt: 'House', schema_jsonld: null })
  })
  it('stores schema as normalised JSON with script tags stripped', () => {
    const p = parseInput({ ...base, schema_jsonld: '<script type="application/ld+json">{"@type":"FAQPage"}</script>' })
    expect('error' in p).toBe(false)
    if (!('error' in p)) expect(JSON.parse(p.schema_jsonld!)).toEqual({ '@type': 'FAQPage' })
  })
  it('refuses to save invalid schema', () => {
    const p = parseInput({ ...base, schema_jsonld: '{oops' })
    expect('error' in p && p.error).toMatch(/not valid JSON/)
  })
})

describe('imageKey', () => {
  it('builds a safe unique key with the right extension', () => {
    const k = imageKey('My House PHOTO (1).JPG', 'image/webp')
    expect(k).toMatch(/^my-house-photo-1-[0-9a-f]{8}\.webp$/)
    expect(imageKey('My House PHOTO (1).JPG', 'image/webp')).not.toBe(k)
    expect(imageKey('...', 'image/jpeg')).toMatch(/^image-[0-9a-f]{8}\.jpg$/)
  })
})
