import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { notifyNewLead } from '@/lib/notify'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// POST /api/leads — public. Stores a contact-form / quote submission.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))

    const name = String(body.name || '').trim()
    const phone = String(body.phone || '').trim()
    // Contact form field is `dates`; admin reads `travel_dates`.
    const travelDates = String(body.travelDates || body.dates || '').trim() || null
    const email = String(body.email || '').trim() || null
    const service = String(body.service || '').trim() || null
    const message = String(body.message || '').trim() || null
    const source = String(body.source || 'contact').trim()

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required.' },
        { status: 400 }
      )
    }

    const lead = await prisma.lead.create({
      data: { name, phone, email, service, travelDates, message, source },
    })

    // Fire-and-forget notification to sales team (no-op if unconfigured)
    notifyNewLead({ name, phone, email, service, travelDates, message, source })

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 })
  } catch (err) {
    console.error('POST /api/leads failed:', err)
    return NextResponse.json(
      { error: 'Could not save your enquiry. Please WhatsApp us.' },
      { status: 500 }
    )
  }
}
