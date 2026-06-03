require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ============================================================================
// CURATED EXPERIENCE PHOTOS
// Real, relevant images for each experience
// ============================================================================

const EXPERIENCE_PHOTOS = {
  // Bali
  "Mount Batur Sunrise Hike": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85", // Mountain sunrise
  "Yoga & Rice Field Sunrise": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=85", // Yoga in nature
  "Traditional Balinese Cooking": "https://images.unsplash.com/photo-1604329857912-b3f2313f6efb?w=800&q=85", // Balinese food/cooking

  // Chiang Mai
  "Thai Cooking Class": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85", // Cooking
  "Muay Thai Boxing Training": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=85", // Fitness/Training
  "Sunrise Temple Photography Walk": "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=85", // Temple/Culture

  // Hội An
  "Tailor-Made Suit & Dress": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=85", // Tailor shop/sewing
  "Lantern Making Workshop": "https://images.unsplash.com/photo-1488815154555-75e2ee2a8d6d?w=800&q=85", // Lantern/craft

  // Kyoto
  "Temple Hopping & Zen Gardens": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=85", // Kyoto temples
  "Traditional Japanese Tea Ceremony": "https://images.unsplash.com/photo-1597318301227-c92c0e9ac1f9?w=800&q=85", // Tea ceremony

  // Kathmandu
  "Kathmandu Valley Heritage Walk": "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=85", // Cultural walk
  "Nepalese Cooking Class": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85", // Cooking

  // Siargao
  "Beginner Surfing Lessons": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=85", // Surfing
  "Island Hopping Day Tour": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85", // Beach/Island

  // Seoul
  "K-Culture Workshop (Calligraphy & Makeup)": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=85", // Art/Culture
  "Korean Cooking Class & Market Tour": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85", // Cooking

  // Melbourne
  "Street Art Laneways Tour": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=85", // Street art
  "Coffee Culture Masterclass": "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=85", // Coffee

  // Queenstown
  "Adventure Sports Bundle (Bungy & Skydiving)": "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=85", // Adventure
  "Wine Tasting & Vineyard Tour": "https://images.unsplash.com/photo-1608270861620-7c0f60d2e64f?w=800&q=85", // Wine tasting

  // New York City
  "Street Photography Walk in Manhattan": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=85", // NYC street
  "Food Tour of Greenwich Village": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85", // Food tour

  // Portland
  "Waterfall Hike in Columbia River Gorge": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85", // Hiking
  "Craft Beer Tasting Tour": "https://images.unsplash.com/photo-1608270861620-7c0f60d2e64f?w=800&q=85", // Beer tasting

  // Mexico City
  "Traditional Mexican Cooking Class": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85", // Cooking
  "Street Art & Muralism Tour": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=85", // Street art

  // Medellín
  "Yoga & Meditation Retreat (Morning)": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=85", // Yoga
  "Comuna 13 Graffiti Tour": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=85", // Street art
  "Coffee Farm Tour & Tasting": "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=85", // Coffee

  // Rio de Janeiro
  "Sunrise Hike to Christ the Redeemer": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=85", // Rio landscape
  "Samba Dancing Workshop": "https://images.unsplash.com/photo-1544611180-5658e5a9dd63?w=800&q=85", // Dancing

  // Lisbon
  "Fado Music & Wine Evening": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85", // Music/Wine
  "Pastry Making Class": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=85", // Pastry
  "Sunset Sailing Trip on Tagus River": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85", // Sailing/Water

  // Barcelona
  "Gaudí & Gothic Quarter Walking Tour": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85", // Architecture
  "Tapas Crawl & Local Bars": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85", // Food

  // Berlin
  "Cold War History Bike Tour": "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=85", // History/Culture
  "Street Art & Underground Culture": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=85", // Street art

  // Marrakech
  "Medina Street Food Tour": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85", // Food
  "Desert Camel Trek Sunset": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=85", // Desert

  // Tbilisi
  "Georgian Food & Wine Tour": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85", // Food/Wine
  "Sulphur Bath Experience": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=85", // Wellness/Bath

  // Rishikesh
  "Yoga Retreat Package (3 Days)": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=85", // Yoga
  "Ganges River Rafting Adventure": "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=85", // Adventure/Water
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
