const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Existing country IDs from DB
const EXISTING = {
  PT: 'cmpqvwnn00004vi1o7ev7ju8k', // Portugal (for Porto)
  ES: 'cmpqvwqfz0006vi1oc1ccbfqv', // Spain (for Seville)
  DE: 'cmpqvwrtu0007vi1olug2dud5', // Germany (Berlin already seeded)
  GE: 'cmpqvwozo0005vi1oewdpf012', // Georgia (Tbilisi already seeded)
};

const NEW_COUNTRIES = [
  { name: 'Netherlands',     slug: 'netherlands',     code: 'NL', region: 'EUROPE', flagEmoji: '🇳🇱' },
  { name: 'Czech Republic',  slug: 'czech-republic',  code: 'CZ', region: 'EUROPE', flagEmoji: '🇨🇿' },
  { name: 'Hungary',         slug: 'hungary',         code: 'HU', region: 'EUROPE', flagEmoji: '🇭🇺' },
  { name: 'Italy',           slug: 'italy',           code: 'IT', region: 'EUROPE', flagEmoji: '🇮🇹' },
  { name: 'Austria',         slug: 'austria',         code: 'AT', region: 'EUROPE', flagEmoji: '🇦🇹' },
  { name: 'Denmark',         slug: 'denmark',         code: 'DK', region: 'EUROPE', flagEmoji: '🇩🇰' },
  { name: 'United Kingdom',  slug: 'united-kingdom',  code: 'GB', region: 'EUROPE', flagEmoji: '🇬🇧' },
  { name: 'Croatia',         slug: 'croatia',         code: 'HR', region: 'EUROPE', flagEmoji: '🇭🇷' },
  { name: 'Estonia',         slug: 'estonia',         code: 'EE', region: 'EUROPE', flagEmoji: '🇪🇪' },
  { name: 'Slovenia',        slug: 'slovenia',        code: 'SI', region: 'EUROPE', flagEmoji: '🇸🇮' },
  { name: 'Poland',          slug: 'poland',          code: 'PL', region: 'EUROPE', flagEmoji: '🇵🇱' },
  { name: 'Greece',          slug: 'greece',          code: 'GR', region: 'EUROPE', flagEmoji: '🇬🇷' },
];

async function main() {
  const countryMap = { ...EXISTING };

  for (const c of NEW_COUNTRIES) {
    const existing = await prisma.country.findUnique({ where: { code: c.code } });
    if (existing) {
      console.log('Country EXISTS:', c.name, existing.id);
      countryMap[c.code] = existing.id;
    } else {
      const created = await prisma.country.create({ data: c });
      console.log('Country CREATED:', c.name, created.id);
      countryMap[c.code] = created.id;
    }
  }

  const cities = [
    {
      name: 'Amsterdam', slug: 'amsterdam', countryId: countryMap.NL, region: 'EUROPE',
      description: "Europe's most livable canal city — a labyrinth of golden-age gabled houses, world-class museums, and a cycling culture that makes it the most solo-travel-friendly city on the continent. The Dutch are warm, English is universal, and the coworking scene is booming.",
      imageUrl: '/cities/amsterdam.jpg', currency: 'EUR', language: 'Dutch', safetyScore: 8, costLevel: 'MID_RANGE', timezone: 'Europe/Amsterdam', published: true,
    },
    {
      name: 'Rome', slug: 'rome', countryId: countryMap.IT, region: 'EUROPE',
      description: "The Eternal City — 2,800 years of history layered into a living, breathing, pasta-serving metropolis. Every piazza is an outdoor museum, every neighborhood has a secret trattoria, and the solo traveler who gets lost here always ends up somewhere magnificent.",
      imageUrl: '/cities/rome.jpg', currency: 'EUR', language: 'Italian', safetyScore: 7, costLevel: 'MID_RANGE', timezone: 'Europe/Rome', published: true,
    },
    {
      name: 'Prague', slug: 'prague', countryId: countryMap.CZ, region: 'EUROPE',
      description: "Central Europe's fairy-tale capital — a skyline of Gothic spires, Baroque facades, and Art Nouveau buildings that survived both world wars intact. Prague is one of the most beautiful cities on earth, and one of the most affordable in Western Europe.",
      imageUrl: '/cities/prague.jpg', currency: 'CZK', language: 'Czech', safetyScore: 8, costLevel: 'BUDGET', timezone: 'Europe/Prague', published: true,
    },
    {
      name: 'Budapest', slug: 'budapest', countryId: countryMap.HU, region: 'EUROPE',
      description: "The Paris of Eastern Europe — a city of thermal baths, ruin bars, and one of the most dramatic riverfront skylines in the world. Budapest is where solo travelers arrive for a weekend and re-book for a month. Incredible food, low prices, and a nightlife scene that never stops.",
      imageUrl: '/cities/budapest.jpg', currency: 'HUF', language: 'Hungarian', safetyScore: 8, costLevel: 'BUDGET', timezone: 'Europe/Budapest', published: true,
    },
    {
      name: 'Athens', slug: 'athens', countryId: countryMap.GR, region: 'EUROPE',
      description: "The birthplace of democracy, philosophy, and some of the world's most spectacular ancient ruins. Athens is having a renaissance — the old city beneath the Acropolis has exploded with rooftop bars, creative neighborhoods, and a food scene that finally matches the history.",
      imageUrl: '/cities/athens.jpg', currency: 'EUR', language: 'Greek', safetyScore: 7, costLevel: 'BUDGET', timezone: 'Europe/Athens', published: true,
    },
    {
      name: 'Vienna', slug: 'vienna', countryId: countryMap.AT, region: 'EUROPE',
      description: "The Habsburg empire's grandest legacy — a city of coffee houses, concert halls, and imperial palaces that operates like clockwork. Vienna consistently ranks as the world's most livable city, and solo travelers who spend a week here struggle to articulate why it's so deeply satisfying.",
      imageUrl: '/cities/vienna.jpg', currency: 'EUR', language: 'German', safetyScore: 9, costLevel: 'MID_RANGE', timezone: 'Europe/Vienna', published: true,
    },
    {
      name: 'Copenhagen', slug: 'copenhagen', countryId: countryMap.DK, region: 'EUROPE',
      description: "The world's most design-forward city — where hygge is a lifestyle, cycling is religion, and every neighborhood hides a Michelin-starred restaurant. Copenhagen is expensive but worth every krone; the solo traveler quality of life here is unmatched in Europe.",
      imageUrl: '/cities/copenhagen.jpg', currency: 'DKK', language: 'Danish', safetyScore: 9, costLevel: 'EXPENSIVE', timezone: 'Europe/Copenhagen', published: true,
    },
    {
      name: 'Porto', slug: 'porto', countryId: countryMap.PT, region: 'EUROPE',
      description: "Portugal's second city and its soul — a hilly Atlantic port of azulejo-tiled facades, port wine cellars, and some of the best seafood in Europe at prices that make Lisbon look expensive. Porto is the solo travel destination that travelers keep returning to.",
      imageUrl: '/cities/porto.jpg', currency: 'EUR', language: 'Portuguese', safetyScore: 8, costLevel: 'BUDGET', timezone: 'Europe/Lisbon', published: true,
    },
    {
      name: 'Edinburgh', slug: 'edinburgh', countryId: countryMap.GB, region: 'EUROPE',
      description: "Scotland's dramatic capital — a medieval Old Town of closes and wynds beneath a volcanic castle, set against a New Town of Georgian elegance. Edinburgh's Fringe Festival makes it the world's biggest arts gathering every August; the city is extraordinary year-round.",
      imageUrl: '/cities/edinburgh.jpg', currency: 'GBP', language: 'English', safetyScore: 8, costLevel: 'MID_RANGE', timezone: 'Europe/London', published: true,
    },
    {
      name: 'Seville', slug: 'seville', countryId: countryMap.ES, region: 'EUROPE',
      description: "Andalusia's flamenco heart — a city of Moorish palaces, orange-blossom courtyards, and tapas bars where a €1.50 glass of fino comes with a plate of jamón. Seville is Spain at its most passionate: intense, sensual, and impossible to leave.",
      imageUrl: '/cities/seville.jpg', currency: 'EUR', language: 'Spanish', safetyScore: 7, costLevel: 'BUDGET', timezone: 'Europe/Madrid', published: true,
    },
    {
      name: 'Florence', slug: 'florence', countryId: countryMap.IT, region: 'EUROPE',
      description: "The cradle of the Renaissance — a compact, walkable city where every church contains a Michelangelo, every gallery a Botticelli, and every trattoria a reason to stay another week. Florence rewards the solo traveler who moves slowly and eats everything.",
      imageUrl: '/cities/florence.jpg', currency: 'EUR', language: 'Italian', safetyScore: 8, costLevel: 'MID_RANGE', timezone: 'Europe/Rome', published: true,
    },
    {
      name: 'Dubrovnik', slug: 'dubrovnik', countryId: countryMap.HR, region: 'EUROPE',
      description: "The Pearl of the Adriatic — a perfectly preserved medieval walled city on a limestone peninsula above the bluest sea in Europe. Game of Thrones put it on the map; the reality exceeds every expectation. Best visited in shoulder season when the cruise ships thin out.",
      imageUrl: '/cities/dubrovnik.jpg', currency: 'EUR', language: 'Croatian', safetyScore: 9, costLevel: 'MID_RANGE', timezone: 'Europe/Zagreb', published: true,
    },
    {
      name: 'Tallinn', slug: 'tallinn', countryId: countryMap.EE, region: 'EUROPE',
      description: "The most digitally advanced capital in Europe — Estonia's medieval old town is a UNESCO-listed fairy tale of guild halls and Gothic towers, while the city runs entirely on e-government and startup culture. Tallinn is the cheapest capital city for digital nomads in the EU.",
      imageUrl: '/cities/tallinn.jpg', currency: 'EUR', language: 'Estonian', safetyScore: 9, costLevel: 'BUDGET', timezone: 'Europe/Tallinn', published: true,
    },
    {
      name: 'Ljubljana', slug: 'ljubljana', countryId: countryMap.SI, region: 'EUROPE',
      description: "Europe's most underrated capital — a car-free old town of pastel-painted baroque buildings along the Ljubljanica River, a castle on the hill, and an outdoor café culture that runs eight months of the year. Ljubljana is what Europe looked like before the crowds arrived.",
      imageUrl: '/cities/ljubljana.jpg', currency: 'EUR', language: 'Slovenian', safetyScore: 9, costLevel: 'BUDGET', timezone: 'Europe/Ljubljana', published: true,
    },
    {
      name: 'Kraków', slug: 'krakow', countryId: countryMap.PL, region: 'EUROPE',
      description: "Poland's cultural capital and one of the most beautiful medieval cities in Europe — a Royal Mile of Gothic and Renaissance buildings, a castle on the Vistula, the extraordinary Wieliczka Salt Mine, and a Jewish Quarter renaissance happening right now. Prices will make your jaw drop.",
      imageUrl: '/cities/krakow.jpg', currency: 'PLN', language: 'Polish', safetyScore: 8, costLevel: 'BUDGET', timezone: 'Europe/Warsaw', published: true,
    },
  ];

  console.log('\n=== Creating 15 European cities ===');
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

  console.log('\n=== City IDs ===');
  Object.entries(cityIds).forEach(([slug, id]) => console.log(slug + ':', id));

  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
