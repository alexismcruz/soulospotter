const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Check existing regions and countries
  const regions = await prisma.region.findMany({ select: { id: true, slug: true, name: true } });
  console.log('Regions:', regions.map(r => r.slug + ' ' + r.id).join('\n'));

  const countries = await prisma.country.findMany({ select: { id: true, code: true, name: true } });
  console.log('\nCountries:', countries.map(c => c.code + ' ' + c.name + ' ' + c.id).join('\n'));

  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
