// Batch 2 — Brazil (São Paulo, Salvador, Florianópolis, Foz do Iguaçu, Manaus),
// Colombia (Cali, San Gil, Santa Marta), Ecuador (Quito, Cuenca, Baños, Montañita, Puerto Ayora).
const { seed } = require('./_latam-seed-helper');

const SPOTS = {
  'sao-paulo': [
    { name: 'Coffee Lab', slug: 'coffee-lab-sao-paulo', category: 'CAFE', description: 'Isabela Raposeiras\' pioneering specialty coffee lab in Vila Madalena — Brazilian single origins roasted on-site and a temple for serious coffee lovers.', address: 'R. Fradique Coutinho 1340, São Paulo', priceRange: 'MID', rating: 4.6, tags: ['specialty-coffee','vila-madalena','roastery'] },
    { name: 'O de Casa Hostel', slug: 'o-de-casa-hostel', category: 'ACCOMMODATION', description: 'A design-led hostel in buzzing Vila Madalena — walking distance to bars, street art, and the metro, with a sociable bar and rooftop.', address: 'R. Inácio Pereira da Rocha 320, São Paulo', priceRange: 'BUDGET', rating: 4.5, tags: ['hostel','vila-madalena','design','social'] },
    { name: 'Mercado Municipal', slug: 'mercado-municipal-sao-paulo', category: 'FOOD', description: 'São Paulo\'s cathedral of food — stained-glass windows above stalls of exotic fruit, and the legendary mortadella sandwich and pastel de bacalhau.', address: 'R. da Cantareira 306, São Paulo', priceRange: 'MID', rating: 4.5, tags: ['market','food','mortadella','historic'] },
  ],
  'salvador': [
    { name: 'Café com Letras', slug: 'cafe-com-letras-salvador', category: 'CAFE', description: 'A relaxed café-bookshop in the Pelourinho — refuge from the heat with coffee, Bahian sweets, and a view over colourful colonial facades.', address: 'Pelourinho, Salvador', priceRange: 'BUDGET', rating: 4.3, tags: ['coffee','bookshop','pelourinho','colonial'] },
    { name: 'Laranjeiras Hostel', slug: 'laranjeiras-hostel-salvador', category: 'ACCOMMODATION', description: 'A backpacker classic in the heart of the historic Pelourinho — colourful, central, and steps from capoeira circles and live music.', address: 'R. Inácio Acioli 13, Salvador', priceRange: 'BUDGET', rating: 4.3, tags: ['hostel','pelourinho','central','capoeira'] },
    { name: 'Elevador Lacerda', slug: 'elevador-lacerda', category: 'CULTURE', description: 'The iconic Art Deco elevator connecting the upper and lower cities since 1873 — sweeping views over the Bay of All Saints.', address: 'Praça Tomé de Sousa, Salvador', priceRange: 'FREE', rating: 4.2, tags: ['art-deco','views','bay','iconic'] },
  ],
  'florianopolis': [
    { name: 'Box 32 Mercado Público', slug: 'box-32-floripa', category: 'FOOD', description: 'A buzzing stall in Floripa\'s public market famous for its sequência de camarão — endless fresh shrimp and ice-cold beer with the locals.', address: 'Mercado Público, Florianópolis', priceRange: 'MID', rating: 4.5, tags: ['seafood','market','shrimp','local'] },
    { name: 'Tucano House Hostel', slug: 'tucano-house-hostel', category: 'ACCOMMODATION', description: 'An award-winning, hugely social hostel near Lagoa da Conceição — frequent group dinners and beach trips make it the island\'s backpacker hub.', address: 'Lagoa da Conceição, Florianópolis', priceRange: 'BUDGET', rating: 4.7, tags: ['hostel','social','lagoa','beach'] },
    { name: 'Praia da Joaquina', slug: 'praia-da-joaquina', category: 'NATURE', description: 'Floripa\'s famous surf beach backed by giant sand dunes you can sandboard down — powerful waves and a youthful, energetic scene.', address: 'Joaquina, Florianópolis', priceRange: 'FREE', rating: 4.5, tags: ['beach','surf','dunes','sandboarding'] },
  ],
  'foz-do-iguacu': [
    { name: 'Capitão Bar', slug: 'capitao-bar-foz', category: 'NIGHTLIFE', description: 'A long-running Foz institution — live music, cold chopp, and a lively crowd of travellers swapping waterfall stories.', address: 'Av. Brasil, Foz do Iguaçu', priceRange: 'MID', rating: 4.2, tags: ['bar','live-music','social','nightlife'] },
    { name: 'Tetris Container Hostel', slug: 'tetris-container-hostel', category: 'ACCOMMODATION', description: 'A creative hostel built from shipping containers with a pool and bar — the most sociable base for visiting the Iguaçu Falls.', address: 'R. Eng. Reben, Foz do Iguaçu', priceRange: 'BUDGET', rating: 4.6, tags: ['hostel','containers','pool','social'] },
    { name: 'Parque das Aves', slug: 'parque-das-aves', category: 'NATURE', description: 'A bird park beside the falls where you walk through immersive aviaries with toucans, macaws, and flamingos of the Atlantic Forest.', address: 'Av. das Cataratas, Foz do Iguaçu', priceRange: 'MID', rating: 4.7, tags: ['birds','aviary','atlantic-forest','wildlife'] },
  ],
  'manaus': [
    { name: 'Caxiri', slug: 'caxiri-manaus', category: 'FOOD', description: 'A celebrated restaurant of contemporary Amazonian cuisine — tambaqui ribs, tucupi, and jungle fruits, the best introduction to the flavours of the rainforest.', address: 'R. Belo Horizonte, Manaus', priceRange: 'MID', rating: 4.5, tags: ['amazonian','tambaqui','regional','restaurant'] },
    { name: 'Local Hostel Manaus', slug: 'local-hostel-manaus', category: 'ACCOMMODATION', description: 'A clean, friendly hostel near the Opera House — the go-to base for arranging jungle lodges and riverboat trips into the Amazon.', address: 'Centro, Manaus', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','central','jungle-base','friendly'] },
    { name: 'Teatro Amazonas', slug: 'teatro-amazonas', category: 'CULTURE', description: 'The opulent rubber-boom opera house rising pink and gold from the jungle city — a Belle Époque monument to Manaus\'s astonishing wealth.', address: 'Praça São Sebastião, Manaus', priceRange: 'BUDGET', rating: 4.7, tags: ['opera-house','belle-epoque','rubber-boom','iconic'] },
  ],
  'cali': [
    { name: 'Café Macondo', slug: 'cafe-macondo-cali', category: 'CAFE', description: 'A bohemian café in the San Antonio hill district — Colombian coffee, García Márquez décor, and a literary, arty crowd.', address: 'Barrio San Antonio, Cali', priceRange: 'BUDGET', rating: 4.4, tags: ['coffee','san-antonio','bohemian','literary'] },
    { name: 'La Pinta Hostel', slug: 'la-pinta-hostel-cali', category: 'ACCOMMODATION', description: 'A salsa-focused hostel in San Antonio with on-site dance classes — the perfect launchpad for nights out in the world salsa capital.', address: 'Barrio San Antonio, Cali', priceRange: 'BUDGET', rating: 4.5, tags: ['hostel','salsa','san-antonio','social'] },
    { name: 'Gato de Tejada', slug: 'gato-de-tejada', category: 'CULTURE', description: 'Cali\'s beloved riverside cat sculpture surrounded by a gallery of decorated "girlfriend" cats — a quirky, much-loved city landmark.', address: 'Av. del Río, Cali', priceRange: 'FREE', rating: 4.2, tags: ['sculpture','riverside','quirky','landmark'] },
  ],
  'san-gil': [
    { name: 'Gringo Mike\'s', slug: 'gringo-mikes-san-gil', category: 'FOOD', description: 'A backpacker legend in San Gil — huge gourmet burritos, burgers, and breakfasts to fuel a day of rafting and canyoning.', address: 'Calle 12, San Gil', priceRange: 'MID', rating: 4.6, tags: ['burritos','backpacker','breakfast','filling'] },
    { name: 'Sam\'s VIP Hostel', slug: 'sams-vip-hostel-san-gil', category: 'ACCOMMODATION', description: 'A central hostel with a pool and balcony overlooking the main plaza — the social hub for Colombia\'s adventure-sports capital.', address: 'Carrera 10, San Gil', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','pool','plaza','adventure-base'] },
    { name: 'Parque El Gallineral', slug: 'parque-el-gallineral', category: 'NATURE', description: 'A magical riverside nature park draped in silver-grey moss hanging from ancient trees — a cool, shaded escape in the centre of town.', address: 'San Gil', priceRange: 'BUDGET', rating: 4.4, tags: ['park','river','moss','shade'] },
  ],
  'santa-marta': [
    { name: 'Lulo Café Bar', slug: 'lulo-cafe-bar', category: 'CAFE', description: 'A breezy café-bar in the historic centre — tropical-fruit juices by day, cocktails by night, and a relaxed hub for Tayrona-bound travellers.', address: 'Centro Histórico, Santa Marta', priceRange: 'BUDGET', rating: 4.4, tags: ['cafe','juices','centro','tayrona-base'] },
    { name: 'La Brisa Loca Hostel', slug: 'la-brisa-loca-hostel', category: 'ACCOMMODATION', description: 'A grand colonial mansion turned party hostel with a pool and rooftop bar — the legendary social centre of Santa Marta backpacking.', address: 'Calle 14, Santa Marta', priceRange: 'BUDGET', rating: 4.4, tags: ['hostel','colonial','pool','party'] },
    { name: 'Playa Grande Taganga', slug: 'playa-grande-taganga', category: 'NATURE', description: 'A golden cove reached by boat from the fishing village of Taganga — calm swimming, fresh fried fish, and easy diving offshore.', address: 'Taganga, Santa Marta', priceRange: 'FREE', rating: 4.3, tags: ['beach','taganga','swimming','diving'] },
  ],
  'quito': [
    { name: 'Café Mosaico', slug: 'cafe-mosaico-quito', category: 'CAFE', description: 'A hillside café with the finest panorama in Quito — the whole colonial old town and surrounding volcanoes spread out below your coffee.', address: 'Manuel Samaniego N8-95, Quito', priceRange: 'MID', rating: 4.5, tags: ['views','coffee','old-town','panorama'] },
    { name: 'Community Hostel', slug: 'community-hostel-quito', category: 'ACCOMMODATION', description: 'Famous for its family-style group dinners and walking tours — repeatedly rated among the best hostels in South America for solo travellers.', address: 'Pedro Cepero, Quito', priceRange: 'BUDGET', rating: 4.8, tags: ['hostel','social','group-dinners','solo-friendly'] },
    { name: 'La Compañía de Jesús', slug: 'la-compania-de-jesus', category: 'CULTURE', description: 'Quito\'s dazzling Jesuit church, its interior coated in seven tonnes of gold leaf — the masterpiece of South American baroque.', address: 'García Moreno, Quito', priceRange: 'BUDGET', rating: 4.7, tags: ['church','baroque','gold','unesco'] },
  ],
  'cuenca': [
    { name: 'Café Nucallacta', slug: 'cafe-nucallacta', category: 'CAFE', description: 'A specialty roaster championing high-altitude Ecuadorian beans — Cuenca\'s best espresso and a relaxed spot among the colonial streets.', address: 'Hermano Miguel, Cuenca', priceRange: 'BUDGET', rating: 4.6, tags: ['specialty-coffee','roastery','colonial'] },
    { name: 'Hostal Posada del Angel', slug: 'posada-del-angel-cuenca', category: 'ACCOMMODATION', description: 'A charming colonial guesthouse with a plant-filled courtyard — central, peaceful, and ideal for exploring UNESCO-listed Cuenca on foot.', address: 'Bolívar 14-11, Cuenca', priceRange: 'BUDGET', rating: 4.5, tags: ['guesthouse','colonial','courtyard','central'] },
    { name: 'Catedral Nueva', slug: 'catedral-nueva-cuenca', category: 'CULTURE', description: 'The sky-blue domes of Cuenca\'s New Cathedral define the skyline of this beautiful Andean city — climb to the roof for the view.', address: 'Calle Benigno Malo, Cuenca', priceRange: 'FREE', rating: 4.6, tags: ['cathedral','domes','unesco','views'] },
  ],
  'banos-ecuador': [
    { name: 'Stray Dog Brewpub', slug: 'stray-dog-brewpub-banos', category: 'FOOD', description: 'A craft brewpub in the heart of Baños — house-brewed IPAs and big burgers, the social refuel after canyoning and biking the waterfall route.', address: 'Eloy Alfaro, Baños', priceRange: 'MID', rating: 4.5, tags: ['craft-beer','brewpub','burgers','social'] },
    { name: 'Community Hostel Baños', slug: 'community-hostel-banos', category: 'ACCOMMODATION', description: 'The sister of Quito\'s famous hostel — sociable, well-run, and perfectly placed for adventure sports and the thermal baths.', address: 'Calle 16 de Diciembre, Baños', priceRange: 'BUDGET', rating: 4.7, tags: ['hostel','social','adventure-base','central'] },
    { name: 'Casa del Árbol Swing', slug: 'casa-del-arbol-swing', category: 'NATURE', description: 'The famous "swing at the end of the world" — soaring out over a canyon with the active Tungurahua volcano as your backdrop.', address: 'Runtún, Baños', priceRange: 'BUDGET', rating: 4.4, tags: ['swing','volcano','views','iconic'] },
  ],
  'montanita': [
    { name: 'Tiki Limbo', slug: 'tiki-limbo-montanita', category: 'FOOD', description: 'A long-standing Montañita favourite serving global comfort food and cocktails — a reliable, tasty anchor in the surf-party village.', address: 'Calle Principal, Montañita', priceRange: 'MID', rating: 4.4, tags: ['restaurant','cocktails','surf-town','social'] },
    { name: 'Balsa Surf Camp', slug: 'balsa-surf-camp', category: 'ACCOMMODATION', description: 'A laid-back bamboo surf camp with a pool just back from the beach — surf lessons, hammocks, and a mellow alternative to the party centre.', address: 'Montañita', priceRange: 'BUDGET', rating: 4.5, tags: ['surf-camp','pool','bamboo','relaxed'] },
    { name: 'Montañita Point', slug: 'montanita-point', category: 'NATURE', description: 'The right-hand point break that put Montañita on the map — consistent waves drawing surfers from across the continent.', address: 'North end, Montañita', priceRange: 'FREE', rating: 4.3, tags: ['surf','point-break','beach','waves'] },
  ],
  'puerto-ayora': [
    { name: 'Il Giardino', slug: 'il-giardino-puerto-ayora', category: 'FOOD', description: 'A popular Italian-Galápagos restaurant on the waterfront — fresh local fish, wood-fired pizza, and great people-watching over the bay.', address: 'Av. Charles Darwin, Puerto Ayora', priceRange: 'MID', rating: 4.4, tags: ['restaurant','seafood','waterfront','italian'] },
    { name: 'Galápagos Native Hostel', slug: 'galapagos-native-hostel', category: 'ACCOMMODATION', description: 'A friendly, affordable base in the main Galápagos town — central for day-tour operators, snorkelling trips, and the research station.', address: 'Av. Baltra, Puerto Ayora', priceRange: 'MID', rating: 4.4, tags: ['hostel','galapagos','central','budget-galapagos'] },
    { name: 'Tortuga Bay', slug: 'tortuga-bay', category: 'NATURE', description: 'A pristine white-sand beach a short walk from town — marine iguanas, white-tipped reef sharks, and calm turquoise swimming in a protected cove.', address: 'Puerto Ayora, Santa Cruz', priceRange: 'FREE', rating: 4.8, tags: ['beach','iguanas','snorkeling','galapagos'] },
  ],
};

const EXPERIENCES = {
  'sao-paulo': [
    { name: 'São Paulo Street Art & Beco do Batman Tour', slug: 'sao-paulo-street-art-tour', category: 'PHOTOGRAPHY_WALKS', description: 'Explore Vila Madalena and the legendary Beco do Batman alley — a living, ever-changing open-air gallery of Brazil\'s best graffiti artists.', price: 30, duration: '3 hours', groupSizeMax: 12 },
    { name: 'São Paulo Food & Mercadão Tasting', slug: 'sao-paulo-food-mercadao', category: 'FOOD_DRINK', description: 'A guided taste of the world\'s most multicultural food city — the Municipal Market, Japanese Liberdade, and the iconic mortadella sandwich.', price: 55, duration: 'Half day', groupSizeMax: 10 },
    { name: 'Sampa by Night Bar Crawl', slug: 'sao-paulo-bar-crawl', category: 'NIGHTLIFE_SOCIAL', description: 'Dive into São Paulo\'s legendary nightlife with a local guide — botecos, craft-beer bars, and clubs across Vila Madalena and Augusta.', price: 35, duration: 'Evening', groupSizeMax: 12 },
  ],
  'salvador': [
    { name: 'Pelourinho & Afro-Bahian Culture Walk', slug: 'salvador-pelourinho-walk', category: 'ARTS_CULTURE', description: 'Walk the UNESCO Pelourinho with a local guide — colonial squares, the church of São Francisco, and the African roots of Bahian culture.', price: 30, duration: '3 hours', groupSizeMax: 12 },
    { name: 'Capoeira & Berimbau Workshop', slug: 'salvador-capoeira-workshop', category: 'FITNESS_SPORTS', description: 'Learn the basics of capoeira, Brazil\'s martial-art dance born in Bahia, with a mestre in a traditional roda accompanied by live berimbau.', price: 35, duration: '2 hours', groupSizeMax: 10 },
    { name: 'Bahian Moqueca Cooking Class', slug: 'salvador-moqueca-class', category: 'FOOD_DRINK', description: 'Cook the iconic Bahian moqueca seafood stew with dendê oil and coconut milk, plus acarajé, in a hands-on class with a local cook.', price: 45, duration: '3 hours', groupSizeMax: 8 },
  ],
  'florianopolis': [
    { name: 'Floripa Island Beaches Day Tour', slug: 'floripa-island-beaches', category: 'OUTDOOR_ADVENTURE', description: 'A guided loop of the island\'s best beaches — surf at Joaquina, calm Lagoinha do Leste viewpoints, and the dunes, with local tips throughout.', price: 50, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Lagoa da Conceição Stand-Up Paddle', slug: 'floripa-lagoa-sup', category: 'FITNESS_SPORTS', description: 'Paddle the calm, scenic Lagoa da Conceição lagoon at sunset — an easy, beautiful intro to SUP framed by green hills.', price: 30, duration: '2 hours', groupSizeMax: 8 },
    { name: 'Surf Lesson at Praia Mole', slug: 'floripa-surf-lesson', category: 'FITNESS_SPORTS', description: 'A beginner-friendly surf lesson on one of Floripa\'s best beach breaks, with board, wetsuit, and a patient local instructor.', price: 40, duration: '2 hours', groupSizeMax: 6 },
  ],
  'foz-do-iguacu': [
    { name: 'Iguaçu Falls Brazilian Side Tour', slug: 'foz-falls-brazil-side', category: 'OUTDOOR_ADVENTURE', description: 'The panoramic Brazilian side of the falls — sweeping vistas of 275 cascades and the walkway out into the spray of the Devil\'s Throat.', price: 45, duration: 'Half day', groupSizeMax: 14 },
    { name: 'Argentine Side & Devil\'s Throat Day Trip', slug: 'foz-falls-argentina-side', category: 'OUTDOOR_ADVENTURE', description: 'Cross to the Argentine side for the immersive trails and train to the thunderous Garganta del Diablo, right at the lip of the falls.', price: 60, duration: 'Full day', groupSizeMax: 14 },
    { name: 'Macuco Safari Boat Under the Falls', slug: 'foz-macuco-boat-safari', category: 'OUTDOOR_ADVENTURE', description: 'A thrilling speedboat ride straight into the base of the falls — a drenching, exhilarating encounter with the raw power of Iguaçu.', price: 70, duration: '2 hours', groupSizeMax: 12 },
  ],
  'manaus': [
    { name: '3-Day Amazon Jungle Lodge Expedition', slug: 'manaus-amazon-lodge-3day', category: 'OUTDOOR_ADVENTURE', description: 'Venture deep into the rainforest from a jungle lodge — canoe through flooded forest, spot pink river dolphins, fish for piranha, and night-walk for caiman.', price: 320, duration: '3 days', groupSizeMax: 10, difficulty: 'moderate' },
    { name: 'Meeting of the Waters Boat Tour', slug: 'manaus-meeting-of-waters', category: 'OUTDOOR_ADVENTURE', description: 'Witness the dark Rio Negro and sandy Rio Solimões flowing side by side without mixing for kilometres — the dramatic birth of the Amazon River.', price: 55, duration: 'Full day', groupSizeMax: 14 },
    { name: 'Teatro Amazonas & Historic Manaus Tour', slug: 'manaus-opera-house-tour', category: 'ARTS_CULTURE', description: 'Tour the lavish rubber-boom opera house and historic centre — the astonishing tale of how European opulence rose in the middle of the jungle.', price: 25, duration: '2 hours', groupSizeMax: 12 },
  ],
  'cali': [
    { name: 'Cali Salsa Dancing Class & Night Out', slug: 'cali-salsa-class-night', category: 'NIGHTLIFE_SOCIAL', description: 'Learn Cali-style salsa from pros in the world salsa capital, then hit a legendary salsoteca in Juanchito to put your moves to the test.', price: 35, duration: 'Evening', groupSizeMax: 10 },
    { name: 'San Antonio & City Highlights Walk', slug: 'cali-san-antonio-walk', category: 'ARTS_CULTURE', description: 'A walking tour of the bohemian San Antonio hill, the cathedral, and the Cristo Rey lookout — the soul and skyline of Cali.', price: 25, duration: '3 hours', groupSizeMax: 12 },
    { name: 'Hacienda El Paraíso & Sugar Country Trip', slug: 'cali-hacienda-paraiso', category: 'ARTS_CULTURE', description: 'A day trip into the Valle del Cauca to a 19th-century hacienda from Colombia\'s most famous novel, amid endless sugarcane fields.', price: 50, duration: 'Full day', groupSizeMax: 12 },
  ],
  'san-gil': [
    { name: 'Río Fonce White Water Rafting', slug: 'san-gil-rafting-fonce', category: 'OUTDOOR_ADVENTURE', description: 'Grade II–III rapids on the Río Fonce — the perfect introduction to rafting in Colombia\'s adventure-sports capital, fun for first-timers.', price: 30, duration: '3 hours', groupSizeMax: 8 },
    { name: 'Paragliding over Chicamocha Canyon', slug: 'san-gil-paragliding-chicamocha', category: 'OUTDOOR_ADVENTURE', description: 'Soar tandem over the vast Chicamocha Canyon, one of the world\'s largest — thermals, eagle\'s-eye views, and pure adrenaline.', price: 70, duration: 'Half day', groupSizeMax: 6, difficulty: 'moderate' },
    { name: 'Barichara Colonial Village Day Trip', slug: 'san-gil-barichara-day-trip', category: 'ARTS_CULTURE', description: 'Visit Barichara, often called Colombia\'s prettiest town — cobbled streets and honey-stone houses, plus the historic Camino Real footpath.', price: 35, duration: 'Half day', groupSizeMax: 12 },
  ],
  'santa-marta': [
    { name: 'Lost City (Ciudad Perdida) 4-Day Trek', slug: 'santa-marta-lost-city-trek', category: 'OUTDOOR_ADVENTURE', description: 'The legendary jungle trek to Teyuna, a Tairona city older than Machu Picchu — river crossings, indigenous villages, and 1,200 ancient stone steps.', price: 420, duration: '4 days', groupSizeMax: 12, difficulty: 'challenging' },
    { name: 'Tayrona National Park Day Trip', slug: 'santa-marta-tayrona-day', category: 'OUTDOOR_ADVENTURE', description: 'Hike through tropical forest to the postcard beaches of Cabo San Juan, where jungle-clad boulders meet the Caribbean Sea.', price: 45, duration: 'Full day', groupSizeMax: 14 },
    { name: 'Minca Coffee Farm & Waterfalls Trip', slug: 'santa-marta-minca-trip', category: 'OUTDOOR_ADVENTURE', description: 'Escape to the cool Sierra Nevada foothills around Minca — a coffee-farm tour, swimming waterfalls, and birdwatching with mountain views.', price: 40, duration: 'Full day', groupSizeMax: 12 },
  ],
  'quito': [
    { name: 'Quito Old Town & Equator Day Tour', slug: 'quito-old-town-equator', category: 'ARTS_CULTURE', description: 'The UNESCO old town\'s gilded churches and plazas, plus a trip to the Mitad del Mundo monument to stand on the equator line.', price: 45, duration: 'Full day', groupSizeMax: 12 },
    { name: 'TelefériQo & Pichincha Volcano Hike', slug: 'quito-teleferico-pichincha', category: 'OUTDOOR_ADVENTURE', description: 'Ride the cable car to 4,000m and hike the páramo slopes of Rucu Pichincha for breathtaking views over the Andes and the city.', price: 35, duration: 'Half day', groupSizeMax: 10, difficulty: 'moderate' },
    { name: 'Cotopaxi Volcano National Park Trip', slug: 'quito-cotopaxi-day-trip', category: 'OUTDOOR_ADVENTURE', description: 'A day trip to the perfect snow-capped cone of Cotopaxi — hike to the refuge, visit Limpiopungo lagoon, and watch for wild horses.', price: 60, duration: 'Full day', groupSizeMax: 12, difficulty: 'moderate' },
  ],
  'cuenca': [
    { name: 'Cuenca Colonial Walking Tour', slug: 'cuenca-colonial-walk', category: 'ARTS_CULTURE', description: 'Explore UNESCO Cuenca on foot — the blue-domed cathedral, flower market, riverside, and the craft of the misnamed "Panama" hat.', price: 25, duration: '3 hours', groupSizeMax: 12 },
    { name: 'Cajas National Park Hiking Day', slug: 'cuenca-cajas-hike', category: 'OUTDOOR_ADVENTURE', description: 'Trek the otherworldly high-altitude páramo of Cajas — hundreds of glacial lakes, polylepis forests, and dramatic Andean scenery.', price: 50, duration: 'Full day', groupSizeMax: 12, difficulty: 'moderate' },
    { name: 'Panama Hat Weaving Workshop', slug: 'cuenca-panama-hat-workshop', category: 'ARTS_CULTURE', description: 'Discover how the world-famous toquilla-straw hat is woven, from a working Cuenca atelier, and try the painstaking technique yourself.', price: 30, duration: '2 hours', groupSizeMax: 8 },
  ],
  'banos-ecuador': [
    { name: 'Ruta de las Cascadas Bike & Canyoning', slug: 'banos-ruta-cascadas', category: 'OUTDOOR_ADVENTURE', description: 'Cycle the Waterfall Route to the thundering Pailón del Diablo, with optional canyoning rappels down jungle cascades along the way.', price: 45, duration: 'Full day', groupSizeMax: 10 },
    { name: 'White Water Rafting on the Río Pastaza', slug: 'banos-rafting-pastaza', category: 'OUTDOOR_ADVENTURE', description: 'Tackle the Grade III rapids of the Pastaza as it tumbles toward the Amazon basin — high-energy fun with stunning gorge scenery.', price: 40, duration: 'Half day', groupSizeMax: 8 },
    { name: 'Termas de la Virgen Hot Springs Evening', slug: 'banos-termas-virgen', category: 'WELLNESS_MINDFULNESS', description: 'Soak in the volcanic thermal baths that give Baños its name, right beneath a floodlit waterfall in the centre of town.', price: 15, duration: 'Evening', groupSizeMax: 12 },
  ],
  'montanita': [
    { name: 'Beginner Surf Lessons at Montañita Point', slug: 'montanita-surf-lessons', category: 'FITNESS_SPORTS', description: 'Catch your first waves at Ecuador\'s most famous surf town with a local instructor — warm water and forgiving beach breaks.', price: 30, duration: '2 hours', groupSizeMax: 6 },
    { name: 'Isla de la Plata "Poor Man\'s Galápagos" Trip', slug: 'montanita-isla-de-la-plata', category: 'OUTDOOR_ADVENTURE', description: 'A boat trip to Isla de la Plata — blue-footed boobies, frigatebirds, and seasonal humpback whales, all without the Galápagos price tag.', price: 55, duration: 'Full day', groupSizeMax: 14 },
    { name: 'Montañita Cocktail Alley Night Tour', slug: 'montanita-cocktail-alley', category: 'NIGHTLIFE_SOCIAL', description: 'Sample the famous Cocktail Alley and beach bars with a local guide — the legendary party scene that never sleeps in Montañita.', price: 25, duration: 'Evening', groupSizeMax: 12 },
  ],
  'puerto-ayora': [
    { name: 'Bartolomé Island Snorkel Day Tour', slug: 'puerto-ayora-bartolome', category: 'OUTDOOR_ADVENTURE', description: 'A day trip to iconic Bartolomé Island — the famous Pinnacle Rock viewpoint and snorkelling with Galápagos penguins and sea turtles.', price: 180, duration: 'Full day', groupSizeMax: 12 },
    { name: 'Charles Darwin Station & Highlands Tour', slug: 'puerto-ayora-darwin-highlands', category: 'OUTDOOR_ADVENTURE', description: 'Meet giant tortoises at the Darwin Research Station and in the misty Santa Cruz highlands, plus walk through a lava tunnel.', price: 60, duration: 'Half day', groupSizeMax: 12 },
    { name: 'Pinzón Island Snorkel & Wildlife Trip', slug: 'puerto-ayora-pinzon-snorkel', category: 'OUTDOOR_ADVENTURE', description: 'Boat out to the waters off Pinzón Island for some of the archipelago\'s best snorkelling — sea lions, reef sharks, rays, and turtles.', price: 150, duration: 'Full day', groupSizeMax: 12 },
  ],
};

seed({ SPOTS, EXPERIENCES }).catch((e) => { console.error(e.message); process.exit(1); });
