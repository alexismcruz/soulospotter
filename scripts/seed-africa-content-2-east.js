// Africa batch B — East Africa: Kenya, Tanzania, Uganda, Rwanda.
const { seed } = require('./_content-seed-helper');

const SPOTS = {
  // KENYA
  'nairobi': [
    { name: 'Java House', slug: 'java-house-nairobi', category: 'CAFE', description: 'Kenya\'s beloved homegrown coffee chain — locally grown beans, big breakfasts, and a reliable wifi spot in the capital.', address: 'Nairobi', priceRange: 'MID', rating: 4.4, tags: ['coffee','kenyan','breakfast','wifi'] },
    { name: 'Wildebeest Eco Camp', slug: 'wildebeest-eco-camp-nairobi', category: 'ACCOMMODATION', description: 'A leafy garden camp with dorms, tents, and a bar — a safe, sociable green base in the suburbs of Nairobi.', address: 'Langata, Nairobi', priceRange: 'BUDGET', rating: 4.5, tags: ['eco-camp','garden','social','safe'] },
    { name: 'Giraffe Centre', slug: 'giraffe-centre-nairobi', category: 'NATURE', description: 'A conservation centre where you can feed and meet endangered Rothschild\'s giraffes eye-to-eye from a raised platform.', address: 'Langata, Nairobi', priceRange: 'MID', rating: 4.6, tags: ['giraffes','conservation','wildlife','iconic'] },
  ],
  'masai-mara': [
    { name: 'Talek Town Eateries', slug: 'talek-town-eateries', category: 'FOOD', description: 'The simple local eateries of Talek gate town — nyama choma and ugali, the authentic flavour of the Mara\'s edge.', address: 'Talek, Masai Mara', priceRange: 'BUDGET', rating: 4.1, tags: ['local','nyama-choma','gateway','authentic'] },
    { name: 'Aruba Mara Camp', slug: 'aruba-mara-camp', category: 'ACCOMMODATION', description: 'A tented camp near Talek gate — an affordable base for game drives into the heart of the Masai Mara.', address: 'Talek, Masai Mara', priceRange: 'MID', rating: 4.4, tags: ['tented-camp','safari-base','affordable','mara'] },
    { name: 'Mara River Crossing Point', slug: 'mara-river-crossing', category: 'NATURE', description: 'The famous Mara River banks where the Great Migration crosses — wildebeest plunging past waiting crocodiles.', address: 'Masai Mara', priceRange: 'MID', rating: 4.9, tags: ['migration','river','crocodiles','iconic'] },
  ],
  'lamu': [
    { name: 'Whispers Coffee Shop', slug: 'whispers-coffee-lamu', category: 'CAFE', description: 'A courtyard café in a Swahili merchant\'s house — fresh juice, coffee, and shade in the car-free maze of Lamu Old Town.', address: 'Lamu Old Town', priceRange: 'MID', rating: 4.4, tags: ['cafe','courtyard','swahili','old-town'] },
    { name: 'Lamu House', slug: 'lamu-house-hotel', category: 'ACCOMMODATION', description: 'A restored Swahili house hotel on the waterfront — carved doors, rooftop terraces, and the timeless rhythm of Lamu.', address: 'Lamu Old Town', priceRange: 'MID', rating: 4.5, tags: ['swahili-house','waterfront','rooftop','atmospheric'] },
    { name: 'Lamu Old Town', slug: 'lamu-old-town', category: 'CULTURE', description: 'The oldest living Swahili settlement, a UNESCO site of donkeys, dhows, and coral-stone houses — no cars, just alleyways.', address: 'Lamu', priceRange: 'FREE', rating: 4.7, tags: ['unesco','swahili','no-cars','historic'] },
  ],
  'mombasa': [
    { name: 'Tarboush Café', slug: 'tarboush-cafe-mombasa', category: 'FOOD', description: 'A bustling Old Town spot for Swahili-Arab cuisine — biryani, mishkaki, and fresh juices in coastal Mombasa.', address: 'Old Town, Mombasa', priceRange: 'BUDGET', rating: 4.3, tags: ['swahili','biryani','old-town','local'] },
    { name: 'Tulia Backpackers', slug: 'tulia-backpackers-mombasa', category: 'ACCOMMODATION', description: 'A relaxed backpackers near Nyali beach — a sociable base for the Old Town, Fort Jesus, and the north-coast reefs.', address: 'Nyali, Mombasa', priceRange: 'BUDGET', rating: 4.3, tags: ['backpackers','beach','social','coast'] },
    { name: 'Fort Jesus', slug: 'fort-jesus-mombasa', category: 'CULTURE', description: 'The 16th-century Portuguese fort guarding Mombasa\'s harbour — a UNESCO monument to the Indian Ocean spice trade.', address: 'Mombasa', priceRange: 'MID', rating: 4.5, tags: ['fort','unesco','portuguese','history'] },
  ],
  'amboseli': [
    { name: 'Kimana Gate Picnic Site', slug: 'kimana-gate-picnic', category: 'FOOD', description: 'A picnic spot near Amboseli\'s Kimana gate — a packed-lunch stop with the snows of Kilimanjaro on the horizon.', address: 'Amboseli National Park', priceRange: 'BUDGET', rating: 4.0, tags: ['picnic','kilimanjaro','safari','gateway'] },
    { name: 'Kibo Safari Camp', slug: 'kibo-safari-camp', category: 'ACCOMMODATION', description: 'A large tented camp facing Kilimanjaro — comfortable safari tents, a pool, and game drives into Amboseli.', address: 'Amboseli', priceRange: 'MID', rating: 4.4, tags: ['tented-camp','kilimanjaro','pool','safari'] },
    { name: 'Observation Hill', slug: 'observation-hill-amboseli', category: 'NATURE', description: 'The one spot you can leave your vehicle in Amboseli — a 360° view over the swamps, elephants, and Kilimanjaro.', address: 'Amboseli National Park', priceRange: 'MID', rating: 4.6, tags: ['viewpoint','elephants','kilimanjaro','swamps'] },
  ],
  // TANZANIA
  'arusha': [
    { name: 'Africafé', slug: 'africafe-arusha', category: 'CAFE', description: 'A smart café in central Arusha — Tanzanian coffee, cakes, and a calm planning spot before northern-circuit safaris.', address: 'Arusha', priceRange: 'MID', rating: 4.4, tags: ['cafe','tanzanian-coffee','central','safari-base'] },
    { name: 'Arusha Backpackers', slug: 'arusha-backpackers', category: 'ACCOMMODATION', description: 'A budget central hostel with a rooftop restaurant — a practical, sociable base for arranging Serengeti trips.', address: 'Arusha', priceRange: 'BUDGET', rating: 4.1, tags: ['hostel','rooftop','central','safari-base'] },
    { name: 'Arusha Central Market', slug: 'arusha-central-market', category: 'CULTURE', description: 'A vibrant, chaotic market of spices, fabrics, and produce — a sensory immersion in everyday Tanzanian life.', address: 'Arusha', priceRange: 'FREE', rating: 4.2, tags: ['market','spices','local','colourful'] },
  ],
  'zanzibar': [
    { name: 'Lukmaan Restaurant', slug: 'lukmaan-restaurant-zanzibar', category: 'FOOD', description: 'A beloved Stone Town canteen of Zanzibari-Swahili cuisine — biryani, urojo soup, and spiced curries at honest prices.', address: 'Stone Town, Zanzibar', priceRange: 'BUDGET', rating: 4.5, tags: ['swahili','biryani','stone-town','local'] },
    { name: 'Lost & Found Hostel', slug: 'lost-and-found-zanzibar', category: 'ACCOMMODATION', description: 'A colourful, social hostel in Stone Town — a rooftop, a bar, and a great base for spice tours and beach trips.', address: 'Stone Town, Zanzibar', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','social','stone-town','rooftop'] },
    { name: 'Nungwi Beach', slug: 'nungwi-beach-zanzibar', category: 'NATURE', description: 'The island\'s liveliest northern beach — powder-white sand, dhow sunsets, and tide-independent swimming.', address: 'Nungwi, Zanzibar', priceRange: 'FREE', rating: 4.6, tags: ['beach','white-sand','sunset','swimming'] },
  ],
  'dar-es-salaam': [
    { name: 'Mamboz Corner BBQ', slug: 'mamboz-corner-bbq', category: 'FOOD', description: 'A legendary street-side grill in Dar — famous marinated chicken and seafood under the night sky.', address: 'Dar es Salaam', priceRange: 'BUDGET', rating: 4.5, tags: ['bbq','street-food','seafood','local'] },
    { name: 'Firefly Hostel', slug: 'firefly-hostel-dar', category: 'ACCOMMODATION', description: 'A relaxed garden hostel in the city — a handy base near the ferries to Zanzibar and the south-coast beaches.', address: 'Dar es Salaam', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','garden','ferry-base','relaxed'] },
    { name: 'Kivukoni Fish Market', slug: 'kivukoni-fish-market', category: 'CULTURE', description: 'The bustling waterfront fish market at dawn — dhows unloading the catch in a riot of noise, colour, and commerce.', address: 'Dar es Salaam', priceRange: 'FREE', rating: 4.2, tags: ['fish-market','waterfront','dhows','authentic'] },
  ],
  'moshi': [
    { name: 'Union Café', slug: 'union-cafe-moshi', category: 'CAFE', description: 'A café run by a local coffee cooperative — single-origin Kilimanjaro beans grown on the mountain\'s slopes.', address: 'Moshi', priceRange: 'MID', rating: 4.5, tags: ['coffee','cooperative','kilimanjaro','specialty'] },
    { name: 'Kilimanjaro Backpackers', slug: 'kilimanjaro-backpackers-moshi', category: 'ACCOMMODATION', description: 'A central Moshi hostel with mountain views — the social hub for trekkers prepping to climb Kilimanjaro.', address: 'Moshi', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','kilimanjaro','trekking-base','social'] },
    { name: 'Materuni Waterfall', slug: 'materuni-waterfall', category: 'NATURE', description: 'A tall waterfall in the Kilimanjaro foothills reached through banana and coffee farms — swimming and a coffee tour.', address: 'near Moshi', priceRange: 'BUDGET', rating: 4.6, tags: ['waterfall','coffee-farm','swimming','foothills'] },
  ],
  'stone-town': [
    { name: 'Forodhani Night Market', slug: 'forodhani-night-market', category: 'FOOD', description: 'The waterfront night market in Stone Town — Zanzibar pizza, grilled seafood, and sugarcane juice under the stars.', address: 'Stone Town, Zanzibar', priceRange: 'BUDGET', rating: 4.4, tags: ['night-market','street-food','seafood','waterfront'] },
    { name: 'Emerson Spice Hotel', slug: 'emerson-spice-hotel', category: 'ACCOMMODATION', description: 'A romantically restored merchant\'s mansion with a famous rooftop tearoom — Stone Town\'s most atmospheric stay.', address: 'Stone Town, Zanzibar', priceRange: 'HIGH', rating: 4.6, tags: ['boutique','rooftop','historic','atmospheric'] },
    { name: 'Old Slave Market & Anglican Cathedral', slug: 'old-slave-market-zanzibar', category: 'CULTURE', description: 'A sobering memorial on the site of the East African slave market, beneath the cathedral built over the whipping post.', address: 'Stone Town, Zanzibar', priceRange: 'MID', rating: 4.6, tags: ['history','slavery','memorial','cathedral'] },
  ],
  // UGANDA
  'kampala': [
    { name: 'Endiro Coffee', slug: 'endiro-coffee-kampala', category: 'CAFE', description: 'An ethical Ugandan coffee chain — locally sourced beans, good food, and a relaxed spot in the buzzing capital.', address: 'Kampala', priceRange: 'MID', rating: 4.5, tags: ['coffee','ethical','ugandan','relaxed'] },
    { name: 'Fat Cat Backpackers', slug: 'fat-cat-backpackers-kampala', category: 'ACCOMMODATION', description: 'A central hostel with a rooftop bar — the social hub for travellers gearing up for gorilla treks and the Nile.', address: 'Kampala', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','rooftop','social','central'] },
    { name: 'Kasubi Tombs', slug: 'kasubi-tombs-kampala', category: 'CULTURE', description: 'The UNESCO-listed royal burial grounds of the Buganda kings — a vast thatched palace and living spiritual centre.', address: 'Kampala', priceRange: 'BUDGET', rating: 4.3, tags: ['unesco','buganda','royal','spiritual'] },
  ],
  'bwindi': [
    { name: 'Gorilla Friends Café', slug: 'gorilla-friends-cafe-bwindi', category: 'FOOD', description: 'A community café in Buhoma village at the forest edge — local meals and crafts supporting Bwindi conservation.', address: 'Buhoma, Bwindi', priceRange: 'BUDGET', rating: 4.3, tags: ['community','local','crafts','forest-edge'] },
    { name: 'Buhoma Community Rest Camp', slug: 'buhoma-community-rest-camp', category: 'ACCOMMODATION', description: 'A community-run lodge right at the Bwindi trailhead — bandas and camping, with proceeds supporting local villages.', address: 'Buhoma, Bwindi', priceRange: 'MID', rating: 4.4, tags: ['community-lodge','gorilla-base','trailhead','eco'] },
    { name: 'Bwindi Impenetrable Forest', slug: 'bwindi-impenetrable-forest', category: 'NATURE', description: 'An ancient, dense rainforest home to nearly half the world\'s mountain gorillas — one of Africa\'s most biodiverse places.', address: 'Bwindi', priceRange: 'MID', rating: 4.9, tags: ['gorillas','rainforest','biodiversity','iconic'] },
  ],
  'jinja': [
    { name: 'The Source Café', slug: 'the-source-cafe-jinja', category: 'CAFE', description: 'A relaxed café in Jinja town with a craft shop — coffee, smoothies, and the meeting point for Nile adventures.', address: 'Jinja', priceRange: 'MID', rating: 4.4, tags: ['cafe','crafts','nile','relaxed'] },
    { name: 'Nile River Explorers', slug: 'nile-river-explorers-jinja', category: 'ACCOMMODATION', description: 'A legendary riverside backpackers above the Nile — campfire bar, rafting HQ, and the social heart of Jinja.', address: 'Jinja', priceRange: 'BUDGET', rating: 4.5, tags: ['backpackers','riverside','rafting','social'] },
    { name: 'Source of the Nile', slug: 'source-of-the-nile-jinja', category: 'NATURE', description: 'The point where the world\'s longest river begins its journey out of Lake Victoria — boat trips to the spring.', address: 'Jinja', priceRange: 'BUDGET', rating: 4.3, tags: ['nile-source','lake-victoria','boat','iconic'] },
  ],
  'queen-elizabeth-np': [
    { name: 'Mweya Safari Lodge Restaurant', slug: 'mweya-lodge-restaurant', category: 'FOOD', description: 'A restaurant on the Mweya peninsula overlooking the Kazinga Channel — dine above hippos and elephants at the water.', address: 'Queen Elizabeth National Park', priceRange: 'MID', rating: 4.3, tags: ['restaurant','channel-views','wildlife','peninsula'] },
    { name: 'Simba Safari Camp', slug: 'simba-safari-camp-qenp', category: 'ACCOMMODATION', description: 'A value camp near the park\'s northern gate with views to the Rwenzoris — a base for game drives and channel cruises.', address: 'Queen Elizabeth National Park', priceRange: 'MID', rating: 4.3, tags: ['camp','safari-base','rwenzori-views','value'] },
    { name: 'Kazinga Channel', slug: 'kazinga-channel', category: 'NATURE', description: 'A natural channel linking two lakes, with the world\'s densest hippo population and crowds of elephants and birds.', address: 'Queen Elizabeth National Park', priceRange: 'MID', rating: 4.7, tags: ['channel','hippos','birds','boat-safari'] },
  ],
  'kidepo-valley': [
    { name: 'Kidepo Community Eatery', slug: 'kidepo-community-eatery', category: 'FOOD', description: 'A simple community eatery near the park serving Karamojong dishes — a taste of Uganda\'s remote northeast.', address: 'Kidepo Valley', priceRange: 'BUDGET', rating: 4.0, tags: ['community','karamojong','local','remote'] },
    { name: 'Apoka Rest Camp', slug: 'apoka-rest-camp-kidepo', category: 'ACCOMMODATION', description: 'The park\'s bandas and camping at Apoka — a remote, affordable base in Uganda\'s wildest, least-visited park.', address: 'Kidepo Valley', priceRange: 'MID', rating: 4.4, tags: ['rest-camp','remote','wild','safari-base'] },
    { name: 'Narus Valley', slug: 'narus-valley-kidepo', category: 'NATURE', description: 'The wildlife-rich valley of Kidepo — lions, cheetahs, ostriches, and giraffes across savannah ringed by mountains.', address: 'Kidepo Valley', priceRange: 'MID', rating: 4.8, tags: ['savannah','lions','cheetahs','wild'] },
  ],
  // RWANDA
  'kigali': [
    { name: 'Question Coffee', slug: 'question-coffee-kigali', category: 'CAFE', description: 'A specialty café showcasing Rwandan women coffee farmers — world-class single origins in a bright modern space.', address: 'Kigali', priceRange: 'MID', rating: 4.7, tags: ['specialty-coffee','rwandan','women-farmers','modern'] },
    { name: 'Discover Rwanda Youth Hostel', slug: 'discover-rwanda-hostel', category: 'ACCOMMODATION', description: 'Kigali\'s leading hostel with a garden and city views — sociable, central, and supporting youth programmes.', address: 'Kiyovu, Kigali', priceRange: 'BUDGET', rating: 4.5, tags: ['hostel','garden','social','central'] },
    { name: 'Kigali Genocide Memorial', slug: 'kigali-genocide-memorial', category: 'CULTURE', description: 'A deeply moving memorial and museum to the 1994 genocide — essential to understanding Rwanda\'s history and renewal.', address: 'Gisozi, Kigali', priceRange: 'FREE', rating: 4.9, tags: ['memorial','history','genocide','essential'] },
  ],
  'musanze': [
    { name: 'Volcana Lounge', slug: 'volcana-lounge-musanze', category: 'FOOD', description: 'A popular Musanze restaurant — pizzas and Rwandan dishes, the gathering spot before gorilla treks in the volcanoes.', address: 'Musanze', priceRange: 'MID', rating: 4.4, tags: ['restaurant','pizza','gorilla-base','social'] },
    { name: 'Red Rocks Rwanda', slug: 'red-rocks-rwanda', category: 'ACCOMMODATION', description: 'A community campsite and cultural centre near the volcanoes — banana-beer brewing, basket weaving, and gorilla-trek access.', address: 'Musanze', priceRange: 'BUDGET', rating: 4.5, tags: ['community','campsite','cultural','gorilla-base'] },
    { name: 'Volcanoes National Park HQ', slug: 'volcanoes-national-park-hq', category: 'NATURE', description: 'The Kinigi headquarters where gorilla treks begin — the gateway to the Virunga volcanoes and golden monkeys.', address: 'Kinigi, Musanze', priceRange: 'MID', rating: 4.8, tags: ['gorillas','volcanoes','virunga','trailhead'] },
  ],
  'gisenyi': [
    { name: 'Inzu Lodge Deck', slug: 'inzu-lodge-deck-gisenyi', category: 'FOOD', description: 'A hillside lodge deck with sweeping views over Lake Kivu — sundowners and Rwandan food above the water.', address: 'Gisenyi', priceRange: 'MID', rating: 4.4, tags: ['restaurant','lake-views','sundowners','relaxed'] },
    { name: 'Paradis Malahide', slug: 'paradis-malahide-gisenyi', category: 'ACCOMMODATION', description: 'A lakeside guesthouse with its own beach and fish restaurant — a tranquil base on the shore of Lake Kivu.', address: 'Gisenyi', priceRange: 'MID', rating: 4.4, tags: ['guesthouse','lakeside','beach','tranquil'] },
    { name: 'Lake Kivu Beach', slug: 'lake-kivu-beach-gisenyi', category: 'NATURE', description: 'The sandy lakeshore of Gisenyi — calm, bilharzia-free swimming, kayaking, and volcanic sunsets over the Congo.', address: 'Gisenyi', priceRange: 'FREE', rating: 4.4, tags: ['lake','beach','swimming','sunset'] },
  ],
  'nyungwe': [
    { name: 'Nyungwe Top View Café', slug: 'nyungwe-top-view-cafe', category: 'FOOD', description: 'A café-restaurant on the tea-clad ridges above Nyungwe forest — local food with views over the canopy.', address: 'Nyungwe', priceRange: 'MID', rating: 4.2, tags: ['restaurant','tea-estate','forest-views','local'] },
    { name: 'Nyungwe Forest Lodge Camp', slug: 'nyungwe-forest-camp', category: 'ACCOMMODATION', description: 'A forest-edge base among tea plantations — a comfortable launch point for chimp trekking and the canopy walk.', address: 'Nyungwe', priceRange: 'MID', rating: 4.4, tags: ['lodge','tea-plantation','chimp-base','forest'] },
    { name: 'Nyungwe Canopy Walkway', slug: 'nyungwe-canopy-walkway', category: 'NATURE', description: 'A 70m-high suspended walkway through the rainforest canopy — vertiginous views over one of Africa\'s oldest forests.', address: 'Nyungwe National Park', priceRange: 'MID', rating: 4.6, tags: ['canopy-walk','rainforest','views','wildlife'] },
  ],
  'butare': [
    { name: 'Inzozi Nziza Ice Cream', slug: 'inzozi-nziza-butare', category: 'CAFE', description: 'Rwanda\'s first ice-cream shop, run by a women\'s cooperative — sweet treats and coffee in the university town.', address: 'Huye (Butare)', priceRange: 'BUDGET', rating: 4.4, tags: ['ice-cream','cooperative','women','university'] },
    { name: 'Hotel Credo', slug: 'hotel-credo-butare', category: 'ACCOMMODATION', description: 'A comfortable, friendly hotel in Butare — a convenient base for the national museum and southern Rwanda.', address: 'Huye (Butare)', priceRange: 'BUDGET', rating: 4.2, tags: ['hotel','friendly','museum-base','central'] },
    { name: 'Ethnographic Museum', slug: 'ethnographic-museum-butare', category: 'CULTURE', description: 'The finest ethnographic museum in East Africa — Rwandan history, crafts, and the story of its peoples.', address: 'Huye (Butare)', priceRange: 'MID', rating: 4.6, tags: ['museum','ethnographic','history','culture'] },
  ],
};

const EXPERIENCES = {
  'nairobi': [
    { name: 'Nairobi National Park Morning Safari', slug: 'nairobi-national-park-safari', category: 'OUTDOOR_ADVENTURE', description: 'A game drive in the only national park within a capital city — lions and rhinos against a skyscraper skyline.', price: 80, duration: 'Half day', groupSizeMax: 7 },
    { name: 'Giraffe Centre & Elephant Orphanage Tour', slug: 'nairobi-giraffe-elephant', category: 'OUTDOOR_ADVENTURE', description: 'Feed Rothschild\'s giraffes and meet rescued baby elephants at the Sheldrick Trust — Nairobi\'s most beloved morning.', price: 55, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Kibera Community Walking Tour', slug: 'nairobi-kibera-walk', category: 'ARTS_CULTURE', description: 'A respectful, community-led walk through Kibera — meeting social enterprises, artists, and the resilience of the neighbourhood.', price: 30, duration: '3 hours', groupSizeMax: 8 },
  ],
  'masai-mara': [
    { name: 'Masai Mara Great Migration Safari', slug: 'masai-mara-migration-safari', category: 'OUTDOOR_ADVENTURE', description: 'A full day in the Mara during the migration — wildebeest river crossings, big cats, and the greatest wildlife show on Earth.', price: 180, duration: 'Full day', groupSizeMax: 7 },
    { name: 'Maasai Village Cultural Visit', slug: 'masai-mara-maasai-village', category: 'ARTS_CULTURE', description: 'Visit a Maasai manyatta to learn about warrior traditions, the adumu jumping dance, and pastoral life on the Mara.', price: 25, duration: '2 hours', groupSizeMax: 12 },
    { name: 'Hot Air Balloon Safari over the Mara', slug: 'masai-mara-balloon', category: 'PHOTOGRAPHY_WALKS', description: 'Drift over the savannah at dawn as the herds wake below, ending with a champagne bush breakfast on the plains.', price: 450, duration: 'Half day', groupSizeMax: 12 },
  ],
  'lamu': [
    { name: 'Lamu Dhow Sunset Sail', slug: 'lamu-dhow-sunset', category: 'OUTDOOR_ADVENTURE', description: 'Sail a traditional wooden dhow around the Lamu archipelago at sunset, with snorkelling and grilled fish aboard.', price: 40, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Lamu Old Town Heritage Walk', slug: 'lamu-old-town-walk', category: 'ARTS_CULTURE', description: 'Wander the car-free alleys of the UNESCO old town with a local guide — carved doors, the fort, and Swahili history.', price: 25, duration: '3 hours', groupSizeMax: 10 },
    { name: 'Takwa Ruins & Manda Island Trip', slug: 'lamu-takwa-ruins', category: 'ARTS_CULTURE', description: 'A dhow trip to the atmospheric Swahili ruins of Takwa on Manda Island, an abandoned 16th-century town in the mangroves.', price: 45, duration: 'Half day', groupSizeMax: 10 },
  ],
  'mombasa': [
    { name: 'Mombasa Old Town & Fort Jesus Tour', slug: 'mombasa-old-town-tour', category: 'ARTS_CULTURE', description: 'Walk the Swahili-Arab alleys of Old Town and tour the UNESCO Fort Jesus — Mombasa\'s spice-trade heritage.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Wasini Island Dolphin & Snorkel Day', slug: 'mombasa-wasini-dolphin', category: 'OUTDOOR_ADVENTURE', description: 'A dhow trip to Kisite Marine Park for dolphin spotting, coral snorkelling, and a Swahili seafood lunch on Wasini.', price: 70, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Haller Park Wildlife Sanctuary Visit', slug: 'mombasa-haller-park', category: 'OUTDOOR_ADVENTURE', description: 'Visit a reclaimed quarry turned wildlife park — giraffes, hippos, and the famous tortoise-feeding near Mombasa.', price: 25, duration: 'Half day', groupSizeMax: 12 },
  ],
  'amboseli': [
    { name: 'Amboseli Kilimanjaro Game Drive', slug: 'amboseli-kilimanjaro-drive', category: 'OUTDOOR_ADVENTURE', description: 'A safari among Amboseli\'s great elephant herds with Mount Kilimanjaro\'s snow-capped peak as the backdrop.', price: 110, duration: 'Full day', groupSizeMax: 7 },
    { name: 'Maasai Boma Cultural Visit', slug: 'amboseli-maasai-boma', category: 'ARTS_CULTURE', description: 'Visit a Maasai homestead near Amboseli to learn about traditions, beadwork, and coexistence with wildlife.', price: 25, duration: '2 hours', groupSizeMax: 12 },
    { name: 'Amboseli Sunrise Photography Safari', slug: 'amboseli-sunrise-photo', category: 'PHOTOGRAPHY_WALKS', description: 'A dawn drive for the iconic shot — elephants crossing the swamps as the sun lights up Kilimanjaro.', price: 90, duration: 'Half day', groupSizeMax: 6 },
  ],
  'arusha': [
    { name: 'Serengeti & Ngorongoro 3-Day Safari', slug: 'arusha-serengeti-ngorongoro', category: 'OUTDOOR_ADVENTURE', description: 'The classic northern-circuit safari — the endless Serengeti plains and the wildlife-packed Ngorongoro Crater.', price: 650, duration: '3 days', groupSizeMax: 7 },
    { name: 'Arusha National Park Day Safari', slug: 'arusha-national-park-safari', category: 'OUTDOOR_ADVENTURE', description: 'A day in Arusha NP — giraffes, flamingo lakes, and a canoe safari beneath Mount Meru, a great safari warm-up.', price: 130, duration: 'Full day', groupSizeMax: 8 },
    { name: 'Materuni & Coffee Tour Day Trip', slug: 'arusha-materuni-coffee', category: 'FOOD_DRINK', description: 'A trip to the Kilimanjaro foothills for the Materuni waterfall and a hands-on Chagga coffee-roasting experience.', price: 60, duration: 'Full day', groupSizeMax: 10 },
  ],
  'zanzibar': [
    { name: 'Zanzibar Spice Farm Tour', slug: 'zanzibar-spice-tour', category: 'FOOD_DRINK', description: 'Walk a working spice farm tasting and smelling cloves, vanilla, nutmeg, and cinnamon — the roots of the Spice Island.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Mnemba Atoll Snorkel & Dolphin Trip', slug: 'zanzibar-mnemba-snorkel', category: 'OUTDOOR_ADVENTURE', description: 'A boat trip to the coral gardens of Mnemba Atoll for snorkelling among turtles, dolphins, and tropical fish.', price: 55, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Jozani Forest Red Colobus Tour', slug: 'zanzibar-jozani-forest', category: 'OUTDOOR_ADVENTURE', description: 'Visit Jozani Forest to see the endemic Zanzibar red colobus monkey and walk the mangrove boardwalk.', price: 35, duration: 'Half day', groupSizeMax: 12 },
  ],
  'dar-es-salaam': [
    { name: 'Bongoyo Island Snorkel Day Trip', slug: 'dar-bongoyo-island', category: 'OUTDOOR_ADVENTURE', description: 'A short boat ride to Bongoyo Island marine reserve for snorkelling, white sand, and grilled fish off Dar.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Dar es Salaam City & Market Tour', slug: 'dar-city-tour', category: 'ARTS_CULTURE', description: 'Explore the harbour city — the fish market, the national museum, Kariakoo market, and Swahili coastal culture.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Kigamboni Beach Day', slug: 'dar-kigamboni-beach', category: 'OUTDOOR_ADVENTURE', description: 'Cross the harbour to the laid-back Kigamboni beaches for swimming, seafood, and a relaxed Indian Ocean escape.', price: 25, duration: 'Half day', groupSizeMax: 12 },
  ],
  'moshi': [
    { name: 'Kilimanjaro Machame Route 6-Day Trek', slug: 'moshi-kilimanjaro-machame', category: 'OUTDOOR_ADVENTURE', description: 'The "Whiskey Route" up Africa\'s highest peak — rainforest, alpine desert, and a midnight summit to Uhuru Peak at 5,895m.', price: 1600, duration: '6 days', groupSizeMax: 10, difficulty: 'challenging' },
    { name: 'Materuni Waterfall & Coffee Day', slug: 'moshi-materuni-day', category: 'OUTDOOR_ADVENTURE', description: 'Hike to the Materuni waterfall through coffee farms and roast your own Kilimanjaro coffee with a Chagga family.', price: 55, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Kilimanjaro Day Hike to Mandara Hut', slug: 'moshi-kili-day-hike', category: 'OUTDOOR_ADVENTURE', description: 'A taste of Kilimanjaro — a day hike through the rainforest of the Marangu route to Mandara Hut and back.', price: 110, duration: 'Full day', groupSizeMax: 10, difficulty: 'moderate' },
  ],
  'stone-town': [
    { name: 'Stone Town Heritage Walking Tour', slug: 'stone-town-heritage-walk', category: 'ARTS_CULTURE', description: 'Wander the UNESCO labyrinth — the House of Wonders, carved doors, the old slave market, and Freddie Mercury\'s birthplace.', price: 25, duration: '3 hours', groupSizeMax: 12 },
    { name: 'Prison Island & Giant Tortoise Trip', slug: 'stone-town-prison-island', category: 'OUTDOOR_ADVENTURE', description: 'A boat trip to Changuu (Prison) Island to meet century-old giant tortoises and snorkel off the beach.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Sunset Dhow Cruise from Stone Town', slug: 'stone-town-sunset-dhow', category: 'NIGHTLIFE_SOCIAL', description: 'Sail a traditional dhow off Stone Town at golden hour with music and drinks as the old city glows behind you.', price: 30, duration: 'Evening', groupSizeMax: 14 },
  ],
  'kampala': [
    { name: 'Kampala City Boda-Boda Tour', slug: 'kampala-boda-tour', category: 'ARTS_CULTURE', description: 'Zip through the capital on the back of a guided motorbike — the Kasubi Tombs, markets, mosques, and street food.', price: 35, duration: 'Half day', groupSizeMax: 8 },
    { name: 'Lake Victoria & Ngamba Chimp Island', slug: 'kampala-ngamba-chimps', category: 'OUTDOOR_ADVENTURE', description: 'A boat trip across Lake Victoria to the Ngamba Island chimpanzee sanctuary for feeding and forest viewing.', price: 90, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Kampala Street Food & Rolex Tour', slug: 'kampala-street-food', category: 'FOOD_DRINK', description: 'Taste Kampala\'s legendary "rolex" (egg-chapati roll) and market foods with a local guide through the buzzing city.', price: 25, duration: '3 hours', groupSizeMax: 10 },
  ],
  'bwindi': [
    { name: 'Bwindi Mountain Gorilla Trek', slug: 'bwindi-gorilla-trek', category: 'OUTDOOR_ADVENTURE', description: 'The unforgettable hike into Bwindi\'s rainforest to spend an hour with a habituated mountain gorilla family.', price: 700, duration: 'Full day', groupSizeMax: 8, difficulty: 'challenging' },
    { name: 'Batwa Pygmy Cultural Experience', slug: 'bwindi-batwa-experience', category: 'ARTS_CULTURE', description: 'Spend time with the Batwa, the forest\'s original people, learning hunting, fire-making, and the songs of Bwindi.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Bwindi Waterfall & Birding Walk', slug: 'bwindi-waterfall-walk', category: 'OUTDOOR_ADVENTURE', description: 'A guided forest walk to the Munyaga waterfall, with some of Africa\'s best birding in the Albertine Rift.', price: 35, duration: 'Half day', groupSizeMax: 10 },
  ],
  'jinja': [
    { name: 'Nile White Water Rafting', slug: 'jinja-nile-rafting', category: 'OUTDOOR_ADVENTURE', description: 'Tackle the Grade V rapids at the source of the Nile — one of the world\'s best one-day white-water rafting runs.', price: 130, duration: 'Full day', groupSizeMax: 8, difficulty: 'challenging' },
    { name: 'Source of the Nile Sunset Boat Cruise', slug: 'jinja-nile-sunset-cruise', category: 'OUTDOOR_ADVENTURE', description: 'A relaxed boat cruise to the exact spot the Nile leaves Lake Victoria, with birdlife and a fiery sunset.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Nile Bungee Jump', slug: 'jinja-bungee', category: 'OUTDOOR_ADVENTURE', description: 'Leap 44m toward the Nile from a riverside tower — a classic Jinja adrenaline rite of passage.', price: 115, duration: '2 hours', groupSizeMax: 8, difficulty: 'challenging' },
  ],
  'queen-elizabeth-np': [
    { name: 'Kazinga Channel Boat Safari', slug: 'qenp-kazinga-boat', category: 'OUTDOOR_ADVENTURE', description: 'A boat cruise on the Kazinga Channel past the world\'s densest hippo population, elephants, and abundant birds.', price: 40, duration: 'Half day', groupSizeMax: 14 },
    { name: 'Ishasha Tree-Climbing Lions Safari', slug: 'qenp-ishasha-lions', category: 'OUTDOOR_ADVENTURE', description: 'A game drive to the Ishasha sector in search of the famous tree-climbing lions draped in fig branches.', price: 90, duration: 'Full day', groupSizeMax: 8 },
    { name: 'Kyambura Gorge Chimp Trek', slug: 'qenp-kyambura-chimp', category: 'OUTDOOR_ADVENTURE', description: 'Descend into the "Valley of Apes" to track a community of chimpanzees in a lush forested gorge.', price: 60, duration: 'Half day', groupSizeMax: 8, difficulty: 'moderate' },
  ],
  'kidepo-valley': [
    { name: 'Kidepo Narus Valley Game Drive', slug: 'kidepo-narus-drive', category: 'OUTDOOR_ADVENTURE', description: 'A full day in Uganda\'s wildest park — lions, cheetahs, giraffes, and ostriches across mountain-ringed savannah.', price: 120, duration: 'Full day', groupSizeMax: 8 },
    { name: 'Karamojong Cultural Village Visit', slug: 'kidepo-karamojong-visit', category: 'ARTS_CULTURE', description: 'Visit a Karamojong manyatta to learn about the cattle-herding warrior culture of Uganda\'s remote northeast.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Kidepo Mountain Nature Walk', slug: 'kidepo-nature-walk', category: 'OUTDOOR_ADVENTURE', description: 'A ranger-guided walk in the Morungole foothills, spotting wildlife and the rugged scenery of the Kidepo wilderness.', price: 40, duration: 'Half day', groupSizeMax: 8, difficulty: 'moderate' },
  ],
  'kigali': [
    { name: 'Kigali Genocide Memorial & City Tour', slug: 'kigali-memorial-city-tour', category: 'ARTS_CULTURE', description: 'A moving visit to the Genocide Memorial paired with a city tour — markets, the milk bar, and Rwanda\'s remarkable renewal.', price: 45, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Kigali Coffee & Cooperative Experience', slug: 'kigali-coffee-experience', category: 'FOOD_DRINK', description: 'Discover Rwanda\'s celebrated coffee — a roastery and cupping session with the women cooperatives behind the beans.', price: 35, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Nyamirambo Women\'s Walking Tour', slug: 'kigali-nyamirambo-walk', category: 'ARTS_CULTURE', description: 'A women-led walk through the lively Nyamirambo neighbourhood — tailors, a mosque, henna, and a home-cooked lunch.', price: 30, duration: 'Half day', groupSizeMax: 10 },
  ],
  'musanze': [
    { name: 'Mountain Gorilla Trek — Volcanoes NP', slug: 'musanze-gorilla-trek', category: 'OUTDOOR_ADVENTURE', description: 'Trek the Virunga volcanoes to spend a precious hour with a habituated mountain gorilla family in their misty home.', price: 1500, duration: 'Full day', groupSizeMax: 8, difficulty: 'challenging' },
    { name: 'Golden Monkey Tracking', slug: 'musanze-golden-monkey', category: 'OUTDOOR_ADVENTURE', description: 'Track troops of playful, endangered golden monkeys in the bamboo forests of Volcanoes National Park.', price: 100, duration: 'Half day', groupSizeMax: 8, difficulty: 'moderate' },
    { name: 'Musanze Caves & Twin Lakes Tour', slug: 'musanze-caves-lakes', category: 'OUTDOOR_ADVENTURE', description: 'Explore the lava-tube Musanze Caves and the scenic Twin Lakes of Burera and Ruhondo beneath the volcanoes.', price: 50, duration: 'Half day', groupSizeMax: 10 },
  ],
  'gisenyi': [
    { name: 'Lake Kivu Kayak Tour', slug: 'gisenyi-kivu-kayak', category: 'OUTDOOR_ADVENTURE', description: 'Paddle the calm, volcanic Lake Kivu past fishing villages and islands, with the Congo\'s peaks on the horizon.', price: 45, duration: 'Half day', groupSizeMax: 8 },
    { name: 'Coffee & Fishing Village Boat Trip', slug: 'gisenyi-coffee-boat', category: 'FOOD_DRINK', description: 'A boat trip on Lake Kivu to a coffee island and a traditional fishing village, with singing fishermen at dusk.', price: 40, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Congo Nile Trail Cycling Day', slug: 'gisenyi-congo-nile-trail', category: 'FITNESS_SPORTS', description: 'Cycle a scenic stretch of the Congo Nile Trail along Lake Kivu\'s shore through banana groves and coffee terraces.', price: 50, duration: 'Full day', groupSizeMax: 8, difficulty: 'moderate' },
  ],
  'nyungwe': [
    { name: 'Nyungwe Chimpanzee Trek', slug: 'nyungwe-chimp-trek', category: 'OUTDOOR_ADVENTURE', description: 'An early trek into the ancient Nyungwe rainforest to track a community of wild chimpanzees among the trees.', price: 100, duration: 'Half day', groupSizeMax: 8, difficulty: 'moderate' },
    { name: 'Nyungwe Canopy Walkway Tour', slug: 'nyungwe-canopy-tour', category: 'OUTDOOR_ADVENTURE', description: 'Walk the swaying 70m-high canopy bridge through the rainforest treetops with views over the forest and birdlife.', price: 60, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Nyungwe Tea Plantation & Colobus Walk', slug: 'nyungwe-tea-colobus', category: 'OUTDOOR_ADVENTURE', description: 'Tour a hillside tea estate and trek to see huge troops of Angolan colobus monkeys in the forest.', price: 55, duration: 'Half day', groupSizeMax: 10 },
  ],
  'butare': [
    { name: 'Ethnographic Museum & Butare City Tour', slug: 'butare-museum-tour', category: 'ARTS_CULTURE', description: 'Explore East Africa\'s best ethnographic museum and the university town of Butare with a local guide.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Nyanza Royal Palace Day Trip', slug: 'butare-nyanza-palace', category: 'ARTS_CULTURE', description: 'Visit the reconstructed traditional palace of the Rwandan kings at Nyanza, with the famous long-horned Inyambo cattle.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Gikongoro & Murambi History Visit', slug: 'butare-murambi-visit', category: 'ARTS_CULTURE', description: 'A sobering visit to the Murambi Genocide Memorial near Butare — an essential, deeply moving testimony.', price: 35, duration: 'Half day', groupSizeMax: 10 },
  ],
};

seed({ SPOTS, EXPERIENCES }).catch((e) => { console.error(e.message); process.exit(1); });
