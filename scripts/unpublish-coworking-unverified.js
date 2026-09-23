// Site-wide coworking sweep, part 2 of 2: unpublish coworking spots with no independent
// verification anywhere (Coworker.com, nomadlist/nomads.com, Tripadvisor, general search),
// checked 2026-09-23. In every city checked, real alternative coworking spaces DO exist and
// turn up in search — these specific listings just don't. Two exceptions with a different
// reason: Anticafé Louvre (Paris) is a real former business, but the chain has closed that
// location (only Bordeaux/Strasbourg remain) — presenting it as open would mislead a reader.
// Kwerk Nice borrows a real Paris coworking brand's name for a city where it has no location.
//
// Sets published: false — not deleted. See scripts/fix-coworking-real-links.js for the
// entries in this same sweep that verified as real and got their links corrected instead.
//
//   node scripts/unpublish-coworking-unverified.js            (dry run)
//   node scripts/unpublish-coworking-unverified.js --apply     (write)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const UNPUBLISH_SLUGS = [
  "urban-canvas-brussels",
  "mccwd-business-lounge-cebu", "beanhere-coworking-cebu", "work-store-coworking-cebu", "springboard-labs-cebu",
  "chengdu-innovation-center-cowork", "yibai-creative-cowork-chengdu", "garage-cafe-chengdu", "mfg-lab-chengdu",
  "nomads-paradise-el-nido", "coworking-el-nido", "remote-year-hub-el-nido", "beach-hub-el-nido",
  "island-lab-koh-tao", "ocean-view-workspace-koh-tao", "deep-blue-dive-work-koh-tao",
  "koh-tao-coworking-space", "sairee-digital-hub-koh-tao", "nomad-island-koh-tao-cowork",
  "paperfold-coworking-kl", "timezone-coworking-kl",
  "bamboo-nomad-hub-luang-prabang", "nomad-coworking-luang-prabang", "lao-works-coworking-luang-prabang",
  "mekong-cowork-luang-prabang", "heritage-quarter-coworking-luang-prabang",
  "kwerk-nice", // real brand, no Nice location
  "anticafe-louvre-paris", // real former business, this location closed
  "green-hub-coworking-pai", "digital-nomad-pai-community-space", "pai-slow-life-workspace",
  "pai-nomads-coworking", "mountain-work-hub-pai", "chill-work-cafe-pai",
  "the-hub-penang", "gravity-coworking-penang", "workhaus-penang",
  "phuket-working-space", "kata-center-cowork-phuket", "sandbox-coworking-phuket", "digital-nomad-phuket-hub",
  "siem-reap-coworking-space", "nomad-coworking-siem-reap", "hubspace-siem-reap",
  "ubud-hub-coworking", // duplicate of the real, separately-listed "Hubud Coworking Ubud"
  "kumpul-coworking-ubud",
  "nomad-cowork-ulaanbaatar", "govi-cowork-ulaanbaatar", "khan-bank-business-center-ulaanbaatar",
  "ulaanbaatar-coworking-space", "peace-avenue-office-hub-ulaanbaatar",
  "xian-university-district-cowork", "nanmen-cowork-xian", "sugarcode-innovation-cowork-xian",
  "bell-tower-creative-hub-xian", "silk-road-cowork-xian",
];

(async () => {
  console.log(APPLY ? "APPLYING…" : "DRY RUN — re-run with --apply to write.");
  const spots = await prisma.spot.findMany({
    where: { slug: { in: UNPUBLISH_SLUGS }, category: "COWORKING" },
    select: { id: true, slug: true, name: true, published: true, city: { select: { name: true } } },
  });
  console.log(`Matched ${spots.length}/${UNPUBLISH_SLUGS.length} slugs.\n`);
  for (const s of spots) {
    console.log(`  ${s.published ? "unpublish" : "(already unpublished)"}  ${s.city.name.padEnd(16)} ${s.name}`);
    if (APPLY && s.published) await prisma.spot.update({ where: { id: s.id }, data: { published: false } });
  }
  if (spots.length !== UNPUBLISH_SLUGS.length) {
    const found = new Set(spots.map((s) => s.slug));
    console.warn("\nNOT MATCHED:", UNPUBLISH_SLUGS.filter((s) => !found.has(s)).join(", "));
  }
  const remaining = await prisma.spot.count({ where: { published: true, category: "COWORKING" } });
  console.log(`\nPublished COWORKING spots site-wide after this: ${remaining} (was 182).`);
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
