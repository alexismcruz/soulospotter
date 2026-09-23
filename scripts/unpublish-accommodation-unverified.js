// Site-wide accommodation sweep, part 2: unpublish accommodation with no independent
// verification anywhere (checked 2026-09-23), same methodology as coworking/cafes.
// This was the cleanest category — only 32 of 159 (~20%) fabricated, vs coworking's ~70%
// and cafes' ~30%. Almost all major hotel chains and named hostel brands checked out real.
//
// One different-reason case: El Rio y Mar Resort is a genuinely real resort, but it's in
// San Jose, Coron — a different Palawan town, several hours from El Nido — not El Nido
// itself. Presenting it as an El Nido resort would send a reader to the wrong island town.
//
// Two duplicate-listing cases (same real hostel entered twice under near-identical names):
// kept "Chengdu Mix Hostel" over "Mix Hostel Chengdu Kuanzhai", and "Phuket Old Town Hostel"
// (the name that matches the real listing) over "Old Phuket Town Hostel".
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const UNPUBLISH_SLUGS = [
  "castle-peak-hotel-cebu", "seagull-hostel-cebu", "greenery-hostel-cebu",
  "blooming-garden-boutique-hotel-chengdu", "mix-hostel-chengdu-kuanzhai", // duplicate of chengdu-mix-hostel
  "arte-hostel-el-nido", "imagine-beach-resort-el-nido", "backpacker-el-nido-hostel",
  "el-rio-y-mar-resort-el-nido", // real resort, wrong town (Coron, not El Nido)
  "koh-tao-resort-hostel", "monsoon-hostel-koh-tao",
  "regency-heritage-hotel-kl", "explorean-hotel-kl", "matic-hostel-kl",
  "spicy-lao-hostel-luang-prabang", "nuwara-hostel-luang-prabang",
  "hybrid-hostel-luang-prabang", "pak-up-hostel-luang-prabang",
  "pai-nai-suan-garden-resort", "in-the-mood-for-love-pai",
  "lucky-guesthouse-pai", "baan-toong-tent-camping-pai",
  "jalan-jalan-guesthouse-penang", "penang-backpacker-hostel",
  "old-phuket-town-hostel", // duplicate of phuket-old-town-hostel
  "alune-retreat-hostel-ubud",
  "ub-guest-house-ulaanbaatar", "lg-guest-house-ulaanbaatar",
  "khaan-hostel-ulaanbaatar", "oasis-hostel-ulaanbaatar",
  "xian-backpacker-international-hostel", "flying-tiger-hostel-xian", "tang-west-market-hostel-xian",
];

(async () => {
  console.log(APPLY ? "APPLYING…" : "DRY RUN — re-run with --apply to write.");
  const spots = await prisma.spot.findMany({
    where: { slug: { in: UNPUBLISH_SLUGS }, category: "ACCOMMODATION" },
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
