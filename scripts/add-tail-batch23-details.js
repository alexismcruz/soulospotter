// Small-city tail, batch 23: New Mexico, San Francisco, Quebec City, Santa Cruz (BO), Sucre, Split, Nashville,
// New Orleans. Researched 2026-09-27/28.
//
// No deletions.
// CORRECTED: Prince's Hot Chicken's original Ewing Drive shack closed permanently in 2019 after a 2018 fire — the
//   flagship is now Prince's South at 5814 Nolensville Pike; Café du Monde is no longer 24/7 (7:15am–11pm, to midnight
//   Fri–Sat); Lafayette Cemetery No. 1 reopens 1 Oct 2026 after a seven-year closure, guided PRC tours only;
//   Frenchmen Street clubs often charge a cover or have a drink minimum; Kultur Berlin is a party hostel (nightly
//   themed parties) — Spanish-school claim removed; Jodanga is ~2.2km from the centre (pool, breakfast).
//
//   node scripts/add-tail-batch23-details.js [--apply]
const run = require("./_enrich-runner");

run({
  "new-mexico": {
    spots: {
      "meow-wolf-santa-fe": {
        name: "Meow Wolf: House of Eternal Return",
        address: "1352 Rufina Circle, Santa Fe, New Mexico, USA",
        website: "https://meowwolf.com/visit/santa-fe",
        description: "Meow Wolf's original immersive art installation, built by a Santa Fe artist collective inside a former bowling alley: a Victorian house whose fridge, fireplace and closets open into more than 70 surreal rooms, with a mystery story to uncover. Book timed tickets online and allow two to three hours.",
      },
      "old-town-albuquerque": {
        address: "Old Town Plaza, Albuquerque, New Mexico, USA",
        mapsQuery: "Old Town Plaza, Albuquerque",
        description: "The historic heart of Albuquerque, founded in 1706, where adobe buildings around a shaded plaza house galleries, Native American jewellery sellers, cafés and New Mexican restaurants, overlooked by the San Felipe de Neri church. It's easy to explore on foot; the city's museums of art, history and science are nearby.",
      },
      "white-sands-national-park": {
        address: "White Sands National Park, near Alamogordo, New Mexico, USA",
        website: "https://www.nps.gov/whsa/",
        mapsQuery: "White Sands National Park",
        description: "The world's largest gypsum dune field, a sea of brilliant white sand in the Tularosa Basin, with a scenic drive, short boardwalks and marked hiking trails. Buy a plastic sled at the visitor centre to slide down the dunes, and stay for sunset. The road can close during missile tests at the nearby range — check before you go.",
      },
    },
  },
  "san-francisco": {
    spots: {
      "ferry-building-marketplace": {
        address: "1 Ferry Building, The Embarcadero, San Francisco, California, USA",
        website: "https://www.ferrybuildingmarketplace.com/",
        description: "The 1898 Beaux-Arts ferry terminal on the Embarcadero, now a food hall of local bakeries, cheesemongers, oyster bars and coffee roasters. The CUESA farmers market sets up outside on Tuesdays, Thursdays and Saturdays, with Saturday mornings the biggest. Grab food and eat by the bay while ferries come and go.",
      },
      "golden-gate-bridge-vista-point": {
        name: "Golden Gate Bridge walk",
        address: "Golden Gate Bridge Welcome Center, San Francisco, California, USA",
        mapsQuery: "Golden Gate Bridge Welcome Center",
        description: "Walking the 2.7km (1.7-mile) Golden Gate Bridge is free on the east sidewalk during daylight hours. Start at the Welcome Center on the San Francisco side and turn back at Vista Point in Marin, or continue up to Battery Spencer in the Marin Headlands for the classic view. Bring layers — it's windy and often foggy.",
      },
      "mission-dolores-park": {
        address: "Dolores St & 19th St, Mission District, San Francisco, California, USA",
        mapsQuery: "Mission Dolores Park",
        description: "A sloping park in the sunny Mission District with sweeping views of the downtown skyline, where locals gather on sunny afternoons to picnic, sunbathe and people-watch. Pick up food from the nearby taquerias or Bi-Rite, and visit the historic Mission Dolores, the city's oldest building, two blocks away.",
      },
    },
  },
  "quebec-city": {
    spots: {
      "aux-anciens-canadiens": {
        address: "34 Rue Saint-Louis, Vieux-Québec, Quebec City, Quebec, Canada",
        website: "https://www.auxancienscanadiens.qc.ca/",
        mapsQuery: "Aux Anciens Canadiens, Quebec City",
        description: "A restaurant in the Maison Jacquet, one of the oldest houses in Quebec City (built in the 1670s), with red roof and low-ceilinged dining rooms, serving traditional Québécois dishes such as tourtière, pea soup, game and maple-sugar pie. Its lunchtime table d'hôte is the best value.",
      },
      "ch-teau-frontenac-terrace-dufferin": {
        name: "Terrasse Dufferin",
        address: "Terrasse Dufferin, Vieux-Québec, Quebec City, Quebec, Canada",
        mapsQuery: "Terrasse Dufferin",
        description: "The wide wooden boardwalk beside the Château Frontenac, high above the St Lawrence River, with views over the Lower Town and across to Lévis. Street performers play in summer, and in winter a toboggan run operates. Continue along the Governors' Promenade stairs to the Plains of Abraham.",
      },
      "vieux-qu-bec-old-town": {
        address: "Vieux-Québec, Quebec City, Quebec, Canada",
        website: "https://whc.unesco.org/en/list/300/",
        mapsQuery: "Old Quebec",
        description: "The UNESCO-listed historic district of Quebec City, the only North American city north of Mexico to keep its fortified walls, with cobbled lanes, stone houses and the Château Frontenac. Walk the ramparts for free, take the funicular to Petit-Champlain in the Lower Town, and visit the Citadelle.",
      },
    },
  },
  "santa-cruz-bolivia": {
    spots: {
      "biocentro-guembe": {
        address: "Km 7, Camino a Porongo, Santa Cruz de la Sierra, Bolivia",
        website: "https://biocentroguembe.com/",
        mapsQuery: "Biocentro Güembé",
        description: "A nature park on the edge of Santa Cruz with a large butterfly house, orchid gardens, aviaries, forest trails and a series of swimming pools and lagoons. It makes a relaxing day out from the city, especially in the heat. Take a taxi and allow most of a day; there's a restaurant on site.",
      },
      "cafe-lorca-santa-cruz": {
        name: "Lorca Café",
        address: "Calle René Moreno 20, near Plaza 24 de Septiembre, Santa Cruz de la Sierra, Bolivia",
        mapsQuery: "Café Lorca, Santa Cruz",
        description: "A long-running café-bar and cultural space just off the main plaza, serving coffee, food and cocktails, with live music, poetry and art events in the evenings. It's a lively meeting place for the city's creative crowd and an easy spot to spend an evening alone in tropical Santa Cruz.",
      },
      "jodanga-backpackers": {
        address: "Calle El Fuerte 1380, Santa Cruz de la Sierra, Bolivia",
        mapsQuery: "Jodanga Backpackers Hostel, Santa Cruz",
        description: "A popular backpackers about 2km from the centre with a swimming pool, a bar, a guest kitchen, free breakfast and dorms and private rooms. It's a sociable base for arranging trips to Amboró National Park, Samaipata and the Jesuit Missions of Chiquitos.",
      },
    },
  },
  sucre: {
    spots: {
      "cafe-mirador-sucre": {
        address: "Pasaje Iturricha 297, La Recoleta, Sucre, Bolivia",
        mapsQuery: "Café Gourmet Mirador, Sucre",
        description: "A terraced garden café beside the Recoleta lookout, with deckchairs and one of the best views over Sucre's white colonial rooftops, especially at sunset. It serves coffee, juices, light international meals and drinks. Service can be slow, but the view makes up for it.",
      },
      "casa-de-la-libertad": {
        address: "Plaza 25 de Mayo 11, Sucre, Bolivia",
        mapsQuery: "Casa de la Libertad, Sucre",
        description: "The historic Jesuit building on the main plaza where Bolivia's declaration of independence was signed in 1825, now a museum of the independence era with the original declaration, portraits and period rooms. Guided tours explain the history well; it's a short, essential visit.",
      },
      "kultur-berlin-hostel": {
        name: "Kultur Berlin Hostel",
        address: "Avaroa 326, Sucre, Bolivia",
        mapsQuery: "Kultur Berlin Hostel, Sucre",
        description: "A popular party hostel in a colonial-style building in central Sucre, with dorms and private rooms around a courtyard and an on-site bar that hosts themed nights, including salsa lessons, dance shows and parties. It's great for meeting people, though not for early nights.",
      },
    },
  },
  split: {
    spots: {
      "diocletian-s-palace": {
        address: "Dioklecijanova ulica, Old Town, Split, Croatia",
        website: "https://whc.unesco.org/en/list/97/",
        mapsQuery: "Diocletian's Palace, Split",
        description: "The vast retirement palace of the Roman emperor Diocletian, built around AD 300, whose walls now enclose Split's old town of lanes, shops, bars and homes. Don't miss the Peristyle, the cathedral (once Diocletian's mausoleum) and the underground cellars. It's busy by day — explore early or late.",
      },
      "marjan-hill-park": {
        name: "Marjan Forest Park",
        address: "Marjan peninsula, west of Split old town, Croatia",
        mapsQuery: "Marjan Forest Park, Split",
        description: "A pine-covered hill on the peninsula west of Split, criss-crossed by walking and cycling paths, with small chapels, viewpoints over the city and islands, and rocky coves such as Kašjuni beach for swimming. Climb the steps from the Varoš district to the Vidilica café for the classic view.",
      },
      "pazar-market": {
        address: "Hrvojeva ulica, by the Silver Gate, Split, Croatia",
        mapsQuery: "Pazar Green Market, Split",
        description: "Split's open-air green market just outside the eastern Silver Gate of Diocletian's Palace, where local farmers sell fruit, vegetables, cheese, dried figs, olive oil, honey and lavender. It's best in the morning. Pick up picnic supplies, then walk down to the Riva promenade.",
      },
    },
  },
  nashville: {
    spots: {
      "broadway-honky-tonk-strip": {
        name: "Lower Broadway honky-tonks",
        address: "Lower Broadway, Downtown Nashville, Tennessee, USA",
        mapsQuery: "Lower Broadway, Nashville",
        description: "The neon-lit strip of Broadway downtown, lined with honky-tonk bars where live country bands play from late morning until the early hours, usually with no cover charge — tip the band. Tootsie's Orchid Lounge and Robert's Western World are classics. Very busy with bachelorette parties at weekends.",
      },
      "prince-s-hot-chicken-shack": {
        name: "Prince's Hot Chicken (South)",
        address: "5814 Nolensville Pike, Nashville, Tennessee, USA",
        website: "https://www.princeshotchicken.com/locations",
        mapsQuery: "Prince's Hot Chicken South, Nolensville Pike",
        description: "The family business credited with inventing Nashville hot chicken, now run from its South location after the original Ewing Drive shack closed in 2019. The cayenne-crusted fried chicken comes on white bread with pickles, from mild to extra hot. Closed on Sundays; expect a wait at peak times.",
      },
      "ryman-auditorium": {
        address: "116 5th Avenue North, Nashville, Tennessee, USA",
        website: "https://www.ryman.com/",
        mapsQuery: "Ryman Auditorium",
        description: "The 'Mother Church of Country Music', built in 1892 as a tabernacle and home of the Grand Ole Opry from 1943 to 1974. Self-guided and backstage tours run daily, and it's still one of America's best concert halls — seeing a show here is special. It's a short walk from Lower Broadway.",
      },
    },
  },
  "new-orleans": {
    spots: {
      "caf-du-monde": {
        address: "800 Decatur Street, French Quarter, New Orleans, Louisiana, USA",
        website: "https://shop.cafedumonde.com/",
        mapsQuery: "Café du Monde, Decatur Street",
        description: "The open-air coffee stand in the French Market, serving beignets under mountains of powdered sugar and café au lait with chicory since 1862. It opens early in the morning and closes late evening (midnight at weekends), no longer 24 hours. Go early or late to avoid the queue, and bring cash for tips.",
      },
      "frenchmen-street-live-music-row": {
        address: "Frenchmen Street, Faubourg Marigny, New Orleans, Louisiana, USA",
        mapsQuery: "Frenchmen Street, New Orleans",
        description: "A few blocks of music clubs just downriver from the French Quarter, favoured by locals over Bourbon Street, where jazz, blues and brass bands play nightly at venues such as the Spotted Cat and d.b.a. Some clubs have a small cover or a one-drink minimum. The evening art market adds to the atmosphere.",
      },
      "garden-district-walking-tour": {
        name: "Garden District walk",
        address: "Garden District, New Orleans, Louisiana, USA",
        mapsQuery: "Garden District, New Orleans",
        description: "A leafy neighbourhood of grand 19th-century mansions and gardens, easily explored on a self-guided walk from the St Charles streetcar. Lafayette Cemetery No. 1 reopens on 1 October 2026 after a seven-year closure, but only on guided tours run by the Preservation Resource Center. Finish on Magazine Street's shops and cafés.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
