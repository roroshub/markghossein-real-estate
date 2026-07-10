'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Item = {
  id: number
  slug: string
  title: string
  excerpt: string
  cover_image: string | null
  created_at: string
}

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })

export function RelatedBlogs({ page, heading = 'From the Blog' }: { page: string; heading?: string }) {
  const [posts, setPosts] = useState<Item[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    fetch(`/api/blog?page=${encodeURIComponent(page)}`)
      .then((r) => r.json())
      .then((j) => { if (alive) { setPosts((j.posts ?? []).slice(0, 3)); setReady(true) } })
      .catch(() => { if (alive) setReady(true) })
    return () => { alive = false }
  }, [page])

  // Render nothing until loaded, and nothing if there are no related posts.
  if (!ready || posts.length === 0) return null

  return (
    <section className="bg-cream py-24">
      <div className="max-w-[1320px] mx-auto px-8 md:px-12">
        <div className="flex items-center gap-4 mb-12">
          <span className="block w-8 h-px bg-gold-500 shrink-0" />
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold-700">{heading}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <Link key={p.id} href={`/blog/${p.slug}`}
              className="group flex flex-col bg-white border border-black/[0.06] hover:border-gold-500/40 hover:-translate-y-1 transition-all duration-300">
              {p.cover_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.cover_image} alt="" className="w-full aspect-[16/10] object-cover" />
              )}
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[10px] tracking-[0.18em] uppercase text-gold-700 mb-3">{fmtDate(p.created_at)}</p>
                <h3 className="font-serif text-[22px] leading-tight text-ink-900 mb-3 group-hover:text-gold-700 transition-colors">{p.title}</h3>
                <p className="text-[13px] text-ink-500 leading-relaxed flex-1">{p.excerpt}</p>
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-ink-900 mt-6">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
