// Small-city tail, batch 25: Melbourne, Córdoba, Uyuni, Salta, Santiago, Valparaíso, Medellín, Tbilisi.
// Researched 2026-09-28.
//
// No deletions.
// CORRECTED: Patricia is at the rear of 493–495 Little Bourke St (corner Little William St), weekdays only;
//   Punthill Little Bourke is at 11–17 Cohen Place, Chinatown — not 267 Little Bourke St; Aldea Hostel & Café
//   (Santa Rosa 447) is in the centre, not Nueva Córdoba; Sorocabana (founded 1956) moved in 2022 into the Hotel
//   Sussex arcade on the same corner (San Jerónimo & Buenos Aires); Café del Tiempo is a bar with live jazz, blues
//   and rock (30+ years) — NOT a folklore peña; Café Triciclo is at Santo Domingo 598, Barrio Bellas Artes — not
//   Antonia López de Bello 96; Casa Volante is at the foot of Cerro Concepción (23 rooms, 3 kitchens, bar); Selina
//   Medellín was rebranded Socialtel Provenza (Carrera 32D #9-17); Fabrika is at Egnate Ninoshvili 8 — not 40 Merab
//   Kostava; Shavi Lomi moved to Zurab Kvlividze St 28.
//
//   node scripts/add-tail-batch25-details.js [--apply]
const run = require("./_enrich-runner");

run({
  melbourne: {
    spots: {
      "hosier-lane": {
        address: "Hosier Lane, off Flinders Street, Melbourne CBD, Victoria, Australia",
        mapsQuery: "Hosier Lane, Melbourne",
        description: "Melbourne's best-known street-art laneway, opposite Federation Square, whose walls, bins and doorways are covered in constantly changing graffiti, stencils and murals. Nearby AC/DC Lane and Centre Place are worth exploring too. Go early in the morning to have it almost to yourself.",
      },
      "patricia-coffee-brewers": {
        address: "Rear of 493–495 Little Bourke Street (corner Little William Street), Melbourne CBD, Australia",
        website: "https://patriciacoffee.com.au/",
        mapsQuery: "Patricia Coffee Brewers, Melbourne",
        description: "A tiny, standing-room-only espresso bar tucked into a laneway corner near the law courts, famous for excellent coffee — choose black, white or filter — and quick, friendly service. It opens weekdays only, from early morning to mid-afternoon. A quintessential Melbourne coffee stop.",
      },
      "punthill-melbourne": {
        name: "Punthill Little Bourke",
        address: "11–17 Cohen Place, Chinatown, Melbourne CBD, Australia",
        website: "https://punthill.com.au/hotels/punthill-little-bourke/",
        mapsQuery: "Punthill Apartment Hotel Little Bourke",
        description: "A serviced-apartment hotel in Chinatown, next to Her Majesty's Theatre, with studios and one- and two-bedroom apartments with kitchenettes and laundry, plus an indoor pool and gym. It's handy for solo travellers who want space and the option to cook, right among the CBD's restaurants and laneways.",
      },
    },
  },
  "cordoba-argentina": {
    spots: {
      "aldea-hostel-cordoba": {
        name: "Aldea Hostel & Café",
        address: "Santa Rosa 447, Centro, Córdoba, Argentina",
        website: "https://aldeahostelcordoba.com/",
        mapsQuery: "Aldea Hostel, Córdoba",
        description: "A friendly hostel and café in central Córdoba, a short walk from Plaza San Martín and the Manzana Jesuítica, with dorms and private rooms, a shared kitchen and relaxed common areas. It's a sociable base for the city's university nightlife and day trips to the Sierras.",
      },
      "cafe-sorocabana": {
        name: "Sorocabana",
        address: "San Jerónimo and Buenos Aires (Hotel Sussex arcade), Plaza San Martín, Córdoba, Argentina",
        mapsQuery: "Sorocabana, Córdoba",
        description: "Córdoba's most traditional café, founded in 1956 on the corner facing Plaza San Martín, with views towards the cathedral and the Cabildo. In 2022 it moved into the Hotel Sussex arcade on the same corner, keeping its classic menu of coffee, medialunas and sandwiches. A great place to people-watch.",
      },
      "manzana-jesuitica": {
        address: "Obispo Trejo 242, Córdoba, Argentina",
        website: "https://whc.unesco.org/en/list/995/",
        mapsQuery: "Manzana Jesuítica, Córdoba",
        description: "The UNESCO-listed Jesuit Block, built in the 17th and 18th centuries, which includes the Church of the Company of Jesus with its ship's-hull wooden ceiling, the Colegio Monserrat and the original National University of Córdoba, one of the oldest in the Americas. Guided tours show the historic cloisters and library.",
      },
    },
  },
  uyuni: {
    spots: {
      "cementerio-de-trenes": {
        address: "About 3km south-west of Uyuni, Potosí, Bolivia",
        mapsQuery: "Cementerio de Trenes, Uyuni",
        description: "A graveyard of rusting steam locomotives and carriages from the early 20th century, abandoned on the altiplano outside Uyuni after the collapse of the mining railways. It's the first stop on most salt-flat tours; come early or late in the day to avoid the crowds and harsh light.",
      },
      "luna-salada-uyuni": {
        address: "Colchani, on the edge of the Salar de Uyuni, Potosí, Bolivia",
        website: "https://www.lunasaladahotel.com.bo/",
        mapsQuery: "Hotel Luna Salada, Uyuni",
        description: "A salt hotel on a hill at the edge of the Salar de Uyuni near Colchani, with walls, furniture and floors made from salt blocks and big windows facing the white expanse. It's a comfortable splurge after a salt-flat tour, with a restaurant and wonderful sunrise views. Book ahead in high season.",
      },
      "minuteman-pizza-uyuni": {
        address: "Hotel Tonito, Avenida Ferroviaria 60, Uyuni, Bolivia",
        mapsQuery: "Minuteman Pizza, Uyuni",
        description: "A long-running pizzeria inside Hotel Tonito, run by an American owner and his Bolivian wife, serving wood-fired pizzas, salads and hearty breakfasts. It's a warm, welcoming refuge in chilly Uyuni and a reliable place to eat before or after a salt-flat tour. Opens for breakfast and dinner.",
      },
    },
  },
  salta: {
    spots: {
      "cafe-del-tiempo": {
        address: "Balcarce 901, Salta, Argentina",
        mapsQuery: "Café del Tiempo, Salta",
        description: "A bar-restaurant on Salta's lively Calle Balcarce, running for over 30 years, with food, drinks and live jazz, blues and rock shows, open until the early hours. For traditional folk music, try the peñas along the same street. It's a good place to start or end a night out.",
      },
      "las-rejas-hostel": {
        address: "General Güemes 569, Salta, Argentina",
        mapsQuery: "Las Rejas Hostel, Salta",
        description: "A quiet, simple hostel in a colonial-style house a few blocks from the main plaza and the MAAM museum, with a guest kitchen, TV room and free Wi-Fi. Staff can help arrange tours around Salta and Jujuy, including Cafayate and the Quebrada de Humahuaca.",
      },
      "maam-salta": {
        address: "Mitre 77, Plaza 9 de Julio, Salta, Argentina",
        website: "https://maam.gob.ar/",
        mapsQuery: "MAAM, Salta",
        description: "The Museum of High-Mountain Archaeology on the main plaza, which conserves the Children of Llullaillaco, three Inca children found in 1999 near the summit of the 6,739m volcano. Only one is displayed at a time, in carefully controlled conditions, alongside the offerings buried with them. Moving and unforgettable.",
      },
    },
  },
  santiago: {
    spots: {
      "cafe-triciclo-santiago": {
        address: "Santo Domingo 598, Barrio Bellas Artes, Santiago, Chile",
        website: "https://www.cafetriciclo.cl/",
        mapsQuery: "Café Triciclo, Santiago",
        description: "A specialty coffee shop that began as a mobile café on a tricycle, now in Barrio Bellas Artes near the Parque Forestal, serving espresso drinks and pour-overs (V60, Chemex, Kalita), toasted sandwiches and cakes. It's a calm place to sit alone near the museums and Lastarria.",
      },
      "hostal-rio-amazonas": {
        address: "Av. Vicuña Mackenna 47, Santiago, Chile",
        website: "https://www.hostalrioamazonas.cl/",
        mapsQuery: "Hostal Río Amazonas, Santiago",
        description: "A guesthouse in an old mansion near Plaza Baquedano (Plaza Italia), with high ceilings, simple private rooms and a patio, a short walk from Bellavista, Lastarria and Cerro San Cristóbal. It's a practical, central base; the square itself has been the site of protests, so check local news.",
      },
      "mercado-central-santiago": {
        address: "San Pablo 967, Santiago Centro, Chile",
        mapsQuery: "Mercado Central, Santiago",
        description: "Santiago's historic fish market under an ornate cast-iron roof from 1872, where stalls sell the Pacific catch and small restaurants serve seafood dishes such as paila marina and machas a la parmesana. The central restaurants are touristy and pricey; the smaller counters around the edges are better value.",
      },
    },
  },
  valparaiso: {
    spots: {
      "ascensores-valparaiso": {
        address: "Various hills, Valparaíso, Chile",
        mapsQuery: "Ascensor Concepción, Valparaíso",
        description: "The historic funiculars that climb Valparaíso's steep hills, many built in the late 19th and early 20th centuries and now within the UNESCO-listed historic quarter. Ascensor Concepción (1883) and Reina Victoria lead up to the colourful Cerros Concepción and Alegre. Rides are cheap; some are periodically closed for repairs.",
      },
      "casa-volante-hostel": {
        name: "Casa Volante Hostal",
        address: "Foot of Cerro Concepción, Valparaíso, Chile",
        website: "https://casavolantehostal.com/en/",
        mapsQuery: "Casa Volante Hostal, Valparaíso",
        description: "A big, colourful hostel at the foot of Cerro Concepción, with around 23 private and shared rooms, three guest kitchens, lounges, a patio and a bar with foosball, karaoke and film and art nights. It's very social, with staff who help you explore the murals and hills.",
      },
      "fauna-hotel-cafe": {
        address: "Pasaje Dimalow 166, Cerro Alegre, Valparaíso, Chile",
        website: "https://faunahotel.com/",
        mapsQuery: "Fauna Hotel, Valparaíso",
        description: "A boutique hotel on Cerro Alegre whose terrace restaurant and bar have one of the best views over Valparaíso's colourful hills, the port and the Pacific. It's a great place for a sunset drink or lunch alone after exploring the murals and funiculars of the neighbouring hills.",
      },
    },
  },
  medellin: {
    spots: {
      "parque-arvi": {
        address: "Corregimiento Santa Elena, Medellín, Antioquia, Colombia",
        website: "https://parquearvi.org/",
        mapsQuery: "Parque Arví",
        description: "A large nature reserve in the hills east of Medellín, reached by Metrocable (Line K to Santo Domingo, then Line L), with forest trails, a market of local products, and guided walks. The cable-car ride over the city is a highlight; Line L may close on some days, so check before you go.",
      },
      "pergamino-cafe": {
        address: "Carrera 37 #8A-37, El Poblado, Medellín, Colombia",
        website: "https://pergamino.co/",
        mapsQuery: "Pergamino Café, El Poblado",
        description: "One of Colombia's best-known specialty coffee brands, whose El Poblado café serves beans from its own family farms and partner growers, brewed every way, plus breakfasts and pastries. It's often busy with remote workers and a comfortable place to sit alone.",
      },
      "selina-medellin": {
        name: "Socialtel Provenza (formerly Selina Medellín)",
        address: "Carrera 32D #9-17, El Poblado, Medellín, Colombia",
        mapsQuery: "Socialtel Provenza Medellín",
        description: "The former Selina Medellín, rebranded as Socialtel Provenza after the Selina group's restructuring, combining hostel-style and private rooms with shared workspace in the lively Provenza area of El Poblado. Check its current coworking offer and day passes directly before relying on it for work.",
      },
    },
  },
  tbilisi: {
    spots: {
      "abanotubani-sulphur-baths": {
        address: "Abanotubani, Old Tbilisi, Georgia",
        mapsQuery: "Abanotubani Sulphur Baths, Tbilisi",
        description: "The domed sulphur bathhouses of Tbilisi's old town, fed by natural hot springs that gave the city its name. Rent a private room by the hour at bathhouses such as Chreli Abano or Gulo's, and add a scrub (kisi) if you like. Book ahead at weekends, then walk up to the waterfall in Leghvtakhevi gorge.",
      },
      fabrika: {
        address: "8 Egnate Ninoshvili Street, Tbilisi, Georgia",
        website: "https://fabrikatbilisi.com/",
        mapsQuery: "Fabrika Tbilisi",
        description: "A former Soviet sewing factory turned into a hostel and creative hub, with a courtyard of bars, cafés and shops, an Impact Hub coworking space and regular events. It's the easiest place in Tbilisi for solo travellers to meet people, even if you're not staying there.",
      },
      "shavi-lomi": {
        address: "Zurab Kvlividze Street 28, Tbilisi, Georgia",
        mapsQuery: "Shavi Lomi, Tbilisi",
        description: "A modern Georgian restaurant serving creative takes on regional dishes — from khachapuri to herb-rich stews and Georgian wines — in a relaxed, artistic setting. It's popular, so book ahead for dinner. A lovely place for a solo meal that goes beyond the standard tourist menu.",
      },
    },
  },
}).catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
