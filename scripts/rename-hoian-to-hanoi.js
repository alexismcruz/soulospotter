const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Rename Hội An → Hanoi, update slug too
  const updated = await prisma.city.update({
    where: { id: 'cmpqw79xo00g6vi1oay3yxdiy' },
    data: {
      name: 'Hanoi',
      slug: 'hanoi',
    },
  });
  console.log('Renamed:', updated.name, '| slug:', updated.slug);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
