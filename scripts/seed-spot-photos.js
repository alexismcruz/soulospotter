require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fallback category-specific photos (smart defaults)
const CATEGORY_FALLBACKS = {
  ACCOMMODATION: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=85",
  CAFE: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=85",
  COWORKING: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=85",
  FOOD: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=85",
  WELLNESS: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=85",
  COMMUNITY: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=85",
  NATURE: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=85",
  CULTURE: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=85",
  NIGHTLIFE: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=85",
  TRANSPORT: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=85",
};

function getPhotoForSpot(spotName, category) {
  // Return category fallback for now
  // TODO: When Google Places API is enabled, fetch real venue photos
  return CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.ACCOMMODATION;
}

async function main() {
  console.log("Assigning category-matched photos to all spots...");
  const spots = await prisma.spot.findMany({
    where: { published: true },
    select: {
      id: true,
      name: true,
      category: true,
    },
  });

  console.log(`Processing ${spots.length} spots...\n`);
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
  console.log(`\n⚠️  To enable real venue photos from Google Places:`);
  console.log(`   1. Go to https://console.cloud.google.com/`);
  console.log(`   2. Enable "Places API" for your project`);
  console.log(`   3. Re-run this script with Places API enabled`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
