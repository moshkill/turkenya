import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { signSession } from '@/lib/auth'
import { verifyPassword } from '@/lib/password'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// POST /api/admin/login  { email, password }
// Validates against the users table, sets a signed httpOnly session cookie.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
  }

  let user
  try {
    user = await prisma.user.findUnique({ where: { email } })
  } catch {
    return NextResponse.json({ error: 'Server error. Try again.' }, { status: 500 })
  }
  if (!user || !user.active || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  const isHttps = req.headers.get('x-forwarded-proto') === 'https'
  const res = NextResponse.json({ ok: true, user: { name: user.name, role: user.role } })
  res.cookies.set('tk_session', signSession(user.id), {
    httpOnly: true, secure: isHttps, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7,
  })
  return res
}
