import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAuthorized } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET /api/admin/testimonials — protected. All testimonials, newest first.
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const rows = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
    const testimonials = rows.map(t => ({
      id: t.id, name: t.name, location: t.location || '', service: t.service || '',
      rating: t.rating, message: t.message, approved: t.approved, featured: t.featured,
      created_at: t.createdAt.toISOString(),
    }))
    return NextResponse.json({ testimonials })
  } catch (err) {
    console.error('GET /api/admin/testimonials failed:', err)
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 })
  }
}
