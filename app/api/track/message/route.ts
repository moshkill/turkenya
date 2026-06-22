import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { notifyNewLead } from '@/lib/notify'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const digits = (s: string) => (s || '').replace(/\D/g, '')
const tail = (s: string) => digits(s).slice(-9)

// Customer posts a reply — or accepts/declines an offer — on their own booking
// thread. Re-validates ref + phone (no account) so only the booking owner can
// act. Accept/decline drive the lead status automatically (no manual admin
// step): accept → converted, decline → lost. Returns the updated thread + status.
export async function POST(req: NextRequest) {
  try {
    const b = await req.json().catch(() => ({}))
    const id = parseInt(String(b.ref || '').replace(/\D/g, ''), 10)
    const phone = String(b.phone || '')
    const action = b.action === 'accept' || b.action === 'decline' ? b.action : null
    let body = String(b.body || '').trim().slice(0, 1000)
    if (!id || tail(phone).length < 7) return NextResponse.json({ error: 'Missing reference or phone.' }, { status: 400 })
    if (!body && !action) return NextResponse.json({ error: 'Type a message first.' }, { status: 400 })

    const lead = await prisma.lead.findUnique({ where: { id } })
    if (!lead || tail(lead.phone) !== tail(phone)) {
      return NextResponse.json({ error: 'No booking found with that reference and phone number.' }, { status: 404 })
    }

    // accept/decline → set a clear thread message + drive status automatically
    let newStatus: string | null = null
    if (action === 'accept') { body = body || '✅ I accept this offer — please go ahead and book it.'; newStatus = 'converted' }
    else if (action === 'decline') { body = body || 'Not interested for now — thank you.'; newStatus = 'lost' }

    await prisma.leadMessage.create({ data: { leadId: id, sender: 'customer', body } })
    if (newStatus && lead.status !== newStatus) await prisma.lead.update({ where: { id }, data: { status: newStatus } })

    // nudge the team (best-effort, no-op until configured)
    const note = action === 'accept' ? `✅ Customer ACCEPTED the offer on booking #${id}` : action === 'decline' ? `Customer declined booking #${id}` : `Customer replied on booking #${id}: ${body}`
    notifyNewLead({ name: lead.name, phone: lead.phone, email: lead.email, service: lead.service, travelDates: lead.travelDates, message: note, source: action ? `track-${action}` : 'track-reply' })

    const msgs = await prisma.leadMessage.findMany({ where: { leadId: id }, orderBy: { createdAt: 'asc' } })
    return NextResponse.json({ ok: true, status: newStatus || lead.status, messages: msgs.map(m => ({ sender: m.sender, body: m.body, price: m.price, currency: m.currency, perPerson: m.perPerson, travellers: m.travellers, terms: m.terms, lastPrice: m.lastPrice, author: m.authorName, createdAt: m.createdAt })) })
  } catch (err) {
    console.error('POST /api/track/message failed:', err)
    return NextResponse.json({ error: 'Could not send — please try again.' }, { status: 500 })
  }
}
