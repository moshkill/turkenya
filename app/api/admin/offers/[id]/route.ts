import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAuthorized } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// PUT /api/admin/offers/[id] — update any offer fields.
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = parseInt(params.id, 10)
  if (isNaN(id)) return NextResponse.json({ error: 'Bad id' }, { status: 400 })
  try {
    const b = await req.json().catch(() => ({}))
    const data: Record<string, unknown> = {}
    if (typeof b.title === 'string' && b.title.trim()) data.title = b.title.trim()
    if (typeof b.category === 'string' && b.category.trim()) data.category = b.category.trim()
    if (typeof b.image === 'string' && b.image.trim()) data.image = b.image.trim()
    if (typeof b.price === 'string' && b.price.trim()) data.price = b.price.trim()
    if (typeof b.duration === 'string') data.duration = b.duration.trim() || null
    if (typeof b.tagline === 'string') data.tagline = b.tagline.trim() || null
    if (typeof b.highlights === 'string') data.highlights = b.highlights.trim() || null
    if (typeof b.featured === 'boolean') data.featured = b.featured
    if (typeof b.active === 'boolean') data.active = b.active
    if (b.sort !== undefined) data.sort = parseInt(String(b.sort), 10) || 0
    const o = await prisma.offer.update({ where: { id }, data })
    return NextResponse.json({ ok: true, id: o.id })
  } catch (err) {
    console.error('PUT /api/admin/offers failed:', err)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

// DELETE /api/admin/offers/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = parseInt(params.id, 10)
  if (isNaN(id)) return NextResponse.json({ error: 'Bad id' }, { status: 400 })
  try {
    await prisma.offer.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('DELETE /api/admin/offers failed:', err)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
