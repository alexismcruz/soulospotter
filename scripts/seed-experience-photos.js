require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ============================================================================
// CURATED EXPERIENCE PHOTOS
// Real, relevant images for each experience
// ============================================================================

// Proven working Unsplash image URLs
const EXPERIENCE_PHOTOS = {
  // Bali
  "Mount Batur Sunrise Hike": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85",
  "Yoga & Rice Field Sunrise": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=85",
  "Traditional Balinese Cooking": "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=85",

  // Chiang Mai
  "Thai Cooking Class": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85",
  "Muay Thai Boxing Training": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=85",
  "Sunrise Temple Photography Walk": "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=85",

  // Hội An
  "Tailor-Made Suit & Dress": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85",
  "Lantern Making Workshop": "https://images.unsplash.com/photo-1488815154555-75e2ee2a8d6d?w=800&q=85",

  // Kyoto
  "Temple Hopping & Zen Gardens": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=85",
  "Traditional Japanese Tea Ceremony": "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=85",

  // Kathmandu
  "Kathmandu Valley Heritage Walk": "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=85",
  "Nepalese Cooking Class": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85",

  // Siargao
  "Beginner Surfing Lessons": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=85",
  "Island Hopping Day Tour": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85",

  // Seoul
  "K-Culture Workshop (Calligraphy & Makeup)": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=85",
  "Korean Cooking Class & Market Tour": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85",

  // Melbourne
  "Street Art Laneways Tour": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=85",
  "Coffee Culture Masterclass": "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=85",

  // Queenstown
  "Adventure Sports Bundle (Bungy & Skydiving)": "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=85",
  "Wine Tasting & Vineyard Tour": "https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=800&q=85",

  // New York City
  "Street Photography Walk in Manhattan": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=85",
  "Food Tour of Greenwich Village": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85",

  // Portland
  "Waterfall Hike in Columbia River Gorge": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85",
  "Craft Beer Tasting Tour": "https://images.unsplash.com/photo-1608270861620-7c0f60d2e64f?w=800&q=85",

  // Mexico City
  "Traditional Mexican Cooking Class": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85",
  "Street Art & Muralism Tour": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=85",

  // Medellín
  "Yoga & Meditation Retreat (Morning)": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=85",
  "Comuna 13 Graffiti Tour": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=85",
  "Coffee Farm Tour & Tasting": "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=85",

  // Rio de Janeiro
  "Sunrise Hike to Christ the Redeemer": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=85",
  "Samba Dancing Workshop": "https://images.unsplash.com/photo-1544611180-5658e5a9dd63?w=800&q=85",

  // Lisbon
  "Fado Music & Wine Evening": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85",
  "Pastry Making Class": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=85",
  "Sunset Sailing Trip on Tagus River": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85",

  // Barcelona
  "Gaudí & Gothic Quarter Walking Tour": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85",
  "Tapas Crawl & Local Bars": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85",

  // Berlin
  "Cold War History Bike Tour": "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=85",
  "Street Art & Underground Culture": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=85",

  // Marrakech
  "Medina Street Food Tour": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85",
  "Desert Camel Trek Sunset": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=85",

  // Tbilisi
  "Georgian Food & Wine Tour": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85",
  "Sulphur Bath Experience": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=85",

  // Rishikesh
  "Yoga Retreat Package (3 Days)": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=85",
  "Ganges River Rafting Adventure": "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=85",
};

async function main() {
  console.log("🌱 Experience Photo Seed Script");
  console.log("================================\n");

  const experiences = await prisma.experience.findMany({
    select: { id: true, name: true, photoUrl: true },
    orderBy: { createdAt: "asc" },
  });

  console.log(`📸 Found ${experiences.length} experiences\n`);

  let stats = {
    total: experiences.length,
    updated: 0,
    skipped: 0,
  };

  for (const exp of experiences) {
    const newPhotoUrl = EXPERIENCE_PHOTOS[exp.name];

    if (!newPhotoUrl) {
      console.log(`  ⚠️  ${exp.name}: No curated photo available`);
      stats.skipped++;
      continue;
    }

    // Skip if photo is already set and it's the same
    if (exp.photoUrl === newPhotoUrl) {
      stats.skipped++;
      continue;
    }

    await prisma.experience.update({
      where: { id: exp.id },
      data: { photoUrl: newPhotoUrl },
    });

    stats.updated++;
    console.log(`  ✅ ${exp.name}`);
  }

  console.log(`\n✅ Seed Complete!`);
  console.log(`   📸 Updated: ${stats.updated}`);
  console.log(`   ⏭️  Skipped: ${stats.skipped}`);
  console.log(`   📊 Total: ${stats.total}\n`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("❌ Error:", e.message);
  process.exit(1);
});
