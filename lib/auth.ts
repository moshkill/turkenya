import { NextRequest } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'

// Session value derived from ADMIN_TOKEN — stored in an httpOnly cookie so
// it can't be read by JavaScript (XSS-safe). The raw ADMIN_TOKEN never
// touches the browser.
export function sessionValue(): string {
  const secret = process.env.ADMIN_TOKEN || ''
  return createHmac('sha256', secret).update('turkenya-admin-session-v1').digest('hex')
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ba.length !== bb.length) return false
  return timingSafeEqual(ba, bb)
}

// Authorize an admin request. Accepts either:
//  1) the httpOnly `tk_session` cookie (set by /api/admin/login) — preferred
//  2) the x-admin-token header equal to ADMIN_TOKEN — for curl / scripts
export function isAuthorized(req: NextRequest): boolean {
  const expected = process.env.ADMIN_TOKEN
  if (!expected) return false

  const cookie = req.cookies.get('tk_session')?.value
  if (cookie && safeEqual(cookie, sessionValue())) return true

  const header = req.headers.get('x-admin-token')
  if (header && safeEqual(header, expected)) return true

  return false
}
