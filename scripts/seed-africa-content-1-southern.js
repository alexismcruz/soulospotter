// Africa batch A — Southern Africa: Botswana, Namibia, South Africa, Zimbabwe.
const { seed } = require('./_content-seed-helper');

const SPOTS = {
  // BOTSWANA
  'maun': [
    { name: 'Hilary\'s Coffee Shop', slug: 'hilarys-coffee-maun', category: 'CAFE', description: 'A long-running Maun institution — homemade cakes, big breakfasts, and the meeting point for travellers heading into the Okavango Delta.', address: 'Tsheko Tsheko Rd, Maun', priceRange: 'MID', rating: 4.4, tags: ['cafe','breakfast','okavango-base','traveller'] },
    { name: 'Old Bridge Backpackers', slug: 'old-bridge-backpackers-maun', category: 'ACCOMMODATION', description: 'A riverside backpackers on the Thamalakane — campfire bar, mokoro trips, and the social heart of budget Delta travel.', address: 'Matlapana, Maun', priceRange: 'BUDGET', rating: 4.5, tags: ['backpackers','riverside','mokoro','social'] },
    { name: 'Nhabe Museum', slug: 'nhabe-museum-maun', category: 'CULTURE', description: 'A small museum in a colonial-era building tracing the natural history and cultures of the Okavango region.', address: 'Maun', priceRange: 'BUDGET', rating: 4.0, tags: ['museum','culture','okavango','history'] },
  ],
  'kasane': [
    { name: 'Old House Restaurant', slug: 'old-house-kasane', category: 'FOOD', description: 'A relaxed garden restaurant near the Chobe River — game meat, fresh fish, and a refuel before or after safari drives.', address: 'Kasane', priceRange: 'MID', rating: 4.3, tags: ['restaurant','garden','game-meat','chobe'] },
    { name: 'Thebe River Safaris Camp', slug: 'thebe-river-camp-kasane', category: 'ACCOMMODATION', description: 'A riverside camp and lodge on the edge of Chobe — affordable rooms, camping, and on-site game drives and boat cruises.', address: 'Kasane', priceRange: 'BUDGET', rating: 4.4, tags: ['camp','riverside','chobe','safari-base'] },
    { name: 'Chobe Riverfront', slug: 'chobe-riverfront-kasane', category: 'NATURE', description: 'The riverfront stretch of Chobe National Park — elephants, hippos, and buffalo in the highest wildlife density in Botswana.', address: 'Chobe National Park', priceRange: 'MID', rating: 4.8, tags: ['safari','elephants','river','wildlife'] },
  ],
  'gaborone': [
    { name: 'Sanitas Tea Garden', slug: 'sanitas-tea-garden-gaborone', category: 'CAFE', description: 'A leafy garden café and nursery — a calm oasis in the capital for breakfast, salads, and coffee among the plants.', address: 'Gaborone', priceRange: 'MID', rating: 4.4, tags: ['cafe','garden','breakfast','relaxed'] },
    { name: 'Mokolodi Backpackers', slug: 'mokolodi-backpackers-gaborone', category: 'ACCOMMODATION', description: 'A peaceful guesthouse near the Mokolodi reserve — a quiet base for visiting Gaborone and the surrounding bushveld.', address: 'Gaborone', priceRange: 'BUDGET', rating: 4.2, tags: ['guesthouse','peaceful','reserve','base'] },
    { name: 'Three Dikgosi Monument', slug: 'three-dikgosi-monument', category: 'CULTURE', description: 'A striking monument to the three chiefs who secured Botswana\'s path to independence — the symbolic heart of the capital.', address: 'CBD, Gaborone', priceRange: 'FREE', rating: 4.2, tags: ['monument','history','independence','landmark'] },
  ],
  'francistown': [
    { name: 'Thapama Restaurant', slug: 'thapama-restaurant-francistown', category: 'FOOD', description: 'A reliable city-centre restaurant in Botswana\'s second city — local and international plates for travellers in transit.', address: 'Francistown', priceRange: 'MID', rating: 4.1, tags: ['restaurant','central','local','transit'] },
    { name: 'Cresta Marang Gardens', slug: 'cresta-marang-francistown', category: 'ACCOMMODATION', description: 'A garden hotel and campsite on the Tati River — a green, comfortable base in the historic gold-rush town.', address: 'Francistown', priceRange: 'MID', rating: 4.2, tags: ['hotel','gardens','river','base'] },
    { name: 'Supa-Ngwao Museum', slug: 'supa-ngwao-museum', category: 'CULTURE', description: 'A community museum in colonial buildings exploring the heritage of the Francistown region and northeast Botswana.', address: 'Francistown', priceRange: 'BUDGET', rating: 4.0, tags: ['museum','heritage','community','history'] },
  ],
  'nata': [
    { name: 'Nata Lodge Restaurant', slug: 'nata-lodge-restaurant', category: 'FOOD', description: 'An oasis restaurant under marula trees — a welcome stop on the long road, with a pool and birdlife around the deck.', address: 'Nata', priceRange: 'MID', rating: 4.3, tags: ['restaurant','oasis','pool','birdlife'] },
    { name: 'Nata Lodge', slug: 'nata-lodge', category: 'ACCOMMODATION', description: 'A comfortable lodge and campsite at the crossroads near Sua Pan — the base for sunset trips onto the salt flats.', address: 'Nata', priceRange: 'MID', rating: 4.3, tags: ['lodge','campsite','salt-pan-base','crossroads'] },
    { name: 'Nata Bird Sanctuary', slug: 'nata-bird-sanctuary', category: 'NATURE', description: 'A community sanctuary on the edge of Sua Pan — seasonal flocks of flamingos and pelicans across the shimmering salt flat.', address: 'Sua Pan, Nata', priceRange: 'BUDGET', rating: 4.4, tags: ['sanctuary','flamingos','salt-pan','birds'] },
  ],
  // NAMIBIA
  'windhoek': [
    { name: 'Slowtown Coffee Roasters', slug: 'slowtown-coffee-windhoek', category: 'CAFE', description: 'Namibia\'s leading specialty roaster — excellent flat whites and a relaxed spot to plan a self-drive adventure.', address: 'Windhoek', priceRange: 'MID', rating: 4.6, tags: ['specialty-coffee','roastery','relaxed','road-trip-base'] },
    { name: 'Chameleon Backpackers', slug: 'chameleon-backpackers-windhoek', category: 'ACCOMMODATION', description: 'A friendly central backpackers with a pool and bar — the hub for arranging tours and meeting fellow overlanders.', address: 'Windhoek', priceRange: 'BUDGET', rating: 4.4, tags: ['backpackers','pool','central','social'] },
    { name: 'Joe\'s Beerhouse', slug: 'joes-beerhouse-windhoek', category: 'FOOD', description: 'A Windhoek legend — a rambling, quirky beer hall serving game meat platters of oryx, kudu, and zebra under thatch.', address: 'Windhoek', priceRange: 'MID', rating: 4.5, tags: ['beerhouse','game-meat','quirky','iconic'] },
  ],
  'swakopmund': [
    { name: 'Slowtown Swakopmund', slug: 'slowtown-swakopmund', category: 'CAFE', description: 'The coastal branch of Namibia\'s top roaster — great coffee and cake between adventure activities on the Skeleton Coast.', address: 'Swakopmund', priceRange: 'MID', rating: 4.5, tags: ['coffee','coastal','relaxed','adventure-base'] },
    { name: 'Skeleton Beach Backpackers', slug: 'skeleton-beach-backpackers', category: 'ACCOMMODATION', description: 'A laid-back backpackers near the seafront — a sociable base for sandboarding, quad biking, and skydiving the dunes.', address: 'Swakopmund', priceRange: 'BUDGET', rating: 4.3, tags: ['backpackers','seafront','adventure','social'] },
    { name: 'The Tug Restaurant', slug: 'the-tug-swakopmund', category: 'FOOD', description: 'A seafood restaurant built around a converted tugboat on the jetty — fresh oysters and Atlantic sunsets.', address: 'Swakopmund', priceRange: 'HIGH', rating: 4.5, tags: ['seafood','jetty','oysters','sunset'] },
  ],
  'sossusvlei': [
    { name: 'Sesriem Restplace Café', slug: 'sesriem-restplace-cafe', category: 'CAFE', description: 'A simple café at the Sesriem gate — coffee and provisions before the pre-dawn drive to the great red dunes.', address: 'Sesriem', priceRange: 'BUDGET', rating: 4.0, tags: ['cafe','gateway','provisions','dunes'] },
    { name: 'Sesriem Campsite', slug: 'sesriem-campsite', category: 'ACCOMMODATION', description: 'The inside-the-gate campsite that lets you reach Sossusvlei\'s dunes at sunrise before day visitors arrive.', address: 'Sesriem, Namib-Naukluft', priceRange: 'MID', rating: 4.3, tags: ['campsite','dunes','sunrise','desert'] },
    { name: 'Dune 45 & Deadvlei', slug: 'dune-45-deadvlei', category: 'NATURE', description: 'The iconic burnt-orange dunes and the ghostly white Deadvlei clay pan with its 900-year-old blackened trees.', address: 'Sossusvlei', priceRange: 'MID', rating: 4.9, tags: ['dunes','deadvlei','photography','iconic'] },
  ],
  'etosha': [
    { name: 'Okaukuejo Waterhole', slug: 'okaukuejo-waterhole', category: 'NATURE', description: 'The famous floodlit waterhole at Etosha\'s main camp — black rhino, elephant, and lion gathering after dark.', address: 'Etosha National Park', priceRange: 'MID', rating: 4.8, tags: ['waterhole','rhino','night-viewing','safari'] },
    { name: 'Okaukuejo Restcamp', slug: 'okaukuejo-restcamp', category: 'ACCOMMODATION', description: 'Etosha\'s historic main rest camp around the floodlit waterhole — chalets, camping, a pool, and unbeatable game viewing.', address: 'Etosha National Park', priceRange: 'MID', rating: 4.4, tags: ['restcamp','waterhole','safari','pool'] },
    { name: 'Etosha Pan Lookout', slug: 'etosha-pan-lookout', category: 'NATURE', description: 'A viewpoint over the vast white salt pan so large it is visible from space — a shimmering, otherworldly expanse.', address: 'Etosha National Park', priceRange: 'MID', rating: 4.6, tags: ['salt-pan','viewpoint','landscape','safari'] },
  ],
  'luderitz': [
    { name: 'Diaz Coffee Shop', slug: 'diaz-coffee-luderitz', category: 'CAFE', description: 'A cosy harbour-town café serving fresh seafood, cake, and coffee amid Lüderitz\'s German colonial architecture.', address: 'Lüderitz', priceRange: 'MID', rating: 4.3, tags: ['cafe','seafood','colonial','harbour'] },
    { name: 'Lüderitz Nest Hotel', slug: 'luderitz-nest-hotel', category: 'ACCOMMODATION', description: 'A seafront hotel on its own rocky beach — the most comfortable base for exploring Kolmanskop and the diamond coast.', address: 'Lüderitz', priceRange: 'MID', rating: 4.3, tags: ['hotel','seafront','kolmanskop-base','comfortable'] },
    { name: 'Kolmanskop Ghost Town', slug: 'kolmanskop-ghost-town', category: 'CULTURE', description: 'An abandoned diamond-rush town being reclaimed by the desert — sand pouring through the doorways of grand old houses.', address: 'near Lüderitz', priceRange: 'MID', rating: 4.7, tags: ['ghost-town','diamonds','photography','desert'] },
  ],
  // SOUTH AFRICA
  'cape-town': [
    { name: 'Truth Coffee Roasting', slug: 'truth-coffee-cape-town', category: 'CAFE', description: 'A steampunk-themed roastery often named the world\'s best coffee shop — theatrical interiors and serious specialty coffee.', address: 'Buitenkant St, Cape Town', priceRange: 'MID', rating: 4.6, tags: ['specialty-coffee','steampunk','roastery','iconic'] },
    { name: 'Once in Cape Town', slug: 'once-in-cape-town', category: 'ACCOMMODATION', description: 'A stylish, social hostel on buzzing Kloof Street — a great base for Table Mountain, Long Street, and the city bowl.', address: 'Kloof St, Cape Town', priceRange: 'BUDGET', rating: 4.5, tags: ['hostel','social','central','stylish'] },
    { name: 'Table Mountain Cableway', slug: 'table-mountain-cableway', category: 'NATURE', description: 'The revolving cable car to the flat summit of Table Mountain — sweeping views over the city, the Cape, and two oceans.', address: 'Tafelberg Rd, Cape Town', priceRange: 'MID', rating: 4.8, tags: ['table-mountain','cable-car','views','iconic'] },
  ],
  'johannesburg': [
    { name: 'Father Coffee', slug: 'father-coffee-joburg', category: 'CAFE', description: 'A pioneering specialty café in trendy Braamfontein — top-tier coffee at the heart of Joburg\'s creative resurgence.', address: 'Braamfontein, Johannesburg', priceRange: 'MID', rating: 4.5, tags: ['specialty-coffee','braamfontein','creative','hip'] },
    { name: 'Curiocity Backpackers', slug: 'curiocity-backpackers-joburg', category: 'ACCOMMODATION', description: 'A design-led hostel in revitalised Maboneng — walking tours, a bar, and a safe base to experience inner-city Joburg.', address: 'Maboneng, Johannesburg', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','maboneng','design','tours'] },
    { name: 'Apartheid Museum', slug: 'apartheid-museum', category: 'CULTURE', description: 'A powerful, world-class museum tracing the rise and fall of apartheid — essential and deeply moving.', address: 'Johannesburg', priceRange: 'MID', rating: 4.8, tags: ['museum','history','apartheid','essential'] },
  ],
  'kruger': [
    { name: 'Skukuza Restcamp', slug: 'skukuza-restcamp', category: 'ACCOMMODATION', description: 'Kruger\'s largest rest camp on the Sabie River — chalets, camping, a restaurant, and a launch point for self-drive safaris.', address: 'Kruger National Park', priceRange: 'MID', rating: 4.5, tags: ['restcamp','self-drive','river','safari'] },
    { name: 'Cattle Baron Skukuza', slug: 'cattle-baron-skukuza', category: 'FOOD', description: 'A riverside restaurant at Skukuza with a deck over the Sabie — watch hippos and elephants while you eat.', address: 'Skukuza, Kruger', priceRange: 'MID', rating: 4.3, tags: ['restaurant','riverside','wildlife','deck'] },
    { name: 'Sabie River Big Five Drive', slug: 'sabie-river-big-five', category: 'NATURE', description: 'The wildlife-rich southern Kruger roads along the Sabie River — among the best self-drive Big Five viewing on Earth.', address: 'Southern Kruger', priceRange: 'MID', rating: 4.8, tags: ['big-five','self-drive','safari','wildlife'] },
  ],
  'garden-route': [
    { name: 'The Fat Fish', slug: 'the-fat-fish-garden-route', category: 'FOOD', description: 'A celebrated seafood restaurant in Plettenberg Bay — fresh line fish and ocean views on the heart of the Garden Route.', address: 'Plettenberg Bay', priceRange: 'MID', rating: 4.5, tags: ['seafood','plett','ocean-views','popular'] },
    { name: 'Island Vibe Knysna', slug: 'island-vibe-knysna', category: 'ACCOMMODATION', description: 'A backpackers above the Knysna lagoon — a sociable base for the forests, the Heads, and Garden Route adventures.', address: 'Knysna', priceRange: 'BUDGET', rating: 4.4, tags: ['backpackers','lagoon','social','garden-route'] },
    { name: 'Tsitsikamma Suspension Bridge', slug: 'tsitsikamma-suspension-bridge', category: 'NATURE', description: 'The famous suspension bridge over the Storms River mouth in Tsitsikamma National Park — dramatic forest-meets-ocean scenery.', address: 'Storms River, Tsitsikamma', priceRange: 'MID', rating: 4.7, tags: ['suspension-bridge','forest','coast','iconic'] },
  ],
  'drakensberg': [
    { name: 'Valley Bakery Underberg', slug: 'valley-bakery-underberg', category: 'CAFE', description: 'A country bakery-café in the southern Drakensberg foothills — hearty breakfasts before a day in the mountains.', address: 'Underberg', priceRange: 'BUDGET', rating: 4.3, tags: ['bakery','cafe','breakfast','mountains'] },
    { name: 'Amphitheatre Backpackers', slug: 'amphitheatre-backpackers', category: 'ACCOMMODATION', description: 'A rural backpackers below the famous Amphitheatre escarpment — hikes, horse riding, and Lesotho day trips on the doorstep.', address: 'Northern Drakensberg', priceRange: 'BUDGET', rating: 4.5, tags: ['backpackers','hiking','rural','amphitheatre'] },
    { name: 'Tugela Falls Trail', slug: 'tugela-falls-trail', category: 'NATURE', description: 'The hike to the world\'s second-highest waterfall along the Amphitheatre, via chain ladders to the escarpment top.', address: 'Royal Natal, Drakensberg', priceRange: 'FREE', rating: 4.7, tags: ['waterfall','hiking','escarpment','dramatic'] },
  ],
  // ZIMBABWE
  'victoria-falls': [
    { name: 'The Africa Café', slug: 'the-africa-cafe-vic-falls', category: 'CAFE', description: 'A relaxed café in Victoria Falls town — good coffee, breakfasts, and crafts, a calm break from the adrenaline activities.', address: 'Victoria Falls', priceRange: 'MID', rating: 4.4, tags: ['cafe','breakfast','crafts','relaxed'] },
    { name: 'Shoestrings Backpackers', slug: 'shoestrings-backpackers-vic-falls', category: 'ACCOMMODATION', description: 'The legendary Vic Falls backpackers — a pool, a famously sociable bar, and the budget hub for the falls and bungee.', address: 'Victoria Falls', priceRange: 'BUDGET', rating: 4.4, tags: ['backpackers','pool','party','social'] },
    { name: 'Victoria Falls Rainforest', slug: 'victoria-falls-rainforest', category: 'NATURE', description: 'The path along the chasm facing the full mile-wide curtain of the falls — "the Smoke that Thunders" in spray and rainbows.', address: 'Victoria Falls', priceRange: 'MID', rating: 4.9, tags: ['waterfall','rainforest','rainbows','iconic'] },
  ],
  'harare': [
    { name: 'Cafe Nush', slug: 'cafe-nush-harare', category: 'CAFE', description: 'A popular garden café in the capital — fresh food, good coffee, and a relaxed gathering spot for Harare\'s creatives.', address: 'Harare', priceRange: 'MID', rating: 4.4, tags: ['cafe','garden','relaxed','creative'] },
    { name: 'Small World Backpackers', slug: 'small-world-backpackers-harare', category: 'ACCOMMODATION', description: 'A leafy, friendly backpackers in a quiet Harare suburb — a safe, sociable base for exploring the capital.', address: 'Harare', priceRange: 'BUDGET', rating: 4.3, tags: ['backpackers','leafy','friendly','base'] },
    { name: 'National Gallery of Zimbabwe', slug: 'national-gallery-zimbabwe', category: 'CULTURE', description: 'The country\'s premier art museum — celebrated Shona stone sculpture and contemporary Zimbabwean art.', address: 'Harare', priceRange: 'BUDGET', rating: 4.4, tags: ['gallery','shona-sculpture','art','culture'] },
  ],
  'bulawayo': [
    { name: 'Indaba Book Café', slug: 'indaba-book-cafe-bulawayo', category: 'CAFE', description: 'A bohemian café-bookshop and live-music venue — the cultural pulse of Zimbabwe\'s elegant, jacaranda-lined second city.', address: 'Bulawayo', priceRange: 'BUDGET', rating: 4.4, tags: ['cafe','bookshop','live-music','culture'] },
    { name: 'Burke\'s Paradise Backpackers', slug: 'burkes-paradise-bulawayo', category: 'ACCOMMODATION', description: 'A garden guesthouse in leafy Bulawayo — a relaxed base for the Matobo Hills and Khami ruins day trips.', address: 'Bulawayo', priceRange: 'BUDGET', rating: 4.3, tags: ['guesthouse','garden','matobo-base','relaxed'] },
    { name: 'Matobo National Park', slug: 'matobo-national-park', category: 'NATURE', description: 'A landscape of balancing granite boulders — white rhino tracking, ancient San rock art, and Cecil Rhodes\' grave at World\'s View.', address: 'near Bulawayo', priceRange: 'MID', rating: 4.7, tags: ['rhino','rock-art','granite','san'] },
  ],
  'hwange': [
    { name: 'Hwange Main Camp Restaurant', slug: 'hwange-main-camp-restaurant', category: 'FOOD', description: 'A simple restaurant at the park\'s main camp — a meal and a cold drink between game drives in Zimbabwe\'s biggest park.', address: 'Hwange National Park', priceRange: 'MID', rating: 4.1, tags: ['restaurant','main-camp','safari','simple'] },
    { name: 'Hwange Main Camp', slug: 'hwange-main-camp', category: 'ACCOMMODATION', description: 'The accessible main rest camp of Hwange — chalets and camping with elephant-filled waterholes a short drive away.', address: 'Hwange National Park', priceRange: 'MID', rating: 4.3, tags: ['restcamp','elephants','safari','self-drive'] },
    { name: 'Nyamandhlovu Pan Hide', slug: 'nyamandhlovu-pan-hide', category: 'NATURE', description: 'An elevated viewing platform over a busy waterhole — vast herds of elephant and buffalo gather, especially in the dry season.', address: 'Hwange National Park', priceRange: 'MID', rating: 4.6, tags: ['waterhole','elephants','hide','wildlife'] },
  ],
  'great-zimbabwe': [
    { name: 'Great Zimbabwe Hotel Restaurant', slug: 'great-zimbabwe-hotel-restaurant', category: 'FOOD', description: 'A restaurant beside the ruins serving local and international dishes — a convenient base for exploring the ancient city.', address: 'near Masvingo', priceRange: 'MID', rating: 4.1, tags: ['restaurant','ruins-base','local','convenient'] },
    { name: 'Great Zimbabwe Lodges', slug: 'great-zimbabwe-lodges', category: 'ACCOMMODATION', description: 'Traditional-style rondavel lodges near the monument — the most atmospheric base for a sunrise visit to the ruins.', address: 'near Masvingo', priceRange: 'MID', rating: 4.2, tags: ['lodge','rondavel','ruins-base','atmospheric'] },
    { name: 'Great Zimbabwe Ruins', slug: 'great-zimbabwe-ruins', category: 'CULTURE', description: 'The largest ancient stone structure south of the Sahara — the dry-stone Great Enclosure of a powerful medieval empire.', address: 'near Masvingo', priceRange: 'MID', rating: 4.7, tags: ['ruins','unesco','medieval','empire'] },
  ],
};

const EXPERIENCES = {
  'maun': [
    { name: 'Okavango Delta Mokoro Safari', slug: 'maun-okavango-mokoro', category: 'OUTDOOR_ADVENTURE', description: 'Glide through the Okavango Delta\'s reed channels in a traditional mokoro canoe, with guided bush walks to spot wildlife on the islands.', price: 120, duration: 'Full day', groupSizeMax: 8 },
    { name: 'Okavango Scenic Flight', slug: 'maun-okavango-scenic-flight', category: 'PHOTOGRAPHY_WALKS', description: 'A light-aircraft flight over the Delta — the only way to grasp the scale of the world\'s largest inland delta and its herds.', price: 160, duration: '1 hour', groupSizeMax: 5 },
    { name: 'Moremi Game Reserve Day Safari', slug: 'maun-moremi-safari', category: 'OUTDOOR_ADVENTURE', description: 'A full-day 4x4 safari into Moremi, the wildlife jewel of the Okavango — lions, leopards, wild dogs, and elephants.', price: 180, duration: 'Full day', groupSizeMax: 7 },
  ],
  'kasane': [
    { name: 'Chobe River Sunset Boat Cruise', slug: 'kasane-chobe-sunset-cruise', category: 'OUTDOOR_ADVENTURE', description: 'A sunset cruise on the Chobe River among bathing elephants, hippos, and crocodiles, with the sky ablaze over the water.', price: 45, duration: 'Half day', groupSizeMax: 14 },
    { name: 'Chobe National Park Game Drive', slug: 'kasane-chobe-game-drive', category: 'OUTDOOR_ADVENTURE', description: 'A 4x4 drive along the Chobe riverfront, home to the highest elephant concentration in Africa, plus lions and buffalo.', price: 60, duration: 'Half day', groupSizeMax: 8 },
    { name: 'Victoria Falls Day Trip from Kasane', slug: 'kasane-vic-falls-day', category: 'OUTDOOR_ADVENTURE', description: 'A cross-border day trip to see Victoria Falls, an easy hour from Kasane — the thundering falls and town.', price: 90, duration: 'Full day', groupSizeMax: 12 },
  ],
  'gaborone': [
    { name: 'Mokolodi Nature Reserve Safari', slug: 'gaborone-mokolodi-safari', category: 'OUTDOOR_ADVENTURE', description: 'A game drive in the Mokolodi reserve near the capital — rhino, giraffe, and the chance to walk with cheetahs.', price: 55, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Gaborone City & Culture Tour', slug: 'gaborone-city-tour', category: 'ARTS_CULTURE', description: 'Discover Botswana\'s capital — the Three Dikgosi Monument, the National Museum, and the story of Africa\'s quiet success.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Kgale Hill Sunset Hike', slug: 'gaborone-kgale-hill', category: 'OUTDOOR_ADVENTURE', description: 'Hike Gaborone\'s "Sleeping Giant" for baboons along the trail and panoramic sunset views over the city and dam.', price: 20, duration: '3 hours', groupSizeMax: 10 },
  ],
  'francistown': [
    { name: 'Tati Goldfields History Tour', slug: 'francistown-goldfields-tour', category: 'ARTS_CULTURE', description: 'Explore the heritage of southern Africa\'s first gold rush around Francistown, with the Supa-Ngwao museum.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Northeast Botswana Village Visit', slug: 'francistown-village-visit', category: 'ARTS_CULTURE', description: 'A guided visit to a Kalanga village near Francistown — traditional life, crafts, and food off the tourist trail.', price: 35, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Tuli Block Wildlife Day Trip', slug: 'francistown-tuli-block', category: 'OUTDOOR_ADVENTURE', description: 'A trip to the dramatic Tuli Block on the Limpopo — elephants, eland, and the red-rock landscapes of eastern Botswana.', price: 90, duration: 'Full day', groupSizeMax: 8 },
  ],
  'nata': [
    { name: 'Makgadikgadi Salt Pans Sunset Tour', slug: 'nata-makgadikgadi-sunset', category: 'OUTDOOR_ADVENTURE', description: 'Drive onto the vast Makgadikgadi salt pans for an unforgettable sunset over a horizon-less white expanse.', price: 50, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Nata Bird Sanctuary Flamingo Tour', slug: 'nata-flamingo-tour', category: 'OUTDOOR_ADVENTURE', description: 'Visit the Nata sanctuary on Sua Pan to see seasonal flocks of flamingos and pelicans across the shimmering flats.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Kubu Island Overnight Pans Expedition', slug: 'nata-kubu-island', category: 'OUTDOOR_ADVENTURE', description: 'A 4x4 expedition to the baobab-studded Kubu Island in the middle of the salt pans — camping under spectacular stars.', price: 180, duration: '2 days', groupSizeMax: 8, difficulty: 'moderate' },
  ],
  'windhoek': [
    { name: 'Windhoek City & Township Tour', slug: 'windhoek-city-township', category: 'ARTS_CULTURE', description: 'A tour of the capital\'s colonial landmarks and the Katutura township, meeting locals and tasting Namibian food.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Namibia Self-Drive Briefing & Gear', slug: 'windhoek-self-drive-briefing', category: 'OUTDOOR_ADVENTURE', description: 'A practical orientation and 4x4 gear check for an epic Namibian self-drive — routes, camping, and desert-driving tips.', price: 25, duration: '2 hours', groupSizeMax: 10 },
    { name: 'Daan Viljoen Game Park Day Trip', slug: 'windhoek-daan-viljoen', category: 'OUTDOOR_ADVENTURE', description: 'A short trip to a hilly reserve outside Windhoek for walking among zebra, oryx, and giraffe with no predators.', price: 45, duration: 'Half day', groupSizeMax: 10 },
  ],
  'swakopmund': [
    { name: 'Sandboarding the Namib Dunes', slug: 'swakopmund-sandboarding', category: 'OUTDOOR_ADVENTURE', description: 'Slide down the towering dunes outside Swakopmund on a board, lying or standing, on the world\'s oldest desert.', price: 50, duration: 'Half day', groupSizeMax: 12, difficulty: 'moderate' },
    { name: 'Living Desert Adventure Tour', slug: 'swakopmund-living-desert', category: 'OUTDOOR_ADVENTURE', description: 'A guided 4x4 trip revealing the hidden "Little Five" of the dunes — chameleons, geckos, and sidewinder snakes.', price: 60, duration: 'Half day', groupSizeMax: 8 },
    { name: 'Walvis Bay Kayak & Dolphin Cruise', slug: 'swakopmund-walvis-bay-kayak', category: 'OUTDOOR_ADVENTURE', description: 'Kayak among seals and dolphins at Pelican Point in the Walvis Bay lagoon, surrounded by flamingos.', price: 55, duration: 'Half day', groupSizeMax: 10 },
  ],
  'sossusvlei': [
    { name: 'Sossusvlei Sunrise Dune Tour', slug: 'sossusvlei-sunrise-dunes', category: 'OUTDOOR_ADVENTURE', description: 'Reach the great red dunes at first light — climb Dune 45 or Big Daddy and walk into the surreal Deadvlei pan.', price: 70, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Sesriem Canyon & Desert Walk', slug: 'sossusvlei-sesriem-canyon', category: 'OUTDOOR_ADVENTURE', description: 'Explore the narrow Sesriem Canyon carved by the Tsauchab River and learn the ecology of the Namib Desert.', price: 35, duration: '2 hours', groupSizeMax: 12 },
    { name: 'Namib Desert Hot Air Balloon', slug: 'sossusvlei-balloon', category: 'PHOTOGRAPHY_WALKS', description: 'A sunrise hot-air balloon flight over the dunes and gravel plains, ending with a champagne breakfast in the desert.', price: 450, duration: 'Half day', groupSizeMax: 12 },
  ],
  'etosha': [
    { name: 'Etosha Full-Day Game Drive', slug: 'etosha-full-day-drive', category: 'OUTDOOR_ADVENTURE', description: 'A full day exploring Etosha\'s waterholes and the great white pan — elephant, rhino, lion, and giraffe in concentrated numbers.', price: 120, duration: 'Full day', groupSizeMax: 8 },
    { name: 'Etosha Floodlit Waterhole Night Watch', slug: 'etosha-night-waterhole', category: 'OUTDOOR_ADVENTURE', description: 'An evening at the Okaukuejo floodlit waterhole, where black rhino and elephant come to drink under the stars.', price: 30, duration: 'Evening', groupSizeMax: 12 },
    { name: 'Etosha Sunrise Safari', slug: 'etosha-sunrise-safari', category: 'OUTDOOR_ADVENTURE', description: 'A dawn game drive when predators are most active — the golden light over the pan and the best chance of lion sightings.', price: 80, duration: 'Half day', groupSizeMax: 8 },
  ],
  'luderitz': [
    { name: 'Kolmanskop Ghost Town Tour', slug: 'luderitz-kolmanskop-tour', category: 'ARTS_CULTURE', description: 'A guided tour of the diamond-rush ghost town being swallowed by the desert — grand houses half-buried in sand.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Lüderitz Peninsula & Penguin Boat Trip', slug: 'luderitz-peninsula-boat', category: 'OUTDOOR_ADVENTURE', description: 'A catamaran cruise to Halifax Island to see African penguins, seals, and dolphins on the cold Atlantic coast.', price: 50, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Diamond Coast & Bogenfels Day Trip', slug: 'luderitz-diamond-coast', category: 'OUTDOOR_ADVENTURE', description: 'A permit-only 4x4 trip into the restricted diamond area to the dramatic Bogenfels rock arch on the Sperrgebiet coast.', price: 150, duration: 'Full day', groupSizeMax: 8, difficulty: 'moderate' },
  ],
  'cape-town': [
    { name: 'Cape Peninsula & Penguins Full-Day Tour', slug: 'cape-town-peninsula-tour', category: 'OUTDOOR_ADVENTURE', description: 'A scenic drive to Cape Point, Chapman\'s Peak, and the Boulders penguin colony — the breathtaking tip of Africa.', price: 70, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Cape Winelands Tasting Tour', slug: 'cape-town-winelands-tour', category: 'FOOD_DRINK', description: 'A day among the vineyards of Stellenbosch and Franschhoek — cellar tours, tastings, and a gourmet lunch in the mountains.', price: 80, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Table Mountain Hike via Platteklip Gorge', slug: 'cape-town-table-mountain-hike', category: 'OUTDOOR_ADVENTURE', description: 'A guided hike straight up Platteklip Gorge to Table Mountain\'s summit, with the cable car down and panoramic views.', price: 45, duration: 'Half day', groupSizeMax: 10, difficulty: 'challenging' },
  ],
  'johannesburg': [
    { name: 'Soweto & Apartheid Museum Tour', slug: 'joburg-soweto-tour', category: 'ARTS_CULTURE', description: 'A guided day through Soweto — Mandela\'s house, the Hector Pieterson memorial, and the powerful Apartheid Museum.', price: 60, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Cradle of Humankind Day Trip', slug: 'joburg-cradle-of-humankind', category: 'ARTS_CULTURE', description: 'Visit the UNESCO fossil sites where early hominids were found — the Sterkfontein Caves and Maropeng visitor centre.', price: 70, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Maboneng Street Art & Food Walk', slug: 'joburg-maboneng-walk', category: 'PHOTOGRAPHY_WALKS', description: 'Explore the revitalised Maboneng precinct — murals, markets, galleries, and the creative energy of inner-city Joburg.', price: 30, duration: '3 hours', groupSizeMax: 12 },
  ],
  'kruger': [
    { name: 'Kruger Sunrise Open-Vehicle Safari', slug: 'kruger-sunrise-safari', category: 'OUTDOOR_ADVENTURE', description: 'A dawn drive in an open 4x4 when the Big Five are most active — expert guiding through southern Kruger\'s richest areas.', price: 90, duration: 'Half day', groupSizeMax: 9 },
    { name: 'Kruger Guided Bush Walk', slug: 'kruger-bush-walk', category: 'OUTDOOR_ADVENTURE', description: 'Track wildlife on foot with armed rangers — the small details of the bush and the thrill of approaching game on the ground.', price: 70, duration: 'Half day', groupSizeMax: 8, difficulty: 'moderate' },
    { name: 'Kruger Full-Day Big Five Safari', slug: 'kruger-full-day-safari', category: 'OUTDOOR_ADVENTURE', description: 'A full day across Kruger\'s southern circuit chasing the Big Five, with a picnic at a riverside rest camp.', price: 140, duration: 'Full day', groupSizeMax: 9 },
  ],
  'garden-route': [
    { name: 'Garden Route 3-Day Highlights Tour', slug: 'garden-route-3day-tour', category: 'OUTDOOR_ADVENTURE', description: 'The classic route from Cape Town — ostrich farms, Knysna lagoon, Tsitsikamma forest, and the highest bungee on Earth.', price: 350, duration: '3 days', groupSizeMax: 12 },
    { name: 'Bloukrans Bungee Jump', slug: 'garden-route-bloukrans-bungee', category: 'OUTDOOR_ADVENTURE', description: 'Leap from the Bloukrans Bridge, the world\'s highest commercial bungee at 216m, over a Tsitsikamma gorge.', price: 100, duration: '2 hours', groupSizeMax: 8, difficulty: 'challenging' },
    { name: 'Robberg Nature Reserve Hike', slug: 'garden-route-robberg-hike', category: 'OUTDOOR_ADVENTURE', description: 'A coastal hike around the Robberg peninsula at Plettenberg Bay — seal colonies, dramatic cliffs, and turquoise bays.', price: 35, duration: 'Half day', groupSizeMax: 10 },
  ],
  'drakensberg': [
    { name: 'Amphitheatre & Tugela Falls Hike', slug: 'drakensberg-amphitheatre-hike', category: 'OUTDOOR_ADVENTURE', description: 'A guided climb up the Amphitheatre escarpment via the chain ladders to the top of Tugela Falls and vast summit views.', price: 60, duration: 'Full day', groupSizeMax: 10, difficulty: 'challenging' },
    { name: 'Sani Pass & Lesotho 4x4 Day Trip', slug: 'drakensberg-sani-pass', category: 'OUTDOOR_ADVENTURE', description: 'A 4x4 journey up the legendary Sani Pass into the mountain kingdom of Lesotho, visiting a Basotho village and the highest pub in Africa.', price: 90, duration: 'Full day', groupSizeMax: 8 },
    { name: 'San Rock Art & Bushman Trail', slug: 'drakensberg-rock-art', category: 'ARTS_CULTURE', description: 'A guided walk to the Drakensberg\'s ancient San rock paintings, among the finest and oldest rock art in the world.', price: 35, duration: 'Half day', groupSizeMax: 10 },
  ],
  'victoria-falls': [
    { name: 'Zambezi Sunset River Cruise', slug: 'vic-falls-zambezi-cruise', category: 'OUTDOOR_ADVENTURE', description: 'A sunset cruise on the upper Zambezi above the falls — hippos, elephants on the banks, and drinks as the sun sinks.', price: 55, duration: 'Half day', groupSizeMax: 14 },
    { name: 'Zambezi White Water Rafting', slug: 'vic-falls-rafting', category: 'OUTDOOR_ADVENTURE', description: 'World-class Grade V rafting through the Batoka Gorge below the falls — one of the wildest one-day rafting runs on Earth.', price: 130, duration: 'Full day', groupSizeMax: 8, difficulty: 'challenging' },
    { name: 'Victoria Falls Bridge Bungee & Tour', slug: 'vic-falls-bridge-bungee', category: 'OUTDOOR_ADVENTURE', description: 'Bungee, swing, or zip-line from the historic Victoria Falls Bridge over the Zambezi gorge between two countries.', price: 160, duration: 'Half day', groupSizeMax: 8, difficulty: 'challenging' },
  ],
  'harare': [
    { name: 'Harare City & Markets Tour', slug: 'harare-city-tour', category: 'ARTS_CULTURE', description: 'Explore the capital\'s gardens, the National Gallery\'s Shona sculpture, and the bustling Mbare market with a local guide.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Domboshava Caves & Rock Art Trip', slug: 'harare-domboshava', category: 'OUTDOOR_ADVENTURE', description: 'A short trip to the Domboshava granite hills for San rock paintings and sweeping views over the highveld.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Shona Sculpture Workshop Visit', slug: 'harare-shona-sculpture', category: 'ARTS_CULTURE', description: 'Visit a sculptors\' community to watch Zimbabwe\'s world-renowned Shona stone artists at work and learn their craft.', price: 30, duration: 'Half day', groupSizeMax: 10 },
  ],
  'bulawayo': [
    { name: 'Matobo Hills Rhino Tracking Safari', slug: 'bulawayo-matobo-rhino', category: 'OUTDOOR_ADVENTURE', description: 'Track white rhino on foot in the granite-strewn Matobo Hills, plus San rock art and Cecil Rhodes\' grave at World\'s View.', price: 90, duration: 'Full day', groupSizeMax: 8, difficulty: 'moderate' },
    { name: 'Bulawayo Railway & Colonial History Tour', slug: 'bulawayo-railway-history', category: 'ARTS_CULTURE', description: 'Discover the elegant colonial city and its Railway Museum — the story of Rhodes\' Cape-to-Cairo dream in Matabeleland.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Khami Ruins Day Trip', slug: 'bulawayo-khami-ruins', category: 'ARTS_CULTURE', description: 'Visit the UNESCO-listed Khami Ruins, the dry-stone capital that succeeded Great Zimbabwe, outside Bulawayo.', price: 40, duration: 'Half day', groupSizeMax: 12 },
  ],
  'hwange': [
    { name: 'Hwange Full-Day Game Drive', slug: 'hwange-full-day-drive', category: 'OUTDOOR_ADVENTURE', description: 'A full day exploring Zimbabwe\'s largest park — vast elephant herds, lion prides, and the rare painted wolf.', price: 120, duration: 'Full day', groupSizeMax: 8 },
    { name: 'Hwange Waterhole Hide Experience', slug: 'hwange-waterhole-hide', category: 'OUTDOOR_ADVENTURE', description: 'Spend the golden hours in a waterhole hide as hundreds of elephant and buffalo come to drink in the dry season.', price: 50, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Hwange Walking Safari', slug: 'hwange-walking-safari', category: 'OUTDOOR_ADVENTURE', description: 'Track wildlife on foot with an armed guide, learning the bush and approaching game quietly in big-sky Hwange.', price: 80, duration: 'Half day', groupSizeMax: 7, difficulty: 'moderate' },
  ],
  'great-zimbabwe': [
    { name: 'Great Zimbabwe Ruins Guided Tour', slug: 'great-zimbabwe-guided-tour', category: 'ARTS_CULTURE', description: 'Explore the Hill Complex and Great Enclosure with an expert guide — the medieval empire behind Africa\'s greatest stone city.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Lake Mutirikwi Sunset & Game Trip', slug: 'great-zimbabwe-lake-mutirikwi', category: 'OUTDOOR_ADVENTURE', description: 'A sunset trip to nearby Lake Mutirikwi and its recreational park — game viewing, boating, and views back to the ruins.', price: 45, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Great Zimbabwe Sunrise Photography Walk', slug: 'great-zimbabwe-sunrise-walk', category: 'PHOTOGRAPHY_WALKS', description: 'An early walk up to the Hill Complex for sunrise over the ancient stone city and the surrounding valley.', price: 30, duration: '3 hours', groupSizeMax: 8 },
  ],
};

seed({ SPOTS, EXPERIENCES }).catch((e) => { console.error(e.message); process.exit(1); });
