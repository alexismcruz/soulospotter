// Delete all Hanoi spots so we can re-seed with correct encoding
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CITY_ID = 'cmpqw79xo00g6vi1oay3yxdiy'; // Hanoi

async function main() {
  // Delete tags first (relation)
  const spots = await prisma.spot.findMany({ where: { cityId: CITY_ID }, select: { id: true, name: true } });
  console.log(`Found ${spots.length} Hanoi spots to delete`);
  for (const s of spots) {
    await prisma.spotTag.deleteMany({ where: { spotId: s.id } });
    await prisma.spot.delete({ where: { id: s.id } });
    console.log('Deleted:', s.name);
  }
  console.log('Done. Ready to re-seed.');
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
