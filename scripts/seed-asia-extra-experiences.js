/** Seed 12 extra experiences for Kyoto, Seoul, Kathmandu, Rishikesh. */
const { PrismaClient } = require("@prisma/client");
const { EXPERIENCES, CITY_NAMES } = require("./asia-extra-experiences-data");
const prisma = new PrismaClient();

const ORGANIZER_EMAIL = "curated@soulospotter.com";
const ORGANIZER_NAME  = "SouloSpotter Curated";
const BOOKING_URL     = "https://soulospotter.com/contact";

async function main() {
  const organizer = await prisma.experienceOrganizer.upsert({
    where: { email: ORGANIZER_EMAIL }, update: {},
    create: { name: ORGANIZER_NAME, email: ORGANIZER_EMAIL },
  });
  const slugs = [...new Set(EXPERIENCES.map(e => e.city))];
  const cities = await prisma.city.findMany({ where: { slug: { in: slugs } }, select: { id: true, slug: true, name: true } });
  const cityMap = Object.fromEntries(cities.map(c => [c.slug, c]));
  for (const s of slugs) if (!cityMap[s]) console.warn(`  ⚠ city not found: ${s} (${CITY_NAMES[s]})`);

  let created = 0, skipped = 0;
  for (const exp of EXPERIENCES) {
    const city = cityMap[exp.city];
    if (!city) { skipped++; continue; }
    const photoUrl = `/experiences/${exp.slug}.jpg`;
    await prisma.experience.upsert({
      where: { slug: exp.slug },
      update: { name: exp.name, category: exp.category, description: exp.description, price: exp.price, groupSizeMin: exp.groupSizeMin, groupSizeMax: exp.groupSizeMax, duration: exp.duration, frequency: exp.frequency, photoUrl },
      create: { slug: exp.slug, name: exp.name, cityId: city.id, category: exp.category, description: exp.description, price: exp.price, groupSizeMin: exp.groupSizeMin, groupSizeMax: exp.groupSizeMax, duration: exp.duration, frequency: exp.frequency, bookingUrl: BOOKING_URL, photoUrl, organizerId: organizer.id },
    });
    console.log(`  ✓ ${city.name}: ${exp.name}`);
    created++;
  }
  console.log(`\nDone: ${created} upserted, ${skipped} skipped.`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
