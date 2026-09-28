// Shared runner for ADDING new verified spots to thin cities (see scripts/add-thin-batchN-spots.js).
// Idempotent upsert by (cityId, slug). Dry run by default; pass --apply to write.
//   run({ "<city-slug>": [{ slug, name, category, address, description, website?, mapsQuery?, priceRange,
//                           meetPeople?, comfortableAlone?, phone?, tags: [] }] })
const { PrismaClient } = require("@prisma/client");

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const IMAGES = ["ACCOMMODATION", "CAFE", "COWORKING", "CULTURE", "FOOD", "NATURE", "NIGHTLIFE", "WELLNESS"];

module.exports = async function run(CITIES) {
  const prisma = new PrismaClient();
  const APPLY = process.argv.includes("--apply");
  console.log(APPLY ? "APPLYING to database…" : "DRY RUN (no changes). Re-run with --apply to write.");
  try {
    for (const [citySlug, spots] of Object.entries(CITIES)) {
      const city = await prisma.city.findUnique({ where: { slug: citySlug }, select: { id: true } });
      if (!city) throw new Error(`city ${citySlug} not found`);
      console.log(`\n=== ${citySlug}`);
      for (const [i, s] of spots.entries()) {
        const { slug, name, category, address, description, website = null, mapsQuery, priceRange,
          meetPeople = false, comfortableAlone = true, phone = null, tags = [] } = s;
        if (!slug || !name || !category || !address || !description || !priceRange) throw new Error(`${citySlug}/${slug}: missing required field`);
        if (description.length < 250) console.warn(`  WARN ${slug}: description only ${description.length} chars`);
        const where = { cityId_slug: { cityId: city.id, slug } };
        const existing = await prisma.spot.findUnique({ where, select: { id: true } });
        const imageUrl = IMAGES.includes(category) ? `/spots/_category/${category.toLowerCase()}-${(i % 2) + 1}.jpg` : null;
        const data = { name, category, address, description, website, phone, priceRange, meetPeople, comfortableAlone,
          googleMapsUrl: maps(mapsQuery || `${name}, ${address}`), imageUrl, published: true };
        console.log(`${existing ? "UPDATE" : "CREATE"}  ${name}  (${slug})  ${category}/${priceRange}  desc ${description.length}${website ? "  " + website : ""}`);
        if (!APPLY) continue;
        const spot = await prisma.spot.upsert({ where, update: data, create: { ...data, slug, cityId: city.id } });
        for (const tag of tags) {
          await prisma.spotTag.upsert({ where: { spotId_tag: { spotId: spot.id, tag } }, update: {}, create: { spotId: spot.id, tag } });
        }
      }
      const n = await prisma.spot.count({ where: { cityId: city.id, published: true } });
      console.log(`${citySlug}: ${n} published spots${APPLY ? "" : " (before apply)"}`);
    }
  } finally { await prisma.$disconnect(); }
};
