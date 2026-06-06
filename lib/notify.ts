// Lead notification helper.
// Sends new-lead alerts to the sales team. Currently supports a generic
// webhook (e.g. a WhatsApp Cloud API relay or Make/n8n hook). No-ops safely
// if not configured, so the lead is still saved either way.

type LeadNotice = {
  name: string
  phone: string
  email?: string | null
  service?: string | null
  travelDates?: string | null
  message?: string | null
  source: string
}

export async function notifyNewLead(lead: LeadNotice): Promise<void> {
  const url = process.env.WHATSAPP_NOTIFY_URL
  if (!url) return // not configured yet — lead is still saved

  const text =
    `🔔 New ${lead.source} lead — Turkenya\n` +
    `Name: ${lead.name}\n` +
    `Phone: ${lead.phone}\n` +
    (lead.email ? `Email: ${lead.email}\n` : '') +
    (lead.service ? `Service: ${lead.service}\n` : '') +
    (lead.travelDates ? `Dates: ${lead.travelDates}\n` : '') +
    (lead.message ? `Message: ${lead.message}\n` : '')

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lead }),
    })
  } catch (err) {
    // Never let a notification failure break the lead capture
    console.error('Lead notification failed:', err)
  }
}
