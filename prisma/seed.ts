import "dotenv/config";
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
  website?: string;
  phone?: string;
  googleMapsUrl?: string;
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
      { name: "A Brasileira", slug: "a-brasileira", category: SpotCategory.CAFE, description: "Lisbon's most historic cafe, open since 1905. A Bica espresso at the bar counter is a solo traveler rite of passage.", address: "R. Garrett 120, Chiado, Lisbon", priceRange: PriceRange.BUDGET, tags: ["historic", "coffee", "iconic", "chiado"], website: "https://www.abrasileira.pt", phone: "+351 213 469 541", googleMapsUrl: "https://www.google.com/maps/search/A+Brasileira+Cafe+Chiado+Lisbon" },
      { name: "LX Factory", slug: "lx-factory", category: SpotCategory.COMMUNITY, description: "A repurposed industrial complex that's become Lisbon's creative hub. Solo travelers gravitate here — there's always something happening.", address: "R. Rodrigues de Faria 103, Lisbon", priceRange: PriceRange.FREE, tags: ["creative", "market", "community", "weekend"], website: "https://www.lxfactory.com", phone: "+351 213 143 399", googleMapsUrl: "https://www.google.com/maps/search/LX+Factory+Lisbon" },
      { name: "Home Lisbon Hostel", slug: "home-lisbon-hostel", category: SpotCategory.ACCOMMODATION, description: "Consistently rated one of the world's best hostels. Family-style dinners nightly — solo travelers leave with friends.", address: "R. de São Nicolau 13, Baixa, Lisbon", priceRange: PriceRange.BUDGET, tags: ["top-rated", "social", "family-dinner", "solo-classic"], website: "https://www.homelisbonhostel.com", phone: "+351 218 885 312", googleMapsUrl: "https://www.google.com/maps/search/Home+Lisbon+Hostel+Baixa+Lisbon" },
      { name: "Mercado da Ribeira", slug: "mercado-da-ribeira", category: SpotCategory.FOOD, description: "Lisbon's iconic food hall inside the old riverside market. 35 stalls from the city's best chefs. Perfect for solo dining — just grab a seat at the communal tables.", address: "Av. 24 de Julho, Cais do Sodré, Lisbon", priceRange: PriceRange.MID, tags: ["food-hall", "communal", "local-chefs", "riverside"], website: "https://www.timeoutmarket.com/lisboa", phone: "+351 210 607 403", googleMapsUrl: "https://www.google.com/maps/search/Time+Out+Market+Mercado+da+Ribeira+Lisbon" },
      { name: "Selina Secret Garden Lisbon", slug: "selina-secret-garden-lisbon", category: SpotCategory.COWORKING, description: "A beautiful coworking space inside a 19th-century palace. One of the best work setups in Lisbon — fast WiFi, private phone booths, and a courtyard that makes Zoom calls feel luxurious.", address: "R. de São Bento 508, Lisbon", priceRange: PriceRange.MID, tags: ["coworking", "palace", "wifi", "nomad-friendly"], website: "https://www.selina.com/portugal/secret-garden-lisbon", phone: "+351 213 473 545", googleMapsUrl: "https://www.google.com/maps/search/Selina+Secret+Garden+Lisbon" },
      { name: "Alfama Walking Route", slug: "alfama-walking-route", category: SpotCategory.NATURE, description: "Lisbon's oldest neighbourhood is best explored alone on foot. Steep cobbled streets, secret miradouros, and the sound of Fado drifting from open windows. Go early morning for the best light.", address: "Alfama District, Lisbon", priceRange: PriceRange.FREE, tags: ["walking", "free", "photography", "early-morning"], googleMapsUrl: "https://www.google.com/maps/search/Alfama+District+Lisbon" },
      { name: "Museu Nacional do Azulejo", slug: "museu-nacional-do-azulejo", category: SpotCategory.CULTURE, description: "Portugal's tile museum inside a stunning 16th-century convent. The 27-metre panoramic tile panel of pre-earthquake Lisbon alone is worth the visit. A solo traveler's quiet afternoon paradise.", address: "R. Me Deus 4, Beato, Lisbon", priceRange: PriceRange.BUDGET, tags: ["museum", "tiles", "history", "quiet"], website: "https://www.museudoazulejo.gov.pt", phone: "+351 218 100 340", googleMapsUrl: "https://www.google.com/maps/search/Museu+Nacional+do+Azulejo+Lisbon" },
      { name: "Park Bar Lisbon", slug: "park-bar-lisbon", category: SpotCategory.NIGHTLIFE, description: "A rooftop bar on the 6th floor of a parking garage with the best view in Lisbon. Arrive early, grab the railing, watch the sun set over the river. Solo-friendly with a laid-back, non-predatory vibe.", address: "R. Recreios 2, Bairro Alto, Lisbon", priceRange: PriceRange.MID, tags: ["rooftop", "sunset", "views", "solo-safe"], website: "https://www.parkbar.pt", googleMapsUrl: "https://www.google.com/maps/search/Park+Bar+Bairro+Alto+Lisbon" },
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
      { name: "CAMP by Maya Mall", slug: "camp-by-maya-mall", category: SpotCategory.COWORKING, description: "The original digital nomad coworking cafe in Chiang Mai — buy a coffee, sit all day, fast WiFi included. Spawned a thousand nomad careers.", address: "Maya Lifestyle Shopping Center, Nimman, Chiang Mai", priceRange: PriceRange.BUDGET, tags: ["coworking", "wifi", "nomad-classic", "cheap"], website: "https://www.centralplaza.co.th/branch/maya", googleMapsUrl: "https://www.google.com/maps/search/CAMP+Coffee+Maya+Mall+Nimman+Chiang+Mai" },
      { name: "Doi Suthep Temple", slug: "doi-suthep-temple", category: SpotCategory.CULTURE, description: "The golden temple on the mountain overlooking Chiang Mai. Catch sunrise alone here and it will genuinely recalibrate how you see the world.", address: "Doi Suthep, Chiang Mai", priceRange: PriceRange.BUDGET, tags: ["temple", "sunrise", "views", "mountain", "spiritual"], googleMapsUrl: "https://www.google.com/maps/search/Doi+Suthep+Temple+Chiang+Mai" },
      { name: "Zoe in Yellow", slug: "zoe-in-yellow", category: SpotCategory.NIGHTLIFE, description: "The solo traveler's unofficial meeting point every night in Chiang Mai. Not fancy — just the right energy, cheap drinks, and everyone's alone and okay with it.", address: "Ratchaphakhinai Rd, Old City, Chiang Mai", priceRange: PriceRange.BUDGET, tags: ["social", "cheap", "meeting-point", "backpacker"], googleMapsUrl: "https://www.google.com/maps/search/Zoe+in+Yellow+Chiang+Mai" },
      { name: "Ristr8to Lab", slug: "ristr8to-lab", category: SpotCategory.CAFE, description: "Chiang Mai's most celebrated specialty coffee shop. Multiple award-winning baristas, precise single-origin brews, a beautiful space in Nimman. The benchmark for coffee in Northern Thailand.", address: "15/3 Nimmana Haeminda Rd, Nimman, Chiang Mai", priceRange: PriceRange.MID, tags: ["specialty-coffee", "award-winning", "nimman", "pour-over"], website: "https://www.ristr8to.com", phone: "+66 53 215 278", googleMapsUrl: "https://www.google.com/maps/search/Ristr8to+Lab+Nimman+Chiang+Mai" },
      { name: "Khao Soi Khun Yai", slug: "khao-soi-khun-yai", category: SpotCategory.FOOD, description: "The best khao soi in Chiang Mai — and that is saying something in the city that invented it. A tiny local shop, outdoor tables, insane coconut curry noodle soup for under $2.", address: "Charoen Prathet Rd, Chang Khlan, Chiang Mai", priceRange: PriceRange.BUDGET, tags: ["khao-soi", "local", "must-eat", "cheap", "authentic"], googleMapsUrl: "https://www.google.com/maps/search/Khao+Soi+Khun+Yai+Chiang+Mai" },
      { name: "Mad Monkey Hostel Chiang Mai", slug: "mad-monkey-hostel-chiang-mai", category: SpotCategory.ACCOMMODATION, description: "The most social hostel in Chiang Mai — rooftop pool, daily events, a bar that becomes the meeting point for every solo traveler in the city. Hard to leave.", address: "47/1 Ratchapakinai Rd, Old City, Chiang Mai", priceRange: PriceRange.BUDGET, tags: ["hostel", "pool", "social", "rooftop", "events"], website: "https://www.madmonkeyhostels.com/chiang-mai", phone: "+66 52 003 008", googleMapsUrl: "https://www.google.com/maps/search/Mad+Monkey+Hostel+Chiang+Mai" },
      { name: "Doi Inthanon National Park", slug: "doi-inthanon-national-park", category: SpotCategory.NATURE, description: "Thailand's highest peak, one hour from Chiang Mai. Misty mountain trails, twin chedis with incredible valley views, hill tribe villages. The solo day trip Chiang Mai was made for.", address: "Doi Inthanon, Chom Thong District, Chiang Mai", priceRange: PriceRange.BUDGET, tags: ["nature", "hiking", "day-trip", "waterfalls", "mountain"], googleMapsUrl: "https://www.google.com/maps/search/Doi+Inthanon+National+Park+Chiang+Mai" },
      { name: "Lila Thai Massage", slug: "lila-thai-massage", category: SpotCategory.WELLNESS, description: "Traditional Thai massage run by female ex-prisoners as part of a rehabilitation program. Genuinely excellent massages and a social enterprise worth supporting — 1 hour for 280 baht.", address: "Arak Rd, Old City, Chiang Mai", priceRange: PriceRange.BUDGET, tags: ["massage", "wellness", "social-enterprise", "cheap", "authentic"], website: "https://www.lilamassage.com", phone: "+66 53 281 325", googleMapsUrl: "https://www.google.com/maps/search/Lila+Thai+Massage+Chiang+Mai" },
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
      { name: "Dojo Bali Coworking", slug: "dojo-bali", category: SpotCategory.COWORKING, description: "Canggu's most popular coworking space — pool, fast WiFi, coffee, and a community of digital nomads from every country. The easiest place to make solo travel friends.", address: "Jl. Batu Mejan No.88, Canggu, Bali", priceRange: PriceRange.MID, tags: ["coworking", "pool", "community", "canggu", "nomad"], website: "https://www.dojobali.org", phone: "+62 361 934 8388", googleMapsUrl: "https://www.google.com/maps/search/Dojo+Bali+Coworking+Canggu+Bali" },
      { name: "Tegalalang Rice Terraces", slug: "tegalalang-rice-terraces", category: SpotCategory.NATURE, description: "Bali's most photographed landscape — and genuinely breathtaking in person. Go early to have it almost to yourself.", address: "Tegalalang, Ubud, Bali", priceRange: PriceRange.BUDGET, tags: ["nature", "views", "instagram", "ubud", "sunrise"], googleMapsUrl: "https://www.google.com/maps/search/Tegalalang+Rice+Terraces+Ubud+Bali" },
      { name: "Yoga Barn Ubud", slug: "yoga-barn-ubud", category: SpotCategory.WELLNESS, description: "The most famous yoga retreat in Southeast Asia. Drop-in classes daily, multiple styles, all levels. Solo travelers leave Yoga Barn as different people.", address: "Jl. Hanoman, Ubud, Bali", priceRange: PriceRange.MID, tags: ["yoga", "wellness", "drop-in", "ubud", "transformative"], website: "https://www.theyogabarn.com", phone: "+62 361 971 236", googleMapsUrl: "https://www.google.com/maps/search/Yoga+Barn+Ubud+Bali" },
      { name: "Revolver Espresso", slug: "revolver-espresso-bali", category: SpotCategory.CAFE, description: "The original specialty coffee shop in Bali, hidden down a tiny alley in Seminyak. Single origin, manual brew, no wi-fi — just great coffee in a beautiful space. A solo traveler institution.", address: "Jl. Kayu Aya No.3, Seminyak, Bali", priceRange: PriceRange.MID, tags: ["specialty-coffee", "no-wifi", "seminyak", "institution"], website: "https://www.revolverespresso.com", googleMapsUrl: "https://www.google.com/maps/search/Revolver+Espresso+Seminyak+Bali" },
      { name: "Ubud Palace & Royal Temple", slug: "ubud-palace-royal-temple", category: SpotCategory.CULTURE, description: "The Puri Saren Agung sits at the centre of Ubud and hosts nightly Kecak and Legong dance performances. Unmissable cultural experience — go solo and let the energy move you.", address: "Jl. Raya Ubud, Ubud, Bali", priceRange: PriceRange.BUDGET, tags: ["culture", "dance", "temple", "evening", "ubud"], website: "https://www.ubudpalace.com", phone: "+62 361 975 057", googleMapsUrl: "https://www.google.com/maps/search/Ubud+Palace+Puri+Saren+Agung+Bali" },
      { name: "Canggu Social", slug: "canggu-social", category: SpotCategory.COMMUNITY, description: "Bali's unofficial nomad social hub — a co-living and events space that runs everything from surf trips to skill swaps. The fastest way to meet other solo travelers in Canggu.", address: "Jl. Pantai Batu Bolong, Canggu, Bali", priceRange: PriceRange.MID, tags: ["community", "co-living", "events", "nomad-hub", "canggu"], googleMapsUrl: "https://www.google.com/maps/search/Canggu+Social+Canggu+Bali" },
      { name: "Finns Beach Club", slug: "finns-beach-club-bali", category: SpotCategory.NIGHTLIFE, description: "Bali's best sunset beach club — day passes get you pool access, sunbeds, and one of the island's best sound systems. Solo-friendly: the energy does the socialising for you.", address: "Jl. Pantai Berawa, Canggu, Bali", priceRange: PriceRange.HIGH, tags: ["beach-club", "sunset", "pool", "music", "canggu"], website: "https://www.finnsbeachclub.com", phone: "+62 361 844 6327", googleMapsUrl: "https://www.google.com/maps/search/Finns+Beach+Club+Canggu+Bali" },
      { name: "Nasi Ayam Kedewatan Bu Mangku", slug: "nasi-ayam-kedewatan", category: SpotCategory.FOOD, description: "A legendary roadside warung serving Bali's best nasi ayam — crispy duck, rice, and sambal for under $3. Locals only know it. Get there by 10am or it's sold out.", address: "Jl. Raya Kedewatan, Ubud, Bali", priceRange: PriceRange.BUDGET, tags: ["warung", "local", "cheap", "must-eat", "early-morning"], googleMapsUrl: "https://www.google.com/maps/search/Nasi+Ayam+Kedewatan+Bu+Mangku+Ubud+Bali" },
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
      { name: "Fushimi Inari Shrine", slug: "fushimi-inari", category: SpotCategory.CULTURE, description: "Ten thousand torii gates winding up a mountain. Go at dawn or dusk alone and it becomes one of the most meditative walks of your life.", address: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto", priceRange: PriceRange.FREE, tags: ["iconic", "free", "spiritual", "dawn", "solo-perfect"], website: "https://inari.jp/en", googleMapsUrl: "https://www.google.com/maps/search/Fushimi+Inari+Shrine+Kyoto" },
      { name: "Weekenders Coffee", slug: "weekenders-coffee", category: SpotCategory.CAFE, description: "One of Kyoto's best specialty coffee roasters — intimate, beautiful space in Nakagyō Ward. Perfect for a solo morning in the city.", address: "Jingumichi-kado, Nakagyō Ward, Kyoto", priceRange: PriceRange.MID, tags: ["specialty-coffee", "beautiful", "solo-friendly", "roaster"], website: "https://www.weekenderscoffee.com", googleMapsUrl: "https://www.google.com/maps/search/Weekenders+Coffee+Kyoto" },
      { name: "Gion Hatanaka", slug: "gion-hatanaka", category: SpotCategory.ACCOMMODATION, description: "A traditional machiya townhouse experience in Gion. Expensive but transformative — the solo travel splurge of a lifetime in Japan.", address: "Shinmonzen-dori, Gion, Kyoto", priceRange: PriceRange.HIGH, tags: ["traditional", "gion", "splurge", "authentic", "machiya"], website: "https://www.hatanaka.co.jp/en", phone: "+81 75 551 0335", googleMapsUrl: "https://www.google.com/maps/search/Gion+Hatanaka+Ryokan+Kyoto" },
      { name: "Nishiki Market", slug: "nishiki-market", category: SpotCategory.FOOD, description: "Kyoto's five-block covered food market, nicknamed 'Kyoto's Kitchen'. Hundreds of stalls selling pickles, tofu, fresh fish, and street snacks. Solo eating heaven — everything is single-serving.", address: "Nishiki Market, Nakagyo, Kyoto", priceRange: PriceRange.BUDGET, tags: ["market", "street-food", "local", "morning", "solo-dining"], googleMapsUrl: "https://www.google.com/maps/search/Nishiki+Market+Kyoto" },
      { name: "Arashiyama Bamboo Grove", slug: "arashiyama-bamboo-grove", category: SpotCategory.NATURE, description: "The iconic bamboo forest on the western edge of Kyoto. Walk through it alone at 6am before the crowds arrive — the sound of wind through the bamboo is unlike anything else on earth.", address: "Sagaogurayama Tabuchiyamacho, Arashiyama, Kyoto", priceRange: PriceRange.FREE, tags: ["bamboo", "free", "early-morning", "photography", "iconic"], googleMapsUrl: "https://www.google.com/maps/search/Arashiyama+Bamboo+Grove+Kyoto" },
      { name: "Kanga-an Temple Zen Meditation", slug: "kanga-an-zen-meditation", category: SpotCategory.WELLNESS, description: "Join a zazen meditation session at this 700-year-old Rinzai temple. One hour of seated meditation with a monk, open to all levels. The most grounding solo activity in Kyoto.", address: "Murasakino Daitokuji-cho 8, Kita, Kyoto", priceRange: PriceRange.BUDGET, tags: ["meditation", "zen", "temple", "spiritual", "zazen"], website: "https://www.kanga-an.com", phone: "+81 75 491 3664", googleMapsUrl: "https://www.google.com/maps/search/Kanga-an+Temple+Kyoto" },
      { name: "Hello Café Kyoto", slug: "hello-cafe-kyoto", category: SpotCategory.COWORKING, description: "A quietly excellent work café near Kyoto Station — laptops welcome, fast WiFi, great matcha, minimal noise. One of the few genuinely nomad-friendly spots in a city that doesn't usually cater to remote work.", address: "Shimogyo, Kyoto", priceRange: PriceRange.BUDGET, tags: ["coworking", "wifi", "matcha", "quiet", "nomad-friendly"], googleMapsUrl: "https://www.google.com/maps/search/Hello+Cafe+Kyoto+coworking" },
      { name: "Pontocho Alley", slug: "pontocho-alley", category: SpotCategory.NIGHTLIFE, description: "Kyoto's narrow lantern-lit dining alley running parallel to the Kamo River. The best solo evening in the city — pick a restaurant with a river-facing terrace, order omakase, and watch Kyoto glow.", address: "Pontocho, Nakagyo, Kyoto", priceRange: PriceRange.HIGH, tags: ["dinner", "lanterns", "riverside", "atmosphere", "evening"], googleMapsUrl: "https://www.google.com/maps/search/Pontocho+Alley+Kyoto" },
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
        update: {
          website: spotFields.website ?? null,
          phone: spotFields.phone ?? null,
          googleMapsUrl: spotFields.googleMapsUrl ?? null,
        },
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

  // ─── Seed Experiences ───────────────────────────────────

  // GetYourGuide affiliate URL mapping (city slug to GetYourGuide destination URL)
  const GYG_AFFILIATE_ID = "CDE4NF2";
  const gygUrlMap: Record<string, string> = {
    "new-york-city": "https://www.getyourguide.com/new-york-city-l18/?partner_id=" + GYG_AFFILIATE_ID,
    "portland": "https://www.getyourguide.com/portland-l29/?partner_id=" + GYG_AFFILIATE_ID,
    "mexico-city": "https://www.getyourguide.com/mexico-city-l43/?partner_id=" + GYG_AFFILIATE_ID,
    "medellin": "https://www.getyourguide.com/medellin-l122/?partner_id=" + GYG_AFFILIATE_ID,
    "rio-de-janeiro": "https://www.getyourguide.com/rio-de-janeiro-l101/?partner_id=" + GYG_AFFILIATE_ID,
    "lisbon": "https://www.getyourguide.com/lisbon-l46/?partner_id=" + GYG_AFFILIATE_ID,
    "tbilisi": "https://www.getyourguide.com/tbilisi-l148/?partner_id=" + GYG_AFFILIATE_ID,
    "barcelona": "https://www.getyourguide.com/barcelona-l25/?partner_id=" + GYG_AFFILIATE_ID,
    "berlin": "https://www.getyourguide.com/berlin-l23/?partner_id=" + GYG_AFFILIATE_ID,
    "marrakech": "https://www.getyourguide.com/marrakech-l133/?partner_id=" + GYG_AFFILIATE_ID,
    "rishikesh": "https://www.getyourguide.com/rishikesh-l209/?partner_id=" + GYG_AFFILIATE_ID,
    "kathmandu": "https://www.getyourguide.com/kathmandu-l75/?partner_id=" + GYG_AFFILIATE_ID,
    "chiang-mai": "https://www.getyourguide.com/chiang-mai-l67/?partner_id=" + GYG_AFFILIATE_ID,
    "hoi-an": "https://www.getyourguide.com/hoi-an-l192/?partner_id=" + GYG_AFFILIATE_ID,
    "bali": "https://www.getyourguide.com/bali-l128/?partner_id=" + GYG_AFFILIATE_ID,
    "siargao": "https://www.getyourguide.com/siargao-l329/?partner_id=" + GYG_AFFILIATE_ID,
    "kyoto": "https://www.getyourguide.com/kyoto-l104/?partner_id=" + GYG_AFFILIATE_ID,
    "seoul": "https://www.getyourguide.com/seoul-l57/?partner_id=" + GYG_AFFILIATE_ID,
    "melbourne": "https://www.getyourguide.com/melbourne-l125/?partner_id=" + GYG_AFFILIATE_ID,
    "queenstown": "https://www.getyourguide.com/queenstown-l144/?partner_id=" + GYG_AFFILIATE_ID,
  };

  const experiencesByCity: Record<string, Array<{ name: string; category: string; description: string; price: number; groupSizeMin: number; groupSizeMax: number; duration: string; frequency: string; bookingUrl: string; photoUrl: string; organizerName: string; organizerEmail: string; isFeatured?: boolean }>> = {
    "new-york-city": [
      { name: "Street Photography Walk in Manhattan", category: "PHOTOGRAPHY_WALKS", description: "Explore iconic NYC photography locations with a professional photographer. Learn composition, lighting, and how to capture the energy of the city. Small group of max 6 people.", price: 65, groupSizeMin: 1, groupSizeMax: 6, duration: "3 hours", frequency: "weekly", bookingUrl: "https://www.getyourguide.com/new-york-city-l18/", photoUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80", organizerName: "NYC Photography Tours", organizerEmail: "info@nycphoto.example", isFeatured: true },
      { name: "Food Tour of Greenwich Village", category: "FOOD_DRINK", description: "Taste your way through Greenwich Village with stops at 5 iconic eateries. Learn the neighborhood's history through its food culture.", price: 55, groupSizeMin: 1, groupSizeMax: 8, duration: "2.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=600&q=80", organizerName: "Village Food Tours", organizerEmail: "tours@village.example" },
    ],
    "portland": [
      { name: "Waterfall Hike in Columbia River Gorge", category: "OUTDOOR_ADVENTURE", description: "Half-day hike to three stunning waterfalls. Perfect for solo travelers seeking nature and solitude.", price: 45, groupSizeMin: 1, groupSizeMax: 10, duration: "4 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", organizerName: "Portland Outdoor Adventures", organizerEmail: "hikes@portland.example", isFeatured: true },
      { name: "Craft Beer Tasting Tour", category: "FOOD_DRINK", description: "Visit 3 award-winning Portland breweries. Learn brewing techniques and taste seasonal releases.", price: 50, groupSizeMin: 1, groupSizeMax: 12, duration: "2.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&q=80", organizerName: "Portland Brewery Tours", organizerEmail: "beers@portland.example" },
    ],
    "mexico-city": [
      { name: "Traditional Mexican Cooking Class", category: "FOOD_DRINK", description: "Learn to make authentic mole, tamales, and chiles rellenos from a local chef. Eat what you cook.", price: 60, groupSizeMin: 1, groupSizeMax: 8, duration: "3 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", organizerName: "CDMX Cooking Studio", organizerEmail: "cook@cdmx.example", isFeatured: true },
      { name: "Street Art & Muralism Tour", category: "ARTS_CULTURE", description: "Explore Mexico City's vibrant street art scene with a local artist. Visit hidden murals and learn the stories behind them.", price: 35, groupSizeMin: 1, groupSizeMax: 10, duration: "2 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1578926078328-123456789012?w=600&q=80", organizerName: "CDMX Street Art", organizerEmail: "art@cdmx.example" },
      { name: "Yoga & Meditation Retreat (Morning)", category: "WELLNESS_MINDFULNESS", description: "Start your day with sunrise yoga overlooking the city. Perfect for solo travelers seeking peace and mindfulness.", price: 30, groupSizeMin: 1, groupSizeMax: 15, duration: "1.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80", organizerName: "Mexico City Yoga", organizerEmail: "yoga@cdmx.example" },
    ],
    "medellin": [
      { name: "Comuna 13 Graffiti Tour", category: "ARTS_CULTURE", description: "Explore Medellín's most colorful neighborhood with a local street artist. Learn about the transformation of this iconic area.", price: 40, groupSizeMin: 1, groupSizeMax: 12, duration: "2.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1578926078328-123456789012?w=600&q=80", organizerName: "Medellin Graffiti Tours", organizerEmail: "graffiti@medellin.example", isFeatured: true },
      { name: "Coffee Farm Tour & Tasting", category: "FOOD_DRINK", description: "Visit a working coffee farm in the hills above Medellín. Learn the process from bean to cup and taste fresh coffee.", price: 50, groupSizeMin: 1, groupSizeMax: 8, duration: "4 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=600&q=80", organizerName: "Medellin Coffee Tours", organizerEmail: "coffee@medellin.example" },
    ],
    "rio-de-janeiro": [
      { name: "Sunrise Hike to Christ the Redeemer", category: "OUTDOOR_ADVENTURE", description: "Hike up to the iconic statue before dawn. Watch the sunrise over Rio from one of the world's most breathtaking viewpoints.", price: 55, groupSizeMin: 1, groupSizeMax: 10, duration: "3 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80", organizerName: "Rio Adventure Tours", organizerEmail: "hikes@rio.example", isFeatured: true },
      { name: "Samba Dancing Workshop", category: "NIGHTLIFE_SOCIAL", description: "Learn authentic samba from a local dancer. Feel the rhythm and culture of Rio in a fun, energetic class.", price: 40, groupSizeMin: 1, groupSizeMax: 15, duration: "1.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1524578271613-d2a0ca7d4e46?w=600&q=80", organizerName: "Rio Samba School", organizerEmail: "samba@rio.example" },
    ],
    "lisbon": [
      { name: "Fado Music & Wine Evening", category: "NIGHTLIFE_SOCIAL", description: "Experience traditional Fado music in Alfama while tasting Portuguese wines. Soul-stirring music and warm hospitality.", price: 45, groupSizeMin: 1, groupSizeMax: 20, duration: "2 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80", organizerName: "Lisbon Fado Nights", organizerEmail: "fado@lisbon.example", isFeatured: true },
      { name: "Pastry Making Class", category: "FOOD_DRINK", description: "Learn to make Portuguese pastéis de nata and other traditional pastries. Bake, eat, and take your creations home.", price: 50, groupSizeMin: 1, groupSizeMax: 12, duration: "2.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561121?w=600&q=80", organizerName: "Lisbon Pastry School", organizerEmail: "pastry@lisbon.example" },
      { name: "Sunset Sailing Trip on Tagus River", category: "DAY_TRIPS", description: "Sail the Tagus River at golden hour. Relax on deck, watch the city lights come alive, and enjoy the sea breeze.", price: 60, groupSizeMin: 1, groupSizeMax: 12, duration: "2.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1600152362024-ba3b6a9f49a1?w=600&q=80", organizerName: "Lisbon Sailing Tours", organizerEmail: "sailing@lisbon.example" },
    ],
    "tbilisi": [
      { name: "Sulphur Bath Experience", category: "WELLNESS_MINDFULNESS", description: "Soak in natural sulfur hot springs in the old town. Ancient wellness tradition meets modern relaxation.", price: 20, groupSizeMin: 1, groupSizeMax: 10, duration: "1.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=600&q=80", organizerName: "Tbilisi Wellness", organizerEmail: "baths@tbilisi.example", isFeatured: true },
      { name: "Georgian Food & Wine Tour", category: "FOOD_DRINK", description: "Taste authentic Georgian cuisine and natural wines at family-run restaurants. Learn the stories behind the food.", price: 40, groupSizeMin: 1, groupSizeMax: 12, duration: "3 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", organizerName: "Tbilisi Food Tours", organizerEmail: "food@tbilisi.example" },
    ],
    "barcelona": [
      { name: "Gaudí & Gothic Quarter Walking Tour", category: "ARTS_CULTURE", description: "Explore Barcelona's architectural masterpieces. Visit Sagrada Familia, Park Güell, and Gothic streets with an expert guide.", price: 50, groupSizeMin: 1, groupSizeMax: 20, duration: "3 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80", organizerName: "Barcelona Arch Tours", organizerEmail: "gaudi@barcelona.example", isFeatured: true },
      { name: "Tapas Crawl & Local Bars", category: "FOOD_DRINK", description: "Sample traditional tapas and local wines at neighborhood bars. Meet locals and experience Barcelona's food culture.", price: 45, groupSizeMin: 1, groupSizeMax: 15, duration: "2.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1497636577773-f1231844b663?w=600&q=80", organizerName: "Barcelona Food Tours", organizerEmail: "tapas@barcelona.example" },
    ],
    "berlin": [
      { name: "Cold War History Bike Tour", category: "DAY_TRIPS", description: "Pedal through Berlin's history. Visit East Side Gallery, Checkpoint Charlie, and secret Cold War sites on two wheels.", price: 30, groupSizeMin: 1, groupSizeMax: 12, duration: "2.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1569163139394-de4798aa62b3?w=600&q=80", organizerName: "Berlin Bike Tours", organizerEmail: "bikes@berlin.example", isFeatured: true },
      { name: "Street Art & Underground Culture", category: "ARTS_CULTURE", description: "Discover Berlin's thriving street art scene with a local artist. Explore galleries, clubs, and hidden murals in Kreuzberg.", price: 40, groupSizeMin: 1, groupSizeMax: 10, duration: "2 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1549887534-7b58bfb48a1d?w=600&q=80", organizerName: "Berlin Art Tours", organizerEmail: "art@berlin.example" },
    ],
    "marrakech": [
      { name: "Medina Street Food Tour", category: "FOOD_DRINK", description: "Navigate the souks and taste authentic street food. Learn about Moroccan spices and flavors from a local guide.", price: 35, groupSizeMin: 1, groupSizeMax: 8, duration: "2.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561121?w=600&q=80", organizerName: "Marrakech Food Tours", organizerEmail: "food@marrakech.example", isFeatured: true },
      { name: "Desert Camel Trek Sunset", category: "OUTDOOR_ADVENTURE", description: "Ride camels into the Sahara and watch the sunset over dunes. Authentic desert experience with Berber guides.", price: 50, groupSizeMin: 1, groupSizeMax: 10, duration: "3 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=600&q=80", organizerName: "Marrakech Desert Tours", organizerEmail: "desert@marrakech.example" },
    ],
    "rishikesh": [
      { name: "Yoga Retreat Package (3 Days)", category: "WELLNESS_MINDFULNESS", description: "Immerse yourself in yoga, meditation, and Ayurveda on the banks of the Ganges. For all levels, perfect for solo travelers.", price: 150, groupSizeMin: 1, groupSizeMax: 20, duration: "3 days", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80", organizerName: "Rishikesh Yoga Academy", organizerEmail: "yoga@rishikesh.example", isFeatured: true },
      { name: "Ganges River Rafting Adventure", category: "OUTDOOR_ADVENTURE", description: "Whitewater rafting on the Ganges. Thrilling rapids with expert guides and stunning gorge scenery.", price: 40, groupSizeMin: 1, groupSizeMax: 10, duration: "2.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", organizerName: "Rishikesh Adventure", organizerEmail: "adventure@rishikesh.example" },
    ],
    "kathmandu": [
      { name: "Kathmandu Valley Heritage Walk", category: "ARTS_CULTURE", description: "Visit ancient temples, stupas, and royal palaces. Learn Nepali history and Buddhism from a local guide.", price: 30, groupSizeMin: 1, groupSizeMax: 12, duration: "3 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=600&q=80", organizerName: "Kathmandu Culture Tours", organizerEmail: "culture@kathmandu.example", isFeatured: true },
      { name: "Nepalese Cooking Class", category: "FOOD_DRINK", description: "Learn to cook momos, dal bhat, and other Nepali favorites. Cook with a local family and eat your creations.", price: 35, groupSizeMin: 1, groupSizeMax: 8, duration: "2.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", organizerName: "Kathmandu Kitchen", organizerEmail: "cook@kathmandu.example" },
    ],
    "chiang-mai": [
      { name: "Thai Cooking Class", category: "FOOD_DRINK", description: "Learn to cook pad thai, curry, and more. Visit local markets, cook with a chef, and enjoy your feast.", price: 45, groupSizeMin: 1, groupSizeMax: 12, duration: "3 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", organizerName: "Chiang Mai Culinary", organizerEmail: "cook@chiangmai.example", isFeatured: true },
      { name: "Muay Thai Boxing Training", category: "FITNESS_SPORTS", description: "Learn authentic Muay Thai at a local gym. Perfect for fitness and solo travelers seeking an authentic experience.", price: 25, groupSizeMin: 1, groupSizeMax: 15, duration: "1.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1549719386-74dfaf8c7cb2?w=600&q=80", organizerName: "Chiang Mai Fight Club", organizerEmail: "muay@chiangmai.example" },
      { name: "Sunrise Temple Photography Walk", category: "PHOTOGRAPHY_WALKS", description: "Visit 5 temples at dawn with a photographer guide. Capture golden light on 1000-year-old pagodas.", price: 40, groupSizeMin: 1, groupSizeMax: 8, duration: "2.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1517604931442-7e0c6ed2963c?w=600&q=80", organizerName: "Chiang Mai Photo Tours", organizerEmail: "photo@chiangmai.example" },
    ],
    "hoi-an": [
      { name: "Tailor-Made Suit & Dress", category: "ARTS_CULTURE", description: "Get a custom tailored suit or dress made in 24-48 hours. Watch the masters work and get fitted on their famous tailors.", price: 100, groupSizeMin: 1, groupSizeMax: 5, duration: "3 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80", organizerName: "Hoi An Tailors", organizerEmail: "tailors@hoian.example", isFeatured: true },
      { name: "Lantern Making Workshop", category: "ARTS_CULTURE", description: "Create your own silk lantern. Watch the sunset over the Vu River from your boat with your handmade lantern.", price: 30, groupSizeMin: 1, groupSizeMax: 10, duration: "1.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1572437261485-ca2a50a5e6a9?w=600&q=80", organizerName: "Hoi An Crafts", organizerEmail: "crafts@hoian.example" },
    ],
    "bali": [
      { name: "Mount Batur Sunrise Hike", category: "OUTDOOR_ADVENTURE", description: "Hike to the summit of an active volcano before dawn. Watch sunrise over the volcanic landscape and neighboring mountains.", price: 35, groupSizeMin: 1, groupSizeMax: 12, duration: "4 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", organizerName: "Bali Adventure Tours", organizerEmail: "hikes@bali.example", isFeatured: true },
      { name: "Traditional Balinese Cooking", category: "FOOD_DRINK", description: "Cook authentic Balinese dishes in a traditional home. Visit the market, prepare a 3-course meal, and eat together.", price: 40, groupSizeMin: 1, groupSizeMax: 6, duration: "3 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", organizerName: "Bali Home Cooking", organizerEmail: "cook@bali.example" },
      { name: "Yoga & Rice Field Sunrise", category: "WELLNESS_MINDFULNESS", description: "Practice yoga overlooking terraced rice fields at sunrise. Peaceful and transformative experience in nature.", price: 30, groupSizeMin: 1, groupSizeMax: 15, duration: "1.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80", organizerName: "Bali Yoga Retreats", organizerEmail: "yoga@bali.example" },
    ],
    "siargao": [
      { name: "Beginner Surfing Lessons", category: "FITNESS_SPORTS", description: "Learn to surf at Cloud 9, Philippines' most famous break. Expert instructors teach all levels from the beach.", price: 35, groupSizeMin: 1, groupSizeMax: 4, duration: "2 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1514305189212-7fc755583df1?w=600&q=80", organizerName: "Siargao Surf School", organizerEmail: "surf@siargao.example", isFeatured: true },
      { name: "Island Hopping Day Tour", category: "DAY_TRIPS", description: "Visit 3 nearby islands by boat. Snorkel, swim, relax on pristine beaches with lunch included.", price: 30, groupSizeMin: 1, groupSizeMax: 8, duration: "7 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", organizerName: "Siargao Tours", organizerEmail: "tours@siargao.example" },
    ],
    "kyoto": [
      { name: "Temple Hopping & Zen Gardens", category: "ARTS_CULTURE", description: "Visit 5 sacred temples and meditate in zen gardens. Learn about Japanese Buddhism from an English-speaking guide.", price: 50, groupSizeMin: 1, groupSizeMax: 10, duration: "3 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", organizerName: "Kyoto Temple Tours", organizerEmail: "temples@kyoto.example", isFeatured: true },
      { name: "Traditional Japanese Tea Ceremony", category: "ARTS_CULTURE", description: "Experience a real tea ceremony (chanoyu) in a geisha house. Learn the art, history, and philosophy of tea.", price: 60, groupSizeMin: 1, groupSizeMax: 8, duration: "1.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", organizerName: "Kyoto Tea Masters", organizerEmail: "tea@kyoto.example" },
    ],
    "seoul": [
      { name: "K-Culture Workshop (Calligraphy & Makeup)", category: "ARTS_CULTURE", description: "Learn traditional Korean calligraphy and Korean makeup techniques. Hands-on experience with Korean artists.", price: 45, groupSizeMin: 1, groupSizeMax: 10, duration: "2 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1516979187457-635ffe35ff39?w=600&q=80", organizerName: "Seoul Culture Studio", organizerEmail: "culture@seoul.example", isFeatured: true },
      { name: "Korean Cooking Class & Market Tour", category: "FOOD_DRINK", description: "Shop at a traditional market and cook 4 classic Korean dishes. Eat your creations and take leftovers home.", price: 50, groupSizeMin: 1, groupSizeMax: 12, duration: "3 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", organizerName: "Seoul Kitchen", organizerEmail: "cook@seoul.example" },
    ],
    "melbourne": [
      { name: "Street Art Laneways Tour", category: "ARTS_CULTURE", description: "Explore Melbourne's famous laneways covered in street art. Learn the stories from a local artist guide.", price: 35, groupSizeMin: 1, groupSizeMax: 12, duration: "2 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1549887534-7b58bfb48a1d?w=600&q=80", organizerName: "Melbourne Art Tours", organizerEmail: "art@melbourne.example", isFeatured: true },
      { name: "Coffee Culture Masterclass", category: "FOOD_DRINK", description: "Visit 3 specialty coffee roasters. Learn latte art, espresso extraction, and become a coffee connoisseur.", price: 55, groupSizeMin: 1, groupSizeMax: 8, duration: "2.5 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80", organizerName: "Melbourne Coffee Academy", organizerEmail: "coffee@melbourne.example" },
    ],
    "queenstown": [
      { name: "Adventure Sports Bundle (Bungy & Skydiving)", category: "FITNESS_SPORTS", description: "Experience bungy jumping over Kawarau River and skydiving over Milford Sound. Adrenaline-packed day.", price: 450, groupSizeMin: 1, groupSizeMax: 2, duration: "Full day", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1561418882-24a5d6f83f17?w=600&q=80", organizerName: "Queenstown Adventures", organizerEmail: "extreme@queenstown.example", isFeatured: true },
      { name: "Wine Tasting & Vineyard Tour", category: "FOOD_DRINK", description: "Tour 3 wineries in Central Otago. Taste award-winning Pinot Noir and learn about New Zealand wine.", price: 70, groupSizeMin: 1, groupSizeMax: 8, duration: "3 hours", frequency: "daily", bookingUrl: "https://www.getyourguide.com/", photoUrl: "https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=600&q=80", organizerName: "Queenstown Wine Tours", organizerEmail: "wine@queenstown.example" },
    ],
  };

  let experienceCount = 0;
  for (const [citySlug, experiences] of Object.entries(experiencesByCity)) {
    const city = await prisma.city.findUnique({ where: { slug: citySlug } });
    if (!city) continue;

    for (const exp of experiences) {
      const slug = `${citySlug}-${exp.name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")}`.substring(0, 100);

      // Create or get organizer
      const organizer = await prisma.experienceOrganizer.upsert({
        where: { email: exp.organizerEmail },
        update: {},
        create: { name: exp.organizerName, email: exp.organizerEmail },
      });

      // Use city-specific GetYourGuide URL if booking URL is placeholder
      let bookingUrl = exp.bookingUrl;
      if (bookingUrl === "https://www.getyourguide.com/" || bookingUrl === "https://www.getyourguide.com") {
        bookingUrl = gygUrlMap[citySlug] || exp.bookingUrl;
      } else if (bookingUrl.includes("getyourguide.com") && !bookingUrl.includes("partner_id")) {
        // If it's a GetYourGuide URL without the affiliate parameter, add it
        const separator = bookingUrl.includes("?") ? "&" : "?";
        bookingUrl = bookingUrl + separator + "partner_id=" + GYG_AFFILIATE_ID;
      }

      // Create experience
      await prisma.experience.upsert({
        where: { slug },
        update: {},
        create: {
          slug,
          name: exp.name,
          cityId: city.id,
          category: exp.category as any,
          description: exp.description,
          price: exp.price,
          groupSizeMin: exp.groupSizeMin,
          groupSizeMax: exp.groupSizeMax,
          duration: exp.duration,
          frequency: exp.frequency,
          bookingUrl,
          photoUrl: exp.photoUrl,
          organizerId: organizer.id,
          isFeatured: exp.isFeatured || false,
          isActive: true,
        },
      });

      experienceCount++;
    }
  }

  console.log(`✅ ${cityCount} cities seeded`);
  console.log(`✅ ${spotCount} spots seeded`);
  console.log(`✅ ${experienceCount} experiences seeded`);
  console.log("🎉 Done!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
