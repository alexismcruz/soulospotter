// Small-city tail, batch 14: El Zonte, El Valle de Antón, Cairo, Chefchaouen, Lamu, Masai Mara, Moshi, Nairobi.
// Researched 2026-09-27.
//
// DELETED: "Bitcoin Beach Café", El Zonte (no café of that name; the town's cafés are Café Cocoa, Canegue etc.);
//   "Talek Town Eateries" (generic, not a venue).
// CORRECTED: Esencia Nativa is beachfront with a pool and an on-site coffee roaster; La Casa de Lourdes is a
//   colonial-style villa with gardens that also rents a casita; Dahab Hostel is on the 7th-floor rooftop of
//   26 Mahmoud Bassiouny St, open since 1998; Zööba's first branch is at 16 26th of July St, Zamalek (opened 2012,
//   MENA's 50 Best 2026); Café Clock Chefchaouen is in the Hota quarter near Outa el Hammam; Lamu House is a set of
//   restored seafront Swahili townhouses with two pools; Whispers is in the Baraka Gallery building; Aruba Mara Camp
//   is on the Talek River by Talek Gate; Union Café belongs to the KNCU coffee cooperative (founded 1930);
//   Wildebeest Eco Camp is at 151 Mokoyeti Road West, Lang'ata; Giraffe Centre is run by AFEW.
//
//   node scripts/add-tail-batch14-details.js [--apply]
const run = require("./_enrich-runner");

run({
  "el-zonte": {
    delete: ["bitcoin-beach-cafe-el-zonte"],
    spots: {
      "esencia-nativa-el-zonte": {
        address: "Playa El Zonte, Chiltiupán, La Libertad, El Salvador",
        website: "https://esencianativa.com/",
        mapsQuery: "Esencia Nativa, El Zonte",
        description: "A long-running surf hotel right on the beach at El Zonte, with a pool, a restaurant, and its own coffee roaster and café. Breakfasts use local ingredients and locally roasted coffee. It's a relaxed, friendly base for surfing the point break, and much calmer than nearby El Tunco. Several places in town accept bitcoin.",
      },
      "punta-el-zonte": {
        address: "Playa El Zonte, La Libertad, El Salvador",
        mapsQuery: "Playa El Zonte",
        description: "The rocky right-hand point break at El Zonte, on a dark-sand beach backed by cliffs, known for consistent waves and a mellow village atmosphere. At low tide there are rock pools to explore. The village became known as 'Bitcoin Beach' for its early local bitcoin project. Currents are strong, so swim with care.",
      },
    },
  },
  "el-valle-de-anton": {
    spots: {
      "bodhi-hostel-el-valle": {
        address: "Avenida Principal, El Valle de Antón, Coclé, Panama",
        website: "https://bodhihostels.com/elvalle/",
        mapsQuery: "Bodhi Hostel & Lounge, El Valle",
        description: "A hostel on the main street of El Valle, owned and run by local backpackers, with free breakfast, a communal kitchen, a garden with a barbecue, yoga space, a bar with cheap beer and bikes for rent. Most of the town's sights — the market, waterfalls and hot springs — are within walking or cycling distance.",
      },
      "cerro-gaital-trail": {
        address: "Cerro Gaital Natural Monument, El Valle de Antón, Coclé, Panama",
        mapsQuery: "Cerro Gaital, El Valle de Antón",
        description: "A protected cloud-forest peak on the rim of the huge volcanic crater that El Valle sits in, with a steep trail through humid forest to a lookout over the valley and, on clear days, the Pacific. It's excellent for birds and orchids. There's a small entry fee; go early before the clouds roll in and wear good shoes.",
      },
      "la-casa-de-lourdes-el-valle": {
        address: "El Valle de Antón, Coclé, Panama",
        mapsQuery: "La Casa de Lourdes, El Valle de Antón",
        description: "A well-known restaurant in a colonial-style villa set in gardens with mountain views, serving refined dishes that blend Panamanian ingredients with international influences. It's the place for a special lunch or dinner in El Valle, and the owners also rent a casita with a pool and jacuzzi for overnight guests.",
      },
    },
  },
  cairo: {
    spots: {
      "dahab-hostel-cairo": {
        address: "Rooftop, 7th floor, 26 Mahmoud Bassiouny St, Talaat Harb, Downtown Cairo, Egypt",
        website: "https://dahabhostel.com/",
        mapsQuery: "Dahab Hostel, Cairo",
        description: "A rooftop hostel in downtown Cairo, open since 1998, made up of whitewashed huts and murals meant to recreate the feel of a Sinai beach camp above the city streets. The terrace is the social hub. It's about 10 minutes' walk from Tahrir Square and the Egyptian Museum, and a friendly budget base for the city.",
      },
      "pyramids-of-giza": {
        address: "Al Haram, Giza, Egypt",
        mapsQuery: "Pyramids of Giza",
        description: "The pyramids of Khufu, Khafre and Menkaure and the Great Sphinx on the Giza plateau, the only one of the Seven Wonders of the Ancient World still standing. Tickets for the site and for inside the Great Pyramid are sold separately; go at opening time, use official guides, and firmly decline camel and horse touts.",
      },
      "zooba-cairo": {
        address: "16 26th of July Street, Zamalek, Cairo, Egypt",
        website: "https://zoobaeats.com/",
        mapsQuery: "Zooba Zamalek, Cairo",
        description: "A colourful, modern take on Egyptian street food that opened in Zamalek in 2012 and now has branches abroad, serving koshari, hawawshi and its standout ta'ameya (Egyptian falafel) made to order. It features on MENA's 50 Best Restaurants list, yet stays casual and affordable — an easy solo lunch.",
      },
    },
  },
  chefchaouen: {
    spots: {
      "cafe-clock-chefchaouen": {
        address: "Hota quarter, Medina, Chefchaouen, Morocco",
        website: "https://www.cafeclock.com/chefchaouen-gallery",
        mapsQuery: "Café Clock Chefchaouen",
        description: "The Chefchaouen branch of Café Clock, the cultural café founded in Fes in 2006, a few minutes' walk from the main square of Outa el Hammam. It serves its famous camel burger alongside tagines and vegetarian dishes, with a rooftop terrace over the blue medina and a programme of live music and cooking classes.",
      },
      "chefchaouen-blue-medina": {
        address: "Medina, Chefchaouen, Morocco",
        mapsQuery: "Chefchaouen Medina",
        description: "The blue-washed old town of Chefchaouen, climbing the Rif mountain slopes around the square of Outa el Hammam and its red-walled kasbah. Wander the lanes early for quiet photos, then walk up to the Spanish Mosque on the hill for sunset over the town. Be respectful when photographing residents and their doorways.",
      },
      "riad-cherifa-chefchaouen": {
        address: "Medina, Chefchaouen, Morocco",
        mapsQuery: "Riad Cherifa, Chefchaouen",
        description: "A guesthouse in a traditional riad inside the medina of Chefchaouen, a few minutes' walk from the centre and Café Clock, with rooftop terraces over the blue town. Guests mention the hammam and massage. It's a quiet, atmospheric base in the old town; check recent reviews before booking.",
      },
    },
  },
  lamu: {
    spots: {
      "lamu-house-hotel": {
        address: "Seafront, Lamu Old Town, Lamu Island, Kenya",
        website: "https://lamuhouse.com/",
        description: "A hotel made of restored Swahili townhouses on the seafront of Lamu's old town, with carved wooden doors, coral-stone walls, verandas, courtyards and two pools. Its waterfront Moonrise Restaurant serves local and international dishes, and the hotel arranges sailing, dhow trips and water sports.",
      },
      "lamu-old-town": {
        address: "Lamu Old Town, Lamu Island, Kenya",
        website: "https://whc.unesco.org/en/list/1055/",
        mapsQuery: "Lamu Old Town",
        description: "The oldest and best-preserved Swahili town in East Africa, a UNESCO World Heritage Site of coral-stone houses, carved doors and narrow lanes where donkeys and dhows replace cars. Visit the Lamu Museum and fort, watch dhows on the waterfront, and dress modestly — it's a conservative Muslim town. Check travel advisories for the region.",
      },
      "whispers-coffee-lamu": {
        address: "Baraka Gallery building, Lamu Old Town, Lamu Island, Kenya",
        mapsQuery: "Whispers Coffee Shop, Lamu",
        description: "A calm café in the same building as the Baraka Gallery, with a shaded, palm-fringed courtyard garden at the back. It serves good coffee, fresh juices, smoothies, light meals and homemade cakes, and has long been run by an Australian owner who has lived on Lamu for decades. A peaceful retreat from the busy lanes.",
      },
    },
  },
  "masai-mara": {
    delete: ["talek-town-eateries"],
    spots: {
      "aruba-mara-camp": {
        address: "Talek River, near Talek Gate, Maasai Mara, Narok, Kenya",
        mapsQuery: "Aruba Mara Camp, Talek",
        description: "A tented camp on the banks of the Talek River next to Talek Gate, on the northern side of the Maasai Mara reserve, with en-suite tents, cheaper bush tents with shared bathrooms, and camping. Its location lets you be in the reserve at dawn. A popular mid-range and budget base for game drives; arrange trips through the camp.",
      },
      "mara-river-crossing": {
        address: "Mara River, Maasai Mara National Reserve, Narok, Kenya",
        mapsQuery: "Mara River, Maasai Mara",
        description: "The stretch of the Mara River where the Great Migration's wildebeest and zebra plunge across past waiting crocodiles, usually between about July and October. Crossings are unpredictable and can mean hours of waiting. Go with a guide who knows the crossing points, and follow reserve rules on keeping vehicles back.",
      },
    },
  },
  moshi: {
    spots: {
      "kilimanjaro-backpackers-moshi": {
        name: "Kilimanjaro Backpackers Hotel",
        address: "Moshi town centre, Kilimanjaro, Tanzania",
        mapsQuery: "Kilimanjaro Backpackers Hotel, Moshi",
        description: "A budget backpacker hotel in central Moshi with simple air-conditioned rooms, free breakfast and Wi-Fi, used by trekkers before and after Kilimanjaro climbs. Reviews are average — it's basic, but cheap and convenient for the town's tour operators, markets and cafés. Check recent reviews before booking.",
      },
      "materuni-waterfall": {
        address: "Materuni village, near Moshi, Kilimanjaro, Tanzania",
        mapsQuery: "Materuni Waterfall",
        description: "A tall waterfall in the green foothills of Kilimanjaro, about 15km from Moshi, reached by a walk through the Chagga village of Materuni's banana and coffee farms. It's usually visited on a half-day tour that includes a hands-on coffee experience with local farmers. The pool at the base is cold but swimmable.",
      },
      "union-cafe-moshi": {
        address: "Moshi town centre, Kilimanjaro, Tanzania",
        mapsQuery: "Union Cafe, Moshi",
        description: "The café of the Kilimanjaro Native Co-operative Union (KNCU), Tanzania's oldest cooperative, founded in 1930 by coffee farmers on the slopes of the mountain. It serves coffee grown by member farms along with breakfasts and light meals, with decent Wi-Fi — a good place to plan a climb and buy beans.",
      },
    },
  },
  nairobi: {
    spots: {
      "giraffe-centre-nairobi": {
        address: "Koitobos Road, off Lang'ata South Road, Lang'ata, Nairobi, Kenya",
        website: "https://www.giraffecentre.org/",
        description: "A conservation and education centre run by the African Fund for Endangered Wildlife, where you can feed endangered Rothschild's giraffes at eye level from a raised platform. Next door is a small forest sanctuary with walking trails. It's in Lang'ata, around 15km from the city centre; go early on weekdays to avoid school groups.",
      },
      "java-house-nairobi": {
        address: "Multiple branches, Nairobi, Kenya",
        website: "https://javahouseafrica.com/",
        mapsQuery: "Java House, Nairobi",
        description: "Kenya's best-known homegrown coffee-house chain, with dozens of branches across Nairobi in malls, the airport and business districts. It serves Kenyan coffee, big breakfasts, burgers and local dishes, with reliable Wi-Fi and clean restrooms — a dependable, safe place to work or pause between errands in the capital.",
      },
      "wildebeest-eco-camp-nairobi": {
        address: "151 Mokoyeti Road West, Lang'ata, Nairobi, Kenya",
        website: "http://wildebeestecocamp.com/",
        mapsQuery: "Wildebeest Eco Camp, Nairobi",
        description: "A garden camp set in about 3.5 acres of acacia-shaded grounds in the leafy south-west suburbs, with dorm beds, garden tents, safari tents and cottage rooms, plus a bar and restaurant. It's a quiet, sociable base for backpackers and a common start point for safaris; the Giraffe Centre and Nairobi National Park are nearby.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
