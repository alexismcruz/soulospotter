// Small-city tail, batch 24: Vancouver, Banff, Toronto, La Paz, Rio de Janeiro, São Paulo, Barcelona, Montreal.
// Researched 2026-09-28.
//
// No deletions.
// CORRECTED: Café del Mundo is Swedish-owned at Sagárnaga 324 (between Illampu and Linares) — not Calle Murillo /
//   Sopocachi; Loki La Paz is on Av. América 120 with a Sky Bar — not a colonial mansion by Plaza San Pedro;
//   Casa Amarelo is a boutique guesthouse in a 1904 mansion at Rua Joaquim Murtinho 569 — not a hostel on Rua Áurea;
//   Ô de Casa Hostel Bar is at Rua Inácio Pereira da Rocha 385 (since 2007) — not 320; Jean-Talon "best smoked meat"
//   claim removed.
//
//   node scripts/add-tail-batch24-details.js [--apply]
const run = require("./_enrich-runner");

run({
  vancouver: {
    spots: {
      "gastown-steam-clock": {
        address: "Water Street at Cambie Street, Gastown, Vancouver, British Columbia, Canada",
        mapsQuery: "Gastown Steam Clock, Vancouver",
        description: "Vancouver's oldest neighbourhood, with cobbled Water Street, restored Victorian brick buildings, independent shops, cocktail bars and restaurants. Its famous steam clock, built in 1977, whistles on the quarter hour. Visit in the evening for the bars, and be aware that the nearby Downtown Eastside has visible street poverty.",
      },
      "granville-island-public-market": {
        address: "1669 Johnston Street, Granville Island, Vancouver, British Columbia, Canada",
        website: "https://granvilleisland.com/public-market",
        mapsQuery: "Granville Island Public Market",
        description: "A lively indoor market under the Granville Bridge, with stalls of fresh seafood, BC cheeses, bakeries, produce and ready-to-eat food, and buskers outside. Grab lunch and eat on the waterfront, then browse the island's artists' studios. The little Aquabus ferries are the fun way to get there from downtown.",
      },
      "stanley-park-seawall": {
        address: "Stanley Park, Vancouver, British Columbia, Canada",
        mapsQuery: "Stanley Park Seawall",
        description: "A paved path of about 9km around the edge of Stanley Park, the huge forested peninsula next to downtown, with views of the harbour, the Lions Gate Bridge, the North Shore mountains and the city skyline. Rent a bike near Denman Street (cyclists ride counter-clockwise) or walk a section and cut through the forest.",
      },
    },
  },
  banff: {
    spots: {
      "banff-upper-hot-springs": {
        address: "1 Mountain Avenue, Banff, Alberta, Canada",
        mapsQuery: "Banff Upper Hot Springs",
        description: "A historic hot-spring pool run by Parks Canada on the slopes of Sulphur Mountain, with warm mineral water (typically around 37–40°C) and views of Mount Rundle. It's open year-round and especially magical on a snowy evening. Swimsuit and towel rentals are available; arrive early to avoid crowds.",
      },
      "lake-louise": {
        address: "Lake Louise, Banff National Park, Alberta, Canada",
        website: "https://parks.canada.ca/pn-np/ab/banff",
        mapsQuery: "Lake Louise",
        description: "A glacier-fed lake of vivid turquoise beneath Victoria Glacier, one of the Rockies' most famous views. Parking is limited and paid, so use the Parks Canada shuttle or Roam transit from Banff. Hike to the Lake Agnes Tea House or the Plain of Six Glaciers, and go early to beat the crowds.",
      },
      "the-bison-restaurant-terrace": {
        address: "211 Bear Street, Banff, Alberta, Canada",
        website: "https://www.thebison.ca/",
        mapsQuery: "The Bison Restaurant, Banff",
        description: "A well-regarded restaurant in the Bison Courtyard off Banff Avenue, serving refined Canadian mountain cuisine — Alberta bison, wood-fired dishes and plant-based plates — with a sunny terrace and local craft beer and wine. It takes reservations and is a comfortable place for a solo dinner at the bar.",
      },
    },
  },
  toronto: {
    spots: {
      "distillery-district": {
        address: "55 Mill Street, Distillery District, Toronto, Ontario, Canada",
        website: "https://www.thedistillerydistrict.com/",
        mapsQuery: "Distillery District, Toronto",
        description: "The restored Victorian buildings of the former Gooderham & Worts distillery, now a car-free district of galleries, design shops, cafés, restaurants and a craft brewery. It hosts a popular Christmas market in winter. It's lovely for an unhurried wander and photos among the red-brick lanes.",
      },
      "kensington-market": {
        address: "Kensington Market, Toronto, Ontario, Canada",
        mapsQuery: "Kensington Market, Toronto",
        description: "A colourful, bohemian neighbourhood west of downtown of vintage clothing stores, cafés, bakeries, cheap global food and street art, originally settled by Jewish immigrants and later by many other communities. On summer 'Pedestrian Sundays' streets close to cars. Combine it with nearby Chinatown.",
      },
      "st-lawrence-market": {
        address: "93 Front Street East, Toronto, Ontario, Canada",
        website: "https://www.stlawrencemarket.com/",
        mapsQuery: "St. Lawrence Market, Toronto",
        description: "Toronto's historic food market, with the South Market's two floors of butchers, fishmongers, bakeries and cheese stalls. Carousel Bakery's peameal bacon sandwich is the classic order. It's closed Sundays and Mondays; go on Saturday morning for the farmers' market bustle.",
      },
    },
  },
  "la-paz": {
    spots: {
      "cafe-del-mundo-la-paz": {
        address: "Calle Sagárnaga 324, between Illampu and Linares, La Paz, Bolivia",
        website: "https://www.cafe-delmundo.com/",
        mapsQuery: "Café del Mundo, Sagárnaga, La Paz",
        description: "A Swedish-owned café over three floors on busy Calle Sagárnaga, in the heart of the tourist district near the Witches' Market, open daily from early morning. It's known for big breakfasts, good coffee, cakes and reliable Wi-Fi — a comfortable place to rest and acclimatise at altitude.",
      },
      "loki-hostel-la-paz": {
        address: "Avenida América 120, La Paz, Bolivia",
        mapsQuery: "Loki Hostel La Paz",
        description: "A large, lively party hostel in central La Paz, part of the Loki chain, with dorms and private rooms, a restaurant and a Sky Bar with panoramic views over the city. Nightly events make it very social. Go easy on the drinking for your first days at 3,600m, and pick a quieter room if you need sleep.",
      },
      "mercado-de-las-brujas": {
        address: "Calle Linares and Calle Jiménez, La Paz, Bolivia",
        mapsQuery: "Mercado de las Brujas, La Paz",
        description: "The Witches' Market, a few streets of stalls where Aymara vendors sell herbs, potions, amulets, figurines and dried llama foetuses, used in offerings to Pachamama (Mother Earth). It sits among craft shops near the San Francisco church. Ask before taking photos of vendors and their goods.",
      },
    },
  },
  "rio-de-janeiro": {
    spots: {
      aprazivel: {
        address: "Rua Aprazível 62, Santa Teresa, Rio de Janeiro, Brazil",
        website: "https://www.aprazivel.com.br/",
        mapsQuery: "Aprazível, Santa Teresa",
        description: "A restaurant set in a hillside garden in Santa Teresa, with tables on terraces and in treehouse-like nooks overlooking the city and Guanabara Bay, serving refined Brazilian dishes with ingredients from across the country. Go for lunch or sunset and take a taxi; reservations are recommended.",
      },
      "casa-amarelo-hostel": {
        name: "Casa Amarelo",
        address: "Rua Joaquim Murtinho 569, Santa Teresa, Rio de Janeiro, Brazil",
        mapsQuery: "Casa Amarelo, Santa Teresa",
        description: "A boutique guesthouse in a yellow mansion from 1904 in the arty hillside neighbourhood of Santa Teresa, with individually designed rooms and views over the city. It's a characterful, quieter alternative to the beach districts; use taxis at night, as Santa Teresa's streets are steep and dark.",
      },
      "ipanema-beach": {
        address: "Praia de Ipanema, Rio de Janeiro, Brazil",
        mapsQuery: "Ipanema Beach",
        description: "Rio's most famous beach, divided into 'postos' (lifeguard stations), each with its own crowd — Posto 9 is the social heart. Rent a chair and umbrella from a barraca, order a coconut, and applaud the sunset from Arpoador rock at the eastern end. Bring only what you need; theft is common.",
      },
    },
  },
  "sao-paulo": {
    spots: {
      "coffee-lab-sao-paulo": {
        address: "Rua Fradique Coutinho 1340, Vila Madalena, São Paulo, Brazil",
        website: "https://www.coffeelab.com.br/",
        mapsQuery: "Coffee Lab, Vila Madalena",
        description: "Barista and roaster Isabela Raposeiras' café and roastery in Vila Madalena, a pioneer of Brazilian specialty coffee, serving single-origin Brazilian beans in many brewing styles and offering tasting sessions and courses. It's relaxed and cosy — a great place to learn about the country's coffee.",
      },
      "mercado-municipal-sao-paulo": {
        address: "Rua da Cantareira 306, Centro, São Paulo, Brazil",
        mapsQuery: "Mercado Municipal de São Paulo",
        description: "São Paulo's grand municipal market from 1933, with stained-glass windows over stalls of tropical fruit, cheeses, spices and cured meats. Upstairs, try the famously overstuffed mortadella sandwich or a pastel de bacalhau. Vendors offer fruit samples — ask the price before buying. Take care in the surrounding area.",
      },
      "o-de-casa-hostel": {
        name: "Ô de Casa Hostel Bar",
        address: "Rua Inácio Pereira da Rocha 385, Vila Madalena, São Paulo, Brazil",
        mapsQuery: "Ô de Casa Hostel, Vila Madalena",
        description: "One of São Paulo's longest-running hostels, open since 2007 in bohemian Vila Madalena, about 500m from Faria Lima metro, with dorms and private rooms, a terrace, gardens with hammocks and a bar-café. It's a sociable base within walking distance of the neighbourhood's bars and street art in Beco do Batman.",
      },
    },
  },
  barcelona: {
    spots: {
      "generator-barcelona": {
        address: "Carrer de Còrsega 373, Gràcia, Barcelona, Spain",
        website: "https://staygenerator.com/hostels/barcelona",
        mapsQuery: "Generator Barcelona",
        description: "A large design hostel on the edge of Gràcia, near Passeig de Gràcia and a short walk from Casa Milà, with dorms and private rooms, a bar, social spaces and a terrace. It's lively and easy for meeting other solo travellers, and Gràcia's squares and tapas bars are right on the doorstep.",
      },
      "la-boqueria-market": {
        name: "Mercat de la Boqueria",
        address: "La Rambla 91, Ciutat Vella, Barcelona, Spain",
        website: "https://www.boqueria.barcelona/",
        mapsQuery: "Mercat de la Boqueria",
        description: "Barcelona's famous covered market off La Rambla. The stalls near the entrance cater to tourists; head deeper inside for produce, seafood and the counter bars such as El Quim de la Boqueria, where you can sit alone for a superb lunch. Closed on Sundays; go before noon for the best atmosphere.",
      },
      "sagrada-familia": {
        address: "Carrer de Mallorca 401, Eixample, Barcelona, Spain",
        website: "https://sagradafamilia.org/en/",
        mapsQuery: "Sagrada Família",
        description: "Gaudí's extraordinary basilica, under construction since 1882, whose forest-like interior glows with stained-glass light. Book timed tickets online in advance (they sell out), and choose a morning slot for the eastern windows or late afternoon for the western ones. Tower tickets are separate.",
      },
    },
  },
  montreal: {
    spots: {
      "jean-talon-market": {
        address: "7070 Avenue Henri-Julien, Little Italy, Montreal, Quebec, Canada",
        website: "https://www.marchespublics-mtl.com/fr/marches/marche-jean-talon",
        mapsQuery: "Marché Jean-Talon",
        description: "One of North America's largest open-air markets, in Little Italy, with farmers selling Quebec produce, maple products, cheeses and seasonal specialities, plus bakeries, fishmongers and food counters. It's open year-round (partly enclosed in winter). Nearby Little Italy has good cafés.",
      },
      "mount-royal-park": {
        address: "Parc du Mont-Royal, Montreal, Quebec, Canada",
        website: "https://www.lemontroyal.qc.ca/",
        mapsQuery: "Mount Royal Park",
        description: "The wooded 'mountain' in the heart of Montreal, laid out by Frederick Law Olmsted, landscape architect of New York's Central Park. Walk up to the Kondiaronk Belvedere by the chalet for the classic skyline view. In summer, the Sunday 'Tam-Tams' drum circle gathers by the George-Étienne Cartier monument.",
      },
      "plateau-mont-royal-neighbourhood": {
        address: "Le Plateau-Mont-Royal, Montreal, Quebec, Canada",
        mapsQuery: "Plateau Mont-Royal, Montreal",
        description: "A lively neighbourhood of colourful row houses with the city's famous exterior spiral staircases, independent cafés, bagel shops, boutiques and bars, especially along Saint-Laurent, Saint-Denis and Mont-Royal avenues. Walk it, stop for a bagel, and look out for the murals of the Mural festival.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
