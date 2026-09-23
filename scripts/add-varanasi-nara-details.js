// Varanasi + Nara enrichment. 31 spots, all descriptions under ~125 chars, no addresses or links.
// Researched 2026-09-23.
//
// DELETED (1):
//   - kura-cafe-nara: "Kura Coffee" in Naramachi doesn't exist — the only "Kura" (蔵) in Naramachi is an evening izakaya
//     (5–11:30pm), and "Kura Coffee" is a café in Tsuruhashi, Osaka. The old pour-over café description was invented.
//
// Corrected / renamed:
//   - Kōfuku-ji's five-storey pagoda is enclosed for restoration (first in ~120 yrs) until about 2031 — old desc
//     called it "one of Nara's defining silhouettes", which visitors currently can't see.
//   - "Banarasi Silk Weaving Workshop" → "Banarasi Silk Weaving Quarter": there's no single workshop; weaving happens
//     in homes in Madanpura/Peeli Kothi (with a warning about commission touts).
//   - Kashi Vishwanath: corridor opened 2021; phones/bags go in lockers.
//   - Wakakusa open 3rd Sat of March–2nd Sun of December, small fee (visitnara). Yoshikien still free for foreigners.
// Sources: Hostelworld/Tripadvisor/Zostel, Ganpati (D3/24 Meer Ghat), Pizzeria Vaatika (est. 1993), Blue Lassi
// (CK 12/1 Kunj Gali), Kashi Chat Bhandar (D-37/47 Dashashwamedh Ghat Rd), BrijRama (built 1812), Open Hand
// (social enterprise, B1/128-3 Assi Ghat Rd), Nara Backpackers (31 Yurugi-cho, ~100-yr-old house), JW Marriott
// Nara (opened 22 Jul 2020, 158 rooms — marriott.com 403s to bots), Hiraso (30-1 Imamikado-cho), Nakatanidou
// (29 Hashimoto-cho), Kōfuku-ji restoration (kohfukuji-project.jp).
//
//   node scripts/add-varanasi-nara-details.js            (dry run)
//   node scripts/add-varanasi-nara-details.js --apply     (write)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const CITIES = {
  varanasi: {
    delete: [],
    spots: {
      "brijrama-palace-varanasi": {
        address: "Darbhanga Ghat, Varanasi, Uttar Pradesh 221001, India",
        mapsQuery: "BrijRama Palace, Varanasi",
        description: "A heritage hotel in a palace built in 1812 on Darbhanga Ghat, right beside Dashashwamedh Ghat, restored over 18 years with its frescoes and stone detailing intact. Rooms look over the Ganges, and the evening Ganga Aarti takes place just along the ghats. Arriving by boat is part of the experience — a splurge at the very heart of the riverfront.",
      },
      "ganpati-guesthouse-varanasi": {
        address: "D3/24 Meer Ghat, near Dashashwamedh Ghat, Varanasi, Uttar Pradesh 221001, India",
        website: "https://www.ganpatiguesthouse.com/",
        description: "A long-running guesthouse on Meer Ghat, a few minutes' walk from Dashashwamedh Ghat and the Kashi Vishwanath Temple, with Ganges views from its terraces and many of its rooms. It's a comfortable, well-located mid-range base in the old city, where you can watch life on the river from above and walk to the evening aarti.",
      },
      "zostel-varanasi": {
        address: "D-29/11 Bangali Tola Road, Bangali Tola, Varanasi, Uttar Pradesh 221001, India",
        website: "https://www.zostel.com/destination/Varanasi/stay/zostel-varanasi-vrnh142",
        description: "A branch of Zostel, India's biggest backpacker hostel chain, in Bangali Tola among the old-city lanes, a short walk from the ghats. Dorms, private rooms and social common spaces make it an easy place to meet other travellers — and to find company for a sunrise boat ride or the evening Ganga Aarti.",
      },
      "open-hand-cafe-varanasi": {
        address: "B1/128-3 Assi Ghat Road, Dumraun Bagh, Varanasi, Uttar Pradesh 221005, India",
        mapsQuery: "Open Hand Cafe & Shop, Assi, Varanasi",
        description: "A café and shop near Assi Ghat run as a social enterprise that sells crafts made by local artisans. It's a calm, bright place for good coffee, breakfast, sandwiches and cakes, open from early morning into the evening — handy for a quiet hour with a book or laptop after a sunrise boat ride. The shop is good for fair-trade souvenirs.",
      },
      "pizzeria-vaatika-varanasi": {
        address: "B-1/178 Assi Ghat Road, Shivala, Varanasi, Uttar Pradesh 221005, India",
        website: "https://www.pizzeriavaatika.com/",
        description: "A garden café right on Assi Ghat, open since 1993 and known for its wood-fired pizzas and apple pie. The terrace looks over the Ganges, and it's a relaxed place to linger over a meal or a lassi between walks along the ghats. Popular with travellers, it's an easy, low-key spot for a solo lunch or dinner.",
      },
      "blue-lassi-varanasi": {
        address: "CK 12/1 Kunj Gali, Kachori Gali, Varanasi, Uttar Pradesh 221001, India",
        mapsQuery: "Blue Lassi Shop, Varanasi",
        description: "A tiny family-run lassi shop deep in the old-city lanes near Manikarnika Ghat, run for three generations and serving around 80 kinds of thick lassi in clay cups, topped with malai. The walls are covered in travellers' photos and notes. It's a classic stop on a walk through the old town — try a banana or fruit-and-nut lassi.",
      },
      "kashi-chat-bhandar-varanasi": {
        address: "D-37/47 Dashashwamedh Ghat Road, Godowlia, Varanasi, Uttar Pradesh 221001, India",
        mapsQuery: "Kashi Chat Bhandar, Godowlia, Varanasi",
        description: "A popular chaat shop on Dashashwamedh Ghat Road near Godowlia crossing, famous for tamatar chaat — a spicy, tangy mash of tomato and potato served in a leaf bowl — plus palak chaat and golgappa. It's busy in the evenings, cheap and quick; stop by before or after the Ganga Aarti at Dashashwamedh Ghat nearby.",
      },
      "subah-e-banaras-varanasi": {
        address: "Assi Ghat, Varanasi, Uttar Pradesh 221005, India",
        mapsQuery: "Assi Ghat, Varanasi",
        description: "A free programme held before sunrise every morning at Assi Ghat, with a Vedic fire ritual and chanting, a morning Ganga aarti, classical music and a yoga session on the ghat steps. It's a peaceful, far less crowded counterpart to the evening aarti at Dashashwamedh, and a lovely way to begin a day of walking along the river.",
      },
      "boat-ride-varanasi": {
        address: "Dashashwamedh Ghat, Varanasi, Uttar Pradesh 221001, India",
        mapsQuery: "Dashashwamedh Ghat, Varanasi",
        description: "A dawn boat ride along the Ganges is the classic Varanasi experience: as the sun rises, you drift past pilgrims bathing, priests at prayer and the smoke of the cremation ghats. Boats leave from Dashashwamedh, Assi and other ghats — agree the price and duration with the boatman before setting off, and choose a hand-rowed boat for a quieter ride.",
      },
      "assi-ghat-varanasi": {
        address: "Assi Ghat, Varanasi, Uttar Pradesh 221005, India",
        mapsQuery: "Assi Ghat, Varanasi",
        description: "The southernmost of the main ghats, where the small Assi river meets the Ganges, with a more relaxed, residential feel than the central ghats. It's home to the Subah-e-Banaras sunrise programme and a smaller evening aarti, surrounded by cafés, guesthouses and bookshops. From here you can walk north along the ghats to Dashashwamedh in under an hour.",
      },
      "banaras-hindu-university-varanasi": {
        address: "Banaras Hindu University, Varanasi, Uttar Pradesh 221005, India",
        mapsQuery: "New Vishwanath Temple, BHU, Varanasi",
        description: "One of Asia's largest residential universities, founded in 1916, with a huge leafy campus south of the old city. At its heart is the New Vishwanath Temple, a tall white-marble temple built by the Birla family and open to people of all faiths. The campus is a calm contrast to the ghats, and the Bharat Kala Bhavan museum is worth a look.",
      },
      "silk-weaving-varanasi": {
        name: "Banarasi Silk Weaving Quarter",
        address: "Madanpura, Varanasi, Uttar Pradesh 221001, India",
        mapsQuery: "Madanpura, Varanasi",
        description: "Varanasi is famous for Banarasi silk, woven on handlooms in neighbourhoods such as Madanpura and Peeli Kothi, where you can hear the clack of looms from open doorways. Some weaving families welcome visitors to watch the intricate brocade work. Be wary of touts steering you to shops for commission — a guided heritage walk is the easiest way in.",
      },
      "dashashwamedh-ghat-varanasi": {
        address: "Dashashwamedh Ghat, Varanasi, Uttar Pradesh 221001, India",
        mapsQuery: "Dashashwamedh Ghat, Varanasi",
        description: "Varanasi's main and busiest ghat, close to the Kashi Vishwanath Temple. Every evening at sunset, priests perform the Ganga Aarti with large brass lamps, bells and chanting, watched by crowds on the steps and from boats on the river. Arrive at least 30 minutes early for a spot on the steps, or watch from a boat for a less crowded view.",
      },
      "kashi-vishwanath-varanasi": {
        address: "Lahori Tola, Varanasi, Uttar Pradesh 221001, India",
        website: "https://shrikashivishwanath.org/",
        description: "One of the holiest Hindu temples, dedicated to Shiva as one of the twelve jyotirlingas, with gold-plated spires. Since 2021 the Kashi Vishwanath Dham corridor has linked it directly to the ghats. Security is strict: phones, bags and cameras usually have to go in lockers, and queues can be long. Dress modestly; foreign visitors can enter.",
      },
      "manikarnika-ghat-varanasi": {
        address: "Manikarnika Ghat, Varanasi, Uttar Pradesh 221001, India",
        mapsQuery: "Manikarnika Ghat, Varanasi",
        description: "Varanasi's principal cremation ghat, where cremations take place day and night, as dying and being cremated here is believed to bring liberation. Visitors may watch quietly from a respectful distance, but photographing cremations isn't allowed. Beware of self-appointed 'guides' asking for money for wood — it's a well-known scam.",
      },
      "ramnagar-fort-varanasi": {
        address: "Ramnagar, Varanasi, Uttar Pradesh 221008, India",
        mapsQuery: "Ramnagar Fort, Varanasi",
        description: "An 18th-century sandstone fort on the east bank of the Ganges, about 14km south of the old city and still the residence of the former royal family of Banaras. Part of it is a faded but fascinating museum of vintage cars, palanquins, weapons and an astronomical clock. It's reached by road across the river; go in the afternoon.",
      },
      "sarnath-varanasi": {
        address: "Sarnath, Varanasi, Uttar Pradesh 221007, India",
        mapsQuery: "Dhamek Stupa, Sarnath",
        description: "About 10km north-east of Varanasi, the deer park where the Buddha gave his first sermon after enlightenment. See the huge Dhamek Stupa, temple ruins and monasteries built by Buddhist countries; the archaeological museum holds the Lion Capital of Ashoka, India's national emblem, and is closed on Fridays. A peaceful half-day trip from the ghats.",
      },
    },
  },
  nara: {
    delete: ["kura-cafe-nara"],
    spots: {
      "guesthouse-nara": {
        address: "31 Yurugi-cho, Nara, Nara 630-8283, Japan",
        website: "http://www.nara-backpackers.com/home.en.html",
        description: "A guesthouse in a traditional house around 100 years old, about 200m from Nara Park, with tatami rooms, mixed and female-only dorms, private rooms and a small garden. There's a modern shared kitchen, and the atmosphere is calm and homely — a nice change from city hostels, and well placed for seeing the park and temples early, before the crowds.",
      },
      "jw-marriott-nara": {
        address: "Omiya-cho, Nara, Nara, Japan",
        website: "https://www.marriott.com/en-us/hotels/osajw-jw-marriott-hotel-nara/overview/",
        mapsQuery: "JW Marriott Hotel Nara",
        description: "Nara's first international luxury hotel, opened in July 2020 with 158 rooms including 16 suites, a spa and refined restaurants. It's near JR Nara Station rather than inside the park, so the temples are a short bus ride or a 20–30 minute walk away. A comfortable, polished base for a slower overnight stay after the crowds of Kyoto.",
      },
      "hiraso-nara": {
        address: "30-1 Imamikado-cho, Nara, Nara, Japan",
        mapsQuery: "Hiraso kakinoha sushi, Naramachi, Nara",
        description: "A long-established shop and restaurant for kakinoha-zushi, Nara's speciality of pressed mackerel or salmon sushi wrapped in persimmon leaves, which once kept fish fresh on the journey inland from the coast. The Naramachi branch has a restaurant where you can eat sets on site, or buy a box to take to the park for a picnic.",
      },
      "mochi-pounding-nara": {
        address: "29 Hashimoto-cho, Nara, Nara 630-8217, Japan",
        mapsQuery: "Nakatanidou, Nara",
        description: "A small mochi shop on the Sanjo-dori shopping street, famous for its high-speed mochi pounding, performed several times a day with shouts and lightning-fast mallets. The fresh yomogi mochi — flavoured with mugwort, filled with red bean paste and dusted with kinako — is served warm. Crowds gather for the show, so arrive a little early.",
      },
      "naramachi-nara": {
        address: "Naramachi, Nara, Nara, Japan",
        mapsQuery: "Naramachi, Nara",
        description: "A preserved merchant quarter south of Sarusawa Pond, with narrow lanes of wooden machiya townhouses whose lattice fronts hide craft shops, cafés, sake breweries and small museums. Many houses hang red 'migawari-zaru' charms for protection. Free exhibits such as Naramachi Koshi-no-Ie let you step inside a traditional townhouse.",
      },
      "isuien-garden-nara": {
        address: "74 Suimon-cho, Nara, Nara, Japan",
        website: "https://isuien.or.jp/",
        description: "A strolling garden beside Todai-ji, laid out in two parts from the 17th and 19th centuries, that 'borrows' the roof of Todai-ji's Nandaimon gate and the Wakakusa and Kasuga hills as its backdrop. Ponds, stepping stones and teahouses make it one of Nara's calmest spots, and the ticket includes the small Neiraku Museum of Chinese and Korean ceramics.",
      },
      "kasuga-primeval-forest-nara": {
        address: "Kasugano-cho, Nara, Nara, Japan",
        mapsQuery: "Kasugayama Primeval Forest, Nara",
        description: "A protected forest of old-growth trees on the slopes behind Kasuga Taisha, left largely untouched for over a thousand years as sacred shrine land and part of the Historic Monuments of Ancient Nara UNESCO site. Quiet trails wind through it, and the Kasugayama promenade takes a few hours to walk. Stay on the paths and carry water.",
      },
      "mount-wakakusa-nara": {
        address: "Kasugano-cho, Nara, Nara, Japan",
        website: "https://www.visitnara.jp/venues/A00491/",
        mapsQuery: "Mount Wakakusa, Nara",
        description: "A 342m grassy hill at the eastern edge of Nara Park, open from the third Saturday of March to the second Sunday of December for a small fee. A short but steep climb leads to wide views over the city and Todai-ji's roof, lovely at sunset. In January the whole hillside is set alight during the Yamayaki grass-burning festival.",
      },
      "nara-park-deer": {
        address: "Nara Park, Nara, Nara, Japan",
        mapsQuery: "Nara Park",
        description: "A large park at the foot of Mount Wakakusa where more than 1,000 wild sika deer roam freely among the temples, regarded as sacred messengers of the gods. Deer crackers (shika-senbei) are sold around the park; bow and the deer often bow back. They can nip or butt, though, so hold the crackers out of reach and don't tease them.",
      },
      "yoshikien-garden-nara": {
        address: "Noboriōji-chō, Nara, Nara, Japan",
        mapsQuery: "Yoshikien Garden, Nara",
        description: "Three small gardens — a pond garden, a moss garden and a tea-ceremony flower garden — on the site of a former monk's residence next to Isuien. It's free for foreign visitors on showing a passport, rarely crowded and especially pretty in autumn. Allow half an hour and combine it with Isuien and Todai-ji, a few minutes' walk away.",
      },
      "kasuga-taisha-nara": {
        address: "160 Kasugano-cho, Nara, Nara, Japan",
        website: "https://www.kasugataisha.or.jp/",
        mapsQuery: "Kasuga Taisha, Nara",
        description: "Nara's most important Shinto shrine, founded in 768 and part of the UNESCO-listed Historic Monuments of Ancient Nara. The forest approach is lined with around 2,000 stone lanterns, and about 1,000 bronze lanterns hang from the vermilion corridors; all are lit only twice a year, in early February and mid-August. The outer grounds are free.",
      },
      "kofuku-ji-nara": {
        address: "48 Noboriōji-chō, Nara, Nara, Japan",
        website: "https://www.kohfukuji.com/",
        mapsQuery: "Kofukuji Temple, Nara",
        description: "Once one of the most powerful temples in Japan, moved to Nara in 710. Its famous five-storey pagoda, rebuilt in 1426, is currently hidden inside a protective enclosure for its first major restoration in about 120 years, expected to finish around 2031. The National Treasure Museum still holds superb Buddhist statues, including the Ashura figure.",
      },
      "todai-ji-nara": {
        address: "406-1 Zōshi-chō, Nara, Nara, Japan",
        website: "https://www.todaiji.or.jp/en/",
        mapsQuery: "Todai-ji, Nara",
        description: "The great temple of Nara, founded in the 8th century, whose Daibutsuden hall — one of the world's largest wooden buildings — houses a bronze Buddha about 15m tall. Pass the huge Nandaimon gate and its guardian statues on the way in, and look for the pillar with a hole said to bring enlightenment to those who squeeze through. Go early.",
      },
    },
  },
};

(async () => {
  console.log(APPLY ? "APPLYING to database…" : "DRY RUN (no changes). Re-run with --apply to write.");
  for (const [citySlug, { delete: del, spots: SPOTS }] of Object.entries(CITIES)) {
    const city = await prisma.city.findUnique({ where: { slug: citySlug }, select: { id: true } });
    if (!city) throw new Error(`city ${citySlug} not found`);
    console.log(`\n=== ${citySlug}`);
    const toDelete = await prisma.spot.findMany({ where: { cityId: city.id, slug: { in: del } }, select: { id: true, name: true } });
    for (const s of toDelete) console.log(`DELETE  ${s.name}`);
    if (APPLY && toDelete.length) await prisma.spot.deleteMany({ where: { id: { in: toDelete.map((s) => s.id) } } });

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
      console.log(`UPDATE  ${name || spot.name}  (${slug})  desc ${description.length}${name ? `  [rename from ${spot.name}]` : ""}`);
      if (APPLY) await prisma.spot.update({ where: { id: spot.id }, data });
    }
    console.log(`${citySlug}: ${toDelete.length}/${del.length} deleted, ${existing.length}/${slugs.length} ${APPLY ? "updated" : "would be updated"}.`);
  }
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
