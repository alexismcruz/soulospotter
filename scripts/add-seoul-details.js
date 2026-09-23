// Seoul spot enrichment — verified addresses, official links, and descriptions rewritten from
// checked facts (34 of 36 descriptions were under 150 chars). Researched 2026-09-23.
//
// Corrections found while verifying (the old data was wrong, not just thin):
//   - Siloam Sauna (49 Jungnim-ro, near Seoul Station) closed in late 2021 — DELETED below.
//   - WeWork Gangnam: address was "396 Seocho-daero"; real is 10F, 373 Gangnam-daero (wework.com).
//   - Nine Tree: rebranded "Nine Tree by Parnas Seoul Insadong"; address is 49 Insadong-gil, not
//     Samil-daero (ninetreehotels.com/nth3).
//   - RYSE: now "RYSE, Autograph Collection" (marriott.com, rysehotel.com); rooftop bar is Side Note Club.
//   - Fritz Coffee Dohwa: 17 Saechang-ro 2-gil (was 83 Saechang-ro).
//   - Anthracite Hapjeong: 10 Tojeong-ro 5-gil (was 11) — per VisitSeoul (official city guide).
//   - Zzzip Guesthouse: 32-16 Seongji 1-gil near Hapjeong Stn (was a bare "Wausan-ro").
//   - Heyground: 5 Ttukseom-ro 1na-gil (was a bare "Achasan-ro").
//   - Southside Parlor: NOT a converted hanok (old desc was wrong) — 4F, 218 Noksapyeong-daero,
//     opened 2013 by Texan expats, rooftop terrace (Time Out, World's 50 Best Discovery, Korea Times).
//   - Mapo Jeong Daepo: known for galmaegisal grilled with an egg ring (Bourdain feature); the old
//     "salt-fire spectacle" claim had no source. Address 183-16 Dohwa-dong.
//   - Han River Yeouido: old desc put the Banpo fountain "nearby" — it's at Banpo, ~5km away.
//   - Cheonggyecheon: restored downtown stretch is 5.8km (old desc said 11km).
//
// Other sources: Gwangjang (Seoul Metropolitan Govt, Wikipedia — founded 1905); Tosokchon (est. 1983,
// ~400 seats, Roh Moo-hyun); Noryangjin buy-downstairs/eat-upstairs system (multiple 2025 guides);
// Changdeokgung Huwon guided-tour-only, bookings open 6 days ahead, closed Mondays (VisitSeoul);
// Gyeongbokgung 1395, closed Tue, hanbok free entry, guard ceremony 10:00/14:00 (Korea.net);
// Bukchon Red Zone tourist hours 10:00–17:00 enforced from March 2025 (Seoul Metropolitan Govt notice);
// Ikseon-dong built late 1920s by Jeong Se-gwon (Seoul Metropolitan Govt); Ssamziegil opened 2004;
// DDP opened 2014, ~45,000 aluminium panels (Dezeen, ZHA); Deoksugung main palace of Korean Empire
// 1897–1910, Seokjojeon (Seoul Metropolitan Govt); War Memorial opened 1994, free, closed Mon;
// National Museum free permanent galleries, Gyeongcheonsa pagoda indoors since 2005; Namsan cable car
// since 1962; Seoul Forest opened 2005 on old water-treatment site, sika deer (Wikipedia, VisitKorea);
// Bukhansan Baegundae 836m via Bukhansanseong 3.4km one way (KNPS via guides); Euljiro Nogari Alley
// (VisitKorea); Dragon Hill Spa 24h, 7 floors (Trazy, Tripadvisor).
//
// Links deliberately NOT added (couldn't be verified as reachable): deoksugung.go.kr (DNS doesn't
// resolve — used Seoul Metropolitan Govt page instead), dragonhillspa.co.kr, knps.or.kr (refuses
// non-Korean connections), southsideparlor.com. Those spots get a Maps link only.
//
//   node scripts/add-seoul-details.js            (dry run)
//   node scripts/add-seoul-details.js --apply     (write)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const DELETE = ["siloam-sauna-seoul"]; // closed since late 2021

const SPOTS = {
  "l7-hongdae-seoul": {
    address: "141 Yanghwa-ro, Mapo-gu, Seoul 03995, South Korea",
    description: "A design-led Lotte hotel a minute's walk from Hongik University Station, so Hongdae's buskers, bars and late-night food are right outside the door. The rooftop has an open-air pool and a bar called Floating with sunset and skyline views, plus an Italian bistro downstairs — easy to eat and drink well on a solo night in without leaving the building.",
  },
  "nine-tree-insadong-seoul": {
    name: "Nine Tree by Parnas Seoul Insadong",
    address: "49 Insadong-gil, Jongno-gu, Seoul 03145, South Korea",
    website: "https://www.ninetreehotels.com/nth3/",
    description: "Part of Parnas's Nine Tree hotel group, set right on Insadong-gil, so teahouses, galleries and Ssamziegil are on the doorstep and Jogyesa Temple, Ikseon-dong and the palaces of Jongno are all a short walk away. A straightforward, central base for a first solo trip to Seoul if you'd rather walk to the old neighbourhoods than ride the subway everywhere.",
  },
  "ryse-hotel-seoul": {
    name: "RYSE, Autograph Collection",
    address: "130 Yanghwa-ro, Mapo-gu, Seoul, South Korea",
    website: "https://rysehotel.com/",
    description: "A Marriott Autograph Collection hotel in the middle of Hongdae, Seoul's liveliest neighbourhood for indie music, street performers and late bars. Its 15th-floor rooftop cocktail bar, Side Note Club, looks out over Hongdae and is built around music and mixology — an easy place to take a seat at the bar alone and watch the neighbourhood light up.",
  },
  "zzzip-guesthouse-hongdae": {
    address: "32-16 Seongji 1-gil, Mapo-gu, Seoul, South Korea",
    description: "A small, colourful guesthouse in the lanes about four minutes' walk from Hapjeong Station (Lines 2 and 6), within walking distance of Hongdae. It has both bunk-bed dorms and private rooms, plus a shared kitchen, lounge and terrace, and breakfast is available. A good budget pick if you want the Hongdae–Hapjeong café scene without sleeping right above the clubs.",
  },
  "anthracite-coffee-seoul": {
    address: "10 Tojeong-ro 5-gil, Mapo-gu, Seoul, South Korea",
    description: "The original branch of Anthracite, one of Korea's best-known home-grown roasters, in a converted shoe factory in Hapjeong that keeps its concrete walls, stone floors and exposed beams. Coffee is roasted on site and the blends are named after writers — you can order a Pablo Neruda or a Natsume Sōseki. The big open space suits a long solo sit with a book or laptop.",
  },
  "cafe-onion-anguk-seoul": {
    address: "5 Gyedong-gil, Jongno-gu, Seoul, South Korea",
    description: "Onion's Anguk branch fills a 1920s hanok near Anguk Station, restored so you can still see the wooden maru floor and the open courtyard. It's known for its pastries — the sugar-dusted pandoro is the signature — and a vanilla bean latte. It gets busy, so go early on a weekday; it's steps from Bukchon and Changdeokgung, so it pairs well with a morning palace visit.",
  },
  "coffee-hanyakbang-seoul": {
    address: "16-6 Samil-daero 12-gil, Jung-gu, Seoul, South Korea",
    website: "https://coffeehanyakbang.com/",
    description: "A tiny, antique-filled coffee house hidden down an alley in Euljiro, a short walk from Euljiro 3-ga Station (Exit 1). The name means 'coffee herbal-medicine shop', and the baristas treat hand-drip like a pharmacist brewing a remedy — beans are roasted over direct fire and brewed by hand. A good stop on a solo wander through the old printing-shop alleys of Euljiro.",
  },
  "fritz-coffee-company-seoul": {
    address: "17 Saechang-ro 2-gil, Mapo-gu, Seoul, South Korea",
    description: "Fritz's original Dohwa branch near Gongdeok Station, in a converted old house with brick walls, timber beams and vintage touches. The retro seal logo has become a cult item, but the reason to come is the house-roasted coffee and daily baking — croissants, country loaves and more. Pair it with a galmaegisal dinner at nearby Mapo Jeong Daepo for a good solo afternoon in Mapo.",
  },
  "heyground-seongsu-seoul": {
    address: "5 Ttukseom-ro 1na-gil, Seongdong-gu, Seoul 04766, South Korea",
    description: "An eight-storey coworking building in Seongsu opened in 2017 by Root Impact for social ventures, non-profits and freelancers working on social impact. There's a lounge, shared kitchen, event spaces and indoor bike parking, and it's about five minutes on foot from Ttukseom Station (Line 2) or Seoul Forest Station — handy for mixing work with a walk in Seoul Forest.",
  },
  "wework-gangnam-seoul": {
    name: "WeWork Gangnam Station",
    address: "10F, 373 Gangnam-daero, Seocho-gu, Seoul 06621, South Korea",
    website: "https://www.wework.com/buildings/gangnam-station--seoul",
    description: "WeWork's first location in Seoul, right by Gangnam Station, with coworking floors, art-filled lounges and private offices with floor-to-ceiling windows over one of the city's busiest business districts. A reliable professional base for a work trip — Gangnam Station is on Line 2 and the Sinbundang Line, so the rest of Seoul is easy to reach from here.",
  },
  "gwangjang-market": {
    address: "88 Changgyeonggung-ro, Jongno-gu, Seoul, South Korea",
    website: "https://english.seoul.go.kr/gwangjang-market/",
    description: "Founded in 1905 as Korea's first permanent daily market, Gwangjang is still one of Seoul's biggest traditional markets. The central food alley is where solo travellers eat: take a stool at a stall counter for bindaetteok (crispy mung bean pancakes fried to order) and mayak gimbap, the small, moreish rice rolls. Pointing at what looks good works perfectly well.",
  },
  "mapo-jeong-daepo-bbq-seoul": {
    address: "183-16 Dohwa-dong, Mapo-gu, Seoul, South Korea",
    description: "A long-running pork barbecue joint on Dohwa-gil near Gongdeok Station, famous for galmaegisal (pork skirt meat) grilled over charcoal on a grill ringed with beaten egg, kimchi and onion that cooks in the running fat — wrap it all in a perilla leaf with ssamjang. It was featured by Anthony Bourdain and is still packed with local office workers on weeknights.",
  },
  "myeongdong-street-food-seoul": {
    address: "Myeong-dong, Jung-gu, Seoul, South Korea",
    mapsQuery: "Myeongdong Street Food, Seoul",
    description: "Myeongdong's pedestrian shopping streets turn into Seoul's best-known street-food strip every evening, with carts setting up from late afternoon and crowds peaking from about 7 to 10pm. Expect tornado potatoes, grilled cheese lobster, hotteok and gyeranppang (egg bread). It's touristy and pricier than the markets, but easy and fun to graze alone, and close to the Namsan cable car.",
  },
  "noryangjin-fish-market-seoul": {
    address: "674 Nodeul-ro, Dongjak-gu, Seoul, South Korea",
    description: "Seoul's big seafood wholesale market, now in a bright modern building next to Noryangjin Station. The routine is simple: buy live fish, shellfish or crab from the vendors on the main floor, then take it upstairs to one of the second-floor restaurants, which charge a small table fee to slice it as sashimi or cook it for you. A lively, unpretentious solo meal.",
  },
  "tosokchon-samgyetang-seoul": {
    address: "5 Jahamun-ro 5-gil, Jongno-gu, Seoul, South Korea",
    description: "Open since 1983 in a sprawling hanok near Gyeongbokgung Station (Exit 2), Tosokchon is Seoul's most famous place for samgyetang — a whole young chicken stuffed with rice and ginseng in a milky broth. It was a favourite of former president Roh Moo-hyun and seats around 400, so even the long queue moves quickly. Every bowl is a single serving, so eating alone is the norm.",
  },
  "dragon-hill-spa-seoul": {
    address: "40-712 Hangangno 3-ga, Yongsan-gu, Seoul, South Korea",
    description: "One of Seoul's biggest and best-known jjimjilbang, next to Yongsan Station: seven floors of bathing pools, themed sauna rooms, a garden area, restaurants, and even a cinema and noraebang. It's open 24 hours, so solo travellers use it for a late-night soak or a budget overnight in the sleeping areas. Bathing areas are single-sex and nude; the sauna floors are mixed, in the clothes provided.",
  },
  "hongdae-seoul": {
    address: "Hongik-ro, Mapo-gu, Seoul, South Korea",
    mapsQuery: "Hongdae, Seoul",
    description: "The neighbourhood around Hongik University, Seoul's art school, and the city's centre of indie music, street performance and nightlife. Evenings bring buskers and dance crews to the streets around Hongik University Station, and Gyeongui Line Forest Park, a linear park built on an old railway line, is a relaxed place to sit outside. Easy to explore alone and busy late into the night.",
  },
  "ikseon-dong-seoul": {
    address: "Ikseon-dong, Jongno-gu, Seoul, South Korea",
    mapsQuery: "Ikseon-dong Hanok Village, Seoul",
    website: "https://english.seoul.go.kr/ikseon-dong-2/",
    description: "One of Seoul's oldest hanok neighbourhoods, built from the late 1920s by developer Jeong Se-gwon as affordable homes for ordinary Korean families. Its narrow alleys are now full of cafés, bakeries and small shops in converted hanok. It's compact and walkable from Jongno 3-ga Station, and the pojangmacha tent bars on nearby Jongno give you somewhere to end the evening.",
  },
  "insadong-seoul": {
    address: "Insadong-gil, Jongno-gu, Seoul, South Korea",
    mapsQuery: "Insadong, Seoul",
    website: "https://english.visitseoul.net/walking-tour/Insadong-Course/ENN000653",
    description: "Seoul's traditional arts-and-crafts street, lined with galleries, pottery and hanji paper shops, and wooden teahouses. The centrepiece is Ssamziegil, opened in 2004, where a spiralling ramp climbs past about 70 small shops and workshops to a rooftop. Perfect for an easy solo afternoon, and within walking distance of Jogyesa Temple, Ikseon-dong and Bukchon.",
  },
  "bukhansan-national-park": {
    address: "Jeongneung-gil, Seongbuk-gu, Seoul, South Korea",
    mapsQuery: "Bukhansan National Park",
    description: "A national park inside Seoul's city limits, with granite peaks, forest trails and the Joseon-era Bukhansanseong fortress walls. The classic route runs from the Bukhansanseong trailhead to Baegundae, the highest peak at 836m — about 3.4km one way and roughly 2.5–3 hours up, with steep rocky sections and fixed cables near the top. Start early, carry water, and go on a weekday if you can.",
  },
  "cheonggyecheon-stream-seoul": {
    address: "Cheonggyecheon-ro, Jongno-gu, Seoul, South Korea",
    mapsQuery: "Cheonggye Plaza, Seoul",
    description: "A stream through downtown Seoul that lay buried under an elevated highway until 2003, when the city tore the road down and restored the water; the 5.8km downtown stretch opened in October 2005. The sunken walkway of stepping stones, small waterfalls and bridges starts at Cheonggye Plaza near Gwanghwamun, and it's a calm, well-lit route to walk alone in the evening.",
  },
  "han-river-yeouido-park-seoul": {
    address: "Yeouido-dong, Yeongdeungpo-gu, Seoul, South Korea",
    mapsQuery: "Yeouido Hangang Park, Seoul",
    website: "https://hangang.seoul.go.kr/",
    description: "The busiest of Seoul's riverside parks, reached from Yeouinaru Station (Line 5, Exits 2 or 3). Rent a bike at the kiosks near the station to ride the Han River paths, sit on the lawns with instant ramyeon from a riverside convenience store, or join the evening crowds around the Waterlight Square fountain. One of the easiest places in Seoul to spend a relaxed evening alone.",
  },
  "namsan-park-seoul": {
    address: "Namsangongwon-gil, Yongsan-gu, Seoul, South Korea",
    mapsQuery: "Namsan Park, Seoul",
    website: "https://parks.seoul.go.kr/",
    description: "The forested mountain in the middle of Seoul, criss-crossed with walking trails and topped by N Seoul Tower. Walk up from the Myeongdong side, or take the Namsan cable car, which has run since 1962 and takes about three minutes. The paths along the old Seoul city wall and the summit viewpoints give some of the best panoramas of the city, especially at dusk.",
  },
  "seoul-forest-park": {
    address: "273 Ttukseom-ro, Seongdong-gu, Seoul, South Korea",
    website: "https://parks.seoul.go.kr/",
    description: "A large riverside park that opened in 2005 on the site of an old water-treatment plant, itself once a royal hunting ground. It has wide lawns, wetlands and an enclosure of sika deer, and borders Seongsu, Seoul's warehouse-café district. Pair a morning walk here with coffee in Seongsu or a work session at nearby Heyground for an easy solo day on the east side.",
  },
  "bukchon-hanok-village-seoul": {
    address: "37 Gyedong-gil, Jongno-gu, Seoul, South Korea",
    website: "https://english.seoul.go.kr/notice-on-restrictions-for-tourist-visits-to-bukchon-special-management-area-effective-from-november-2024/",
    description: "A hillside neighbourhood of preserved hanok homes between Gyeongbokgung and Changdeokgung palaces, with sloping lanes and rooftop views over old Seoul. People still live here: since March 2025 tourists may only enter the core 'Red Zone' around Bukchon-ro 11-gil between 10am and 5pm, with fines outside those hours. Go in the morning, keep your voice down, and enjoy a lovely solo wander.",
  },
  "changdeokgung-palace-seoul": {
    address: "99 Yulgok-ro, Jongno-gu, Seoul, South Korea",
    description: "A UNESCO World Heritage Site and often called the loveliest of Seoul's Joseon palaces, laid out to follow the hills rather than a strict grid. Its rear Secret Garden (Huwon), with pavilions and ponds, can only be seen on timed guided tours — some in English — and online tickets open six days ahead and sell out, so book early. The palace is closed on Mondays.",
  },
  "deoksugung-palace-seoul": {
    address: "99 Sejong-daero, Jung-gu, Seoul, South Korea",
    website: "https://english.seoul.go.kr/deoksugung-palace-2/",
    description: "A compact palace opposite Seoul Plaza that mixes traditional wooden halls with Western-style stone buildings — it was the main palace of the Korean Empire (1897–1910). Seokjojeon, the neoclassical hall, now houses the Daehan Empire History Museum. Afterwards, walk the tree-lined Deoksugung stone-wall road, one of Seoul's prettiest streets, especially in autumn.",
  },
  "dongdaemun-design-plaza-seoul": {
    address: "281 Eulji-ro, Jung-gu, Seoul, South Korea",
    website: "https://ddp.or.kr/",
    description: "Zaha Hadid's curving landmark, opened in 2014 and clad in about 45,000 aluminium panels, housing exhibition halls, a design museum and shops. It sits in the Dongdaemun fashion district, whose wholesale malls trade late into the night, so it makes a good evening stop — the plaza is lit up after dark and it's easy and comfortable to wander around alone.",
  },
  "gyeongbokgung-palace-seoul": {
    address: "161 Sajik-ro, Jongno-gu, Seoul, South Korea",
    description: "Seoul's grandest palace, built in 1395 by King Taejo, founder of the Joseon dynasty, beneath Bugaksan mountain. Don't miss Gyeonghoeru, the two-storey banquet pavilion floating on a lotus pond, or the royal guard changing ceremony at Gwanghwamun Gate at 10am and 2pm. Entry is free if you're wearing hanbok, and the palace is closed on Tuesdays.",
  },
  "jogyesa-temple-seoul": {
    address: "55 Ujeongguk-ro, Jongno-gu, Seoul, South Korea",
    website: "https://eng.templestay.com/temple_info.asp?t_id=jogyesa",
    description: "The chief temple and headquarters of the Jogye Order, Korea's largest Buddhist order, right in downtown Seoul next to Insadong. It's free to enter, and around Buddha's Birthday the courtyard is canopied with thousands of lanterns. Jogyesa also runs short Templestay programmes aimed at foreign visitors that don't require an overnight stay — a calm counterpoint to a busy day.",
  },
  "national-museum-of-korea-seoul": {
    address: "137 Seobinggo-ro, Yongsan-gu, Seoul, South Korea",
    description: "Korea's national museum, a vast building in Yongsan facing the Han River with Namsan behind it. The permanent galleries are free and run from prehistoric tools and Silla gold crowns to Buddhist sculpture. The showstopper is the Gyeongcheonsa ten-storey marble pagoda, displayed indoors since 2005. An underground walkway links the museum to Ichon Station.",
  },
  "n-seoul-tower": {
    address: "105 Namsangongwon-gil, Yongsan-gu, Seoul, South Korea",
    description: "The broadcast tower on top of Namsan, with observation decks close to 480m above sea level for 360-degree views over the city. Reach it on foot through Namsan Park or by the Namsan cable car, then find the love-lock terraces at the base. It's most rewarding at dusk, when you can watch the whole city switch on its lights below you.",
  },
  "war-memorial-of-korea-seoul": {
    address: "29 Itaewon-ro, Yongsan-gu, Seoul, South Korea",
    description: "Opened in 1994 on the former army headquarters site, this large museum tells Korea's military history with a focus on the Korean War. The permanent exhibitions are free, and the outdoor grounds hold tanks, artillery, aircraft and a ship you can board. Allow two to three hours. It's closed on Mondays and a short walk from Samgakji Station.",
  },
  "euljiro-nogari-alley-seoul": {
    address: "Euljiro 13-gil, Jung-gu, Seoul, South Korea",
    mapsQuery: "Euljiro Nogari Alley, Seoul",
    website: "https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=176867",
    description: "After work, a small street in Euljiro fills with metal tables and plastic stools as pubs like Manseon Hof pour cheap draft beer and serve nogari — dried young pollack with a dipping sauce. Once a snack for the area's printing-shop workers, it's now loved by the young crowd who nicknamed the district 'Hipjiro'. Grab the end of a shared table; solo drinkers blend right in.",
  },
  "southside-parlor-seoul": {
    address: "4F, 218 Noksapyeong-daero, Yongsan-gu, Seoul 04345, South Korea",
    description: "A cocktail bar opened in 2013 by Texan expats, on the fourth floor above Thunder Burger across from Noksapyeong Station (Line 6, Exit 2). Expect well-made craft cocktails, Texas-style bar food, arcade games and a rustic rooftop terrace. It's listed on World's 50 Best Discovery, and the friendly bar counter makes it an easy first stop for a solo night out in Itaewon.",
  },
};

(async () => {
  const city = await prisma.city.findUnique({ where: { slug: "seoul" }, select: { id: true } });
  if (!city) throw new Error("city seoul not found");
  console.log(APPLY ? "APPLYING to database…" : "DRY RUN (no changes). Re-run with --apply to write.");

  const slugs = Object.keys(SPOTS);
  const existing = await prisma.spot.findMany({ where: { cityId: city.id, slug: { in: slugs } }, select: { id: true, slug: true, name: true } });
  const bySlug = Object.fromEntries(existing.map((s) => [s.slug, s]));

  for (const slug of slugs) {
    const spot = bySlug[slug];
    if (!spot) { console.warn(`  SKIP ${slug}: not found in city`); continue; }
    const { name, address, website, description, mapsQuery } = SPOTS[slug];
    if (description.length < 250) console.warn(`  WARN ${slug}: description only ${description.length} chars`);
    const data = {
      address,
      description,
      googleMapsUrl: maps(mapsQuery || `${name || spot.name}, ${address}`),
      ...(name ? { name } : {}),
      ...(website ? { website } : {}),
    };
    console.log(`\nUPDATE  ${name || spot.name}  (${slug})  desc ${description.length} chars`);
    console.log(`   address: ${address}`);
    if (name) console.log(`   rename:  ${spot.name} -> ${name}`);
    if (website) console.log(`   website: ${website}`);
    if (APPLY) await prisma.spot.update({ where: { id: spot.id }, data });
  }

  const toDelete = await prisma.spot.findMany({ where: { cityId: city.id, slug: { in: DELETE } }, select: { id: true, name: true } });
  for (const s of toDelete) console.log(`\nDELETE  ${s.name} (closed)`);
  if (APPLY && toDelete.length) await prisma.spot.deleteMany({ where: { id: { in: toDelete.map((s) => s.id) } } });

  console.log(`\nDone. ${existing.length}/${slugs.length} updated, ${toDelete.length} deleted${APPLY ? "" : " (dry run)"}.`);
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
