# CLAUDE.md — Turkenya Tours & Safaris
> Load this at the start of EVERY session. Full project context.

---

## THE PROJECT

**Client:** Turkenya Tours & Safaris (turkenya.com)
**Studio:** Moshcode Studios (Moshiiz)
**What:** Fully custom web application — NO WordPress, NO plugins
**Stack:** Next.js 14 + TypeScript + Tailwind CSS
**Target Audience:** Diaspora clients (Kenyans abroad — UK, UAE, US, Europe) + corporate travel

---

## YOUR ROLE

You are the technical co-developer alongside Moshiiz.
- Moshiiz makes product decisions and approves designs
- You write the code, build UI components, set up servers, build APIs
- When he says "do it" — do it. Write the code, deploy it.
- Never make him guess. Give exact commands, exact code, exact values.

---

## PHILOSOPHY

Everything custom, everything owned. No WordPress, no plugins, no third-party SaaS dependencies.
We build it, we control it, we own it. That's the whole point.

---

## STACK

```
Frontend:  Next.js 14.2.35 (App Router, SSR, TypeScript)
Styling:   Tailwind CSS 3.4 + inline styles (current mix)
Fonts:     Abel (body/UI) + Playfair Display (headings) via Google Fonts
Images:    Unsplash (hotlinked) + local videos in /public/videos/
AI Chat:   Claude API (Anthropic) — NOT OpenAI
Server:    Linode Nanode 172.238.107.107 (Ubuntu 22.04, LIVE)
Process:   PM2 + Nginx
Repo:      https://github.com/moshkill/turkenya.git
```

---

## DESIGN STANDARD

**Benchmark:** RonDesignLab — Spendex Credit SaaS, CoStar CRM Real Estate SaaS
- Purposeful animations (not decorative fluff)
- Strong typography hierarchy with generous whitespace
- Crisp card designs with subtle shadows/borders
- Smooth scroll-triggered reveals & micro-interactions
- Clean data presentation (stats, pricing, features)
- Dark theme with yellow accents — push the polish further

---

## BRAND

| Role | Hex | CSS Variable |
|------|-----|-------------|
| Primary Yellow | `#fff000` | `--yellow` |
| Hover Yellow | `#FFDC3E` | `--yellow-hover` |
| Active Yellow | `#E8A800` | `--yellow-active` |
| Midnight Black | `#0D0D0D` | `--black` |
| Dark Graphite | `#1E1E1E` | `--graphite` |
| Warm White | `#F8F8F5` | `--warm-white` |
| Off White | `#F5F0E8` | `--off-white` |
| Warm Grey | `#9E9080` | `--warm-grey` |

---

## BUSINESS CONTEXT

**Core strengths:**
- Air ticketing — individuals AND corporate (managing 200+ employee travel)
- Competitive pricing + quality itinerary planning
- Safari & tour packaging for diaspora market

**The website's job:** Be a sales machine that works when the team is sleeping.
Not a brochure — a conversion engine.

---

## NAVIGATION

```
Desktop: Home | Air Tickets | Tours ▾ | Car Hire | Logistics | Blog | About | [BOOK NOW]
Tours ▾: Safaris | International

Mobile: Hamburger → slide-out with all services listed

Always visible: BOOK NOW button (→ /contact) + Hamburger icon
```

---

## PAGES & STATUS

All 18 pages are built with real content (not stubs). Quality varies — all need redesign to RonDesignLab standard.

| Page | Route | Status |
|------|-------|--------|
| Home | `/` | ✅ Built — hero slider, services, testimonials, airlines, CTA |
| Safaris | `/safaris` | ✅ Built — 6 packages with pricing |
| Air Ticketing | `/air-ticketing` | ✅ Built — 4 flight categories, 12 airlines |
| Air Tickets | `/air-tickets` | ⚠️ DUPLICATE of air-ticketing — consolidate |
| Car Rental | `/car-rental` | ✅ Built — 6 vehicles, self-drive vs chauffeur |
| Hotel Booking | `/hotel-booking` | ✅ Built — 6 destinations |
| International | `/international` | ✅ Built — 6 destinations with pricing |
| Pilgrimage Tours | `/pilgrimage-tours` | ✅ Built — 6 packages |
| Medical Tourism | `/medical-tourism` | ✅ Built — 4 destinations, 8 services |
| Conferences | `/conferences` | ✅ Built — 6 MICE services |
| Airport Transfers | `/airport-transfers` | ✅ Built — 4 vehicle types with pricing |
| Logistics | `/logistics` | ✅ Built — fleet, process flow |
| Blog | `/blog` | ✅ Built — 6 posts listed, category filters |
| Blog Post | `/blog/[slug]` | ⚠️ Only 2 of 6 articles written — rest 404 |
| About | `/about` | ✅ Built — company story, values |
| Contact | `/contact` | ✅ Built — full form, submits to `/api/leads` |
| Admin | `/admin` | ✅ CRM dashboard — login, leads, status, WhatsApp |
| 404 | `/not-found` | ✅ Built |

---

## KEY COMPONENTS

| Component | File | Status |
|-----------|------|--------|
| Header | `components/layout/Header.tsx` | ✅ Responsive, fixed, scroll-aware |
| Footer | `components/layout/Footer.tsx` | ✅ Full — services, links, contact, badges |
| HeroSlider | `components/HeroSlider.tsx` | ✅ 5 slides (3 video, 2 image), auto-advance |
| Loader | `components/Loader.tsx` | ✅ Puzzle-piece animation |
| AnimationProvider | `components/AnimationProvider.tsx` | ✅ Scroll reveal setup |
| ScrollReveal | `components/ScrollReveal.tsx` | ✅ Built but unused |
| ChatWidget | `components/ChatWidget.tsx` | ✅ UI built, backend not connected |
| useParallax | `hooks/useParallax.ts` | ✅ Scroll parallax hook |

### Unused section components (in `components/sections/`)
These exist but are NOT imported — homepage renders inline:
`BlogPreview.tsx`, `ChatWidget.tsx`, `Destinations.tsx`, `FeaturedSafaris.tsx`, `Hero.tsx`, `Services.tsx`, `Testimonials.tsx`, `TrustStrip.tsx`, `WhyTurkenya.tsx`

---

## KNOWN ISSUES

1. `/air-ticketing` and `/air-tickets` are duplicate routes — consolidate
2. 4 of 6 blog posts have no article content (will 404 if clicked)
3. `logistics/page.tsx` uses Tailwind classes while rest uses inline styles
4. ChatWidget calls Groq API — should be Claude API
5. No per-page SEO metadata (only layout.tsx has meta)
6. All images hotlinked from Unsplash — need local/CDN for production
7. No `app/api/` routes exist — backend is 0%
8. 9 unused components in `components/sections/`

---

## VIDEOS

Three local videos in `/public/videos/`:
- `airplane.mp4` (~5.7MB) — Air Ticketing slide
- `dubai.mp4` (~9.4MB) — International Tours slide
- `safaris.mp4` (~10.5MB) — Safari Tours slide

---

## ROADMAP

### PHASE 1 — "Make them stop scrolling"

**1A. Frontend Redesign (RonDesignLab standard)**
- Redesign every page — animations, typography, whitespace, micro-interactions
- Consolidate duplicate routes (`/air-ticketing` + `/air-tickets`)
- Delete unused `components/sections/` files
- Add per-page SEO metadata
- Corporate travel / MICE should be prominent, not buried

**1B. Backend Foundation**
- PostgreSQL on Linode
- API routes: `/api/leads`, `/api/chat`, `/api/admin/*`
- Environment variables + `.env` setup
- Deploy with PM2 + Nginx

**1C. AI Concierge**
- Claude API integration for chat assistant
- Trained on Turkenya services, pricing, destinations
- Qualifies leads 24/7, collects contact info, hands off to WhatsApp

**1D. Instant Quote Builder**
- Pick service → dates → group size → budget tier → get a quote
- PDF export for corporate clients

**1E. WhatsApp Pipeline**
- Every form submission, AI chat, and quote → WhatsApp notification to sales team
- Full context included (not just "new lead")

**1F. Auto Blog**
- AI-written posts on schedule — safari guides, travel costs, destination tips
- SEO-optimized, published automatically, zero manual effort

**1G. Interactive Testimonials**
- Replace static cards with engaging format
- Animated carousel, video testimonials, or live review wall

### PHASE 2 — "Make them come back"

- Trip tracker / planner (sales agent prices in backend, client sees via WhatsApp)
- Client portal (itinerary, flights, hotels, contacts — one link)
- Referral / affiliate system (partners earn commissions)
- Multi-language support (EN/FR/AR/DE)
- Smart seasonal pricing with urgency signals
- Review automation (post-trip review requests)

---

## RULES

1. No WordPress, no CMS plugins, no third-party page builders — ever
2. No paid subscriptions or SaaS dependencies (no Yoast, no Gravity Forms, no Mailchimp)
3. All features built in-house: forms, blog, analytics, SEO, email, chat — all custom code
4. DNS stays untouched until full approval
5. All public pages use SSR (Next.js) for SEO — `force-dynamic` on pages
6. Mobile first — 70% of visitors on phones
7. AI chat = Claude API only (Anthropic, not OpenAI)
8. Never commit .env to git
9. Brand colours strictly as defined above (`#fff000` primary, NOT `#F5C518`)
10. Dark theme — `#0D0D0D` background everywhere
11. Abel font for body/UI, Playfair Display for hero headings
12. Design standard = RonDesignLab level polish
13. Speak to diaspora — copy should resonate with someone in London, Dubai, or New York
