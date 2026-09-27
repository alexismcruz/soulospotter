// Small-city tail, batch 15: Pemba, Stone Town, Butare (Huye), Kidepo Valley, Kumasi, Nyungwe, Saint-Louis, Volta.
// Researched 2026-09-27.
//
// DELETED: "Pemba Magic Lodge Restaurant" (duplicate of Russell's Place — same business); "Kidepo Community
//   Eatery" (no trace).
// CORRECTED: Russell's Place / Pemba Magic Lodge is on Avenida Marginal in Nanhimbe, ~4km from Wimbe Beach (open
//   since 1998, Blackfoot Bar); Pemba is in Cabo Delgado — advisory note added; Emerson Spice (11 rooms, rooftop Tea
//   House, one dinner sitting, booking required); Hotel Credo has the town's only pool, Inzozi Nziza is opposite it on
//   University Road; Apoka Rest Camp is UWA's (16 chalets + 14 bandas); Four Villages Inn is a 4-room family B&B at
//   412 Melcom Road, Ahodwo-Daban; Vic Baboo's is in west Nhyiaso, 20+ years old; "Nyungwe Forest Lodge Camp" →
//   One&Only Nyungwe House (formerly Nyungwe Forest Lodge) on the Gisakura tea estate; "Nyungwe Top View Café" →
//   Nyungwe Top View Hill Hotel's restaurant; La Linguère is on Rue Blaise Diagne (north island); La Maison Rose is
//   at Rue Potin/Av. Blaise Diagne (7 rooms, 9 suites); Big Foot Safari Lodge is a 5-minute walk from Wli falls.
//
//   node scripts/add-tail-batch15-details.js [--apply]
const run = require("./_enrich-runner");

const CD_NOTE = "Pemba lies in Cabo Delgado province, where several governments advise against travel because of an ongoing insurgency; check current advisories first.";

run({
  pemba: {
    delete: ["pemba-magic-restaurant"],
    spots: {
      "russells-place-pemba": {
        name: "Pemba Magic Lodge (Russell's Place)",
        address: "Avenida Marginal, Nanhimbe, Pemba, Cabo Delgado, Mozambique",
        mapsQuery: "Pemba Magic Lodge, Pemba",
        description: "A long-running lodge on the Pemba seafront, started in 1998 as a backpackers' campsite and still widely known as Russell's Place, with individually designed bungalows, a dorm, camping, and a big restaurant and bar. It's a sociable hub for overlanders. " + CD_NOTE,
      },
      "wimbe-beach-pemba": {
        address: "Wimbe Beach, Pemba, Cabo Delgado, Mozambique",
        mapsQuery: "Wimbe Beach, Pemba",
        description: "Pemba's main beach, a long stretch of palm-lined sand on the edge of Pemba Bay, one of the largest natural bays in the world, with calm water, beach restaurants and snorkelling on nearby reefs. It's also the jumping-off point for the Quirimbas islands. " + CD_NOTE,
      },
    },
  },
  "stone-town": {
    spots: {
      "emerson-spice-hotel": {
        address: "Tharia Street, Stone Town, Zanzibar, Tanzania",
        website: "https://emersonspice.com/",
        mapsQuery: "Emerson Spice Hotel, Stone Town",
        description: "A restored 19th-century merchant's house with an inner courtyard and eleven antique-filled rooms, one of Stone Town's most atmospheric hotels. Its rooftop Tea House restaurant serves a seafood-based multi-course dinner at a single sunset sitting, with the calls to prayer drifting over the rooftops — book ahead, even if you're not staying.",
      },
      "forodhani-night-market": {
        address: "Forodhani Gardens, Mizingani Road, Stone Town, Zanzibar, Tanzania",
        mapsQuery: "Forodhani Gardens, Stone Town",
        description: "The seafront gardens in front of the House of Wonders, where each evening food stalls set up to grill seafood skewers and make 'Zanzibar pizza' and fresh sugarcane juice with ginger and lime. It's lively, fun and good for people-watching. Agree the price before ordering, and choose fish that looks freshly cooked.",
      },
      "old-slave-market-zanzibar": {
        address: "Mkunazini, Stone Town, Zanzibar, Tanzania",
        mapsQuery: "Anglican Cathedral Christ Church, Stone Town",
        description: "The site of Zanzibar's last open slave market, closed in 1873, where the Anglican Christ Church Cathedral was built, its altar said to stand where the whipping post was. The heritage centre and underground chambers tell the history of the East African slave trade, and a moving sculpture stands outside. Allow an hour.",
      },
    },
  },
  butare: {
    spots: {
      "ethnographic-museum-butare": {
        name: "Ethnographic Museum (Museum of Rwanda)",
        address: "Huye (Butare), Southern Province, Rwanda",
        mapsQuery: "Ethnographic Museum, Huye, Rwanda",
        description: "Rwanda's national ethnographic museum on the edge of Huye, a gift from Belgium opened in 1989, with one of the best collections in East Africa on traditional Rwandan life: farming, hunting, crafts, architecture, and the royal court. There's often a traditional dance performance on request. Allow a couple of hours.",
      },
      "hotel-credo-butare": {
        address: "University Road, Huye (Butare), Southern Province, Rwanda",
        mapsQuery: "Hotel Credo, Huye",
        description: "A comfortable hotel on University Road in Huye with rooms equipped with TV and Wi-Fi, a gym, and the only swimming pool in town. It's a practical base for the Ethnographic Museum, the university town and trips to Nyungwe forest, and the Inzozi Nziza ice-cream café is right across the road.",
      },
      "inzozi-nziza-butare": {
        address: "University Road, opposite Hotel Credo, Huye (Butare), Rwanda",
        mapsQuery: "Inzozi Nziza, Huye",
        description: "Rwanda's first ice-cream shop, whose name means 'Sweet Dreams', set up by a women's drumming cooperative. It serves soft-serve made from local milk pasteurised in the shop, plus coffee, cakes and cookies. A cheerful place for a break in the university town, and your purchase supports local women.",
      },
    },
  },
  "kidepo-valley": {
    delete: ["kidepo-community-eatery"],
    spots: {
      "apoka-rest-camp-kidepo": {
        address: "Apoka, Kidepo Valley National Park, Uganda",
        website: "https://ugandawildlife.org/",
        mapsQuery: "Apoka Rest Camp, Kidepo",
        description: "The Uganda Wildlife Authority's own camp at the park headquarters in Apoka, the only budget accommodation inside Kidepo, with self-contained chalets and cheaper bandas with shared facilities. It overlooks the Narus Valley, where animals are often seen from the veranda. Book through UWA and bring supplies.",
      },
      "narus-valley-kidepo": {
        address: "Narus Valley, Kidepo Valley National Park, Uganda",
        mapsQuery: "Narus Valley, Kidepo",
        description: "The heart of Kidepo, one of Africa's most remote and beautiful parks near the South Sudan border, with year-round water that draws buffalo, elephants, lions, giraffes, zebras and cheetahs across savannah ringed by mountains. Game drives start from Apoka; you'll rarely see another vehicle.",
      },
    },
  },
  kumasi: {
    spots: {
      "four-villages-inn-kumasi": {
        address: "412 Melcom Road, Ahodwo-Daban, Kumasi, Ghana",
        website: "https://www.fourvillages.com/en",
        description: "A family-run bed and breakfast with just four rooms, each furnished with Asante art and artefacts, about 10 minutes from central Kumasi. It has won several awards for hospitality, and the hosts are generous with advice on the city's markets, palaces and craft villages. Breakfast includes homemade sausages.",
      },
      "kejetia-market-kumasi": {
        address: "Kejetia, Kumasi, Ghana",
        mapsQuery: "Kejetia Market, Kumasi",
        description: "One of West Africa's largest markets, a vast labyrinth of thousands of stalls in central Kumasi selling produce, textiles, kente cloth, beads, hardware and much more, now partly in a modern multi-storey complex. It's overwhelming and exciting; go with a local guide, wear comfortable shoes, and keep valuables close.",
      },
      "vic-baboos-cafe-kumasi": {
        address: "West Nhyiaeso, Kumasi, Ghana",
        mapsQuery: "Vic Baboo's Cafe, Kumasi",
        description: "A popular café-restaurant that has been running for over 20 years, well known to expats, travellers and locals, with a huge menu of Indian, Chinese, continental and Ghanaian dishes, plus smoothies, milkshakes, lassis and cocktails. It's relaxed and reliable, and a comfortable place to eat alone.",
      },
    },
  },
  nyungwe: {
    spots: {
      "nyungwe-canopy-walkway": {
        address: "Uwinka, Nyungwe National Park, Rwanda",
        mapsQuery: "Nyungwe Canopy Walkway",
        description: "A suspension bridge about 50–70m above the forest floor near the Uwinka visitor centre, giving views across the canopy of one of Africa's oldest montane rainforests. It's reached on a guided hike of a couple of hours; book with the park, and combine it with chimpanzee or colobus monkey trekking.",
      },
      "nyungwe-forest-camp": {
        name: "One&Only Nyungwe House",
        address: "Gisakura Tea Estate, Nyamasheke, Rwanda",
        mapsQuery: "One&Only Nyungwe House",
        description: "A luxury lodge of about 22 rooms (formerly Nyungwe Forest Lodge) set on the working Gisakura tea estate at the edge of Nyungwe National Park, with forest views, a spa and a daily tea ceremony. It's a splurge, but a very comfortable base for chimpanzee treks and the canopy walk.",
      },
      "nyungwe-top-view-cafe": {
        name: "Nyungwe Top View Hill Hotel Restaurant",
        address: "Gisakura, Nyungwe National Park, Rwanda",
        website: "https://nyungwehotel.com/",
        mapsQuery: "Nyungwe Top View Hill Hotel",
        description: "The restaurant and bar of a mid-range hotel on a hilltop near Gisakura, housed in a circular thatched building with an open terrace looking over tea fields and mist-covered forest. It serves African, continental and Indian dishes, and non-guests can stop for a meal or drink after a day of trekking.",
      },
    },
  },
  "saint-louis-senegal": {
    spots: {
      "la-linguere-saint-louis": {
        address: "Rue Blaise Diagne, north of the island, Saint-Louis, Senegal",
        mapsQuery: "La Linguère, Saint-Louis, Senegal",
        description: "A simple, popular restaurant on the island of Saint-Louis serving Senegalese classics — its chicken yassa is often called the best in town, and the thiéboudienne is excellent — plus a few international dishes. It's cheap, friendly and open daily from lunch until late evening; a good place for a solo meal.",
      },
      "la-maison-rose-saint-louis": {
        address: "Rue Potin at Avenue Blaise Diagne, Saint-Louis, Senegal",
        mapsQuery: "La Maison Rose, Saint-Louis",
        description: "A colonial-era mansion on the quays of Saint-Louis's historic island, restored as a hotel with an inner courtyard, balconies, and antique-filled rooms and suites. Its panoramic restaurant looks over the Senegal River and the Faidherbe Bridge. Full of character, though reviews are mixed on service.",
      },
      "saint-louis-island": {
        address: "Île de Saint-Louis, Saint-Louis, Senegal",
        website: "https://whc.unesco.org/en/list/956/",
        mapsQuery: "Île de Saint-Louis, Senegal",
        description: "The UNESCO-listed island at the mouth of the Senegal River, capital of French West Africa until 1902, with colonial houses of balconies and shutters, reached by the iron Faidherbe Bridge. Take a horse-cart tour, visit the fishing quarter of Guet Ndar, and come in May for the famous Saint-Louis Jazz Festival.",
      },
    },
  },
  "volta-region": {
    spots: {
      "big-foot-safaris-lodge-volta": {
        name: "Big Foot Safari Lodge",
        address: "Wli Agorviefe, Volta Region, Ghana",
        website: "https://www.bigfootsafarilodge.com/",
        mapsQuery: "Big Foot Safari Lodge, Wli",
        description: "A simple lodge in a peaceful garden at the edge of Wli village, about five minutes' walk from the entrance to the Wli waterfalls, with rooms with mountain-view balconies, camping, and a restaurant and bar serving local food. A friendly base for the falls hike, Mount Afadjato and cycling in the Volta hills.",
      },
      "mount-afadja-trail": {
        name: "Mount Afadjato",
        address: "Liati Wote, Volta Region, Ghana",
        mapsQuery: "Mount Afadjato",
        description: "Ghana's highest peak (about 885m) on the border with Togo, climbed on a short but steep guided trail from the village of Liati Wote, with panoramic views over the Agumatsa range. The village community runs the eco-tourism project; combine the climb with the nearby Tagbo Falls on a day hike.",
      },
      "wli-waterfall": {
        address: "Agumatsa Wildlife Sanctuary, Wli, Volta Region, Ghana",
        mapsQuery: "Wli Waterfalls",
        description: "Often described as the highest waterfall in West Africa, in the Agumatsa Wildlife Sanctuary near the Togo border. An easy 40-minute forest walk leads to the lower falls, where you can swim in the pool beneath thousands of fruit bats; a steep guided hike reaches the upper falls. Pay at the visitor centre.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
