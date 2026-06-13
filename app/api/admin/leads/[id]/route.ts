import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAuthorized } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const VALID_STATUSES = ['new', 'contacted', 'converted', 'closed', 'lost']

// PUT /api/admin/leads/:id — protected. Updates a lead's status.
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = parseInt(params.id, 10)
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const data: { status?: string; assignedToId?: number | null } = {}

    if (body.status !== undefined) {
      const status = String(body.status || '').trim()
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
      }
      data.status = status
    }
    // assignedToId: a number to assign/claim, or null to unassign
    if ('assignedToId' in body) {
      data.assignedToId = body.assignedToId === null ? null : parseInt(String(body.assignedToId), 10)
      if (data.assignedToId !== null && Number.isNaN(data.assignedToId)) {
        return NextResponse.json({ error: 'Invalid assignee' }, { status: 400 })
      }
    }
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 })
    }

    await prisma.lead.update({ where: { id }, data })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('PUT /api/admin/leads/[id] failed:', err)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

// DELETE /api/admin/leads/:id — protected. Removes a lead.
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = parseInt(params.id, 10)
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  try {
    await prisma.lead.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('DELETE /api/admin/leads/[id] failed:', err)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
