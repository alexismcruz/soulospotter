// Site-wide cafe sweep, part 2: unpublish cafes with no independent verification (checked
// 2026-09-23), same methodology as the coworking sweep. Note two different-reason cases:
// Bookworm Chengdu was a real business (part of the Beijing/Chengdu/Suzhou Bookworm chain)
// but closed before Nov 2019 — presenting it as open would mislead. Jellyfish Art and Cafe
// Chengdu borrows the name of a real Chengdu venue (Jellyfish nightclub) but describes a
// completely different kind of business (an art cafe) that doesn't exist.
//
// Overall cafe hit rate was much better than coworking: 23 of 78 fabricated (~30%), not ~70%.
// Kuala Lumpur and Siem Reap had zero fabricated cafes.
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const UNPUBLISH_SLUGS = [
  "ground-zero-cafe-cebu",
  "hefa-gastronomique-chengdu", "bookworm-chengdu", "wuhou-tea-house-chengdu",
  "kunkun-coffee-chengdu", "jellyfish-art-cafe-chengdu",
  "happiness-organics-el-nido", "bay-bean-coffee-el-nido",
  "caffeine-addiction-koh-tao", "breakfast-koh-tao",
  "pierre-noel-cafe-luang-prabang",
  "naughty-boy-coffee-pai", "own-time-cafe-pai", "baandam-coffee-pai",
  "lof10-coffeebar-penang",
  "two-black-sheep-cafe-phuket", "cherngtalay-artisan-coffee-phuket",
  "motif-coffee-ubud",
  "khaan-craft-beer-bar-ulaanbaatar", "longitude-coffee-ulaanbaatar",
  "industrial-cafe-ulaanbaatar", "mars-bar-ulaanbaatar",
  "beilin-museum-coffee-xian",
];

(async () => {
  console.log(APPLY ? "APPLYING…" : "DRY RUN — re-run with --apply to write.");
  const spots = await prisma.spot.findMany({
    where: { slug: { in: UNPUBLISH_SLUGS }, category: "CAFE" },
    select: { id: true, slug: true, name: true, published: true, city: { select: { name: true } } },
  });
  console.log(`Matched ${spots.length}/${UNPUBLISH_SLUGS.length} slugs.\n`);
  for (const s of spots) {
    console.log(`  ${s.published ? "unpublish" : "(already unpublished)"}  ${s.city.name.padEnd(14)} ${s.name}`);
    if (APPLY && s.published) await prisma.spot.update({ where: { id: s.id }, data: { published: false } });
  }
  if (spots.length !== UNPUBLISH_SLUGS.length) {
    const found = new Set(spots.map((s) => s.slug));
    console.warn("\nNOT MATCHED:", UNPUBLISH_SLUGS.filter((s) => !found.has(s)).join(", "));
  }
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
