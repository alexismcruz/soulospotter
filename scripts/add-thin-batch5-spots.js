// Thin cities, batch 5 — NEW verified spots: Kidepo Valley, Merzouga, Tegucigalpa. Researched 2026-09-28.
//
// Sources: Kanangorok hot springs — far north of Kidepo near the South Sudan border, ~90 min drive from Apoka; name
//   means "place of black stones" in Karamojong (park guides, Wikipedia); Kasbah Mohayut — hotelmohayut.com
//   (Hassilabied, 20 air-conditioned rooms, pool facing the dunes); Palmira Hostel — Av. Juan Lindo 412, Colonia
//   Palmira, rooftop terrace (Tripadvisor, Trip.com).
//
//   node scripts/add-thin-batch5-spots.js [--apply]
const run = require("./_add-runner");

run({
  "kidepo-valley": [
    {
      slug: "kanangorok-hot-springs", name: "Kanangorok Hot Springs", category: "NATURE", priceRange: "MID",
      address: "Northern Kidepo Valley National Park, near the South Sudan border, Uganda",
      mapsQuery: "Kanangorok Hot Springs, Kidepo",
      description: "Hot springs in the remote far north of Kidepo, about 90 minutes' drive from Apoka across the Kidepo River valley, where hot water bubbles up between dark rocks — Kanangorok means 'place of black stones' in Karamojong. The drive through wild savannah is part of the appeal. Go with a UWA ranger and a 4x4.",
      tags: ["hot-springs", "remote", "game-drive"],
    },
  ],
  merzouga: [
    {
      slug: "kasbah-mohayut", name: "Kasbah Mohayut", category: "ACCOMMODATION", priceRange: "MID",
      address: "Hassilabied, Merzouga, Errachidia, Morocco",
      website: "https://www.hotelmohayut.com/", mapsQuery: "Kasbah Mohayut, Merzouga",
      description: "A restored kasbah-style hotel at the foot of the Erg Chebbi dunes in the village of Hassilabied, with about 20 air-conditioned rooms and a pool looking straight onto the sand. It's a comfortable base before or after a camel trek and night in a desert camp, which the hotel can arrange.",
      tags: ["kasbah", "dunes", "pool", "desert"],
    },
  ],
  tegucigalpa: [
    {
      slug: "palmira-hostel-tegucigalpa", name: "Palmira Hostel", category: "ACCOMMODATION", priceRange: "BUDGET",
      meetPeople: true, address: "Av. Juan Lindo 412, Colonia Palmira, Tegucigalpa, Honduras",
      mapsQuery: "Palmira Hostel, Tegucigalpa",
      description: "One of the few hostels in Tegucigalpa, in the Colonia Palmira district of embassies and restaurants, with dorms and private rooms and a rooftop terrace with city views. It's a practical, safer-area base for a night or two in the capital; use taxis or ride-hailing rather than walking after dark.",
      tags: ["hostel", "rooftop", "safer-area"],
    },
  ],
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
