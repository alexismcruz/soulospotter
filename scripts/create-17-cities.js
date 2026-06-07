const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Existing country IDs
const COUNTRY = {
  TH: 'cmpqvwxpl000bvi1o9dby772z', // Thailand
  VN: 'cmpqvwz5t000cvi1oyvfx8e4f', // Vietnam
  PH: 'cmpqvx221000evi1ok1lf2pa9', // Philippines
  ID: 'cmpqvx0il000dvi1o88e76566', // Indonesia
};

const NEW_COUNTRIES = [
  { name: 'Cambodia',  slug: 'cambodia',  code: 'KH', region: 'SOUTHEAST_ASIA', flagEmoji: '🇰🇭' },
  { name: 'Laos',      slug: 'laos',      code: 'LA', region: 'SOUTHEAST_ASIA', flagEmoji: '🇱🇦' },
  { name: 'Malaysia',  slug: 'malaysia',  code: 'MY', region: 'SOUTHEAST_ASIA', flagEmoji: '🇲🇾' },
  { name: 'Singapore', slug: 'singapore', code: 'SG', region: 'SOUTHEAST_ASIA', flagEmoji: '🇸🇬' },
  { name: 'Mongolia',  slug: 'mongolia',  code: 'MN', region: 'EAST_ASIA',      flagEmoji: '🇲🇳' },
  { name: 'China',     slug: 'china',     code: 'CN', region: 'EAST_ASIA',      flagEmoji: '🇨🇳' },
];

async function main() {
  // Create missing countries
  const countryMap = { ...COUNTRY };
  for (const c of NEW_COUNTRIES) {
    const existing = await prisma.country.findUnique({ where: { code: c.code } });
    if (existing) {
      console.log('Country exists:', c.name, existing.id);
      countryMap[c.code] = existing.id;
    } else {
      const created = await prisma.country.create({ data: c });
      console.log('Created country:', c.name, created.id);
      countryMap[c.code] = created.id;
    }
  }

  // City definitions
  const cities = [
    { name: 'Bangkok',         slug: 'bangkok',         countryId: countryMap.TH, region: 'SOUTHEAST_ASIA', description: 'A city of contrasts — golden temples, rooftop bars, and street food sois that come alive at midnight. Southeast Asia\'s most-visited city never sits still.',         imageUrl: '/cities/bangkok.jpg',         currency: 'THB', language: 'Thai',       safetyScore: 7, costLevel: 'BUDGET',    timezone: 'Asia/Bangkok',    published: true },
    { name: 'Ho Chi Minh City', slug: 'ho-chi-minh-city', countryId: countryMap.VN, region: 'SOUTHEAST_ASIA', description: 'Vietnam\'s electric southern capital — war history, French colonial flair, a world-class food scene, and a startup energy unlike anywhere else in SE Asia.',         imageUrl: '/cities/ho-chi-minh-city.jpg', currency: 'VND', language: 'Vietnamese', safetyScore: 7, costLevel: 'BUDGET',    timezone: 'Asia/Ho_Chi_Minh', published: true },
    { name: 'Siem Reap',        slug: 'siem-reap',        countryId: countryMap.KH, region: 'SOUTHEAST_ASIA', description: 'Gateway to Angkor Wat, the largest religious monument on Earth. Beyond the temples, Siem Reap has blossomed into a vibrant solo travel hub with great hostels and Pub Street energy.', imageUrl: '/cities/siem-reap.jpg',        currency: 'USD', language: 'Khmer',      safetyScore: 7, costLevel: 'BUDGET',    timezone: 'Asia/Phnom_Penh', published: true },
    { name: 'Luang Prabang',    slug: 'luang-prabang',    countryId: countryMap.LA, region: 'SOUTHEAST_ASIA', description: 'A UNESCO World Heritage town on the Mekong River where orange-robed monks collect alms at dawn and French colonial cafes overflow with travelers who came for a week and stayed for a month.', imageUrl: '/cities/luang-prabang.jpg',    currency: 'LAK', language: 'Lao',        safetyScore: 8, costLevel: 'BUDGET',    timezone: 'Asia/Vientiane',  published: true },
    { name: 'Penang',           slug: 'penang',           countryId: countryMap.MY, region: 'SOUTHEAST_ASIA', description: 'Malaysia\'s food capital — a UNESCO George Town of street-art lanes, Chinese clan houses, and hawker stalls that have made this island the most talked-about culinary destination in Southeast Asia.', imageUrl: '/cities/penang.jpg',           currency: 'MYR', language: 'English',    safetyScore: 8, costLevel: 'BUDGET',    timezone: 'Asia/Kuala_Lumpur', published: true },
    { name: 'Kuala Lumpur',     slug: 'kuala-lumpur',     countryId: countryMap.MY, region: 'SOUTHEAST_ASIA', description: 'Malaysia\'s cosmopolitan capital where the Petronas Towers pierce the skyline, Chinatown and Little India sit side by side, and the coworking scene rivals Singapore at half the price.', imageUrl: '/cities/kuala-lumpur.jpg',     currency: 'MYR', language: 'English',    safetyScore: 7, costLevel: 'MID_RANGE', timezone: 'Asia/Kuala_Lumpur', published: true },
    { name: 'Singapore',        slug: 'singapore',        countryId: countryMap.SG, region: 'SOUTHEAST_ASIA', description: 'The safest, most connected city in Southeast Asia — a green, efficient city-state with hawker centres that punch above their Michelin-starred weight and a digital nomad scene that means business.', imageUrl: '/cities/singapore.jpg',        currency: 'SGD', language: 'English',    safetyScore: 10, costLevel: 'EXPENSIVE', timezone: 'Asia/Singapore',  published: true },
    { name: 'Ubud',             slug: 'ubud',             countryId: countryMap.ID, region: 'SOUTHEAST_ASIA', description: 'Spiritual Bali at its purest — surrounded by terraced rice paddies and ancient temples, Ubud is the island\'s arts and wellness capital, with world-class yoga retreats, traditional healers, and some of the best vegetarian food in Asia.', imageUrl: '/cities/ubud.jpg',             currency: 'IDR', language: 'Indonesian', safetyScore: 8, costLevel: 'BUDGET',    timezone: 'Asia/Makassar',   published: true },
    { name: 'Cebu',             slug: 'cebu',             countryId: countryMap.PH, region: 'SOUTHEAST_ASIA', description: 'The Queen City of the South — Cebu is the Philippines\' second city and the gateway to the Visayas: whale shark swimming in Oslob, sardine runs in Moalboal, colonial history in the city, and island-hopping in every direction.', imageUrl: '/cities/cebu.jpg',             currency: 'PHP', language: 'English',    safetyScore: 7, costLevel: 'BUDGET',    timezone: 'Asia/Manila',     published: true },
    { name: 'El Nido',          slug: 'el-nido',          countryId: countryMap.PH, region: 'SOUTHEAST_ASIA', description: 'The crown jewel of Palawan — dramatic limestone karst cliffs, hidden lagoons, and some of the clearest water on the planet. El Nido\'s island-hopping tours are among the most spectacular experiences in Southeast Asia.', imageUrl: '/cities/el-nido.jpg',          currency: 'PHP', language: 'English',    safetyScore: 8, costLevel: 'BUDGET',    timezone: 'Asia/Manila',     published: true },
    { name: 'Pai',              slug: 'pai',              countryId: countryMap.TH, region: 'SOUTHEAST_ASIA', description: 'A laid-back mountain town in northern Thailand beloved by backpackers, yogis, and anyone needing to slow down. Pai sits in a misty valley with hot springs, waterfalls, and a walking street that pulses every night.', imageUrl: '/cities/pai.jpg',              currency: 'THB', language: 'Thai',       safetyScore: 9, costLevel: 'BUDGET',    timezone: 'Asia/Bangkok',    published: true },
    { name: 'Koh Tao',          slug: 'koh-tao',          countryId: countryMap.TH, region: 'SOUTHEAST_ASIA', description: 'The world capital of learn-to-dive travel. Koh Tao offers the most affordable PADI certification on earth, and when you\'re done, the island delivers coral reefs, beach bars, and a solo-traveler community unlike anywhere in Thailand.', imageUrl: '/cities/koh-tao.jpg',          currency: 'THB', language: 'Thai',       safetyScore: 7, costLevel: 'BUDGET',    timezone: 'Asia/Bangkok',    published: true },
    { name: 'Phuket',           slug: 'phuket',           countryId: countryMap.TH, region: 'SOUTHEAST_ASIA', description: 'Thailand\'s largest island balances Patong\'s legendary nightlife with Phuket Old Town\'s Sino-Portuguese charm, pristine beaches at the north and south tips, and a booming digital nomad scene in the hills.', imageUrl: '/cities/phuket.jpg',           currency: 'THB', language: 'Thai',       safetyScore: 7, costLevel: 'MID_RANGE', timezone: 'Asia/Bangkok',    published: true },
    { name: 'Ulaanbaatar',      slug: 'ulaanbaatar',      countryId: countryMap.MN, region: 'EAST_ASIA',      description: 'The world\'s coldest capital and gateway to the Mongolian steppe — a city of Soviet concrete and Buddhist monasteries, where every traveler is just passing through on the way to yurt camps, the Gobi Desert, and endless sky.', imageUrl: '/cities/ulaanbaatar.jpg',      currency: 'MNT', language: 'Mongolian',  safetyScore: 6, costLevel: 'MID_RANGE', timezone: 'Asia/Ulaanbaatar', published: true },
    { name: 'Chengdu',          slug: 'chengdu',          countryId: countryMap.CN, region: 'EAST_ASIA',      description: 'China\'s most livable city — home of the giant panda, mouth-numbing Sichuan hotpot, teahouse culture, and a nightlife scene that outlasts everywhere else in the country. Chengdu is the Chinese city that solo travelers fall hardest for.', imageUrl: '/cities/chengdu.jpg',          currency: 'CNY', language: 'Mandarin',   safetyScore: 8, costLevel: 'BUDGET',    timezone: 'Asia/Shanghai',   published: true },
    { name: "Xi'an",            slug: 'xian',             countryId: countryMap.CN, region: 'EAST_ASIA',      description: 'Ancient China\'s imperial capital — home of the Terracotta Warriors, a perfectly preserved 14km city wall, and the Muslim Quarter\'s mind-blowing street food lane. Xi\'an is where China\'s history feels most alive.', imageUrl: '/cities/xian.jpg',             currency: 'CNY', language: 'Mandarin',   safetyScore: 8, costLevel: 'BUDGET',    timezone: 'Asia/Shanghai',   published: true },
    { name: 'Guilin',           slug: 'guilin',           countryId: countryMap.CN, region: 'EAST_ASIA',      description: 'The landscape that inspired a thousand Chinese paintings — karst limestone peaks rising from the Li River, bamboo forests, and rice terraces that glow gold in autumn. Yangshuo, 90 minutes downriver, is the backpacker base.',        imageUrl: '/cities/guilin.jpg',           currency: 'CNY', language: 'Mandarin',   safetyScore: 9, costLevel: 'BUDGET',    timezone: 'Asia/Shanghai',   published: true },
  ];

  console.log('\n=== Creating 17 cities ===');
  const cityIds = {};
  for (const city of cities) {
    const existing = await prisma.city.findUnique({ where: { slug: city.slug } });
    if (existing) {
      console.log('EXISTS:', city.name, existing.id);
      cityIds[city.slug] = existing.id;
    } else {
      const created = await prisma.city.create({ data: city });
      console.log('CREATED:', city.name, created.id);
      cityIds[city.slug] = created.id;
    }
  }

  console.log('\n=== City IDs for seeding ===');
  Object.entries(cityIds).forEach(([slug, id]) => console.log(slug + ':', id));

  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
