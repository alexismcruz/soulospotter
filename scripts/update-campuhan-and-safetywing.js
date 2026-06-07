const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Update Campuhan Ridge Walk website
  const spot = await prisma.spot.findFirst({ where: { slug: 'campuhan-ridge-walk' } });
  if (spot) {
    await prisma.spot.update({
      where: { id: spot.id },
      data: { website: 'https://campuhanridgewalk.com/' },
    });
    console.log('Updated Campuhan Ridge Walk website:', spot.id);
  } else {
    console.log('Campuhan Ridge Walk not found by slug, searching by name...');
    const byName = await prisma.spot.findFirst({ where: { name: { contains: 'Campuhan' } } });
    if (byName) {
      await prisma.spot.update({
        where: { id: byName.id },
        data: { website: 'https://campuhanridgewalk.com/' },
      });
      console.log('Updated:', byName.name, byName.id);
    } else {
      console.log('Not found.');
    }
  }
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
