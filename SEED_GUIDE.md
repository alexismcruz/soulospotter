# 🌱 SouloSpotter Data Seeding Guide

This guide explains how to manage and expand the data seeding scripts for SouloSpotter.

## Quick Start

**Run all seeds:**
```bash
npm run db:seed
```

**Run photos seed only:**
```bash
node scripts/seed-spot-photos.js
```

## Available Seeds

### 1. `scripts/seed-spot-photos.js` — Venue Photos
Updates venue thumbnails with photos from multiple sources.

**Sources (in priority order):**
1. **Curated photos** — Manually verified photos for specific venues
2. **Google Places API** — Real photos from Google Maps (when enabled)
3. **Category fallback** — Smart defaults by category (cafe → coffee photo)

**Expand it:**
```javascript
// Add more curated photos in CURATED_PHOTOS object
const CURATED_PHOTOS = {
  "Venue Name": "https://image-url-here.jpg",
  "Another Venue": "https://another-image-url.jpg",
};
```

### 2. `prisma/seed.ts` — Main Database Seed
Initializes all database data (cities, countries, venues, etc.).

**Run when:** Setting up a fresh database or resetting all data.

### 3. `scripts/seed-cm-kyoto.js` — Specific City Data
Populates Chiang Mai & Kyoto venues with detailed contact info.

**Expand it:** Create similar files for new cities:
```javascript
// scripts/seed-lisbon.js
const lisboaVenues = [
  { name: "...", category: "CAFE", ... },
  { name: "...", category: "FOOD", ... },
];
```

---

## How to Add New Data

### Adding a New Venue Photo (Easiest)
1. Find a good photo URL (Google Maps, Unsplash, etc.)
2. Add to `CURATED_PHOTOS` in `scripts/seed-spot-photos.js`:
```javascript
const CURATED_PHOTOS = {
  "Your Venue Name": "https://image-url.jpg",
};
```
3. Run: `node scripts/seed-spot-photos.js`

### Adding a New City's Venues (Moderate)
1. Create `scripts/seed-yourCity.js` based on `seed-cm-kyoto.js`
2. Add venues with:
   - name, category, description
   - address, website, phone
   - tags, price range
3. Call from main seed.ts or run standalone

### Adding a New Data Type (Advanced)
Example: Hours, ratings, reviews

1. Update Prisma schema: `prisma/schema.prisma`
   ```prisma
   model Spot {
     ...existing fields...
     hours      String?     // "Mon-Fri: 9am-5pm"
     googleRating Float?    // 4.5
   }
   ```

2. Run migration: `npm run db:migrate`

3. Create seed script: `scripts/seed-spot-hours.js`
   ```javascript
   async function main() {
     const spots = await prisma.spot.findMany();
     for (const spot of spots) {
       // Fetch hours from Google Places API
       const hours = await fetchHours(spot.name);
       await prisma.spot.update({
         where: { id: spot.id },
         data: { hours }
       });
     }
   }
   ```

4. Run: `node scripts/seed-spot-hours.js`

---

## Enabling Google Places API

Once enabled, the script will automatically fetch real venue photos from Google Maps.

**Steps:**
1. Go to https://console.cloud.google.com/
2. Select your project
3. Search for "Places API" → Enable it
4. Wait ~1 minute
5. Run: `node scripts/seed-spot-photos.js`

**If you get "REQUEST_DENIED":**
- Check API key in your project (might be from different project)
- Enable billing on your Google Cloud project
- Check key restrictions (IP/app whitelist)

---

## Seed Execution Order

**For fresh database:**
```bash
npm run db:seed                    # All base data
node scripts/seed-cm-kyoto.js      # City-specific venues
node scripts/seed-spot-photos.js   # Venue photos
```

**For updates:**
```bash
node scripts/seed-spot-photos.js   # Just update photos
# Or add individual seed scripts as needed
```

---

## Tips for Scaling

✅ **Do:**
- Keep seeds idempotent (safe to run multiple times)
- Add progress indicators for large seeds (batching)
- Use category fallbacks for missing data
- Document each seed's purpose

❌ **Don't:**
- Hardcode data that could be in database
- Create seeds without error handling
- Forget to test with new data before running

---

## Example: Adding a New Seed

```javascript
// scripts/seed-spot-reviews.js
require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Fetching reviews for all spots...");
  
  const spots = await prisma.spot.findMany({
    select: { id: true, name: true }
  });

  for (const spot of spots) {
    // Your logic here
    console.log(`✓ ${spot.name}`);
  }

  console.log(`\n✅ Reviews seeded!`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

Then run: `node scripts/seed-spot-reviews.js`

---

## Need Help?

- Check existing seeds for patterns
- Test with a small dataset first
- Use `prisma studio` to inspect data while developing
- Add console.logs to debug
