const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const IN = 'cmpqvwuy10009vi1oxrop30eg'; // India
const JP = 'cmpqvx3jh000fvi1ozgqezc8a'; // Japan
const KR = 'cmpqvx525000gvi1o5bvtq363'; // South Korea

const cities = [
  // ── India ──
  { name: 'Jaipur', slug: 'jaipur', countryId: IN, region: 'ASIA',
    description: "The Pink City and gateway to Rajasthan — a riot of rose-hued palaces, hilltop forts, bazaars piled with textiles and spices, and rooftop cafés overlooking the old walled city. Jaipur is colour, chaos and royal grandeur in equal measure, and endlessly rewarding for the curious solo traveller.",
    imageUrl: '/cities/jaipur.jpg', currency: 'INR', language: 'Hindi', safetyScore: 7, costLevel: 'BUDGET', timezone: 'Asia/Kolkata', published: true },
  { name: 'Udaipur', slug: 'udaipur', countryId: IN, region: 'ASIA',
    description: "The City of Lakes — Rajasthan's most romantic destination, where marble palaces seem to float on shimmering water beneath the Aravalli hills. Udaipur is calmer and gentler than its desert-city cousins, with rooftop restaurants, miniature-painting workshops and sunset boat rides.",
    imageUrl: '/cities/udaipur.jpg', currency: 'INR', language: 'Hindi', safetyScore: 8, costLevel: 'BUDGET', timezone: 'Asia/Kolkata', published: true },
  { name: 'Varanasi', slug: 'varanasi', countryId: IN, region: 'ASIA',
    description: "One of the world's oldest living cities and the spiritual heart of India — a labyrinth of ghats along the Ganges where life, death and devotion play out at dawn. Intense, overwhelming and unforgettable, Varanasi is a profound stop for the reflective solo traveller.",
    imageUrl: '/cities/varanasi.jpg', currency: 'INR', language: 'Hindi', safetyScore: 7, costLevel: 'BUDGET', timezone: 'Asia/Kolkata', published: true },

  // ── Japan ──
  { name: 'Tokyo', slug: 'tokyo', countryId: JP, region: 'ASIA',
    description: "The world's greatest megacity — a dazzling, hyper-efficient collision of neon districts, serene shrines, Michelin-dense dining and pin-drop-quiet backstreets. Tokyo is endlessly safe, navigable and surprising, and arguably the single best big city on earth for solo travellers.",
    imageUrl: '/cities/tokyo.jpg', currency: 'JPY', language: 'Japanese', safetyScore: 10, costLevel: 'MID_RANGE', timezone: 'Asia/Tokyo', published: true },
  { name: 'Osaka', slug: 'osaka', countryId: JP, region: 'ASIA',
    description: "Japan's kitchen and its most easy-going big city — a place that lives to eat, from takoyaki stalls under Dotonbori's neon to counter izakayas where solo diners are always welcome. Friendlier and more freewheeling than Tokyo, Osaka is pure fun.",
    imageUrl: '/cities/osaka.jpg', currency: 'JPY', language: 'Japanese', safetyScore: 10, costLevel: 'MID_RANGE', timezone: 'Asia/Tokyo', published: true },
  { name: 'Nara', slug: 'nara', countryId: JP, region: 'ASIA',
    description: "Japan's first permanent capital and an easy day-or-two from Kyoto and Osaka — a tranquil town of monumental temples, the Great Buddha, and a vast park where wild sika deer bow for crackers. Nara distills centuries of Japanese history into a walkable, peaceful whole.",
    imageUrl: '/cities/nara.jpg', currency: 'JPY', language: 'Japanese', safetyScore: 10, costLevel: 'MID_RANGE', timezone: 'Asia/Tokyo', published: true },

  // ── South Korea ──
  { name: 'Busan', slug: 'busan', countryId: KR, region: 'ASIA',
    description: "Korea's breezy coastal second city — beaches, mountain temples clinging to cliffs, the colourful hillside murals of Gamcheon, and the country's best seafood markets. Relaxed, scenic and walkable, Busan is the perfect counterpoint to Seoul for solo travellers.",
    imageUrl: '/cities/busan.jpg', currency: 'KRW', language: 'Korean', safetyScore: 9, costLevel: 'MID_RANGE', timezone: 'Asia/Seoul', published: true },
  { name: 'Jeju', slug: 'jeju', countryId: KR, region: 'ASIA',
    description: "Korea's volcanic holiday island — a UNESCO wonderland of lava tubes, waterfalls, a dormant crater volcano and coastal trails walked by free-diving haenyeo grandmothers. Jeju is the country's outdoors playground and a gentle, scenic escape for solo travellers.",
    imageUrl: '/cities/jeju.jpg', currency: 'KRW', language: 'Korean', safetyScore: 9, costLevel: 'MID_RANGE', timezone: 'Asia/Seoul', published: true },
  { name: 'Gyeongju', slug: 'gyeongju', countryId: KR, region: 'ASIA',
    description: "The 'museum without walls' — the thousand-year capital of the Silla kingdom, where royal burial mounds, ancient observatories and the sublime Bulguksa temple sit among quiet parks. Gyeongju is Korea's most rewarding historical town and a serene solo-travel base.",
    imageUrl: '/cities/gyeongju.jpg', currency: 'KRW', language: 'Korean', safetyScore: 9, costLevel: 'BUDGET', timezone: 'Asia/Seoul', published: true },
];

async function main() {
  for (const c of cities) {
    const existing = await prisma.city.findUnique({ where: { slug: c.slug } });
    if (existing) { console.log('EXISTS  ', c.name, existing.id); continue; }
    const created = await prisma.city.create({ data: c });
    console.log('CREATED ', c.name.padEnd(10), created.id);
  }
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
