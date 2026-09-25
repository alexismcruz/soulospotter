// Small-city tail, batch 3: El Yunque, Jarabacoa, Santo Domingo, Quetzaltenango, Ponce, Maracas Bay,
// Port of Spain, Cienfuegos. Researched 2026-09-25.
//
// CHANGED:
//   - "La Mina Falls Trail" → "El Yunque National Forest": La Mina trail and falls are closed for construction
//     (Forest Service / trail reports, Aug 2026), so the old "hike to a swimmable waterfall" entry was misleading.
//   - Lluvia Deli & Café → real name Lluvia Deli Bar & Artefacto (52 Principal St, Palmer; lluviapr.com).
//   - Island Life Backpackers: Calle Isabel la Católica 356; hot tub + rooftop terrace (no "plunge pool").
//   - Café Red (Xela): a social-enterprise café/cultural centre supporting returned migrants (cafered.org).
//   - Salto de Jimenoa: the visitable fall is Jimenoa Dos, reached over suspension bridges; no swimming at the falls.
//   - Aroma de la Montaña: at Jamaca de Dios, ~6km south, ~900m up; revolving floor turns at weekends.
//   - "Carnival Jump-Up at Ariapita Avenue" → "Ariapita Avenue" (it's a year-round nightlife strip, not an event).
//   - Casa Bella Perla Marina: 1952 Art Deco house near Paseo del Prado with rooftop views (Lonely Planet, Cuba-Junky).
// Black Cat Xela: sources conflict on a possible rename; described neutrally.
//
//   node scripts/add-tail-batch3-details.js [--apply]
const run = require("./_enrich-runner");

run({
  "el-yunque": {
    spots: {
      "rainforest-inn-el-yunque": {
        address: "Río Grande, near El Yunque National Forest, Puerto Rico",
        mapsQuery: "The Rainforest Inn, Rio Grande, Puerto Rico",
        description: "A small bed and breakfast on the edge of El Yunque in the hills above Río Grande, surrounded by rainforest, with its own trails and river pools on the property. It's quiet and immersive — you fall asleep to coquí frogs — and a good base for exploring the national forest early before the day-trippers from San Juan arrive.",
      },
      "lluvia-deli-el-yunque": {
        name: "Lluvia Deli Bar & Artefacto",
        address: "52 Calle Principal, Palmer, Río Grande 00721, Puerto Rico",
        website: "https://lluviapr.com/about-us/",
        description: "A family-run café, bar and small art space in Palmer, the village at the foot of El Yunque. Stop for breakfast and Puerto Rican mountain-grown coffee before a hike, or come back later for wood-fired pizza. The walls double as a gallery for local art and books. Open daily for breakfast and lunch, with dinner service most evenings.",
      },
      "la-mina-falls-trail": {
        name: "El Yunque National Forest",
        address: "El Yunque National Forest, PR-191, Río Grande, Puerto Rico",
        website: "https://www.fs.usda.gov/r08/elyunque/recreation/trails/la-mina-trail",
        mapsQuery: "El Yunque National Forest",
        description: "The only tropical rainforest in the US National Forest System, in the Luquillo Mountains east of San Juan, with cloud forest, observation towers, rivers and trails. The popular La Mina Falls trail has been closed for construction, so check the Forest Service site for which trails and waterfalls are open before you go. Recreation areas close by 5pm.",
      },
    },
  },
  jarabacoa: {
    spots: {
      "rancho-baiguate-jarabacoa": {
        address: "Jarabacoa, La Vega, Dominican Republic",
        mapsQuery: "Rancho Baiguate, Jarabacoa",
        description: "An adventure lodge on a riverside ranch just outside Jarabacoa in the Dominican Republic's central highlands. It organises white-water rafting on the Yaque del Norte, canyoning, horse riding and treks up Pico Duarte, the Caribbean's highest peak. Rooms are simple and meals are included in many packages — easy for a solo adventure trip.",
      },
      "aroma-de-la-montana-jarabacoa": {
        address: "Jamaca de Dios, about 6km south of Jarabacoa, La Vega, Dominican Republic",
        website: "https://jamacadedios.com/en/",
        description: "A restaurant about 900m up the mountainside at the Jamaca de Dios development, around 6km south of Jarabacoa, billed as the first revolving restaurant in the Caribbean. At weekends the floor slowly turns for 360-degree views over the valley. It serves Dominican and international dishes; go around sunset, and take a taxi up the steep road.",
      },
      "salto-de-jimenoa": {
        name: "Salto de Jimenoa",
        address: "Jarabacoa, La Vega, Dominican Republic",
        mapsQuery: "Salto de Jimenoa Dos, Jarabacoa",
        description: "A powerful waterfall in a forested canyon near Jarabacoa, reached by a walk of about 500m from the car park over a series of suspension bridges. The spray-filled viewpoint at the base is dramatic, but swimming isn't allowed at the main falls — there are calmer spots downstream. Open daytime only; there's a small entry fee.",
      },
    },
  },
  "santo-domingo": {
    spots: {
      "island-life-backpackers-sd": {
        name: "Island Life Hostel",
        address: "Calle Isabel la Católica 356, Zona Colonial, Santo Domingo 10212, Dominican Republic",
        website: "https://islandlifehostel.com/island-life-backpackers-hostel",
        description: "A sociable hostel in the heart of the Zona Colonial, about 200m from the Alcázar de Colón, with dorms and private rooms, a garden, a hot tub, a rooftop terrace and a cooked-to-order breakfast. It's an easy place to meet other travellers and walk to the old city's plazas, museums and bars.",
      },
      "pate-palo-santo-domingo": {
        address: "Plaza de España, Zona Colonial, Santo Domingo, Dominican Republic",
        mapsQuery: "Pat'e Palo, Plaza de España, Santo Domingo",
        description: "A European-style brasserie on Plaza de España, facing the Alcázar de Colón, that claims descent from what was said to be the first tavern in the Americas, opened in the early 16th century. The terrace is a lovely spot for dinner as the plaza lights up. It's among the old city's pricier options, but the setting is hard to beat.",
      },
      "zona-colonial-santo-domingo": {
        address: "Zona Colonial, Santo Domingo, Dominican Republic",
        mapsQuery: "Zona Colonial, Santo Domingo",
        description: "The first permanent European settlement in the Americas and a UNESCO World Heritage Site, with the Americas' oldest cathedral, the Alcázar de Colón palace, the Ozama fortress and cobbled streets of colonial houses. Calle El Conde is the pedestrian spine. Walk it in the early morning or evening, when it's cooler and the plazas fill with locals.",
      },
    },
  },
  quetzaltenango: {
    spots: {
      "black-cat-hostel-xela": {
        address: "Near Parque Centro América, Zona 1, Quetzaltenango, Guatemala",
        mapsQuery: "The Black Cat Hostel, Quetzaltenango",
        description: "A long-running hostel two blocks from Xela's central plaza, known for its big included breakfast, bar and helpful staff. It's a practical base for the city's many Spanish schools and for the multi-day trek from Xela to Lake Atitlán. Check recent listings before booking, as the property has been reported to trade under a new name.",
      },
      "cafe-red-xela": {
        address: "Zona 1, Quetzaltenango, Guatemala",
        website: "https://cafered.org/",
        description: "A café, restaurant and cultural space in Xela's Zona 1 run as a social enterprise that supports migrants who have returned to Guatemala, with training and work. It serves breakfasts, lunches and good coffee, hosts art and events, and has decent Wi-Fi — a good place to spend an afternoon while knowing your money is doing some good.",
      },
      "parque-centro-america-xela": {
        address: "Parque Centro América, Zona 1, Quetzaltenango, Guatemala",
        mapsQuery: "Parque Centro América, Quetzaltenango",
        description: "The central plaza of Guatemala's second city, surrounded by grand neoclassical stone buildings, the cathedral and the old municipal buildings. It's the heart of daily life in Xela, especially in the evenings and on weekends, and the starting point for exploring the Spanish schools, cafés and markets of the highland city.",
      },
    },
  },
  ponce: {
    spots: {
      "hotel-belgica-ponce": {
        address: "Calle Villa, Ponce, Puerto Rico",
        mapsQuery: "Hotel Belgica, Ponce",
        description: "A historic, family-run hotel in a 19th-century building just off Plaza Las Delicias in the centre of Ponce, with high ceilings, balconies and old-fashioned charm. Rooms are simple but characterful, and the location puts the Parque de Bombas, cathedral and the city's museums within a short walk. Good value for a night or two.",
      },
      "lola-ponce": {
        address: "Calle Cristina, near Plaza Las Delicias, Ponce, Puerto Rico",
        mapsQuery: "Lola Eclectic Cuisine, Ponce",
        description: "A lively restaurant and bar steps from Ponce's main plaza, serving an eclectic menu that mixes Puerto Rican flavours with international dishes, plus cocktails. It's one of the more stylish places to eat in the centre and a good spot to sit at the bar for dinner alone. Busiest on weekend evenings.",
      },
      "parque-de-bombas-ponce": {
        address: "Plaza Las Delicias, Ponce, Puerto Rico",
        mapsQuery: "Parque de Bombas, Ponce",
        description: "A former fire station built in 1882 on Plaza Las Delicias, painted in bold red-and-black stripes and now a small free museum of the city's firefighting history. It's Ponce's most photographed landmark, next to the Cathedral of Our Lady of Guadalupe and the lion fountains. Visit in the morning, then walk the plaza's colonial streets.",
      },
    },
  },
  "maracas-bay": {
    spots: {
      "richard-s-bake-shark": {
        address: "Maracas Beach, North Coast Road, Trinidad",
        mapsQuery: "Richard's Bake and Shark, Maracas Bay",
        description: "The best-known bake-and-shark stand at Maracas Bay: fried shark in a puffy fried 'bake', which you load yourself from a long bar of toppings — pineapple, coleslaw, cucumber, tamarind and garlic sauces, and hot pepper. It's a Trinidadian ritual after a swim; expect a queue on weekends and bring cash.",
      },
      "maracas-bay-beach": {
        address: "Maracas Bay, North Coast Road, Trinidad",
        mapsQuery: "Maracas Beach, Trinidad",
        description: "Trinidad's most popular beach, a wide curve of sand backed by forested hills, about 45 minutes' drive over the Northern Range from Port of Spain along a winding scenic road. There are lifeguards, changing rooms and food stalls. The surf can be strong, so swim in the flagged areas; weekdays are much quieter than weekends.",
      },
      "las-cuevas-beach": {
        address: "Las Cuevas, North Coast Road, Trinidad",
        mapsQuery: "Las Cuevas Beach, Trinidad",
        description: "A quieter beach about 15–20 minutes further east along the North Coast Road from Maracas, named for the small caves along its shore. It's a sheltered bay with forest behind it, lifeguards and basic facilities, and fewer crowds than Maracas — a calmer choice for a swim and a long read on the sand.",
      },
    },
  },
  "port-of-spain": {
    spots: {
      "queen-s-park-savannah": {
        address: "Queen's Park Savannah, Port of Spain, Trinidad",
        mapsQuery: "Queen's Park Savannah, Port of Spain",
        description: "A huge open park in the centre of Port of Spain, ringed by a road often called the world's largest roundabout. Along its western edge stand the 'Magnificent Seven', a row of grand early-20th-century mansions. In the evenings, food vendors sell coconut water, corn soup and doubles. It's also the main stage for Carnival.",
      },
      "national-museum-art-gallery": {
        address: "117 Frederick Street, Port of Spain, Trinidad",
        mapsQuery: "National Museum and Art Gallery, Port of Spain",
        description: "Trinidad and Tobago's national museum, near Memorial Park at the corner of the Savannah, with galleries on the islands' history, geology and natural history, Carnival costumes, and a collection of Trinidadian art including works by Michel-Jean Cazabon. It's small and manageable in an hour or two, and a good introduction to the country.",
      },
      "carnival-jump-up-at-ariapita-avenue": {
        name: "Ariapita Avenue",
        address: "Ariapita Avenue, Woodbrook, Port of Spain, Trinidad",
        mapsQuery: "Ariapita Avenue, Woodbrook, Port of Spain",
        description: "Woodbrook's main restaurant and bar strip, known simply as 'the Avenue', where Port of Spain goes out to 'lime' — rum bars, restaurants, street food and live or DJ soca. It's busiest on Thursday to Saturday nights and during the Carnival season. Take a registered taxi at night rather than walking far on quiet side streets.",
      },
    },
  },
  cienfuegos: {
    spots: {
      "casa-bella-perla-cienfuegos": {
        address: "Near Paseo del Prado, Cienfuegos, Cuba",
        mapsQuery: "Bella Perla Marina, Cienfuegos",
        description: "A well-kept casa particular in a 1952 Art Deco house about 100m from the Paseo del Prado, run by a welcoming couple who speak English and Italian. Its three rooms have private bathrooms, and breakfast and dinner are served on the rooftop terrace, which looks out over the city and the bay. A comfortable, central base.",
      },
      "villa-lagarto-cienfuegos": {
        address: "Punta Gorda, Cienfuegos, Cuba",
        mapsQuery: "Villa Lagarto, Punta Gorda, Cienfuegos",
        description: "A popular paladar (private restaurant) on the waterfront at Punta Gorda, the peninsula at the southern end of the Prado, with tables beside the bay. It's known for generous portions of grilled meat, lobster and fish, and for its sunset views. Book ahead in high season, and walk the Malecón out to Punta Gorda to get there.",
      },
      "parque-jose-marti-cienfuegos": {
        address: "Parque José Martí, Cienfuegos, Cuba",
        mapsQuery: "Parque José Martí, Cienfuegos",
        description: "The main square of Cienfuegos, whose French-founded historic centre is a UNESCO World Heritage Site. It's ringed by neoclassical buildings, including the Teatro Tomás Terry, the cathedral and the domed Palacio Ferrer, whose rooftop tower offers views over the city. It's lively in the evenings and a good place to start a walk.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
