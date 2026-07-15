# SouloSpotter — Complete Project Context

> **Purpose of this document:** Full project memory for AI collaborators (Cowork sessions, etc.). Covers product vision, stack, DB schema, all content seeded, all features built, affiliate programs, design system, and pending work. Updated: 2026-07-05.

---

## 1. What Is SouloSpotter

**SouloSpotter** (`soulospotter.com`) is a global solo travel directory. "Soulo" = solo + soul. The philosophy: *travel alone, find yourself.*

It is a curated guide — not user-generated content — built to help solo travelers find the best cafes, hostels, coworking spaces, restaurants, and experiences in cities around the world, with special attention to whether spots are comfortable to visit alone and whether they're good for meeting other travelers.

**Owner / Builder:** Alexis Mae Cruz (same person behind CuentaIQ)  
**GitHub:** https://github.com/alexismcruz/soulospotter  
**Live URL:** https://soulospotter.com  
**Local path:** `C:\Users\User\Documents\soulospotter`

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| ORM | Prisma v6 |
| Database | PostgreSQL on Railway |
| i18n | next-intl (`[locale]` routing, English only at launch) |
| Hosting | Vercel |
| Domain registrar | Namecheap |
| Analytics | Vercel Analytics |

**Important CWD note:** The terminal CWD resets to `C:\Users\User\Documents\Accounting App` between sessions. Always `cd C:\Users\User\Documents\soulospotter` before running any scripts.

---

## 3. Design System

Applied 2026-05-31. Defined as Tailwind tokens in `globals.css @theme`.

**Fonts:**
- Headings: **Playfair Display** (class: `font-display`)
- Body: **DM Sans** — loaded via `next/font/google`

**Color tokens:**

| Token | Hex | Usage |
|---|---|---|
| `soulo-slate` | `#1F2D3D` | Hero, nav, footer backgrounds |
| `soulo-gold` | `#F0A500` | All CTAs, active states |
| `soulo-teal` | `#00BFA5` | Safety badges |
| `soulo-linen` | `#F7F3EE` | Alternate section backgrounds |
| `soulo-white` | `#FAFAF8` | Primary background |
| `soulo-border` | `#E8E3DC` | All borders |
| `soulo-dark` | `#1A1A2E` | Primary text |
| `soulo-grey` | `#4A6278` | Secondary text |
| `soulo-mist` | `#8AAAC0` | Muted/placeholder text |

---

## 4. Database Schema (Prisma)

### Models

#### `Country`
```
id, name, slug (unique), code (ISO 3166-1 alpha-2, unique), region, flagEmoji, cities[]
```

#### `City`
```
id, name, slug (unique), countryId, country, region, description (Text),
imageUrl, lat, lng, timezone, currency, language, safetyScore (1-10),
costLevel (CostLevel?), spots[], tags (CityTag[]), experiences[],
soloTips (Text?) — solo-traveler-specific advice,
soloLevel (SoloLevel?) — BEGINNER/INTERMEDIATE/ADVANCED,
seoTitle, seoDesc, published, createdAt, updatedAt

Indexes: [region], [published]
```

#### `Spot`
```
id, name, slug, cityId, city, category (SpotCategory),
description (Text), address, lat, lng, website, phone, googleMapsUrl,
imageUrl, priceRange (PriceRange?), rating (1-5 float),
meetPeople (Boolean default false) — good for meeting other travelers,
comfortableAlone (Boolean default false) — comfortable to visit solo,
tags (SpotTag[]), affiliateLinks (AffiliateLink[]), published

Unique: [cityId, slug]
Indexes: [cityId, category], [published]
```

#### `Experience`
```
id, slug (unique), name, cityId, city, category (ExperienceCategory),
description (Text), price (per person), groupSizeMin, groupSizeMax,
duration (e.g. "2 hours"), frequency (daily/weekly/etc),
bookingUrl, photoUrl, organizerId, organizer, isFeatured, isActive
```

#### `AffiliateLink`
```
id, spotId, provider (AffiliateProvider), url, label
```

#### `Submission` — Community-submitted new spots and corrections
#### `AdvertiseInquiry` — Advertising tier inquiries
#### `ExperienceOrganizer` — Organizer profiles for experiences
#### `ExperienceSubmission` — Experience listing applications

### Enums

**Region:** `NORTH_AMERICA | LATIN_AMERICA | EUROPE | AFRICA | CARIBBEAN | ASIA | OCEANIA`
- Note: `MIDDLE_EAST_AFRICA` was renamed to `AFRICA`; `CARIBBEAN` was added 2026-06-12

**CostLevel:** `BUDGET | MID_RANGE | EXPENSIVE` ← NOT "MODERATE" (common mistake)

**PriceRange:** `FREE | BUDGET | MID | HIGH` ← NOT "LOW" (common mistake)

**SoloLevel:**
- `BEGINNER` — easy infrastructure, English-friendly, established solo-traveler culture
- `INTERMEDIATE` — some language barrier or logistics complexity
- `ADVANCED` — challenging infrastructure, language, or safety considerations

**SpotCategory:** `ACCOMMODATION | CAFE | COWORKING | FOOD | WELLNESS | COMMUNITY | NATURE | CULTURE | NIGHTLIFE | TRANSPORT`

**ExperienceCategory:** `OUTDOOR_ADVENTURE | FOOD_DRINK | ARTS_CULTURE | WELLNESS_MINDFULNESS | NIGHTLIFE_SOCIAL | DAY_TRIPS | PHOTOGRAPHY_WALKS | FITNESS_SPORTS`

**AffiliateProvider:** `BOOKING_COM | HOSTELWORLD | AIRBNB | SAFETYWING | WORLD_NOMADS | AIRALO | GETYOURGUIDE | VIATOR | OTHER`

---

## 5. Database Content (as of 2026-07-05)

### Totals
- **92 countries**
- **321 cities** (all published)
- **~2,800 spots** (all published)
- **787 experiences**

### Cities by Region

| Region | Cities | Spots/Exp Status |
|---|---|---|
| Latin America | 93 | ✅ Complete — ~3 spots + 3 experiences per city |
| Europe | 74 | ✅ Complete |
| Africa | 70 | ✅ Complete |
| Caribbean | 35 | ✅ Complete |
| Asia | 35 | ✅ Complete |
| North America | 11 | ✅ Complete |
| Oceania | 3 | ✅ Complete |

### Solo Content (seeded 2026-07 sprint)
Every city now has:
- `soloTips` — paragraph of solo-traveler-specific advice written in solo voice
- `soloLevel` — BEGINNER / INTERMEDIATE / ADVANCED classification
- `description` — rewritten in solo-traveler voice

Every spot (~2,800) has:
- `meetPeople` — boolean (true if the spot is good for meeting other travelers/locals)
- `comfortableAlone` — boolean (true if comfortable to visit solo — eating alone, etc.)

These were flagged using category rules + keyword matching in `scripts/seed-solo-spot-flags.js`.

### City Thumbnails
All 321 cities have real Pexels photos fetched via `scripts/fetch-city-photos-pexels.js`.
- Pexels API key: `lPNs2kgWeJZdH3QWqu9wsAHIJm4J1X0EQFAw7kSn8uDJjPCb06JNNk9y`
- Each city slug has a curated search query in `SEARCH_OVERRIDES` map inside the script
- Script has a fallback query if primary returns nothing
- Has a `where: { NOT: { imageUrl: { contains: 'pexels.com' } } }` filter so re-runs only fetch missing cities
- Pexels free tier: 200 req/hour — run in two batches if adding many new cities at once

---

## 6. All Pages (Routes)

| Route | Description |
|---|---|
| `/` | Homepage — hero, region grid, featured cities, category grid |
| `/destinations` | All 321 cities — search + region/budget/solo-level filter |
| `/destinations/[slug]` | City detail — hero, stats, soloTips panel, spots, experiences |
| `/destinations/[slug]/[category]` | City filtered to one spot category |
| `/destinations/[slug]/[category]/[spot]` | Individual spot detail page |
| `/regions/[slug]` | Region page — filtered city grid |
| `/experiences` | Experiences marketplace listing |
| `/experiences/[slug]` | Individual experience detail |
| `/experiences/list-your-experience` | Experience organizer application form |
| `/resources` | Resources hub index |
| `/resources/travel-insurance` | SafetyWing vs World Nomads comparison |
| `/resources/esims` | eSIM guide (BreezeSim affiliate live) |
| `/resources/tours` | GetYourGuide picks |
| `/submit` | Community spot submission form |
| `/advertise` | Advertising tiers ($29/$79/$149/month), inquiry form |
| `/about` | About page |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

---

## 7. Key Components

### `src/components/city/`
- **`CityHero.tsx`** — Full-width hero with city image, name, country flag, category nav tabs
- **`CityStats.tsx`** — Stats grid: safety score, cost level, language, currency, soloLevel. Also renders colored `soloTips` panel above the grid (color matches soloLevel: green/amber/rose)
- **`SpotList.tsx`** — Client component. Category filter tabs (sticky), "🤝 Meet People" and "🧘 Comfortable Alone" toggle filters, spot card grid with solo badges on each card
- **`TripResources.tsx`** — Affiliate strip (insurance, eSIM, flights)

### `src/components/destinations/`
- **`CityCard.tsx`** — City card with Pexels image, soloLevel badge (bottom-left overlay), country flag, cost level, safety score, spot count
- **`DestinationsClient.tsx`** — Client component handling search + region pill + budget dropdown filters; groups results by region → country → city

### `src/components/layout/`
- **`SiteHeader.tsx`** — Sticky nav with Destinations dropdown, logo, CTA
- **`SiteFooter.tsx`** — Links, tagline

### `src/components/seo/`
- **`JsonLd.tsx`** — Injects JSON-LD structured data (BreadcrumbList, etc.)

### `src/lib/`
- **`categoryUtils.ts`** — `SLUG_TO_CATEGORY`, `CATEGORY_SLUGS`, `CATEGORY_META` — maps between URL slugs and Prisma enums
- **`regions.ts`** — `REGIONS` array and `REGION_BY_ENUM` map with labels and emojis
- **`jsonld.ts`** — `breadcrumbSchema()` helper

---

## 8. Solo Level UI

### On City Cards (`CityCard.tsx`)
Badge renders at bottom-left of the card image overlay:

| SoloLevel | Label | Colors |
|---|---|---|
| `BEGINNER` | Solo Friendly | `bg-emerald-100 text-emerald-800` |
| `INTERMEDIATE` | *(label TBD — "Some Experience" flagged as confusing, currently being renamed)* | `bg-amber-100 text-amber-800` |
| `ADVANCED` | Experienced Solo | `bg-rose-100 text-rose-800` |

### On City Detail (`CityStats.tsx`)
- Colored panel above stats grid showing `soloTips` text
- `soloLevel` appears as a stat card alongside Safety Score, Cost, Language, Currency

---

## 9. SpotList Solo Filters

`SpotList.tsx` is a **client component** (`"use client"`). Two toggle buttons appear above the spot grid:

- **🤝 Meet People** — filters to spots where `meetPeople === true`. Shows count.
- **🧘 Comfortable Alone** — filters to spots where `comfortableAlone === true`. Shows count.

Both can be active simultaneously. A "Clear" link appears when any filter is active. When all spots are filtered out, a friendly empty state shows with a "Clear filters" button.

Solo badges also appear directly on each spot card: `🤝 Meet People` (violet) and `🧘 Solo Friendly` (amber).

---

## 10. ISR (Incremental Static Regeneration)

All dynamic pages have `export const revalidate` set to prevent Vercel function invocation spikes when crawlers discover new content:

| Page | Revalidate |
|---|---|
| `/destinations` | 3600 (1 hour) |
| `/destinations/[slug]` | 86400 (24 hours) |
| `/destinations/[slug]/[category]` | 86400 |
| `/destinations/[slug]/[category]/[spot]` | 86400 |
| `/regions/[slug]` | 86400 |
| `/experiences/[slug]` | 86400 |

**Why:** Publishing 203 cities at once triggered crawlers → 6,800 Vercel function invocations in 5 minutes. ISR caches the rendered response so subsequent hits serve from cache, not a fresh DB query.

---

## 11. Affiliate Programs

### Live
| Program | Details |
|---|---|
| **GetYourGuide** | Partner ID: `CDE4NF2`. Applied to all 44+ experiences. Also in `/resources/tours/page.tsx` |
| **BreezeSim** | URL: `https://breezesim.com?sca_ref=11468464.321pPwPKQ4`. Applied across all eSIM pages. Replaced Airalo (rejected). |
| **Nomad eSIM** | impact.com deal activated 2026-06-15. Comparison table on eSIM page still TODO. |

### Pending / Placeholder
| Program | Status |
|---|---|
| Airalo | ❌ Rejected |
| Holafly | ⏳ Pending |
| Ubigi | 📝 Applied |
| SafetyWing | ⏳ Placeholder in `/resources/travel-insurance/page.tsx` |
| World Nomads | ⏳ Placeholder in `/resources/travel-insurance/page.tsx` |

---

## 12. Chatbot — "Soulo"

A travel concierge chatbot built into the site (added ~2026-05-31):
- Model: **Claude Sonnet 4.6** (or similar Anthropic model at time of build)
- Implemented as a floating widget
- Uses raw `fetch` to the Anthropic API (not SDK)
- Named "Soulo" — positioned as an AI travel companion, not a generic assistant
- Located in: `src/components/chat/` (check for exact filename)

---

## 13. Image Proxy

External photo URLs (Pexels, Unsplash) are served through `/api/img?url=...` to bypass hotlink protection. The `<Image>` component uses `unoptimized` when the URL starts with `http` to avoid double-optimization.

---

## 14. Seeding Architecture

### Reusable helper: `scripts/_content-seed-helper.js`
- Region-agnostic content seeder
- Handles Railway P1017 (connection drops) via `withRetry()` wrapper — 5 attempts, 1500ms × attempt delay
- Maps SpotCategory to fallback image URLs in `/spots/_category/{cat}-{1,2}.jpg`
- Slugs are globally unique (not just per-city)

### `withRetry` pattern (used in ALL seed scripts)
```js
async function withRetry(fn, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try { return await fn(); }
    catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 1500 * (i + 1)));
    }
  }
}
```

### Photo fetch scripts
- `scripts/fetch-city-photos-pexels.js` — Fetches Pexels photos for cities without a pexels.com imageUrl. Has curated `SEARCH_OVERRIDES` for all 321 city slugs. Rate limit: 200/hr.
- `scripts/fetch-city-photos-unsplash.js` — Earlier attempt, limited to 50/hr, partially ran (72 cities). Superseded by Pexels script.

### Key seeder scripts by region
- LATAM: `seed-latam-content-{1..6}-*.js`
- Africa: `seed-africa-content-{1..4}-*.js`
- Europe: `seed-*-spots.js`, `seed-europe-expansion-experiences-{1..3}.js`
- Caribbean + North America: `seed-new-regions-countries-cities.js` + content scripts
- Solo content: `seed-solo-content-{latam,europe,asia,africa}.js`, `seed-solo-spot-flags.js`

---

## 15. Common Seeding Gotchas

1. **CostLevel enum** = `BUDGET / MID_RANGE / EXPENSIVE` — NOT "MODERATE"
2. **PriceRange enum** = `FREE / BUDGET / MID / HIGH` — NOT "LOW"
3. `City.create` requires the `region` field
4. `Experience` requires: `groupSizeMin`, `groupSizeMax`, `frequency`, `bookingUrl`, `organizerId`
5. Spot slugs must be globally unique (not just per-city) — the DB has a `@@unique([cityId, slug])` constraint but a script bug can duplicate across cities
6. Always `cd C:\Users\User\Documents\soulospotter` before running scripts — CWD defaults to Accounting App
7. Railway P1017/P1001 = connection drop — always wrap Prisma calls in `withRetry()`

---

## 16. Git History Summary

```
4c8fcbf feat: meetPeople/comfortableAlone filter toggles on spot list
d97af39 fix: add soloLevel to DestinationsClient City type
6f4246b fix: commit schema additions (soloLevel, soloTips, meetPeople, comfortableAlone)
8d69bf5 feat: display soloLevel badge on city cards and soloTips panel on city detail pages
e4e64d4 perf: add ISR revalidation to all dynamic pages
284e8fc fix: assign landmark photos to all 321 cities
5427051 feat: complete content — Caribbean and North America regions
d18c4cf feat: Africa content batch 4 — West Africa & Mozambique
bbe26d5 feat: Africa content batch 3 — North & Horn Africa
9b6d00f feat: Africa content batch 2 — East Africa
f96d257 feat: Africa content batch 1 — Southern Africa
e1efa27 feat: LATAM content batch 6 — Belize
a05e7c7 feat: LATAM content batch 5 — Central America + Mexico
78f8154 feat: LATAM content batch 4 — Venezuela, Costa Rica, Panama, Nicaragua
...
34f3a54 Add Soulo — a Sonnet 4.6 travel concierge chatbot
```

---

## 17. Pending / Next Up

### In Progress / Immediate
- [ ] **Rename "Some Experience" solo level label** — "Intermediate" badge is confusing/discouraging. Candidate replacements: "Confident Solo", "Independent Traveler", "Solo Savvy" (decision pending with Alexis)
- [ ] **Nomad eSIM comparison table** on `/resources/esims/` page — impact.com deal went live 2026-06-15, still not added

### Near Term
- [ ] **Solo level filter on destinations page** — `soloLevel` data exists, filter UI not built yet. Would go in `DestinationsClient.tsx` alongside region/budget filters.
- [ ] **Affiliate link replacement** — SafetyWing and World Nomads placeholders need real IDs once approved
- [ ] **Holafly / Ubigi affiliate approval** — pending

### Longer Term
- [ ] **About page polish** — basic page exists, may need expansion
- [ ] **Activity board** — curated events from Meetup/GYG with affiliate links (Phase 1 when traffic exists)
- [ ] **Real SafetyWing + World Nomads IDs** once affiliate applications resolve

---

## 18. Environment Variables

```
DATABASE_URL=         # Railway PostgreSQL connection string
NEXT_PUBLIC_BASE_URL= # https://soulospotter.com
ANTHROPIC_API_KEY=    # For the Soulo chatbot
```

Photo scripts use env vars passed inline:
```bash
PEXELS_KEY="..." node scripts/fetch-city-photos-pexels.js
UNSPLASH_KEY="..." node scripts/fetch-city-photos-unsplash.js
```

---

## 19. Vercel Incident — Crawler Spike

**What happened (2026-06-14 ~10:30 UTC):** Publishing 203 cities simultaneously triggered search engine crawlers. Vercel logged 6,800 function invocations in 5 minutes — 74× the normal rate.

**Root cause:** Every crawler hit triggered a fresh DB query (no caching).

**Fix applied:** Added `export const revalidate = 86400` to all dynamic page routes. First request after cache expiry hits the DB; all subsequent requests within 24h are served from Vercel's edge cache.

---

*Document compiled 2026-07-05. Source: Claude Code session transcripts + git log + live codebase.*
