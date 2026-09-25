// Small-city tail, batch 9: Santa Ana (SV), Copán Ruinas, Santa Catalina (PA), Areguá, San Ignacio, Choroní,
// Morrocoy, Mérida (VE). Researched 2026-09-25.
//
// DELETED (6): Cadejo Brewing Co. "Santa Ana" (Cadejo's taprooms are in San Salvador/Santa Tecla/airport — none in
//   Santa Ana); Posada Ñe'ery and La Cocina de Areguá (no trace); Restaurante Mango, Choroní (no trace); Posada Villa
//   Gregoria and "Restaurante Tucacas" (no trace / generic).
// CORRECTED: Posada Pittier (since 1993, 9 rooms, pool, generator); Heladería Coromoto reopened June 2024 with fewer
//   flavours, Tue–Sun 2–10pm; Los Pibes is an Argentine grill founded by two brothers; La Buena Vida is a mosaic-
//   decorated "artistic hotel" with café. Venezuela entries carry a travel-advisory note.
//
//   node scripts/add-tail-batch9-details.js [--apply]
const run = require("./_enrich-runner");

const VE_NOTE = "Several governments advise against travel to Venezuela; check current advisories before planning a trip.";

run({
  "santa-ana": {
    delete: ["cadejo-brewing-santa-ana"],
    spots: {
      "casa-verde-hostel-santa-ana": {
        address: "Santa Ana, El Salvador",
        mapsQuery: "Casa Verde Hostel, Santa Ana, El Salvador",
        description: "A well-kept, highly rated hostel in Santa Ana with a small pool, a good shared kitchen, and dorms and private rooms. The owners help organise the popular day hike up the Santa Ana volcano to its turquoise crater lake and trips to Lake Coatepeque and the Ruta de las Flores. A comfortable, sociable base in El Salvador's second city.",
      },
      "catedral-de-santa-ana": {
        address: "Parque Libertad, Santa Ana, El Salvador",
        mapsQuery: "Catedral de Santa Ana, El Salvador",
        description: "Santa Ana's neo-Gothic cathedral on Parque Libertad, its white facade decorated with elaborate stonework and twin spires, built in the first half of the 20th century. The square around it is lined with the ornate Teatro de Santa Ana and the town hall, making it the handsome heart of the city. Visit in the late afternoon light.",
      },
    },
  },
  "copan-ruinas": {
    spots: {
      "iguana-azul-hostel-copan": {
        address: "Copán Ruinas, Copán, Honduras",
        mapsQuery: "Iguana Azul, Copán Ruinas",
        description: "A long-running, relaxed hostel and guesthouse in a colonial-style house a few blocks from the plaza in Copán Ruinas, with dorms, private rooms and a garden. It's a quiet, friendly base for visiting the Maya ruins, the macaw sanctuary and nearby hot springs, and the owners are full of local advice.",
      },
      "cafe-san-rafael-copan": {
        address: "Copán Ruinas, Copán, Honduras",
        mapsQuery: "Café San Rafael, Copán Ruinas",
        description: "A café and cheese shop in Copán Ruinas selling coffee from its own family farm in the surrounding hills and cheeses made at the farm. Try a cheese platter with a pour-over, or sandwiches and breakfasts in the calm garden seating. A good place to linger between visits to the ruins and the town's cobbled streets.",
      },
      "copan-archaeological-site": {
        address: "Copán Archaeological Site, near Copán Ruinas, Honduras",
        mapsQuery: "Copán Ruinas Archaeological Site",
        description: "A UNESCO-listed Maya city just outside town, famous for its intricately carved stelae and altars and the Hieroglyphic Stairway, the longest known Maya inscription. Scarlet macaws fly around the site. Go early, consider hiring a guide at the entrance, and add the tunnels and the Sculpture Museum for extra fees.",
      },
    },
  },
  "santa-catalina-panama": {
    spots: {
      "la-buena-vida-santa-catalina": {
        address: "Santa Catalina, Veraguas, Panama",
        mapsQuery: "La Buena Vida, Santa Catalina, Panama",
        description: "A small 'artistic hotel' at the entrance to Santa Catalina, with cabins decorated in colourful mosaic work by the owners, each with an outdoor shower. There's a healthy café serving breakfast and lunch, plus yoga and massages. A relaxed, characterful base for surfing and for diving trips to Coiba National Park.",
      },
      "los-pibes-santa-catalina": {
        address: "Camino a Playa El Estero, Santa Catalina, Veraguas, Panama",
        mapsQuery: "Los Pibes, Santa Catalina, Panama",
        description: "An Argentine grill set up in the early 2000s by two brothers, in a garden with wooden tables and surfboard décor on the road to Playa El Estero. It's known for wood-fired steaks with chimichurri, choripán, burgers, empanadas and fresh grilled fish. The informal, social atmosphere makes it the easy dinner choice in town.",
      },
      "santa-catalina-point": {
        address: "Santa Catalina, Veraguas, Panama",
        mapsQuery: "La Punta, Santa Catalina, Panama",
        description: "Santa Catalina's famous reef break, a powerful wave best for experienced surfers, with calmer beach breaks at nearby Playa El Estero for learners. The village is also the jumping-off point for dive and snorkel trips to Coiba National Park, a UNESCO-listed marine reserve known for sharks, turtles and huge schools of fish.",
      },
    },
  },
  aregua: {
    delete: ["posada-neery-aregua", "la-cocina-de-aregua"],
    spots: {
      "calle-de-los-ceramistas": {
        address: "Areguá, Central, Paraguay",
        mapsQuery: "Areguá ceramics shops",
        description: "Areguá, on the shore of Lake Ypacaraí about 30km from Asunción, is known for its pottery, and its main streets are lined with stalls and workshops selling hand-made ceramics, from garden figures to kitchenware. The town also has cobbled streets, a hilltop church and a strawberry festival in season — an easy day trip from the capital.",
      },
    },
  },
  "san-ignacio": {
    spots: {
      "bellas-backpackers-san-ignacio": {
        address: "San Ignacio, Cayo, Belize",
        mapsQuery: "Bella's Backpackers, San Ignacio",
        description: "A laid-back backpackers in the centre of San Ignacio, with dorms, private rooms and a rooftop hangout. It's a sociable base for western Belize's big trips — the Actun Tunichil Muknal (ATM) cave, Xunantunich and Caracol ruins, and cave tubing — which staff help book. The town's market and restaurants are a short walk away.",
      },
      "ko-ox-han-nah-san-ignacio": {
        address: "Burns Avenue, San Ignacio, Cayo, Belize",
        mapsQuery: "Ko-Ox Han Nah, San Ignacio",
        description: "A popular restaurant on Burns Avenue whose name means 'let's go eat' in Mayan, serving generous portions of Belizean dishes, curries and international favourites, often with locally raised meat. It's friendly, good value and busy in the evenings — a reliable place for dinner after a day of caves and ruins.",
      },
      "cahal-pech-ruins": {
        address: "Cahal Pech, San Ignacio, Cayo, Belize",
        mapsQuery: "Cahal Pech, San Ignacio",
        description: "A hilltop Maya site on the edge of San Ignacio, walkable from town, with plazas, temples and residential buildings of an elite family compound, plus a small museum. It's much quieter than the bigger ruins, with shady grounds and views over the town. A good introduction before visiting Xunantunich or Caracol.",
      },
    },
  },
  choroni: {
    delete: ["restaurante-mango-choroni"],
    spots: {
      "posada-pittier-choroni": {
        address: "Choroní, Aragua, Venezuela",
        website: "https://posadapittier.com/en/hotel-in-choroni/",
        description: "A posada running since 1993 on the main avenue of Choroní, by the river and a short walk from the beach, with nine rooms around a garden, a pool and jacuzzi, and its own power generator. A comfortable base for Playa Grande and the colonial village. " + VE_NOTE,
      },
      "playa-grande-choroni": {
        address: "Playa Grande, Choroní, Aragua, Venezuela",
        mapsQuery: "Playa Grande, Choroní",
        description: "A palm-fringed Caribbean beach a short walk from the fishing port of Puerto Colombia, reached from Maracay over a spectacular road through Henri Pittier National Park. On weekend evenings the Afro-Venezuelan tambor drumming by the malecón draws crowds. " + VE_NOTE,
      },
    },
  },
  morrocoy: {
    delete: ["posada-villa-gregoria-morrocoy", "restaurante-tucacas-morrocoy"],
    spots: {
      "cayo-sombrero": {
        address: "Morrocoy National Park, Falcón, Venezuela",
        mapsQuery: "Cayo Sombrero, Morrocoy",
        description: "The best-known of the cays in Morrocoy National Park, a low island of white sand, palms and clear turquoise water with snorkelling over nearby reefs. It's reached by boat from Tucacas or Chichiriviche; bring water, shade and cash, as facilities are basic. " + VE_NOTE,
      },
    },
  },
  "merida-venezuela": {
    spots: {
      "posada-casa-sol-merida": {
        address: "Avenida 4, Mérida, Venezuela",
        mapsQuery: "Posada Casa Sol, Mérida, Venezuela",
        description: "A boutique posada in a restored colonial house in Mérida's centre, with colourful, art-filled rooms around a courtyard and a good breakfast. It's a comfortable base for the city and for trips into the Sierra Nevada, including the Mukumbarí cable car. " + VE_NOTE,
      },
      "heladeria-coromoto-merida": {
        address: "Avenida 3 at Calle 29, facing Plaza El Llano, Mérida, Venezuela",
        mapsQuery: "Heladería Coromoto, Mérida",
        description: "The ice-cream parlour that holds a Guinness record for the most flavours, with a catalogue of over 900 including trout, garlic and 'pabellón criollo'. It reopened in June 2024 under the founder's children with a smaller daily selection; it opens Tuesday to Sunday afternoons. " + VE_NOTE,
      },
      "mukumbari-cable-car": {
        address: "Mérida, Venezuela",
        mapsQuery: "Mukumbarí Cable Car, Mérida",
        description: "One of the world's highest and longest cable cars, rebuilt and reopened in 2016, climbing in stages from Mérida to Pico Espejo at about 4,765m in the Sierra Nevada. Take it slowly for the altitude, dress very warmly, and go early before clouds build. Service can be suspended for maintenance. " + VE_NOTE,
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
