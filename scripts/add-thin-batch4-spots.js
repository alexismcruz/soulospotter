// Thin cities, batch 4 — NEW verified spots: El Tunco, Cabarete, Speightstown, El Zonte, Tofo, Bwindi, Masai Mara,
// Encarnación. Researched 2026-09-28.
//
// Sources: Dale Dale Café — elsalvador.travel (Calle Principal km 43, Playa El Tunco); La Casita de Papi — beachfront
//   Creole hut in central Cabarete, seafood, Tue–Sun 1–11pm (Petit Futé, local guides); Little Good Harbour —
//   family-run boutique hotel in 17th-century Fort Rupert, Shermans, north of Speightstown (littlegoodharbourbarbados.com);
//   Canegue Café — beachfront café, weekly-changing brunch menu (Tripadvisor/HappyCow); Branko's — family restaurant
//   by Tofo market, seafood on a hot rock and wood-fired pizza; Ride 4 a Woman — women's community project in Buhoma
//   since 2009, founded by Evelyn and Denis Habasa (ride4awoman.org); Mara Triangle — ~510 km² western third of the
//   reserve run by the Mara Conservancy, entered via Oloololo Gate (maratriangle.org); Trinidad — UNESCO 648 Jesuit
//   Missions of La Santísima Trinidad de Paraná and Jesús de Tavarangue.
//
//   node scripts/add-thin-batch4-spots.js [--apply]
const run = require("./_add-runner");

run({
  "el-tunco": [
    {
      slug: "dale-dale-cafe-el-tunco", name: "Dale Dale Café", category: "CAFE", priceRange: "BUDGET",
      address: "Calle Principal km 43, Playa El Tunco, Tamanique, La Libertad, El Salvador",
      website: "https://elsalvador.travel/esp/en/dale-dale-cafe/", mapsQuery: "Dale Dale Café, El Tunco",
      description: "A relaxed, popular café on El Tunco's main street, good for breakfast, brunch or coffee, with a varied menu that includes Salvadoran dishes, smoothies and good local coffee, and views towards the mangroves and sea. It's an easy place to linger alone between surf sessions or before a day trip.",
      tags: ["breakfast", "coffee", "surf-town"],
    },
  ],
  cabarete: [
    {
      slug: "la-casita-de-papi", name: "La Casita de Papi", category: "FOOD", priceRange: "MID",
      address: "On the beach, central Cabarete, Puerto Plata, Dominican Republic",
      mapsQuery: "La Casita de Papi, Cabarete",
      description: "A rustic wooden Creole-style hut on the sand in the centre of Cabarete, known for its seafood — langostinos, ceviche, tuna tartare and grilled lobster with the house 'Papi' sauce — served by candlelight with tables on the beach. It opens from lunchtime to late, Tuesday to Sunday; reserve for sunset.",
      tags: ["seafood", "beachfront", "romantic"],
    },
  ],
  speightstown: [
    {
      slug: "little-good-harbour", name: "Little Good Harbour", category: "ACCOMMODATION", priceRange: "HIGH",
      address: "Shermans, St Peter, just north of Speightstown, Barbados",
      website: "https://www.littlegoodharbourbarbados.com/", mapsQuery: "Little Good Harbour, Barbados",
      description: "A family-run boutique hotel on the quiet north-west coast, built around the remains of the 17th-century Fort Rupert, with about 20 suites with kitchens, two pools, bars and the Fish Pot restaurant. It's peaceful and self-catering-friendly, a short drive from Speightstown's historic streets.",
      tags: ["boutique", "historic-fort", "seafront", "self-catering"],
    },
  ],
  "el-zonte": [
    {
      slug: "canegue-cafe-el-zonte", name: "Canegue Café", category: "CAFE", priceRange: "BUDGET",
      address: "Beachfront, El Zonte, Chiltiupán, La Libertad, El Salvador",
      mapsQuery: "Canegue Café, El Zonte",
      description: "A small beachfront café known for excellent coffee and a minimal breakfast-and-brunch menu that changes weekly, with a savoury and a sweet dish each day. Try the horchata-cocoa coffee drink. It has a laid-back surf-town feel and a little balcony with sea views — a lovely spot for a solo morning.",
      tags: ["coffee", "brunch", "beachfront"],
    },
  ],
  tofo: [
    {
      slug: "brankos-tofo", name: "Branko's", category: "FOOD", priceRange: "BUDGET",
      address: "By the market, Tofo, Inhambane, Mozambique",
      mapsQuery: "Branko's, Tofo",
      description: "A small, family-run restaurant on the edge of Tofo's market, one of the village's best-loved places to eat, known for wood-fired pizzas and seafood and meat that you grill yourself on a hot stone at the table. Prices are low and the atmosphere friendly — ideal after a day of diving.",
      tags: ["seafood", "pizza", "local", "value"],
    },
  ],
  bwindi: [
    {
      slug: "ride-4-a-woman-bwindi", name: "Ride 4 a Woman", category: "COMMUNITY", priceRange: "BUDGET",
      meetPeople: true, address: "Buhoma, near Bwindi Impenetrable National Park, Kanungu, Uganda",
      website: "https://www.ride4awoman.org/", mapsQuery: "Ride 4 a Woman, Buhoma",
      description: "A community organisation founded in 2009 in Buhoma to support local women, running a centre where women weave baskets and sew, a craft shop, guest rooms, and village walks, cooking classes and bike rides with local guides. A meaningful way to spend the day before or after gorilla trekking.",
      tags: ["community-tourism", "crafts", "village-walk", "women-led"],
    },
  ],
  "masai-mara": [
    {
      slug: "mara-triangle", name: "Mara Triangle", category: "NATURE", priceRange: "HIGH",
      address: "Western Maasai Mara National Reserve (via Oloololo Gate), Narok, Kenya",
      website: "https://www.maratriangle.org/experience-mara-triangle", mapsQuery: "Mara Triangle, Maasai Mara",
      description: "The western third of the Maasai Mara reserve, about 510 km² between the Oloololo Escarpment, the Mara River and the Tanzanian border, managed by the non-profit Mara Conservancy. It has good roads, fewer vehicles and some of the best river-crossing points of the Great Migration (roughly July to October).",
      tags: ["safari", "great-migration", "conservancy"],
    },
  ],
  encarnacion: [
    {
      slug: "trinidad-jesuit-ruins", name: "Jesuit Ruins of Trinidad", category: "CULTURE", priceRange: "BUDGET",
      address: "Trinidad, Itapúa, about 30km north-east of Encarnación, Paraguay",
      website: "https://whc.unesco.org/en/list/648/", mapsQuery: "Misiones Jesuíticas de Trinidad, Paraguay",
      description: "The impressive remains of the 18th-century Jesuit mission of La Santísima Trinidad de Paraná, a UNESCO World Heritage Site, with a great church decorated with carved angels, and the nearby unfinished mission of Jesús de Tavarangue. Reach them by bus from Encarnación; stay for the evening light show if it's running.",
      tags: ["unesco", "jesuit-missions", "history", "day-trip"],
    },
  ],
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
