import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET /api/testimonials — public. Returns APPROVED testimonials, newest first.
// ?featured=1 limits to featured ones (for the homepage).
export async function GET(req: NextRequest) {
  try {
    const featured = req.nextUrl.searchParams.get('featured') === '1'
    const rows = await prisma.testimonial.findMany({
      where: { approved: true, ...(featured ? { featured: true } : {}) },
      orderBy: { createdAt: 'desc' },
      take: featured ? 8 : 60,
    })
    const testimonials = rows.map(t => ({
      id: t.id, name: t.name, location: t.location || '', service: t.service || '',
      rating: t.rating, message: t.message, created_at: t.createdAt.toISOString(),
    }))
    return NextResponse.json({ testimonials })
  } catch (err) {
    console.error('GET /api/testimonials failed:', err)
    return NextResponse.json({ testimonials: [] })
  }
}

// POST /api/testimonials — public. Visitor submits a review (unapproved until
// an admin approves it). Basic validation + length caps to avoid abuse.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const name = String(body.name || '').trim().slice(0, 80)
    const location = String(body.location || '').trim().slice(0, 80) || null
    const service = String(body.service || '').trim().slice(0, 60) || null
    const message = String(body.message || '').trim().slice(0, 1200)
    let rating = parseInt(String(body.rating ?? '5'), 10)
    if (isNaN(rating) || rating < 1 || rating > 5) rating = 5

    if (name.length < 2 || message.length < 10) {
      return NextResponse.json({ error: 'Please add your name and a short review.' }, { status: 400 })
    }

    await prisma.testimonial.create({
      data: { name, location, service, rating, message, approved: false, featured: false },
    })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error('POST /api/testimonials failed:', err)
    return NextResponse.json({ error: 'Could not submit your review. Please try again.' }, { status: 500 })
  }
}
