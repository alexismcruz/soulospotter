// Hong Kong spot enrichment + cleanup. Researched 2026-09-23. Hong Kong was NOT one of the 13 bulk-seeded
// cities, but its data turned out to have the same problems: fabricated, closed and mislocated listings.
//
// DELETED (8):
//   - ming-fat-house-hong-kong: "Ming Fat House" is a 1975 residential block at 9 Tai Ping Shan St, not a hostel.
//   - fang-fang-cafe-hong-kong: no "Fang Fang" cha chaan teng found in Sheung Wan anywhere.
//   - artisan-cafe-hong-kong: no "Artisan Bakery" in Kennedy Town found anywhere.
//   - the-press-room-hong-kong: closed July 2014 (SCMP).
//   - cafe-deadend-hong-kong: closed (Foursquare, OpenRice).
//   - law-fu-kee-hong-kong: closed all branches 25 Jan 2025 (SCMP, Dimsum Daily).
//   - campfire-coworking-hong-kong: closed; campfire.com.hk is now an unrelated design agency.
//   - just-co-hong-kong: no JustCo centre in Hong Kong can be found (its HK locations page 404s).
//
// Corrected (selection):
//   - Butterfly on Waterfront is at 94 Connaught Rd West, Sheung Wan — not Hung Hom.
//   - Mingle Place by the Park is at 137–143 Wan Chai Rd, Wan Chai (1960s tong lau, no lift) — not Causeway Bay/Victoria Park.
//   - Madera Hollywood: 53–55 Hollywood Rd, an aparthotel with kitchenettes — not a "hotel-hostel hybrid".
//   - Blueprint: Swire's premium space at Dorset House, Taikoo Place, Quarry Bay — not a "budget café in Sai Ying Pun".
//   - Garage Society: no PMQ location; branches in Central, Causeway Bay, Wan Chai and Sheung Wan.
//   - WeWork: no Connaught Road site; the Central location is 4/F, 9 Queen's Road Central (wework.hk) — renamed.
//   - The Cupping Room flagship is 18 Cochrane St, Central — not PMQ.
//   - Tim Ho Wan (Sham Shui Po) is now Bib Gourmand, not starred; Lung King Heen is two stars since 2023 (was three 2009–2022).
//   - Ye Shanghai is Shanghainese/Jiangnan with a Michelin star — not "mid-range without the Michelin price tag".
//   - Star Ferry adult fare is ~HK$5–6.50, not HK$3. Museum of History's 'Hong Kong Story' reopened 1 Apr 2026.
//   - TST promenade doesn't run to the Heritage Museum (that's in Sha Tin); Lugard Road is a Peak loop, not a route down;
//     the Mid-Levels escalator starts in Central, not Sheung Wan.
//   - Dead links cleared (Cupping Room, Sik Sik Yuen) or replaced (Café Gray → upperhouse.com, Stanford → stanfordhotel.com).
//
//   node scripts/add-hong-kong-details.js            (dry run)
//   node scripts/add-hong-kong-details.js --apply     (write)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const DELETE = [
  "ming-fat-house-hong-kong", "fang-fang-cafe-hong-kong", "artisan-cafe-hong-kong", "the-press-room-hong-kong",
  "cafe-deadend-hong-kong", "law-fu-kee-hong-kong", "campfire-coworking-hong-kong", "just-co-hong-kong",
];

const SPOTS = {
  "butterfly-on-waterfront-hong-kong": {
    address: "94 Connaught Road West, Sheung Wan, Hong Kong",
    website: "https://www.butterflyhk.com/",
    description: "A boutique hotel on Connaught Road West in Sheung Wan, near the western end of the waterfront, with compact, well-designed rooms and some harbour glimpses from higher floors. Sheung Wan's dried-seafood streets, Hollywood Road's galleries and the MTR are all close by, making it a good-value private-room base for a solo stay on Hong Kong Island.",
  },
  "citadines-ashley-hong-kong": {
    address: "18 Ashley Road, Tsim Sha Tsui, Kowloon, Hong Kong",
    description: "Serviced apartments on Ashley Road in the middle of Tsim Sha Tsui, with kitchenette-equipped studios that suit longer solo stays. The Star Ferry pier, the harbourfront promenade and the Nathan Road shopping strip are a few minutes' walk away, and TST MTR station puts the rest of the city within easy reach.",
  },
  "four-seasons-hong-kong": {
    address: "8 Finance Street, Central, Hong Kong",
    description: "A luxury hotel beside the IFC complex in Central, with floor-to-ceiling Victoria Harbour views, infinity pools and a spa. Its restaurants have held a combined eight Michelin stars, including Caprice and the Cantonese Lung King Heen. Hong Kong Station and the Airport Express are directly connected, which makes arrivals and departures effortless.",
  },
  "madera-hollywood-hong-kong": {
    address: "53–55 Hollywood Road, Central, Hong Kong",
    website: "https://www.maderagroup.com/en/hotel-madera-hollywood/",
    description: "A boutique aparthotel on historic Hollywood Road, a few minutes' walk from SoHo, Lan Kwai Fong and PMQ. Rooms come with kitchenettes, and there's a guest lounge and laundry, which makes it practical for longer solo stays. You're right among the antique shops, galleries, cafés and bars of Central's most characterful streets.",
  },
  "mandarin-oriental-hong-kong": {
    address: "5 Connaught Road Central, Central, Hong Kong",
    website: "https://www.mandarinoriental.com/en/hong-kong",
    description: "A Central institution since 1963 and the flagship of the Mandarin Oriental group, known for polished, old-school service rather than flashy newness. Its Cantonese restaurant Man Wah looks out over Statue Square, and The Mandarin Cake Shop is a classic stop for pastries. It's steps from the Star Ferry, Central MTR and the Mid-Levels escalator.",
  },
  "mingle-place-hong-kong": {
    address: "137–143 Wan Chai Road, Wan Chai, Hong Kong",
    website: "http://www.mingleplace.com/park/",
    description: "A small boutique hotel in a restored 1960s 'tong lau' balcony building on Wan Chai Road, in one of the city's older neighbourhoods. There are around 25 compact rooms and a rooftop terrace; note that the old building has no lift. Wan Chai's markets and street food are on the doorstep, and Causeway Bay and Central are a short MTR ride away.",
  },
  "rosewood-hong-kong": {
    address: "Victoria Dockside, 18 Salisbury Road, Tsim Sha Tsui, Kowloon, Hong Kong",
    description: "A luxury hotel that opened in March 2019 in a 65-storey tower at Victoria Dockside on the Tsim Sha Tsui waterfront, with 413 rooms, many facing straight across Victoria Harbour to the Island skyline. It sits beside the K11 Musea arts-and-retail complex and the harbourfront promenade, so the Symphony of Lights is right outside.",
  },
  "stanford-hotel-hong-kong": {
    address: "118 Soy Street, Mong Kok, Kowloon, Hong Kong",
    website: "https://www.stanfordhotel.com/stanford-hotel",
    description: "A reliable mid-range hotel with around 190 rooms in the heart of Mong Kok, one of Hong Kong's busiest shopping neighbourhoods. The Ladies' Market, the flower and goldfish markets and Temple Street Night Market are all within walking distance, as are several MTR stations — a practical, good-value base on the Kowloon side.",
  },
  "tuve-hotel-hong-kong": {
    address: "123 Mount Davis Path, Kennedy Town, Hong Kong",
    website: "https://www.yha.org.hk/en/hostel/jockey-club-mt-davis-youth-hostel/",
    description: "A youth hostel run by YHA Hong Kong near the top of Mount Davis on the western tip of Hong Kong Island, with a sea-view deck looking over the harbour and Tsing Ma Bridge. It's quiet and surrounded by greenery; a free shuttle bus runs roughly hourly from Kennedy Town MTR (Exit C), about 15 minutes. Dorms and private rooms available.",
  },
  "peninsula-hong-kong": {
    address: "Salisbury Road, Tsim Sha Tsui, Kowloon, Hong Kong",
    website: "https://www.peninsula.com/en/hong-kong/5-star-luxury-hotel-kowloon",
    description: "The 'grande dame of the Far East', open since 1928 on Salisbury Road in Tsim Sha Tsui. It's famous for its fleet of green Rolls-Royces, afternoon tea in the grand colonnaded lobby (arrive early — it's largely first come, first served) and harbour views from the tower. Even if you don't stay, tea in the lobby is a classic solo treat.",
  },
  "yesinn-at-causeway-bay": {
    address: "2–9/F, Nan Yip Building, 472 Hennessy Road, Causeway Bay, Hong Kong",
    website: "https://yesinn.com/en/index",
    description: "A long-running, sociable hostel on Hennessy Road, about five minutes' walk from Times Square and Causeway Bay MTR. It has dorms and private rooms across several floors, a shared kitchen and common areas where it's easy to meet other travellers. Causeway Bay's shopping and food streets are right outside, and trams run past the door.",
  },
  "cafe-gray-deluxe-hong-kong": {
    address: "49/F, The Upper House, Pacific Place, 88 Queensway, Admiralty, Hong Kong",
    website: "https://www.upperhouse.com/en/",
    description: "A restaurant and bar on the 49th floor of The Upper House hotel above Pacific Place, with floor-to-ceiling windows looking across Victoria Harbour. It's pricey but relaxed, and the long bar is a comfortable spot to sit alone. Come for breakfast, an afternoon coffee and dessert, or a cocktail at sunset for one of the best views in Hong Kong.",
  },
  "cupping-room-hong-kong": {
    address: "G/F, 18 Cochrane Street, Central, Hong Kong",
    website: null,
    description: "A home-grown specialty coffee roaster with several branches; the Central flagship is on Cochrane Street right beside the Mid-Levels escalator, and there's a long-standing Sheung Wan café too. Expect carefully made espresso and filter coffee and an Australian-style brunch menu. Busy at weekends, calmer on weekday mornings for a solo coffee.",
  },
  "blueprint-coworking-hong-kong": {
    address: "2/F–3/F, Dorset House, Taikoo Place, 979 King's Road, Quarry Bay, Hong Kong",
    description: "Swire Properties' coworking hub at Taikoo Place in Quarry Bay, spread over two floors of Dorset House with around 90 open-plan desks, private offices and event spaces, plus the TONG bar and café. It's a polished, professional space in one of the Island's main business districts, right by Quarry Bay MTR. Contact them for day-pass availability.",
  },
  "garage-society-hong-kong": {
    address: "2–12 Queen's Road West, Sheung Wan, Hong Kong",
    website: "https://www.thegaragesociety.com/locations",
    description: "A Hong Kong coworking brand with spaces in Central, Causeway Bay, Wan Chai and Sheung Wan, offering hot desks, dedicated desks, private offices and meeting rooms. The community leans towards startups, creatives and small businesses. Check the locations page to pick the branch nearest where you're staying, and book a day pass before you go.",
  },
  "the-hive-wan-chai-hong-kong": {
    address: "21/F, The Phoenix, 23 Luard Road, Wan Chai, Hong Kong",
    website: "https://thehive.com.hk/",
    description: "A coworking space spread over five floors of The Phoenix building on Luard Road, about three minutes from Wan Chai MTR. It has open-plan hot desks, dedicated desks, private offices and an outdoor sun terrace, with a community of freelancers, designers and small companies. A sociable choice if you want to meet people while you work.",
  },
  "wework-hong-kong-central": {
    name: "WeWork 9 Queen's Road Central",
    address: "4/F, 9 Queen's Road Central, Central, Hong Kong",
    website: "https://wework.hk/en-US/locations/",
    description: "WeWork's Central location, on the fourth floor of 9 Queen's Road Central, a short walk from Central MTR and the Mid-Levels escalator. It offers hot desks, dedicated desks and private offices with WeWork's usual lounges, phone booths and coffee. WeWork also has spaces in Wan Chai, Taikoo and Causeway Bay if another area suits you better.",
  },
  "night-market-apliu-street-hong-kong": {
    address: "Apliu Street, Sham Shui Po, Kowloon, Hong Kong",
    mapsQuery: "Apliu Street Flea Market, Sham Shui Po",
    description: "A street market in Sham Shui Po crammed with stalls selling second-hand electronics, cables, gadgets, old cameras, watches and assorted oddities, next to shops of electronic components. It's a fascinating browse even if you buy nothing, and a good introduction to Sham Shui Po's workaday character. Busiest in the afternoon and evening.",
  },
  "wet-market-graham-street-hong-kong": {
    address: "Graham Street, Central, Hong Kong",
    mapsQuery: "Graham Street Market, Central, Hong Kong",
    description: "One of the oldest street markets on Hong Kong Island, trading on steep Graham Street in Central for more than 160 years. Stalls sell fresh produce, tofu, dried seafood and household goods, just below the glossy towers and restaurants of SoHo. Part of the area has been redeveloped, so go soon; mornings are the busiest and most interesting time.",
  },
  "jade-market-hong-kong": {
    address: "Kansu Street and Battery Street, Yau Ma Tei, Kowloon, Hong Kong",
    website: "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-jade-market-and-jade-street.html",
    mapsQuery: "Jade Market, Yau Ma Tei",
    description: "A covered market in Yau Ma Tei packed with stalls selling jade bangles, pendants, carvings and other stones, from cheap trinkets to serious pieces. Quality and authenticity vary widely, so enjoy browsing and only buy expensive jade from a reputable dealer. It's a short walk from Temple Street Night Market, so the two combine well.",
  },
  "ladies-market-hong-kong": {
    address: "Tung Choi Street, Mong Kok, Kowloon, Hong Kong",
    mapsQuery: "Ladies' Market, Tung Choi Street, Mong Kok",
    description: "A long open-air street market on Tung Choi Street in Mong Kok selling clothes, bags, accessories, phone cases and souvenirs, with snack stalls nearby. Despite the name, it sells for everyone. Bargaining is expected, so start low and walk away politely if the price doesn't suit. Stalls are fullest from mid-afternoon into the evening.",
  },
  "lung-king-heen-hong-kong": {
    address: "4/F, Four Seasons Hotel, 8 Finance Street, Central, Hong Kong",
    website: "https://www.fourseasons.com/hongkong/dining/restaurants/lung_king_heen/",
    description: "The Four Seasons' Cantonese restaurant, which in 2009 became the first Chinese restaurant to earn three Michelin stars; it held them until 2022 and has two stars today. The harbour-view dining room serves refined Cantonese cooking, and its lunchtime dim sum is the most accessible way to try it. Book well ahead, especially for window tables.",
  },
  "mak-noodle-hong-kong": {
    address: "G/F, 77 Wellington Street, Central, Hong Kong",
    mapsQuery: "Mak's Noodle, 77 Wellington Street, Central",
    description: "A classic wonton noodle shop on Wellington Street, serving small bowls of springy egg noodles and shrimp wontons in a clear, flavourful broth, from a family recipe going back generations. It's tiny, fast and no-frills — you'll likely share a table and be done in 15 minutes. Portions are small, so order a side of noodles with beef brisket too.",
  },
  "stanley-market-hong-kong": {
    address: "Stanley Market Road, Stanley, Hong Kong",
    mapsQuery: "Stanley Market, Hong Kong",
    description: "A covered market in the seaside village of Stanley on the Island's south coast, selling clothes, silk, souvenirs, art and trinkets. It's easygoing rather than bargain-packed, and the real appeal is the setting: afterwards walk along the waterfront promenade to Murray House and Blake Pier. The scenic bus ride over the hills from Central is part of the trip.",
  },
  "ifc-mall-food-republic-hong-kong": {
    address: "Temple Street, Yau Ma Tei, Kowloon, Hong Kong",
    mapsQuery: "Temple Street Night Market, Hong Kong",
    description: "A long night market in Yau Ma Tei and Jordan where stalls sell souvenirs, gadgets and clothes, and open-air dai pai dong restaurants set up plastic tables for seafood, clay-pot rice and Cantonese dishes. Fortune tellers and street singers add to the atmosphere. It gets going after dark — about 7pm onwards is best — and is easy to explore alone.",
  },
  "tim-ho-wan-hong-kong": {
    address: "9–11 Fuk Wing Street, Sham Shui Po, Kowloon, Hong Kong",
    website: "https://www.timhowan.com/",
    description: "The dim sum shop famous for once being the world's cheapest Michelin-starred restaurant; the original Sham Shui Po branch is now a Michelin Bib Gourmand and has been recognised by the guide for 17 years running. Order the baked barbecue-pork buns, cheung fun and pan-fried turnip cake. Queues move quickly, and solo diners are seated fast.",
  },
  "ye-shanghai-hong-kong": {
    address: "6/F, Marco Polo Hongkong Hotel, 3 Canton Road, Tsim Sha Tsui, Kowloon, Hong Kong",
    mapsQuery: "Ye Shanghai, Marco Polo Hongkong Hotel, Tsim Sha Tsui",
    description: "An elegant Michelin-starred restaurant in the Marco Polo Hotel at Harbour City, serving Shanghainese and Jiangnan cooking: xiaolongbao soup dumplings, smoked fish, braised pork and seasonal hairy crab in autumn. The lunchtime dim sum is the most affordable way in, and the calm, well-spaced room suits a solo meal.",
  },
  "dragon-back-trail-hong-kong": {
    address: "To Tei Wan, Shek O Road, Shek O Country Park, Hong Kong",
    mapsQuery: "Dragon's Back Trail, To Tei Wan",
    description: "A ridge hike through Shek O Country Park on the Island's south-east corner, named Asia's best urban hike by TIME magazine in 2004. Start at To Tei Wan on Shek O Road, follow the undulating ridge with sea views on both sides, then descend to Big Wave Bay beach for a swim — roughly 8.5km. It's well marked and busy on weekends, quieter on weekdays.",
  },
  "nan-lian-garden-hong-kong": {
    address: "60 Fung Tak Road, Diamond Hill, Kowloon, Hong Kong",
    mapsQuery: "Nan Lian Garden, Diamond Hill",
    description: "A free public garden in Diamond Hill laid out in classical Tang dynasty style, with a gilded pavilion on a pond, a wooden bridge, sculpted rocks and carefully shaped pines. It connects to the timber halls of the Chi Lin Nunnery next door. A serene counterpoint to the tower blocks around it, and a short walk from Diamond Hill MTR.",
  },
  "victoria-peak-tram-hong-kong": {
    address: "Peak Tram Central Terminus, 33 Garden Road, Central, Hong Kong",
    website: "https://www.thepeak.com.hk/en",
    description: "One of the world's oldest funiculars, running since 1888 and upgraded with new sixth-generation cars in 2022, climbs steeply from Garden Road to Victoria Peak. At the top, the flat, easy Lugard Road loop gives the classic skyline view. Go around sunset to see the city light up, and walk down via Old Peak Road if you want to skip the tram queue back.",
  },
  "hong-kong-museum-of-history": {
    address: "100 Chatham Road South, Tsim Sha Tsui, Kowloon, Hong Kong",
    website: "https://hk.history.museum/",
    description: "The city's history museum in Tsim Sha Tsui, whose revamped permanent exhibition 'The Hong Kong Story' reopened on 1 April 2026 after nearly five years of renovation. More than 2,800 objects trace the region from its natural history and early villages through colonial times to today, with reconstructed streets and shops. A good rainy-day visit.",
  },
  "tai-o-fishing-village-hong-kong": {
    address: "Tai O, Lantau Island, Hong Kong",
    mapsQuery: "Tai O Fishing Village, Lantau",
    description: "A fishing village on the western coast of Lantau, known for its stilt houses built over tidal channels, dried-seafood and shrimp-paste stalls, and small temples. Short boat trips head out to look for Chinese white dolphins (often called pink dolphins), though sightings aren't guaranteed. Combine it with the Big Buddha at Ngong Ping by bus.",
  },
  "big-buddha-lantau-hong-kong": {
    address: "Ngong Ping, Lantau Island, Hong Kong",
    website: "https://www.plm.org.hk/",
    description: "The Tian Tan Buddha, a 34-metre bronze seated Buddha completed in 1993, sits on a hilltop at Ngong Ping on Lantau, reached by 268 steps. Next door, Po Lin Monastery serves a vegetarian lunch, and a short walk leads to the Wisdom Path. Ride up on the Ngong Ping 360 cable car from Tung Chung for sweeping views on the way.",
  },
  "tsim-sha-tsui-promenade-hong-kong": {
    address: "Salisbury Road, Tsim Sha Tsui, Kowloon, Hong Kong",
    mapsQuery: "Tsim Sha Tsui Promenade, Avenue of Stars",
    description: "The harbourfront walkway along the Tsim Sha Tsui waterfront, from the Star Ferry pier and Clock Tower east past the Avenue of Stars, with the whole Island skyline across the water. Every night at 8pm the Symphony of Lights, a roughly 10-minute light-and-music show, plays across the harbour's towers. It's free and one of Hong Kong's best places to be alone at dusk.",
  },
  "wong-tai-sin-temple-hong-kong": {
    address: "2 Chuk Yuen Village, Wong Tai Sin, Kowloon, Hong Kong",
    website: null,
    mapsQuery: "Wong Tai Sin Temple, Hong Kong",
    description: "One of Hong Kong's busiest temples, dedicated to the Taoist deity Wong Tai Sin and known for granting wishes. Worshippers shake bamboo fortune sticks (kau cim) amid clouds of incense, and a nearby arcade of fortune tellers interprets them. There's also a peaceful Good Wish Garden. It's right next to Wong Tai Sin MTR station and free to enter.",
  },
  "lan-kwai-fong-soho-hong-kong": {
    address: "Lan Kwai Fong, Central, Hong Kong",
    mapsQuery: "Lan Kwai Fong, Central, Hong Kong",
    description: "Central's nightlife hub: Lan Kwai Fong's small grid of bars and clubs, and uphill SoHo's restaurants and bars around Staunton and Elgin Streets. The Central–Mid-Levels escalator, one of the world's longest covered outdoor escalator systems, climbs from Queen's Road Central through SoHo. Busy and friendly — Thursday to Saturday nights are liveliest.",
  },
  "star-ferry-hong-kong": {
    address: "Central Pier 7, Central, Hong Kong",
    description: "The green-and-white ferries that have crossed Victoria Harbour between Tsim Sha Tsui and Central since the late 19th century. The ride takes under 10 minutes and costs only a few Hong Kong dollars (about HK$5–6.50 upper deck for adults), and you can pay with an Octopus card. Do it in both directions, and once at night when the skyline is lit.",
  },
};

(async () => {
  const city = await prisma.city.findUnique({ where: { slug: "hong-kong" }, select: { id: true } });
  if (!city) throw new Error("city hong-kong not found");
  console.log(APPLY ? "APPLYING to database…" : "DRY RUN (no changes). Re-run with --apply to write.");

  const toDelete = await prisma.spot.findMany({ where: { cityId: city.id, slug: { in: DELETE } }, select: { id: true, name: true } });
  for (const s of toDelete) console.log(`DELETE  ${s.name}`);
  if (APPLY && toDelete.length) await prisma.spot.deleteMany({ where: { id: { in: toDelete.map((s) => s.id) } } });

  const slugs = Object.keys(SPOTS);
  const existing = await prisma.spot.findMany({ where: { cityId: city.id, slug: { in: slugs } }, select: { id: true, slug: true, name: true } });
  const bySlug = Object.fromEntries(existing.map((s) => [s.slug, s]));
  for (const slug of slugs) {
    const spot = bySlug[slug];
    if (!spot) { console.warn(`  SKIP ${slug}: not found in city`); continue; }
    const { name, address, description, mapsQuery } = SPOTS[slug];
    if (description.length < 250) console.warn(`  WARN ${slug}: description only ${description.length} chars`);
    const data = {
      address,
      description,
      googleMapsUrl: maps(mapsQuery || `${name || spot.name}, ${address}`),
      ...(name ? { name } : {}),
      ...("website" in SPOTS[slug] ? { website: SPOTS[slug].website } : {}),
    };
    console.log(`UPDATE  ${name || spot.name}  (${slug})  desc ${description.length}${name ? `  [rename from ${spot.name}]` : ""}`);
    if (APPLY) await prisma.spot.update({ where: { id: spot.id }, data });
  }
  console.log(`\nDone. ${toDelete.length}/${DELETE.length} deleted, ${existing.length}/${slugs.length} ${APPLY ? "updated" : "would be updated (dry run)"}.`);
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
