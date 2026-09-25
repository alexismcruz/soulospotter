// Small-city tail, batch 6: Holetown, Jacmel, Bathsheba, Port-au-Prince, Crown Point, Speyside, Speightstown,
// Labadee. Researched 2026-09-25.
//
// DELETED: Oloffson Hotel Bar (hotel closed 2024 after a gang raid and destroyed by arson on 6 July 2025 —
//   Haitian Times, Rolling Stone); Ariel Sands Beach, Speightstown (no such beach found); Nord Coast Seafood Shacks,
//   Labadee (generic, unverifiable).
// RENAMED/CORRECTED: "Fish Net Restaurant" → The Fish Pot (the real seafront restaurant just north of Speightstown
//   at Six Men's Bay); "Bas-Bleu Waterfall" → Bassin Bleu; "Speyside Snorkeling & Manta Ray Point" → Speyside reefs
//   (Angel Reef, Japanese Gardens, Kelleston Drain); Lakou Lakay is a family guesthouse/restaurant/cultural centre
//   in Milot near the Citadelle, not Cap-Haïtien; Andromeda gardens are ~8 acres, open daily 9–4:30.
// Port-au-Prince entries carry an explicit safety warning (gang control of much of the city; governments advise
//   against all travel to Haiti).
//
//   node scripts/add-tail-batch6-details.js [--apply]
const run = require("./_enrich-runner");

const HAITI_WARNING = "Governments including the US and UK advise against all travel to Haiti, and much of Port-au-Prince is controlled by armed gangs — don't visit independently, and check current advisories.";

run({
  holetown: {
    spots: {
      "the-tides-restaurant": {
        address: "Holetown, St. James, Barbados",
        mapsQuery: "The Tides Restaurant, Holetown",
        description: "An upscale restaurant set right on the water in Holetown on Barbados' west coast, with tables beside the sea and art on the walls. The menu leans towards fresh local fish and creative international dishes, with a serious wine list. It's a special-occasion place — book ahead and ask for a table on the seaward side for sunset.",
      },
      "folkestone-marine-park": {
        address: "Church Point, Holetown, St. James, Barbados",
        mapsQuery: "Folkestone Marine Park, Holetown",
        description: "A protected marine reserve just north of Holetown with a small museum, a beach and an inshore snorkelling area over the reef, where turtles are often seen. Offshore lies the wreck of the Stavronikita, a popular dive site. The beach and snorkelling are free; hire snorkel gear or join a boat trip from the beach.",
      },
      "limegrove-lifestyle-centre": {
        address: "Highway 1, Holetown, St. James, Barbados",
        mapsQuery: "Limegrove Lifestyle Centre, Holetown",
        description: "An open-air shopping centre in Holetown with international designer boutiques, local art galleries, cafés and restaurants around courtyards and fountains. It's air-conditioned inside and a pleasant escape from the midday sun, with a cinema and occasional events. Holetown's beach and the historic St James Parish Church are a short walk away.",
      },
    },
  },
  jacmel: {
    spots: {
      "bas-bleu-waterfall": {
        name: "Bassin Bleu",
        address: "Near Jacmel, Sud-Est, Haiti",
        mapsQuery: "Bassin Bleu, Jacmel",
        description: "A series of three deep turquoise pools linked by waterfalls in the hills about 12km north-west of Jacmel, reached by a rough road and a short hike, with a rope descent to the lowest pool. Local guides at the entrance lead the way and help with the climb. Check current travel advisories for Haiti before planning any visit.",
      },
      "cyvadier-beach": {
        address: "Cyvadier, near Jacmel, Sud-Est, Haiti",
        mapsQuery: "Cyvadier Plage, Jacmel",
        description: "A small, sheltered cove a few kilometres east of Jacmel, with calm water for swimming, a few guesthouses and simple places to eat fresh fish. It's quiet on weekdays and a pleasant contrast to the town. Arrange transport through your accommodation, and check current travel advisories for Haiti before going.",
      },
      "jacmel-iron-market": {
        address: "Marché de Fer, Jacmel, Sud-Est, Haiti",
        mapsQuery: "Marché de Fer, Jacmel",
        description: "Jacmel's cast-iron market hall in the historic town centre, selling produce and everyday goods. Around it and in the town's workshops you'll find the papier-mâché masks and colourful paintings Jacmel is famous for, especially in the build-up to its Carnival. Go with a local guide, and check current travel advisories for Haiti.",
      },
    },
  },
  bathsheba: {
    spots: {
      "round-house-restaurant": {
        address: "Bathsheba, St. Joseph, Barbados",
        website: "http://www.roundhousebarbados.com/",
        description: "A historic oceanfront inn and restaurant on the hillside above Bathsheba, in a building dating back around 150 years, with a terrace overlooking the Atlantic surf. It serves brunch and lunch with local fish and produce, and is open daily until mid-afternoon. A lovely place to linger over lunch while watching the waves on the east coast.",
      },
      "soup-bowl-surf-spot": {
        address: "Bathsheba Beach, St. Joseph, Barbados",
        mapsQuery: "Soup Bowl, Bathsheba",
        description: "Barbados' most famous surf break, a powerful reef wave on the Atlantic coast at Bathsheba, framed by giant mushroom-shaped boulders. It's for experienced surfers only, and the currents make swimming dangerous — but it's spectacular to watch from the shore, and the rock pools are nice for a paddle at low tide.",
      },
      "andromeda-botanic-gardens": {
        address: "Bathsheba, St. Joseph, Barbados",
        website: "https://andromedabarbados.com/getting-here/",
        description: "An eight-acre tropical garden on the hillside above Bathsheba, with orchids, palms, ferns, heliconias, hibiscus and cacti along winding paths, and views down to the Atlantic coast. It's open daily from 9am to 4:30pm with an entry fee. Allow an hour or two, and combine it with lunch at the Round House.",
      },
    },
  },
  "port-au-prince": {
    delete: ["oloffson-hotel-bar"],
    spots: {
      "march-en-fer-iron-market": {
        address: "Boulevard Jean-Jacques Dessalines, Port-au-Prince, Haiti",
        mapsQuery: "Marché en Fer, Port-au-Prince",
        description: "Port-au-Prince's iconic iron market, with its red-and-green iron halls and minaret-like towers, rebuilt after the 2010 earthquake, where vendors sold produce, crafts, art and spices. It's historically one of the city's great sights, but it sits in the downtown area worst affected by violence. " + HAITI_WARNING,
      },
      "mus-e-du-panth-on-national-mupanah": {
        address: "Champ de Mars, Port-au-Prince, Haiti",
        mapsQuery: "MUPANAH, Port-au-Prince",
        description: "Haiti's national history museum, built partly underground by the Champ de Mars and opened in 1983, which survived the 2010 earthquake largely intact. It tells the story of the Haitian Revolution and holds an anchor said to be from Columbus's Santa María. " + HAITI_WARNING,
      },
    },
  },
  "crown-point": {
    spots: {
      "store-bay-beach": {
        address: "Store Bay, Crown Point, Tobago",
        mapsQuery: "Store Bay Beach, Tobago",
        description: "A small, sheltered beach at Crown Point, a few minutes' walk from Tobago's airport, with calm water, lifeguards and changing rooms. The row of food huts behind it is famous for crab and dumplings, roti and other local dishes. Glass-bottom boats to Buccoo Reef and the Nylon Pool leave from here.",
      },
      "nylon-pool": {
        address: "Off Pigeon Point, Tobago",
        mapsQuery: "Nylon Pool, Tobago",
        description: "A shallow, waist-deep sandbar in the middle of the sea off Pigeon Point, with clear turquoise water over white sand. It's reached only by boat, usually as part of a glass-bottom boat trip with Buccoo Reef, and local legend says a dip takes years off your age. Book trips at Store Bay or Pigeon Point.",
      },
      "buccoo-reef": {
        address: "Buccoo Reef Marine Park, Tobago",
        mapsQuery: "Buccoo Reef, Tobago",
        description: "A protected reef and lagoon system off Tobago's south-west coast, and a marine park. Glass-bottom boat trips from Store Bay, Pigeon Point and Buccoo let you see coral and fish without getting wet, and usually include a snorkel stop and a swim in the Nylon Pool. Don't touch or stand on the coral.",
      },
    },
  },
  "speyside-tobago": {
    spots: {
      "jemma-s-seaview-kitchen": {
        address: "Speyside, Tobago",
        mapsQuery: "Jemma's Seaview Kitchen, Speyside",
        description: "A much-loved family restaurant in Speyside, built partly into a tree over the water, with views across the bay to Goat Island and Little Tobago. It serves generous plates of Tobagonian home cooking — curried crab, fish, stewed chicken — with a fixed-price lunch. It's alcohol-free and closed on Saturdays; a classic stop on a north-east Tobago trip.",
      },
      "speyside-snorkeling-manta-ray-point": {
        name: "Speyside Reefs",
        address: "Speyside Bay, Tobago",
        mapsQuery: "Speyside, Tobago",
        description: "The reefs off Speyside, on Tobago's north-east tip, are the island's best diving: sites such as Angel Reef, Japanese Gardens and Kelleston Drain, home to one of the world's largest brain corals. Currents are strong, so dive or snorkel with a local operator; manta rays are sometimes seen, especially early in the year.",
      },
      "little-tobago-island-bird-of-paradise-island": {
        address: "Little Tobago, off Speyside, Tobago",
        mapsQuery: "Little Tobago Island",
        description: "An uninhabited island sanctuary about 2km off Speyside, reached by boat, often via a glass-bottom reef tour. A short, steep trail leads to lookouts where you can see nesting seabirds including red-billed tropicbirds, frigatebirds and boobies. It's also called Bird of Paradise Island after birds introduced there in the early 1900s.",
      },
    },
  },
  speightstown: {
    delete: ["ariel-sands-beach"],
    spots: {
      "fish-net-restaurant": {
        name: "The Fish Pot",
        address: "Six Men's Bay, near Speightstown, St. Peter, Barbados",
        mapsQuery: "The Fish Pot, Speightstown",
        description: "A seafront restaurant in a converted old fort building just north of Speightstown, near the fishing village of Six Men's Bay, serving modern Caribbean and international dishes with plenty of fresh fish. Tables look straight over the water, and it's calm and romantic at sunset. Book ahead, especially for dinner at weekends.",
      },
      "arlington-house-museum": {
        address: "Queen Street, Speightstown, St. Peter, Barbados",
        mapsQuery: "Arlington House Museum, Speightstown",
        description: "A museum in a restored 18th-century merchant's house in Speightstown, once a major sugar port. Three floors of interactive exhibits tell the story of the town and the island's history, from trade and slavery to everyday life. It takes an hour or so; afterwards walk the boardwalk and the old streets of the town.",
      },
    },
  },
  labadee: {
    delete: ["nord-coast-seafood-shacks"],
    spots: {
      "labadee-public-shore": {
        address: "Labadie, Nord, Haiti",
        mapsQuery: "Labadie village, Haiti",
        description: "The village of Labadie and the public coves around it, next to the fenced cruise-line resort on the peninsula west of Cap-Haïtien. Water taxis from the jetty reach quiet beaches with clear water and small places serving fresh fish and lambi (conch). Agree boat prices in advance, and check current travel advisories for Haiti.",
      },
      "lakou-lakay-cultural-village": {
        address: "Milot, Nord, Haiti",
        mapsQuery: "Lakou Lakay, Milot",
        description: "A family-run guesthouse, restaurant and cultural centre in Milot, below the Sans-Souci Palace and the Citadelle, whose name means 'our home' in Creole. Lunch is by reservation, with traditional Haitian cooking, and the family works to preserve local music, dance and traditions. A good base for the Citadelle; check current travel advisories first.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
