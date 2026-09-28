// Thin cities, batch 1 — NEW verified spots for cities left with 1–2 spots after the fabrication cleanup:
// Cabo Polonio, Areguá, Morrocoy, Queenstown, Byron Bay, Asunción, Paysandú, San Bernardino. Researched 2026-09-28.
//
// Sources: Viejo Lobo — turismorocha.gub.uy + viejolobohostel.com (open all year, 20m from Playa La Calavera);
//   La Perla del Cabo — laperladelcabo.com (since 1970, adults-only, chef Malen Denuncio); Terracota — terracota.com.py;
//   Cerro Kõi — natural monument (1993), pentagonal/hexagonal sandstone; Posada Los Cocos (Tucacas) — booking
//   listings (pool, restaurant); Cayo Sal — 10 min by boat from Chichiriviche, salina behind the cay; Nomads
//   Queenstown — nomadsworld.com (100m from the lake, sauna, cinema; Searle Lane noise); YHA Byron Bay — yha.com.au
//   (7 Carlyle St, heated pool); Loma San Jerónimo — Asunción's first tourist barrio (2013); Basílica de Paysandú —
//   National Historic Monument (altar 1884, Buscaglia frescoes from 1898, 1689 Jesuit bell); Los Alpes —
//   losalpes.com.py (the town's most traditional hotel-restaurant, garden).
//
//   node scripts/add-thin-batch1-spots.js [--apply]
const run = require("./_add-runner");

const VE_NOTE = "Several governments advise against travel to Venezuela; check current advisories before planning a trip.";

run({
  "cabo-polonio": [
    {
      slug: "viejo-lobo-hostel-cabo-polonio", name: "Viejo Lobo Hostel", category: "ACCOMMODATION", priceRange: "BUDGET",
      meetPeople: true, address: "Centre of Cabo Polonio, near the truck terminal, Rocha, Uruguay",
      website: "http://viejolobohostel.com/", mapsQuery: "Viejo Lobo Hostel, Cabo Polonio",
      description: "A simple hostel open all year in the middle of Cabo Polonio, about 20m from Playa La Calavera and close to where the 4x4 trucks arrive, with doubles and small dorms, two kitchens, a wood stove, hammocks and summer bonfires. With no mains electricity in the village, it's a cosy, sociable way to experience the cape.",
      tags: ["hostel", "beach", "off-grid", "social"],
    },
    {
      slug: "la-perla-del-cabo", name: "La Perla del Cabo", category: "FOOD", priceRange: "HIGH",
      address: "Playa La Calavera, Cabo Polonio, Rocha, Uruguay",
      website: "https://laperladelcabo.com/en/restaurant", mapsQuery: "La Perla del Cabo, Cabo Polonio",
      description: "A beachfront hotel and restaurant running since 1970, a few steps from Playa La Calavera, whose kitchen serves the most refined food on the cape — fresh fish and local produce with Mediterranean and Asian touches. It's pricier than the village's simple eateries, but a memorable dinner with the sound of the waves.",
      tags: ["seafood", "beachfront", "splurge"],
    },
  ],
  aregua: [
    {
      slug: "terracota-aregua", name: "Terracota Café Resto", category: "CAFE", priceRange: "MID",
      address: "Historic centre, Areguá, Central, Paraguay",
      website: "https://terracota.com.py/", mapsQuery: "Terracota Café Resto, Areguá",
      description: "A café-restaurant in a restored historic house in Areguá, with indoor rooms and garden seating, serving breakfast, brunch, lunch, afternoon tea and dinner, from Paraguayan classics to international dishes. It's a relaxing stop between the town's pottery shops and a walk up Cerro Kõi.",
      tags: ["historic-house", "garden", "brunch"],
    },
    {
      slug: "cerro-koi-aregua", name: "Cerro Kõi", category: "NATURE", priceRange: "FREE",
      address: "Cerro Kõi Natural Monument, Areguá, Central, Paraguay",
      mapsQuery: "Cerro Kõi, Areguá",
      description: "A small hill above Areguá protected since 1993 for its rare sandstone formations, which have broken into pentagonal and hexagonal columns — a phenomenon found in very few places in the world. A marked trail of about an hour and a half leads through the forest to a lookout over Lake Ypacaraí.",
      tags: ["hiking", "geology", "viewpoint"],
    },
  ],
  morrocoy: [
    {
      slug: "posada-los-cocos-tucacas", name: "Posada Los Cocos Morrocoy", category: "ACCOMMODATION", priceRange: "MID",
      address: "Tucacas, Falcón, Venezuela",
      mapsQuery: "Posada Los Cocos Morrocoy, Tucacas",
      description: "A posada in Tucacas, a few minutes from the boat piers for Morrocoy National Park, with air-conditioned rooms, a garden, an outdoor pool and a restaurant. It's a comfortable base for day trips to the cays by lancha. Check recent reviews and arrange boats through the posada. " + VE_NOTE,
      tags: ["posada", "pool", "base-for-cays"],
    },
    {
      slug: "cayo-sal-morrocoy", name: "Cayo Sal", category: "NATURE", priceRange: "BUDGET",
      address: "Morrocoy National Park, about 1km off Chichiriviche, Falcón, Venezuela",
      mapsQuery: "Cayo Sal, Chichiriviche",
      description: "A palm-fringed cay about ten minutes by boat from Chichiriviche, with white sand and calm, clear water, and behind it a small salt lagoon where visitors float in the salty water. Boats leave from the Chichiriviche pier; agree the return time with your boatman and bring water and shade. " + VE_NOTE,
      tags: ["cay", "beach", "salt-lagoon"],
    },
  ],
  queenstown: [
    {
      slug: "nomads-queenstown", name: "Nomads Queenstown", category: "ACCOMMODATION", priceRange: "BUDGET",
      meetPeople: true, address: "Church Street, Queenstown, New Zealand",
      website: "https://nomadsworld.com/new-zealand/nomads-queenstown/", mapsQuery: "Nomads Queenstown",
      description: "A big, central hostel about 100m from Lake Wakatipu, with dorms and private rooms (some with lake or mountain views), a modern kitchen, a cinema room, a lounge with fireplace, a sauna and a travel desk for bungy, jet boats and ski trips. Rooms facing Searle Lane get bar noise at weekends — ask for the Church Street side.",
      tags: ["hostel", "central", "social", "sauna"],
    },
  ],
  "byron-bay": [
    {
      slug: "yha-byron-bay", name: "YHA Byron Bay", category: "ACCOMMODATION", priceRange: "BUDGET",
      meetPeople: true, address: "7 Carlyle Street, Byron Bay, NSW, Australia",
      website: "https://www.yha.com.au/hostels/nsw/byron-bay-and-surrounds/byron-bay-yha-backpackers-hostel/",
      mapsQuery: "YHA Byron Bay",
      description: "A resort-style hostel in central Byron Bay, under ten minutes' walk from Main Beach, with a heated outdoor pool, barbecue area, communal kitchen, games room and lounge, plus dorms and private rooms. It's a relaxed, well-run budget base and an easy place to find company for the lighthouse walk.",
      tags: ["hostel", "pool", "central"],
    },
  ],
  asuncion: [
    {
      slug: "loma-san-jeronimo-asuncion", name: "Loma San Jerónimo", category: "CULTURE", priceRange: "FREE",
      address: "Barrio Loma San Jerónimo, Asunción, Paraguay",
      mapsQuery: "Loma San Jerónimo, Asunción",
      description: "One of Asunción's oldest neighbourhoods, on a hill near the port, declared the city's first tourist barrio in 2013. Its narrow stairways and alleys are lined with brightly painted houses, murals and small bars. Visit in daytime or on a local guided walk, as it's still a working-class residential area.",
      tags: ["colourful", "street-art", "walking"],
    },
  ],
  paysandu: [
    {
      slug: "basilica-paysandu", name: "Basílica Nuestra Señora del Rosario", category: "CULTURE", priceRange: "FREE",
      address: "Montecaseros between 18 de Julio and Florida, facing Plaza Constitución, Paysandú, Uruguay",
      mapsQuery: "Basílica Nuestra Señora del Rosario, Paysandú",
      description: "Paysandú's basilica and National Historic Monument, facing Plaza Constitución, with a main altar from 1884, frescoes begun by Antonio Buscaglia in 1898 and a Walker organ from 1906. Outside hangs a large bell cast in 1689 by Guaraní craftsmen at the Jesuit mission of San Nicolás.",
      tags: ["church", "history", "architecture"],
    },
  ],
  "san-bernardino": [
    {
      slug: "los-alpes-san-bernardino", name: "Hotel Restaurante Los Alpes", category: "FOOD", priceRange: "MID",
      address: "San Bernardino, Cordillera, Paraguay",
      website: "https://www.losalpes.com.py/sanber-2/", mapsQuery: "Hotel Restaurante Los Alpes, San Bernardino",
      description: "The restaurant of San Bernardino's most traditional hotel, with a garden and pool, serving Paraguayan classics alongside international dishes and good breakfasts. It's open to non-guests and a pleasant, reliable place for a solo lunch in the lakeside resort town founded by German settlers.",
      tags: ["garden", "paraguayan", "traditional"],
    },
  ],
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
