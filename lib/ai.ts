import Anthropic from '@anthropic-ai/sdk'

// Generic AI text completion — same provider detection as the chat route.
// Prefers free Groq, falls back to Claude. Throws if neither is configured.
export async function aiComplete(
  system: string,
  user: string,
  maxTokens = 1800
): Promise<string> {
  const forced = (process.env.CHAT_PROVIDER || '').toLowerCase()
  const useGroq =
    (forced === 'groq' && process.env.GROQ_API_KEY) ||
    (forced !== 'claude' && process.env.GROQ_API_KEY)

  if (useGroq) {
    const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b'
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        temperature: 0.7,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    })
    if (!res.ok) throw new Error(`Groq ${res.status}`)
    const data = await res.json()
    return data?.choices?.[0]?.message?.content?.trim() || ''
  }

  if (process.env.ANTHROPIC_API_KEY) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const completion = await anthropic.messages.create({
      model: process.env.CLAUDE_MODEL || 'claude-3-5-haiku-latest',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: user }],
    })
    return completion.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { text: string }).text)
      .join('\n')
      .trim()
  }

  throw new Error('No AI provider configured (set GROQ_API_KEY or ANTHROPIC_API_KEY)')
}
