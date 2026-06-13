// Caribbean batch 2: Haiti, Barbados, Trinidad & Tobago (15 cities)
const { seed } = require('./_content-seed-helper');

const SPOTS = {
  // Haiti
  'cap-haitien': [
    { name: 'Citadelle Laferrière', category: 'culture', description: 'Massive mountaintop fortress built after Haiti\'s independence, a UNESCO World Heritage Site with sweeping views.', costLevel: 'BUDGET', address: 'Milot, near Cap-Haïtien' },
    { name: 'Marché de Fer Cap', category: 'food', description: 'Iron Market of Cap-Haïtien packed with local produce, street food, and crafts.', costLevel: 'BUDGET', address: 'Cap-Haïtien City Center' },
    { name: 'Labadie Beach (local side)', category: 'nature', description: 'The Haitian public beach beside the famous cruise stop, free and beautifully remote.', costLevel: 'BUDGET', address: 'Labadie Peninsula' },
  ],
  'jacmel': [
    { name: 'Bas-Bleu Waterfall', category: 'nature', description: 'Three-tiered jungle waterfall reached by a scenic hike from Jacmel — perfect swimming holes at each level.', costLevel: 'BUDGET', address: 'Jacmel Mountains' },
    { name: 'Jacmel Iron Market', category: 'culture', description: 'Historic cast-iron market filled with papier-mâché masks, Haitian paintings, and artisan crafts unique to Jacmel.', costLevel: 'BUDGET', address: 'Marché de Fer, Jacmel' },
    { name: 'Cyvadier Beach', category: 'nature', description: 'Quiet cove beach outside Jacmel with calm turquoise water and a handful of local guesthouses nearby.', costLevel: 'BUDGET', address: 'Cyvadier, Jacmel' },
  ],
  'labadee': [
    { name: 'Labadee Public Shore', category: 'nature', description: 'Local side of the Labadee peninsula with uncrowded white sand and crystal-clear water.', costLevel: 'BUDGET', address: 'Labadee, Nord Department' },
    { name: 'Lakou Lakay Cultural Village', category: 'culture', description: 'Community cultural space in Cap-Haïtien area preserving Vodou ceremonies, traditional dance, and oral history.', costLevel: 'BUDGET', address: 'Cap-Haïtien' },
    { name: 'Nord Coast Seafood Shacks', category: 'food', description: 'Row of open-air eateries along the coast serving grilled fish, lambi (conch), and pikliz.', costLevel: 'BUDGET', address: 'Coastal Road, Labadee Area' },
  ],
  'petion-ville': [
    { name: 'Place Boyer', category: 'culture', description: 'Leafy public square in the heart of Pétion-Ville lined with cafés and a weekend craft market.', costLevel: 'BUDGET', address: 'Place Boyer, Pétion-Ville' },
    { name: 'Galerie Monnin', category: 'culture', description: 'Premier Haitian contemporary art gallery exhibiting bold primitivist and modern work from Haiti\'s finest painters.', costLevel: 'BUDGET', address: 'Rue Lamarre, Pétion-Ville' },
    { name: 'La Souvenance Restaurant', category: 'food', description: 'Elegant Haitian cuisine in a restored colonial house — griot, tasso cabrit, and rum sours.', costLevel: 'MID_RANGE', address: 'Pétion-Ville' },
  ],
  'port-au-prince': [
    { name: 'Musée du Panthéon National (MUPANAH)', category: 'culture', description: 'Underground museum housing Haiti\'s national treasures including the anchor of Columbus\'s Santa María.', costLevel: 'BUDGET', address: 'Champ de Mars, Port-au-Prince' },
    { name: 'Marché en Fer (Iron Market)', category: 'food', description: 'Iconic red-and-turquoise iron market rebuilt after 2010 — crafts, art, spices, and street food all in one.', costLevel: 'BUDGET', address: 'Boulevard Jean-Jacques Dessalines' },
    { name: 'Oloffson Hotel Bar', category: 'nightlife', description: 'Gothic gingerbread mansion turned legendary hotel bar — Thursday night RAM band performances and strong rum punch.', costLevel: 'MID_RANGE', address: 'Rue Capois, Port-au-Prince' },
  ],

  // Barbados
  'bathsheba': [
    { name: 'Soup Bowl Surf Spot', category: 'nature', description: 'World-class Atlantic surf break — dramatic mushroom rocks, crashing waves, great for watching even if not surfing.', costLevel: 'BUDGET', address: 'Bathsheba Beach, St. Joseph' },
    { name: 'Andromeda Botanic Gardens', category: 'nature', description: 'Six-acre hillside garden with palms, orchids, heliconias, and sweeping views of the Atlantic coastline.', costLevel: 'BUDGET', address: 'Bathsheba, St. Joseph' },
    { name: 'Round House Restaurant', category: 'food', description: 'Clifftop restaurant above Bathsheba Beach serving flying fish, cou-cou, and local rum cocktails with ocean views.', costLevel: 'MID_RANGE', address: 'Bathsheba, St. Joseph' },
  ],
  'bridgetown': [
    { name: 'Garrison Savannah & Historic Area', category: 'culture', description: 'UNESCO-listed colonial garrison with a racetrack, cannons, and the Barbados Museum inside a former military prison.', costLevel: 'BUDGET', address: 'Garrison, Bridgetown' },
    { name: 'Cheapside Market', category: 'food', description: 'Bustling produce and street food market in central Bridgetown — try roti, fish cakes, and fresh coconut water.', costLevel: 'BUDGET', address: 'Cheapside, Bridgetown' },
    { name: 'Harbour Lights Beach Bar', category: 'nightlife', description: 'Famous open-air beach bar on Carlisle Bay with weekly all-inclusive beach parties and live calypso.', costLevel: 'MID_RANGE', address: 'Bay Street, Bridgetown' },
  ],
  'holetown': [
    { name: 'Folkestone Marine Park', category: 'nature', description: 'Protected reef with snorkeling trail, resident sea turtles, and a sunken ship — free public access from the beach.', costLevel: 'BUDGET', address: 'Church Point, Holetown' },
    { name: 'Limegrove Lifestyle Centre', category: 'culture', description: 'Open-air luxury mall with boutique shopping, art galleries, and upscale dining in the heart of Holetown.', costLevel: 'MID_RANGE', address: 'Highway 1, Holetown' },
    { name: 'The Tides Restaurant', category: 'food', description: 'Award-winning fine dining on the waterfront — fresh catch, creative Caribbean-fusion plates, and an exceptional wine list.', costLevel: 'EXPENSIVE', address: 'Holetown, St. James' },
  ],
  'oistins': [
    { name: 'Oistins Fish Fry', category: 'food', description: 'Barbados\'s most beloved Friday night tradition — grilled marlin, mahi-mahi, rum punches, and soca music until midnight.', costLevel: 'BUDGET', address: 'Oistins Bay Gardens, Christ Church' },
    { name: 'Miami Beach (Enterprise Beach)', category: 'nature', description: 'Calm, locals\' beach south of Oistins with shallow turquoise water, kite surfers, and food trucks on weekends.', costLevel: 'BUDGET', address: 'Enterprise Beach Road, Oistins' },
    { name: 'Surfer\'s Point', category: 'nature', description: 'Southern tip surf break good for intermediate surfers with consistent Atlantic swell and a laid-back vibe.', costLevel: 'BUDGET', address: 'Inch Marlow, Christ Church' },
  ],
  'speightstown': [
    { name: 'Ariel Sands Beach', category: 'nature', description: 'Quiet north coast beach near Speightstown — reef-calm waters, good snorkeling, and almost no crowds.', costLevel: 'BUDGET', address: 'North of Speightstown, St. Peter' },
    { name: 'Arlington House Museum', category: 'culture', description: 'Three-floor interactive museum in a restored Georgian merchant house telling Speightstown\'s trading-port history.', costLevel: 'BUDGET', address: 'Queen Street, Speightstown' },
    { name: 'Fish Net Restaurant', category: 'food', description: 'Waterfront seafood spot in the old port district — fresh catch of the day, salt fish, and Banks beer.', costLevel: 'BUDGET', address: 'Speightstown Esplanade, St. Peter' },
  ],

  // Trinidad & Tobago
  'asa-wright': [
    { name: 'Asa Wright Nature Centre', category: 'nature', description: 'World-renowned birdwatching lodge in a rainforest valley — 200+ species visible from the verandah alone.', costLevel: 'MID_RANGE', address: 'Blanchisseuse Road, Arima' },
    { name: 'Oilbird Cave at Dunston Cave', category: 'nature', description: 'Rare chance to observe nesting oilbirds — nocturnal cave-dwellers unique to Trinidad — on guided night walks.', costLevel: 'MID_RANGE', address: 'Asa Wright Nature Centre' },
    { name: 'Arima Market', category: 'food', description: 'Local town market near the nature centre — doubles, bake and shark, and fresh tropical juice from vendors.', costLevel: 'BUDGET', address: 'Arima Town, Trinidad' },
  ],
  'crown-point': [
    { name: 'Store Bay Beach', category: 'nature', description: 'Tobago\'s most popular beach — calm, clean, and dotted with food shacks serving crab and dumplings.', costLevel: 'BUDGET', address: 'Store Bay, Crown Point, Tobago' },
    { name: 'Nylon Pool', category: 'nature', description: 'Natural shallow sandbar in the middle of the Caribbean Sea — legend says bathing here takes years off your age.', costLevel: 'BUDGET', address: 'Offshore Crown Point, Tobago' },
    { name: 'Buccoo Reef', category: 'nature', description: 'Protected coral reef and sea-grass lagoon reached by glass-bottom boat from Crown Point.', costLevel: 'BUDGET', address: 'Buccoo, Tobago' },
  ],
  'maracas-bay': [
    { name: 'Maracas Bay Beach', category: 'nature', description: 'Trinidad\'s most iconic beach — dramatic valley backdrop, crashing surf, and an on-site outdoor shower.', costLevel: 'BUDGET', address: 'Maracas Bay, St. George' },
    { name: 'Richard\'s Bake & Shark', category: 'food', description: 'The definitive bake and shark stand at Maracas — crispy fried shark in fried bread with every topping imaginable.', costLevel: 'BUDGET', address: 'Maracas Beach, North Coast Road' },
    { name: 'Las Cuevas Beach', category: 'nature', description: 'Quieter beach 20 minutes east of Maracas with calmer waves, a river mouth, and thick jungle backdrop.', costLevel: 'BUDGET', address: 'Las Cuevas, North Coast' },
  ],
  'port-of-spain': [
    { name: 'Queen\'s Park Savannah', category: 'nature', description: 'Massive open green in the city centre — joggers, street food vendors, "Magnificent Seven" colonial mansions on the perimeter.', costLevel: 'BUDGET', address: 'Queen\'s Park Savannah, Port of Spain' },
    { name: 'National Museum & Art Gallery', category: 'culture', description: 'Trinidad\'s main museum with Carnival history, natural history, and fine art collections under one roof.', costLevel: 'BUDGET', address: '117 Frederick Street, Port of Spain' },
    { name: 'Carnival Jump-Up at Ariapita Avenue', category: 'nightlife', description: 'Ariapita Ave (the Avenue) is the heart of Port of Spain nightlife — rum bars, live soca, and all-night lime.', costLevel: 'MID_RANGE', address: 'Ariapita Avenue, Woodbrook' },
  ],
  'speyside-tobago': [
    { name: 'Speyside Snorkeling & Manta Ray Point', category: 'nature', description: 'Tobago\'s best dive/snorkel site — giant manta rays, brain coral, and pristine reefs just offshore.', costLevel: 'MID_RANGE', address: 'Speyside Bay, Tobago' },
    { name: 'Little Tobago Island (Bird of Paradise Island)', category: 'nature', description: 'Uninhabited island sanctuary for seabirds reached by short boat ride — frigatebirds, boobies, and red-billed tropicbirds.', costLevel: 'BUDGET', address: 'Offshore Speyside, Tobago' },
    { name: 'Jemma\'s Seaview Kitchen', category: 'food', description: 'Famous treehouse restaurant over the water — curried crab, stewed chicken, and pelau served with a stunning bay view.', costLevel: 'BUDGET', address: 'Speyside Village, Tobago' },
  ],
};

const EXPERIENCES = {
  // Haiti
  'cap-haitien': [
    { title: 'Citadelle & Sans-Souci Palace Day Trek', category: 'OUTDOOR_ADVENTURE', description: 'Hike or ride horseback to the Citadelle Laferrière and visit the ruined Sans-Souci Palace — a full-day UNESCO World Heritage excursion.', price: 25, priceRange: 'BUDGET', duration: '6 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/cap-haitien-l104/?partner_id=CDE4NF2' },
    { title: 'Cap-Haïtien Street Food Walking Tour', category: 'FOOD_DRINK', description: 'Explore local markets and street vendors tasting pikliz, griot, akra fritters, and freshly pressed sugarcane juice.', price: 20, priceRange: 'BUDGET', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/cap-haitien-l104/?partner_id=CDE4NF2' },
    { title: 'Labadie Peninsula Kayaking', category: 'OUTDOOR_ADVENTURE', description: 'Paddle the calm waters of the Labadie peninsula, exploring sea caves and mangrove channels with a local guide.', price: 30, priceRange: 'BUDGET', duration: '2.5 hours', groupSizeMin: 1, groupSizeMax: 6, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/cap-haitien-l104/?partner_id=CDE4NF2' },
  ],
  'jacmel': [
    { title: 'Papier-Mâché Mask Workshop', category: 'ARTS_CULTURE', description: 'Learn the craft Jacmel is famous for — create your own Carnival papier-mâché mask in a local artisan\'s studio.', price: 35, priceRange: 'BUDGET', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/jacmel-l105/?partner_id=CDE4NF2' },
    { title: 'Bas-Bleu Waterfall Hike', category: 'OUTDOOR_ADVENTURE', description: 'Trek through jungle trails to three cascading waterfalls with natural swimming pools — a refreshing half-day adventure.', price: 20, priceRange: 'BUDGET', duration: '4 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/jacmel-l105/?partner_id=CDE4NF2' },
    { title: 'Jacmel Historic Architecture Walk', category: 'ARTS_CULTURE', description: 'Stroll past Victorian gingerbread houses and colonial buildings with a local historian — Jacmel\'s architectural heritage is unique in the Caribbean.', price: 15, priceRange: 'BUDGET', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/jacmel-l105/?partner_id=CDE4NF2' },
  ],
  'labadee': [
    { title: 'Local Fishermen Boat Trip', category: 'OUTDOOR_ADVENTURE', description: 'Join local fishermen on an early morning boat trip along the northern coast — snorkeling and fresh catch lunch included.', price: 30, priceRange: 'BUDGET', duration: '5 hours', groupSizeMin: 1, groupSizeMax: 6, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/cap-haitien-l104/?partner_id=CDE4NF2' },
    { title: 'Vodou Heritage & Culture Tour', category: 'ARTS_CULTURE', description: 'Respectful, community-led introduction to Haitian Vodou — history, ceremony spaces, and the role of Vodou in Haitian identity.', price: 40, priceRange: 'BUDGET', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/cap-haitien-l104/?partner_id=CDE4NF2' },
    { title: 'Haitian Creole Cooking Class', category: 'FOOD_DRINK', description: 'Cook griot, pikliz, and rice with peas in a local home kitchen — eat together and take the recipe cards home.', price: 35, priceRange: 'BUDGET', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/cap-haitien-l104/?partner_id=CDE4NF2' },
  ],
  'petion-ville': [
    { title: 'Haitian Art Gallery Crawl', category: 'ARTS_CULTURE', description: 'Visit three top galleries in Pétion-Ville including Galerie Monnin — meet artists and understand Haiti\'s rich visual art tradition.', price: 20, priceRange: 'BUDGET', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/port-au-prince-l97/?partner_id=CDE4NF2' },
    { title: 'Boutilliers Mountain Sunset Hike', category: 'OUTDOOR_ADVENTURE', description: 'Hike to the Boutilliers overlook above Pétion-Ville for panoramic views of Port-au-Prince and the Bay of Gonâve at sunset.', price: 25, priceRange: 'BUDGET', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/port-au-prince-l97/?partner_id=CDE4NF2' },
    { title: 'Rum & Rhum Barbancourt Tasting', category: 'FOOD_DRINK', description: 'Visit Barbancourt rum distillery (30 min from Pétion-Ville) and taste Haiti\'s award-winning rum — 5-star and reserve expressions.', price: 30, priceRange: 'BUDGET', duration: '2.5 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/port-au-prince-l97/?partner_id=CDE4NF2' },
  ],
  'port-au-prince': [
    { title: 'MUPANAH & Champ de Mars History Tour', category: 'ARTS_CULTURE', description: 'Explore Haiti\'s national museum and the historic Champ de Mars square with a historian guide — revolution, independence, and Haiti\'s founding story.', price: 25, priceRange: 'BUDGET', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/port-au-prince-l97/?partner_id=CDE4NF2' },
    { title: 'Iron Market Street Food Crawl', category: 'FOOD_DRINK', description: 'Navigate the Iron Market with a guide tasting Haitian street classics — fritay, bannann peze, and fresh pineapple juice.', price: 20, priceRange: 'BUDGET', duration: '2.5 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/port-au-prince-l97/?partner_id=CDE4NF2' },
    { title: 'RAM Thursdays at the Oloffson', category: 'ARTS_CULTURE', description: 'Experience Haiti\'s most iconic weekly live music night — RAM\'s roots/Vodou/rock fusion in the legendary gingerbread hotel garden.', price: 15, priceRange: 'BUDGET', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 20, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/port-au-prince-l97/?partner_id=CDE4NF2' },
  ],

  // Barbados
  'bathsheba': [
    { title: 'Soup Bowl Surf Lesson', category: 'OUTDOOR_ADVENTURE', description: 'Learn to surf at Barbados\'s world-famous Atlantic break — lessons for all skill levels with certified local instructors.', price: 75, priceRange: 'MID', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 4, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/bathsheba-l4163/?partner_id=CDE4NF2' },
    { title: 'East Coast Hike & Rock Pool Exploration', category: 'OUTDOOR_ADVENTURE', description: 'Guided coastal walk along Barbados\'s rugged Atlantic shore — mushroom rocks, blowholes, and natural rock pools.', price: 40, priceRange: 'BUDGET', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/bathsheba-l4163/?partner_id=CDE4NF2' },
    { title: 'Andromeda Gardens Botanical Tour', category: 'ARTS_CULTURE', description: 'Guided walk through Andromeda Botanic Gardens with a horticulturalist — 600+ plant species and sweeping Atlantic views.', price: 25, priceRange: 'BUDGET', duration: '1.5 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/bathsheba-l4163/?partner_id=CDE4NF2' },
  ],
  'bridgetown': [
    { title: 'Bridgetown Historic Garrison Walking Tour', category: 'ARTS_CULTURE', description: 'UNESCO-guided walk through the Garrison Historic Area — canons, military buildings, and the Barbados Museum.', price: 30, priceRange: 'BUDGET', duration: '2.5 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/bridgetown-l1213/?partner_id=CDE4NF2' },
    { title: 'West Coast Catamaran & Snorkel Cruise', category: 'OUTDOOR_ADVENTURE', description: 'Sail Barbados\'s calm Caribbean coast on a catamaran — snorkel with sea turtles and enjoy an open bar with rum punch.', price: 110, priceRange: 'MID', duration: '4 hours', groupSizeMin: 1, groupSizeMax: 30, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/bridgetown-l1213/?partner_id=CDE4NF2' },
    { title: 'Mount Gay Rum Distillery Tour', category: 'FOOD_DRINK', description: 'Tour the world\'s oldest rum distillery (est. 1703) — production walk, tasting flight, and cocktail-making session.', price: 45, priceRange: 'BUDGET', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 15, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/bridgetown-l1213/?partner_id=CDE4NF2' },
  ],
  'holetown': [
    { title: 'Folkestone Reef Snorkel Tour', category: 'OUTDOOR_ADVENTURE', description: 'Guided snorkel through the Folkestone Marine Park reef trail — spot sea turtles, parrotfish, and a sunken tugboat.', price: 35, priceRange: 'BUDGET', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/holetown-l4167/?partner_id=CDE4NF2' },
    { title: 'Stand-Up Paddleboard on the West Coast', category: 'OUTDOOR_ADVENTURE', description: 'SUP along the tranquil Caribbean shore north of Holetown — calm conditions make this ideal for beginners.', price: 50, priceRange: 'MID', duration: '1.5 hours', groupSizeMin: 1, groupSizeMax: 6, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/holetown-l4167/?partner_id=CDE4NF2' },
    { title: 'Holetown Festival Heritage Walk', category: 'ARTS_CULTURE', description: 'Walk the site of the first English settlement in Barbados (1627) with a historian — St. James Church, the First Landing Monument, and colonial history.', price: 20, priceRange: 'BUDGET', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/holetown-l4167/?partner_id=CDE4NF2' },
  ],
  'oistins': [
    { title: 'Oistins Fish Fry Friday Night Experience', category: 'FOOD_DRINK', description: 'Join locals at the famous Oistins Fish Fry — grilled catch, Banks beer, rum punch, and soca music every Friday night.', price: 20, priceRange: 'BUDGET', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 20, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/oistins-l4168/?partner_id=CDE4NF2' },
    { title: 'South Coast Kitesurfing Lesson', category: 'OUTDOOR_ADVENTURE', description: 'Learn to kitesurf on the south coast\'s consistent trade winds — beginner lessons on flat water near Oistins.', price: 90, priceRange: 'MID', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 3, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/oistins-l4168/?partner_id=CDE4NF2' },
    { title: 'South Coast Coastal Walk to Miami Beach', category: 'OUTDOOR_ADVENTURE', description: 'Guided walk along Barbados\'s south coast boardwalk from Oistins to Miami Beach — local commentary on marine life and beach culture.', price: 15, priceRange: 'BUDGET', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/oistins-l4168/?partner_id=CDE4NF2' },
  ],
  'speightstown': [
    { title: 'North Coast Snorkel & Sea Turtle Swim', category: 'OUTDOOR_ADVENTURE', description: 'Snorkel the calm reefs north of Speightstown — hawksbill sea turtles are regular residents here.', price: 40, priceRange: 'BUDGET', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/speightstown-l4169/?partner_id=CDE4NF2' },
    { title: 'Arlington House Museum Guided Tour', category: 'ARTS_CULTURE', description: 'Explore Speightstown\'s trading history through the three-floor interactive Arlington House Museum — Bajan heritage and merchant-port stories.', price: 15, priceRange: 'BUDGET', duration: '1.5 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/speightstown-l4169/?partner_id=CDE4NF2' },
    { title: 'Speightstown Seafood & Fishing Village Walk', category: 'FOOD_DRINK', description: 'Walk the old fishing port with a guide — meet fishermen, taste flying fish at a local shop, and learn about Bajan fishing traditions.', price: 25, priceRange: 'BUDGET', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/speightstown-l4169/?partner_id=CDE4NF2' },
  ],

  // Trinidad & Tobago
  'asa-wright': [
    { title: 'Dawn Birdwatching at Asa Wright Nature Centre', category: 'OUTDOOR_ADVENTURE', description: 'Pre-dawn guided walk through the rainforest to catch Trinidad\'s most spectacular birdlife — toucans, hummingbirds, and rare manakins.', price: 60, priceRange: 'MID', duration: '4 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/arima-l4170/?partner_id=CDE4NF2' },
    { title: 'Oilbird Cave Night Excursion', category: 'OUTDOOR_ADVENTURE', description: 'Guided night walk to the oilbird cave — hear and see these extraordinary cave-dwelling birds found almost nowhere else in the world.', price: 45, priceRange: 'BUDGET', duration: '2.5 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/arima-l4170/?partner_id=CDE4NF2' },
    { title: 'Rainforest Ecology Guided Walk', category: 'OUTDOOR_ADVENTURE', description: 'Walk a forested trail learning about Trinidad\'s unique biodiversity — medicinal plants, reptiles, and rainforest ecology.', price: 35, priceRange: 'BUDGET', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/arima-l4170/?partner_id=CDE4NF2' },
  ],
  'crown-point': [
    { title: 'Glass-Bottom Boat to Nylon Pool & Buccoo Reef', category: 'OUTDOOR_ADVENTURE', description: 'Classic Tobago excursion — boat to the famous shallow Nylon Pool sandbar and snorkel the Buccoo Reef coral gardens.', price: 50, priceRange: 'MID', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 20, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/crown-point-l4171/?partner_id=CDE4NF2' },
    { title: 'Tobago Kitesurfing Lesson', category: 'OUTDOOR_ADVENTURE', description: 'Pigeon Point\'s flat-water lagoon is one of the Caribbean\'s best kitesurfing spots — beginner-friendly lessons available.', price: 85, priceRange: 'MID', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 3, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/crown-point-l4171/?partner_id=CDE4NF2' },
    { title: 'Sunset Cruise from Pigeon Point', category: 'OUTDOOR_ADVENTURE', description: 'Sail the calm Caribbean coast at sunset with rum punch and steel pan music — a perfect Tobago evening.', price: 65, priceRange: 'MID', duration: '2.5 hours', groupSizeMin: 1, groupSizeMax: 20, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/crown-point-l4171/?partner_id=CDE4NF2' },
  ],
  'maracas-bay': [
    { title: 'North Coast Scenic Drive & Beach Hop', category: 'OUTDOOR_ADVENTURE', description: 'Guided drive along Trinidad\'s dramatic northern mountain coast — Maracas, Las Cuevas, and Blanchisseuse beaches in one day.', price: 55, priceRange: 'MID', duration: '6 hours', groupSizeMin: 1, groupSizeMax: 6, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/maracas-bay-l4172/?partner_id=CDE4NF2' },
    { title: 'Bake & Shark Tasting Tour', category: 'FOOD_DRINK', description: 'The ultimate Maracas ritual — taste multiple vendors\' versions of bake and shark with every topping and debate which is best.', price: 25, priceRange: 'BUDGET', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/maracas-bay-l4172/?partner_id=CDE4NF2' },
    { title: 'Maracas Valley Waterfall Hike', category: 'OUTDOOR_ADVENTURE', description: 'Trek through the Maracas Valley forest above the beach to a hidden waterfall — birds, butterflies, and a refreshing dip await.', price: 35, priceRange: 'BUDGET', duration: '3.5 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/maracas-bay-l4172/?partner_id=CDE4NF2' },
  ],
  'port-of-spain': [
    { title: 'Carnival & Soca Culture Walking Tour', category: 'ARTS_CULTURE', description: 'Explore Port of Spain\'s Carnival heritage — mas camps, pan yards, and costume designers with a local guide who\'s played mas for 20 years.', price: 40, priceRange: 'BUDGET', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/port-of-spain-l1047/?partner_id=CDE4NF2' },
    { title: 'Savannah Street Food Crawl', category: 'FOOD_DRINK', description: 'Evening stroll around Queen\'s Park Savannah sampling doubles, aloo pie, phulouri, and sugar cake from the famous food vendors.', price: 30, priceRange: 'BUDGET', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/port-of-spain-l1047/?partner_id=CDE4NF2' },
    { title: 'Maracas & Asa Wright Day Trip from PoS', category: 'OUTDOOR_ADVENTURE', description: 'Combined day trip north — swim at Maracas Beach, hike to a waterfall, then birdwatch at Asa Wright Nature Centre.', price: 80, priceRange: 'MID', duration: '9 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/port-of-spain-l1047/?partner_id=CDE4NF2' },
  ],
  'speyside-tobago': [
    { title: 'Manta Ray Snorkel at Japanese Gardens', category: 'OUTDOOR_ADVENTURE', description: 'Snorkel Tobago\'s most spectacular reef site — giant Atlantic manta rays, eagle rays, and pristine coral at Japanese Gardens.', price: 55, priceRange: 'MID', duration: '2.5 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/speyside-l4173/?partner_id=CDE4NF2' },
    { title: 'Little Tobago Bird Island Boat Trip', category: 'OUTDOOR_ADVENTURE', description: 'Boat to uninhabited Little Tobago island to observe nesting seabirds — red-billed tropicbirds, frigatebirds, and red-footed boobies.', price: 45, priceRange: 'BUDGET', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/speyside-l4173/?partner_id=CDE4NF2' },
    { title: 'Speyside to Charlotteville Coastal Walk', category: 'OUTDOOR_ADVENTURE', description: 'Trek Tobago\'s rainforest-fringed north coast from Speyside to the remote fishing village of Charlotteville — dramatic cliffs and hidden coves.', price: 40, priceRange: 'BUDGET', duration: '4 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/speyside-l4173/?partner_id=CDE4NF2' },
  ],
};

seed({ SPOTS, EXPERIENCES })
  .then(() => process.exit(0))
  .catch((e) => { console.error(e); process.exit(1); });
