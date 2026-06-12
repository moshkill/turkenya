# The Turkenya Web App Bible

*Every feature, system and decision — Turkenya Tours & Safaris x Moshcode Studios.*


## Executive Summary

The Turkenya Web App is a fully custom, in-house web application for Turkenya Tours & Safaris (turkenya.com) — built by Moshcode Studios with zero WordPress, zero plugins and zero third-party SaaS dependencies. Everything on it — the booking engine, the CRM, the review system, the offers manager, the blog, the icon set, the charts — is custom code that Turkenya owns outright.

It is not a brochure. It is a sales machine designed to convert while the team sleeps: a conversational smart-booking system collects qualified leads 24/7, a full admin CRM lets agents work those leads from any device, and self-service content engines (offers, testimonials, auto-blog) let the business update the site without touching code.

Status: live on a Linode cloud server, roughly 90% complete. Remaining work is cosmetic polish, final imagery, and the SSL/domain cutover.


### Who It Serves

- Diaspora clients — Kenyans in the UK, US, UAE and Europe planning flights and trips home. The copy, currencies and flows are written for them.
- Corporate clients — companies moving 10–200+ staff, hiring vehicle fleets on multi-year contracts, and shipping cargo. Corporate is featured, never buried.
- Individual travellers — safaris, holidays, pilgrimages, medical travel, weddings and airport runs.

### Key Numbers Shown Across the Site


| Metric | Value |
| --- | --- |
| Flights issued per month | 471 (IATA-accredited) |
| In business since | 2009 |
| Safaris per year | 300+ |
| Hire vehicles | 200+ |
| Trucks in logistics fleet | 200+ |
| Airlines ticketed | 30+ |
| Customer rating displayed | 4.9 / 5 (computed from real review data) |


## Technology Stack & Architecture


| Layer | Technology |
| --- | --- |
| Frontend | Next.js 14.2.35 (App Router, Server-Side Rendering), TypeScript, React 18 |
| Styling | Tailwind CSS base + precision inline styling; custom CSS animation library |
| Fonts | Abel (body/UI), Urbanist (display numerals/headings), Playfair Display (editorial quotes) |
| Database | PostgreSQL with Prisma ORM (typed schema, migrations) |
| AI | Claude API (Anthropic) — quote auto-fill, auto-blog, concierge (Claude only, never OpenAI) |
| Server | Linode (Ubuntu 22.04) — Node behind Nginx, managed by PM2, 2.5GB swap for safe builds |
| Repo & deploys | GitHub (private workflow), server pulls via read-only SSH deploy key — no tokens on disk |
| Process | git push → server pull → npm build → PM2 restart; database changes via prisma db push |


### Architecture Principles

- Everything custom, everything owned — no licence fees, no plugin vulnerabilities, no vendor lock-in.
- All public pages are server-rendered (SSR) for SEO — Google sees full content, not a JavaScript shell.
- Mobile-first: 70% of visitors are on phones; every component is built for touch first.
- The website never quotes prices automatically. Every flow ends with a human agent sending the best price on WhatsApp — protecting margins and adding the personal touch.

## Brand & Design System


### Visual Identity


| Element | Specification |
| --- | --- |
| Primary Yellow | #FFF000 — CTAs, accents, highlights |
| Midnight Black | #0D0D0D — background everywhere (premium dark theme) |
| Design benchmark | RonDesignLab standard (Spendex, CoStar) — purposeful motion, strong hierarchy, generous whitespace |
| Surfaces | Glassmorphism: frosted-glass buttons, blurred overlays, subtle borders |
| Type scale | Site-wide readability pass: all body text raised one step (14/15/16px) because Abel runs small |


### In-House Icon System

A custom library of 40+ hand-built line icons (planes, cars, trucks, compasses, globes, phones, calendars, shields...) replaces every emoji across the app. They are stroke-based SVGs that inherit text colour, scale to any size, and cost almost nothing in page weight. No icon library dependency.


### Motion & Micro-interaction Library

- Scroll-triggered reveals on every page; scroll-driven parallax image bands.
- Hero slider: seamless video-to-video crossfades (all five videos stay mounted; posters appear only on a true first load).
- Postcard offer cards: lift-and-tilt hover with slow image zoom.
- Hamburger: circular glass button whose lines morph into a yellow X; menu links stagger in.
- Booking chat: typewriter questions with blinking caret, pulsing AI orb, tactile chips, mobile haptic taps.
- Every animation respects prefers-reduced-motion for accessibility.

### Custom Touches

- Paper-plane custom cursor on desktop (auto-hides over modals and on touch devices).
- Puzzle-piece page loader; yellow scroll-progress bar; dive-into-image page transitions.
- Styled form elements: brand-chevron dropdowns, dark option lists, yellow focus rings.

## The Smart Booking System (Flagship)

The heart of the conversion machine. Instead of long forms, visitors have a short conversation — one question at a time, seven words or fewer — that collects exactly what an agent needs to quote. It feels like chatting with a concierge, but it is deterministic, instant, and works offline-fast.


### Five Conversational Flows


| Flow | What it asks |
| --- | --- |
| Flights | Who is travelling (family vs corporate) → destination → origin → one-way/return → dates → passengers (adults/children/infants) → cabin → contact. Corporate branch swaps in: company, traveller count, booking frequency, billing preference. |
| Car Hire | Need (corporate contract / executive VIP / self-drive / chauffeur / wedding / airport) → vehicle → duration → start date → pickup point → contact. |
| Safari | Which park → when → passengers → comfort level (budget/mid/luxury) → contact. |
| International | Destination → dates → nights → passengers → contact. |
| Logistics | Cargo type → load size → origin → destination → frequency → contact. |


### Intelligence Built In

- Context awareness: click "Domestic" and it suggests Mombasa/Kisumu/Lamu; click "Regional" and it suggests Entebbe/Dar/Kigali.
- Never asks twice: click "Book This Vehicle" on the Prado and the flow skips "Which vehicle?". Same for safari parks, packages and destinations — whatever the card says rides silently into the lead.
- Smart validation: live green ticks on name/phone/email; submit only unlocks when valid.
- No price is ever shown — every flow ends with "an agent sends your best price on WhatsApp".

### Entry Points Everywhere

- Homepage hero: "Where are you headed?" one-line ask plus one-tap chips (Flights, Safari, Holidays, Car Hire, Logistics).
- Book Now (header, every page): opens a service picker, then the matching flow.
- Every card on every service page: fleet vehicles, safari parks, packages, destinations, hire types, route categories.
- Every flow is fully dismissible: X button, click outside, or Escape key. The standalone quote page has Back and Exit at every step.

### AI Auto-Fill (Quote Builder)

On the classic quote form, a visitor can simply type "Return flights Nairobi to London, 2 adults 1 child, business class, leaving 15 Dec back 5 Jan" and Claude AI parses it into the form fields instantly.


## The Website, Page by Page


### Homepage

- Full-screen slider — five slides, ALL playing Turkenya-owned video (flights, safari, Dubai, Prado fleet, truck fleet) with seamless crossfades and poster fallbacks.
- Credibility strip: 471 flights/month, trusted since 2009, IATA, 300+ safaris/year, 24/7 WhatsApp.
- "Where are we heading?" — the conversational booking ask plus quick-start chips.
- "What We Do" bento grid — 10 tiles sized by commercial value (Air Ticketing biggest), 100% client photography, each linking to its service.
- Testimonials carousel with computed 4.9 rating badge, portraits, auto-rotation and link to the reviews page.
- Airline partners wall (30+ logos) and conversion-focused footer CTA.

### Air Ticketing

- Client video hero (poster-first loading), categories (Domestic / Regional / International) plus a wide featured Corporate & Groups banner.
- Category-scoped booking: open Domestic and the flow already knows.
- Animated SVG world flight map — routes arc out of Nairobi to 10 cities with moving planes.
- Count-up animated stats, popular routes with fares, 3-step how-it-works, corporate desk band, why-us icon grid.

### Safaris

- Client safari video hero; package deck rendered as compact clickable postcards (dashed frame, duration stamp, price, hover tilt) — backed by the Offers engine so the team can publish new packages from the admin.
- 13 explorable park cards (Mara to Lamu) with wildlife, activities, lodges and best season — each flowing into pre-filled booking.
- Big Five gallery, migration-season guide, why-Turkenya grid.

### Car Hire (first 100% client-imagery page)

- Prado fleet video hero with matching poster; corporate positioned as the headline business (contracts 3 days to 2 years).
- Four "Ways to Hire" cards: Corporate Contracts, Executive VIP (Range Rover), Self-Drive, Weddings & Airport (Rolls-Royce).
- Six-vehicle fleet — V8, Prado TX, Hiace, Corolla, RAV4, Rosa Coaster — every photo the client’s own; booking pre-fills the chosen vehicle.
- "The open road is the best way to experience Kenya" parallax moment with a Kenyan-plated safari Land Cruiser.

### Logistics

- Branded truck-fleet-at-Mombasa-port video hero; 200+ truck story.
- Fleet types (10-wheeler box bodies, 28–30t trailers, container haulage, low-loaders), client segments (government, manufacturers, SMEs, importers), East Africa route grid, 3-step process.

### International

- 11 destination cards (Dubai, Mauritius, Maldives, Greece, Paris, New York, Hong Kong, Bangkok, Turkey, Israel, Egypt) with highlights and best seasons; booking pre-fills the city.
- Five included-in-every-package items: Visa Assistance, Flight Booking, Curated Hotels, All Transfers, 24/7 Trip Support.

### Pilgrimage — Christianity First

- Hero: "Walk Where the Bible Happened" over Jerusalem.
- Featured Biblical Tours: Israel Holy Land and Turkey Footsteps of Paul (Tarsus, Antioch, Ephesus, the Seven Churches of Revelation).
- Then Rome, Fatima & Lourdes, Umrah, Hajj and India — every faith served; closes with a church-group CTA (10–100+ congregations).

### About — the Group Story

- Rebuilt to reflect the company today: "Kenya’s Full-Service Travel & Logistics House", full-width story (one ticketing desk in 2009 → IATA group), real stats strip, and "The Group Today" — eight division cards each linking to its page.

### Other Pages


| Page | Highlights |
| --- | --- |
| Hotel Booking | Six destination collections, Kenya & worldwide |
| Medical Tourism | Four treatment destinations, eight coordination services |
| Conferences & MICE | Six managed services, up to 1,000 delegates; faceless venue imagery |
| Airport Transfers | Four vehicle classes with transparent pricing |
| Blog | Six hand-written SEO articles with topical covers (client imagery where relevant) + AI auto-blog pipeline |
| Testimonials | 4.9 rating pill, review wall, always-visible submission form |
| Contact | Client photo hero, working lead form |
| Quote | Classic 3-step builder with AI auto-fill, Back/Exit at every step |
| 404 | Branded not-found page |


## Admin CRM Suite (/admin)

A private, login-protected command centre — designed like a modern SaaS app, not a database table. Three modules: Leads, Reviews, Offers.


### Leads Dashboard

- Bento analytics row: pipeline donut chart (click a segment to filter), 7-day lead trend sparkline, and a yellow "Needs Action" card showing new leads awaiting first contact.
- "Where leads come from" — source bars (Smart Flights, Smart Car Hire, Contact Form, Quote Builder...) and "Bookings by service" bars (Air, Safari, Logistics...), both clickable filters. Every division has a home.
- Master–detail lead manager: searchable list with status dots and date grouping (Today / Yesterday / This week), full enquiry detail with parsed key-value fields.
- One-tap actions: WhatsApp the client, call, email, copy number; status pipeline (new → contacted → converted → closed/lost); CSV export of any filtered view.
- Quality of life: keyboard navigation (arrows + Escape), 60-second live auto-refresh with pause, full mobile drawer layout.

### Reviews Moderation

- Every visitor-submitted review lands as Pending — nothing publishes itself.
- Approve → appears on the Testimonials page. Feature → also appears in the homepage carousel. Unapprove/delete any time.

### Offers Manager

- Create safari/holiday packages from a form: title, category, image (live preview), display price, duration, highlights, Best-Value badge, sort order.
- Publish/Hide instantly; offers append to the built-in deck on the site (same-title offers override their built-in twin). The website never looks empty and never loses content.

### Security

- Server-validated login; session held in an HMAC-signed httpOnly cookie (JavaScript cannot steal it). Admin pages render none of the public chrome.

## Backend & API Reference


### Public Endpoints


| Endpoint | Purpose |
| --- | --- |
| POST /api/leads | Stores every booking conversation, contact form and quote; tagged with source + service |
| POST /api/chat | Claude AI concierge endpoint (widget currently paused, backend live) |
| POST /api/parse-trip | AI auto-fill: free text → structured form values |
| GET/POST /api/testimonials | List approved reviews / accept new submissions (pending by default) |
| GET /api/offers | Active offers by category for the public site |


### Admin Endpoints (cookie-authenticated)


| Endpoint | Purpose |
| --- | --- |
| POST /api/admin/login | logout | HMAC-signed httpOnly session cookie |
| GET /api/admin/leads (+/[id] PUT/DELETE) | Lead list, status updates, delete |
| GET /api/admin/stats | Lead counts by status for the dashboard |
| GET /api/admin/testimonials (+/[id]) | Moderation: approve, feature, delete |
| GET/POST /api/admin/offers (+/[id]) | Offers CRUD: create, edit, publish/hide, delete |
| POST /api/cron/generate-blog | AI auto-blog generation hook |


### Database Models (Prisma / PostgreSQL)


| Model | Fields (essence) |
| --- | --- |
| Lead | name, phone, email, service, travel dates, full message, source, status, timestamps |
| Testimonial | name, location, service, rating 1–5, message, approved, featured |
| Offer | title, category, image, display price, duration, tagline, highlights, featured, active, sort |
| BlogPost | slug, title, category, excerpt, content, image, published |
| ChatMessage | session id, role, text — concierge conversation log |


### Notifications

lib/notify.ts fires every new lead to a WhatsApp relay webhook the moment it is configured — sales gets full context, not just "new lead".


## Media: 100% Client-Owned Motion & Photography Push


### Video (all client-owned, all poster-first)


| Video | Where it plays |
| --- | --- |
| Airplane | Homepage slider — flights slide |
| Safari (original) | Homepage slider — Big Five slide |
| Safari adventure (cheetah) | Safaris page hero |
| Dubai | Homepage slider — holidays slide |
| Prado fleet | Homepage slider + Car Hire hero |
| Truck fleet at Mombasa port | Homepage slider + Logistics hero |
| Airport cargo loading | Air Ticketing hero |

Poster-first engine: a sharp image renders instantly and the video fades in only once fully buffered — no black frames, graceful on slow mobile data. The homepage slider keeps all five videos mounted so slide changes are true video-to-video crossfades.


### Client Photography Wired In (20+ images)

- Homepage "What We Do": all 10 tiles (airport aerial, migration, Burj Khalifa, hotel, Prado with Kenyan plates, conference hall, terminal, night trailer, Jerusalem, medical).
- Car Hire: all 14 visuals — first fully client-branded page.
- About story banner, Contact hero, blog covers (Mara, Dubai, car hire).

### Authenticity Cleanup

- All Western stock faces removed. Testimonials use curated African/Kenyan-appropriate portraits or honest initials avatars; real submissions always get initials.
- Vehicle photos are the actual models (verified); destination photos are the actual places (rhino shot at the Mara, elephant shot in Tsavo East itself); a sitewide dead-image audit fixed every broken URL.

## Content & Growth Engines


### Testimonial Engine

Visitor submits (star rating + review) → pending → admin approves → public wall → admin features → homepage. The 4.9 rating is computed live from review data and updates itself as real reviews arrive. Fifteen curated, on-service reviews (corporate clients leading) seed the wall until real ones take over via same-name override.


### Offers Engine

Marketing can launch a new safari or holiday package in two minutes from the admin — it appears on the site as a designed postcard, feeds the booking flow with its name, and can be hidden the moment it sells out. No developer required.


### Auto-Blog (AI)

A cron-triggered endpoint generates SEO-optimised travel articles with Claude and publishes them alongside the six hand-written guides — content marketing on autopilot.


### AI Concierge (staged)

A Claude-powered chat assistant trained on Turkenya services is built and wired (/api/chat with conversation history); the widget is intentionally paused pending a final UX pass before launch.


## Mobile, SEO & Performance


### Mobile Experience (70% of traffic)

- Tablet fix: full nav only appears at 1200px+ (it physically cannot fit below); tablets get the premium hamburger with a roomy 2-column menu.
- Sticky mobile action bar keeps Get a Quote + WhatsApp one thumb-tap away; booking modals fit small screens with haptic feedback on choices.
- Zero horizontal overflow verified at 375px; admin becomes a full-screen drawer app on phones.

### SEO Foundation

- Server-side rendering on all 19 public pages; unique hand-written title/description per page (including each blog article).
- Keyword-conscious naming: "Car Hire" and "Logistics" (how Kenyans actually search), "Biblical Tours from Kenya", "Cheap Flights from Kenya", "Umrah packages from Kenya".
- Six SEO articles live; auto-blog compounds content over time.

### Performance

- Shared JS bundle ~87KB — exceptionally light for an app this rich; charts and icons are hand-rolled SVG, not libraries.
- Lazy loading, poster-first video, next-slide prefetch, paused off-screen videos.

## Security & Operations

- Admin auth: server-validated password → HMAC-signed httpOnly cookie; raw token never touches the browser.
- Git: exposed access token found, removed and revoked; replaced with a read-only SSH deploy key. No secrets in the repository (public-safe).
- Input validation and length caps on all public endpoints; reviews and offers cannot self-publish.
- Repeatable deploys: push → pull → build → restart, ~2 minutes, with DB migrations only when schema changes.

## The Last 10% (Pre-Launch Checklist)

1. Remaining placeholder imagery: international destination cards, safari park cards, hotel destinations, and a few page heroes (medical, hotels, airport transfers) — batches being generated and wired as they arrive.
1. SSL + domain cutover: point turkenya.com DNS to the server, issue Let’s Encrypt certificate, switch to HTTPS (intentionally last, after content freeze).
1. WhatsApp relay URL: plug the Business API/webhook into lib/notify.ts to light up instant lead alerts.
1. Re-enable the AI concierge widget after its UX pass.
1. Nice-to-haves: image upload (vs URL) in the Offers admin; video compression pass for the heaviest clip.

## Phase 2 Vision

- Trip tracker & client portal — one link with itinerary, flights, hotels and contacts.
- Referral/affiliate programme for partners and diaspora communities.
- Multi-language (EN/FR/AR/DE) and smart seasonal pricing signals.
- Post-trip review automation feeding the testimonial engine.
The foundation is built for all of it: typed database, owned codebase, modular components, and an admin that grows with the business.

