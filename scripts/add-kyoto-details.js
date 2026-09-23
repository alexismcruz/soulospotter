// Kyoto spot enrichment — verified addresses, reachable official links, and descriptions rewritten
// from checked facts (40 of 46 were under 150 chars). Researched 2026-09-23.
//
// Removed (DELETE below):
//   - Ippudo Nishikikoji: closed in 2020 (Tabelog "閉店", Ippudo's own closure notice); site is now another ramen shop.
//   - Weekenders Coffee Tominokoji: closed April 2026 for relocation, new site unconfirmed (Tabelog listing on hold).
//   - Hello Cafe Kyoto: no trace anywhere (no Tabelog, Google, blog or directory listing) — treated as fabricated.
//
// Corrections found while verifying:
//   - Kanga-an: an Ōbaku Zen temple founded 1671, not a "700-year-old Rinzai temple", and there's no
//     evidence of public zazen sessions — it's known for fucha ryōri (Ōbaku vegetarian cuisine) and a
//     garden bar. Address was wrong (now 278 Shin-Goryoguchi-cho, Kita-ku); old site kanga-an.com is dead,
//     official site is kangaan.jp. Renamed "Kanga-an Temple" (slug kept).
//   - L'Escamoteur: founded 2015 by French magician Christophe Rossi — not "French brothers". Address 138-9 Saito-cho.
//   - Gion Hatanaka: a ryokan at 505 Gionmachi Minamigawa facing Yasaka Shrine's south gate — not a machiya on Shinmonzen-dori.
//   - Kurasu: 552 Higashiaburanokoji-cho (was "Inariyama-cho"); it's the Kurasu Kyoto Stand.
//   - Impact Hub Kyoto: moved to 97 Kainokami-cho (Nishijin Business Incubation Center); old address was the former machiya.
//   - Tenzan no Yu: 55-4 Sagano Miyanomoto-cho (was "7-1 Hozumicho"), official site ndg.jp/tenzan.
//   - oinai karasuma is in Nakagyo-ku (647 Temizu-cho), not Shimogyo.
//   - Wrong/partial addresses also fixed: Len Kyoto (709-3 Uematsu-cho), Piece Hostel Sanjo (530 Asakura-cho),
//     Walden Woods (508-1 Sakae-cho), Gion Karyo (570-235, was 570-123), Sake Bar Yoramu (35-1 Matsuya-cho),
//     Omen (74-3), Demachi Futaba (236 Seiryu-cho).
//   - Kyoto National Museum: old desc implied the Meiji-era building is what you visit — it's closed for seismic
//     work; all exhibitions are in the 2014 Heisei Chishinkan wing.
//   - Dead links replaced: Hoshinoya (→ hoshinoresorts.com), Len Kyoto (→ backpackersjapan.co.jp/kyotohostel/),
//     Piece Hostel (→ sanjo.piecehostel.com), Hatanaka (https fails → http).
//
// Sources: official sites below plus Tabelog, VisitKyoto/kyoto.travel, japan-guide, Inside Kyoto, Michelin Guide
// (Kikunoi 3★ since the 2010 Kyoto guide; Murata Mentor Chef Award 2024), Imperial Household Agency (palace free,
// no reservation, closed Mon, English tours 10:00/14:00), Kyoto Prefecture (Botanical Gardens est. 1924,
// conservatory 1992), Hoshino Resorts (15-min boat from Togetsukyo), Funaoka (1923; registered cultural property).
//
//   node scripts/add-kyoto-details.js            (dry run)
//   node scripts/add-kyoto-details.js --apply     (write)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const APPLY = process.argv.includes("--apply");

const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const DELETE = ["ippudo-nishikikoji-kyoto", "weekenders-coffee", "hello-cafe-kyoto"];

const SPOTS = {
  "gion-hatanaka": {
    address: "505 Gionmachi Minamigawa, Higashiyama-ku, Kyoto 605-0074, Japan",
    website: "http://www.hatanaka.co.jp/",
    description: "A traditional ryokan right in front of Yasaka Shrine's south gate, a stone's throw from Maruyama Park and the lanes of Gion. Stays centre on seasonal kaiseki dinners, and the ryokan also hosts a 'Kyoto Cuisine and Maiko Evening', where a small group of diners shares a meal with apprentice geisha who chat and play traditional games — a rare way in for a solo traveller.",
  },
  "hoshinoya-kyoto": {
    address: "11-2 Arashiyama Genrokuzan-cho, Nishikyo-ku, Kyoto, Japan",
    website: "https://hoshinoresorts.com/en/hotels/hoshinoyakyoto/",
    description: "A secluded riverside ryokan up the Oi River in Arashiyama, on land once used for the villas of Heian-era nobles. Arrival is by a 15-minute private boat ride from a lounge beside Togetsukyo Bridge, which sets the tone for tatami suites, kaiseki dining and complete quiet. Expensive, but for a solo splurge few places in Japan feel as removed from the crowds.",
  },
  "len-kyoto-kawaramachi": {
    address: "709-3 Uematsu-cho, Shimogyo-ku, Kyoto 600-8028, Japan",
    website: "https://backpackersjapan.co.jp/kyotohostel/",
    description: "A hostel, café and bar under one roof near Kawaramachi, run by Backpackers' Japan, the team behind Tokyo's Nui. The ground-floor café-bar is open to locals as well as guests, which makes it an easy place to strike up a conversation in the evening, and the Kamo River is a short walk away. There's a choice of dorm beds and private rooms.",
  },
  "piece-hostel-sanjo": {
    address: "530 Asakura-cho, Tominokoji-dori Sanjo-sagaru, Nakagyo-ku, Kyoto 604-8074, Japan",
    website: "https://sanjo.piecehostel.com/en",
    description: "A bright, design-led hostel on Tominokoji just south of Sanjo, with dorms, private rooms and a sociable lounge. The location is hard to beat: Nishiki Market, the Teramachi arcades and the Kamo River are all walkable, and Karasuma (Hankyu), Sanjo (Keihan) and Kyoto Shiyakusho-mae (Tozai Line) stations are close by. A reliable, central base for a first solo stay.",
  },
  "ritz-carlton-kyoto": {
    address: "Kamogawa Nijo-Ohashi Hotori, Nakagyo-ku, Kyoto 604-0902, Japan",
    website: "https://www.ritzcarlton.com/en/hotels/ukyrz-the-ritz-carlton-kyoto/overview/",
    description: "A luxury hotel on the banks of the Kamo River beside Nijo Bridge, opened in 2014, with rooms looking across the water to the Higashiyama mountains. It blends ryokan-inspired design with full hotel service, including a spa with an indoor pool, and Pontocho and Gion are a pleasant riverside walk away. A calm, very comfortable choice if you're treating yourself.",
  },
  "arabica-kyoto-higashiyama": {
    address: "87-5 Hoshino-cho, Higashiyama-ku, Kyoto 605-0853, Japan",
    website: "https://arabica.com/en/",
    description: "% Arabica started in Kyoto before going global, and this Higashiyama shop sits on the slope just below the Yasaka Pagoda. The menu is short and built around espresso drinks, and the tiny minimalist space is mostly takeaway, so grab a latte and carry it up through Ninenzaka and Sannenzaka. Go early, before the tour groups arrive, for the quietest lanes.",
  },
  "kurasu-kyoto": {
    name: "Kurasu Kyoto Stand",
    address: "552 Higashiaburanokoji-cho, Shimogyo-ku, Kyoto 600-8235, Japan",
    website: "https://kurasu.kyoto/pages/kurasu-kyoto-stand-cafe",
    description: "A small specialty coffee stand about five minutes' walk from Kyoto Station, open since 2016 and pouring beans roasted at Kurasu's own roastery in Nishijin. It's the easiest good coffee near the station — worth a stop when you arrive or before a train — with filter and espresso drinks made carefully to order. Kurasu also sells brewing gear if you want to take the habit home.",
  },
  "smart-coffee-kyoto": {
    address: "537 Tenshojimae-cho, Nakagyo-ku, Kyoto 604-8081, Japan",
    description: "A classic kissaten in the Teramachi covered arcade that has been open since 1932 and still roasts its own beans. Come in the morning for hand-drip coffee with fluffy hotcakes or French toast in the wood-panelled ground-floor room; upstairs, a lunch room serves retro yoshoku dishes. Expect a queue at weekends — it moves steadily, and solo diners slot in easily.",
  },
  "walden-woods-kyoto": {
    address: "508-1 Sakae-cho, Shimogyo-ku, Kyoto 600-8194, Japan",
    description: "A striking all-white café a 5–7 minute walk from Gojo Station, named after Thoreau's Walden. Upstairs there are no tables: you sit on wide wooden steps arranged around the room like a small amphitheatre, which makes it a calm place for a flat white and a notebook. It's bright, quiet and minimal — a welcome pause between temples.",
  },
  "impact-hub-kyoto": {
    address: "2F–3F Nishijin Business Incubation Center, 97 Kainokami-cho, Kamigyo-ku, Kyoto 602-8061, Japan",
    description: "Kyoto's branch of the global Impact Hub network, on the second and third floors of a former telephone exchange in Nishijin, the city's traditional weaving district. It's community-driven, with a focus on social-impact projects, and has a library, free drinks and snacks, a nap space and printing. Drop-in visits are possible — check the website for current rates.",
  },
  "oinai-karasuma-kyoto": {
    address: "4F Tokiwa Bldg, 647 Temizu-cho, Karasuma-dori Takoyakushi-sagaru, Nakagyo-ku, Kyoto 604-8152, Japan",
    website: "https://oinai-karasuma.jp/",
    description: "A calm coworking space on the fourth floor of an older building on Karasuma-dori, about five minutes' walk from the Shijo–Karasuma crossing. 'Oinai' means 'welcome' in Kyoto dialect, and it's run by an architecture practice, so the space is simple and comfortable. There are free-address desks for visitors, reserved desks and meeting rooms; check the online calendar first.",
  },
  "demachi-futaba-kyoto": {
    address: "236 Seiryu-cho, Kawaramachi-dori Imadegawa-agaru, Kamigyo-ku, Kyoto, Japan",
    description: "A wagashi shop founded in 1899 and famous across Japan for its mame-mochi: soft rice cakes studded with salty red peas and filled with sweet bean paste. There's almost always a queue of locals, but it moves quickly, and the Kamo River Delta is a few minutes' walk away — buy a couple and eat them by the water. Closed Tuesdays and the fourth Wednesday of the month.",
  },
  "gion-karyo-kyoto": {
    address: "570-235 Gionmachi Minamigawa, Higashiyama-ku, Kyoto 605-0074, Japan",
    description: "A kaiseki restaurant on Hanamikoji in Gion with more than 30 years of history, known for seasonal courses in a restrained, 'less is more' style. The ground floor is a counter facing an open kitchen, which suits a solo diner — you get to watch the chefs at work — and there are private tables upstairs. Reservations are required, so book ahead.",
  },
  "kikunoi-honten-kyoto": {
    address: "459 Shimokawara-cho, Higashiyama-ku, Kyoto, Japan",
    description: "One of Kyoto's great kaiseki houses, near Maruyama Park, led by third-generation chef Yoshihiro Murata since 1993. It has held three Michelin stars since Michelin's first Kyoto guide in 2010, and Murata received the guide's Mentor Chef Award in 2024. Seasonal multi-course meals are served in private tatami rooms. Book well ahead — a true once-in-a-trip splurge.",
  },
  "nishiki-market": {
    address: "Nishikikoji-dori, Nakagyo-ku, Kyoto, Japan",
    mapsQuery: "Nishiki Market, Kyoto",
    description: "Kyoto's covered food market, running five blocks along Nishikikoji between Teramachi and Takakura and nicknamed 'Kyoto's Kitchen'. More than a hundred shops sell pickles, tofu, dashimaki omelette, fresh fish, sweets and knives, and many offer skewers or small tastes. The market asks visitors not to eat while walking, so eat at the stall. Go before noon for thinner crowds.",
  },
  "omen-ginkakuji-kyoto": {
    address: "74-3 Jodoji Ishibashi-cho, Sakyo-ku, Kyoto 606-8406, Japan",
    description: "The original branch of Omen, a short walk from Ginkaku-ji at the northern end of the Philosopher's Path. The signature dish is its namesake: thick, chewy handmade udon dipped in a sesame-rich broth, served with a plate of seasonal vegetables you add yourself. It doesn't take reservations and queues form by late morning, so arrive early or come mid-afternoon.",
  },
  "funaoka-onsen-kyoto": {
    address: "82-1 Murasakino Minamifunaoka-cho, Kita-ku, Kyoto 603-8225, Japan",
    description: "A public bathhouse that began life in 1923 as a restaurant-inn and is known for installing one of Japan's first electric baths. The building is a registered tangible cultural property, with elaborately carved wooden transoms and Majolica-tiled corridors, plus outdoor baths and a sauna. A great window on everyday Kyoto — just follow the washing etiquette and bring a small towel.",
  },
  "kanga-an-zen-meditation": {
    name: "Kanga-an Temple",
    address: "278 Shin-Goryoguchi-cho, Karasuma-dori Kuramaguchi-higashi-iru, Kita-ku, Kyoto 603-8146, Japan",
    website: "https://kangaan.jp/",
    description: "A quiet Ōbaku Zen temple founded in 1671, about three minutes' walk from Kuramaguchi Station (Exit 1). It's best known for fucha ryōri, the Ōbaku school's Buddhist vegetarian cuisine, served by reservation in rooms overlooking the temple garden, and for a small evening bar with a view of the same garden. A peaceful, unusual solo meal far from the tour-bus temples.",
  },
  "tenzan-no-yu-kyoto": {
    address: "55-4 Sagano Miyanomoto-cho, Ukyo-ku, Kyoto 616-8315, Japan",
    website: "https://ndg.jp/tenzan/",
    description: "A proper natural hot spring on the way to Arashiyama, three minutes' walk from Arisugawa Station on the Randen tram line. The tan-coloured water comes from about 1,200m underground and fills stone outdoor baths, indoor pools and a sauna, with a restaurant and rest area for lingering. A soothing end to a day of walking around the western temples.",
  },
  "gion-district-kyoto": {
    address: "Gion, Higashiyama-ku, Kyoto, Japan",
    mapsQuery: "Hanamikoji, Gion, Kyoto",
    description: "Kyoto's best-known geisha district, on both sides of Shijo-dori east of the Kamo River. Walk Hanamikoji, lined with wooden teahouses, and the canal-side lanes of Shirakawa in the early evening as the lanterns come on. Some private lanes off Hanamikoji are now closed to tourists, and photographing geiko or maiko without permission isn't allowed — follow the signs and enjoy the wander.",
  },
  "higashiyama-district-kyoto": {
    address: "Higashiyama-ku, Kyoto, Japan",
    mapsQuery: "Sannenzaka, Kyoto",
    description: "The preserved slopes between Kiyomizu-dera and Yasaka Shrine, where the stone-paved lanes of Sannenzaka and Ninenzaka are lined with wooden shops selling crafts, pottery, pickles and sweets, with the Yasaka Pagoda rising over the rooftops. By mid-morning it's packed, so come at 7–8am for empty lanes and soft light, then carry on up to Kiyomizu-dera.",
  },
  "arashiyama-bamboo-grove": {
    address: "Sagaogurayama Tabuchiyama-cho, Ukyo-ku, Kyoto, Japan",
    mapsQuery: "Arashiyama Bamboo Grove, Kyoto",
    description: "The famous bamboo path on Kyoto's western edge, running from near Tenryu-ji's north gate towards Okochi Sanso villa. It's only a few hundred metres long and very busy from mid-morning, so go at sunrise, when it's almost empty and you can hear the wind moving through the stalks. Combine it with Tenryu-ji, whose garden has a gate straight onto the grove.",
  },
  "kamo-river-delta-kyoto": {
    address: "Demachiyanagi, Sakyo-ku, Kyoto, Japan",
    mapsQuery: "Kamo River Delta, Kyoto",
    description: "The Y-shaped meeting point of the Kamo and Takano rivers at Demachiyanagi, where the Kamogawa proper begins. Turtle- and plover-shaped stepping stones cross the water, and the grassy banks fill with students, families and picnickers. Pick up mame-mochi from Demachi Futaba nearby and sit by the river — one of the most relaxed, local-feeling spots in Kyoto.",
  },
  "kyoto-botanical-gardens": {
    address: "Shimogamo Hangi-cho, Sakyo-ku, Kyoto, Japan",
    website: "https://www.pref.kyoto.jp/plant/",
    description: "Founded in 1924, Japan's oldest public botanical garden sits beside the Kamo River in Kitayama. Around 12,000 plant species grow across its themed gardens, and the conservatory, opened in 1992 and shaped to echo Kinkaku-ji and the Kitayama hills, holds about 4,500 species. Quiet on weekdays and good for a slow solo afternoon away from the temple crowds.",
  },
  "maruyama-park-kyoto": {
    address: "Maruyama-cho, Higashiyama-ku, Kyoto, Japan",
    mapsQuery: "Maruyama Park, Kyoto",
    description: "Kyoto's oldest public park, laid out in 1886 directly behind Yasaka Shrine. Its centrepiece is a giant weeping cherry that's lit up at night in blossom season, when the lawns fill with hanami picnics. The rest of the year it's a peaceful green link between Gion, Chion-in and the Higashiyama lanes, with ponds and benches for a quiet break.",
  },
  "philosophers-path-kyoto": {
    address: "Sakyo-ku, Kyoto, Japan",
    mapsQuery: "Philosopher's Path, Kyoto",
    description: "A stone path of about 2km along a small canal between Ginkaku-ji and the Nanzen-ji area, named after the philosopher Nishida Kitaro, who walked it daily. Hundreds of cherry trees line the water, making it spectacular in early April, but it's lovely in any season. Small temples, cafés and shops sit along the way, so it's easy to take at your own pace alone.",
  },
  "fushimi-inari": {
    address: "68 Fukakusa Yabunouchi-cho, Fushimi-ku, Kyoto 612-0882, Japan",
    description: "The head shrine of Inari, with thousands of vermilion torii gates — each donated by a business or individual — forming tunnels up Mount Inari. The grounds are free and always open, so you can walk at dawn or after dark when most visitors have gone. A full loop to the 233m summit takes two to three hours; many people turn back at the Yotsutsuji viewpoint halfway up.",
  },
  "ginkakuji-silver-pavilion": {
    address: "2 Ginkakuji-cho, Sakyo-ku, Kyoto 606-8402, Japan",
    description: "Officially Jisho-ji, the 'Silver Pavilion' was built in the late 15th century as the retirement villa of shogun Ashikaga Yoshimasa, and was never actually covered in silver. Its raked-sand garden with the flat-topped cone called Kogetsudai and a mossy hillside path give views back over Kyoto. Start or finish a walk along the Philosopher's Path here.",
  },
  "heian-shrine-kyoto": {
    address: "97 Okazaki Nishitenno-cho, Sakyo-ku, Kyoto 606-8341, Japan",
    description: "Built in 1895 for the 1,100th anniversary of Kyoto's founding, with bright vermilion halls modelled on the original imperial palace. The main grounds are free, and the giant torii on the approach is one of the largest in Japan. Behind the halls, the paid Shin'en garden winds past ponds, stepping stones and a covered bridge, and is famous for its weeping cherries in April.",
  },
  "kinkakuji-golden-pavilion": {
    address: "1 Kinkakuji-cho, Kita-ku, Kyoto 603-8361, Japan",
    description: "Officially Rokuon-ji, this gold-leaf-covered pavilion reflected in its pond is Kyoto's most famous sight. The original was burned down by a young monk in 1950; the pavilion you see is a faithful reconstruction completed in 1955. The path around the garden is one-way and busy, so arrive at opening time for the calmest view across the water.",
  },
  "kiyomizu-dera": {
    address: "1-294 Kiyomizu, Higashiyama-ku, Kyoto 605-0862, Japan",
    description: "A UNESCO-listed temple founded in 778, known for the wooden stage of its main hall, which juts out 13m above the hillside on a lattice of huge pillars built without nails. The views over Kyoto are wide, and below the stage the Otowa waterfall splits into three streams that visitors drink from. It opens at 6am — go early, then walk down through Sannenzaka.",
  },
  "kyoto-imperial-palace": {
    address: "3 Kyoto-gyoen, Kamigyo-ku, Kyoto 602-0881, Japan",
    website: "https://kyoto-gosho.kunaicho.go.jp/en/visit",
    description: "The residence of Japan's emperors until the move to Tokyo in 1869, set inside the large Kyoto Gyoen park. Entry is free with no reservation needed — just pass the bag check — and free English-language guided tours run at 10am and 2pm. The palace is closed on Mondays, but the gravel-and-pine park around it is open every day for a quiet walk.",
  },
  "kyoto-national-museum": {
    address: "527 Chaya-cho, Higashiyama-ku, Kyoto 605-0931, Japan",
    description: "One of Japan's leading museums of pre-modern Japanese art, across the road from Sanjusangen-do. Its red-brick Meiji-era main hall is closed for seismic upgrades, so all exhibitions are now held in the modern Heisei Chishinkan wing, designed by Yoshio Taniguchi and opened in 2014. Galleries close between exhibitions, so check the website before you go.",
  },
  "nanzenji-kyoto": {
    address: "86 Nanzenji Fukuchi-cho, Sakyo-ku, Kyoto 606-8435, Japan",
    description: "One of Kyoto's most important Zen temples, entered through the 22m Sanmon gate of 1628 — pay a small fee to climb it for views over the city. On the south side, the red-brick Suirokaku aqueduct, built in 1890 to carry Lake Biwa canal water into Kyoto, is a favourite photo spot, and the sub-temple Tenju-an has a lovely pond garden. The outer grounds are free.",
  },
  "nijo-castle-kyoto": {
    address: "541 Nijojo-cho, Nakagyo-ku, Kyoto 604-8301, Japan",
    description: "Built in 1603 for Tokugawa Ieyasu, the first Tokugawa shogun, and now a UNESCO World Heritage Site. Inside Ninomaru Palace the 'nightingale floors' squeak as you walk — said to be a warning against intruders — and painted sliding doors of tigers and pines fill the rooms. Outside, walk the moats, the massive stone walls and the Ninomaru garden.",
  },
  "ryoanji-kyoto": {
    address: "13 Ryoanji Goryonoshita-cho, Ukyo-ku, Kyoto 616-8001, Japan",
    description: "A Zen temple famous for its rock garden: fifteen stones set in raked white gravel, arranged so that you can never see all fifteen at once from the viewing veranda. Sit on the steps and give it time — it's surprisingly meditative alone if you avoid the peak hours. The large Kyoyochi pond garden around the temple is especially lovely in autumn.",
  },
  "sanjusangendo-kyoto": {
    address: "657 Sanjusangendo-mawari-cho, Higashiyama-ku, Kyoto 605-0941, Japan",
    website: "https://www.sanjusangendo.jp/",
    description: "Officially Rengeo-in, this hall is about 120m long — Japan's longest wooden building — and holds 1,001 statues of Kannon: 1,000 life-size standing figures in ten rows flanking a large seated Kannon carved by Tankei in 1254, a National Treasure. Photography isn't allowed inside, which makes the long, quiet walk past the statues all the more striking.",
  },
  "tenryuji-kyoto": {
    address: "68 Saga Tenryuji Susukinobaba-cho, Ukyo-ku, Kyoto 616-8385, Japan",
    description: "Head temple of the Tenryu-ji branch of Rinzai Zen, founded in 1339 and a UNESCO World Heritage Site. Its Sogenchi pond garden, designed by the Zen master Muso Soseki, 'borrows' the Arashiyama hills as its backdrop and keeps its 14th-century layout. A north gate leads straight out to the bamboo grove, so visit both together early in the day.",
  },
  "toji-temple-kyoto": {
    address: "1 Kujo-cho, Minami-ku, Kyoto 601-8473, Japan",
    description: "Founded in 796, soon after Kyoto became the capital, and later entrusted to the monk Kukai (Kobo Daishi); it's a UNESCO World Heritage Site near Kyoto Station. Its five-storey pagoda, rebuilt in 1644, is Japan's tallest wooden pagoda at about 55m. On the 21st of every month the grounds host the Kobo-san flea market, full of antiques, crafts and food stalls.",
  },
  "yasaka-shrine-kyoto": {
    address: "625 Gionmachi Kitagawa, Higashiyama-ku, Kyoto 605-0073, Japan",
    description: "Gion's own shrine, at the eastern end of Shijo-dori between Gion and Maruyama Park, and home of the Gion Matsuri festival every July. The main hall and dance stage are hung with lanterns that glow every evening, and the grounds stay open around the clock, so it makes an easy, atmospheric stop after dinner in Gion.",
  },
  "lescamoteur-bar-kyoto": {
    address: "138-9 Saito-cho, Shimogyo-ku, Kyoto 600-8012, Japan",
    description: "A small, candlelit cocktail bar near Kiyamachi, opened in 2015 by French magician-turned-bartender Christophe Rossi. The interior feels like a Victorian conjurer's workshop, and the drinks come with a touch of theatre, using ingredients such as yuzu and matcha. It's on the World's 50 Best Discovery list, and the bar counter is a good seat for a solo evening.",
  },
  "pontocho-alley": {
    address: "Pontocho, Nakagyo-ku, Kyoto, Japan",
    mapsQuery: "Pontocho Alley, Kyoto",
    description: "A narrow, lantern-lit alley running between Shijo and Sanjo along the west bank of the Kamo River, lined with restaurants, bars and teahouses. From May to September the riverside restaurants open raised wooden terraces (kawayuka) over the water. Many places are small and pricey, so check the menus posted outside; several counter spots welcome solo diners.",
  },
  "sake-bar-yoramu-kyoto": {
    address: "35-1 Matsuya-cho, Nijo-dori Higashinotoin-higashi-iru, Nakagyo-ku, Kyoto, Japan",
    website: "http://www.sakebar-yoramu.com/",
    description: "A tiny sake bar of about nine seats, run since 2000 by Yoram Ofer, an Israeli-born sake expert. He pours unusual and aged sake, often as a tasting set, and explains what you're drinking in English — the best introduction to sake in Kyoto for a solo traveller. It's open only Wednesday to Saturday evenings, so plan around that.",
  },
};

(async () => {
  const city = await prisma.city.findUnique({ where: { slug: "kyoto" }, select: { id: true } });
  if (!city) throw new Error("city kyoto not found");
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
    if (name) console.log(`   rename:  ${spot.name} -> ${name}`);
    if (APPLY) await prisma.spot.update({ where: { id: spot.id }, data });
  }

  const toDelete = await prisma.spot.findMany({ where: { cityId: city.id, slug: { in: DELETE } }, select: { id: true, name: true } });
  for (const s of toDelete) console.log(`\nDELETE  ${s.name}`);
  if (APPLY && toDelete.length) await prisma.spot.deleteMany({ where: { id: { in: toDelete.map((s) => s.id) } } });

  console.log(`\nDone. ${existing.length}/${slugs.length} updated, ${toDelete.length}/${DELETE.length} deleted${APPLY ? "" : " (dry run)"}.`);
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
