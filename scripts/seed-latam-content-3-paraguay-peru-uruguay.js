// Batch 3 — Paraguay (Asunción, Encarnación, Areguá, San Bernardino, Concepción),
// Peru (Arequipa, Huaraz, Iquitos), Uruguay (Montevideo, Colonia del Sacramento,
// Punta del Este, Paysandú, Cabo Polonio).
const { seed } = require('./_latam-seed-helper');

const SPOTS = {
  'asuncion': [
    { name: 'Café Literario', slug: 'cafe-literario-asuncion', category: 'CAFE', description: 'A beloved bookshop-café in central Asunción — strong coffee, tereré culture, and a cultured crowd of writers and students.', address: 'Mariscal Estigarribia 456, Asunción', priceRange: 'BUDGET', rating: 4.5, tags: ['coffee','bookshop','central','cultural'] },
    { name: 'Black Cat Hostel', slug: 'black-cat-hostel-asuncion', category: 'ACCOMMODATION', description: 'The backpacker hub of Asunción — a sociable, central hostel with a courtyard and helpful staff in a city few travellers expect to enjoy.', address: 'Eligio Ayala 129, Asunción', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','social','central','courtyard'] },
    { name: 'Palacio de los López', slug: 'palacio-de-los-lopez', category: 'CULTURE', description: 'Paraguay\'s grand presidential palace, floodlit and glowing over the riverfront at night — the iconic image of Asunción.', address: 'El Paraguayo Independiente, Asunción', priceRange: 'FREE', rating: 4.4, tags: ['palace','riverfront','iconic','architecture'] },
  ],
  'encarnacion': [
    { name: 'Cafetería del Sur', slug: 'cafeteria-del-sur-encarnacion', category: 'CAFE', description: 'A bright riverside café on the costanera — coffee, tereré, and a sunny terrace facing the beach in Paraguay\'s most relaxed city.', address: 'Costanera, Encarnación', priceRange: 'BUDGET', rating: 4.3, tags: ['coffee','costanera','riverside','relaxed'] },
    { name: 'Hotel de la Costa', slug: 'hotel-de-la-costa-encarnacion', category: 'ACCOMMODATION', description: 'A comfortable base near the beach and costanera — close to the Carnaval action and the ruins of Trinidad day trips.', address: 'Av. Costanera, Encarnación', priceRange: 'BUDGET', rating: 4.2, tags: ['hotel','beach','costanera','central'] },
    { name: 'Playa San José', slug: 'playa-san-jose-encarnacion', category: 'NATURE', description: 'The river beach that earned Encarnación the nickname "Pearl of the South" — golden sand, calm water, and a buzzing summer scene.', address: 'Costanera, Encarnación', priceRange: 'FREE', rating: 4.3, tags: ['beach','river','summer','relaxed'] },
  ],
  'aregua': [
    { name: 'La Cocina de Areguá', slug: 'la-cocina-de-aregua', category: 'FOOD', description: 'A charming restaurant in Paraguay\'s ceramic and strawberry town — regional dishes served in a leafy garden near Lake Ypacaraí.', address: 'Centro, Areguá', priceRange: 'MID', rating: 4.4, tags: ['restaurant','garden','regional','lakeside'] },
    { name: 'Posada Ñe\'ery', slug: 'posada-neery-aregua', category: 'ACCOMMODATION', description: 'A tranquil guesthouse in the artists\' town of Areguá — cobbled streets, ceramic workshops, and easy access to the lake.', address: 'Areguá', priceRange: 'BUDGET', rating: 4.3, tags: ['guesthouse','artsy','quiet','lakeside'] },
    { name: 'Calle de los Ceramistas', slug: 'calle-de-los-ceramistas', category: 'CULTURE', description: 'The ceramics street where Areguá\'s artisans sell hand-thrown pottery — a colourful stroll in Paraguay\'s craft capital.', address: 'Areguá', priceRange: 'FREE', rating: 4.2, tags: ['ceramics','crafts','artisan','strolling'] },
  ],
  'san-bernardino': [
    { name: 'Cervecería Sajonia Lakeside', slug: 'cerveceria-sajonia-sanber', category: 'NIGHTLIFE', description: 'A craft-beer garden on Lake Ypacaraí — Paraguay\'s summer party town comes alive here with live music and lakeside sunsets.', address: 'San Bernardino', priceRange: 'MID', rating: 4.3, tags: ['craft-beer','lakeside','live-music','summer'] },
    { name: 'Hotel del Lago', slug: 'hotel-del-lago-sanber', category: 'ACCOMMODATION', description: 'A historic 19th-century lakeside hotel — faded grandeur, wide verandas, and the genteel heart of San Bernardino.', address: 'San Bernardino', priceRange: 'MID', rating: 4.2, tags: ['hotel','historic','lakeside','veranda'] },
    { name: 'Lago Ypacaraí Shore', slug: 'lago-ypacarai-shore', category: 'NATURE', description: 'The legendary lake immortalised in Paraguayan song — beaches, watersports, and the country\'s favourite summer escape from Asunción.', address: 'San Bernardino', priceRange: 'FREE', rating: 4.0, tags: ['lake','beach','watersports','summer'] },
  ],
  'concepcion-paraguay': [
    { name: 'Mercado Municipal Concepción', slug: 'mercado-concepcion', category: 'FOOD', description: 'The bustling market of northern Paraguay\'s river port — chipa, tropical fruit, and authentic local life far off the tourist trail.', address: 'Centro, Concepción', priceRange: 'BUDGET', rating: 4.1, tags: ['market','local','chipa','authentic'] },
    { name: 'Hotel Francés', slug: 'hotel-frances-concepcion', category: 'ACCOMMODATION', description: 'A simple, welcoming base in the "Pearl of the North" — the launch point for slow boat journeys up the Río Paraguay.', address: 'Concepción', priceRange: 'BUDGET', rating: 4.0, tags: ['hotel','riverport','base','simple'] },
    { name: 'Puerto de Concepción', slug: 'puerto-de-concepcion', category: 'NATURE', description: 'The historic river port where cargo boats still ply the Río Paraguay toward the Pantanal — a window on a vanishing way of life.', address: 'Río Paraguay, Concepción', priceRange: 'FREE', rating: 4.1, tags: ['river','port','pantanal','authentic'] },
  ],
  'arequipa': [
    { name: 'Crepisimo', slug: 'crepisimo-arequipa', category: 'CAFE', description: 'A long-running favourite inside the Alliance Française — sweet and savoury crepes, great coffee, and a literary, courtyard setting.', address: 'Santa Catalina 208, Arequipa', priceRange: 'MID', rating: 4.5, tags: ['cafe','crepes','courtyard','central'] },
    { name: 'Wild Rover Arequipa', slug: 'wild-rover-arequipa', category: 'ACCOMMODATION', description: 'A lively party hostel in a colonial building with a rooftop bar and views of El Misti volcano — the social heart of backpacker Arequipa.', address: 'Ugarte 111, Arequipa', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','party','rooftop','colonial'] },
    { name: 'Monasterio de Santa Catalina', slug: 'monasterio-santa-catalina', category: 'CULTURE', description: 'A vast 16th-century convent like a city within the city — cobalt and ochre passageways, a serene and beautiful Arequipa highlight.', address: 'Santa Catalina 301, Arequipa', priceRange: 'MID', rating: 4.8, tags: ['convent','colonial','architecture','iconic'] },
  ],
  'huaraz': [
    { name: 'Café Andino', slug: 'cafe-andino-huaraz', category: 'CAFE', description: 'A top-floor traveller café with mountain views, a fireplace, and a vast book exchange — the planning hub for Cordillera Blanca treks.', address: 'Lúcar y Torre 530, Huaraz', priceRange: 'BUDGET', rating: 4.6, tags: ['cafe','views','trekking-hub','cosy'] },
    { name: 'Selina Huaraz', slug: 'selina-huaraz', category: 'ACCOMMODATION', description: 'A social hostel with coworking and a bar — a comfortable base to acclimatise before tackling Laguna 69 and the Santa Cruz trek.', address: 'Av. Centenario, Huaraz', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','coworking','social','trekking-base'] },
    { name: 'Mirador de Rataquenua', slug: 'mirador-rataquenua', category: 'NATURE', description: 'A hillside lookout above Huaraz with sweeping views of the snow-capped Cordillera Blanca — a perfect acclimatisation walk.', address: 'Huaraz', priceRange: 'FREE', rating: 4.2, tags: ['viewpoint','cordillera-blanca','acclimatisation','hike'] },
  ],
  'iquitos': [
    { name: 'Dawn on the Amazon Café', slug: 'dawn-amazon-cafe-iquitos', category: 'FOOD', description: 'A riverside café serving safe, fresh Amazonian food — a reliable traveller favourite on the Iquitos boulevard overlooking the river.', address: 'Malecón Maldonado, Iquitos', priceRange: 'MID', rating: 4.5, tags: ['cafe','amazonian','riverside','traveller'] },
    { name: 'La Casa Fitzcarraldo', slug: 'casa-fitzcarraldo-iquitos', category: 'ACCOMMODATION', description: 'A garden guesthouse steeped in film history with a pool and treehouse — an oasis and a base for jungle-lodge expeditions.', address: 'Av. La Marina, Iquitos', priceRange: 'MID', rating: 4.5, tags: ['guesthouse','garden','pool','jungle-base'] },
    { name: 'Belén Market & Floating Village', slug: 'belen-market-iquitos', category: 'CULTURE', description: 'The raucous, sprawling Belén market and its stilted floating neighbourhood — jungle medicines, exotic produce, and raw Amazonian life.', address: 'Belén, Iquitos', priceRange: 'FREE', rating: 4.3, tags: ['market','floating-village','amazon','authentic'] },
  ],
  'montevideo': [
    { name: 'Café Brasilero', slug: 'cafe-brasilero-montevideo', category: 'CAFE', description: 'Montevideo\'s oldest café (1877) in the Ciudad Vieja — dark wood, marble tables, and the literary haunt of Eduardo Galeano.', address: 'Ituzaingó 1447, Montevideo', priceRange: 'MID', rating: 4.5, tags: ['historic','coffee','ciudad-vieja','literary'] },
    { name: 'Splendido Hostel', slug: 'splendido-hostel-montevideo', category: 'ACCOMMODATION', description: 'A stylish hostel in a restored Ciudad Vieja building — central for the port market, the rambla, and the city\'s tango bars.', address: 'Bartolomé Mitre 1314, Montevideo', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','ciudad-vieja','stylish','central'] },
    { name: 'Mercado del Puerto', slug: 'mercado-del-puerto-montevideo', category: 'FOOD', description: 'The cathedral of Uruguayan asado — a wrought-iron market hall of parrilla grills sizzling with steaks, sausages, and provoleta.', address: 'Pérez Castellano, Montevideo', priceRange: 'MID', rating: 4.4, tags: ['asado','market','parrilla','iconic'] },
  ],
  'colonia-del-sacramento': [
    { name: 'Charco Bistró', slug: 'charco-bistro-colonia', category: 'FOOD', description: 'A riverfront bistro in a boutique hotel — refined Uruguayan cooking and Río de la Plata sunset views in the cobbled old town.', address: 'Vasconcellos 337, Colonia', priceRange: 'HIGH', rating: 4.6, tags: ['bistro','riverfront','sunset','boutique'] },
    { name: 'El Viajero Hostel Colonia', slug: 'el-viajero-hostel-colonia', category: 'ACCOMMODATION', description: 'A well-run hostel steps from the historic quarter — a relaxed base to explore Colonia\'s UNESCO streets and ferry over from Buenos Aires.', address: 'Washington Barbot, Colonia', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','old-town','relaxed','central'] },
    { name: 'Barrio Histórico', slug: 'barrio-historico-colonia', category: 'CULTURE', description: 'The UNESCO-listed old quarter founded by the Portuguese — the Street of Sighs, the lighthouse, and antique cars on cobbled lanes.', address: 'Colonia del Sacramento', priceRange: 'FREE', rating: 4.7, tags: ['unesco','cobblestone','portuguese','historic'] },
  ],
  'punta-del-este': [
    { name: 'La Huella', slug: 'la-huella-punta', category: 'FOOD', description: 'A world-famous beach restaurant at José Ignacio — wood-fired fish and a barefoot-chic crowd in South America\'s glitziest resort area.', address: 'José Ignacio, Punta del Este', priceRange: 'HIGH', rating: 4.7, tags: ['beach-restaurant','seafood','chic','jose-ignacio'] },
    { name: 'The Trip Hostel', slug: 'the-trip-hostel-punta', category: 'ACCOMMODATION', description: 'A laid-back, surf-flavoured hostel a short walk from the beach — an affordable foothold in expensive Punta del Este.', address: 'Punta del Este', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','surf','beach','budget'] },
    { name: 'La Mano (Los Dedos)', slug: 'la-mano-punta', category: 'CULTURE', description: 'The giant fingers emerging from the sand at Playa Brava — Punta del Este\'s iconic sculpture and most photographed landmark.', address: 'Playa Brava, Punta del Este', priceRange: 'FREE', rating: 4.3, tags: ['sculpture','beach','iconic','photography'] },
  ],
  'paysandu': [
    { name: 'Parrilla El Mesón', slug: 'parrilla-el-meson-paysandu', category: 'FOOD', description: 'A classic Uruguayan parrilla in the river city of Paysandú — generous grilled meats and a warm, unpretentious local welcome.', address: 'Centro, Paysandú', priceRange: 'MID', rating: 4.3, tags: ['parrilla','asado','local','riverside'] },
    { name: 'Hotel Casagrande', slug: 'hotel-casagrande-paysandu', category: 'ACCOMMODATION', description: 'A comfortable central hotel facing the plaza — a practical base for the Semana de la Cerveza beer festival and riverside walks.', address: 'Plaza Constitución, Paysandú', priceRange: 'BUDGET', rating: 4.1, tags: ['hotel','central','plaza','beer-festival'] },
    { name: 'Costanera del Río Uruguay', slug: 'costanera-paysandu', category: 'NATURE', description: 'The riverfront promenade along the Río Uruguay — thermal-springs day trips nearby and tranquil sunsets over the water.', address: 'Paysandú', priceRange: 'FREE', rating: 4.1, tags: ['riverfront','sunset','thermal-nearby','walk'] },
  ],
  'cabo-polonio': [
    { name: 'Lo de Tato', slug: 'lo-de-tato-cabo-polonio', category: 'FOOD', description: 'A rustic off-grid eatery in the dunes — fresh fish and homemade dishes by candlelight in Uruguay\'s electricity-free bohemian village.', address: 'Cabo Polonio', priceRange: 'MID', rating: 4.4, tags: ['rustic','seafood','off-grid','bohemian'] },
    { name: 'Posada de los Corsarios', slug: 'posada-corsarios-cabo-polonio', category: 'ACCOMMODATION', description: 'A simple solar-powered posada among the dunes — falling asleep to the sea lions and waking to one of the world\'s great starscapes.', address: 'Cabo Polonio', priceRange: 'BUDGET', rating: 4.4, tags: ['posada','off-grid','dunes','stargazing'] },
    { name: 'Cabo Polonio Lighthouse & Sea Lions', slug: 'cabo-polonio-lighthouse', category: 'NATURE', description: 'The lighthouse on the rocky point overlooking one of South America\'s largest sea-lion colonies — wild, remote, and unforgettable.', address: 'Cabo Polonio', priceRange: 'FREE', rating: 4.6, tags: ['lighthouse','sea-lions','wild','remote'] },
  ],
};

const EXPERIENCES = {
  'asuncion': [
    { name: 'Asunción Historic Centre Walking Tour', slug: 'asuncion-historic-walk', category: 'ARTS_CULTURE', description: 'Discover the riverfront capital with a local guide — the Palacio de los López, the Panteón, and the layered history of Paraguay.', price: 25, duration: '3 hours', groupSizeMax: 12 },
    { name: 'Tereré & Paraguayan Food Experience', slug: 'asuncion-terere-food', category: 'FOOD_DRINK', description: 'Share tereré the Paraguayan way and taste chipa, sopa paraguaya, and mbejú — a warm introduction to the country\'s under-known cuisine.', price: 30, duration: '3 hours', groupSizeMax: 10 },
    { name: 'Jesuit Ruins of Trinidad Day Trip', slug: 'asuncion-trinidad-ruins', category: 'ARTS_CULTURE', description: 'A day trip to the UNESCO-listed Jesuit reduction ruins of Trinidad and Jesús — Paraguay\'s most impressive historical site.', price: 60, duration: 'Full day', groupSizeMax: 12 },
  ],
  'encarnacion': [
    { name: 'Trinidad & Jesús Jesuit Ruins Tour', slug: 'encarnacion-jesuit-ruins', category: 'ARTS_CULTURE', description: 'Explore the beautifully preserved UNESCO Jesuit missions just outside Encarnación, including the evening sound-and-light show.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Encarnación Beach & Costanera Day', slug: 'encarnacion-beach-day', category: 'OUTDOOR_ADVENTURE', description: 'Relax on the river beaches of Paraguay\'s "Pearl of the South" and stroll the lively costanera — the country\'s summer playground.', price: 20, duration: 'Half day', groupSizeMax: 14 },
    { name: 'Encarnación Carnaval Night Experience', slug: 'encarnacion-carnaval', category: 'NIGHTLIFE_SOCIAL', description: 'Experience the biggest Carnaval in Paraguay (in season) — feathers, samba-style drumming, and the sambódromo party atmosphere.', price: 35, duration: 'Evening', groupSizeMax: 12 },
  ],
  'aregua': [
    { name: 'Areguá Ceramics Workshop', slug: 'aregua-ceramics-workshop', category: 'ARTS_CULTURE', description: 'Try the potter\'s wheel with a local artisan in Paraguay\'s ceramics capital, and take home your own hand-made piece.', price: 30, duration: '2 hours', groupSizeMax: 8 },
    { name: 'Lake Ypacaraí & Areguá Art Town Tour', slug: 'aregua-lake-art-tour', category: 'ARTS_CULTURE', description: 'Wander the cobbled artists\' town and its lakeside, visiting galleries, the strawberry stalls, and the colonial church.', price: 25, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Cerro Koi Geology Hike', slug: 'aregua-cerro-koi', category: 'OUTDOOR_ADVENTURE', description: 'Hike the rare Cerro Koi, a hill of unusual hexagonal sandstone formations found in only a few places on Earth, with valley views.', price: 20, duration: 'Half day', groupSizeMax: 10 },
  ],
  'san-bernardino': [
    { name: 'Lake Ypacaraí Boat & Swim Day', slug: 'sanber-lake-boat-day', category: 'OUTDOOR_ADVENTURE', description: 'A relaxed boat trip and swim on Lake Ypacaraí from Paraguay\'s favourite summer resort town, with lakeside lunch.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'San Bernardino Craft Beer Evening', slug: 'sanber-craft-beer', category: 'NIGHTLIFE_SOCIAL', description: 'Sample Paraguay\'s growing craft-beer scene at the lakeside breweries that make "San Ber" the country\'s summer nightlife capital.', price: 25, duration: 'Evening', groupSizeMax: 12 },
    { name: 'Lakeside Cycling & Nature Tour', slug: 'sanber-cycling-tour', category: 'FITNESS_SPORTS', description: 'Cycle the leafy lanes and shoreline around Lake Ypacaraí, with stops at viewpoints and historic German-settler villas.', price: 25, duration: 'Half day', groupSizeMax: 10 },
  ],
  'concepcion-paraguay': [
    { name: 'Río Paraguay Slow Boat Journey', slug: 'concepcion-river-boat', category: 'OUTDOOR_ADVENTURE', description: 'Board a working cargo-passenger boat up the Río Paraguay toward the Pantanal — an authentic, unhurried river adventure.', price: 45, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Concepción Colonial Town Walk', slug: 'concepcion-town-walk', category: 'ARTS_CULTURE', description: 'Explore the "Pearl of the North" — its faded mansions, riverport history, and the markets of frontier Paraguay.', price: 18, duration: '2 hours', groupSizeMax: 12 },
    { name: 'Pantanal Gateway Wildlife Trip', slug: 'concepcion-pantanal-gateway', category: 'OUTDOOR_ADVENTURE', description: 'Head toward the Paraguayan Pantanal\'s wetlands — caiman, capybara, and spectacular birdlife in one of the continent\'s wildest regions.', price: 90, duration: 'Full day', groupSizeMax: 8, difficulty: 'moderate' },
  ],
  'arequipa': [
    { name: 'Colca Canyon 2-Day Condor Trek', slug: 'arequipa-colca-canyon-trek', category: 'OUTDOOR_ADVENTURE', description: 'Trek into one of the world\'s deepest canyons — Andean villages, hot springs, an oasis night, and Andean condors soaring at Cruz del Cóndor.', price: 110, duration: '2 days', groupSizeMax: 10, difficulty: 'challenging' },
    { name: 'Arequipa Old Town & Santa Catalina Tour', slug: 'arequipa-old-town-tour', category: 'ARTS_CULTURE', description: 'Explore the White City\'s sillar-stone colonial centre and the vast Santa Catalina monastery with a knowledgeable local guide.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Arequipeña Cooking Class — Rocoto Relleno', slug: 'arequipa-cooking-class', category: 'FOOD_DRINK', description: 'Cook the fiery specialities of Arequipa, Peru\'s gastronomic heart — rocoto relleno and chupe, in a hands-on local kitchen.', price: 45, duration: '3 hours', groupSizeMax: 8 },
  ],
  'huaraz': [
    { name: 'Laguna 69 Full-Day Trek', slug: 'huaraz-laguna-69', category: 'OUTDOOR_ADVENTURE', description: 'The iconic day hike to a dazzling turquoise glacial lake at 4,600m beneath the snow walls of Huascarán — Peru\'s most beautiful day trek.', price: 35, duration: 'Full day', groupSizeMax: 12, difficulty: 'challenging' },
    { name: 'Santa Cruz 4-Day Cordillera Blanca Trek', slug: 'huaraz-santa-cruz-trek', category: 'OUTDOOR_ADVENTURE', description: 'The classic high-Andes trek through the Cordillera Blanca — glacial passes, turquoise lakes, and a wilderness of 6,000m peaks.', price: 250, duration: '4 days', groupSizeMax: 10, difficulty: 'challenging' },
    { name: 'Pastoruri Glacier & Puyas Day Tour', slug: 'huaraz-pastoruri-glacier', category: 'OUTDOOR_ADVENTURE', description: 'A high-altitude day trip to the Pastoruri Glacier and the bizarre giant Puya Raimondi plants of the altiplano.', price: 30, duration: 'Full day', groupSizeMax: 14, difficulty: 'moderate' },
  ],
  'iquitos': [
    { name: '4-Day Amazon Jungle Lodge Expedition', slug: 'iquitos-amazon-4day', category: 'OUTDOOR_ADVENTURE', description: 'Deep into the Peruvian Amazon — pink dolphins, piranha fishing, jungle treks, night caiman spotting, and a local-community visit.', price: 450, duration: '4 days', groupSizeMax: 10, difficulty: 'moderate' },
    { name: 'Pacaya-Samiria Reserve Wildlife Cruise', slug: 'iquitos-pacaya-samiria', category: 'OUTDOOR_ADVENTURE', description: 'Explore the vast Pacaya-Samiria flooded forest reserve by boat — one of the Amazon\'s richest wildlife sanctuaries.', price: 380, duration: '3 days', groupSizeMax: 8, difficulty: 'moderate' },
    { name: 'Belén Market & River Life Tour', slug: 'iquitos-belen-market-tour', category: 'ARTS_CULTURE', description: 'A guided walk through the sprawling Belén market and floating village — jungle medicine, exotic foods, and authentic Amazon city life.', price: 25, duration: 'Half day', groupSizeMax: 12 },
  ],
  'montevideo': [
    { name: 'Montevideo City & Rambla Bike Tour', slug: 'montevideo-bike-tour', category: 'OUTDOOR_ADVENTURE', description: 'Cycle the Ciudad Vieja, port market, and the long coastal rambla — the relaxed rhythm of South America\'s most easygoing capital.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Mercado del Puerto Asado & Wine Tasting', slug: 'montevideo-asado-wine', category: 'FOOD_DRINK', description: 'Feast on Uruguayan parrilla at the iconic Mercado del Puerto, paired with the country\'s signature Tannat red wine.', price: 55, duration: '3 hours', groupSizeMax: 10 },
    { name: 'Candombe & Tango Cultural Night', slug: 'montevideo-candombe-tango', category: 'NIGHTLIFE_SOCIAL', description: 'Experience Uruguay\'s Afro-rooted candombe drumming and the Río de la Plata tango tradition in the city\'s atmospheric barrios.', price: 30, duration: 'Evening', groupSizeMax: 12 },
  ],
  'colonia-del-sacramento': [
    { name: 'Colonia UNESCO Old Town Walking Tour', slug: 'colonia-old-town-walk', category: 'ARTS_CULTURE', description: 'Wander the cobbled Barrio Histórico with a guide — the Portuguese-Spanish history, the lighthouse, and the Street of Sighs.', price: 25, duration: '2 hours', groupSizeMax: 12 },
    { name: 'Vintage Car & Riverside Sunset Tour', slug: 'colonia-vintage-car-sunset', category: 'PHOTOGRAPHY_WALKS', description: 'Tour Colonia\'s photogenic lanes and waterfront, timed for the famous Río de la Plata sunset over the old town rooftops.', price: 35, duration: 'Evening', groupSizeMax: 6 },
    { name: 'Colonia Wine & Estancia Day Trip', slug: 'colonia-wine-estancia', category: 'FOOD_DRINK', description: 'Visit a nearby family winery and estancia in the Uruguayan countryside — Tannat tastings and a traditional rural lunch.', price: 60, duration: 'Full day', groupSizeMax: 10 },
  ],
  'punta-del-este': [
    { name: 'Isla de Lobos Sea Lion Boat Tour', slug: 'punta-isla-de-lobos', category: 'OUTDOOR_ADVENTURE', description: 'A boat trip to Isla de Lobos, home to one of the world\'s largest sea-lion colonies, off the Punta del Este peninsula.', price: 45, duration: 'Half day', groupSizeMax: 14 },
    { name: 'Casapueblo & José Ignacio Coast Tour', slug: 'punta-casapueblo-jose-ignacio', category: 'ARTS_CULTURE', description: 'Visit Páez Vilaró\'s whitewashed Casapueblo for the famous sunset ceremony, then the chic beach village of José Ignacio.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Punta del Este Beach Hopping Day', slug: 'punta-beach-hopping', category: 'OUTDOOR_ADVENTURE', description: 'Tour the resort\'s beaches from the wild waves of Playa Brava to the calm Playa Mansa, with the famous La Mano sculpture.', price: 30, duration: 'Half day', groupSizeMax: 12 },
  ],
  'paysandu': [
    { name: 'Termas de Guaviyú Hot Springs Trip', slug: 'paysandu-termas-guaviyu', category: 'WELLNESS_MINDFULNESS', description: 'A day at the Guaviyú thermal springs near Paysandú — multiple warm mineral pools set in tranquil parkland.', price: 25, duration: 'Half day', groupSizeMax: 14 },
    { name: 'Paysandú City & Beer Heritage Walk', slug: 'paysandu-beer-heritage', category: 'FOOD_DRINK', description: 'Discover the river city famous for the Semana de la Cerveza — its brewing heritage, historic plaza, and riverside spots.', price: 25, duration: '2 hours', groupSizeMax: 12 },
    { name: 'Río Uruguay Fishing & Boat Day', slug: 'paysandu-river-fishing', category: 'OUTDOOR_ADVENTURE', description: 'Head onto the Río Uruguay for a relaxed day of dorado fishing and birdwatching with a local boatman.', price: 50, duration: 'Full day', groupSizeMax: 6 },
  ],
  'cabo-polonio': [
    { name: 'Cabo Polonio Dune 4x4 & Village Tour', slug: 'cabo-polonio-dune-4x4', category: 'OUTDOOR_ADVENTURE', description: 'Ride the bouncing dune truck across the sand to the off-grid village, then explore the lighthouse and sea-lion colony.', price: 30, duration: 'Half day', groupSizeMax: 14 },
    { name: 'Cabo Polonio Stargazing Night', slug: 'cabo-polonio-stargazing', category: 'OUTDOOR_ADVENTURE', description: 'With no electricity, Cabo Polonio has some of the darkest skies in Uruguay — a guided night of stargazing over the dunes and sea.', price: 25, duration: 'Evening', groupSizeMax: 12 },
    { name: 'Sea Lion Colony & Lighthouse Walk', slug: 'cabo-polonio-sea-lion-walk', category: 'OUTDOOR_ADVENTURE', description: 'A guided walk to the rocky point and lighthouse overlooking the vast sea-lion colony, with wildlife and dune ecology along the way.', price: 20, duration: '2 hours', groupSizeMax: 12 },
  ],
};

seed({ SPOTS, EXPERIENCES }).catch((e) => { console.error(e.message); process.exit(1); });
