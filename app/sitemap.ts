import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { listPublished, type Post } from '@/lib/blog'

// Query the blog table on each request so newly published posts appear right away.
export const dynamic = 'force-dynamic'

const routes: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }> = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/buyers', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/sellers', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/probate', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/upsizing', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/downsizing', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/investment', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/mortgage-calculator', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/home-evaluation', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/nosey-neighbour', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: Post[] = []
  try {
    posts = await listPublished()
  } catch {
    // DB unavailable: still serve the static pages rather than failing the sitemap.
  }
  const latestPost = posts.reduce<string | null>(
    (max, p) => (!max || p.updated_at > max ? p.updated_at : max),
    null,
  )

  // Static pages carry no <lastmod>: a fake "now" date is worse than none.
  // The blog index uses its newest post's date; posts use their real updated_at.
  const staticEntries: MetadataRoute.Sitemap = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    ...(path === '/blog' && latestPost ? { lastModified: new Date(latestPost) } : {}),
    changeFrequency,
    priority,
  }))

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticEntries, ...postEntries]
}
