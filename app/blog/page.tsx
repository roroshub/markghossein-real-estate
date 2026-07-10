import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { listPublished, type Post } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog & Market Insights',
  description: 'Ottawa real estate tips, market insights, and guidance from Mark Ghossein, eXp Realty.',
  alternates: { canonical: '/blog' },
}

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })

export default async function BlogIndex() {
  let posts: Post[] = []
  try {
    posts = await listPublished()
  } catch {
    posts = []
  }

  return (
    <>
      <Navbar />

      <section className="relative bg-ink-950 pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(70% 90% at 70% 0%, rgba(201,169,110,0.12) 0%, transparent 62%)' }} />
        <div className="relative z-10 max-w-[1320px] mx-auto px-8 md:px-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-8 h-px bg-gold-500 shrink-0" />
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold-500">Insights & Advice</p>
          </div>
          <h1 className="font-serif text-[clamp(44px,6.5vw,92px)] font-normal leading-[0.95] text-white tracking-tight mb-6">
            The <em className="italic text-gold-500">Blog.</em>
          </h1>
          <p className="text-[16px] font-light text-white/55 max-w-[560px] leading-[1.9]">
            Market insights, buying and selling tips, and honest guidance for Ottawa homeowners.
          </p>
        </div>
      </section>

      <section className="bg-cream py-24 min-h-[40vh]">
        <div className="max-w-[1320px] mx-auto px-8 md:px-12">
          {posts.length === 0 ? (
            <p className="text-ink-500 text-[15px]">No posts yet — check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`}
                  className="group flex flex-col bg-white border border-black/[0.06] hover:border-gold-500/40 hover:-translate-y-1 transition-all duration-300">
                  {p.cover_image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.cover_image} alt="" className="w-full aspect-[16/10] object-cover" />
                  )}
                  <div className="p-8 flex flex-col flex-1">
                    <p className="text-[10px] tracking-[0.18em] uppercase text-gold-700 mb-3">{fmtDate(p.created_at)}</p>
                    <h2 className="font-serif text-[24px] leading-tight text-ink-900 mb-3 group-hover:text-gold-700 transition-colors">{p.title}</h2>
                    <p className="text-[14px] text-ink-500 leading-relaxed flex-1">{p.excerpt}</p>
                    <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-ink-900 mt-6">Read more →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
