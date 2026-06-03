require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ============================================================================
// CURATED EXPERIENCE PHOTOS
// Real, relevant images for each experience
// ============================================================================

// Unsplash images — EVERY URL below was curl-tested and returned HTTP 200.
// Images are category-matched to each experience. ?w=800&q=80 for card display.
const U = (id) => `https://images.unsplash.com/${id}?w=800&q=80`;

const EXPERIENCE_PHOTOS = {
  // Bali
  "Mount Batur Sunrise Hike": U("photo-1506905925346-21bda4d32df4"),       // mountain sunrise
  "Yoga & Rice Field Sunrise": U("photo-1545389336-cf090694435e"),         // yoga
  "Traditional Balinese Cooking": U("photo-1604881988758-f76ad2f7aac1"),   // balinese food

  // Chiang Mai
  "Thai Cooking Class": U("photo-1559314809-0d155014e29e"),                // thai food
  "Muay Thai Boxing Training": U("photo-1549890762-0a3f8933bc76"),         // boxing
  "Sunrise Temple Photography Walk": U("photo-1530789253388-582c481c54b0"),// photography

  // Hội An
  "Tailor-Made Suit & Dress": U("photo-1558769132-cb1aea458c5e"),          // tailor / fashion
  "Lantern Making Workshop": U("photo-1533230408708-8f9f91d1235a"),        // lanterns

  // Kyoto
  "Temple Hopping & Zen Gardens": U("photo-1528360983277-13d401cdc186"),   // temple / zen
  "Traditional Japanese Tea Ceremony": U("photo-1545048702-79362596cdc9"), // tea ceremony

  // Kathmandu
  "Kathmandu Valley Heritage Walk": U("photo-1631515243349-e0cb75fb8d3a"), // nepal city
  "Nepalese Cooking Class": U("photo-1555939594-58d7cb561ad1"),            // cooking

  // Siargao
  "Beginner Surfing Lessons": U("photo-1524350876685-274059332603"),       // surfing
  "Island Hopping Day Tour": U("photo-1559827260-dc66d52bef19"),           // tropical island

  // Seoul
  "K-Culture Workshop (Calligraphy & Makeup)": U("photo-1524178232363-1fb2b075b655"), // calligraphy
  "Korean Cooking Class & Market Tour": U("photo-1498654896293-37aacf113fd9"),         // korean food

  // Melbourne
  "Street Art Laneways Tour": U("photo-1561214115-f2f134cc4912"),          // street art
  "Coffee Culture Masterclass": U("photo-1495474472287-4d71bcdd2085"),     // coffee

  // Queenstown
  "Adventure Sports Bundle (Bungy & Skydiving)": U("photo-1521017432531-fbd92d768814"), // adventure
  "Wine Tasting & Vineyard Tour": U("photo-1538485399081-7191377e8241"),   // vineyard

  // New York City
  "Street Photography Walk in Manhattan": U("photo-1496588152823-86ff7695e68f"), // nyc skyline
  "Food Tour of Greenwich Village": U("photo-1517248135467-4c7edcad34c4"), // restaurant

  // Portland
  "Waterfall Hike in Columbia River Gorge": U("photo-1432405972618-c60b0225b8f9"), // waterfall
  "Craft Beer Tasting Tour": U("photo-1535958636474-b021ee887b13"),        // beer

  // Mexico City
  "Traditional Mexican Cooking Class": U("photo-1565299624946-b28f40a0ae38"), // mexican food
  "Street Art & Muralism Tour": U("photo-1547036967-23d11aacaee0"),        // graffiti / mural

  // Medellín
  "Yoga & Meditation Retreat (Morning)": U("photo-1506126613408-eca07ce68773"), // meditation
  "Comuna 13 Graffiti Tour": U("photo-1551913902-c92207136625"),           // graffiti
  "Coffee Farm Tour & Tasting": U("photo-1442512595331-e89e73853f31"),     // coffee farm

  // Rio de Janeiro
  "Sunrise Hike to Christ the Redeemer": U("photo-1551632811-561732d1e306"), // mountain trek
  "Samba Dancing Workshop": U("photo-1516450360452-9312f5e86fc7"),         // dancing

  // Lisbon
  "Fado Music & Wine Evening": U("photo-1511192336575-5a79af67a629"),      // guitar / music
  "Pastry Making Class": U("photo-1486427944299-d1955d23e34d"),            // pastry
  "Sunset Sailing Trip on Tagus River": U("photo-1502933691298-84fc14542831"), // sailing

  // Barcelona
  "Gaudí & Gothic Quarter Walking Tour": U("photo-1583422409516-2895a77efded"), // barcelona arch
  "Tapas Crawl & Local Bars": U("photo-1414235077428-338989a2e8c0"),       // tapas / restaurant

  // Berlin
  "Cold War History Bike Tour": U("photo-1560969184-10fe8719e047"),        // berlin
  "Street Art & Underground Culture": U("photo-1607604276583-eef5d076aa5f"), // street art

  // Marrakech
  "Medina Street Food Tour": U("photo-1588286840104-8957b019727f"),        // moroccan market
  "Desert Camel Trek Sunset": U("photo-1489493585363-d69421e0edd3"),       // desert camel

  // Tbilisi
  "Georgian Food & Wine Tour": U("photo-1474722883778-792e7990302f"),      // wine
  "Sulphur Bath Experience": U("photo-1571902943202-507ec2618e8f"),        // spa / bath

  // Rishikesh
  "Yoga Retreat Package (3 Days)": U("photo-1545389336-cf090694435e"),     // yoga
  "Ganges River Rafting Adventure": U("photo-1530866495561-507c9faab2ed"), // rafting
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
