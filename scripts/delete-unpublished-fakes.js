// Hard-deletes the spots unpublished by the fabrication sweeps (2026-09-23: Guilin,
// coworking, cafe, accommodation, all 13 risk cities). Verified beforehand that every
// currently-unpublished spot in the DB comes from these sweeps (none pre-date them) —
// see scripts/unpublish-*.js for the per-sweep reasoning and evidence.
//
//   node scripts/delete-unpublished-fakes.js            (dry run)
//   node scripts/delete-unpublished-fakes.js --apply     (delete)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

(async () => {
  const spots = await prisma.spot.findMany({
    where: { published: false },
    select: { id: true, name: true, category: true, city: { select: { name: true } } },
    orderBy: [{ city: { name: "asc" } }, { category: "asc" }],
  });
  console.log(APPLY ? "DELETING…" : "DRY RUN — re-run with --apply to delete.");
  console.log(`${spots.length} unpublished spots found.\n`);
  for (const s of spots) console.log(`  ${s.city.name.padEnd(16)} ${s.category.padEnd(13)} ${s.name}`);
  if (APPLY) {
    const { count } = await prisma.spot.deleteMany({ where: { published: false } });
    console.log(`\nDeleted ${count} spots.`);
  }
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
