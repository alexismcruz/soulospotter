// Small-city tail, batch 13: Toubab Dialaw, Harar, Dahab, Kampala, Lalibela, Fes, Vilanculos, Francistown.
// Researched 2026-09-27.
//
// DELETED: "Chez Manou", Toubab Dialaw (no trace; the village's listed restaurants are Chez Lamp Fall, K'meleon,
//   La Colline Bleue etc.).
// CORRECTED: Sobo Badé was founded in 1970 by Haitian-born architect-writer Gérard Chenet (d. 2022), built of
//   volcanic rock, shells and mosaic; Rowda Waber is a Harari family house near Feres Megala (shared bathrooms,
//   9pm curfew reported); Hirut is near the Selassie church and serves Ethiopian and Western dishes; Penguin Divers
//   Club (PADI) has a hotel and dorms; Ralph's German Bakery is on Mashraba (at Dyarna Dahab) and Assalah Square;
//   Endiro Coffee is at Plot 23B Cooper Road, Kisementi; Fat Cat is in Kololo near Kisementi; Ben Abeba was built by
//   Glaswegian ex-teacher Susan Aitchison and Habtamu Baye; Café Clock is at 7 Derb el Magana, Talaa Kebira;
//   Riad Verus is near Batha, run by a Fassi family (Hostelworld 2025 Best Hostel in Africa); Zombie Cucumber is run
//   by a Belgian couple, 50m from the beach; "Thapama Restaurant" → the Ivory Grill at Cresta Thapama;
//   Cresta Marang Gardens is on the Tati River with chalets, rondavels and camping.
//
//   node scripts/add-tail-batch13-details.js [--apply]
const run = require("./_enrich-runner");

run({
  "toubab-dialaw": {
    delete: ["chez-manou-toubab-dialaw"],
    spots: {
      "sobo-bade-toubab-dialaw": {
        name: "Espace Sobo Badé",
        address: "Toubab Dialaw, Thiès Region, Senegal",
        mapsQuery: "Sobo Badé, Toubab Dialaw",
        description: "A cultural centre, artists' community and guesthouse founded in 1970 by the Haitian-born architect and writer Gérard Chenet, who designed its fantastical buildings of volcanic rock, shells, bamboo and mosaic on the cliffs above the sea. It hosts dance, drumming and art workshops. A unique, creative place to stay about 55km south of Dakar.",
      },
      "toubab-dialaw-beach": {
        address: "Toubab Dialaw, Thiès Region, Senegal",
        mapsQuery: "Toubab Dialaw beach",
        description: "The sandy beach of Toubab Dialaw, a fishing village about 55km south of Dakar known for its artists and cultural centres. Colourful pirogues are pulled up on the sand beneath red cliffs, and the village is a relaxed escape from the capital, with drumming and dance workshops. Watch for strong currents when swimming.",
      },
    },
  },
  harar: {
    spots: {
      "harar-jugol": {
        address: "Jugol, Harar, Harari Region, Ethiopia",
        website: "https://whc.unesco.org/en/list/1189/",
        mapsQuery: "Harar Jugol",
        description: "The UNESCO-listed walled old town of Harar, often called Islam's fourth-holiest city, a maze of narrow lanes with over 80 mosques, colourful Harari houses and busy markets. At dusk, just outside the walls, the 'hyena men' feed wild hyenas by hand, and visitors can join in. Hire a local guide to navigate the alleys.",
      },
      "hirut-restaurant-harar": {
        name: "Hirut Restaurant",
        address: "Near Medhane Alem Selassie church, Harar, Ethiopia",
        mapsQuery: "Hirut Restaurant, Harar",
        description: "A well-reviewed restaurant in Harar with an English menu, decorated with Ethiopian art and serving both traditional dishes — tibs, shiro, injera and Harari coffee — and Western rice and pasta dishes at fair prices. It's near the Selassie church and the bus station, and a welcoming, easy place to eat alone.",
      },
      "rowda-waber-guesthouse-harar": {
        name: "Rowda Waber Harari Cultural Guest House",
        address: "Jugol old city, near Feres Megala, Harar, Ethiopia",
        mapsQuery: "Rowda Waber Harari Cultural Guest House, Harar",
        description: "A guesthouse in a traditional Harari family home inside the walled city, with whitewashed walls hung with woven baskets and a courtyard with a pomegranate tree, a short walk from Feres Megala square. It's an immersive stay, but bathrooms are shared and there's a reported 9pm curfew — ideal for culture, less for comfort.",
      },
    },
  },
  dahab: {
    spots: {
      "penguin-divers-dahab": {
        name: "Penguin Divers Club",
        address: "Dahab, South Sinai, Egypt",
        website: "https://www.penguindiversclub.com/",
        mapsQuery: "Penguin Divers Club, Dahab",
        description: "A long-running PADI dive centre in Dahab with its own seafront hotel and air-conditioned dorm, making it an affordable, sociable base for learning to dive or free-dive in the Red Sea. It has a restaurant and a classroom and organises trips to the Blue Hole, the Canyon and other famous reef sites along the coast.",
      },
      "ralphs-bakery-dahab": {
        address: "Mashraba (at Dyarna Dahab Hotel) and Assalah Square, Dahab, South Sinai, Egypt",
        website: "http://www.ralphsgermanbakery.com/",
        mapsQuery: "Ralph's German Bakery, Dahab",
        description: "A popular bakery-café founded by chef Ralph Stocker, with two branches in Dahab, serving sourdough bread, croissants, cakes, good coffee and full breakfasts from early morning. It's a favourite with divers, travellers and long-stay expats, and a comfortable place to linger over breakfast before a day on the reef.",
      },
      "the-blue-hole-dahab": {
        address: "Blue Hole, north of Dahab, South Sinai, Egypt",
        mapsQuery: "Blue Hole, Dahab",
        description: "A deep marine sinkhole in the reef about 8km north of Dahab, surrounded by vivid coral and fish — superb for snorkelling around the rim. It is also notorious: the 'Arch' at around 55m has claimed many divers' lives, so stay within your training limits and dive only with a reputable centre. Cafés line the shore.",
      },
    },
  },
  kampala: {
    spots: {
      "endiro-coffee-kampala": {
        address: "Plot 23B Cooper Road, Kisementi, Kampala, Uganda",
        mapsQuery: "Endiro Coffee, Kisementi, Kampala",
        description: "A Ugandan café brand whose Kisementi branch has a leafy garden terrace, serving locally sourced coffee, big breakfasts, light meals and fresh juices. It's calm and has good Wi-Fi, making it a popular place to work or meet people, and it's a short walk from the hostels, restaurants and Acacia Mall in Kololo.",
      },
      "fat-cat-backpackers-kampala": {
        address: "Kololo, near Kisementi, Kampala, Uganda",
        mapsQuery: "Fat Cat Backpackers, Kampala",
        description: "A highly rated backpackers in the leafy Kololo neighbourhood, near Kisementi and a two-minute walk from Acacia Mall with its supermarkets, cafés and ATMs. It has dorms of four to eight beds and a few private rooms, hot showers, good Wi-Fi and mosquito nets. A friendly base for arranging gorilla treks and trips to Jinja.",
      },
      "kasubi-tombs-kampala": {
        address: "Kasubi Hill, Kampala, Uganda",
        website: "https://whc.unesco.org/en/list/1022/",
        mapsQuery: "Kasubi Tombs, Kampala",
        description: "The UNESCO-listed burial ground of four Kabakas (kings) of Buganda, centred on the Muzibu Azaala Mpanga, a huge thatched building of wood, reeds and bark cloth. It burned in 2010 and has since been rebuilt with traditional methods. It remains an active spiritual site, so dress respectfully and follow the guide.",
      },
    },
  },
  lalibela: {
    spots: {
      "ben-abeba-lalibela": {
        address: "Lalibela, Amhara, Ethiopia",
        website: "http://benabeba.com/lalibela/Home.html",
        mapsQuery: "Ben Abeba, Lalibela",
        description: "A striking restaurant of swirling, spaceship-like terraces on a ridge above Lalibela, built by Scottish former teacher Susan Aitchison and her Ethiopian partner Habtamu Baye. The name blends Scots 'ben' (mountain) and Amharic 'abeba' (flower). It serves Ethiopian and Western dishes with vast views, especially at sunset.",
      },
      "rock-hewn-churches-lalibela": {
        address: "Lalibela, Amhara, Ethiopia",
        website: "https://whc.unesco.org/en/list/18/",
        mapsQuery: "Rock-Hewn Churches of Lalibela",
        description: "Eleven medieval churches carved out of solid rock, a UNESCO World Heritage Site and still an active place of Orthodox worship, linked by trenches and tunnels. The cross-shaped Bet Giyorgis, cut down into the ground, is the most famous. Hire an official guide, take off shoes inside, and check the regional security situation first.",
      },
      "sora-lodge-lalibela": {
        address: "Lalibela, Amhara, Ethiopia",
        website: "https://soralodgelalibela.com/",
        description: "A hilltop lodge built in traditional style with stone walls and thatched roofs, looking over the valley and mountains around Lalibela. Its tukul-shaped restaurant serves Ethiopian and international dishes, breakfast is included, and it offers injera-making cooking classes. A comfortable base for visiting the rock churches.",
      },
    },
  },
  fes: {
    spots: {
      "cafe-clock-fes": {
        address: "7 Derb el Magana, Talaa Kebira, Fes el Bali, Fes, Morocco",
        website: "https://www.cafeclock.com/",
        description: "A cultural café in a four-level riad off Talaa Kebira in the Fes medina, with a rooftop terrace. It's famous for its camel burger, and hosts live music, storytelling, film nights, cooking classes and calligraphy workshops. A relaxed place to eat alone and meet travellers and locals in the heart of the old city.",
      },
      "chouara-tannery-fes": {
        address: "Chouara Tannery, Fes el Bali, Fes, Morocco",
        mapsQuery: "Chouara Tannery, Fes",
        description: "The largest of Fes's medieval tanneries, where hides are still soaked and dyed by hand in a honeycomb of stone vats, much as they have been for centuries. You view it from the terraces of the surrounding leather shops (a sprig of mint helps with the smell). Go in the morning for the best colours, and expect sales pitches.",
      },
      "riad-verus-fes": {
        address: "Batha, Fes el Bali, Fes, Morocco",
        mapsQuery: "Riad Verus, Fes",
        description: "A small, social riad-hostel run by a Fassi family on the edge of the medina near Batha, with air-conditioned dorms and private rooms, free breakfast, an evening social and roof terraces overlooking the Marinid Tombs. It won Best Hostel in Africa in Hostelworld's 2025 awards and arranges cooking classes and walking tours.",
      },
    },
  },
  vilanculos: {
    spots: {
      "casa-rex-vilanculos": {
        address: "Vilanculos, Inhambane, Mozambique",
        mapsQuery: "Casa Rex, Vilanculos",
        description: "A restaurant above the bay in Vilanculos that travellers often rate among the best places to eat in town, with fresh seafood and sundowner views over the dhows towards the Bazaruto islands. It is pricier than the beach shacks and a little out of the way, so arrange a taxi — a treat for a special dinner.",
      },
      "vilanculos-beach": {
        address: "Vilanculos, Inhambane, Mozambique",
        mapsQuery: "Vilanculos Beach",
        description: "The long Indian Ocean beach of Vilanculos, lined with dhows and wide tidal flats that stretch far out at low tide. It's the gateway to the Bazaruto Archipelago National Park, whose dunes, reefs and turquoise water are reached by dhow or motorboat day trips, with good snorkelling and a chance of dugongs.",
      },
      "zombie-cucumber-vilanculos": {
        address: "Vilanculos, Inhambane, Mozambique",
        mapsQuery: "Zombie Cucumber, Vilanculos",
        description: "A quirky backpackers run by a Belgian couple, about 50m from the beach in a garden full of sculptures and artwork, with an open-sided circular dorm, chalets and a newer hotel block. Its stone-oven pizzas are famous, and it's a relaxed, sociable base for booking dhow trips to the Bazaruto islands.",
      },
    },
  },
  francistown: {
    spots: {
      "cresta-marang-francistown": {
        address: "Tati River, Francistown, Botswana",
        website: "https://www.crestahotels.com/hotels/botswana/cresta-marang-gardens",
        description: "A hotel set in large gardens on the banks of the Tati River, about 10 minutes' drive from central Francistown, with hotel rooms, river chalets, thatched rondavels and a campsite, plus a pool, restaurant and bar. It's a green, peaceful overnight stop for self-drivers heading to Nata, Kasane or Zimbabwe.",
      },
      "supa-ngwao-museum": {
        address: "Francistown, Botswana",
        mapsQuery: "Supa-Ngwao Museum, Francistown",
        description: "A small community museum in Francistown, the town that grew from southern Africa's first gold rush. Exhibits cover the history and cultures of northeast Botswana — the Kalanga people, the gold rush and colonial times — and there's a craft shop. A quiet stop between long drives.",
      },
      "thapama-restaurant-francistown": {
        name: "Ivory Grill at Cresta Thapama",
        address: "Cresta Thapama Hotel, Francistown, Botswana",
        website: "https://www.crestahotels.com/hotels/botswana/cresta-thapama/dining",
        mapsQuery: "Cresta Thapama Hotel, Francistown",
        description: "The restaurant of the Cresta Thapama, a central hotel in Francistown, serving buffets and à la carte lunches and dinners, with drinks at the Lenaka Bar. It's a dependable, comfortable place to eat alone in Botswana's second city, and the hotel's pool and gardens make it an easy stop when passing through.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
