import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin, getSessionUser } from '@/lib/auth'
import { hashPassword } from '@/lib/password'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET /api/admin/users — list of staff. Any logged-in staffer may read the
// list (needed so agents can see who to assign to / who owns a lead), but
// only admins see it as a management screen.
export async function GET(req: NextRequest) {
  const me = await getSessionUser(req)
  if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const rows = await prisma.user.findMany({ orderBy: [{ role: 'asc' }, { name: 'asc' }] })
    const users = rows.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, active: u.active }))
    return NextResponse.json({ users })
  } catch (err) {
    console.error('GET users failed:', err)
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 })
  }
}

// POST /api/admin/users — create an agent/admin (admin only).
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  try {
    const b = await req.json().catch(() => ({}))
    const name = String(b.name || '').trim()
    const email = String(b.email || '').trim().toLowerCase()
    const password = String(b.password || '')
    const role = b.role === 'admin' ? 'admin' : 'agent'
    if (!name || !email || password.length < 6) {
      return NextResponse.json({ error: 'Name, email and a 6+ char password are required.' }, { status: 400 })
    }
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ error: 'That email is already in use.' }, { status: 409 })
    const u = await prisma.user.create({ data: { name, email, role, passwordHash: hashPassword(password), active: true } })
    return NextResponse.json({ ok: true, id: u.id }, { status: 201 })
  } catch (err) {
    console.error('POST users failed:', err)
    return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  }
}
