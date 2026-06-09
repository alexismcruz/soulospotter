// Shared data for Europe experiences — used by both the seed script and the photo script.
// img field: "activity:<key>" (verified Unsplash activity photo, reused from the Asia set)
//            or "landmark:<spot-slug>" (reuse the real landmark photo in /public/spots).
//
// Photo policy: culture / tours / day-trips reuse REAL landmark photos already
// downloaded from Wikipedia. Food / cooking / wellness / nightlife / fitness use the
// existing eyeballed activity Unsplash IDs. No generic city stock.

// Verified activity Unsplash photo IDs (same proven set used for Asia).
const ACTIVITY_PHOTOS = {
  cooking:    "1556909114-f6e7ad7d3136",
  cooking2:   "1507048331197-7d4ac70811cf",
  streetfood: "1504674900247-0877df9cc836",
  streetfood2:"1572656631137-7935297eff55",
  yoga:       "1545205597-3d9d02c29597",
  cycling:    "1485965120184-e220f721d03e",
  trek:       "1551632811-561732d1e306",
  photo:      "1452587925148-ce544e77e70d",
  spa:        "1544161515-4ab6ce6db874",
  bar:        "1514933651103-005eec06c04b",
};

const CITY_NAMES = {
  "amsterdam": "Amsterdam", "rome": "Rome", "prague": "Prague", "budapest": "Budapest",
  "athens": "Athens", "vienna": "Vienna", "copenhagen": "Copenhagen", "porto": "Porto",
  "edinburgh": "Edinburgh", "seville": "Seville", "florence": "Florence",
  "dubrovnik": "Dubrovnik", "tallinn": "Tallinn", "ljubljana": "Ljubljana", "krakow": "Kraków",
};

// price USD/person, duration, frequency, min, max
const E = (city, slug, name, category, img, price, duration, desc, freq = "daily", min = 1, max = 12) =>
  ({ city, slug, name, category, img, price, duration, description: desc, frequency: freq, groupSizeMin: min, groupSizeMax: max });

const EXPERIENCES = [
  // ── Amsterdam ──
  E("amsterdam","amsterdam-canal-history-walk","Canal Ring History Walk","ARTS_CULTURE","landmark:rijksmuseum-amsterdam",30,"2.5 hours","Stroll Amsterdam's UNESCO canal ring with a local guide — Golden Age merchant houses, hidden hofjes, and the stories behind the gables."),
  E("amsterdam","amsterdam-cheese-jenever-tasting","Dutch Cheese & Jenever Tasting","FOOD_DRINK","activity:streetfood",45,"2 hours","Taste aged Goudas, herring, and stroopwafels paired with traditional jenever in a cozy proeflokaal, with a food-loving host."),
  E("amsterdam","amsterdam-bike-tour","Classic Amsterdam Bike Tour","OUTDOOR_ADVENTURE","activity:cycling",35,"3 hours","See Amsterdam the way locals do — by bike. Glide past the Jordaan, Vondelpark, and the canals on a relaxed small-group ride."),
  E("amsterdam","amsterdam-keukenhof-day-trip","Keukenhof & Tulip Fields Day Trip","DAY_TRIPS","landmark:keukenhof-gardens-amsterdam",69,"Full day","Visit the world-famous Keukenhof gardens and surrounding tulip fields in spring, an easy guided day trip from the city.","seasonal"),
  E("amsterdam","amsterdam-brown-cafe-crawl","Brown Café & Craft Beer Crawl","NIGHTLIFE_SOCIAL","activity:bar",40,"3 hours","Hop between Amsterdam's centuries-old brown cafés and modern craft breweries with a small, social group — solo-friendly."),

  // ── Rome ──
  E("rome","rome-colosseum-forum-tour","Colosseum & Roman Forum Tour","ARTS_CULTURE","landmark:colosseum-rome",55,"3 hours","Skip the line into the Colosseum, then walk the Roman Forum and Palatine Hill with an archaeologist guide bringing ancient Rome to life."),
  E("rome","rome-vatican-museums-tour","Vatican Museums & Sistine Chapel","ARTS_CULTURE","landmark:vatican-museums-rome",65,"3.5 hours","Beat the crowds to the Vatican Museums, the Raphael Rooms, and Michelangelo's Sistine Chapel ceiling with an expert art-history guide."),
  E("rome","rome-trastevere-food-tour","Trastevere Evening Food Tour","FOOD_DRINK","activity:streetfood2",65,"3.5 hours","Eat through Trastevere's backstreets — supplì, cacio e pepe, Roman pizza, and gelato — with a local guide and plenty of wine."),
  E("rome","rome-pasta-cooking-class","Roman Pasta-Making Class","FOOD_DRINK","activity:cooking",60,"3 hours","Roll fresh pasta by hand and master classic Roman sauces in a small-group class led by a nonna-trained chef, wine included."),
  E("rome","rome-sunset-photo-walk","Golden-Hour Photo Walk","PHOTOGRAPHY_WALKS","activity:photo",40,"2 hours","Capture Rome at its most beautiful — Trevi, the Pantheon, and quiet piazzas at golden hour — with a photographer who knows the light."),

  // ── Prague ──
  E("prague","prague-castle-tour","Prague Castle & Cathedral Tour","ARTS_CULTURE","landmark:prague-castle",40,"3 hours","Explore the world's largest ancient castle complex — St. Vitus Cathedral, Golden Lane, and royal courtyards — with a local historian."),
  E("prague","prague-old-town-walk","Old Town & Astronomical Clock Walk","ARTS_CULTURE","landmark:old-town-square-prague",25,"2.5 hours","Wander Prague's medieval Old Town, watch the Astronomical Clock chime, and cross Charles Bridge with a storytelling guide."),
  E("prague","prague-beer-tasting-tour","Czech Beer Tasting Tour","FOOD_DRINK","activity:bar",38,"3 hours","Sample the world's best lagers and dark beers across traditional Prague pubs and microbreweries with a beer-obsessed local."),
  E("prague","prague-czech-cooking-class","Czech Cooking & Goulash Class","FOOD_DRINK","activity:cooking",50,"4 hours","Cook hearty Czech classics — goulash, svíčková, and bramboráky — with a market visit and plenty of beer to pair."),
  E("prague","prague-vltava-photo-walk","Vltava & Bridges Photo Walk","PHOTOGRAPHY_WALKS","activity:photo",35,"2 hours","Shoot Prague's spires, Charles Bridge, and riverside reflections at dawn before the crowds, guided by a local photographer."),

  // ── Budapest ──
  E("budapest","budapest-castle-hill-tour","Buda Castle & Fisherman's Bastion Tour","ARTS_CULTURE","landmark:buda-castle-budapest",30,"3 hours","Climb Castle Hill for sweeping Danube views, Matthias Church, and the fairytale Fisherman's Bastion with a local guide."),
  E("budapest","budapest-thermal-bath-experience","Széchenyi Thermal Bath Experience","WELLNESS_MINDFULNESS","landmark:szechenyi-thermal-bath-budapest",35,"Half day","Soak in the grand neo-baroque Széchenyi Baths — outdoor thermal pools, saunas, and steam rooms — with skip-the-line entry and a towel."),
  E("budapest","budapest-ruin-bar-crawl","Ruin Bar Crawl","NIGHTLIFE_SOCIAL","activity:bar",30,"4 hours","Discover Budapest's legendary ruin bars in the old Jewish Quarter with a social small group — perfect for meeting other solo travelers."),
  E("budapest","budapest-hungarian-food-tour","Hungarian Market & Food Tour","FOOD_DRINK","landmark:great-market-hall-budapest",45,"3 hours","Graze the Great Market Hall and local eateries — goulash, lángos, chimney cake, and Tokaji wine — with a food-loving guide."),
  E("budapest","budapest-danube-cruise","Danube Evening Cruise","DAY_TRIPS","landmark:hungarian-parliament-budapest",28,"1.5 hours","Glide past the floodlit Parliament, Chain Bridge, and Castle Hill on a relaxed evening Danube cruise with a welcome drink."),

  // ── Athens ──
  E("athens","athens-acropolis-tour","Acropolis & Parthenon Tour","ARTS_CULTURE","landmark:acropolis-athens",50,"3 hours","Climb the Acropolis with an archaeologist guide — the Parthenon, Erechtheion, and the theatre of Dionysus, with skip-the-line entry."),
  E("athens","athens-museum-tour","Acropolis Museum Guided Tour","ARTS_CULTURE","landmark:acropolis-museum-athens",40,"2 hours","Explore the stunning Acropolis Museum's marbles and Parthenon frieze with an expert guide, with views back up to the rock itself."),
  E("athens","athens-food-tour","Athens Central Market Food Tour","FOOD_DRINK","activity:streetfood",45,"3.5 hours","Taste your way through the Varvakios market and old town — souvlaki, loukoumades, Greek cheeses, and ouzo — with a local guide."),
  E("athens","athens-greek-cooking-class","Greek Cooking Class","FOOD_DRINK","activity:cooking",55,"4 hours","Cook moussaka, tzatziki, and fresh meze in a hands-on class with a market visit and a long Greek lunch to enjoy your work."),
  E("athens","athens-riviera-day-trip","Cape Sounion & Temple of Poseidon","DAY_TRIPS","activity:trek",60,"Half day","Drive the Athens Riviera coast to the clifftop Temple of Poseidon at Cape Sounion for a legendary Aegean sunset."),

  // ── Vienna ──
  E("vienna","vienna-schonbrunn-tour","Schönbrunn Palace & Gardens Tour","ARTS_CULTURE","landmark:schonbrunn-palace-vienna",45,"3 hours","Tour the Habsburgs' imperial summer palace and its baroque gardens, Gloriette, and maze with a guide steeped in Vienna's royal history."),
  E("vienna","vienna-belvedere-klimt-tour","Belvedere & Klimt's 'The Kiss'","ARTS_CULTURE","landmark:belvedere-palace-vienna",42,"2 hours","See Klimt's golden 'The Kiss' and Austrian masterpieces inside the baroque Belvedere palace with an art-history guide."),
  E("vienna","vienna-coffeehouse-cake-tour","Viennese Coffeehouse & Cake Tour","FOOD_DRINK","activity:streetfood2",40,"2.5 hours","Sit in Vienna's historic coffeehouses for Sachertorte, apfelstrudel, and melange, learning the rituals of UNESCO café culture."),
  E("vienna","vienna-classical-concert","Vienna Classical Concert Evening","ARTS_CULTURE","landmark:vienna-state-opera",55,"2 hours","Hear Mozart and Strauss performed by musicians in period dress in a historic Vienna concert hall — the city's musical soul."),
  E("vienna","vienna-naschmarkt-food-tour","Naschmarkt Food & Wine Tour","FOOD_DRINK","landmark:naschmarkt-vienna",48,"3 hours","Graze Vienna's lively Naschmarkt — Austrian cheeses, sausages, strudel, and Grüner Veltliner wine — with a local foodie guide."),

  // ── Copenhagen ──
  E("copenhagen","copenhagen-city-bike-tour","Copenhagen by Bike Tour","OUTDOOR_ADVENTURE","activity:cycling",38,"3 hours","Ride the world's most cycle-friendly city — Nyhavn, the harbour, Christiania, and royal palaces — on a relaxed local-led bike tour."),
  E("copenhagen","copenhagen-nyhavn-canal-tour","Nyhavn & Canal Boat Tour","DAY_TRIPS","landmark:nyhavn-copenhagen",28,"1.5 hours","Cruise Copenhagen's canals from colourful Nyhavn past the Opera House and Little Mermaid with running commentary."),
  E("copenhagen","copenhagen-new-nordic-food-tour","New Nordic Food Tour","FOOD_DRINK","activity:streetfood2",75,"3.5 hours","Taste the New Nordic movement — smørrebrød, fermented bites, pastries, and street food at Reffen — with a food-savvy guide."),
  E("copenhagen","copenhagen-tivoli-evening","Tivoli Gardens Evening","ARTS_CULTURE","landmark:tivoli-gardens-copenhagen",30,"3 hours","Stroll the world's most charming historic pleasure garden by night — lights, rides, and live music — with skip-the-line entry."),
  E("copenhagen","copenhagen-design-walk","Danish Design & Architecture Walk","ARTS_CULTURE","activity:photo",35,"2.5 hours","Discover the roots of Danish design — furniture, lighting, and modern architecture — on a curated city walk with a design guide."),

  // ── Porto ──
  E("porto","porto-port-wine-tour","Port Wine Cellar Tour & Tasting","FOOD_DRINK","landmark:dom-luis-i-bridge-porto",40,"2.5 hours","Cross the Dom Luís bridge to Vila Nova de Gaia's historic port lodges for a guided cellar tour and tasting of ruby, tawny, and vintage ports."),
  E("porto","porto-old-town-walk","Porto Old Town & Ribeira Walk","ARTS_CULTURE","landmark:ribeira-porto",25,"2.5 hours","Wander Porto's UNESCO Ribeira riverfront, São Bento's azulejo tiles, and Livraria Lello with a storytelling local guide."),
  E("porto","porto-food-tour","Porto Food & Francesinha Tour","FOOD_DRINK","landmark:mercado-do-bolhao-porto",45,"3.5 hours","Taste Porto through the Bolhão market and tascas — francesinha, bacalhau, and pastéis — with plenty of vinho verde."),
  E("porto","porto-douro-valley-day-trip","Douro Valley Wine Day Trip","DAY_TRIPS","activity:trek",95,"Full day","Drive into the terraced Douro Valley for two quinta wine tastings, a river cruise, and lunch among the world's oldest wine region."),
  E("porto","porto-fado-night","Fado & Petiscos Evening","NIGHTLIFE_SOCIAL","activity:bar",42,"2.5 hours","Hear soulful live fado over Portuguese petiscos and wine in an intimate Porto venue — a moving night out for solo travelers."),

  // ── Edinburgh ──
  E("edinburgh","edinburgh-castle-tour","Edinburgh Castle & Royal Mile Tour","ARTS_CULTURE","landmark:edinburgh-castle",40,"3 hours","Explore Edinburgh Castle and walk the Royal Mile to Holyrood with a kilted guide weaving royal history, plague, and legend."),
  E("edinburgh","edinburgh-arthurs-seat-hike","Arthur's Seat Sunrise Hike","OUTDOOR_ADVENTURE","landmark:arthurs-seat-edinburgh",25,"2.5 hours","Hike an extinct volcano in the heart of the city for panoramic sunrise views over Edinburgh and the Firth of Forth."),
  E("edinburgh","edinburgh-whisky-tasting","Scotch Whisky Tasting","FOOD_DRINK","activity:bar",45,"2 hours","Nose and taste single malts from across Scotland's whisky regions with an expert who makes the dram approachable for beginners."),
  E("edinburgh","edinburgh-ghost-tour","Underground Ghost & Vaults Tour","ARTS_CULTURE","landmark:royal-mile-edinburgh",22,"1.5 hours","Descend into Edinburgh's haunted South Bridge Vaults and Old Town closes for a deliciously creepy history-and-ghost tour."),
  E("edinburgh","edinburgh-highlands-day-trip","Highlands & Loch Ness Day Trip","DAY_TRIPS","activity:trek",75,"Full day","Journey into the Scottish Highlands — Glencoe, Loch Ness, and dramatic glens — on a small-group day trip from Edinburgh."),

  // ── Seville ──
  E("seville","seville-alcazar-cathedral-tour","Alcázar & Cathedral Tour","ARTS_CULTURE","landmark:real-alcazar-seville",45,"3 hours","Tour the Mudéjar Royal Alcázar palace and gardens, then Seville's vast Gothic cathedral and Giralda tower with skip-the-line entry."),
  E("seville","seville-flamenco-show","Authentic Flamenco Show","ARTS_CULTURE","landmark:barrio-santa-cruz-seville",35,"1.5 hours","Feel the raw emotion of live flamenco — guitar, song, and dance — in an intimate tablao in the heart of Seville."),
  E("seville","seville-tapas-tour","Seville Tapas & Sherry Tour","FOOD_DRINK","activity:streetfood",48,"3.5 hours","Crawl Seville's best tabernas for jamón, salmorejo, and fried fish paired with local sherries, with a tapas-loving guide."),
  E("seville","seville-spanish-cooking-class","Spanish Paella Cooking Class","FOOD_DRINK","activity:cooking",55,"4 hours","Shop the Triana market then cook authentic paella and sangria in a hands-on class, finishing with a long Andalusian lunch."),
  E("seville","seville-plaza-espana-bike","Plaza de España & Park Bike Tour","OUTDOOR_ADVENTURE","landmark:plaza-de-espana-seville",30,"2.5 hours","Cycle Seville's grand Plaza de España and the leafy María Luisa Park on a relaxed guided ride through the city's prettiest corners."),

  // ── Florence ──
  E("florence","florence-uffizi-tour","Uffizi Gallery Guided Tour","ARTS_CULTURE","landmark:uffizi-gallery-florence",60,"2.5 hours","See Botticelli's Birth of Venus, Leonardo, and Michelangelo in the Uffizi with an art historian and skip-the-line entry."),
  E("florence","florence-duomo-climb","Duomo & Brunelleschi's Dome Climb","ARTS_CULTURE","landmark:florence-cathedral-duomo",45,"2 hours","Climb Brunelleschi's engineering marvel for close-up frescoes and rooftop views over Florence, with a guide to the cathedral complex."),
  E("florence","florence-tuscan-food-tour","Tuscan Food & Wine Tour","FOOD_DRINK","activity:streetfood2",55,"3.5 hours","Taste lampredotto, pecorino, cured meats, and Chianti across Florence's markets and enoteche with a local foodie guide."),
  E("florence","florence-cooking-class","Tuscan Cooking Class","FOOD_DRINK","activity:cooking",65,"4 hours","Make fresh pasta, ragù, and tiramisù in a hands-on Tuscan cooking class with a market tour and free-flowing Chianti."),
  E("florence","florence-chianti-day-trip","Chianti Vineyards Day Trip","DAY_TRIPS","activity:trek",95,"Full day","Roll through the Chianti hills for two winery visits, tastings of Sangiovese, and a Tuscan lunch among the vineyards."),

  // ── Dubrovnik ──
  E("dubrovnik","dubrovnik-city-walls-tour","City Walls Walking Tour","ARTS_CULTURE","landmark:dubrovnik-city-walls",40,"2 hours","Walk Dubrovnik's complete medieval walls above the Adriatic with a guide — history, sea views, and Game of Thrones filming spots."),
  E("dubrovnik","dubrovnik-old-town-game-of-thrones","Game of Thrones Old Town Tour","ARTS_CULTURE","landmark:old-town-dubrovnik",35,"2 hours","Find King's Landing in Dubrovnik's marble streets — the Red Keep, the Walk of Shame steps, and Blackwater Bay — with scene clips."),
  E("dubrovnik","dubrovnik-sea-kayak","Sea Kayaking Around the Walls","OUTDOOR_ADVENTURE","activity:trek",45,"3 hours","Paddle beneath Dubrovnik's towering walls to Lokrum island and a sea cave beach, finishing with a swim and Adriatic sunset."),
  E("dubrovnik","dubrovnik-lokrum-island","Lokrum Island Day Trip","DAY_TRIPS","landmark:lokrum-island-dubrovnik",30,"Half day","Boat to the green island of Lokrum for botanical gardens, a saltwater lake, peacocks, and quiet swimming coves."),
  E("dubrovnik","dubrovnik-food-wine-tour","Dalmatian Food & Wine Tour","FOOD_DRINK","activity:streetfood",50,"3 hours","Taste Dalmatian classics — fresh oysters, peka, cheeses, and Croatian wines — through Dubrovnik's old town with a local guide."),

  // ── Tallinn ──
  E("tallinn","tallinn-old-town-tour","Medieval Old Town Walking Tour","ARTS_CULTURE","landmark:tallinn-old-town",25,"2 hours","Wander Tallinn's fairytale UNESCO old town — Town Hall Square, guild halls, and city walls — with a guide bringing the Hanseatic era alive."),
  E("tallinn","tallinn-kadriorg-kumu","Kadriorg Palace & KUMU Art Museum","ARTS_CULTURE","landmark:kadriorg-palace-tallinn",35,"3 hours","Visit Peter the Great's baroque Kadriorg Palace and the striking KUMU museum of Estonian art set in its parklands."),
  E("tallinn","tallinn-estonian-food-tour","Estonian Food & Market Tour","FOOD_DRINK","activity:streetfood2",40,"3 hours","Taste black bread, smoked fish, elk sausage, and Vana Tallinn liqueur across the Balti Jaam market and old town eateries."),
  E("tallinn","tallinn-sauna-experience","Traditional Estonian Sauna","WELLNESS_MINDFULNESS","activity:spa",45,"2.5 hours","Sweat the Estonian way — a traditional smoke sauna ritual with birch whisks and a cold plunge, the heart of Baltic wellness."),
  E("tallinn","tallinn-lahemaa-day-trip","Lahemaa National Park Day Trip","DAY_TRIPS","activity:trek",70,"Full day","Explore Estonia's largest national park — bogs, forests, waterfalls, manor houses, and the Baltic coast — on a guided day trip."),

  // ── Ljubljana ──
  E("ljubljana","ljubljana-castle-old-town","Ljubljana Castle & Old Town Tour","ARTS_CULTURE","landmark:ljubljana-castle",28,"2.5 hours","Funicular up to Ljubljana Castle for panoramic views, then wander Plečnik's old town and the Triple Bridge with a local guide."),
  E("ljubljana","ljubljana-lake-bled-day-trip","Lake Bled & Bohinj Day Trip","DAY_TRIPS","landmark:lake-bled-day-trip-ljubljana",65,"Full day","Row to the island church on iconic Lake Bled, taste a cream cake, and visit serene Lake Bohinj in the Julian Alps."),
  E("ljubljana","ljubljana-food-tour","Slovenian Food & Wine Tour","FOOD_DRINK","activity:streetfood",45,"3 hours","Graze the Ljubljana central market and Open Kitchen — štruklji, sausages, and Slovenian wines — with a passionate local guide."),
  E("ljubljana","ljubljana-bike-tour","Ljubljana Green Capital Bike Tour","OUTDOOR_ADVENTURE","activity:cycling",30,"2.5 hours","Cycle Europe's Green Capital — riverside paths, Tivoli Park, and Plečnik landmarks — on a relaxed local-led ride."),
  E("ljubljana","ljubljana-postojna-cave-day-trip","Postojna Cave & Predjama Castle","DAY_TRIPS","activity:trek",70,"Full day","Ride the underground train through Postojna's vast cave system, then visit the dramatic clifftop Predjama Castle."),

  // ── Kraków ──
  E("krakow","krakow-old-town-wawel-tour","Old Town & Wawel Castle Tour","ARTS_CULTURE","landmark:wawel-castle-krakow",30,"3 hours","Walk Kraków's grand Main Square and St. Mary's Basilica up to Wawel Castle and Cathedral with a guide to a thousand years of Polish history."),
  E("krakow","krakow-auschwitz-memorial-tour","Auschwitz-Birkenau Memorial Tour","ARTS_CULTURE","landmark:auschwitz-birkenau-krakow",55,"Full day","A guided, deeply moving visit to the Auschwitz-Birkenau Memorial and Museum — essential, sobering history, with respectful transport from Kraków."),
  E("krakow","krakow-wieliczka-salt-mine","Wieliczka Salt Mine Tour","DAY_TRIPS","landmark:wieliczka-salt-mine-krakow",45,"Half day","Descend into the UNESCO Wieliczka Salt Mine — underground chapels, carved chambers, and a salt cathedral, all hewn by miners."),
  E("krakow","krakow-jewish-quarter-food-tour","Kazimierz Jewish Quarter Food Tour","FOOD_DRINK","landmark:kazimierz-krakow",42,"3.5 hours","Taste pierogi, zapiekanka, Jewish-Polish classics, and vodka across the atmospheric Kazimierz quarter with a local guide."),
  E("krakow","krakow-vodka-tasting","Polish Vodka Tasting","NIGHTLIFE_SOCIAL","activity:bar",30,"2 hours","Sample Poland's finest clear and flavoured vodkas with traditional zakuski snacks and stories, in a cosy Kraków cellar bar."),
];

module.exports = { EXPERIENCES, ACTIVITY_PHOTOS, CITY_NAMES };
