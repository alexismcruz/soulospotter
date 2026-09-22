/**
 * Seasonal "where to go" guides. Editorial only — the page shell
 * (src/components/guides/SeasonalGuide.tsx) pulls live city names/flags from the DB for the
 * `city` slugs below, so every pick links to a real SouloSpotter city page.
 *
 * Climate statements are deliberately general ("typically", "roughly"): seasons shift year
 * to year, and we'd rather be broadly right than falsely precise. Costs/prices are not
 * quoted. Review each January/September.
 */

export type SeasonalPick = {
  /** City.slug in the database. */
  city: string;
  /** Why it works for this season — one or two sentences. */
  why: string;
  /** An honest caveat, if there is one. */
  watch?: string;
};

export type SeasonalGroup = {
  heading: string;
  blurb: string;
  picks: SeasonalPick[];
};

export type SeasonalGuide = {
  slug: "escape-winter" | "winter-wonderland";
  /** <title> without the brand suffix; {year} is replaced at render time. */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  kicker: string;
  intro: string;
  groups: SeasonalGroup[];
  /** Optional "think twice" list: popular places that are a poor fit right now. */
  thinkTwice?: { heading: string; items: { place: string; note: string }[] };
  tips: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export const SEASONAL_GUIDES: Record<string, SeasonalGuide> = {
  "escape-winter": {
    slug: "escape-winter",
    metaTitle: "Where to Go in November & December to Escape Winter ({year})",
    metaDescription:
      "Warm places to travel solo from November to February: dry-season Southeast Asia, India, Mexico, the Caribbean, Cape Town and Southern Hemisphere summer.",
    h1: "Where to Go in November & December to Escape Winter",
    kicker: "Seasonal Guide",
    intro:
      "If you'd rather swap grey skies for sunshine between November and February, the good news is that half the world is entering its best weather right now. Southeast Asia's dry season is starting, India is sunny and cool, the Caribbean and Central America dry out after hurricane season, and the Southern Hemisphere is heading into summer. This guide sorts the best solo-friendly places by region, says why each works right now, and flags the popular spots that are actually in their wet season so you don't book the wrong one.",
    groups: [
      {
        heading: "Southeast Asia: dry season, warm days",
        blurb:
          "The northeast monsoon has passed on most of the mainland, so from roughly November the weather turns dry, sunny and comfortable. It's peak season, so prices rise around Christmas and New Year — booking early, or going in November, helps.",
        picks: [
          { city: "chiang-mai", why: "The 'cool season' (roughly November to February) means sunny days, cooler mornings and evenings, and the best weather of the year for temples and hiking.", watch: "Smoke from seasonal burning usually builds from around February, so November to January is the sweet spot." },
          { city: "phuket", why: "The Andaman coast is in its drier, high season from about November, with calmer seas for beaches and boat trips.", watch: "Christmas–New Year is the busiest and most expensive fortnight of the year." },
          { city: "siem-reap", why: "Cambodia is typically dry and at its most comfortable from November to February — the best window for Angkor Wat's sunrise and long temple days." },
          { city: "el-nido", why: "Palawan's dry season runs roughly from November into May, making it prime time for island-hopping tours and clear water." },
          { city: "luang-prabang", why: "Laos is cool, dry and green after the rains, with misty mornings and pleasant temperatures for cycling and waterfall days." },
          { city: "ho-chi-minh-city", why: "Southern Vietnam is in its dry season from about November — hot, but with far less rain than mid-year." },
          { city: "penang", why: "Malaysia's west coast tends to dry out from around December, when the food-and-heritage island city is at its most pleasant." },
        ],
      },
      {
        heading: "India: sunny, dry and cool",
        blurb:
          "Winter is India's best travel season for much of the north and west: sunny days, comfortable temperatures and little rain. Nights can be properly cold in the north, so pack layers.",
        picks: [
          { city: "jaipur", why: "Rajasthan is at its best from about November to February, with clear skies and mild days that are ideal for forts and palaces." },
          { city: "udaipur", why: "The lake city is pleasantly cool and dry, with the best conditions for sunset boat rides and rooftop dinners." },
          { city: "varanasi", why: "Cooler weather makes the ghats and old-city lanes far more comfortable to explore on foot.", watch: "Winter mornings can be foggy, which sometimes delays trains and flights." },
          { city: "rishikesh", why: "Clear, sunny days for yoga and river rafting, with cold nights and mornings — bring warm layers.", watch: "Very cold in December and January at night." },
        ],
      },
      {
        heading: "Mexico & Central America: the dry season begins",
        blurb:
          "After the rainy season, the dry (and high) season starts from around November in Mexico and December in Central America — sunny, comfortable and ideal for beaches, ruins and hikes.",
        picks: [
          { city: "tulum", why: "Dry, sunny weather and calm Caribbean water make it a classic winter-sun choice.", watch: "Prices rise sharply over Christmas and New Year." },
          { city: "oaxaca", why: "Dry, warm days and cool evenings, and early November brings the spectacular Day of the Dead celebrations.", watch: "Book accommodation far ahead for Day of the Dead (1–2 November)." },
          { city: "puerto-escondido", why: "Dry-season sunshine, warm ocean and consistent surf on the Pacific coast." },
          { city: "mexico-city", why: "Dry, sunny winter days (with chilly nights) are the most comfortable time to explore the capital's museums, markets and food scene." },
          { city: "manuel-antonio", why: "Costa Rica's Pacific coast typically dries out from around December — beaches, wildlife and rainforest walks in peak season." },
          { city: "boquete", why: "Panama's highlands enjoy clear, cool, drier weather from about December, ideal for coffee farms and hiking." },
        ],
      },
      {
        heading: "Colombia & the Caribbean: after hurricane season",
        blurb:
          "The Atlantic hurricane season officially ends on 30 November, and the Caribbean's dry season runs from about December to April, with warm, sunny days and calmer seas.",
        picks: [
          { city: "cartagena", why: "Colombia's Caribbean coast is typically at its driest and sunniest from about December, when the walled old town is at its best." },
          { city: "santa-marta", why: "The gateway to Tayrona National Park and Caribbean beaches is drier and less humid in the winter months." },
          { city: "san-juan", why: "Warm, dry weather, beaches, history and food make Puerto Rico's capital an easy winter escape." },
          { city: "negril", why: "Jamaica's seven-mile beach is sunny and dry through the winter high season." },
          { city: "bridgetown", why: "Barbados is warm and dry in the winter months, with calm west-coast beaches." },
        ],
      },
      {
        heading: "South America: it's summer down there",
        blurb:
          "December to February is summer in the Southern Cone — long days, beach weather and the best trekking conditions in Patagonia. It's also peak season, so book early.",
        picks: [
          { city: "buenos-aires", why: "Warm to hot summer evenings suit the city's late dining and rooftop culture.", watch: "Can be very hot and humid in January." },
          { city: "bariloche", why: "Lake District summer: warm days for lakes, hiking and the Seven Lakes road." },
          { city: "puerto-natales", why: "The gateway to Torres del Paine — the December to February window offers the longest days and the most accessible trails.", watch: "Strong winds and sudden weather changes are normal; book treks well ahead." },
          { city: "punta-del-este", why: "Uruguay's beach resort peaks from December, with the coast at its liveliest." },
          { city: "florianopolis", why: "Southern Brazil's island of beaches is in full summer swing." },
        ],
      },
      {
        heading: "Africa & the Middle East: sunshine and safari",
        blurb:
          "North Africa and Egypt are mild and sunny in winter, and southern Africa is heading into summer.",
        picks: [
          { city: "marrakech", why: "Sunny, comfortable days ideal for souks and gardens, though nights are cool.", watch: "Evenings and mornings can be properly chilly — bring a warm layer." },
          { city: "luxor", why: "Upper Egypt is at its best from about November to February: mild days for the temples and tombs, without summer's extreme heat." },
          { city: "dahab", why: "Mild, sunny days on the Red Sea coast for diving, snorkelling and desert trips." },
          { city: "cape-town", why: "Long summer days for beaches, Table Mountain and the winelands.", watch: "Peak season from December, so book accommodation early." },
          { city: "zanzibar", why: "Hot and increasingly dry from around mid-December, with the best beach weather usually in January and February.", watch: "Short rains often fall in November." },
        ],
      },
      {
        heading: "Australia & New Zealand: summer starts",
        blurb: "Summer begins in December, with long, bright days.",
        picks: [
          { city: "byron-bay", why: "Beach and surf season in full swing, with a laid-back solo-traveller scene." },
          { city: "melbourne", why: "Warm summer days for the city's cafés, street art and festivals.", watch: "Melbourne's weather can change fast, so carry a layer." },
          { city: "queenstown", why: "Long, bright days for hiking, lakes and adventure sports.", watch: "December and January are peak season with high prices." },
        ],
      },
    ],
    thinkTwice: {
      heading: "Popular winter picks that are actually in their wet season",
      items: [
        { place: "Bali & Ubud", note: "The wet season typically runs from about November to March, with frequent, heavy afternoon showers. Still doable, but expect rain — consider Thailand or Mexico for reliably dry weather." },
        { place: "Koh Tao & the Gulf of Thailand islands", note: "The Gulf side usually gets its heaviest rain from around October to December. The Andaman coast (Phuket) is a safer bet in these months." },
        { place: "Hanoi & northern Vietnam", note: "Winters are cool, grey and often drizzly rather than sunny. Southern Vietnam is warmer and drier." },
        { place: "Cusco & the Peruvian Andes", note: "November to March is the rainy season in the highlands, and trekking conditions are trickier." },
      ],
    },
    tips: [
      {
        heading: "Book the Christmas–New Year window early",
        body: "Roughly 20 December to 5 January is the most expensive and busiest period almost everywhere warm. If your dates are flexible, travelling in November or after the first week of January is often noticeably cheaper and calmer — with the same weather.",
      },
      {
        heading: "Check visas before you commit",
        body: "Entry rules vary by passport and change often. Our visa table shows visa-free, e-Visa or visa-required at a glance for popular destinations, with a link to each official source.",
      },
      {
        heading: "Sort your insurance and phone data before you fly",
        body: "Winter destinations are peak season for motorbike accidents, water activities and stomach bugs, so make sure your cover fits what you'll actually be doing. An eSIM set up before you land gives you data from the airport, which is handy for getting a taxi or booking a first night.",
      },
    ],
    faqs: [
      {
        question: "Where is the best place to go in November to escape the cold?",
        answer:
          "For reliably dry, sunny weather in November, the strongest bets are mainland Southeast Asia (northern and western Thailand, Cambodia, Laos), India (Rajasthan and the north), Mexico's dry-season regions, and the Southern Hemisphere as summer begins. Check each destination's specific rainfall pattern — for example, Bali and the Gulf of Thailand islands are wetter at this time.",
      },
      {
        question: "What are the cheapest warm places to travel in winter?",
        answer:
          "Southeast Asia (Thailand, Cambodia, Laos, Vietnam), India and parts of Latin America such as Colombia and Mexico's smaller cities usually offer the lowest daily costs, especially outside the Christmas–New Year peak. Flights are usually the biggest cost, so compare prices across several dates.",
      },
      {
        question: "Is it still hurricane season in the Caribbean in December?",
        answer:
          "The Atlantic hurricane season officially runs from 1 June to 30 November, and the risk falls sharply by December, when the Caribbean's dry season begins. Storms outside the official season are uncommon but not impossible, so check forecasts and consider insurance.",
      },
      {
        question: "When should I book flights and hotels for Christmas and New Year?",
        answer:
          "As early as you comfortably can — the peak dates from around 20 December to 5 January sell out and cost the most. Shifting your trip by even a week on either side often saves a lot. Flexible cancellation terms are worth paying a little extra for.",
      },
      {
        question: "Is it safe to travel alone during the winter holidays?",
        answer:
          "Yes, and it's a great time to meet other travellers, since hostels and group tours are busy. The usual precautions apply: book your first nights in advance, arrange transport from the airport, and take extra care with belongings in crowded places.",
      },
    ],
  },

  "winter-wonderland": {
    slug: "winter-wonderland",
    metaTitle: "Best Places to Spend Winter: Christmas Markets & Snow ({year})",
    metaDescription:
      "Where to enjoy winter, not escape it: Christmas markets, snowy Nordic and Canadian cities, northern lights and cosy solo-friendly city breaks.",
    h1: "Best Places to Spend Winter: Christmas Markets, Snow & Cosy Cities",
    kicker: "Seasonal Guide",
    intro:
      "Some cities are at their best in the cold. From late November, Central and Northern Europe fill with Christmas markets, mulled wine and lights; the Nordic capitals turn cosy and candlelit; and Canada and the Alps offer proper snow. Winter is also a very solo-friendly season: markets, museums, cafés and thermal baths are all easy to enjoy alone, and prices outside the peak dates can be gentler than summer.",
    groups: [
      {
        heading: "Christmas markets (roughly late November to 23 December)",
        blurb:
          "Most traditional markets open in the last week of November and run until around 23 or 24 December (some go on to New Year). Go on a weekday evening for the best atmosphere and the smallest crowds.",
        picks: [
          { city: "munich", why: "Bavaria's capital has a market on Marienplatz and several themed ones, with hot mulled wine, roasted almonds and classic wooden-stall crafts." },
          { city: "vienna", why: "Markets in front of the City Hall and around the old town, plus a city full of cafés and concert halls for warming up in." },
          { city: "prague", why: "The Old Town Square market under a giant tree, with the astronomical clock and cobbled lanes as a backdrop." },
          { city: "tallinn", why: "Estonia's medieval old town is a fairytale in winter, with a market in the main square and a long Christmas-tree tradition." },
          { city: "budapest", why: "Festive markets in the city centre, plus thermal baths that are at their most enjoyable in freezing weather." },
          { city: "krakow", why: "A market on the huge Main Square, warm Polish food and very approachable prices." },
          { city: "salzburg", why: "A classic Alpine-town Christmas market beneath the fortress, with a strong music and Advent tradition." },
          { city: "copenhagen", why: "Candlelit, cosy 'hygge' streets and festive decorations, including the seasonal Tivoli Gardens.", watch: "One of the pricier cities in Europe." },
          { city: "riga", why: "A festive old town with markets and a proud Christmas-tree tradition, at a lower cost than Western Europe." },
          { city: "edinburgh", why: "A winter festival and markets, and one of the world's best-known New Year's Eve street parties (Hogmanay).", watch: "Hogmanay events need tickets — book well ahead." },
          { city: "quebec-city", why: "North America's most European-feeling old town, with a German-style Christmas market and deep snow." },
        ],
      },
      {
        heading: "Snow, hot drinks and cosy cities (December to February)",
        blurb:
          "If you want proper winter — snow, short days, saunas and hot chocolate — these are the places to base yourself. Pack warm layers and waterproof footwear.",
        picks: [
          { city: "reykjavik", why: "Geothermal pools, cosy cafés and access to northern lights viewing (typically from around September to March on dark, clear nights — never guaranteed).", watch: "Daylight is very short in midwinter, and weather can disrupt tours." },
          { city: "helsinki", why: "A city of saunas, design and candlelit cafés, with a real winter feel and good transport links to Lapland." },
          { city: "oslo", why: "Snowy forests and ski trails on the city's doorstep, plus excellent museums for the darkest days." },
          { city: "stockholm", why: "The old town is beautiful in winter, and the city's café ('fika') culture suits cold days.", watch: "Daylight is short in December." },
          { city: "bergen", why: "A colourful harbour town surrounded by fjords and mountains, atmospheric in winter.", watch: "Very rainy year-round." },
          { city: "banff", why: "Snowy Canadian Rockies with skiing, frozen lakes and hot springs.", watch: "Very cold — temperatures well below freezing are normal." },
          { city: "montreal", why: "Winter festivals, snowy streets and a lively indoor food and music scene." },
          { city: "lucerne", why: "A postcard Swiss lake town and a launch pad for day trips into the snowy Alps.", watch: "Switzerland is expensive." },
          { city: "tbilisi", why: "A character-filled capital with a mild-to-cold winter, hearty Georgian food and skiing at Gudauri a couple of hours away." },
        ],
      },
      {
        heading: "Winter in Asia: crisp, clear and quieter",
        blurb: "Winter is a comfortable, less crowded time to visit East Asia's big cities, with clear skies and festive illuminations.",
        picks: [
          { city: "tokyo", why: "Cold but usually dry and clear, with winter light displays, onsen trips and far fewer crowds than cherry-blossom season." },
          { city: "kyoto", why: "Quiet temples and gardens, with the occasional dusting of snow making the old streets beautiful.", watch: "Cold, especially indoors in old buildings." },
          { city: "seoul", why: "Crisp, dry winter days, hearty street food and easy access to ski resorts.", watch: "Seriously cold in January." },
        ],
      },
    ],
    tips: [
      {
        heading: "Plan around the holidays",
        body: "Many attractions and most restaurants close on 24–26 December and 1 January, and public transport runs a reduced timetable. Book meals and tickets in advance, and stock up on food if you're arriving on a public holiday.",
      },
      {
        heading: "Pack for the cold, and the short days",
        body: "Layers, waterproof boots and a proper hat and gloves matter more than a bulky coat. In the Nordics, daylight can be just a few hours in December, so plan outdoor activities around it.",
      },
      {
        heading: "Check your insurance if you plan to ski",
        body: "Winter sports are often excluded or need an add-on, so read your policy before you book. Icy pavements are also a real injury risk in cold cities, so cover for medical treatment abroad is worth having.",
      },
    ],
    faqs: [
      {
        question: "When do Christmas markets open and close?",
        answer:
          "Most traditional Christmas markets in Germany, Austria, Czechia, Hungary, Poland and the Baltics open in the last week of November and close around 23–24 December. Some stay open until New Year's Eve, but exact dates vary by city and year, so check the official market website before you book.",
      },
      {
        question: "Can I see the northern lights on a solo trip?",
        answer:
          "Often, yes — you can join small-group tours from places like Reykjavik. The northern lights are typically visible from around September to March on dark, clear nights, but they are never guaranteed, so allow several nights and stay flexible.",
      },
      {
        question: "Is winter cheaper than summer for solo travel?",
        answer:
          "It depends on the dates. Outside the Christmas–New Year period, hotels and flights to many European cities can be cheaper than in summer, while ski areas and the holiday weeks are the most expensive. January is often the best-value month.",
      },
      {
        question: "Is it safe to travel alone in cold weather?",
        answer:
          "Yes, with sensible planning. Dress for the temperature, watch for ice, keep your phone charged (cold drains batteries), and tell someone your plans if you're heading out for a hike or a remote tour.",
      },
    ],
  },
};

export const SEASONAL_GUIDE_SLUGS = Object.keys(SEASONAL_GUIDES);
