// 45 experiences (5 each) for the 9 new Asian cities.
// img: "landmark:<spot-slug>" reuses a real /public/spots photo; "activity:<key>" = verified Unsplash.
const ACTIVITY_PHOTOS = {
  cooking:    "1556909114-f6e7ad7d3136",
  streetfood: "1504674900247-0877df9cc836",
  bar:        "1514933651103-005eec06c04b",
  trek:       "1551632811-561732d1e306",
  yoga:       "1545205597-3d9d02c29597",
};
const CITY_NAMES = { jaipur:"Jaipur", udaipur:"Udaipur", varanasi:"Varanasi", tokyo:"Tokyo", osaka:"Osaka", nara:"Nara", busan:"Busan", jeju:"Jeju", gyeongju:"Gyeongju" };
const E = (city, slug, name, category, img, price, duration, desc, freq="daily", min=1, max=12) =>
  ({ city, slug, name, category, img, price, duration, description: desc, frequency: freq, groupSizeMin: min, groupSizeMax: max });

const EXPERIENCES = [
  // ── Jaipur ──
  E("jaipur","jaipur-amber-fort-city-palace-tour","Amber Fort & City Palace Tour","ARTS_CULTURE","landmark:amber-fort-jaipur",40,"Full day","Explore the hilltop Amber Fort, the royal City Palace and Jantar Mantar observatory with a local guide steeped in Rajput history."),
  E("jaipur","jaipur-pink-city-heritage-walk","Pink City Heritage Walk","ARTS_CULTURE","landmark:hawa-mahal-jaipur",20,"3 hours","Wander the bazaars of the walled Pink City, the Hawa Mahal and hidden temples on a guided morning walk."),
  E("jaipur","jaipur-rajasthani-cooking-class","Rajasthani Cooking Class","FOOD_DRINK","activity:cooking",35,"4 hours","Cook dal baati churma, gatte ki sabzi and pyaaz kachori with a local family, with a market visit and a hearty thali to finish."),
  E("jaipur","jaipur-street-food-tour","Old City Street Food Tour","FOOD_DRINK","activity:streetfood",25,"3 hours","Graze the bazaars for pyaaz kachori, lassi, ghewar and Rajasthani chaat with a food-loving local guide."),
  E("jaipur","jaipur-nahargarh-sunset-tour","Nahargarh Fort Sunset Tour","DAY_TRIPS","landmark:nahargarh-fort-jaipur",30,"Half day","Drive up to clifftop Nahargarh Fort for golden-hour views over the whole Pink City and a relaxed café perch."),

  // ── Udaipur ──
  E("udaipur","udaipur-lake-pichola-sunset-cruise","Lake Pichola Sunset Boat Cruise","DAY_TRIPS","landmark:lake-pichola-udaipur",30,"2 hours","Glide across Lake Pichola at golden hour past the island palaces and ghats — Udaipur's most magical experience."),
  E("udaipur","udaipur-city-palace-old-city-walk","City Palace & Old City Walk","ARTS_CULTURE","landmark:city-palace-udaipur",25,"3 hours","Tour Rajasthan's largest palace and the lanes, temples and ghats of the old city with a knowledgeable guide."),
  E("udaipur","udaipur-rajasthani-cooking-class","Rajasthani Cooking Class","FOOD_DRINK","activity:cooking",30,"3.5 hours","Learn authentic Mewari home cooking — curries, breads and chai — in a rooftop kitchen with lake views."),
  E("udaipur","udaipur-folk-dance-evening","Bagore Ki Haveli Folk Dance Evening","ARTS_CULTURE","landmark:bagore-ki-haveli-udaipur",15,"1.5 hours","Watch the nightly Dharohar show of Rajasthani folk dance, puppetry and the famous balancing-pots dance by the lake."),
  E("udaipur","udaipur-monsoon-palace-sunset","Monsoon Palace Sunset Trip","DAY_TRIPS","landmark:monsoon-palace-udaipur",28,"Half day","Drive up to the hilltop Monsoon Palace for the finest panoramic sunset over Udaipur's lakes and the Aravalli hills."),

  // ── Varanasi ──
  E("varanasi","varanasi-sunrise-boat-tour","Sunrise Rowboat & Ghats Tour","OUTDOOR_ADVENTURE","landmark:assi-ghat-varanasi",20,"2 hours","Glide along the Ganges at dawn as the ghats awaken with bathers, yogis and prayer — the definitive Varanasi experience."),
  E("varanasi","varanasi-ganga-aarti-evening","Evening Ganga Aarti Ceremony","ARTS_CULTURE","landmark:dashashwamedh-ghat-varanasi",15,"2 hours","Witness the spectacular fire-and-chant Ganga Aarti at Dashashwamedh Ghat with a guide who explains the ancient ritual."),
  E("varanasi","varanasi-old-city-food-walk","Old City Heritage & Food Walk","FOOD_DRINK","activity:streetfood",22,"3 hours","Thread the labyrinthine lanes of old Banaras for kachori sabzi, clay-cup lassi, chaat and the city's living traditions."),
  E("varanasi","varanasi-sarnath-day-trip","Sarnath Buddhist Day Trip","DAY_TRIPS","landmark:sarnath-varanasi",30,"Half day","Visit the site of the Buddha's first sermon — the Dhamek Stupa, monasteries and museum — a calm contrast to the city."),
  E("varanasi","varanasi-ganges-yoga-meditation","Sunrise Yoga & Meditation by the Ganges","WELLNESS_MINDFULNESS","activity:yoga",15,"1.5 hours","Join a riverside dawn yoga and meditation session at Assi Ghat as the sun rises over the holy Ganges."),

  // ── Tokyo ──
  E("tokyo","tokyo-tsukiji-asakusa-food-tour","Tsukiji & Asakusa Food Tour","FOOD_DRINK","activity:streetfood",60,"3.5 hours","Eat through the Tsukiji outer market and old Asakusa — sushi, tamagoyaki, tempura and street sweets — with a local foodie."),
  E("tokyo","tokyo-senso-ji-asakusa-walk","Sensō-ji & Asakusa Cultural Walk","ARTS_CULTURE","landmark:senso-ji-tokyo",30,"2.5 hours","Explore Tokyo's oldest temple, the Nakamise shopping street and old-town Asakusa with a storytelling guide."),
  E("tokyo","tokyo-shibuya-shinjuku-night-tour","Shibuya & Shinjuku Night Tour","NIGHTLIFE_SOCIAL","landmark:shibuya-crossing-tokyo",55,"3 hours","Cross the famous scramble, then dive into the lantern-lit izakaya alleys of Shinjuku for drinks and skewers with a group."),
  E("tokyo","tokyo-sushi-making-class","Sushi-Making Class","FOOD_DRINK","activity:cooking",70,"3 hours","Learn to shape nigiri and roll maki from a Tokyo chef, then feast on your own sushi in a hands-on small-group class."),
  E("tokyo","tokyo-mount-fuji-hakone-day-trip","Mt Fuji & Hakone Day Trip","DAY_TRIPS","activity:trek",110,"Full day","Escape the city for Mt Fuji's fifth station, a Lake Ashi cruise and the hot-spring town of Hakone on a guided day trip."),

  // ── Osaka ──
  E("osaka","osaka-castle-history-tour","Osaka Castle & History Tour","ARTS_CULTURE","landmark:osaka-castle",35,"3 hours","Tour the mighty Osaka Castle and its park with a guide bringing the warlords and sieges of Japan's past to life."),
  E("osaka","osaka-dotonbori-street-food-crawl","Dōtonbori Street Food Crawl","FOOD_DRINK","landmark:dotonbori-osaka",50,"3 hours","Eat your way along neon-lit Dōtonbori — takoyaki, okonomiyaki, kushikatsu and more — in Japan's street-food capital."),
  E("osaka","osaka-okonomiyaki-cooking-class","Okonomiyaki & Takoyaki Class","FOOD_DRINK","activity:cooking",45,"2.5 hours","Cook Osaka's beloved savoury pancakes and octopus balls yourself on a tabletop griddle in a fun hands-on class."),
  E("osaka","osaka-bar-hopping-night","Osaka Bar-Hopping Night","NIGHTLIFE_SOCIAL","activity:bar",50,"3 hours","Hop between tiny standing bars and izakayas in retro Shinsekai and Namba with a local guide and a sociable group."),
  E("osaka","osaka-nara-deer-day-trip","Nara Deer Park Day Trip","DAY_TRIPS","landmark:nara-park-deer",55,"Full day","An easy guided day trip to Nara to meet the bowing deer and stand before the Great Buddha of Tōdai-ji."),

  // ── Nara ──
  E("nara","nara-todaiji-great-buddha-tour","Tōdai-ji & Great Buddha Tour","ARTS_CULTURE","landmark:todai-ji-nara",30,"2.5 hours","Stand before the colossal bronze Great Buddha and explore the world's great wooden hall with a local guide."),
  E("nara","nara-park-deer-temples-walk","Nara Park Deer & Temples Walk","OUTDOOR_ADVENTURE","landmark:nara-park-deer",25,"3 hours","Stroll the deer-filled park between Tōdai-ji, Kōfuku-ji and the lantern shrine, feeding the famously polite sika deer."),
  E("nara","nara-kasuga-taisha-visit","Kasuga Taisha Lantern Shrine Visit","ARTS_CULTURE","landmark:kasuga-taisha-nara",20,"2 hours","Walk the forest approach to Nara's most sacred shrine, lined with thousands of moss-covered stone lanterns."),
  E("nara","nara-sake-tasting","Naramachi Old Town & Sake Tasting","FOOD_DRINK","activity:bar",40,"2.5 hours","Explore the latticed merchant townhouses of Naramachi and taste local sake at a historic brewery."),
  E("nara","nara-wakakusa-sunset-hike","Mount Wakakusa Sunset Hike","OUTDOOR_ADVENTURE","landmark:mount-wakakusa-nara",20,"Half day","Climb the grassy hill above the park for a sweeping sunset panorama over Nara's temples and the valley."),

  // ── Busan ──
  E("busan","busan-gamcheon-village-walk","Gamcheon Culture Village Art Walk","ARTS_CULTURE","landmark:gamcheon-culture-village-busan",25,"3 hours","Wander the pastel hillside lanes, murals and tiny galleries of Busan's colourful 'Machu Picchu of Korea' with a local guide."),
  E("busan","busan-yonggungsa-temple-tour","Haedong Yonggungsa Seaside Temple Tour","ARTS_CULTURE","landmark:haedong-yonggungsa-busan",35,"Half day","Visit Korea's most beautiful seaside temple perched on the rocks, plus coastal viewpoints, on a guided morning trip."),
  E("busan","busan-jagalchi-seafood-tour","Jagalchi Market Seafood Tour","FOOD_DRINK","landmark:jagalchi-market-busan",40,"3 hours","Pick fresh catch at Korea's largest fish market and have it served sashimi-style upstairs with a seafood-savvy guide."),
  E("busan","busan-bbq-nightlife","Korean BBQ & Nightlife","NIGHTLIFE_SOCIAL","activity:bar",45,"3.5 hours","Grill Korean BBQ then hit the bars of buzzing Gwangalli and Seomyeon with a sociable group — easy for solo travellers."),
  E("busan","busan-taejongdae-coastal-hike","Taejongdae Coastal Hike","OUTDOOR_ADVENTURE","landmark:taejongdae-busan",20,"Half day","Hike the dramatic sea-cliff park of Taejongdae to the lighthouse and observatory above the crashing Korea Strait."),

  // ── Jeju ──
  E("jeju","jeju-seongsan-sunrise-hike","Seongsan Ilchulbong Sunrise Hike","OUTDOOR_ADVENTURE","landmark:seongsan-ilchulbong-jeju",20,"Half day","Climb the volcanic 'Sunrise Peak' crater for one of Korea's great dawns over the sea — Jeju's iconic UNESCO cone."),
  E("jeju","jeju-hallasan-summit-hike","Hallasan Summit Day Hike","OUTDOOR_ADVENTURE","landmark:hallasan-jeju",35,"Full day","A guided day hike up South Korea's highest peak through changing forest to the crater lake at the summit."),
  E("jeju","jeju-olle-coastal-trail-walk","Jeju Olle Coastal Trail Walk","OUTDOOR_ADVENTURE","landmark:jeju-olle-trail",25,"Half day","Walk a scenic stretch of Jeju's beloved Olle coastal path past turquoise coves, lava shore and fishing villages."),
  E("jeju","jeju-black-pork-food-tour","Jeju Black Pork & Market Food Tour","FOOD_DRINK","activity:streetfood",45,"3 hours","Taste Jeju's prized black-pork BBQ, hairtail and citrus treats through Dongmun Market with a local guide."),
  E("jeju","jeju-manjanggul-east-coast-tour","Manjanggul Lava Tube & East Coast Tour","DAY_TRIPS","landmark:manjanggul-cave-jeju",60,"Full day","Explore the vast UNESCO lava tube and the east coast's beaches, cliffs and tea fields on a guided island day trip."),

  // ── Gyeongju ──
  E("gyeongju","gyeongju-bulguksa-seokguram-tour","Bulguksa Temple & Seokguram Tour","ARTS_CULTURE","landmark:bulguksa-gyeongju",35,"Half day","Tour Korea's most celebrated temple and the sublime Seokguram Buddha grotto, two UNESCO treasures, with a guide."),
  E("gyeongju","gyeongju-wolji-pond-night-tour","Donggung Palace & Wolji Pond Night Tour","ARTS_CULTURE","landmark:donggung-wolji-gyeongju",25,"2 hours","See the floodlit Silla palace mirrored in Wolji Pond after dark — Gyeongju's most beautiful evening scene."),
  E("gyeongju","gyeongju-silla-tombs-bike-tour","Silla Tombs & Cheomseongdae Bike Tour","OUTDOOR_ADVENTURE","landmark:daereungwon-gyeongju",30,"3 hours","Cycle the flat historic core past royal burial mounds, the ancient observatory and lotus ponds with a local guide."),
  E("gyeongju","gyeongju-hanok-food-walk","Hanok & Ssambap Food Walk","FOOD_DRINK","activity:streetfood",30,"3 hours","Sample Gyeongju's famous ssambap wraps, hwangnam-ppang pastries and café-street treats among restored hanok."),
  E("gyeongju","gyeongju-yangdong-village-day-trip","Yangdong Folk Village Day Trip","DAY_TRIPS","landmark:yangdong-village-gyeongju",35,"Half day","Visit the UNESCO-listed Joseon clan village of thatched and tiled houses set among hills and rice fields."),
];

module.exports = { EXPERIENCES, ACTIVITY_PHOTOS, CITY_NAMES };
