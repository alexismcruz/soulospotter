// Final phase of the site-wide fabrication sweep: FOOD/NATURE/CULTURE categories in the
// 13 cities already proven bad by the coworking/cafe/accommodation sweeps. Unlike those
// categories, this pull turned out overwhelmingly real — famous landmarks, markets, and
// well-documented restaurants (Terracotta Army, Kuang Si Waterfall, Cloud 9, Hameediyah
// Restaurant, Auntie Gaik Lean's, etc.) all verified independently. Only 5 problems found
// in ~155 spots checked (checked 2026-09-23):
//
//   - lab-as-seafood-cebu: real restaurant, but it's in Dumaguete City, not Cebu — same
//     wrong-city pattern as El Rio y Mar Resort in the accommodation sweep.
//   - khyatad-mongolian-cuisine-ulaanbaatar, mao-jia-restaurant-chengdu: no independent
//     verification found anywhere.
//   - magpupungko-rock-pools / cloud-9-surf-break: duplicates of the same real place
//     already listed under magpupungko-rock-pools-siargao / cloud-9-surfing-break-siargao
//     (kept — better descriptions, one has a verified website).
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const UNPUBLISH_SLUGS = [
  "lab-as-seafood-cebu",
  "khyatad-mongolian-cuisine-ulaanbaatar",
  "mao-jia-restaurant-chengdu",
  "magpupungko-rock-pools",
  "cloud-9-surf-break",
];

(async () => {
  console.log(APPLY ? "APPLYING…" : "DRY RUN — re-run with --apply to write.");
  const spots = await prisma.spot.findMany({
    where: { slug: { in: UNPUBLISH_SLUGS } },
    select: { id: true, slug: true, name: true, published: true, category: true, city: { select: { name: true } } },
  });
  console.log(`Matched ${spots.length}/${UNPUBLISH_SLUGS.length} slugs.\n`);
  for (const s of spots) {
    console.log(`  ${s.published ? "unpublish" : "(already unpublished)"}  ${s.city.name.padEnd(14)} ${s.category.padEnd(10)} ${s.name}`);
    if (APPLY && s.published) await prisma.spot.update({ where: { id: s.id }, data: { published: false } });
  }
  if (spots.length !== UNPUBLISH_SLUGS.length) {
    const found = new Set(spots.map((s) => s.slug));
    console.warn("\nNOT MATCHED:", UNPUBLISH_SLUGS.filter((s) => !found.has(s)).join(", "));
  }
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
