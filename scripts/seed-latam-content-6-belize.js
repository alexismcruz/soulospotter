// Batch 6 (final) — Belize: San Ignacio, Placencia, Hopkins, Ambergris Caye.
const { seed } = require('./_latam-seed-helper');

const SPOTS = {
  'san-ignacio': [
    { name: 'Ko-Ox Han Nah', slug: 'ko-ox-han-nah-san-ignacio', category: 'FOOD', description: 'A beloved San Ignacio restaurant ("Let\'s Go Eat") — generous Belizean and international plates that fuel cave and ruin adventures.', address: 'Burns Ave, San Ignacio', priceRange: 'MID', rating: 4.6, tags: ['belizean','hearty','central','traveller'] },
    { name: 'Bella\'s Backpackers', slug: 'bellas-backpackers-san-ignacio', category: 'ACCOMMODATION', description: 'A laid-back rooftop hostel in the centre of San Ignacio — the social hub for ATM cave tours and jungle excursions.', address: 'San Ignacio', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','rooftop','social','adventure-base'] },
    { name: 'Cahal Pech Ruins', slug: 'cahal-pech-ruins', category: 'CULTURE', description: 'A hilltop Maya palace complex on the edge of town — quiet, atmospheric ruins with views over San Ignacio and the Macal River.', address: 'San Ignacio', priceRange: 'BUDGET', rating: 4.4, tags: ['maya','ruins','hilltop','quiet'] },
  ],
  'placencia': [
    { name: 'Rumfish y Vino', slug: 'rumfish-y-vino-placencia', category: 'FOOD', description: 'A stylish gastro-bar on the Placencia peninsula — fresh seafood small plates and Belizean rum cocktails above the village.', address: 'Placencia Village', priceRange: 'MID', rating: 4.6, tags: ['seafood','rum','gastrobar','village'] },
    { name: 'Lydia\'s Guesthouse', slug: 'lydias-guesthouse-placencia', category: 'ACCOMMODATION', description: 'A friendly budget guesthouse steps from the beach and the famous Placencia Sidewalk — simple, central, and welcoming.', address: 'Placencia Village', priceRange: 'BUDGET', rating: 4.4, tags: ['guesthouse','beach','central','friendly'] },
    { name: 'Placencia Beach', slug: 'placencia-beach', category: 'NATURE', description: 'Sixteen miles of palm-lined Caribbean sand on a narrow peninsula — the best mainland beach in Belize and a whale-shark gateway.', address: 'Placencia', priceRange: 'FREE', rating: 4.5, tags: ['beach','caribbean','peninsula','palms'] },
  ],
  'hopkins': [
    { name: 'Innie\'s Restaurant', slug: 'innies-restaurant-hopkins', category: 'FOOD', description: 'An authentic Garífuna kitchen — hudut (fish in coconut broth) and cassava dishes in the cultural heartland of Hopkins.', address: 'Hopkins Village', priceRange: 'BUDGET', rating: 4.5, tags: ['garifuna','seafood','authentic','village'] },
    { name: 'Funky Dodo Hostel', slug: 'funky-dodo-hostel-hopkins', category: 'ACCOMMODATION', description: 'The only true backpacker hostel in Hopkins — a relaxed garden, bar, and the social centre of this Garífuna beach village.', address: 'Hopkins Village', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','garden','social','beach'] },
    { name: 'Hopkins Beach', slug: 'hopkins-beach', category: 'NATURE', description: 'A long, mellow Caribbean beach with calm water and a barefoot village vibe — drumming, reef trips, and easygoing days.', address: 'Hopkins', priceRange: 'FREE', rating: 4.4, tags: ['beach','garifuna','calm','barefoot'] },
  ],
  'ambergris-caye': [
    { name: 'Elvi\'s Kitchen', slug: 'elvis-kitchen-ambergris', category: 'FOOD', description: 'A San Pedro institution that grew from a sand-floor burger stand — fresh ceviche, grilled lobster, and Belizean classics.', address: 'San Pedro, Ambergris Caye', priceRange: 'MID', rating: 4.5, tags: ['seafood','ceviche','lobster','iconic'] },
    { name: 'Pedro\'s Hotel', slug: 'pedros-hotel-ambergris', category: 'ACCOMMODATION', description: 'A lively budget hotel and bar in San Pedro with a pool — a sociable, affordable base on Belize\'s largest island.', address: 'San Pedro, Ambergris Caye', priceRange: 'BUDGET', rating: 4.2, tags: ['hotel','pool','social','san-pedro'] },
    { name: 'Hol Chan Marine Reserve', slug: 'hol-chan-marine-reserve', category: 'NATURE', description: 'Belize\'s premier marine reserve off Ambergris — a coral channel and Shark Ray Alley teeming with nurse sharks, rays, and turtles.', address: 'near San Pedro, Ambergris Caye', priceRange: 'MID', rating: 4.7, tags: ['marine-reserve','snorkeling','sharks','reef'] },
  ],
};

const EXPERIENCES = {
  'san-ignacio': [
    { name: 'ATM Cave (Actun Tunichil Muknal) Tour', slug: 'san-ignacio-atm-cave', category: 'OUTDOOR_ADVENTURE', description: 'Swim and scramble into the sacred ATM cave to a chamber of Maya sacrificial pottery and the crystallised "Crystal Maiden" skeleton.', price: 110, duration: 'Full day', groupSizeMax: 8, difficulty: 'challenging' },
    { name: 'Caracol Maya Ruins & Rio Frio Cave', slug: 'san-ignacio-caracol', category: 'ARTS_CULTURE', description: 'A day trip to Caracol, Belize\'s greatest Maya city deep in the jungle, with a stop at the Rio Frio cave and waterfalls.', price: 95, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Macal River Canoe & Cave Tubing', slug: 'san-ignacio-river-canoe', category: 'OUTDOOR_ADVENTURE', description: 'Paddle the jungle-lined Macal River and tube through limestone caves — a relaxed half-day of Cayo District adventure.', price: 50, duration: 'Half day', groupSizeMax: 10 },
  ],
  'placencia': [
    { name: 'Whale Shark & Reef Snorkel Trip', slug: 'placencia-whale-shark', category: 'OUTDOOR_ADVENTURE', description: 'A seasonal boat trip to Gladden Spit, where whale sharks gather around the full moon, plus reef snorkelling off Placencia.', price: 150, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Monkey River Wildlife Boat Tour', slug: 'placencia-monkey-river', category: 'OUTDOOR_ADVENTURE', description: 'Cruise the Monkey River through mangroves and jungle spotting howler monkeys, crocodiles, manatees, and tropical birds.', price: 70, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Silk Cayes Snorkel & Beach Day', slug: 'placencia-silk-cayes', category: 'OUTDOOR_ADVENTURE', description: 'Boat out to the tiny Silk Cayes for snorkelling over coral, swimming with turtles, and a barefoot lunch on a sand island.', price: 95, duration: 'Full day', groupSizeMax: 12 },
  ],
  'hopkins': [
    { name: 'Garífuna Drumming Workshop', slug: 'hopkins-garifuna-drumming', category: 'ARTS_CULTURE', description: 'Learn traditional Garífuna drumming from master drummers in Hopkins, the cultural heart of Belize\'s Afro-indigenous people.', price: 35, duration: '2 hours', groupSizeMax: 10 },
    { name: 'Cockscomb Jaguar Reserve Hike', slug: 'hopkins-cockscomb-jaguar', category: 'OUTDOOR_ADVENTURE', description: 'Hike the world\'s first jaguar reserve — jungle trails, waterfalls, and swimming holes in the Cockscomb Basin near Hopkins.', price: 65, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Barrier Reef Snorkel Trip', slug: 'hopkins-reef-snorkel', category: 'OUTDOOR_ADVENTURE', description: 'Boat out to the Belize Barrier Reef from Hopkins for snorkelling over vibrant coral gardens teeming with marine life.', price: 80, duration: 'Full day', groupSizeMax: 12 },
  ],
  'ambergris-caye': [
    { name: 'Hol Chan & Shark Ray Alley Snorkel', slug: 'ambergris-hol-chan-snorkel', category: 'OUTDOOR_ADVENTURE', description: 'Snorkel the Hol Chan reserve and famous Shark Ray Alley, swimming alongside nurse sharks, stingrays, and sea turtles.', price: 55, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Great Blue Hole Scenic Flight & Dive', slug: 'ambergris-blue-hole', category: 'OUTDOOR_ADVENTURE', description: 'Journey to the iconic Great Blue Hole — a dive into the 124m sinkhole or a scenic flight over the perfect deep-blue circle.', price: 285, duration: 'Full day', groupSizeMax: 8, difficulty: 'moderate' },
    { name: 'San Pedro Sunset Sail & Cocktails', slug: 'ambergris-sunset-sail', category: 'NIGHTLIFE_SOCIAL', description: 'A catamaran sunset cruise off Ambergris Caye with rum punch, music, and the easygoing island spirit of San Pedro.', price: 60, duration: 'Evening', groupSizeMax: 14 },
  ],
};

seed({ SPOTS, EXPERIENCES }).catch((e) => { console.error(e.message); process.exit(1); });
