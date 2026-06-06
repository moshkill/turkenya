import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { TURKENYA_SYSTEM_PROMPT } from '@/lib/turkenya-knowledge'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type ChatMsg = { role: 'user' | 'assistant'; content: string }

const WA_FALLBACK =
  'I\'m having a brief hiccup — the fastest way to reach us is WhatsApp +254 722 666 644 or call us directly. Our team replies within 2 hours.'

// POST /api/chat — public. Turkenya AI travel concierge powered by Claude.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const message = String(body.message || '').trim()
    const history: ChatMsg[] = Array.isArray(body.history) ? body.history : []

    if (!message) {
      return NextResponse.json({ reply: 'Ask me anything about our safaris, flights, or services!' })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      // Not configured yet — graceful fallback so the widget still helps
      return NextResponse.json({ reply: WA_FALLBACK })
    }

    const anthropic = new Anthropic({ apiKey })

    // Build message list: prior turns (trimmed) + the new message
    const messages = [
      ...history
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.content)
        .slice(-10)
        .map((m) => ({ role: m.role, content: String(m.content).slice(0, 2000) })),
      { role: 'user' as const, content: message.slice(0, 2000) },
    ]

    const completion = await anthropic.messages.create({
      model: 'claude-3-5-haiku-latest',
      max_tokens: 400,
      system: TURKENYA_SYSTEM_PROMPT,
      messages,
    })

    const reply =
      completion.content
        .filter((b) => b.type === 'text')
        .map((b) => (b as { text: string }).text)
        .join('\n')
        .trim() || WA_FALLBACK

    return NextResponse.json({ reply })
  } catch (err) {
    console.error('POST /api/chat failed:', err)
    return NextResponse.json({ reply: WA_FALLBACK })
  }
}
