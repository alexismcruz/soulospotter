// Africa batch C — North & Horn: Egypt, Ethiopia, Morocco (Marrakech already seeded).
const { seed } = require('./_content-seed-helper');

const SPOTS = {
  // EGYPT
  'cairo': [
    { name: 'Zööba', slug: 'zooba-cairo', category: 'FOOD', description: 'A modern Egyptian street-food spot — koshari, taameya, and hawawshi reinvented in a buzzing, colourful setting.', address: 'Zamalek, Cairo', priceRange: 'BUDGET', rating: 4.5, tags: ['egyptian','street-food','koshari','modern'] },
    { name: 'Dahab Hostel', slug: 'dahab-hostel-cairo', category: 'ACCOMMODATION', description: 'A rooftop hostel in downtown Cairo overlooking Talaat Harb — a sociable budget base near Tahrir and the Egyptian Museum.', address: 'Downtown, Cairo', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','rooftop','downtown','social'] },
    { name: 'Pyramids of Giza', slug: 'pyramids-of-giza', category: 'CULTURE', description: 'The last surviving Wonder of the Ancient World — the Great Pyramid, the Sphinx, and 4,500 years of awe on the desert edge.', address: 'Giza, Cairo', priceRange: 'MID', rating: 4.8, tags: ['pyramids','sphinx','ancient','iconic'] },
  ],
  'luxor': [
    { name: 'Sofra Restaurant', slug: 'sofra-restaurant-luxor', category: 'FOOD', description: 'A beautifully restored 1930s house serving traditional Egyptian mezze and tagines on a lantern-lit rooftop.', address: 'Luxor', priceRange: 'MID', rating: 4.6, tags: ['egyptian','mezze','rooftop','atmospheric'] },
    { name: 'Bob Marley Peace Hostel', slug: 'bob-marley-hostel-luxor', category: 'ACCOMMODATION', description: 'A long-running budget hostel on the East Bank — rooftop, helpful tours, and a friendly base for the Valley of the Kings.', address: 'Luxor', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','rooftop','budget','tours'] },
    { name: 'Karnak Temple', slug: 'karnak-temple', category: 'CULTURE', description: 'The largest religious complex ever built — a forest of giant columns in the Hypostyle Hall, sacred to Amun-Ra.', address: 'Luxor', priceRange: 'MID', rating: 4.8, tags: ['temple','ancient','columns','iconic'] },
  ],
  'aswan': [
    { name: 'Nubian House Restaurant', slug: 'nubian-house-aswan', category: 'FOOD', description: 'A hilltop restaurant with Nubian dishes and the finest Nile sunset view in Aswan over Elephantine Island.', address: 'Aswan', priceRange: 'MID', rating: 4.5, tags: ['nubian','sunset','nile-views','local'] },
    { name: 'Bob Marley Nubian House', slug: 'bob-marley-nubian-house-aswan', category: 'ACCOMMODATION', description: 'A colourful Nubian guesthouse on the West Bank — rooftop Nile views and a warm welcome among painted villages.', address: 'Aswan', priceRange: 'BUDGET', rating: 4.4, tags: ['guesthouse','nubian','nile','colourful'] },
    { name: 'Philae Temple', slug: 'philae-temple', category: 'CULTURE', description: 'The island temple of Isis, rescued from the rising Nile and rebuilt stone by stone — magical by day and by sound-and-light.', address: 'Aswan', priceRange: 'MID', rating: 4.7, tags: ['temple','isis','island','ancient'] },
  ],
  'dahab': [
    { name: 'Ralph\'s German Bakery', slug: 'ralphs-bakery-dahab', category: 'CAFE', description: 'A Dahab institution for fresh bread, pastries, and proper coffee — the go-to breakfast before a day of diving.', address: 'Dahab', priceRange: 'BUDGET', rating: 4.5, tags: ['bakery','breakfast','coffee','divers'] },
    { name: 'Penguin Divers & Rooms', slug: 'penguin-divers-dahab', category: 'ACCOMMODATION', description: 'A seafront dive lodge in the heart of Dahab — affordable rooms, a dive centre, and a laid-back Bedouin-coast vibe.', address: 'Dahab', priceRange: 'BUDGET', rating: 4.4, tags: ['dive-lodge','seafront','diving','relaxed'] },
    { name: 'The Blue Hole', slug: 'the-blue-hole-dahab', category: 'NATURE', description: 'One of the world\'s most famous dive and snorkel sites — a deep submarine sinkhole rimmed with vivid coral.', address: 'near Dahab', priceRange: 'BUDGET', rating: 4.7, tags: ['blue-hole','diving','snorkeling','coral'] },
  ],
  'alexandria': [
    { name: 'Mohammed Ahmed', slug: 'mohammed-ahmed-alexandria', category: 'FOOD', description: 'A legendary Alexandria diner famous for its foul and falafel — the best cheap breakfast in the Mediterranean city.', address: 'Alexandria', priceRange: 'BUDGET', rating: 4.5, tags: ['foul','falafel','breakfast','local'] },
    { name: 'Hotel Union', slug: 'hotel-union-alexandria', category: 'ACCOMMODATION', description: 'A faded-grand budget hotel with Corniche-facing rooms — sea views over the Eastern Harbour at honest prices.', address: 'Corniche, Alexandria', priceRange: 'BUDGET', rating: 4.2, tags: ['hotel','sea-views','corniche','budget'] },
    { name: 'Bibliotheca Alexandrina', slug: 'bibliotheca-alexandrina', category: 'CULTURE', description: 'The dazzling modern revival of the ancient Library of Alexandria — a disc-shaped marvel on the Mediterranean shore.', address: 'Alexandria', priceRange: 'MID', rating: 4.6, tags: ['library','modern','mediterranean','iconic'] },
  ],
  // ETHIOPIA
  'addis-ababa': [
    { name: 'Tomoca Coffee', slug: 'tomoca-coffee-addis', category: 'CAFE', description: 'A 1950s Addis institution and the birthplace of Ethiopian coffee culture — stand at the bar for a legendary macchiato.', address: 'Addis Ababa', priceRange: 'BUDGET', rating: 4.7, tags: ['coffee','historic','macchiato','iconic'] },
    { name: 'Mr Martin\'s Cozy Place', slug: 'mr-martins-cozy-place-addis', category: 'ACCOMMODATION', description: 'A long-running travellers\' guesthouse — a calm garden, good info, and a reliable base in the sprawling capital.', address: 'Addis Ababa', priceRange: 'BUDGET', rating: 4.3, tags: ['guesthouse','garden','traveller','base'] },
    { name: 'National Museum of Ethiopia', slug: 'national-museum-ethiopia', category: 'CULTURE', description: 'Home to "Lucy," the 3.2-million-year-old hominid — the story of human origins in the cradle of mankind.', address: 'Addis Ababa', priceRange: 'BUDGET', rating: 4.5, tags: ['museum','lucy','origins','history'] },
  ],
  'lalibela': [
    { name: 'Ben Abeba Restaurant', slug: 'ben-abeba-lalibela', category: 'FOOD', description: 'A spectacular cliff-edge restaurant of swirling ramps — Ethiopian and Scottish dishes with vast highland views.', address: 'Lalibela', priceRange: 'MID', rating: 4.6, tags: ['restaurant','cliff-edge','views','quirky'] },
    { name: 'Sora Lodge', slug: 'sora-lodge-lalibela', category: 'ACCOMMODATION', description: 'A comfortable lodge on the hills above town — sweeping valley views and an easy base for the rock churches.', address: 'Lalibela', priceRange: 'MID', rating: 4.4, tags: ['lodge','views','church-base','comfortable'] },
    { name: 'Rock-Hewn Churches', slug: 'rock-hewn-churches-lalibela', category: 'CULTURE', description: 'Eleven medieval churches carved down into solid rock, including the cross-shaped Bet Giyorgis — a living UNESCO wonder.', address: 'Lalibela', priceRange: 'MID', rating: 4.9, tags: ['rock-churches','unesco','pilgrimage','iconic'] },
  ],
  'gondar': [
    { name: 'Four Sisters Restaurant', slug: 'four-sisters-gondar', category: 'FOOD', description: 'A beloved family restaurant with traditional Ethiopian feasts, honey wine, and nightly music and dance.', address: 'Gondar', priceRange: 'MID', rating: 4.6, tags: ['ethiopian','tej','music','family'] },
    { name: 'Taye Belay Hotel', slug: 'taye-belay-hotel-gondar', category: 'ACCOMMODATION', description: 'A comfortable mid-range hotel near the centre — a practical base for the castles and Simien Mountains trips.', address: 'Gondar', priceRange: 'MID', rating: 4.2, tags: ['hotel','central','simien-base','comfortable'] },
    { name: 'Fasil Ghebbi (Royal Enclosure)', slug: 'fasil-ghebbi-gondar', category: 'CULTURE', description: 'The 17th-century castle compound of Ethiopia\'s emperors — a UNESCO "Camelot of Africa" of stone palaces and towers.', address: 'Gondar', priceRange: 'MID', rating: 4.7, tags: ['castles','royal','unesco','history'] },
  ],
  'simien-mountains': [
    { name: 'Simien Lodge Restaurant', slug: 'simien-lodge-restaurant', category: 'FOOD', description: 'A warm restaurant at Africa\'s highest hotel — hearty meals and a fireplace after days trekking the escarpment.', address: 'Simien Mountains', priceRange: 'MID', rating: 4.3, tags: ['restaurant','highland','fireplace','trekkers'] },
    { name: 'Simien Lodge', slug: 'simien-lodge', category: 'ACCOMMODATION', description: 'The highest lodge in Africa at 3,260m — cosy tukul rooms on the edge of the Simien escarpment.', address: 'Simien Mountains', priceRange: 'HIGH', rating: 4.4, tags: ['lodge','highest-in-africa','escarpment','cosy'] },
    { name: 'Sankaber Escarpment Viewpoint', slug: 'sankaber-viewpoint', category: 'NATURE', description: 'A dizzying lookout over the Simien escarpment — gelada baboon troops graze the cliffs with endless valley views.', address: 'Simien Mountains National Park', priceRange: 'MID', rating: 4.8, tags: ['viewpoint','gelada','escarpment','trekking'] },
  ],
  'harar': [
    { name: 'Hirut Restaurant', slug: 'hirut-restaurant-harar', category: 'FOOD', description: 'A simple local restaurant for Harari specialities and strong coffee in the ancient walled city of 99 mosques.', address: 'Harar', priceRange: 'BUDGET', rating: 4.3, tags: ['harari','coffee','local','walled-city'] },
    { name: 'Rowda Waber Traditional Guesthouse', slug: 'rowda-waber-guesthouse-harar', category: 'ACCOMMODATION', description: 'A traditional Harari house guesthouse with colourful basket-lined walls — an immersive stay inside the old city.', address: 'Harar', priceRange: 'BUDGET', rating: 4.4, tags: ['guesthouse','harari-house','traditional','old-city'] },
    { name: 'Harar Jugol (Old Walled City)', slug: 'harar-jugol', category: 'CULTURE', description: 'The UNESCO-listed walled old city — a maze of alleys, 99 mosques, and the famous hyena men who feed wild hyenas at night.', address: 'Harar', priceRange: 'FREE', rating: 4.6, tags: ['walled-city','unesco','mosques','hyenas'] },
  ],
  // MOROCCO (Marrakech already seeded)
  'fes': [
    { name: 'Café Clock', slug: 'cafe-clock-fes', category: 'CAFE', description: 'A cultural café in a restored riad — camel burgers, mint tea, and rooftop views deep in the Fes medina.', address: 'Fes el-Bali', priceRange: 'MID', rating: 4.5, tags: ['cafe','riad','rooftop','cultural'] },
    { name: 'Riad Verus', slug: 'riad-verus-fes', category: 'ACCOMMODATION', description: 'A sociable riad-hostel in the medina with a rooftop terrace — a friendly, central base in the labyrinthine old city.', address: 'Fes el-Bali', priceRange: 'BUDGET', rating: 4.5, tags: ['riad','hostel','rooftop','medina'] },
    { name: 'Chouara Tannery', slug: 'chouara-tannery-fes', category: 'CULTURE', description: 'The iconic medieval leather tannery — a honeycomb of stone dye pits viewed from surrounding leather shops.', address: 'Fes el-Bali', priceRange: 'FREE', rating: 4.4, tags: ['tannery','leather','medieval','iconic'] },
  ],
  'chefchaouen': [
    { name: 'Café Clock Chefchaouen', slug: 'cafe-clock-chefchaouen', category: 'CAFE', description: 'A relaxed café in the blue city with rooftop Rif Mountain views — mint tea, tagines, and live music nights.', address: 'Chefchaouen', priceRange: 'MID', rating: 4.4, tags: ['cafe','rooftop','blue-city','views'] },
    { name: 'Riad Cherifa', slug: 'riad-cherifa-chefchaouen', category: 'ACCOMMODATION', description: 'A beautiful riad with terraces over the blue medina — a tranquil, photogenic base in Morocco\'s mountain town.', address: 'Chefchaouen', priceRange: 'MID', rating: 4.6, tags: ['riad','terraces','blue-medina','tranquil'] },
    { name: 'Chefchaouen Blue Medina', slug: 'chefchaouen-blue-medina', category: 'CULTURE', description: 'The world-famous indigo-washed alleyways climbing the Rif foothills — endlessly photogenic and gloriously relaxed.', address: 'Chefchaouen', priceRange: 'FREE', rating: 4.7, tags: ['blue-city','medina','photography','iconic'] },
  ],
  'merzouga': [
    { name: 'Café Nora', slug: 'cafe-nora-merzouga', category: 'CAFE', description: 'A desert-edge café in Merzouga village — mint tea and tagine before the camel trek into the Erg Chebbi dunes.', address: 'Merzouga', priceRange: 'BUDGET', rating: 4.2, tags: ['cafe','desert','tagine','dunes-gateway'] },
    { name: 'Erg Chebbi Desert Camp', slug: 'erg-chebbi-desert-camp', category: 'ACCOMMODATION', description: 'A Berber tented camp deep in the Erg Chebbi dunes — dinner under the stars, drumming, and sunrise over the sand.', address: 'Erg Chebbi, Merzouga', priceRange: 'MID', rating: 4.7, tags: ['desert-camp','dunes','stars','berber'] },
    { name: 'Erg Chebbi Dunes', slug: 'erg-chebbi-dunes', category: 'NATURE', description: 'A towering sea of orange Saharan dunes rising 150m — the most spectacular accessible desert landscape in Morocco.', address: 'Merzouga', priceRange: 'FREE', rating: 4.8, tags: ['sahara','dunes','sunrise','iconic'] },
  ],
  'essaouira': [
    { name: 'La Triskala Café', slug: 'la-triskala-cafe-essaouira', category: 'CAFE', description: 'A cosy, bohemian café tucked in the medina — vegetarian plates, fresh juices, and a laid-back Essaouira soul.', address: 'Essaouira Medina', priceRange: 'BUDGET', rating: 4.6, tags: ['cafe','bohemian','vegetarian','medina'] },
    { name: 'Hostel Essaouira', slug: 'hostel-essaouira', category: 'ACCOMMODATION', description: 'A friendly medina hostel near the ramparts — a sociable base for kitesurfing, gnawa music, and seaside wandering.', address: 'Essaouira Medina', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','medina','social','kitesurf-base'] },
    { name: 'Skala de la Ville Ramparts', slug: 'skala-de-la-ville-essaouira', category: 'CULTURE', description: 'The cannon-lined sea ramparts above the Atlantic — windswept views, fishing boats, and Game of Thrones filming locations.', address: 'Essaouira', priceRange: 'FREE', rating: 4.5, tags: ['ramparts','atlantic','views','historic'] },
  ],
};

const EXPERIENCES = {
  'cairo': [
    { name: 'Pyramids of Giza & Sphinx Tour', slug: 'cairo-pyramids-tour', category: 'ARTS_CULTURE', description: 'A guided morning at the Giza plateau — the Great Pyramid, the Sphinx, and the option to enter a pyramid chamber, plus a camel ride.', price: 55, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Egyptian Museum & Islamic Cairo Walk', slug: 'cairo-museum-islamic-walk', category: 'ARTS_CULTURE', description: 'Tutankhamun\'s treasures at the Egyptian Museum, then the medieval bazaars and mosques of Islamic Cairo and Khan el-Khalili.', price: 50, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Cairo Street Food & Koshari Tour', slug: 'cairo-street-food', category: 'FOOD_DRINK', description: 'Eat through downtown Cairo — koshari, taameya, hawawshi, and sugarcane juice with a local food guide.', price: 35, duration: '3 hours', groupSizeMax: 10 },
  ],
  'luxor': [
    { name: 'Valley of the Kings & West Bank Tour', slug: 'luxor-valley-of-kings', category: 'ARTS_CULTURE', description: 'Explore the royal tombs of the Valley of the Kings, Hatshepsut\'s temple, and the Colossi of Memnon on the Theban west bank.', price: 60, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Luxor Hot Air Balloon Sunrise', slug: 'luxor-balloon-sunrise', category: 'PHOTOGRAPHY_WALKS', description: 'Float over the Nile, temples, and tombs at dawn — the unforgettable sunrise view over the West Bank of Luxor.', price: 90, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Karnak & Luxor Temples Guided Tour', slug: 'luxor-karnak-temples', category: 'ARTS_CULTURE', description: 'The vast Karnak complex and the riverside Luxor Temple with an Egyptologist — millennia of pharaonic grandeur.', price: 45, duration: 'Half day', groupSizeMax: 12 },
  ],
  'aswan': [
    { name: 'Abu Simbel Day Trip', slug: 'aswan-abu-simbel', category: 'ARTS_CULTURE', description: 'A journey to Ramses II\'s colossal temples at Abu Simbel — rescued from the rising lake and among Egypt\'s greatest sights.', price: 80, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Nubian Village Felucca Sunset Sail', slug: 'aswan-felucca-nubian', category: 'OUTDOOR_ADVENTURE', description: 'Sail a traditional felucca around Elephantine Island to a colourful Nubian village for tea, henna, and a sunset on the Nile.', price: 35, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Philae Temple & High Dam Tour', slug: 'aswan-philae-dam', category: 'ARTS_CULTURE', description: 'Visit the island Temple of Isis at Philae and the engineering of the Aswan High Dam that reshaped the Nile.', price: 40, duration: 'Half day', groupSizeMax: 12 },
  ],
  'dahab': [
    { name: 'Blue Hole Diving or Snorkel Day', slug: 'dahab-blue-hole-dive', category: 'OUTDOOR_ADVENTURE', description: 'Dive or snorkel the legendary Blue Hole and the Canyon — vivid Red Sea coral walls teeming with fish.', price: 60, duration: 'Full day', groupSizeMax: 8, difficulty: 'moderate' },
    { name: 'Mount Sinai Sunrise Trek', slug: 'dahab-mount-sinai-sunrise', category: 'OUTDOOR_ADVENTURE', description: 'A pre-dawn climb of Mount Sinai for sunrise over the mountains, then St Catherine\'s Monastery at the foot.', price: 55, duration: 'Full day', groupSizeMax: 12, difficulty: 'moderate' },
    { name: 'Dahab Desert & Bedouin Dinner', slug: 'dahab-bedouin-dinner', category: 'FOOD_DRINK', description: 'A camel or jeep trip into the Sinai desert for a Bedouin dinner, drumming, and stargazing far from town.', price: 40, duration: 'Evening', groupSizeMax: 12 },
  ],
  'alexandria': [
    { name: 'Alexandria Highlights Day Tour', slug: 'alexandria-highlights-tour', category: 'ARTS_CULTURE', description: 'The Bibliotheca, Qaitbay Citadel on the site of the ancient lighthouse, the catacombs, and the Mediterranean Corniche.', price: 45, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Catacombs & Roman Alexandria Walk', slug: 'alexandria-catacombs-walk', category: 'ARTS_CULTURE', description: 'Descend into the Kom el-Shoqafa catacombs and explore the Roman amphitheatre and Pompey\'s Pillar.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Alexandria Seafood & Corniche Evening', slug: 'alexandria-seafood-evening', category: 'FOOD_DRINK', description: 'A seafood dinner from the harbour catch and an evening stroll along the famous Mediterranean Corniche.', price: 40, duration: 'Evening', groupSizeMax: 10 },
  ],
  'addis-ababa': [
    { name: 'Addis Ababa City & Lucy Tour', slug: 'addis-city-lucy-tour', category: 'ARTS_CULTURE', description: 'The National Museum (home of "Lucy"), Holy Trinity Cathedral, and the panoramic Entoto hills above the capital.', price: 40, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Ethiopian Coffee Ceremony & Food Tour', slug: 'addis-coffee-food', category: 'FOOD_DRINK', description: 'Experience the traditional coffee ceremony and an injera feast with tej honey wine — the rituals of Ethiopian dining.', price: 35, duration: '3 hours', groupSizeMax: 10 },
    { name: 'Merkato Market Walking Tour', slug: 'addis-merkato-walk', category: 'ARTS_CULTURE', description: 'Plunge into Merkato, Africa\'s largest open-air market, with a guide — spices, recycled crafts, and organised chaos.', price: 25, duration: 'Half day', groupSizeMax: 8 },
  ],
  'lalibela': [
    { name: 'Rock Churches Full-Day Guided Tour', slug: 'lalibela-rock-churches-tour', category: 'ARTS_CULTURE', description: 'A full day exploring all eleven rock-hewn churches with an expert guide — the tunnels, trenches, and Bet Giyorgis.', price: 50, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Asheton Maryam Monastery Mule Trek', slug: 'lalibela-asheton-trek', category: 'OUTDOOR_ADVENTURE', description: 'Ride a mule up the mountain above Lalibela to a remote cliff monastery with sweeping highland views.', price: 45, duration: 'Half day', groupSizeMax: 8, difficulty: 'moderate' },
    { name: 'Lalibela Sunday Mass Pilgrimage Visit', slug: 'lalibela-sunday-mass', category: 'ARTS_CULTURE', description: 'Witness white-robed pilgrims and ancient Orthodox liturgy at the rock churches — a profound living spiritual experience.', price: 30, duration: 'Half day', groupSizeMax: 10 },
  ],
  'gondar': [
    { name: 'Royal Enclosure & Castles Tour', slug: 'gondar-castles-tour', category: 'ARTS_CULTURE', description: 'Explore the Fasil Ghebbi castle compound and the Debre Berhan Selassie church with its famous angel-faced ceiling.', price: 35, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Fasilides Bath & Gondar City Tour', slug: 'gondar-fasilides-bath', category: 'ARTS_CULTURE', description: 'Visit the emperor\'s bathing palace, flooded for the Timkat festival, and the markets of historic Gondar.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Simien Mountains Gateway Day Trip', slug: 'gondar-simien-day-trip', category: 'OUTDOOR_ADVENTURE', description: 'A day trip from Gondar into the Simien Mountains for gelada baboons and dramatic escarpment viewpoints.', price: 70, duration: 'Full day', groupSizeMax: 10 },
  ],
  'simien-mountains': [
    { name: 'Simien Mountains 3-Day Trek', slug: 'simien-3day-trek', category: 'OUTDOOR_ADVENTURE', description: 'Trek the "Roof of Africa" escarpment — gelada baboon troops, walia ibex, Ethiopian wolves, and 1,000m cliff views.', price: 280, duration: '3 days', groupSizeMax: 10, difficulty: 'challenging' },
    { name: 'Gelada Baboon & Escarpment Day Walk', slug: 'simien-gelada-day-walk', category: 'OUTDOOR_ADVENTURE', description: 'A day hike along the escarpment to sit among huge troops of grazing gelada baboons with endless highland views.', price: 60, duration: 'Full day', groupSizeMax: 10, difficulty: 'moderate' },
    { name: 'Sankaber to Geech Highland Hike', slug: 'simien-sankaber-geech', category: 'OUTDOOR_ADVENTURE', description: 'Hike between the Sankaber and Geech camps through giant lobelia meadows and dramatic cliff-edge scenery.', price: 90, duration: 'Full day', groupSizeMax: 10, difficulty: 'challenging' },
  ],
  'harar': [
    { name: 'Hyena Feeding Night Experience', slug: 'harar-hyena-feeding', category: 'OUTDOOR_ADVENTURE', description: 'Watch — or join — the famous "hyena men" hand-feeding wild hyenas outside the old city walls after dark.', price: 25, duration: 'Evening', groupSizeMax: 10 },
    { name: 'Harar Jugol Old City Walking Tour', slug: 'harar-old-city-walk', category: 'ARTS_CULTURE', description: 'Wind through the UNESCO walled city\'s 368 alleys, 99 mosques, colourful markets, and Rimbaud\'s house.', price: 30, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Harari Coffee & Culture Experience', slug: 'harar-coffee-culture', category: 'FOOD_DRINK', description: 'Discover the coffee culture of the town that helped give the world coffee, with a traditional Harari home visit.', price: 30, duration: '3 hours', groupSizeMax: 8 },
  ],
  'fes': [
    { name: 'Fes Medina Guided Walking Tour', slug: 'fes-medina-walk', category: 'ARTS_CULTURE', description: 'Navigate the world\'s largest car-free medina with a local guide — the tanneries, Al-Qarawiyyin, and hidden artisan souks.', price: 35, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Fes Cooking Class & Souk Market Tour', slug: 'fes-cooking-class', category: 'FOOD_DRINK', description: 'Shop the medina markets then cook a Moroccan tagine and pastilla in a traditional riad kitchen.', price: 50, duration: 'Half day', groupSizeMax: 8 },
    { name: 'Pottery & Zellige Artisan Workshop', slug: 'fes-pottery-workshop', category: 'ARTS_CULTURE', description: 'Visit Fes\'s famous pottery cooperatives to watch the throwing, glazing, and hand-cut zellige mosaic work.', price: 30, duration: 'Half day', groupSizeMax: 10 },
  ],
  'chefchaouen': [
    { name: 'Chefchaouen Blue City Photo Walk', slug: 'chefchaouen-photo-walk', category: 'PHOTOGRAPHY_WALKS', description: 'A guided wander through the indigo alleys at the best light — the most photogenic medina in Morocco.', price: 25, duration: '3 hours', groupSizeMax: 10 },
    { name: 'Akchour Waterfalls Rif Mountains Hike', slug: 'chefchaouen-akchour-hike', category: 'OUTDOOR_ADVENTURE', description: 'A day hike in the Rif Mountains to the Akchour waterfalls and God\'s Bridge natural arch — pools and forest scenery.', price: 40, duration: 'Full day', groupSizeMax: 12, difficulty: 'moderate' },
    { name: 'Spanish Mosque Sunset Hike', slug: 'chefchaouen-spanish-mosque', category: 'OUTDOOR_ADVENTURE', description: 'An easy walk up to the Spanish Mosque viewpoint for sunset over the whole blue city and the Rif foothills.', price: 15, duration: '2 hours', groupSizeMax: 12 },
  ],
  'merzouga': [
    { name: 'Erg Chebbi Camel Trek & Desert Camp', slug: 'merzouga-camel-trek-camp', category: 'OUTDOOR_ADVENTURE', description: 'Ride camels into the Erg Chebbi dunes at sunset to a Berber camp — dinner, drumming, and a Saharan night under the stars.', price: 80, duration: 'Overnight', groupSizeMax: 12 },
    { name: 'Sahara 4x4 Dunes & Nomad Tour', slug: 'merzouga-4x4-nomad', category: 'OUTDOOR_ADVENTURE', description: 'A 4x4 trip across the dunes to nomad families, the Khamlia Gnawa musicians, and a dry lake bed.', price: 60, duration: 'Half day', groupSizeMax: 6 },
    { name: 'Sandboarding & Dune Sunrise', slug: 'merzouga-sandboarding', category: 'OUTDOOR_ADVENTURE', description: 'Sandboard the Erg Chebbi slopes and climb a dune for sunrise over the Sahara\'s endless orange waves.', price: 35, duration: 'Half day', groupSizeMax: 10, difficulty: 'moderate' },
  ],
  'essaouira': [
    { name: 'Essaouira Medina & Ramparts Tour', slug: 'essaouira-medina-tour', category: 'ARTS_CULTURE', description: 'Explore the UNESCO medina, the fishing port, the sea ramparts, and the thuya-wood artisan workshops.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Essaouira Kitesurfing Lesson', slug: 'essaouira-kitesurf-lesson', category: 'FITNESS_SPORTS', description: 'Learn to kitesurf in the "Wind City of Africa" — reliable Atlantic trade winds and a wide, safe bay for beginners.', price: 70, duration: 'Half day', groupSizeMax: 6, difficulty: 'moderate' },
    { name: 'Argan Oil Cooperative & Coast Day Trip', slug: 'essaouira-argan-coast', category: 'FOOD_DRINK', description: 'Visit a women\'s argan-oil cooperative and the tree-climbing goats along the scenic coast around Essaouira.', price: 35, duration: 'Half day', groupSizeMax: 12 },
  ],
};

seed({ SPOTS, EXPERIENCES }).catch((e) => { console.error(e.message); process.exit(1); });
