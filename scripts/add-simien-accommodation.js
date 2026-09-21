// Simien Mountains accommodation — real details only (no placeholders).
//
// Sources (all first-party, fetched 2026-09-21):
//   Limalimo Lodge      https://limalimolodge.com/  (+ /thelodge, /contact)
//   Camps               https://simienmountain.org/destinations/{sankaber,gich,chenek}-camp/
//                       https://simienmountain.org/activities/camping-under-the-stars/
//   Park office contact https://simienmountain.org/  ("+251 (0) 581170016", info@simienmountain.org)
//   Debark = where guides/permits are arranged (simienmountain.org/destinations/debark-town/)
// Simien Lodge has NO official website that could be verified (only tour-operator listings), so it
// gets a Google Maps link and no website.
//
// Idempotent upserts by (cityId, slug). Dry run by default:  node scripts/add-simien-accommodation.js
// Write to the database:                                     node scripts/add-simien-accommodation.js --apply
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const PARK_PHONE = "+251581170016"; // Simien Mountains National Park office, Debark (official site)
const PARK_ADDR = "Simien Mountains National Park, North Gondar, Ethiopia";

const SPOTS = [
  {
    slug: "simien-lodge",
    existing: true,
    update: {
      address: "Simien Mountains National Park, near Debark, North Gondar, Ethiopia",
      googleMapsUrl: maps("Simien Lodge Debark Ethiopia"),
      description:
        "The highest lodge in Africa at 3,260 m — stone-walled tukul rooms with thatched roofs on the edge of the Simien escarpment, with solar-heated water, underfloor heating and a bar billed as the highest in Africa. It sits roughly 40 minutes' drive from Debark, the only permanent lodge inside the park. Book through the lodge or a tour operator.",
    },
  },
  {
    slug: "limalimo-lodge",
    name: "Limalimo Lodge",
    imageUrl: "/spots/_category/accommodation-1.jpg",
    priceRange: "HIGH",
    comfortableAlone: true,
    meetPeople: false,
    website: "https://limalimolodge.com/",
    googleMapsUrl: maps("Limalimo Lodge Debark Ethiopia"),
    phone: null, // none published on the official contact page — reservations are by email via the website
    address: "Limalimo, Simien Mountains National Park, near Debark (PO Box 82, Debark), North Gondar, Ethiopia",
    description:
      "An eco-lodge on the edge of the Simien escarpment, opened in 2016 and designed by architect Mario Balducci. Built from rammed earth, wood and thatch on a 10-hectare site, it uses renewable energy and employs more than 40 people from the local community. A comfortable base close to Debark if you want a proper bed and escarpment views between treks. Reservations are made online or by email via the official website.",
    tags: ["eco-lodge", "escarpment", "sustainable", "community"],
  },
  {
    slug: "sankaber-camp",
    name: "Sankaber Camp",
    imageUrl: "/spots/_category/accommodation-2.jpg",
    priceRange: "BUDGET",
    comfortableAlone: true,
    meetPeople: true,
    website: "https://simienmountain.org/destinations/sankaber-camp/",
    googleMapsUrl: maps("Sankaber Camp Simien Mountains National Park Ethiopia"),
    phone: PARK_PHONE,
    address: `Sankaber, ${PARK_ADDR} (38 km from Debark, 3,320 m)`,
    description:
      "The first campsite on the classic Simien trek, 38 km from Debark at 3,320 m above sea level. Leopards, Menelik's bushbuck, klipspringer and caracal live in the area, bearded vultures (lammergeier) soar overhead, and the views over deep valleys and rugged cliffs are why people come. The park's official site is the place to check current camping details; guides and permits are arranged in Debark.",
    tags: ["camping", "trekking", "gelada", "park-managed"],
  },
  {
    slug: "gich-camp",
    name: "Gich Camp",
    imageUrl: "/spots/_category/accommodation-2.jpg",
    priceRange: "BUDGET",
    comfortableAlone: true,
    meetPeople: true,
    website: "https://simienmountain.org/destinations/gich-camp/",
    googleMapsUrl: maps("Gich Camp Simien Mountains National Park Ethiopia"),
    phone: PARK_PHONE,
    address: `Gich, ${PARK_ADDR} (5–6 hour trek from Sankaber)`,
    description:
      "A high-plateau campsite about a 5–6 hour trek from Sankaber, with wide open grassland, giant lobelias and sunrise and sunset views from the same spot. Ethiopian wolves — the world's rarest canid — are often seen roaming the grasslands, and leopards and spotted hyenas live in the rocky areas. Guides and permits are arranged in Debark.",
    tags: ["camping", "trekking", "ethiopian-wolf", "park-managed"],
  },
  {
    slug: "chenek-camp",
    name: "Chenek Camp",
    imageUrl: "/spots/_category/accommodation-2.jpg",
    priceRange: "BUDGET",
    comfortableAlone: true,
    meetPeople: true,
    website: "https://simienmountain.org/destinations/chenek-camp/",
    googleMapsUrl: maps("Chenek Camp Simien Mountains National Park Ethiopia"),
    phone: PARK_PHONE,
    address: `Chenek, ${PARK_ADDR} (58 km from Debark, 3,600 m)`,
    description:
      "One of the most scenic campsites on the trek, at 3,600 m and 58 km from Debark, and a favourite with trekkers. It's a good place to look for walia ibex (found only in Ethiopia), Ethiopian wolves, gelada monkeys and lammergeier, among giant lobelias and alpine grassland with towering cliffs behind.",
    tags: ["camping", "trekking", "walia-ibex", "park-managed"],
  },
  {
    slug: "ambiko-camp",
    name: "Ambiko Camp",
    imageUrl: "/spots/_category/accommodation-2.jpg",
    priceRange: "BUDGET",
    comfortableAlone: true,
    meetPeople: true,
    website: "https://simienmountain.org/activities/camping-under-the-stars/",
    googleMapsUrl: maps("Ambiko Camp Simien Mountains National Park Ethiopia"),
    phone: PARK_PHONE,
    address: `Ambiko, ${PARK_ADDR}`,
    description:
      "A key stop for trekkers heading to the summit of Ras Dejen, Ethiopia's highest mountain. It's one of seven campsites listed by the park, so check the official camping page and arrange guides and permits in Debark before you set out.",
    tags: ["camping", "trekking", "ras-dejen", "park-managed"],
  },
];

(async () => {
  const city = await prisma.city.findUnique({ where: { slug: "simien-mountains" }, select: { id: true, name: true } });
  if (!city) throw new Error("city simien-mountains not found");
  console.log(APPLY ? "APPLYING to database…" : "DRY RUN (no changes). Re-run with --apply to write.");
  for (const s of SPOTS) {
    const where = { cityId_slug: { cityId: city.id, slug: s.slug } };
    const existing = await prisma.spot.findUnique({ where, select: { id: true, name: true } });
    if (s.existing) {
      if (!existing) throw new Error(`expected existing spot ${s.slug}`);
      console.log(`\nUPDATE  ${existing.name}  (${s.slug})`);
      Object.entries(s.update).forEach(([k, v]) => console.log(`   ${k}: ${String(v).slice(0, 140)}`));
      if (APPLY) await prisma.spot.update({ where, data: s.update });
      continue;
    }
    const { tags, ...data } = s;
    console.log(`\n${existing ? "UPSERT (exists)" : "CREATE "}  ${s.name}  (${s.slug})  [${s.priceRange}]`);
    console.log(`   website: ${s.website}\n   maps: ${s.googleMapsUrl}\n   phone: ${s.phone}\n   address: ${s.address}`);
    if (APPLY) {
      const base = { ...data, category: "ACCOMMODATION", published: true };
      const spot = await prisma.spot.upsert({
        where,
        update: base,
        create: { ...base, cityId: city.id },
      });
      for (const tag of tags) {
        await prisma.spotTag.upsert({ where: { spotId_tag: { spotId: spot.id, tag } }, update: {}, create: { spotId: spot.id, tag } });
      }
    }
  }
  const n = await prisma.spot.count({ where: { cityId: city.id, category: "ACCOMMODATION", published: true } });
  console.log(`\nPublished accommodation spots in ${city.name}: ${n}`);
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
