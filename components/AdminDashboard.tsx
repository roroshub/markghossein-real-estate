'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Post } from '@/lib/blog'
import { TARGET_PAGES } from '@/lib/blog-pages'

type Form = {
  id?: number
  title: string
  slug: string
  excerpt: string
  cover_image: string
  pages: string[]
  body_html: string
  published: boolean
}

const EMPTY: Form = {
  title: '', slug: '', excerpt: '', cover_image: '', pages: [], body_html: '', published: true,
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)

export function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<Form | null>(null)
  const [slugTouched, setSlugTouched] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(false)

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/posts')
    if (res.status === 401) { window.location.href = '/admin/login'; return }
    const j = await res.json()
    setPosts(j.posts ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const startNew = () => { setForm({ ...EMPTY }); setSlugTouched(false); setPreview(false); setError('') }
  const startEdit = (p: Post) => {
    setForm({
      id: p.id, title: p.title, slug: p.slug, excerpt: p.excerpt,
      cover_image: p.cover_image ?? '', pages: p.pages, body_html: p.body_html, published: p.published,
    })
    setSlugTouched(true); setPreview(false); setError('')
  }

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => (f ? { ...f, [k]: v } : f))

  async function save() {
    if (!form) return
    setSaving(true); setError('')
    const payload = { ...form, slug: form.slug || slugify(form.title) }
    const res = await fetch(form.id ? `/api/admin/posts/${form.id}` : '/api/admin/posts', {
      method: form.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    if (res.ok) { setForm(null); await load() }
    else { const j = await res.json().catch(() => ({})); setError(j.error || 'Could not save') }
  }

  async function remove(id: number) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
    if (form?.id === id) setForm(null)
    await load()
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  const input = 'w-full bg-ink-850 border border-white/10 text-white px-4 py-3 text-[14px] outline-none focus:border-gold-500 transition-colors'
  const label = 'block text-[10px] font-semibold tracking-[0.18em] uppercase text-white/40 mb-2'

  return (
    <main className="min-h-screen bg-ink-950 text-white">
      {/* Top bar */}
      <header className="border-b border-white/10 sticky top-0 bg-ink-950/95 backdrop-blur z-10">
        <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold-500 flex items-center justify-center">
              <span className="font-serif text-ink-950 text-[12px] font-semibold">MG</span>
            </div>
            <span className="font-serif text-[16px]">Blog Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/blog" target="_blank" className="text-[11px] tracking-wider uppercase text-white/50 hover:text-white">View blog ↗</a>
            <button onClick={logout} className="text-[11px] tracking-wider uppercase text-white/50 hover:text-white">Log out</button>
          </div>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
        {/* Post list */}
        <aside>
          <button onClick={startNew} className="w-full bg-gold-500 text-ink-950 py-3 text-[12px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-300 transition-colors mb-6">
            + New Post
          </button>
          {loading ? (
            <p className="text-white/40 text-[13px]">Loading…</p>
          ) : posts.length === 0 ? (
            <p className="text-white/40 text-[13px] leading-relaxed">No posts yet. Create your first one.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {posts.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => startEdit(p)}
                    className={`w-full text-left p-3 border transition-colors ${form?.id === p.id ? 'border-gold-500 bg-white/[0.03]' : 'border-white/10 hover:border-white/25'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${p.published ? 'bg-green-400' : 'bg-white/30'}`} />
                      <span className="text-[13px] truncate">{p.title}</span>
                    </div>
                    <p className="text-[10px] text-white/35 mt-1 truncate">
                      {p.pages.length ? p.pages.join(', ') : 'no pages'}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Editor */}
        <section>
          {!form ? (
            <div className="border border-dashed border-white/10 p-16 text-center text-white/40 text-[14px]">
              Select a post to edit, or create a new one.
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h1 className="font-serif text-[24px]">{form.id ? 'Edit Post' : 'New Post'}</h1>
                {form.id && (
                  <button onClick={() => remove(form.id!)} className="text-[11px] tracking-wider uppercase text-red-400/80 hover:text-red-400">Delete</button>
                )}
              </div>

              <div>
                <label className={label}>Title</label>
                <input className={input} value={form.title}
                  onChange={(e) => { set('title', e.target.value); if (!slugTouched) set('slug', slugify(e.target.value)) }} />
              </div>

              <div>
                <label className={label}>Slug (URL)</label>
                <input className={input} value={form.slug}
                  onChange={(e) => { setSlugTouched(true); set('slug', e.target.value) }} placeholder="my-post" />
                <p className="text-[11px] text-white/30 mt-1">/blog/{form.slug || 'my-post'}</p>
              </div>

              <div>
                <label className={label}>Excerpt (short summary)</label>
                <textarea className={`${input} resize-y`} rows={2} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
              </div>

              <div>
                <label className={label}>Cover image URL (optional)</label>
                <input className={input} value={form.cover_image} onChange={(e) => set('cover_image', e.target.value)} placeholder="https://…" />
              </div>

              <div>
                <label className={label}>Show under these pages</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TARGET_PAGES.map((pg) => {
                    const on = form.pages.includes(pg.key)
                    return (
                      <button key={pg.key} type="button"
                        onClick={() => set('pages', on ? form.pages.filter((x) => x !== pg.key) : [...form.pages, pg.key])}
                        className={`text-[11px] px-3 py-2 border text-left transition-colors ${on ? 'border-gold-500 bg-gold-500/10 text-white' : 'border-white/10 text-white/50 hover:border-white/25'}`}>
                        {on ? '✓ ' : ''}{pg.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={`${label} mb-0`}>Body (HTML)</label>
                  <button type="button" onClick={() => setPreview((p) => !p)} className="text-[11px] tracking-wider uppercase text-gold-500 hover:text-gold-300">
                    {preview ? 'Edit HTML' : 'Preview'}
                  </button>
                </div>
                {preview ? (
                  <div className="border border-white/10 bg-white text-ink-900 p-6 prose-blog min-h-[280px] overflow-auto"
                    dangerouslySetInnerHTML={{ __html: form.body_html || '<p style="opacity:.5">Nothing to preview yet.</p>' }} />
                ) : (
                  <textarea className={`${input} font-mono text-[13px] resize-y`} rows={16} value={form.body_html}
                    onChange={(e) => set('body_html', e.target.value)}
                    placeholder="<h2>Heading</h2>&#10;<p>Your paragraph…</p>" />
                )}
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="w-4 h-4 accent-gold-500" />
                <span className="text-[13px]">Published {form.published ? '(live)' : '(hidden draft)'}</span>
              </label>

              {error && <p className="text-red-400 text-[13px]">{error}</p>}

              <div className="flex items-center gap-3 pt-2">
                <button onClick={save} disabled={saving} className="bg-gold-500 text-ink-950 px-8 py-3 text-[12px] font-semibold tracking-[0.14em] uppercase hover:bg-gold-300 transition-colors disabled:opacity-60">
                  {saving ? 'Saving…' : form.id ? 'Save Changes' : 'Publish Post'}
                </button>
                <button onClick={() => setForm(null)} className="text-[12px] tracking-wider uppercase text-white/50 hover:text-white">Cancel</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
