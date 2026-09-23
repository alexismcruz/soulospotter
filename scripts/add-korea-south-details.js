// Jeju + Busan + Gyeongju enrichment. 54 spots, all descriptions under ~120 chars, no addresses or links.
// Researched 2026-09-23.
//
// DELETED (3, unverifiable):
//   - lazybox-jeju: "Lazybox Guesthouse" — only a café by that name appears (old reviews); no current guesthouse listing.
//   - hostel-haeundae-busan: "Hostel Haeundae" matches no specific hostel (only generic Haeundae guesthouses exist).
//   - coffee-myeongga-gyeongju: "Hwangnam Hanok Café" — generic name, no matching venue found.
//
// Corrected / renamed:
//   - Jeju Hiking Inn = Gudeok Guesthouse, Seogwipo (one of Jeju's first guesthouses; near Olle 6/7).
//   - Gyeongju Sarangchae → "Sa Rang Chae Guesthouse", 238-1 Hwangnam-dong (hanok, beside Tumuli Park).
//   - "Gyeongju World Donggung Garden" → Gyeongju East Palace Garden (Donggungwon), a 2013 botanical garden + bird
//     park near Bomun Lake — old desc wrongly called it gardens "linking the central Silla sites".
//   - "Gyeongju Ssambap" → Gyeongju Ssambap Street (the real restaurant row by Daereungwon).
//   - Gyeongju Bread → Hwangnam-ppang original store (783 Taejong-ro, est. 1939 by Choi Yeong-hwa).
//   - Werk Roasters moved from Jeonpo to 566 Suyeong-ro near Gwangan Station (visitbusan).
//   - Manjanggul reopened 30 May 2026 after a 2023 rockfall closure; Hallasan summit trails need free reservation.
//   - Spa Land is day-use only (verified still open 2026).
// Sources: VisitJeju, visithalla.jeju.go.kr, jejuolle.org, VisitBusan, Momos (2019 WBC, est. 2007), Shinsegae,
// VisitKorea, Gyeongju National Museum, Hilton (still operating), Tripadvisor/Hostelworld for guesthouses.
//
//   node scripts/add-korea-south-details.js            (dry run)
//   node scripts/add-korea-south-details.js --apply     (write)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const CITIES = {
  jeju: {
    delete: ["lazybox-jeju"],
    spots: {
      "grand-hyatt-jeju": {
        address: "Jeju Dream Tower, 12 Noyeon-ro, Jeju-si, Jeju-do, South Korea",
        description: "A large luxury hotel in the twin-tower Jeju Dream Tower in Jeju City, opened in 2020 and among the tallest buildings on the island, with sea and Hallasan views, an outdoor pool deck and many restaurants. It's 15–20 minutes from Jeju Airport, which makes it a comfortable base for the first or last night of an island trip.",
      },
      "jeju-hiking-inn": {
        name: "Jeju Hiking Inn (Gudeok Guesthouse)",
        address: "Near Cheonjiyeon Falls, Seogwipo-si, Jeju-do, South Korea",
        mapsQuery: "Gudeok Guesthouse Jeju Hiking Inn, Seogwipo",
        description: "Also known as Gudeok Guesthouse and one of Jeju's first guesthouses, in central Seogwipo on the road down to Cheonjiyeon Falls. It's geared to walkers on the Jeju Olle trail — routes 6 and 7 pass nearby — with a rooftop lounge for meeting other guests and easy walks to the harbour, waterfalls and markets. Rooms are simple; the owners speak limited English.",
      },
      "cafe-delmoondo-jeju": {
        address: "519-10 Johamhaean-ro, Jocheon-eup, Jeju-si, Jeju-do, South Korea",
        description: "A popular café right on the shore at Hamdeok Beach on Jeju's north-east coast, with big windows and terraces looking over turquoise water and black volcanic rocks. It serves coffee, drinks and bakery items and gets busy at weekends. Combine it with a swim at Hamdeok or a short walk up the little Seoubong hill next door.",
      },
      "dongmun-market-jeju": {
        address: "Ildo 1-dong, Jeju-si, Jeju-do, South Korea",
        mapsQuery: "Dongmun Traditional Market, Jeju",
        description: "Jeju City's oldest and biggest traditional market, near the harbour, with stalls selling hallabong and other island citrus, fresh seafood, hairtail and local snacks. In the evening the night-market section fills with food stalls — black-pork skewers, abalone and more — which makes it an easy, lively place to graze alone.",
      },
      "black-pork-street-jeju": {
        address: "Ildo 1-dong, Jeju-si, Jeju-do, South Korea",
        mapsQuery: "Jeju Black Pork Street",
        description: "A street of barbecue restaurants in Jeju City devoted to heukdwaeji, the island's prized black pork, grilled at the table over charcoal and dipped in melji-jeot, a salty anchovy sauce. Many places serve a minimum of two portions, so ask about a single serving or go at a quieter hour, when it's easier to eat alone.",
      },
      "cheonjeyeon-falls-jeju": {
        address: "Jungmun-dong, Seogwipo-si, Jeju-do, South Korea",
        mapsQuery: "Cheonjeyeon Falls, Jeju",
        description: "A three-tier waterfall in a wooded gorge in the Jungmun resort area, its name meaning 'pond of the emperor of heaven'. Paths and stairs lead down to each tier, and the arched Seonimgyo bridge, decorated with the Seven Nymphs of legend, spans the valley above. The pools are fullest after rain; there's a small entry fee.",
      },
      "hallasan-jeju": {
        address: "Hallasan National Park, Jeju-do, South Korea",
        website: "https://visithalla.jeju.go.kr/",
        mapsQuery: "Hallasan National Park",
        description: "South Korea's highest mountain at 1,950m, a dormant volcano at the centre of Jeju and part of its UNESCO World Natural Heritage site. Only the Seongpanak and Gwaneumsa trails reach the summit crater lake, Baengnokdam, and both need a free advance reservation; other trails such as Eorimok and Yeongsil climb to scenic ridges without one.",
      },
      "hamdeok-beach-jeju": {
        address: "Johamhaean-ro, Jocheon-eup, Jeju-si, Jeju-do, South Korea",
        mapsQuery: "Hamdeok Beach, Jeju",
        description: "A shallow, turquoise-water beach on the north-east coast, about 30 minutes from Jeju City, next to the small volcanic hill of Seoubong. The water stays calm and shallow a long way out, which makes it good for easy swimming, and cafés such as Café Delmoondo line the shore. Lovely at sunset, when you can walk up Seoubong.",
      },
      "hyeopjae-beach-jeju": {
        address: "Hyeopjae-ri, Hallim-eup, Jeju-si, Jeju-do, South Korea",
        mapsQuery: "Hyeopjae Beach, Jeju",
        description: "A west-coast beach of white sand mixed with crushed shells and very clear turquoise water, looking out to the little island of Biyangdo. The water is shallow and calm in summer, and a pine grove behind the beach gives shade. Neighbouring Geumneung Beach is quieter, and the Hallim Park gardens are right next door.",
      },
      "jeju-olle-trail": {
        address: "Oedolgae, Seogwipo-si, Jeju-do, South Korea",
        website: "https://jejuolle.org/trail",
        mapsQuery: "Jeju Olle Trail Route 7, Oedolgae",
        description: "Jeju Olle is a network of long-distance walking routes around the island, and Route 7 is one of the best loved: about 17km along Seogwipo's south coast past Oedolgae rock, cliffs, pebble coves and small harbours to Wolpyeong. It's well marked with blue and orange ribbons, and you can walk any section as a shorter solo hike.",
      },
      "jeongbang-falls-jeju": {
        address: "Donghong-dong, Seogwipo-si, Jeju-do, South Korea",
        mapsQuery: "Jeongbang Waterfall, Seogwipo",
        description: "One of the few waterfalls in Asia that falls directly into the sea, dropping about 23m off the cliffs in Seogwipo. A short path and stairs lead down to the rocky shore, where you can stand close to the spray. There's a small entry fee; combine it with a walk along Seogwipo's coast or a section of Olle Route 6.",
      },
      "jusangjeolli-cliffs-jeju": {
        address: "Jungmun-dong, Seogwipo-si, Jeju-do, South Korea",
        mapsQuery: "Jusangjeolli Cliff, Jeju",
        description: "A stretch of coast in the Jungmun area lined with tall hexagonal basalt columns, formed when lava cooled rapidly as it met the sea. A boardwalk and viewing platforms look down on waves crashing against the pillars, most dramatic on a windy day. It's a short stop with a small entry fee, close to the Jungmun resort hotels.",
      },
      "manjanggul-cave-jeju": {
        address: "Gimnyeong-ri, Gujwa-eup, Jeju-si, Jeju-do, South Korea",
        mapsQuery: "Manjanggul Lava Tube",
        description: "One of the world's finest lava tubes and part of Jeju's UNESCO World Natural Heritage site. About 1km is open to visitors, ending at a 7.6m lava column. It reopened on 30 May 2026 after a long closure, with new walkways; it's cool and damp inside year-round, so bring a layer. It's closed on the first Wednesday of each month.",
      },
      "seongsan-ilchulbong-jeju": {
        address: "Seongsan-eup, Seogwipo-si, Jeju-do, South Korea",
        mapsQuery: "Seongsan Ilchulbong",
        description: "A tuff cone that rose from the sea about 5,000 years ago and part of Jeju's UNESCO natural heritage, with a steep stairway up to a vast grassy crater rim at 182m. Known as 'Sunrise Peak', it opens early for dawn climbs. At its base you may catch Jeju's haenyeo, the island's women divers, performing and selling fresh seafood.",
      },
      "seopjikoji-jeju": {
        address: "Goseong-ri, Seongsan-eup, Seogwipo-si, Jeju-do, South Korea",
        mapsQuery: "Seopjikoji, Jeju",
        description: "A windswept headland on the east coast near Seongsan, with a path along the cliffs to a small lighthouse and views back to Sunrise Peak. In spring the fields turn yellow with canola flowers. It's an easy, scenic walk of about an hour and pairs well with an early climb of Seongsan Ilchulbong the same morning.",
      },
      "udo-island-jeju": {
        address: "Udo-myeon, Jeju-si, Jeju-do, South Korea",
        mapsQuery: "Udo Island, Jeju",
        description: "A small island off the east coast, reached by a roughly 15-minute ferry from Seongsan Port. Rent a bike, e-bike or scooter to loop the coast road past the white coral-sand beach of Seobin Baeksa, stone walls, fields and cafés, and try the island's peanut ice cream. Check the time of the last ferry back; crossings stop in rough weather.",
      },
      "osulloc-tea-museum-jeju": {
        address: "15 Sinhwayeoksa-ro, Andeok-myeon, Seogwipo-si, Jeju-do, South Korea",
        mapsQuery: "O'sulloc Tea Museum, Jeju",
        description: "A free museum and café run by the O'sulloc tea brand beside its green-tea fields in the south-west of the island. Learn about Korean tea culture, walk among the rows of tea bushes, and try green-tea ice cream or a matcha latte in the café. It's busy with tour groups at midday, so come early or late for a calmer visit.",
      },
    },
  },
  busan: {
    delete: ["hostel-haeundae-busan"],
    spots: {
      "park-hyatt-busan": {
        address: "Marine City, Haeundae-gu, Busan, South Korea",
        mapsQuery: "Park Hyatt Busan",
        description: "A luxury hotel in a curving glass tower at Marine City beside the Haeundae marina, with floor-to-ceiling windows over the yacht harbour, Gwangan Bridge and the sea. Haeundae Beach and the Dongbaekseom coastal path are a short walk or taxi away. A calm, high-end base just away from the busiest stretch of the beach.",
      },
      "signiel-busan": {
        address: "LCT, 30 Dalmaji-gil, Haeundae-gu, Busan, South Korea",
        website: "https://www.lottehotel.com/busan-signiel/en.html",
        description: "Lotte's luxury Signiel hotel in the LCT complex at the eastern end of Haeundae Beach, where the landmark tower is one of the tallest buildings in Korea. Rooms look along the beach and out to sea, and the tower also houses the Busan X the Sky observatory. A high-end splurge right beside the sand and the Blueline Park beach train.",
      },
      "momos-coffee-busan": {
        address: "20 Osige-ro, Geumjeong-gu, Busan, South Korea",
        mapsQuery: "Momos Coffee Oncheonjang, Busan",
        description: "A Busan roaster founded in 2007 whose barista Jooyeon Jeon won the World Barista Championship in 2019. The original café near Oncheonjang Station is set in a leafy, garden-like space and often has a queue; there's also a branch by the harbour in Yeongdo. Order a filter or espresso made with one of their own roasts.",
      },
      "werk-roasters-busan": {
        address: "566 Suyeong-ro, Suyeong-gu, Busan, South Korea",
        website: "https://www.visitbusan.net/index.do?menuCd=DOM_000000301002001000&uc_seq=1819&lang_cd=en",
        description: "A Busan roastery founded in 2018 that moved from the Jeonpo café district to a new space near Gwangan Station (Exit 5), a few minutes from Gwangalli Beach. It's known for single-origin filter coffee and Australian-style milk drinks, with English-speaking staff and several floors of seating away from the street noise.",
      },
      "jagalchi-market-busan": {
        address: "Nampo-dong, Jung-gu, Busan, South Korea",
        mapsQuery: "Jagalchi Fish Market, Busan",
        description: "Korea's largest seafood market, on the harbour in Nampo-dong, where vendors sell live fish, octopus, shellfish and crabs from tanks and trays. As at Seoul's Noryangjin, you can buy downstairs and have it prepared as sashimi or a spicy stew at the restaurants upstairs. Mornings are liveliest, and the harbourfront walk outside is pleasant.",
      },
      "spa-land-busan": {
        address: "Shinsegae Centum City, 35 Centumnam-daero, Haeundae-gu, Busan, South Korea",
        website: "https://www.shinsegae.com/store/spaland.do",
        description: "A large, stylish jjimjilbang inside Shinsegae Centum City — once certified as the world's largest department store — with around 22 baths filled with natural hot-spring water, themed sauna rooms and relaxation areas. It's day-use only (no overnight stays), so allow three or four hours, and pair it with the Busan Cinema Center nearby.",
      },
      "biff-square-busan": {
        address: "Nampo-dong, Jung-gu, Busan, South Korea",
        mapsQuery: "BIFF Square, Busan",
        description: "The old cinema district of Nampo-dong, where the Busan International Film Festival began in 1996, with film stars' handprints set into the pavement. Today it's best known for street food: ssiat hotteok, a sweet pancake stuffed with seeds and nuts, plus fish cakes and tteokbokki. Gukje Market and Jagalchi are a short walk away.",
      },
      "gamcheon-culture-village-busan": {
        address: "Gamcheon-dong, Saha-gu, Busan, South Korea",
        mapsQuery: "Gamcheon Culture Village",
        description: "A hillside neighbourhood of colourful stepped houses built by refugees during the Korean War, transformed by an art project from 2009 into a maze of murals, installations and small galleries. Pick up a stamp map at the information centre and follow the trail, but remember people live here — keep the noise down. Buses run up from Toseong Station.",
      },
      "huinnyeoul-village-busan": {
        address: "Yeongseon-dong, Yeongdo-gu, Busan, South Korea",
        mapsQuery: "Huinnyeoul Culture Village, Busan",
        description: "A clifftop village of small white-and-blue houses on Yeongdo island, facing the sea and the ships anchored in the outer harbour. A coastal walkway runs below, and the narrow lanes above are lined with cafés and small shops. It has appeared in several Korean films; come in the late afternoon for the best light over the water.",
      },
      "gwangalli-beach-busan": {
        address: "Gwangan-dong, Suyeong-gu, Busan, South Korea",
        mapsQuery: "Gwangalli Beach",
        description: "A city beach lined with bars, cafés and restaurants, facing the huge Gwangan Bridge, which lights up at night. On Saturday evenings a drone light show is often held over the water. It's livelier and more social than Haeundae after dark — a good place to sit out with a drink or stroll the promenade alone, with Werk Roasters nearby for daytime coffee.",
      },
      "haeundae-beach-busan": {
        address: "Haeundae-gu, Busan, South Korea",
        mapsQuery: "Haeundae Beach",
        description: "Busan's most famous beach, a 1.5km arc of sand backed by hotels and high-rises, busy with swimmers in summer and festivals year-round. At its western end the Dongbaekseom coastal walk circles a small island, and to the east Haeundae Blueline Park's beach train and sky capsules run along the old railway toward Songjeong.",
      },
      "oryukdo-skywalk-busan": {
        address: "Yongho-dong, Nam-gu, Busan, South Korea",
        mapsQuery: "Oryukdo Skywalk",
        description: "A U-shaped glass walkway jutting out from a 35m cliff at Seungdumal, facing the Oryukdo islets that mark where Busan's bay meets the open sea. It's short but dramatic, and you wear shoe covers to protect the glass. The Igidae coastal trail starts nearby and runs about 5km back toward Gwangalli — a great solo walk.",
      },
      "songdo-skywalk-busan": {
        address: "Amnam-dong, Seo-gu, Busan, South Korea",
        mapsQuery: "Songdo Cloud Trail, Busan",
        description: "Songdo, opened in 1913 as Korea's first public beach, has a curving glass-floored 'Cloud Trail' walkway over the sea and the Busan Air Cruise cable car across the bay — a revival of a beach cable car first built here in the 1960s. Choose a crystal cabin with a glass floor for the view straight down, then walk Amnam Park's coast.",
      },
      "taejongdae-busan": {
        address: "Dongsam-dong, Yeongdo-gu, Busan, South Korea",
        mapsQuery: "Taejongdae, Busan",
        description: "A forested headland at the southern tip of Yeongdo island, with sheer sea cliffs, a lighthouse, the flat Sinseon rock platform and views out to sea — on clear days as far as Japan's Tsushima island. A loop road of about 4km circles the park; walk it, or ride the Danubi road train that stops at the main viewpoints.",
      },
      "beomeosa-temple-busan": {
        address: "Cheongnyong-dong, Geumjeong-gu, Busan, South Korea",
        mapsQuery: "Beomeosa Temple, Busan",
        description: "One of Korea's major Buddhist temples, founded in 678 on the forested slopes of Geumjeongsan in northern Busan. Its halls, gates and stone pagoda climb the hillside, and the valley is cool and lush in summer. It runs templestay programmes, and trails continue up to Geumjeong Fortress. Take the metro to Beomeosa Station, then a short bus.",
      },
      "haedong-yonggungsa-busan": {
        address: "Gijang-eup, Gijang-gun, Busan, South Korea",
        mapsQuery: "Haedong Yonggungsa Temple",
        description: "A rare seaside temple set on rocks above the waves on Busan's north-east coast, first built in 1376. Steps lead down past stone statues to the halls and a pagoda overlooking the water. It's beautiful at sunrise and far quieter early in the morning; buses run from Haeundae in about 30 minutes, then it's a short walk.",
      },
      "busan-cinema-center": {
        address: "120 Suyeonggangbyeon-daero, Haeundae-gu, Busan, South Korea",
        mapsQuery: "Busan Cinema Center",
        description: "The home of the Busan International Film Festival in Centum City, opened in 2011 and famous for its huge cantilevered roof covered in LED lights. Outside festival season it screens art-house and independent films and hosts exhibitions, and the roof lights up after dark. It's a short walk from Shinsegae Centum City and Spa Land.",
      },
    },
  },
  gyeongju: {
    delete: ["coffee-myeongga-gyeongju"],
    spots: {
      "gyeongju-guesthouse": {
        name: "Sa Rang Chae Guesthouse",
        address: "238-1 Hwangnam-dong, Gyeongju, Gyeongsangbuk-do, South Korea",
        mapsQuery: "Sa Rang Chae Guesthouse, Gyeongju",
        description: "A small, long-running hanok guesthouse beside Daereungwon Tumuli Park, with traditional rooms around a courtyard where you sleep on mattresses on heated ondol floors. The owners are known for being friendly and full of sightseeing tips, and Hwangridan-gil, Cheomseongdae and the old town are all walkable. A simple, great-value hanok stay.",
      },
      "hilton-gyeongju": {
        address: "Bomun Tourist Complex, Gyeongju, Gyeongsangbuk-do, South Korea",
        website: "https://www.hilton.com/en/hotels/kyohitw-hilton-gyeongju/",
        description: "A large resort hotel beside Bomun Lake in the Bomun Tourist Complex, about 10 minutes by car from the old town. There are pools and a spa, and the lakeside paths are right outside — lovely in cherry-blossom season. A comfortable base if you're mixing sightseeing with downtime, though you'll need a bus or taxi to reach the tombs and temples.",
      },
      "hwangnamguan-gyeongju": {
        address: "Hwangnam-dong, Gyeongju, Gyeongsangbuk-do, South Korea",
        mapsQuery: "Hwangnamguan Hanok Village, Gyeongju",
        description: "A hanok hotel complex in the heart of old Gyeongju, a few minutes' walk from Daereungwon, Cheomseongdae and Hwangridan-gil. Rooms are in traditional tiled-roof buildings with heated ondol floors and courtyards, updated with modern bathrooms. Staying here puts you right among the Silla sites, which are especially atmospheric at night.",
      },
      "gyeongju-bread-gyeongju": {
        name: "Hwangnam-ppang (Original Store)",
        address: "783 Taejong-ro, Gyeongju, Gyeongsangbuk-do, South Korea",
        description: "The original shop of Gyeongju's most famous pastry, first baked in 1939 by Choi Yeong-hwa and run by the same family for three generations. The small round buns have a thin, egg-washed crust stamped with a pattern and a generous sweet red-bean filling. They're best eaten warm, and boxes make a classic gift to carry home.",
      },
      "ssambap-restaurant-gyeongju": {
        name: "Gyeongju Ssambap Street",
        address: "Near Daereungwon, Hwangnam-dong, Gyeongju, Gyeongsangbuk-do, South Korea",
        mapsQuery: "Gyeongju Ssambap Street",
        description: "A row of restaurants between Daereungwon and Wolseong serving ssambap, Gyeongju's signature meal: rice with a big basket of fresh leaves, doenjang stew and a table full of banchan side dishes, all wrapped into bites by hand. Most places serve sets for two or more, so ask about a single portion or share with a travel companion.",
      },
      "woljeong-gyo-hwangridan-gyeongju": {
        address: "Hwangnam-dong, Gyeongju, Gyeongsangbuk-do, South Korea",
        mapsQuery: "Hwangnidan-gil, Gyeongju",
        description: "A street of restored hanok beside Daereungwon that has become Gyeongju's trendiest area, with cafés, bakeries, small restaurants, shops and photo studios in traditional buildings. It's busiest at weekends and in the evenings; wander the side lanes for quieter spots. The tombs, Cheomseongdae and Woljeonggyo are all within walking distance.",
      },
      "bomun-lake-gyeongju": {
        address: "Bomun Tourist Complex, Gyeongju, Gyeongsangbuk-do, South Korea",
        mapsQuery: "Bomun Lake, Gyeongju",
        description: "A large man-made lake in the Bomun Tourist Complex east of the old town, ringed by a walking and cycling path of about 8km. In early April the path is lined with cherry blossoms, and it's pleasant at sunset year-round. Resort hotels, Gyeongju Expo Park and the East Palace Garden are nearby — rent a bike to loop the lake.",
      },
      "gyeongju-east-palace-garden": {
        name: "Gyeongju East Palace Garden (Donggungwon)",
        address: "Bomun Tourist Complex, Gyeongju, Gyeongsangbuk-do, South Korea",
        mapsQuery: "Gyeongju East Palace Garden Donggungwon",
        description: "A modern botanical garden and bird park opened in 2013 near Bomun Lake, inspired by Silla's royal Donggung palace and Wolji pond, home to Korea's first recorded zoo and garden. Its glasshouses are shaped like Silla-era halls and filled with tropical and medicinal plants. A good rainy-day stop combined with a walk around the lake.",
      },
      "bulguksa-gyeongju": {
        address: "Jinhyeon-dong, Gyeongju, Gyeongsangbuk-do, South Korea",
        mapsQuery: "Bulguksa Temple, Gyeongju",
        description: "Korea's most celebrated temple, largely built in the 8th century under the Silla kingdom and a UNESCO World Heritage Site together with nearby Seokguram. Stone stairways and bridges lead up to the halls, and the main courtyard holds two famous pagodas, Dabotap and Seokgatap. Arrive early to beat the tour groups, then continue up to Seokguram.",
      },
      "bunhwangsa-gyeongju": {
        address: "Guhwang-dong, Gyeongju, Gyeongsangbuk-do, South Korea",
        mapsQuery: "Bunhwangsa Temple, Gyeongju",
        description: "A temple founded in 634 under Queen Seondeok, now small and peaceful, and home to the oldest datable Silla stone pagoda — built from stone cut to look like bricks, with guardian figures at its doors. Only three of its storeys survive. It's an easy walk or bike ride from the old town, beside the vast open site of the lost Hwangnyongsa temple.",
      },
      "cheomseongdae-gyeongju": {
        address: "Inwang-dong, Gyeongju, Gyeongsangbuk-do, South Korea",
        mapsQuery: "Cheomseongdae Observatory",
        description: "A 9m-tall stone tower built in the 7th century during Queen Seondeok's reign, believed to be the oldest surviving astronomical observatory in East Asia. It stands in open fields near Daereungwon, where flowers bloom in season, and it's beautifully lit at night. It's free and an easy stop on a walk around the old town.",
      },
      "daereungwon-gyeongju": {
        address: "Hwangnam-dong, Gyeongju, Gyeongsangbuk-do, South Korea",
        mapsQuery: "Daereungwon Tomb Complex, Gyeongju",
        description: "A park of 23 grassy royal tombs from the Silla kingdom in the middle of Gyeongju. You can go inside Cheonmachong, the 'Heavenly Horse Tomb', excavated in 1973, where a painted saddle flap and a replica gold crown are displayed. The paths winding between the mounds are especially pretty in spring. There's a small entry fee.",
      },
      "donggung-wolji-gyeongju": {
        address: "Inwang-dong, Gyeongju, Gyeongsangbuk-do, South Korea",
        mapsQuery: "Donggung Palace and Wolji Pond, Gyeongju",
        description: "The site of a Silla crown prince's palace and its pond, built in 674, with three reconstructed pavilions reflected in the water. After dark the halls are lit up, and their reflection on the pond is Gyeongju's most famous night view. Go around sunset and stay into the evening; it gets busy, but the pond is big enough to find a quiet spot.",
      },
      "gyeongju-national-museum": {
        address: "186 Iljeong-ro, Gyeongju, Gyeongsangbuk-do, South Korea",
        website: "https://gyeongju.museum.go.kr/eng/",
        description: "Home to the finest collection of Silla artefacts, including gold crowns from the royal tombs and the 8th-century Divine Bell of King Seongdeok (the Emille Bell), one of Korea's largest bronze bells. Admission is free. It's within walking distance of Donggung Palace and Wolji Pond, so the two combine well in an afternoon.",
      },
      "seokguram-gyeongju": {
        address: "Jinhyeon-dong, Gyeongju, Gyeongsangbuk-do, South Korea",
        mapsQuery: "Seokguram Grotto",
        description: "An 8th-century artificial stone grotto high on Tohamsan above Bulguksa, sheltering a serene granite Buddha that faces east toward the sea. It's a UNESCO World Heritage Site with Bulguksa, and the Buddha is viewed through a glass screen that protects it. Take the bus up from Bulguksa or hike the forest trail, about an hour.",
      },
      "woljeonggyo-bridge-gyeongju": {
        address: "Gyo-dong, Gyeongju, Gyeongsangbuk-do, South Korea",
        mapsQuery: "Woljeonggyo Bridge, Gyeongju",
        description: "A covered wooden bridge over the Namcheon stream, reconstructed and completed in 2018 based on records of an 8th-century Silla bridge. Its painted roof and gate towers are lit up at night and reflected in the water. It's free to walk across, and a short stroll from Gyochon Hanok Village and the cafés of Hwangridan-gil.",
      },
      "yangdong-village-gyeongju": {
        address: "Gangdong-myeon, Gyeongju, Gyeongsangbuk-do, South Korea",
        mapsQuery: "Yangdong Folk Village, Gyeongju",
        description: "A UNESCO-listed Joseon-era clan village about 30–40 minutes north of central Gyeongju, where around 150 traditional houses, tiled and thatched, sit among hills and rice fields. It's a living village, so keep to the paths and respect residents' privacy. Allow a couple of hours to wander, and bring cash for snacks at small stalls.",
      },
    },
  },
};

(async () => {
  console.log(APPLY ? "APPLYING to database…" : "DRY RUN (no changes). Re-run with --apply to write.");
  for (const [citySlug, { delete: del, spots: SPOTS }] of Object.entries(CITIES)) {
    const city = await prisma.city.findUnique({ where: { slug: citySlug }, select: { id: true } });
    if (!city) throw new Error(`city ${citySlug} not found`);
    console.log(`\n=== ${citySlug}`);
    const toDelete = await prisma.spot.findMany({ where: { cityId: city.id, slug: { in: del } }, select: { id: true, name: true } });
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
    console.log(`${citySlug}: ${toDelete.length}/${del.length} deleted, ${existing.length}/${slugs.length} ${APPLY ? "updated" : "would be updated"}.`);
  }
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
