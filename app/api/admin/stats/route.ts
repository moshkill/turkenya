import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAuthorized } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET /api/admin/stats — protected. Returns lead counts grouped by status.
// Admin UI expects: [{ status: string, count: string }]
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const grouped = await prisma.lead.groupBy({
      by: ['status'],
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
