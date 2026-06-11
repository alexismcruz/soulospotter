// Batch 1 — Southern Cone: Argentina (Córdoba, Salta), Bolivia, Chile.
// Plus experience backfill for Bariloche & Mendoza (had spots, no experiences).
const { seed } = require('./_latam-seed-helper');

const SPOTS = {
  'cordoba-argentina': [
    { name: 'Café Sorocabana', slug: 'cafe-sorocabana', category: 'CAFE', description: 'A historic Córdoba institution on Plaza San Martín — strong cortados, medialunas, and a sunny terrace that has been the city centre meeting point for generations.', address: 'Buenos Aires 1, Córdoba', priceRange: 'BUDGET', rating: 4.4, tags: ['historic','coffee','central','terrace'] },
    { name: 'Aldea Hostel', slug: 'aldea-hostel-cordoba', category: 'ACCOMMODATION', description: 'A relaxed, sociable hostel in the heart of Nueva Córdoba near the university — rooftop terrace, frequent asados, and the best base for the city nightlife.', address: 'Santa Rosa 447, Córdoba', priceRange: 'BUDGET', rating: 4.5, tags: ['hostel','social','rooftop','nueva-cordoba'] },
    { name: 'Manzana Jesuítica', slug: 'manzana-jesuitica', category: 'CULTURE', description: 'The UNESCO-listed Jesuit Block — the oldest university in Argentina, a baroque church, and the colonial heart of Córdoba, all in a single city block.', address: 'Obispo Trejo 242, Córdoba', priceRange: 'FREE', rating: 4.7, tags: ['unesco','jesuit','history','university'] },
  ],
  'salta': [
    { name: 'Café del Tiempo', slug: 'cafe-del-tiempo', category: 'FOOD', description: 'A beloved peña on Balcarce street — empanadas salteñas, locro, and live folklore music with dancing every night in the heart of Salta.', address: 'Balcarce 901, Salta', priceRange: 'MID', rating: 4.5, tags: ['peña','folklore','empanadas','live-music'] },
    { name: 'Las Rejas Hostel', slug: 'las-rejas-hostel', category: 'ACCOMMODATION', description: 'A welcoming colonial-house hostel a few blocks from the main plaza — leafy patio, helpful tour desk for the Salta–Jujuy circuit, and a great breakfast.', address: 'General Güemes 569, Salta', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','colonial','patio','central'] },
    { name: 'MAAM — Museo de Arqueología de Alta Montaña', slug: 'maam-salta', category: 'CULTURE', description: 'One of South America\'s most extraordinary museums — home to the Llullaillaco Children, perfectly preserved Inca mummies found at 6,700m on a sacred volcano.', address: 'Mitre 77, Salta', priceRange: 'BUDGET', rating: 4.6, tags: ['museum','inca','mummies','archaeology'] },
  ],
  'la-paz': [
    { name: 'Café del Mundo', slug: 'cafe-del-mundo-la-paz', category: 'CAFE', description: 'A traveller-favourite Scandinavian-run café in Sopocachi — big breakfasts, strong coffee at altitude, and reliable wifi for catching up on the road.', address: 'Calle Murillo 1064, La Paz', priceRange: 'BUDGET', rating: 4.5, tags: ['coffee','breakfast','wifi','backpacker'] },
    { name: 'Loki Hostel La Paz', slug: 'loki-hostel-la-paz', category: 'ACCOMMODATION', description: 'A legendary party hostel in a colonial mansion near Plaza San Pedro — rooftop bar with city views, nightly events, and the social hub of the gringo trail.', address: 'Av. América 120, La Paz', priceRange: 'BUDGET', rating: 4.2, tags: ['hostel','party','rooftop','social'] },
    { name: 'Mercado de las Brujas', slug: 'mercado-de-las-brujas', category: 'CULTURE', description: 'The Witches\' Market — a fascinating cluster of stalls selling dried llama foetuses, herbs, and Aymara amulets for offerings to Pachamama.', address: 'Calle Linares, La Paz', priceRange: 'FREE', rating: 4.3, tags: ['market','aymara','culture','unique'] },
  ],
  'sucre': [
    { name: 'Café Mirador', slug: 'cafe-mirador-sucre', category: 'CAFE', description: 'A terraced garden café beside the Recoleta lookout — the best sunset views over Sucre\'s white colonial rooftops with a coffee or local wine in hand.', address: 'Pasaje Iturricha 297, Sucre', priceRange: 'BUDGET', rating: 4.5, tags: ['views','sunset','garden','coffee'] },
    { name: 'Kultur Berlin Hostel', slug: 'kultur-berlin-hostel', category: 'ACCOMMODATION', description: 'A cultural-centre hostel with a leafy courtyard, on-site bar with live music, and an attached Spanish school — Sucre is Bolivia\'s best place to study Spanish.', address: 'Calle Avaroa 326, Sucre', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','spanish-school','live-music','courtyard'] },
    { name: 'Casa de la Libertad', slug: 'casa-de-la-libertad', category: 'CULTURE', description: 'The birthplace of Bolivia — the hall where the country\'s independence was declared in 1825, on the elegant Plaza 25 de Mayo.', address: 'Plaza 25 de Mayo, Sucre', priceRange: 'BUDGET', rating: 4.5, tags: ['history','independence','museum','plaza'] },
  ],
  'potosi': [
    { name: 'Café La Plata', slug: 'cafe-la-plata-potosi', category: 'CAFE', description: 'An elegant café on the main plaza in the world\'s highest city — warm refuge from the altitude with hot chocolate, cakes, and colonial-era atmosphere.', address: 'Plaza 10 de Noviembre, Potosí', priceRange: 'BUDGET', rating: 4.3, tags: ['coffee','plaza','altitude','colonial'] },
    { name: 'La Casona Hostel', slug: 'la-casona-hostel-potosi', category: 'ACCOMMODATION', description: 'A restored colonial house near the centre — cosy heated rooms (essential at 4,000m), and a helpful base for visiting the Cerro Rico silver mines.', address: 'Calle Chuquisaca 460, Potosí', priceRange: 'BUDGET', rating: 4.2, tags: ['hostel','colonial','heated','central'] },
    { name: 'Casa Nacional de la Moneda', slug: 'casa-nacional-de-la-moneda', category: 'CULTURE', description: 'The Royal Mint — one of South America\'s finest museums, telling the brutal and astonishing story of the silver that funded the Spanish Empire.', address: 'Calle Ayacucho, Potosí', priceRange: 'BUDGET', rating: 4.6, tags: ['museum','silver','colonial','history'] },
  ],
  'uyuni': [
    { name: 'Minuteman Pizza', slug: 'minuteman-pizza-uyuni', category: 'FOOD', description: 'A surprising American-run pizzeria inside Hotel Tonito — wood-fired pizzas and the best breakfast in town, beloved by travellers before salt-flat tours.', address: 'Av. Ferroviaria, Uyuni', priceRange: 'MID', rating: 4.6, tags: ['pizza','breakfast','traveller','warm'] },
    { name: 'Hotel de Sal Luna Salada', slug: 'luna-salada-uyuni', category: 'ACCOMMODATION', description: 'A hotel built almost entirely from salt blocks on the edge of the Salar — walls, beds, and chairs of salt, with sweeping sunrise views over the white expanse.', address: 'Salar de Uyuni edge', priceRange: 'HIGH', rating: 4.5, tags: ['salt-hotel','unique','sunrise','salar'] },
    { name: 'Cementerio de Trenes', slug: 'cementerio-de-trenes', category: 'CULTURE', description: 'The Train Cemetery — rusting 19th-century steam locomotives marooned on the altiplano, a hauntingly photogenic relic of Bolivia\'s mining boom.', address: '3km SW of Uyuni', priceRange: 'FREE', rating: 4.2, tags: ['trains','photography','altiplano','unique'] },
  ],
  'santa-cruz-bolivia': [
    { name: 'Café Lorca', slug: 'cafe-lorca-santa-cruz', category: 'CAFE', description: 'A bohemian café-bar on the main plaza — coffee by day, cocktails and live music by night, and the cultural hub of tropical lowland Santa Cruz.', address: 'Calle René Moreno 20, Santa Cruz', priceRange: 'MID', rating: 4.4, tags: ['coffee','bar','live-music','plaza'] },
    { name: 'Jodanga Backpackers', slug: 'jodanga-backpackers', category: 'ACCOMMODATION', description: 'Santa Cruz\'s top hostel — a pool, bar, and social vibe that makes it the go-to base for exploring the Jesuit Missions and Amboró National Park.', address: 'Calle El Fuerte 1380, Santa Cruz', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','pool','social','base'] },
    { name: 'Biocentro Güembé', slug: 'biocentro-guembe', category: 'NATURE', description: 'A lush tropical park on the edge of the city — the world\'s largest butterfly dome, orchid gardens, natural pools, and a slice of Amazonian biodiversity.', address: 'Km 7 Camino a Porongo, Santa Cruz', priceRange: 'MID', rating: 4.5, tags: ['nature','butterflies','pools','tropical'] },
  ],
  'santiago': [
    { name: 'Café Triciclo', slug: 'cafe-triciclo-santiago', category: 'CAFE', description: 'A specialty coffee favourite in Providencia — single-origin Chilean-roasted beans, great brunch, and laptop-friendly tables popular with digital nomads.', address: 'Antonia López de Bello 96, Santiago', priceRange: 'MID', rating: 4.6, tags: ['specialty-coffee','brunch','nomad','providencia'] },
    { name: 'Hostal Rio Amazonas', slug: 'hostal-rio-amazonas', category: 'ACCOMMODATION', description: 'A grand old mansion turned hostel near Plaza Italia — high ceilings, a sunny patio, and walking distance to Bellavista\'s nightlife and Cerro San Cristóbal.', address: 'Av. Vicuña Mackenna 47, Santiago', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','mansion','central','bellavista'] },
    { name: 'Mercado Central', slug: 'mercado-central-santiago', category: 'FOOD', description: 'Santiago\'s wrought-iron seafood market — vast platters of machas, congrio, and ceviche under a 19th-century cast-iron roof shipped from England.', address: 'San Pablo 967, Santiago', priceRange: 'MID', rating: 4.3, tags: ['seafood','market','historic','ceviche'] },
  ],
  'valparaiso': [
    { name: 'Fauna Hotel & Café', slug: 'fauna-hotel-cafe', category: 'CAFE', description: 'A stylish café-terrace on Cerro Alegre with sweeping views over Valparaíso\'s tumbling, technicolour hills and the Pacific beyond.', address: 'Paseo Dimalow 166, Valparaíso', priceRange: 'MID', rating: 4.5, tags: ['views','coffee','cerro-alegre','terrace'] },
    { name: 'Casa Volante Hostel', slug: 'casa-volante-hostel', category: 'ACCOMMODATION', description: 'An arty, colourful hostel on Cerro Concepción — surrounded by street murals, with a sociable kitchen and a knowledgeable host for exploring the hills.', address: 'Calle Templeman, Valparaíso', priceRange: 'BUDGET', rating: 4.5, tags: ['hostel','street-art','cerro','arty'] },
    { name: 'Ascensores de Valparaíso', slug: 'ascensores-valparaiso', category: 'CULTURE', description: 'The historic funicular elevators that climb Valparaíso\'s steep hills — riding the 19th-century Ascensor Concepción is a UNESCO-listed rite of passage.', address: 'Multiple hills, Valparaíso', priceRange: 'BUDGET', rating: 4.4, tags: ['funicular','unesco','historic','views'] },
  ],
  'san-pedro-de-atacama': [
    { name: 'Café Adobe', slug: 'cafe-adobe-atacama', category: 'FOOD', description: 'An atmospheric adobe courtyard restaurant with a roaring fire pit — the social heart of San Pedro for dinner and drinks after desert tours.', address: 'Caracoles 211, San Pedro de Atacama', priceRange: 'MID', rating: 4.3, tags: ['restaurant','fire-pit','social','desert'] },
    { name: 'Hostal La Ruca', slug: 'hostal-la-ruca', category: 'ACCOMMODATION', description: 'A laid-back adobe hostel with hammocks and a shared kitchen — a quiet, well-priced base a few minutes from the tour agencies on Caracoles.', address: 'Calle Toconao, San Pedro de Atacama', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','adobe','hammocks','quiet'] },
    { name: 'Valle de la Luna', slug: 'valle-de-la-luna', category: 'NATURE', description: 'The Valley of the Moon — surreal salt-and-stone formations that glow red and gold at sunset, the iconic landscape of the Atacama Desert.', address: '13km W of San Pedro', priceRange: 'BUDGET', rating: 4.7, tags: ['desert','sunset','landscape','iconic'] },
  ],
  'puerto-natales': [
    { name: 'Cafe Kaiken', slug: 'cafe-kaiken-puerto-natales', category: 'FOOD', description: 'A tiny, beloved Patagonian bistro — hearty home-cooked dishes and craft beer to refuel before or after trekking the W Circuit in Torres del Paine.', address: 'Baquedano 699, Puerto Natales', priceRange: 'MID', rating: 4.7, tags: ['patagonia','bistro','craft-beer','cosy'] },
    { name: 'Singing Lamb Hostel', slug: 'singing-lamb-hostel', category: 'ACCOMMODATION', description: 'A warm, eco-conscious hostel famous for its huge breakfast and gear-rental advice — the go-to base for organising a Torres del Paine trek.', address: 'Arauco 779, Puerto Natales', priceRange: 'BUDGET', rating: 4.6, tags: ['hostel','trekking-base','breakfast','eco'] },
    { name: 'Costanera Waterfront', slug: 'costanera-puerto-natales', category: 'NATURE', description: 'The waterfront promenade along Última Esperanza Sound — black-necked swans, dramatic fjord light, and the iconic Milodón sculpture.', address: 'Av. Pedro Montt, Puerto Natales', priceRange: 'FREE', rating: 4.4, tags: ['waterfront','fjord','wildlife','walk'] },
  ],
  'pucon': [
    { name: 'Café de la Plaza', slug: 'cafe-de-la-plaza-pucon', category: 'CAFE', description: 'A cosy alpine-style café on Pucón\'s main street — great coffee, kuchen cakes, and the perfect spot to plan adventures around Villarrica Volcano.', address: 'Av. O\'Higgins, Pucón', priceRange: 'BUDGET', rating: 4.4, tags: ['coffee','kuchen','alpine','central'] },
    { name: 'Chili Kiwi Hostel', slug: 'chili-kiwi-hostel', category: 'ACCOMMODATION', description: 'A lakefront hostel with tepees, treehouses, and quirky cabins right on Lake Villarrica — consistently rated one of Chile\'s best for its social vibe.', address: 'Av. Pedro de Valdivia 167, Pucón', priceRange: 'BUDGET', rating: 4.7, tags: ['hostel','lakefront','quirky','social'] },
    { name: 'Volcán Villarrica', slug: 'volcan-villarrica', category: 'NATURE', description: 'The smoking, snow-capped volcano that towers over Pucón — a strenuous guided summit climb rewarded with a glimpse into the glowing lava crater.', address: 'Villarrica National Park', priceRange: 'FREE', rating: 4.7, tags: ['volcano','climbing','snow','iconic'] },
  ],
};

const EXPERIENCES = {
  // Backfill for cities that had spots but no experiences
  'bariloche': [
    { name: 'Circuito Chico Scenic Drive & Lookouts', slug: 'bariloche-circuito-chico', category: 'OUTDOOR_ADVENTURE', description: 'The classic Bariloche loop — Cerro Campanario chairlift to one of the world\'s best panoramas, Llao Llao forest trails, and turquoise Andean lakes.', price: 45, duration: 'Full day', groupSizeMax: 12, highlights: [] },
    { name: 'Bariloche Chocolate & Craft Beer Tour', slug: 'bariloche-chocolate-beer-tour', category: 'FOOD_DRINK', description: 'A tasting walk through Argentina\'s chocolate capital — artisan chocolatiers on Calle Mitre followed by the Patagonian craft-beer scene.', price: 40, duration: '3 hours', groupSizeMax: 10 },
    { name: 'Cerro Catedral Hike & Refugio Frey', slug: 'bariloche-cerro-catedral-frey', category: 'OUTDOOR_ADVENTURE', description: 'A spectacular full-day trek to Refugio Frey, a stone mountain hut beside a granite-ringed alpine lagoon — one of Patagonia\'s most rewarding day hikes.', price: 55, duration: 'Full day', groupSizeMax: 8 },
  ],
  'mendoza': [
    { name: 'Maipú Valley Wine & Bike Tour', slug: 'mendoza-maipu-wine-bike', category: 'FOOD_DRINK', description: 'Cycle between family-run bodegas in the Maipú Valley — Malbec tastings, an olive-oil stop, and lunch among the vines beneath the Andes.', price: 50, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Uco Valley Premium Winery Day', slug: 'mendoza-uco-valley-winery-day', category: 'FOOD_DRINK', description: 'A full day in the high-altitude Uco Valley visiting boutique wineries — guided tastings and a multi-course pairing lunch with Andes views.', price: 130, duration: 'Full day', groupSizeMax: 10 },
    { name: 'Aconcagua & High Andes Day Trip', slug: 'mendoza-aconcagua-andes-day-trip', category: 'OUTDOOR_ADVENTURE', description: 'A scenic drive into the high Andes to the foot of Aconcagua, the highest peak in the Americas, via the Inca Bridge and Uspallata Pass.', price: 70, duration: 'Full day', groupSizeMax: 14 },
  ],
  // New batch-1 cities
  'cordoba-argentina': [
    { name: 'Jesuit Estancias Day Trip', slug: 'cordoba-jesuit-estancias', category: 'ARTS_CULTURE', description: 'A day visiting the UNESCO-listed colonial Jesuit estancias of Alta Gracia and Jesús María — baroque churches and the history of Argentina\'s frontier.', price: 55, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Córdoba Craft Beer Crawl', slug: 'cordoba-craft-beer-crawl', category: 'NIGHTLIFE_SOCIAL', description: 'Argentina\'s craft-beer capital after dark — a guided crawl through Güemes neighbourhood breweries with tastings and the city\'s liveliest bar scene.', price: 35, duration: '3 hours', groupSizeMax: 10 },
    { name: 'Sierras de Córdoba Hiking Day', slug: 'cordoba-sierras-hiking', category: 'OUTDOOR_ADVENTURE', description: 'Escape the city into the rolling Sierras — river swimming holes, panoramic ridge trails, and the relaxed mountain-town vibe of La Cumbrecita.', price: 50, duration: 'Full day', groupSizeMax: 12 },
  ],
  'salta': [
    { name: 'Quebrada de Humahuaca Full-Day Tour', slug: 'salta-quebrada-humahuaca', category: 'OUTDOOR_ADVENTURE', description: 'A journey up the UNESCO Quebrada de Humahuaca — the Hill of Seven Colours at Purmamarca, Andean villages, and dramatic high-desert landscapes.', price: 65, duration: 'Full day', groupSizeMax: 14 },
    { name: 'Salta Empanada & Wine Class', slug: 'salta-empanada-wine-class', category: 'FOOD_DRINK', description: 'Learn to fold the famous empanada salteña by hand, then pair them with high-altitude Cafayate Torrontés in a traditional Salta kitchen.', price: 45, duration: '3 hours', groupSizeMax: 8 },
    { name: 'Cafayate Wine Route Day Trip', slug: 'salta-cafayate-wine-route', category: 'FOOD_DRINK', description: 'Drive through the red-rock Quebrada de las Conchas to Cafayate, home of Torrontés — winery tastings amid some of the world\'s highest vineyards.', price: 70, duration: 'Full day', groupSizeMax: 12 },
  ],
  'la-paz': [
    { name: 'Death Road Mountain Bike Descent', slug: 'la-paz-death-road-bike', category: 'OUTDOOR_ADVENTURE', description: 'The legendary 64km descent of the Yungas "Death Road" — from 4,650m altiplano to steamy jungle, on one of the world\'s most thrilling rides.', price: 110, duration: 'Full day', groupSizeMax: 12, difficulty: 'challenging' },
    { name: 'La Paz Cable Car City Tour', slug: 'la-paz-cable-car-tour', category: 'ARTS_CULTURE', description: 'Ride the world\'s highest urban cable-car network across the canyon city to El Alto — markets, viewpoints, and a unique perspective on Andean urban life.', price: 30, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Tiwanaku Ancient Ruins Day Trip', slug: 'la-paz-tiwanaku-day-trip', category: 'ARTS_CULTURE', description: 'A day at Tiwanaku, the pre-Inca civilisation\'s monumental capital — the Gate of the Sun, megalithic temples, and 1,500 years of Andean history.', price: 50, duration: 'Full day', groupSizeMax: 14 },
  ],
  'sucre': [
    { name: 'Sucre Spanish Immersion Half-Day', slug: 'sucre-spanish-immersion', category: 'ARTS_CULTURE', description: 'A taster Spanish lesson with a local teacher in Bolivia\'s premier language city, combined with a guided walk of the white colonial centre.', price: 25, duration: 'Half day', groupSizeMax: 6 },
    { name: 'Tarabuco Indigenous Market Sunday Trip', slug: 'sucre-tarabuco-market', category: 'ARTS_CULTURE', description: 'A Sunday journey to the Tarabuco market, where Yampara people in traditional dress trade textiles, produce, and crafts in a vivid Andean spectacle.', price: 40, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Cretaceous Dinosaur Tracks Tour', slug: 'sucre-dinosaur-tracks', category: 'OUTDOOR_ADVENTURE', description: 'Visit Cal Orcko — a vertical cliff face holding over 5,000 dinosaur footprints, the largest collection of Cretaceous tracks on Earth.', price: 20, duration: 'Half day', groupSizeMax: 15 },
  ],
  'potosi': [
    { name: 'Cerro Rico Silver Mine Tour', slug: 'potosi-cerro-rico-mine', category: 'ARTS_CULTURE', description: 'A sobering descent into the working cooperative mines of Cerro Rico, guided by ex-miners — the mountain whose silver built an empire and cost millions of lives.', price: 25, duration: 'Half day', groupSizeMax: 8, difficulty: 'challenging' },
    { name: 'Colonial Potosí Walking Tour', slug: 'potosi-colonial-walking-tour', category: 'ARTS_CULTURE', description: 'Walk the streets of the city that was once larger than London — baroque churches, the Royal Mint, and the astonishing legacy of New World silver.', price: 18, duration: '3 hours', groupSizeMax: 12 },
    { name: 'Tarapaya Volcanic Crater Lake Trip', slug: 'potosi-tarapaya-crater', category: 'OUTDOOR_ADVENTURE', description: 'A trip to the Ojo del Inca, a perfectly circular thermal crater lake outside Potosí — a warm soak at altitude beneath the altiplano sky.', price: 22, duration: 'Half day', groupSizeMax: 12 },
  ],
  'uyuni': [
    { name: 'Salar de Uyuni Sunrise & Mirror Tour', slug: 'uyuni-salar-sunrise-mirror', category: 'OUTDOOR_ADVENTURE', description: 'The world\'s largest salt flat at its most magical — sunrise over endless white, perspective photos, and the surreal mirror effect after rain.', price: 60, duration: 'Full day', groupSizeMax: 7 },
    { name: '3-Day Salt Flats & Coloured Lagoons Expedition', slug: 'uyuni-3day-lagoons-expedition', category: 'OUTDOOR_ADVENTURE', description: 'The classic 4x4 expedition across the Salar to the red and green altiplano lagoons, flamingos, geysers, and the Dalí Desert near the Chilean border.', price: 200, duration: '3 days', groupSizeMax: 6, difficulty: 'moderate' },
    { name: 'Incahuasi Cactus Island Tour', slug: 'uyuni-incahuasi-island', category: 'OUTDOOR_ADVENTURE', description: 'Cross the salt flat to Incahuasi, a coral-rock island studded with giant centuries-old cacti, rising like a mirage from the white expanse.', price: 55, duration: 'Half day', groupSizeMax: 7 },
  ],
  'santa-cruz-bolivia': [
    { name: 'Jesuit Missions of Chiquitos Day Trip', slug: 'santa-cruz-jesuit-missions', category: 'ARTS_CULTURE', description: 'Visit the UNESCO-listed Chiquitano Jesuit mission churches — extraordinary baroque-meets-indigenous architecture deep in the eastern lowlands.', price: 70, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Amboró National Park Wildlife Trek', slug: 'santa-cruz-amboro-trek', category: 'OUTDOOR_ADVENTURE', description: 'Trek into Amboró, where the Andes meet the Amazon — giant ferns, waterfalls, and a chance to spot toucans, monkeys, and rare birds.', price: 80, duration: 'Full day', groupSizeMax: 10, difficulty: 'moderate' },
    { name: 'Santa Cruz Lowland Food Tour', slug: 'santa-cruz-food-tour', category: 'FOOD_DRINK', description: 'Taste the tropical cuisine of eastern Bolivia — cuñapé cheese bread, majadito rice, fresh river fish, and the city\'s vibrant market culture.', price: 35, duration: '3 hours', groupSizeMax: 10 },
  ],
  'santiago': [
    { name: 'Santiago City & Sky Costanera Tour', slug: 'santiago-city-sky-costanera', category: 'ARTS_CULTURE', description: 'A walking tour of historic downtown — Plaza de Armas, La Moneda palace, and bohemian Lastarria — finishing atop South America\'s tallest building.', price: 40, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Maipo Valley Wine Tasting Day', slug: 'santiago-maipo-wine-day', category: 'FOOD_DRINK', description: 'A short trip to the Maipo Valley, Chile\'s Cabernet heartland — cellar tours and tastings at storied wineries beneath the Andean foothills.', price: 75, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Cajón del Maipo & Embalse El Yeso', slug: 'santiago-cajon-del-maipo', category: 'OUTDOOR_ADVENTURE', description: 'A mountain day trip up the Maipo Canyon to the electric-turquoise El Yeso reservoir, with hot springs and dramatic high-Andes scenery.', price: 65, duration: 'Full day', groupSizeMax: 12 },
  ],
  'valparaiso': [
    { name: 'Valparaíso Street Art Walking Tour', slug: 'valparaiso-street-art-walk', category: 'PHOTOGRAPHY_WALKS', description: 'Climb the painted hills of Cerros Alegre and Concepción with a local guide — world-class murals, hidden staircases, and Valparaíso\'s bohemian soul.', price: 30, duration: '3 hours', groupSizeMax: 12 },
    { name: 'Pablo Neruda\'s La Sebastiana Visit', slug: 'valparaiso-neruda-la-sebastiana', category: 'ARTS_CULTURE', description: 'Tour the poet Pablo Neruda\'s eccentric clifftop house-museum, packed with curiosities and offering one of the finest views over the bay.', price: 25, duration: '2 hours', groupSizeMax: 10 },
    { name: 'Casablanca Valley Wine Day Trip', slug: 'valparaiso-casablanca-wine', category: 'FOOD_DRINK', description: 'A day in the cool-climate Casablanca Valley between Valparaíso and Santiago — crisp Sauvignon Blanc and Pinot Noir tastings among coastal vineyards.', price: 70, duration: 'Full day', groupSizeMax: 12 },
  ],
  'san-pedro-de-atacama': [
    { name: 'El Tatio Geysers Sunrise Tour', slug: 'atacama-el-tatio-geysers', category: 'OUTDOOR_ADVENTURE', description: 'A pre-dawn drive to the world\'s highest geyser field at 4,300m — steaming fumaroles erupting against the sunrise, then a thermal-pool soak.', price: 50, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Stargazing in the Atacama Desert', slug: 'atacama-stargazing', category: 'OUTDOOR_ADVENTURE', description: 'The clearest skies on Earth — an astronomy tour with powerful telescopes, exploring galaxies, nebulae, and the southern Milky Way.', price: 40, duration: 'Evening', groupSizeMax: 15 },
    { name: 'Lagunas Altiplánicas & Salar Tour', slug: 'atacama-altiplanic-lagoons', category: 'OUTDOOR_ADVENTURE', description: 'Visit the high-altitude lagoons Miscanti and Miñiques, flamingo-filled salt flats, and Andean villages on a scenic day across the altiplano.', price: 55, duration: 'Full day', groupSizeMax: 12 },
  ],
  'puerto-natales': [
    { name: 'Torres del Paine Full-Day Tour', slug: 'puerto-natales-torres-del-paine-day', category: 'OUTDOOR_ADVENTURE', description: 'The highlights of Torres del Paine in a day — Lakes Pehoé and Grey, glacier views, guanacos, and the iconic granite towers from the best lookouts.', price: 90, duration: 'Full day', groupSizeMax: 14 },
    { name: 'W Circuit 5-Day Guided Trek', slug: 'puerto-natales-w-circuit-trek', category: 'OUTDOOR_ADVENTURE', description: 'The legendary multi-day trek through Torres del Paine — the Base of the Towers, French Valley, and Grey Glacier, staying in mountain refugios.', price: 950, duration: '5 days', groupSizeMax: 10, difficulty: 'challenging' },
    { name: 'Milodón Cave & Patagonia History Tour', slug: 'puerto-natales-milodon-cave', category: 'ARTS_CULTURE', description: 'Visit the vast Milodón Cave where a giant ground sloth\'s remains were found — Patagonian prehistory that inspired Bruce Chatwin\'s famous travels.', price: 35, duration: 'Half day', groupSizeMax: 12 },
  ],
  'pucon': [
    { name: 'Villarrica Volcano Summit Climb', slug: 'pucon-villarrica-summit-climb', category: 'OUTDOOR_ADVENTURE', description: 'A guided ascent of the smoking Villarrica Volcano — crampons and ice axe to the crater rim, then a thrilling slide back down the snow.', price: 130, duration: 'Full day', groupSizeMax: 10, difficulty: 'challenging' },
    { name: 'Hot Springs Evening at Termas Geométricas', slug: 'pucon-termas-geometricas', category: 'WELLNESS_MINDFULNESS', description: 'Soak in the stunning Termas Geométricas — 17 slate pools linked by red boardwalks through a steaming, fern-filled forest gorge.', price: 60, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Huerquehue National Park Hike', slug: 'pucon-huerquehue-hike', category: 'OUTDOOR_ADVENTURE', description: 'Trek through ancient araucaria forests to a string of crystal mountain lakes, with views back to the perfect cone of Villarrica.', price: 55, duration: 'Full day', groupSizeMax: 12 },
  ],
};

seed({ SPOTS, EXPERIENCES }).catch((e) => { console.error(e.message); process.exit(1); });
