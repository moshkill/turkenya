import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { TURKENYA_SYSTEM_PROMPT } from '@/lib/turkenya-knowledge'
import { aiComplete } from '@/lib/ai'
import { prisma } from '@/lib/db'
import { notifyNewLead } from '@/lib/notify'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type ChatMsg = { role: 'user' | 'assistant'; content: string }

const WA_FALLBACK =
  'I\'m having a brief hiccup — the fastest way to reach us is WhatsApp +254 722 666 644 or call us directly. Our team replies within 2 hours.'

// Kenyan mobile: +2547XXXXXXXX, 2547XXXXXXXX, 07XXXXXXXX, 01XXXXXXXX
const PHONE_RE = /(?:\+?254|0)(?:7|1)\d{8}/

function pickProvider(): 'groq' | 'claude' | 'none' {
  const forced = (process.env.CHAT_PROVIDER || '').toLowerCase()
  if (forced === 'groq' && process.env.GROQ_API_KEY) return 'groq'
  if (forced === 'claude' && process.env.ANTHROPIC_API_KEY) return 'claude'
  if (process.env.GROQ_API_KEY) return 'groq'
  if (process.env.ANTHROPIC_API_KEY) return 'claude'
  return 'none'
}

async function askGroq(messages: ChatMsg[]): Promise<string> {
  const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b'
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
    body: JSON.stringify({
      model, max_tokens: 400, temperature: 0.6,
      messages: [{ role: 'system', content: TURKENYA_SYSTEM_PROMPT }, ...messages],
    }),
  })
  if (!res.ok) throw new Error(`Groq ${res.status}`)
  const data = await res.json()
  return data?.choices?.[0]?.message?.content?.trim() || WA_FALLBACK
}

async function askClaude(messages: ChatMsg[]): Promise<string> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const completion = await anthropic.messages.create({
    model: process.env.CLAUDE_MODEL || 'claude-3-5-haiku-latest',
    max_tokens: 400,
    system: TURKENYA_SYSTEM_PROMPT,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  })
  return completion.content.filter((b) => b.type === 'text').map((b) => (b as { text: string }).text).join('\n').trim() || WA_FALLBACK
}

// Capture a real lead once the customer has shared a phone number.
// Fire-and-forget: must never block or break the chat reply.
async function maybeCaptureLead(messages: ChatMsg[]): Promise<void> {
  try {
    const userText = messages.filter((m) => m.role === 'user').map((m) => m.content).join('  ')
    if (!PHONE_RE.test(userText.replace(/\s/g, ''))) return // no phone yet — not a lead

    const transcript = messages.map((m) => `${m.role === 'user' ? 'Customer' : 'Assistant'}: ${m.content}`).join('\n')
    const sys = 'You extract structured lead details from a travel enquiry chat for a Kenyan travel agency. Return ONLY JSON.'
    const prompt = `Conversation:\n${transcript}\n\nReturn ONLY JSON: {"name":"","phone":"","service":"","travelDates":"","summary":"one concise line describing exactly what the customer wants (vehicle/route/dates/etc)"}. Use "" for anything not provided. Keep the customer's phone exactly as they wrote it.`
    const raw = await aiComplete(sys, prompt, 300)
    const parsed = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1)) as {
      name?: string; phone?: string; service?: string; travelDates?: string; summary?: string
    }

    const phone = (parsed.phone || (userText.replace(/\s/g, '').match(PHONE_RE)?.[0]) || '').toString().trim()
    if (!phone) return

    const name = (parsed.name || 'Chat customer').trim()
    const service = (parsed.service || 'Chat enquiry').trim()
    const travelDates = (parsed.travelDates || '').trim() || null
    const message = (parsed.summary || transcript).slice(0, 1000)

    // Dedup: one chat lead per phone — update it as the conversation grows.
    const existing = await prisma.lead.findFirst({ where: { phone, source: 'chat' }, orderBy: { createdAt: 'desc' } })
    if (existing) {
      await prisma.lead.update({
        where: { id: existing.id },
        data: { name, service, travelDates, message },
      })
    } else {
      await prisma.lead.create({
        data: { name, phone, email: null, service, travelDates, message, source: 'chat' },
      })
      // Only notify the team the first time we capture this person.
      notifyNewLead({ name, phone, email: null, service, travelDates, message, source: 'chat' })
    }
  } catch (err) {
    console.error('chat lead capture failed:', err)
  }
}

// POST /api/chat — public Turkenya AI concierge.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const message = String(body.message || '').trim()
    const history: ChatMsg[] = Array.isArray(body.history) ? body.history : []

    if (!message) {
      return NextResponse.json({ reply: 'Ask me anything about our safaris, flights, or services!' })
    }

    const provider = pickProvider()
    if (provider === 'none') {
      return NextResponse.json({ reply: WA_FALLBACK })
    }

    const messages: ChatMsg[] = [
      ...history
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.content)
        .slice(-10)
        .map((m) => ({ role: m.role, content: String(m.content).slice(0, 2000) })),
      { role: 'user', content: message.slice(0, 2000) },
    ]

    const reply = provider === 'groq' ? await askGroq(messages) : await askClaude(messages)

    // Capture the lead in the background (persistent server keeps it alive).
    maybeCaptureLead([...messages, { role: 'assistant', content: reply }])

    return NextResponse.json({ reply })
  } catch (err) {
    console.error('POST /api/chat failed:', err)
    return NextResponse.json({ reply: WA_FALLBACK })
  }
}
