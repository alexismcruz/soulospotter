const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cities = await prisma.city.findMany({
    where: { published: true },
    select: { slug: true, name: true, spots: { select: { slug: true, category: true, name: true, imageUrl: true } } },
    orderBy: { slug: 'asc' },
  });
  for (const c of cities) {
    for (const s of c.spots) {
      console.log([c.slug, s.category, s.slug, s.name, s.imageUrl || ''].join('\t'));
    }
  }
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
