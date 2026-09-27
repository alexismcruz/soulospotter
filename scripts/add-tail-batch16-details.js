// Small-city tail, batch 16: Drakensberg, Gaborone, Johannesburg, Lüderitz, Ziguinchor, Windhoek, Addis Ababa,
// Alexandria. Researched 2026-09-27.
//
// No deletions — all businesses verified.
// CORRECTED: Valley Bakery is on the R600 into Champagne Valley (central Drakensberg), not in Underberg;
//   Amphitheatre Backpackers is near Royal Natal/Bergville (hot tub, sauna, climbing wall); Mokolodi Backpackers is
//   ~10km south-west of Gaborone by the reserve; Sanitas Tea Garden is in Botswana's oldest nursery near Gaborone Dam
//   (Tue–Sun, closed Mon); Curiocity is at 302 Fox Street in the former Pacific Press building; Diaz Coffee Shop is
//   also an oyster & wine bar; Lüderitz Nest Hotel is at 820 Diaz Street with its own beach; Le Kassa is at Place
//   Jean-Paul II; Chameleon (est. 1995); Joe's Beerhouse at 160 Nelson Mandela Ave (since 1991); Slowtown is on
//   Independence Ave; Mr Martin's (17 rooms, since 2005) is near Bole; Tomoca's Piassa flagship on Wavel Street
//   (since 1953); Hotel Union is on the 5th floor of 164 Corniche; Mohamed Ahmed (since 1957) is on Shakour Street
//   near Raml Station.
//
//   node scripts/add-tail-batch16-details.js [--apply]
const run = require("./_enrich-runner");

run({
  drakensberg: {
    spots: {
      "amphitheatre-backpackers": {
        address: "R74, near Bergville, northern Drakensberg, KwaZulu-Natal, South Africa",
        website: "https://amphibackpackers.com/",
        mapsQuery: "Amphitheatre Backpackers, Bergville",
        description: "A popular backpackers lodge in the northern Drakensberg with views of the Amphitheatre escarpment, set on a large property with dorms, private rooms and camping, a bar and restaurant, a hot tub, sauna and a small climbing wall. It runs guided hikes to Tugela Falls, horse riding, and day trips into Lesotho.",
      },
      "tugela-falls-trail": {
        name: "Tugela Falls via the Sentinel Trail",
        address: "Sentinel car park, Witsieshoek, northern Drakensberg, South Africa",
        mapsQuery: "Sentinel Car Park, Witsieshoek",
        description: "The classic day hike to the top of the Amphitheatre, starting at the Sentinel car park and climbing via a pair of chain ladders to the escarpment, where the Tugela River drops over the edge in one of the world's tallest waterfalls. Start early, carry warm layers and plenty of water, and go with a guide in poor weather.",
      },
      "valley-bakery-underberg": {
        name: "Valley Bakery",
        address: "R600, Champagne Valley, central Drakensberg, KwaZulu-Natal, South Africa",
        website: "https://ilovechampagnevalley.com/eat-and-drinks/the-valley-bakery/",
        mapsQuery: "Valley Bakery, Champagne Valley",
        description: "A well-known bakery, coffee shop and art gallery on the R600 into the Champagne Valley in the central Drakensberg, filled with fresh bread, pastries, croissants, pies, cakes and tarts. It's a landmark stop for breakfast or lunch on the way to the resorts and trails of Cathedral Peak and Monk's Cowl.",
      },
    },
  },
  gaborone: {
    spots: {
      "mokolodi-backpackers-gaborone": {
        address: "Near Mokolodi Nature Reserve, about 10km south-west of Gaborone, Botswana",
        website: "https://backpackers.co.bw/",
        mapsQuery: "Mokolodi Backpackers, Gaborone",
        description: "A peaceful self-catering lodge in the bushveld about 10km south-west of Gaborone, a short walk from the Mokolodi Nature Reserve, with rondavels, cottages, timber huts, tents and camping, plus a pool, bar and sauna. A calm, affordable base for the capital and the reserve's game drives and walks.",
      },
      "sanitas-tea-garden-gaborone": {
        address: "Sanitas Nursery, near Gaborone Dam, Gaborone, Botswana",
        website: "https://www.sanitas.co.bw/tea_garden.html",
        mapsQuery: "Sanitas Tea Garden, Gaborone",
        description: "A leafy café inside Botswana's oldest and largest plant nursery, near Gaborone Dam, with a big shaded terrace serving breakfasts, wood-fired pizzas, salads, light meals, coffee and gelato. It's a calm escape from the city and a pleasant place to sit alone with a book. Open Tuesday to Sunday; closed Mondays.",
      },
      "three-dikgosi-monument": {
        address: "Central Business District, Gaborone, Botswana",
        mapsQuery: "Three Dikgosi Monument, Gaborone",
        description: "Bronze statues of three chiefs — Khama III, Sebele I and Bathoen I — who travelled to London in 1895 to petition Queen Victoria to keep their lands out of the control of Cecil Rhodes's British South Africa Company. Unveiled in 2005 in the CBD, it's a short visit with information panels on Botswana's history.",
      },
    },
  },
  johannesburg: {
    spots: {
      "apartheid-museum": {
        address: "Northern Parkway and Gold Reef Road, Ormonde, Johannesburg, South Africa",
        website: "https://www.apartheidmuseum.org/",
        mapsQuery: "Apartheid Museum, Johannesburg",
        description: "A powerful museum telling the story of apartheid and the struggle against it, through film, photographs, documents and personal testimony, starting with a racially assigned entry ticket. It's intense and very well done; allow at least two to three hours. It's next to Gold Reef City, south of the centre — take an Uber or the hop-on bus.",
      },
      "curiocity-backpackers-joburg": {
        name: "Curiocity Joburg",
        address: "302 Fox Street, Maboneng, Johannesburg, South Africa",
        website: "https://curiocity.africa/johannesburg-backpackers-hostels/",
        mapsQuery: "Curiocity Joburg, Fox Street",
        description: "A creative hostel in the Maboneng precinct, in a building that once housed Pacific Press, which printed material for the ANC and the Black Sash during apartheid. It has dorms and private rooms, a bar, a splash pool, a shared kitchen, and runs city walking tours, public-art walks and Soweto trips — a social way to get to know Joburg.",
      },
      "father-coffee-joburg": {
        address: "Juta Street, Braamfontein, Johannesburg, South Africa",
        website: "https://www.fathercoffee.com/",
        mapsQuery: "Father Coffee, Braamfontein",
        description: "A small, influential specialty coffee roaster and café in Braamfontein, the student and creative district near Wits University, known for carefully sourced beans and excellent espresso. It's busy with students and creatives, and a good starting point for the neighbourhood's galleries, bars and Saturday Neighbourgoods market.",
      },
    },
  },
  luderitz: {
    spots: {
      "diaz-coffee-luderitz": {
        name: "Diaz Coffee Shop, Oyster & Wine Bar",
        address: "Central Lüderitz, Namibia",
        mapsQuery: "Diaz Coffee Shop, Lüderitz",
        description: "A coffee shop, oyster and wine bar and beer garden in the centre of Lüderitz, open seven days a week, serving coffee and cake, light meals and the town's famous fresh oysters. It's a relaxed, popular stop in this windswept harbour town of German colonial buildings, and a comfortable place to eat alone.",
      },
      "kolmanskop-ghost-town": {
        address: "Kolmanskop, about 10km east of Lüderitz, Namibia",
        mapsQuery: "Kolmanskop Ghost Town",
        description: "A diamond-rush town built in the desert in the early 1900s and abandoned by the 1950s, whose grand houses are slowly filling with sand dunes. It sits inside the restricted diamond area, so buy a ticket at the gate and join a guided tour, or get a photographer's permit for early access. Go early before the afternoon wind.",
      },
      "luderitz-nest-hotel": {
        address: "820 Diaz Street, Lüderitz, Namibia",
        website: "https://nesthotel.com/",
        mapsQuery: "Lüderitz Nest Hotel",
        description: "A seafront hotel on its own small beach on the edge of Lüderitz, with sea-view rooms, a pool, and the Penguin restaurant serving rock lobster and Lüderitz oysters. It's the most comfortable base in town for Kolmanskop, the Lüderitz peninsula drive and boat trips to Halifax Island's penguin colony.",
      },
    },
  },
  ziguinchor: {
    spots: {
      "casamance-river-banks": {
        name: "Casamance River",
        address: "Ziguinchor, Casamance, Senegal",
        mapsQuery: "Casamance River, Ziguinchor",
        description: "The wide, mangrove-lined river that gives the Casamance region its lush character, with pirogue trips from Ziguinchor to Diola villages, rice paddies, birdlife and islands such as Île aux Oiseaux. Book trips with a registered local guide. Some rural border areas are still subject to travel advisories — check before going.",
      },
      "le-flamboyant-ziguinchor": {
        name: "Hôtel Le Flamboyant",
        address: "Central Ziguinchor, Casamance, Senegal",
        website: "https://www.flamboyant.fr/",
        mapsQuery: "Hôtel Le Flamboyant, Ziguinchor",
        description: "A mid-range hotel in the centre of Ziguinchor with 36 air-conditioned or fan rooms, a garden, an outdoor pool with loungers, a coffee shop, and a restaurant serving Senegalese and international dishes. It's a calm, practical base for exploring the Casamance, and staff can help arrange tours.",
      },
      "le-kassa-ziguinchor": {
        name: "Bar Restaurant Le Kassa",
        address: "Place Jean-Paul II, Ziguinchor, Casamance, Senegal",
        mapsQuery: "Le Kassa, Ziguinchor",
        description: "A bar-restaurant on Place Jean-Paul II in central Ziguinchor, serving Senegalese staples such as thiéboudienne and yassa alongside European dishes and cold drinks. It's a relaxed, local spot for a solo meal in the Casamance capital and a good place to watch the town go by in the evening.",
      },
    },
  },
  windhoek: {
    spots: {
      "chameleon-backpackers-windhoek": {
        address: "Central Windhoek, Namibia",
        website: "https://www.chameleonbackpackers.com/",
        mapsQuery: "Chameleon Backpackers, Windhoek",
        description: "One of Namibia's first backpacker hostels, open since 1995, with dorms and private rooms, a pool, a lively bar and a guest kitchen, a short walk from the city centre. It's the classic base for meeting other travellers, and the staff arrange budget camping tours to Sossusvlei, Etosha and Swakopmund.",
      },
      "joes-beerhouse-windhoek": {
        address: "160 Nelson Mandela Avenue, Windhoek, Namibia",
        website: "https://joesbeerhouse.com/",
        mapsQuery: "Joe's Beerhouse, Windhoek",
        description: "A sprawling, quirky beer hall that opened in 1991, filled with junk-shop décor and thatch, seating hundreds and open daily from 11am to 11pm. It's famous for game meat — oryx, kudu, zebra and crocodile skewers — but has other options too. Busy and fun; booking is wise on weekends.",
      },
      "slowtown-coffee-windhoek": {
        address: "Independence Avenue, Windhoek CBD, Namibia",
        mapsQuery: "Slowtown Coffee Roasters, Independence Avenue, Windhoek",
        description: "A Namibian specialty coffee roaster with its main café on Independence Avenue in the centre of Windhoek, plus branches in malls and at the coast. It's known for good espresso and cakes such as its chocolate cheesecake, and is a comfortable place to work or plan a road trip.",
      },
    },
  },
  "addis-ababa": {
    spots: {
      "mr-martins-cozy-place-addis": {
        address: "Bole, Addis Ababa, Ethiopia",
        mapsQuery: "Mr. Martin's Cozy Place, Addis Ababa",
        description: "A well-reviewed budget guesthouse, running since 2005, with about 17 rooms around a quiet private compound in the Bole area, about 3km from the airport and close to restaurants, bars, banks and shops. Staff are helpful with onward travel advice, making it a reliable, friendly base in the sprawling capital.",
      },
      "national-museum-ethiopia": {
        address: "King George VI Street, Arat Kilo, Addis Ababa, Ethiopia",
        mapsQuery: "National Museum of Ethiopia",
        description: "Home to the fossil hominid 'Lucy' (Australopithecus afarensis, around 3.2 million years old) — the original is kept in the vaults, with a cast on display — plus other early human fossils, and galleries of Ethiopian art, royal regalia and history. It's modest in size, cheap to enter, and essential for understanding the country.",
      },
      "tomoca-coffee-addis": {
        address: "Wavel Street, Piassa, Addis Ababa, Ethiopia",
        mapsQuery: "Tomoca Coffee, Piassa, Addis Ababa",
        description: "The flagship café of Tomoca, a family-owned roaster founded in 1953 as Ethiopia's first commercial coffee roaster, in the old Italian-influenced Piassa district. People stand at the counter for a strong macchiato or buna, then buy beans to take home. It's crowded, quick and a real Addis institution.",
      },
    },
  },
  alexandria: {
    spots: {
      "bibliotheca-alexandrina": {
        address: "Corniche, Chatby, Alexandria, Egypt",
        mapsQuery: "Bibliotheca Alexandrina",
        description: "A striking modern library opened in 2002 on the Corniche, near the site of the ancient Library of Alexandria, with a vast tilted disc roof and a granite wall carved with scripts from around the world. Inside are several museums, including antiquities and manuscripts. Take a guided tour of the main reading hall.",
      },
      "hotel-union-alexandria": {
        address: "5th floor, 164 Corniche, Alexandria, Egypt",
        mapsQuery: "Union Hotel, Alexandria",
        description: "A long-standing budget hotel on the upper floors of a Corniche building, facing the Eastern Harbour within sight of the Qaitbay Citadel. Rooms are simple but clean, the staff cheerful, and it's popular with Egyptian holidaymakers and foreign travellers alike. Only some rooms have a sea view — ask for one.",
      },
      "mohammed-ahmed-alexandria": {
        name: "Mohamed Ahmed",
        address: "Shakour Street, near Raml Station, Alexandria, Egypt",
        mapsQuery: "Mohamed Ahmed Restaurant, Alexandria",
        description: "A bustling two-storey restaurant open since 1957 just around the corner from Raml Station and the Metropole Hotel, famous across Egypt for its crisp falafel (ta'ameya), foul medames and hummus with fresh bread. It's cheap, fast and busy from early morning — a classic Alexandrian breakfast.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
