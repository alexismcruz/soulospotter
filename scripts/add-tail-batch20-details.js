// Small-city tail, batch 20: Huaraz, Pucón, San Pedro de Atacama, Cali, Quito, Potosí, Salvador, Colonia.
// Researched 2026-09-27.
//
// DELETED: "La Pinta Hostel", Cali (no hostel of that name in San Antonio); "Café com Letras", Pelourinho (no trace).
// CORRECTED: Café Andino is on the 3rd floor at Lúcar y Torre 530; Selina Huaraz is on Jirón Italia (not Av.
//   Centenario); "Café de la Plaza" → Café de la P, O'Higgins 212; Chili Kiwi is at Roberto Geis 355, La Poza (not
//   Pedro de Valdivia 167); Adobe (Caracoles 211) opened 1997; "Hostal La Ruca" → La Rukka Hostal, Toconao 513 (solar
//   powered); Café Macondo is at Carrera 6 #3-03 (since 2004, jazz and free cinema); Hostal La Casona is an
//   18th-century house at Chuquisaca 460; Laranjeiras Hostel (HI, since 1994) is at Rua das Laranjeiras / Ordem
//   Terceira 11–13 (formerly Inácio Acioli); Charco is at San Pedro 116 (not Vasconcellos 337); "El Viajero" →
//   Viajero Colonia Hostel, facing the Plaza and cathedral.
//
//   node scripts/add-tail-batch20-details.js [--apply]
const run = require("./_enrich-runner");

run({
  huaraz: {
    spots: {
      "cafe-andino-huaraz": {
        address: "Jr. Lúcar y Torre 530 (3rd floor), Huaraz, Áncash, Peru",
        website: "https://cafeandino.com/",
        mapsQuery: "Café Andino, Huaraz",
        description: "A long-running traveller café on the top floor of a building in central Huaraz, with views of the Cordillera Blanca, a fireplace, a big book exchange, and freshly roasted coffee alongside breakfasts and hearty meals. It's the unofficial meeting point for trekkers and climbers comparing notes on Laguna 69 and the Santa Cruz trek.",
      },
      "mirador-rataquenua": {
        address: "Rataquenua, above Huaraz, Áncash, Peru",
        mapsQuery: "Mirador de Rataquenua, Huaraz",
        description: "A hillside lookout marked by a large cross above the south-east of Huaraz, with sweeping views over the city to the snowy peaks of the Cordillera Blanca. The walk up takes about an hour and is good acclimatisation before bigger treks. There have been reports of robberies on the path, so go in a group or take a taxi up.",
      },
      "selina-huaraz": {
        address: "Jirón Italia, Huaraz, Áncash, Peru",
        mapsQuery: "Selina Huaraz",
        description: "A colourful hostel about 12 minutes' walk from the Plaza de Armas, with dorms and private rooms, a garden, coworking space, a bar and yoga classes, plus tour bookings for Laguna 69, Pastoruri and the Santa Cruz trek. Selina has closed several properties in recent years, so check it's operating before you book.",
      },
    },
  },
  pucon: {
    spots: {
      "cafe-de-la-plaza-pucon": {
        name: "Café de la P",
        address: "O'Higgins 212, Pucón, Araucanía, Chile",
        mapsQuery: "Café de la P, Pucón",
        description: "A popular café on Pucón's main street serving specialty Arabica coffee, cakes and German-style kuchen, with outdoor seating and free Wi-Fi. It's a comfortable place to warm up after a volcano climb or rafting trip, or to plan the next adventure around Villarrica and the national parks.",
      },
      "chili-kiwi-hostel": {
        name: "Chili Kiwi Lakefront Hostel",
        address: "Roberto Geis 355, La Poza, Pucón, Araucanía, Chile",
        website: "https://chilikiwihostel.wixsite.com/chilikiwi",
        mapsQuery: "Chili Kiwi Hostel, Pucón",
        description: "A highly rated backpackers right on the lakefront in central Pucón, with dorms, private rooms and quirky treehouse-style accommodation, several kitchens, a big garden with a deck in a tree facing the lake for sunsets, and kayak rental. The multilingual staff give excellent advice on climbing Villarrica, hot springs and hikes.",
      },
      "volcan-villarrica": {
        address: "Villarrica National Park, near Pucón, Araucanía, Chile",
        mapsQuery: "Volcán Villarrica",
        description: "One of South America's most active volcanoes, a near-perfect snow cone rising 2,847m above Pucón, with a smoking crater that sometimes shows glowing lava. The summit climb is a long, strenuous day with ice axe and crampons, only with a certified guide; climbs are suspended when the alert level rises.",
      },
    },
  },
  "san-pedro-de-atacama": {
    spots: {
      "cafe-adobe-atacama": {
        name: "Adobe",
        address: "Caracoles 211, San Pedro de Atacama, Antofagasta, Chile",
        mapsQuery: "Adobe restaurant, Caracoles, San Pedro de Atacama",
        description: "A San Pedro classic since 1997, on the main street, with an adobe courtyard and a fire pit that's the social focus after sunset tours. It serves Chilean dishes with a modern twist, with vegetarian, vegan and gluten-free options, and stays open from noon until late. A lively place to eat alone.",
      },
      "hostal-la-ruca": {
        name: "La Rukka Hostal",
        address: "Toconao 513, San Pedro de Atacama, Antofagasta, Chile",
        mapsQuery: "La Rukka Hostal, San Pedro de Atacama",
        description: "A small, quiet hostal a few minutes' walk from the centre, with single, double and twin rooms with private bathrooms, a sunny interior patio and breakfast included. It's powered partly by solar panels, and staff help book tours and airport transfers. A peaceful alternative to the party hostels.",
      },
      "valle-de-la-luna": {
        address: "Valle de la Luna, about 13km west of San Pedro de Atacama, Chile",
        mapsQuery: "Valle de la Luna, San Pedro de Atacama",
        description: "A protected valley of wind-carved salt and clay formations, dunes and ridges within the Los Flamencos National Reserve, famous for sunsets that turn it red and gold. Visit by bike, car or tour; tickets must be bought online in advance and entry is limited. Take lots of water and sun protection.",
      },
    },
  },
  cali: {
    delete: ["la-pinta-hostel-cali"],
    spots: {
      "cafe-macondo-cali": {
        address: "Carrera 6 #3-03, San Antonio, Cali, Valle del Cauca, Colombia",
        mapsQuery: "Café Macondo, San Antonio, Cali",
        description: "A café in an old house in the San Antonio hill district, running since 2004 and decorated with warm lights and yellow butterflies inspired by García Márquez. It has a strong cultural programme — free films, jam sessions and jazz concerts — along with Colombian coffee, desserts and light meals.",
      },
      "gato-de-tejada": {
        name: "El Gato del Río (Gato de Tejada)",
        address: "Avenida del Río at Calle 3 Oeste, Cali, Valle del Cauca, Colombia",
        mapsQuery: "El Gato del Río, Cali",
        description: "A big bronze cat by sculptor Hernando Tejada beside the Cali River, unveiled in 1996 and now a much-loved city symbol, surrounded by a changing gallery of 'girlfriend' cats decorated by local artists. It's a pleasant stop on a walk along the riverside boulevard between San Antonio and Granada.",
      },
    },
  },
  quito: {
    spots: {
      "cafe-mosaico-quito": {
        address: "Manuel Samaniego N8-95 y Antepara, Itchimbía, Quito, Ecuador",
        website: "https://cafemosaico.com.ec/",
        mapsQuery: "Café Mosaico, Quito",
        description: "A café-restaurant on the Itchimbía hillside with mosaic-tiled terraces and one of the best views over Quito's colonial centre and the surrounding volcanoes. It's especially popular at sunset for drinks and snacks. Take a taxi up and back, as the streets around the hill are steep and quiet after dark.",
      },
      "community-hostel-quito": {
        address: "Pedro Fermín Cevallos N6-78 y Olmedo, Centro Histórico, Quito, Ecuador",
        website: "https://communityhostel.com/",
        mapsQuery: "Community Hostel, Quito",
        description: "A much-loved hostel in Quito's historic centre, famous for its family-style dinners, free walking tours and helpful staff, with dorms and private rooms. It's a very easy place for solo travellers to meet people, and within walking distance of the old town's churches and plazas.",
      },
      "la-compania-de-jesus": {
        address: "García Moreno y Sucre, Centro Histórico, Quito, Ecuador",
        mapsQuery: "Iglesia de la Compañía de Jesús, Quito",
        description: "Quito's most spectacular church, a Jesuit masterpiece built over more than 160 years from 1605, its interior covered in gold leaf, carved cedar and baroque detail. It's in the UNESCO-listed old town. There's an entry fee, photography inside may be restricted, and it's worth hiring the on-site guide.",
      },
    },
  },
  potosi: {
    spots: {
      "cafe-la-plata-potosi": {
        address: "Plaza 10 de Noviembre, Potosí, Bolivia",
        mapsQuery: "Café La Plata, Potosí",
        description: "A stylish café on Potosí's main square, a warm refuge at 4,000m, serving good coffee, sandwiches, salads and cakes, and its signature thick 'chocolate La Plata'. Some dishes use local ingredients with indigenous roots. A pleasant place to rest and acclimatise between the Mint and the churches.",
      },
      "casa-nacional-de-la-moneda": {
        address: "Calle Ayacucho, Potosí, Bolivia",
        mapsQuery: "Casa Nacional de Moneda, Potosí",
        description: "The colonial Royal Mint, completed in the 18th century, where silver from Cerro Rico was minted into coins that financed the Spanish Empire. It's now one of Bolivia's best museums, with original minting machinery, colonial art and minerals, and is visited on guided tours that run at set times. Dress warmly inside.",
      },
      "la-casona-hostel-potosi": {
        name: "Hostal La Casona",
        address: "Calle Chuquisaca 460, Potosí, Bolivia",
        mapsQuery: "Hostal La Casona, Potosí",
        description: "A guesthouse in an 18th-century colonial building about 100m from the historic centre, near the San Francisco church and the Mint, with simple rooms, Wi-Fi and breakfast. It's a practical, well-located base for Potosí, and staff can help arrange tours of the Cerro Rico cooperative mines.",
      },
    },
  },
  salvador: {
    delete: ["cafe-com-letras-salvador"],
    spots: {
      "elevador-lacerda": {
        address: "Praça Tomé de Sousa, Centro Histórico, Salvador, Bahia, Brazil",
        mapsQuery: "Elevador Lacerda, Salvador",
        description: "The Art Deco lift tower linking Salvador's Upper City and Lower City, first opened in 1873 and rebuilt in its current form in the 1930s. The short ride costs very little, and the viewing area at the top looks over the Bay of All Saints and the Mercado Modelo below. Watch your belongings in the crowds.",
      },
      "laranjeiras-hostel-salvador": {
        address: "Rua das Laranjeiras, Pelourinho, Salvador, Bahia, Brazil",
        website: "https://laranjeirashostel.com.br/nosso-hostel/",
        mapsQuery: "Laranjeiras Hostel, Pelourinho",
        description: "A Hostelling International hostel since 1994, in an 18th-century colonial house in the heart of the Pelourinho near the São Francisco church, with dorms and private rooms, a breakfast buffet and a crêperie. It's steps from capoeira circles, drumming groups and live music.",
      },
    },
  },
  "colonia-del-sacramento": {
    spots: {
      "barrio-historico-colonia": {
        address: "Barrio Histórico, Colonia del Sacramento, Uruguay",
        website: "https://whc.unesco.org/en/list/747/",
        mapsQuery: "Barrio Histórico, Colonia del Sacramento",
        description: "The UNESCO-listed old quarter founded by the Portuguese in 1680, a peninsula of cobbled lanes, low colonial houses, the Calle de los Suspiros and a lighthouse you can climb. It's an easy day trip by ferry from Buenos Aires, but staying overnight lets you enjoy the quiet streets and the sunset over the Río de la Plata.",
      },
      "charco-bistro-colonia": {
        address: "San Pedro 116, Barrio Histórico, Colonia del Sacramento, Uruguay",
        mapsQuery: "Charco Bistró, Colonia del Sacramento",
        description: "The bistro of the Charco boutique hotel in the old town, with a garden terrace looking over the Río de la Plata, serving Mediterranean-leaning dishes with Uruguayan ingredients from breakfast to dinner. It's a lovely place for a long lunch or a sunset glass of Tannat on your own.",
      },
      "el-viajero-hostel-colonia": {
        name: "Viajero Colonia Hostel",
        address: "Facing the Plaza and cathedral, Barrio Histórico, Colonia del Sacramento, Uruguay",
        mapsQuery: "Viajero Colonia Hostel",
        description: "A centrally located hostel right by the historic plaza and cathedral, with air-conditioned dorms and private rooms with shared or private bathrooms and free Wi-Fi. It's a relaxed, affordable base to explore the UNESCO old town on foot, and an easy walk from the ferry terminal.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
