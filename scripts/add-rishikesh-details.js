// Rishikesh spot enrichment — verified addresses, reachable official links, and descriptions rewritten from
// checked facts (all 26 were under 150 chars). Researched 2026-09-23.
//
// Corrections found while verifying:
//   - Lakshman Jhula: closed to the public since April 2022 (declared unsafe); the Bajrang Setu glass bridge was
//     built at the same crossing. Old desc presented it as a working footbridge.
//   - The Sitting Elephant: is on the roof of EllBee Ganga View hotel (Haridwar Road, Palika Nagar) — NOT at Hotel
//     Ganga Kinare as the old data said (ellbeehotels.com). Ganga Kinare's own restaurant is Jal & Jalebi.
//   - Hotel Ganga Kinare: 237 Virbhadra Road (was 16), open since 1989, own private ghat (gangakinare.com).
//   - Aloha on the Ganges: a Leisure Hotels riverside resort with daily yoga/spa for guests — old desc called it a
//     yoga retreat with "drop-in classes, no booking required", which has no source.
//   - Anand Prakash: founded 2007 by Yogrishi Vishvketu; old site anandprakashashram.com is dead → akhandayoga.com.
//   - Ramana's Organic Café: seasonal (mid-Oct to mid-Mar), profits fund Ramana's Garden children's home.
//   - Freedom Café is "Om Freedom Café"; Pyramid Café address is Kirmola, opp. Post Office; Beatles café is
//     "The 60's Café" on Paidal Marg. Zostel is on Balaknath Road, Tapovan.
// Sources: Wikipedia/India TV/ETV Bharat (Lakshman Jhula, Bajrang Setu), Divine Life Society (dlshq.org, est. 1936),
// Ananda (est. 2000, Viceregal Palace 1910–11), Rajaji (tiger reserve 2015, safaris 15 Nov–15 Jun, Chilla zone),
// Pauri district govt (Neelkanth), aarti timings (India TV, Dec 2025), Beatles Ashram fees/hours (2026 guides),
// Neer Garh (Tripadvisor, trawell), Kunjapuri (1,676m, ~25km from Tapovan), Chotiwala (1958, Zomato/Tripadvisor).
//
//   node scripts/add-rishikesh-details.js            (dry run)
//   node scripts/add-rishikesh-details.js --apply     (write)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const SPOTS = {
  "ananda-in-the-himalayas": {
    address: "The Palace Estate, Narendra Nagar, Tehri Garhwal, Uttarakhand 249175, India",
    description: "India's first destination spa, opened in 2000 in the palace estate of the Maharaja of Tehri Garhwal at Narendra Nagar, in the hills above Rishikesh. The 100-acre estate of sal forest includes the restored Viceregal Palace, built in 1910–11, and stays centre on Ayurveda, yoga and meditation programmes with Himalayan views. A serious — and very expensive — wellness splurge.",
  },
  "hotel-ganga-kinare-rishikesh": {
    address: "237 Virbhadra Road, Rishikesh, Uttarakhand 249201, India",
    website: "https://www.gangakinare.com/",
    description: "A riverside boutique hotel open since 1989 and known for its own private ghat on the Ganges, where guests can join a small aarti or bathe in the river. It's on the Virbhadra Road side of Rishikesh, away from the crowds of Laxman Jhula and Tapovan, and has an in-house restaurant, Jal & Jalebi. A calm mid-to-upper-range base for a slower stay.",
  },
  "live-free-hostel-rishikesh": {
    address: "Laxman Jhula Road, near Anand Dham, Tapovan, Rishikesh, Uttarakhand 249192, India",
    description: "A backpacker hostel on Laxman Jhula Road in Tapovan, about 700m from the old Laxman Jhula crossing and right in the part of Rishikesh where most yoga schools, cafés and travellers are. There are dorms and private rooms and a relaxed common area, and the location makes it easy to walk to classes, cafés and the river — well suited to long stays and first-time solo visitors.",
  },
  "zostel-rishikesh": {
    address: "Balaknath Road, Tapovan, Rishikesh, Uttarakhand 249192, India",
    website: "https://www.zostel.com/destination/rishikesh",
    description: "A branch of Zostel, India's biggest backpacker hostel chain, on the hillside in Tapovan with views over the Ganges and the surrounding hills. There are dorms, private rooms and tents, plus a common lounge, rooftop terrace and shared kitchen — the kind of social spaces that make it one of the easiest places in Rishikesh to meet other solo travellers.",
  },
  "bistro-nirvana-rishikesh": {
    address: "Tapovan, Laxman Jhula, Rishikesh, Uttarakhand 249192, India",
    mapsQuery: "Bistro Nirvana, Tapovan, Rishikesh",
    description: "A relaxed, leafy café-restaurant in Tapovan near Laxman Jhula, open all day from breakfast to dinner. The menu roams from Indian thalis and Thai curries to Buddha bowls and wood-fired pizza, there's free Wi-Fi, and like most places in this part of Rishikesh it doesn't serve alcohol. The quiet garden seating makes it a good place to linger with a book.",
  },
  "little-buddha-cafe": {
    address: "Laxman Jhula Road, Tapovan, Rishikesh, Uttarakhand 249192, India",
    mapsQuery: "Little Buddha Cafe, Laxman Jhula, Rishikesh",
    description: "A treehouse-style, multi-level café near Laxman Jhula with a laid-back top floor and tables looking down over the Ganges. It's one of Rishikesh's most popular traveller hangouts, with a big vegetarian multi-cuisine menu that includes vegan cashew-cheese pizza and tofu dishes. Service can be slow when it's busy — come for the view and the atmosphere, not a quick bite.",
  },
  "pyramid-cafe-rishikesh": {
    name: "The Pyramid Café",
    address: "Kirmola, opposite Post Office, Laxman Jhula, Tapovan, Rishikesh, Uttarakhand 249302, India",
    website: "https://www.pyramid-cafe.in/",
    description: "A quirky vegetarian café in Tapovan where you sit on cushions inside pyramid-shaped tents, eating home-cooked Indian food with a few Tibetan and Western dishes. It also has pyramid-tent guest rooms, a small health store and a yoga studio. It serves separate lunch and dinner sittings with a break in the afternoon, so check the hours before you walk up.",
  },
  "ramanas-organic-cafe-rishikesh": {
    address: "Ramana's Garden, off Laxman Jhula Road, Tapovan, Rishikesh, Uttarakhand, India",
    website: "https://www.ramanas.org/about/our-cafe/",
    description: "An organic café inside Ramana's Garden, a children's home in Tapovan, running since 2006 with all profits going to the home. Much of the food comes from its own organic garden: soups, salads, pizza, momos, croissants and vegan cakes. It's seasonal — usually open mid-October to mid-March only — so check before you go. A genuinely good place to spend your rupees.",
  },
  "beatles-cafe-rishikesh": {
    name: "The 60's Café (Beatles Café)",
    address: "Paidal Marg, Laxman Jhula, Tapovan, Rishikesh, Uttarakhand 249192, India",
    mapsQuery: "The 60's Cafe The Beatles, Laxman Jhula, Rishikesh",
    description: "A Beatles-themed vegetarian café on the footpath near Laxman Jhula, its walls covered in posters and records and its menu named after the band's songs — a nod to their 1968 stay at the ashram nearby. The big terrace looks out over the Ganges and the hills, and the food runs from pancakes and pizza to tofu scrambles and smoothies. Good for a slow solo sunset.",
  },
  "chotiwala-restaurant-rishikesh": {
    address: "Swarg Ashram, near Ram Jhula, Rishikesh, Uttarakhand 249304, India",
    mapsQuery: "Chotiwala Restaurant, Swarg Ashram, Rishikesh",
    description: "A Rishikesh institution just off Ram Jhula at Swarg Ashram, open since 1958 and famous for its vegetarian thalis — rotis, dal makhani, paneer, kadhi and rice on one plate. Look for the man sitting outside with a painted face and a long choti (topknot), ringing a bell: he's the restaurant's living mascot and happy to pose for photos. A classic first meal in town.",
  },
  "freedom-cafe-rishikesh": {
    name: "Om Freedom Café",
    address: "Laxman Jhula, Tapovan, Rishikesh, Uttarakhand 249302, India",
    mapsQuery: "Om Freedom Cafe, Tapovan, Rishikesh",
    description: "A popular traveller café in Tapovan near Laxman Jhula, serving big breakfasts, Israeli and continental dishes and North Indian food from morning until late. There's outdoor seating and live music on some weekend evenings, and the easy, sociable atmosphere makes it one of the better places in Rishikesh to fall into conversation over a long meal.",
  },
  "the-sitting-elephant-rishikesh": {
    address: "EllBee Ganga View Hotel, Haridwar Road, Palika Nagar, Rishikesh, Uttarakhand 249201, India",
    website: "https://ellbeehotels.com/the-sitting-elephant/rishikesh",
    description: "An award-winning rooftop restaurant on top of the EllBee Ganga View hotel on Haridwar Road, with wide views over the Ganges and the town. The menu is multi-cuisine — Indian, Chinese, Italian and Mexican — and the setting is calmer and more polished than the café strip in Tapovan. A good choice for a sunset dinner or a quieter evening on the town's south side.",
  },
  "aloha-on-the-ganges": {
    address: "NH 58, Tapovan, Rishikesh, Uttarakhand 249192, India",
    website: "https://www.leisurehotels.co.in/rishikesh/aloha-on-the-ganges/",
    description: "A riverside resort by Leisure Hotels, right on the banks of the Ganges about 2km from Laxman Jhula. Beyond the rooms, it works as a wellness base: daily yoga and meditation sessions, an Ayurvedic and international spa with a steam room, and guided nature walks. A good pick if you want a comfortable stay where the yoga comes to you.",
  },
  "anand-prakash-yoga-ashram-rishikesh": {
    address: "Tapovan, Laxman Jhula, Rishikesh, Uttarakhand 249192, India",
    website: "https://akhandayoga.com/ashram/",
    description: "An ashram in Tapovan founded in 2007 by Yogrishi Vishvketu, creator of Akhanda Yoga, about five minutes' walk uphill from the Ganges. It runs 100-, 200- and 300-hour teacher trainings and retreats, and its daily morning and evening classes are open to drop-in visitors for a small fee — an easy way to try a class without committing to a course.",
  },
  "parmarth-niketan-rishikesh": {
    address: "Swarg Ashram, near Ram Jhula, Rishikesh, Uttarakhand 249304, India",
    description: "One of Rishikesh's largest ashrams, on the east bank of the Ganges at Swarg Ashram, with gardens, daily yoga and meditation. It's best known for its evening Ganga Aarti on the riverside ghat, led by priests and the ashram's young students with chanting and lamps, starting around 5:30–6pm depending on the season. Entry is free; arrive early for a spot on the steps.",
  },
  "sivananda-ashram-rishikesh": {
    address: "Muni Ki Reti, Rishikesh, Uttarakhand 249192, India",
    website: "https://www.dlshq.org/",
    description: "Headquarters of the Divine Life Society, founded by Swami Sivananda in 1936 on the banks of the Ganges at Muni Ki Reti. It's a serious centre of classical yoga and Vedanta, with its own ghat where Ganga aarti is performed morning and evening, and visitors are welcome to look around and join the satsang. Longer stays need written permission in advance.",
  },
  "swarg-ashram-market-rishikesh": {
    address: "Swarg Ashram, Rishikesh, Uttarakhand 249304, India",
    mapsQuery: "Swarg Ashram, Rishikesh",
    description: "The car-free stretch on the east bank of the Ganges around Ram Jhula, lined with ashrams, temples, Ayurvedic pharmacies and stalls selling rudraksha beads, incense and spiritual books. Parmarth Niketan and Chotiwala are here, and the Beatles Ashram is at its southern end. It's easy to wander alone for an afternoon — just share the lanes with the cows and watch for monkeys.",
  },
  "tapovan-rishikesh": {
    address: "Tapovan, Rishikesh, Uttarakhand 249192, India",
    mapsQuery: "Tapovan, Rishikesh",
    description: "The traveller hub of Rishikesh on the hillside above the old Laxman Jhula, packed with yoga schools, ashrams, cafés, guesthouses and shops selling yoga gear. Most of the drop-in classes, teacher trainings and backpacker hostels are here, which makes it the easiest part of town to meet other solo travellers. Rishikesh is officially vegetarian and alcohol-free.",
  },
  "neer-garh-waterfall-rishikesh": {
    address: "Neer Village, Badrinath Road, near Tapovan, Rishikesh, Uttarakhand 249192, India",
    mapsQuery: "Neer Garh Waterfall, Rishikesh",
    description: "A two-tier forest waterfall about 4–5km from Laxman Jhula off the Badrinath road. From the road it's a short uphill walk to the first small falls and pool, then about 1.2km more on a forest trail to the main waterfall and a bigger pool. There's a small entry fee and snack stalls along the way; wear shoes with grip, as the rocks are slippery.",
  },
  "rajaji-national-park-rishikesh": {
    address: "Rajaji National Park, Uttarakhand, India",
    mapsQuery: "Chilla Safari Zone, Rajaji National Park",
    description: "A national park and, since 2015, a tiger reserve across the Shivalik foothills between Haridwar and Rishikesh, home to wild Asian elephants, leopards, tigers, deer and more than 300 bird species. Jeep safaris run from mid-November to mid-June; the Chilla zone, about 20km from Rishikesh, is the most accessible. Book through the forest department or a registered operator.",
  },
  "beatles-ashram": {
    name: "Beatles Ashram (Chaurasi Kutia)",
    address: "Chaurasi Kutia, Swarg Ashram, Rishikesh, Uttarakhand 249304, India",
    mapsQuery: "Beatles Ashram Chaurasi Kutia, Rishikesh",
    description: "Officially Chaurasi Kutia, the former ashram of Maharishi Mahesh Yogi, where the Beatles stayed in 1968 to study Transcendental Meditation. It now sits inside the Rajaji Tiger Reserve and is run by the forest department; its crumbling meditation domes and halls are covered in murals. There's an entry fee (much higher for foreigners) and it closes before sunset, so go in the morning.",
  },
  "kunjapuri-devi-temple-rishikesh": {
    address: "Kunjapuri, Tehri Garhwal, Uttarakhand, India",
    mapsQuery: "Kunjapuri Devi Temple",
    description: "A hilltop Shakti Peeth temple at about 1,676m, roughly 25km — a 45-minute drive — from Tapovan. Most visitors leave Rishikesh around 4:30am and climb the final flight of steps for sunrise, when the snow peaks of the Garhwal Himalaya appear to the north above the Doon valley. Arrange a taxi the night before or join one of the many sunrise trips.",
  },
  "lakshman-jhula-rishikesh": {
    address: "Laxman Jhula, Rishikesh, Uttarakhand 249302, India",
    mapsQuery: "Lakshman Jhula, Rishikesh",
    description: "The iron suspension bridge that became the symbol of Rishikesh, built in 1929 where Lakshman is said to have crossed the Ganges on a jute rope. It was declared unsafe and closed to the public in 2022, and a new glass-floored bridge, Bajrang Setu, has been built at the same crossing — check locally whether it's open. The temples, cafés and market around it are as busy as ever.",
  },
  "neelkanth-mahadev-temple-rishikesh": {
    address: "Neelkanth, Pauri Garhwal, Uttarakhand 249304, India",
    website: "https://pauri.nic.in/tourist-place/neelkanth-mahadev-temple/",
    mapsQuery: "Neelkanth Mahadev Temple",
    description: "A major Shiva temple in the forested hills across the Ganges, where Shiva is said to have drunk the poison churned from the ocean. It's about 32km by road via the barrage (or 22km via Ram Jhula), taking 1.5–2 hours, and some people trek up through the forest instead. It gets extremely crowded during the Kanwar Yatra in July–August, so go outside that period.",
  },
  "ram-jhula-rishikesh": {
    address: "Ram Jhula, Rishikesh, Uttarakhand 249304, India",
    mapsQuery: "Ram Jhula, Rishikesh",
    description: "A pedestrian suspension bridge built in 1986, linking Muni Ki Reti on the west bank with the ashrams of Swarg Ashram on the east. With Lakshman Jhula closed, it's one of the town's main river crossings, busy with pilgrims, scooters and the occasional cow. Stop halfway across for views up and down the Ganges, especially in the late afternoon light.",
  },
  "triveni-ghat-rishikesh": {
    address: "Triveni Ghat, Rishikesh, Uttarakhand 249201, India",
    mapsQuery: "Triveni Ghat, Rishikesh",
    description: "Rishikesh's largest bathing ghat, in the old town, where the Ganges is said to meet two other sacred rivers. At dusk, the Ganga Aarti here is louder and more energetic than Parmarth's, with drums, conch shells, big brass lamps and crowds floating leaf-boat diyas on the river. It starts around 5:30–6pm depending on the season, and entry is free.",
  },
};

(async () => {
  const city = await prisma.city.findUnique({ where: { slug: "rishikesh" }, select: { id: true } });
  if (!city) throw new Error("city rishikesh not found");
  console.log(APPLY ? "APPLYING to database…" : "DRY RUN (no changes). Re-run with --apply to write.");

  const slugs = Object.keys(SPOTS);
  const existing = await prisma.spot.findMany({ where: { cityId: city.id, slug: { in: slugs } }, select: { id: true, slug: true, name: true } });
  const bySlug = Object.fromEntries(existing.map((s) => [s.slug, s]));

  for (const slug of slugs) {
    const spot = bySlug[slug];
    if (!spot) { console.warn(`  SKIP ${slug}: not found in city`); continue; }
    const { name, address, website, description, mapsQuery } = SPOTS[slug];
    if (description.length < 250) console.warn(`  WARN ${slug}: description only ${description.length} chars`);
    const data = {
      address,
      description,
      googleMapsUrl: maps(mapsQuery || `${name || spot.name}, ${address}`),
      ...(name ? { name } : {}),
      ...(website ? { website } : {}),
    };
    console.log(`UPDATE  ${name || spot.name}  (${slug})  desc ${description.length}${name ? `  [rename from ${spot.name}]` : ""}`);
    if (APPLY) await prisma.spot.update({ where: { id: spot.id }, data });
  }
  console.log(`\nDone. ${existing.length}/${slugs.length} ${APPLY ? "updated" : "would be updated (dry run)"}.`);
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
