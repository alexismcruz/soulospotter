/**
 * Country "start here" guide content — editorial only (see countryGuides.ts for the
 * types, the merge, and the rules). Visa facts are NOT written here: each guide's visa
 * section comes from VISA_NOTES in countryGuides.ts, so there is one verified source.
 *
 * Writing rules: genuinely useful, evergreen, honest. Costs are rough ranges (they move
 * with exchange rates), safety advice is specific rather than alarmist, and nothing here
 * states a fact we couldn't defend. Add a guide here + a matching VISA_NOTES entry and
 * the guide page, guides index, sitemap and visa table all pick it up.
 */
import type { GuideContent } from "./countryGuides";

export const MORE_GUIDES: Record<string, GuideContent> = {
  mexico: {
    countrySlug: "mexico",
    countryName: "Mexico",
    gatewayAirport: { code: "MEX", city: "Mexico City" },
    intro:
      "Mexico is a brilliant first country for solo travellers who want food, culture and beaches without a huge budget. It's close to North America, easy on visas, and endlessly varied: colonial cities, ancient ruins, mezcal towns in the mountains, surf villages on the Pacific and cenotes on the Caribbean side. The hostel and coworking scene is well developed, so meeting people is easy, and the food alone justifies the flight.",
    bestFor:
      "First-time solo travellers from North America, foodies, culture lovers, surfers, and remote workers who want a big-city base with weekend escapes. If you speak even basic Spanish you'll get far more out of it.",
    sections: [
      {
        heading: "Is Mexico safe for solo travellers?",
        body:
          "Mexico is huge, and safety varies enormously from one state to the next, so the honest answer is 'it depends where'. The places most solo travellers go — Mexico City's Roma, Condesa and Coyoacán, Oaxaca, San Cristóbal de las Casas, Guadalajara, and the beach towns — see millions of visitors without incident, and solo women travel there regularly. Check your government's state-by-state travel advisory before you plan a route and avoid the states it flags. Sensible habits do most of the work: use Uber or DiDi rather than hailing street taxis at night, avoid driving between cities after dark, use ATMs inside banks, keep your phone out of sight on the street, and watch your drink in nightlife areas.",
      },
      {
        heading: "How much does Mexico cost?",
        body:
          "Mexico can be very cheap or very expensive depending on where you are. Budget travellers can manage on roughly US$30–50 a day (hostel dorm, street tacos and set-lunch 'comida corrida', local buses). A comfortable mid-range solo budget is closer to US$60–120 a day. Oaxaca, San Cristóbal and Guadalajara are the cheap end; Tulum and parts of Mexico City sit at the expensive end and are priced for tourists. Eating where locals eat is the single biggest saving, and often the better meal too.",
      },
      {
        heading: "Best time to visit",
        body:
          "The dry season from roughly November to April is the easiest time nationwide: sunny, comfortable, and best for beaches and cenotes. May to October is the wetter season — in central Mexico that usually means sunny mornings and heavy afternoon showers, which is very manageable — but it overlaps with hurricane season on both coasts, so check forecasts if you're heading to the Caribbean or Pacific shore. Caribbean beaches can also get heavy seaweed (sargassum) in the summer months. If you can, time a visit for Día de Muertos (1–2 November) in Oaxaca or Mexico City — it's extraordinary, but book accommodation well ahead.",
      },
      {
        heading: "Getting around",
        body:
          "Long-distance buses are the backbone of Mexican travel, and the first-class services (ADO and similar) are comfortable, air-conditioned and reliable — book the overnight ones for long routes. For longer hops, budget airlines such as Volaris and VivaAerobus are often cheaper than the bus if you book ahead. Inside cities, the Mexico City metro is cheap and extensive, Uber and DiDi work in most large towns, and shared colectivo vans cover shorter routes in places like Oaxaca and Chiapas. Download offline maps and an eSIM before you land so you have data from the airport onward.",
      },
      {
        heading: "Culture & etiquette",
        body:
          "Mexicans tend to be warm, polite and quick to help. Greet people with a 'buenos días' or 'buenas tardes' when you walk into a shop or restaurant — it matters. Tipping is customary: around 10–15% in sit-down restaurants (check whether a service charge is already included), plus small tips for bag handlers, guides and drivers. Carry some cash in pesos, since small vendors and markets often don't take cards. Stick to bottled or purified water rather than tap water, and give your stomach a day or two to adjust to street food (choose busy stalls with high turnover). A little Spanish opens a lot of doors.",
      },
    ],
  },

  colombia: {
    countrySlug: "colombia",
    countryName: "Colombia",
    gatewayAirport: { code: "BOG", city: "Bogotá" },
    intro:
      "Colombia has shed its old reputation and become one of South America's most rewarding countries for solo travellers. Cartagena's walled old town, Medellín's spring-like climate and cable-car neighbourhoods, coffee-region hikes, Caribbean beaches near Santa Marta and mountain towns like San Gil all sit within a country that's cheap, friendly and full of other travellers. It's a country where a conversation with a stranger in a café often ends with a dinner invitation.",
    bestFor:
      "Adventurous first-time solo travellers, backpackers, digital nomads (Medellín especially), coffee and salsa lovers, and anyone building a South American route. Basic Spanish helps a lot outside the tourist hubs.",
    sections: [
      {
        heading: "Is Colombia safe for solo travellers?",
        body:
          "Colombia is far safer for visitors than it was a generation ago, and millions of tourists now visit each year — but it rewards street smarts. The local advice is 'no dar papaya': don't make yourself an easy target by flashing a phone, expensive jewellery or a camera. Stay in well-known neighbourhoods (El Poblado and Laureles in Medellín, the Centro and Getsemaní in Cartagena, Chapinero and Usaquén in Bogotá), use ride-hailing apps or a taxi ordered by your hotel at night, and avoid walking alone late in unlit areas. One well-documented risk to take seriously: in Medellín in particular, robberies where a dating-app match spikes a tourist's drink have been widely reported. Meet in public, keep control of your drink, and tell someone where you are. Check your government's current advisory for regions to avoid, mainly rural border areas.",
      },
      {
        heading: "How much does Colombia cost?",
        body:
          "Colombia is good value. Backpackers can get by on roughly US$25–45 a day (hostel dorm, set-lunch 'menú del día', buses and metro). A comfortable mid-range budget is around US$50–100 a day. Cartagena is noticeably pricier than the rest of the country, and Medellín's popular districts have climbed in price, while smaller towns like San Gil, Salento and Santa Marta's surroundings stay cheap. The set lunch is your friend: a soup, main, juice and dessert for a few dollars.",
      },
      {
        heading: "Best time to visit",
        body:
          "Colombia sits near the equator, so temperature depends on altitude rather than season. Bogotá is cool (often around 14°C) and drizzly year-round, Medellín is famously mild, and the Caribbean coast is hot and humid. The main dry seasons — roughly December to March, and July to August — are the easiest for hiking and the Andes. The Caribbean coast is driest from about December to April. Expect crowds and higher prices around Christmas–New Year and Semana Santa (Easter week), when Colombians travel domestically in huge numbers.",
      },
      {
        heading: "Getting around",
        body:
          "Colombia's mountains make overland travel slower than the map suggests, so domestic flights are often worth it for the longer legs — low-cost carriers such as JetSMART and Wingo compete with the larger airlines, and booking early keeps fares low. Long-distance buses are comfortable but slow on winding roads; overnight buses save a night's accommodation but check the route first. In cities, Medellín's Metro and Metrocable are excellent, Bogotá has the TransMilenio bus system plus ride-hailing apps, and taxis in Cartagena should be agreed on price first. Bogotá sits at around 2,600 m, so take it easy on your first day.",
      },
      {
        heading: "Culture & etiquette",
        body:
          "Colombians are known for their warmth and politeness. Greet with 'buenos días' and a smile, and expect handshakes or a light cheek kiss between friends. Coffee ('tinto') is a social ritual and often offered as a gesture of welcome. Dress is smart-casual in cities; Colombians tend to dress up more than many visitors expect. Tipping around 10% in restaurants is customary (it's often offered on the bill as 'propina voluntaria'). Spanish is essential outside tourist hubs — a translation app and a few phrases go a long way — and people genuinely appreciate the effort.",
      },
    ],
  },

  portugal: {
    countrySlug: "portugal",
    countryName: "Portugal",
    gatewayAirport: { code: "LIS", city: "Lisbon" },
    intro:
      "Portugal is one of the easiest countries in Europe for a first solo trip. It's safe, compact, affordable by Western European standards, sunny for much of the year, and easy to get around by train and bus. Lisbon's hills and viewpoints, Porto's riverside and port cellars, the Algarve's cliffs and beaches, and countless small towns in between add up to a country where eating alone at a counter feels completely normal and English is widely spoken.",
    bestFor:
      "First-time solo travellers to Europe, remote workers, food and wine lovers, beach-and-city combinations, and anyone who wants Europe without Northern-European prices. It's also a great starter country for solo women.",
    sections: [
      {
        heading: "Is Portugal safe for solo travellers?",
        body:
          "Yes — Portugal consistently ranks among the safest countries in the world, and solo travellers, including solo women, generally feel very comfortable. Violent crime against tourists is rare. The realistic risks are petty: pickpockets on crowded trams (especially Lisbon's Tram 28), at viewpoints and on the metro, and the occasional street dealer approaching people in nightlife areas like Bairro Alto. Keep valuables in a front pocket or zipped bag, don't leave phones on café tables, and be aware that cobbled hills are slippery when wet — sensible shoes matter more than you'd think.",
      },
      {
        heading: "How much does Portugal cost?",
        body:
          "Portugal is cheaper than much of Western Europe, though Lisbon has become noticeably pricier as it has grown popular. A budget solo traveller can get by on roughly US$50–80 a day (hostel dorm, cheap 'prato do dia' lunches, public transport). A comfortable mid-range budget is around US$90–160 a day. Porto and smaller towns are generally cheaper than Lisbon, and the Algarve is expensive in summer and much cheaper off-season. The lunchtime 'prato do dia' (dish of the day) with a drink is one of the best-value meals in Europe.",
      },
      {
        heading: "Best time to visit",
        body:
          "Spring (April to June) and early autumn (September to October) are ideal: warm, sunny and less crowded than July–August, when the Algarve and Lisbon are hot and busy and prices peak. Winters are mild but rainy, especially in the north around Porto, though Lisbon and the Algarve still see many sunny days, making them popular winter bases for remote workers. The June festivals (Santo António in Lisbon and São João in Porto) are wonderful but book accommodation early.",
      },
      {
        heading: "Getting around",
        body:
          "Portugal is small enough that trains and buses cover most of what you'll want. Fast intercity trains connect Lisbon and Porto in around three hours, and regional buses (such as Rede Expressos and FlixBus) reach places the trains don't. In cities, Lisbon has a metro, trams and buses on one rechargeable card, and ride-hailing apps like Uber and Bolt are cheap. Renting a car makes sense for the Alentejo and the more remote parts of the Algarve, but isn't necessary for the main cities. Note that the cobbled, hilly streets make luggage a real chore — pack light.",
      },
      {
        heading: "Culture & etiquette",
        body:
          "Portuguese people are polite, reserved at first and very helpful once you engage. Dinner starts later than in many countries, often from around 8 pm. Be aware of the 'couvert': bread, olives and spreads brought to your table at restaurants are usually charged if you eat them — decline them if you don't want them. Tipping is modest (rounding up or around 5–10% for good service). A few words of Portuguese ('obrigado' if you're male, 'obrigada' if you're female, for thank you) are warmly received, though English is widely spoken in the main cities.",
      },
    ],
  },

  japan: {
    countrySlug: "japan",
    countryName: "Japan",
    gatewayAirport: { code: "TYO", city: "Tokyo" },
    intro:
      "Japan is a dream for solo travellers. It's one of the safest and most efficient countries on earth, eating and sightseeing alone is completely normal (there are ramen counters and karaoke rooms designed for one), and the contrast between neon Tokyo, temple-filled Kyoto, deer-strolling Nara and food-obsessed Osaka is endlessly rewarding. Nothing is quite like arriving somewhere entirely unfamiliar and finding that everything simply works.",
    bestFor:
      "First-time solo travellers to Asia who want ease and safety, food lovers, culture and history fans, photographers, and anyone who likes a well-planned trip. It's very solo-friendly, though not always a budget destination.",
    sections: [
      {
        heading: "Is Japan safe for solo travellers?",
        body:
          "Japan is among the safest countries in the world for solo travellers of any gender, with very low rates of violent and street crime, and lost wallets and phones are famously handed in. The real hazards are natural rather than criminal: earthquakes and typhoons are part of life, so learn where the emergency exits are in your hotel and follow local alerts (Japan's official tourist office provides a free safety app). Be careful of drink-spiking and overcharging in some nightlife districts where touts pull tourists into bars — avoid anyone who approaches you on the street with a bar invitation. Otherwise, relax and enjoy it.",
      },
      {
        heading: "How much does Japan cost?",
        body:
          "Japan is often assumed to be extremely expensive, but it's flexible. Budget travellers can manage on roughly US$50–80 a day (hostel or capsule hotel, convenience-store and noodle-shop meals, IC-card transport), a comfortable mid-range budget is around US$100–180 a day, and Tokyo, Kyoto and Osaka accommodation is the biggest cost. Exchange rates move a lot and change how expensive Japan feels, so check the current rate as you plan. Eating is excellent value at every level: a great bowl of ramen or a set lunch is often only a few dollars.",
      },
      {
        heading: "Best time to visit",
        body:
          "Spring (late March to April) for cherry blossoms and autumn (October to November) for red maple leaves are the two most beautiful seasons, and also the busiest and most expensive, especially in Kyoto — book accommodation early. Summer (June to August) is hot and humid, with a rainy season around June. Winter is cold but clear and quieter in cities, with excellent skiing in Hokkaido and the Japanese Alps. Avoid the major national holiday periods if you can: Golden Week (late April to early May), Obon (mid-August) and the New Year holiday, when transport and hotels fill up.",
      },
      {
        heading: "Getting around",
        body:
          "Japan's trains are legendary for punctuality. Use Google Maps for train routes and connections, and get a rechargeable IC card (Suica, PASMO or ICOCA — you can add one to your phone's wallet) for local trains, buses and even convenience-store payments. The shinkansen (bullet train) links Tokyo, Kyoto and Osaka quickly. The nationwide Japan Rail Pass became much more expensive in late 2023 and is now only worth it for long routes, so price up your itinerary before buying. Last trains often finish around midnight, so plan late nights accordingly. An eSIM or pocket Wi-Fi is worth arranging before you land.",
      },
      {
        heading: "Culture & etiquette",
        body:
          "Etiquette in Japan is about consideration for others. Don't tip — it isn't expected and can cause confusion. Take off your shoes when entering homes, some restaurants and ryokan (traditional inns); keep phone calls off trains and speak quietly; don't eat while walking in most places; and carry your rubbish with you, as public bins are rare. Many shops and small restaurants still prefer cash, so carry yen, and 7-Eleven and post-office ATMs accept most foreign cards. If you plan to use an onsen (hot spring), check the tattoo policy first, since some don't admit tattooed visitors. Learning a few phrases ('arigatō', 'sumimasen') is always appreciated.",
      },
    ],
  },

  indonesia: {
    countrySlug: "indonesia",
    countryName: "Indonesia",
    gatewayAirport: { code: "DPS", city: "Denpasar (Bali)" },
    intro:
      "Indonesia is an enormous archipelago, but for most first-time solo travellers it starts with Bali — a small island with rice terraces, temples, surf breaks, yoga studios, cafés and one of the largest solo-traveller and digital-nomad communities in the world. This guide focuses on Bali and Ubud, where SouloSpotter covers specific spots; the same practical advice applies to much of the country, though prices, infrastructure and customs change a lot as you move to less-visited islands.",
    bestFor:
      "First-time solo travellers in Southeast Asia, digital nomads, yoga and wellness travellers, surfers, and anyone who wants a social, easy-to-navigate tropical base. It's excellent for meeting people, though the best of Bali is found away from the busiest strips.",
    sections: [
      {
        heading: "Is Bali safe for solo travellers?",
        body:
          "Bali is generally safe and welcoming for solo travellers, including solo women, and violent crime against tourists is uncommon. The everyday risks are practical: motorbike accidents are by far the most common way visitors get hurt, so only ride a scooter if you already know how, always wear a helmet, and check your travel insurance first — many policies exclude riders who don't hold a valid motorcycle licence. Be cautious with cheap local spirits and cocktails: methanol-tainted drinks have caused serious poisonings in Indonesia, so drink at reputable venues and stick to sealed bottles. Use authorised money changers (and count your cash), don't drink tap water, keep your belongings away from monkeys in Ubud and Uluwatu, and watch for drivers who overcharge.",
      },
      {
        heading: "How much does Bali cost?",
        body:
          "Bali is one of the best-value tropical destinations, but costs vary widely by area. Backpackers can manage on roughly US$30–50 a day (guesthouse or hostel, local 'warung' meals, scooter or driver hire for short trips). A comfortable mid-range budget is around US$60–120 a day, and trendier areas such as Canggu, Seminyak and Uluwatu are noticeably more expensive than Ubud or the north and east of the island. Eating at local warungs for a few dollars a meal is by far the cheapest and often the most delicious option.",
      },
      {
        heading: "Best time to visit",
        body:
          "The dry season, roughly April to October, brings sunny days and the best conditions for beaches and hiking, with peak crowds and prices in July–August and around Christmas–New Year. The wetter season (November to March) is greener, quieter and cheaper, with heavy but often short downpours rather than constant rain. Note Nyepi, Bali's Day of Silence (usually in March): the whole island shuts down for 24 hours, including the airport, and you must stay in your accommodation. It's a memorable experience if you plan for it, and a nasty surprise if you don't.",
      },
      {
        heading: "Getting around",
        body:
          "Public transport is limited, so most visitors either hire a scooter, use ride-hailing apps such as Grab and Gojek, or hire a private driver for the day, which is often good value and safer than riding yourself. Some areas restrict app-based pickups, so you may need to walk to the edge of a zone. If you rent a scooter, you'll need to comply with local licence rules, as police do check and insurers may refuse claims otherwise. Traffic is heavy in the south — allow much more time than distance suggests. Domestic flights and fast boats connect Bali to Lombok, the Gili Islands and Nusa Penida.",
      },
      {
        heading: "Culture & etiquette",
        body:
          "Bali is mostly Hindu, and religion is woven into daily life. Small offerings (canang sari) are left on the ground and outside doorways — step around them. Wear a sarong and sash at temples (usually available to borrow or rent at the entrance), cover your shoulders and knees, and don't touch anyone's head. Use your right hand to give and receive items, and dress modestly away from beaches. All international visitors must also pay the Bali tourist levy (currently IDR 150,000) through the official Love Bali site, and complete the All Indonesia digital arrival form before you travel, so allow a little time for both before you fly.",
      },
    ],
  },
};
