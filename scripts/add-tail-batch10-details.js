// Small-city tail, batch 10: Manuel Antonio, San Gil, Flores, Puerto Ayora, Semuc Champey, Suchitoto, Montañita,
// Canaima. Researched 2026-09-25.
//
// DELETED: Selina Manuel Antonio (permanently closed during the Selina→Socialtel restructuring); "Café Lanquín"
//   (no restaurant by that name found in Lanquín).
// CORRECTED: Galápagos Native is at Tomás de Berlanga y 12 de Febrero (not Av. Baltra), run by a pioneering
//   settler family; El Avión's plane is a Fairchild C-123 linked to the Iran-Contra affair (elavion.net);
//   Café Bar El Necio is a bar run by a former guerrilla, decorated with revolutionary memorabilia, with live music;
//   Campamento Canaima is the Venetur camp on the lagoon. Tortuga Bay: swim only at Playa Mansa.
//
//   node scripts/add-tail-batch10-details.js [--apply]
const run = require("./_enrich-runner");

const VE_NOTE = "Several governments advise against travel to Venezuela; check current advisories before planning a trip.";

run({
  "manuel-antonio": {
    delete: ["selina-manuel-antonio"],
    spots: {
      "el-avion-manuel-antonio": {
        address: "Manuel Antonio Road, Quepos, Puntarenas, Costa Rica",
        website: "https://elavion.net/",
        description: "A hillside bar-restaurant built around a Fairchild C-123 cargo plane with a remarkable history: it was bought for the covert Iran-Contra operation in the 1980s. Today the plane is a bar, and the terrace looks over the jungle to the Pacific — one of the best sunset spots on the road between Quepos and the national park.",
      },
      "manuel-antonio-park": {
        address: "Manuel Antonio National Park, Quepos, Puntarenas, Costa Rica",
        mapsQuery: "Manuel Antonio National Park",
        description: "A small but very popular national park where rainforest trails lead to white-sand beaches, with sloths, capuchin and squirrel monkeys, and iguanas often seen along the way. Tickets must be bought online in advance, and it's closed on Tuesdays. Go at opening time with a guide to spot the wildlife, and don't feed the monkeys.",
      },
    },
  },
  "san-gil": {
    spots: {
      "sams-vip-hostel-san-gil": {
        address: "Carrera 10, facing the main plaza, San Gil, Santander, Colombia",
        mapsQuery: "Sam's VIP Hostel, San Gil",
        description: "A central hostel overlooking San Gil's main plaza, with a small rooftop pool, a balcony and dorms and private rooms. Staff book the town's adventure activities — rafting on the Río Fonce and Río Suárez, paragliding over the Chicamocha Canyon, caving — making it a sociable base in Colombia's adventure-sports capital.",
      },
      "gringo-mikes-san-gil": {
        address: "Calle 12, San Gil, Santander, Colombia",
        mapsQuery: "Gringo Mike's, San Gil",
        description: "A long-running traveller favourite in San Gil, serving big breakfasts, burgers, burritos and sandwiches in a relaxed courtyard. It's a reliable place for a hearty meal before or after a day of rafting or canyoning, and an easy spot to meet other travellers comparing adventures.",
      },
      "parque-el-gallineral": {
        address: "Parque El Gallineral, San Gil, Santander, Colombia",
        mapsQuery: "Parque El Gallineral, San Gil",
        description: "A riverside park on an island between two branches of the Río Fonce, right in San Gil, where huge trees are draped in long curtains of grey 'Spanish moss'. Shady paths and footbridges wind through it, and there's a natural swimming pool fed by spring water. A cool, magical escape from the midday heat; there's a small entry fee.",
      },
    },
  },
  flores: {
    spots: {
      "los-amigos-hostel-flores": {
        address: "Isla de Flores, Petén, Guatemala",
        mapsQuery: "Los Amigos Hostel, Flores",
        description: "A long-established, leafy hostel on the island of Flores, with hammocks, a jungle-garden feel, dorms and private rooms, and a well-regarded restaurant with good vegetarian options. Staff arrange sunrise and day trips to Tikal and other Maya sites, making it an easy, social base for exploring Petén.",
      },
      "cafe-yaxha-flores": {
        address: "Isla de Flores, Petén, Guatemala",
        mapsQuery: "Café Yaxhá, Flores",
        description: "A small café on the island of Flores serving good coffee, breakfasts and regional dishes, run by people passionate about the Maya archaeology of Petén — including the Yaxhá ruins it's named after. It's a good place to fuel up and pick up information before trips to Tikal, Yaxhá and the other sites.",
      },
      "isla-de-flores-malecon": {
        address: "Isla de Flores, Petén, Guatemala",
        mapsQuery: "Isla de Flores",
        description: "The colourful island town of Flores sits in Lake Petén Itzá, connected to the mainland by a causeway. A lakeside path circles the island, lined with cafés and docks where locals swim and boats leave for villages across the water. Walk the loop at sunset, then climb to the central plaza and church.",
      },
    },
  },
  "puerto-ayora": {
    spots: {
      "galapagos-native-hostel": {
        address: "Tomás de Berlanga y 12 de Febrero, Puerto Ayora, Santa Cruz, Galápagos, Ecuador",
        mapsQuery: "Galapagos Native, Puerto Ayora",
        description: "A family-run hostel owned by descendants of some of Santa Cruz island's first settlers, about 10 minutes' walk from the waterfront, with simple rooms and a daily breakfast. It's close to Playa de los Alemanes and the fish market, and the owners can advise on day tours and snorkelling trips. A good-value base in an expensive destination.",
      },
      "il-giardino-puerto-ayora": {
        address: "Avenida Charles Darwin, Puerto Ayora, Santa Cruz, Galápagos, Ecuador",
        mapsQuery: "Il Giardino, Puerto Ayora",
        description: "A garden restaurant on Puerto Ayora's main street, serving Italian dishes, pizza and fresh local fish alongside Ecuadorian plates and good drinks. It's centrally located, open from lunch to late, and a pleasant place for a relaxed dinner after a day of snorkelling or visiting the Charles Darwin Research Station.",
      },
      "tortuga-bay": {
        address: "Tortuga Bay, Puerto Ayora, Santa Cruz, Galápagos, Ecuador",
        mapsQuery: "Tortuga Bay, Santa Cruz",
        description: "A long white-sand beach reached by a paved path of about 2.5km from the edge of Puerto Ayora, open during daylight hours (sign in at the start). The main beach, Playa Brava, has strong currents and is not for swimming, but at its end the sheltered Playa Mansa is calm, with marine iguanas, pelicans and sometimes reef sharks.",
      },
    },
  },
  "semuc-champey": {
    delete: ["cafe-lanquin-semuc"],
    spots: {
      "zephyr-lodge-semuc": {
        address: "Lanquín, Alta Verapaz, Guatemala",
        mapsQuery: "Zephyr Lodge, Lanquín",
        description: "A hilltop hostel above the village of Lanquín with dramatic views over the green valley, an infinity pool, dorms and private rooms, and a lively bar. It's the social base for trips to Semuc Champey, cave tubing and the K'an Ba caves. The shuttle up the hill is steep and bumpy, so arrange transfers when you book.",
      },
      "semuc-champey-pools": {
        address: "Semuc Champey Natural Monument, Alta Verapaz, Guatemala",
        mapsQuery: "Semuc Champey",
        description: "A series of turquoise limestone pools on top of a natural bridge under which the Cahabón River rushes, in the jungle about 10km from Lanquín. Swim between the pools, then climb to El Mirador for the famous view from above. Go early before tour groups, bring water shoes, and pay the entry fee at the gate.",
      },
    },
  },
  suchitoto: {
    spots: {
      "los-almendros-suchitoto": {
        address: "Suchitoto, Cuscatlán, El Salvador",
        mapsQuery: "Los Almendros de San Lorenzo, Suchitoto",
        description: "A boutique hotel in a restored colonial house in Suchitoto, furnished with antiques and art around a courtyard with a pool, with a well-regarded restaurant. It's the most atmospheric place to stay in the cobbled colonial town, a short walk from the plaza and the church of Santa Lucía.",
      },
      "cafe-el-necio-suchitoto": {
        address: "Suchitoto, Cuscatlán, El Salvador",
        mapsQuery: "Cafe Bar El Necio, Suchitoto",
        description: "A small bar run by a former guerrilla fighter, its walls covered with memorabilia from El Salvador's civil war — flags, photos and even a bazooka. Drinks are cheap, there's often live music at weekends, and the owners are happy to talk history. A friendly, unusual night out in Suchitoto.",
      },
      "iglesia-santa-lucia-suchitoto": {
        address: "Plaza Central, Suchitoto, Cuscatlán, El Salvador",
        mapsQuery: "Iglesia Santa Lucía, Suchitoto",
        description: "The bright white colonial church of Santa Lucía, built in the mid-19th century, facing the main plaza of Suchitoto, one of El Salvador's best-preserved colonial towns. Its simple facade and bell towers are the town's postcard view. The plaza fills with food and craft stalls at weekends; Lake Suchitlán is just downhill.",
      },
    },
  },
  montanita: {
    spots: {
      "balsa-surf-camp": {
        address: "Montañita, Santa Elena, Ecuador",
        mapsQuery: "Balsa Surf Camp, Montañita",
        description: "A laid-back surf camp of bamboo cabañas around a pool and garden, a short walk back from the beach and away from the loudest party streets. It runs surf lessons and board rental, and the relaxed atmosphere makes it easy to meet other travellers while still getting some sleep in noisy Montañita.",
      },
      "tiki-limbo-montanita": {
        address: "Calle Principal, Montañita, Santa Elena, Ecuador",
        mapsQuery: "Tiki Limbo, Montañita",
        description: "A long-standing restaurant and bar on Montañita's main street, serving a wide menu of international comfort food, seafood and cocktails in a relaxed, upstairs setting. It's a reliable, tasty choice in a village full of hit-and-miss places, and a good spot to watch the street life below.",
      },
      "montanita-point": {
        address: "La Punta, Montañita, Santa Elena, Ecuador",
        mapsQuery: "La Punta, Montañita",
        description: "The right-hand point break at the north end of Montañita beach that made the village famous with surfers, with its best waves from roughly December to May. Beginners should stick to the beach breaks and take lessons, while the point is for more experienced surfers. Sunset on the rocks is a village ritual.",
      },
    },
  },
  canaima: {
    spots: {
      "campamento-canaima": {
        name: "Campamento Canaima (Venetur)",
        address: "Canaima Lagoon, Canaima National Park, Bolívar, Venezuela",
        mapsQuery: "Campamento Canaima, Canaima",
        description: "The state-run Venetur camp on the shore of Canaima Lagoon, with cabins facing the waterfalls, and the main operator of packages to Angel Falls by boat and plane. Most visitors arrive on light aircraft from Puerto Ordaz or Ciudad Bolívar on a multi-day package. " + VE_NOTE,
      },
      "laguna-de-canaima": {
        address: "Canaima National Park, Bolívar, Venezuela",
        mapsQuery: "Laguna de Canaima",
        description: "A lagoon inside the UNESCO-listed Canaima National Park, fed by a row of waterfalls — Hacha, Golondrina, Ucaima and Wadaima — whose tannin-stained water looks red-brown, with pink sand beaches and flat-topped tepuis on the horizon. It's the gateway for trips to Angel Falls. " + VE_NOTE,
      },
      "salto-el-sapo": {
        address: "Canaima National Park, Bolívar, Venezuela",
        mapsQuery: "Salto El Sapo, Canaima",
        description: "A waterfall near Canaima Lagoon, reached by a short boat ride and walk, where a path leads behind the curtain of falling water — expect to get completely soaked, so bring a dry bag. It's usually visited on a half-day guided tour from Canaima village. " + VE_NOTE,
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
