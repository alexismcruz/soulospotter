const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const cities = await prisma.city.findMany({ select: { id: true, name: true, slug: true }, orderBy: { name: 'asc' } });
  cities.forEach(c => console.log(c.id, c.slug, c.name));
  await prisma.$disconnect();
}
main().catch(console.error);
