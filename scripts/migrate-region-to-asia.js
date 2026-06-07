/**
 * Merges SOUTHEAST_ASIA, EAST_ASIA, and SOUTH_ASIA into a single ASIA region.
 * 1. Renames the SOUTHEAST_ASIA enum value to ASIA in Postgres
 * 2. Updates all City and Country records using EAST_ASIA or SOUTH_ASIA → ASIA
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Rename the enum value in Postgres (safe — no data loss)
  await prisma.$executeRawUnsafe(`ALTER TYPE "Region" RENAME VALUE 'SOUTHEAST_ASIA' TO 'ASIA'`);
  console.log('✅ Renamed SOUTHEAST_ASIA → ASIA in DB enum');

  // 2. Migrate City records
  const citiesEast = await prisma.$executeRawUnsafe(
    `UPDATE "City" SET region = 'ASIA' WHERE region = 'EAST_ASIA'`
  );
  console.log(`✅ Updated ${citiesEast} City rows: EAST_ASIA → ASIA`);

  const citiesSouth = await prisma.$executeRawUnsafe(
    `UPDATE "City" SET region = 'ASIA' WHERE region = 'SOUTH_ASIA'`
  );
  console.log(`✅ Updated ${citiesSouth} City rows: SOUTH_ASIA → ASIA`);

  // 3. Migrate Country records
  const countriesEast = await prisma.$executeRawUnsafe(
    `UPDATE "Country" SET region = 'ASIA' WHERE region = 'EAST_ASIA'`
  );
  console.log(`✅ Updated ${countriesEast} Country rows: EAST_ASIA → ASIA`);

  const countriesSouth = await prisma.$executeRawUnsafe(
    `UPDATE "Country" SET region = 'ASIA' WHERE region = 'SOUTH_ASIA'`
  );
  console.log(`✅ Updated ${countriesSouth} Country rows: SOUTH_ASIA → ASIA`);

  // Verify
  const counts = await prisma.$queryRawUnsafe(
    `SELECT region, COUNT(*) as count FROM "City" GROUP BY region ORDER BY region`
  );
  console.log('\nCity region distribution after migration:');
  for (const row of counts) console.log(`  ${row.region}: ${row.count}`);

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
