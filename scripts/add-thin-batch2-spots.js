// Thin cities, batch 2 — NEW verified spots: Havana, Puerto Escondido, Guadalajara, León (NI), Santa Ana (SV),
// Choroní, Cali, Manuel Antonio. Researched 2026-09-28.
//
// Sources: Hotel Ambos Mundos — gaviotahotels.com (Obispo 153; room 511 kept as a Hemingway museum); Puerto Dreams —
//   puertodreams.com (hostel, café, coworking and bar; Jacarandas 8, Sector Juárez); Hospicio Cabañas — UNESCO 815
//   (Orozco murals); Pan & Paz — French bakery-café run by a French–Dutch couple, two branches in León's centre;
//   Santa Ana volcano — Parque Nacional Los Volcanes, guided hike to the crater lake; Choroní village — colonial
//   church of Santa Clara on the road down to Puerto Colombia; Viajero Cali — hostel with pool and free daily salsa
//   classes in a colonial house in San Antonio; Wide Mouth Frog — founded 2003 as a backpackers in central Quepos,
//   now a small boutique hotel (widemouthfrog.cr).
//
//   node scripts/add-thin-batch2-spots.js [--apply]
const run = require("./_add-runner");

const VE_NOTE = "Several governments advise against travel to Venezuela; check current advisories before planning a trip.";

run({
  havana: [
    {
      slug: "hotel-ambos-mundos-havana", name: "Hotel Ambos Mundos", category: "ACCOMMODATION", priceRange: "HIGH",
      address: "Calle Obispo 153, Habana Vieja, Havana, Cuba",
      website: "https://www.gaviotahotels.com/en/hotels-in-cuba/havana/hotel-ambos-mundos",
      mapsQuery: "Hotel Ambos Mundos, Havana",
      description: "A pink 1920s hotel on Calle Obispo in Old Havana where Ernest Hemingway lived in the 1930s; his room, 511, is preserved as a small museum you can visit for a few pesos. The rooftop bar looks over the old town's rooftops to the harbour. Rooms are simple for the price, but the location is superb.",
      tags: ["historic", "hemingway", "rooftop-bar", "old-havana"],
    },
  ],
  "puerto-escondido": [
    {
      slug: "puerto-dreams-hostel", name: "Puerto Dreams", category: "ACCOMMODATION", priceRange: "BUDGET",
      meetPeople: true, address: "Jacarandas 8, Sector Juárez, Puerto Escondido, Oaxaca, Mexico",
      website: "https://www.puertodreams.com/", mapsQuery: "Puerto Dreams Hostel, Puerto Escondido",
      description: "A popular hostel, café, coworking space and bar in Puerto Escondido, with dorms and private rooms and a social, surf-and-music atmosphere. It's set in a quieter part of town, a short ride from Zicatela and Carrizalillo beaches, and a good base for solo travellers who want both community and a place to work.",
      tags: ["hostel", "coworking", "surf", "social"],
    },
  ],
  guadalajara: [
    {
      slug: "hospicio-cabanas", name: "Hospicio Cabañas", category: "CULTURE", priceRange: "BUDGET",
      address: "Cabañas 8, Plaza Tapatía, Centro, Guadalajara, Jalisco, Mexico",
      website: "https://whc.unesco.org/en/list/815/", mapsQuery: "Hospicio Cabañas, Guadalajara",
      description: "A vast neoclassical former orphanage and hospice built in the early 19th century, now a UNESCO World Heritage cultural centre. Its chapel is covered in José Clemente Orozco's powerful murals, including 'The Man of Fire' in the dome. It sits at the end of Plaza Tapatía, next to the San Juan de Dios market.",
      tags: ["unesco", "murals", "orozco", "museum"],
    },
  ],
  "leon-nicaragua": [
    {
      slug: "pan-y-paz-leon", name: "Pan & Paz", category: "CAFE", priceRange: "BUDGET",
      address: "Historic centre, León, Nicaragua",
      website: "https://www.facebook.com/panypazleon/", mapsQuery: "Pan & Paz, León, Nicaragua",
      description: "A French bakery and café run by a French–Dutch couple, with two branches in León's historic centre, baking artisan breads and pastries daily. It serves breakfasts from 7am, sandwiches, salads and quiches, coffee and local craft beers, in a colonial setting with a garden corridor and air-conditioned seating.",
      tags: ["bakery", "breakfast", "colonial", "air-conditioned"],
    },
  ],
  "santa-ana": [
    {
      slug: "santa-ana-volcano-hike", name: "Santa Ana Volcano (Ilamatepec)", category: "NATURE", priceRange: "BUDGET",
      address: "Parque Nacional Los Volcanes, Santa Ana, El Salvador",
      mapsQuery: "Volcán de Santa Ana, El Salvador",
      description: "El Salvador's highest volcano, climbed on a guided hike of about two hours each way from the Los Volcanes park entrance, ending at the rim above a steaming turquoise crater lake, with views of Lake Coatepeque and Izalco volcano. Hikes leave in the morning with police escort; bring water, layers and cash for fees.",
      tags: ["hiking", "volcano", "crater-lake", "views"],
    },
  ],
  choroni: [
    {
      slug: "pueblo-de-choroni", name: "Choroní colonial village", category: "CULTURE", priceRange: "FREE",
      address: "Choroní, Aragua, Venezuela",
      mapsQuery: "Iglesia Santa Clara, Choroní",
      description: "The quiet colonial village of Choroní, a couple of kilometres inland from the fishing port of Puerto Colombia, with pastel houses, cobbled streets and the small church of Santa Clara on its square, surrounded by cacao plantations. Walk or take a short ride from the beach for a peaceful afternoon. " + VE_NOTE,
      tags: ["colonial", "village", "cacao"],
    },
  ],
  cali: [
    {
      slug: "viajero-cali-hostel", name: "Viajero Cali Hostel & Salsa School", category: "ACCOMMODATION", priceRange: "BUDGET",
      meetPeople: true, address: "San Antonio, Cali, Valle del Cauca, Colombia",
      mapsQuery: "Viajero Cali Hostel & Salsa School",
      description: "A sociable hostel in a colonial house in the San Antonio district, with a pool and bar, dorms (including women-only) and private rooms, and its own salsa academy offering free daily classes plus private lessons. Yoga and other activities run most days — the easiest way to dive into Cali's salsa scene alone.",
      tags: ["hostel", "salsa", "pool", "social"],
    },
  ],
  "manuel-antonio": [
    {
      slug: "wide-mouth-frog-quepos", name: "Wide Mouth Frog", category: "ACCOMMODATION", priceRange: "MID",
      address: "Central Quepos, near the bus station, Puntarenas, Costa Rica",
      website: "https://widemouthfrog.cr/", mapsQuery: "Wide Mouth Frog, Quepos",
      description: "Opened in 2003 by a Kiwi–British backpacker couple as a hostel in the centre of Quepos, and now run as a small boutique hotel with tropical gardens, a pool and a restaurant. It's close to the bus station and the Pez Vela marina, with frequent buses up the hill to Manuel Antonio National Park.",
      tags: ["garden", "pool", "central", "value"],
    },
  ],
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
