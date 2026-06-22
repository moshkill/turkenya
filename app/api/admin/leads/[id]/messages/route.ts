import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAuthorized, getSessionUser } from '@/lib/auth'
import { sendEmail, agentUpdateEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const firstName = (n: string) => (n || '').trim().split(/\s+/)[0] || 'Agent'

// GET — the message thread for a lead (agent view).
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = parseInt(params.id, 10)
  if (Number.isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  const msgs = await prisma.leadMessage.findMany({ where: { leadId: id }, orderBy: { createdAt: 'asc' } })
  return NextResponse.json({ messages: msgs })
}

// POST — agent posts a message and/or a price offer (price + terms fixed|negotiable).
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = parseInt(params.id, 10)
  if (Number.isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  try {
    const b = await req.json().catch(() => ({}))
    const body = String(b.body || '').trim().slice(0, 2000)
    const price = b.price ? String(b.price).trim().slice(0, 60) : null
    const terms = b.terms === 'fixed' || b.terms === 'negotiable' ? b.terms : null
    const currency = price ? (b.currency === 'USD' || b.currency === 'KES' ? b.currency : 'KES') : null
    const perPerson = !!price && !!b.perPerson
    const travellers = perPerson ? Math.max(1, Math.min(999, parseInt(String(b.travellers || ''), 10) || 1)) : null
    const lastPrice = price && terms === 'negotiable' && b.lastPrice ? String(b.lastPrice).trim().slice(0, 60) : null
    if (!body && !price) return NextResponse.json({ error: 'Add a note or a price.' }, { status: 400 })

    const me = await getSessionUser(req)
    const lead = await prisma.lead.findUnique({ where: { id } })
    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    await prisma.leadMessage.create({
      data: { leadId: id, sender: 'agent', body: body || (price ? 'Here is your price.' : ''), price, currency, perPerson, travellers, terms, lastPrice, authorName: firstName(me?.name || '') },
    })
    // Whoever works the lead owns it: an unassigned lead is auto-claimed by the
    // agent who starts working it. Status follows reality: any agent activity
    // means the lead is being worked → contacted (also re-opens a lost/closed
    // lead), but never downgrades a booking the customer already converted.
    const upd: { assignedToId?: number; status?: string } = {}
    if (!lead.assignedToId && me?.id) upd.assignedToId = me.id
    if (lead.status !== 'converted' && lead.status !== 'contacted') upd.status = 'contacted'
    if (Object.keys(upd).length) await prisma.lead.update({ where: { id }, data: upd })
    // email the customer their update + tracking link (no-op until SMTP configured)
    if (lead.email) sendEmail(lead.email, `Update on your Turkenya booking #${id}`, agentUpdateEmail({ ref: id, body, price, currency, perPerson, travellers, terms, lastPrice }))
    const msgs = await prisma.leadMessage.findMany({ where: { leadId: id }, orderBy: { createdAt: 'asc' } })
    return NextResponse.json({
      ok: true,
      messages: msgs,
      claimedById: upd.assignedToId ?? null,
      claimedByName: upd.assignedToId ? (me?.name || null) : null,
      status: upd.status ?? lead.status,
    })
  } catch (err) {
    console.error('POST /api/admin/leads/[id]/messages failed:', err)
    return NextResponse.json({ error: 'Could not post' }, { status: 500 })
  }
}
