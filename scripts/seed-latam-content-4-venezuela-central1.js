// Batch 4 — Venezuela (Mérida, Canaima, Choroni, Morrocoy, Roraima),
// Costa Rica (Manuel Antonio, Monteverde, Puerto Viejo),
// Panama (Boquete, El Valle de Antón, Santa Catalina),
// Nicaragua (León, Managua, Ometepe, San Juan del Sur).
const { seed } = require('./_latam-seed-helper');

const SPOTS = {
  'merida-venezuela': [
    { name: 'Heladería Coromoto', slug: 'heladeria-coromoto-merida', category: 'FOOD', description: 'The Guinness-record ice-cream parlour with over 800 flavours — from trout to garlic to spaghetti — a quirky Mérida institution.', address: 'Av. 3, Mérida', priceRange: 'BUDGET', rating: 4.5, tags: ['ice-cream','quirky','record','iconic'] },
    { name: 'Posada Casa Sol', slug: 'posada-casa-sol-merida', category: 'ACCOMMODATION', description: 'A charming boutique posada in the historic centre — colourful, art-filled rooms and a warm base for Andean adventures.', address: 'Av. 4, Mérida', priceRange: 'BUDGET', rating: 4.5, tags: ['posada','boutique','central','andes'] },
    { name: 'Mukumbarí Cable Car', slug: 'mukumbari-cable-car', category: 'NATURE', description: 'The world\'s highest and longest cable car, climbing to 4,765m at Pico Espejo — staggering views over the Venezuelan Andes.', address: 'Mérida', priceRange: 'MID', rating: 4.7, tags: ['cable-car','andes','views','record'] },
  ],
  'canaima': [
    { name: 'Campamento Canaima', slug: 'campamento-canaima', category: 'ACCOMMODATION', description: 'A lagoon-side camp of hammocks and cabins — the launch point for boat and flight trips to Angel Falls in the heart of the Gran Sabana.', address: 'Canaima Lagoon', priceRange: 'MID', rating: 4.4, tags: ['camp','lagoon','angel-falls','remote'] },
    { name: 'Laguna de Canaima', slug: 'laguna-de-canaima', category: 'NATURE', description: 'A lagoon of pink sand beaches ringed by thundering tannin-red waterfalls — one of the most extraordinary natural settings on Earth.', address: 'Canaima National Park', priceRange: 'FREE', rating: 4.8, tags: ['lagoon','waterfalls','pink-sand','iconic'] },
    { name: 'Salto El Sapo', slug: 'salto-el-sapo', category: 'NATURE', description: 'A waterfall you can walk behind — a guided path takes you right behind the curtain of water on the Canaima lagoon.', address: 'Canaima', priceRange: 'BUDGET', rating: 4.6, tags: ['waterfall','adventure','walk-behind','unique'] },
  ],
  'choroni': [
    { name: 'Restaurante Mango', slug: 'restaurante-mango-choroni', category: 'FOOD', description: 'A laid-back eatery in the colonial cacao town of Choroní — fresh Caribbean fish and the warmth of the Aragua coast.', address: 'Choroní', priceRange: 'MID', rating: 4.3, tags: ['seafood','colonial','caribbean','relaxed'] },
    { name: 'Posada Pittier', slug: 'posada-pittier-choroni', category: 'ACCOMMODATION', description: 'A colonial-house posada between the mountains and the sea — a tranquil base for Playa Grande and the drumming festivals.', address: 'Choroní', priceRange: 'BUDGET', rating: 4.3, tags: ['posada','colonial','beach-base','tranquil'] },
    { name: 'Playa Grande Choroní', slug: 'playa-grande-choroni', category: 'NATURE', description: 'A palm-fringed Caribbean beach famous for its Afro-Venezuelan tambor drumming on weekend nights — wild, lush, and atmospheric.', address: 'Choroní', priceRange: 'FREE', rating: 4.5, tags: ['beach','tambor','caribbean','culture'] },
  ],
  'morrocoy': [
    { name: 'Restaurante Tucacas', slug: 'restaurante-tucacas-morrocoy', category: 'FOOD', description: 'A waterfront spot in the gateway town to Morrocoy — fresh seafood before boat trips to the offshore cays.', address: 'Tucacas, Morrocoy', priceRange: 'MID', rating: 4.2, tags: ['seafood','waterfront','cays','gateway'] },
    { name: 'Posada Villa Gregoria', slug: 'posada-villa-gregoria-morrocoy', category: 'ACCOMMODATION', description: 'A comfortable posada near the national park entrance — pool, garden, and easy boat access to the white-sand cays.', address: 'Tucacas, Morrocoy', priceRange: 'BUDGET', rating: 4.3, tags: ['posada','pool','garden','park-access'] },
    { name: 'Cayo Sombrero', slug: 'cayo-sombrero', category: 'NATURE', description: 'The jewel of Morrocoy National Park — a desert-island cay of powder-white sand, turquoise water, and snorkelling over coral.', address: 'Morrocoy National Park', priceRange: 'BUDGET', rating: 4.7, tags: ['cay','snorkeling','white-sand','island'] },
  ],
  'roraima-venezuela': [
    { name: 'Campamento Paraitepui', slug: 'campamento-paraitepui', category: 'ACCOMMODATION', description: 'The indigenous Pemón village and trek-start camp for Mount Roraima — basic lodging and porters for the legendary tabletop-mountain hike.', address: 'Paraitepui, Gran Sabana', priceRange: 'BUDGET', rating: 4.2, tags: ['camp','trek-start','pemon','remote'] },
    { name: 'Gran Sabana Lookout', slug: 'gran-sabana-lookout', category: 'NATURE', description: 'A sweeping viewpoint over the Gran Sabana grasslands toward the cloud-wrapped tepuis — the lost-world landscape of Conan Doyle.', address: 'Gran Sabana', priceRange: 'FREE', rating: 4.6, tags: ['viewpoint','tepui','savanna','lost-world'] },
    { name: 'Quebrada de Jaspe', slug: 'quebrada-de-jaspe', category: 'NATURE', description: 'A stream that flows over a bed of solid red jasper — a glowing crimson cascade and a magical Gran Sabana highlight.', address: 'Gran Sabana', priceRange: 'FREE', rating: 4.5, tags: ['jasper','stream','red-rock','unique'] },
  ],
  'manuel-antonio': [
    { name: 'El Avión', slug: 'el-avion-manuel-antonio', category: 'FOOD', description: 'A bar-restaurant built around a real 1954 cargo plane on a hillside — sunset cocktails and Pacific views above the jungle.', address: 'Manuel Antonio', priceRange: 'MID', rating: 4.4, tags: ['bar','views','sunset','quirky'] },
    { name: 'Selina Manuel Antonio', slug: 'selina-manuel-antonio', category: 'ACCOMMODATION', description: 'A jungle-set hostel with a pool and coworking — a sociable, central base between Quepos and the national park beaches.', address: 'Manuel Antonio', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','pool','coworking','jungle'] },
    { name: 'Manuel Antonio National Park', slug: 'manuel-antonio-park', category: 'NATURE', description: 'Costa Rica\'s most famous little park — rainforest trails to white-sand beaches, sloths, monkeys, and iguanas at every turn.', address: 'Manuel Antonio', priceRange: 'MID', rating: 4.7, tags: ['national-park','wildlife','beaches','sloths'] },
  ],
  'monteverde': [
    { name: 'Café Monteverde', slug: 'cafe-monteverde', category: 'CAFE', description: 'A working coffee cooperative café — farm-to-cup Monteverde coffee and the story of the cloud-forest growing community.', address: 'Monteverde', priceRange: 'BUDGET', rating: 4.5, tags: ['coffee','cooperative','farm-to-cup','cloud-forest'] },
    { name: 'Sloth Backpackers', slug: 'sloth-backpackers-monteverde', category: 'ACCOMMODATION', description: 'A cosy mountain hostel with fireplace and views — a friendly, well-priced base for ziplining and night walks.', address: 'Santa Elena, Monteverde', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','cosy','views','adventure-base'] },
    { name: 'Monteverde Cloud Forest Reserve', slug: 'monteverde-cloud-forest', category: 'NATURE', description: 'The legendary misty cloud forest — hanging bridges, resplendent quetzals, and an ethereal world of orchids and epiphytes.', address: 'Monteverde', priceRange: 'MID', rating: 4.8, tags: ['cloud-forest','quetzal','hanging-bridges','iconic'] },
  ],
  'puerto-viejo': [
    { name: 'Bread & Chocolate', slug: 'bread-and-chocolate-puerto-viejo', category: 'CAFE', description: 'A beloved breakfast café — homemade everything, from-scratch chocolate, and the laid-back Caribbean soul of Puerto Viejo.', address: 'Puerto Viejo de Talamanca', priceRange: 'BUDGET', rating: 4.7, tags: ['breakfast','chocolate','caribbean','cafe'] },
    { name: 'Rocking J\'s', slug: 'rocking-js-puerto-viejo', category: 'ACCOMMODATION', description: 'A legendary mosaic-covered hammock hostel on the beach — the social, bohemian heart of Costa Rica\'s Caribbean backpacker scene.', address: 'Puerto Viejo de Talamanca', priceRange: 'BUDGET', rating: 4.2, tags: ['hostel','hammocks','beach','bohemian'] },
    { name: 'Playa Cocles', slug: 'playa-cocles', category: 'NATURE', description: 'A golden Caribbean surf beach just south of town — palm-lined, lively, and home to the area\'s best beach breaks.', address: 'Puerto Viejo', priceRange: 'FREE', rating: 4.5, tags: ['beach','surf','caribbean','palms'] },
  ],
  'boquete': [
    { name: 'Café Ruiz', slug: 'cafe-ruiz-boquete', category: 'CAFE', description: 'Boquete\'s pioneering specialty roaster — world-renowned Geisha coffee grown on the slopes of Volcán Barú.', address: 'Boquete', priceRange: 'BUDGET', rating: 4.6, tags: ['coffee','geisha','roastery','highlands'] },
    { name: 'Selina Boquete', slug: 'selina-boquete', category: 'ACCOMMODATION', description: 'A riverside hostel with coworking and a sociable bar — the go-to base for hiking, coffee tours, and the digital-nomad crowd.', address: 'Boquete', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','coworking','riverside','nomad'] },
    { name: 'Sendero Los Quetzales', slug: 'sendero-los-quetzales', category: 'NATURE', description: 'One of Panama\'s most beautiful trails through cloud forest between Boquete and Cerro Punta — a chance to spot resplendent quetzals.', address: 'Volcán Barú National Park', priceRange: 'BUDGET', rating: 4.6, tags: ['trail','cloud-forest','quetzal','hiking'] },
  ],
  'el-valle-de-anton': [
    { name: 'La Casa de Lourdes', slug: 'la-casa-de-lourdes-el-valle', category: 'FOOD', description: 'An elegant restaurant in a Tuscan-style villa by the mountains — refined Panamanian cuisine in the cool crater valley.', address: 'El Valle de Antón', priceRange: 'HIGH', rating: 4.6, tags: ['restaurant','elegant','mountain','panamanian'] },
    { name: 'Bodhi Hostel & Lounge', slug: 'bodhi-hostel-el-valle', category: 'ACCOMMODATION', description: 'A bright, social hostel in the heart of the valley — yoga, a café, and easy access to the trails and hot springs.', address: 'El Valle de Antón', priceRange: 'BUDGET', rating: 4.5, tags: ['hostel','yoga','social','central'] },
    { name: 'Cerro Gaital Trail', slug: 'cerro-gaital-trail', category: 'NATURE', description: 'A forest hike along the rim of the giant extinct volcano crater that El Valle sits in — birdlife, orchids, and valley views.', address: 'El Valle de Antón', priceRange: 'FREE', rating: 4.4, tags: ['hike','crater','birdlife','views'] },
  ],
  'santa-catalina-panama': [
    { name: 'Restaurante Los Pibes', slug: 'los-pibes-santa-catalina', category: 'FOOD', description: 'A casual surfer-favourite serving fresh fish and Argentine-style grills — the social dinner spot in tiny Santa Catalina.', address: 'Santa Catalina', priceRange: 'MID', rating: 4.4, tags: ['seafood','grill','surf-town','social'] },
    { name: 'La Buena Vida', slug: 'la-buena-vida-santa-catalina', category: 'ACCOMMODATION', description: 'Colourful artisan cabinas above the surf break — a relaxed, characterful base in Panama\'s best-kept surf and diving secret.', address: 'Santa Catalina', priceRange: 'BUDGET', rating: 4.5, tags: ['cabinas','surf','relaxed','artisan'] },
    { name: 'Santa Catalina Point', slug: 'santa-catalina-point', category: 'NATURE', description: 'The powerful reef-break point that draws surfers worldwide — and the launch point for diving the Coiba UNESCO marine park.', address: 'Santa Catalina', priceRange: 'FREE', rating: 4.5, tags: ['surf','point-break','coiba','diving'] },
  ],
  'leon-nicaragua': [
    { name: 'El Mississippi', slug: 'el-mississippi-leon', category: 'CAFE', description: 'A relaxed café-bar in colonial León — good coffee, cold beer, and a meeting point for volcano-boarding backpackers.', address: 'León', priceRange: 'BUDGET', rating: 4.3, tags: ['cafe','bar','colonial','backpacker'] },
    { name: 'Bigfoot Hostel', slug: 'bigfoot-hostel-leon', category: 'ACCOMMODATION', description: 'The hostel that invented volcano boarding — a pool, a buzzing bar, and daily trips down the ash slopes of Cerro Negro.', address: 'León', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','pool','volcano-boarding','party'] },
    { name: 'Catedral de León', slug: 'catedral-de-leon', category: 'CULTURE', description: 'The largest cathedral in Central America, a UNESCO site — climb to its blinding-white rooftop for views over the volcanoes.', address: 'Parque Central, León', priceRange: 'BUDGET', rating: 4.6, tags: ['cathedral','unesco','rooftop','views'] },
  ],
  'managua': [
    { name: 'Café de las Flores', slug: 'cafe-de-las-flores-managua', category: 'CAFE', description: 'A quality Nicaraguan coffee chain flagship — single-origin beans from the country\'s northern highlands in a relaxed setting.', address: 'Managua', priceRange: 'BUDGET', rating: 4.3, tags: ['coffee','nicaraguan','relaxed','quality'] },
    { name: 'Hostal Dulce Sueño', slug: 'hostal-dulce-sueno-managua', category: 'ACCOMMODATION', description: 'A safe, friendly hostel handy for the airport and bus connections — a practical overnight base in the capital.', address: 'Managua', priceRange: 'BUDGET', rating: 4.1, tags: ['hostel','airport','practical','friendly'] },
    { name: 'Malecón de Managua', slug: 'malecon-de-managua', category: 'NATURE', description: 'The revamped lakefront promenade on Lake Xolotlán — food stalls, music, and views to the Momotombo volcano.', address: 'Lago Xolotlán, Managua', priceRange: 'FREE', rating: 4.0, tags: ['lakefront','promenade','volcano-views','local'] },
  ],
  'ometepe': [
    { name: 'Café Campestre', slug: 'cafe-campestre-ometepe', category: 'FOOD', description: 'A farm-to-table favourite in Balgüe — organic Ometepe produce, big breakfasts, and a hub for hikers and yoga retreaters.', address: 'Balgüe, Ometepe', priceRange: 'MID', rating: 4.6, tags: ['farm-to-table','organic','breakfast','hub'] },
    { name: 'El Zopilote Finca & Hostel', slug: 'el-zopilote-ometepe', category: 'ACCOMMODATION', description: 'An off-grid permaculture farm-hostel on the slopes of Maderas — bamboo cabins, hammocks, and a back-to-nature ethos.', address: 'Balgüe, Ometepe', priceRange: 'BUDGET', rating: 4.4, tags: ['eco-hostel','permaculture','off-grid','nature'] },
    { name: 'Ojo de Agua', slug: 'ojo-de-agua-ometepe', category: 'NATURE', description: 'A crystal-clear natural spring pool fed by volcanic filtration — swim and swing on the rope under the trees on the island.', address: 'Ometepe', priceRange: 'BUDGET', rating: 4.5, tags: ['spring','swimming','natural-pool','relaxing'] },
  ],
  'san-juan-del-sur': [
    { name: 'El Gato Negro', slug: 'el-gato-negro-sjds', category: 'CAFE', description: 'A bookshop-café famed for its breakfasts and coffee — a chilled morning spot in Nicaragua\'s surf-party town.', address: 'San Juan del Sur', priceRange: 'BUDGET', rating: 4.5, tags: ['cafe','bookshop','breakfast','surf-town'] },
    { name: 'Pachamama Hostel', slug: 'pachamama-hostel-sjds', category: 'ACCOMMODATION', description: 'A central, sociable hostel a block from the beach — the hub for Sunday Funday pool-crawl and surf-shuttle bookings.', address: 'San Juan del Sur', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','social','beach','party'] },
    { name: 'Playa Maderas', slug: 'playa-maderas', category: 'NATURE', description: 'The region\'s best surf beach a short shuttle from town — consistent waves, sunset bonfires, and a laid-back scene.', address: 'near San Juan del Sur', priceRange: 'FREE', rating: 4.5, tags: ['beach','surf','sunset','laid-back'] },
  ],
};

const EXPERIENCES = {
  'merida-venezuela': [
    { name: 'Mukumbarí Cable Car & Pico Espejo', slug: 'merida-cable-car-experience', category: 'OUTDOOR_ADVENTURE', description: 'Ride the world\'s highest cable car to 4,765m for breathtaking views over the snow-dusted peaks of the Venezuelan Andes.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Andes Páramo & Mountain Villages Tour', slug: 'merida-paramo-villages', category: 'OUTDOOR_ADVENTURE', description: 'A drive into the high páramo around Mérida — frailejón plants, mirror lakes, and timeless Andean villages.', price: 50, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Mérida Adventure Sports Day', slug: 'merida-adventure-sports', category: 'OUTDOOR_ADVENTURE', description: 'Paragliding, rafting, or canyoning in Venezuela\'s adventure capital, with the Andes as a dramatic backdrop.', price: 60, duration: 'Half day', groupSizeMax: 8, difficulty: 'moderate' },
  ],
  'canaima': [
    { name: 'Angel Falls Boat & Trek Expedition', slug: 'canaima-angel-falls', category: 'OUTDOOR_ADVENTURE', description: 'The river journey and jungle trek to the base of Angel Falls, the world\'s highest waterfall, plunging from a tepui in the Gran Sabana.', price: 320, duration: '3 days', groupSizeMax: 10, difficulty: 'moderate' },
    { name: 'Canaima Lagoon & Waterfalls Tour', slug: 'canaima-lagoon-tour', category: 'OUTDOOR_ADVENTURE', description: 'Explore the pink-sand lagoon and walk behind the thundering Salto El Sapo on a guided day in Canaima National Park.', price: 90, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Gran Sabana Scenic Flight', slug: 'canaima-scenic-flight', category: 'PHOTOGRAPHY_WALKS', description: 'A light-aircraft flight over the tepuis and Angel Falls — the only way to grasp the scale of this lost-world landscape.', price: 180, duration: '2 hours', groupSizeMax: 5 },
  ],
  'choroni': [
    { name: 'Henri Pittier Cloud Forest Drive', slug: 'choroni-henri-pittier', category: 'OUTDOOR_ADVENTURE', description: 'The dramatic mountain road through Henri Pittier National Park — cloud forest, birdlife, and the descent to the Caribbean coast.', price: 40, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Playa Grande Tambor Drumming Night', slug: 'choroni-tambor-night', category: 'NIGHTLIFE_SOCIAL', description: 'Experience the hypnotic Afro-Venezuelan tambor drumming and dancing that fills Choroní\'s beaches on weekend nights.', price: 25, duration: 'Evening', groupSizeMax: 12 },
    { name: 'Cacao Plantation & Coast Tour', slug: 'choroni-cacao-tour', category: 'FOOD_DRINK', description: 'Visit a historic cacao hacienda on the Aragua coast and taste Venezuela\'s world-famous chocolate at its source.', price: 35, duration: 'Half day', groupSizeMax: 10 },
  ],
  'morrocoy': [
    { name: 'Morrocoy Cays Island-Hopping Boat Tour', slug: 'morrocoy-cays-boat', category: 'OUTDOOR_ADVENTURE', description: 'Boat between the white-sand cays of Morrocoy National Park — Cayo Sombrero and beyond, with snorkelling over coral reefs.', price: 50, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Snorkel & Mangrove Kayak Trip', slug: 'morrocoy-snorkel-kayak', category: 'OUTDOOR_ADVENTURE', description: 'Snorkel the coral gardens and paddle the mangrove channels of Morrocoy, a haven of turquoise lagoons and marine life.', price: 40, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Cayo Sombrero Beach Day', slug: 'morrocoy-cayo-sombrero-day', category: 'OUTDOOR_ADVENTURE', description: 'A full day on the desert-island beach of Cayo Sombrero — powder sand, palm shade, and clear Caribbean swimming.', price: 35, duration: 'Full day', groupSizeMax: 14 },
  ],
  'roraima-venezuela': [
    { name: 'Mount Roraima 6-Day Tepui Trek', slug: 'roraima-6day-trek', category: 'OUTDOOR_ADVENTURE', description: 'The legendary trek up the "Lost World" tabletop mountain — savanna, the ramp ascent, and the alien summit landscape of crystals and pools.', price: 550, duration: '6 days', groupSizeMax: 10, difficulty: 'challenging' },
    { name: 'Gran Sabana Waterfalls Day Tour', slug: 'roraima-gran-sabana-falls', category: 'OUTDOOR_ADVENTURE', description: 'Tour the Gran Sabana\'s spectacular waterfalls and the red-jasper river of Quebrada de Jaspe across the open savanna.', price: 60, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Pemón Culture & Savanna Walk', slug: 'roraima-pemon-culture', category: 'ARTS_CULTURE', description: 'Visit a Pemón indigenous community and walk the savanna with local guides, learning the legends of the sacred tepuis.', price: 35, duration: 'Half day', groupSizeMax: 10 },
  ],
  'manuel-antonio': [
    { name: 'Manuel Antonio National Park Guided Walk', slug: 'manuel-antonio-park-walk', category: 'OUTDOOR_ADVENTURE', description: 'A naturalist-guided walk through the park\'s rainforest trails with a spotting scope — sloths, monkeys, and toucans, ending at the beach.', price: 45, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Mangrove Kayak & Wildlife Tour', slug: 'manuel-antonio-mangrove-kayak', category: 'OUTDOOR_ADVENTURE', description: 'Paddle the Damas Island mangroves spotting crabs, herons, and monkeys in the maze of tidal channels.', price: 55, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Catamaran Sunset Sail & Snorkel', slug: 'manuel-antonio-catamaran', category: 'OUTDOOR_ADVENTURE', description: 'A Pacific catamaran cruise with snorkelling, dolphins, and a golden Costa Rican sunset off the Manuel Antonio coast.', price: 80, duration: 'Half day', groupSizeMax: 14 },
  ],
  'monteverde': [
    { name: 'Cloud Forest Zipline & Hanging Bridges', slug: 'monteverde-zipline-bridges', category: 'OUTDOOR_ADVENTURE', description: 'Soar over the cloud-forest canopy on Monteverde\'s famous ziplines, then walk the hanging bridges through the misty treetops.', price: 70, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Monteverde Night Walk', slug: 'monteverde-night-walk', category: 'OUTDOOR_ADVENTURE', description: 'A guided after-dark walk to find the cloud forest\'s nocturnal life — kinkajous, sleeping birds, tarantulas, and glowing eyes.', price: 30, duration: '2 hours', groupSizeMax: 10 },
    { name: 'Coffee, Chocolate & Sugarcane Tour', slug: 'monteverde-coffee-chocolate', category: 'FOOD_DRINK', description: 'A working-farm tour through the bean-to-cup coffee process, cacao roasting, and traditional sugarcane pressing with tastings.', price: 40, duration: 'Half day', groupSizeMax: 12 },
  ],
  'puerto-viejo': [
    { name: 'Cahuita National Park Snorkel & Sloth Walk', slug: 'puerto-viejo-cahuita', category: 'OUTDOOR_ADVENTURE', description: 'A guided coastal walk in Cahuita National Park spotting sloths and monkeys, followed by snorkelling over its coral reef.', price: 50, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Bri Bri Indigenous Chocolate Tour', slug: 'puerto-viejo-bribri-chocolate', category: 'ARTS_CULTURE', description: 'Visit a Bribri indigenous community to learn traditional cacao cultivation and make chocolate the ancestral way.', price: 45, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Caribbean Surf Lesson at Playa Cocles', slug: 'puerto-viejo-surf-lesson', category: 'FITNESS_SPORTS', description: 'Learn to surf the warm Caribbean breaks at Playa Cocles with a local instructor in laid-back Puerto Viejo.', price: 40, duration: '2 hours', groupSizeMax: 6 },
  ],
  'boquete': [
    { name: 'Boquete Coffee Farm Tour & Tasting', slug: 'boquete-coffee-tour', category: 'FOOD_DRINK', description: 'Tour a highland estate growing the world-famous Geisha coffee, from cherry to cup, with an expert cupping session.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Volcán Barú Summit Night Hike', slug: 'boquete-volcan-baru', category: 'OUTDOOR_ADVENTURE', description: 'An overnight ascent of Panama\'s highest peak to catch sunrise from the only spot where you can see both oceans at once.', price: 90, duration: 'Overnight', groupSizeMax: 8, difficulty: 'challenging' },
    { name: 'Boquete River Tubing & Hot Springs', slug: 'boquete-tubing-hot-springs', category: 'OUTDOOR_ADVENTURE', description: 'Float the Caldera River and soak in the Boquete hot springs — a relaxed day in the cool Chiriquí highlands.', price: 45, duration: 'Half day', groupSizeMax: 12 },
  ],
  'el-valle-de-anton': [
    { name: 'India Dormida Crater Hike', slug: 'el-valle-india-dormida', category: 'OUTDOOR_ADVENTURE', description: 'Hike the "Sleeping Indian" ridge around El Valle\'s volcanic crater — petroglyphs, waterfalls, and panoramic valley views.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'El Valle Market & Golden Frog Tour', slug: 'el-valle-market-frog', category: 'ARTS_CULTURE', description: 'Explore the famous handicraft market and the conservation centre protecting Panama\'s endangered golden frog.', price: 25, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Canopy Adventure Zipline & Waterfall', slug: 'el-valle-canopy-zipline', category: 'OUTDOOR_ADVENTURE', description: 'Zip across the rainforest canopy past the Chorro El Macho waterfall in El Valle\'s lush crater forest.', price: 50, duration: 'Half day', groupSizeMax: 10 },
  ],
  'santa-catalina-panama': [
    { name: 'Coiba National Park Diving Day', slug: 'santa-catalina-coiba-diving', category: 'OUTDOOR_ADVENTURE', description: 'Dive the UNESCO Coiba marine park — sharks, rays, turtles, and vast schools of fish in Panama\'s premier dive destination.', price: 130, duration: 'Full day', groupSizeMax: 8, difficulty: 'moderate' },
    { name: 'Santa Catalina Surf Lesson', slug: 'santa-catalina-surf-lesson', category: 'FITNESS_SPORTS', description: 'Learn to surf at one of Central America\'s best breaks, with warm water and waves for every level.', price: 35, duration: '2 hours', groupSizeMax: 6 },
    { name: 'Coiba Snorkel & Island Day Trip', slug: 'santa-catalina-coiba-snorkel', category: 'OUTDOOR_ADVENTURE', description: 'Boat to Coiba for snorkelling over coral gardens, white-sand island beaches, and abundant marine life.', price: 90, duration: 'Full day', groupSizeMax: 12 },
  ],
  'leon-nicaragua': [
    { name: 'Cerro Negro Volcano Boarding', slug: 'leon-volcano-boarding', category: 'OUTDOOR_ADVENTURE', description: 'Hike an active volcano then sled down its black ash slopes at speed — León\'s legendary adrenaline rush.', price: 35, duration: 'Half day', groupSizeMax: 12, difficulty: 'moderate' },
    { name: 'León Colonial City & Rooftop Tour', slug: 'leon-city-tour', category: 'ARTS_CULTURE', description: 'Explore revolutionary murals, the grand UNESCO cathedral, and its blinding-white rooftop with a knowledgeable local guide.', price: 25, duration: '3 hours', groupSizeMax: 12 },
    { name: 'Las Peñitas Beach & Sunset Trip', slug: 'leon-las-penitas', category: 'OUTDOOR_ADVENTURE', description: 'Escape to the Pacific beach of Las Peñitas for surf, a mangrove estuary boat trip, and a fiery sunset.', price: 30, duration: 'Half day', groupSizeMax: 12 },
  ],
  'managua': [
    { name: 'Managua City & Revolution History Tour', slug: 'managua-city-tour', category: 'ARTS_CULTURE', description: 'A tour of the capital\'s lakefront, old cathedral ruins, and the murals and monuments of Nicaragua\'s turbulent history.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Masaya Volcano Lava Lake Night Tour', slug: 'managua-masaya-volcano', category: 'OUTDOOR_ADVENTURE', description: 'An evening trip to peer into the glowing lava lake of Masaya Volcano — one of few accessible lava lakes on Earth.', price: 40, duration: 'Evening', groupSizeMax: 12 },
    { name: 'Catarina & Pueblos Blancos Day Trip', slug: 'managua-pueblos-blancos', category: 'ARTS_CULTURE', description: 'Visit the white colonial villages and the Catarina lookout over the Apoyo crater lagoon, with crafts and local food.', price: 45, duration: 'Full day', groupSizeMax: 12 },
  ],
  'ometepe': [
    { name: 'Volcán Maderas Summit Hike', slug: 'ometepe-maderas-hike', category: 'OUTDOOR_ADVENTURE', description: 'A demanding jungle climb up Maderas volcano to its misty crater lake — howler monkeys and cloud forest on the twin-volcano island.', price: 40, duration: 'Full day', groupSizeMax: 8, difficulty: 'challenging' },
    { name: 'Ometepe Island Bike & Petroglyph Tour', slug: 'ometepe-bike-petroglyph', category: 'OUTDOOR_ADVENTURE', description: 'Cycle the volcanic island past pre-Columbian petroglyphs, farms, and viewpoints between its two great cones.', price: 30, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Río Istián Kayak Wildlife Tour', slug: 'ometepe-rio-istian-kayak', category: 'OUTDOOR_ADVENTURE', description: 'Paddle the calm Istián channel between the volcanoes — turtles, caiman, and birdlife in the wetlands of Ometepe.', price: 30, duration: 'Half day', groupSizeMax: 10 },
  ],
  'san-juan-del-sur': [
    { name: 'San Juan del Sur Surf Lesson', slug: 'sjds-surf-lesson', category: 'FITNESS_SPORTS', description: 'Learn to surf at nearby Playa Maderas or Remanso with a local instructor — consistent, beginner-friendly Pacific waves.', price: 40, duration: 'Half day', groupSizeMax: 6 },
    { name: 'Sea Turtle Nesting Night Tour', slug: 'sjds-turtle-nesting', category: 'OUTDOOR_ADVENTURE', description: 'A seasonal evening trip to La Flor reserve to witness olive ridley sea turtles nesting on the beach under the stars.', price: 45, duration: 'Evening', groupSizeMax: 10 },
    { name: 'Sunset Catamaran & Snorkel Cruise', slug: 'sjds-catamaran-sunset', category: 'OUTDOOR_ADVENTURE', description: 'Sail the bay with snorkelling stops and an open bar, finishing with the famous San Juan del Sur sunset over the Pacific.', price: 65, duration: 'Half day', groupSizeMax: 14 },
  ],
};

seed({ SPOTS, EXPERIENCES }).catch((e) => { console.error(e.message); process.exit(1); });
