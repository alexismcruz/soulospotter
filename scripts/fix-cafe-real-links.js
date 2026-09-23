// Site-wide cafe sweep, part 1: entries confirmed real that had a genuine official domain
// findable (most real small cafes don't have one — that's fine, no change needed for those).
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const FIXES = [
  { slug: "handuraw-pizza-cafe-cebu", website: "https://handurawpizza.com/" },
  { slug: "el-nido-boutique-art-cafe", website: "https://elnidoboutiqueandartcafe.com/" },
  { slug: "barracuda-restaurant-bar-koh-tao", website: "https://barracudakohtao.com/" },
  { slug: "utopia-cafe-luang-prabang", website: "https://utopialuangprabang.com/" },
  { slug: "witching-well-cafe-pai", website: "https://www.witchingwellrestaurant.com/" },
];

(async () => {
  console.log(APPLY ? "APPLYING…" : "DRY RUN — re-run with --apply to write.");
  for (const f of FIXES) {
    const spot = await prisma.spot.findFirst({ where: { slug: f.slug, category: "CAFE" }, select: { id: true, name: true } });
    if (!spot) { console.warn("SKIP (not found):", f.slug); continue; }
    console.log(`\n${spot.name} (${f.slug})\n  website: ${f.website}`);
    if (APPLY) await prisma.spot.update({ where: { id: spot.id }, data: { website: f.website } });
  }
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
