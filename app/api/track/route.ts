import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const digits = (s: string) => (s || '').replace(/\D/g, '')
// compare on the last 9 digits so +254712345678 and 0712345678 match
const tail = (s: string) => digits(s).slice(-9)

// Public booking tracker. Two modes, both gated by the phone on file:
//  • ref + phone  → ONE booking with its full conversation thread.
//  • phone only   → a LIST of all that phone's bookings (no thread) so a
//    customer who forgot their ref can still find everything — phones stick,
//    ref codes don't. Returns only safe, customer-facing fields; never name,
//    email, message body, or anyone else's bookings.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const id = parseInt(String(body.ref || '').replace(/\D/g, ''), 10)
    const phone = String(body.phone || '')
    if (tail(phone).length < 7) {
      return NextResponse.json({ error: 'Enter the phone number you booked with.' }, { status: 400 })
    }

    // ── ref + phone → single booking with thread ──
    if (id) {
      const lead = await prisma.lead.findUnique({
        where: { id },
        include: { messages: { orderBy: { createdAt: 'asc' } } },
      })
      if (!lead || tail(lead.phone) !== tail(phone)) {
        return NextResponse.json({ error: 'No booking found with that reference and phone number.' }, { status: 404 })
      }
      return NextResponse.json({
        ref: lead.id,
        status: lead.status,
        service: lead.service || 'Travel',
        dates: lead.travelDates || '',
        createdAt: lead.createdAt,
        messages: lead.messages.map(m => ({ sender: m.sender, body: m.body, price: m.price, currency: m.currency, perPerson: m.perPerson, travellers: m.travellers, terms: m.terms, lastPrice: m.lastPrice, author: m.authorName, createdAt: m.createdAt })),
      })
    }

    // ── phone only → list all bookings for that phone ──
    // Phones are stored in mixed formats (+254…, 07…, spaces), so we match on
    // the last 9 digits in JS. Pull a bounded recent set and filter.
    const t = tail(phone)
    const recent = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 2000,
      select: { id: true, status: true, service: true, travelDates: true, createdAt: true, phone: true },
    })
    const matched = recent.filter(l => tail(l.phone) === t)
    if (!matched.length) {
      return NextResponse.json({ error: 'No bookings found for that phone number. Check the number, or reach us on WhatsApp.' }, { status: 404 })
    }
    // enrich each booking with its latest activity + any pending offer, so the
    // list can flag which card has a new update / something to act on.
    const ids = matched.map(l => l.id)
    const msgs = await prisma.leadMessage.findMany({ where: { leadId: { in: ids } }, orderBy: { createdAt: 'desc' } })
    const byLead = new Map<number, typeof msgs>()
    for (const m of msgs) { const arr = byLead.get(m.leadId) || []; arr.push(m); byLead.set(m.leadId, arr) }
    const openStatus = (s: string) => s !== 'converted' && s !== 'closed' && s !== 'lost'
    const mine = matched.map(l => {
      const lm = byLead.get(l.id) || [] // already newest-first
      const latest = lm[0]
      const offerMsg = openStatus(l.status) ? lm.find(m => m.sender === 'agent' && m.price) : undefined
      return {
        ref: l.id, status: l.status, service: l.service || 'Travel', dates: l.travelDates || '', createdAt: l.createdAt,
        lastUpdate: latest ? latest.createdAt : l.createdAt,
        latestFrom: latest ? latest.sender : null,
        offer: offerMsg ? { price: offerMsg.price, currency: offerMsg.currency, perPerson: offerMsg.perPerson, travellers: offerMsg.travellers, terms: offerMsg.terms } : null,
      }
    })
    return NextResponse.json({ bookings: mine })
  } catch {
    return NextResponse.json({ error: 'Something went wrong — please try again.' }, { status: 500 })
  }
}
