// Small-city tail, batch 2: Boquete, El Tunco, Dakar, Las Terrenas, Maun, Musanze, Managua, Kigali.
// Researched 2026-09-23/25.
//
// DELETED: La Bocana Restaurant, El Tunco — La Bocana is a surf break at the river mouth; no restaurant by that
//   name can be found anywhere.
// RENAMED: Selina Boquete → Socialtel Boquete (Selina's hostels were taken over and rebranded as Socialtel).
// CORRECTED: ViaVia is in Yoff (near the old airport, ~15km from central Dakar), not "near the coast" downtown;
//   Café de Rome is a Plateau hotel with a French brasserie, not a pastry café; Discover Rwanda Youth Hostel is in
//   Kacyiru (KN 14 Ave), not Kiyovu, and supports the Aegis Trust (the charity behind the Genocide Memorial);
//   Old Bridge Backpackers is ~10km out of Maun on the Thamalakane; Hilary's opened in 1995; Managua's malecón is
//   Puerto Salvador Allende.
//
//   node scripts/add-tail-batch2-details.js [--apply]
const run = require("./_enrich-runner");

run({
  boquete: {
    spots: {
      "selina-boquete": {
        name: "Socialtel Boquete",
        address: "Boquete, Chiriquí, Panama",
        mapsQuery: "Socialtel Boquete",
        description: "A riverside hostel-hotel in Boquete, formerly Selina Boquete and now part of the Socialtel group, with dorms, private rooms, a bar and gardens by the Caldera River. It's a sociable base for the town's coffee tours, hikes up Volcán Barú and the Pipeline Trail. Service went through a bumpy patch during the rebrand, so check recent reviews.",
      },
      "cafe-ruiz-boquete": {
        address: "Avenida Central, Bajo Boquete, Chiriquí, Panama",
        website: "https://www.caferuiz-boquete.com/",
        description: "A family coffee company in Boquete that grows and roasts beans from the slopes of Volcán Barú, including the prized Geisha variety the region is famous for. Its café in town serves espresso and filter coffee, and the guided tours take you through the farm and roasting process, with a tasting at the end. Book the tour a day ahead.",
      },
      "sendero-los-quetzales": {
        address: "Volcán Barú National Park, Chiriquí, Panama",
        mapsQuery: "Sendero Los Quetzales, Volcán Barú National Park",
        description: "A cloud-forest trail of about 9km through Volcán Barú National Park between the Boquete side and Cerro Punta, known as one of the best places in Central America to spot the resplendent quetzal (most likely February to May). The path is muddy and steep in parts, so go with a guide or check its current condition with park rangers first.",
      },
    },
  },
  "el-tunco": {
    delete: ["la-bocana-el-tunco"],
    spots: {
      "papaya-lodge-el-tunco": {
        address: "Playa El Tunco, La Libertad, El Salvador",
        mapsQuery: "Papaya's Lodge, El Tunco",
        description: "A relaxed surf lodge a short walk from the beach at El Tunco, with a pool, garden, terrace, shared kitchen and a restaurant-bar. There are dorms and private rooms, and it's a sociable place to meet other surfers and travellers, arrange board rental and lessons, or head out together to the busy weekend nightlife in the village.",
      },
      "playa-el-tunco": {
        address: "El Tunco, La Libertad, El Salvador",
        mapsQuery: "Playa El Tunco",
        description: "El Salvador's best-known surf beach, a stretch of black sand and rocks named after the pig-shaped rock ('tunco') just offshore. Consistent waves draw surfers from beginners to experienced riders, and the small village behind the beach has hostels, surf shops, bars and restaurants. Sunsets are spectacular; weekends are busy with visitors from San Salvador.",
      },
    },
  },
  dakar: {
    spots: {
      "via-via-dakar": {
        name: "ViaVia Traveller's Café Dakar",
        address: "Yoff, Dakar, Senegal",
        mapsQuery: "ViaVia Dakar, Yoff",
        description: "A traveller's guesthouse and café in Yoff, a fishing district about 500m from the beach and 15km from central Dakar, part of the ViaVia network of travellers' cafés. It has simple rooms, a garden, a roof terrace and a bar-restaurant, and runs djembe, batik and cooking workshops plus excursions — a friendly, low-key place to meet people.",
      },
      "cafe-de-rome-dakar": {
        address: "Dakar-Plateau, Dakar, Senegal",
        website: "https://www.cafederome.com/en/",
        mapsQuery: "Café de Rome, Dakar",
        description: "A long-established hotel and brasserie in Dakar-Plateau, the city's business district, a short drive from the port. Its restaurant serves classic French dishes — oysters, steak tartare, sole meunière — with a terrace for coffee or lunch. A comfortable, central place to eat or stay, and walking distance from many of Plateau's sights.",
      },
      "ile-de-goree": {
        address: "Île de Gorée, Dakar, Senegal",
        mapsQuery: "Île de Gorée",
        description: "A small, car-free island a 20-minute ferry ride from Dakar's port and a UNESCO World Heritage Site, remembered as a centre of the Atlantic slave trade. Visit the Maison des Esclaves with its 'Door of No Return', then wander the colourful colonial streets, the fort and the beach. Ferries run regularly through the day.",
      },
    },
  },
  "las-terrenas": {
    spots: {
      "casa-robinson-las-terrenas": {
        name: "Hotel Casa Robinson",
        address: "Calle Emilio Prud'homme 2, Las Terrenas 32000, Dominican Republic",
        website: "https://casarobinson.it/en/",
        description: "A simple, well-kept guesthouse set in a tropical garden a short walk from the beach in Las Terrenas, with rooms and apartments in wooden and stone buildings. It's quiet and affordable, and the town's restaurants, bars and the Pueblo de los Pescadores are close by — a relaxed base for exploring the Samaná peninsula.",
      },
      "la-terrasse-las-terrenas": {
        address: "Pueblo de los Pescadores, Las Terrenas, Dominican Republic",
        mapsQuery: "La Terrasse, Pueblo de los Pescadores, Las Terrenas",
        description: "A popular beachfront restaurant in the Pueblo de los Pescadores, Las Terrenas' row of old fishermen's houses turned restaurants. It serves French, Mediterranean and Caribbean dishes — seafood, octopus, steak au poivre — on a deck facing the sunset over the bay. It's busy in the evenings, so reserve ahead for a table by the water.",
      },
      "playa-bonita-las-terrenas": {
        address: "Playa Bonita, Las Terrenas, Dominican Republic",
        mapsQuery: "Playa Bonita, Las Terrenas",
        description: "A long, palm-fringed beach a couple of kilometres west of Las Terrenas town, quieter than the central beaches, with golden sand and waves that suit bodyboarding and beginner surfing. A few small hotels and beach restaurants sit behind it. Take care with currents when the surf is up, and bring water and shade.",
      },
    },
  },
  maun: {
    spots: {
      "old-bridge-backpackers-maun": {
        address: "Old Matlapaneng Bridge Road, Maun, Botswana",
        mapsQuery: "The Old Bridge Backpackers, Maun",
        description: "A riverside backpackers about 10km out of Maun on the Thamalakane River, overlooking a hippo pool, with furnished tents, campsites and a bar and restaurant around the fire. It runs mokoro trips into the Okavango Delta and safaris to Moremi, making it the easiest place to find other travellers to share a trip with.",
      },
      "hilarys-coffee-maun": {
        address: "Near Maun Airport, Maun, Botswana",
        mapsQuery: "Hilary's Coffee Shop, Maun",
        description: "Maun's longest-running coffee shop, open since 1995 a short walk from the airport, known for wholesome homemade food — generous breakfasts, fresh bread, salads and cakes. It's where many people have a last proper meal before flying into the Okavango Delta. Open weekdays 8am–4pm and Saturday mornings.",
      },
      "nhabe-museum-maun": {
        address: "Maun, Botswana",
        mapsQuery: "Nhabe Museum, Maun",
        description: "A small museum and gallery in a historic colonial-era building in Maun, with displays on the natural history, peoples and crafts of the Okavango region, plus work by local artists for sale. It takes less than an hour, and it's a good way to add some cultural context before or after a Delta trip. Donations are welcome.",
      },
    },
  },
  musanze: {
    spots: {
      "red-rocks-rwanda": {
        address: "Nyakinama, Musanze, Rwanda",
        website: "https://www.redrocksrwanda.com/",
        description: "A campsite, hostel and cultural centre in Nyakinama village near Musanze, run as a social enterprise supporting community development and conservation. There are safari tents, cottages, hostel rooms and camping, and guests can join activities such as banana-beer making, traditional dance, cooking and basket weaving with local families.",
      },
      "volcana-lounge-musanze": {
        address: "Musanze (Ruhengeri), Rwanda",
        mapsQuery: "Volcana Lounge, Musanze",
        description: "A popular restaurant in Musanze known for its wood-fired, thin-crust pizzas cooked over eucalyptus wood, along with lasagne, falafel and Rwandan dishes. There's an upstairs patio with views, and it's a favourite meeting place for travellers the evening before a gorilla trek in Volcanoes National Park.",
      },
      "volcanoes-national-park-hq": {
        address: "Kinigi, Musanze, Rwanda",
        mapsQuery: "Volcanoes National Park Headquarters, Kinigi",
        description: "The park headquarters at Kinigi, about 30 minutes from Musanze, where every gorilla, golden-monkey and volcano trek in Volcanoes National Park begins with an early-morning briefing and group allocation. Gorilla permits are expensive and must be booked well in advance through the Rwanda Development Board or an operator.",
      },
    },
  },
  managua: {
    spots: {
      "hostal-dulce-sueno-managua": {
        address: "Near the Tica Bus terminal, Managua, Nicaragua",
        mapsQuery: "Hostal Dulce Sueño, Managua",
        description: "A small, simple hostel one block from the Tica Bus and Transporte Sol terminals, which makes it practical for an overnight stop before an early international bus. Rooms have private bathrooms, and there's a rooftop area with hammocks, a shared kitchen and a book exchange. A basic, budget base rather than a destination in itself.",
      },
      "cafe-de-las-flores-managua": {
        address: "Km 6.5 Carretera a Masaya, Managua, Nicaragua",
        mapsQuery: "Café Las Flores, Carretera a Masaya, Managua",
        description: "A branch of the Nicaraguan coffee chain Café Las Flores on the Carretera a Masaya, serving coffee from the country's own growing regions alongside breakfasts, sandwiches and cakes. It's air-conditioned, comfortable and reliable — a good place to work for an hour or wait out the midday heat in a city with few relaxed cafés.",
      },
      "malecon-de-managua": {
        name: "Puerto Salvador Allende (Malecón)",
        address: "Puerto Salvador Allende, Lake Xolotlán, Managua, Nicaragua",
        mapsQuery: "Puerto Salvador Allende, Managua",
        description: "Managua's lakefront promenade on Lake Xolotlán in the old city centre, with walkways, restaurants, bars and food stalls that come alive in the evenings and at weekends. There's a replica of pre-1972-earthquake Avenida Bolívar and lit-up 'trees of life'. It's busiest and most atmospheric on weekend evenings with local families.",
      },
    },
  },
  kigali: {
    spots: {
      "discover-rwanda-hostel": {
        address: "KN 14 Avenue, Kacyiru, Kigali, Rwanda",
        mapsQuery: "Discover Rwanda Youth Hostel, Kigali",
        description: "A hostel in the leafy Kacyiru district that was set up to support the Aegis Trust, the charity behind the Kigali Genocide Memorial. There are dorms and private rooms, breakfast is included, and there's a garden, bar and restaurant. It's a calm, central base with easy moto and taxi access to the rest of the city.",
      },
      "question-coffee-kigali": {
        address: "KG 8 Avenue, Gishushu, Kigali, Rwanda",
        mapsQuery: "Question Coffee Gishushu, Kigali",
        description: "A specialty café and social enterprise in Gishushu that works with Rwandan women coffee farmers, supporting them with training and fairer incomes. The coffee is excellent and comes from Rwanda's own highlands, and the bright space is good for working. It also runs barista training and coffee-tasting sessions for visitors.",
      },
      "kigali-genocide-memorial": {
        address: "Gisozi, Kigali, Rwanda",
        website: "https://kgm.rw/visit/",
        mapsQuery: "Kigali Genocide Memorial",
        description: "The memorial and museum to the 1994 genocide against the Tutsi, where more than 250,000 victims are buried. Its exhibitions explain the history, the genocide and the reconciliation that followed. Entry is free; it's open daily 9am–5pm (from 1pm on the last Saturday of the month, for Umuganda). Allow at least two hours.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
