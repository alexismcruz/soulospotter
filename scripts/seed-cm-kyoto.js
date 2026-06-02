require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function upsertSpot(citySlug, spot) {
  const city = await prisma.city.findUnique({ where: { slug: citySlug } });
  if (!city) { console.log("City not found:", citySlug); return; }
  const { tags, ...fields } = spot;
  const s = await prisma.spot.upsert({
    where: { cityId_slug: { cityId: city.id, slug: fields.slug } },
    update: { website: fields.website ?? null, phone: fields.phone ?? null, googleMapsUrl: fields.googleMapsUrl ?? null },
    create: { ...fields, cityId: city.id, published: true },
  });
  for (const tag of tags) {
    await prisma.spotTag.upsert({
      where: { spotId_tag: { spotId: s.id, tag } },
      update: {},
      create: { spotId: s.id, tag },
    });
  }
  console.log("✅", fields.name);
}

const SPOTS = {
  "chiang-mai": [
    { name: "CAMP by Maya Mall", slug: "camp-by-maya-mall", category: "COWORKING", description: "The original digital nomad coworking cafe in Chiang Mai — buy a coffee, sit all day, fast WiFi included. Spawned a thousand nomad careers.", address: "Maya Lifestyle Shopping Center, Nimman, Chiang Mai", priceRange: "BUDGET", tags: ["coworking","wifi","nomad-classic","cheap"], website: "https://www.centralplaza.co.th/branch/maya", googleMapsUrl: "https://www.google.com/maps/search/CAMP+Coffee+Maya+Mall+Nimman+Chiang+Mai" },
    { name: "Doi Suthep Temple", slug: "doi-suthep-temple", category: "CULTURE", description: "The golden temple on the mountain overlooking Chiang Mai. Catch sunrise alone here and it will genuinely recalibrate how you see the world.", address: "Doi Suthep, Chiang Mai", priceRange: "BUDGET", tags: ["temple","sunrise","views","mountain","spiritual"], googleMapsUrl: "https://www.google.com/maps/search/Doi+Suthep+Temple+Chiang+Mai" },
    { name: "Zoe in Yellow", slug: "zoe-in-yellow", category: "NIGHTLIFE", description: "The solo traveler's unofficial meeting point every night in Chiang Mai. Not fancy — just the right energy, cheap drinks, and everyone's alone and okay with it.", address: "Ratchaphakhinai Rd, Old City, Chiang Mai", priceRange: "BUDGET", tags: ["social","cheap","meeting-point","backpacker"], googleMapsUrl: "https://www.google.com/maps/search/Zoe+in+Yellow+Chiang+Mai" },
    { name: "Ristr8to Lab", slug: "ristr8to-lab", category: "CAFE", description: "Chiang Mai's most celebrated specialty coffee shop. Multiple award-winning baristas, precise single-origin brews, a beautiful space in Nimman. The benchmark for coffee in Northern Thailand.", address: "15/3 Nimmana Haeminda Rd, Nimman, Chiang Mai", priceRange: "MID", tags: ["specialty-coffee","award-winning","nimman","pour-over"], website: "https://www.ristr8to.com", phone: "+66 53 215 278", googleMapsUrl: "https://www.google.com/maps/search/Ristr8to+Lab+Nimman+Chiang+Mai" },
    { name: "Khao Soi Khun Yai", slug: "khao-soi-khun-yai", category: "FOOD", description: "The best khao soi in Chiang Mai — and that is saying something in the city that invented it. A tiny local shop, outdoor tables, insane coconut curry noodle soup for under $2.", address: "Charoen Prathet Rd, Chang Khlan, Chiang Mai", priceRange: "BUDGET", tags: ["khao-soi","local","must-eat","cheap","authentic"], googleMapsUrl: "https://www.google.com/maps/search/Khao+Soi+Khun+Yai+Chiang+Mai" },
    { name: "Mad Monkey Hostel Chiang Mai", slug: "mad-monkey-hostel-chiang-mai", category: "ACCOMMODATION", description: "The most social hostel in Chiang Mai — rooftop pool, daily events, a bar that becomes the meeting point for every solo traveler in the city. Hard to leave.", address: "47/1 Ratchapakinai Rd, Old City, Chiang Mai", priceRange: "BUDGET", tags: ["hostel","pool","social","rooftop","events"], website: "https://www.madmonkeyhostels.com/chiang-mai", phone: "+66 52 003 008", googleMapsUrl: "https://www.google.com/maps/search/Mad+Monkey+Hostel+Chiang+Mai" },
    { name: "Doi Inthanon National Park", slug: "doi-inthanon-national-park", category: "NATURE", description: "Thailand's highest peak, one hour from Chiang Mai. Misty mountain trails, twin chedis with incredible valley views, hill tribe villages. The solo day trip Chiang Mai was made for.", address: "Doi Inthanon, Chom Thong District, Chiang Mai", priceRange: "BUDGET", tags: ["nature","hiking","day-trip","waterfalls","mountain"], googleMapsUrl: "https://www.google.com/maps/search/Doi+Inthanon+National+Park+Chiang+Mai" },
    { name: "Lila Thai Massage", slug: "lila-thai-massage", category: "WELLNESS", description: "Traditional Thai massage run by female ex-prisoners as part of a rehabilitation program. Genuinely excellent massages and a social enterprise worth supporting — 1 hour for 280 baht.", address: "Arak Rd, Old City, Chiang Mai", priceRange: "BUDGET", tags: ["massage","wellness","social-enterprise","cheap","authentic"], website: "https://www.lilamassage.com", phone: "+66 53 281 325", googleMapsUrl: "https://www.google.com/maps/search/Lila+Thai+Massage+Chiang+Mai" },
  ],
  "kyoto": [
    { name: "Fushimi Inari Shrine", slug: "fushimi-inari", category: "CULTURE", description: "Ten thousand torii gates winding up a mountain. Go at dawn or dusk alone and it becomes one of the most meditative walks of your life.", address: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto", priceRange: "FREE", tags: ["iconic","free","spiritual","dawn","solo-perfect"], website: "https://inari.jp/en", googleMapsUrl: "https://www.google.com/maps/search/Fushimi+Inari+Shrine+Kyoto" },
    { name: "Weekenders Coffee", slug: "weekenders-coffee", category: "CAFE", description: "One of Kyoto's best specialty coffee roasters — intimate, beautiful space in Nakagyo Ward. Perfect for a solo morning in the city.", address: "Jingumichi-kado, Nakagyo Ward, Kyoto", priceRange: "MID", tags: ["specialty-coffee","beautiful","solo-friendly","roaster"], website: "https://www.weekenderscoffee.com", googleMapsUrl: "https://www.google.com/maps/search/Weekenders+Coffee+Kyoto" },
    { name: "Gion Hatanaka", slug: "gion-hatanaka", category: "ACCOMMODATION", description: "A traditional machiya townhouse experience in Gion. Expensive but transformative — the solo travel splurge of a lifetime in Japan.", address: "Shinmonzen-dori, Gion, Kyoto", priceRange: "HIGH", tags: ["traditional","gion","splurge","authentic","machiya"], website: "https://www.hatanaka.co.jp/en", phone: "+81 75 551 0335", googleMapsUrl: "https://www.google.com/maps/search/Gion+Hatanaka+Ryokan+Kyoto" },
    { name: "Nishiki Market", slug: "nishiki-market", category: "FOOD", description: "Kyoto's five-block covered food market, nicknamed Kyoto's Kitchen. Hundreds of stalls selling pickles, tofu, fresh fish, and street snacks. Solo eating heaven — everything is single-serving.", address: "Nishiki Market, Nakagyo, Kyoto", priceRange: "BUDGET", tags: ["market","street-food","local","morning","solo-dining"], googleMapsUrl: "https://www.google.com/maps/search/Nishiki+Market+Kyoto" },
    { name: "Arashiyama Bamboo Grove", slug: "arashiyama-bamboo-grove", category: "NATURE", description: "The iconic bamboo forest on the western edge of Kyoto. Walk through it alone at 6am before the crowds arrive — the sound of wind through the bamboo is unlike anything else on earth.", address: "Sagaogurayama Tabuchiyamacho, Arashiyama, Kyoto", priceRange: "FREE", tags: ["bamboo","free","early-morning","photography","iconic"], googleMapsUrl: "https://www.google.com/maps/search/Arashiyama+Bamboo+Grove+Kyoto" },
    { name: "Kanga-an Temple Zen Meditation", slug: "kanga-an-zen-meditation", category: "WELLNESS", description: "Join a zazen meditation session at this 700-year-old Rinzai temple. One hour of seated meditation with a monk, open to all levels. The most grounding solo activity in Kyoto.", address: "Murasakino Daitokuji-cho 8, Kita, Kyoto", priceRange: "BUDGET", tags: ["meditation","zen","temple","spiritual","zazen"], website: "https://www.kanga-an.com", phone: "+81 75 491 3664", googleMapsUrl: "https://www.google.com/maps/search/Kanga-an+Temple+Kyoto" },
    { name: "Hello Cafe Kyoto", slug: "hello-cafe-kyoto", category: "COWORKING", description: "A quietly excellent work cafe near Kyoto Station — laptops welcome, fast WiFi, great matcha, minimal noise. One of the few genuinely nomad-friendly spots in a city that does not usually cater to remote work.", address: "Shimogyo, Kyoto", priceRange: "BUDGET", tags: ["coworking","wifi","matcha","quiet","nomad-friendly"], googleMapsUrl: "https://www.google.com/maps/search/Hello+Cafe+Kyoto+coworking" },
    { name: "Pontocho Alley", slug: "pontocho-alley", category: "NIGHTLIFE", description: "Kyoto's narrow lantern-lit dining alley running parallel to the Kamo River. The best solo evening in the city — pick a restaurant with a river-facing terrace, order omakase, and watch Kyoto glow.", address: "Pontocho, Nakagyo, Kyoto", priceRange: "HIGH", tags: ["dinner","lanterns","riverside","atmosphere","evening"], googleMapsUrl: "https://www.google.com/maps/search/Pontocho+Alley+Kyoto" },
  ],
};

async function main() {
  for (const [citySlug, spots] of Object.entries(SPOTS)) {
    console.log("\n--- " + citySlug.toUpperCase() + " ---");
    for (const spot of spots) {
      await upsertSpot(citySlug, spot);
    }
  }
  console.log("\nAll done!");
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
