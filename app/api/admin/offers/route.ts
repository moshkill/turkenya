import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAuthorized } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET /api/admin/offers — protected. All offers, newest first.
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const rows = await prisma.offer.findMany({ orderBy: [{ sort: 'asc' }, { createdAt: 'desc' }] })
    const offers = rows.map(o => ({
      id: o.id, title: o.title, category: o.category, image: o.image, price: o.price,
      duration: o.duration || '', tagline: o.tagline || '', highlights: o.highlights || '',
      featured: o.featured, active: o.active, sort: o.sort, created_at: o.createdAt.toISOString(),
    }))
    return NextResponse.json({ offers })
  } catch (err) {
    console.error('GET /api/admin/offers failed:', err)
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 })
  }
}

// POST /api/admin/offers — protected. Create a new offer.
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const b = await req.json().catch(() => ({}))
    const title = String(b.title || '').trim()
    const image = String(b.image || '').trim()
    const price = String(b.price || '').trim()
    if (!title || !image || !price) return NextResponse.json({ error: 'Title, image and price are required.' }, { status: 400 })
    const offer = await prisma.offer.create({
      data: {
        title,
        category: String(b.category || 'Safari').trim(),
        image,
        price,
        duration: String(b.duration || '').trim() || null,
        tagline: String(b.tagline || '').trim() || null,
        highlights: String(b.highlights || '').trim() || null,
        featured: !!b.featured,
        active: b.active !== false,
        sort: parseInt(String(b.sort ?? '0'), 10) || 0,
      },
    })
    return NextResponse.json({ ok: true, id: offer.id }, { status: 201 })
  } catch (err) {
    console.error('POST /api/admin/offers failed:', err)
    return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  }
}
