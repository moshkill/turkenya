import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { notifyNewLead } from '@/lib/notify'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const digits = (s: string) => (s || '').replace(/\D/g, '')
const tail = (s: string) => digits(s).slice(-9)

// Customer posts a reply on their own booking thread. Re-validates ref + phone
// (no account) so only the booking owner can post. Returns the updated thread.
export async function POST(req: NextRequest) {
  try {
    const b = await req.json().catch(() => ({}))
    const id = parseInt(String(b.ref || '').replace(/\D/g, ''), 10)
    const phone = String(b.phone || '')
    const body = String(b.body || '').trim().slice(0, 1000)
    if (!id || tail(phone).length < 7) return NextResponse.json({ error: 'Missing reference or phone.' }, { status: 400 })
    if (!body) return NextResponse.json({ error: 'Type a message first.' }, { status: 400 })

    const lead = await prisma.lead.findUnique({ where: { id } })
    if (!lead || tail(lead.phone) !== tail(phone)) {
      return NextResponse.json({ error: 'No booking found with that reference and phone number.' }, { status: 404 })
    }

    await prisma.leadMessage.create({ data: { leadId: id, sender: 'customer', body } })
    // nudge the team that the customer replied on-site (best-effort, no-op until configured)
    notifyNewLead({ name: lead.name, phone: lead.phone, email: lead.email, service: lead.service, travelDates: lead.travelDates, message: `Customer replied on booking #${id}: ${body}`, source: 'track-reply' })

    const msgs = await prisma.leadMessage.findMany({ where: { leadId: id }, orderBy: { createdAt: 'asc' } })
    return NextResponse.json({ ok: true, messages: msgs.map(m => ({ sender: m.sender, body: m.body, price: m.price, terms: m.terms, author: m.authorName, createdAt: m.createdAt })) })
  } catch (err) {
    console.error('POST /api/track/message failed:', err)
    return NextResponse.json({ error: 'Could not send — please try again.' }, { status: 500 })
  }
}
