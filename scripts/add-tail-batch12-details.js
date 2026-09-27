// Small-city tail, batch 12: Kasane, Sossusvlei, Arusha, Dar es Salaam, Essaouira, Thiès, Zanzibar, Tamale.
// Researched 2026-09-27.
//
// DELETED: "Firefly Hostel" Dar es Salaam (Firefly is a boutique lodge in Bagamoyo, ~60km north — no hostel of
//   that name in Dar); Restaurant Le Cèdre, Thiès (no trace of a restaurant by that name in Thiès).
// CORRECTED: "Sesriem Restplace Café" (no such name) → the Sossus Oasis shop and café, 300m from the Sesriem gate
//   (sossus-oasis.com); Thebe River Safaris is at Plot 706 President Avenue, ~10 minutes from Sedudu Gate;
//   Arusha Backpackers Hotel is on Sokoine Road with a rooftop terrace; Africafé is on Boma Road; Mamboz is at
//   Morogoro Road & Libya Street, evenings only, closed Tuesdays; "Hostel Essaouira" → Essaouira Hostel (HI,
//   riad-style, in the medina); Triskala serves only local food, no alcohol, menu changes daily; Lost & Found is
//   opposite the Shangani Post Office; Sparkles is inside the Centre for National Culture; Catholic Guesthouse is
//   the Catholic Archdiocesan Guest House (mixed reviews, described honestly); MSAD opening hours from Petit Futé.
//
//   node scripts/add-tail-batch12-details.js [--apply]
const run = require("./_enrich-runner");

run({
  kasane: {
    spots: {
      "thebe-river-camp-kasane": {
        name: "Thebe River Safaris",
        address: "Plot 706 President Avenue, Kasane, Botswana",
        website: "https://theberiversafaris.com/",
        description: "A riverside lodge and campsite in Kasane, close to the Chobe River and about 10 minutes' drive from the Sedudu Gate of Chobe National Park, with chalets, camping, a pool, a restaurant and bar. It runs its own game drives, boat cruises and mobile safaris, making it a practical, sociable base for budget travellers and self-drivers.",
      },
      "old-house-kasane": {
        name: "The Old House",
        address: "Chobe riverfront, Kasane, Botswana",
        mapsQuery: "The Old House, Kasane",
        website: "https://www.oldhousekasane.com/",
        description: "A small family-run guest lodge and restaurant overlooking the Chobe River in Kasane, said to be one of the oldest places to eat in town. The garden restaurant and bar serves breakfast, lunch and dinner — well known for its pizzas, burgers and fish and chips — with daily specials. A relaxed place to eat alone between safari trips.",
      },
      "chobe-riverfront-kasane": {
        address: "Chobe National Park (Sedudu Gate), Kasane, Botswana",
        mapsQuery: "Chobe Riverfront, Chobe National Park",
        description: "The northern riverfront section of Chobe National Park, entered through the Sedudu Gate just outside Kasane, famous for some of Africa's largest elephant herds, which come down to drink in the dry season (roughly May to October). Explore on a morning or afternoon game drive, or on a sunset boat cruise from Kasane for close views of elephants, hippos and birds.",
      },
    },
  },
  sossusvlei: {
    spots: {
      "sesriem-campsite": {
        name: "Sesriem Camp (NWR)",
        address: "Sesriem Gate, Namib-Naukluft National Park, Namibia",
        website: "https://www.nwrnamibia.com/",
        mapsQuery: "Sesriem Camp, Namibia",
        description: "The campsite run by Namibia Wildlife Resorts just inside the Sesriem gate of the Namib-Naukluft National Park. Its big advantage is location: guests inside the park can drive towards Sossusvlei before the main gate opens, reaching the dunes for sunrise. Sites have shade trees, water and ablutions; book ahead in the busy season.",
      },
      "sesriem-restplace-cafe": {
        name: "Sossus Oasis Shop & Café",
        address: "Sesriem, near the Namib-Naukluft park gate, Namibia",
        website: "https://www.sossus-oasis.com/",
        mapsQuery: "Sossus Oasis, Sesriem",
        description: "The service station, shop and café about 300m from the Sesriem park entrance — the main place to refuel, stock up and grab a snack before heading into the dunes. Fresh bread, pies, salads and take-away food arrive daily, alongside groceries, drinks and firewood. It also has fuel, a tyre workshop and a campsite next door.",
      },
      "dune-45-deadvlei": {
        address: "Sossusvlei, Namib-Naukluft National Park, Namibia",
        mapsQuery: "Deadvlei, Namibia",
        description: "Dune 45, about 45km from the Sesriem gate, is the easiest of the towering red dunes to climb for sunrise. Further on, Deadvlei is a white clay pan scattered with ancient, dead camel-thorn trees against red dunes — one of Africa's most photographed landscapes. The last 5km need a 4x4 or park shuttle. Start early and carry plenty of water.",
      },
    },
  },
  arusha: {
    spots: {
      "arusha-backpackers": {
        name: "Arusha Backpackers Hotel",
        address: "Sokoine Road, Levolosi, Arusha, Tanzania",
        mapsQuery: "Arusha Backpackers Hotel, Sokoine Road",
        description: "A long-running budget hotel and hostel on Sokoine Road, within walking distance of the clock tower and the Maasai market, with dorm beds and simple private rooms, a free breakfast and a rooftop terrace with views towards Mount Meru. It's a practical, affordable base for arranging safaris and Kilimanjaro climbs.",
      },
      "africafe-arusha": {
        name: "Africafé Coffee House",
        address: "Boma Road, Arusha, Tanzania",
        mapsQuery: "Africafe Coffee House, Boma Road, Arusha",
        description: "A popular café on Boma Road in central Arusha, open daily from early morning into the evening, serving Tanzanian coffee, teas, breakfasts, light meals and cakes and pastries from its own bakery. Good Wi-Fi and clean facilities make it a comfortable place to work, plan a safari or wait between appointments.",
      },
      "arusha-central-market": {
        address: "Central Market, Arusha, Tanzania",
        mapsQuery: "Arusha Central Market",
        description: "Arusha's busy central market, a warren of stalls selling fruit, vegetables, spices, dried fish, fabrics, household goods and kanga cloth. It's a vivid look at everyday life in northern Tanzania and a good place to buy spices. Go in the morning, keep valuables close, and consider a local guide if you'd like help navigating.",
      },
    },
  },
  "dar-es-salaam": {
    delete: ["firefly-hostel-dar"],
    spots: {
      "mamboz-corner-bbq": {
        address: "Corner of Morogoro Road and Libya Street, Kisutu, Dar es Salaam, Tanzania",
        description: "A family-run street barbecue on a city-centre corner, where chicken and seafood are grilled on the side of the road and served at plastic tables outdoors. It's famous for its spicy chicken, mishkaki skewers and masala chips. Evenings only, closed Tuesdays, and very busy at weekends — a lively, affordable Dar institution.",
      },
      "kivukoni-fish-market": {
        address: "Kivukoni, near the Kigamboni ferry, Dar es Salaam, Tanzania",
        mapsQuery: "Kivukoni Fish Market, Dar es Salaam",
        description: "Dar es Salaam's main fish market on the harbour front at Kivukoni, where early-morning auctions sell the night's catch — tuna, snapper, octopus, prawns and more — and cooks at the back fry fish to order. It's hectic, noisy and smelly, but fascinating. Go early, dress modestly, and keep valuables close.",
      },
    },
  },
  essaouira: {
    spots: {
      "hostel-essaouira": {
        name: "Essaouira Hostel",
        address: "Medina, Essaouira, Morocco",
        website: "https://hihostels.com/hostels/essaouira-hostel/",
        mapsQuery: "Essaouira Hostel, Medina",
        description: "A riad-style hostel in the heart of Essaouira's medina, affiliated with Hostelling International, with dorms and private rooms around a traditional courtyard, a guest kitchen, free laundry, and a roof terrace with loungers. The beach, the port and the ramparts are all within a few minutes' walk.",
      },
      "la-triskala-cafe-essaouira": {
        name: "Triskala Café",
        address: "Medina, Essaouira, Morocco",
        mapsQuery: "Triskala Café, Essaouira",
        description: "A small, friendly café-restaurant tucked into the medina near the ramparts, cooking only with local produce, with a menu that changes daily — often including vegetarian dishes — plus fresh seasonal juices and herbal teas. There's no alcohol and no soft drinks. A calm, creative place for a solo lunch.",
      },
      "skala-de-la-ville-essaouira": {
        address: "Skala de la Ville, Medina, Essaouira, Morocco",
        mapsQuery: "Skala de la Ville, Essaouira",
        description: "The 18th-century sea bastion along Essaouira's medina walls, lined with old bronze cannons facing the Atlantic surf. It offers wide views of the coast and the fortified town, especially at sunset. Beneath it, woodworkers' workshops sell thuya-wood crafts. It's part of the UNESCO-listed medina.",
      },
    },
  },
  thies: {
    delete: ["le-cedre-thies"],
    spots: {
      "hotel-lat-dior-thies": {
        address: "Mbour 3 Extension, facing Stade Lat-Dior, Thiès, Senegal",
        mapsQuery: "Hôtel Résidence Lat Dior, Thiès",
        description: "A mid-range hotel facing the Lat-Dior stadium on the road towards Saly, with around 37 air-conditioned rooms, an outdoor pool, a fitness room and a large restaurant. It's one of the more comfortable options in Thiès and a convenient stop between Dakar and the coast; reviews are average, so manage expectations.",
      },
      "tapestry-workshop-thies": {
        address: "Thiès, Senegal",
        mapsQuery: "Manufactures Sénégalaises des Arts Décoratifs, Thiès",
        description: "The national tapestry workshop founded in 1966 by President Léopold Sédar Senghor, where weavers turn paintings by Senegalese artists into large wall tapestries — each design woven no more than eight times. Visitors can watch the looms and see the showroom. Open weekdays, with a small admission fee; Saturday visits by appointment.",
      },
    },
  },
  zanzibar: {
    spots: {
      "lost-and-found-zanzibar": {
        address: "Opposite Shangani Post Office, Stone Town, Zanzibar, Tanzania",
        mapsQuery: "Lost & Found Hostel, Stone Town",
        description: "A modern hostel in the centre of Stone Town, opposite the Shangani Post Office and close to Forodhani Gardens and the ferry terminal, with air-conditioned dorms, a balcony overlooking the street, a small library and a foosball table. It's a clean, social base for exploring the old town before heading to the beaches.",
      },
      "lukmaan-restaurant-zanzibar": {
        address: "Stone Town, Zanzibar, Tanzania",
        mapsQuery: "Lukmaan Restaurant, Stone Town",
        description: "A long-standing, no-frills local restaurant in Stone Town, popular with Zanzibaris and travellers alike, where you choose from trays of the day's dishes — biryani, pilau, curries, grilled fish, chapati and fresh juices. It's cheap, filling and one of the best places to try everyday Swahili food. Busy at lunchtime.",
      },
      "nungwi-beach-zanzibar": {
        address: "Nungwi, northern Zanzibar, Tanzania",
        mapsQuery: "Nungwi Beach, Zanzibar",
        description: "A beach at the northern tip of Zanzibar, where the tide is less extreme than on the east coast, so you can swim most of the day. The village is known for its dhow-building yards and sunset cruises, and there's a lively strip of bars and restaurants. Dress modestly away from the beach, as Zanzibar is conservative.",
      },
    },
  },
  tamale: {
    spots: {
      "catholic-guesthouse-tamale": {
        name: "Catholic Archdiocesan Guest House",
        address: "Tamale, Northern Region, Ghana",
        mapsQuery: "Catholic Archdiocesan Guest House, Tamale",
        description: "A simple guesthouse run by the Catholic archdiocese, about 20 minutes' walk from the centre of Tamale, with fan and air-conditioned rooms at low prices. Some travellers praise its quiet grounds and value, while others report tired maintenance, so check recent reviews. A practical budget base for Mole National Park trips.",
      },
      "sparkles-restaurant-tamale": {
        address: "Centre for National Culture, Tamale, Ghana",
        mapsQuery: "Sparkles Restaurant, Centre for National Culture, Tamale",
        description: "A restaurant inside Tamale's Centre for National Culture, serving a mix of Ghanaian favourites such as banku and tilapia alongside pizza, pasta and rice dishes, with local beer. There's a pleasant outdoor lounge area with music. Afterwards, browse the craft stalls at the cultural centre for northern Ghanaian smocks and baskets.",
      },
      "tamale-central-market": {
        address: "Central Market, Tamale, Northern Region, Ghana",
        mapsQuery: "Tamale Central Market",
        description: "The main market of northern Ghana's largest city, a busy maze of stalls selling shea butter, spices, grains, fabric, leatherwork, baskets and the handwoven smocks of the north. It gives a real feel for Tamale's trade with the Sahel. Go in the morning, when it's cooler, and bargain politely.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
