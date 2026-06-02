require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ============================================================================
// PHOTO SOURCES - easily extensible for new data sources
// ============================================================================

// Curated venue photos (high-quality, manually verified)
const CURATED_PHOTOS = {
  "A Brasileira": "https://lh5.googleusercontent.com/p/AF1QipNV0E4F_-ZfQxWpKXvhZYdz5bQxU1-q5vFpQBU=w600-h400-k-no",
  "Pergamino Café": "https://lh5.googleusercontent.com/p/AF1QipO7a_6v5PxQqQCvh3e3YBYbXvH6lXvH5vH5vH5=w600-h400-k-no",
  "Canggu Social": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=85",
};

// Category fallbacks (smart defaults when real photos aren't available)
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

// ============================================================================
// PHOTO FETCHING STRATEGIES (extensible for new APIs)
// ============================================================================

async function tryGooglePlacesAPI(spotName, address, city) {
  // TODO: Implement when API key restrictions are resolved
  // https://developers.google.com/maps/documentation/places/web-service/text-search
  return null;
}

async function getPhotoForSpot(spotName, category) {
  // Strategy 1: Check curated photos first (manually verified)
  if (CURATED_PHOTOS[spotName]) {
    return { url: CURATED_PHOTOS[spotName], source: "curated" };
  }

  // Strategy 2: Try Google Places API (when enabled)
  // const googlePhoto = await tryGooglePlacesAPI(spotName, address, city);
  // if (googlePhoto) return { url: googlePhoto, source: "google-places" };

  // Strategy 3: Fall back to category photo
  const categoryPhoto = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.ACCOMMODATION;
  return { url: categoryPhoto, source: "category-fallback" };
}

// ============================================================================
// MAIN SEED LOGIC
// ============================================================================

async function main() {
  console.log("🌱 SouloSpotter Data Seed Script");
  console.log("================================\n");

  const spots = await prisma.spot.findMany({
    where: { published: true },
    select: {
      id: true,
      name: true,
      category: true,
      address: true,
      imageUrl: true,
    },
    orderBy: { createdAt: "asc" },
  });

  console.log(`📍 Found ${spots.length} published spots\n`);

  let stats = {
    total: spots.length,
    curated: 0,
    categoryFallback: 0,
    skipped: 0,
    updated: 0,
  };

  for (const spot of spots) {
    const photo = await getPhotoForSpot(spot.name, spot.category);

    // Skip if already has a photo and we're using fallback
    if (spot.imageUrl && photo.source === "category-fallback") {
      stats.skipped++;
      continue;
    }

    await prisma.spot.update({
      where: { id: spot.id },
      data: { imageUrl: photo.url },
    });

    stats.updated++;
    if (photo.source === "curated") {
      stats.curated++;
    } else if (photo.source === "category-fallback") {
      stats.categoryFallback++;
    }

    process.stdout.write(".");
  }

  console.log(`\n\n✅ Seed Complete!`);
  console.log(`   📸 Curated photos: ${stats.curated}`);
  console.log(`   🎨 Category fallback: ${stats.categoryFallback}`);
  console.log(`   ⏭️  Skipped (already have photos): ${stats.skipped}`);
  console.log(`   ✏️  Updated: ${stats.updated}\n`);

  console.log(`📋 How to expand this script:`);
  console.log(`   1. Add more CURATED_PHOTOS with venue names`);
  console.log(`   2. Enable Google Places API to fetch real venue photos`);
  console.log(`   3. Add other data sources (hours, ratings, reviews)\n`);

  console.log(`🔗 Quick Links:`);
  console.log(`   • Enable Places API: https://console.cloud.google.com/`);
  console.log(`   • Seed documentation: Check README.md\n`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("❌ Error:", e.message);
  process.exit(1);
});
