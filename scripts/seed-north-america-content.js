// North America content: Canada (Banff, Montreal, Quebec City, Toronto, Vancouver) + USA (Nashville, New Mexico, New Orleans, San Francisco)
// NYC and Portland already have content — skip those
const { seed } = require('./_content-seed-helper');

const SPOTS = {
  // Canada
  'banff': [
    { name: 'Lake Louise', category: 'nature', description: 'Iconic glacier-fed lake with impossibly turquoise water ringed by soaring peaks — best visited at dawn before crowds arrive.', costLevel: 'BUDGET', address: 'Lake Louise, Banff National Park, AB' },
    { name: 'Banff Upper Hot Springs', category: 'wellness', description: 'Historic mountaintop mineral pool open year-round — soak in 38°C water with views of Mount Rundle and Sulphur Mountain.', costLevel: 'BUDGET', address: 'Mountain Ave, Banff, AB' },
    { name: 'The Bison Restaurant & Terrace', category: 'food', description: 'Mountain-farm cuisine in a warm stone building — elk carpaccio, bison burgers, and local craft beer on the terrace.', costLevel: 'MID_RANGE', address: '211 Bear St, Banff, AB' },
  ],
  'montreal': [
    { name: 'Plateau-Mont-Royal Neighbourhood', category: 'culture', description: 'Montreal\'s most vibrant neighbourhood — colourful outdoor staircases, indie cafés, vintage shops, and murals around every corner.', costLevel: 'BUDGET', address: 'Plateau-Mont-Royal, Montreal, QC' },
    { name: 'Jean-Talon Market', category: 'food', description: 'North America\'s largest open-air market — Quebec cheese, fresh pasta, maple products, and the best smoked meat sandwiches in the city.', costLevel: 'BUDGET', address: '7070 Ave Henri-Julien, Montreal, QC' },
    { name: 'Mount Royal Park', category: 'nature', description: 'Olmsted-designed mountain park in the heart of Montreal — summer hiking, winter cross-country skiing, and sweeping city views from the chalet belvedere.', costLevel: 'BUDGET', address: 'Parc du Mont-Royal, Montreal, QC' },
  ],
  'quebec-city': [
    { name: 'Vieux-Québec (Old Town)', category: 'culture', description: 'North America\'s only walled city north of Mexico — cobblestone streets, 17th-century buildings, and the fortress walls all free to walk.', costLevel: 'BUDGET', address: 'Vieux-Québec, Quebec City, QC' },
    { name: 'Château Frontenac Terrace Dufferin', category: 'culture', description: 'The wooden boardwalk promenade beside the famous château — panoramic views over the St. Lawrence River and Lower Town below.', costLevel: 'BUDGET', address: 'Terrasse Dufferin, Quebec City, QC' },
    { name: 'Aux Anciens Canadiens', category: 'food', description: 'Quebec\'s most historic restaurant inside a 1677 house — tourtière, pea soup, and maple sugar pie in a heritage atmosphere.', costLevel: 'MID_RANGE', address: '34 Rue Saint-Louis, Quebec City, QC' },
  ],
  'toronto': [
    { name: 'Kensington Market', category: 'culture', description: 'Eclectic bohemian neighbourhood of vintage shops, global food vendors, and live music — Toronto\'s most colourful few blocks.', costLevel: 'BUDGET', address: 'Kensington Market, Toronto, ON' },
    { name: 'Distillery District', category: 'culture', description: 'Beautifully preserved Victorian industrial complex turned pedestrian arts village — galleries, artisan shops, restaurants, and weekend markets.', costLevel: 'BUDGET', address: 'Distillery District, Toronto, ON' },
    { name: 'St. Lawrence Market', category: 'food', description: 'One of the world\'s great food markets — the iconic peameal bacon sandwich at Carousel Bakery is non-negotiable.', costLevel: 'BUDGET', address: '93 Front St E, Toronto, ON' },
  ],
  'vancouver': [
    { name: 'Stanley Park Seawall', category: 'nature', description: '9 km paved path circling the forested peninsula — walk or cycle with views of the inlet, mountains, and downtown skyline.', costLevel: 'BUDGET', address: 'Stanley Park, Vancouver, BC' },
    { name: 'Granville Island Public Market', category: 'food', description: 'Lively indoor market under the Granville Bridge — fresh seafood, BC cheeses, artisan bread, and local produce with buskers outside.', costLevel: 'BUDGET', address: '1669 Johnston St, Vancouver, BC' },
    { name: 'Gastown & Steam Clock', category: 'culture', description: 'Vancouver\'s oldest neighbourhood with cobblestone streets, Victorian architecture, craft cocktail bars, and the famous steam-powered clock.', costLevel: 'BUDGET', address: 'Gastown, Vancouver, BC' },
  ],

  // USA
  'nashville': [
    { name: 'Broadway Honky-Tonk Strip', category: 'nightlife', description: 'Nashville\'s legendary Lower Broadway — live country music pouring from every open door, free to walk in and out all night.', costLevel: 'BUDGET', address: 'Lower Broadway, Nashville, TN' },
    { name: 'Ryman Auditorium', category: 'culture', description: 'The "Mother Church of Country Music" — self-guided tours of the stunning 1892 tabernacle where the Grand Ole Opry was born.', costLevel: 'BUDGET', address: '116 5th Ave N, Nashville, TN' },
    { name: 'Prince\'s Hot Chicken Shack', category: 'food', description: 'The original Nashville hot chicken joint — cayenne-crusted bird on white bread with pickles, from mild to "Shut the Cluck Up" heat.', costLevel: 'BUDGET', address: '123 Ewing Dr, Nashville, TN' },
  ],
  'new-mexico': [
    { name: 'Old Town Albuquerque', category: 'culture', description: 'Historic pueblo-style plaza dating to 1706 — adobe galleries, turquoise jewellery shops, and New Mexican cuisine around a shaded square.', costLevel: 'BUDGET', address: 'Old Town Plaza, Albuquerque, NM' },
    { name: 'Meow Wolf Santa Fe', category: 'culture', description: 'Mind-bending immersive art installation — 70+ rooms of surreal, interconnected narrative environments inside a former bowling alley.', costLevel: 'MID_RANGE', address: '1352 Rufina Circle, Santa Fe, NM' },
    { name: 'White Sands National Park', category: 'nature', description: 'The world\'s largest gypsum dune field — vast, blindingly white dunes to hike, sled, and photograph at golden hour.', costLevel: 'BUDGET', address: 'White Sands National Park, NM' },
  ],
  'new-orleans': [
    { name: 'Frenchmen Street Live Music Row', category: 'nightlife', description: 'The local alternative to Bourbon Street — four blocks of jazz, blues, and brass band clubs with no cover most nights.', costLevel: 'BUDGET', address: 'Frenchmen Street, Marigny, New Orleans, LA' },
    { name: 'Café Du Monde', category: 'food', description: 'The iconic open-air café in Jackson Square — beignets buried in powdered sugar and café au lait with chicory since 1862, open 24/7.', costLevel: 'BUDGET', address: '800 Decatur St, New Orleans, LA' },
    { name: 'Garden District Walking Tour', category: 'culture', description: 'Stroll past antebellum mansions, Anne Rice\'s former home, and celebrity graves in Lafayette Cemetery — best as a self-guided walk.', costLevel: 'BUDGET', address: 'Garden District, New Orleans, LA' },
  ],
  'san-francisco': [
    { name: 'Mission Dolores Park', category: 'nature', description: 'Sunny hilltop park with panoramic skyline views — the quintessential San Francisco afternoon with local food carts and the whole city below.', costLevel: 'BUDGET', address: 'Dolores St & 19th St, San Francisco, CA' },
    { name: 'Ferry Building Marketplace', category: 'food', description: 'Gorgeous Beaux-Arts terminal turned gourmet food hall on the waterfront — Saturday farmers market is the best in the Bay Area.', costLevel: 'BUDGET', address: '1 Ferry Building, San Francisco, CA' },
    { name: 'Golden Gate Bridge Vista Point', category: 'nature', description: 'Walk across the bridge from the south side for free — the Marin Headlands viewpoint on the north is the best photo angle.', costLevel: 'BUDGET', address: 'Golden Gate Bridge, San Francisco, CA' },
  ],
};

const EXPERIENCES = {
  // Canada
  'banff': [
    { title: 'Lake Louise Canoe Rental', category: 'OUTDOOR_ADVENTURE', description: 'Paddle a canoe across the emerald waters of Lake Louise with Victoria Glacier reflected in the water ahead of you.', price: 115, priceRange: 'HIGH', duration: '1 hour', groupSizeMin: 1, groupSizeMax: 4, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/banff-l216/?partner_id=CDE4NF2' },
    { title: 'Banff Gondola & Sulphur Mountain Summit', category: 'OUTDOOR_ADVENTURE', description: 'Ride the gondola to the summit of Sulphur Mountain for 360° Rockies views — hike the ridgeline to the historic Sanson Peak meteorological station.', price: 60, priceRange: 'MID', duration: '2.5 hours', groupSizeMin: 1, groupSizeMax: 20, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/banff-l216/?partner_id=CDE4NF2' },
    { title: 'Icefields Parkway Scenic Drive Tour', category: 'OUTDOOR_ADVENTURE', description: 'Guided drive along one of the world\'s most spectacular highways — Athabasca Glacier, Peyto Lake, and Columbia Icefield in one day.', price: 180, priceRange: 'HIGH', duration: '10 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/banff-l216/?partner_id=CDE4NF2' },
  ],
  'montreal': [
    { title: 'Old Montreal Culinary Walking Tour', category: 'FOOD_DRINK', description: 'Taste poutine, smoked meat, bagels, and Quebec cheese while exploring the cobblestone streets of Vieux-Montréal with a foodie guide.', price: 75, priceRange: 'MID', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/montreal-l399/?partner_id=CDE4NF2' },
    { title: 'Mont Royal Cross-Country Ski or Snowshoe', category: 'OUTDOOR_ADVENTURE', description: 'Winter activity on Montreal\'s iconic mountain — ski or snowshoe through forested trails with city views at the belvedere.', price: 25, priceRange: 'BUDGET', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/montreal-l399/?partner_id=CDE4NF2' },
    { title: 'Montreal Street Art & Mile End Mural Tour', category: 'ARTS_CULTURE', description: 'Walk the Plateau and Mile End neighbourhoods with an artist-guide learning about Montreal\'s world-class mural festival and graffiti scene.', price: 35, priceRange: 'BUDGET', duration: '2.5 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/montreal-l399/?partner_id=CDE4NF2' },
  ],
  'quebec-city': [
    { title: 'Old Quebec City Walking Tour', category: 'ARTS_CULTURE', description: 'Guided walk through UNESCO-listed Old Quebec — Plains of Abraham, Château Frontenac, Petit-Champlain, and 400 years of living history.', price: 30, priceRange: 'BUDGET', duration: '2.5 hours', groupSizeMin: 1, groupSizeMax: 15, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/quebec-city-l396/?partner_id=CDE4NF2' },
    { title: 'Montmorency Falls Zipline & Walk', category: 'OUTDOOR_ADVENTURE', description: 'Zip across Canada\'s highest waterfall (higher than Niagara) then walk the suspension bridge and cliff-top trail above the falls.', price: 55, priceRange: 'MID', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/quebec-city-l396/?partner_id=CDE4NF2' },
    { title: 'Quebec Sugar Shack Maple Experience', category: 'FOOD_DRINK', description: 'Visit a traditional cabane à sucre — maple syrup production tour, tire sur neige (taffy on snow), and a full traditional meal.', price: 65, priceRange: 'MID', duration: '4 hours', groupSizeMin: 1, groupSizeMax: 20, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/quebec-city-l396/?partner_id=CDE4NF2' },
  ],
  'toronto': [
    { title: 'Kensington Market Food Tour', category: 'FOOD_DRINK', description: 'Taste your way through Toronto\'s most colourful neighbourhood — Jamaican patties, empanadas, cheese caves, and craft kombucha.', price: 70, priceRange: 'MID', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/toronto-l399/?partner_id=CDE4NF2' },
    { title: 'CN Tower EdgeWalk', category: 'OUTDOOR_ADVENTURE', description: 'Walk the outside ledge of the CN Tower at 356m — the world\'s highest full circle hands-free walk with a harness and spectacular views.', price: 225, priceRange: 'HIGH', duration: '1.5 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/toronto-l399/?partner_id=CDE4NF2' },
    { title: 'Toronto Islands Bike & Kayak Day', category: 'OUTDOOR_ADVENTURE', description: 'Ferry to the car-free Toronto Islands then explore by bike and kayak — quiet beaches, skyline views, and a wooden carousel.', price: 60, priceRange: 'MID', duration: '5 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/toronto-l399/?partner_id=CDE4NF2' },
  ],
  'vancouver': [
    { title: 'Sea to Sky Highway & Squamish Day Trip', category: 'OUTDOOR_ADVENTURE', description: 'Drive the stunning Sea to Sky Highway to Squamish — walk across the Skybridge gondola, hike Shannon Falls, and spot bald eagles.', price: 90, priceRange: 'MID', duration: '8 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/vancouver-l397/?partner_id=CDE4NF2' },
    { title: 'Stanley Park Guided Cycling Tour', category: 'OUTDOOR_ADVENTURE', description: 'Cycle the seawall with a guide — totem poles, Siwash Rock, Prospect Point, and harbour views with insider Haida and Squamish stories.', price: 55, priceRange: 'MID', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/vancouver-l397/?partner_id=CDE4NF2' },
    { title: 'Granville Island Food & Market Tour', category: 'FOOD_DRINK', description: 'Explore Granville Island with a guide — Public Market tastings, meet artisan producers, and sample BC cheese, charcuterie, and smoked salmon.', price: 60, priceRange: 'MID', duration: '2.5 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/vancouver-l397/?partner_id=CDE4NF2' },
  ],

  // USA
  'nashville': [
    { title: 'Country Music Hall of Fame Guided Tour', category: 'ARTS_CULTURE', description: 'Deep-dive tour of the world\'s largest popular music museum — platinum records, Elvis\'s gold Cadillac, and Taylor Swift\'s costumes.', price: 30, priceRange: 'BUDGET', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 15, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/nashville-l1200/?partner_id=CDE4NF2' },
    { title: 'Hot Chicken & Honky-Tonk Food Tour', category: 'FOOD_DRINK', description: 'Walk Lower Broadway tasting Nashville hot chicken, meat-and-three plates, and bourbon at local bars with a local music journalist guide.', price: 65, priceRange: 'MID', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/nashville-l1200/?partner_id=CDE4NF2' },
    { title: 'Ryman Auditorium Backstage Tour', category: 'ARTS_CULTURE', description: 'Go behind the curtain at the "Mother Church of Country Music" — dressing rooms, the stage, and the stories of every legend who played here.', price: 35, priceRange: 'BUDGET', duration: '1 hour', groupSizeMin: 1, groupSizeMax: 12, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/nashville-l1200/?partner_id=CDE4NF2' },
  ],
  'new-mexico': [
    { title: 'White Sands Sunset Hike & Photography', category: 'OUTDOOR_ADVENTURE', description: 'Guided golden-hour hike across the gypsum dunes at White Sands — the best light of the day for photography and solitude.', price: 45, priceRange: 'BUDGET', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/albuquerque-l1201/?partner_id=CDE4NF2' },
    { title: 'Albuquerque Hot Air Balloon Ride', category: 'OUTDOOR_ADVENTURE', description: 'Sunrise flight over the Rio Grande valley and Sandia Mountains — New Mexico is the balloon capital of the world for good reason.', price: 185, priceRange: 'HIGH', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/albuquerque-l1201/?partner_id=CDE4NF2' },
    { title: 'Santa Fe New Mexican Cooking Class', category: 'FOOD_DRINK', description: 'Learn to make red and green chile sauce, posole, and sopapillas with a local chef in a traditional adobe kitchen in Santa Fe.', price: 85, priceRange: 'MID', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/santa-fe-l1202/?partner_id=CDE4NF2' },
  ],
  'new-orleans': [
    { title: 'French Quarter Jazz & Food Walking Tour', category: 'FOOD_DRINK', description: 'Walk the Quarter with a musician guide — beignets at Café Du Monde, gumbo tasting, po\'boys, and live jazz bar stops.', price: 60, priceRange: 'MID', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/new-orleans-l1204/?partner_id=CDE4NF2' },
    { title: 'Cemetery & Voodoo History Tour', category: 'ARTS_CULTURE', description: 'Visit Lafayette Cemetery and St. Louis Cemetery No. 1 with a historian — above-ground tombs, Marie Laveau, and New Orleans voodoo traditions.', price: 35, priceRange: 'BUDGET', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 15, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/new-orleans-l1204/?partner_id=CDE4NF2' },
    { title: 'Mississippi River Steamboat Jazz Cruise', category: 'ARTS_CULTURE', description: 'Board an authentic sternwheeler for a jazz cruise on the Mississippi — live Dixieland band, cocktails, and river views of the Crescent City.', price: 55, priceRange: 'MID', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 30, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/new-orleans-l1204/?partner_id=CDE4NF2' },
  ],
  'san-francisco': [
    { title: 'Golden Gate Bridge Bike Ride to Sausalito', category: 'OUTDOOR_ADVENTURE', description: 'Cycle across the Golden Gate Bridge and coast down to the waterfront village of Sausalito — ferry back across the bay with the bike.', price: 50, priceRange: 'MID', duration: '4 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/san-francisco-l399/?partner_id=CDE4NF2' },
    { title: 'Mission District Murals & Taco Tour', category: 'FOOD_DRINK', description: 'Explore the Mission\'s world-famous Chicano murals with an artist-guide then stop at three taquerías for al pastor, carnitas, and horchata.', price: 55, priceRange: 'MID', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 12, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/san-francisco-l399/?partner_id=CDE4NF2' },
    { title: 'Alcatraz Island Night Tour', category: 'ARTS_CULTURE', description: 'Take the last ferry to "The Rock" and explore Alcatraz after dark — audio tour of the cellhouse, escape attempts, and the warden\'s house with the Bay lights behind.', price: 55, priceRange: 'MID', duration: '3 hours', groupSizeMin: 1, groupSizeMax: 20, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/san-francisco-l399/?partner_id=CDE4NF2' },
  ],
};

seed({ SPOTS, EXPERIENCES })
  .then(() => process.exit(0))
  .catch((e) => { console.error(e); process.exit(1); });
