import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// POST /api/admin/logout — clears the session cookie.
export async function POST(req: NextRequest) {
  const isHttps = req.headers.get('x-forwarded-proto') === 'https'
  const res = NextResponse.json({ ok: true })
  res.cookies.set('tk_session', '', {
    httpOnly: true,
    secure: isHttps,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return res
}
