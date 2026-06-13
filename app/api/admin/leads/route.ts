import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAuthorized } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET /api/admin/leads — protected. Returns all leads, newest first.
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const rows = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      include: { assignedTo: { select: { id: true, name: true } } },
    })

    // Admin UI reads snake_case (travel_dates, created_at)
    const leads = rows.map((l) => ({
      id: l.id,
      name: l.name,
      email: l.email || '',
      phone: l.phone,
      service: l.service || '',
      message: l.message || '',
      travel_dates: l.travelDates || '',
      source: l.source,
      status: l.status,
      assigned_to_id: l.assignedToId,
      assigned_to_name: l.assignedTo?.name || '',
      created_at: l.createdAt.toISOString(),
    }))

    return NextResponse.json({ leads })
  } catch (err) {
    console.error('GET /api/admin/leads failed:', err)
    return NextResponse.json({ error: 'Failed to load leads' }, { status: 500 })
  }
}
