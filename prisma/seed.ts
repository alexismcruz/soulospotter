import { PrismaClient, Region, CostLevel, SpotCategory, PriceRange } from "@prisma/client";

const prisma = new PrismaClient();

const countries = [
  { name: "United States", slug: "united-states", code: "US", region: Region.NORTH_AMERICA, flagEmoji: "🇺🇸" },
  { name: "Mexico", slug: "mexico", code: "MX", region: Region.LATIN_AMERICA, flagEmoji: "🇲🇽" },
  { name: "Colombia", slug: "colombia", code: "CO", region: Region.LATIN_AMERICA, flagEmoji: "🇨🇴" },
  { name: "Brazil", slug: "brazil", code: "BR", region: Region.LATIN_AMERICA, flagEmoji: "🇧🇷" },
  { name: "Portugal", slug: "portugal", code: "PT", region: Region.EUROPE, flagEmoji: "🇵🇹" },
  { name: "Georgia", slug: "georgia", code: "GE", region: Region.EUROPE, flagEmoji: "🇬🇪" },
  { name: "Spain", slug: "spain", code: "ES", region: Region.EUROPE, flagEmoji: "🇪🇸" },
  { name: "Germany", slug: "germany", code: "DE", region: Region.EUROPE, flagEmoji: "🇩🇪" },
  { name: "Morocco", slug: "morocco", code: "MA", region: Region.MIDDLE_EAST_AFRICA, flagEmoji: "🇲🇦" },
  { name: "India", slug: "india", code: "IN", region: Region.SOUTH_ASIA, flagEmoji: "🇮🇳" },
  { name: "Nepal", slug: "nepal", code: "NP", region: Region.SOUTH_ASIA, flagEmoji: "🇳🇵" },
  { name: "Thailand", slug: "thailand", code: "TH", region: Region.SOUTHEAST_ASIA, flagEmoji: "🇹🇭" },
  { name: "Vietnam", slug: "vietnam", code: "VN", region: Region.SOUTHEAST_ASIA, flagEmoji: "🇻🇳" },
  { name: "Indonesia", slug: "indonesia", code: "ID", region: Region.SOUTHEAST_ASIA, flagEmoji: "🇮🇩" },
  { name: "Philippines", slug: "philippines", code: "PH", region: Region.SOUTHEAST_ASIA, flagEmoji: "🇵🇭" },
  { name: "Japan", slug: "japan", code: "JP", region: Region.EAST_ASIA, flagEmoji: "🇯🇵" },
  { name: "South Korea", slug: "south-korea", code: "KR", region: Region.EAST_ASIA, flagEmoji: "🇰🇷" },
  { name: "Australia", slug: "australia", code: "AU", region: Region.OCEANIA, flagEmoji: "🇦🇺" },
  { name: "New Zealand", slug: "new-zealand", code: "NZ", region: Region.OCEANIA, flagEmoji: "🇳🇿" },
];

type SeedCity = {
  name: string;
  slug: string;
  countrySlug: string;
  region: Region;
  description: string;
  lat: number;
  lng: number;
  timezone: string;
  currency: string;
  language: string;
  safetyScore: number;
  costLevel: CostLevel;
  tags: string[];
  spots: SeedSpot[];
};

type SeedSpot = {
  name: string;
  slug: string;
  category: SpotCategory;
  description: string;
  address: string;
  priceRange: PriceRange;
  tags: string[];
};

const cities: SeedCity[] = [
  // NORTH AMERICA
  {
    name: "New York City",
    slug: "new-york-city",
    countrySlug: "united-states",
    region: Region.NORTH_AMERICA,
    description: "The city that never sleeps — overwhelming at first, liberating once you find your rhythm. Solo travel here means infinite anonymity and world-class everything.",
    lat: 40.7128, lng: -74.006,
    timezone: "America/New_York", currency: "USD", language: "English",
    safetyScore: 7, costLevel: CostLevel.EXPENSIVE,
    tags: ["urban", "culture", "food", "nightlife", "solo-friendly"],
    spots: [
      { name: "The Bean", slug: "the-bean", category: SpotCategory.CAFE, description: "A beloved NYC cafe chain known for their strong coffee and laptop-friendly seating. Multiple locations across Manhattan.", address: "Multiple locations, Manhattan", priceRange: PriceRange.MID, tags: ["wifi", "laptop-friendly", "coffee"] },
      { name: "High Line Park", slug: "high-line-park", category: SpotCategory.NATURE, description: "An elevated linear park built on a historic freight rail line. One of the best solo walks in NYC — contemplative, beautiful, free.", address: "Gansevoort St to 34th St, Manhattan", priceRange: PriceRange.FREE, tags: ["free", "outdoors", "walking", "instagram"] },
      { name: "Ace Hotel New York", slug: "ace-hotel-new-york", category: SpotCategory.ACCOMMODATION, description: "The Ace lobby is a legendary solo traveler spot — open, buzzing, and full of interesting people. The hotel itself is well-priced for Manhattan.", address: "20 W 29th St, New York", priceRange: PriceRange.HIGH, tags: ["trendy", "social", "central"] },
    ],
  },
  {
    name: "Portland",
    slug: "portland",
    countrySlug: "united-states",
    region: Region.NORTH_AMERICA,
    description: "Keep Portland weird — and solo travel here is exactly that. A city that celebrates individuality, with incredible coffee shops, forests, and an unusually friendly solo scene.",
    lat: 45.5051, lng: -122.675,
    timezone: "America/Los_Angeles", currency: "USD", language: "English",
    safetyScore: 7, costLevel: CostLevel.MID_RANGE,
    tags: ["quirky", "outdoors", "coffee", "vegan-friendly", "solo-friendly"],
    spots: [
      { name: "Powell's Books", slug: "powells-books", category: SpotCategory.CULTURE, description: "The world's largest independent bookstore. A solo traveler's heaven — get lost for hours, strike up a conversation, leave with armfuls of books.", address: "1005 W Burnside St, Portland", priceRange: PriceRange.FREE, tags: ["books", "free", "iconic", "rainy-day"] },
      { name: "Forest Park", slug: "forest-park", category: SpotCategory.NATURE, description: "One of the largest urban forests in the US. 80+ miles of trails, all within city limits — ideal for a solo reset hike.", address: "NW 29th Ave & Upshur St, Portland", priceRange: PriceRange.FREE, tags: ["hiking", "free", "forest", "solo-hike"] },
      { name: "Society Hotel", slug: "society-hotel", category: SpotCategory.ACCOMMODATION, description: "A beautifully restored historic building with private rooms and a rooftop deck. Great solo traveler energy throughout.", address: "203 NW 3rd Ave, Portland", priceRange: PriceRange.MID, tags: ["historic", "rooftop", "solo-friendly"] },
    ],
  },
  // LATIN AMERICA
  {
    name: "Mexico City",
    slug: "mexico-city",
    countrySlug: "mexico",
    region: Region.LATIN_AMERICA,
    description: "CDMX is the world's greatest food city and one of the most underrated solo travel destinations. Enormous, chaotic, and utterly magnetic once you get past the first day.",
    lat: 19.4326, lng: -99.1332,
    timezone: "America/Mexico_City", currency: "MXN", language: "Spanish",
    safetyScore: 6, costLevel: CostLevel.BUDGET,
    tags: ["food", "culture", "art", "digital-nomad", "affordable"],
    spots: [
      { name: "Café Avellaneda", slug: "cafe-avellaneda", category: SpotCategory.CAFE, description: "Third-wave specialty coffee in Coyoacán, one of the city's most charming neighborhoods. Solo travelers are regulars here.", address: "Higuera 40, Coyoacán, CDMX", priceRange: PriceRange.BUDGET, tags: ["specialty-coffee", "wifi", "coyoacan"] },
      { name: "Museo Frida Kahlo", slug: "museo-frida-kahlo", category: SpotCategory.CULTURE, description: "The Blue House where Frida Kahlo was born and died. One of the most emotionally resonant museum experiences in the world for a solo traveler.", address: "Londres 247, Coyoacán, CDMX", priceRange: PriceRange.MID, tags: ["art", "iconic", "inspiring", "book-ahead"] },
      { name: "El Parnita", slug: "el-parnita", category: SpotCategory.FOOD, description: "Standing-room tacos in Colonia Roma. Arguably the best tacos in CDMX and the cheapest meal you'll eat all week.", address: "Yucatán 84, Roma Norte, CDMX", priceRange: PriceRange.BUDGET, tags: ["tacos", "street-food", "cheap", "iconic"] },
    ],
  },
  {
    name: "Medellín",
    slug: "medellin",
    countrySlug: "colombia",
    region: Region.LATIN_AMERICA,
    description: "From the most dangerous city in the world to one of the most innovative — Medellín's transformation is one of the great urban stories. Solo travelers adore its eternal spring climate and creative energy.",
    lat: 6.2442, lng: -75.5812,
    timezone: "America/Bogota", currency: "COP", language: "Spanish",
    safetyScore: 6, costLevel: CostLevel.BUDGET,
    tags: ["digital-nomad", "innovation", "affordable", "nightlife", "warm-weather"],
    spots: [
      { name: "Selina Medellín", slug: "selina-medellin", category: SpotCategory.COWORKING, description: "Selina's Medellín outpost combines accommodation and coworking in one. The community mix of solo travelers and remote workers is excellent.", address: "Calle 9 #37-20, El Poblado, Medellín", priceRange: PriceRange.MID, tags: ["coworking", "community", "wifi", "nomad-hub"] },
      { name: "Parque Arví", slug: "parque-arvi", category: SpotCategory.NATURE, description: "A 16,000-hectare nature reserve accessible by the famous Medellín cable car. The cable car ride alone is worth the trip.", address: "Corregimiento Santa Elena, Medellín", priceRange: PriceRange.BUDGET, tags: ["nature", "cable-car", "hiking", "views"] },
      { name: "Pergamino Café", slug: "pergamino-cafe", category: SpotCategory.CAFE, description: "Colombia's best specialty coffee shop — and it's in Medellín. A pilgrimage spot for coffee lovers who travel solo.", address: "Carrera 37 #8A-37, El Poblado", priceRange: PriceRange.MID, tags: ["specialty-coffee", "wifi", "must-visit"] },
    ],
  },
  {
    name: "Rio de Janeiro",
    slug: "rio-de-janeiro",
    countrySlug: "brazil",
    region: Region.LATIN_AMERICA,
    description: "Rio is overwhelming in every sense — the beauty, the energy, the music. Solo travel here rewards the brave. Go for the beaches, stay for the samba.",
    lat: -22.9068, lng: -43.1729,
    timezone: "America/Sao_Paulo", currency: "BRL", language: "Portuguese",
    safetyScore: 5, costLevel: CostLevel.MID_RANGE,
    tags: ["beach", "music", "culture", "active", "vibrant"],
    spots: [
      { name: "Ipanema Beach", slug: "ipanema-beach", category: SpotCategory.NATURE, description: "One of the world's most famous beaches — and a genuinely social spot for solo travelers. Pick a posto (section), lay down a towel, and the beach does the rest.", address: "Praia de Ipanema, Rio de Janeiro", priceRange: PriceRange.FREE, tags: ["beach", "free", "social", "iconic"] },
      { name: "Casa Amarelo Hostel", slug: "casa-amarelo-hostel", category: SpotCategory.ACCOMMODATION, description: "One of Rio's best-rated hostels for solo travelers — the Yellow House in Santa Teresa, the city's arty bohemian neighborhood.", address: "R. Áurea 80, Santa Teresa, Rio", priceRange: PriceRange.BUDGET, tags: ["hostel", "social", "santa-teresa", "budget"] },
      { name: "Aprazível", slug: "aprazivel", category: SpotCategory.FOOD, description: "A stunning hilltop restaurant in Santa Teresa with incredible views of the city. Splurge-worthy for a solo dinner.", address: "R. Aprazível 62, Santa Teresa, Rio", priceRange: PriceRange.HIGH, tags: ["splurge", "views", "dinner", "solo-table"] },
    ],
  },
  // EUROPE
  {
    name: "Lisbon",
    slug: "lisbon",
    countrySlug: "portugal",
    region: Region.EUROPE,
    description: "Europe's sunniest capital is also its most solo-travel-friendly. Small enough to walk everywhere, big enough to never get bored. Fado music and pastéis de nata will rearrange your soul.",
    lat: 38.7223, lng: -9.1393,
    timezone: "Europe/Lisbon", currency: "EUR", language: "Portuguese",
    safetyScore: 9, costLevel: CostLevel.MID_RANGE,
    tags: ["safe", "walkable", "culture", "food", "digital-nomad", "solo-friendly"],
    spots: [
      { name: "A Brasileira", slug: "a-brasileira", category: SpotCategory.CAFE, description: "Lisbon's most historic cafe, open since 1905. A Bica espresso at the bar counter is a solo traveler rite of passage.", address: "R. Garrett 120, Chiado, Lisbon", priceRange: PriceRange.BUDGET, tags: ["historic", "coffee", "iconic", "chiado"] },
      { name: "LX Factory", slug: "lx-factory", category: SpotCategory.COMMUNITY, description: "A repurposed industrial complex that's become Lisbon's creative hub. Solo travelers gravitate here — there's always something happening.", address: "R. Rodrigues de Faria 103, Lisbon", priceRange: PriceRange.FREE, tags: ["creative", "market", "community", "weekend"] },
      { name: "Home Lisbon Hostel", slug: "home-lisbon-hostel", category: SpotCategory.ACCOMMODATION, description: "Consistently rated one of the world's best hostels. Family-style dinners nightly — solo travelers leave with friends.", address: "R. de São Nicolau 13, Baixa, Lisbon", priceRange: PriceRange.BUDGET, tags: ["top-rated", "social", "family-dinner", "solo-classic"] },
    ],
  },
  {
    name: "Tbilisi",
    slug: "tbilisi",
    countrySlug: "georgia",
    region: Region.EUROPE,
    description: "The most underrated city in the world for solo travelers. Ancient sulphur baths, natural wine, extraordinary food, and locals who will invite you home for dinner after knowing you for five minutes.",
    lat: 41.6938, lng: 44.8015,
    timezone: "Asia/Tbilisi", currency: "GEL", language: "Georgian",
    safetyScore: 9, costLevel: CostLevel.BUDGET,
    tags: ["hidden-gem", "food", "wine", "affordable", "welcoming", "off-beaten-path"],
    spots: [
      { name: "Abanotubani Sulphur Baths", slug: "abanotubani-sulphur-baths", category: SpotCategory.WELLNESS, description: "Natural sulphur hot springs built into Tbilisi's old town. Rent a private room for a solo soak — one of the most relaxing experiences in the Caucasus.", address: "Abanotubani District, Tbilisi", priceRange: PriceRange.BUDGET, tags: ["bath", "wellness", "authentic", "must-do"] },
      { name: "Fabrika", slug: "fabrika", category: SpotCategory.COMMUNITY, description: "A repurposed Soviet-era sewing factory now housing cafes, hostels, coworking spaces, and a thriving creative community. Tbilisi's beating heart for solo travelers.", address: "40 Merab Kostava, Tbilisi", priceRange: PriceRange.FREE, tags: ["community", "creative", "hostel", "cafes", "hub"] },
      { name: "Shavi Lomi", slug: "shavi-lomi", category: SpotCategory.FOOD, description: "The best modern Georgian restaurant in the city — elevated versions of khinkali and khachapuri in a beautifully designed space. Perfect for a solo dinner.", address: "Mingreli St 10, Tbilisi", priceRange: PriceRange.MID, tags: ["georgian-food", "upscale", "dinner", "solo-table"] },
    ],
  },
  {
    name: "Barcelona",
    slug: "barcelona",
    countrySlug: "spain",
    region: Region.EUROPE,
    description: "Architecture, beaches, food markets, and a nightlife scene that starts at midnight. Barcelona is endlessly stimulating for solo travelers — you'll never be bored, and you'll never be lonely.",
    lat: 41.3851, lng: 2.1734,
    timezone: "Europe/Madrid", currency: "EUR", language: "Catalan/Spanish",
    safetyScore: 7, costLevel: CostLevel.MID_RANGE,
    tags: ["architecture", "beach", "food", "nightlife", "art", "walkable"],
    spots: [
      { name: "La Boqueria Market", slug: "la-boqueria-market", category: SpotCategory.FOOD, description: "Barcelona's famous covered market. Solo traveler tip: avoid the tourist stalls at the entrance and head to the back where locals actually shop and eat.", address: "La Rambla 91, El Raval, Barcelona", priceRange: PriceRange.BUDGET, tags: ["market", "food", "locals-tip", "morning"] },
      { name: "Sagrada Família", slug: "sagrada-familia", category: SpotCategory.CULTURE, description: "Gaudí's unfinished masterpiece — mind-bending from outside, transcendent from inside. Book solo tickets in advance; the interior is an otherworldly solo experience.", address: "C/ de Mallorca 401, Barcelona", priceRange: PriceRange.MID, tags: ["must-see", "architecture", "iconic", "book-ahead"] },
      { name: "Generator Barcelona", slug: "generator-barcelona", category: SpotCategory.ACCOMMODATION, description: "One of Europe's best design hostels — rooftop bar, social common areas, and a great mix of solo travelers. Walking distance from everything.", address: "C/ de Còrsega 373, Barcelona", priceRange: PriceRange.BUDGET, tags: ["design-hostel", "rooftop", "social", "central"] },
    ],
  },
  {
    name: "Berlin",
    slug: "berlin",
    countrySlug: "germany",
    region: Region.EUROPE,
    description: "Berlin doesn't care who you are or where you came from — it just wants you to be yourself. The most accepting city in Europe for solo travelers, with history around every corner and a creative scene unlike anywhere else.",
    lat: 52.52, lng: 13.405,
    timezone: "Europe/Berlin", currency: "EUR", language: "German",
    safetyScore: 8, costLevel: CostLevel.MID_RANGE,
    tags: ["history", "art", "nightlife", "creative", "lgbtq-friendly", "solo-friendly"],
    spots: [
      { name: "East Side Gallery", slug: "east-side-gallery", category: SpotCategory.CULTURE, description: "The longest remaining stretch of the Berlin Wall, now an open-air gallery. One of the most powerful solo walks in the world.", address: "Mühlenstraße 3-100, Friedrichshain, Berlin", priceRange: PriceRange.FREE, tags: ["history", "free", "art", "iconic", "walking"] },
      { name: "Roamers", slug: "roamers", category: SpotCategory.CAFE, description: "A beloved Neukölln cafe with incredible brunch and the kind of relaxed energy that makes you stay three hours longer than planned.", address: "Pannierstraße 64, Neukölln, Berlin", priceRange: PriceRange.MID, tags: ["brunch", "wifi", "neukolln", "chill"] },
      { name: "Circus Hostel", slug: "circus-hostel", category: SpotCategory.ACCOMMODATION, description: "Berlin's best-loved hostel for solo travelers — central, social, and with an excellent bar. Legendary free walking tours depart from here.", address: "Weinbergsweg 1A, Mitte, Berlin", priceRange: PriceRange.BUDGET, tags: ["top-rated", "central", "social", "walking-tour"] },
    ],
  },
  // MIDDLE EAST & AFRICA
  {
    name: "Marrakech",
    slug: "marrakech",
    countrySlug: "morocco",
    region: Region.MIDDLE_EAST_AFRICA,
    description: "Sensory overload in the best possible way. The medina, the souks, the riads — Marrakech is unlike anywhere else on earth and rewards solo travelers with the full depth of its chaos and beauty.",
    lat: 31.6295, lng: -7.9811,
    timezone: "Africa/Casablanca", currency: "MAD", language: "Arabic/French",
    safetyScore: 7, costLevel: CostLevel.BUDGET,
    tags: ["culture", "souks", "food", "architecture", "adventure", "sensory"],
    spots: [
      { name: "Djemaa el-Fna", slug: "djemaa-el-fna", category: SpotCategory.CULTURE, description: "The world's greatest public square — by day a market, by night a massive open-air food court and entertainment zone. A solo traveler's dream for people-watching.", address: "Place Djemaa el-Fna, Medina, Marrakech", priceRange: PriceRange.FREE, tags: ["iconic", "free", "food", "entertainment", "evening"] },
      { name: "Café des Épices", slug: "cafe-des-epices", category: SpotCategory.CAFE, description: "A rooftop cafe overlooking the spice market. One of the best spots in Marrakech to sit alone, watch the city, and gather your thoughts.", address: "75 Rahba Lakdima, Medina, Marrakech", priceRange: PriceRange.BUDGET, tags: ["rooftop", "views", "medina", "peaceful"] },
      { name: "Riad BE Marrakech", slug: "riad-be-marrakech", category: SpotCategory.ACCOMMODATION, description: "A beautifully designed boutique riad in the heart of the medina. Solo-friendly with a communal courtyard where guests naturally connect.", address: "Derb Sraghna 22, Medina, Marrakech", priceRange: PriceRange.MID, tags: ["riad", "boutique", "medina", "atmospheric"] },
    ],
  },
  // SOUTH ASIA
  {
    name: "Rishikesh",
    slug: "rishikesh",
    countrySlug: "india",
    region: Region.SOUTH_ASIA,
    description: "The yoga capital of the world sits at the foothills of the Himalayas where the Ganges is still clean and fast. Solo travelers come for the spirituality and stay for the unexpected sense of community.",
    lat: 30.0869, lng: 78.2676,
    timezone: "Asia/Kolkata", currency: "INR", language: "Hindi",
    safetyScore: 8, costLevel: CostLevel.BUDGET,
    tags: ["yoga", "spiritual", "wellness", "adventure", "river", "budget"],
    spots: [
      { name: "Beatles Ashram", slug: "beatles-ashram", category: SpotCategory.CULTURE, description: "The abandoned ashram where the Beatles famously retreated in 1968. Now covered in murals and open for solo exploration — deeply atmospheric.", address: "Swarg Ashram, Rishikesh", priceRange: PriceRange.BUDGET, tags: ["history", "art", "spiritual", "instagram", "iconic"] },
      { name: "Aloha on the Ganges", slug: "aloha-on-the-ganges", category: SpotCategory.WELLNESS, description: "A respected yoga and wellness retreat on the banks of the Ganges. Drop-in classes welcome solo travelers — no booking required.", address: "Aloha on the Ganges, Tapovan, Rishikesh", priceRange: PriceRange.BUDGET, tags: ["yoga", "ganges", "drop-in", "retreat"] },
      { name: "Little Buddha Café", slug: "little-buddha-cafe", category: SpotCategory.CAFE, description: "Rooftop café overlooking the Ganges and the famous Laxman Jhula bridge. Every solo traveler in Rishikesh ends up here.", address: "Lakshman Jhula Rd, Rishikesh", priceRange: PriceRange.BUDGET, tags: ["views", "rooftop", "ganges", "social", "cheap"] },
    ],
  },
  {
    name: "Kathmandu",
    slug: "kathmandu",
    countrySlug: "nepal",
    region: Region.SOUTH_ASIA,
    description: "The gateway to the Himalayas is a city of temples, trekking agencies, and the most chaotic traffic you've ever seen. Solo travelers pass through Kathmandu and find themselves staying for weeks.",
    lat: 27.7172, lng: 85.324,
    timezone: "Asia/Kathmandu", currency: "NPR", language: "Nepali",
    safetyScore: 7, costLevel: CostLevel.BUDGET,
    tags: ["trekking", "spiritual", "culture", "adventure", "affordable"],
    spots: [
      { name: "Thamel", slug: "thamel", category: SpotCategory.COMMUNITY, description: "Kathmandu's legendary traveler district — a maze of trekking shops, rooftop bars, and guesthouses where every solo traveler in Nepal eventually meets every other solo traveler.", address: "Thamel District, Kathmandu", priceRange: PriceRange.FREE, tags: ["hub", "social", "trekking-gear", "nightlife"] },
      { name: "Pashupatinath Temple", slug: "pashupatinath-temple", category: SpotCategory.CULTURE, description: "The most sacred Hindu temple complex in Nepal. Watch the evening Aarti ceremony on the banks of the Bagmati river — a solo traveler experience you'll never forget.", address: "Pashupatinath, Kathmandu", priceRange: PriceRange.BUDGET, tags: ["spiritual", "hindu", "ceremony", "unmissable"] },
      { name: "Roadhouse Café", slug: "roadhouse-cafe", category: SpotCategory.CAFE, description: "The best WiFi in Thamel, excellent wood-fired pizza, and a reliable spot for solo travelers to work, plan treks, and meet other travelers.", address: "Thamel Marg, Thamel, Kathmandu", priceRange: PriceRange.BUDGET, tags: ["wifi", "pizza", "work-friendly", "thamel"] },
    ],
  },
  // SOUTHEAST ASIA
  {
    name: "Chiang Mai",
    slug: "chiang-mai",
    countrySlug: "thailand",
    region: Region.SOUTHEAST_ASIA,
    description: "Thailand's northern capital is the long-stay capital of Southeast Asia. Temples, mountains, the world's best Thai food outside Bangkok, and a massive digital nomad scene. Solo travelers almost always extend their stay.",
    lat: 18.7883, lng: 98.9853,
    timezone: "Asia/Bangkok", currency: "THB", language: "Thai",
    safetyScore: 9, costLevel: CostLevel.BUDGET,
    tags: ["digital-nomad", "temples", "food", "affordable", "long-stay", "wellness"],
    spots: [
      { name: "CAMP by Maya Mall", slug: "camp-by-maya-mall", category: SpotCategory.COWORKING, description: "The original digital nomad coworking cafe in Chiang Mai — buy a coffee, sit all day, fast WiFi included. Spawned a thousand nomad careers.", address: "Maya Lifestyle Shopping Center, Nimman, Chiang Mai", priceRange: PriceRange.BUDGET, tags: ["coworking", "wifi", "nomad-classic", "cheap"] },
      { name: "Doi Suthep Temple", slug: "doi-suthep-temple", category: SpotCategory.CULTURE, description: "The golden temple on the mountain overlooking Chiang Mai. Catch sunrise alone here and it will genuinely recalibrate how you see the world.", address: "Doi Suthep, Chiang Mai", priceRange: PriceRange.BUDGET, tags: ["temple", "sunrise", "views", "mountain", "spiritual"] },
      { name: "Zoe in Yellow", slug: "zoe-in-yellow", category: SpotCategory.NIGHTLIFE, description: "The solo traveler's unofficial meeting point every night in Chiang Mai. Not fancy — just the right energy, cheap drinks, and everyone's alone and okay with it.", address: "Ratchaphakhinai Rd, Old City, Chiang Mai", priceRange: PriceRange.BUDGET, tags: ["social", "cheap", "meeting-point", "backpacker"] },
    ],
  },
  {
    name: "Hội An",
    slug: "hoi-an",
    countrySlug: "vietnam",
    region: Region.SOUTHEAST_ASIA,
    description: "Vietnam's most beautiful town — a UNESCO-listed ancient trading port with yellow walls, lanterns, and a pace of life that makes every solo traveler slow down. Rent a bicycle and get lost.",
    lat: 15.8801, lng: 108.338,
    timezone: "Asia/Ho_Chi_Minh", currency: "VND", language: "Vietnamese",
    safetyScore: 9, costLevel: CostLevel.BUDGET,
    tags: ["beautiful", "unesco", "cycling", "food", "tailors", "romantic"],
    spots: [
      { name: "Ancient Town", slug: "hoi-an-ancient-town", category: SpotCategory.CULTURE, description: "The UNESCO-protected old town is best explored alone on foot at dawn before the crowds arrive. The lantern-lit evenings are unforgettable.", address: "Hội An Ancient Town, Quảng Nam", priceRange: PriceRange.BUDGET, tags: ["unesco", "walking", "lanterns", "dawn", "iconic"] },
      { name: "Morning Glory Restaurant", slug: "morning-glory-restaurant", category: SpotCategory.FOOD, description: "The legendary Hội An restaurant by chef Trinh Diem Vy. The White Rose dumplings are unmissable. Solo dining at the bar counter is the move.", address: "106 Nguyễn Thái Học, Hội An", priceRange: PriceRange.MID, tags: ["must-eat", "local-cuisine", "famous", "counter-seating"] },
      { name: "Anantara Hội An Resort", slug: "anantara-hoi-an", category: SpotCategory.ACCOMMODATION, description: "For a solo splurge in Vietnam — a stunning riverside resort with gorgeous rooms and a pool that feels like your own. Worth every dong.", address: "1 Phạm Hồng Thái, Hội An", priceRange: PriceRange.HIGH, tags: ["luxury", "riverside", "pool", "splurge"] },
    ],
  },
  {
    name: "Bali",
    slug: "bali",
    countrySlug: "indonesia",
    region: Region.SOUTHEAST_ASIA,
    description: "Bali is the solo travel capital of the world — its entire tourism infrastructure is built around people who arrive alone and leave transformed. Ubud for the soul, Canggu for the laptop, Seminyak for the sunset.",
    lat: -8.3405, lng: 115.092,
    timezone: "Asia/Makassar", currency: "IDR", language: "Balinese/Indonesian",
    safetyScore: 8, costLevel: CostLevel.BUDGET,
    tags: ["wellness", "digital-nomad", "spiritual", "rice-fields", "surf", "yoga"],
    spots: [
      { name: "Dojo Bali Coworking", slug: "dojo-bali", category: SpotCategory.COWORKING, description: "Canggu's most popular coworking space — pool, fast WiFi, coffee, and a community of digital nomads from every country. The easiest place to make solo travel friends.", address: "Jl. Batu Mejan No.88, Canggu, Bali", priceRange: PriceRange.MID, tags: ["coworking", "pool", "community", "canggu", "nomad"] },
      { name: "Tegalalang Rice Terraces", slug: "tegalalang-rice-terraces", category: SpotCategory.NATURE, description: "Bali's most photographed landscape — and genuinely breathtaking in person. Go early to have it almost to yourself.", address: "Tegalalang, Ubud, Bali", priceRange: PriceRange.BUDGET, tags: ["nature", "views", "instagram", "ubud", "sunrise"] },
      { name: "Yoga Barn Ubud", slug: "yoga-barn-ubud", category: SpotCategory.WELLNESS, description: "The most famous yoga retreat in Southeast Asia. Drop-in classes daily, multiple styles, all levels. Solo travelers leave Yoga Barn as different people.", address: "Jl. Hanoman, Ubud, Bali", priceRange: PriceRange.MID, tags: ["yoga", "wellness", "drop-in", "ubud", "transformative"] },
    ],
  },
  {
    name: "Siargao",
    slug: "siargao",
    countrySlug: "philippines",
    region: Region.SOUTHEAST_ASIA,
    description: "The surfing capital of the Philippines — a tear-drop shaped island that's been discovered but not yet ruined. Cloud 9 wave, coconut roads, and an island community that pulls solo travelers in and never quite lets go.",
    lat: 9.8482, lng: 126.0458,
    timezone: "Asia/Manila", currency: "PHP", language: "Filipino/English",
    safetyScore: 8, costLevel: CostLevel.BUDGET,
    tags: ["surf", "island", "backpacker", "nature", "chill", "solo-friendly"],
    spots: [
      { name: "Cloud 9 Surf Break", slug: "cloud-9-surf-break", category: SpotCategory.NATURE, description: "The world-class reef break that put Siargao on the map. Beginners can watch from the iconic boardwalk — experts will never want to leave.", address: "Cloud 9, General Luna, Siargao", priceRange: PriceRange.FREE, tags: ["surf", "iconic", "free", "views", "world-class"] },
      { name: "Kermit Surf & Dive Resort", slug: "kermit-resort", category: SpotCategory.ACCOMMODATION, description: "Siargao's most beloved surf resort — the communal vibe is perfect for solo travelers. Surfboard rental, beachside bar, and a Neapolitan pizza oven somehow.", address: "General Luna, Siargao", priceRange: PriceRange.MID, tags: ["surf-resort", "social", "pizza", "community"] },
      { name: "Magpupungko Rock Pools", slug: "magpupungko-rock-pools", category: SpotCategory.NATURE, description: "Natural rock pools carved by the ocean — a stunning solo day trip from General Luna. Only accessible at low tide, which makes it feel like a secret.", address: "Pilar, Siargao Island", priceRange: PriceRange.BUDGET, tags: ["nature", "swimming", "day-trip", "low-tide-only"] },
    ],
  },
  // EAST ASIA
  {
    name: "Kyoto",
    slug: "kyoto",
    countrySlug: "japan",
    region: Region.EAST_ASIA,
    description: "Japan's ancient capital rewards the solo traveler like nowhere else. Walk from temple to temple in complete comfortable silence — a city that not only accepts solo travel, it seems designed for it.",
    lat: 35.0116, lng: 135.768,
    timezone: "Asia/Tokyo", currency: "JPY", language: "Japanese",
    safetyScore: 10, costLevel: CostLevel.MID_RANGE,
    tags: ["temples", "culture", "food", "safe", "beautiful", "solo-perfect"],
    spots: [
      { name: "Fushimi Inari Shrine", slug: "fushimi-inari", category: SpotCategory.CULTURE, description: "Ten thousand torii gates winding up a mountain. Go at dawn or dusk alone and it becomes one of the most meditative walks of your life.", address: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto", priceRange: PriceRange.FREE, tags: ["iconic", "free", "spiritual", "dawn", "solo-perfect"] },
      { name: "Weekenders Coffee", slug: "weekenders-coffee", category: SpotCategory.CAFE, description: "One of Kyoto's best specialty coffee roasters — intimate, beautiful space in Nakagyō Ward. Perfect for a solo morning in the city.", address: "Jingumichi-kado, Nakagyō Ward, Kyoto", priceRange: PriceRange.MID, tags: ["specialty-coffee", "beautiful", "solo-friendly", "roaster"] },
      { name: "Gion Hatanaka", slug: "gion-hatanaka", category: SpotCategory.ACCOMMODATION, description: "A traditional machiya townhouse experience in Gion. Expensive but transformative — the solo travel splurge of a lifetime in Japan.", address: "Shinmonzen-dori, Gion, Kyoto", priceRange: PriceRange.HIGH, tags: ["traditional", "gion", "splurge", "authentic", "machiya"] },
    ],
  },
  {
    name: "Seoul",
    slug: "seoul",
    countrySlug: "south-korea",
    region: Region.EAST_ASIA,
    description: "Seoul is relentlessly modern and surprisingly easy to navigate solo — the subway system is a miracle and the food on every corner is extraordinary. K-culture, hiking trails through the city, and 24-hour everything.",
    lat: 37.5665, lng: 126.978,
    timezone: "Asia/Seoul", currency: "KRW", language: "Korean",
    safetyScore: 9, costLevel: CostLevel.MID_RANGE,
    tags: ["modern", "food", "k-culture", "safe", "nightlife", "hiking"],
    spots: [
      { name: "Bukhansan National Park", slug: "bukhansan-national-park", category: SpotCategory.NATURE, description: "A mountain national park inside the city limits of Seoul. Hiking alone here at sunrise is one of the great solo travel experiences in Asia.", address: "Jeongneung-gil, Seongbuk-gu, Seoul", priceRange: PriceRange.FREE, tags: ["hiking", "free", "sunrise", "urban-mountain", "solo"] },
      { name: "Gwangjang Market", slug: "gwangjang-market", category: SpotCategory.FOOD, description: "Seoul's oldest and most atmospheric traditional market. The bindaetteok stalls in the middle section are where you eat — sit at the counter, order by pointing.", address: "88 Changgyeonggung-ro, Jongno-gu, Seoul", priceRange: PriceRange.BUDGET, tags: ["market", "street-food", "bindaetteok", "authentic", "locals"] },
      { name: "Ryse Hotel Seoul", slug: "ryse-hotel-seoul", category: SpotCategory.ACCOMMODATION, description: "A design-forward hotel in Hongdae — one of Seoul's most vibrant neighborhoods. The rooftop bar is a great solo evening spot.", address: "130 Yanghwa-ro, Mapo-gu, Seoul", priceRange: PriceRange.HIGH, tags: ["design", "hongdae", "rooftop", "vibrant-area"] },
    ],
  },
  // OCEANIA
  {
    name: "Melbourne",
    slug: "melbourne",
    countrySlug: "australia",
    region: Region.OCEANIA,
    description: "Australia's cultural capital — a city of incredible coffee, laneway street art, world-class restaurants, and a population that genuinely enjoys being alone in public. Solo travel here feels completely natural.",
    lat: -37.8136, lng: 144.963,
    timezone: "Australia/Melbourne", currency: "AUD", language: "English",
    safetyScore: 9, costLevel: CostLevel.EXPENSIVE,
    tags: ["coffee", "culture", "food", "art", "safe", "solo-natural"],
    spots: [
      { name: "Patricia Coffee Brewers", slug: "patricia-coffee-brewers", category: SpotCategory.CAFE, description: "Standing-room only, no WiFi, exceptional espresso. Melbourne's most iconic solo coffee stop — you're there for the coffee, the city is there around you.", address: "Little Bourke St, Melbourne CBD", priceRange: PriceRange.MID, tags: ["specialty-coffee", "standing-only", "iconic", "no-wifi"] },
      { name: "Hosier Lane", slug: "hosier-lane", category: SpotCategory.CULTURE, description: "Melbourne's most famous street art laneway — constantly being repainted by artists. A living, breathing gallery that you walk through alone at your own pace.", address: "Hosier Lane, CBD, Melbourne", priceRange: PriceRange.FREE, tags: ["street-art", "free", "art", "laneway", "instagram"] },
      { name: "Punthill Apartments Melbourne", slug: "punthill-melbourne", category: SpotCategory.ACCOMMODATION, description: "Serviced apartments in the CBD — ideal for solo travelers who want to cook occasionally and have proper space. Great value for what you get.", address: "267 Little Bourke St, Melbourne CBD", priceRange: PriceRange.HIGH, tags: ["serviced-apartment", "cbd", "space", "self-catering"] },
    ],
  },
  {
    name: "Queenstown",
    slug: "queenstown",
    countrySlug: "new-zealand",
    region: Region.OCEANIA,
    description: "The adventure capital of the world — bungee jumping, skydiving, and skiing, all against the backdrop of the Remarkables mountain range. Solo travelers come for the adrenaline and are stunned by the beauty.",
    lat: -45.0312, lng: 168.662,
    timezone: "Pacific/Auckland", currency: "NZD", language: "English",
    safetyScore: 9, costLevel: CostLevel.EXPENSIVE,
    tags: ["adventure", "mountains", "skiing", "bungee", "nature", "stunning"],
    spots: [
      { name: "AJ Hackett Kawarau Bridge Bungy", slug: "kawarau-bungy", category: SpotCategory.NATURE, description: "The original commercial bungee jump — 43 metres over the Kawarau River. Doing this alone is a rite of passage and a genuine leap of faith.", address: "202 Bungy Centre, Kawarau Gorge, Queenstown", priceRange: PriceRange.HIGH, tags: ["bungee", "adventure", "iconic", "solo-challenge"] },
      { name: "Fergburger", slug: "fergburger", category: SpotCategory.FOOD, description: "The most famous burger joint in New Zealand. Open 24 hours, always a queue, always worth it. Solo late-night ritual for every Queenstown visitor.", address: "42 Shotover St, Queenstown", priceRange: PriceRange.BUDGET, tags: ["iconic", "burgers", "24-hours", "must-eat", "queue"] },
      { name: "Base Backpackers Queenstown", slug: "base-backpackers-queenstown", category: SpotCategory.ACCOMMODATION, description: "The legendary Queenstown hostel — social to the extreme, the launch pad for every adventure and every solo friendship in town.", address: "Queenstown Central, Queenstown", priceRange: PriceRange.BUDGET, tags: ["hostel", "social", "adventures", "backpacker", "legendary"] },
    ],
  },
  // BONUS CITIES
  {
    name: "Byron Bay",
    slug: "byron-bay",
    countrySlug: "australia",
    region: Region.OCEANIA,
    description: "Australia's wellness capital — a surf town turned spiritual retreat hub. The solo travelers who come for a weekend often stay for months. The Cape Byron lighthouse walk at sunrise is non-negotiable.",
    lat: -28.6474, lng: 153.6043,
    timezone: "Australia/Sydney", currency: "AUD", language: "English",
    safetyScore: 9, costLevel: CostLevel.MID_RANGE,
    tags: ["wellness", "surf", "yoga", "spiritual", "retreat", "community"],
    spots: [
      { name: "Cape Byron Lighthouse Walk", slug: "cape-byron-lighthouse-walk", category: SpotCategory.NATURE, description: "Australia's most easterly point — the sunrise walk from town to the lighthouse is one of the great solo travel moments in the country.", address: "Cape Byron Headland Reserve, Byron Bay", priceRange: PriceRange.FREE, tags: ["sunrise", "free", "walk", "views", "solo-perfect"] },
      { name: "Flow Athletic Byron Bay", slug: "flow-athletic-byron", category: SpotCategory.WELLNESS, description: "Drop-in yoga and fitness classes with some of Australia's best instructors. The community here is warm and solo-traveler-welcoming.", address: "3/6 Centennial Cct, Byron Bay", priceRange: PriceRange.MID, tags: ["yoga", "wellness", "drop-in", "community"] },
      { name: "Elements of Byron", slug: "elements-of-byron", category: SpotCategory.ACCOMMODATION, description: "Luxury eco-resort nestled in a nature reserve with resident wallabies. The ultimate solo splurge in Byron Bay.", address: "144 Bayshore Dr, Byron Bay", priceRange: PriceRange.HIGH, tags: ["luxury", "eco", "nature", "splurge", "wallabies"] },
    ],
  },
];

async function main() {
  console.log("🌍 Seeding SouloSpotter database...");

  // Upsert countries
  for (const country of countries) {
    await prisma.country.upsert({
      where: { slug: country.slug },
      update: {},
      create: country,
    });
  }
  console.log(`✅ ${countries.length} countries seeded`);

  // Upsert cities + spots
  let cityCount = 0;
  let spotCount = 0;

  for (const cityData of cities) {
    const { spots, tags, countrySlug, ...cityFields } = cityData;

    const country = await prisma.country.findUniqueOrThrow({ where: { slug: countrySlug } });

    const city = await prisma.city.upsert({
      where: { slug: cityFields.slug },
      update: {},
      create: {
        ...cityFields,
        countryId: country.id,
        published: true,
      },
    });

    // Tags
    for (const tag of tags) {
      await prisma.cityTag.upsert({
        where: { cityId_tag: { cityId: city.id, tag } },
        update: {},
        create: { cityId: city.id, tag },
      });
    }

    // Spots
    for (const spotData of spots) {
      const { tags: spotTags, ...spotFields } = spotData;

      const spot = await prisma.spot.upsert({
        where: { cityId_slug: { cityId: city.id, slug: spotFields.slug } },
        update: {},
        create: {
          ...spotFields,
          cityId: city.id,
          published: true,
        },
      });

      for (const tag of spotTags) {
        await prisma.spotTag.upsert({
          where: { spotId_tag: { spotId: spot.id, tag } },
          update: {},
          create: { spotId: spot.id, tag },
        });
      }

      spotCount++;
    }

    cityCount++;
  }

  console.log(`✅ ${cityCount} cities seeded`);
  console.log(`✅ ${spotCount} spots seeded`);
  console.log("🎉 Done!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
