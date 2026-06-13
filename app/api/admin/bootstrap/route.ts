import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/password'
import { timingSafeEqual } from 'crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// POST /api/admin/bootstrap  { token, name, email, password }
// Creates the FIRST admin account — only works while the users table is empty,
// and only with the master ADMIN_TOKEN. Safe to leave deployed (no-op once
// any user exists).
export async function POST(req: NextRequest) {
  const expected = process.env.ADMIN_TOKEN || ''
  const body = await req.json().catch(() => ({}))
  const token = String(body.token || '')
  const a = Buffer.from(token), b = Buffer.from(expected)
  if (!expected || a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const count = await prisma.user.count()
    if (count > 0) return NextResponse.json({ error: 'Already initialised' }, { status: 409 })

    const name = String(body.name || 'Administrator').trim()
    const email = String(body.email || '').trim().toLowerCase()
    const password = String(body.password || '')
    if (!email || password.length < 6) {
      return NextResponse.json({ error: 'Valid email and 6+ char password required' }, { status: 400 })
    }
    const u = await prisma.user.create({
      data: { name, email, passwordHash: hashPassword(password), role: 'admin', active: true },
    })
    return NextResponse.json({ ok: true, id: u.id, email: u.email }, { status: 201 })
  } catch (err) {
    console.error('bootstrap failed:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
