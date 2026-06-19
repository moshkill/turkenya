import nodemailer from 'nodemailer'

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://turkenya.com').replace(/\/$/, '')

// Gmail SMTP (or any SMTP) via env. No-op until SMTP_USER + SMTP_PASS are set,
// so the app runs fine before email is configured.
function transport() {
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!user || !pass) return null
  const port = parseInt(process.env.SMTP_PORT || '465', 10)
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

const from = () => process.env.SMTP_FROM || `Turkenya Tours & Safaris <${process.env.SMTP_USER}>`

export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const t = transport()
  if (!t || !to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return false
  try { await t.sendMail({ from: from(), to, subject, html }); return true }
  catch (e) { console.error('email send failed:', e); return false }
}

function shell(inner: string) {
  return `<div style="background:#0a0a0a;padding:30px 12px;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden">
      <div style="background:#fff000;padding:18px 28px"><span style="font-size:20px;font-weight:900;color:#0a0a0a;letter-spacing:-0.5px">TURKENYA <span style="font-weight:600">Tours &amp; Safaris</span></span></div>
      <div style="padding:28px;color:#e8e8e8;font-size:15px;line-height:1.7">${inner}</div>
      <div style="padding:18px 28px;border-top:1px solid #222;color:#888;font-size:12px">Turkenya Tours &amp; Safaris · Nairobi · +254 722 666 644 · <a href="${SITE}" style="color:#fff000;text-decoration:none">turkenya.com</a></div>
    </div>
  </div>`
}
const esc = (s: string) => (s || '').replace(/</g, '&lt;')

export function bookingReceivedEmail(o: { name: string; ref: number; service: string }) {
  return shell(`<h2 style="color:#fff;margin:0 0 12px">Thanks, ${esc(o.name) || 'there'} — we’ve got your request!</h2>
    <p>Your ${esc(o.service) || 'travel'} request is in. Reference <b style="color:#fff000">#${o.ref}</b>.</p>
    <p>An agent will send you the best price shortly. Follow progress and reply anytime — no login needed:</p>
    <p style="margin:22px 0"><a href="${SITE}/track" style="background:#fff000;color:#0a0a0a;text-decoration:none;font-weight:800;padding:12px 24px;border-radius:100px;display:inline-block">Track booking #${o.ref}</a></p>
    <p style="color:#aaa;font-size:13px">Use reference <b>#${o.ref}</b> and the phone number you booked with.</p>`)
}

export function agentUpdateEmail(o: { ref: number; body: string; price?: string | null; terms?: string | null }) {
  const priceBlock = o.price ? `<div style="background:#1a1a1a;border:1px solid #333;border-radius:12px;padding:16px;margin:16px 0"><div style="font-size:24px;font-weight:900;color:#fff000">${esc(o.price)}</div>${o.terms ? `<div style="font-size:12px;color:${o.terms === 'fixed' ? '#ff8a8a' : '#4ade80'};text-transform:uppercase;font-weight:700;margin-top:5px">${o.terms === 'fixed' ? 'Fixed price' : 'Negotiable'}</div>` : ''}</div>` : ''
  return shell(`<h2 style="color:#fff;margin:0 0 12px">Update on your booking #${o.ref}</h2>
    ${priceBlock}
    ${o.body ? `<p>${esc(o.body)}</p>` : ''}
    <p style="margin:22px 0"><a href="${SITE}/track" style="background:#fff000;color:#0a0a0a;text-decoration:none;font-weight:800;padding:12px 24px;border-radius:100px;display:inline-block">View &amp; reply</a></p>
    <p style="color:#aaa;font-size:13px">Reply right on the tracker — reference <b>#${o.ref}</b> and your phone.</p>`)
}
