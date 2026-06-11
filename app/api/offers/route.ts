import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET /api/offers?category=Safari — public. Active offers for a category.
export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get('category') || undefined
    const rows = await prisma.offer.findMany({
      where: { active: true, ...(category ? { category } : {}) },
      orderBy: [{ sort: 'asc' }, { createdAt: 'desc' }],
      take: 24,
    })
    const offers = rows.map(o => ({
      id: o.id, title: o.title, category: o.category, image: o.image, price: o.price,
      duration: o.duration || '', tagline: o.tagline || '',
      highlights: (o.highlights || '').split('\n').map(s => s.trim()).filter(Boolean),
      featured: o.featured,
    }))
    return NextResponse.json({ offers })
  } catch (err) {
    console.error('GET /api/offers failed:', err)
    return NextResponse.json({ offers: [] })
  }
}
