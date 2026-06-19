import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const digits = (s: string) => (s || '').replace(/\D/g, '')
// compare on the last 9 digits so +254712345678 and 0712345678 match
const tail = (s: string) => digits(s).slice(-9)

// Public booking tracker — look up ONE booking by reference + matching phone.
// Returns only safe, customer-facing fields. Never exposes name/email/message
// or other people's bookings (phone must match the booking on file).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const id = parseInt(String(body.ref || '').replace(/\D/g, ''), 10)
    const phone = String(body.phone || '')
    if (!id || tail(phone).length < 7) {
      return NextResponse.json({ error: 'Enter your reference number and the phone number you booked with.' }, { status: 400 })
    }
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
      messages: lead.messages.map(m => ({ sender: m.sender, body: m.body, price: m.price, terms: m.terms, author: m.authorName, createdAt: m.createdAt })),
    })
  } catch {
    return NextResponse.json({ error: 'Something went wrong — please try again.' }, { status: 500 })
  }
}
