import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getBySlug } from '@/lib/blog'

export const dynamic = 'force-dynamic'

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  let post = null
  try { post = await getBySlug(slug) } catch {}
  if (!post || !post.published) return { title: 'Post not found', robots: { index: false } }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, url: `/blog/${post.slug}`, type: 'article' },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = null
  try { post = await getBySlug(slug) } catch {}
  if (!post || !post.published) notFound()

  return (
    <>
      <Navbar />

      <article>
        <header className="relative bg-ink-950 pt-40 pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(70% 90% at 70% 0%, rgba(201,169,110,0.12) 0%, transparent 62%)' }} />
          <div className="relative z-10 max-w-[820px] mx-auto px-8 md:px-12">
            <Link href="/blog" className="text-[11px] tracking-[0.16em] uppercase text-gold-500 hover:text-gold-300">← All posts</Link>
            <p className="text-[11px] tracking-[0.18em] uppercase text-white/40 mt-8 mb-4">{fmtDate(post.created_at)}</p>
            <h1 className="font-serif text-[clamp(34px,5vw,64px)] font-normal leading-[1.05] text-white tracking-tight">
              {post.title}
            </h1>
          </div>
        </header>

        <div className="bg-cream py-20">
          <div
            className="prose-blog max-w-[820px] mx-auto px-8 md:px-12"
            dangerouslySetInnerHTML={{ __html: post.body_html }}
          />
        </div>

        {/* CTA */}
        <section className="bg-gold-500 py-16">
          <div className="max-w-[820px] mx-auto px-8 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="font-serif text-[clamp(22px,3vw,32px)] text-ink-950 leading-tight">Thinking about a move?</p>
            <Link href="/#contact" className="inline-flex items-center px-8 py-4 bg-ink-950 text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-ink-800 transition-colors shrink-0">
              Book a Consultation
            </Link>
          </div>
        </section>
      </article>

      <Footer />
    </>
  )
}
