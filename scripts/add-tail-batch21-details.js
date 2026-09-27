// Small-city tail, batch 21: Cuenca, Montevideo, San Salvador, Etosha, Amboseli, Berlin, Garden Route, Hwange.
// Researched 2026-09-27.
//
// DELETED: "Kimana Gate Picnic Site", Amboseli (generic, not a venue).
// CORRECTED: Café Ñucallacta is at Hermano Miguel 5-62 (exporter-roaster, Typica); Posada del Ángel is a 200-year-old
//   colonial house at Bolívar 14-11 y Estévez de Toral (22 rooms, Mangiare Bene restaurant); Splendido is a 14-room
//   hotel in a 1901 heritage building (not a hostel); Hostal Cumbres del Volcán is at 85 Av. Norte 637, Escalón
//   (since 2010); Viva Espresso's founder Federico Bolaños is a Salvadoran specialty pioneer; Kibo Safari Camp is ~1–2km
//   from Kimana Gate, outside the park (solar powered); Island Vibe Knysna is central; The Fat Fish is upstairs in the
//   Milkwood Centre, Hopwood St (closed Sunday nights); Hwange Main Camp's restaurant is the Waterbuck's Head;
//   Nyamandhlovu platform is ~10km west of Main Camp.
//
//   node scripts/add-tail-batch21-details.js [--apply]
const run = require("./_enrich-runner");

run({
  cuenca: {
    spots: {
      "cafe-nucallacta": {
        name: "Café Ñucallacta",
        address: "Hermano Miguel 5-62, between Honorato Vásquez and Juan Jaramillo, Cuenca, Ecuador",
        website: "https://cafenucallacta.com/",
        mapsQuery: "Café Ñucallacta, Cuenca",
        description: "A café run by specialty coffee exporters who source and small-batch roast Ecuadorian beans, championing heirloom Typica varieties. Alongside excellent coffee there are breakfasts, pastries and comfort food with vegan options, fast Wi-Fi and indoor and outdoor seating in the historic centre.",
      },
      "catedral-nueva-cuenca": {
        name: "Catedral de la Inmaculada Concepción (Catedral Nueva)",
        address: "Calle Benigno Malo, Parque Calderón, Cuenca, Ecuador",
        mapsQuery: "Catedral Nueva, Cuenca",
        description: "Cuenca's huge New Cathedral, begun in 1885, whose sky-blue tiled domes are the symbol of the UNESCO-listed city. Inside are stained-glass windows and a gilded baldachin; you can pay to climb to the roof terraces for views over the domes and red-tiled rooftops. It faces the leafy Parque Calderón.",
      },
      "posada-del-angel-cuenca": {
        address: "Bolívar 14-11 y Estévez de Toral, Cuenca, Ecuador",
        mapsQuery: "Hostal Posada del Angel, Cuenca",
        description: "A small hotel of 22 rooms in a colonial house over 200 years old, five blocks from Parque Calderón on Calle Bolívar, with a plant-filled courtyard, a rooftop terrace and breakfast included. Its Italian restaurant, Mangiare Bene, is well regarded. A central, peaceful base for exploring the old town on foot.",
      },
    },
  },
  montevideo: {
    spots: {
      "cafe-brasilero-montevideo": {
        address: "Ituzaingó 1447, Ciudad Vieja, Montevideo, Uruguay",
        website: "https://cafebrasilero.uy/",
        mapsQuery: "Café Brasilero, Montevideo",
        description: "Montevideo's oldest café, opened in 1877 in the Ciudad Vieja, with dark wood panelling, old photographs and marble tables, and a favourite haunt of writer Eduardo Galeano. It serves coffee, light meals and desserts. A calm, atmospheric place to sit alone with a book or a notebook.",
      },
      "mercado-del-puerto-montevideo": {
        address: "Rambla 25 de Agosto de 1825 and Pérez Castellano, Ciudad Vieja, Montevideo, Uruguay",
        mapsQuery: "Mercado del Puerto, Montevideo",
        description: "A 19th-century wrought-iron market hall by the port, now filled with parrillas grilling steaks, chorizo, morcilla and provoleta over wood fires. Sit at a counter for a solo lunch and try a glass of medio y medio (half sparkling, half white wine). Busiest at weekend lunchtimes; mostly closed in the evening.",
      },
      "splendido-hostel-montevideo": {
        name: "Splendido Hotel",
        address: "Bartolomé Mitre 1314, Ciudad Vieja, Montevideo, Uruguay",
        mapsQuery: "Splendido Hotel, Montevideo",
        description: "A small hotel of 14 rooms in a heritage-listed building from 1901 in the Ciudad Vieja, near the Teatro Solís and Plaza Matriz. It's simple and good value, and well placed for the port market, museums, classic bars, antique shops and the rambla — a characterful, affordable base in the old city.",
      },
    },
  },
  "san-salvador": {
    spots: {
      "cumbres-del-volcan-hostel": {
        name: "Hostal Cumbres del Volcán Escalón",
        address: "85 Avenida Norte 637, Colonia Escalón, San Salvador, El Salvador",
        mapsQuery: "Hostal Cumbres del Volcán Escalón, San Salvador",
        description: "A small, friendly hostel opened in 2010 in a traditional house in the upmarket Escalón district, with a few private rooms (some with air-conditioning and private bathrooms), shared rooms, a guest kitchen and meals available. It's a safe, practical base for the capital and trips to the volcano and the Ruta de las Flores.",
      },
      "mercado-central-san-salvador": {
        address: "Centro Histórico, San Salvador, El Salvador",
        mapsQuery: "Mercado Central, San Salvador",
        description: "San Salvador's sprawling central market in the historic centre, packed with stalls selling fruit, vegetables, clothes and household goods, and comedores serving pupusas and other Salvadoran dishes. The revitalised downtown is safer than it once was, but go in daytime, keep valuables hidden, and consider a local guide.",
      },
      "viva-espresso-san-salvador": {
        address: "Multiple branches, San Salvador, El Salvador",
        mapsQuery: "Viva Espresso, San Salvador",
        description: "El Salvador's pioneering specialty coffee roaster, founded by barista Federico Bolaños, serving Cup of Excellence coffees from the country's highland farms. It has several cafés around San Salvador, including in the historic centre. A must for coffee lovers wanting to taste the best of Salvadoran beans.",
      },
    },
  },
  etosha: {
    spots: {
      "etosha-pan-lookout": {
        address: "Etosha Lookout, Etosha National Park, Namibia",
        mapsQuery: "Etosha Lookout, Etosha National Park",
        description: "A short track that leads out onto the edge of the Etosha Pan itself, a vast, flat, shimmering salt pan covering nearly a quarter of the park. Standing in the middle of the white expanse is otherworldly, especially in the heat haze. It's signposted on the drive between Okaukuejo and Halali; stay in your vehicle except where permitted.",
      },
      "okaukuejo-restcamp": {
        name: "Okaukuejo Resort",
        address: "Okaukuejo, Etosha National Park, Namibia",
        website: "https://www.nwrnamibia.com/okaukuejo.htm",
        mapsQuery: "Okaukuejo Camp, Etosha",
        description: "Etosha's main rest camp and park headquarters, run by Namibia Wildlife Resorts, with chalets, rooms and a campsite, a pool, a restaurant and a shop. Its big advantage is the floodlit waterhole on the camp's edge, where you can watch animals after dark. Book well ahead in the dry season.",
      },
      "okaukuejo-waterhole": {
        address: "Okaukuejo Camp, Etosha National Park, Namibia",
        mapsQuery: "Okaukuejo Waterhole",
        description: "The floodlit waterhole at Okaukuejo camp, famous for night-time sightings of black rhino, elephant, lion and other animals coming to drink, watched from benches behind a low wall. Dry-season evenings (roughly June to October) are the best. Bring a warm layer and keep quiet so as not to disturb the animals.",
      },
    },
  },
  amboseli: {
    delete: ["kimana-gate-picnic"],
    spots: {
      "kibo-safari-camp": {
        address: "Near Kimana Gate, Amboseli, Kajiado County, Kenya",
        website: "https://kibosafaricamp.com/",
        mapsQuery: "Kibo Safari Camp, Amboseli",
        description: "A large tented camp just outside Amboseli's Kimana Gate, with over 70 canvas tents under thatched roofs on stone bases, a pool and views towards Kilimanjaro. It is solar-powered and a comfortable, mid-range base for game drives into the park, where elephants roam against the mountain.",
      },
      "observation-hill-amboseli": {
        address: "Observation Hill, Amboseli National Park, Kenya",
        mapsQuery: "Observation Hill, Amboseli",
        description: "A small hill in the middle of Amboseli, one of the few places in the park where you're allowed to leave your vehicle, with a short walk to the top for a 360° view over the swamps, the plains dotted with elephants, and, on clear mornings, the snows of Kilimanjaro. It's a good place for a picnic stop.",
      },
    },
  },
  berlin: {
    spots: {
      "circus-hostel": {
        name: "The Circus Hostel",
        address: "Weinbergsweg 1A, Mitte, Berlin, Germany",
        mapsQuery: "The Circus Hostel, Berlin",
        description: "A long-running, sociable hostel at Rosenthaler Platz in Mitte, with dorms and private rooms, a café, a bar and its own microbrewery, and a busy events programme. It's well placed for the U8 and tram lines, and a very easy base for meeting other solo travellers and exploring Mitte and Prenzlauer Berg.",
      },
      "east-side-gallery": {
        address: "Mühlenstraße 3–100, Friedrichshain, Berlin, Germany",
        mapsQuery: "East Side Gallery, Berlin",
        description: "The longest surviving stretch of the Berlin Wall, about 1.3km along the Spree, covered in murals painted by artists from around the world in 1990, including the famous 'Fraternal Kiss'. It's free and always open. Walk it early in the morning to avoid crowds, then cross the Oberbaum Bridge to Kreuzberg.",
      },
      "roamers": {
        address: "Pannierstraße 64, Neukölln, Berlin, Germany",
        mapsQuery: "Roamers, Pannierstraße, Berlin",
        description: "A small, plant-filled café in Neukölln known for creative brunch dishes, good coffee and a relaxed, friendly atmosphere. It's small and popular, so expect a wait at weekends — solo diners can sometimes slip into a single free seat sooner. A good start to a day exploring the canal and Kreuzkölln.",
      },
    },
  },
  "garden-route": {
    spots: {
      "island-vibe-knysna": {
        address: "Central Knysna, Western Cape, South Africa",
        website: "https://www.islandvibe.co.za/index.php/knysna",
        mapsQuery: "Island Vibe Knysna",
        description: "The Knysna branch of the Island Vibe backpackers, centrally located near the town centre, waterfront, restaurants and pubs, with dorms and private rooms, a fully equipped kitchen, free Wi-Fi and parking. A sociable base for the Knysna Heads, the forests and the rest of the Garden Route.",
      },
      "the-fat-fish-garden-route": {
        address: "Milkwood Centre (upstairs), Hopwood Street, Central Beach, Plettenberg Bay, South Africa",
        website: "https://www.plett-tourism.co.za/restaurant/the-fat-fish/",
        mapsQuery: "The Fat Fish, Plettenberg Bay",
        description: "A popular seafood restaurant upstairs in the Milkwood Centre above Central Beach, with a teal interior and terrace looking over the ocean to the Beacon Isle Hotel. It serves sustainably sourced fish, sushi and tapas with a strong wine and gin list. Open for lunch and dinner; closed Sunday evenings.",
      },
      "tsitsikamma-suspension-bridge": {
        name: "Storms River Mouth Suspension Bridge",
        address: "Storms River Mouth Rest Camp, Tsitsikamma (Garden Route National Park), South Africa",
        mapsQuery: "Storms River Suspension Bridge",
        description: "A suspension bridge across the mouth of the Storms River, reached by a scenic boardwalk trail of about 1km through coastal forest from the Storms River Mouth rest camp in the Tsitsikamma section of the Garden Route National Park. Pay the park conservation fee at the gate. The trail is also the start of the famous Otter Trail.",
      },
    },
  },
  hwange: {
    spots: {
      "hwange-main-camp": {
        address: "Main Camp, Hwange National Park, Matabeleland North, Zimbabwe",
        website: "https://www.zimparks.org.zw/",
        mapsQuery: "Hwange Main Camp",
        description: "The park's most accessible rest camp, run by Zimbabwe Parks, near the main entrance, with self-catering lodges, cottages, chalets and camping, a shop, fuel and a restaurant. It's a simple, affordable base for self-drive game viewing and the nearby waterholes; book directly with ZimParks.",
      },
      "hwange-main-camp-restaurant": {
        name: "Waterbuck's Head (Main Camp)",
        address: "Main Camp, Hwange National Park, Zimbabwe",
        mapsQuery: "Hwange Main Camp",
        description: "The restaurant and bar at Hwange Main Camp, serving breakfast, lunch and dinner to self-drivers and campers between game drives, alongside the camp shop selling drinks and groceries. It's simple, but one of the few places to eat inside the park, and a relaxed spot for a cold drink after a dusty day.",
      },
      "nyamandhlovu-pan-hide": {
        name: "Nyamandhlovu Pan Platform",
        address: "About 10km west of Main Camp, Hwange National Park, Zimbabwe",
        mapsQuery: "Nyamandhlovu Pan, Hwange",
        description: "An elevated viewing platform about 10km west of Main Camp, overlooking a large permanent pan where elephants, buffalo, zebra and many other animals come to drink, especially in the dry season. You can get out of your vehicle here; there's parking and toilets. Spend a few quiet hours watching the action.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
