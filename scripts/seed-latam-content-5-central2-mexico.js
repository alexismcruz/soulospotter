// Batch 5 (final) — El Salvador (San Salvador, El Tunco, El Zonte, Santa Ana, Suchitoto),
// Guatemala (Flores, Panajachel, Quetzaltenango, Semuc Champey),
// Honduras (Copán Ruinas, La Ceiba, Roatán, Tegucigalpa, Utila),
// Mexico (Guadalajara, Puerto Escondido, San Cristóbal de las Casas, Tulum).
const { seed } = require('./_latam-seed-helper');

const SPOTS = {
  'san-salvador': [
    { name: 'Viva Espresso', slug: 'viva-espresso-san-salvador', category: 'CAFE', description: 'An award-winning specialty café showcasing El Salvador\'s prized highland coffee — championship baristas and excellent single origins.', address: 'Colonia San Benito, San Salvador', priceRange: 'BUDGET', rating: 4.6, tags: ['specialty-coffee','baristas','salvadoran','quality'] },
    { name: 'Cumbres del Volcán Hostel', slug: 'cumbres-del-volcan-hostel', category: 'ACCOMMODATION', description: 'A relaxed hostel in the leafy Escalón district — a safe, central base for exploring the capital and the Ruta de las Flores.', address: 'Colonia Escalón, San Salvador', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','central','safe','base'] },
    { name: 'Mercado Central', slug: 'mercado-central-san-salvador', category: 'FOOD', description: 'The chaotic, colourful heart of San Salvador — pupusas, tropical fruit, and the raw energy of Salvadoran street life.', address: 'Centro, San Salvador', priceRange: 'BUDGET', rating: 4.1, tags: ['market','pupusas','street-food','authentic'] },
  ],
  'el-tunco': [
    { name: 'La Bocana Restaurant', slug: 'la-bocana-el-tunco', category: 'FOOD', description: 'A beachfront spot at the river mouth break — fresh seafood and sunset views over El Salvador\'s most famous surf beach.', address: 'El Tunco', priceRange: 'MID', rating: 4.4, tags: ['seafood','beachfront','sunset','surf'] },
    { name: 'Papaya Lodge', slug: 'papaya-lodge-el-tunco', category: 'ACCOMMODATION', description: 'A chilled surf hostel with a pool steps from the break — hammocks, board rental, and the social hub of El Tunco.', address: 'El Tunco', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','surf','pool','social'] },
    { name: 'Playa El Tunco', slug: 'playa-el-tunco', category: 'NATURE', description: 'The black-sand surf beach named for its pig-shaped rock — powerful point breaks and a buzzing weekend party scene.', address: 'El Tunco', priceRange: 'FREE', rating: 4.4, tags: ['beach','surf','black-sand','party'] },
  ],
  'el-zonte': [
    { name: 'Bitcoin Beach Café', slug: 'bitcoin-beach-cafe-el-zonte', category: 'CAFE', description: 'A café at the heart of "Bitcoin Beach," where El Salvador\'s crypto experiment began — coffee, smoothies, and a curious crowd.', address: 'El Zonte', priceRange: 'BUDGET', rating: 4.3, tags: ['cafe','bitcoin','smoothies','surf-town'] },
    { name: 'Esencia Nativa', slug: 'esencia-nativa-el-zonte', category: 'ACCOMMODATION', description: 'A surfer-run lodge with a pool right by the point — a laid-back, friendly base in mellow El Zonte.', address: 'El Zonte', priceRange: 'BUDGET', rating: 4.5, tags: ['lodge','surf','pool','relaxed'] },
    { name: 'Punta El Zonte', slug: 'punta-el-zonte', category: 'NATURE', description: 'A quieter, more local alternative to El Tunco — a consistent point break and tide pools on a wild black-sand beach.', address: 'El Zonte', priceRange: 'FREE', rating: 4.3, tags: ['beach','surf','point-break','quiet'] },
  ],
  'santa-ana': [
    { name: 'Cadejo Brewing Co.', slug: 'cadejo-brewing-santa-ana', category: 'NIGHTLIFE', description: 'El Salvador\'s leading craft brewery taproom — local IPAs and stouts in the handsome colonial city of Santa Ana.', address: 'Santa Ana', priceRange: 'MID', rating: 4.4, tags: ['craft-beer','taproom','colonial','social'] },
    { name: 'Casa Verde Hostel', slug: 'casa-verde-hostel-santa-ana', category: 'ACCOMMODATION', description: 'A spotless, much-loved hostel with a pool — the perfect base for climbing Santa Ana volcano and visiting Lake Coatepeque.', address: 'Santa Ana', priceRange: 'BUDGET', rating: 4.7, tags: ['hostel','pool','volcano-base','spotless'] },
    { name: 'Catedral de Santa Ana', slug: 'catedral-de-santa-ana', category: 'CULTURE', description: 'A striking neo-Gothic cathedral on the main plaza — the architectural jewel of El Salvador\'s elegant second city.', address: 'Parque Libertad, Santa Ana', priceRange: 'FREE', rating: 4.5, tags: ['cathedral','neo-gothic','plaza','architecture'] },
  ],
  'suchitoto': [
    { name: 'Café El Necio', slug: 'cafe-el-necio-suchitoto', category: 'CAFE', description: 'A bohemian, politically-charged café in the cobbled colonial town — strong coffee, local art, and revolutionary memorabilia.', address: 'Suchitoto', priceRange: 'BUDGET', rating: 4.4, tags: ['cafe','bohemian','colonial','art'] },
    { name: 'Los Almendros de San Lorenzo', slug: 'los-almendros-suchitoto', category: 'ACCOMMODATION', description: 'A restored colonial mansion boutique hotel — antiques, a courtyard pool, and the most atmospheric stay in Suchitoto.', address: 'Suchitoto', priceRange: 'HIGH', rating: 4.6, tags: ['boutique','colonial','pool','atmospheric'] },
    { name: 'Iglesia Santa Lucía', slug: 'iglesia-santa-lucia-suchitoto', category: 'CULTURE', description: 'The whitewashed colonial church on Suchitoto\'s cobbled plaza — the postcard image of El Salvador\'s best-preserved colonial town.', address: 'Plaza Central, Suchitoto', priceRange: 'FREE', rating: 4.5, tags: ['church','colonial','plaza','iconic'] },
  ],
  'flores': [
    { name: 'Café Yaxhá', slug: 'cafe-yaxha-flores', category: 'CAFE', description: 'A cosy café on the island of Flores — good coffee and breakfasts before early starts to the Tikal ruins.', address: 'Isla de Flores', priceRange: 'BUDGET', rating: 4.4, tags: ['cafe','breakfast','island','tikal-base'] },
    { name: 'Los Amigos Hostel', slug: 'los-amigos-hostel-flores', category: 'ACCOMMODATION', description: 'A legendary jungle-garden hostel on Flores island — hammocks, a great vegetarian kitchen, and the social hub for Tikal trips.', address: 'Isla de Flores', priceRange: 'BUDGET', rating: 4.6, tags: ['hostel','garden','social','tikal-base'] },
    { name: 'Isla de Flores Malecón', slug: 'isla-de-flores-malecon', category: 'NATURE', description: 'The lakeside waterfront of the colourful island town on Lake Petén Itzá — sunset swims and boat trips across the water.', address: 'Flores', priceRange: 'FREE', rating: 4.4, tags: ['lakefront','island','sunset','colourful'] },
  ],
  'panajachel': [
    { name: 'Circus Bar', slug: 'circus-bar-panajachel', category: 'NIGHTLIFE', description: 'A long-running live-music bar on Calle Santander — wood-fired pizza and nightly bands in the gateway town to Lake Atitlán.', address: 'Calle Santander, Panajachel', priceRange: 'MID', rating: 4.4, tags: ['live-music','pizza','bar','atitlan'] },
    { name: 'Selina Atitlán', slug: 'selina-atitlan-panajachel', category: 'ACCOMMODATION', description: 'A lakeside hostel with coworking and gardens — a social base for boat-hopping the villages of Lake Atitlán.', address: 'Panajachel', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','lakeside','coworking','social'] },
    { name: 'Reserva Natural Atitlán', slug: 'reserva-natural-atitlan', category: 'NATURE', description: 'A nature reserve above Panajachel with a butterfly dome, waterfalls, ziplines, and spider monkeys overlooking the lake.', address: 'Panajachel', priceRange: 'MID', rating: 4.4, tags: ['reserve','butterflies','zipline','monkeys'] },
  ],
  'quetzaltenango': [
    { name: 'Café Red', slug: 'cafe-red-xela', category: 'CAFE', description: 'A traveller-favourite café in Xela — big breakfasts, strong coffee, and a noticeboard for the city\'s many Spanish schools and treks.', address: 'Quetzaltenango', priceRange: 'BUDGET', rating: 4.5, tags: ['cafe','breakfast','spanish-school','trekking-hub'] },
    { name: 'Black Cat Hostel Xela', slug: 'black-cat-hostel-xela', category: 'ACCOMMODATION', description: 'A sociable central hostel with a hearty breakfast — the launch point for the famous Xela-to-Atitlán trek.', address: 'Quetzaltenango', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','social','central','trekking-base'] },
    { name: 'Parque Centro América', slug: 'parque-centro-america-xela', category: 'CULTURE', description: 'The grand neoclassical central plaza of Guatemala\'s highland second city — banks, theatres, and Maya highland life.', address: 'Quetzaltenango', priceRange: 'FREE', rating: 4.3, tags: ['plaza','neoclassical','highland','maya'] },
  ],
  'semuc-champey': [
    { name: 'Café Lanquín', slug: 'cafe-lanquin-semuc', category: 'FOOD', description: 'A simple eatery in Lanquín village — hearty local food before the bumpy ride to the turquoise pools of Semuc Champey.', address: 'Lanquín', priceRange: 'BUDGET', rating: 4.2, tags: ['local-food','village','gateway','simple'] },
    { name: 'Zephyr Lodge', slug: 'zephyr-lodge-semuc', category: 'ACCOMMODATION', description: 'A hilltop hostel with a jaw-dropping valley view and infinity pool — the legendary social base for Semuc Champey.', address: 'Semuc Champey', priceRange: 'BUDGET', rating: 4.6, tags: ['hostel','views','infinity-pool','social'] },
    { name: 'Semuc Champey Pools', slug: 'semuc-champey-pools', category: 'NATURE', description: 'A staircase of turquoise limestone pools over a natural land bridge in the jungle — one of Central America\'s most magical sights.', address: 'Semuc Champey', priceRange: 'BUDGET', rating: 4.8, tags: ['pools','limestone','jungle','iconic'] },
  ],
  'copan-ruinas': [
    { name: 'Café San Rafael', slug: 'cafe-san-rafael-copan', category: 'CAFE', description: 'A charming café and fromagerie serving estate-grown Copán coffee and local cheeses in the cobbled Maya town.', address: 'Copán Ruinas', priceRange: 'BUDGET', rating: 4.6, tags: ['cafe','coffee','cheese','colonial'] },
    { name: 'Iguana Azul Hostel', slug: 'iguana-azul-hostel-copan', category: 'ACCOMMODATION', description: 'A peaceful colonial-house hostel near the plaza — a relaxed base for visiting the famous Copán archaeological site.', address: 'Copán Ruinas', priceRange: 'BUDGET', rating: 4.5, tags: ['hostel','colonial','peaceful','ruins-base'] },
    { name: 'Copán Archaeological Site', slug: 'copan-archaeological-site', category: 'CULTURE', description: 'The "Athens of the Maya world" — a UNESCO city famed for its intricately carved stelae and the great Hieroglyphic Stairway.', address: 'Copán', priceRange: 'MID', rating: 4.8, tags: ['maya','unesco','stelae','archaeology'] },
  ],
  'la-ceiba': [
    { name: 'Expatriates Bar & Grill', slug: 'expatriates-bar-la-ceiba', category: 'NIGHTLIFE', description: 'A breezy hilltop bar-grill — cold beer, burgers, and the social meeting point before Cayos Cochinos and rafting trips.', address: 'La Ceiba', priceRange: 'MID', rating: 4.3, tags: ['bar','grill','social','gateway'] },
    { name: 'Banana Republic Guesthouse', slug: 'banana-republic-la-ceiba', category: 'ACCOMMODATION', description: 'A backpacker guesthouse in the centre of La Ceiba — a practical base for the Pico Bonito park and ferries to the Bay Islands.', address: 'La Ceiba', priceRange: 'BUDGET', rating: 4.2, tags: ['guesthouse','central','base','backpacker'] },
    { name: 'Pico Bonito National Park', slug: 'pico-bonito-national-park', category: 'NATURE', description: 'A wall of rainforest-clad mountains behind La Ceiba — waterfalls, river tubing, white-water rafting, and rich birdlife.', address: 'near La Ceiba', priceRange: 'MID', rating: 4.6, tags: ['national-park','rainforest','rafting','waterfalls'] },
  ],
  'roatan': [
    { name: 'Ginger\'s Caribbean Grill', slug: 'gingers-caribbean-grill-roatan', category: 'FOOD', description: 'A beachfront West End favourite — jerk chicken, fresh fish, and rum punch with your feet in the Caribbean sand.', address: 'West End, Roatán', priceRange: 'MID', rating: 4.5, tags: ['caribbean','beachfront','seafood','relaxed'] },
    { name: 'Roatán Backpackers', slug: 'roatan-backpackers', category: 'ACCOMMODATION', description: 'A sociable hostel near West End\'s dive shops and beaches — the budget base for the cheapest scuba certification in the world.', address: 'West End, Roatán', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','diving','beach','social'] },
    { name: 'West Bay Beach', slug: 'west-bay-beach-roatan', category: 'NATURE', description: 'A postcard stretch of white sand and palms with a coral reef just offshore — snorkel straight from the beach over vivid coral.', address: 'West Bay, Roatán', priceRange: 'FREE', rating: 4.7, tags: ['beach','snorkeling','reef','white-sand'] },
  ],
  'tegucigalpa': [
    { name: 'Café Paradiso', slug: 'cafe-paradiso-tegucigalpa', category: 'CAFE', description: 'A cultural café-bookshop in the old centre — Honduran coffee, art exhibitions, and the intellectual heart of the capital.', address: 'Centro, Tegucigalpa', priceRange: 'BUDGET', rating: 4.3, tags: ['cafe','bookshop','culture','central'] },
    { name: 'Casa Quinchon Hostel', slug: 'casa-quinchon-hostel', category: 'ACCOMMODATION', description: 'A friendly guesthouse in a safer residential district — a comfortable, helpful base for transiting the Honduran capital.', address: 'Tegucigalpa', priceRange: 'BUDGET', rating: 4.2, tags: ['guesthouse','safe','friendly','base'] },
    { name: 'Basílica de Suyapa', slug: 'basilica-de-suyapa', category: 'CULTURE', description: 'The grand basilica housing the tiny Virgin of Suyapa, patron saint of Honduras — the country\'s most important pilgrimage site.', address: 'Suyapa, Tegucigalpa', priceRange: 'FREE', rating: 4.4, tags: ['basilica','pilgrimage','patron-saint','architecture'] },
  ],
  'utila': [
    { name: 'RJ\'s BBQ', slug: 'rjs-bbq-utila', category: 'FOOD', description: 'A Utila institution — smoky grilled fish and ribs served on long tables a few nights a week, the island\'s social dinner.', address: 'Utila', priceRange: 'MID', rating: 4.5, tags: ['bbq','seafood','island','social'] },
    { name: 'Utila Dive Centre Lodge', slug: 'utila-dive-centre-lodge', category: 'ACCOMMODATION', description: 'A dive-shop lodge on the water — affordable rooms and the famous whale-shark diving that draws backpackers worldwide.', address: 'Utila', priceRange: 'BUDGET', rating: 4.4, tags: ['dive-lodge','whale-sharks','waterfront','backpacker'] },
    { name: 'Bando Beach', slug: 'bando-beach-utila', category: 'NATURE', description: 'A laid-back beach club on the little Caribbean island — swimming, snorkelling, and sunset drinks over the reef.', address: 'Utila', priceRange: 'BUDGET', rating: 4.2, tags: ['beach','snorkeling','sunset','relaxed'] },
  ],
  'guadalajara': [
    { name: 'Café de la Flor', slug: 'cafe-de-la-flor-guadalajara', category: 'CAFE', description: 'A buzzing café in the hip Colonia Americana — specialty coffee and brunch in one of the world\'s coolest neighbourhoods.', address: 'Colonia Americana, Guadalajara', priceRange: 'MID', rating: 4.5, tags: ['specialty-coffee','brunch','hip','americana'] },
    { name: 'Hostel Hospedarte Centro', slug: 'hospedarte-centro-guadalajara', category: 'ACCOMMODATION', description: 'A colourful, social hostel near the historic centre — frequent events and a great base for tequila country and lucha libre.', address: 'Centro, Guadalajara', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','social','central','colourful'] },
    { name: 'Mercado San Juan de Dios', slug: 'mercado-san-juan-de-dios', category: 'FOOD', description: 'Latin America\'s largest indoor market — tortas ahogadas, birria, and the vast culinary world of Jalisco under one roof.', address: 'Guadalajara', priceRange: 'BUDGET', rating: 4.4, tags: ['market','birria','tortas-ahogadas','jalisco'] },
  ],
  'puerto-escondido': [
    { name: 'Almoraduz', slug: 'almoraduz-puerto-escondido', category: 'FOOD', description: 'A standout farm-to-table restaurant — inventive Oaxacan coastal cuisine that punches well above this surf town\'s weight.', address: 'Puerto Escondido', priceRange: 'MID', rating: 4.6, tags: ['farm-to-table','oaxacan','seafood','inventive'] },
    { name: 'Selina Puerto Escondido', slug: 'selina-puerto-escondido', category: 'ACCOMMODATION', description: 'A beachfront hostel with a pool and coworking at Zicatela — the social, nomad-friendly base in the surf capital.', address: 'Zicatela, Puerto Escondido', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','beachfront','coworking','surf'] },
    { name: 'Playa Zicatela', slug: 'playa-zicatela', category: 'NATURE', description: 'The "Mexican Pipeline" — a world-class, heavy beach break for expert surfers and a spectacular spot to watch the waves.', address: 'Puerto Escondido', priceRange: 'FREE', rating: 4.6, tags: ['beach','surf','pipeline','iconic'] },
  ],
  'san-cristobal-de-las-casas': [
    { name: 'Frontera Artisan Coffee', slug: 'frontera-artisan-coffee-sancris', category: 'CAFE', description: 'A specialty café roasting Chiapas highland beans — the best coffee in a region that grows some of Mexico\'s finest.', address: 'San Cristóbal de las Casas', priceRange: 'BUDGET', rating: 4.6, tags: ['specialty-coffee','chiapas','roastery','highland'] },
    { name: 'Rossco Backpackers', slug: 'rossco-backpackers-sancris', category: 'ACCOMMODATION', description: 'A relaxed garden hostel a few blocks from the centre — bonfires, a social vibe, and a base for the Chiapas highlands.', address: 'San Cristóbal de las Casas', priceRange: 'BUDGET', rating: 4.5, tags: ['hostel','garden','social','highlands'] },
    { name: 'Templo de Santo Domingo', slug: 'templo-de-santo-domingo-sancris', category: 'CULTURE', description: 'A spectacular pink baroque church with a Maya textile market sprawled across its steps — the soul of San Cristóbal.', address: 'San Cristóbal de las Casas', priceRange: 'FREE', rating: 4.7, tags: ['church','baroque','textiles','maya'] },
  ],
  'tulum': [
    { name: 'Hartwood', slug: 'hartwood-tulum', category: 'FOOD', description: 'Tulum\'s legendary open-air, wood-fired jungle restaurant — seasonal Yucatán ingredients and a cult international following.', address: 'Carretera Tulum-Boca Paila, Tulum', priceRange: 'HIGH', rating: 4.5, tags: ['wood-fired','jungle','yucatan','iconic'] },
    { name: 'Mama\'s Home Hostel', slug: 'mamas-home-hostel-tulum', category: 'ACCOMMODATION', description: 'A friendly, colourful hostel in Tulum town — affordable and social in a destination that\'s otherwise gone upscale.', address: 'Tulum Pueblo', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','social','colourful','budget'] },
    { name: 'Tulum Mayan Ruins', slug: 'tulum-mayan-ruins', category: 'CULTURE', description: 'The only Maya city built on the coast — clifftop temples above a turquoise Caribbean beach, the most scenic ruins in Mexico.', address: 'Tulum', priceRange: 'MID', rating: 4.6, tags: ['maya','ruins','cliff','caribbean'] },
  ],
};

const EXPERIENCES = {
  'san-salvador': [
    { name: 'Ruta de las Flores Day Trip', slug: 'san-salvador-ruta-de-las-flores', category: 'OUTDOOR_ADVENTURE', description: 'A day along the flower route\'s colonial coffee towns — murals, waterfalls, food fairs, and the highlands of western El Salvador.', price: 50, duration: 'Full day', groupSizeMax: 12 },
    { name: 'San Salvador City & Volcano Tour', slug: 'san-salvador-city-volcano', category: 'ARTS_CULTURE', description: 'The historic centre, the Romero memorial sites, and a drive up El Boquerón volcano overlooking the capital.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Pupusa Cooking Class', slug: 'san-salvador-pupusa-class', category: 'FOOD_DRINK', description: 'Learn to make El Salvador\'s national dish — handmade pupusas with curtido and salsa — in a hands-on local kitchen.', price: 35, duration: '3 hours', groupSizeMax: 8 },
  ],
  'el-tunco': [
    { name: 'El Tunco Surf Lesson', slug: 'el-tunco-surf-lesson', category: 'FITNESS_SPORTS', description: 'Learn to surf El Salvador\'s famous point breaks with a local instructor — warm water and consistent waves for all levels.', price: 35, duration: '2 hours', groupSizeMax: 6 },
    { name: 'Los Cóbanos Reef Snorkel Trip', slug: 'el-tunco-los-cobanos-snorkel', category: 'OUTDOOR_ADVENTURE', description: 'Boat out to Los Cóbanos, Central America\'s largest rocky reef on the Pacific, for snorkelling among colourful fish.', price: 45, duration: 'Half day', groupSizeMax: 10 },
    { name: 'El Tunco Sunset & Beach Bar Night', slug: 'el-tunco-sunset-night', category: 'NIGHTLIFE_SOCIAL', description: 'Catch the famous El Tunco sunset over La Bocana then join the lively beach-bar scene with a local guide.', price: 25, duration: 'Evening', groupSizeMax: 12 },
  ],
  'el-zonte': [
    { name: 'Bitcoin Beach Walking Tour', slug: 'el-zonte-bitcoin-tour', category: 'ARTS_CULTURE', description: 'Discover the story of "Bitcoin Beach," where a grassroots crypto economy began, meeting the locals behind the experiment.', price: 25, duration: '2 hours', groupSizeMax: 10 },
    { name: 'El Zonte Beginner Surf Lesson', slug: 'el-zonte-surf-lesson', category: 'FITNESS_SPORTS', description: 'A relaxed surf lesson at El Zonte\'s mellow point — a quieter, more local alternative to El Tunco for first-timers.', price: 30, duration: '2 hours', groupSizeMax: 6 },
    { name: 'Tide Pools & Coastal Sunset Walk', slug: 'el-zonte-tide-pools', category: 'OUTDOOR_ADVENTURE', description: 'Explore the rocky tide pools at low tide and watch the sunset over the Pacific on El Zonte\'s wild black-sand beach.', price: 20, duration: 'Evening', groupSizeMax: 10 },
  ],
  'santa-ana': [
    { name: 'Santa Ana Volcano Summit Hike', slug: 'santa-ana-volcano-hike', category: 'OUTDOOR_ADVENTURE', description: 'Climb El Salvador\'s highest volcano to peer into its steaming, turquoise crater lake — the country\'s best day hike.', price: 30, duration: 'Half day', groupSizeMax: 12, difficulty: 'moderate' },
    { name: 'Lake Coatepeque Day Trip', slug: 'santa-ana-coatepeque', category: 'OUTDOOR_ADVENTURE', description: 'Relax at the stunning volcanic crater lake of Coatepeque — swimming, kayaking, and lakeside lunch near Santa Ana.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Tazumal Maya Ruins & Santa Ana City', slug: 'santa-ana-tazumal', category: 'ARTS_CULTURE', description: 'Visit the Tazumal pyramid, El Salvador\'s most important Maya site, and tour Santa Ana\'s elegant colonial centre.', price: 40, duration: 'Full day', groupSizeMax: 12 },
  ],
  'suchitoto': [
    { name: 'Lake Suchitlán Boat & Bird Tour', slug: 'suchitoto-lake-boat', category: 'OUTDOOR_ADVENTURE', description: 'A boat trip on Lake Suchitlán among islands and migratory birds, including seasonal flocks of falcons and herons.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Suchitoto Colonial Town & Indigo Workshop', slug: 'suchitoto-indigo-workshop', category: 'ARTS_CULTURE', description: 'Walk the cobbled colonial town and try traditional añil (indigo) dyeing, the craft that once made this region wealthy.', price: 35, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Los Tercios Waterfall Hike', slug: 'suchitoto-los-tercios', category: 'OUTDOOR_ADVENTURE', description: 'A short hike to the unusual Los Tercios waterfall, which tumbles over striking hexagonal basalt columns near Suchitoto.', price: 20, duration: '2 hours', groupSizeMax: 10 },
  ],
  'flores': [
    { name: 'Tikal Sunrise Tour', slug: 'flores-tikal-sunrise', category: 'ARTS_CULTURE', description: 'Reach the great Maya city of Tikal at dawn — climb a temple above the jungle canopy as howler monkeys roar and the mist lifts.', price: 70, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Yaxhá Ruins & Sunset Tour', slug: 'flores-yaxha-sunset', category: 'ARTS_CULTURE', description: 'Visit the quieter Yaxhá ruins and climb a temple for a spectacular jungle sunset over the lakes — a Survivor filming location.', price: 60, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Lake Petén Itzá Kayak & Swim', slug: 'flores-lake-kayak', category: 'OUTDOOR_ADVENTURE', description: 'Paddle the calm waters around Flores island and swim in Lake Petén Itzá, with a stop at the Jorge Cocom viewpoint.', price: 30, duration: 'Half day', groupSizeMax: 10 },
  ],
  'panajachel': [
    { name: 'Lake Atitlán Village Boat Tour', slug: 'panajachel-atitlan-villages', category: 'OUTDOOR_ADVENTURE', description: 'Boat-hop the Maya villages of Lake Atitlán — San Juan\'s textiles, San Pedro\'s cafés, and Santiago\'s Maximón shrine.', price: 40, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Indian Nose Sunrise Hike', slug: 'panajachel-indian-nose', category: 'OUTDOOR_ADVENTURE', description: 'A pre-dawn climb to the Indian Nose ridge for a breathtaking sunrise over Lake Atitlán and its ring of volcanoes.', price: 30, duration: 'Half day', groupSizeMax: 10, difficulty: 'moderate' },
    { name: 'San Juan Maya Weaving & Coffee Tour', slug: 'panajachel-san-juan-weaving', category: 'ARTS_CULTURE', description: 'Visit a women\'s weaving cooperative in San Juan La Laguna to see natural-dye backstrap weaving, plus a local coffee tour.', price: 35, duration: 'Half day', groupSizeMax: 10 },
  ],
  'quetzaltenango': [
    { name: 'Xela to Lake Atitlán 3-Day Trek', slug: 'xela-atitlan-trek', category: 'OUTDOOR_ADVENTURE', description: 'The classic highland trek through Maya villages and farmland, descending to a sunrise arrival over Lake Atitlán.', price: 200, duration: '3 days', groupSizeMax: 10, difficulty: 'challenging' },
    { name: 'Santa María Volcano & Santiaguito Lookout', slug: 'xela-santa-maria-volcano', category: 'OUTDOOR_ADVENTURE', description: 'Summit Santa María at dawn to watch the active Santiaguito volcano erupting below you — an unforgettable highland hike.', price: 35, duration: 'Full day', groupSizeMax: 10, difficulty: 'challenging' },
    { name: 'Fuentes Georginas Hot Springs Trip', slug: 'xela-fuentes-georginas', category: 'WELLNESS_MINDFULNESS', description: 'Soak in the steaming volcanic hot springs of Fuentes Georginas, set in a misty cloud-forest gorge above Xela.', price: 30, duration: 'Half day', groupSizeMax: 12 },
  ],
  'semuc-champey': [
    { name: 'Semuc Champey Pools & K\'anba Caves', slug: 'semuc-pools-caves', category: 'OUTDOOR_ADVENTURE', description: 'Swim the turquoise limestone pools and explore the candlelit K\'anba river caves — Guatemala\'s ultimate adventure day.', price: 45, duration: 'Full day', groupSizeMax: 12, difficulty: 'moderate' },
    { name: 'Cahabón River Tubing', slug: 'semuc-river-tubing', category: 'OUTDOOR_ADVENTURE', description: 'Float the jungle-lined Cahabón River on an inner tube — a cool, scenic, and wonderfully lazy Semuc Champey activity.', price: 20, duration: '2 hours', groupSizeMax: 12 },
    { name: 'El Mirador Viewpoint Hike', slug: 'semuc-mirador-hike', category: 'OUTDOOR_ADVENTURE', description: 'A steep jungle climb to the lookout high above Semuc Champey for the iconic view down over the turquoise pools.', price: 15, duration: '2 hours', groupSizeMax: 12, difficulty: 'moderate' },
  ],
  'copan-ruinas': [
    { name: 'Copán Ruins Guided Archaeology Tour', slug: 'copan-ruins-tour', category: 'ARTS_CULTURE', description: 'Explore the "Athens of the Maya" with an expert guide — the Hieroglyphic Stairway, carved stelae, and the ball court.', price: 45, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Macaw Mountain Bird Park & Coffee Tour', slug: 'copan-macaw-coffee', category: 'OUTDOOR_ADVENTURE', description: 'Meet rescued scarlet macaws at Macaw Mountain, then tour a Copán coffee finca with tastings in the highland forest.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Luna Jaguar Hot Springs Evening', slug: 'copan-luna-jaguar', category: 'WELLNESS_MINDFULNESS', description: 'Soak in the Luna Jaguar thermal springs, a series of jungle pools and Maya-themed grottos in the hills near Copán.', price: 35, duration: 'Half day', groupSizeMax: 12 },
  ],
  'la-ceiba': [
    { name: 'Cayos Cochinos Snorkel Day Trip', slug: 'la-ceiba-cayos-cochinos', category: 'OUTDOOR_ADVENTURE', description: 'Boat to the pristine Cayos Cochinos marine reserve for snorkelling over coral and a Garífuna island lunch.', price: 70, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Pico Bonito Rafting & Jungle Day', slug: 'la-ceiba-pico-bonito-rafting', category: 'OUTDOOR_ADVENTURE', description: 'White-water raft the Cangrejal River through the rainforest of Pico Bonito, with jungle hikes and natural pools.', price: 65, duration: 'Full day', groupSizeMax: 10, difficulty: 'moderate' },
    { name: 'Garífuna Culture & Sambo Creek Tour', slug: 'la-ceiba-garifuna-tour', category: 'ARTS_CULTURE', description: 'Visit a Garífuna community at Sambo Creek for drumming, dancing, cassava bread, and the Afro-Caribbean culture of the coast.', price: 35, duration: 'Half day', groupSizeMax: 12 },
  ],
  'roatan': [
    { name: 'Roatán Scuba Diving Certification', slug: 'roatan-scuba-certification', category: 'OUTDOOR_ADVENTURE', description: 'Get PADI-certified on the Mesoamerican Reef — Roatán offers some of the cheapest, most beautiful learn-to-dive waters on Earth.', price: 300, duration: '3 days', groupSizeMax: 6, difficulty: 'moderate' },
    { name: 'West Bay Reef Snorkel Tour', slug: 'roatan-west-bay-snorkel', category: 'OUTDOOR_ADVENTURE', description: 'Snorkel the vibrant coral wall right off West Bay Beach — turtles, rays, and tropical fish on the world\'s second-largest reef.', price: 35, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Roatán Island & Sloth Sanctuary Tour', slug: 'roatan-island-sloth-tour', category: 'OUTDOOR_ADVENTURE', description: 'Tour the island\'s viewpoints and beaches with a stop at the sloth and monkey sanctuary in the lush interior.', price: 50, duration: 'Half day', groupSizeMax: 12 },
  ],
  'tegucigalpa': [
    { name: 'Tegucigalpa Old Town & Picacho Tour', slug: 'tegucigalpa-city-tour', category: 'ARTS_CULTURE', description: 'Explore the colonial centre, the cathedral, and El Picacho lookout with its Christ statue overlooking the Honduran capital.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Valle de Ángeles Craft Village Trip', slug: 'tegucigalpa-valle-de-angeles', category: 'ARTS_CULTURE', description: 'A day trip to the charming colonial craft town of Valle de Ángeles in the pine-clad hills above Tegucigalpa.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'La Tigra Cloud Forest Hike', slug: 'tegucigalpa-la-tigra-hike', category: 'OUTDOOR_ADVENTURE', description: 'Hike the trails of La Tigra National Park, a cloud-forest reserve of waterfalls and quetzals just outside the capital.', price: 40, duration: 'Full day', groupSizeMax: 12, difficulty: 'moderate' },
  ],
  'utila': [
    { name: 'Whale Shark Snorkel Expedition', slug: 'utila-whale-shark', category: 'OUTDOOR_ADVENTURE', description: 'Head offshore in search of whale sharks, which feed year-round off Utila — a chance to snorkel beside the ocean\'s gentle giants.', price: 80, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Utila Fun Dive Two-Tank Trip', slug: 'utila-fun-dive', category: 'OUTDOOR_ADVENTURE', description: 'A two-tank dive on Utila\'s reefs, walls, and seamounts — affordable diving on the Mesoamerican Reef for certified divers.', price: 60, duration: 'Half day', groupSizeMax: 8, difficulty: 'moderate' },
    { name: 'Utila Island Sunset Sail', slug: 'utila-sunset-sail', category: 'NIGHTLIFE_SOCIAL', description: 'A laid-back sunset sail off the little Caribbean island with drinks, swimming, and the famously social Utila crowd.', price: 35, duration: 'Evening', groupSizeMax: 14 },
  ],
  'guadalajara': [
    { name: 'Tequila Town & Agave Fields Day Trip', slug: 'guadalajara-tequila-tour', category: 'FOOD_DRINK', description: 'A day in the UNESCO agave landscape of Tequila — a distillery tour, tastings, and the blue-agave fields of Jalisco.', price: 60, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Guadalajara Historic Centre & Mural Tour', slug: 'guadalajara-mural-tour', category: 'ARTS_CULTURE', description: 'Tour the colonial heart, the cathedral, and the astonishing Orozco murals at the Hospicio Cabañas with a local guide.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Tlaquepaque Art, Mariachi & Cantina Night', slug: 'guadalajara-tlaquepaque-night', category: 'NIGHTLIFE_SOCIAL', description: 'Explore the artisan district of Tlaquepaque, the birthplace of mariachi, with crafts, cantinas, and live music.', price: 35, duration: 'Evening', groupSizeMax: 12 },
  ],
  'puerto-escondido': [
    { name: 'Bioluminescence Lagoon Night Tour', slug: 'puerto-escondido-bioluminescence', category: 'OUTDOOR_ADVENTURE', description: 'A night boat trip to Manialtepec Lagoon where the water glows electric blue with bioluminescent plankton — magical and rare.', price: 40, duration: 'Evening', groupSizeMax: 12 },
    { name: 'Puerto Escondido Surf Lesson', slug: 'puerto-escondido-surf-lesson', category: 'FITNESS_SPORTS', description: 'Learn to surf at beginner-friendly La Punta, away from Zicatela\'s heavy break, with a local instructor in the surf capital.', price: 35, duration: '2 hours', groupSizeMax: 6 },
    { name: 'Turtle Release & Coastal Lagoon Tour', slug: 'puerto-escondido-turtle-release', category: 'OUTDOOR_ADVENTURE', description: 'Help release baby sea turtles (in season) and explore the mangrove lagoons and wildlife of the Oaxacan coast.', price: 45, duration: 'Half day', groupSizeMax: 12 },
  ],
  'san-cristobal-de-las-casas': [
    { name: 'Sumidero Canyon Boat Tour', slug: 'sancris-sumidero-canyon', category: 'OUTDOOR_ADVENTURE', description: 'A boat trip through the towering 1,000m walls of Sumidero Canyon — crocodiles, monkeys, and waterfalls on the Grijalva River.', price: 45, duration: 'Full day', groupSizeMax: 14 },
    { name: 'Maya Villages of Chamula & Zinacantán', slug: 'sancris-chamula-zinacantan', category: 'ARTS_CULTURE', description: 'Visit the Tzotzil Maya highland villages — the extraordinary syncretic church of San Juan Chamula and Zinacantán\'s weavers.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'El Chiflón Waterfalls & Montebello Lakes', slug: 'sancris-chiflon-montebello', category: 'OUTDOOR_ADVENTURE', description: 'A day trip to the thundering turquoise cascades of El Chiflón and the multicoloured Lagunas de Montebello.', price: 50, duration: 'Full day', groupSizeMax: 12 },
  ],
  'tulum': [
    { name: 'Tulum Ruins & Cenote Snorkel Tour', slug: 'tulum-ruins-cenote', category: 'OUTDOOR_ADVENTURE', description: 'Visit the clifftop Maya ruins above the Caribbean, then snorkel a crystal-clear jungle cenote — Tulum\'s perfect combination.', price: 60, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Sian Ka\'an Biosphere Reserve Tour', slug: 'tulum-sian-kaan', category: 'OUTDOOR_ADVENTURE', description: 'Float the ancient Maya canals and spot dolphins, turtles, and birds in the UNESCO Sian Ka\'an wetlands south of Tulum.', price: 90, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Cenote Diving Discovery', slug: 'tulum-cenote-diving', category: 'OUTDOOR_ADVENTURE', description: 'Dive the otherworldly cenotes around Tulum — crystal freshwater caverns of light beams and stalactites on the Riviera Maya.', price: 120, duration: 'Half day', groupSizeMax: 6, difficulty: 'moderate' },
  ],
};

seed({ SPOTS, EXPERIENCES }).catch((e) => { console.error(e.message); process.exit(1); });
