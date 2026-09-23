// Guilin: fix links for the spots that INDEPENDENTLY VERIFY as real (not a full enrichment —
// see the chat report for why the rest of this city's data is NOT touched here).
//
// The DB's existing website fields for these were dead/guessed domains (checked via curl,
// all 000/500). Corrected against each business's real official site or, where no single
// official operator exists (Reed Flute Cave, Li River Cruise — government-ticketed
// attractions with multiple resellers), left as a Maps link only rather than picking one
// arbitrary commercial reseller and presenting it as "the" official site.
//
//   node scripts/fix-guilin-verified-links.js            (dry run)
//   node scripts/fix-guilin-verified-links.js --apply     (write)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");
const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const FIXES = {
  "guilin-bravo-hotel": { website: "https://guilinbravo.cn/", googleMapsUrl: maps("Guilin Bravo Hotel, 14 Ronghu North Road, Guilin") },
  "lijiang-waterfall-hotel": { website: "https://en.lijiangwaterfall.cn/", googleMapsUrl: maps("Lijiang Waterfall Hotel, 1 Shanhu North Road, Guilin") },
  "sheraton-guilin-hotel": { website: "https://www.marriott.com/en-us/hotels/kwlsi-sheraton-guilin-hotel/overview/", googleMapsUrl: maps("Sheraton Guilin Hotel") },
  // No single official operator — remove the guessed/dead domain, keep a Maps link only.
  "li-river-cruise": { website: null, googleMapsUrl: maps("Zhujiang Wharf, Guilin, Li River Cruise") },
  "reed-flute-cave": { website: null, googleMapsUrl: maps("Reed Flute Cave, 1 Ludi Road, Guilin") },
};

(async () => {
  const city = await prisma.city.findUnique({ where: { slug: "guilin" }, select: { id: true } });
  if (!city) throw new Error("city guilin not found");
  console.log(APPLY ? "APPLYING…" : "DRY RUN — re-run with --apply to write.");
  for (const [slug, data] of Object.entries(FIXES)) {
    const spot = await prisma.spot.findUnique({ where: { cityId_slug: { cityId: city.id, slug } }, select: { id: true, name: true } });
    if (!spot) { console.warn("SKIP (not found):", slug); continue; }
    console.log(`\n${spot.name} (${slug})`);
    console.log("  website:", data.website ?? "(none — no single official operator)");
    console.log("  maps:", data.googleMapsUrl);
    if (APPLY) await prisma.spot.update({ where: { id: spot.id }, data });
  }
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
