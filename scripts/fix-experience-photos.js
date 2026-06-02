require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Verified working Unsplash photos per category
const CATEGORY_PHOTOS = {
  FOOD_DRINK:           "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  OUTDOOR_ADVENTURE:    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  ARTS_CULTURE:         "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=600&q=80",
  WELLNESS_MINDFULNESS: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
  NIGHTLIFE_SOCIAL:     "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
  DAY_TRIPS:            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
  PHOTOGRAPHY_WALKS:    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
  FITNESS_SPORTS:       "https://images.unsplash.com/photo-1549719386-74dfaf8c7cb2?w=600&q=80",
};

// Per-experience overrides for more specific photos
const OVERRIDES = {
  "lisbon-fado-music-and-wine-evening":            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
  "bali-mount-batur-sunrise-hike":                 "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  "kyoto-traditional-japanese-tea-ceremony":       "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
  "chiang-mai-thai-cooking-class":                 "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  "marrakech-medina-street-food-tour":             "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",
  "rio-de-janeiro-samba-dancing-workshop":         "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80",
  "queenstown-adventure-sports-bundle-bungy-and-skydi": "https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=80",
  "berlin-cold-war-history-bike-tour":             "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=80",
  "siargao-beginner-surfing-lessons":              "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80",
  "rishikesh-yoga-retreat-package-3-days":         "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  "tbilisi-sulphur-bath-experience":               "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&q=80",
  "melbourne-street-art-laneways-tour":            "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=600&q=80",
  "seoul-k-culture-workshop-calligraphy-and-makeup": "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&q=80",
};

async function main() {
  const experiences = await prisma.experience.findMany({
    select: { id: true, slug: true, category: true },
  });

  let count = 0;
  for (const exp of experiences) {
    const photo = OVERRIDES[exp.slug] || CATEGORY_PHOTOS[exp.category];
    if (!photo) { console.log("No photo for:", exp.slug); continue; }
    await prisma.experience.update({ where: { id: exp.id }, data: { photoUrl: photo } });
    console.log("✅", exp.slug.substring(0, 55));
    count++;
  }

  console.log("\nDone —", count, "experiences updated");
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
