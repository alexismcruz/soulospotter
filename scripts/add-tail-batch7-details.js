// Small-city tail, batch 7: Oistins, Pétion-Ville, Asa Wright, Ambergris Caye, Santa Marta, Gondar, Mombasa,
// Paysandú. Researched 2026-09-25.
//
// DELETED: Parrilla El Mesón, Paysandú (no trace anywhere).
// CORRECTED: La Souvenance serves French (Haitian-accented) cuisine — not "griot, tasso cabrit"; Asa Wright
//   reopened April 2023 after its Covid closure as a 29-room eco-lodge operated by HADCO; Hotel Casagrande is a
//   boutique hotel in a historic mansion at Florida 1221 facing Plaza Constitución; La Brisa Loca is at
//   Calle 14 #3-58; Lulo Café Bar at Carrera 3 #16-34; Tarboush is on Makadara Road by the Central Police Station.
// Haiti (Pétion-Ville) entries carry a travel-advisory note.
//
//   node scripts/add-tail-batch7-details.js [--apply]
const run = require("./_enrich-runner");

const HAITI_NOTE = "Governments advise against all travel to Haiti and gang violence has reached parts of Pétion-Ville — check current advisories before any visit.";

run({
  oistins: {
    spots: {
      "oistins-fish-fry": {
        address: "Oistins Bay Gardens, Christ Church, Barbados",
        mapsQuery: "Oistins Fish Fry",
        description: "Barbados' famous Friday-night fish fry in the fishing town of Oistins, where dozens of stalls grill and fry marlin, mahi-mahi, tuna, swordfish and flying fish, served with macaroni pie and salads. Locals and visitors share long tables, and music and dancing go on late. It's quieter but still open on other nights; Friday is the big one.",
      },
      "miami-beach-enterprise-beach": {
        address: "Enterprise Beach Road, Christ Church, Barbados",
        mapsQuery: "Miami Beach, Enterprise, Barbados",
        description: "A popular local beach just west of Oistins, also called Enterprise Beach, with one side of calm, shallow water and another with gentle waves, shaded by casuarina trees. There are lifeguards and snack vans at weekends. It's a relaxed place for an early swim before the heat, and a short walk from the Oistins fish fry.",
      },
      "surfer-s-point": {
        address: "Inch Marlow, Christ Church, Barbados",
        mapsQuery: "Surfer's Point, Barbados",
        description: "A surf spot on Barbados' south-east tip at Inch Marlow, with steady waves that suit beginners and intermediates, and a surf school and small guesthouse by the beach. The wind here also makes it popular with kitesurfers. It's a laid-back corner of the island, away from the busier west and south coast beaches.",
      },
    },
  },
  "petion-ville": {
    spots: {
      "la-souvenance-restaurant": {
        address: "Pétion-Ville, Haiti",
        mapsQuery: "La Souvenance, Pétion-Ville",
        description: "A long-established upscale restaurant in Pétion-Ville serving refined French cooking with Haitian accents, in a house with stone archways, a garden and a lit pool. It has long been a favourite of Haiti's business community and NGO workers for special dinners; expect high prices and impeccable service. " + HAITI_NOTE,
      },
      "place-boyer": {
        address: "Place Boyer, Pétion-Ville, Haiti",
        mapsQuery: "Place Boyer, Pétion-Ville",
        description: "A leafy public square in the heart of Pétion-Ville, the hillside district above Port-au-Prince, surrounded by cafés, restaurants and galleries, with vendors selling paintings and crafts. Historically it's been a pleasant place to sit and people-watch. " + HAITI_NOTE,
      },
      "galerie-monnin": {
        address: "Rue Lamarre, Pétion-Ville, Haiti",
        mapsQuery: "Galerie Monnin, Pétion-Ville",
        description: "One of Haiti's most respected art galleries, run by the Monnin family for decades, showing Haitian painting and sculpture from naïve and 'primitive' masters to contemporary artists. It's an excellent introduction to the country's rich art scene, and works can be bought and shipped. " + HAITI_NOTE,
      },
    },
  },
  "asa-wright": {
    spots: {
      "arima-market": {
        address: "Arima, Trinidad",
        mapsQuery: "Arima Market, Trinidad",
        description: "The busy market in the town of Arima, the gateway to the Northern Range and the Asa Wright Nature Centre about 12km to the north. Stalls sell tropical fruit, vegetables, spices and household goods, and street vendors nearby serve Trinidadian snacks like doubles. A good stop for supplies and breakfast on the way into the hills.",
      },
      "asa-wright-nature-centre": {
        address: "Blanchisseuse Road, Arima Valley, Trinidad",
        website: "https://asawright.org/",
        description: "A world-famous birdwatching centre and lodge on a former cocoa and coffee estate in the Arima Valley rainforest, where hummingbirds, honeycreepers, toucans and bellbirds can be seen from the veranda. After a Covid closure it reopened in 2023 as an upgraded eco-lodge. Day visitors can join guided trail walks; book ahead.",
      },
      "oilbird-cave-at-dunston-cave": {
        address: "Asa Wright Nature Centre, Arima Valley, Trinidad",
        mapsQuery: "Dunston Cave, Asa Wright Nature Centre",
        description: "A small cave on the Asa Wright grounds that shelters a colony of oilbirds — nocturnal, fruit-eating birds that navigate by echolocation. Visits are only by guided tour, usually for lodge guests staying a few nights, with strict limits to avoid disturbing the colony. Ask the centre about availability when you book.",
      },
    },
  },
  "ambergris-caye": {
    spots: {
      "pedros-hotel-ambergris": {
        address: "San Pedro, Ambergris Caye, Belize",
        mapsQuery: "Pedro's Hotel, San Pedro, Belize",
        description: "A lively, good-value hotel and bar in San Pedro with a pool, known for its pizza and social atmosphere. There are simple budget rooms and nicer ones by the pool, and it's easy to meet other travellers at the bar. It's a golf-cart or bike ride from the town centre, the beach and the dive and snorkel shops.",
      },
      "elvis-kitchen-ambergris": {
        address: "Pescador Drive, San Pedro, Ambergris Caye, Belize",
        mapsQuery: "Elvi's Kitchen, San Pedro",
        description: "A San Pedro institution that started in the 1970s as a small burger window and grew into a much-loved restaurant with a sand floor and a big flamboyant tree growing through the roof. It serves Belizean dishes, seafood and lobster in season. A relaxed, characterful place for a solo dinner.",
      },
      "hol-chan-marine-reserve": {
        address: "Hol Chan Marine Reserve, off Ambergris Caye, Belize",
        mapsQuery: "Hol Chan Marine Reserve",
        description: "Belize's first marine reserve, a channel through the barrier reef a short boat ride south of San Pedro, with healthy coral, turtles, eagle rays and schools of fish. Most snorkel trips also stop at Shark Ray Alley, where nurse sharks and stingrays gather. Book with a licensed operator; there's a park fee.",
      },
    },
  },
  "santa-marta": {
    spots: {
      "la-brisa-loca-hostel": {
        address: "Calle 14 #3-58, Centro Histórico, Santa Marta, Colombia",
        mapsQuery: "La Brisa Loca Hostel, Santa Marta",
        description: "A big, sociable hostel in a restored colonial mansion in Santa Marta's historic centre, with a pool, dorms and private rooms, and a rooftop bar with live music and DJs from Thursday to Sunday. It's a party hostel, so bring earplugs, but it's also a handy base for trips to Tayrona, Minca and the Lost City trek.",
      },
      "lulo-cafe-bar": {
        address: "Carrera 3 #16-34, Centro Histórico, Santa Marta, Colombia",
        mapsQuery: "Lulo Café Bar, Santa Marta",
        description: "A relaxed café-bar in the historic centre that grew over 15 years from a tiny arepa stand, serving arepas, ceviche, salads, wraps and fresh tropical juices from breakfast until late. It's a popular meeting point for travellers heading to Tayrona or back from the Lost City trek, and a comfortable place to eat alone.",
      },
      "playa-grande-taganga": {
        address: "Playa Grande, Taganga, Santa Marta, Colombia",
        mapsQuery: "Playa Grande, Taganga",
        description: "A sheltered beach reached by a short boat ride or a walk over the headland from the fishing village of Taganga, just north of Santa Marta. Beach shacks serve fried fish with coconut rice and patacones, and the water is calm for swimming. Taganga is known for cheap diving courses; keep an eye on belongings.",
      },
    },
  },
  gondar: {
    spots: {
      "taye-belay-hotel-gondar": {
        address: "Near Ras Gimb, Gondar, Ethiopia",
        mapsQuery: "Taye Belay Hotel, Gondar",
        description: "A large, central hotel a few minutes' walk from the Royal Enclosure and Ras Gimb palace, with around 90 rooms, a restaurant and café, and views over the city from its hillside position. It's a practical, comfortable base for exploring Gondar's castles and churches and for arranging trips to the Simien Mountains.",
      },
      "four-sisters-gondar": {
        address: "Gondar, Ethiopia",
        mapsQuery: "The Four Sisters Restaurant, Gondar",
        description: "A popular restaurant run by four sisters, decorated with traditional crafts and paintings, serving Ethiopian dishes — injera with a range of wats — alongside European options, plus tej (honey wine). Most evenings there's a traditional music and dance show after dinner. A warm, welcoming place to eat alone.",
      },
      "fasil-ghebbi-gondar": {
        address: "Fasil Ghebbi, Gondar, Ethiopia",
        mapsQuery: "Fasil Ghebbi, Gondar",
        description: "The walled Royal Enclosure of Gondar, capital of Ethiopia's emperors from the 17th century, and a UNESCO World Heritage Site. Inside are several stone castles and palaces, including Fasilides' Castle, plus libraries and banqueting halls. Hire an official guide at the gate, and also visit Fasilides' Bath and Debre Berhan Selassie church.",
      },
    },
  },
  mombasa: {
    spots: {
      "tulia-backpackers-mombasa": {
        address: "Nyali, Mombasa, Kenya",
        website: "https://www.tuliabackpackers.com/tulia-nyali.html",
        description: "A backpackers in Nyali, north of Mombasa island, near Haller Park and City Mall and a short ride from Nyali and Bamburi beaches. There are dorms and private rooms, a pool, a bar and a rooftop with ocean views, and staff help with trips to the Old Town, Fort Jesus and the coast. 'Tulia' means 'relax' in Swahili.",
      },
      "tarboush-cafe-mombasa": {
        address: "Makadara Road, Old Town, Mombasa, Kenya",
        mapsQuery: "Tarboush Cafe, Makadara Road, Mombasa",
        description: "A busy Swahili canteen on Makadara Road on the edge of Mombasa's Old Town, next to the Central Police Station, popular with locals for biryani, pilau, grilled kebabs, shawarma and fresh juices at long shared tables. It's open from morning to late evening, cheap and filling — a good place for a solo meal after exploring the Old Town.",
      },
      "fort-jesus-mombasa": {
        address: "Nkrumah Road, Old Town, Mombasa, Kenya",
        mapsQuery: "Fort Jesus, Mombasa",
        description: "A Portuguese fort built in the 1590s to guard Mombasa's harbour, and a UNESCO World Heritage Site. Its walls, bastions and museum tell the story of centuries of struggle between Portuguese, Omani and British powers over the Swahili coast. Visit in the morning, then wander the narrow lanes of the Old Town next door.",
      },
    },
  },
  paysandu: {
    delete: ["parrilla-el-meson-paysandu"],
    spots: {
      "hotel-casagrande-paysandu": {
        address: "Florida 1221, Paysandú 60000, Uruguay",
        website: "https://www.hotelcasagrande.com.uy/",
        description: "A boutique hotel in a restored historic mansion facing Plaza Constitución, a short walk from the basilica, known for its striking architecture and decor and a generous breakfast. It's a comfortable, central base in this river city, close to the waterfront and a short drive from the Guaviyú and Almirón thermal springs.",
      },
      "costanera-paysandu": {
        address: "Costanera, Paysandú, Uruguay",
        mapsQuery: "Costanera Paysandú",
        description: "Paysandú's riverside promenade along the Río Uruguay, with views across to Argentina and the Paysandú–Colón bridge. Locals walk, jog and drink mate here in the evenings, and it's the setting for the city's big Semana de la Cerveza beer festival around Easter. Sunsets over the river are the highlight.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
