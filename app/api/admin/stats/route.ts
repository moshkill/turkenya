import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAuthorized, getSessionUser } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET /api/admin/stats — protected. Counts by status; scoped to the agent's own
// + unassigned leads (admins get the whole org) so numbers match their list.
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const me = await getSessionUser(req)
    const where = me && me.role !== 'admin'
      ? { OR: [{ assignedToId: me.id }, { assignedToId: null }] }
      : {}
    const grouped = await prisma.lead.groupBy({
      by: ['status'],
      where,
      _count: { _all: true },
    })

    const stats = grouped.map((g) => ({
      status: g.status,
      count: String(g._count._all),
    }))

    return NextResponse.json(stats)
  } catch (err) {
    console.error('GET /api/admin/stats failed:', err)
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 })
  }
}
