import type { MetadataRoute } from 'next'

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://markghossein-next.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
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
  ]

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
