// Lead notification helper — pings the sales team on WhatsApp when a new
// lead arrives (contact form, quote, or chat handoff).
//
// Supports two transports, both optional. If none configured it no-ops
// safely so the lead is still saved.
//
// 1) CallMeBot (FREE — great while starting):
//    Set WHATSAPP_PHONE (e.g. 254722666644) and WHATSAPP_APIKEY.
//    Setup: save +34 644 51 95 23 to contacts, WhatsApp it
//    "I allow callmebot to send me messages", you get an API key.
//
// 2) Generic webhook (for a real WhatsApp Business API / Twilio / n8n relay):
//    Set WHATSAPP_NOTIFY_URL — receives a POST { text, lead }.

type LeadNotice = {
  name: string
  phone: string
  email?: string | null
  service?: string | null
  travelDates?: string | null
  message?: string | null
  source: string
}

function buildText(lead: LeadNotice): string {
  const tag = lead.source === 'quote' ? '💰 QUOTE' : lead.source === 'chat' ? '💬 CHAT' : '🔔 ENQUIRY'
  return (
    `${tag} — Turkenya\n` +
    `Name: ${lead.name}\n` +
    `Phone: ${lead.phone}\n` +
    (lead.email ? `Email: ${lead.email}\n` : '') +
    (lead.service ? `Service: ${lead.service}\n` : '') +
    (lead.travelDates ? `Dates: ${lead.travelDates}\n` : '') +
    (lead.message ? `\n${lead.message}` : '')
  )
}

async function sendCallMeBot(text: string): Promise<void> {
  const phone = process.env.WHATSAPP_PHONE
  const apikey = process.env.WHATSAPP_APIKEY
  if (!phone || !apikey) return
  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`
  await fetch(url, { method: 'GET' })
}

async function sendWebhook(text: string, lead: LeadNotice): Promise<void> {
  const url = process.env.WHATSAPP_NOTIFY_URL
  if (!url) return
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, lead }),
  })
}

export async function notifyNewLead(lead: LeadNotice): Promise<void> {
  const text = buildText(lead)
  // Run both transports; whichever is configured fires. Never throw —
  // a notification failure must never block lead capture.
  await Promise.allSettled([sendCallMeBot(text), sendWebhook(text, lead)]).catch(() => {})
}

// Fired when an admin assigns a lead to an agent (or an agent claims one).
// Same transports — lights up the moment a relay/CallMeBot key is configured.
export async function notifyAssignment(opts: { agentName: string; byName: string; lead: LeadNotice }): Promise<void> {
  const { agentName, byName, lead } = opts
  const text =
    `👤 ASSIGNED to ${agentName}` + (byName ? ` (by ${byName})` : '') + `\n` +
    `Name: ${lead.name}\nPhone: ${lead.phone}\n` +
    (lead.service ? `Service: ${lead.service}\n` : '') +
    (lead.travelDates ? `Dates: ${lead.travelDates}` : '')
  await Promise.allSettled([sendCallMeBot(text), sendWebhook(text, lead)]).catch(() => {})
}
