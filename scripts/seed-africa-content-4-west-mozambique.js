// Africa batch D (final) — West Africa (Ghana, Senegal) + Mozambique.
const { seed } = require('./_content-seed-helper');

const SPOTS = {
  // GHANA
  'accra': [
    { name: 'Vida e Caffè', slug: 'vida-e-caffe-accra', category: 'CAFE', description: 'A bright café in Osu serving good coffee and breakfasts — a reliable wifi-friendly base in the heart of Accra.', address: 'Osu, Accra', priceRange: 'MID', rating: 4.3, tags: ['cafe','osu','wifi','breakfast'] },
    { name: 'Somewhere Nice Hostel', slug: 'somewhere-nice-hostel-accra', category: 'ACCOMMODATION', description: 'Accra\'s favourite backpackers — a rooftop bar, garden, and the social hub for travellers across West Africa.', address: 'Accra', priceRange: 'BUDGET', rating: 4.5, tags: ['hostel','rooftop','social','garden'] },
    { name: 'Jamestown', slug: 'jamestown-accra', category: 'CULTURE', description: 'Accra\'s historic fishing district — colonial forts, a lighthouse, vivid street art, and the energy of the boxing gyms.', address: 'Jamestown, Accra', priceRange: 'FREE', rating: 4.3, tags: ['historic','street-art','fishing','colonial'] },
  ],
  'cape-coast': [
    { name: 'Baobab House', slug: 'baobab-house-cape-coast', category: 'CAFE', description: 'A vegetarian café and craft shop supporting local artisans — fresh juices and healthy plates near the castle.', address: 'Cape Coast', priceRange: 'BUDGET', rating: 4.4, tags: ['cafe','vegetarian','crafts','ethical'] },
    { name: 'Oasis Beach Resort', slug: 'oasis-beach-resort-cape-coast', category: 'ACCOMMODATION', description: 'A beachfront resort and backpacker spot beside the castle — cabanas, live drumming nights, and an ocean setting.', address: 'Cape Coast', priceRange: 'BUDGET', rating: 4.3, tags: ['beachfront','cabanas','drumming','social'] },
    { name: 'Cape Coast Castle', slug: 'cape-coast-castle', category: 'CULTURE', description: 'A UNESCO slave fort and its harrowing dungeons and Door of No Return — a profoundly moving and essential visit.', address: 'Cape Coast', priceRange: 'MID', rating: 4.8, tags: ['unesco','slavery','castle','essential'] },
  ],
  'kumasi': [
    { name: 'Vic Baboo\'s Café', slug: 'vic-baboos-cafe-kumasi', category: 'FOOD', description: 'A long-running travellers\' café in central Kumasi — Indian, Chinese, and Ghanaian dishes and cold drinks.', address: 'Kumasi', priceRange: 'BUDGET', rating: 4.2, tags: ['cafe','traveller','central','varied'] },
    { name: 'Four Villages Inn', slug: 'four-villages-inn-kumasi', category: 'ACCOMMODATION', description: 'A welcoming, award-winning guesthouse — knowledgeable Ashanti hosts and a comfortable base for the cultural sites.', address: 'Kumasi', priceRange: 'MID', rating: 4.6, tags: ['guesthouse','ashanti','welcoming','comfortable'] },
    { name: 'Kejetia Market', slug: 'kejetia-market-kumasi', category: 'CULTURE', description: 'One of West Africa\'s largest markets — a vast, dizzying labyrinth of stalls selling everything imaginable.', address: 'Kumasi', priceRange: 'FREE', rating: 4.3, tags: ['market','huge','ashanti','authentic'] },
  ],
  'tamale': [
    { name: 'Sparkles Restaurant', slug: 'sparkles-restaurant-tamale', category: 'FOOD', description: 'A relaxed garden restaurant in northern Ghana\'s hub — Ghanaian and continental dishes in a calm setting.', address: 'Tamale', priceRange: 'BUDGET', rating: 4.2, tags: ['restaurant','garden','northern','relaxed'] },
    { name: 'Catholic Guesthouse Tamale', slug: 'catholic-guesthouse-tamale', category: 'ACCOMMODATION', description: 'A clean, quiet, well-priced guesthouse — a practical base for Mole National Park and the northern region.', address: 'Tamale', priceRange: 'BUDGET', rating: 4.1, tags: ['guesthouse','quiet','mole-base','value'] },
    { name: 'Tamale Central Market', slug: 'tamale-central-market', category: 'CULTURE', description: 'The vibrant market of the Dagomba north — shea butter, smocks, and the distinct culture of Muslim northern Ghana.', address: 'Tamale', priceRange: 'FREE', rating: 4.1, tags: ['market','dagomba','northern','culture'] },
  ],
  'volta-region': [
    { name: 'Big Foot Safaris Lodge', slug: 'big-foot-safaris-lodge-volta', category: 'ACCOMMODATION', description: 'A lodge near Wli at the foot of Ghana\'s tallest waterfall — a base for hikes, bats, and the Agumatsa falls.', address: 'Wli, Volta Region', priceRange: 'BUDGET', rating: 4.3, tags: ['lodge','waterfall-base','hiking','nature'] },
    { name: 'Wli Waterfall', slug: 'wli-waterfall', category: 'NATURE', description: 'West Africa\'s highest waterfall, plunging into a forest pool alive with thousands of fruit bats overhead.', address: 'Wli, Volta Region', priceRange: 'BUDGET', rating: 4.6, tags: ['waterfall','bats','forest','swimming'] },
    { name: 'Mount Afadja Trail', slug: 'mount-afadja-trail', category: 'NATURE', description: 'The trail up Afadjato, Ghana\'s highest peak — a steep forest climb to panoramic views over the Volta hills and Togo.', address: 'Volta Region', priceRange: 'BUDGET', rating: 4.4, tags: ['hiking','peak','forest','views'] },
  ],
  // SENEGAL
  'dakar': [
    { name: 'Café de Rome', slug: 'cafe-de-rome-dakar', category: 'CAFE', description: 'A long-standing Dakar café — French-Senegalese pastries, strong coffee, and a relaxed central meeting point.', address: 'Dakar', priceRange: 'MID', rating: 4.2, tags: ['cafe','french','pastries','central'] },
    { name: 'Via Via Dakar', slug: 'via-via-dakar', category: 'ACCOMMODATION', description: 'A cultural guesthouse and café near the coast — a sociable, art-filled base for exploring the Senegalese capital.', address: 'Dakar', priceRange: 'BUDGET', rating: 4.3, tags: ['guesthouse','cultural','social','coastal'] },
    { name: 'Île de Gorée', slug: 'ile-de-goree', category: 'CULTURE', description: 'A UNESCO island off Dakar — the House of Slaves and Door of No Return, a moving memorial to the transatlantic trade.', address: 'Gorée Island, Dakar', priceRange: 'MID', rating: 4.7, tags: ['unesco','slavery','island','memorial'] },
  ],
  'saint-louis-senegal': [
    { name: 'La Linguère', slug: 'la-linguere-saint-louis', category: 'FOOD', description: 'A riverside restaurant serving Senegalese classics like thieboudienne and yassa in colonial Saint-Louis.', address: 'Saint-Louis', priceRange: 'MID', rating: 4.3, tags: ['senegalese','thieboudienne','riverside','colonial'] },
    { name: 'La Maison Rose', slug: 'la-maison-rose-saint-louis', category: 'ACCOMMODATION', description: 'An iconic restored colonial mansion-hotel on the island — faded pink grandeur and riverfront character.', address: 'Saint-Louis', priceRange: 'MID', rating: 4.4, tags: ['hotel','colonial','iconic','riverfront'] },
    { name: 'Saint-Louis Island', slug: 'saint-louis-island', category: 'CULTURE', description: 'The UNESCO colonial island at the mouth of the Senegal River — crumbling French architecture and a famous jazz scene.', address: 'Saint-Louis', priceRange: 'FREE', rating: 4.5, tags: ['unesco','colonial','jazz','architecture'] },
  ],
  'ziguinchor': [
    { name: 'Le Kassa', slug: 'le-kassa-ziguinchor', category: 'FOOD', description: 'A relaxed Casamance restaurant — fresh river fish, palm wine, and the laid-back flavour of southern Senegal.', address: 'Ziguinchor', priceRange: 'BUDGET', rating: 4.2, tags: ['casamance','fish','local','relaxed'] },
    { name: 'Le Flamboyant', slug: 'le-flamboyant-ziguinchor', category: 'ACCOMMODATION', description: 'A garden hotel with a pool in the Casamance capital — a calm, green base for exploring the lush south.', address: 'Ziguinchor', priceRange: 'BUDGET', rating: 4.2, tags: ['hotel','garden','pool','casamance'] },
    { name: 'Casamance River Banks', slug: 'casamance-river-banks', category: 'NATURE', description: 'The lush riverine landscape of the Casamance — pirogue trips through mangroves to Diola villages and rice paddies.', address: 'Ziguinchor', priceRange: 'FREE', rating: 4.3, tags: ['river','mangroves','diola','green'] },
  ],
  'toubab-dialaw': [
    { name: 'Sobo Badé', slug: 'sobo-bade-toubab-dialaw', category: 'ACCOMMODATION', description: 'A famous clifftop cultural centre and guesthouse of sculpted Afro-Mediterranean architecture above the sea.', address: 'Toubab Dialaw', priceRange: 'MID', rating: 4.5, tags: ['cultural-centre','clifftop','art','sea-views'] },
    { name: 'Chez Manou', slug: 'chez-manou-toubab-dialaw', category: 'FOOD', description: 'A beachside eatery serving grilled fish and Senegalese plates in the artists\' fishing village south of Dakar.', address: 'Toubab Dialaw', priceRange: 'BUDGET', rating: 4.2, tags: ['beachside','fish','village','relaxed'] },
    { name: 'Toubab Dialaw Beach', slug: 'toubab-dialaw-beach', category: 'NATURE', description: 'A quiet artists\' beach of cliffs and fishing pirogues — drumming workshops and a bohemian escape from the city.', address: 'Toubab Dialaw', priceRange: 'FREE', rating: 4.3, tags: ['beach','cliffs','drumming','bohemian'] },
  ],
  'thies': [
    { name: 'Restaurant Le Cèdre', slug: 'le-cedre-thies', category: 'FOOD', description: 'A reliable restaurant in Senegal\'s second city — Lebanese-Senegalese fare and a calm stop on the road inland.', address: 'Thiès', priceRange: 'BUDGET', rating: 4.1, tags: ['restaurant','lebanese','local','central'] },
    { name: 'Hôtel Résidence Lat-Dior', slug: 'hotel-lat-dior-thies', category: 'ACCOMMODATION', description: 'A comfortable mid-range hotel in central Thiès — a practical base for the tapestry workshop and rail town.', address: 'Thiès', priceRange: 'BUDGET', rating: 4.0, tags: ['hotel','central','practical','base'] },
    { name: 'Manufactures Sénégalaises des Arts Décoratifs', slug: 'tapestry-workshop-thies', category: 'CULTURE', description: 'The national tapestry workshop where master weavers produce some of Africa\'s finest large-scale textile art.', address: 'Thiès', priceRange: 'MID', rating: 4.5, tags: ['tapestry','textiles','art','workshop'] },
  ],
  // MOZAMBIQUE
  'maputo': [
    { name: 'Café Camissa', slug: 'cafe-camissa-maputo', category: 'CAFE', description: 'A leafy garden café in the capital — good coffee, brunch, and a relaxed creative crowd in central Maputo.', address: 'Maputo', priceRange: 'MID', rating: 4.4, tags: ['cafe','garden','brunch','relaxed'] },
    { name: 'Fatima\'s Place', slug: 'fatimas-place-maputo', category: 'ACCOMMODATION', description: 'Maputo\'s legendary backpackers — a garden, bar, and the long-time social hub of overland travel in Mozambique.', address: 'Maputo', priceRange: 'BUDGET', rating: 4.4, tags: ['backpackers','garden','social','overland'] },
    { name: 'Mercado Central Maputo', slug: 'mercado-central-maputo', category: 'CULTURE', description: 'The grand colonial-era central market — fresh seafood, spices, cashews, and the buzz of the capital.', address: 'Maputo', priceRange: 'FREE', rating: 4.3, tags: ['market','seafood','colonial','authentic'] },
  ],
  'tofo': [
    { name: 'Tofo Tofo Beach Café', slug: 'tofo-beach-cafe', category: 'CAFE', description: 'A laid-back beach café — fresh juices, breakfasts, and ocean views before a day of diving with whale sharks.', address: 'Tofo', priceRange: 'BUDGET', rating: 4.4, tags: ['cafe','beach','breakfast','divers'] },
    { name: 'Mozambeat Motel', slug: 'mozambeat-motel-tofo', category: 'ACCOMMODATION', description: 'A colourful, social hostel-motel near Tofo beach — pool, bar, live music, and the heart of the backpacker scene.', address: 'Tofo', priceRange: 'BUDGET', rating: 4.5, tags: ['hostel','pool','live-music','social'] },
    { name: 'Tofo Beach', slug: 'tofo-beach', category: 'NATURE', description: 'A wide Indian Ocean beach famed for year-round whale sharks and manta rays just offshore — a diver\'s paradise.', address: 'Tofo', priceRange: 'FREE', rating: 4.6, tags: ['beach','whale-sharks','diving','indian-ocean'] },
  ],
  'ilha-de-mocambique': [
    { name: 'Reliquias Restaurant', slug: 'reliquias-ilha', category: 'FOOD', description: 'A characterful restaurant in a Stone Town building — fresh seafood and Mozambican-Portuguese fusion on the island.', address: 'Ilha de Moçambique', priceRange: 'MID', rating: 4.4, tags: ['seafood','portuguese','stone-town','island'] },
    { name: 'Casa de Gabriel', slug: 'casa-de-gabriel-ilha', category: 'ACCOMMODATION', description: 'A friendly guesthouse in a restored island house — an atmospheric, affordable base on the UNESCO island.', address: 'Ilha de Moçambique', priceRange: 'BUDGET', rating: 4.3, tags: ['guesthouse','restored','island','atmospheric'] },
    { name: 'Stone Town Ilha', slug: 'stone-town-ilha', category: 'CULTURE', description: 'The UNESCO-listed coral-stone old town — the former capital of Portuguese East Africa, with the oldest European building south of the Sahara.', address: 'Ilha de Moçambique', priceRange: 'FREE', rating: 4.6, tags: ['unesco','colonial','stone-town','historic'] },
  ],
  'vilanculos': [
    { name: 'Casa Rex Restaurant', slug: 'casa-rex-vilanculos', category: 'FOOD', description: 'A clifftop restaurant with sweeping bay views — fresh seafood and sundowners overlooking the Bazaruto Archipelago.', address: 'Vilanculos', priceRange: 'MID', rating: 4.5, tags: ['seafood','clifftop','bay-views','sundowners'] },
    { name: 'Zombie Cucumber Backpackers', slug: 'zombie-cucumber-vilanculos', category: 'ACCOMMODATION', description: 'A characterful garden backpackers near the beach — the relaxed social base for dhow safaris to Bazaruto.', address: 'Vilanculos', priceRange: 'BUDGET', rating: 4.5, tags: ['backpackers','garden','social','bazaruto-base'] },
    { name: 'Vilanculos Beach', slug: 'vilanculos-beach', category: 'NATURE', description: 'A long Indian Ocean beach of dhows and tidal flats — the gateway to the turquoise Bazaruto island national park.', address: 'Vilanculos', priceRange: 'FREE', rating: 4.4, tags: ['beach','dhows','bazaruto','gateway'] },
  ],
  'pemba': [
    { name: 'Pemba Magic Lodge Restaurant', slug: 'pemba-magic-restaurant', category: 'FOOD', description: 'A beachfront lodge restaurant on Wimbe Beach — fresh seafood and the laid-back base for Quirimbas trips.', address: 'Wimbe, Pemba', priceRange: 'MID', rating: 4.3, tags: ['seafood','beachfront','quirimbas-base','relaxed'] },
    { name: 'Russell\'s Place (Pemba Magic)', slug: 'russells-place-pemba', category: 'ACCOMMODATION', description: 'A friendly beachfront backpackers and lodge on Wimbe Beach — the long-time hub for northern Mozambique travel.', address: 'Wimbe, Pemba', priceRange: 'BUDGET', rating: 4.4, tags: ['backpackers','beachfront','social','base'] },
    { name: 'Wimbe Beach', slug: 'wimbe-beach-pemba', category: 'NATURE', description: 'Pemba\'s palm-lined town beach on one of the world\'s largest bays — calm swimming and dhow trips to the reef.', address: 'Pemba', priceRange: 'FREE', rating: 4.2, tags: ['beach','bay','swimming','dhows'] },
  ],
};

const EXPERIENCES = {
  'accra': [
    { name: 'Accra City & Jamestown Tour', slug: 'accra-city-jamestown', category: 'ARTS_CULTURE', description: 'Explore the capital — Independence Square, the Nkrumah Mausoleum, and the street art and fishing life of Jamestown.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Accra Street Food & Market Tour', slug: 'accra-street-food', category: 'FOOD_DRINK', description: 'Taste jollof, kelewele, banku, and fresh coconut with a local guide through Accra\'s lively markets and chop bars.', price: 30, duration: '3 hours', groupSizeMax: 10 },
    { name: 'Afrobeats Nightlife Experience', slug: 'accra-afrobeats-night', category: 'NIGHTLIFE_SOCIAL', description: 'Dive into Accra\'s legendary nightlife — live highlife and afrobeats bars in Osu and Labadi with a local host.', price: 30, duration: 'Evening', groupSizeMax: 12 },
  ],
  'cape-coast': [
    { name: 'Cape Coast & Elmina Castles Tour', slug: 'cape-coast-castles-tour', category: 'ARTS_CULTURE', description: 'A moving guided visit to the UNESCO slave castles of Cape Coast and Elmina — essential, harrowing, and unforgettable.', price: 40, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Kakum Canopy Walkway Day Trip', slug: 'cape-coast-kakum-canopy', category: 'OUTDOOR_ADVENTURE', description: 'Walk the famous rope-and-plank canopy bridges high above the Kakum rainforest, with early-morning birdlife.', price: 45, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Cape Coast Fishing Village & Drumming', slug: 'cape-coast-drumming', category: 'ARTS_CULTURE', description: 'Visit the colourful fishing harbour and join a drumming and dance session with local musicians on the coast.', price: 30, duration: 'Half day', groupSizeMax: 12 },
  ],
  'kumasi': [
    { name: 'Ashanti Kingdom Cultural Tour', slug: 'kumasi-ashanti-tour', category: 'ARTS_CULTURE', description: 'Discover the Ashanti capital — the Manhyia Palace museum, the royal mausoleum, and the golden-stool history.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Kente Weaving & Adinkra Craft Villages', slug: 'kumasi-kente-villages', category: 'ARTS_CULTURE', description: 'Visit Bonwire and Ntonso to watch master kente weavers and stamp your own adinkra cloth with traditional symbols.', price: 40, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Kejetia Market Walking Tour', slug: 'kumasi-kejetia-walk', category: 'ARTS_CULTURE', description: 'Plunge into one of West Africa\'s largest markets with a guide — a sensory immersion in Ashanti commerce.', price: 25, duration: '3 hours', groupSizeMax: 8 },
  ],
  'tamale': [
    { name: 'Mole National Park Safari', slug: 'tamale-mole-safari', category: 'OUTDOOR_ADVENTURE', description: 'A walking and driving safari in Ghana\'s flagship park — elephants, antelope, and warthogs around the waterholes.', price: 70, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Larabanga Mosque & Village Visit', slug: 'tamale-larabanga-mosque', category: 'ARTS_CULTURE', description: 'Visit the ancient Sudanese-style mud-and-stick Larabanga Mosque, one of West Africa\'s oldest, near Mole.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Northern Ghana Culture & Shea Tour', slug: 'tamale-shea-culture', category: 'ARTS_CULTURE', description: 'Discover Dagomba culture in Tamale — a women\'s shea-butter cooperative, smock weaving, and the market.', price: 30, duration: 'Half day', groupSizeMax: 10 },
  ],
  'volta-region': [
    { name: 'Wli Waterfall Hike', slug: 'volta-wli-waterfall-hike', category: 'OUTDOOR_ADVENTURE', description: 'Hike through forest to West Africa\'s highest waterfall, swimming in the pool beneath a sky full of fruit bats.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Mount Afadja Summit Climb', slug: 'volta-afadja-climb', category: 'OUTDOOR_ADVENTURE', description: 'Climb Ghana\'s highest peak through dense forest for panoramic views over the Volta hills into Togo.', price: 35, duration: 'Half day', groupSizeMax: 10, difficulty: 'moderate' },
    { name: 'Tafi Atome Monkey Sanctuary Visit', slug: 'volta-tafi-atome-monkeys', category: 'OUTDOOR_ADVENTURE', description: 'Visit a community sanctuary where sacred Mona monkeys come to feed from your hands in the forest.', price: 30, duration: 'Half day', groupSizeMax: 12 },
  ],
  'dakar': [
    { name: 'Gorée Island Slavery History Tour', slug: 'dakar-goree-island', category: 'ARTS_CULTURE', description: 'A ferry to the UNESCO island of Gorée and the House of Slaves — a profound memorial to the transatlantic trade.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Dakar City & Lake Retba Day Trip', slug: 'dakar-lac-rose', category: 'OUTDOOR_ADVENTURE', description: 'Visit the pink waters of Lac Rose (Lake Retba), the salt harvesters, and the dunes meeting the Atlantic.', price: 55, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Senegalese Drumming & Music Night', slug: 'dakar-drumming-night', category: 'NIGHTLIFE_SOCIAL', description: 'Experience the sabar drumming and mbalax music that pulses through Dakar, with a local musician as your guide.', price: 30, duration: 'Evening', groupSizeMax: 12 },
  ],
  'saint-louis-senegal': [
    { name: 'Djoudj Bird Sanctuary Day Trip', slug: 'saint-louis-djoudj', category: 'OUTDOOR_ADVENTURE', description: 'A boat safari in the Djoudj wetlands, one of the world\'s great bird reserves — vast colonies of pelicans and flamingos.', price: 60, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Saint-Louis Colonial Island Tour', slug: 'saint-louis-island-tour', category: 'ARTS_CULTURE', description: 'A horse-cart and walking tour of the UNESCO island — colonial architecture, fishing quarters, and jazz history.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Langue de Barbarie Pirogue Trip', slug: 'saint-louis-langue-de-barbarie', category: 'OUTDOOR_ADVENTURE', description: 'A pirogue trip along the sandspit national park where the Senegal River meets the Atlantic — birds and fishing villages.', price: 40, duration: 'Half day', groupSizeMax: 10 },
  ],
  'ziguinchor': [
    { name: 'Casamance Mangrove Pirogue Tour', slug: 'ziguinchor-mangrove-pirogue', category: 'OUTDOOR_ADVENTURE', description: 'Paddle the lush Casamance waterways through mangroves to Diola villages, rice paddies, and birdlife.', price: 40, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Diola Village Cultural Visit', slug: 'ziguinchor-diola-village', category: 'ARTS_CULTURE', description: 'Visit a traditional Diola village in the Casamance to learn about animist culture, palm wine, and rice farming.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Cap Skirring Beach Day Trip', slug: 'ziguinchor-cap-skirring', category: 'OUTDOOR_ADVENTURE', description: 'A day at Cap Skirring, the Casamance\'s palm-fringed Atlantic beach — one of West Africa\'s finest stretches of sand.', price: 45, duration: 'Full day', groupSizeMax: 12 },
  ],
  'toubab-dialaw': [
    { name: 'Sobo Badé Drumming Workshop', slug: 'toubab-dialaw-drumming', category: 'ARTS_CULTURE', description: 'A djembe and sabar drumming workshop at the famous Sobo Badé cultural centre above the sea.', price: 30, duration: '2 hours', groupSizeMax: 10 },
    { name: 'Coastal Pirogue & Fishing Village Tour', slug: 'toubab-dialaw-pirogue', category: 'OUTDOOR_ADVENTURE', description: 'A pirogue trip along the cliffs and fishing villages of the Petite Côte south of Dakar.', price: 35, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Toubab Dialaw Beach & Art Walk', slug: 'toubab-dialaw-art-walk', category: 'PHOTOGRAPHY_WALKS', description: 'Explore the bohemian artists\' village — sculpture, the clifftop architecture of Sobo Badé, and the beach.', price: 20, duration: '3 hours', groupSizeMax: 10 },
  ],
  'thies': [
    { name: 'Tapestry Workshop Guided Visit', slug: 'thies-tapestry-visit', category: 'ARTS_CULTURE', description: 'Tour the national tapestry manufactory to see master weavers create monumental textile artworks by hand.', price: 25, duration: '2 hours', groupSizeMax: 10 },
    { name: 'Bandia Reserve Safari Day Trip', slug: 'thies-bandia-safari', category: 'OUTDOOR_ADVENTURE', description: 'A safari at the nearby Bandia Reserve — giraffes, rhinos, and antelope among baobabs in a reintroduced ecosystem.', price: 60, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Thiès City & Rail Heritage Walk', slug: 'thies-rail-heritage', category: 'ARTS_CULTURE', description: 'Discover Senegal\'s railway town — its colonial history, the cathedral, and the bustling central market.', price: 25, duration: 'Half day', groupSizeMax: 12 },
  ],
  'maputo': [
    { name: 'Maputo City & Architecture Tour', slug: 'maputo-city-tour', category: 'ARTS_CULTURE', description: 'Explore the capital\'s faded Portuguese grandeur — the train station, the Iron House, markets, and Art Deco facades.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Maputo Seafood & Peri-Peri Food Tour', slug: 'maputo-seafood-tour', category: 'FOOD_DRINK', description: 'Feast on Maputo\'s legendary prawns, peri-peri chicken, and Mozambican-Portuguese flavours with a local guide.', price: 45, duration: '3 hours', groupSizeMax: 10 },
    { name: 'Inhaca Island Snorkel Day Trip', slug: 'maputo-inhaca-island', category: 'OUTDOOR_ADVENTURE', description: 'A boat trip across Maputo Bay to Inhaca Island for snorkelling, marine reserve reefs, and fresh seafood.', price: 70, duration: 'Full day', groupSizeMax: 12 },
  ],
  'tofo': [
    { name: 'Whale Shark & Manta Ocean Safari', slug: 'tofo-whale-shark-safari', category: 'OUTDOOR_ADVENTURE', description: 'A boat safari off Tofo to snorkel with whale sharks and manta rays — among the best places on Earth to see them year-round.', price: 70, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Tofo Scuba Diving Two-Tank Trip', slug: 'tofo-scuba-diving', category: 'OUTDOOR_ADVENTURE', description: 'Dive Tofo\'s famous reefs and Manta Reef — mantas, turtles, and rich Indian Ocean marine life for certified divers.', price: 90, duration: 'Half day', groupSizeMax: 8, difficulty: 'moderate' },
    { name: 'Dhow Sunset Cruise & Seafood', slug: 'tofo-dhow-sunset', category: 'NIGHTLIFE_SOCIAL', description: 'Sail a traditional dhow off Tofo at sunset with drinks and grilled seafood as the Indian Ocean turns gold.', price: 40, duration: 'Evening', groupSizeMax: 12 },
  ],
  'ilha-de-mocambique': [
    { name: 'Ilha Stone Town Heritage Walk', slug: 'ilha-stone-town-walk', category: 'ARTS_CULTURE', description: 'A guided walk through the UNESCO island — the Palace Museum, the Fort of São Sebastião, and centuries of trade history.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Goa Island Dhow & Lighthouse Trip', slug: 'ilha-goa-island', category: 'OUTDOOR_ADVENTURE', description: 'A dhow trip to nearby Goa Island for snorkelling, the old lighthouse, and pristine Indian Ocean sandbanks.', price: 45, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Macuti Town & Island Life Tour', slug: 'ilha-macuti-town', category: 'ARTS_CULTURE', description: 'Explore the lived-in reed-house half of the island — markets, fishing, and the everyday culture of Ilha.', price: 25, duration: 'Half day', groupSizeMax: 12 },
  ],
  'vilanculos': [
    { name: 'Bazaruto Archipelago Dhow Safari', slug: 'vilanculos-bazaruto-dhow', category: 'OUTDOOR_ADVENTURE', description: 'A traditional dhow safari to the Bazaruto islands — towering dunes, snorkelling reefs, and dugong-rich turquoise seas.', price: 90, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Two-Mile Reef Snorkel Trip', slug: 'vilanculos-two-mile-reef', category: 'OUTDOOR_ADVENTURE', description: 'Boat out to the Two-Mile Reef in Bazaruto National Park for some of the Indian Ocean\'s best snorkelling.', price: 70, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Vilanculos Sunset Dhow Cruise', slug: 'vilanculos-sunset-dhow', category: 'NIGHTLIFE_SOCIAL', description: 'A relaxed sunset dhow cruise across the bay with drinks as the sky and water blaze over the archipelago.', price: 35, duration: 'Evening', groupSizeMax: 12 },
  ],
  'pemba': [
    { name: 'Quirimbas Archipelago Day Trip', slug: 'pemba-quirimbas-trip', category: 'OUTDOOR_ADVENTURE', description: 'A boat trip toward the untouched Quirimbas islands — coral reefs, mangroves, and the wild beauty of the far north.', price: 90, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Wimbe Reef Diving & Snorkel', slug: 'pemba-wimbe-diving', category: 'OUTDOOR_ADVENTURE', description: 'Dive or snorkel the reef right off Wimbe Beach in Pemba\'s vast bay — colourful coral and abundant marine life.', price: 75, duration: 'Half day', groupSizeMax: 8, difficulty: 'moderate' },
    { name: 'Makonde Carving & Culture Tour', slug: 'pemba-makonde-culture', category: 'ARTS_CULTURE', description: 'Discover the Makonde people of northern Mozambique — their famous blackwood carving tradition and culture.', price: 30, duration: 'Half day', groupSizeMax: 10 },
  ],
};

seed({ SPOTS, EXPERIENCES }).catch((e) => { console.error(e.message); process.exit(1); });
