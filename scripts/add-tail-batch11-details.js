// Small-city tail, batch 11: Roraima, Concepción (PY), La Ceiba, Ometepe, Roatán, Hopkins, Nata, Placencia.
// Researched 2026-09-25.
//
// DELETED: Expatriates Bar & Grill, La Ceiba (closed; a different bar, 0101, later reopened in the building).
// CORRECTED: Roatán Backpackers' Hostel is in Sandy Bay (~4km from West End), not West End; Hotel Francés is at
//   Presidente Franco 1016, over 100 years old, with a pool; Banana Republic Guesthouse (Av. La República) has mixed
//   recent reviews — described honestly; Ginger's is on Half Moon Bay next to Roatan Divers; Innie's is run by the
//   Hopkins family who cook there (hudut is the signature); "Gran Sabana Lookout" (generic) reframed as the Gran
//   Sabana road (Troncal 10). Venezuela entries carry an advisory note.
//
//   node scripts/add-tail-batch11-details.js [--apply]
const run = require("./_enrich-runner");

const VE_NOTE = "Several governments advise against travel to Venezuela; check current advisories before planning a trip.";

run({
  "roraima-venezuela": {
    spots: {
      "campamento-paraitepui": {
        address: "Paraitepui, Gran Sabana, Bolívar, Venezuela",
        mapsQuery: "Paraitepui, Venezuela",
        description: "The small Pemón village where the classic multi-day trek up Mount Roraima begins, reached by 4x4 from San Francisco de Yuruaní. Treks must be done with a registered local guide, usually booked in Santa Elena de Uairén, and porters can be hired here. Accommodation is basic camping or simple huts. " + VE_NOTE,
      },
      "gran-sabana-lookout": {
        name: "La Gran Sabana (Troncal 10)",
        address: "Troncal 10, Gran Sabana, Bolívar, Venezuela",
        mapsQuery: "Gran Sabana, Venezuela",
        description: "The high grassland plateau of Canaima National Park, crossed by the Troncal 10 highway towards Santa Elena de Uairén, with sweeping views of flat-topped tepuis, waterfalls such as Kamá Merú and Pacheco, and Pemón villages along the way. Travel with a local guide or driver who knows the road. " + VE_NOTE,
      },
      "quebrada-de-jaspe": {
        address: "Quebrada de Jaspe, Gran Sabana, Bolívar, Venezuela",
        mapsQuery: "Quebrada de Jaspe",
        description: "A shallow stream in the southern Gran Sabana that flows over a bed of red and orange jasper, making the water glow in sunlight, with small cascades beneath the trees. It's a short walk from the Troncal 10 highway near Santa Elena de Uairén and often combined with other falls on a day tour. Don't take stones. " + VE_NOTE,
      },
    },
  },
  "concepcion-paraguay": {
    spots: {
      "hotel-frances-concepcion": {
        address: "Presidente Franco 1016, Concepción, Paraguay",
        mapsQuery: "Hotel Francés, Concepción, Paraguay",
        description: "A traditional hotel in a colonial building in the centre of Concepción, running for over a century, with a pool, a restaurant and simple, air-conditioned rooms. It's close to the old houses and streets of the historic centre and a practical base for the town and for boat trips on the Río Paraguay.",
      },
      "mercado-concepcion": {
        address: "Centro, Concepción, Paraguay",
        mapsQuery: "Mercado Municipal, Concepción, Paraguay",
        description: "The municipal market of Concepción, the river port known as the 'Pearl of the North', where stalls sell tropical fruit, vegetables, chipa and other local snacks, household goods and river fish. It's a lively, unpolished slice of everyday northern Paraguayan life, busiest in the mornings.",
      },
      "puerto-de-concepcion": {
        address: "Río Paraguay waterfront, Concepción, Paraguay",
        mapsQuery: "Puerto de Concepción, Paraguay",
        description: "The river port of Concepción on the Río Paraguay, historically the departure point for cargo and passenger boats heading north towards Bahía Negra and the Pantanal — a slow, basic journey of several days. Services change often, so ask at the port. Otherwise, it's a pleasant place to watch the river at sunset.",
      },
    },
  },
  "la-ceiba": {
    delete: ["expatriates-bar-la-ceiba"],
    spots: {
      "banana-republic-la-ceiba": {
        address: "Avenida La República, between Calles 12 and 13, Barrio Solares Nuevo, La Ceiba, Honduras",
        mapsQuery: "Banana Republic Guesthouse, La Ceiba",
        description: "A long-running backpacker guesthouse in central La Ceiba with a small pool, a bar, a guest kitchen and dorms and private rooms. It's practical for an overnight before the ferry to Utila or Roatán, or for rafting and Pico Bonito trips, but recent reviews are mixed on upkeep — check the latest before booking.",
      },
      "pico-bonito-national-park": {
        address: "Pico Bonito National Park, near La Ceiba, Honduras",
        mapsQuery: "Pico Bonito National Park",
        description: "A mountainous national park rising steeply behind La Ceiba, covered in rainforest and cloud forest, with waterfalls, rivers and excellent birdwatching. The Río Cangrejal on its eastern edge is known for white-water rafting and river swimming. Hire a local guide for trails, as some are steep and unmarked.",
      },
    },
  },
  ometepe: {
    spots: {
      "el-zopilote-ometepe": {
        address: "Balgüe, Ometepe, Rivas, Nicaragua",
        mapsQuery: "El Zopilote, Ometepe",
        description: "An off-grid permaculture farm and hostel on the slopes of Maderas volcano near Balgüe, with bamboo cabins, hammocks and dorms among the trees, homemade bread and pizza nights. It's a back-to-nature base for hiking Maderas and exploring the island by scooter or bike. Expect a steep walk up from the road.",
      },
      "cafe-campestre-ometepe": {
        address: "Balgüe, Ometepe, Rivas, Nicaragua",
        mapsQuery: "Café Campestre, Balgüe",
        description: "A popular farm-to-table restaurant in Balgüe on the Maderas side of Ometepe, serving organic produce from its own garden: big breakfasts, curries, salads and homemade bread and cheese. It's a meeting point for hikers and people staying in the nearby fincas, with a relaxed garden setting.",
      },
      "ojo-de-agua-ometepe": {
        address: "Near Santo Domingo, Ometepe, Rivas, Nicaragua",
        mapsQuery: "Ojo de Agua, Ometepe",
        description: "A natural spring-fed swimming pool under tall trees on Ometepe's isthmus, with clear, cool water, a rope swing, and snack stalls. There's a small entry fee. It's a refreshing stop when exploring the island by scooter between the two volcanoes, and quieter in the morning.",
      },
    },
  },
  roatan: {
    spots: {
      "roatan-backpackers": {
        name: "Roatán Backpackers' Hostel",
        address: "Sandy Bay, Roatán, Bay Islands, Honduras",
        mapsQuery: "Roatan Backpackers Hostel, Sandy Bay",
        description: "A small, friendly hostel in Sandy Bay, about 4km from West End, with dorms, private rooms and apartments, a shared kitchen and a pool and patio. Snorkelling spots, dive shops and the botanical garden are within walking distance, and it's a short taxi or water-taxi ride to West End's restaurants and bars.",
      },
      "gingers-caribbean-grill-roatan": {
        address: "Half Moon Bay, West End, Roatán, Bay Islands, Honduras",
        mapsQuery: "Ginger's Caribbean Grill, West End, Roatan",
        description: "A well-loved beach restaurant on Half Moon Bay in West End, next to Roatan Divers, where you step straight off the covered porch onto the sand. It's known for fresh seafood — fish tacos, blackened fish, ceviche, lobster — plus burgers and tropical drinks. Friendly and relaxed; a lovely spot for a solo sunset dinner.",
      },
      "west-bay-beach-roatan": {
        address: "West Bay, Roatán, Bay Islands, Honduras",
        mapsQuery: "West Bay Beach, Roatan",
        description: "Roatán's most beautiful beach, a long stretch of white sand and clear water at the island's western tip, with the reef close enough to snorkel from the shore at its southern end. It's busy on cruise-ship days, so check the schedule. Reach it by water taxi from West End or walk along the coast.",
      },
    },
  },
  hopkins: {
    spots: {
      "funky-dodo-hostel-hopkins": {
        address: "Hopkins Village, Stann Creek, Belize",
        mapsQuery: "The Funky Dodo Backpackers Hostel, Hopkins",
        description: "A backpacker hostel in the centre of Hopkins, a Garífuna fishing village on Belize's Caribbean coast, with a 16-bed dorm, private rooms, a garden and a bar. It's the social hub for budget travellers and a good base for the beach, drumming lessons, the Cockscomb Basin jaguar reserve and reef trips.",
      },
      "innies-restaurant-hopkins": {
        address: "Hopkins Village, Stann Creek, Belize",
        mapsQuery: "Innie's Restaurant, Hopkins",
        description: "A small family restaurant in Hopkins run by a local couple who do the cooking, known for authentic Garífuna dishes — above all hudut, fish in a coconut broth served with mashed plantain — plus Belizean rice and beans and seafood. Simple, friendly and good value; drummers sometimes play in the evening.",
      },
      "hopkins-beach": {
        address: "Hopkins Village, Stann Creek, Belize",
        mapsQuery: "Hopkins Beach, Belize",
        description: "A long, quiet Caribbean beach running the length of Hopkins, a Garífuna village with a laid-back, barefoot feel. The water is calm, and local operators run snorkelling and fishing trips out to the barrier reef cayes. Evenings bring Garífuna drumming, and the Cockscomb Basin Wildlife Sanctuary is nearby.",
      },
    },
  },
  nata: {
    spots: {
      "nata-lodge": {
        address: "Nata, Central District, Botswana",
        website: "https://www.natalodge.com/",
        description: "A lodge and campsite set among palms and marula trees just outside Nata, at the junction of the roads to Maun, Kasane and Francistown, with chalets, tents, camping, a pool and a restaurant. It's a comfortable overnight stop on the long drives across Botswana and the base for trips onto the Sua Pan and to the bird sanctuary.",
      },
      "nata-lodge-restaurant": {
        address: "Nata Lodge, Nata, Central District, Botswana",
        mapsQuery: "Nata Lodge, Botswana",
        description: "The open-air restaurant at Nata Lodge, under the trees beside the pool, serving hearty breakfasts, lunches and dinners to overlanders and self-drivers breaking the long journey across northern Botswana. It's one of the few proper places to eat around Nata, and a pleasant spot to watch birds while you rest.",
      },
      "nata-bird-sanctuary": {
        address: "Sua Pan, near Nata, Botswana",
        mapsQuery: "Nata Bird Sanctuary",
        description: "A community-run sanctuary on the northern edge of Sua Pan, part of the Makgadikgadi salt pans, where the Nata River flows in. After good rains, usually from around January to April, the pan floods and can attract huge flocks of flamingos and pelicans; in the dry season it's a vast, eerie white expanse. Best explored with a 4x4.",
      },
    },
  },
  placencia: {
    spots: {
      "lydias-guesthouse-placencia": {
        address: "Placencia Village, Stann Creek, Belize",
        mapsQuery: "Lydia's Guesthouse, Placencia",
        description: "A simple, friendly budget guesthouse in Placencia village, a few steps from the beach and the famous Sidewalk, with basic rooms and a shared kitchen. It's one of the more affordable places to stay on the peninsula and a relaxed base for the beach, snorkelling trips and, in season, whale-shark tours.",
      },
      "rumfish-y-vino-placencia": {
        address: "Placencia Village, Stann Creek, Belize",
        mapsQuery: "Rumfish y Vino, Placencia",
        description: "A popular gastro-bar upstairs in Placencia village, with a breezy veranda, serving creative seafood small plates, Belizean-inspired dishes, cocktails and a good wine list. It's lively in the evenings and an easy place to sit at the bar alone and chat to locals and other travellers.",
      },
      "placencia-beach": {
        address: "Placencia Peninsula, Stann Creek, Belize",
        mapsQuery: "Placencia Beach, Belize",
        description: "The long, palm-lined beach of the narrow Placencia Peninsula, one of the best mainland beaches in Belize, with calm water and sand running past the village. It's a laid-back base for snorkelling and diving on the barrier reef, and for whale-shark tours at Gladden Spit, usually around the full moons of spring.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
