/**
 * Seed 90 Asia experiences (5 per city × 18 cities).
 * Run: node scripts/seed-asia-experiences.js
 *
 * - Creates one shared "SouloSpotter Curated" organizer (upsert).
 * - Looks up each city by slug.
 * - Upserts each experience (skips if already exists).
 * - photoUrl is set to /experiences/<slug>.jpg (served from /public).
 */

const { PrismaClient } = require("@prisma/client");
const { EXPERIENCES, CITY_NAMES } = require("./asia-experiences-data");

const prisma = new PrismaClient();

const ORGANIZER_EMAIL = "curated@soulospotter.com";
const ORGANIZER_NAME  = "SouloSpotter Curated";
const BOOKING_URL     = "https://soulospotter.com/contact";

async function main() {
  // 1. Upsert the organizer
  const organizer = await prisma.experienceOrganizer.upsert({
    where:  { email: ORGANIZER_EMAIL },
    update: {},
    create: { name: ORGANIZER_NAME, email: ORGANIZER_EMAIL },
  });
  console.log(`Organizer: ${organizer.name} (${organizer.id})`);

  // 2. Load all relevant cities once
  const slugs = [...new Set(EXPERIENCES.map((e) => e.city))];
  const cities = await prisma.city.findMany({
    where: { slug: { in: slugs } },
    select: { id: true, slug: true, name: true },
  });
  const cityMap = Object.fromEntries(cities.map((c) => [c.slug, c]));

  // Warn about any missing cities
  for (const slug of slugs) {
    if (!cityMap[slug]) {
      console.warn(`  ⚠  City not found: ${slug} (${CITY_NAMES[slug]})`);
    }
  }

  // 3. Upsert each experience
  let created = 0;
  let skipped = 0;

  for (const exp of EXPERIENCES) {
    const city = cityMap[exp.city];
    if (!city) { skipped++; continue; }

    const photoUrl = `/experiences/${exp.slug}.jpg`;

    try {
      await prisma.experience.upsert({
        where:  { slug: exp.slug },
        update: {
          name:         exp.name,
          category:     exp.category,
          description:  exp.description,
          price:        exp.price,
          groupSizeMin: exp.groupSizeMin,
          groupSizeMax: exp.groupSizeMax,
          duration:     exp.duration,
          frequency:    exp.frequency,
          photoUrl,
        },
        create: {
          slug:         exp.slug,
          name:         exp.name,
          cityId:       city.id,
          category:     exp.category,
          description:  exp.description,
          price:        exp.price,
          groupSizeMin: exp.groupSizeMin,
          groupSizeMax: exp.groupSizeMax,
          duration:     exp.duration,
          frequency:    exp.frequency,
          bookingUrl:   BOOKING_URL,
          photoUrl,
          organizerId:  organizer.id,
        },
      });
      console.log(`  ✓ ${city.name}: ${exp.name}`);
      created++;
    } catch (err) {
      console.error(`  ✗ ${exp.slug}: ${err.message}`);
      skipped++;
    }
  }

  console.log(`\nDone: ${created} upserted, ${skipped} skipped.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
