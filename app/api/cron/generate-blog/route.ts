import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { aiComplete } from '@/lib/ai'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

// Evergreen, SEO-focused topics for the Kenyan diaspora + travel market.
const TOPICS: { topic: string; category: string }[] = [
  { topic: 'The Best Time to Visit Maasai Mara for the Great Migration', category: 'Safari Tips' },
  { topic: 'How to Get a Dubai Visa from Kenya: A Complete Guide', category: 'International' },
  { topic: 'Diani vs Watamu: Which Kenyan Beach Is Right for You?', category: 'Destinations' },
  { topic: 'The Cheapest Months to Fly from Nairobi to Dubai', category: 'Air Travel' },
  { topic: 'What to Pack for a Kenyan Safari: The Complete Checklist', category: 'Safari Tips' },
  { topic: 'Umrah from Kenya: Costs, Visa, and What to Expect', category: 'Pilgrimage' },
  { topic: '7 Family-Friendly Safari Destinations in Kenya', category: 'Safari Tips' },
  { topic: 'Nairobi to Mombasa: Flight vs SGR Train Compared', category: 'Travel Tips' },
  { topic: "A First-Timer's Guide to Amboseli National Park", category: 'Destinations' },
  { topic: 'Planning a Honeymoon in Zanzibar: The Complete Guide', category: 'International' },
  { topic: 'How to Book International Flights for the Lowest Fares', category: 'Air Travel' },
  { topic: "Samburu National Reserve: Kenya's Hidden Safari Gem", category: 'Destinations' },
  { topic: 'How to Plan a Corporate Retreat or Conference in Kenya', category: 'Corporate' },
  { topic: 'Lake Nakuru: Flamingos, Rhinos, and the Best Time to Visit', category: 'Destinations' },
]

// Curated Unsplash images by category.
const IMAGES: Record<string, string> = {
  'Safari Tips': 'photo-1516426122078-c23e76319801',
  Destinations: 'photo-1549366021-9f761d450615',
  International: 'photo-1512453979798-5ea266f8880c',
  'Air Travel': 'photo-1436491865332-7a61a109cc05',
  Pilgrimage: 'photo-1591604129939-f1efa4d9f7fa',
  'Travel Tips': 'photo-1611348586804-61bf6c080437',
  Corporate: 'photo-1540575467063-178a50c2df87',
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 70)
}

const SYSTEM = `You are a senior travel writer for Turkenya Tours & Safaris, an IATA-accredited agency in Nairobi, Kenya (phone/WhatsApp +254 722 666 644). Write SEO-friendly, genuinely useful travel articles for an audience of Kenyans and the Kenyan diaspora (UK, US, UAE, Europe). Be specific, practical, and warm. Use real, sensible figures (KES for local, USD for international) without over-promising. End with a soft call to book with Turkenya.`

function userPrompt(topic: string): string {
  return `Write a blog article titled "${topic}".

Return ONLY valid JSON (no markdown fences, no commentary) with this exact shape:
{
  "title": "the article title",
  "excerpt": "a 1-2 sentence summary, max 160 chars",
  "readTime": "X min",
  "content": "the full article body"
}

Rules for "content":
- 500-750 words.
- Use SHORT ALL-CAPS section headings on their own line (e.g. "WHEN TO GO"), each followed by a blank line, then paragraphs.
- Separate every paragraph and heading with a blank line (\\n\\n).
- Plain text only — no markdown, no bullets, no links.
- Mention Turkenya and +254 722 666 644 naturally near the end.`
}

// POST or GET /api/cron/generate-blog?secret=XXX  (or x-cron-secret header)
async function handle(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  const provided =
    req.headers.get('x-cron-secret') ||
    req.nextUrl.searchParams.get('secret') ||
    ''
  if (!secret || provided !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Pick the first topic whose slug isn't already in the DB.
    const existing = await prisma.blogPost.findMany({ select: { slug: true } })
    const used = new Set(existing.map((e) => e.slug))
    const next = TOPICS.find((t) => !used.has(slugify(t.topic)))

    if (!next) {
      return NextResponse.json({ ok: true, message: 'All topics already generated.' })
    }

    const raw = await aiComplete(SYSTEM, userPrompt(next.topic), 2000)

    // Be tolerant of stray fences/text around the JSON.
    const jsonStr = raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1)
    const parsed = JSON.parse(jsonStr) as {
      title: string
      excerpt: string
      readTime?: string
      content: string
    }

    const slug = slugify(parsed.title || next.topic)
    if (used.has(slug)) {
      return NextResponse.json({ ok: true, message: 'Generated slug already exists, skipped.' })
    }

    const post = await prisma.blogPost.create({
      data: {
        slug,
        title: parsed.title || next.topic,
        category: next.category,
        excerpt: (parsed.excerpt || '').slice(0, 200),
        content: parsed.content || '',
        readTime: parsed.readTime || '5 min',
        image: `https://images.unsplash.com/${IMAGES[next.category] || IMAGES['Travel Tips']}?w=1400&q=80&fit=crop`,
        published: true,
      },
    })

    return NextResponse.json({ ok: true, slug: post.slug, title: post.title })
  } catch (err) {
    console.error('generate-blog failed:', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  return handle(req)
}
export async function GET(req: NextRequest) {
  return handle(req)
}
