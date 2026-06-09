const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CITY = {
  jaipur:   'cmq6ebcqh0001vi9cmwh5di43',
  udaipur:  'cmq6ebdji0003vi9cs7lnb7df',
  varanasi: 'cmq6ebeae0005vi9cw77l0ik8',
  tokyo:    'cmq6ebesv0007vi9cru7xx9x0',
  osaka:    'cmq6ebfb90009vi9crk0y1ieb',
  nara:     'cmq6ebfto000bvi9c9j7v0n6a',
  busan:    'cmq6ebgc7000dvi9cy065iz87',
  jeju:     'cmq6ebgui000fvi9c6ck3vcas',
  gyeongju: 'cmq6ebhd6000hvi9c3a5z3k9w',
};

// S(slug, name, category, priceRange, rating, description, tags[])
const S = (slug, name, category, priceRange, rating, description, tags) => ({
  slug, name, category, priceRange, rating, description, tags,
  imageUrl: `/spots/${slug}.jpg`,
  googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(name)}`,
});

const DATA = {
  jaipur: [
    S('hawa-mahal-jaipur','Hawa Mahal','CULTURE','BUDGET',4.6,"The 'Palace of Winds' — a five-storey honeycomb of 953 latticed windows built so royal women could watch street life unseen. Jaipur's pink-sandstone icon.",['palace','iconic','pink-city','heritage']),
    S('amber-fort-jaipur','Amber Fort','CULTURE','BUDGET',4.7,"A magnificent hilltop fort-palace of cobbled ramps, mirror-work halls and ramparts above Maota Lake — Jaipur's grandest sight.",['fort','palace','hilltop','iconic']),
    S('city-palace-jaipur','City Palace Jaipur','CULTURE','BUDGET',4.6,"The still-royal palace complex at the heart of the old city, with courtyards, a textile museum and the famous peacock gate.",['palace','museum','royal','heritage']),
    S('jantar-mantar-jaipur','Jantar Mantar','CULTURE','BUDGET',4.5,"A surreal UNESCO observatory of giant 18th-century stone astronomical instruments, including the world's largest sundial.",['unesco','observatory','science','heritage']),
    S('nahargarh-fort-jaipur','Nahargarh Fort','CULTURE','BUDGET',4.5,"A clifftop fort overlooking the whole pink city — best at sunset, with a relaxed café on the ramparts.",['fort','sunset','views','hilltop']),
    S('jal-mahal-jaipur','Jal Mahal','CULTURE','FREE',4.3,"The 'Water Palace' seemingly floating in the middle of Man Sagar Lake — a serene photo stop on the way to Amber.",['palace','lake','photo','landmark']),
    S('albert-hall-museum-jaipur','Albert Hall Museum','CULTURE','BUDGET',4.4,"Rajasthan's oldest museum in a glorious Indo-Saracenic building, floodlit golden at night in Ram Niwas Garden.",['museum','architecture','heritage','indoor']),
    S('galtaji-monkey-temple-jaipur','Galtaji (Monkey Temple)','CULTURE','FREE',4.3,"A string of sacred spring-fed pools in a rocky gorge, home to troops of monkeys — atmospheric and offbeat.",['temple','monkeys','offbeat','sacred']),
    S('johari-bazaar-jaipur','Johari Bazaar','COMMUNITY','BUDGET',4.4,"Jaipur's jewellery and textile bazaar — a sensory crush of gemstones, block-prints, bangles and street snacks in the old city.",['bazaar','shopping','jewellery','old-city']),
    S('tattoo-cafe-jaipur','Tattoo Cafe & Lounge','CAFE','BUDGET',4.3,"A rooftop café with the best front-row view of the floodlit Hawa Mahal — coffee, thalis and a perfect sunset perch.",['cafe','rooftop','view','hawa-mahal']),
    S('curious-life-coffee-jaipur','Curious Life Coffee Roasters','CAFE','BUDGET',4.5,"Jaipur's specialty-coffee pioneer — well-pulled espresso, brunch and a calm work-friendly room in C-Scheme.",['specialty-coffee','brunch','work-friendly','roaster']),
    S('spice-court-jaipur','Spice Court','FOOD','MID',4.4,"A long-loved Rajasthani restaurant for laal maas, dal baati churma and royal Rajput cooking in a colonial bungalow.",['rajasthani','laal-maas','heritage','local']),
    S('lmb-jaipur','Laxmi Misthan Bhandar (LMB)','FOOD','BUDGET',4.3,"A 1950s Johari Bazaar institution for pure-veg Rajasthani thalis and famous sweets like ghewar and paneer ghee.",['vegetarian','thali','sweets','heritage']),
    S('rambagh-palace-jaipur','Rambagh Palace','ACCOMMODATION','HIGH',4.8,"A former maharaja's palace turned Taj hotel — peacock gardens, marble corridors and the city's most regal stay.",['palace-hotel','luxury','heritage','iconic']),
    S('zostel-jaipur','Zostel Jaipur','ACCOMMODATION','BUDGET',4.4,"A sociable backpacker hostel with a buzzing rooftop café — the easiest place to meet others in the Pink City.",['hostel','social','rooftop','backpacker']),
    S('madhuban-haveli-jaipur','Madhuban Haveli','ACCOMMODATION','MID',4.5,"A heritage haveli guesthouse with frescoed rooms, a courtyard restaurant and warm family hospitality.",['haveli','heritage','boutique','courtyard']),
    S('jaipur-coworking','Jaipur Coworking (myHQ)','COWORKING','BUDGET',4.2,"A reliable coworking spot with fast wifi and day passes for remote workers exploring Rajasthan.",['coworking','wifi','day-pass','remote-work']),
    S('amer-sound-light-show-jaipur','Amber Fort Light & Sound Show','NIGHTLIFE','BUDGET',4.3,"An evening sound-and-light spectacle narrating Amber's history against the floodlit fort — Jaipur's signature night out.",['evening','show','fort','cultural']),
    S('central-park-jaipur','Central Park Jaipur','NATURE','FREE',4.3,"The city's big green lung with jogging tracks, a giant flag and rose gardens — a calm morning escape.",['park','jogging','green','free']),
    S('jaipur-block-printing-workshop','Sanganer Block-Printing Village','CULTURE','BUDGET',4.4,"The traditional hand-block-printing and handmade-paper village on Jaipur's edge — watch artisans and try it yourself.",['craft','block-print','artisan','workshop']),
  ],

  udaipur: [
    S('city-palace-udaipur','City Palace Udaipur','CULTURE','BUDGET',4.7,"Rajasthan's largest palace complex rising above Lake Pichola — a maze of courtyards, balconies and mosaics with sublime lake views.",['palace','lake','royal','iconic']),
    S('lake-pichola-udaipur','Lake Pichola','NATURE','BUDGET',4.7,"The shimmering heart of Udaipur — a sunset boat ride past island palaces and ghats is the city's defining experience.",['lake','boat','sunset','iconic']),
    S('jagdish-temple-udaipur','Jagdish Temple','CULTURE','FREE',4.5,"A soaring 17th-century Indo-Aryan temple of carved elephants and musicians, alive with bells in the old city.",['temple','carvings','heritage','old-city']),
    S('saheliyon-ki-bari-udaipur','Saheliyon Ki Bari','NATURE','BUDGET',4.3,"The 'Garden of the Maidens' — fountains, lotus pools and marble pavilions built for royal ladies-in-waiting.",['garden','fountains','royal','relaxed']),
    S('fateh-sagar-lake-udaipur','Fateh Sagar Lake','NATURE','FREE',4.5,"A breezy lake ringed by hills with a lakeside promenade, islands and the city's best evening hangout.",['lake','promenade','sunset','relaxed']),
    S('monsoon-palace-udaipur','Monsoon Palace (Sajjangarh)','CULTURE','BUDGET',4.4,"A hilltop palace built to watch the monsoon clouds — now the finest panoramic sunset viewpoint over the lakes.",['palace','sunset','views','hilltop']),
    S('bagore-ki-haveli-udaipur','Bagore Ki Haveli','CULTURE','BUDGET',4.5,"A restored 18th-century lakeside mansion-museum hosting a nightly Dharohar folk dance show.",['haveli','museum','folk-dance','heritage']),
    S('jag-mandir-udaipur','Jag Mandir','CULTURE','MID',4.4,"An exquisite 17th-century island palace on Lake Pichola, reached by boat — gardens, marble and royal romance.",['palace','island','boat','romantic']),
    S('ambrai-ghat-udaipur','Ambrai Ghat','COMMUNITY','FREE',4.5,"The classic postcard viewpoint of the City Palace mirrored in the lake — magical at sunrise and after dark.",['ghat','view','photo','sunset']),
    S('jheel-cafe-udaipur','Jheel\'s Ginger Coffee Bar','CAFE','BUDGET',4.4,"A lakeside café right on the water with City Palace views, good coffee and homemade cakes.",['cafe','lake-view','coffee','relaxed']),
    S('cafe-edelweiss-udaipur','Café Edelweiss','CAFE','BUDGET',4.4,"A cosy European-style bakery-café beloved for its apple strudel, brownies and proper espresso.",['cafe','bakery','dessert','espresso']),
    S('ambrai-restaurant-udaipur','Ambrai Restaurant','FOOD','MID',4.5,"A romantic waterside restaurant facing the floodlit City Palace — Rajasthani and Indian classics by the lake.",['indian','lakeside','romantic','view']),
    S('millets-of-mewar-udaipur','Millets of Mewar','FOOD','BUDGET',4.4,"A health-focused café serving millet thalis, wholesome bowls and local Mewari dishes near Hanuman Ghat.",['healthy','millet','vegetarian','local']),
    S('taj-lake-palace-udaipur','Taj Lake Palace','ACCOMMODATION','HIGH',4.8,"The legendary white-marble palace hotel floating on Lake Pichola — one of the most romantic stays on earth.",['palace-hotel','luxury','lake','iconic']),
    S('zostel-udaipur','Zostel Udaipur','ACCOMMODATION','BUDGET',4.5,"A lively lakeside hostel with a rooftop café and sunset views — a social base for solo travellers.",['hostel','social','rooftop','lake-view']),
    S('jagat-niwas-udaipur','Jagat Niwas Palace Hotel','ACCOMMODATION','MID',4.5,"A heritage haveli hotel on Lake Pichola with antique rooms and a celebrated rooftop restaurant.",['haveli','heritage','lake-view','boutique']),
    S('shilpgram-udaipur','Shilpgram Crafts Village','CULTURE','BUDGET',4.2,"A living rural-arts complex showcasing tribal crafts, music and dance from western India.",['crafts','culture','village','artisan']),
    S('vintage-car-museum-udaipur','Vintage & Classic Car Museum','CULTURE','BUDGET',4.3,"The royal collection of Rolls-Royces, Cadillacs and a Mewar state car — a fun, offbeat stop.",['museum','cars','offbeat','royal']),
    S('badi-lake-udaipur','Badi Lake','NATURE','FREE',4.4,"A serene lake just outside town with marble ghats and hilltop views — a quiet sunset escape from the crowds.",['lake','quiet','sunset','offbeat']),
  ],

  varanasi: [
    S('dashashwamedh-ghat-varanasi','Dashashwamedh Ghat','CULTURE','FREE',4.7,"Varanasi's main and most vibrant ghat, where the spectacular Ganga Aarti unfolds with fire, chants and crowds each night.",['ghat','aarti','ganges','iconic']),
    S('kashi-vishwanath-varanasi','Kashi Vishwanath Temple','CULTURE','FREE',4.6,"One of the holiest Shiva temples in Hinduism, its golden spires at the heart of the new riverside corridor.",['temple','shiva','sacred','iconic']),
    S('assi-ghat-varanasi','Assi Ghat','CULTURE','FREE',4.5,"The southern ghat famed for its peaceful dawn yoga and Subah-e-Banaras morning aarti — a calmer slice of the river.",['ghat','sunrise','yoga','aarti']),
    S('manikarnika-ghat-varanasi','Manikarnika Ghat','CULTURE','FREE',4.3,"The principal cremation ghat — a raw, profound encounter with the Hindu cycle of life and death on the Ganges.",['ghat','sacred','cremation','spiritual']),
    S('sarnath-varanasi','Sarnath','CULTURE','BUDGET',4.5,"Where the Buddha gave his first sermon — the great Dhamek Stupa, monasteries and an excellent archaeological museum.",['buddhist','stupa','heritage','day-trip']),
    S('ramnagar-fort-varanasi','Ramnagar Fort','CULTURE','BUDGET',4.2,"The crumbling 18th-century riverside fort and palace of the Maharaja of Banaras, with a quirky vintage museum.",['fort','museum','river','heritage']),
    S('banaras-hindu-university-varanasi','Banaras Hindu University & New Vishwanath Temple','CULTURE','FREE',4.4,"A vast leafy campus and the marble New Vishwanath (Birla) Temple — a calm, green contrast to the old city.",['campus','temple','green','calm']),
    S('subah-e-banaras-varanasi','Subah-e-Banaras Morning Ritual','COMMUNITY','FREE',4.6,"The daily sunrise programme of Vedic chants, classical music and yoga at Assi Ghat — Varanasi at its most serene.",['sunrise','ritual','music','ghat']),
    S('blue-lassi-varanasi','Blue Lassi Shop','FOOD','BUDGET',4.5,"A tiny, decades-old hole-in-the-wall in the old lanes serving dozens of fresh clay-cup lassis — a Varanasi rite of passage.",['lassi','street-food','heritage','iconic']),
    S('kashi-chat-bhandar-varanasi','Kashi Chat Bhandar','FOOD','BUDGET',4.4,"A legendary chaat counter for tamatar chaat, palak chaat and golgappa in the heart of the bazaar.",['chaat','street-food','vegetarian','local']),
    S('pizzeria-vaatika-varanasi','Pizzeria Vaatika Café','CAFE','BUDGET',4.4,"A mellow terraced café on Assi Ghat with wood-fired pizza, apple pie and unbeatable river views.",['cafe','pizza','river-view','relaxed']),
    S('open-hand-cafe-varanasi','Open Hand Café & Shop','CAFE','BUDGET',4.4,"A bright fair-trade café and craft shop near Assi with good coffee, breakfasts and a calm work-friendly vibe.",['cafe','coffee','fair-trade','work-friendly']),
    S('brijrama-palace-varanasi','BrijRama Palace','ACCOMMODATION','HIGH',4.7,"A restored 18th-century palace hotel right on Darbhanga Ghat — heritage rooms and a lift down to the river.",['palace-hotel','heritage','ghat','luxury']),
    S('zostel-varanasi','Zostel Varanasi','ACCOMMODATION','BUDGET',4.4,"A backpacker hostel near the ghats with a sociable rooftop overlooking the Ganges — ideal for solo travellers.",['hostel','social','rooftop','ghat']),
    S('ganpati-guesthouse-varanasi','Ganpati Guesthouse','ACCOMMODATION','MID',4.4,"A long-running riverfront guesthouse on the ghats with its own steps to the Ganges and a lovely terrace.",['guesthouse','riverfront','terrace','heritage']),
    S('silk-weaving-varanasi','Banarasi Silk Weaving Workshop','CULTURE','BUDGET',4.3,"Visit the looms of the old Muslim weavers' quarter to see how the city's famous Banarasi silk saris are made.",['craft','silk','artisan','heritage']),
    S('boat-ride-varanasi','Sunrise Rowing Boat on the Ganges','NATURE','BUDGET',4.7,"A dawn rowboat glide past the awakening ghats — the definitive, unmissable Varanasi experience.",['boat','sunrise','ganges','iconic']),
  ],

  tokyo: [
    S('senso-ji-tokyo','Sensō-ji Temple','CULTURE','FREE',4.6,"Tokyo's oldest temple in Asakusa — the giant Kaminarimon lantern, the Nakamise shopping street and a five-storey pagoda.",['temple','asakusa','iconic','heritage']),
    S('meiji-shrine-tokyo','Meiji Shrine','CULTURE','FREE',4.6,"A grand Shinto shrine wrapped in a tranquil forest beside Harajuku — towering torii gates and a sake-barrel avenue.",['shrine','forest','shinto','calm']),
    S('tokyo-skytree','Tokyo Skytree','CULTURE','MID',4.5,"The world's tallest tower, with vertiginous glass-floor observation decks over the endless Tokyo sprawl.",['tower','views','modern','iconic']),
    S('shibuya-crossing-tokyo','Shibuya Crossing','COMMUNITY','FREE',4.6,"The planet's busiest pedestrian scramble — neon, crowds and the buzzing heart of youthful Tokyo.",['crossing','neon','iconic','people-watching']),
    S('tokyo-tower','Tokyo Tower','CULTURE','MID',4.4,"The candy-striped 1958 icon inspired by the Eiffel Tower, glowing orange over the city at night.",['tower','views','retro','iconic']),
    S('ueno-park-tokyo','Ueno Park','NATURE','FREE',4.4,"A vast park of museums, a zoo, lotus ponds and Tokyo's most famous cherry-blossom avenues.",['park','museums','cherry-blossom','green']),
    S('shinjuku-gyoen-tokyo','Shinjuku Gyoen','NATURE','BUDGET',4.6,"One of Tokyo's finest gardens — English, French and Japanese landscapes and a glasshouse, an oasis amid skyscrapers.",['garden','oasis','cherry-blossom','relaxed']),
    S('teamlab-planets-tokyo','teamLab Planets','CULTURE','MID',4.6,"A wade-through, immersive digital-art museum of mirrored water rooms and floating flowers in Toyosu.",['art','immersive','digital','modern']),
    S('tsukiji-outer-market-tokyo','Tsukiji Outer Market','FOOD','BUDGET',4.5,"The buzzing food lanes of the old fish market — fresh sushi, tamagoyaki and street snacks from dawn.",['market','sushi','street-food','iconic']),
    S('harajuku-takeshita-tokyo','Harajuku & Takeshita Street','COMMUNITY','FREE',4.4,"The candy-coloured epicentre of Japanese youth fashion — crêpes, kawaii shops and people-watching.",['fashion','youth','shopping','quirky']),
    S('akihabara-tokyo','Akihabara','COMMUNITY','FREE',4.4,"Electric Town — neon-lit floors of anime, manga, retro games and arcades, Tokyo's geek-culture capital.",['anime','electronics','arcades','neon']),
    S('golden-gai-tokyo','Shinjuku Golden Gai','NIGHTLIFE','MID',4.5,"A warren of six narrow alleys packed with over 200 tiny, characterful bars — Tokyo's most atmospheric night out.",['bars','alleys','nightlife','atmospheric']),
    S('omoide-yokocho-tokyo','Omoide Yokocho','FOOD','BUDGET',4.4,"A smoky, lantern-lit lane of tiny yakitori counters by Shinjuku station — grilled skewers and cold beer.",['yakitori','alley','izakaya','atmospheric']),
    S('koffee-mameya-tokyo','Koffee Mameya','CAFE','BUDGET',4.6,"A minimalist, almost ceremonial specialty-coffee counter in Aoyama — single origins chosen for you by experts.",['specialty-coffee','minimalist','aoyama','pour-over']),
    S('fuglen-tokyo','Fuglen Tokyo','CAFE','BUDGET',4.4,"A Norwegian coffee-and-cocktail bar in Tomigaya — vintage design, great brews by day and drinks by night.",['cafe','scandi','cocktails','design']),
    S('park-hyatt-tokyo','Park Hyatt Tokyo','ACCOMMODATION','HIGH',4.7,"The serene Shinjuku sky-hotel of 'Lost in Translation' fame, with the legendary New York Bar on the 52nd floor.",['luxury','skyline','iconic','views']),
    S('unplan-kagurazaka-tokyo','UNPLAN Kagurazaka','ACCOMMODATION','BUDGET',4.6,"A stylish, sociable design hostel in charming Kagurazaka — café-lounge, clean dorms and a friendly crowd.",['hostel','design','social','central']),
    S('nui-hostel-tokyo','Nui. Hostel & Bar Lounge','ACCOMMODATION','BUDGET',4.5,"A beautiful warehouse-conversion hostel near Asakusa with a buzzing ground-floor bar that locals love too.",['hostel','design','bar','social']),
    S('the-imperial-palace-tokyo','Imperial Palace East Gardens','NATURE','FREE',4.4,"The serene former castle grounds of the Emperor — moats, stone walls and manicured gardens in the city centre.",['garden','palace','history','calm']),
    S('wework-shibuya-tokyo','WeWork Shibuya','COWORKING','MID',4.3,"A polished coworking hub in the Shibuya towers with fast wifi and skyline views — easy for remote workers.",['coworking','shibuya','wifi','remote-work']),
  ],

  osaka: [
    S('osaka-castle','Osaka Castle','CULTURE','BUDGET',4.6,"Osaka's landmark — a golden-trimmed reconstructed keep on massive stone ramparts amid a moated park, superb in cherry season.",['castle','park','iconic','history']),
    S('dotonbori-osaka','Dōtonbori','COMMUNITY','FREE',4.7,"Osaka's neon canal-side heart — the Glico running man, giant crab signs and an endless parade of street food.",['neon','street-food','canal','iconic']),
    S('shitennoji-osaka','Shitennō-ji','CULTURE','BUDGET',4.4,"Japan's oldest officially-administered Buddhist temple, founded in 593, with a five-storey pagoda and serene garden.",['temple','buddhist','heritage','calm']),
    S('sumiyoshi-taisha-osaka','Sumiyoshi Taisha','CULTURE','FREE',4.5,"A strikingly ancient Shinto shrine with a famous steep arched bridge and unique pre-Buddhist architecture.",['shrine','shinto','heritage','iconic']),
    S('umeda-sky-building-osaka','Umeda Sky Building','CULTURE','MID',4.5,"Twin towers joined by a 'floating garden' rooftop observatory — Osaka's best 360° sunset panorama.",['tower','views','architecture','sunset']),
    S('shinsekai-tsutenkaku-osaka','Shinsekai & Tsūtenkaku','COMMUNITY','BUDGET',4.4,"A retro, gloriously kitsch district around the Tsūtenkaku tower — kushikatsu skewers and old-Osaka atmosphere.",['retro','tower','kushikatsu','nostalgic']),
    S('kuromon-market-osaka','Kuromon Ichiba Market','FOOD','BUDGET',4.4,"'Osaka's Kitchen' — a covered market of fresh seafood, grilled scallops, wagyu skewers and fruit to eat on the spot.",['market','seafood','street-food','local']),
    S('namba-yasaka-shrine-osaka','Namba Yasaka Shrine','CULTURE','FREE',4.4,"A small shrine dominated by a giant, dramatic lion-head stage said to swallow evil spirits — a quirky photo stop.",['shrine','quirky','photo','offbeat']),
    S('dotonbori-takoyaki-osaka','Dōtonbori Takoyaki Stalls','FOOD','BUDGET',4.5,"The birthplace of takoyaki — octopus balls and okonomiyaki from legendary stalls along the canal.",['takoyaki','street-food','local','iconic']),
    S('mel-coffee-osaka','Mel Coffee Roasters','CAFE','BUDGET',4.5,"A tiny, serious specialty roaster near Shinsaibashi pulling some of Osaka's best espresso.",['specialty-coffee','roaster','espresso','minimalist']),
    S('lilo-coffee-osaka','LiLo Coffee Roasters','CAFE','BUDGET',4.5,"A vibrant Amerikamura coffee bar with a big menu of single origins and a buzzy young crowd.",['specialty-coffee','roaster','trendy','work-friendly']),
    S('the-blend-inn-osaka','The Blend Inn','ACCOMMODATION','BUDGET',4.5,"An art-filled design hostel with a café-bar and a creative community feel, a tram ride from the centre.",['hostel','design','art','social']),
    S('hotel-zentis-osaka','Hotel Zentis Osaka','ACCOMMODATION','MID',4.6,"A sleek riverside design hotel near Osaka Station with calm, contemporary rooms — a polished mid-range base.",['design','riverside','central','boutique']),
    S('imperial-hotel-osaka','Conrad Osaka','ACCOMMODATION','HIGH',4.7,"A luxury sky-hotel high above the city with floor-to-ceiling skyline views and an excellent spa.",['luxury','skyline','spa','views']),
    S('spa-world-osaka','Spa World','WELLNESS','BUDGET',4.2,"A vast multi-floor hot-spring and sauna complex in Shinsekai with European- and Asian-themed bath zones.",['onsen','sauna','bathhouse','relaxing']),
    S('amerikamura-osaka','Amerikamura','COMMUNITY','FREE',4.2,"Osaka's youth-culture district of vintage shops, street art and record stores — the city's creative pulse.",['fashion','youth','street-art','shopping']),
    S('namba-parks-osaka','Namba Parks','NATURE','FREE',4.4,"A striking terraced rooftop garden park rising above a mall — a green canyon of plants in the city centre.",['rooftop-garden','architecture','green','relaxed']),
    S('billboard-live-osaka','Billboard Live Osaka','NIGHTLIFE','MID',4.4,"An intimate live-music club for jazz, soul and pop acts in Grand Front Osaka — a classy night out.",['live-music','jazz','nightlife','intimate']),
  ],

  nara: [
    S('todai-ji-nara','Tōdai-ji','CULTURE','BUDGET',4.7,"One of the world's largest wooden buildings, sheltering a colossal 15-metre bronze Great Buddha — Nara's must-see.",['temple','great-buddha','unesco','iconic']),
    S('nara-park-deer','Nara Park & Deer','NATURE','FREE',4.7,"A huge park where over a thousand free-roaming, bowing sika deer mingle with visitors among ancient temples.",['park','deer','iconic','nature']),
    S('kasuga-taisha-nara','Kasuga Taisha','CULTURE','BUDGET',4.5,"Nara's most celebrated shrine, approached through forest and famous for thousands of bronze and stone lanterns.",['shrine','lanterns','forest','unesco']),
    S('kofuku-ji-nara','Kōfuku-ji','CULTURE','BUDGET',4.4,"A historic temple with an elegant five-storey pagoda — one of Nara's defining silhouettes.",['temple','pagoda','heritage','unesco']),
    S('isuien-garden-nara','Isuien Garden','NATURE','BUDGET',4.5,"An exquisite strolling garden using borrowed scenery of Tōdai-ji's gate and the hills — serene and uncrowded.",['garden','strolling','calm','scenic']),
    S('mount-wakakusa-nara','Mount Wakakusa','NATURE','BUDGET',4.5,"A grassy hillside above the park with a short climb to sweeping sunset views over Nara and its temples.",['hill','views','sunset','hike']),
    S('naramachi-nara','Naramachi Old Town','COMMUNITY','FREE',4.4,"A lattice-fronted merchant quarter of machiya townhouses, craft shops, cafés and small museums.",['old-town','machiya','shopping','walk']),
    S('kasuga-primeval-forest-nara','Mount Kasuga Primeval Forest','NATURE','FREE',4.3,"A sacred, protected ancient forest behind Kasuga shrine, criss-crossed by peaceful walking trails.",['forest','sacred','hike','calm']),
    S('mochi-pounding-nara','Nakatanidou Mochi Pounding','FOOD','BUDGET',4.5,"Watch the famously frenetic high-speed mochi-pounding show, then eat fresh yomogi mochi on the spot.",['mochi','street-food','show','local']),
    S('hiraso-nara','Hiraso','FOOD','MID',4.3,"A long-established restaurant specialising in kakinoha-zushi — Nara's traditional persimmon-leaf-wrapped sushi.",['sushi','local','traditional','heritage']),
    S('kura-cafe-nara','Kura Coffee','CAFE','BUDGET',4.3,"A cosy café in a converted Naramachi storehouse — good pour-overs and a quiet spot to rest between temples.",['cafe','machiya','coffee','calm']),
    S('guesthouse-nara','Guesthouse Nara Backpackers','ACCOMMODATION','BUDGET',4.4,"A characterful guesthouse in a traditional house with tatami rooms and a garden — a peaceful, friendly base.",['guesthouse','tatami','garden','social']),
    S('jw-marriott-nara','JW Marriott Hotel Nara','ACCOMMODATION','HIGH',4.6,"Nara's polished luxury hotel near the park, with spacious rooms, a spa and refined dining.",['luxury','spa','comfortable','central']),
    S('yoshikien-garden-nara','Yoshikien Garden','NATURE','FREE',4.3,"Three small, beautiful gardens — pond, moss and tea-ceremony flower — free to foreign visitors and rarely busy.",['garden','moss','free','calm']),
  ],

  busan: [
    S('haeundae-beach-busan','Haeundae Beach','NATURE','FREE',4.5,"Korea's most famous beach — a wide arc of sand backed by skyscrapers, with cafés, festivals and a buzzing boardwalk.",['beach','sea','promenade','iconic']),
    S('gamcheon-culture-village-busan','Gamcheon Culture Village','COMMUNITY','FREE',4.6,"A hillside maze of pastel houses, murals and art installations — Busan's photogenic 'Machu Picchu of Korea'.",['murals','colourful','art','iconic']),
    S('haedong-yonggungsa-busan','Haedong Yonggungsa Temple','CULTURE','FREE',4.6,"A rare seaside Buddhist temple dramatically perched on the rocks above crashing waves — stunning at sunrise.",['temple','seaside','sunrise','iconic']),
    S('gwangalli-beach-busan','Gwangalli Beach','NATURE','FREE',4.5,"A hip beach framed by the giant Gwangan Bridge, glowing with nightly light shows and lined with bars and cafés.",['beach','bridge','nightlife','sunset']),
    S('jagalchi-market-busan','Jagalchi Fish Market','FOOD','BUDGET',4.4,"Korea's largest seafood market — pick your catch downstairs and eat it fresh upstairs in this dockside institution.",['market','seafood','local','iconic']),
    S('beomeosa-temple-busan','Beomeosa Temple','CULTURE','FREE',4.5,"A serene 7th-century mountain temple on the slopes of Geumjeongsan, wrapped in forest above the city.",['temple','mountain','forest','calm']),
    S('taejongdae-busan','Taejongdae Park','NATURE','FREE',4.5,"A forested coastal park of dramatic sea cliffs and a lighthouse, with a danubi train to the viewpoints.",['cliffs','coast','park','views']),
    S('huinnyeoul-village-busan','Huinnyeoul Culture Village','COMMUNITY','FREE',4.4,"A clifftop cluster of white houses and seaside cafés along a coastal path — quieter and dreamy at sunset.",['village','coastal','cafes','views']),
    S('songdo-skywalk-busan','Songdo Cloud Trails Skywalk','NATURE','FREE',4.3,"A curving glass-floored walkway out over the sea, plus Korea's first beachside cable car at Songdo.",['skywalk','sea','cable-car','views']),
    S('biff-square-busan','BIFF Square','COMMUNITY','BUDGET',4.3,"The cinema-district street of the Busan Film Festival, packed with street-food stalls and the famous ssiat hotteok.",['street-food','cinema','shopping','lively']),
    S('momos-coffee-busan','Momos Coffee','CAFE','BUDGET',4.6,"Home of a World Barista Champion — Busan's most celebrated specialty roaster, a pilgrimage for coffee lovers.",['specialty-coffee','roaster','champion','work-friendly']),
    S('werk-roasters-busan','Werk Roasters','CAFE','BUDGET',4.4,"A stylish seaside-city roaster with excellent filter coffee and a calm, design-led space.",['specialty-coffee','roaster','design','relaxed']),
    S('park-hyatt-busan','Park Hyatt Busan','ACCOMMODATION','HIGH',4.6,"A luxury tower hotel on the Haeundae marina with floor-to-ceiling sea views and an infinity-edge feel.",['luxury','marina','sea-view','spa']),
    S('hostel-haeundae-busan','Hostel Haeundae','ACCOMMODATION','BUDGET',4.3,"A friendly budget base steps from Haeundae Beach with a sociable lounge — easy for solo travellers.",['hostel','beach','social','budget']),
    S('signiel-busan','Signiel Busan','ACCOMMODATION','HIGH',4.6,"A sleek high-rise hotel above Haeundae with panoramic ocean views and refined rooms.",['luxury','sea-view','high-rise','comfortable']),
    S('spa-land-busan','Spa Land Centum City','WELLNESS','BUDGET',4.5,"A vast, beautifully designed jjimjilbang with 22 baths and themed sauna rooms — Busan's best bathhouse.",['jjimjilbang','sauna','bathhouse','relaxing']),
    S('oryukdo-skywalk-busan','Oryukdo Skywalk','NATURE','FREE',4.3,"A glass walkway jutting over the sea at the dramatic Oryukdo islets where the bay meets the open ocean.",['skywalk','sea','cliffs','views']),
    S('busan-cinema-center','Busan Cinema Center','NIGHTLIFE','FREE',4.3,"The futuristic, LED-roofed home of the Busan Film Festival — striking architecture and evening screenings.",['architecture','cinema','modern','evening']),
  ],

  jeju: [
    S('seongsan-ilchulbong-jeju','Seongsan Ilchulbong','NATURE','BUDGET',4.7,"A dramatic volcanic tuff cone rising from the sea with a crater rim hike — Jeju's UNESCO 'Sunrise Peak'.",['volcano','sunrise','hike','iconic']),
    S('hallasan-jeju','Hallasan National Park','NATURE','BUDGET',4.7,"South Korea's highest peak — a shield volcano with a crater lake and superb day hikes through changing forest.",['volcano','hiking','national-park','iconic']),
    S('manjanggul-cave-jeju','Manjanggul Lava Tube','NATURE','BUDGET',4.4,"One of the world's finest lava tubes — a vast, cool UNESCO cavern with a giant lava column to walk through.",['cave','lava-tube','unesco','geology']),
    S('cheonjeyeon-falls-jeju','Cheonjeyeon Falls','NATURE','BUDGET',4.4,"A serene three-tier waterfall tumbling through forest, crossed by the ornate Seonimgyo 'Seven Nymphs' bridge.",['waterfall','forest','scenic','relaxed']),
    S('jusangjeolli-cliffs-jeju','Jusangjeolli Cliffs','NATURE','BUDGET',4.4,"Astonishing hexagonal basalt columns plunging into the surf — Jeju's volcanic geology at its most photogenic.",['cliffs','basalt','sea','photo']),
    S('hyeopjae-beach-jeju','Hyeopjae Beach','NATURE','FREE',4.5,"A gorgeous white-sand, turquoise-water beach facing Biyangdo island — Jeju's most beautiful swimming spot.",['beach','turquoise','swimming','scenic']),
    S('udo-island-jeju','Udo Island','NATURE','BUDGET',4.5,"A laid-back islet off the east coast — peanut ice cream, white-shell beaches and easy scooter or bike loops.",['island','beach','cycling','day-trip']),
    S('osulloc-tea-museum-jeju','O\'sulloc Tea Museum','CULTURE','FREE',4.4,"A green-tea museum and café beside emerald tea fields — green-tea lattes, ice cream and rolling plantation views.",['tea','museum','cafe','scenic']),
    S('jeongbang-falls-jeju','Jeongbang Waterfall','NATURE','BUDGET',4.3,"A rare waterfall that plunges directly into the ocean — a short, dramatic walk down the cliffs at Seogwipo.",['waterfall','sea','scenic','nature']),
    S('seopjikoji-jeju','Seopjikoji','NATURE','FREE',4.4,"A scenic coastal headland of cliffs, a lighthouse and spring canola fields with views back to Sunrise Peak.",['coast','cliffs','lighthouse','scenic']),
    S('dongmun-market-jeju','Dongmun Traditional Market','FOOD','BUDGET',4.4,"Jeju City's lively covered market — black-pork skewers, hairtail, mandarin treats and fresh island seafood.",['market','seafood','street-food','local']),
    S('black-pork-street-jeju','Jeju Black Pork Street','FOOD','MID',4.5,"The barbecue strip for Jeju's prized heugdwaeji black pork, grilled at the table — a local speciality.",['bbq','black-pork','local','iconic']),
    S('cafe-delmoondo-jeju','Café Delmoondo','CAFE','BUDGET',4.4,"A stylish ocean-view café on the east coast — great coffee and a panoramic terrace over the sea.",['cafe','ocean-view','coffee','relaxed']),
    S('grand-hyatt-jeju','Grand Hyatt Jeju','ACCOMMODATION','HIGH',4.6,"A glossy twin-tower resort in Jeju City with sweeping sea views, pools and a big spa.",['luxury','sea-view','resort','spa']),
    S('jeju-hiking-inn','Jeju Hiking Inn','ACCOMMODATION','BUDGET',4.3,"A friendly guesthouse geared to walkers of the Olle coastal trails, with route tips and a social lounge.",['guesthouse','hiking','social','budget']),
    S('lazybox-jeju','Lazybox Guesthouse','ACCOMMODATION','BUDGET',4.3,"A cheerful, design-minded guesthouse popular with solo travellers exploring the island by scooter.",['guesthouse','design','social','budget']),
    S('jeju-olle-trail','Jeju Olle Trail (Route 7)','NATURE','FREE',4.7,"The signature stretch of Jeju's beloved long-distance coastal path — turquoise sea, cliffs and volcanic shore.",['hiking','coastal','trail','scenic']),
    S('hamdeok-beach-jeju','Hamdeok Seoubong Beach','NATURE','FREE',4.4,"A shallow, emerald-water beach beside a small volcanic peak — calm swimming and seaside cafés.",['beach','turquoise','swimming','relaxed']),
  ],

  gyeongju: [
    S('bulguksa-gyeongju','Bulguksa Temple','CULTURE','BUDGET',4.7,"Korea's most celebrated temple — a UNESCO masterpiece of stone terraces, bridges and two famous pagodas.",['temple','unesco','iconic','heritage']),
    S('seokguram-gyeongju','Seokguram Grotto','CULTURE','BUDGET',4.6,"A serene hillside grotto sheltering a sublime granite Buddha gazing toward the sunrise sea — a UNESCO treasure.",['grotto','buddha','unesco','iconic']),
    S('donggung-wolji-gyeongju','Donggung Palace & Wolji Pond','CULTURE','BUDGET',4.7,"A reconstructed Silla palace mirrored in a tranquil pond — Gyeongju's iconic night-time reflection scene.",['palace','pond','night','iconic']),
    S('cheomseongdae-gyeongju','Cheomseongdae Observatory','CULTURE','FREE',4.4,"The oldest surviving astronomical observatory in East Asia — a graceful 7th-century stone bottle-tower.",['observatory','silla','heritage','iconic']),
    S('daereungwon-gyeongju','Daereungwon Tumuli Park','CULTURE','BUDGET',4.5,"A green park of grassy royal burial mounds, including the excavated Cheonmachong 'Heavenly Horse' tomb.",['tombs','park','silla','heritage']),
    S('gyeongju-national-museum','Gyeongju National Museum','CULTURE','FREE',4.6,"The superb home of Silla gold crowns, the Emille Bell and treasures from the tombs — free and unmissable.",['museum','silla','gold','free']),
    S('woljeonggyo-bridge-gyeongju','Woljeonggyo Bridge','CULTURE','FREE',4.5,"A beautifully reconstructed wooden Silla footbridge, gloriously floodlit and reflected in the river at night.",['bridge','night','reflection','scenic']),
    S('yangdong-village-gyeongju','Yangdong Folk Village','CULTURE','BUDGET',4.4,"A UNESCO-listed living Joseon village of thatched and tiled clan houses set among hills and rice fields.",['village','joseon','unesco','heritage']),
    S('woljeong-gyo-hwangridan-gyeongju','Hwangridan-gil','COMMUNITY','FREE',4.4,"Gyeongju's trendy café-and-boutique street of restored hanok — the town's most stylish place to wander and eat.",['cafes','hanok','trendy','shopping']),
    S('gyeongju-bread-gyeongju','Gyeongju Bread (Hwangnam-ppang)','FOOD','BUDGET',4.4,"The town's famous red-bean pastry, baked since 1939 — a sweet, essential Gyeongju souvenir to eat warm.",['bakery','red-bean','heritage','snack']),
    S('ssambap-restaurant-gyeongju','Gyeongju Ssambap','FOOD','MID',4.4,"The local speciality — a spread of rice, fresh leaves and dozens of banchan to wrap and share, beloved by visitors.",['korean','ssambap','banchan','local']),
    S('coffee-myeongga-gyeongju','Hwangnam Hanok Café','CAFE','BUDGET',4.3,"A tranquil café set in a restored hanok courtyard near the tombs — coffee and traditional sweets in old Gyeongju.",['cafe','hanok','coffee','calm']),
    S('hwangnamguan-gyeongju','Hwangnamguan Hanok Stay','ACCOMMODATION','MID',4.5,"A traditional hanok guesthouse with ondol-heated rooms around a courtyard — sleep in old Gyeongju style.",['hanok','traditional','courtyard','boutique']),
    S('hilton-gyeongju','Hilton Gyeongju','ACCOMMODATION','HIGH',4.5,"A comfortable resort hotel by Bomun Lake with a spa and easy access to the historic sites.",['resort','lake','spa','comfortable']),
    S('gyeongju-guesthouse','Gyeongju Sarangchae Guesthouse','ACCOMMODATION','BUDGET',4.4,"A welcoming budget guesthouse near the tombs and Hwangridan-gil with bikes for the easy, flat sightseeing loop.",['guesthouse','budget','bikes','central']),
    S('bomun-lake-gyeongju','Bomun Lake','NATURE','FREE',4.4,"A landscaped resort lake ringed by a cherry-blossom cycling-and-walking path — lovely in spring and at sunset.",['lake','cycling','cherry-blossom','relaxed']),
    S('gyeongju-east-palace-garden','Gyeongju World Donggung Garden','NATURE','FREE',4.2,"Strollable gardens and historic grounds linking the town's central Silla sites on foot.",['garden','walk','history','green']),
    S('bunhwangsa-gyeongju','Bunhwangsa Temple','CULTURE','BUDGET',4.3,"Home to Korea's oldest dated stone pagoda, a quiet and ancient Silla temple away from the crowds.",['temple','pagoda','silla','calm']),
  ],
};

async function main() {
  let totalCreated = 0;
  for (const [slug, cityId] of Object.entries(CITY)) {
    const spots = DATA[slug];
    let created = 0, skipped = 0;
    for (const spot of spots) {
      const { tags, ...data } = spot;
      const exists = await prisma.spot.findFirst({ where: { cityId, slug: data.slug } });
      if (exists) { skipped++; continue; }
      await prisma.spot.create({ data: { ...data, cityId, published: true, tags: { create: tags.map(t => ({ tag: t })) } } });
      created++;
    }
    totalCreated += created;
    console.log(`${slug}: created=${created} skipped=${skipped} (total ${spots.length})`);
  }
  console.log('TOTAL created=' + totalCreated);
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
