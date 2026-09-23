// Site-wide coworking sweep, part 1 of 2: entries confirmed REAL that were just missing a
// website link in the DB (all verified against each business's own official site, 2026-09-23).
// See fix-coworking-unverified-unpublish.js for the entries that did NOT verify.
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const FIXES = [
  { slug: "maria-01-campus-helsinki", website: "https://maria.io/" },
  { slug: "mesh-oslo", website: "https://www.meshcommunity.com/" },
  { slug: "la-cordee-liberte-lyon", website: "https://www.la-cordee.net/en/cordee/lyon/liberte-guillotiere/" },
  { slug: "selina-medellin", website: "https://www.selina.com/colombia/medellin/" },
  { slug: "penang-digital-library-coworking", website: "http://www.penanglib.gov.my/index.php/en/services/libraries/digital-library" },
  { slug: "heyground-seongsu-seoul", website: "https://heyground.com/" },
  { slug: "blueprint-coworking-hong-kong", website: "https://blueprint.swireproperties.com/" },
  { slug: "jaipur-coworking", website: "https://myhq.in/jaipur" },
  // Real business (AngkorHub, founded 2013) under an imprecise DB name — correct both.
  { slug: "angkor-hub-coworking-siem-reap", name: "AngkorHub", website: "https://angkorhub.com/" },
  { slug: "the-loft-coworking-cebu", website: "https://loft.ph/locations/cebu/" },
];

(async () => {
  console.log(APPLY ? "APPLYING…" : "DRY RUN — re-run with --apply to write.");
  for (const f of FIXES) {
    const spot = await prisma.spot.findFirst({ where: { slug: f.slug, category: "COWORKING" }, select: { id: true, name: true } });
    if (!spot) { console.warn("SKIP (not found):", f.slug); continue; }
    console.log(`\n${spot.name} (${f.slug})${f.name ? " -> rename to " + f.name : ""}`);
    console.log("  website:", f.website);
    if (APPLY) {
      const data = { website: f.website };
      if (f.name) data.name = f.name;
      await prisma.spot.update({ where: { id: spot.id }, data });
    }
  }
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
