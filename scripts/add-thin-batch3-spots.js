// Thin cities, batch 3 — NEW verified spots: Semuc Champey, Salvador, La Ceiba, Dar es Salaam, Thiès, Toubab Dialaw,
// Amboseli, Maputo. Researched 2026-09-28.
//
// Sources: K'anba caves — candlelit river-cave tour (~1km, ~2h) plus tubing on the Cahabón (Lonely Planet, tour
//   operators); Acarajé da Dinha — Largo de Santana (Largo da Dinha), Rio Vermelho, stall since c.1944, Dinha
//   (Lindinalva de Assis) (Salvador tourism board, Wikipedia); Cuero y Salado — refuge est. 1987, ~30km west of
//   La Ceiba, reached by the old banana railway from La Unión, manatees (hondurastravel.com); Village Museum —
//   open-air museum on New Bagamoyo Road, 30+ traditional houses (National Museum of Tanzania); Musée régional de
//   Thiès — former Fort (1864, rebuilt 1879), museum since 1975, railway section (Petit Futé, au-senegal.com);
//   K'meleon — beach bar-restaurant-rhumerie with apartments, Toubab Dialaw beach; Ol Tukai Lodge — inside
//   Amboseli with Kilimanjaro views (oltukailodge.com); Mercado do Peixe — Av. Marginal, buy fish and have it cooked
//   next door (mozambiquetravel.com).
//
//   node scripts/add-thin-batch3-spots.js [--apply]
const run = require("./_add-runner");

run({
  "semuc-champey": [
    {
      slug: "kanba-caves-lanquin", name: "K'anba Caves", category: "NATURE", priceRange: "BUDGET",
      meetPeople: true, address: "Near Semuc Champey, Lanquín, Alta Verapaz, Guatemala",
      mapsQuery: "K'anba Cave, Lanquín",
      description: "A river cave near Semuc Champey explored by candlelight: you wade, swim and climb ladders for about a kilometre underground, holding a candle above the water, on a guided tour of around two hours. Most tours add river tubing on the Cahabón. It gets crowded, so take the earliest tour and wear shoes that can get wet.",
      tags: ["caving", "adventure", "swimming", "guided"],
    },
  ],
  salvador: [
    {
      slug: "acaraje-da-dinha", name: "Acarajé da Dinha", category: "FOOD", priceRange: "BUDGET",
      address: "Largo de Santana (Largo da Dinha), Rio Vermelho, Salvador, Bahia, Brazil",
      mapsQuery: "Acarajé da Dinha, Rio Vermelho, Salvador",
      description: "Salvador's most famous acarajé stall, on the square in bohemian Rio Vermelho now nicknamed Largo da Dinha, run by the family of the late Dinha, whose grandmother began selling here in the 1940s. The black-eyed-pea fritters are fried in dendê oil and filled with vatapá, caruru and shrimp. Busy in the evening; ask for it 'frio' if you don't want chilli.",
      tags: ["street-food", "bahian", "evening"],
    },
  ],
  "la-ceiba": [
    {
      slug: "cuero-y-salado", name: "Cuero y Salado Wildlife Refuge", category: "NATURE", priceRange: "BUDGET",
      address: "About 30km west of La Ceiba (via La Unión), Atlántida, Honduras",
      website: "https://hondurastravel.com/national-parks/things-to-do-in-cuero-y-salado-wildlife-refuge/",
      mapsQuery: "Cuero y Salado Wildlife Refuge",
      description: "A coastal refuge of mangroves, canals and lowland forest created in 1987 to protect Antillean manatees. You reach it on an old banana railway from the village of La Unión, then explore by motorboat or canoe for monkeys, crocodiles, birds and — with luck, early in the morning — manatees. Go with a guide or tour from La Ceiba.",
      tags: ["wildlife", "mangroves", "boat-trip", "manatees"],
    },
  ],
  "dar-es-salaam": [
    {
      slug: "village-museum-dar", name: "Village Museum (Makumbusho)", category: "CULTURE", priceRange: "BUDGET",
      address: "New Bagamoyo Road, Kijitonyama, Dar es Salaam, Tanzania",
      mapsQuery: "Village Museum, Dar es Salaam",
      description: "An open-air museum about 10km north of the centre, part of the National Museum of Tanzania, with more than 30 full-size traditional houses from different regions set among shady trees. You can walk into the homes and see craftspeople at work, and there are traditional dance performances on some weekends.",
      tags: ["museum", "architecture", "traditional-dance"],
    },
  ],
  thies: [
    {
      slug: "musee-regional-thies", name: "Musée Régional de Thiès", category: "CULTURE", priceRange: "BUDGET",
      address: "Former Fort, central Thiès, Senegal",
      mapsQuery: "Musée régional de Thiès",
      description: "A regional museum inside the former French fort in the centre of Thiès (built 1864, rebuilt 1879), a museum since 1975, with collections of pottery, tools, weapons and musical instruments from the pre-colonial and colonial eras, and a section on the railway that made Thiès a transport hub. Open weekdays and Saturday mornings.",
      tags: ["museum", "history", "railway"],
    },
  ],
  "toubab-dialaw": [
    {
      slug: "kmeleon-toubab-dialaw", name: "Le K'méléon", category: "FOOD", priceRange: "MID",
      address: "Toubab Dialaw beach, Thiès Region, Senegal",
      website: "https://www.facebook.com/kefrandialaw/", mapsQuery: "Le K'meleon, Toubab Dialaw",
      description: "A colourful bar-restaurant and rum bar right on the beach at Toubab Dialaw, serving grilled fish, tapas and cocktails with music, plus a few apartments facing the ocean. It's a relaxed place to spend an evening by the sea and meet the village's mix of artists, locals and visitors.",
      tags: ["beach-bar", "seafood", "music", "sunset"],
    },
  ],
  amboseli: [
    {
      slug: "ol-tukai-lodge", name: "Ol Tukai Lodge", category: "ACCOMMODATION", priceRange: "HIGH",
      address: "Inside Amboseli National Park, Kajiado County, Kenya",
      website: "https://oltukailodge.com/", mapsQuery: "Ol Tukai Lodge, Amboseli",
      description: "A long-established lodge in the heart of Amboseli National Park, with rooms looking towards Kilimanjaro or over the wetlands where elephants gather, a pool, a restaurant and bars. Being inside the park means short drives to the swamps and early-morning views of the mountain before clouds build.",
      tags: ["safari-lodge", "kilimanjaro-views", "inside-park"],
    },
  ],
  maputo: [
    {
      slug: "mercado-do-peixe-maputo", name: "Mercado do Peixe", category: "FOOD", priceRange: "MID",
      address: "Avenida Marginal, Maputo, Mozambique",
      website: "https://www.mozambiquetravel.com/blog/maputo-fish-market/", mapsQuery: "Mercado do Peixe, Maputo",
      description: "Maputo's fish market on the waterfront, where you pick fresh prawns, crab, calamari or fish from the stalls, then take it to one of the small restaurants next door to be grilled or fried for a set price per kilo, served with rice, chips or salad under umbrellas overlooking the bay. Agree prices before buying.",
      tags: ["seafood", "market", "waterfront"],
    },
  ],
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
