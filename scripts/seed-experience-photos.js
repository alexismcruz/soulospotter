require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ============================================================================
// EXPERIENCE PHOTOS — self-hosted under /public/experiences/<slug>.jpg
// Images are downloaded, cropped to 3:2, compressed, and committed to the repo
// so they ALWAYS load and ALWAYS match the experience (no third-party runtime
// dependency). To refresh an image, replace the file at public/experiences/.
// ============================================================================

async function main() {
  console.log("Experience Photo Seed (local paths)");
  const experiences = await prisma.experience.findMany({ select: { id: true, name: true, slug: true, photoUrl: true } });
  let updated = 0, skipped = 0;
  for (const exp of experiences) {
    const url = `/experiences/${exp.slug}.jpg`;
    if (exp.photoUrl === url) { skipped++; continue; }
    await prisma.experience.update({ where: { id: exp.id }, data: { photoUrl: url } });
    updated++;
  }
  console.log(`Done. updated=${updated} skipped=${skipped} total=${experiences.length}`);
  await prisma.$disconnect();
}
main().catch((e) => { console.error(e); process.exit(1); });
