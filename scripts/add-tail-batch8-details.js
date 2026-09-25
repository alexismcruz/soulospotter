// Small-city tail, batch 8: San Bernardino, Cabo Polonio, Puerto Escondido, Guadalajara, Utila, Tulum,
// León (Nicaragua), San Juan del Sur. Researched 2026-09-25.
//
// DELETED (6):
//   - Cervecería Sajonia Lakeside, San Bernardino: Sajonia is an Asunción brewery (Good Beer Hunting, Tripadvisor);
//     no lakeside branch in San Bernardino.
//   - Posada de los Corsarios and Lo de Tato, Cabo Polonio: no trace on any listing or local directory.
//   - Selina Puerto Escondido: reported closed; not among the rebranded Socialtel properties.
//   - Café de la Flor, Guadalajara: a Tijuana café chain; no Guadalajara/Colonia Americana branch.
//   - El Mississippi, León: only a bare directory stub; nothing to verify the description.
// CORRECTED: Hospedarte Centro is at Calle Maestranza 147, 3 minutes from the cathedral.
//
//   node scripts/add-tail-batch8-details.js [--apply]
const run = require("./_enrich-runner");

run({
  "san-bernardino": {
    delete: ["cerveceria-sajonia-sanber"],
    spots: {
      "hotel-del-lago-sanber": {
        address: "San Bernardino, Cordillera, Paraguay",
        mapsQuery: "Hotel del Lago, San Bernardino, Paraguay",
        description: "A historic lakeside hotel in San Bernardino, the resort town founded by German settlers on Lake Ypacaraí about 50km east of Asunción. With its wide verandas, antique furniture and gardens, it has an atmosphere of faded 19th-century grandeur. A peaceful weekday retreat; weekends in summer fill up with Asunción families.",
      },
      "lago-ypacarai-shore": {
        address: "San Bernardino, Cordillera, Paraguay",
        mapsQuery: "Lago Ypacaraí, San Bernardino",
        description: "Paraguay's best-known lake, celebrated in the famous song 'Recuerdos de Ypacaraí', with San Bernardino on its eastern shore as the country's favourite summer escape from Asunción. Walk the lakefront, watch the sunset over the water, and sample the town's German-influenced cafés and bakeries. Swimming depends on water quality — ask locally.",
      },
    },
  },
  "cabo-polonio": {
    delete: ["posada-corsarios-cabo-polonio", "lo-de-tato-cabo-polonio"],
    spots: {
      "cabo-polonio-lighthouse": {
        address: "Cabo Polonio, Rocha, Uruguay",
        mapsQuery: "Faro de Cabo Polonio",
        description: "A remote headland village inside a national park on Uruguay's Atlantic coast, reached only by 4x4 trucks across the dunes from the park entrance on Route 10. There's no mains electricity, so the lighthouse and the stars dominate at night. Climb the lighthouse for views, and watch the large sea-lion colony on the rocks below it.",
      },
    },
  },
  "puerto-escondido": {
    delete: ["selina-puerto-escondido"],
    spots: {
      "almoraduz-puerto-escondido": {
        address: "Puerto Escondido, Oaxaca, Mexico",
        mapsQuery: "Almoraduz, Puerto Escondido",
        description: "One of Puerto Escondido's most acclaimed restaurants, serving a creative tasting menu and à la carte dishes built on Oaxacan coastal ingredients, local fish and heirloom corn. It's a step up from the surf-town taquerias and worth booking for a special dinner; there's a quieter, relaxed atmosphere that suits a solo meal.",
      },
      "playa-zicatela": {
        address: "Playa Zicatela, Puerto Escondido, Oaxaca, Mexico",
        mapsQuery: "Playa Zicatela",
        description: "The long beach whose powerful break, nicknamed the 'Mexican Pipeline', draws big-wave surfers from around the world. The currents are dangerous for swimming, so enjoy it from the sand or a beachfront café; beginners learn at calmer Playa Carrizalillo nearby. The strip behind the beach is lined with hostels, bars and restaurants.",
      },
    },
  },
  guadalajara: {
    delete: ["cafe-de-la-flor-guadalajara"],
    spots: {
      "hospedarte-centro-guadalajara": {
        address: "Calle Maestranza 147, Centro, Guadalajara, Jalisco, Mexico",
        mapsQuery: "Hostel Hospedarte Centro, Guadalajara",
        description: "A colourful, sociable hostel in Guadalajara's historic centre, about three minutes' walk from the cathedral and Plaza de Armas, with dorms and private rooms, a shared kitchen and a daily breakfast. Staff help arrange trips to Tequila, Tlaquepaque and lucha libre nights, making it an easy base for meeting other travellers.",
      },
      "mercado-san-juan-de-dios": {
        address: "Calzada Independencia Sur, Centro, Guadalajara, Jalisco, Mexico",
        mapsQuery: "Mercado San Juan de Dios, Guadalajara",
        description: "Guadalajara's huge three-storey covered market, often called the largest indoor market in Latin America, next to the Hospicio Cabañas. The upper floor is a maze of food stalls — try a torta ahogada or birria — while other floors sell produce, leather, electronics and crafts. Busy and chaotic; keep valuables close.",
      },
    },
  },
  utila: {
    spots: {
      "utila-dive-centre-lodge": {
        address: "Utila, Bay Islands, Honduras",
        mapsQuery: "Utila Dive Centre",
        description: "One of Utila's long-established dive schools, with waterfront lodging for students, on an island famous for some of the cheapest dive certification courses in the world. The waters around Utila are also known for whale-shark sightings, especially from March to April and again later in the year. A sociable base for learning to dive.",
      },
      "rjs-bbq-utila": {
        address: "Utila Town, Bay Islands, Honduras",
        mapsQuery: "RJ's BBQ, Utila",
        description: "A long-running barbecue joint in Utila Town that opens only a few nights a week, grilling fresh fish, chicken and ribs over charcoal and serving them at shared tables with sides. It's cheap, generous and a classic island social meal, where divers and travellers end up chatting over dinner. Arrive early before the fish runs out.",
      },
      "bando-beach-utila": {
        address: "Utila, Bay Islands, Honduras",
        mapsQuery: "Bando Beach, Utila",
        description: "A small beach club on the edge of Utila Town with a sandy beach, loungers, a bar and snorkelling right off the shore, on an island that otherwise has few swimmable beaches near town. There's a small entry fee. It's a relaxed place to spend an afternoon between dives and watch the sunset with a drink.",
      },
    },
  },
  tulum: {
    spots: {
      "mamas-home-hostel-tulum": {
        address: "Tulum Pueblo, Quintana Roo, Mexico",
        mapsQuery: "Mama's Home Hostel, Tulum",
        description: "A friendly, colourful hostel in Tulum town, an affordable, sociable base in a destination that has become very expensive. There are dorms and private rooms, a garden and bikes to borrow or rent — handy for cycling to the ruins, the beaches and nearby cenotes. Good for meeting other travellers for group trips.",
      },
      "hartwood-tulum": {
        address: "Carretera Tulum–Boca Paila, Tulum, Quintana Roo, Mexico",
        mapsQuery: "Hartwood, Tulum",
        description: "An influential open-air restaurant on the beach road, cooking over a wood-fired oven and grill with a daily chalkboard menu of local fish, meat and Yucatán produce. It helped put Tulum on the food map and is still hard to get into, so reserve well ahead. Dinner only; prices are high but the experience is memorable.",
      },
      "tulum-mayan-ruins": {
        address: "Zona Arqueológica de Tulum, Quintana Roo, Mexico",
        mapsQuery: "Tulum Archaeological Zone",
        description: "A walled Maya city perched on cliffs above the Caribbean, one of the last to be built and occupied by the Maya, with the El Castillo temple overlooking a small beach. It's compact and very popular, so arrive at opening time before the heat and the tour buses. Bring water and a hat — there's little shade.",
      },
    },
  },
  "leon-nicaragua": {
    delete: ["el-mississippi-leon"],
    spots: {
      "bigfoot-hostel-leon": {
        address: "León, Nicaragua",
        mapsQuery: "Bigfoot Hostel, León",
        description: "A lively hostel in central León with a pool and bar, known as the place that started volcano boarding — sledding down the black ash slopes of the Cerro Negro volcano — which it still runs as a day trip. There are dorms and private rooms, and the social atmosphere makes it easy to find company for other trips.",
      },
      "catedral-de-leon": {
        address: "Parque Central, León, Nicaragua",
        mapsQuery: "Catedral de León, Nicaragua",
        description: "The largest cathedral in Central America, built in the 18th and 19th centuries and a UNESCO World Heritage Site, where the poet Rubén Darío is buried. For a small fee you can walk barefoot on the dazzling white rooftop among its domes, with views over the city to the chain of volcanoes. Go late afternoon for softer light.",
      },
    },
  },
  "san-juan-del-sur": {
    spots: {
      "pachamama-hostel-sjds": {
        address: "San Juan del Sur, Rivas, Nicaragua",
        mapsQuery: "Pachamama Hostel, San Juan del Sur",
        description: "A central, social hostel a short walk from the beach in San Juan del Sur, with dorms, private rooms, a small pool and a bar. It's closely linked to the town's famous Sunday Funday pool crawl, and staff book shuttles to the surf beaches of Maderas and Remanso. Expect a party atmosphere, especially at weekends.",
      },
      "el-gato-negro-sjds": {
        address: "San Juan del Sur, Rivas, Nicaragua",
        mapsQuery: "El Gato Negro, San Juan del Sur",
        description: "A café and bookshop in San Juan del Sur, well known for its hearty breakfasts, good coffee and shelves of new and used books in several languages. It's a calm refuge from the town's party scene and a comfortable place to read or plan the next leg of a trip.",
      },
      "playa-maderas": {
        address: "Playa Maderas, near San Juan del Sur, Nicaragua",
        mapsQuery: "Playa Maderas, Nicaragua",
        description: "A popular surf beach about 30 minutes north of San Juan del Sur, reached by daily shuttles from town, with consistent waves for beginners and intermediates, surf schools and board rental. Small restaurants and bars line the sand, and staying for sunset before the last shuttle back is a local ritual.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
