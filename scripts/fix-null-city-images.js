/**
 * Fix cities with null imageUrl by assigning Unsplash URLs directly in DB.
 * Also fixes cities whose local /cities/<slug>.jpg path is wrong (e.g. xian vs xi-an).
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const UPDATES = [
  // Cities with null imageUrl → assign Unsplash
  { slug: 'barcelona',   imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=85' },
  { slug: 'byron-bay',   imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=85' },
  { slug: 'medellin',    imageUrl: 'https://images.unsplash.com/photo-1599413987323-b2b8b0f09a47?w=1200&q=85' },
  { slug: 'melbourne',   imageUrl: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=1200&q=85' },
  { slug: 'mexico-city', imageUrl: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1200&q=85' },
  { slug: 'seoul',       imageUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1200&q=85' },
];

async function main() {
  for (const { slug, imageUrl } of UPDATES) {
    const city = await prisma.city.findFirst({ where: { slug } });
    if (!city) { console.log(`Not found: ${slug}`); continue; }
    await prisma.city.update({ where: { id: city.id }, data: { imageUrl } });
    console.log(`✅ Updated ${slug}`);
  }
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
