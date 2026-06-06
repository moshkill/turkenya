import { NextRequest, NextResponse } from 'next/server'
import { aiComplete } from '@/lib/ai'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type FieldSpec = { name: string; label: string; type: string; options?: string[] }

const SYSTEM = `You extract structured booking details from a traveller's free-text description for Turkenya Tours & Safaris (Kenya). Today's context: customers book flights, safaris, car hire, hotels, international tours, logistics. Return ONLY the fields you can confidently infer. Be accurate; do not invent values.`

// POST /api/parse-trip  { service, text, fields:[{name,label,type,options}] }
// Returns { values: { fieldName: value, ... } } — only fields it could fill.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const text = String(body.text || '').trim().slice(0, 1500)
    const service = String(body.service || '').trim()
    const fields: FieldSpec[] = Array.isArray(body.fields) ? body.fields : []

    if (!text || fields.length === 0) {
      return NextResponse.json({ values: {} })
    }

    const fieldDesc = fields
      .map((f) => {
        const opts = f.options?.length ? ` (one of: ${f.options.join(' | ')})` : ''
        const t = f.type === 'number' ? ' (a number)' : f.type === 'date' ? ' (date as YYYY-MM-DD)' : f.type === 'multiselect' ? ' (comma-separated subset of the options)' : ''
        return `- "${f.name}": ${f.label}${opts}${t}`
      })
      .join('\n')

    const prompt = `Service: ${service}
Traveller said: "${text}"

Extract values for these fields where possible:
${fieldDesc}

Return ONLY valid JSON (no markdown, no commentary) like {"field": "value"}. Omit any field you cannot determine. For select/multiselect fields, values MUST match the given options exactly.`

    const raw = await aiComplete(SYSTEM, prompt, 500)
    const jsonStr = raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1)
    let values: Record<string, unknown> = {}
    try {
      values = JSON.parse(jsonStr)
    } catch {
      values = {}
    }

    return NextResponse.json({ values })
  } catch (err) {
    console.error('parse-trip failed:', err)
    return NextResponse.json({ values: {} })
  }
}
