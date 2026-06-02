require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Category-based Unsplash photo library (each spot gets matched by name keywords)
const PHOTO_LIBRARY = {
  // Accommodation / Hostels
  "hostel|hotel|resort|airbnb|guesthouse|lodge":
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=85",
  // Cafes / Coffee
  "cafe|coffee|brew|roaster|espresso":
    "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=85",
  // Coworking
  "coworking|work|workspace|office|dojo":
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=85",
  // Food / Restaurants
  "restaurant|food|bakery|nasi|khao|eat|market|eatery":
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=85",
  // Wellness / Spa / Yoga
  "massage|spa|yoga|wellness|meditat":
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=85",
  // Temples / Spiritual / Historical
  "temple|shrine|spiritual|pagoda|stupa|meditat|zen":
    "https://images.unsplash.com/photo-1516552543322-4e7f77cefccc?w=600&q=85",
  // Nature / Parks / Hiking
  "park|trail|hiking|forest|waterfall|nature|mountain|grove|lake":
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=85",
  // Beaches
  "beach|coast|swim|ocean|bay":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85",
  // Street Art / Culture / Museums
  "art|gallery|mural|museum|gallery|cultural|street art":
    "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=85",
  // Markets / Shopping
  "market|bazar|bazaar|shopping|shop":
    "https://images.unsplash.com/photo-1488815154555-75e2ee2a8d6d?w=600&q=85",
  // Bars / Nightlife
  "bar|night|pub|nightlife|club":
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=85",
  // Fitness / Sports
  "gym|fitness|athletic|sport|boxing":
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=85",
  // Streets / Walking routes
  "alley|street|walk|route|district":
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=85",
};

// Find best matching photo for a spot based on its name
function getPhotoForSpot(spotName) {
  const nameLower = spotName.toLowerCase();
  for (const [keywords, photoUrl] of Object.entries(PHOTO_LIBRARY)) {
    const keywordList = keywords.split("|");
    if (keywordList.some((kw) => nameLower.includes(kw))) {
      return photoUrl;
    }
  }
  // Fallback to generic discovery/travel
  return "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=85";
}

async function main() {
  console.log("Fetching all spots...");
  const spots = await prisma.spot.findMany({
    where: { published: true },
    select: { id: true, name: true },
  });

  console.log(`\nAssigning photos to ${spots.length} spots...`);
  let updated = 0;

  for (const spot of spots) {
    const photoUrl = getPhotoForSpot(spot.name);
    await prisma.spot.update({
      where: { id: spot.id },
      data: { imageUrl: photoUrl },
    });
    updated++;
    if (updated % 10 === 0) process.stdout.write(`✓`);
  }

  console.log(`\n\n✅ Updated ${updated} spots with relevant thumbnails!`);

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
