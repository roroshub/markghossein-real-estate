import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getBySlug, type Post } from '@/lib/blog'
import { SITE_URL, SITE_NAME, absoluteUrl } from '@/lib/site'
import { renderBody, parseSchemaInput, jsonLdString } from '@/lib/post-html'

export const dynamic = 'force-dynamic'

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })

const descriptionOf = (p: Post) => p.meta_description?.trim() || p.excerpt
// Cover image if set, otherwise the site-wide generated share image.
const shareImageOf = (p: Post) => (p.cover_image ? absoluteUrl(p.cover_image) : `${SITE_URL}/opengraph-image`)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  let post = null
  try { post = await getBySlug(slug) } catch {}
  if (!post || !post.published) return { title: 'Post not found', robots: { index: false } }
  // An SEO title is used exactly as typed; otherwise the post title + site suffix.
  const seoTitle = post.seo_title?.trim()
  const title = seoTitle || post.title
  const description = descriptionOf(post)
  const image = shareImageOf(post)
  return {
    title: seoTitle ? { absolute: seoTitle } : post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: new Date(post.created_at).toISOString(),
      modifiedTime: new Date(post.updated_at).toISOString(),
      authors: ['Mark Ghossein'],
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = null
  try { post = await getBySlug(slug) } catch {}
  if (!post || !post.published) notFound()

  const url = `${SITE_URL}/blog/${post.slug}`
  // Extra schema pasted in the admin (e.g. FAQPage); validated on save.
  const custom = post.schema_jsonld ? parseSchemaInput(post.schema_jsonld) : null
  const jsonLd: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: descriptionOf(post),
      image: shareImageOf(post),
      datePublished: new Date(post.created_at).toISOString(),
      dateModified: new Date(post.updated_at).toISOString(),
      author: { '@type': 'Person', name: 'Mark Ghossein', url: SITE_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` } },
      mainEntityOfPage: url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
    ...(custom?.ok ? custom.value : []),
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
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

        {post.cover_image && (
          <div className="bg-cream pt-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image} alt={post.cover_alt ?? ''} fetchPriority="high"
              className="block max-w-[820px] w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] mx-auto aspect-[16/9] object-cover" />
          </div>
        )}

        <div className="bg-cream py-20">
          <div
            className="prose-blog max-w-[820px] mx-auto px-8 md:px-12"
            dangerouslySetInnerHTML={{ __html: renderBody(post.body_html) }}
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
