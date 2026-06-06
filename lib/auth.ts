import { NextRequest } from 'next/server'

// Simple shared-secret admin check via x-admin-token header.
// Token is stored server-side in ADMIN_TOKEN env var (never exposed to client).
export function isAuthorized(req: NextRequest): boolean {
  const token = req.headers.get('x-admin-token')
  const expected = process.env.ADMIN_TOKEN
  if (!expected) return false
  return Boolean(token) && token === expected
}
