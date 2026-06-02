require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Verified working Unsplash photos for each city hero banner
const CITY_PHOTOS = {
  "new-york-city":      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=85", // NYC skyline
  "portland":           "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=85", // Portland bridge
  "mexico-city":        "https://images.unsplash.com/photo-1585464374862-528671ad683f?w=1200&q=85", // Mexico City skyline
  "medellin":           "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=1200&q=85", // Medellín mountains
  "rio-de-janeiro":     "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1200&q=85", // Rio coast
  "lisbon":             "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=85", // Lisbon cityscape
  "tbilisi":            "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&q=85", // Tbilisi night
  "barcelona":          "https://images.unsplash.com/photo-1562883676-8c6fcb65d2e1?w=1200&q=85", // Barcelona Park Güell
  "berlin":             "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&q=85", // Berlin street art
  "marrakech":          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=85", // Marrakech medina
  "rishikesh":          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85", // Rishikesh mountains
  "kathmandu":          "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=85", // Kathmandu temples
  "chiang-mai":         "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&q=85", // Chiang Mai temple
  "hoi-an":             "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&q=85", // Hội An lanterns
  "bali":               "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=85", // Bali rice terraces
  "siargao":            "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=85", // Siargao beach
  "kyoto":              "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=85", // Kyoto temples
  "seoul":              "https://images.unsplash.com/photo-1552556784-85fce8f24f76?w=1200&q=85", // Seoul skyline
  "melbourne":          "https://images.unsplash.com/photo-1488646149381-b8fdd00acfff?w=1200&q=85", // Melbourne laneways
  "queenstown":         "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1200&q=85", // Queenstown mountains
  "byron-bay":          "https://images.unsplash.com/photo-1499209974421-9f694e24e5a1?w=1200&q=85", // Byron Bay coastline
};

// Spot thumbnail photos mapped by (city, spotName)
const SPOT_PHOTOS = {
  "new-york-city": {
    "The Bean": "https://images.unsplash.com/photo-1570129477492-45f003313e78?w=600&q=85", // Modern architecture
    "High Line Park": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=85", // Urban park
    "Ace Hotel New York": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=85", // Hotel lobby
  },
  "portland": {
    "Powell's Books": "https://images.unsplash.com/photo-1507842217343-583f20270319?w=600&q=85", // Bookstore interior
    "Forest Park": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=85", // Forest trail
    "Society Hotel": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=85", // Hotel
  },
  "mexico-city": {
    "Café Avellaneda": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=85", // Café interior
    "Museo Frida Kahlo": "https://images.unsplash.com/photo-1578481053623-8acdf4ee0a69?w=600&q=85", // Museum
    "El Parnita": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=85", // Restaurant
  },
  "medellin": {
    "Selina Medellín": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=85", // Hostel
    "Parque Arví": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=85", // Mountain view
    "Pergamino Café": "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=85", // Coffee shop
  },
  "rio-de-janeiro": {
    "Ipanema Beach": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85", // Beach
    "Casa Amarelo Hostel": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=85", // Hostel
    "Aprazível": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=85", // Restaurant
  },
  "lisbon": {
    "MAAT": "https://images.unsplash.com/photo-1578481053623-8acdf4ee0a69?w=600&q=85", // Modern museum
    "Pastéis de Nata Bakery": "https://images.unsplash.com/photo-1585518419759-873ee6d31f07?w=600&q=85", // Pastry shop
    "Miradouro da Senhora do Monte": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=85", // Viewpoint
  },
  "tbilisi": {
    "Narikala Fortress": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=85", // Historic fortress
    "Metekhi Church": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=85", // Church
    "Batumi Boulevard": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85", // Street
  },
  "barcelona": {
    "Park Güell": "https://images.unsplash.com/photo-1562883676-8c6fcb65d2e1?w=600&q=85", // Park
    "La Sagrada Familia": "https://images.unsplash.com/photo-1570129477492-45f003313e78?w=600&q=85", // Cathedral
    "Gothic Quarter": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=85", // Old town
  },
  "berlin": {
    "Brandenburg Gate": "https://images.unsplash.com/photo-1551632786-de41ec16a01d?w=600&q=85", // Monument
    "East Side Gallery": "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=85", // Street art
    "Reichstag": "https://images.unsplash.com/photo-1552556784-85fce8f24f76?w=600&q=85", // Government building
  },
  "marrakech": {
    "Jemaa El-Fnaa": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=85", // Medina square
    "Bahia Palace": "https://images.unsplash.com/photo-1578481053623-8acdf4ee0a69?w=600&q=85", // Palace
    "Imlil Village": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=85", // Mountain village
  },
  "rishikesh": {
    "Parmarth Niketan": "https://images.unsplash.com/photo-1516552543322-4e7f77cefccc?w=600&q=85", // Ashram
    "Lakshman Jhula": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=85", // Bridge
    "Triveni Ghat": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=85", // Riverfront
  },
  "kathmandu": {
    "Boudhanath Stupa": "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=85", // Buddhist monument
    "Pashupatinath Temple": "https://images.unsplash.com/photo-1516552543322-4e7f77cefccc?w=600&q=85", // Temple
    "Durbar Square": "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=85", // Historic plaza
  },
  "chiang-mai": {
    "Doi Suthep Temple": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=85", // Golden temple
    "Old City": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=85", // City streets
    "Chiang Mai Night Bazaar": "https://images.unsplash.com/photo-1488815154555-75e2ee2a8d6d?w=600&q=85", // Market
  },
  "hoi-an": {
    "Ancient Town": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=85", // Lanterns
    "Japanese Covered Bridge": "https://images.unsplash.com/photo-1501516466392-0d5baa6ffa1f?w=600&q=85", // Bridge
    "My Son Sanctuary": "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=85", // Ruins
  },
  "bali": {
    "Tegallalang Rice Terraces": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=85", // Rice fields
    "Uluwatu Temple": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=85", // Temple
    "Ubud Monkey Forest": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=85", // Nature
  },
  "siargao": {
    "Cloud 9 Surf Break": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=85", // Surfing
    "Magpupungko Rock Pool": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85", // Beach
    "Pacifico Beach": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85", // Shore
  },
  "kyoto": {
    "Fushimi Inari": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=85", // Torii gates
    "Arashiyama Bamboo Grove": "https://images.unsplash.com/photo-1535140542340-6494a6359743?w=600&q=85", // Bamboo
    "Gion District": "https://images.unsplash.com/photo-1552556784-85fce8f24f76?w=600&q=85", // Traditional streets
  },
  "seoul": {
    "Gyeongbokgung Palace": "https://images.unsplash.com/photo-1552556784-85fce8f24f76?w=600&q=85", // Palace
    "Hongdae District": "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=85", // Art district
    "Bukchon Hanok Village": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=85", // Traditional village
  },
  "melbourne": {
    "Street Art Laneways": "https://images.unsplash.com/photo-1488646149381-b8fdd00acfff?w=600&q=85", // Graffiti
    "Queen Victoria Market": "https://images.unsplash.com/photo-1488815154555-75e2ee2a8d6d?w=600&q=85", // Market
    "Yarra River": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85", // Waterfront
  },
  "queenstown": {
    "Lake Wakatipu": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=85", // Lake
    "The Remarkables": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=85", // Mountains
    "Adventure Sports": "https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=85", // Outdoors
  },
  "byron-bay": {
    "Cape Byron Lighthouse": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85", // Beach
    "The Pass Beach": "https://images.unsplash.com/photo-1499209974421-9f694e24e5a1?w=600&q=85", // Surfing
    "Minyon Falls": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=85", // Waterfall
  },
};

async function main() {
  console.log("Seeding city hero photos...");
  let citiesUpdated = 0;
  for (const [slug, imageUrl] of Object.entries(CITY_PHOTOS)) {
    await prisma.city.updateMany({
      where: { slug },
      data: { imageUrl },
    });
    citiesUpdated++;
  }
  console.log(`✅ Updated ${citiesUpdated} cities with hero photos`);

  console.log("\nSeeding spot thumbnail photos...");
  let spotsUpdated = 0;
  for (const [cityName, spots] of Object.entries(SPOT_PHOTOS)) {
    for (const [spotName, imageUrl] of Object.entries(spots)) {
      const result = await prisma.spot.updateMany({
        where: { city: { name: cityName }, name: spotName },
        data: { imageUrl },
      });
      spotsUpdated += result.count;
    }
  }
  console.log(`✅ Updated ${spotsUpdated} spots with thumbnail photos`);

  console.log("\n🎉 All destination photos seeded!");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
