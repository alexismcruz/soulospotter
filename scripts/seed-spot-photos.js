require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Curated Unsplash photos per category (more reliable than dynamic search)
const CATEGORY_PHOTOS = {
  ACCOMMODATION: [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=85",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=85",
  ],
  CAFE: [
    "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=85",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=85",
  ],
  COWORKING: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=85",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=85",
  ],
  FOOD: [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=85",
    "https://images.unsplash.com/photo-1504674900874-5de63a35b93d?w=600&q=85",
  ],
  WELLNESS: [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=85",
    "https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=600&q=85",
  ],
  COMMUNITY: [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=85",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=85",
  ],
  NATURE: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=85",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=85",
  ],
  CULTURE: [
    "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=85",
    "https://images.unsplash.com/photo-1578926078328-123456789012?w=600&q=85",
  ],
  NIGHTLIFE: [
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=85",
    "https://images.unsplash.com/photo-1598487138258-8dac1a7abc21?w=600&q=85",
  ],
  TRANSPORT: [
    "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=85",
    "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=85",
  ],
};

function getPhotoForSpot(spotName, category) {
  const photos = CATEGORY_PHOTOS[category] || CATEGORY_PHOTOS.ACCOMMODATION;
  // Deterministic selection based on spot name (same spot always gets same image)
  const index = spotName.charCodeAt(0) % photos.length;
  return photos[index];
}

async function main() {
  console.log("Fetching all spots...");
  const spots = await prisma.spot.findMany({
    where: { published: true },
    select: { id: true, name: true, category: true },
  });

  console.log(`\nAssigning photos to ${spots.length} spots...`);
  let updated = 0;

  for (const spot of spots) {
    const photoUrl = getPhotoForSpot(spot.name, spot.category);
    await prisma.spot.update({
      where: { id: spot.id },
      data: { imageUrl: photoUrl },
    });
    updated++;
    if (updated % 10 === 0) process.stdout.write(`✓`);
  }

  console.log(`\n\n✅ Updated ${updated} spots with category-matched photos!`);

  // Verify
  const withPhotos = await prisma.spot.count({
    where: { published: true, imageUrl: { not: null } },
  });
  console.log(`📊 Total spots with photos: ${withPhotos}/${spots.length}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
