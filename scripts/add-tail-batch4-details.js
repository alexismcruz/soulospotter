// Small-city tail, batch 4: Havana, Rincón, Santiago de Cuba, San Juan, Cabarete, Samaná, Kingston, Negril.
// Researched 2026-09-25.
//
// DELETED: "Casa Particular Habana Vieja" (a generic label, not a real business); "Bagua Café" Cabarete (no trace
//   anywhere — Cabarete's known bowl/smoothie cafés are others).
// RENAMED: "Casa Colonial Santiago" → Casa Colonial 1893 (restored colonial house ~200m from Parque Céspedes).
// CORRECTED: Casa El Paraíso is a clifftop eco-lodge in Las Galeras above Samaná Bay; St Pauli is at Enramada 605;
//   Casa Sol B&B is 316 Calle del Sol; Reggae Hostel is 8 Burlington Ave; Judy House is on West Land Mountain Rd.
//
//   node scripts/add-tail-batch4-details.js [--apply]
const run = require("./_enrich-runner");

run({
  havana: {
    delete: ["casa-particular-habana-vieja"],
    spots: {
      "la-guarida-havana": {
        address: "Calle Concordia 418, Centro Habana, Havana, Cuba",
        mapsQuery: "La Guarida, Havana",
        description: "Havana's most famous paladar (private restaurant), on the top floors of a grand, crumbling 1913 mansion in Centro Habana, reached by a sweeping marble staircase. It became known as a location in the film 'Fresa y Chocolate'. The refined Cuban-fusion menu and rooftop bar with city views make it a special night out — book well ahead.",
      },
      "malecon-havana": {
        address: "Malecón, Havana, Cuba",
        mapsQuery: "Malecón, Havana",
        description: "Havana's 8km seafront boulevard and sea wall, running from Old Havana to Vedado. At sunset and into the night it becomes the city's living room: fishermen, couples, musicians and friends sit along the wall while waves splash over in winter. Walk a stretch from the Castillo de San Salvador de la Punta towards Vedado as the light fades.",
      },
    },
  },
  rincon: {
    spots: {
      "lazy-parrot-inn-rincon": {
        address: "Rincón, Puerto Rico",
        mapsQuery: "Lazy Parrot Inn, Rincon",
        description: "A colourful, casual inn on the hillside above Rincón's coast, with a pool, a restaurant and bar, and simple rooms. It's a relaxed base for surfing the town's famous breaks, whale watching from the lighthouse park in winter, and catching the sunsets Rincón is known for. A short drive from the beaches.",
      },
      "the-english-rose-rincon": {
        address: "Barrio Puntas, Rincón, Puerto Rico",
        mapsQuery: "The English Rose, Rincon",
        description: "A popular breakfast and brunch spot perched on the hills above Rincón, with big ocean views from its terrace. Hearty breakfasts, pancakes and coffee draw a crowd of surfers and visitors, so expect a wait at weekends. The road up is steep and narrow — take it slowly, or catch a ride.",
      },
      "domes-beach-rincon": {
        address: "Domes Beach, Rincón, Puerto Rico",
        mapsQuery: "Domes Beach, Rincon",
        description: "A well-known surf break named after the dome of the decommissioned BONUS nuclear reactor on the headland beside it. In winter, swells bring powerful waves for experienced surfers, and humpback whales can often be spotted offshore from the nearby lighthouse park. It's also a lovely place to watch the sunset, even if you don't surf.",
      },
    },
  },
  "santiago-de-cuba": {
    spots: {
      "casa-colonial-santiago": {
        name: "Casa Colonial 1893",
        address: "Historic centre, about 200m from Parque Céspedes, Santiago de Cuba, Cuba",
        mapsQuery: "Casa Colonial 1893, Santiago de Cuba",
        description: "A restored colonial house turned casa particular in the historic centre, about two blocks from Parque Céspedes, keeping its original architecture and furniture around a large hall and interior patio. The rooms are big and comfortable, and the hosts can provide breakfast, lunch and dinner. A central, characterful base for exploring the city.",
      },
      "st-pauli-santiago-cuba": {
        name: "St. Pauli",
        address: "Calle Enramada 605, Santiago de Cuba, Cuba",
        mapsQuery: "St. Pauli, Santiago de Cuba",
        description: "A bar-restaurant on the busy Enramada shopping street, named after Hamburg's famous St. Pauli district, which inspired its owners. The menu ranges from Spanish ham platters to Cuban pork dishes and chickpea stew, and there's a lively bar with cocktails, music and billiards. A good spot for dinner and a drink in the city centre.",
      },
      "castillo-del-morro-santiago": {
        address: "Castillo de San Pedro de la Roca, Santiago de Cuba, Cuba",
        mapsQuery: "Castillo del Morro, Santiago de Cuba",
        description: "Castillo de San Pedro de la Roca, a 17th-century fortress on the cliffs at the entrance to Santiago's bay and a UNESCO World Heritage Site, built to defend the city from pirates. Its terraces, ramparts and museum give sweeping Caribbean views, and a cannon-firing ceremony is held at sunset. It's about 10km from the centre by taxi.",
      },
    },
  },
  "san-juan": {
    spots: {
      "casa-sol-bb-san-juan": {
        address: "316 Calle del Sol, Old San Juan 00901, Puerto Rico",
        website: "https://casasolbnb.com/",
        description: "A small bed and breakfast in a restored colonial house on Calle del Sol, in the heart of Old San Juan, with a handful of rooms around an interior courtyard and breakfast included. The blue cobblestone streets, El Morro, the plazas and the old city's restaurants and bars are all within an easy walk — a charming, personal base.",
      },
      "deaverdura-san-juan": {
        address: "Calle del Sol, Old San Juan, Puerto Rico",
        mapsQuery: "Deaverdura, Old San Juan",
        description: "A small, much-loved restaurant in Old San Juan serving Puerto Rican home cooking, with a menu that changes daily: rice and beans, stews, pork, plantains and the island's classic sides. It's casual, good value and popular with locals at lunchtime, so arrive early. A great way to try everyday criollo food alone.",
      },
      "castillo-del-morro-san-juan": {
        address: "501 Calle Norzagaray, Old San Juan, Puerto Rico",
        mapsQuery: "Castillo San Felipe del Morro",
        description: "A massive six-level Spanish fortress begun in the 16th century at the tip of Old San Juan, guarding the entrance to San Juan Bay. It's part of San Juan National Historic Site and a UNESCO World Heritage Site. Explore the ramparts, tunnels and lighthouse, and join the locals flying kites on the huge lawn in front at weekends.",
      },
    },
  },
  cabarete: {
    delete: ["bagua-cafe-cabarete"],
    spots: {
      "kite-beach-hotel-cabarete": {
        address: "Kite Beach, Cabarete, Puerto Plata, Dominican Republic",
        mapsQuery: "Kite Beach Hotel, Cabarete",
        description: "A relaxed beachfront hotel on Kite Beach at the western end of Cabarete, where kitesurfing schools line the sand. Rooms and apartments face the water, and there's a pool and restaurant. It's ideal if you're taking lessons or want to watch the kites from breakfast; the town's bars and restaurants are a short walk or taxi away.",
      },
      "cabarete-bay": {
        address: "Cabarete Bay, Cabarete, Puerto Plata, Dominican Republic",
        mapsQuery: "Cabarete Beach",
        description: "A crescent bay on the Dominican Republic's north coast, known worldwide for steady trade winds that make it one of the Caribbean's top spots for kitesurfing and windsurfing. Schools offer lessons for beginners, and the beach is lined with restaurants and bars that come alive in the evening, with tables right on the sand.",
      },
    },
  },
  samana: {
    spots: {
      "casa-el-paraiso-samana": {
        address: "Las Galeras, Samaná, Dominican Republic",
        mapsQuery: "Casa El Paraiso, Las Galeras",
        description: "A rustic eco-lodge built from local materials on the cliffs above Samaná Bay near Las Galeras, with guest rooms in separate bungalows around a large tropical garden, an infinity pool and a terrace with sweeping views. There's a restaurant serving Caribbean dishes. A peaceful base for the peninsula's beaches and whale-watching season.",
      },
      "el-cabito-samana": {
        address: "Las Galeras, Samaná, Dominican Republic",
        mapsQuery: "El Cabito, Las Galeras",
        description: "A cliff-edge restaurant and bar at the tip of the Las Galeras headland, with views straight out over the Atlantic. It serves fresh seafood and simple dishes, and it's one of the best places on the peninsula to watch the sunset — and, from January to March, to spot humpback whales from land. The road in is rough, so go by taxi or moto.",
      },
      "el-limon-waterfall": {
        address: "El Limón, Samaná, Dominican Republic",
        mapsQuery: "Salto El Limón, Samaná",
        description: "A roughly 40m waterfall in the hills of the Samaná peninsula, reached by a walk or horse ride of about an hour through forest and plantations from the village of El Limón. You can swim in the pool at the base. Choose a reputable operator for the horses, wear shoes with grip, and go in the morning before the tour groups.",
      },
    },
  },
  kingston: {
    spots: {
      "reggae-hostel-kingston": {
        address: "8 Burlington Avenue, New Kingston, Jamaica",
        mapsQuery: "Reggae Hostel, Kingston",
        description: "A budget hostel on Burlington Avenue in New Kingston, the city's commercial district, with dorms, private rooms, a bar and common areas. Staff help arrange tours to the Bob Marley Museum, Trench Town and the Blue Mountains. It's a practical, sociable base; use taxis rather than walking far at night in Kingston.",
      },
      "devon-house-kingston": {
        address: "26 Hope Road, Kingston, Jamaica",
        mapsQuery: "Devon House, Kingston",
        description: "An 1881 mansion built by George Stiebel, Jamaica's first Black millionaire, set in gardens on Hope Road and open for guided tours. Most locals come for Devon House I-Scream, a famous Jamaican ice-cream parlour, and the bakery's patties, eaten on the lawns in the shade. An easy, relaxed stop on the way to the Bob Marley Museum.",
      },
      "bob-marley-museum": {
        address: "56 Hope Road, Kingston, Jamaica",
        mapsQuery: "Bob Marley Museum, Kingston",
        description: "Bob Marley's former home and recording studio at 56 Hope Road, now a museum. Guided tours take you through his rooms, gold records and the kitchen where he was shot in 1976 — the bullet holes remain. It's a moving visit for any music fan; tours run regularly through the day, and photography is restricted inside.",
      },
    },
  },
  negril: {
    spots: {
      "judy-house-negril": {
        address: "West Land Mountain Road, Negril, Jamaica",
        mapsQuery: "The Judy House, Negril",
        description: "A laid-back guesthouse and backpacker hostel on a leafy garden property off West Land Mountain Road, about a 10-minute walk from the sea. There are dorms, private rooms and cottages, hammocks and a kitchen, and the hosts help with tours around the west of the island. A friendly, affordable base in an otherwise pricey resort town.",
      },
      "seven-mile-beach-negril": {
        address: "Norman Manley Boulevard, Negril, Jamaica",
        mapsQuery: "Seven Mile Beach, Negril",
        description: "Negril's long sweep of white sand and calm, clear water along Long Bay, lined with hotels, beach bars and restaurants. It's great for swimming and long walks, especially early in the morning. Expect vendors offering everything from boat trips to souvenirs — a firm, friendly 'no thanks' works. Sunsets here are superb.",
      },
      "ricks-cafe-negril": {
        address: "West End Road, Negril, Jamaica",
        mapsQuery: "Rick's Cafe, Negril",
        description: "A famous bar and restaurant on the cliffs of Negril's West End, where locals and brave visitors leap into the sea from ledges of varying height while a live band plays. It's busy and touristy, but the sunset atmosphere is unique. Arrive in the late afternoon for a good spot, and only jump from heights you're comfortable with.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
