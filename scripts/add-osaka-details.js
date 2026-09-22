// Osaka spot enrichment — real addresses + real official links (no placeholders).
//
// Problem found (content-audit.js, Sep 2026): all 18 Osaka spots had `address: null` and a
// Google Maps link that was just a name search (`?q=<Name>`), not a verified place. Descriptions
// were already good (specific, house style) — NOT rewritten here, only address/website added.
//
// Sources (all first-party or a named authority, fetched 2026-09-22):
//   Osaka Castle           https://osakacastlepark.jp/  (official Osaka Castle Park site — NOT
//                           osaka-castle.org / osakacastle.org, which say in their own footer
//                           "this website is not an official website of Osaka Castle")
//   Shitennō-ji             https://www.shitennoji.or.jp/  (temple's own site)
//   Sumiyoshi Taisha        https://www.sumiyoshitaisha.net/  (shrine's own site)
//   Umeda Sky Building      https://www.skybldg.co.jp/observatory/  (building operator)
//   Spa World               http://www.spaworld.co.jp/english/
//   Namba Parks             http://www.nambaparks.com/
//   Namba Yasaka Shrine     https://nambayasaka.jp/
//   Kuromon Ichiba Market   https://kuromon.com/en/  (market association's own site — has
//                           Cloudflare bot-check that blocks curl/automation but loads fine for
//                           a real visitor; address cross-checked against JNTO's japan.travel
//                           and japan-guide.com)
//   Conrad Osaka            https://conrad-osaka.hiltonjapan.co.jp/  (Hilton's own domain)
//   Hotel Zentis Osaka      https://zentishotels.com/en/osaka/
//   Billboard Live Osaka    https://www.billboard-live.com/en/osaka
//   Mel Coffee Roasters     https://mel.coffee/
//   LiLo Coffee Roasters    https://coffee.liloinveve.com/
//   Dōtonbori / Amerikamura / Shinsekai & Tsūtenkaku / Dōtonbori Takoyaki Stalls — these are
//     districts, not single businesses, so no "official site" exists; linked to OSAKA-INFO, the
//     Osaka Convention & Tourism Bureau's official site, plus the real district address.
//   The Blend Inn: no official hostel website found (likely OTA-only); address cross-checked
//     across 5 independent architecture-press write-ups of the building (ArchDaily, Archello,
//     Designboom, Floornature, Shinkenchiku) that all agree — used for the address/Maps link.
//
// Idempotent upsert by (cityId, slug), dry run by default:
//   node scripts/add-osaka-details.js            (dry run)
//   node scripts/add-osaka-details.js --apply     (write)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const maps = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const SPOTS = {
  "the-blend-inn-osaka": {
    address: "1-24-21 Baika, Konohana-ku, Osaka 554-0012, Japan",
    website: null, // no official hostel site found; verified via architecture press, not a booking OTA
  },
  "imperial-hotel-osaka": { // DB slug predates the Conrad Osaka rebrand — left as-is (changing it would break the existing URL)
    address: "3-2-4 Nakanoshima, Kita-ku, Osaka 530-0005, Japan",
    website: "https://conrad-osaka.hiltonjapan.co.jp/",
  },
  "hotel-zentis-osaka": {
    address: "1-4-26 Dojimahama, Kita-ku, Osaka 530-0004, Japan",
    website: "https://zentishotels.com/en/osaka/",
  },
  "lilo-coffee-osaka": {
    address: "1F, 1-10-28 Nishishinsaibashi, Chuo-ku, Osaka 542-0086, Japan",
    website: "https://coffee.liloinveve.com/",
  },
  "mel-coffee-osaka": {
    address: "1-20-4 Shinmachi, Nishi-ku, Osaka 550-0013, Japan",
    website: "https://mel.coffee/",
  },
  "kuromon-market-osaka": {
    address: "2-4-1 Nipponbashi, Chuo-ku, Osaka 542-0073, Japan",
    website: "https://kuromon.com/en/",
  },
  "dotonbori-takoyaki-osaka": {
    address: "Dotonbori, Chuo-ku, Osaka 542-0071, Japan",
    website: "https://osaka-info.jp/en/spot/dotonbori/", // not one business — Osaka's official tourism bureau page
  },
  "spa-world-osaka": {
    address: "3-4-24 Ebisuhigashi, Naniwa-ku, Osaka 556-0002, Japan",
    website: "http://www.spaworld.co.jp/english/",
  },
  "dotonbori-osaka": {
    address: "Dotonbori, Chuo-ku, Osaka 542-0071, Japan",
    website: "https://osaka-info.jp/en/spot/dotonbori/",
  },
  "shinsekai-tsutenkaku-osaka": {
    address: "1-18-6 Ebisuhigashi, Naniwa-ku, Osaka 556-0002, Japan",
    website: "https://osaka-info.jp/en/spot/tsutenkaku/",
  },
  "amerikamura-osaka": {
    address: "Nishishinsaibashi, Chuo-ku, Osaka 542-0086, Japan",
    website: "https://osaka-info.jp/en/spot/amerikamura/",
  },
  "namba-parks-osaka": {
    address: "2-10-70 Nambanaka, Naniwa-ku, Osaka 556-0011, Japan",
    website: "http://www.nambaparks.com/",
  },
  "osaka-castle": {
    address: "1-1 Osakajo, Chuo-ku, Osaka 540-0002, Japan",
    website: "https://osakacastlepark.jp/",
  },
  "shitennoji-osaka": {
    address: "1-11-18 Shitennoji, Tennoji-ku, Osaka 543-0051, Japan",
    website: "https://www.shitennoji.or.jp/",
  },
  "sumiyoshi-taisha-osaka": {
    address: "2-9-89 Sumiyoshi, Sumiyoshi-ku, Osaka 558-0045, Japan",
    website: "https://www.sumiyoshitaisha.net/",
  },
  "umeda-sky-building-osaka": {
    address: "1-1-88 Oyodonaka, Kita-ku, Osaka 531-6039, Japan",
    website: "https://www.skybldg.co.jp/observatory/",
  },
  "namba-yasaka-shrine-osaka": {
    address: "2-9-19 Motomachi, Naniwa-ku, Osaka 556-0016, Japan",
    website: "https://nambayasaka.jp/",
  },
  "billboard-live-osaka": {
    address: "HERBIS PLAZA ENT B2F, 2-2-22 Umeda, Kita-ku, Osaka 530-0001, Japan",
    website: "https://www.billboard-live.com/en/osaka",
  },
};

(async () => {
  const city = await prisma.city.findUnique({ where: { slug: "osaka" }, select: { id: true, name: true } });
  if (!city) throw new Error("city osaka not found");
  console.log(APPLY ? "APPLYING to database…" : "DRY RUN (no changes). Re-run with --apply to write.");

  const slugs = Object.keys(SPOTS);
  const existing = await prisma.spot.findMany({ where: { cityId: city.id, slug: { in: slugs } }, select: { id: true, slug: true, name: true } });
  const bySlug = Object.fromEntries(existing.map((s) => [s.slug, s]));

  for (const slug of slugs) {
    const spot = bySlug[slug];
    if (!spot) { console.warn(`  SKIP ${slug}: not found in city`); continue; }
    const { address, website } = SPOTS[slug];
    const data = { address, googleMapsUrl: maps(address), ...(website ? { website } : {}) };
    console.log(`\nUPDATE  ${spot.name}  (${slug})`);
    console.log(`   address: ${address}`);
    console.log(`   website: ${website ?? "(none found — Maps link only)"}`);
    if (APPLY) await prisma.spot.update({ where: { id: spot.id }, data });
  }

  if (existing.length !== slugs.length) {
    console.warn(`\nExpected ${slugs.length} spots, matched ${existing.length} — check slugs above.`);
  }
  console.log(`\nDone. ${existing.length}/${slugs.length} spots ${APPLY ? "updated" : "would be updated"}.`);
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
