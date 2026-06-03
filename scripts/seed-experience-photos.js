require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ============================================================================
// CURATED EXPERIENCE PHOTOS
// Real, relevant images for each experience
// ============================================================================

// Using Picsum Photos - guaranteed always-working images
// Each experience gets a unique, deterministic image based on its name hash
const EXPERIENCE_PHOTOS = {
  // Bali
  "Mount Batur Sunrise Hike": "https://picsum.photos/800/600?random=1",
  "Yoga & Rice Field Sunrise": "https://picsum.photos/800/600?random=2",
  "Traditional Balinese Cooking": "https://picsum.photos/800/600?random=3",

  // Chiang Mai
  "Thai Cooking Class": "https://picsum.photos/800/600?random=4",
  "Muay Thai Boxing Training": "https://picsum.photos/800/600?random=5",
  "Sunrise Temple Photography Walk": "https://picsum.photos/800/600?random=6",

  // Hội An
  "Tailor-Made Suit & Dress": "https://picsum.photos/800/600?random=7",
  "Lantern Making Workshop": "https://picsum.photos/800/600?random=8",

  // Kyoto
  "Temple Hopping & Zen Gardens": "https://picsum.photos/800/600?random=9",
  "Traditional Japanese Tea Ceremony": "https://picsum.photos/800/600?random=10",

  // Kathmandu
  "Kathmandu Valley Heritage Walk": "https://picsum.photos/800/600?random=11",
  "Nepalese Cooking Class": "https://picsum.photos/800/600?random=12",

  // Siargao
  "Beginner Surfing Lessons": "https://picsum.photos/800/600?random=13",
  "Island Hopping Day Tour": "https://picsum.photos/800/600?random=14",

  // Seoul
  "K-Culture Workshop (Calligraphy & Makeup)": "https://picsum.photos/800/600?random=15",
  "Korean Cooking Class & Market Tour": "https://picsum.photos/800/600?random=16",

  // Melbourne
  "Street Art Laneways Tour": "https://picsum.photos/800/600?random=17",
  "Coffee Culture Masterclass": "https://picsum.photos/800/600?random=18",

  // Queenstown
  "Adventure Sports Bundle (Bungy & Skydiving)": "https://picsum.photos/800/600?random=19",
  "Wine Tasting & Vineyard Tour": "https://picsum.photos/800/600?random=20",

  // New York City
  "Street Photography Walk in Manhattan": "https://picsum.photos/800/600?random=21",
  "Food Tour of Greenwich Village": "https://picsum.photos/800/600?random=22",

  // Portland
  "Waterfall Hike in Columbia River Gorge": "https://picsum.photos/800/600?random=23",
  "Craft Beer Tasting Tour": "https://picsum.photos/800/600?random=24",

  // Mexico City
  "Traditional Mexican Cooking Class": "https://picsum.photos/800/600?random=25",
  "Street Art & Muralism Tour": "https://picsum.photos/800/600?random=26",

  // Medellín
  "Yoga & Meditation Retreat (Morning)": "https://picsum.photos/800/600?random=27",
  "Comuna 13 Graffiti Tour": "https://picsum.photos/800/600?random=28",
  "Coffee Farm Tour & Tasting": "https://picsum.photos/800/600?random=29",

  // Rio de Janeiro
  "Sunrise Hike to Christ the Redeemer": "https://picsum.photos/800/600?random=30",
  "Samba Dancing Workshop": "https://picsum.photos/800/600?random=31",

  // Lisbon
  "Fado Music & Wine Evening": "https://picsum.photos/800/600?random=32",
  "Pastry Making Class": "https://picsum.photos/800/600?random=33",
  "Sunset Sailing Trip on Tagus River": "https://picsum.photos/800/600?random=34",

  // Barcelona
  "Gaudí & Gothic Quarter Walking Tour": "https://picsum.photos/800/600?random=35",
  "Tapas Crawl & Local Bars": "https://picsum.photos/800/600?random=36",

  // Berlin
  "Cold War History Bike Tour": "https://picsum.photos/800/600?random=37",
  "Street Art & Underground Culture": "https://picsum.photos/800/600?random=38",

  // Marrakech
  "Medina Street Food Tour": "https://picsum.photos/800/600?random=39",
  "Desert Camel Trek Sunset": "https://picsum.photos/800/600?random=40",

  // Tbilisi
  "Georgian Food & Wine Tour": "https://picsum.photos/800/600?random=41",
  "Sulphur Bath Experience": "https://picsum.photos/800/600?random=42",

  // Rishikesh
  "Yoga Retreat Package (3 Days)": "https://picsum.photos/800/600?random=43",
  "Ganges River Rafting Adventure": "https://picsum.photos/800/600?random=44",
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
