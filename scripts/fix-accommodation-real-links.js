// Site-wide accommodation sweep, part 1: real businesses that had a genuine primary domain
// findable (verified 2026-09-23). Accommodation was the cleanest category overall — almost
// every entry is a real, well-documented hotel/hostel.
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const FIXES = [
  { slug: "cebu-backpackers-hostel", website: "https://www.cebubackpackershostel.com/" },
  { slug: "yeng-keng-hotel-penang", website: "https://www.yengkenghotel.com/" },
  { slug: "bell-tower-youth-hostel-xian", website: "https://www.belltoweryouthhostel.com/en-us" },
  { slug: "zaya-hostel-hotel-ulaanbaatar", website: "https://zayahostel.com/" },
];

(async () => {
  console.log(APPLY ? "APPLYING…" : "DRY RUN — re-run with --apply to write.");
  for (const f of FIXES) {
    const spot = await prisma.spot.findFirst({ where: { slug: f.slug, category: "ACCOMMODATION" }, select: { id: true, name: true } });
    if (!spot) { console.warn("SKIP (not found):", f.slug); continue; }
    console.log(`\n${spot.name} (${f.slug})\n  website: ${f.website}`);
    if (APPLY) await prisma.spot.update({ where: { id: spot.id }, data: { website: f.website } });
  }
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
