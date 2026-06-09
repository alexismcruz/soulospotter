/**
 * Point every spot whose local image file is MISSING at a category stock image.
 * Real landmark photos (files that exist in /public/spots) are never touched.
 *
 * Stock images live in /public/spots/_category/<cat>-{1,2}.jpg (committed to the repo).
 * Pick is deterministic per slug so the same spot always shows the same image.
 *
 * Run: node scripts/fix-missing-spot-photos.js
 */
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();
const PUBLIC = path.join(__dirname, "..", "public");

// SpotCategory -> stock key (we have <key>-1.jpg and <key>-2.jpg)
const CAT_STOCK = {
  ACCOMMODATION: "accommodation",
  CAFE:          "cafe",
  FOOD:          "food",
  COWORKING:     "coworking",
  NIGHTLIFE:     "nightlife",
  WELLNESS:      "wellness",
  NATURE:        "nature",
  CULTURE:       "culture",
  COMMUNITY:     "coworking",  // people / social → coworking lounge
  TRANSPORT:     "culture",    // no dedicated stock → neutral fallback
};

function pick(slug) {
  // deterministic 1 or 2 from slug
  let sum = 0;
  for (const ch of slug) sum += ch.charCodeAt(0);
  return (sum % 2) + 1;
}

async function main() {
  const spots = await prisma.spot.findMany({
    select: { id: true, slug: true, imageUrl: true, category: true },
  });

  let fixed = 0, ok = 0, skippedRemote = 0;
  const uncovered = new Set();

  for (const s of spots) {
    // Leave remote URLs alone
    if (s.imageUrl && s.imageUrl.startsWith("http")) { skippedRemote++; continue; }

    // Does the referenced local file exist?
    const hasFile = s.imageUrl && fs.existsSync(path.join(PUBLIC, s.imageUrl));
    if (hasFile) { ok++; continue; }

    const key = CAT_STOCK[s.category];
    if (!key) { uncovered.add(s.category); continue; }

    const newUrl = `/spots/_category/${key}-${pick(s.slug)}.jpg`;
    await prisma.spot.update({ where: { id: s.id }, data: { imageUrl: newUrl } });
    fixed++;
  }

  console.log(`Done. real-photo kept: ${ok} | fixed-with-stock: ${fixed} | remote-skipped: ${skippedRemote}`);
  if (uncovered.size) console.log("⚠ uncovered categories:", [...uncovered].join(", "));
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
