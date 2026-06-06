import { NextRequest, NextResponse } from 'next/server'
import { sessionValue } from '@/lib/auth'
import { timingSafeEqual } from 'crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ba.length !== bb.length) return false
  return timingSafeEqual(ba, bb)
}

// POST /api/admin/login  { password }
// Validates against ADMIN_TOKEN, sets an httpOnly session cookie.
export async function POST(req: NextRequest) {
  const expected = process.env.ADMIN_TOKEN
  if (!expected) {
    return NextResponse.json({ error: 'Admin not configured' }, { status: 500 })
  }

  const body = await req.json().catch(() => ({}))
  const password = String(body.password || '')

  if (!password || !safeEqual(password, expected)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('tk_session', sessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return res
}
