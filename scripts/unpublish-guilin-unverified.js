// Guilin: unpublish spots that do NOT independently verify as real businesses (see chat report,
// 2026-09-23). Sets published: false — does NOT delete, so the data can be revisited if a spot
// turns out to be real under a different name, or replaced with genuinely researched content.
//
// KEPT (verified real): 3 hotels with corrected links (see fix-guilin-verified-links.js) +
// Li River Cruise, Reed Flute Cave, and well-documented famous landmarks (Elephant Trunk Hill,
// Moon Hill, Longji Rice Terraces, Seven Star Park, Jingjiang Prince City, Sun and Moon Twin
// Pagodas, Two Rivers and Four Lakes, Yangshuo Countryside Cycling).
//
// UNPUBLISHED (no independent verification found on Tripadvisor, Expedia, Agoda, Hostelworld,
// Coworker.com, or general search — several searches returned SouloSpotter's own page as the
// only Guilin-specific result): all 6 cafes, all 6 coworking spaces, all 11 food/market
// entries, and 9 of 12 accommodation listings. Source: scripts/seed-guilin.js, an untracked
// bulk-seed script with round per-category quotas and no citations.
//
//   node scripts/unpublish-guilin-unverified.js            (dry run)
//   node scripts/unpublish-guilin-unverified.js --apply     (write)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const UNPUBLISH_SLUGS = [
  // Accommodation (9) — Bravo/Sheraton/Waterfall hotels verified real, kept published.
  "phoenix-hostel-guilin", "downtown-inn-guilin", "guilin-park-hotel", "guilin-city-inn",
  "ninyou-boutique-hotel", "zen-garden-guesthouse", "beds-and-bars-guilin", "blue-sky-hostel-guilin",
  "guilin-royal-garden-hotel",
  // Cafes (6, all)
  "karst-coffee-guilin", "riverside-brew-guilin", "tea-house-guilin-old-town",
  "sugar-and-spice-guilin", "bookworm-cafe-guilin", "yulong-river-coffee",
  // Coworking (6, all)
  "karst-hub-guilin", "west-street-co-yangshuo", "ronghu-work-lounge",
  "guilin-maker-space", "guilin-creative-lab", "karst-valley-remote-office",
  // Food / markets (11, all)
  "guilin-rice-noodle-house", "street-snacks-zhengyang", "minority-food-court-guilin",
  "guilin-nightmarket", "zhengyang-pedestrian-market", "guilin-arts-crafts-market",
  "impression-liu-sanjie-restaurant", "yangshuo-beer-fish-spot", "osmanthus-pavilion-guilin",
  "yangshuo-street-market", "guilin-tea-market",
];

(async () => {
  const city = await prisma.city.findUnique({ where: { slug: "guilin" }, select: { id: true } });
  if (!city) throw new Error("city guilin not found");
  const spots = await prisma.spot.findMany({
    where: { cityId: city.id, slug: { in: UNPUBLISH_SLUGS } },
    select: { id: true, slug: true, name: true, category: true, published: true },
  });
  console.log(APPLY ? "APPLYING…" : "DRY RUN — re-run with --apply to write.");
  console.log(`Matched ${spots.length}/${UNPUBLISH_SLUGS.length} slugs.\n`);
  for (const s of spots) {
    console.log(`  ${s.published ? "unpublish" : "(already unpublished)"}  ${s.category.padEnd(13)} ${s.name}`);
    if (APPLY && s.published) await prisma.spot.update({ where: { id: s.id }, data: { published: false } });
  }
  if (spots.length !== UNPUBLISH_SLUGS.length) {
    const found = new Set(spots.map((s) => s.slug));
    console.warn("\nNOT MATCHED:", UNPUBLISH_SLUGS.filter((s) => !found.has(s)).join(", "));
  }
  const remaining = await prisma.spot.count({ where: { cityId: city.id, published: true } });
  console.log(`\nGuilin published spots after this: ${remaining} (was 45).`);
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
