// Shared runner for scripts/add-*-details.js city-enrichment batches.
// CITIES = { [citySlug]: { delete?: [spotSlug], spots: { [spotSlug]: { address, description, name?, website?, mapsQuery? } } } }
// `website: null` clears a dead link; omitting `website` leaves it untouched. Dry run unless --apply.
const { PrismaClient } = require("@prisma/client");

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

module.exports = async function run(CITIES) {
  const prisma = new PrismaClient();
  const APPLY = process.argv.includes("--apply");
  console.log(APPLY ? "APPLYING to database…" : "DRY RUN (no changes). Re-run with --apply to write.");
  try {
    for (const [citySlug, { delete: del = [], spots: SPOTS }] of Object.entries(CITIES)) {
      const city = await prisma.city.findUnique({ where: { slug: citySlug }, select: { id: true } });
      if (!city) throw new Error(`city ${citySlug} not found`);
      console.log(`\n=== ${citySlug}`);

      const toDelete = await prisma.spot.findMany({ where: { cityId: city.id, slug: { in: del } }, select: { id: true, name: true } });
      for (const s of toDelete) console.log(`DELETE  ${s.name}`);
      if (APPLY && toDelete.length) await prisma.spot.deleteMany({ where: { id: { in: toDelete.map((s) => s.id) } } });

      const slugs = Object.keys(SPOTS);
      const existing = await prisma.spot.findMany({ where: { cityId: city.id, slug: { in: slugs } }, select: { id: true, slug: true, name: true } });
      const bySlug = Object.fromEntries(existing.map((s) => [s.slug, s]));
      for (const slug of slugs) {
        const spot = bySlug[slug];
        if (!spot) { console.warn(`  SKIP ${slug}: not found in city`); continue; }
        const { name, address, description, mapsQuery } = SPOTS[slug];
        if (description.length < 250) console.warn(`  WARN ${slug}: description only ${description.length} chars`);
        const data = {
          address,
          description,
          googleMapsUrl: maps(mapsQuery || `${name || spot.name}, ${address}`),
          ...(name ? { name } : {}),
          ...("website" in SPOTS[slug] ? { website: SPOTS[slug].website } : {}),
        };
        console.log(`UPDATE  ${name || spot.name}  (${slug})  desc ${description.length}${name ? `  [rename from ${spot.name}]` : ""}`);
        if (APPLY) await prisma.spot.update({ where: { id: spot.id }, data });
      }
      console.log(`${citySlug}: ${toDelete.length}/${del.length} deleted, ${existing.length}/${slugs.length} ${APPLY ? "updated" : "would be updated"}.`);
    }
  } finally {
    await prisma.$disconnect();
  }
};
