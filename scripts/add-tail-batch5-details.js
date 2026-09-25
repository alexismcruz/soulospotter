// Small-city tail, batch 5: Port Antonio, Ocho Rios, Viñales, Vieques, Trinidad (Cuba), Blue Mountains,
// Bridgetown, Cap-Haïtien. Researched 2026-09-25.
//
// RENAMED/CORRECTED: "Casa Colonial Trinidad" (generic) → Casa Colonial 1830 (real casa in the historic centre);
//   Casa El Balcón Viñales is Mignelys & Juanito's casa at Rafael Trejo 48-A (town centre, rooftop terrace — not a
//   balcony "over the tobacco valley"); "Marché de Fer Cap" → Marché Cluny (Iron Market), Place Cluny; Soldier Camp
//   is a bamboo-hut bar & grill near Port Antonio run by a US Army veteran (Jamaica Gleaner), known for crayfish in
//   coconut curry as much as jerk; El Quenepo (148 Calle Flamboyán, Esperanza) closes seasonally — note added.
// Haiti entries carry a travel-advisory note given the ongoing security situation.
//
//   node scripts/add-tail-batch5-details.js [--apply]
const run = require("./_enrich-runner");

run({
  "port-antonio": {
    spots: {
      "drapers-san-port-antonio": {
        address: "Drapers, Port Antonio, Portland, Jamaica",
        mapsQuery: "Drapers San Guest House, Port Antonio",
        description: "A small, laid-back guesthouse in Drapers, a few kilometres east of Port Antonio along the coast road, with simple rooms in a tropical garden close to Frenchman's Cove and San San Beach. It's a relaxed, friendly base for exploring the Blue Lagoon, Reach Falls, Boston Bay and bamboo rafting on the Rio Grande.",
      },
      "soldier-camp-port-antonio": {
        address: "Near Port Antonio, Portland, Jamaica",
        mapsQuery: "Soldier Camp Bar and Grill, Portland, Jamaica",
        description: "A roadside bar and grill in a bamboo hut decorated with military flags and insignia, opened by a Jamaican who returned home after serving in the US Army. It's known for crayfish cooked in coconut curry and jerk, with old-time dishes such as roast yam and ackee on Wednesdays. A warm, local place to eat alone.",
      },
      "blue-lagoon-port-antonio": {
        address: "Blue Lagoon, near San San, Portland, Jamaica",
        mapsQuery: "Blue Lagoon, Port Antonio",
        description: "A deep, sheltered lagoon east of Port Antonio where cold spring water mixes with warm sea water, giving it a vivid blue-green colour that shifts through the day. You can swim from the small beach or take a short boat trip from nearby jetties. It's a lovely, calm swim in the morning before the tour boats arrive.",
      },
    },
  },
  "ocho-rios": {
    spots: {
      "reggae-hostel-ocho-rios": {
        address: "Ocho Rios, St. Ann, Jamaica",
        mapsQuery: "Reggae Hostel Ocho Rios",
        description: "An adults-only hostel about 10 minutes' walk from Ocho Rios town centre and close to the beach and Turtle River Park, with dorms and private rooms, all air-conditioned. There's a rooftop bar and terrace and a garden, and staff help organise trips to Dunn's River Falls and the rest of the north coast.",
      },
      "scotchies-ocho-rios": {
        address: "Drax Hall, near Ocho Rios, St. Ann, Jamaica",
        mapsQuery: "Scotchies Ocho Rios",
        description: "The Ocho Rios branch of Scotchies, one of Jamaica's best-known jerk centres, where chicken and pork are slow-smoked over pimento wood in open pits. Order by weight and add festival (sweet fried dumplings), roast breadfruit and a cold drink. It's a casual, open-air place where eating alone is completely normal.",
      },
      "dunns-river-falls": {
        address: "Dunn's River Falls, Ocho Rios, St. Ann, Jamaica",
        mapsQuery: "Dunn's River Falls",
        description: "A terraced waterfall that tumbles down to the sea just west of Ocho Rios, which visitors climb in human chains led by guides. Wear water shoes (rentable on site) and a swimsuit, and keep valuables in a locker. It's very busy on cruise-ship days, so check the port schedule and go early on a quieter day.",
      },
    },
  },
  vinales: {
    spots: {
      "casa-el-balcon-vinales": {
        address: "Calle Rafael Trejo 48-A (2nd floor), Viñales, Pinar del Río, Cuba",
        mapsQuery: "Casa El Balcon, Viñales",
        description: "A casa particular run by Mignelys and Juanito on the second floor of a house in the centre of Viñales, with a rooftop terrace looking over the town, the church and the surrounding mogotes. The hosts are known for good home cooking and helpful advice, and can arrange horse rides and tobacco-farm visits in the valley.",
      },
      "finca-el-paraiso-vinales": {
        address: "Viñales, Pinar del Río, Cuba",
        mapsQuery: "Finca Agroecológica El Paraíso, Viñales",
        description: "An organic family farm on a hillside a short ride outside Viñales, with a terrace overlooking the valley. Lunch or dinner is a generous spread of dishes made from produce grown on the farm, and the house 'anti-stress' cocktail is famous. Book ahead, arrive in time for sunset, and take a taxi back to town afterwards.",
      },
      "valle-de-vinales": {
        address: "Valle de Viñales, Pinar del Río, Cuba",
        mapsQuery: "Viñales Valley",
        description: "A UNESCO-listed valley of red earth, tobacco fields and wooden drying sheds surrounded by dramatic limestone hills called mogotes. It's best explored on horseback or on foot with a local guide, visiting tobacco farms, caves and coffee growers. Early mornings, when mist hangs between the mogotes, are magical.",
      },
    },
  },
  vieques: {
    spots: {
      "casa-de-amistad-vieques": {
        address: "Isabel Segunda, Vieques, Puerto Rico",
        mapsQuery: "Casa de Amistad, Vieques",
        description: "A small, friendly guesthouse in Isabel Segunda, the island's main town near the ferry dock, with simple rooms, a small pool and a rooftop area. It's an affordable, sociable base on an island where much of the accommodation is pricey rentals, and the hosts help with car or scooter hire and bio-bay trips.",
      },
      "el-quenepo-vieques": {
        address: "148 Calle Flamboyán, Esperanza, Vieques, Puerto Rico",
        website: "http://www.elquenepovieques.com/",
        description: "A fine-dining restaurant on the waterfront in Esperanza, serving handcrafted dishes and cocktails built on local, seasonal ingredients and fresh seafood. It's the island's special-occasion spot, so book ahead. It opens Tuesday to Saturday in season and closes for part of the low season, so check its website before planning around it.",
      },
      "mosquito-bay-vieques": {
        address: "Mosquito Bay, Vieques, Puerto Rico",
        mapsQuery: "Mosquito Bay, Vieques",
        description: "A bioluminescent bay on Vieques' south coast, certified by Guinness in 2008 as the brightest in the world, where microscopic organisms make the water glow blue-green with every paddle stroke. Tours run by kayak or electric boat after dark; swimming isn't allowed. Go on a moonless night for the best show.",
      },
    },
  },
  "trinidad-cuba": {
    spots: {
      "casa-colonial-trinidad": {
        name: "Casa Colonial 1830",
        address: "Historic centre, Trinidad, Sancti Spíritus, Cuba",
        mapsQuery: "Casa Colonial 1830, Trinidad, Cuba",
        description: "A casa particular in a colonial house built in 1830 and remodelled in the early 20th century, in Trinidad's historic centre. Like many casas in the town, it has high ceilings, a courtyard and period details, and it's a short walk over the cobblestones to the Plaza Mayor, museums and the evening music at the Casa de la Música steps.",
      },
      "paladar-sol-y-son-trinidad": {
        address: "Historic centre, Trinidad, Sancti Spíritus, Cuba",
        mapsQuery: "Paladar Sol y Son, Trinidad, Cuba",
        description: "A long-running paladar in a colonial house in Trinidad's old town, with tables in a leafy courtyard among antiques. It serves traditional Cuban dishes — slow-cooked pork, ropa vieja, fish and lobster — at fair prices, and it's a pleasant, unhurried place for dinner alone. Book in the busy winter season.",
      },
      "plaza-mayor-trinidad": {
        address: "Plaza Mayor, Trinidad, Sancti Spíritus, Cuba",
        mapsQuery: "Plaza Mayor, Trinidad, Cuba",
        description: "The heart of Trinidad, a UNESCO World Heritage Site together with the nearby Valle de los Ingenios sugar mills. The small, palm-dotted square is surrounded by pastel mansions housing museums, and the bell tower of the former convent of San Francisco gives the best view over the red-tiled roofs. Come early before the heat.",
      },
    },
  },
  "blue-mountains": {
    spots: {
      "lime-tree-farm-blue-mountains": {
        address: "Tower Hill, Blue Mountains, Jamaica",
        mapsQuery: "Lime Tree Farm, Blue Mountains",
        description: "A small, off-grid eco-lodge on a working coffee farm high in the Blue Mountains, with simple cottages looking out over the peaks and valleys. Meals are home-cooked, and the hosts arrange hikes, including the pre-dawn climb of Blue Mountain Peak. The road up is rough, so arrange a transfer rather than driving yourself.",
      },
      "eits-cafe-blue-mountains": {
        address: "Green Hills, Newcastle Road, Blue Mountains, Jamaica",
        mapsQuery: "EITS Cafe, Blue Mountains, Jamaica",
        description: "A mountainside café-restaurant on the road to Newcastle — the name stands for 'Europe in the Summer' — with a terrace overlooking the valleys. It serves farm-to-table dishes from its own gardens and Blue Mountain coffee. A lovely stop for lunch on a day trip into the mountains from Kingston.",
      },
      "blue-mountain-peak-trail": {
        address: "Blue and John Crow Mountains National Park, Jamaica",
        mapsQuery: "Blue Mountain Peak",
        description: "The climb to Jamaica's highest point, Blue Mountain Peak (2,256m), in a UNESCO-listed national park. Most people start around 2am from the Penlyne or Abbey Green area to reach the summit for sunrise, when on very clear days Cuba's outline can be seen. It's a long, steep hike; go with a local guide and bring warm layers.",
      },
    },
  },
  bridgetown: {
    spots: {
      "cheapside-market": {
        address: "Cheapside, Bridgetown, Barbados",
        mapsQuery: "Cheapside Market, Bridgetown",
        description: "Bridgetown's main produce market, busiest on Saturday mornings, with stalls of tropical fruit, vegetables, spices and fish, plus food vendors selling local snacks and drinks. It's a lively slice of everyday Barbadian life a short walk from the city centre. Bring small change and try fresh coconut water.",
      },
      "garrison-savannah-historic-area": {
        address: "The Garrison, St. Michael, Barbados",
        mapsQuery: "Garrison Savannah, Barbados",
        description: "Part of the UNESCO World Heritage Site of Historic Bridgetown and its Garrison, just south of the capital. The Savannah is used for horse racing, and around it stand 18th- and 19th-century military buildings, including the Barbados Museum in the former military prison and the George Washington House. A good morning's walk.",
      },
      "harbour-lights-beach-bar": {
        address: "Bay Street, Bridgetown, Barbados",
        mapsQuery: "Harbour Lights, Bridgetown",
        description: "A long-running open-air club on the beach at Carlisle Bay, known for its all-inclusive beach party nights with live bands and DJs playing soca, reggae and dancehall. It's the classic Bridgetown night out for visitors. Check which nights it's open, and take a taxi back to your accommodation.",
      },
    },
  },
  "cap-haitien": {
    spots: {
      "march-de-fer-cap": {
        name: "Marché Cluny (Iron Market)",
        address: "Place Cluny, Cap-Haïtien, Haiti",
        mapsQuery: "Marché Cluny, Cap-Haïtien",
        description: "Cap-Haïtien's central market at Place Cluny, sprawling over several city blocks under and around its iron halls, with everything from fresh produce and street food to clothing, household goods and crafts. It's busy and chaotic; go with a local guide. Check current travel advisories for Haiti before planning any visit.",
      },
      "labadie-beach-local-side": {
        address: "Labadie, Nord, Haiti",
        mapsQuery: "Labadie village, Haiti",
        description: "The village of Labadie and nearby beaches on the peninsula west of Cap-Haïtien, next to the fenced cruise-line resort. Water taxis from the jetty reach quieter coves with clear water and small beach restaurants serving fresh fish. Arrange boats and prices in advance, and check current travel advisories for Haiti before going.",
      },
      "citadelle-laferri-re": {
        address: "Milot, near Cap-Haïtien, Haiti",
        mapsQuery: "Citadelle Laferrière",
        description: "A vast mountaintop fortress built in the early 19th century after Haiti's independence, and a UNESCO World Heritage Site together with the Sans-Souci Palace ruins at Milot below. The steep walk (or horse ride) up gives views to the coast. Go with an official guide, and check current travel advisories for Haiti before planning a trip.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
