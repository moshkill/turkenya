import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { hashPassword } from '@/lib/password'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// PUT /api/admin/users/[id] — update name/role/active or reset password (admin only).
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const me = await requireAdmin(req)
  if (!me) return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  const id = parseInt(params.id, 10)
  if (isNaN(id)) return NextResponse.json({ error: 'Bad id' }, { status: 400 })
  try {
    const b = await req.json().catch(() => ({}))
    const data: Record<string, unknown> = {}
    if (typeof b.name === 'string' && b.name.trim()) data.name = b.name.trim()
    if (b.role === 'admin' || b.role === 'agent') data.role = b.role
    if (typeof b.active === 'boolean') data.active = b.active
    if (typeof b.password === 'string' && b.password.length >= 6) data.passwordHash = hashPassword(b.password)
    // Guard: never let the last active admin lock themselves out.
    if (data.role === 'agent' || data.active === false) {
      const target = await prisma.user.findUnique({ where: { id } })
      if (target?.role === 'admin') {
        const admins = await prisma.user.count({ where: { role: 'admin', active: true } })
        if (admins <= 1) return NextResponse.json({ error: 'Cannot remove the last active admin.' }, { status: 400 })
      }
    }
    await prisma.user.update({ where: { id }, data })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('PUT user failed:', err)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

// DELETE /api/admin/users/[id] — remove a user (admin only; not the last admin, not yourself).
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const me = await requireAdmin(req)
  if (!me) return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  const id = parseInt(params.id, 10)
  if (isNaN(id)) return NextResponse.json({ error: 'Bad id' }, { status: 400 })
  if (id === me.id) return NextResponse.json({ error: 'You cannot delete your own account.' }, { status: 400 })
  try {
    const target = await prisma.user.findUnique({ where: { id } })
    if (target?.role === 'admin') {
      const admins = await prisma.user.count({ where: { role: 'admin', active: true } })
      if (admins <= 1) return NextResponse.json({ error: 'Cannot delete the last admin.' }, { status: 400 })
    }
    await prisma.user.delete({ where: { id } }) // leads.assignedToId set null via schema
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('DELETE user failed:', err)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
