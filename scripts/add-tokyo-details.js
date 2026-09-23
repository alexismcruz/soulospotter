// Tokyo spot enrichment — all 20 spots had no address and no website; every description was under 150 chars.
// Researched 2026-09-23. All venues verified open.
//
// Status/fact checks:
//   - Park Hyatt Tokyo: closed spring 2024 for a 19-month renovation, reopened 9 Dec 2025; New York Bar kept
//     (Hyatt newsroom, Japan Times). hyatt.com returns 403 to bots but is the official page.
//   - Koffee Mameya Omotesando: still open (standing, takeaway only); omakase tastings moved to Koffee Mameya
//     Kakeru in Kiyosumi-Shirakawa (reservation) — mentioned so readers aren't surprised.
//   - WeWork Shibuya: the location is WeWork Shibuya Scramble Square (39F–45F, check-in 17F) — renamed.
//   - teamLab Planets: extended to the end of 2027.
//   - Tsukiji Outer Market: ~460 shops, closed Sundays and some Wednesdays, no eating while walking (official site).
//   - Imperial Palace East Gardens: free, closed Mondays and Fridays (Imperial Household Agency).
//   - Omoide Yokocho ~60 bars/eateries, postwar black-market origins (official site); Golden Gai ~200 bars in six
//     alleys, cover charges typically ¥500–1,500.
// Sources: official sites below, JNTO/GO TOKYO, japan-guide, Tokyo Cheapo, Nui (opened 2012, Kuramae).
//
//   node scripts/add-tokyo-details.js            (dry run)
//   node scripts/add-tokyo-details.js --apply     (write)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const SPOTS = {
  "nui-hostel-tokyo": {
    address: "2-14-13 Kuramae, Taito-ku, Tokyo 111-0051, Japan",
    website: "https://backpackersjapan.co.jp/nuihostel/english.html",
    description: "A hostel in a converted warehouse in Kuramae, two minutes from Kuramae Station and a short walk to Asakusa and the Sumida River. Opened in 2012 by Backpackers' Japan, its big ground-floor lounge is a café by day and a bar from 6pm, drawing locals as well as guests — one of the easiest places in Tokyo to fall into conversation over a drink.",
  },
  "park-hyatt-tokyo": {
    address: "3-7-1-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo 163-1055, Japan",
    website: "https://www.hyatt.com/park-hyatt/en-US/tyoph-park-hyatt-tokyo",
    description: "The Shinjuku sky-hotel made famous by 'Lost in Translation', occupying the top floors of a tower in Nishi-Shinjuku. It reopened in December 2025 after a 19-month renovation that kept its spirit intact, including the 52nd-floor New York Bar with live jazz and huge night views. Even if you don't stay, a solo cocktail at the bar is a classic Tokyo evening.",
  },
  "unplan-kagurazaka-tokyo": {
    address: "23-1 Tenjincho, Shinjuku-ku, Tokyo 162-0808, Japan",
    website: "https://unplan.jp/kagurazaka/",
    description: "A design-led hostel in Kagurazaka, a quiet, old-fashioned neighbourhood of stone lanes, small restaurants and shrines a few stops from Shinjuku. It has dorms and private rooms, a café-lounge that's open to the public and a rooftop terrace. A calmer alternative to hostels in the big nightlife districts, while still being central and well connected.",
  },
  "fuglen-tokyo": {
    address: "1-16-11 Tomigaya, Shibuya-ku, Tokyo 151-0063, Japan",
    website: "https://fuglencoffee.jp/en/pages/fuglen-tokyo",
    description: "The Tokyo outpost of Oslo's Fuglen, in leafy Tomigaya between Shibuya and Yoyogi Park. By day it's an espresso bar serving light, Nordic-style roasts in a room full of vintage Norwegian furniture; in the evening it becomes a cocktail bar with drinks built on aquavit and Japanese ingredients. Good for a morning coffee after a Yoyogi Park walk.",
  },
  "koffee-mameya-tokyo": {
    address: "4-15-3 Jingumae, Shibuya-ku, Tokyo 150-0001, Japan",
    website: "https://koffee-mameya.com/",
    description: "A tiny standing coffee counter in the backstreets of Omotesando, opened in 2017 on the site of the much-loved Omotesando Koffee. Baristas talk you through a menu of beans from roasters around the world and brew your choice with great care. There's no seating — drinks are takeaway. For a sit-down tasting course, book its sister shop, Koffee Mameya Kakeru.",
  },
  "wework-shibuya-tokyo": {
    name: "WeWork Shibuya Scramble Square",
    address: "39F, Shibuya Scramble Square, 2-24-12 Shibuya, Shibuya-ku, Tokyo 150-6139, Japan",
    website: "https://www.wework.com/buildings/shibuya-scramble-square--tokyo",
    description: "A WeWork high up in Shibuya Scramble Square, directly above Shibuya Station, spread over several floors from the 39th upwards with sweeping city views. Each floor has a community lounge, and there are private rooms, a café-bar and phone booths. Check in on the 17th floor. A very convenient base for a work trip, with the whole city a train ride away.",
  },
  "omoide-yokocho-tokyo": {
    address: "1-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo 160-0023, Japan",
    website: "https://en.shinjuku-omoide.com/",
    description: "A cluster of narrow lanes beside Shinjuku Station's west exit that grew out of a postwar black market. Around 60 tiny bars and eateries, mostly yakitori and grilled offal counters, seat a handful of people each under lanterns and clouds of smoke. Squeeze onto a stool, order a few skewers and a beer, and you'll soon be chatting with the person next to you.",
  },
  "tsukiji-outer-market-tokyo": {
    address: "4-16-2 Tsukiji, Chuo-ku, Tokyo 104-0045, Japan",
    website: "https://www.tsukiji.or.jp/english/",
    description: "The wholesale fish market moved to Toyosu in 2018, but Tsukiji's outer market lives on: about 460 shops and stalls selling fresh sushi and seafood bowls, tamagoyaki omelette, knives and kitchenware. Most shops open early and close by early afternoon, and it's closed on Sundays and some Wednesdays. Eat at the stalls rather than while walking.",
  },
  "akihabara-tokyo": {
    address: "Sotokanda, Chiyoda-ku, Tokyo 101-0021, Japan",
    mapsQuery: "Akihabara Electric Town, Tokyo",
    description: "Tokyo's 'Electric Town', once known for electronics shops and now the centre of anime, manga and gaming culture. Multi-storey stores sell figures, retro video games and trading cards, and arcades fill whole buildings with claw machines and rhythm games. On Sunday afternoons the main street, Chuo-dori, is often closed to cars, which makes wandering even easier.",
  },
  "harajuku-takeshita-tokyo": {
    address: "1 Jingumae, Shibuya-ku, Tokyo 150-0001, Japan",
    mapsQuery: "Takeshita Street, Harajuku, Tokyo",
    description: "A short, crowded pedestrian street opposite Harajuku Station, packed with youth-fashion shops, kawaii accessories, crêpe stands and candy-coloured sweets. It's busiest on weekends, when it's great for people-watching. Afterwards, escape to the calm of Meiji Shrine across the tracks, or walk down to the designer boutiques and cafés of Omotesando.",
  },
  "shibuya-crossing-tokyo": {
    address: "Shibuya Station Hachiko Exit, Shibuya-ku, Tokyo 150-0043, Japan",
    mapsQuery: "Shibuya Scramble Crossing",
    description: "The famous scramble outside Shibuya Station's Hachiko exit, where traffic stops in every direction and thousands of people cross at once under giant video screens. Walk it yourself, then watch from above — the Shibuya Sky rooftop and the upper floors of Shibuya Scramble Square give the best views. Don't miss the Hachiko dog statue by the exit.",
  },
  "the-imperial-palace-tokyo": {
    address: "1-1 Chiyoda, Chiyoda-ku, Tokyo 100-8111, Japan",
    website: "https://www.kunaicho.go.jp/en/visit/event/higashigyoen/",
    mapsQuery: "Imperial Palace East Gardens, Tokyo",
    description: "The former inner compound of Edo Castle, open to the public free of charge since 1968. Huge stone walls, moats and gatehouses surround landscaped gardens, and you can climb the base of the old castle keep for a view over the grounds. There's no ticket or booking — just a bag check at the gate. Closed Mondays and Fridays.",
  },
  "shinjuku-gyoen-tokyo": {
    address: "11 Naitomachi, Shinjuku-ku, Tokyo 160-0014, Japan",
    website: "https://policies.env.go.jp/national-garden/shinjukugyoen/index.html",
    description: "A national garden a short walk from Shinjuku Station, combining formal French, landscape English and traditional Japanese gardens, plus a large greenhouse of tropical plants. It's one of Tokyo's best cherry-blossom spots, with many varieties that bloom at different times. There's a small entry fee, alcohol isn't allowed, and it's closed on Mondays.",
  },
  "ueno-park-tokyo": {
    address: "Uenokoen, Taito-ku, Tokyo 110-0007, Japan",
    website: "https://www.kensetsu.metro.tokyo.lg.jp/jimusho/toubuk/ueno/index_top.html",
    mapsQuery: "Ueno Park, Tokyo",
    description: "One of Japan's first public parks, opened in 1873 beside Ueno Station, home to the Tokyo National Museum, the National Museum of Western Art, Ueno Zoo and several temples and shrines. Shinobazu Pond is covered in lotus in summer, and the main avenue is one of Tokyo's most famous — and busiest — cherry-blossom viewing spots in spring.",
  },
  "meiji-shrine-tokyo": {
    address: "1-1 Yoyogikamizonocho, Shibuya-ku, Tokyo 151-8557, Japan",
    website: "https://www.meijijingu.or.jp/en/",
    description: "A Shinto shrine dedicated to Emperor Meiji and Empress Shoken, completed in 1920 and set in a large man-made forest right next to Harajuku Station. Gravel paths lead through huge wooden torii gates past walls of decorated sake barrels to the main shrine. It's free to enter and feels miles from the city — lovely early in the morning.",
  },
  "senso-ji-tokyo": {
    address: "2-3-1 Asakusa, Taito-ku, Tokyo 111-0032, Japan",
    website: "https://www.senso-ji.jp/english/",
    description: "Tokyo's oldest temple, in Asakusa, traditionally founded in the 7th century. Enter through the Kaminarimon gate with its giant red lantern, then walk up Nakamise-dori, lined with snack and souvenir stalls, to the main hall and five-storey pagoda. The grounds are open around the clock and are beautifully lit and much quieter after dark.",
  },
  "teamlab-planets-tokyo": {
    address: "6-1-16 Toyosu, Koto-ku, Tokyo 135-0061, Japan",
    website: "https://www.teamlab.art/e/planets/",
    description: "An immersive digital-art museum where you walk barefoot through rooms of knee-deep water, mirrored light installations and floating flowers. It's a minute from Shin-Toyosu Station and has been extended until the end of 2027. Tickets are timed and sell out, so book online in advance, and wear shorts or trousers that roll up above the knee.",
  },
  "tokyo-skytree": {
    address: "1-1-2 Oshiage, Sumida-ku, Tokyo 131-0045, Japan",
    website: "https://www.tokyo-skytree.jp/en/",
    description: "At 634m, Tokyo Skytree is the world's tallest tower, opened in 2012 as a broadcasting tower near Asakusa. The Tembo Deck at 350m has floor-to-ceiling windows, and the higher Tembo Galleria at 450m is a spiralling glass walkway. On clear days, especially in winter mornings, you can see Mount Fuji. Combine it with a walk from Senso-ji across the river.",
  },
  "tokyo-tower": {
    address: "4-2-8 Shibakoen, Minato-ku, Tokyo 105-0011, Japan",
    website: "https://www.tokyotower.co.jp/en/",
    description: "The red-and-white 333m tower, completed in 1958 and inspired by the Eiffel Tower, was Japan's tallest structure until Skytree opened. The Main Deck at 150m can be reached by lift or by climbing about 600 outdoor steps, and there's a higher Top Deck. It's lit up in warm orange at night; Zojo-ji temple at its foot makes a good photo stop.",
  },
  "golden-gai-tokyo": {
    address: "1-1 Kabukicho, Shinjuku-ku, Tokyo 160-0021, Japan",
    mapsQuery: "Shinjuku Golden Gai",
    description: "Six narrow alleys in Shinjuku packed with around 200 tiny bars, many seating only five to ten people, each with its own theme and regulars. Most charge a cover of roughly ¥500–1,500, sometimes including a drink, and some are members- or regulars-only, so look for signs welcoming visitors. Taking photos inside bars usually isn't allowed.",
  },
};

(async () => {
  const city = await prisma.city.findUnique({ where: { slug: "tokyo" }, select: { id: true } });
  if (!city) throw new Error("city tokyo not found");
  console.log(APPLY ? "APPLYING to database…" : "DRY RUN (no changes). Re-run with --apply to write.");

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
  console.log(`\nDone. ${existing.length}/${slugs.length} ${APPLY ? "updated" : "would be updated (dry run)"}.`);
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
