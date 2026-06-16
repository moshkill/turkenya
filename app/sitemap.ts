import type { MetadataRoute } from 'next'
import { getAllMeta, SITE_URL } from '@/lib/blog'

export const dynamic = 'force-dynamic'

// Dynamic sitemap — static pages + every blog post (incl. AI-generated ones),
// so Google discovers new articles automatically each week.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    '', '/air-ticketing', '/safaris', '/international', '/car-rental', '/hotel-booking',
    '/pilgrimage-tours', '/conferences', '/airport-transfers', '/logistics',
    '/about', '/contact', '/quote', '/testimonials', '/blog',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: (path === '' || path === '/blog' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: path === '' ? 1 : path === '/blog' ? 0.8 : 0.7,
  }))

  let posts: MetadataRoute.Sitemap = []
  try {
    const all = await getAllMeta()
    posts = all.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch { /* DB unavailable — still ship the static routes */ }

  return [...routes, ...posts]
}
