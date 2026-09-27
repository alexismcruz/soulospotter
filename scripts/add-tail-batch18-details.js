// Small-city tail, batch 18: Merzouga, Monteverde, Swakopmund, Tegucigalpa, San Cristóbal, Encarnación, Portland,
// Byron Bay. Researched 2026-09-27.
//
// DELETED: "Erg Chebbi Desert Camp" (generic, not a specific business); "Casa Quinchon Hostel" (Casa Quinchon is a
//   coworking/entrepreneurship building in the centre, not a guesthouse); "Cafetería del Sur", Encarnación (no
//   trace); "Flow Athletic Byron Bay" (Flow Athletic is a Sydney studio — no Byron Bay location found).
// CORRECTED: Café Nora is in Khamlia, ~7km south of Merzouga, run by Hassan (Berber pizza, cooking classes);
//   Café Monteverde is the Santa Elena café of a farmers' cooperative (next to the post office); Sloth Backpackers is
//   ~7km from the reserve; Skeleton Beach Backpackers is 250m from the beach (est. 2011); The Tug opened 1993 by the
//   jetty; Slowtown opened its first shop in Swakopmund in 2011; Café Paradiso is at 1351 Av. Barahona, Barrio La
//   Hoya; Frontera is at Av. Belisario Domínguez 35; Rossco at Real de Mexicanos 16 (since 2003); De La Costa Hotel at
//   Av. Rodríguez de Francia 1240 on Playa San José.
//
//   node scripts/add-tail-batch18-details.js [--apply]
const run = require("./_enrich-runner");

run({
  merzouga: {
    delete: ["erg-chebbi-desert-camp"],
    spots: {
      "cafe-nora-merzouga": {
        name: "Restaurant Café Nora",
        address: "Khamlia, about 7km south of Merzouga, Morocco",
        mapsQuery: "Restaurant Cafe Nora, Khamlia",
        description: "A friendly, family-run restaurant in the Gnawa village of Khamlia, on the road south of Merzouga, where the owner cooks and serves in traditional dress. The speciality is Berber pizza — flatbread stuffed with spiced meat and vegetables — and there are cooking classes. Pair it with a visit to Khamlia's Gnawa musicians.",
      },
      "erg-chebbi-dunes": {
        address: "Erg Chebbi, Merzouga, Errachidia, Morocco",
        mapsQuery: "Erg Chebbi",
        description: "Morocco's most famous sea of dunes, rising up to about 150m on the edge of Merzouga, glowing orange and pink at sunrise and sunset. Most visitors ride camels or walk out to overnight desert camps; choose an operator with clear pricing and good recent reviews. Summer days are extremely hot, so go in the cooler months.",
      },
    },
  },
  monteverde: {
    spots: {
      "cafe-monteverde": {
        address: "Next to the post office, Santa Elena, Monteverde, Costa Rica",
        website: "https://cafedemonteverde.com/cafeterias/",
        mapsQuery: "Café Monteverde, Santa Elena",
        description: "The café of a cooperative of local families who grow coffee in harmony with the cloud forest around Santa Elena, a short walk from the town centre. It serves their own coffee, seasonal fruit drinks and even a coffee beer, and sells beans to take home. The cooperative also runs farm tours and tastings nearby.",
      },
      "monteverde-cloud-forest": {
        address: "Monteverde Cloud Forest Biological Reserve, Monteverde, Puntarenas, Costa Rica",
        website: "https://monteverdecloudforest.org/",
        mapsQuery: "Monteverde Cloud Forest Biological Reserve",
        description: "A private reserve protecting misty cloud forest high on the continental divide, with trails, a suspension bridge and wildlife such as the resplendent quetzal, hummingbirds and howler monkeys. Visitor numbers are limited, so arrive early or book ahead, and hire a guide to spot the birds. Bring a rain jacket.",
      },
      "sloth-backpackers-monteverde": {
        address: "Santa Elena, Monteverde, Puntarenas, Costa Rica",
        mapsQuery: "Sloth Backpackers, Monteverde",
        description: "A small, friendly hostel and B&B in Santa Elena, about 7km from the Monteverde reserve, with simple private rooms with hot showers (some with balconies), dorms, and a shared kitchen. Staff arrange ziplining, night walks and horse riding, and it's a good-value base for exploring the cloud forest.",
      },
    },
  },
  swakopmund: {
    spots: {
      "skeleton-beach-backpackers": {
        address: "About 250m from the beach, Swakopmund, Namibia",
        website: "https://www.skeletonbeachbackpackers.com/",
        mapsQuery: "Skeleton Beach Backpackers, Swakopmund",
        description: "A backpackers opened in 2011, about 250m from the beach and a short walk from the town centre, with dorms and private rooms, a well-equipped kitchen, a garden with barbecue area and safe parking. It's a sociable base for Swakopmund's adventure activities: sandboarding, quad biking, skydiving and trips to Sandwich Harbour.",
      },
      "slowtown-swakopmund": {
        name: "Slowtown Coffee Roasters Swakopmund",
        address: "Central Swakopmund, Namibia",
        website: "https://slowtowncoffee.com/",
        mapsQuery: "Slowtown Coffee Roasters, Swakopmund",
        description: "The original café of Namibia's leading specialty coffee roaster, founded by a surfer, which opened its first shop in Swakopmund in 2011. It's a relaxed courtyard café near the coast serving excellent coffee and pastries, and a good place to linger, work or meet people between desert adventures.",
      },
      "the-tug-swakopmund": {
        address: "By the Jetty, Swakopmund, Namibia",
        website: "https://www.the-tug.com/",
        mapsQuery: "The Tug Restaurant, Swakopmund",
        description: "A seafood restaurant built around an old tugboat beside Swakopmund's jetty, open since 1993, with Atlantic views. It serves kingklip, kabeljou, rock lobster and local oysters, plus meat and vegetarian dishes and a long South African wine list. Dinners are popular, so book for a sunset table.",
      },
    },
  },
  tegucigalpa: {
    delete: ["casa-quinchon-hostel"],
    spots: {
      "basilica-de-suyapa": {
        address: "Colonia Suyapa, Tegucigalpa, Honduras",
        mapsQuery: "Basílica de Suyapa, Tegucigalpa",
        description: "The large basilica on the eastern side of Tegucigalpa built to house the Virgin of Suyapa, a tiny wooden statue that is the patron saint of Honduras. It's the country's main pilgrimage site, especially around her feast day on 3 February. The statue itself is often kept in the nearby old church. Visit by taxi.",
      },
      "cafe-paradiso-tegucigalpa": {
        address: "1351 Avenida Barahona, Barrio La Hoya, Tegucigalpa, Honduras",
        mapsQuery: "Café Paradiso, Tegucigalpa",
        description: "A long-standing cultural café and gallery in central Tegucigalpa, serving Honduran coffee in many forms — including a famous carajillo with cognac — plus food, with art exhibitions, poetry readings and weekly film screenings. A welcoming, bohemian place to meet local creatives. Take a taxi at night.",
      },
    },
  },
  "san-cristobal-de-las-casas": {
    spots: {
      "frontera-artisan-coffee-sancris": {
        name: "Frontera Artisan Food & Coffee",
        address: "Avenida Belisario Domínguez 35, San Cristóbal de las Casas, Chiapas, Mexico",
        mapsQuery: "Frontera Artisan Food & Coffee, San Cristóbal",
        description: "A specialty café serving coffee from Chiapas and Oaxaca prepared by espresso, V60, Chemex, AeroPress or French press, alongside a seasonal breakfast and lunch menu and homemade desserts. It opens onto a courtyard shared with other artisan businesses — a calm place to sit alone. Beans are sold to take away.",
      },
      "rossco-backpackers-sancris": {
        name: "Rossco Backpackers Hostel",
        address: "Real de Mexicanos 16, San Cristóbal de las Casas, Chiapas, Mexico",
        mapsQuery: "Rossco Backpackers Hostel, San Cristóbal",
        description: "A hacienda-style hostel running since 2003, less than 10 minutes' walk from the main square, with dorms and private rooms, a garden terrace with a bonfire every night, a shared kitchen and free breakfast. It's a sociable base for the Chiapas highlands, Sumidero Canyon and the Maya villages of San Juan Chamula and Zinacantán.",
      },
      "templo-de-santo-domingo-sancris": {
        address: "Avenida General Utrilla, San Cristóbal de las Casas, Chiapas, Mexico",
        mapsQuery: "Templo de Santo Domingo, San Cristóbal de las Casas",
        description: "A 16th-century church with an elaborate baroque pink facade and a richly gilded interior, a few blocks north of the main square. Around it spreads a large craft market where Maya women from the surrounding highland villages sell textiles, embroidery and amber. Bargain respectfully; the market is busiest in the morning.",
      },
    },
  },
  encarnacion: {
    delete: ["cafeteria-del-sur-encarnacion"],
    spots: {
      "hotel-de-la-costa-encarnacion": {
        name: "De La Costa Hotel",
        address: "Av. Rodríguez de Francia 1240 c/ Cerro Corá, Encarnación, Itapúa, Paraguay",
        website: "https://www.delacostahotel.com.py/",
        description: "A comfortable hotel facing Playa San José and the costanera, with a pool, restaurant, the XOXO specialty café, and views across the Paraná River to Posadas in Argentina from many rooms. It's well placed for the beach, February Carnaval and day trips to the Jesuit ruins of Trinidad and Jesús.",
      },
      "playa-san-jose-encarnacion": {
        address: "Costanera, Encarnación, Itapúa, Paraguay",
        mapsQuery: "Playa San José, Encarnación",
        description: "A long, sandy river beach on the Paraná in the centre of Encarnación, created with the costanera promenade, busy in the hot summer months with swimmers, kiosks and people sharing tereré. The costanera is great for walking or cycling at sunset, with views across to Posadas in Argentina.",
      },
    },
  },
  portland: {
    spots: {
      "forest-park": {
        address: "Lower Macleay trailhead, NW 29th Ave & Upshur St, Portland, Oregon, USA",
        website: "https://forestparkconservancy.org/",
        description: "One of the largest urban forests in the United States, with more than 80 miles of trails through fir and maple forest in Portland's West Hills. The Lower Macleay Trail follows a creek up to the Stone House ruin and the Wildwood Trail. It's easy to reach by bus or bike and quiet on weekdays — a great solo reset.",
      },
      "powells-books": {
        name: "Powell's City of Books",
        address: "1005 W Burnside St, Portland, Oregon, USA",
        website: "https://www.powells.com/",
        mapsQuery: "Powell's City of Books, Portland",
        description: "A giant independent bookstore occupying a full city block, with new and used books side by side across colour-coded rooms, plus a rare-book room and a café. Grab a store map at the entrance. It's easy to lose hours browsing alone, and the staff recommendation cards are excellent.",
      },
      "society-hotel": {
        name: "The Society Hotel",
        address: "203 NW 3rd Ave, Portland, Oregon, USA",
        website: "https://thesocietyhotel.com/",
        description: "A restored 1881 building in Old Town/Chinatown, once a boarding house for sailors, now a hotel with private rooms, a bunk room with pod-style beds, a café and a rooftop deck. It's stylish, sociable and good value, with light rail, the Saturday Market and the riverfront within walking distance.",
      },
    },
  },
  "byron-bay": {
    delete: ["flow-athletic-byron"],
    spots: {
      "cape-byron-lighthouse-walk": {
        address: "Cape Byron State Conservation Area, Lighthouse Road, Byron Bay, NSW, Australia",
        mapsQuery: "Cape Byron Lighthouse",
        description: "A 3.7km loop from Clarkes Beach or the Pass up to the Cape Byron Lighthouse at mainland Australia's most easterly point, through rainforest and along clifftops, with views of dolphins, turtles and, from about June to November, migrating humpback whales. Go at sunrise to be among the first in the country to see it.",
      },
      "elements-of-byron": {
        address: "144 Bayshore Drive, Byron Bay, NSW, Australia",
        website: "https://elementsofbyron.com.au/",
        description: "A beachfront resort set among bushland and wetlands on Belongil Beach, with villas, pools, a spa and restaurants, and wallabies grazing the grounds. It's a splurge, but peaceful and self-contained, and a short bike ride or shuttle from town — a treat for solo travellers who want to recharge.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
