// Small-city tail, batch 22: Arequipa, Cape Town, Kruger, Foz do Iguaçu, Puerto Natales, Manaus, Zagreb, Mexico City.
// Researched 2026-09-27.
//
// No deletions — all businesses verified.
// CORRECTED: Crepísimo is the Alianza Francesa restaurant at Santa Catalina 208; Once in Cape Town is at 73 Kloof St
//   (opened 2013); Cattle Baron Skukuza opened 2014, deck over the Sabie; Capitão Bar is at Av. Jorge Schimmelpfeng 288
//   (since 1999) — not Av. Brasil; Tetris Container Hostel is at Av. das Cataratas 639 — not Rua Eng. Reben; Café Kaikén
//   is at Baquedano 699 esq. Miraflores (since 2013); The Singing Lamb (HI) is at Arauco 779; Caxiri (chef Débora
//   Shornik) is at Rua 10 de Julho 495 facing the Teatro Amazonas — not Rua Belo Horizonte; Local Hostel is ~150m from
//   the theatre; El Parnita is a sit-down taco and torta spot (blue-corn tortillas), not standing-room; Café
//   Avellaneda is at Higuera 40A.
//
//   node scripts/add-tail-batch22-details.js [--apply]
const run = require("./_enrich-runner");

run({
  arequipa: {
    spots: {
      "crepisimo-arequipa": {
        name: "Crepísimo",
        address: "Santa Catalina 208, Arequipa, Peru",
        website: "https://www.crepisimo.com/",
        mapsQuery: "Crepísimo, Arequipa",
        description: "The restaurant of the Alianza Francesa, in a colonial mansion a few steps from the Santa Catalina Monastery, serving dozens of sweet and savoury crêpes that blend French tradition with Peruvian ingredients, plus good coffee. There's an inner courtyard terrace and board games — a relaxed place to linger alone.",
      },
      "monasterio-santa-catalina": {
        address: "Santa Catalina 301, Arequipa, Peru",
        website: "https://santacatalina.org.pe/",
        mapsQuery: "Monasterio de Santa Catalina, Arequipa",
        description: "A huge convent founded in 1579, a walled 'city within a city' of cobbled lanes, cloisters and cells painted in vivid blue, red and ochre. Some nuns still live in a section of it. Wander on your own or hire a guide at the entrance; on some evenings it opens by candlelight, which is especially atmospheric.",
      },
      "wild-rover-arequipa": {
        address: "Calle Ugarte 111, Arequipa, Peru",
        mapsQuery: "Wild Rover Hostel Arequipa",
        description: "A lively party hostel in a colonial building near the centre, part of the Wild Rover chain, with dorms and private rooms, a pool, a busy bar and restaurant, and nightly events. It's the social hub for backpackers and a good place to find company for Colca Canyon treks — but not for early nights.",
      },
    },
  },
  "cape-town": {
    spots: {
      "once-in-cape-town": {
        address: "73 Kloof Street, Gardens, Cape Town, South Africa",
        mapsQuery: "Once in Cape Town, Kloof Street",
        description: "A design-led hostel opened in 2013 on lively Kloof Street, with dorms and private rooms, views of Table Mountain, an on-site café and bar, and restaurants all around. It's a safe, social base for the city bowl, with easy Uber rides to the waterfront, the cableway and the beaches.",
      },
      "table-mountain-cableway": {
        address: "Tafelberg Road, Cape Town, South Africa",
        website: "https://www.tablemountain.net/",
        mapsQuery: "Table Mountain Aerial Cableway",
        description: "The rotating cable car to the flat top of Table Mountain, with views over the city, Robben Island and the Cape Peninsula, and short walking paths across the summit plateau. It closes in high wind or cloud, so check the status before you go, and buy tickets online. Hikers can go up via Platteklip Gorge.",
      },
      "truth-coffee-cape-town": {
        address: "36 Buitenkant Street, Cape Town, South Africa",
        website: "https://truth.coffee/",
        mapsQuery: "Truth Coffee Roasting, Buitenkant Street",
        description: "A steampunk-styled roastery café in the city centre, with a giant vintage roaster, copper pipes and staff in period outfits, once named the world's best coffee shop by a British newspaper. The coffee is serious, and there's a full breakfast and lunch menu. A fun, theatrical place to sit at the bar alone.",
      },
    },
  },
  kruger: {
    spots: {
      "cattle-baron-skukuza": {
        address: "Skukuza Rest Camp, Kruger National Park, South Africa",
        website: "https://www.cattlebaron.co.za/cattle-baron-skukuza-kruger-national-park/",
        mapsQuery: "Cattle Baron Skukuza",
        description: "A grill and bistro that opened at Skukuza in 2014, with a large deck overlooking the Sabie River where you might spot hippos, elephants and birds while you eat. It serves steaks, venison dishes and lighter meals from breakfast to dinner — a welcome treat after a day of self-drive game viewing.",
      },
      "sabie-river-big-five": {
        name: "Sabie River roads (southern Kruger)",
        address: "H4-1 between Skukuza and Lower Sabie, Kruger National Park, South Africa",
        mapsQuery: "H4-1 Skukuza to Lower Sabie road, Kruger",
        description: "The tarred H4-1 road along the Sabie River between Skukuza and Lower Sabie, one of the most rewarding self-drive routes in Kruger, with frequent sightings of elephants, lions, leopards and buffalo near the water. Drive slowly, stay in your car, and be back in camp before the gates close.",
      },
      "skukuza-restcamp": {
        address: "Skukuza, Kruger National Park, South Africa",
        website: "https://www.sanparks.org/",
        mapsQuery: "Skukuza Rest Camp",
        description: "Kruger's largest rest camp and administrative centre, on the banks of the Sabie River, with chalets, safari tents and camping, restaurants, a shop, fuel and an airport nearby. It's a practical base for the rich southern section of the park; book accommodation well ahead through SANParks.",
      },
    },
  },
  "foz-do-iguacu": {
    spots: {
      "capitao-bar-foz": {
        address: "Av. Jorge Schimmelpfeng 288, Centro, Foz do Iguaçu, Paraná, Brazil",
        mapsQuery: "Capitão Bar, Foz do Iguaçu",
        description: "A busy corner bar and restaurant in the centre of Foz, running since 1999, with a big terrace, sports on large screens, live music on some nights, and a long menu of snacks, grills and cold draught beer. It's lively and friendly, and an easy place to eat and drink alone after a day at the falls.",
      },
      "parque-das-aves": {
        address: "Av. das Cataratas, km 17.1, Foz do Iguaçu, Paraná, Brazil",
        website: "https://www.parquedasaves.com.br/",
        mapsQuery: "Parque das Aves, Foz do Iguaçu",
        description: "A bird park next to the entrance to the Brazilian side of the Iguaçu Falls, focused on the conservation of Atlantic Forest species, where paths lead through large walk-in aviaries with toucans, macaws, flamingos and hummingbirds. Allow about two hours, and combine it with the falls the same day.",
      },
      "tetris-container-hostel": {
        address: "Av. das Cataratas 639, Vila Yolanda, Foz do Iguaçu, Paraná, Brazil",
        mapsQuery: "Tetris Container Hostel, Foz do Iguaçu",
        description: "A creative hostel built from stacked shipping containers on the avenue to the falls, with dorms and private rooms, a swimming pool, a bar and a large chill-out and recreation area. It's sociable and well placed for buses to both the Brazilian and Argentine sides of the Iguaçu Falls.",
      },
    },
  },
  "puerto-natales": {
    spots: {
      "cafe-kaiken-puerto-natales": {
        name: "Café Kaikén",
        address: "Baquedano 699 esq. Miraflores, Puerto Natales, Magallanes, Chile",
        mapsQuery: "Café Kaikén, Puerto Natales",
        description: "A small, much-loved restaurant opened in 2013 with only a handful of tables, serving Chilean and Patagonian dishes such as salmon-stuffed pasta, hare and risottos, plus homemade cakes. It's one of the town's top-rated places to eat and fills up quickly, so reserve or arrive early — ideal for a hearty solo dinner after the W trek.",
      },
      "costanera-puerto-natales": {
        address: "Av. Pedro Montt, Puerto Natales, Magallanes, Chile",
        mapsQuery: "Costanera Puerto Natales",
        description: "The waterfront promenade along the Última Esperanza Sound, with views across the fjord to snowy peaks, black-necked swans on the water, the old pier, and the much-photographed wind-bent 'Monumento al Viento' sculpture. It's especially beautiful at sunset on a calm day.",
      },
      "singing-lamb-hostel": {
        name: "The Singing Lamb",
        address: "Arauco 779, Puerto Natales, Magallanes, Chile",
        mapsQuery: "The Singing Lamb, Puerto Natales",
        description: "A warm, clean Hostelling International hostel about 1km from the centre, known for its generous breakfast with eggs, homemade jams and wholemeal bread, and for helpful staff who give good advice on organising the W trek and gear rental for Torres del Paine.",
      },
    },
  },
  manaus: {
    spots: {
      "caxiri-manaus": {
        address: "Rua 10 de Julho 495, Centro, Manaus, Amazonas, Brazil",
        mapsQuery: "Restaurante Caxiri, Manaus",
        description: "Chef Débora Shornik's restaurant of contemporary Amazonian cuisine, in a restored mansion with windows looking onto the Teatro Amazonas, featured on Latin America's 50 Best Discovery. The seasonal menu showcases river fish such as tambaqui and pirarucu, tucupi and forest fruits.",
      },
      "local-hostel-manaus": {
        address: "Centro, about 150m from the Teatro Amazonas, Manaus, Amazonas, Brazil",
        website: "https://localhostel.com.br/manaus",
        mapsQuery: "Local Hostel Manaus",
        description: "A clean, friendly hostel in central Manaus, a short walk from the Teatro Amazonas, with a bar, a shared kitchen, a 24-hour reception and a tour desk. It's the go-to base for arranging jungle-lodge stays, the Meeting of the Waters and riverboat trips into the Amazon.",
      },
      "teatro-amazonas": {
        address: "Largo de São Sebastião, Centro, Manaus, Amazonas, Brazil",
        mapsQuery: "Teatro Amazonas, Manaus",
        description: "The opulent opera house built in 1896 at the height of the rubber boom, with a dome of colourful glazed tiles and a lavish interior of Italian marble and French ironwork. Guided tours run most days, and tickets to concerts and the annual Amazonas Opera Festival are affordable.",
      },
    },
  },
  zagreb: {
    spots: {
      "dolac-market": {
        address: "Dolac 9, Zagreb, Croatia",
        mapsQuery: "Dolac Market, Zagreb",
        description: "Zagreb's main farmers' market, on a raised square just above Ban Jelačić Square, with rows of red umbrellas over stalls of fruit, vegetables and flowers, and an indoor hall below for meat, fish and local cheeses. Go in the morning, when it's liveliest; it winds down by early afternoon.",
      },
      "museum-of-broken-relationships": {
        address: "Ćirilometodska 2, Upper Town, Zagreb, Croatia",
        website: "https://brokenships.com/",
        mapsQuery: "Museum of Broken Relationships, Zagreb",
        description: "A museum of objects donated by people around the world from their past relationships, each displayed with the donor's short story — by turns funny, heartbreaking and strange. It's small, very popular and a surprisingly moving visit alone; there's a café and shop.",
      },
      "strossmayer-promenade-stross": {
        address: "Strossmayerovo šetalište, Upper Town, Zagreb, Croatia",
        mapsQuery: "Strossmayer Promenade, Zagreb",
        description: "A tree-lined promenade along the old walls of the Upper Town, with views over the rooftops of Lower Zagreb, next to the Lotrščak Tower, whose cannon fires daily at noon. In summer, 'Strossmartre' brings pop-up bars, music and art stalls in the evenings.",
      },
    },
  },
  "mexico-city": {
    spots: {
      "cafe-avellaneda": {
        address: "Higuera 40A, Coyoacán, Mexico City, Mexico",
        mapsQuery: "Café Avellaneda, Coyoacán",
        description: "A small, highly regarded specialty coffee bar in the historic centre of Coyoacán, serving carefully brewed Mexican coffees by espresso and filter methods. It's a relaxed, friendly place for a solo coffee break, and a good stop before or after the Frida Kahlo Museum and the Coyoacán market.",
      },
      "el-parnita": {
        address: "Av. Yucatán 84, Roma Norte, Mexico City, Mexico",
        mapsQuery: "El Parnita, Roma Norte",
        description: "A popular, casual spot in Roma Norte for tacos and tortas served on homemade blue-corn tortillas, often with live music. Favourites include the 'carmelita' breaded-shrimp taco and the 'zacatlán' zucchini taco. It gets busy, especially at weekends, so check opening hours and go early.",
      },
      "museo-frida-kahlo": {
        name: "Museo Frida Kahlo (Casa Azul)",
        address: "Londres 247, Coyoacán, Mexico City, Mexico",
        website: "https://www.museofridakahlo.org.mx/",
        mapsQuery: "Museo Frida Kahlo, Coyoacán",
        description: "The cobalt-blue house where Frida Kahlo was born, lived with Diego Rivera and died, preserving her studio, kitchen, garden and personal belongings, plus a display of her clothes. Tickets must be bought online in advance for a timed entry slot, and it's closed on Mondays.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
