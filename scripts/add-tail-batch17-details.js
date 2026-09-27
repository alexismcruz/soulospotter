// Small-city tail, batch 17: Ilha de Moçambique, Tofo, Aswan, Bulawayo, Bwindi, Cape Coast, Gisenyi, Harare.
// Researched 2026-09-27.
//
// DELETED: "Tofo Tofo Beach Café" (no café of that name found); "Gorilla Friends Café", Buhoma (no trace).
// CORRECTED: Casa de Gabriel is Casa do Gabriel / Pátio dos Quintalinhos (rooftop terrace, pool); Relíquias is on
//   the west side next to the Palácio de São Paulo museum, with a seafront terrace; Mozambeat Motel is ~20 minutes'
//   walk from the beach (13 rooms, pool, yoga studio, upstairs deck); Nubian House restaurant is on the East Bank
//   near the Nubian Museum, looking over the First Cataract and Aga Khan Mausoleum (not Elephantine); Burke's
//   Backpackers Paradise is ~15 min by car from town, run by owner Adam Burke; Indaba Book Café is at 92 Josiah
//   Tongogara Ave, family-run since founder Tony De Calia's death in 2009; Buhoma Community Rest Camp (since 1993) is
//   2 min from the park HQ; Baobab House is a vegetarian social enterprise of the Baobab School; Oasis is 5 min from
//   the castle; INZU Lodge is an eco tented camp (A-frame bungalows, solar); Paradis Malahide is in Rubona, ~7km
//   south of Gisenyi; Small World Backpackers is in Avondale near Café Nush Avondale.
//
//   node scripts/add-tail-batch17-details.js [--apply]
const run = require("./_enrich-runner");

run({
  "ilha-de-mocambique": {
    spots: {
      "casa-de-gabriel-ilha": {
        name: "Casa do Gabriel (Pátio dos Quintalinhos)",
        address: "Stone Town, Ilha de Moçambique, Nampula, Mozambique",
        mapsQuery: "Patio dos Quintalinhos, Ilha de Moçambique",
        description: "A restored colonial house in the stone town turned into a guesthouse, run by its welcoming owner Gabriel, with individually decorated rooms, a small pool and a rooftop terrace where breakfast is served. Gabriel is full of advice on the island, and it's a comfortable, characterful base on this UNESCO-listed island.",
      },
      "reliquias-ilha": {
        name: "Relíquias",
        address: "Beside the Palácio de São Paulo, Stone Town, Ilha de Moçambique, Mozambique",
        mapsQuery: "Reliquias, Ilha de Moçambique",
        description: "A restaurant in an old building next to the Palácio de São Paulo museum on the island's west side, with a seafront terrace out the back that's perfect for a cold beer at sunset. It serves fresh seafood, curries and Mozambican-Portuguese dishes with good service and fair prices. A relaxed place to dine alone.",
      },
      "stone-town-ilha": {
        name: "Stone Town, Ilha de Moçambique",
        address: "Ilha de Moçambique, Nampula, Mozambique",
        website: "https://whc.unesco.org/en/list/599/",
        mapsQuery: "Ilha de Moçambique",
        description: "The UNESCO-listed northern half of the island, capital of Portuguese East Africa until 1898, with coral-stone mansions, churches, the Palácio de São Paulo museum and the Fortress of São Sebastião, whose Chapel of Nossa Senhora do Baluarte (1522) is often called the oldest European building in the southern hemisphere.",
      },
    },
  },
  tofo: {
    delete: ["tofo-beach-cafe"],
    spots: {
      "mozambeat-motel-tofo": {
        address: "Tofo, Inhambane, Mozambique",
        mapsQuery: "Mozambeat Motel, Tofo",
        description: "A colourful, sociable motel-hostel in the dunes behind Tofo, about a 20-minute walk from the beach and market, with around 13 rooms, a pool, a yoga studio and a restaurant and bar. Its big upstairs deck is the place for sunsets and turns into a dancefloor at night. A lively base for diving with mantas and whale sharks.",
      },
      "tofo-beach": {
        address: "Praia do Tofo, Inhambane, Mozambique",
        mapsQuery: "Praia do Tofo",
        description: "A long, sweeping Indian Ocean beach known worldwide for diving and snorkelling with whale sharks and manta rays, with humpback whales passing roughly from June to October. The village has dive centres, cafés and a small market. Choose operators that follow responsible-encounter guidelines with the marine life.",
      },
    },
  },
  aswan: {
    spots: {
      "bob-marley-nubian-house-aswan": {
        name: "Bob Marley Nubian Guesthouse",
        address: "West Bank, Aswan, Egypt",
        mapsQuery: "Bob Marley House, Aswan",
        description: "A colourful, family-run Nubian guesthouse on the West Bank of the Nile, reached by boat from Aswan, with painted rooms and a roof terrace looking over the river. Home-cooked Nubian tagines — chicken, fish, vegetable or camel — are served on the terrace. A friendly, simple way to experience a Nubian village.",
      },
      "nubian-house-aswan": {
        name: "Nubian House Restaurant",
        address: "East Bank, near the Nubian Museum, Aswan, Egypt",
        mapsQuery: "Nubian House Restaurant, Aswan",
        description: "A colourful Nubian restaurant on a hill less than 1km from the Nubian Museum, with a terrace looking across the Nile's First Cataract to the Aga Khan Mausoleum. The Nubian dishes are good, but the real draw is the peaceful sunset view; henna painting and occasional Nubian music add to the atmosphere.",
      },
      "philae-temple": {
        address: "Agilkia Island, near the Aswan Low Dam, Aswan, Egypt",
        mapsQuery: "Philae Temple, Aswan",
        description: "The graceful temple complex of the goddess Isis, moved block by block from flooded Philae Island to Agilkia Island in the 1970s as part of the UNESCO Nubian campaign. It's reached by a short motorboat ride from the Shellal landing; agree the boat price first. The evening sound-and-light show is atmospheric.",
      },
    },
  },
  bulawayo: {
    spots: {
      "burkes-paradise-bulawayo": {
        name: "Burke's Backpackers Paradise",
        address: "Suburbs, about 15 minutes' drive from central Bulawayo, Zimbabwe",
        mapsQuery: "Burkes Backpackers Paradise, Bulawayo",
        description: "A peaceful backpackers in a big garden on the outskirts of Bulawayo, run by its hands-on owner, with dorms, twin and double rooms, camping, a small kitchen and a pool. It's quiet and friendly, with an honesty bar, and a good base for day trips to the Matobo Hills and Khami ruins. It's about 15 minutes by car from town.",
      },
      "indaba-book-cafe-bulawayo": {
        address: "92 Josiah Tongogara Avenue, Bulawayo, Zimbabwe",
        mapsQuery: "Indaba Book Cafe, Bulawayo",
        description: "A family-run café and bookshop in central Bulawayo, stocked with Zimbabwean and international authors, serving breakfasts, lunches, coffee and milkshakes. It hosts book launches and signings for local writers, and has a cosy lounge with Wi-Fi — an easy, welcoming place to sit alone with a book.",
      },
      "matobo-national-park": {
        address: "Matobo National Park, about 35km south of Bulawayo, Zimbabwe",
        website: "https://whc.unesco.org/en/list/306/",
        mapsQuery: "Matobo National Park",
        description: "A UNESCO-listed landscape of huge granite domes and balancing boulders, sacred to local people, with some of southern Africa's finest San rock paintings, white and black rhinos in the game park, and Cecil Rhodes's grave at World's View. Rhino walks with armed rangers are a highlight; go with a local guide.",
      },
    },
  },
  bwindi: {
    delete: ["gorilla-friends-cafe-bwindi"],
    spots: {
      "buhoma-community-rest-camp": {
        address: "Buhoma, next to the park headquarters, Bwindi Impenetrable National Park, Uganda",
        mapsQuery: "Buhoma Community Rest Camp",
        description: "A community-owned camp founded in 1993, about two minutes' walk from the Buhoma park headquarters where gorilla treks begin, with self-contained safari tents looking onto the forest, cottages, simpler bandas and camping, plus a restaurant and bar. Profits support local community projects.",
      },
      "bwindi-impenetrable-forest": {
        address: "Bwindi Impenetrable National Park, south-western Uganda",
        website: "https://ugandawildlife.org/",
        mapsQuery: "Bwindi Impenetrable National Park",
        description: "A UNESCO-listed, steep and ancient rainforest that shelters around half of the world's mountain gorillas. Gorilla-trekking permits are limited and sold by the Uganda Wildlife Authority, so book months ahead. Treks can take from one to several hours through thick vegetation; hire a porter and bring gloves and rain gear.",
      },
    },
  },
  "cape-coast": {
    spots: {
      "baobab-house-cape-coast": {
        address: "Between Cape Coast Castle and the market, Cape Coast, Ghana",
        website: "https://www.facebook.com/baobabhouse/",
        mapsQuery: "Baobab House, Cape Coast",
        description: "A small vegetarian café and craft shop run as a social enterprise by the Baobab School for Trades and Traditional Arts, whose students help prepare the food. It serves healthy vegetarian and vegan plates, snacks and fresh juices daily from early morning, and sells crafts made at the school.",
      },
      "cape-coast-castle": {
        address: "Victoria Road, Cape Coast, Ghana",
        website: "https://whc.unesco.org/en/list/34/",
        mapsQuery: "Cape Coast Castle",
        description: "A whitewashed fortress on the Atlantic, one of the UNESCO-listed forts of Ghana's coast, where enslaved Africans were held in dark dungeons before being shipped across the Atlantic through the 'Door of No Return'. The guided tour is harrowing and essential. Allow at least an hour and a half.",
      },
      "oasis-beach-resort-cape-coast": {
        address: "Seafront, near Cape Coast Castle, Cape Coast, Ghana",
        mapsQuery: "Oasis Beach Resort, Cape Coast",
        description: "A beachfront resort and backpacker hangout about five minutes' walk from Cape Coast Castle, with rooms and chalets, a restaurant serving Ghanaian and international food, and a beach bar. Its Saturday beach parties are popular, and it's an easy, social place for solo travellers to meet others.",
      },
    },
  },
  gisenyi: {
    spots: {
      "inzu-lodge-deck-gisenyi": {
        name: "INZU Lodge",
        address: "Nyamyumba, Rubavu, Lake Kivu, Rwanda",
        mapsQuery: "INZU Lodge, Gisenyi",
        description: "A small eco-lodge on a hillside above Lake Kivu south of Gisenyi, with safari tents and A-frame bamboo bungalows built from local materials and powered by solar energy. Its deck and restaurant have sweeping lake views, ideal for sundowners and simple Rwandan meals. A peaceful, affordable lakeside stay.",
      },
      "lake-kivu-beach-gisenyi": {
        address: "Lakeshore, Gisenyi (Rubavu), Rwanda",
        mapsQuery: "Gisenyi Public Beach, Lake Kivu",
        description: "The sandy lakeshore of Gisenyi, lined with palms and old villas, where locals and visitors swim in Lake Kivu, which is generally considered free of bilharzia. It's a relaxed place for a walk, a swim or kayaking, and for watching sunsets over the hills. The Congo Nile Trail starts from the town.",
      },
      "paradis-malahide-gisenyi": {
        name: "Paradis Malahide",
        address: "Rubona, about 7km south of Gisenyi, Lake Kivu, Rwanda",
        website: "https://www.paradisemalahide.com/",
        mapsQuery: "Paradis Malahide, Rubona",
        description: "A long-established lakeside hotel in the village of Rubona, about 7km south of Gisenyi, with bungalows built from local wood and volcanic rock, its own small beach and views over the islands of Lake Kivu. The restaurant is known for fresh lake fish. A tranquil base for boat trips and the hot springs.",
      },
    },
  },
  harare: {
    spots: {
      "cafe-nush-harare": {
        name: "Café Nush Avondale",
        address: "Avondale, Harare, Zimbabwe",
        mapsQuery: "Cafe Nush Avondale, Harare",
        description: "A popular artisanal bakery and café in Avondale, with a sister branch at Village Walk, serving good coffee, breakfasts, pizza and light meals with international and Zimbabwean flavours (all halal). It's a relaxed meeting place and a comfortable spot to work, a short walk from the backpacker lodges in the area.",
      },
      "national-gallery-zimbabwe": {
        address: "Park Lane, Harare, Zimbabwe",
        mapsQuery: "National Gallery of Zimbabwe, Harare",
        description: "The country's main art museum, by Harare Gardens, with rotating exhibitions of contemporary Zimbabwean and African art, and a collection of the famous Shona stone sculpture. There's a small shop and a sculpture garden. It's a calm, rewarding visit and a good introduction to the local art scene.",
      },
      "small-world-backpackers-harare": {
        name: "It's a Small World Backpackers Lodge",
        address: "Avondale, Harare, Zimbabwe",
        website: "https://smallworldlodge.com/avondale/",
        mapsQuery: "Small World Backpackers Lodge, Avondale, Harare",
        description: "A friendly backpackers lodge in the leafy suburb of Avondale, with dorms, private en-suite rooms and camping, a bar and restaurant, a self-catering kitchen, a pool and a terrace garden full of Zimbabwean sculptures. It's a safe, sociable base near Avondale's shops and cafés.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
