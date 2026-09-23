// Kathmandu spot enrichment — verified addresses, reachable official links, and descriptions rewritten from
// checked facts (25 of 26 were under 150 chars). Researched 2026-09-23.
//
// Corrections found while verifying:
//   - "Or2K Momo & Newari Eats — Honacha" (slug newari-momo-kathmandu) was a mash-up of two unrelated places.
//     Honacha is a real Newari eatery on the north edge of Patan Durbar Square next to Bhimsen Temple, run by the
//     Byanjankar family since 1934 (Kathmandu Post, theGundruk). Rebuilt as "Honacha" (slug kept); OR2K has its own entry.
//   - Thakali Bhanchha Ghar is on Chaksibari Marg, Thamel — not Lazimpat.
//   - Pranamaya Yoga's Thamel studio is on the top floor of Himalayan Java, Tridevi Marg; classes must be pre-booked
//     online (no walk-ins) — the old "drop-in" wording implied otherwise.
//   - Alobar1000: alobar1000.com no longer loads (times out) — website cleared; hostel itself is still operating.
//   - Places Restaurant: vegetarian/vegan with floor-cushion seating; "garden courtyard, cakes" claims had no source.
//   - Roadhouse Café: "best WiFi in Thamel" had no source; it's the original Roadhouse on Chaksibari Road.
// Sources: Kathmandu Guest House (est. 1968 by Karna Sakya), Yak & Yeti (Lal Durbar, Boris Lissanevitch, Chimney),
// Himalayan Java (1999, Nepal's first specialty coffee shop), OR2K (Israeli-run, since 2000), Bhojan Griha (150-yr-old
// royal priest's house, nightly cultural show from 7pm; active July 2026), Sam's Bar (1990s, opp. Hotel Mandap),
// House of Music (next to GAA Hall, weekly programme), Garden of Dreams (1920, Austrian-funded restoration, opened 2007),
// Pashupatinath (non-Hindus not in main sanctum, NPR 1,000, evening aarti from east bank), Kopan (visitors 9–4,
// November course since 1971), Shivapuri Nagarjun NP (est. 2002, peak 2,732m, NPR 1,000), heritage fees 2026
// (Bhaktapur NPR 1,800; Patan and Kathmandu Durbar Squares NPR 1,000), Nyatapola (1702, ~33m).
//
//   node scripts/add-kathmandu-details.js            (dry run)
//   node scripts/add-kathmandu-details.js --apply     (write)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const SPOTS = {
  "alobar1000-hostel-kathmandu": {
    address: "Paknajol, Thamel, Kathmandu 44600, Nepal",
    website: null,
    description: "One of Kathmandu's best-known backpacker hostels, on the Paknajol side of Thamel, with dorms and private rooms, a bar and restaurant, a garden and a sun terrace. It's a sociable base for planning treks and meeting other travellers, while being just far enough from central Thamel's main strip to be a little quieter at night. Book through the usual hostel platforms.",
  },
  "dwarikas-hotel-kathmandu": {
    address: "Battisputali Road, Kathmandu 44600, Nepal",
    mapsQuery: "Dwarika's Hotel, Kathmandu",
    description: "A heritage luxury hotel built around one of the finest collections of antique carved Newari woodwork in Nepal — centuries-old windows, doors and pillars rescued from demolished buildings and set into brick courtyards. It's near Pashupatinath, away from the noise of Thamel, and feels more like a living museum than a hotel. A memorable splurge for a special night.",
  },
  "hotel-yak-and-yeti-kathmandu": {
    address: "Durbar Marg, Kathmandu 44600, Nepal",
    description: "A classic five-star hotel on Durbar Marg that incorporates part of Lal Durbar, a 19th-century Rana palace, with gilded heritage halls and gardens. It carries the name of the restaurant started by Boris Lissanevitch, the Russian émigré who helped open Nepal to tourism, and his Chimney Restaurant still operates here. Central, walkable to Thamel and steeped in history.",
  },
  "kathmandu-guest-house": {
    address: "Thamel Chowk, Thamel, Kathmandu 44600, Nepal",
    mapsQuery: "Kathmandu Guest House, Thamel",
    description: "The hotel that started Thamel: founded in 1968 by Karna Sakya in a converted Rana house, it grew from a four-room guesthouse into a 140-room heritage hotel. Guests have included George Harrison, Jimmy Carter and generations of mountaineers. The large garden, with mango and pomelo trees, is a calm refuge right in the middle of Thamel's busiest crossroads.",
  },
  "himalayan-java-coffee-kathmandu": {
    address: "Tridevi Marg-26, Thamel, Kathmandu 44600, Nepal",
    description: "Founded in 1999 as Nepal's first specialty coffee shop, Himalayan Java now has branches across Nepal and abroad, roasting 100% Arabica beans grown by Nepali farmers and cooperatives. The Tridevi Marg café on the edge of Thamel is a reliable place for a proper espresso, breakfast and a few hours of laptop work — Pranamaya Yoga's studio is on its top floor.",
  },
  "or2k-kathmandu": {
    address: "Mandala Street, Thamel, Kathmandu 44600, Nepal",
    mapsQuery: "OR2K, Thamel, Kathmandu",
    description: "An Israeli-run vegetarian restaurant on Mandala Street that has been a Thamel favourite since 2000. You take your shoes off and sit on floor cushions at low tables, choosing from Middle Eastern plates, salads, pizzas and Nepali dishes. The relaxed, colourful room and long tables make it an easy place to linger over dinner and chat with other travellers.",
  },
  "places-cafe-kathmandu": {
    address: "Saat Ghumti Marg, Thamel, Kathmandu 44600, Nepal",
    mapsQuery: "Places Restaurant & Bar, Thamel, Kathmandu",
    description: "A long-running vegetarian restaurant and bar in Thamel with plenty of vegan options, mixing Nepali, Italian, Mexican, Middle Eastern and Asian dishes. You can sit on floor cushions or at regular tables, and it's open from morning to late evening, which makes it a good all-day refuge from Thamel's busy streets for a meal, a drink or a slow afternoon.",
  },
  "roadhouse-cafe": {
    address: "Chaksibari Road, Thamel, Kathmandu 44600, Nepal",
    website: "https://www.roadhousenepal.com/restaurants/thamel",
    description: "The original branch of the Roadhouse group, on Chaksibari Road in Thamel, known for its wood-fired pizzas alongside pastas, salads and grills. The Mediterranean colours, wooden furniture and mosaic walls give it a warm feel, and there's a garden patio at the back. A dependable spot for a solo dinner when you want something familiar after a trek.",
  },
  "bhojan-griha-kathmandu": {
    address: "Dillibazar, Kathmandu 44600, Nepal",
    website: "https://www.bhojangriha.com.np/",
    description: "A traditional Nepali restaurant in a restored 150-year-old house in Dillibazar that once belonged to the royal priest. Dinner is a leisurely multi-course Nepali set meal, served with a cultural show every evening from 7pm featuring dances of the Sherpa, Newar, Gurung, Tharu and other communities, with live traditional music. Reserve ahead in peak season.",
  },
  "newari-momo-kathmandu": {
    name: "Honacha",
    address: "Near Bhimsen Temple, Patan Durbar Square, Lalitpur 44700, Nepal",
    mapsQuery: "Honacha, Patan Durbar Square",
    description: "A tiny, no-frills Newari eatery on the northern edge of Patan Durbar Square, next to Bhimsen Temple, run by the same family since 1934. Order wo (crispy lentil pancakes), choila (smoky spiced meat) and aloo tama, and sit on low benches alongside local families. It's not pretty, but it's one of the most authentic tastes of Newar food in the valley.",
  },
  "thakali-bhanchha-ghar-kathmandu": {
    address: "Chaksibari Marg, Thamel, Kathmandu 44600, Nepal",
    mapsQuery: "Thakali Bhanchha Ghar, Thamel, Kathmandu",
    description: "A popular, inexpensive Thamel restaurant for Thakali thali — the mountain-style set meal of rice, dal, seasonal greens, gundruk (fermented leafy greens), pickles and an optional meat curry, from the Thak Khola region. Refills of most items are included, so it's a filling, great-value solo dinner. There's also dhindo, a traditional buckwheat or millet mash.",
  },
  "pranamaya-yoga-kathmandu": {
    address: "Top floor, Himalayan Java, Tridevi Marg, Thamel, Kathmandu 44600, Nepal",
    website: "https://pranamaya-yoga.com/",
    description: "Kathmandu's best-known yoga studio, with its main space on the top floor of Himalayan Java on Tridevi Marg in Thamel and further studios in Patan and Pokhara. Classes run daily and are kept small, so you need to pre-book online rather than walk in. A good way to stretch out stiff legs before or after a trek, or to add some calm to a busy city stay.",
  },
  "asan-bazaar-kathmandu": {
    address: "Asan Tole, Kathmandu 44600, Nepal",
    mapsQuery: "Asan Tole, Kathmandu",
    description: "The old-town market crossroads between Thamel and Kathmandu Durbar Square, where six streets meet around small temples. Locals come here for spices, dried fish, grains, textiles, brass and household goods, and the lanes are packed and noisy from morning to evening. Walk through it on your way to Durbar Square for a real sense of everyday Kathmandu.",
  },
  "thamel": {
    address: "Thamel, Kathmandu 44600, Nepal",
    mapsQuery: "Thamel, Kathmandu",
    description: "Kathmandu's traveller district, a dense grid of lanes full of trekking outfitters, gear shops, guesthouses, rooftop restaurants and bars. It's where most people arrange permits, guides and treks, and where you'll keep running into the same faces. It's noisy and commercial, but very easy for solo travellers — and the Garden of Dreams is right on its edge for a break.",
  },
  "garden-of-dreams-kathmandu": {
    address: "Kaiser Mahal, Tridevi Marg, Kathmandu 44600, Nepal",
    website: "https://gardenofdreams.org.np/",
    description: "A neoclassical garden commissioned in 1920 by Field Marshal Kaiser Shumsher Rana in the grounds of his palace, the Kaiser Mahal. Neglected for decades, it was restored with Austrian funding and reopened in 2007. Its six pavilions represent Nepal's six seasons, and the lawns, fountains and ponds make it a peaceful place to read for an hour. There's an entry fee.",
  },
  "shivapuri-national-park-kathmandu": {
    address: "Panimuhan, Budhanilkantha, Kathmandu, Nepal",
    website: "https://www.snnp.gov.np/",
    mapsQuery: "Shivapuri Nagarjun National Park, Budhanilkantha",
    description: "A forested national park on the valley's northern rim, established in 2002 and named after Shivapuri Peak at 2,732m. Day hikes climb through the forest to the peak or to Nagi Gompa nunnery, with views of the Himalaya on clear days, and it's also good for birdwatching. Foreigners pay an entry fee at the gate; go with a guide or in company rather than hiking entirely alone.",
  },
  "bhaktapur-durbar-square-kathmandu": {
    address: "Bhaktapur Durbar Square, Bhaktapur 44800, Nepal",
    mapsQuery: "Bhaktapur Durbar Square",
    description: "A superbly preserved medieval Newar city about an hour east of Kathmandu, with brick lanes, pottery squares and carved temples. Don't miss nearby Taumadhi Square's Nyatapola, a five-tiered pagoda built in 1702 that's the tallest in Nepal. Foreigners pay a city entry fee (NPR 1,800 in 2026); try the local juju dhau, a rich 'king of curds' yoghurt.",
  },
  "boudhanath-stupa-kathmandu": {
    address: "Boudha, Kathmandu 44600, Nepal",
    mapsQuery: "Boudhanath Stupa",
    description: "One of the largest Buddhist stupas in the world and a UNESCO World Heritage Site, its huge white dome crowned by the watchful eyes of the Buddha and ringed with prayer flags. The surrounding square is lined with Tibetan monasteries, shops and rooftop cafés. Come in the early evening, when pilgrims walk the kora clockwise around the stupa spinning prayer wheels.",
  },
  "kathmandu-durbar-square": {
    address: "Basantapur, Kathmandu 44600, Nepal",
    mapsQuery: "Kathmandu Durbar Square",
    description: "The old royal square of Kathmandu, a UNESCO World Heritage Site of palaces, pagodas and courtyards, some still being restored after the 2015 earthquake. It's home to the Kumari Ghar, residence of the Kumari, the living goddess, who sometimes appears at her window. Foreigners pay an entry fee (NPR 1,000 in 2026), which includes the palace museums.",
  },
  "kopan-monastery-kathmandu": {
    address: "Kopan, Kathmandu 44600, Nepal",
    website: "https://kopanmonastery.org/",
    description: "A Tibetan Buddhist monastery on a hilltop north of Boudha, known worldwide for its meditation and philosophy courses — its month-long November Course has run since 1971. Day visitors are welcome most days between about 9am and 4pm to walk the peaceful gardens and temples, and shorter courses suit first-timers. Visits are limited during some courses and holidays.",
  },
  "pashupatinath-temple": {
    address: "Pashupatinath, Kathmandu 44600, Nepal",
    mapsQuery: "Pashupatinath Temple",
    description: "Nepal's holiest Hindu temple complex, on the banks of the Bagmati River. Only Hindus may enter the main temple, but visitors can explore the ghats, shrines and cremation terraces, which are moving to watch respectfully from across the river. The evening aarti, with lamps and chanting, starts around 6–7pm; foreigners pay an entry fee (NPR 1,000).",
  },
  "patan-durbar-square-kathmandu": {
    address: "Patan Durbar Square, Lalitpur 44700, Nepal",
    mapsQuery: "Patan Durbar Square",
    description: "Across the Bagmati in Lalitpur, Patan's royal square is a showcase of Newar craftsmanship, including the stone Krishna Mandir and the old royal palace, part of which is now the excellent Patan Museum. Foreigners pay an entry fee (NPR 1,000 in 2026) that covers the museum. Afterwards, eat Newari food at Honacha on the square's northern edge.",
  },
  "swayambhunath-kathmandu": {
    address: "Swayambhu, Kathmandu 44600, Nepal",
    mapsQuery: "Swayambhunath Stupa",
    description: "An ancient hilltop stupa on the western edge of Kathmandu and a UNESCO World Heritage Site, nicknamed the Monkey Temple after the troupes that live here. The steep eastern stairway of 365 steps leads up to the painted eyes of the stupa and wide views over the valley — great at sunrise or sunset. Keep food out of sight: the monkeys are bold.",
  },
  "house-of-music-kathmandu": {
    address: "Next to GAA Hall, Thamel, Kathmandu 44600, Nepal",
    mapsQuery: "House of Music, Thamel, Kathmandu",
    description: "Thamel's most dependable live-music venue, next to GAA Hall, with bands most nights playing rock, blues, jazz and indie folk and a strong focus on up-and-coming Nepali artists. The weekly line-up includes open mic and jam nights, the sound is good for a room of around 150, and there's an outdoor terrace. It's cash only at the bar.",
  },
  "sams-bar-kathmandu": {
    address: "Opposite Hotel Mandap, Thamel, Kathmandu 44600, Nepal",
    mapsQuery: "Sam's Bar, Thamel, Kathmandu",
    description: "A first-floor bar in Thamel that has been a traveller hangout since the 1990s, its walls covered in messages and drawings from years of visitors. Expect low-key reggae, a small rooftop, fair prices and a mix of trekkers, climbers and locals, with a busier reggae night on Saturdays. There's no food, just drinks and popcorn; it opens from late afternoon.",
  },
};

(async () => {
  const city = await prisma.city.findUnique({ where: { slug: "kathmandu" }, select: { id: true } });
  if (!city) throw new Error("city kathmandu not found");
  console.log(APPLY ? "APPLYING to database…" : "DRY RUN (no changes). Re-run with --apply to write.");

  const slugs = Object.keys(SPOTS);
  const existing = await prisma.spot.findMany({ where: { cityId: city.id, slug: { in: slugs } }, select: { id: true, slug: true, name: true } });
  const bySlug = Object.fromEntries(existing.map((s) => [s.slug, s]));

  for (const slug of slugs) {
    const spot = bySlug[slug];
    if (!spot) { console.warn(`  SKIP ${slug}: not found in city`); continue; }
    const { name, address, description, mapsQuery } = SPOTS[slug];
    if (description.length < 250) console.warn(`  WARN ${slug}: description only ${description.length} chars`);
    const data = {
      address,
      description,
      googleMapsUrl: maps(mapsQuery || `${name || spot.name}, ${address}`),
      ...(name ? { name } : {}),
      ...("website" in SPOTS[slug] ? { website: SPOTS[slug].website } : {}),
    };
    console.log(`UPDATE  ${name || spot.name}  (${slug})  desc ${description.length}${name ? `  [rename from ${spot.name}]` : ""}${"website" in SPOTS[slug] ? `  web=${SPOTS[slug].website}` : ""}`);
    if (APPLY) await prisma.spot.update({ where: { id: spot.id }, data });
  }
  console.log(`\nDone. ${existing.length}/${slugs.length} ${APPLY ? "updated" : "would be updated (dry run)"}.`);
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
