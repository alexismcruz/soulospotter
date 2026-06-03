require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Self-hosted images under /public/spots/<slug>.jpg
// To refresh any image, replace the file and redeploy.

async function main() {
  console.log("Spot Photo Seed (local paths)");
  const spots = await prisma.spot.findMany({
    where: { published: true },
    select: { id: true, slug: true, imageUrl: true }
  });
  let updated = 0, skipped = 0;
  for (const spot of spots) {
    const url = `/spots/${spot.slug}.jpg`;
    if (spot.imageUrl === url) { skipped++; continue; }
    await prisma.spot.update({ where: { id: spot.id }, data: { imageUrl: url } });
    updated++;
  }
  console.log(`Done. updated=${updated} skipped=${skipped} total=${spots.length}`);
  await prisma.$disconnect();
}
main().catch((e) => { console.error(e); process.exit(1); });
