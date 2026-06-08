// Shared data for Asia experiences — used by both the seed script and the photo script.
// img field: "activity:<key>" (verified Unsplash activity photo) or
//            "landmark:<spot-slug>" (reuse the real landmark photo in /public/spots).

// Verified activity Unsplash photo IDs (all eyeballed).
const ACTIVITY_PHOTOS = {
  cooking:    "1556909114-f6e7ad7d3136",
  cooking2:   "1507048331197-7d4ac70811cf",
  streetfood: "1504674900247-0877df9cc836",
  streetfood2:"1572656631137-7935297eff55",
  diving:     "1544551763-46a013bb70d5",
  snorkel:    "1582967788606-a171c1080cb0",
  island:     "1573843981267-be1999ff37cd",
  yoga:       "1545205597-3d9d02c29597",
  muaythai:   "1549719386-74dfcbf7dbed",
  cycling:    "1485965120184-e220f721d03e",
  trek:       "1551632811-561732d1e306",
  photo:      "1452587925148-ce544e77e70d",
  spa:        "1544161515-4ab6ce6db874",
  tea:        "1564890369478-c89ca6d9cde9",
  bar:        "1514933651103-005eec06c04b",
};

const CITY_NAMES = {
  "bangkok": "Bangkok", "cebu": "Cebu", "chengdu": "Chengdu", "el-nido": "El Nido",
  "guilin": "Guilin", "ho-chi-minh-city": "Ho Chi Minh City", "hong-kong": "Hong Kong",
  "koh-tao": "Koh Tao", "kuala-lumpur": "Kuala Lumpur", "luang-prabang": "Luang Prabang",
  "pai": "Pai", "penang": "Penang", "phuket": "Phuket", "siem-reap": "Siem Reap",
  "singapore": "Singapore", "ubud": "Ubud", "ulaanbaatar": "Ulaanbaatar", "xian": "Xi'an",
};

// price USD/person, duration, frequency, min, max
const E = (city, slug, name, category, img, price, duration, desc, freq = "daily", min = 1, max = 12) =>
  ({ city, slug, name, category, img, price, duration, description: desc, frequency: freq, groupSizeMin: min, groupSizeMax: max });

const EXPERIENCES = [
  // ── Bangkok ──
  E("bangkok","bangkok-temples-grand-palace-tour","Grand Palace & Temples Tour","ARTS_CULTURE","landmark:wat-arun-bangkok",45,"Half day","Visit the Grand Palace, Wat Pho's reclining Buddha, and riverside Wat Arun with a local guide who brings Bangkok's royal history to life."),
  E("bangkok","bangkok-street-food-night-tour","Bangkok Street Food Night Tour","FOOD_DRINK","activity:streetfood",39,"3.5 hours","Eat your way through Chinatown and Old Town's best stalls — boat noodles, grilled satay, mango sticky rice — with a food-obsessed local guide."),
  E("bangkok","bangkok-thai-cooking-class","Thai Cooking Class & Market Visit","FOOD_DRINK","activity:cooking",38,"4 hours","Shop a local market then cook four classic Thai dishes (pad thai, green curry, tom yum) in a hands-on small-group class."),
  E("bangkok","bangkok-muay-thai-training","Muay Thai Training Session","FITNESS_SPORTS","activity:muaythai",30,"2 hours","Train like a fighter at an authentic Bangkok gym — pad work, technique, and conditioning with professional Muay Thai trainers. All levels."),
  E("bangkok","bangkok-rooftop-bar-night","Chao Phraya Sunset & Rooftop Bars","NIGHTLIFE_SOCIAL","activity:bar",55,"4 hours","Cruise the river at sunset then hit Bangkok's iconic rooftop bars with a small social group — perfect for solo travelers."),

  // ── Cebu ──
  E("cebu","cebu-oslob-whale-shark-snorkel","Oslob Whale Shark Snorkeling","OUTDOOR_ADVENTURE","activity:snorkel",75,"Full day","Snorkel alongside gentle whale sharks in Oslob, then cool off at a nearby waterfall on this classic Cebu day trip."),
  E("cebu","cebu-kawasan-canyoneering","Kawasan Falls Canyoneering","OUTDOOR_ADVENTURE","landmark:kawasan-falls-moalboal-cebu",65,"Full day","Jump, swim, and slide down the turquoise canyons of Kawasan Falls in Badian — Cebu's most thrilling adventure.",  "daily", 1, 10),
  E("cebu","cebu-moalboal-sardine-freedive","Moalboal Sardine Run Freedive","OUTDOOR_ADVENTURE","activity:diving",55,"Half day","Freedive or snorkel into the famous million-strong sardine run just off Panagsama Beach, with turtles often joining."),
  E("cebu","cebu-heritage-history-walk","Cebu Spanish Heritage Walk","ARTS_CULTURE","landmark:basilica-del-santo-nino-cebu",25,"3 hours","Walk through Cebu's colonial core — the Basilica del Santo Niño, Magellan's Cross, and Fort San Pedro — with a history guide."),
  E("cebu","cebu-lechon-food-tour","Cebu Lechon & Local Food Tour","FOOD_DRINK","activity:streetfood2",35,"3 hours","Taste Cebu's legendary lechon plus puso rice, dried mangoes, and street eats on a guided neighborhood food crawl."),

  // ── Chengdu ──
  E("chengdu","chengdu-panda-base-tour","Giant Panda Base Morning Tour","OUTDOOR_ADVENTURE","landmark:giant-panda-base-chengdu",55,"Half day","Arrive early to see giant pandas at their most active at the Chengdu Research Base — feeding, climbing, and tumbling cubs."),
  E("chengdu","chengdu-leshan-buddha-day-trip","Leshan Giant Buddha Day Trip","DAY_TRIPS","landmark:leshan-giant-buddha-chengdu",70,"Full day","Visit the world's largest carved stone Buddha by boat and on foot, an easy day trip from Chengdu."),
  E("chengdu","chengdu-sichuan-cooking-class","Sichuan Hotpot Cooking Class","FOOD_DRINK","activity:cooking",42,"3.5 hours","Master mapo tofu and a fiery Sichuan hotpot base in a hands-on class, with a market tour for Sichuan peppercorns and chilies."),
  E("chengdu","chengdu-teahouse-tea-ceremony","Chengdu Teahouse & Tea Ceremony","WELLNESS_MINDFULNESS","activity:tea",20,"2 hours","Slow down the Chengdu way — a traditional teahouse session with ceremony, ear-cleaning culture, and Sichuan tea varieties."),
  E("chengdu","chengdu-street-food-crawl","Sichuan Street Food Crawl","FOOD_DRINK","activity:streetfood",36,"3 hours","Graze through Chengdu's snack streets — dan dan noodles, skewers, sweet water noodles — with a spice-savvy local guide."),

  // ── El Nido ──
  E("el-nido","el-nido-island-hopping-tour-a","Island Hopping Tour A (Big Lagoon)","OUTDOOR_ADVENTURE","activity:island",35,"Full day","Kayak the Big Lagoon, swim the Secret Lagoon, and beach-hop the Bacuit Archipelago's most iconic karst islands."),
  E("el-nido","el-nido-bacuit-snorkel-trip","Bacuit Bay Snorkeling Trip","OUTDOOR_ADVENTURE","activity:snorkel",38,"Full day","Snorkel vibrant reefs and hidden coves around El Nido's limestone islands, with a fresh beach BBQ lunch included."),
  E("el-nido","el-nido-sunset-kayak","El Nido Sunset Sea Kayak","OUTDOOR_ADVENTURE","activity:island",28,"2.5 hours","Paddle the calm bay as the sun drops behind the karst cliffs — a serene small-group sunset on the water."),
  E("el-nido","el-nido-beach-yoga","Sunrise Beach Yoga","WELLNESS_MINDFULNESS","activity:yoga",18,"1.5 hours","Start the day with a gentle vinyasa flow on the sand as the sun rises over Bacuit Bay. All levels welcome.","daily",1,15),
  E("el-nido","el-nido-seafood-beach-bar-night","Seafood & Beach Bar Night","NIGHTLIFE_SOCIAL","activity:bar",30,"Evening","Fresh-grilled seafood followed by El Nido's laid-back beach bars — a relaxed social night for solo travelers."),

  // ── Guilin ──
  E("guilin","guilin-li-river-cruise-yangshuo","Li River Cruise to Yangshuo","DAY_TRIPS","landmark:li-river-cruise",80,"Full day","Cruise the legendary Li River past karst peaks and bamboo groves from Guilin to Yangshuo — China's most painted landscape."),
  E("guilin","guilin-yangshuo-cycling","Yangshuo Countryside Cycling","OUTDOOR_ADVENTURE","activity:cycling",30,"Half day","Pedal through rice paddies and karst valleys along the Yulong River, stopping at villages and farm cafes."),
  E("guilin","guilin-longji-terraces-day-trip","Longji Rice Terraces Day Trip","DAY_TRIPS","landmark:longji-rice-terraces",65,"Full day","Hike the dragon's-backbone rice terraces of Longsheng and visit Zhuang and Yao minority villages."),
  E("guilin","guilin-reed-flute-cave-photo","Reed Flute Cave & Karst Photography","PHOTOGRAPHY_WALKS","landmark:reed-flute-cave",28,"3 hours","Shoot the surreal lit caverns of Reed Flute Cave and Guilin's iconic karst skyline with photography tips along the way."),
  E("guilin","guilin-rice-noodle-cooking-class","Guilin Rice Noodle Cooking Class","FOOD_DRINK","activity:cooking2",32,"3 hours","Make Guilin's famous rice noodles from scratch and learn the broth and toppings that define this regional classic."),

  // ── Ho Chi Minh City ──
  E("ho-chi-minh-city","hcmc-cu-chi-tunnels-tour","Cu Chi Tunnels Half-Day Tour","ARTS_CULTURE","landmark:cu-chi-tunnels-hcmc",30,"Half day","Crawl through the legendary Cu Chi tunnel network and learn the wartime history just outside Saigon."),
  E("ho-chi-minh-city","hcmc-mekong-delta-day-trip","Mekong Delta Day Trip","DAY_TRIPS","landmark:mekong-delta-day-trip-hcmc",45,"Full day","Sampan rides through coconut canals, a floating market, and tropical orchards on a full-day Mekong Delta escape."),
  E("ho-chi-minh-city","hcmc-street-food-motorbike-tour","Saigon Street Food Motorbike Tour","FOOD_DRINK","activity:streetfood",42,"4 hours","Ride pillion through Saigon's backstreets to hidden eateries — banh mi, pho, com tam — with a local foodie guide."),
  E("ho-chi-minh-city","hcmc-vietnamese-cooking-class","Vietnamese Cooking Class","FOOD_DRINK","activity:cooking",36,"3.5 hours","Market tour plus a hands-on class cooking fresh spring rolls, pho, and clay-pot dishes with a Saigon home cook."),
  E("ho-chi-minh-city","hcmc-rooftop-bar-night","Saigon Rooftop Bar Night","NIGHTLIFE_SOCIAL","activity:bar",40,"Evening","See the skyline from Saigon's best rooftop bars on a sociable small-group night out."),

  // ── Hong Kong ──
  E("hong-kong","hong-kong-victoria-peak-tour","Victoria Peak & City Highlights","ARTS_CULTURE","landmark:victoria-peak-tram-hong-kong",50,"Half day","Ride the Peak Tram for the city's best skyline view, then explore Central, Sheung Wan, and the harbourfront with a guide."),
  E("hong-kong","hong-kong-dragons-back-hike","Dragon's Back Coastal Hike","OUTDOOR_ADVENTURE","landmark:dragon-back-trail-hong-kong",40,"Half day","Hike the famous Dragon's Back ridge for sweeping coastal views, finishing at Big Wave Bay beach.","daily",1,10),
  E("hong-kong","hong-kong-lantau-big-buddha-tour","Lantau Big Buddha Day Trip","DAY_TRIPS","landmark:big-buddha-lantau-hong-kong",55,"Full day","Cable car to the Tian Tan Big Buddha and Po Lin Monastery, plus the fishing village of Tai O on Lantau Island."),
  E("hong-kong","hong-kong-dim-sum-market-tour","Dim Sum & Wet Market Food Tour","FOOD_DRINK","activity:streetfood2",58,"3.5 hours","Eat through old Kowloon — dim sum, roast goose, egg tarts, and a buzzing wet market — with a local food guide."),
  E("hong-kong","hong-kong-night-markets-bar-crawl","Night Markets & Bar Crawl","NIGHTLIFE_SOCIAL","activity:bar",45,"Evening","Temple Street night market eats followed by Hong Kong's liveliest bars — a social night for solo travelers."),

  // ── Koh Tao ──
  E("koh-tao","koh-tao-padi-open-water-course","PADI Open Water Diving Course","OUTDOOR_ADVENTURE","activity:diving",280,"3 days","Get scuba-certified in the warm, clear waters of Koh Tao — the world's most popular place to learn to dive.","daily",1,6),
  E("koh-tao","koh-tao-nang-yuan-snorkel-trip","Koh Nang Yuan Snorkeling Trip","OUTDOOR_ADVENTURE","activity:snorkel",35,"Full day","Boat around Koh Tao's best snorkel sites including the iconic three-island Koh Nang Yuan viewpoint."),
  E("koh-tao","koh-tao-sunset-beach-yoga","Sairee Beach Sunset Yoga","WELLNESS_MINDFULNESS","activity:yoga",16,"1.5 hours","Unwind with a beachfront yoga flow as the sun sets over Sairee Beach.","daily",1,15),
  E("koh-tao","koh-tao-viewpoint-sunrise-hike","Koh Tao Viewpoint Sunrise Hike","OUTDOOR_ADVENTURE","activity:trek",20,"3 hours","Early hike to the John-Suwan viewpoint for sunrise over the island's twin bays."),
  E("koh-tao","koh-tao-beach-bar-crawl","Island Beach Bar Crawl","NIGHTLIFE_SOCIAL","activity:bar",25,"Evening","Fire shows, beach bars, and a friendly backpacker crowd on Koh Tao's classic night out."),

  // ── Kuala Lumpur ──
  E("kuala-lumpur","kl-petronas-city-tour","Petronas Towers & City Tour","ARTS_CULTURE","landmark:petronas-twin-towers-kl",45,"Half day","Hit KL's highlights — the Petronas Towers, Merdeka Square, and Chinatown — with a guide who knows the shortcuts."),
  E("kuala-lumpur","kl-batu-caves-temple-tour","Batu Caves & Temple Tour","ARTS_CULTURE","landmark:batu-caves-kl",35,"Half day","Climb the rainbow steps to the Batu Caves Hindu shrine and visit KL's most striking temples."),
  E("kuala-lumpur","kl-street-food-night-tour","KL Street Food Night Tour","FOOD_DRINK","activity:streetfood",38,"3.5 hours","Jalan Alor and beyond — satay, char kway teow, and durian — on a guided crawl through KL's best hawker streets."),
  E("kuala-lumpur","kl-malaysian-cooking-class","Malaysian Cooking Class","FOOD_DRINK","activity:cooking",40,"4 hours","Cook nasi lemak, rendang, and sambal from scratch after a market tour with a Malaysian home cook."),
  E("kuala-lumpur","kl-rooftop-bar-night","KL Rooftop Bar Night","NIGHTLIFE_SOCIAL","activity:bar",42,"Evening","Skyline cocktails at KL's best rooftop bars with a sociable small group."),

  // ── Luang Prabang ──
  E("luang-prabang","luang-prabang-kuang-si-day-trip","Kuang Si Waterfall Day Trip","DAY_TRIPS","landmark:kuang-si-waterfall-luang-prabang",35,"Half day","Swim the turquoise tiers of Kuang Si Falls and visit the bear rescue sanctuary on the way."),
  E("luang-prabang","luang-prabang-alms-temple-walk","Alms Giving & Temple Morning Walk","ARTS_CULTURE","landmark:wat-xieng-thong-temple-luang-prabang",25,"3 hours","Witness the dawn alms-giving ceremony and tour the gilded temples of the UNESCO old town respectfully with a guide."),
  E("luang-prabang","luang-prabang-mount-phousi-sunset","Mount Phousi Sunset & Photography","PHOTOGRAPHY_WALKS","landmark:mount-phousi-luang-prabang",18,"2.5 hours","Climb Mount Phousi for golden-hour views over the Mekong and the old town, with photo coaching along the way."),
  E("luang-prabang","luang-prabang-lao-cooking-class","Lao Cooking Class","FOOD_DRINK","activity:cooking",34,"4 hours","Market tour and hands-on class making larb, sticky rice, and Mekong riverweed with a Lao chef."),
  E("luang-prabang","luang-prabang-pak-ou-caves-boat","Pak Ou Caves Mekong Boat Trip","DAY_TRIPS","landmark:pak-ou-caves-luang-prabang",30,"Half day","Cruise the Mekong to the Pak Ou Caves' thousands of Buddha statues, stopping at a riverside whisky village."),

  // ── Pai ──
  E("pai","pai-canyon-sunset-hike","Pai Canyon Sunset Hike","OUTDOOR_ADVENTURE","landmark:pai-canyon-kong-lan",15,"2.5 hours","Walk the narrow red-earth ridges of Pai Canyon for one of northern Thailand's best sunsets."),
  E("pai","pai-hot-springs-spa-day","Pai Hot Springs & Spa Day","WELLNESS_MINDFULNESS","activity:spa",28,"Half day","Soak in natural geothermal hot springs followed by a traditional Thai massage in the Pai countryside."),
  E("pai","pai-countryside-waterfalls-hike","Pai Countryside & Waterfalls Hike","OUTDOOR_ADVENTURE","activity:trek",22,"Half day","Hike to Mor Paeng and Pam Bok waterfalls through rice fields and hill-tribe country around Pai."),
  E("pai","pai-northern-thai-cooking-class","Northern Thai Cooking Class","FOOD_DRINK","activity:cooking",30,"3.5 hours","Cook khao soi and northern Thai curries in a relaxed garden kitchen after a local market visit."),
  E("pai","pai-night-market-live-music","Pai Night Market & Live Music","NIGHTLIFE_SOCIAL","activity:bar",15,"Evening","Graze the walking-street night market then catch Pai's famous laid-back live-music bars."),

  // ── Penang ──
  E("penang","penang-george-town-street-art-walk","George Town Street Art Walking Tour","PHOTOGRAPHY_WALKS","landmark:george-town-street-art-penang",20,"3 hours","Hunt down George Town's famous murals and wrought-iron art through the UNESCO heritage lanes with a local guide."),
  E("penang","penang-hawker-food-tour","Penang Hawker Food Tour","FOOD_DRINK","activity:streetfood",35,"3.5 hours","Char kway teow, assam laksa, cendol — taste why Penang is Asia's street food capital on a guided hawker crawl."),
  E("penang","penang-nyonya-cooking-class","Nyonya Cooking Class","FOOD_DRINK","activity:cooking",42,"4 hours","Learn Peranakan Nyonya cuisine — laksa, rendang, kuih — with a market tour and a heritage home cook."),
  E("penang","penang-kek-lok-si-hill-tour","Kek Lok Si Temple & Penang Hill","ARTS_CULTURE","landmark:kek-lok-si-temple-penang",38,"Half day","Visit Malaysia's largest Buddhist temple then ride the funicular up Penang Hill for island views."),
  E("penang","penang-heritage-cycling-tour","Penang Heritage Cycling Tour","OUTDOOR_ADVENTURE","activity:cycling",28,"3 hours","Cycle George Town's clan jetties, temples, and colonial waterfront on a relaxed guided heritage ride."),

  // ── Phuket ──
  E("phuket","phuket-phang-nga-kayak-day-trip","Phang Nga Bay Sea Kayak Day Trip","DAY_TRIPS","landmark:phang-nga-bay-phuket",75,"Full day","Kayak through the hidden sea caves and towering limestone karsts of Phang Nga Bay, including James Bond Island."),
  E("phuket","phuket-scuba-diving-trip","Phuket Scuba Diving Trip","OUTDOOR_ADVENTURE","activity:diving",110,"Full day","Two-tank boat dive to the reefs of the Racha Islands with PADI guides — for certified divers and discover-scuba beginners."),
  E("phuket","phuket-big-buddha-old-town-tour","Big Buddha & Old Town Tour","ARTS_CULTURE","landmark:big-buddha-phuket",40,"Half day","Visit the 45-metre Big Buddha and Wat Chalong, then wander Phuket Old Town's Sino-Portuguese streets."),
  E("phuket","phuket-thai-cooking-class","Thai Cooking Class","FOOD_DRINK","activity:cooking",38,"4 hours","Market tour and hands-on class cooking southern Thai curries and pad thai with an island chef."),
  E("phuket","phuket-patong-bar-night","Patong Night Out","NIGHTLIFE_SOCIAL","activity:bar",35,"Evening","Experience Phuket's wildest nightlife on a guided Patong bar crawl with a social group."),

  // ── Siem Reap ──
  E("siem-reap","siem-reap-angkor-wat-sunrise","Angkor Wat Sunrise Tour","ARTS_CULTURE","landmark:angkor-wat-siem-reap",45,"Half day","Watch the sun rise behind Angkor Wat's towers, then explore the temple's galleries with an expert guide."),
  E("siem-reap","siem-reap-angkor-full-day","Angkor Temples Full-Day Tour","ARTS_CULTURE","landmark:ta-prohm-temple-siem-reap",65,"Full day","The grand circuit — Angkor Wat, the Bayon's faces, and jungle-wrapped Ta Prohm — with a Khmer guide."),
  E("siem-reap","siem-reap-tonle-sap-cruise","Tonle Sap Floating Village Cruise","DAY_TRIPS","landmark:tonle-sap-lake-siem-reap",35,"Half day","Boat through the stilted floating villages of Tonle Sap, Southeast Asia's largest freshwater lake."),
  E("siem-reap","siem-reap-khmer-cooking-class","Khmer Cooking Class","FOOD_DRINK","activity:cooking",32,"3.5 hours","Cook fish amok and Khmer curry from scratch after a tuk-tuk market tour with a Cambodian chef."),
  E("siem-reap","siem-reap-pub-street-food-crawl","Pub Street Food & Bar Crawl","NIGHTLIFE_SOCIAL","activity:bar",28,"Evening","Street snacks, fruit shakes, and Pub Street's buzzing bars — a sociable Siem Reap night."),

  // ── Singapore ──
  E("singapore","singapore-gardens-marina-tour","Gardens by the Bay & Marina Tour","ARTS_CULTURE","landmark:gardens-by-the-bay-singapore",50,"Half day","Explore the Supertree Grove and cooled conservatories, then walk the Marina Bay waterfront with a guide."),
  E("singapore","singapore-hawker-food-tour","Hawker Centre Food Tour","FOOD_DRINK","activity:streetfood2",55,"3.5 hours","Chili crab, Hainanese chicken rice, laksa — taste Singapore's Michelin-recognized hawker food with a local guide."),
  E("singapore","singapore-cooking-class","Singapore Cooking Class","FOOD_DRINK","activity:cooking",60,"3.5 hours","Cook Singapore's multicultural classics — laksa, chicken rice, kaya — in a hands-on small-group class."),
  E("singapore","singapore-sentosa-island-day","Sentosa Island Day","OUTDOOR_ADVENTURE","landmark:sentosa-island-singapore",45,"Full day","Beaches, cable cars, and attractions on Sentosa — Singapore's island playground."),
  E("singapore","singapore-clarke-quay-bar-night","Clarke Quay & Rooftop Bars","NIGHTLIFE_SOCIAL","activity:bar",55,"Evening","Riverside Clarke Quay followed by skyline rooftop bars on a social Singapore night out."),

  // ── Ubud ──
  E("ubud","ubud-rice-terraces-temples-tour","Tegallalang Terraces & Temples","ARTS_CULTURE","landmark:tegallalang-rice-terraces-ubud",40,"Full day","Tour the emerald Tegallalang rice terraces, a holy water temple, and Ubud's craft villages with a Balinese guide."),
  E("ubud","ubud-mount-batur-sunrise-trek","Mount Batur Sunrise Trek","OUTDOOR_ADVENTURE","landmark:mount-batur-sunrise-trek-ubud",55,"Half day","Pre-dawn hike up the Mount Batur volcano for a sunrise above the clouds, with breakfast cooked by volcanic steam.","daily",1,12),
  E("ubud","ubud-balinese-cooking-class","Balinese Cooking Class","FOOD_DRINK","activity:cooking",38,"4 hours","Market tour and hands-on class cooking sate lilit, lawar, and base genep spice paste with a Balinese family."),
  E("ubud","ubud-yoga-meditation","Ubud Yoga & Meditation","WELLNESS_MINDFULNESS","activity:yoga",22,"2 hours","A grounding yoga and meditation session in a jungle shala — Ubud is the wellness heart of Bali.","daily",1,18),
  E("ubud","ubud-balinese-spa-flower-bath","Balinese Spa & Flower Bath","WELLNESS_MINDFULNESS","activity:spa",45,"2.5 hours","A traditional Balinese massage, body scrub, and flower-petal bath in a serene Ubud spa."),

  // ── Ulaanbaatar ──
  E("ulaanbaatar","ulaanbaatar-terelj-nomad-day-trip","Terelj Park & Nomad Day Trip","DAY_TRIPS","activity:trek",90,"Full day","Drive into Gorkhi-Terelj National Park for steppe hikes, a nomadic ger family visit, and the giant Chinggis statue."),
  E("ulaanbaatar","ulaanbaatar-chinggis-statue-museum","Chinggis Khan Statue & Museum Tour","ARTS_CULTURE","landmark:chinggis-khan-equestrian-statue-ulaanbaatar",55,"Half day","Visit the colossal Chinggis Khan equestrian statue and the National Museum to trace Mongolia's empire history."),
  E("ulaanbaatar","ulaanbaatar-gandan-monastery-city","Gandan Monastery & City Tour","ARTS_CULTURE","landmark:gandan-monastery-ulaanbaatar",35,"Half day","Hear the chanting monks at Gandan Monastery and tour Sukhbaatar Square and central Ulaanbaatar."),
  E("ulaanbaatar","ulaanbaatar-hustai-wild-horses","Hustai Wild Horses Day Trip","OUTDOOR_ADVENTURE","landmark:hustai-national-park-ulaanbaatar",85,"Full day","Track the once-extinct wild Przewalski's horses in Hustai National Park on a guided steppe safari."),
  E("ulaanbaatar","ulaanbaatar-mongolian-bbq-experience","Mongolian BBQ & Cooking Experience","FOOD_DRINK","activity:cooking2",40,"3 hours","Learn to make buuz dumplings and a traditional khorkhog hot-stone BBQ with a Mongolian host."),

  // ── Xi'an ──
  E("xian","xian-terracotta-army-tour","Terracotta Army Day Tour","ARTS_CULTURE","landmark:terracotta-army-museum-xian",60,"Full day","See the 8,000 life-size warriors of the Terracotta Army with an expert guide, plus the Emperor's tomb mound."),
  E("xian","xian-city-wall-cycling","Xi'an City Wall Cycling","OUTDOOR_ADVENTURE","landmark:ancient-city-wall-xian",30,"3 hours","Cycle the full 14 km circuit atop the world's most complete ancient city wall, with a guide and bike included."),
  E("xian","xian-muslim-quarter-food-tour","Muslim Quarter Street Food Tour","FOOD_DRINK","activity:streetfood",32,"3 hours","Roujiamo, biangbiang noodles, and lamb skewers — eat through Xi'an's centuries-old Muslim Quarter with a guide."),
  E("xian","xian-tang-dynasty-dumpling-show","Tang Dynasty Dumpling Banquet & Show","FOOD_DRINK","activity:streetfood2",55,"Evening","An 18-course dumpling banquet followed by the Tang Dynasty music and dance show."),
  E("xian","xian-hand-pulled-noodle-class","Hand-Pulled Noodle Cooking Class","FOOD_DRINK","activity:cooking2",35,"3 hours","Learn the art of hand-pulling Shaanxi biangbiang noodles in a hands-on class with a local noodle master."),
];

module.exports = { EXPERIENCES, ACTIVITY_PHOTOS, CITY_NAMES };
