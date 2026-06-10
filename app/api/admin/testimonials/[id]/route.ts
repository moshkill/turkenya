import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAuthorized } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// PUT /api/admin/testimonials/[id] — toggle approved / featured.
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = parseInt(params.id, 10)
  if (isNaN(id)) return NextResponse.json({ error: 'Bad id' }, { status: 400 })
  try {
    const body = await req.json().catch(() => ({}))
    const data: { approved?: boolean; featured?: boolean } = {}
    if (typeof body.approved === 'boolean') data.approved = body.approved
    if (typeof body.featured === 'boolean') data.featured = body.featured
    // featuring implies approved
    if (data.featured === true) data.approved = true
    const t = await prisma.testimonial.update({ where: { id }, data })
    return NextResponse.json({ ok: true, approved: t.approved, featured: t.featured })
  } catch (err) {
    console.error('PUT /api/admin/testimonials failed:', err)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

// DELETE /api/admin/testimonials/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = parseInt(params.id, 10)
  if (isNaN(id)) return NextResponse.json({ error: 'Bad id' }, { status: 400 })
  try {
    await prisma.testimonial.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('DELETE /api/admin/testimonials failed:', err)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
