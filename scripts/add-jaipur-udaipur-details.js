// Jaipur + Udaipur spot enrichment — all 39 spots had no address (and nearly all no website), every description
// under ~155 chars. Researched 2026-09-23. All businesses verified open; no fakes found.
//
// Corrections/notes:
//   - LMB (Laxmi Misthan Bhandar): traces its history to 1727 (LMB, Wikipedia) — old desc said "1950s".
//   - Madhuban: real name "Madhuban – A Heritage Home", D-237 Bihari Marg, Bani Park (family-run, pool, garden).
//     "Frescoed rooms" had no source, dropped.
//   - "Jaipur Coworking (myHQ)" is a booking platform, not one space — description now says so honestly.
//   - Jal Mahal: interior closed to visitors (view from the promenade only).
//   - Curious Life: two cafés ('Blue' original near Deer Park, 'Red' on Sarojini Marg) — used the main Red address.
//   - Tattoo Café: 3rd floor opp. Hawa Mahal, with a working tattoo studio inside.
// Sources: official sites below, Taj (tajhotels.com returns 403 to bots but is official), Zostel, Rajasthan
// Tourism/RTDC (Padao at Nahargarh), Amber light & sound show timings (52 min; English 6:30–7:30pm by season),
// Jagat Collection (17th-c. haveli, 23–25 Lal Ghat), Café Edelweiss (since 1999), Jheel's (since 2011),
// Ambrai (since 1998, Amet Haveli), Millets of Mewar (16 Bhim Parmeshwar Marg), City Palace Museum (MMCF).
//
//   node scripts/add-jaipur-udaipur-details.js            (dry run)
//   node scripts/add-jaipur-udaipur-details.js --apply     (write)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const CITIES = {
  jaipur: {
    "madhuban-haveli-jaipur": {
      name: "Madhuban – A Heritage Home",
      address: "D-237 Bihari Marg, Bani Park, Jaipur, Rajasthan 302016, India",
      website: "https://madhuban.net/",
      description: "A family-run heritage guesthouse in Bani Park, a quiet residential area a short drive from the old walled city. Rooms are decorated in traditional Rajasthani style, and there's a garden, an outdoor pool and an open-air restaurant — a restful base after long days in the bazaars. The family's personal hospitality is a big part of the appeal.",
    },
    "rambagh-palace-jaipur": {
      address: "Bhawani Singh Road, Jaipur, Rajasthan 302005, India",
      website: "https://www.tajhotels.com/en-in/hotels/rambagh-palace-jaipur",
      description: "The former residence of the Maharaja of Jaipur, turned into a hotel in 1957 and now run by Taj. Its Mughal-style gardens with strutting peacocks, marble corridors and grand dining rooms make it the city's most regal stay, and non-guests can book a meal or afternoon tea on the verandah to see it. Expect palace prices.",
    },
    "zostel-jaipur": {
      address: "1st Floor, 85-A Rajamal Ka Talab Road, opp. Tourist Police Station, Chandi Ki Taksal, Pink City, Jaipur 302002, India",
      website: "https://www.zostel.com/destination/jaipur/stay/jaipur-jprh038",
      description: "A branch of Zostel, India's biggest backpacker hostel chain, inside the walled Pink City near Hawa Mahal. Dorms, private rooms and common areas make it easy to meet other travellers, and the bazaars, City Palace and Jantar Mantar are all within walking distance. A practical, sociable base for a first visit to Jaipur.",
    },
    "curious-life-coffee-jaipur": {
      address: "Ground Floor, C-54A, Sarojini Marg, C-Scheme, Jaipur, Rajasthan 302001, India",
      website: "https://curiouslifecoffee.com/",
      description: "One of Jaipur's first specialty-coffee roasters, with its original 'Blue' café near Deer Park and a larger 'Red' café on Sarojini Marg in C-Scheme. Beans are roasted in-house, espresso and pour-overs are made with care, and there's an all-day brunch menu. The calm rooms suit a few hours of laptop work away from the old city's bustle.",
    },
    "tattoo-cafe-jaipur": {
      name: "The Tattoo Café & Lounge",
      address: "3rd Floor, 30, opp. Hawa Mahal, Badi Chaupar, Jaipur, Rajasthan 302002, India",
      description: "A rooftop café directly opposite Hawa Mahal with one of the best close-up views of the famous façade — especially at sunset and when it's lit up after dark. It serves a multi-cuisine menu, coffee and drinks, and, as the name suggests, there's a working tattoo studio on site. The entrance is up a narrow staircase from the street, so look carefully.",
    },
    "jaipur-coworking": {
      address: "Jaipur, Rajasthan, India",
      mapsQuery: "coworking space C Scheme Jaipur",
      description: "Rather than a single space, myHQ is a booking platform for day passes and short-term desks at coworking spaces around Jaipur, many of them in central areas such as C-Scheme. It's a flexible way to find fast Wi-Fi, air-conditioning and a quiet desk for a day or a week while you travel. Compare spaces on the site and book before you head over.",
    },
    "lmb-jaipur": {
      address: "Johari Bazaar, Pink City, Jaipur, Rajasthan 302003, India",
      website: "https://lmbsweets.com/",
      description: "A landmark vegetarian restaurant and sweet shop in Johari Bazaar that traces its history back to 1727, the year Jaipur was founded. Locals come for the Rajasthani thali, pyaaz kachori and above all the paneer ghewar, a rich, honeycomb-like sweet. The dining room is old-fashioned and busy — a good stop while exploring the bazaars on foot.",
    },
    "spice-court-jaipur": {
      address: "Achrol House, Jacob Road, Civil Lines, Jaipur, Rajasthan 302006, India",
      description: "A long-running restaurant in the grounds of Achrol House, a heritage property in Civil Lines, known for Rajasthani meat dishes such as laal maas (a fiery red mutton curry) and keema baati. There's indoor seating and a popular outdoor courtyard. A good place to try laal maas if you eat meat — ask them to adjust the spice level if needed.",
    },
    "johari-bazaar-jaipur": {
      address: "Johari Bazaar, Pink City, Jaipur, Rajasthan 302003, India",
      mapsQuery: "Johari Bazaar, Jaipur",
      description: "One of the main bazaars of Jaipur's walled Pink City, running south from Badi Chaupar. As its name — 'jewellers' market' — suggests, it's lined with jewellery and gemstone shops, plus textile, block-print and bangle stores and famous sweet shops like LMB. It's crowded and colourful; bargain politely and avoid anyone pushing gem 'investment' deals.",
    },
    "central-park-jaipur": {
      address: "Prithviraj Road, C-Scheme, Jaipur, Rajasthan 302001, India",
      mapsQuery: "Central Park, Jaipur",
      description: "Jaipur's largest park, in the city centre next to the Rambagh Polo Ground, with a long jogging and walking track, gardens and lawns. A giant national flag flies from a tall mast in the park. Go early in the morning or around sunset, when locals come out to walk and the air is cooler, for a calm break from the city traffic.",
    },
    "albert-hall-museum-jaipur": {
      address: "Ram Niwas Garden, Jaipur, Rajasthan 302004, India",
      mapsQuery: "Albert Hall Museum, Jaipur",
      description: "Rajasthan's oldest museum, opened in 1887 in a grand Indo-Saracenic building designed by Samuel Swinton Jacob, in the middle of Ram Niwas Garden. The collection spans miniature paintings, carpets, arms, pottery and even an Egyptian mummy. The building is lit up beautifully at night, when the square in front fills with families and pigeons.",
    },
    "amber-fort-jaipur": {
      address: "Devisinghpura, Amer, Jaipur, Rajasthan 302001, India",
      mapsQuery: "Amber Fort, Jaipur",
      description: "A vast hilltop fort-palace in Amer, about 11km north of Jaipur and part of the Hill Forts of Rajasthan UNESCO World Heritage Site. Walk up the ramparts from Maota Lake or take a jeep, then explore the courtyards, the Sheesh Mahal mirror palace and the views of old walls snaking across the hills. Go early to beat the heat and the crowds.",
    },
    "city-palace-jaipur": {
      address: "Tulsi Marg, Gangori Bazaar, Pink City, Jaipur, Rajasthan 302002, India",
      website: "https://www.royaljaipur.in/",
      description: "The palace complex at the heart of the Pink City, part of which is still home to the former royal family. Courtyards lead to museum galleries of textiles, weapons and paintings, and the Pritam Niwas Chowk has four beautifully painted gates representing the seasons, including the famous Peacock Gate. Combine it with Jantar Mantar next door.",
    },
    "galtaji-monkey-temple-jaipur": {
      address: "Galta Ji, Jaipur, Rajasthan 302013, India",
      mapsQuery: "Galtaji Temple, Jaipur",
      description: "An old Hindu pilgrimage site in a narrow gorge on the eastern edge of Jaipur, with temples and pavilions stacked around natural spring-fed tanks where pilgrims bathe. Many monkeys live here, hence the 'Monkey Temple' nickname — keep food out of sight. Walk up to the Surya Mandir on the ridge above for sunset views over the city.",
    },
    "hawa-mahal-jaipur": {
      address: "Hawa Mahal Road, Badi Chaupar, Pink City, Jaipur, Rajasthan 302002, India",
      mapsQuery: "Hawa Mahal, Jaipur",
      description: "The 'Palace of Winds', built in 1799 by Maharaja Sawai Pratap Singh: a five-storey pink sandstone façade with 953 small latticed windows designed so royal women could watch street life unseen. The best views of the front are from the street or a rooftop café opposite; the entrance is round the back, and you can climb to the top for old-city views.",
    },
    "jal-mahal-jaipur": {
      address: "Amer Road, Man Sagar Lake, Jaipur, Rajasthan 302002, India",
      mapsQuery: "Jal Mahal, Jaipur",
      description: "A palace in the middle of Man Sagar Lake beside the road to Amer, its lower floors submerged so it seems to float on the water. The interior is closed to visitors, so this is a view-and-photo stop from the lakeside promenade, which is free and open at all hours. Early-morning light is best, and it's an easy pause on the way to Amber Fort.",
    },
    "jantar-mantar-jaipur": {
      address: "Gangori Bazaar, Pink City, Jaipur, Rajasthan 302002, India",
      mapsQuery: "Jantar Mantar, Jaipur",
      description: "An 18th-century astronomical observatory built by Maharaja Sawai Jai Singh II and a UNESCO World Heritage Site, with around 20 giant masonry instruments for measuring time and tracking the stars. The Vrihat Samrat Yantra is the world's largest stone sundial, accurate to about two seconds. A local guide or audio guide helps make sense of it all.",
    },
    "nahargarh-fort-jaipur": {
      address: "Krishna Nagar, Brahampuri, Jaipur, Rajasthan 302002, India",
      mapsQuery: "Nahargarh Fort, Jaipur",
      description: "A fort on the ridge of the Aravalli hills above the Pink City, built in 1734, with sweeping views across Jaipur — especially at sunset. Inside, Madhavendra Bhawan has a suite of apartments built for the king's queens. Stay on for the view over dinner or a drink at Padao, the open-air café on the ramparts run by Rajasthan's tourism corporation.",
    },
    "jaipur-block-printing-workshop": {
      address: "Sanganer, Jaipur, Rajasthan 302029, India",
      mapsQuery: "Sanganer, Jaipur",
      description: "A town on Jaipur's southern edge famous for hand-block printing and handmade paper. Artisans carve wooden blocks and print cotton by hand in small workshops, and many offer short sessions where you can print your own scarf or napkin. The Anokhi Museum of Hand Printing in Amer is a good place to learn the history before you go.",
    },
    "amer-sound-light-show-jaipur": {
      address: "Kesar Kyari, Maota Lake, Amer, Jaipur, Rajasthan 302001, India",
      mapsQuery: "Amber Fort Light and Sound Show, Kesar Kyari",
      description: "A 52-minute sound-and-light show held every evening at Kesar Kyari garden on Maota Lake, at the foot of Amber Fort, with the fort lit up behind. The English show starts between about 6:30 and 7:30pm depending on the season, followed by a Hindi show. It's narrated history rather than a party — bring a jacket in winter.",
    },
  },
  udaipur: {
    "jagat-niwas-udaipur": {
      address: "23–25 Lal Ghat, Udaipur, Rajasthan 313001, India",
      website: "https://jagatcollection.com/jagat-niwas-palace/",
      description: "A whitewashed 17th-century haveli on the shore of Lake Pichola at Lal Ghat, now a heritage hotel. Many rooms look over the water, and its rooftop restaurant, with open-air alcoves, faces the lake and the City Palace — worth a visit for dinner even if you're staying elsewhere. An atmospheric mid-range choice in the old city.",
    },
    "taj-lake-palace-udaipur": {
      address: "Lake Pichola, Udaipur, Rajasthan 313001, India",
      website: "https://www.tajhotels.com/en-in/hotels/taj-lake-palace-udaipur",
      description: "A white-marble palace built in the 1740s on an island in Lake Pichola as a royal summer retreat, now a Taj luxury hotel reached only by boat and famous from the 1983 Bond film 'Octopussy'. Access is for guests and diners with reservations, so book a meal if you want to see it without staying. For most people, the view from the ghats is the draw.",
    },
    "zostel-udaipur": {
      address: "Imli Ghat, Purohit Ji Ka Khurra, Chandpole, Udaipur, Rajasthan 313001, India",
      website: "https://www.zostel.com/destination/udaipur/stay/udaipur-udph705",
      description: "A branch of Zostel, India's biggest backpacker hostel chain, by the ghats of Lake Pichola in the Chandpole area of the old city. Dorms, private rooms and a sociable common area make it easy to meet other travellers, and the lake, the City Palace and the old-town cafés are all within walking distance. A practical budget base.",
    },
    "cafe-edelweiss-udaipur": {
      address: "73 Gangaur Ghat Road, Udaipur, Rajasthan 313001, India",
      website: "https://cafeedelweissudaipur.com/",
      description: "A small German-style bakery café near Gangaur Ghat, open since 1999 and said to be Udaipur's oldest coffee shop — it was the first in town with an Italian espresso machine. Bread, croissants, cinnamon rolls and apple strudel are baked on the premises every day. Handy for a proper coffee and breakfast before exploring the old city.",
    },
    "jheel-cafe-udaipur": {
      name: "Jheel's Ginger Coffee Bar & Bakery",
      address: "Hotel Jheel, 52–56 Gangaur Ghat Marg, Udaipur, Rajasthan 313001, India",
      description: "A café in Hotel Jheel right beside Gangaur Ghat, with views over Lake Pichola. Open since 2011, it's known for ginger drinks — ginger coffee, tea and ale — as well as cakes, wood-fired pizzas and all-day breakfasts. Several floors of seating, including a rooftop, make it a relaxed place to linger, though service slows when it's busy.",
    },
    "ambrai-restaurant-udaipur": {
      address: "Amet Haveli, Hanuman Ghat, Chandpole, Udaipur, Rajasthan 313001, India",
      website: "https://www.ambrairestaurant.com/",
      description: "A lakeside restaurant at Amet Haveli on Hanuman Ghat, open since 1998, with one of Udaipur's best views: across Lake Pichola to the City Palace, the Lake Palace and Jag Mandir. Tables sit under old trees by the water, lit by lanterns at night. It serves Indian and continental dishes and is popular, so book a lakeside table for sunset.",
    },
    "millets-of-mewar-udaipur": {
      address: "16 Bhim Parmeshwar Marg, Hanuman Ghat, outside Chandpole, Udaipur, Rajasthan 313001, India",
      website: "https://milletsofmewar.co.in/",
      description: "A pure-vegetarian restaurant near Hanuman Ghat built around local millets and wholesome cooking, with plenty of vegan options. The menu mixes millet thalis and Mewari dishes with salads, smoothies and bowls — a welcome change from heavy curries. The relaxed, unhurried atmosphere suits solo diners, and it's a short walk from the lake.",
    },
    "ambrai-ghat-udaipur": {
      address: "Hanuman Ghat, Chandpole, Udaipur, Rajasthan 313001, India",
      mapsQuery: "Ambrai Ghat, Udaipur",
      description: "The waterfront steps on the western shore of Lake Pichola, also known as Hanuman Ghat, with Udaipur's classic postcard view across the lake to the City Palace. Come at sunrise, when locals bathe and wash clothes, or after dark, when the palace is lit and its reflection shimmers on the water. It's free and open at all hours.",
    },
    "badi-lake-udaipur": {
      address: "Badi, Udaipur, Rajasthan 313011, India",
      mapsQuery: "Badi Lake, Udaipur",
      description: "A reservoir about 12km north-west of Udaipur, built by Maharana Raj Singh I in the 17th century and ringed by the Aravalli hills. There are small pavilions along the dam and hilltop viewpoints, and it's far quieter than the city lakes. Go for sunset by auto-rickshaw or taxi, and arrange your ride back before you set off.",
    },
    "fateh-sagar-lake-udaipur": {
      address: "Fateh Sagar Lake, Udaipur, Rajasthan 313001, India",
      mapsQuery: "Fateh Sagar Lake, Udaipur",
      description: "Udaipur's second big lake, north of Pichola, named after Maharana Fateh Singh and surrounded by hills. The lakeside promenade is where locals gather in the evening for snacks, roasted corn and the breeze, and boats run to Nehru Park on an island. Less touristy than the old city, and a relaxed place to walk alone at dusk.",
    },
    "lake-pichola-udaipur": {
      address: "Lake Pichola, Udaipur, Rajasthan 313001, India",
      mapsQuery: "Lake Pichola, Udaipur",
      description: "The artificial lake at the heart of Udaipur, first created in 1362 and later enlarged by Maharana Udai Singh II, founder of the city. Its island palaces — the Lake Palace and Jag Mandir — and the ghats and havelis along its shores make a sunset boat ride the city's defining experience. Boats leave from the City Palace jetty and elsewhere.",
    },
    "saheliyon-ki-bari-udaipur": {
      address: "Saheli Marg, Panchwati, Udaipur, Rajasthan 313001, India",
      mapsQuery: "Saheliyon Ki Bari, Udaipur",
      description: "A garden built in the 18th century by Maharana Sangram Singh II for the royal ladies-in-waiting, with fountains, lotus pools, marble elephants and shady lawns just south of Fateh Sagar. The fountains are fed by the lake. It's small but peaceful, and pairs well with an evening walk along Fateh Sagar's promenade.",
    },
    "bagore-ki-haveli-udaipur": {
      address: "Gangaur Ghat Road, Udaipur, Rajasthan 313001, India",
      mapsQuery: "Bagore Ki Haveli, Udaipur",
      description: "An 18th-century haveli on Gangaur Ghat built by a prime minister of Mewar, now a museum of restored rooms, costumes and puppets. Its nightly Dharohar folk-dance show, around 7pm in the courtyard, features Rajasthani dances including the pot-balancing bhavai. Arrive early for a good seat; tickets are sold at the door.",
    },
    "city-palace-udaipur": {
      address: "City Palace Complex, Udaipur, Rajasthan 313001, India",
      website: "https://citypalacemuseum.org/",
      description: "A huge palace complex rising above the east bank of Lake Pichola, built over nearly 400 years by the Maharanas of Mewar. The City Palace Museum winds through courtyards, balconies, peacock mosaics and mirror-work rooms, with wonderful lake views from the upper floors. Allow at least two hours; part of the complex is still the royal family's home.",
    },
    "jagdish-temple-udaipur": {
      address: "Jagdish Chowk, City Palace Road, Udaipur, Rajasthan 313001, India",
      mapsQuery: "Jagdish Temple, Udaipur",
      description: "A large Vishnu temple in the old city, built in 1651 by Maharana Jagat Singh I. A steep flight of steps flanked by stone elephants leads up to the main shrine, and the walls are covered in carvings of dancers, musicians and animals. It's an active temple, busiest at the morning and evening aarti — dress modestly and remove your shoes.",
    },
    "jag-mandir-udaipur": {
      address: "Jag Mandir Island, Lake Pichola, Udaipur, Rajasthan 313001, India",
      mapsQuery: "Jag Mandir, Udaipur",
      description: "A 17th-century palace on an island at the southern end of Lake Pichola, begun by Maharana Karan Singh II and completed by Jagat Singh I. Its courtyards, marble pavilions and gardens are reached by boat — boat trips from the City Palace jetty stop here — and its café is a lovely spot for a drink while looking back across the water at the city.",
    },
    "monsoon-palace-udaipur": {
      address: "Sajjangarh, Udaipur, Rajasthan 313001, India",
      mapsQuery: "Monsoon Palace Sajjangarh, Udaipur",
      description: "A hilltop palace built in 1884 by Maharana Sajjan Singh, originally planned as an observatory to watch the monsoon clouds. It stands inside the Sajjangarh Wildlife Sanctuary, about 5km west of the city, and has the best sunset view over Udaipur's lakes and hills. There are separate fees for the sanctuary and the palace, with a road up to the top.",
    },
    "shilpgram-udaipur": {
      address: "Shilpgram, Hawala, Udaipur, Rajasthan 313011, India",
      mapsQuery: "Shilpgram, Udaipur",
      description: "A rural arts and crafts village about 3km west of Fateh Sagar, set up to showcase the crafts, architecture and performing arts of western India, with traditional huts from Rajasthan, Gujarat, Goa and Maharashtra. Artisans and folk performers are often on site, and it hosts the big Shilpgram Utsav craft fair every December.",
    },
    "vintage-car-museum-udaipur": {
      address: "Garden Hotel, Lake Palace Road, Udaipur, Rajasthan 313001, India",
      mapsQuery: "Vintage and Classic Car Museum, Udaipur",
      description: "The Maharanas of Mewar's collection of classic cars, displayed in the old royal garage at the Garden Hotel and including Rolls-Royces, a Cadillac and a Mercedes. It's small and can be seen in under an hour, but it's a fun contrast to the palaces and temples, and it sits right by Gulab Bagh, Udaipur's largest garden, for a walk afterwards.",
    },
  },
};

(async () => {
  console.log(APPLY ? "APPLYING to database…" : "DRY RUN (no changes). Re-run with --apply to write.");
  for (const [citySlug, SPOTS] of Object.entries(CITIES)) {
    const city = await prisma.city.findUnique({ where: { slug: citySlug }, select: { id: true } });
    if (!city) throw new Error(`city ${citySlug} not found`);
    const slugs = Object.keys(SPOTS);
    const existing = await prisma.spot.findMany({ where: { cityId: city.id, slug: { in: slugs } }, select: { id: true, slug: true, name: true } });
    const bySlug = Object.fromEntries(existing.map((s) => [s.slug, s]));
    console.log(`\n=== ${citySlug}`);
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
    console.log(`${citySlug}: ${existing.length}/${slugs.length} ${APPLY ? "updated" : "would be updated"}.`);
  }
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
