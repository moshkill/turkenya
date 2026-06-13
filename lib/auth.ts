import { NextRequest } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { prisma } from '@/lib/db'

export type SessionUser = { id: number; name: string; email: string; role: string }

function secret(): string {
  return process.env.ADMIN_TOKEN || ''
}

// Cookie value = "<userId>.<hmac>" — signed so the browser can't forge it.
// No DB hit needed to verify the signature (fast path for "is staff?").
export function signSession(userId: number): string {
  const sig = createHmac('sha256', secret()).update('tk-user-' + userId).digest('hex')
  return `${userId}.${sig}`
}

export function parseSession(cookieVal: string | undefined): number | null {
  if (!cookieVal) return null
  const dot = cookieVal.lastIndexOf('.')
  if (dot < 1) return null
  const idStr = cookieVal.slice(0, dot)
  const sig = cookieVal.slice(dot + 1)
  const id = parseInt(idStr, 10)
  if (isNaN(id)) return null
  const expected = createHmac('sha256', secret()).update('tk-user-' + id).digest('hex')
  const a = Buffer.from(sig), b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  return id
}

function headerOk(req: NextRequest): boolean {
  const expected = secret()
  if (!expected) return false
  const header = req.headers.get('x-admin-token')
  if (!header) return false
  const a = Buffer.from(header), b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

// Is this request from authenticated staff (any role)? Sync, no DB.
// Used by lead/offer/testimonial routes that any logged-in staffer may use.
export function isAuthorized(req: NextRequest): boolean {
  if (!secret()) return false
  if (parseSession(req.cookies.get('tk_session')?.value) !== null) return true
  return headerOk(req)
}

// Full user (with role) for the current session — async, hits the DB.
export async function getSessionUser(req: NextRequest): Promise<SessionUser | null> {
  if (headerOk(req)) return { id: 0, name: 'API', email: 'api', role: 'admin' }
  const id = parseSession(req.cookies.get('tk_session')?.value)
  if (id === null) return null
  try {
    const u = await prisma.user.findUnique({ where: { id } })
    if (!u || !u.active) return null
    return { id: u.id, name: u.name, email: u.email, role: u.role }
  } catch {
    return null
  }
}

// Require an admin-role user; returns the user or null.
export async function requireAdmin(req: NextRequest): Promise<SessionUser | null> {
  const u = await getSessionUser(req)
  return u && u.role === 'admin' ? u : null
}
