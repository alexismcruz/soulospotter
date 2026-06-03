require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ============================================================================
// CURATED EXPERIENCE PHOTOS
// Real, relevant images for each experience
// ============================================================================

// Using Unsplash's search endpoint for reliable, always-available images
const EXPERIENCE_PHOTOS = {
  // Bali
  "Mount Batur Sunrise Hike": "https://source.unsplash.com/800x600/?mountain,sunrise,hiking",
  "Yoga & Rice Field Sunrise": "https://source.unsplash.com/800x600/?yoga,meditation,nature",
  "Traditional Balinese Cooking": "https://source.unsplash.com/800x600/?balinese,food,cooking",

  // Chiang Mai
  "Thai Cooking Class": "https://source.unsplash.com/800x600/?thai,food,cooking",
  "Muay Thai Boxing Training": "https://source.unsplash.com/800x600/?boxing,training,fitness",
  "Sunrise Temple Photography Walk": "https://source.unsplash.com/800x600/?temple,asia,culture",

  // Hội An
  "Tailor-Made Suit & Dress": "https://source.unsplash.com/800x600/?tailor,sewing,fashion",
  "Lantern Making Workshop": "https://source.unsplash.com/800x600/?lantern,craft,workshop",

  // Kyoto
  "Temple Hopping & Zen Gardens": "https://source.unsplash.com/800x600/?kyoto,temple,zen",
  "Traditional Japanese Tea Ceremony": "https://source.unsplash.com/800x600/?tea,ceremony,japanese",

  // Kathmandu
  "Kathmandu Valley Heritage Walk": "https://source.unsplash.com/800x600/?kathmandu,nepal,culture",
  "Nepalese Cooking Class": "https://source.unsplash.com/800x600/?nepalese,food,curry",

  // Siargao
  "Beginner Surfing Lessons": "https://source.unsplash.com/800x600/?surfing,beach,philippines",
  "Island Hopping Day Tour": "https://source.unsplash.com/800x600/?island,beach,tropical",

  // Seoul
  "K-Culture Workshop (Calligraphy & Makeup)": "https://source.unsplash.com/800x600/?korea,culture,art",
  "Korean Cooking Class & Market Tour": "https://source.unsplash.com/800x600/?korean,food,bibimbap",

  // Melbourne
  "Street Art Laneways Tour": "https://source.unsplash.com/800x600/?street,art,melbourne",
  "Coffee Culture Masterclass": "https://source.unsplash.com/800x600/?coffee,latte,café",

  // Queenstown
  "Adventure Sports Bundle (Bungy & Skydiving)": "https://source.unsplash.com/800x600/?adventure,bungy,extreme",
  "Wine Tasting & Vineyard Tour": "https://source.unsplash.com/800x600/?wine,vineyard,tasting",

  // New York City
  "Street Photography Walk in Manhattan": "https://source.unsplash.com/800x600/?newyork,street,city",
  "Food Tour of Greenwich Village": "https://source.unsplash.com/800x600/?food,restaurant,newyork",

  // Portland
  "Waterfall Hike in Columbia River Gorge": "https://source.unsplash.com/800x600/?waterfall,hiking,nature",
  "Craft Beer Tasting Tour": "https://source.unsplash.com/800x600/?beer,brewery,craft",

  // Mexico City
  "Traditional Mexican Cooking Class": "https://source.unsplash.com/800x600/?mexican,food,tacos",
  "Street Art & Muralism Tour": "https://source.unsplash.com/800x600/?street,art,mural",

  // Medellín
  "Yoga & Meditation Retreat (Morning)": "https://source.unsplash.com/800x600/?yoga,meditation,sunrise",
  "Comuna 13 Graffiti Tour": "https://source.unsplash.com/800x600/?graffiti,street,art",
  "Coffee Farm Tour & Tasting": "https://source.unsplash.com/800x600/?coffee,farm,colombia",

  // Rio de Janeiro
  "Sunrise Hike to Christ the Redeemer": "https://source.unsplash.com/800x600/?rio,christ,mountain",
  "Samba Dancing Workshop": "https://source.unsplash.com/800x600/?samba,dance,brazil",

  // Lisbon
  "Fado Music & Wine Evening": "https://source.unsplash.com/800x600/?fado,music,portugal",
  "Pastry Making Class": "https://source.unsplash.com/800x600/?pastry,baking,dessert",
  "Sunset Sailing Trip on Tagus River": "https://source.unsplash.com/800x600/?sailing,boat,sunset",

  // Barcelona
  "Gaudí & Gothic Quarter Walking Tour": "https://source.unsplash.com/800x600/?barcelona,architecture,gaudi",
  "Tapas Crawl & Local Bars": "https://source.unsplash.com/800x600/?tapas,spanish,food",

  // Berlin
  "Cold War History Bike Tour": "https://source.unsplash.com/800x600/?berlin,history,bike",
  "Street Art & Underground Culture": "https://source.unsplash.com/800x600/?berlin,street,art",

  // Marrakech
  "Medina Street Food Tour": "https://source.unsplash.com/800x600/?moroccan,food,market",
  "Desert Camel Trek Sunset": "https://source.unsplash.com/800x600/?desert,camel,sunset",

  // Tbilisi
  "Georgian Food & Wine Tour": "https://source.unsplash.com/800x600/?georgian,food,wine",
  "Sulphur Bath Experience": "https://source.unsplash.com/800x600/?bath,spa,wellness",

  // Rishikesh
  "Yoga Retreat Package (3 Days)": "https://source.unsplash.com/800x600/?yoga,india,meditation",
  "Ganges River Rafting Adventure": "https://source.unsplash.com/800x600/?rafting,river,adventure",
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
