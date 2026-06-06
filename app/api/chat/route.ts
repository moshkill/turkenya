import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { TURKENYA_SYSTEM_PROMPT } from '@/lib/turkenya-knowledge'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type ChatMsg = { role: 'user' | 'assistant'; content: string }

const WA_FALLBACK =
  'I\'m having a brief hiccup — the fastest way to reach us is WhatsApp +254 722 666 644 or call us directly. Our team replies within 2 hours.'

// Decide which provider to use.
// CHAT_PROVIDER env can force "groq" or "claude". Otherwise auto-detect:
// prefer free Groq if its key exists, else Claude, else fallback.
function pickProvider(): 'groq' | 'claude' | 'none' {
  const forced = (process.env.CHAT_PROVIDER || '').toLowerCase()
  if (forced === 'groq' && process.env.GROQ_API_KEY) return 'groq'
  if (forced === 'claude' && process.env.ANTHROPIC_API_KEY) return 'claude'
  if (process.env.GROQ_API_KEY) return 'groq'
  if (process.env.ANTHROPIC_API_KEY) return 'claude'
  return 'none'
}

// --- Groq (free, OpenAI-compatible) via fetch — no SDK needed ---
async function askGroq(messages: ChatMsg[]): Promise<string> {
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 400,
      temperature: 0.6,
      messages: [{ role: 'system', content: TURKENYA_SYSTEM_PROMPT }, ...messages],
    }),
  })
  if (!res.ok) throw new Error(`Groq ${res.status}`)
  const data = await res.json()
  return data?.choices?.[0]?.message?.content?.trim() || WA_FALLBACK
}

// --- Claude (Anthropic) ---
async function askClaude(messages: ChatMsg[]): Promise<string> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const completion = await anthropic.messages.create({
    model: process.env.CLAUDE_MODEL || 'claude-3-5-haiku-latest',
    max_tokens: 400,
    system: TURKENYA_SYSTEM_PROMPT,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  })
  return (
    completion.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { text: string }).text)
      .join('\n')
      .trim() || WA_FALLBACK
  )
}

// POST /api/chat — public. Turkenya AI travel concierge.
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
    return NextResponse.json({ reply })
  } catch (err) {
    console.error('POST /api/chat failed:', err)
    return NextResponse.json({ reply: WA_FALLBACK })
  }
}
