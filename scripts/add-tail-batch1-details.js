// Small-city tail, batch 1 (ordered by last Search Console demand): Great Zimbabwe, Victoria Falls, Panajachel,
// Luxor, Jinja, Accra, Maputo, Queenstown. 3 spots each, all thin/unaddressed. Researched 2026-09-23.
//
// DELETED: Base Backpackers Queenstown (permanently closed); Café Camissa Maputo (moved to Feira Popular years ago,
//   no current listing — and the old "leafy brunch café" description didn't match the art-gallery/live-music venue).
// RENAMED to real entities: "Great Zimbabwe Lodges" (generic) → Lodge at the Ancient City (19 thatched rooms,
//   lodgeattheancientcity.co.zw); "Great Zimbabwe Hotel Restaurant" → Great Zimbabwe Hotel (its Great Enclosure
//   restaurant); Selina Atitlán → Socialtel Atitlán (rebranded after Selina's collapse); Bob Marley Peace Hostel →
//   Bob Marley Peace Hotel.
// CORRECTED: Circus Bar is on Avenida Los Árboles (not Calle Santander), open 43 years; Fergburger is 7am–2:30am
//   (not 24h); Somewhere Nice has a pool/library (no "rooftop bar"); Nile River Explorers is at Bujagali.
//
//   node scripts/add-tail-batch1-details.js [--apply]
const run = require("./_enrich-runner");

run({
  "great-zimbabwe": {
    spots: {
      "great-zimbabwe-lodges": {
        name: "Lodge at the Ancient City",
        address: "Great Zimbabwe, near Masvingo, Zimbabwe",
        website: "https://lodgeattheancientcity.co.zw/",
        description: "A lodge built into a granite outcrop close to the Great Zimbabwe monument, with 19 thatched rooms and bungalows blending dry-stone walling, boulders and trees. There's a pool, restaurants and a bar set among the rocks, and the lodge arranges guided visits to the ruins as well as trips to nearby Lake Mutirikwi. A peaceful, atmospheric base.",
      },
      "great-zimbabwe-hotel-restaurant": {
        name: "Great Zimbabwe Hotel",
        address: "Great Zimbabwe, near Masvingo, Zimbabwe",
        mapsQuery: "Great Zimbabwe Hotel, Masvingo",
        description: "The hotel closest to the ruins, about 800m from the monument entrance, with a pool, gardens and the Great Enclosure restaurant serving international and local dishes. Even if you're staying elsewhere, it's a convenient place for lunch or a cold drink after exploring the site, and handy for an early start before the midday heat.",
      },
      "great-zimbabwe-ruins": {
        address: "Great Zimbabwe National Monument, near Masvingo, Zimbabwe",
        mapsQuery: "Great Zimbabwe National Monument",
        description: "The stone ruins of a city that was the capital of a trading kingdom from roughly the 11th to 15th centuries, and a UNESCO World Heritage Site that gave Zimbabwe its name. Explore the massive curved walls of the Great Enclosure, climb to the Hill Complex for views, and see the famous soapstone birds in the site museum. It's about 27km from Masvingo.",
      },
    },
  },
  "victoria-falls": {
    spots: {
      "shoestrings-backpackers-vic-falls": {
        address: "12 West Drive, Victoria Falls, Zimbabwe",
        website: "https://www.shoestringsvicfalls.com/",
        description: "A colourful backpackers on West Drive, about 1km from the town centre, running since 1997 and now part of the Bayete Collection. There are dorms and en-suite rooms, a pool, a restaurant and a famously lively bar, and staff can book rafting, bungee and falls trips. The easiest place in town to meet other travellers.",
      },
      "the-africa-cafe-vic-falls": {
        address: "Elephant's Walk Shopping & Artist Village, Victoria Falls, Zimbabwe",
        mapsQuery: "The Africa Cafe, Elephant's Walk, Victoria Falls",
        description: "A café at the centre of Elephant's Walk, the Victoria Falls shopping and artists' village, where local sculptors and craftspeople sell their work. It's a relaxed spot for Zimbabwean coffee, breakfast and light meals, and a calm break between adrenaline activities. Browse the studios and craft shops around it before or after.",
      },
      "victoria-falls-rainforest": {
        address: "Victoria Falls National Park, Victoria Falls, Zimbabwe",
        website: "https://www.zimparks.org.zw/",
        mapsQuery: "Victoria Falls Rainforest entrance, Zimbabwe",
        description: "The Zimbabwean side of Victoria Falls, known locally as Mosi-oa-Tunya ('the smoke that thunders'), where a path through spray-fed rainforest leads to a series of viewpoints facing the 1.7km-wide curtain of water. At peak flow (roughly March to May) you'll be soaked — hire a raincoat at the gate. There's an entry fee payable in US dollars.",
      },
    },
  },
  panajachel: {
    spots: {
      "selina-atitlan-panajachel": {
        name: "Socialtel Atitlán",
        address: "Panajachel, Sololá, Guatemala",
        mapsQuery: "Socialtel Atitlan, Panajachel",
        description: "A social hostel in Panajachel, formerly Selina Atitlán and now run as Socialtel, with dorms, private rooms, gardens and a bar close to the lakefront. It's a practical base for Lake Atitlán, since public boats from Panajachel's docks reach San Marcos, San Pedro, Santa Cruz and the other lake villages. A good place to find company for day trips.",
      },
      "reserva-natural-atitlan": {
        address: "Panajachel, Sololá, Guatemala",
        website: "https://www.atitlanreserva.com/",
        description: "A private nature reserve just outside Panajachel, on the grounds of an old coffee farm, with forest trails, hanging bridges, a waterfall, a butterfly garden and a zipline circuit with lake views. Coatis and monkeys are often seen. It's an easy half-day from town and a good way to see the lake's forested slopes without a guide.",
      },
      "circus-bar-panajachel": {
        address: "Avenida Los Árboles, Panajachel, Sololá, Guatemala",
        website: "https://circusbar.com.gt/en/home/",
        description: "A long-running bar and restaurant on Avenida Los Árboles in Panajachel, open for more than four decades, with live music almost every night — gypsy jazz, flamenco rumba and Latin styles. The menu covers homemade pasta, wood-fired pizzas and Mediterranean dishes. Its bohemian, friendly atmosphere makes it an easy night out alone.",
      },
    },
  },
  luxor: {
    spots: {
      "bob-marley-hostel-luxor": {
        name: "Bob Marley Peace Hotel",
        address: "Mohamed Farid Street, East Bank, Luxor, Egypt",
        mapsQuery: "Bob Marley Peace Hotel, Luxor",
        description: "A long-running budget hotel and hostel on Mohamed Farid Street on Luxor's East Bank, about five minutes' walk from the train station. It has simple air-conditioned rooms, a rooftop and a restaurant, and staff help arrange trips to the Valley of the Kings, Karnak and the West Bank. A sociable, practical base on a tight budget.",
      },
      "sofra-restaurant-luxor": {
        address: "90 Mohamed Farid Street, Al Manshiya, Luxor, Egypt",
        mapsQuery: "Sofra Restaurant & Cafe, Luxor",
        description: "A restaurant in a restored 1930s house on Mohamed Farid Street, furnished with antiques and serving traditional Egyptian home cooking — mezze, stuffed pigeon, tagines and stews — plus a rooftop terrace. It's one of the most pleasant places in Luxor for a relaxed dinner away from tourist-trap menus, and open until midnight.",
      },
      "karnak-temple": {
        address: "Karnak, Luxor, Egypt",
        mapsQuery: "Karnak Temple, Luxor",
        description: "One of the largest religious complexes ever built, developed over some 2,000 years and dedicated mainly to the god Amun-Ra, about 3km north of central Luxor. The Great Hypostyle Hall's 134 giant columns are the highlight, along with obelisks, the sacred lake and avenues of sphinxes. Go at opening time to beat the heat and the tour buses.",
      },
    },
  },
  jinja: {
    spots: {
      "nile-river-explorers-jinja": {
        address: "Bujagali, Jinja, Uganda",
        website: "https://www.raftafrica.com/",
        mapsQuery: "Nile River Explorers, Bujagali, Jinja",
        description: "A riverside camp and adventure base at Bujagali, north of Jinja, with dorms, safari tents and cottages, a bar and restaurant overlooking the White Nile, and even a slide into the river. It's best known for white-water rafting on the Nile, plus kayaking and other river activities — the social hub for backpackers in Jinja.",
      },
      "the-source-cafe-jinja": {
        address: "20 Main Street, Jinja, Uganda",
        mapsQuery: "The Source Cafe, Main Street, Jinja",
        description: "A popular café on Jinja's Main Street, known as the first place in town to offer internet access and good coffee, and still one of its best-rated spots. Come for coffee, African tea, breakfast and light meals, and browse its small craft shop. A relaxed place to plan rafting or boat trips and meet other travellers.",
      },
      "source-of-the-nile-jinja": {
        address: "Source of the Nile, Jinja, Uganda",
        mapsQuery: "Source of the Nile, Jinja",
        description: "The point where the White Nile flows out of Lake Victoria to begin its long journey to the Mediterranean, marked by gardens, a memorial where some of Gandhi's ashes were scattered, and small boats that take you out to the spring and the lake. There's a modest entry fee; it's an easy, scenic visit from central Jinja.",
      },
    },
  },
  accra: {
    spots: {
      "somewhere-nice-hostel-accra": {
        address: "9 Cotton Avenue, Kokomlemle, Accra, Ghana",
        website: "https://hostelaccra.com/",
        description: "A well-reviewed, sustainability-minded hostel in the quiet Kokomlemle district, with dorms, hotel-style rooms and studio apartments, all air-conditioned with private bathrooms. There's a pool, a shared lounge, a small library and a restaurant known for its breakfasts. A calm, safe-feeling base with easy taxi access to the city's sights.",
      },
      "vida-e-caffe-accra": {
        address: "Oxford Street, Osu, Accra, Ghana",
        mapsQuery: "Vida e Caffe Osu, Oxford Street, Accra",
        description: "A branch of the South African espresso chain on busy Oxford Street in Osu, Accra's main shopping and nightlife district. It serves espresso drinks, pastries and light breakfasts from early morning into the evening, and it's popular for meeting friends or working for an hour. A reliable, comfortable coffee stop between exploring Osu's shops.",
      },
      "jamestown-accra": {
        address: "Jamestown, Accra, Ghana",
        mapsQuery: "Jamestown Lighthouse, Accra",
        description: "One of Accra's oldest neighbourhoods, a fishing community around the 17th-century James Fort and Ussher Fort, with a red-and-white lighthouse you can climb for views over the harbour. Its streets are known for murals and for boxing gyms that have produced world champions. Visit with a local guide, and look out for the Chale Wote street-art festival in August.",
      },
    },
  },
  maputo: {
    delete: ["cafe-camissa-maputo"],
    spots: {
      "fatimas-place-maputo": {
        address: "1321 Avenida Mao Tse Tung, Maputo, Mozambique",
        mapsQuery: "Fatima's Backpackers, Maputo",
        description: "A long-running backpackers on Avenida Mao Tse Tung, about 15 minutes' walk east of the city centre, with dorms, private rooms, a garden and a bar. It has long been a meeting point for overland travellers in Mozambique, and its sister property, Fatima's Nest in Tofo, makes onward plans along the coast easy.",
      },
      "mercado-central-maputo": {
        address: "Avenida 25 de Setembro, Baixa, Maputo, Mozambique",
        mapsQuery: "Mercado Central, Maputo",
        description: "Maputo's grand central market in the Baixa, housed in an early-20th-century colonial building, with stalls selling fresh fruit and vegetables, spices, piri-piri, cashews, dried fish and basketry. It's lively, colourful and good for picking up snacks and souvenirs; go in the morning and keep an eye on your belongings in the crowds.",
      },
    },
  },
  queenstown: {
    delete: ["base-backpackers-queenstown"],
    spots: {
      "fergburger": {
        address: "42 Shotover Street, Queenstown 9300, New Zealand",
        website: "https://www.fergburger.com/",
        description: "Queenstown's famous burger shop on Shotover Street, open from 7am until 2:30am, with a queue at almost any hour. The burgers are huge, made with local lamb, venison, beef and vegetarian options, and you can take them to the lakefront a block away. Order ahead by phone or online to skip the longest waits, or come at an odd hour.",
      },
      "kawarau-bungy": {
        address: "Kawarau Gorge Suspension Bridge, Gibbston Highway (SH6), near Queenstown, New Zealand",
        website: "https://www.bungy.co.nz/",
        mapsQuery: "Kawarau Bridge Bungy",
        description: "The world's first commercial bungy site, opened by AJ Hackett in 1988 on the historic Kawarau Gorge Suspension Bridge, about 25 minutes' drive from Queenstown. The jump is 43m over the river, and you can choose to have your head or hands dunked in the water. Even if you don't jump, the viewing platforms make it a fun stop on the way to the wineries.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
