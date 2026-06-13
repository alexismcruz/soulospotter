// Caribbean batch 1 — Cuba, Jamaica, Dominican Republic, Puerto Rico.
const { seed } = require('./_content-seed-helper');

const SPOTS = {
  // CUBA
  'havana': [
    { name: 'La Guarida', slug: 'la-guarida-havana', category: 'FOOD', description: 'Havana\'s most famous paladar, set in a crumbling-grand mansion staircase — refined Cuban cuisine and a rooftop bar.', address: 'Centro Habana', priceRange: 'HIGH', rating: 4.7, tags: ['paladar','iconic','rooftop','cuban'] },
    { name: 'Casa Particular Habana Vieja', slug: 'casa-particular-habana-vieja', category: 'ACCOMMODATION', description: 'A classic family-run casa particular in Old Havana — colonial rooms, a home-cooked breakfast, and local insight.', address: 'Habana Vieja', priceRange: 'BUDGET', rating: 4.5, tags: ['casa-particular','colonial','local','old-havana'] },
    { name: 'Malecón', slug: 'malecon-havana', category: 'NATURE', description: 'Havana\'s iconic seafront drive — fishermen, lovers, and musicians along the wave-splashed wall at sunset.', address: 'Havana', priceRange: 'FREE', rating: 4.6, tags: ['seafront','sunset','iconic','people-watching'] },
  ],
  'trinidad-cuba': [
    { name: 'Paladar Sol y Son', slug: 'paladar-sol-y-son-trinidad', category: 'FOOD', description: 'A charming colonial-courtyard paladar — traditional Cuban dishes served among antiques in a leafy patio.', address: 'Trinidad', priceRange: 'MID', rating: 4.5, tags: ['paladar','colonial','courtyard','cuban'] },
    { name: 'Casa Colonial Trinidad', slug: 'casa-colonial-trinidad', category: 'ACCOMMODATION', description: 'A beautifully preserved colonial casa with rocking chairs and a rooftop — the quintessential Trinidad stay.', address: 'Trinidad', priceRange: 'BUDGET', rating: 4.6, tags: ['casa-particular','colonial','rooftop','preserved'] },
    { name: 'Plaza Mayor', slug: 'plaza-mayor-trinidad', category: 'CULTURE', description: 'The UNESCO heart of Trinidad — cobbled square, pastel mansions, and the church bell tower above colonial streets.', address: 'Trinidad', priceRange: 'FREE', rating: 4.7, tags: ['unesco','plaza','colonial','iconic'] },
  ],
  'vinales': [
    { name: 'Finca Agroecológica El Paraíso', slug: 'finca-el-paraiso-vinales', category: 'FOOD', description: 'A farm-to-table organic finca with a hilltop terrace — abundant Cuban feasts and the famous anti-stress cocktail.', address: 'Viñales', priceRange: 'MID', rating: 4.7, tags: ['farm-to-table','organic','views','cuban'] },
    { name: 'Casa El Balcón Viñales', slug: 'casa-el-balcon-vinales', category: 'ACCOMMODATION', description: 'A welcoming casa particular with a balcony over the tobacco valley — fresh fruit breakfasts and horse-trek tips.', address: 'Viñales', priceRange: 'BUDGET', rating: 4.6, tags: ['casa-particular','valley-views','local','tobacco'] },
    { name: 'Valle de Viñales', slug: 'valle-de-vinales', category: 'NATURE', description: 'A UNESCO valley of dramatic mogote limestone hills, tobacco fields, and oxen — best explored on horseback.', address: 'Viñales', priceRange: 'FREE', rating: 4.8, tags: ['valley','mogotes','tobacco','unesco'] },
  ],
  'santiago-de-cuba': [
    { name: 'Restaurante St Pauli', slug: 'st-pauli-santiago-cuba', category: 'FOOD', description: 'A lively paladar in Cuba\'s second city — Caribbean-Cuban dishes and the rhythm of son in the birthplace of the music.', address: 'Santiago de Cuba', priceRange: 'MID', rating: 4.4, tags: ['paladar','son-music','caribbean','lively'] },
    { name: 'Casa Colonial Santiago', slug: 'casa-colonial-santiago', category: 'ACCOMMODATION', description: 'A friendly casa particular near Parque Céspedes — a central base for the Afro-Cuban culture of Santiago.', address: 'Santiago de Cuba', priceRange: 'BUDGET', rating: 4.4, tags: ['casa-particular','central','afro-cuban','local'] },
    { name: 'Castillo del Morro', slug: 'castillo-del-morro-santiago', category: 'CULTURE', description: 'A UNESCO clifftop fortress guarding Santiago\'s bay — dramatic Caribbean views and pirate-era history.', address: 'Santiago de Cuba', priceRange: 'MID', rating: 4.6, tags: ['fortress','unesco','views','history'] },
  ],
  'cienfuegos': [
    { name: 'Restaurante Villa Lagarto', slug: 'villa-lagarto-cienfuegos', category: 'FOOD', description: 'A waterfront paladar on the bay at Punta Gorda — lobster and fresh seafood with sunset views over the water.', address: 'Punta Gorda, Cienfuegos', priceRange: 'MID', rating: 4.6, tags: ['paladar','seafood','waterfront','sunset'] },
    { name: 'Casa Bella Perla Marina', slug: 'casa-bella-perla-cienfuegos', category: 'ACCOMMODATION', description: 'A welcoming casa in elegant Cienfuegos — neoclassical surroundings and a hospitable family base on the bay.', address: 'Cienfuegos', priceRange: 'BUDGET', rating: 4.5, tags: ['casa-particular','neoclassical','bay','local'] },
    { name: 'Parque José Martí', slug: 'parque-jose-marti-cienfuegos', category: 'CULTURE', description: 'The UNESCO main square of the "Pearl of the South" — French-influenced neoclassical architecture and the Tomás Terry theatre.', address: 'Cienfuegos', priceRange: 'FREE', rating: 4.5, tags: ['unesco','plaza','neoclassical','theatre'] },
  ],
  // JAMAICA
  'negril': [
    { name: 'Rick\'s Café', slug: 'ricks-cafe-negril', category: 'NIGHTLIFE', description: 'The legendary clifftop bar where divers leap into the sea at sunset — reggae, cocktails, and Negril\'s iconic sundown scene.', address: 'West End, Negril', priceRange: 'MID', rating: 4.4, tags: ['cliff','sunset','cliff-diving','reggae'] },
    { name: 'Judy House Cottages', slug: 'judy-house-negril', category: 'ACCOMMODATION', description: 'A laid-back garden hostel and cottages a short walk from Seven Mile Beach — a budget base in pricey Negril.', address: 'Negril', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','garden','beach','budget'] },
    { name: 'Seven Mile Beach', slug: 'seven-mile-beach-negril', category: 'NATURE', description: 'Jamaica\'s most famous beach — miles of white sand, calm turquoise water, and beach bars with sunset reggae.', address: 'Negril', priceRange: 'FREE', rating: 4.6, tags: ['beach','white-sand','sunset','reggae'] },
  ],
  'kingston': [
    { name: 'Devon House', slug: 'devon-house-kingston', category: 'FOOD', description: 'A grand colonial mansion and its famous I-Scream — Jamaicans\' favourite ice cream and patties on manicured lawns.', address: 'Kingston', priceRange: 'BUDGET', rating: 4.5, tags: ['ice-cream','patties','colonial','iconic'] },
    { name: 'Reggae Hostel Kingston', slug: 'reggae-hostel-kingston', category: 'ACCOMMODATION', description: 'A sociable hostel in New Kingston — a bar, tours, and the best budget base for the reggae capital of the world.', address: 'New Kingston', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','social','reggae','central'] },
    { name: 'Bob Marley Museum', slug: 'bob-marley-museum', category: 'CULTURE', description: 'The legend\'s former home and studio on Hope Road — the heart of reggae history, bullet holes and all.', address: 'Kingston', priceRange: 'MID', rating: 4.6, tags: ['bob-marley','reggae','museum','iconic'] },
  ],
  'port-antonio': [
    { name: 'Soldier Camp', slug: 'soldier-camp-port-antonio', category: 'FOOD', description: 'A roadside jerk shack near Boston Bay, the birthplace of jerk — smoky pork and chicken over pimento wood.', address: 'Boston Bay, Port Antonio', priceRange: 'BUDGET', rating: 4.6, tags: ['jerk','boston-bay','smoky','authentic'] },
    { name: 'Drapers San Guesthouse', slug: 'drapers-san-port-antonio', category: 'ACCOMMODATION', description: 'A charming, laid-back guesthouse near the beaches — a relaxed base for the Blue Lagoon and rafting.', address: 'Drapers, Port Antonio', priceRange: 'BUDGET', rating: 4.5, tags: ['guesthouse','relaxed','beach','base'] },
    { name: 'Blue Lagoon', slug: 'blue-lagoon-port-antonio', category: 'NATURE', description: 'A deep, jewel-coloured lagoon where cool spring water meets the warm sea — Jamaica\'s most beautiful swimming spot.', address: 'Port Antonio', priceRange: 'BUDGET', rating: 4.7, tags: ['lagoon','swimming','turquoise','iconic'] },
  ],
  'ocho-rios': [
    { name: 'Scotchies Ocho Rios', slug: 'scotchies-ocho-rios', category: 'FOOD', description: 'The famous open-air jerk centre — pit-smoked jerk chicken and pork with festival and roast breadfruit.', address: 'Ocho Rios', priceRange: 'BUDGET', rating: 4.6, tags: ['jerk','open-air','festival','authentic'] },
    { name: 'Reggae Hostel Ocho Rios', slug: 'reggae-hostel-ocho-rios', category: 'ACCOMMODATION', description: 'A friendly central hostel with a pool — a sociable budget base for Dunn\'s River Falls and the north coast.', address: 'Ocho Rios', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','pool','social','central'] },
    { name: 'Dunn\'s River Falls', slug: 'dunns-river-falls', category: 'NATURE', description: 'Jamaica\'s iconic terraced waterfall that you climb hand-in-hand from the beach — a thrilling, splashy natural staircase.', address: 'Ocho Rios', priceRange: 'MID', rating: 4.6, tags: ['waterfall','climbing','iconic','beach'] },
  ],
  'blue-mountains': [
    { name: 'EITS Café', slug: 'eits-cafe-blue-mountains', category: 'CAFE', description: 'A mountain café-restaurant ("Europe In The Summer") — farm-grown food and Blue Mountain coffee with misty valley views.', address: 'Blue Mountains', priceRange: 'MID', rating: 4.6, tags: ['cafe','farm-grown','coffee','views'] },
    { name: 'Lime Tree Farm', slug: 'lime-tree-farm-blue-mountains', category: 'ACCOMMODATION', description: 'An off-grid eco-lodge on a working coffee farm — cottages with sweeping mountain views and the freshest coffee imaginable.', address: 'Blue Mountains', priceRange: 'MID', rating: 4.7, tags: ['eco-lodge','coffee-farm','views','off-grid'] },
    { name: 'Blue Mountain Peak Trail', slug: 'blue-mountain-peak-trail', category: 'NATURE', description: 'The pre-dawn hike to Jamaica\'s highest peak (2,256m) for a sunrise that can stretch all the way to Cuba.', address: 'Blue Mountains', priceRange: 'BUDGET', rating: 4.7, tags: ['hiking','peak','sunrise','coffee'] },
  ],
  // DOMINICAN REPUBLIC
  'santo-domingo': [
    { name: 'Pat\'e Palo', slug: 'pate-palo-santo-domingo', category: 'FOOD', description: 'A European brasserie on the Americas\' oldest plaza — said to be the first tavern in the New World, with great food.', address: 'Zona Colonial, Santo Domingo', priceRange: 'MID', rating: 4.5, tags: ['brasserie','colonial','historic','plaza'] },
    { name: 'Island Life Backpackers', slug: 'island-life-backpackers-sd', category: 'ACCOMMODATION', description: 'A colourful hostel in the Zona Colonial with a plunge pool and rooftop — the social base in the historic centre.', address: 'Zona Colonial, Santo Domingo', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','pool','rooftop','colonial'] },
    { name: 'Zona Colonial', slug: 'zona-colonial-santo-domingo', category: 'CULTURE', description: 'The oldest European city in the Americas — UNESCO cobbled streets, the first cathedral, and Columbus-era ruins.', address: 'Santo Domingo', priceRange: 'FREE', rating: 4.7, tags: ['unesco','colonial','oldest-city','history'] },
  ],
  'samana': [
    { name: 'El Cabito', slug: 'el-cabito-samana', category: 'FOOD', description: 'A cliff-edge restaurant on the Las Galeras point — fresh seafood and whale-watching views over the Atlantic.', address: 'Las Galeras, Samaná', priceRange: 'MID', rating: 4.6, tags: ['seafood','clifftop','whales','views'] },
    { name: 'Casa El Paraíso Samaná', slug: 'casa-el-paraiso-samana', category: 'ACCOMMODATION', description: 'A relaxed guesthouse near the beaches of the Samaná peninsula — a tranquil base for waterfalls and whale season.', address: 'Samaná', priceRange: 'BUDGET', rating: 4.4, tags: ['guesthouse','peninsula','tranquil','beach'] },
    { name: 'El Limón Waterfall', slug: 'el-limon-waterfall', category: 'NATURE', description: 'A 40m jungle waterfall reached on horseback through cacao groves — a swim beneath the cascade in the Samaná hills.', address: 'Samaná', priceRange: 'BUDGET', rating: 4.6, tags: ['waterfall','horseback','jungle','swimming'] },
  ],
  'las-terrenas': [
    { name: 'La Terrasse', slug: 'la-terrasse-las-terrenas', category: 'FOOD', description: 'A French-Caribbean bistro in the expat beach town — fresh fish and Gallic flair on the Samaná coast.', address: 'Las Terrenas', priceRange: 'MID', rating: 4.5, tags: ['bistro','french','seafood','beach-town'] },
    { name: 'Casa Robinson', slug: 'casa-robinson-las-terrenas', category: 'ACCOMMODATION', description: 'A garden guesthouse a short walk from the beach — a relaxed, affordable base in cosmopolitan Las Terrenas.', address: 'Las Terrenas', priceRange: 'BUDGET', rating: 4.4, tags: ['guesthouse','garden','beach','relaxed'] },
    { name: 'Playa Bonita', slug: 'playa-bonita-las-terrenas', category: 'NATURE', description: 'A long, palm-fringed beach with rolling surf and far fewer crowds than the town beach — golden sand and sunsets.', address: 'Las Terrenas', priceRange: 'FREE', rating: 4.5, tags: ['beach','surf','palms','sunset'] },
  ],
  'cabarete': [
    { name: 'Bagua Café', slug: 'bagua-cafe-cabarete', category: 'CAFE', description: 'A healthy beachfront café — açai bowls, smoothies, and fresh juices fuelling Cabarete\'s kitesurf crowd.', address: 'Cabarete', priceRange: 'BUDGET', rating: 4.5, tags: ['cafe','beachfront','healthy','kitesurf'] },
    { name: 'Kite Beach Hotel', slug: 'kite-beach-hotel-cabarete', category: 'ACCOMMODATION', description: 'A laid-back hotel right on Kite Beach — roll out of bed onto the water in the kitesurfing capital of the Caribbean.', address: 'Cabarete', priceRange: 'MID', rating: 4.4, tags: ['hotel','kite-beach','watersports','beachfront'] },
    { name: 'Cabarete Bay', slug: 'cabarete-bay', category: 'NATURE', description: 'A crescent bay with reliable trade winds — the Caribbean\'s premier kitesurfing and windsurfing beach.', address: 'Cabarete', priceRange: 'FREE', rating: 4.5, tags: ['beach','kitesurfing','wind','bay'] },
  ],
  'jarabacoa': [
    { name: 'Aroma de la Montaña', slug: 'aroma-de-la-montana-jarabacoa', category: 'FOOD', description: 'A mountaintop revolving restaurant with 360° views over the central highlands — Dominican cuisine in the clouds.', address: 'Jarabacoa', priceRange: 'MID', rating: 4.5, tags: ['restaurant','mountain-views','dominican','revolving'] },
    { name: 'Rancho Baiguate', slug: 'rancho-baiguate-jarabacoa', category: 'ACCOMMODATION', description: 'An adventure lodge on a riverside ranch — the base for rafting, canyoning, and Pico Duarte treks.', address: 'Jarabacoa', priceRange: 'MID', rating: 4.4, tags: ['lodge','adventure','riverside','base'] },
    { name: 'Salto de Jimenoa', slug: 'salto-de-jimenoa', category: 'NATURE', description: 'A spectacular waterfall plunging into a deep pool, reached by suspension bridges through the mountain forest.', address: 'Jarabacoa', priceRange: 'BUDGET', rating: 4.5, tags: ['waterfall','suspension-bridge','forest','swimming'] },
  ],
  // PUERTO RICO
  'san-juan': [
    { name: 'Deaverdura', slug: 'deaverdura-san-juan', category: 'FOOD', description: 'A beloved Old San Juan spot for fresh, daily-changing Puerto Rican comfort food — mofongo and criollo classics.', address: 'Old San Juan', priceRange: 'MID', rating: 4.6, tags: ['puerto-rican','mofongo','old-town','local'] },
    { name: 'Casa Sol B&B', slug: 'casa-sol-bb-san-juan', category: 'ACCOMMODATION', description: 'A restored colonial B&B in the heart of Old San Juan — a charming, central base among the blue cobblestones.', address: 'Old San Juan', priceRange: 'MID', rating: 4.5, tags: ['bnb','colonial','old-town','central'] },
    { name: 'Castillo San Felipe del Morro', slug: 'castillo-del-morro-san-juan', category: 'CULTURE', description: 'The vast 16th-century clifftop fortress guarding San Juan Bay — a UNESCO site of sweeping ocean views and kite-flying lawns.', address: 'Old San Juan', priceRange: 'MID', rating: 4.8, tags: ['fortress','unesco','views','iconic'] },
  ],
  'rincon': [
    { name: 'The English Rose', slug: 'the-english-rose-rincon', category: 'CAFE', description: 'A hillside breakfast spot with sweeping ocean views — famous brunches above Puerto Rico\'s surf coast.', address: 'Rincón', priceRange: 'MID', rating: 4.6, tags: ['breakfast','views','surf-coast','brunch'] },
    { name: 'Lazy Parrot Inn', slug: 'lazy-parrot-inn-rincon', category: 'ACCOMMODATION', description: 'A colourful hillside inn with a pool — a relaxed base for Rincón\'s surf breaks, sunsets, and whale watching.', address: 'Rincón', priceRange: 'MID', rating: 4.4, tags: ['inn','pool','surf','relaxed'] },
    { name: 'Domes Beach', slug: 'domes-beach-rincon', category: 'NATURE', description: 'Rincón\'s famous surf break beside the old nuclear dome — winter swells, whale spotting, and golden sunsets.', address: 'Rincón', priceRange: 'FREE', rating: 4.5, tags: ['beach','surf','whales','sunset'] },
  ],
  'el-yunque': [
    { name: 'Lluvia Deli & Café', slug: 'lluvia-deli-el-yunque', category: 'CAFE', description: 'A cosy café at the edge of the rainforest — local coffee and sandwiches before hiking El Yunque\'s trails.', address: 'near El Yunque', priceRange: 'BUDGET', rating: 4.3, tags: ['cafe','rainforest-edge','coffee','base'] },
    { name: 'Rainforest Inn', slug: 'rainforest-inn-el-yunque', category: 'ACCOMMODATION', description: 'An eco B&B on the rainforest border with its own waterfall and trails — an immersive El Yunque base.', address: 'near El Yunque', priceRange: 'MID', rating: 4.6, tags: ['eco-inn','rainforest','waterfall','immersive'] },
    { name: 'La Mina Falls Trail', slug: 'la-mina-falls-trail', category: 'NATURE', description: 'A lush trail through the only tropical rainforest in the US Forest System to a swimmable waterfall pool.', address: 'El Yunque National Forest', priceRange: 'BUDGET', rating: 4.6, tags: ['waterfall','rainforest','hiking','swimming'] },
  ],
  'vieques': [
    { name: 'El Quenepo', slug: 'el-quenepo-vieques', category: 'FOOD', description: 'An upscale waterfront restaurant in Esperanza — island-grown produce and fresh seafood on the Vieques malecón.', address: 'Esperanza, Vieques', priceRange: 'HIGH', rating: 4.6, tags: ['seafood','waterfront','island-grown','upscale'] },
    { name: 'Casa de Amistad', slug: 'casa-de-amistad-vieques', category: 'ACCOMMODATION', description: 'A small guesthouse with a plunge pool in Isabel Segunda — a friendly, affordable base on laid-back Vieques.', address: 'Isabel Segunda, Vieques', priceRange: 'MID', rating: 4.4, tags: ['guesthouse','pool','island','relaxed'] },
    { name: 'Mosquito Bay', slug: 'mosquito-bay-vieques', category: 'NATURE', description: 'The brightest bioluminescent bay in the world — kayak after dark to watch the water glow electric blue at every stroke.', address: 'Vieques', priceRange: 'MID', rating: 4.8, tags: ['bioluminescent','kayak','night','iconic'] },
  ],
  'ponce': [
    { name: 'Lola Eclectic Cuisine', slug: 'lola-ponce', category: 'FOOD', description: 'A stylish restaurant on the plaza serving creative Puerto Rican cuisine — a culinary highlight of the southern city.', address: 'Ponce', priceRange: 'MID', rating: 4.5, tags: ['puerto-rican','creative','plaza','stylish'] },
    { name: 'Hotel Bélgica', slug: 'hotel-belgica-ponce', category: 'ACCOMMODATION', description: 'A historic 1872 hotel just off the main plaza — old-world charm and a central base in elegant Ponce.', address: 'Ponce', priceRange: 'BUDGET', rating: 4.3, tags: ['hotel','historic','central','charming'] },
    { name: 'Parque de Bombas', slug: 'parque-de-bombas-ponce', category: 'CULTURE', description: 'The whimsical red-and-black striped old firehouse on the plaza — Ponce\'s most photographed and beloved landmark.', address: 'Ponce', priceRange: 'FREE', rating: 4.4, tags: ['firehouse','iconic','plaza','architecture'] },
  ],
};

const EXPERIENCES = {
  'havana': [
    { name: 'Classic Car Tour of Havana', slug: 'havana-classic-car-tour', category: 'ARTS_CULTURE', description: 'Cruise Havana in a vintage 1950s convertible — the Malecón, Revolution Square, and the old city with a local driver.', price: 50, duration: '2 hours', groupSizeMax: 4 },
    { name: 'Old Havana Walking & Rum Tour', slug: 'havana-old-town-rum', category: 'FOOD_DRINK', description: 'Walk the UNESCO plazas of Habana Vieja and learn the mojito and daiquiri at the bars Hemingway made famous.', price: 35, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Havana Salsa Class & Live Music Night', slug: 'havana-salsa-night', category: 'NIGHTLIFE_SOCIAL', description: 'Learn Cuban salsa from local dancers, then experience live son and timba at a legendary Havana music venue.', price: 30, duration: 'Evening', groupSizeMax: 12 },
  ],
  'trinidad-cuba': [
    { name: 'Valle de los Ingenios Steam Train Tour', slug: 'trinidad-valle-ingenios', category: 'ARTS_CULTURE', description: 'Ride toward the UNESCO sugar-mill valley to learn the colonial sugar history that built Trinidad\'s wealth.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Topes de Collantes Waterfall Hike', slug: 'trinidad-topes-collantes', category: 'OUTDOOR_ADVENTURE', description: 'Hike the Escambray mountains to the El Cubano waterfall for a swim in a natural pool amid lush forest.', price: 45, duration: 'Full day', groupSizeMax: 10, difficulty: 'moderate' },
    { name: 'Casa de la Música Salsa Night', slug: 'trinidad-casa-musica', category: 'NIGHTLIFE_SOCIAL', description: 'Dance under the stars on the famous Casa de la Música steps — live salsa in Trinidad\'s open-air nightlife.', price: 20, duration: 'Evening', groupSizeMax: 12 },
  ],
  'vinales': [
    { name: 'Viñales Valley Horseback Tobacco Tour', slug: 'vinales-horseback-tobacco', category: 'OUTDOOR_ADVENTURE', description: 'Ride through the mogote valley to a tobacco farm to see cigar rolling, plus coffee and a cave, with a guajiro guide.', price: 35, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Cueva del Indio & Mural Tour', slug: 'vinales-cueva-del-indio', category: 'OUTDOOR_ADVENTURE', description: 'Boat through the underground river of Cueva del Indio and visit the giant Mural de la Prehistoria.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Viñales Rock Climbing Half-Day', slug: 'vinales-rock-climbing', category: 'OUTDOOR_ADVENTURE', description: 'Climb the limestone mogotes of Viñales — superb tufa and pocket routes for all levels in a stunning valley.', price: 40, duration: 'Half day', groupSizeMax: 6, difficulty: 'moderate' },
  ],
  'santiago-de-cuba': [
    { name: 'Santiago Afro-Cuban Culture Tour', slug: 'santiago-afro-cuban-tour', category: 'ARTS_CULTURE', description: 'Explore the most African-influenced city in Cuba — the cradle of son, the Moncada barracks, and Santería traditions.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'El Cobre Basilica Day Trip', slug: 'santiago-el-cobre', category: 'ARTS_CULTURE', description: 'Visit the Basilica of the Virgin of Charity, Cuba\'s patron saint and most important pilgrimage site, near Santiago.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Trova & Son Music Night', slug: 'santiago-trova-night', category: 'NIGHTLIFE_SOCIAL', description: 'Experience the live trova and son at the Casa de la Trova in the birthplace of Cuba\'s most beloved music.', price: 20, duration: 'Evening', groupSizeMax: 12 },
  ],
  'cienfuegos': [
    { name: 'Cienfuegos Neoclassical City Tour', slug: 'cienfuegos-city-tour', category: 'ARTS_CULTURE', description: 'Discover the "Pearl of the South" — the UNESCO centre, the Tomás Terry theatre, and the bayside Punta Gorda.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'El Nicho Waterfalls Day Trip', slug: 'cienfuegos-el-nicho', category: 'OUTDOOR_ADVENTURE', description: 'A trip into the Escambray mountains to the El Nicho waterfalls and natural pools for swimming and hiking.', price: 45, duration: 'Full day', groupSizeMax: 10, difficulty: 'moderate' },
    { name: 'Cienfuegos Bay Sunset Sail', slug: 'cienfuegos-bay-sail', category: 'OUTDOOR_ADVENTURE', description: 'A relaxed boat trip on the wide Bay of Cienfuegos at sunset, with the elegant city skyline glowing on the shore.', price: 30, duration: 'Evening', groupSizeMax: 12 },
  ],
  'negril': [
    { name: 'Negril Cliff Jumping & Sunset Cruise', slug: 'negril-cliff-sunset-cruise', category: 'OUTDOOR_ADVENTURE', description: 'A catamaran cruise along the West End cliffs with snorkelling, cliff jumping, and Negril\'s famous sunset.', price: 60, duration: 'Half day', groupSizeMax: 14 },
    { name: 'YS Falls & Black River Safari', slug: 'negril-ys-falls-safari', category: 'OUTDOOR_ADVENTURE', description: 'A day trip to the tiered YS Falls and a Black River boat safari to spot crocodiles in the mangroves.', price: 70, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Seven Mile Beach Reggae Bar Crawl', slug: 'negril-reggae-crawl', category: 'NIGHTLIFE_SOCIAL', description: 'A guided evening along Seven Mile Beach\'s reggae bars — rum, riddims, and the laid-back Negril nightlife.', price: 30, duration: 'Evening', groupSizeMax: 12 },
  ],
  'kingston': [
    { name: 'Bob Marley Museum & Trench Town Tour', slug: 'kingston-marley-trenchtown', category: 'ARTS_CULTURE', description: 'Visit Marley\'s home-studio and the Trench Town yard where reggae was born, with a local reggae historian.', price: 50, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Blue Mountains Coffee Day Trip', slug: 'kingston-blue-mountains-coffee', category: 'FOOD_DRINK', description: 'Escape into the Blue Mountains for a coffee-estate tour, tastings, and cool misty views above the capital.', price: 65, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Kingston Street Food & Devon House Tour', slug: 'kingston-street-food', category: 'FOOD_DRINK', description: 'Taste jerk, patties, and the famous Devon House I-Scream on a guided food tour of the Jamaican capital.', price: 35, duration: '3 hours', groupSizeMax: 10 },
  ],
  'port-antonio': [
    { name: 'Rio Grande Bamboo Rafting', slug: 'port-antonio-rio-grande-rafting', category: 'OUTDOOR_ADVENTURE', description: 'Drift down the Rio Grande on a bamboo raft poled by a local captain — the original, serene Jamaican river journey.', price: 60, duration: 'Half day', groupSizeMax: 4 },
    { name: 'Blue Lagoon & Beaches Boat Tour', slug: 'port-antonio-blue-lagoon-tour', category: 'OUTDOOR_ADVENTURE', description: 'A boat trip to the jewel-blue lagoon and the secluded beaches of the Portland coast for swimming and snorkelling.', price: 50, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Reach Falls Hike & Swim', slug: 'port-antonio-reach-falls', category: 'OUTDOOR_ADVENTURE', description: 'Hike to the pristine Reach Falls in the Portland rainforest for swimming, jumping, and the underwater cave.', price: 45, duration: 'Half day', groupSizeMax: 10 },
  ],
  'ocho-rios': [
    { name: 'Dunn\'s River Falls Climb', slug: 'ocho-rios-dunns-river-climb', category: 'OUTDOOR_ADVENTURE', description: 'Climb the famous terraced waterfall hand-in-hand from the beach — Jamaica\'s most iconic natural adventure.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Blue Hole & Secret Falls Tour', slug: 'ocho-rios-blue-hole', category: 'OUTDOOR_ADVENTURE', description: 'Jump, swing, and swim through the turquoise pools and cascades of the Island Gully (Blue Hole) near Ocho Rios.', price: 45, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Mystic Mountain Rainforest Adventure', slug: 'ocho-rios-mystic-mountain', category: 'OUTDOOR_ADVENTURE', description: 'A chairlift over the rainforest canopy plus ziplines and a bobsled ride above Ocho Rios.', price: 70, duration: 'Half day', groupSizeMax: 12 },
  ],
  'blue-mountains': [
    { name: 'Blue Mountain Peak Sunrise Hike', slug: 'blue-mountains-peak-hike', category: 'OUTDOOR_ADVENTURE', description: 'A guided pre-dawn climb to Jamaica\'s 2,256m summit for a sunrise over the island and distant Cuba.', price: 70, duration: 'Full day', groupSizeMax: 10, difficulty: 'challenging' },
    { name: 'Blue Mountain Coffee Estate Tour', slug: 'blue-mountains-coffee-tour', category: 'FOOD_DRINK', description: 'Tour a working coffee farm growing the world-famous Blue Mountain beans, from cherry to cup, with tastings.', price: 45, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Blue Mountain Bicycle Descent', slug: 'blue-mountains-bike-descent', category: 'OUTDOOR_ADVENTURE', description: 'A mostly downhill cycle from high in the Blue Mountains through villages and coffee country to the coast.', price: 90, duration: 'Full day', groupSizeMax: 12 },
  ],
  'santo-domingo': [
    { name: 'Zona Colonial Walking Tour', slug: 'santo-domingo-zona-colonial-walk', category: 'ARTS_CULTURE', description: 'Walk the oldest European city in the Americas — the first cathedral, the Alcázar de Colón, and 500 years of history.', price: 30, duration: '3 hours', groupSizeMax: 12 },
    { name: 'Los Tres Ojos & City Day Tour', slug: 'santo-domingo-tres-ojos', category: 'OUTDOOR_ADVENTURE', description: 'Visit the Three Eyes limestone caves and lagoons, plus the colonial city and the Columbus Lighthouse.', price: 45, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Merengue & Bachata Dance Night', slug: 'santo-domingo-merengue-night', category: 'NIGHTLIFE_SOCIAL', description: 'Learn merengue and bachata, born here in the DR, then dance at a Zona Colonial club with a local guide.', price: 30, duration: 'Evening', groupSizeMax: 12 },
  ],
  'samana': [
    { name: 'Humpback Whale Watching (in season)', slug: 'samana-whale-watching', category: 'OUTDOOR_ADVENTURE', description: 'A boat trip into Samaná Bay where thousands of humpback whales gather to breed each winter — breaching and song.', price: 65, duration: 'Half day', groupSizeMax: 14 },
    { name: 'El Limón Waterfall Horseback Ride', slug: 'samana-el-limon-horseback', category: 'OUTDOOR_ADVENTURE', description: 'Ride horseback through cacao groves to the 40m El Limón waterfall for a swim in its jungle pool.', price: 40, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Cayo Levantado Island Beach Trip', slug: 'samana-cayo-levantado', category: 'OUTDOOR_ADVENTURE', description: 'A boat trip to the postcard "Bacardi Island" of Cayo Levantado for white sand and turquoise Caribbean swimming.', price: 45, duration: 'Half day', groupSizeMax: 12 },
  ],
  'las-terrenas': [
    { name: 'Playa Frontón & El Valle Boat Day', slug: 'las-terrenas-playa-fronton', category: 'OUTDOOR_ADVENTURE', description: 'A boat trip to the remote, cliff-backed Playa Frontón for snorkelling and one of the DR\'s most stunning beaches.', price: 55, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Las Terrenas Kitesurf Lesson', slug: 'las-terrenas-kitesurf', category: 'FITNESS_SPORTS', description: 'Learn to kitesurf in the steady trade winds off Playa Punta Popy with a certified local instructor.', price: 70, duration: 'Half day', groupSizeMax: 4, difficulty: 'moderate' },
    { name: 'Samaná Peninsula Scooter Beach Tour', slug: 'las-terrenas-scooter-tour', category: 'OUTDOOR_ADVENTURE', description: 'Explore the peninsula\'s string of beaches by scooter — Playa Bonita, Coson, and hidden coves at your own pace.', price: 40, duration: 'Full day', groupSizeMax: 8 },
  ],
  'cabarete': [
    { name: 'Cabarete Kitesurfing Lesson', slug: 'cabarete-kitesurf-lesson', category: 'FITNESS_SPORTS', description: 'Learn to kitesurf in the Caribbean\'s wind capital — afternoon thermals and a wide, safe bay for beginners.', price: 80, duration: 'Half day', groupSizeMax: 4, difficulty: 'moderate' },
    { name: '27 Charcos de Damajagua Canyoning', slug: 'cabarete-27-charcos', category: 'OUTDOOR_ADVENTURE', description: 'Jump and slide down 27 waterfalls and turquoise pools in the famous Damajagua canyon near Cabarete.', price: 55, duration: 'Full day', groupSizeMax: 10, difficulty: 'moderate' },
    { name: 'El Choco Caves & Lagoon Tour', slug: 'cabarete-el-choco', category: 'OUTDOOR_ADVENTURE', description: 'Explore the El Choco national park caves and lagoons by foot and boat just inland from Cabarete.', price: 35, duration: 'Half day', groupSizeMax: 12 },
  ],
  'jarabacoa': [
    { name: 'Río Yaque del Norte Rafting', slug: 'jarabacoa-rafting', category: 'OUTDOOR_ADVENTURE', description: 'White-water raft the Caribbean\'s only commercially rafted river through the cool central highlands.', price: 50, duration: 'Half day', groupSizeMax: 8 },
    { name: 'Pico Duarte 2-Day Trek', slug: 'jarabacoa-pico-duarte', category: 'OUTDOOR_ADVENTURE', description: 'Climb the Caribbean\'s highest peak (3,098m) through pine forest to a summit sunrise on this challenging mountain trek.', price: 220, duration: '2 days', groupSizeMax: 8, difficulty: 'challenging' },
    { name: 'Jarabacoa Waterfalls & Canyoning', slug: 'jarabacoa-canyoning', category: 'OUTDOOR_ADVENTURE', description: 'Canyon and swim the Jimenoa and Baiguate waterfalls in the lush mountains around Jarabacoa.', price: 45, duration: 'Half day', groupSizeMax: 10, difficulty: 'moderate' },
  ],
  'san-juan': [
    { name: 'Old San Juan Walking & Forts Tour', slug: 'san-juan-old-town-forts', category: 'ARTS_CULTURE', description: 'Explore the blue cobblestones, El Morro and San Cristóbal forts, and 500 years of history in Old San Juan.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Bioluminescent Bay Kayak Tour', slug: 'san-juan-bio-bay-kayak', category: 'OUTDOOR_ADVENTURE', description: 'An evening kayak through the glowing bioluminescent lagoon at Fajardo, a short trip from San Juan.', price: 55, duration: 'Evening', groupSizeMax: 12 },
    { name: 'San Juan Food & Rum Tasting Tour', slug: 'san-juan-food-rum', category: 'FOOD_DRINK', description: 'Taste mofongo, lechón, and Puerto Rican rum on a guided walk through Old San Juan\'s best kitchens and bars.', price: 45, duration: '3 hours', groupSizeMax: 10 },
  ],
  'rincon': [
    { name: 'Rincón Surf Lesson', slug: 'rincon-surf-lesson', category: 'FITNESS_SPORTS', description: 'Learn to surf Puerto Rico\'s most famous waves on the west coast with a local instructor — winter swells, warm water.', price: 50, duration: '2 hours', groupSizeMax: 6 },
    { name: 'Whale Watching & Sunset Sail', slug: 'rincon-whale-sunset-sail', category: 'OUTDOOR_ADVENTURE', description: 'A catamaran sail off Rincón to spot humpback whales in season and catch the famous west-coast sunset.', price: 60, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Desecheo Island Snorkel Trip', slug: 'rincon-desecheo-snorkel', category: 'OUTDOOR_ADVENTURE', description: 'A boat trip to the clear waters around Desecheo Island for some of the Caribbean\'s best snorkelling and diving.', price: 90, duration: 'Full day', groupSizeMax: 10 },
  ],
  'el-yunque': [
    { name: 'El Yunque Rainforest Guided Hike', slug: 'el-yunque-guided-hike', category: 'OUTDOOR_ADVENTURE', description: 'Hike the only tropical rainforest in the US Forest System — waterfalls, coquí frogs, and lush trails to a swimming pool.', price: 55, duration: 'Half day', groupSizeMax: 12 },
    { name: 'El Yunque Waterslides & Off-Path Tour', slug: 'el-yunque-waterslides', category: 'OUTDOOR_ADVENTURE', description: 'A local-guided trip to El Yunque\'s natural rock waterslides and hidden river pools off the main trails.', price: 60, duration: 'Half day', groupSizeMax: 10, difficulty: 'moderate' },
    { name: 'Rainforest & Luquillo Beach Combo', slug: 'el-yunque-luquillo-combo', category: 'OUTDOOR_ADVENTURE', description: 'Combine an El Yunque hike with the famous Luquillo kiosks and beach — rainforest and Caribbean sand in a day.', price: 70, duration: 'Full day', groupSizeMax: 12 },
  ],
  'vieques': [
    { name: 'Mosquito Bay Bioluminescent Kayak', slug: 'vieques-bio-bay-kayak', category: 'OUTDOOR_ADVENTURE', description: 'Kayak the world\'s brightest bioluminescent bay after dark, watching the water blaze blue with every paddle stroke.', price: 60, duration: 'Evening', groupSizeMax: 12 },
    { name: 'Vieques Wild Beaches & Snorkel Tour', slug: 'vieques-wild-beaches', category: 'OUTDOOR_ADVENTURE', description: 'Explore the empty, wild beaches of the former navy lands and snorkel the clear reefs of laid-back Vieques.', price: 55, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Wild Horses & Island Tour', slug: 'vieques-wild-horses-tour', category: 'OUTDOOR_ADVENTURE', description: 'Tour the island past its famous free-roaming wild horses, Spanish fort, and hidden coves with a local guide.', price: 45, duration: 'Half day', groupSizeMax: 10 },
  ],
  'ponce': [
    { name: 'Ponce Historic City Tour', slug: 'ponce-city-tour', category: 'ARTS_CULTURE', description: 'Explore the "Pearl of the South" — the striped firehouse, the plaza, and the finest 19th-century architecture in the Caribbean.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Museo de Arte de Ponce Visit', slug: 'ponce-art-museum', category: 'ARTS_CULTURE', description: 'Tour one of the Caribbean\'s great art museums, with 3,000 works including renowned European paintings.', price: 25, duration: '2 hours', groupSizeMax: 12 },
    { name: 'Hacienda Buena Vista Coffee Tour', slug: 'ponce-hacienda-buena-vista', category: 'FOOD_DRINK', description: 'Visit a restored 19th-century coffee estate near Ponce — water-powered machinery and the story of Puerto Rican coffee.', price: 35, duration: 'Half day', groupSizeMax: 12 },
  ],
};

seed({ SPOTS, EXPERIENCES }).catch((e) => { console.error(e.message); process.exit(1); });
