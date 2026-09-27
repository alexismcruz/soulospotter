// Small-city tail, batch 19: Asunción, Baños, Puerto Viejo, Queen Elizabeth NP, Iquitos, New York City,
// Florianópolis, Punta del Este. Researched 2026-09-27.
//
// DELETED: El Café Literario, Asunción (closed permanently in June 2020).
// CORRECTED: Black Cat Hostel is at Eligio Ayala 129 between Yegros and Independencia Nacional (pool, breakfast);
//   Stray Dog Brewpub is at Rocafuerte y Maldonado (beer from La Cascada brewery), not Eloy Alfaro; Community Hostel
//   Baños street unverified → town-level address; Bread & Chocolate was founded by a couple who drove a veg-oil
//   school bus from the US; Simba Safari Camp overlooks Lake Kikorongo near the equator (70 beds); Dawn on the Amazon
//   is at Malecón Maldonado 185 at Calle Nauta; La Casa Fitzcarraldo is Herzog's production house (4-level
//   treehouse); Ace Hotel New York reopened May 2021; Tucano House is at Rua das Araras 229 (family dinners); The Trip
//   Hostel is two blocks from the bus station, Gorlero and the beaches, run by three locals.
//
//   node scripts/add-tail-batch19-details.js [--apply]
const run = require("./_enrich-runner");

run({
  asuncion: {
    delete: ["cafe-literario-asuncion"],
    spots: {
      "black-cat-hostel-asuncion": {
        address: "Eligio Ayala 129, between Yegros and Independencia Nacional, Asunción, Paraguay",
        mapsQuery: "Black Cat Hostel, Asunción",
        description: "A central hostel in Asunción's historic downtown, within walking distance of the main sights, with dorms and private rooms, a small pool, free breakfast and bike rental. It's the city's traditional meeting point for backpackers, and staff are helpful with tips on getting around a capital few travellers expect to enjoy.",
      },
      "palacio-de-los-lopez": {
        address: "El Paraguayo Independiente, Asunción, Paraguay",
        mapsQuery: "Palacio de los López, Asunción",
        description: "The 19th-century presidential palace facing the bay, built for the López family and now the seat of government, most striking when floodlit at night. You can admire it from the gardens and the waterfront; guided visits are sometimes offered on special dates. Walk to the nearby Panteón de los Héroes and the old centre.",
      },
    },
  },
  "banos-ecuador": {
    spots: {
      "casa-del-arbol-swing": {
        name: "La Casa del Árbol",
        address: "Runtún, above Baños, Tungurahua, Ecuador",
        mapsQuery: "La Casa del Árbol, Baños",
        description: "A treehouse on a hillside above Baños, famous for its swings that fly out over a steep drop, with Tungurahua volcano beyond on a clear day. It's reached by bus, taxi or a steep hike from town, and there's a small entry fee. Go early for the best chance of clear volcano views and shorter queues.",
      },
      "community-hostel-banos": {
        address: "Baños de Agua Santa, Tungurahua, Ecuador",
        website: "http://www.communitybanos.communityhostel.com/",
        mapsQuery: "Community Hostel Baños",
        description: "The Baños branch of the well-known Ecuadorian hostel brand, with comfortable dorms and private rooms, excellent food, bike rental, free yoga and a busy social programme of trivia and game nights. Staff help book rafting, canyoning and the Ruta de las Cascadas bike ride — an easy place to make friends.",
      },
      "stray-dog-brewpub-banos": {
        address: "Rocafuerte y Maldonado, Baños, Tungurahua, Ecuador",
        mapsQuery: "Stray Dog Brewpub, Baños",
        description: "A small brewpub in central Baños, seating around 35, pouring craft beers brewed locally with spring water, under the slogan 'come for the beer, stay for the food'. Platters of pulled pork, spicy sausage and grilled cheese are big and hearty — the classic refuel after a day of canyoning, rafting or cycling.",
      },
    },
  },
  "puerto-viejo": {
    spots: {
      "bread-and-chocolate-puerto-viejo": {
        address: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        mapsQuery: "Bread & Chocolate, Puerto Viejo",
        description: "A popular breakfast and lunch café founded by a young couple who drove down from the US in a vegetable-oil-powered school bus. Everything is made in-house: biscuits, bagels, jams and especially the chocolate — as drinks, truffles and brownies. There are plenty of vegetarian and vegan options. Expect queues at breakfast.",
      },
      "playa-cocles": {
        address: "Playa Cocles, Puerto Viejo de Talamanca, Limón, Costa Rica",
        mapsQuery: "Playa Cocles",
        description: "A long, palm-backed Caribbean beach a short bike ride south of Puerto Viejo, with consistent beach breaks popular with surfers and lifeguards on part of the beach. Rip currents can be strong, so swim near the lifeguard tower. Rent a bike in town and continue on to Punta Uva and Manzanillo.",
      },
      "rocking-js-puerto-viejo": {
        address: "Beachfront, Puerto Viejo de Talamanca, Limón, Costa Rica",
        mapsQuery: "Rocking J's, Puerto Viejo",
        description: "A long-running beachfront hostel covered in colourful mosaics, known for its rows of hammocks, camping and simple rooms, with a lively bar and social atmosphere. It's cheap and fun, but expect noise and basic facilities; bring earplugs and use the lockers for valuables.",
      },
    },
  },
  "queen-elizabeth-np": {
    spots: {
      "kazinga-channel": {
        address: "Kazinga Channel, Queen Elizabeth National Park, Uganda",
        mapsQuery: "Kazinga Channel",
        description: "A 32km natural channel linking Lake George and Lake Edward, with one of the world's highest concentrations of hippos along its banks, plus elephants, buffalo, crocodiles and abundant birds. The classic way to see it is a two-hour afternoon boat cruise from the Mweya peninsula, booked with UWA or your lodge.",
      },
      "mweya-lodge-restaurant": {
        address: "Mweya Peninsula, Queen Elizabeth National Park, Uganda",
        website: "https://mweyalodge.com/",
        mapsQuery: "Mweya Safari Lodge",
        description: "The restaurant and terrace of Mweya Safari Lodge, on a peninsula above the Kazinga Channel and Lake Edward, with views over hippos and elephants at the water and the Rwenzori Mountains on clear days. Non-guests can stop for lunch or a sundowner before or after the channel boat cruise, which leaves from below the lodge.",
      },
      "simba-safari-camp-qenp": {
        address: "Near Kikorongo, Kasese, on the edge of Queen Elizabeth National Park, Uganda",
        website: "https://thegreatlakescollection.com/simba-safari-camp/",
        mapsQuery: "Simba Safari Camp, Queen Elizabeth",
        description: "A budget-friendly camp on a hill overlooking Lake Kikorongo on the edge of the park, near the equator, with dorms, twin rooms and family cottages. It's well placed for early game drives on the Kasenyi plains, the Kazinga Channel cruise, the crater lakes and chimp tracking in the Kyambura Gorge.",
      },
    },
  },
  iquitos: {
    spots: {
      "belen-market-iquitos": {
        address: "Belén, Iquitos, Loreto, Peru",
        mapsQuery: "Mercado de Belén, Iquitos",
        description: "Iquitos's huge, chaotic market, selling Amazon fruits, fish, turtle eggs, jungle medicines and the herbs of Pasaje Paquito, beside the stilted and floating houses of the Belén neighbourhood. Go in the morning with a local guide, who can also arrange a canoe through the floating village when the river is high. Keep valuables hidden.",
      },
      "casa-fitzcarraldo-iquitos": {
        name: "La Casa Fitzcarraldo",
        address: "Av. La Marina, Iquitos, Loreto, Peru",
        website: "https://lacasafitzcarraldo.com/",
        mapsQuery: "La Casa Fitzcarraldo, Iquitos",
        description: "A small hotel in the house that served as Werner Herzog's production base for the films Fitzcarraldo and Aguirre, set in a tropical garden with a pool and a four-level treehouse with sunset views. Breakfast, with homemade bread and jams, is included. A peaceful base between jungle-lodge trips.",
      },
      "dawn-amazon-cafe-iquitos": {
        address: "Malecón Maldonado 185, at Calle Nauta, Iquitos, Loreto, Peru",
        mapsQuery: "Dawn on the Amazon Café, Iquitos",
        description: "A long-running café on the riverside boulevard run by a friendly couple, with a wide international menu — Peruvian, Italian, Mexican and more — plus vegan options, a special menu for people on ayahuasca diets, and good Wi-Fi. It's a reliable, welcoming place to eat alone and watch the river.",
      },
    },
  },
  "new-york-city": {
    spots: {
      "ace-hotel-new-york": {
        address: "20 W 29th St, NoMad, New York, NY, USA",
        website: "https://acehotel.com/new-york/",
        description: "A design-led hotel in NoMad, reopened in 2021 after a pandemic closure, whose lobby — dim, buzzy and full of laptops and conversations — is a classic solo hangout. Rooms range from compact bunk rooms to larger lofts, and the Madison Square Park area and subway lines are close by.",
      },
      "high-line-park": {
        name: "The High Line",
        address: "Gansevoort St to W 34th St, Manhattan, New York, NY, USA",
        website: "https://www.thehighline.org/",
        mapsQuery: "The High Line, New York",
        description: "A 2.3km elevated park built on a disused freight rail line on Manhattan's west side, running from the Meatpacking District to Hudson Yards, with planted gardens, art installations and views of the Hudson. It's free and open daily; walk it early in the morning or at sunset to avoid the crowds.",
      },
      "the-bean": {
        address: "Multiple locations, Manhattan, New York, NY, USA",
        mapsQuery: "The Bean coffee, Manhattan",
        description: "A small New York coffee-shop chain with several branches in Manhattan, including the East Village, serving strong coffee, smoothies and light snacks, with seating that suits working on a laptop. It's an easy, affordable pit stop for a solo coffee break between sights.",
      },
    },
  },
  florianopolis: {
    spots: {
      "box-32-floripa": {
        name: "Box 32",
        address: "Mercado Público, Centro, Florianópolis, Santa Catarina, Brazil",
        website: "https://www.box32.com.br/",
        mapsQuery: "Box 32, Mercado Público, Florianópolis",
        description: "A famous bar-restaurant inside Florianópolis's historic public market, a lively meeting place for locals for decades, known for seafood snacks, fresh oysters from the island's farms and cold beer. It's busiest at lunch and on Saturday afternoons. A fun, sociable place to sit at the counter alone.",
      },
      "praia-da-joaquina": {
        address: "Joaquina, Florianópolis, Santa Catarina, Brazil",
        mapsQuery: "Praia da Joaquina",
        description: "A famous surf beach on the east coast of Santa Catarina island, with powerful waves and, behind it, the huge Joaquina dunes where you can rent a board and go sandboarding. It's lively in summer, with lifeguards and beach kiosks. Swim only where flagged; the currents are strong.",
      },
      "tucano-house-hostel": {
        name: "Tucano House",
        address: "Rua das Araras 229, Lagoa da Conceição, Florianópolis, Santa Catarina, Brazil",
        mapsQuery: "Tucano House, Florianópolis",
        description: "A long-running, friendly hostel near Lagoa da Conceição, with a pool, sun terrace, garden and bar. It's known for its family-style group dinners, which make it very easy to meet other travellers, and for its social atmosphere that suits solo guests. The lagoon's bars and the beaches are nearby.",
      },
    },
  },
  "punta-del-este": {
    spots: {
      "la-huella-punta": {
        name: "Parador La Huella",
        address: "Playa Brava, José Ignacio, Maldonado, Uruguay",
        mapsQuery: "Parador La Huella, José Ignacio",
        description: "A celebrated beach restaurant on the sand at José Ignacio, about 40km east of Punta del Este, serving wood-fired fish, grilled meats and famous desserts in a relaxed, barefoot setting. It's one of Latin America's best-known restaurants and very busy in summer, so book well ahead or go outside peak season.",
      },
      "la-mano-punta": {
        name: "La Mano (Los Dedos)",
        address: "Parada 1, Playa Brava, Punta del Este, Maldonado, Uruguay",
        mapsQuery: "La Mano, Punta del Este",
        description: "The giant concrete fingers rising from the sand at Playa Brava, a sculpture by Chilean artist Mario Irarrázabal made in 1982, now Punta del Este's best-known landmark. It's free and always accessible; go early in the morning or at sunset to photograph it without the crowds.",
      },
      "the-trip-hostel-punta": {
        address: "Two blocks from the bus terminal and Av. Gorlero, Punta del Este, Maldonado, Uruguay",
        mapsQuery: "The Trip Hostel, Punta del Este",
        description: "A small hostel run by three young locals, two blocks from the bus station, the main street Gorlero, and both Playa Mansa and Playa Brava. It has a kitchen, barbecue areas and a rooftop terrace. A friendly, affordable base in one of South America's most expensive beach resorts.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
