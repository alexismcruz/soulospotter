/**
 * Downloads category-appropriate photos for all Europe expansion experiences
 * that don't yet have a file in public/experiences/.
 *
 * Uses Wikimedia Commons API to find images by search term.
 * Run: node scripts/fetch-europe-expansion-experience-photos.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const OUT_DIR = path.join(__dirname, '..', 'public', 'experiences');

// Map experience slug → Wikimedia Commons search term
// Each search term is tuned to find an actual photo of the activity/place
const PHOTO_MAP = {
  // France
  'paris-montmartre-photography-walk': 'Montmartre Paris street',
  'paris-cooking-class-classic-french': 'French cuisine cooking class',
  'paris-seine-river-evening-cruise': 'Seine River Paris night illuminated',
  'paris-catacombs-guided-tour': 'Paris Catacombs ossuary',
  'paris-wine-tasting-natural-wine-bar': 'Paris wine tasting bar',
  'lyon-bouchon-cooking-class': 'Lyon bouchon restaurant food',
  'lyon-traboules-hidden-passages-tour': 'Lyon traboules passage',
  'lyon-wine-beaujolais-day-trip': 'Beaujolais vineyard France',
  'lyon-silk-weaving-workshop': 'Jacquard loom silk weaving Lyon',
  'lyon-foodie-walking-tour-les-halles': 'Les Halles de Lyon Paul Bocuse market',
  'nice-riviera-food-market-tour': 'Cours Saleya market Nice France',
  'nice-eze-village-perfume-day-trip': 'Eze village Côte d\'Azur France',
  'nice-sailing-sunset-catamaran': 'Catamaran sailing Mediterranean',
  'nice-old-town-photography-walk': 'Vieux-Nice old town colorful',
  'nice-wine-tasting-bellet-appellation': 'Nice wine vineyard Bellet',
  // Benelux
  'brussels-chocolate-workshop': 'Belgian chocolate praline making',
  'brussels-beer-tasting-lambic-tour': 'Belgian beer tasting lambic',
  'brussels-art-nouveau-architecture-walk': 'Horta House Brussels Art Nouveau',
  'brussels-frites-food-tour': 'Belgian frites friterie',
  'brussels-comics-tour-tintin-walk': 'Brussels comic strip mural',
  'bruges-canal-boat-tour': 'Bruges canal boat tour',
  'bruges-chocolate-beer-food-tour': 'Bruges chocolate Belgium',
  'bruges-evening-photography-walk': 'Bruges Rozenhoedkaai night reflection',
  'bruges-lace-making-workshop': 'Bruges bobbin lace making',
  'bruges-battlefield-day-trip': 'Menin Gate Ypres Belgium',
  // Swiss
  'zurich-fondue-cooking-class': 'Swiss fondue cheese pot',
  'zurich-lake-swimming-culture-tour': 'Zurich lake swimming Badi',
  'zurich-old-town-food-walk': 'Zurich Niederdorf old town',
  'zurich-rhine-falls-day-trip': 'Rhine Falls Schaffhausen Switzerland',
  'zurich-contemporary-art-tour': 'Kunsthaus Zurich art gallery',
  'lucerne-mount-pilatus-day-trip': 'Mount Pilatus cogwheel railway Switzerland',
  'lucerne-lake-kayak-tour': 'Lake Lucerne kayak paddle',
  'lucerne-swiss-cheese-and-wine': 'Swiss cheese Gruyere tasting',
  'lucerne-old-town-walking-tour': 'Lucerne Chapel Bridge Kapellbrücke',
  'lucerne-rigi-sunrise-hike': 'Rigi mountain sunrise Switzerland',
  // Nordic
  'oslo-fjord-kayak-tour': 'Oslo Fjord kayak',
  'oslo-norwegian-food-tour-mathallen': 'Mathallen Oslo food market',
  'oslo-northern-lights-winter-tour': 'Northern lights Norway Oslo',
  'oslo-viking-ship-museum-tour': 'Oseberg Viking ship museum Oslo',
  'oslo-cross-country-ski-nordmarka': 'Cross-country skiing Nordmarka Norway',
  'bergen-hardangerfjord-day-cruise': 'Hardangerfjord Norway cruise',
  'bergen-fish-market-seafood-tour': 'Bergen fish market Bryggen Norway',
  'bergen-mount-floyen-photography-walk': 'Mount Fløyen Bergen panorama',
  'bergen-bryggen-medieval-history-tour': 'Bryggen Hanseatic Bergen UNESCO',
  'bergen-aquavit-tasting-nordic-spirits': 'Aquavit Norwegian spirit tasting',
  'stockholm-archipelago-kayak-day-trip': 'Stockholm archipelago kayak',
  'stockholm-old-town-food-tour': 'Stockholm Gamla Stan old town',
  'stockholm-sauna-and-cold-plunge': 'Swedish sauna outdoor',
  'stockholm-design-museum-tour': 'Swedish design museum Stockholm',
  'stockholm-abba-museum-guided-experience': 'ABBA Museum Stockholm',
  'gothenburg-feskekôrka-seafood-tour': 'Feskekörka fish market Gothenburg',
  'gothenburg-west-coast-seafood-day-trip': 'Swedish west coast seafood boat',
  'gothenburg-street-art-haga-walk': 'Haga neighborhood Gothenburg cobblestone',
  'gothenburg-schnapps-and-herring-tasting': 'Swedish herring pickled schnapps',
  'gothenburg-liseberg-amusement-park': 'Liseberg amusement park Gothenburg',
  'helsinki-sauna-culture-tour': 'Löyly Helsinki sauna sea',
  'helsinki-design-district-tour': 'Helsinki Design District Finland',
  'helsinki-market-square-food-tour': 'Helsinki Kauppatori market square harbor',
  'helsinki-archipelago-island-hopping': 'Helsinki archipelago Suomenlinna',
  'helsinki-northern-lights-lapland-trip': 'Finnish Lapland Rovaniemi winter',
  'tampere-sauna-experience-rajaportti': 'Rajaportti sauna Finland wood-fired',
  'tampere-mustamakkara-food-tour': 'Mustamakkara black sausage Tampere Finland',
  'tampere-tammerkoski-industrial-tour': 'Tammerkoski rapids Tampere mills',
  'tampere-lake-pyhajärvi-kayak': 'Lake kayak Finland sunset',
  'tampere-moomin-museum-experience': 'Moomin Museum Tampere Finland',
  // Eastern Europe
  'bucharest-communist-architecture-tour': 'Palace of Parliament Bucharest Romania',
  'bucharest-food-tour-caru-cu-bere': 'Caru cu Bere restaurant Bucharest',
  'bucharest-street-art-floreasca-tour': 'Bucharest street art mural',
  'bucharest-wine-transylvanian-tasting': 'Romanian wine tasting Feteasca',
  'bucharest-herastrau-park-morning-run': 'Herăstrău Park Bucharest lake',
  'cluj-napoca-transylvanian-food-tour': 'Cluj-Napoca market food Romania',
  'cluj-napoca-bran-castle-dracula-tour': 'Bran Castle Transylvania Romania',
  'cluj-napoca-art-and-culture-walk': 'Cluj-Napoca city square Romania',
  'cluj-napoca-salina-turda-salt-mine': 'Salina Turda salt mine Romania underground',
  'brasov-saxon-village-day-trip': 'Biertan fortified church Transylvania',
  'brasov-black-church-medieval-tour': 'Black Church Brasov Romania',
  'brasov-carpathian-bear-watching': 'Brown bear Carpathian mountains Romania',
  'belgrade-rakia-bar-crawl': 'Belgrade Skadarlija bohemian quarter',
  'belgrade-danube-sava-boat-party': 'Belgrade splavovi boat bar Danube',
  'belgrade-kalemegdan-food-history-tour': 'Kalemegdan fortress Belgrade',
  'belgrade-street-art-savamala-tour': 'Savamala Belgrade street art',
  'belgrade-tesla-museum-workshop': 'Nikola Tesla Museum Belgrade',
  'novi-sad-exit-festival-experience': 'EXIT festival Petrovaradin Fortress',
  'novi-sad-fruska-gora-wine-tour': 'Fruška Gora monastery Serbia',
  'novi-sad-petrovaradin-fortress-tour': 'Petrovaradin Fortress Novi Sad Serbia',
  'sofia-communist-tour-party-house': 'Party House Sofia Bulgaria',
  'sofia-street-food-tour-zhenski-pazar': 'Zhenski Pazar market Sofia Bulgaria',
  'sofia-rila-monastery-day-trip': 'Rila Monastery Bulgaria UNESCO',
  'sofia-wine-tasting-thracian-valley': 'Bulgarian wine Mavrud red',
  'sofia-yoga-and-mineral-springs': 'Sofia mineral spring fountain Bulgaria',
  'plovdiv-old-town-photography-walk': 'Plovdiv old town colorful houses',
  'plovdiv-kapana-creative-district-tour': 'Kapana creative district Plovdiv',
  'plovdiv-thracian-kings-day-trip': 'Kazanlak Thracian tomb Bulgaria',
  'kotor-bay-kayak-tour': 'Bay of Kotor kayak Montenegro',
  'kotor-old-city-walls-sunrise-hike': 'Kotor city walls fortress Montenegro',
  'kotor-montenegrin-wine-and-food': 'Vranac wine Montenegro',
  'kotor-boka-navy-museum-history-tour': 'Kotor Bay medieval town Montenegro',
  'kotor-perast-boat-day-trip': 'Perast Our Lady of the Rocks Montenegro',
  'budva-adriatic-beach-boat-tour': 'Sveti Stefan Montenegro beach',
  'budva-old-town-sunset-walking-tour': 'Budva old town walls Montenegro',
  'budva-durmitor-national-park-day-trip': 'Tara Canyon Durmitor Montenegro',
  'bratislava-wine-small-carpathians': 'Modra wine Small Carpathians Slovakia',
  'bratislava-communist-tour-most-snp': 'SNP Bridge Bratislava UFO',
  'bratislava-day-trip-devin-castle': 'Devín Castle Danube Slovakia',
  'bratislava-old-town-food-tour': 'Bratislava old town food halušky',
  'kosice-gothic-cathedral-tour': 'St Elisabeth Cathedral Košice Slovakia',
  'kosice-east-slovak-food-tour': 'Košice main street Slovakia',
  'kosice-high-tatras-day-trip': 'High Tatras Slovakia mountain lake',
  // Baltic & Baltic states
  'riga-art-nouveau-architecture-tour': 'Riga Art Nouveau Alberta Street',
  'riga-latvian-food-and-black-balsam': 'Latvian Black Balsam Riga',
  'riga-jurmala-beach-cycling-tour': 'Jūrmala Baltic beach Latvia',
  'riga-old-town-history-tour': 'Riga old town three brothers',
  'riga-latvian-sauna-experience': 'Latvian sauna pirts birch branch',
  'vilnius-jewish-heritage-tour': 'Vilnius old town Jewish quarter Lithuania',
  'vilnius-uzupis-art-walk': 'Užupis Republic Vilnius angel statue',
  'vilnius-lithuanian-food-and-beer-tour': 'Cepelinai Lithuanian food',
  'vilnius-trakai-castle-kayak-day-trip': 'Trakai castle lake kayak Lithuania',
  'vilnius-baroque-churches-photography': 'Vilnius Baroque church St Peter Paul',
  // Reykjavik
  'reykjavik-golden-circle-tour': 'Strokkur geyser Iceland eruption',
  'reykjavik-whale-watching-tour': 'Humpback whale Iceland ocean',
  'reykjavik-glacier-hike-vatnajokull': 'Glacier hike Iceland crampons ice',
  'reykjavik-northern-lights-photography': 'Aurora borealis Iceland photography',
  'reykjavik-icelandic-food-tour': 'Hlemmur food hall Reykjavik Iceland',
  // Sarajevo
  'sarajevo-siege-walking-tour': 'Sarajevo old town sniper war',
  'sarajevo-bosnian-coffee-and-cevapi': 'Bosnian coffee džezva Sarajevo',
  'sarajevo-old-town-history-tour': 'Baščaršija Sarajevo old bazaar',
  'sarajevo-rafting-neretva-day-trip': 'Neretva river rafting Bosnia',
  'sarajevo-mostar-day-trip': 'Stari Most old bridge Mostar Bosnia',
  // Tirana
  'tirana-communist-bunker-tour': 'BunkArt museum Tirana Albania',
  'tirana-food-tour-pazari-i-ri': 'Pazari i Ri market Tirana Albania',
  'tirana-theth-accursed-mountains-trek': 'Theth village Albanian Alps',
  'tirana-kruje-castle-bazaar-day-trip': 'Krujë Castle Albania Skanderbeg',
  // Berat
  'berat-ottoman-house-cooking-class': 'Berat Ottoman house Albania',
  'berat-castle-and-churches-tour': 'Berat Castle Byzantine Albania',
  'berat-osum-canyon-rafting': 'Osum Canyon Albania rafting',
  // Valletta
  'valletta-caravaggio-masterclass-tour': 'Caravaggio Beheading Saint John Malta',
  'valletta-maltese-food-and-ftira-tour': 'Pastizzi Malta street food',
  'valletta-knights-of-st-john-walking-tour': 'Grand Master Palace Valletta Malta Knights',
  'valletta-gozo-island-day-trip': 'Ggantija Temples Gozo Malta',
  'valletta-malta-wine-and-ftira-tasting': 'Maltese wine Assyrtiko vineyard',
  // Ohrid
  'ohrid-lake-swimming-boat-tour': 'Lake Ohrid swimming crystal clear',
  'ohrid-byzantine-churches-fresco-tour': 'Ohrid St Sofia Byzantine frescoes',
  'ohrid-lake-trout-cooking-class': 'Ohrid trout pastrmka cooking',
  'ohrid-pelister-national-park-hike': 'Pelister National Park Macedonia lake',
  // Skopje
  'skopje-bazaar-food-history-tour': 'Old Bazaar Skopje Ottoman Macedonia',
  'skopje-mother-teresa-and-religion-tour': 'Mother Teresa Memorial House Skopje',
  'skopje-matka-canyon-kayak': 'Matka Canyon kayak Macedonia',
  'skopje-macedonian-wine-and-rakija': 'Macedonian wine Vranec rakija',
  'skopje-ohrid-day-trip': 'Lake Ohrid North Macedonia scenic',
  // Munich
  'munich-beer-hall-tour-oktoberfest': 'Munich Oktoberfest beer hall',
  'munich-dachau-memorial-tour': 'Dachau memorial concentration camp',
  'munich-english-garden-bike-tour': 'English Garden Munich Eisbach surfing',
  'munich-alte-pinakothek-art-tour': 'Alte Pinakothek Munich art museum',
  'munich-neuschwanstein-day-trip': 'Neuschwanstein Castle Bavaria Germany',
  // Hamburg
  'hamburg-elbphilharmonie-tour': 'Elbphilharmonie Hamburg concert hall',
  'hamburg-harbor-boat-tour': 'Hamburg harbor port boat tour',
  'hamburg-fischmarkt-sunday-experience': 'Hamburg Fischmarkt fish market Sunday',
  'hamburg-reeperbahn-nightlife-tour': 'Hamburg Reeperbahn St Pauli night',
  'hamburg-speicherstadt-photography-walk': 'Hamburg Speicherstadt canal warehouse',
  // Madrid
  'madrid-prado-expert-art-tour': 'Prado Museum Madrid Las Meninas',
  'madrid-tapas-tour-la-latina': 'Madrid La Latina tapas bar',
  'madrid-flamenco-tablao-experience': 'Flamenco dancer tablao Spain',
  'madrid-bernabeu-stadium-tour': 'Bernabeu stadium Real Madrid tour',
  'madrid-day-trip-toledo': 'Toledo Spain medieval city hill',
  // Faro
  'faro-ria-formosa-boat-kayak-tour': 'Ria Formosa lagoon flamingos Portugal',
  'faro-cataplana-cooking-class': 'Cataplana copper pot Portuguese cooking',
  'faro-ilha-deserta-day-trip': 'Ilha Deserta beach Portugal barrier island',
  'faro-algarve-wine-and-food-tour': 'Algarve wine medronho Portugal',
  'faro-cycling-coastal-tour': 'Algarve coastal cycling Portugal',
  // Venice
  'venice-gondola-serenata-evening': 'Venice gondola canal evening',
  'venice-murano-glass-blowing': 'Murano glass blowing Venice',
  'venice-cicchetti-bacaro-tour': 'Venice cicchetti bacaro wine bar',
  'venice-rowing-gondola-lesson': 'Voga alla veneta rowing Venice',
  'venice-burano-murano-island-day': 'Burano colorful island Venice',
  // London
  'london-east-end-food-tour': 'Brick Lane East London food market',
  'london-british-museum-expert-tour': 'British Museum London Rosetta Stone',
  'london-west-end-theatre-experience': 'West End London theatre night',
  'london-thames-kayak-tour': 'Thames River kayak London Tower Bridge',
  'london-afternoon-tea-experience': 'British afternoon tea scones cream',
  // Manchester
  'manchester-music-history-tour': 'Hacienda Manchester music history',
  'manchester-curry-mile-food-tour': 'Curry Mile Rusholme Manchester',
  'manchester-football-museum-tour': 'National Football Museum Manchester',
  'manchester-canal-cycling-tour': 'Manchester canal cycling Bridgewater',
  'manchester-gin-distillery-tour': 'Manchester gin distillery tasting',
  // Thessaloniki
  'thessaloniki-food-tour-best-in-greece': 'Thessaloniki bougatsa food market',
  'thessaloniki-byzantine-heritage-tour': 'Thessaloniki Rotunda Byzantine mosaics',
  'thessaloniki-halkidiki-beach-day-trip': 'Halkidiki beach turquoise Greece',
  'thessaloniki-rembetiko-music-night': 'Rembetiko music bouzouki Greece',
  'thessaloniki-wine-tasting-macedonian': 'Naoussa wine Xinomavro Greece',
  // Santorini
  'santorini-wine-tour-caldera-sunset': 'Santorini wine vineyard caldera sunset',
  'santorini-akrotiri-guided-tour': 'Akrotiri Minoan excavation Santorini',
  'santorini-catamaran-caldera-cruise': 'Santorini catamaran caldera cruise',
  'santorini-cooking-class-greek-cuisine': 'Santorini cooking class caldera view',
  'santorini-volcano-hike-nea-kameni': 'Nea Kameni volcano Santorini hike',
  // Warsaw
  'warsaw-ww2-history-guided-tour': 'Warsaw Ghetto memorial Poland',
  'warsaw-vodka-tasting-tour': 'Polish vodka tasting Warsaw',
  'warsaw-day-trip-wilanow-palace': 'Wilanów Palace Warsaw Poland',
  'warsaw-pierogi-cooking-class': 'Polish pierogi cooking class',
  'warsaw-street-art-and-murals-tour': 'Warsaw Praga street art murals',
  // Gdańsk
  'gdansk-solidarity-shipyard-history-tour': 'Gdansk Solidarity Shipyard Gate 2',
  'gdansk-amber-workshop-tour': 'Gdansk amber jewelry workshop',
  'gdansk-kashubian-food-and-beer-tour': 'Gdansk Long Lane Długa Street',
  'gdansk-sopot-cycling-day-trip': 'Sopot pier Baltic beach Poland',
  // Rotterdam
  'rotterdam-architecture-bike-tour': 'Rotterdam Cube Houses architecture bike',
  'rotterdam-harbor-boat-tour': 'Rotterdam Erasmus Bridge harbor',
  'rotterdam-dutch-food-tour-stroopwafel': 'Dutch stroopwafel herring Netherlands',
  'rotterdam-day-trip-kinderdijk-windmills': 'Kinderdijk windmills Netherlands UNESCO',
  // The Hague
  'the-hague-mauritshuis-vermeer-tour': 'Girl with a Pearl Earring Vermeer Mauritshuis',
  'the-hague-international-courts-tour': 'Peace Palace The Hague Netherlands',
  'the-hague-scheveningen-surf-lesson': 'Scheveningen beach surf North Sea',
  'the-hague-indonesian-rijsttafel-experience': 'Indonesian rijsttafel Netherlands food',
  // Split
  'split-diocletian-palace-expert-tour': 'Diocletian Palace Split Croatia peristyle',
  'split-dalmatian-food-wine-tour': 'Dalmatian food peka octopus Croatia',
  'split-island-hopping-day-trip': 'Hvar island Dalmatia Croatia',
  'split-sea-kayaking-caves': 'Sea kayaking Dalmatia Croatia clear water',
  // Zagreb
  'zagreb-museum-of-broken-relationships': 'Museum of Broken Relationships Zagreb',
  'zagreb-upper-town-food-tour': 'Zagreb Dolac market Croatia',
  'zagreb-plitvice-lakes-day-trip': 'Plitvice Lakes waterfall Croatia UNESCO',
  'zagreb-craft-beer-tour': 'Zagreb craft beer Croatia',
  // Salzburg
  'salzburg-mozart-music-and-history-tour': 'Mozart birthplace Salzburg Getreidegasse',
  'salzburg-sound-of-music-tour': 'Mirabell Gardens Sound of Music Salzburg',
  'salzburg-austrian-cuisine-cooking-class': 'Salzburger Nockerl Austrian dessert',
  'salzburg-eagle-nest-berchtesgaden-trip': 'Eagle\'s Nest Kehlsteinhaus Berchtesgaden',
  // Aarhus
  'aarhus-aros-rainbow-art-tour': 'ARoS Rainbow Panorama Aarhus Eliasson',
  'aarhus-new-nordic-food-tour': 'New Nordic food Aarhus Denmark',
  'aarhus-coastal-cycling-tour': 'Aarhus coastal cycling Denmark forest',
  'aarhus-viking-age-museum-tour': 'Moesgaard Museum Grauballe Man Denmark',
  // Brno
  'brno-villa-tugendhat-guided-tour': 'Villa Tugendhat Brno Mies van der Rohe',
  'brno-moravian-wine-tour-mikulov': 'Mikulov wine Moravia Czech Republic',
  'brno-food-culture-tour': 'Brno Zelný trh market Czech',
  // Pécs
  'pecs-ottoman-heritage-tour': 'Pécs mosque Ottoman Hungary',
  'pecs-zsolnay-ceramics-workshop': 'Zsolnay porcelain Pécs Hungary',
  'pecs-villany-wine-day-trip': 'Villány wine region Hungary Cabernet',
  // Tartu
  'tartu-university-and-old-town-tour': 'Tartu University Estonia neoclassical',
  'tartu-estonian-food-and-craft-beer': 'Tartu Estonia food market beer',
  'tartu-lahemaa-national-park-day-trip': 'Lahemaa National Park Estonia forest',
  // Bled
  'bled-island-pletna-rowing-tour': 'Bled Island pletna boat Slovenia',
  'bled-julian-alps-hiking-tour': 'Julian Alps hike Triglav Slovenia',
  'bled-slovenian-food-kremsnita-class': 'Kremšnita cream cake Bled Slovenia',
  'bled-paragliding-lake-views': 'Paragliding Lake Bled Slovenia aerial',
  // Batumi
  'batumi-adjarian-cuisine-cooking-class': 'Adjarian khachapuri boat-shaped bread Georgia',
  'batumi-botanical-garden-and-black-sea': 'Batumi Botanical Garden Black Sea Georgia',
  'batumi-wine-and-chacha-tasting': 'Georgian wine qvevri amber wine',
  'batumi-day-trip-vardzia-cave-city': 'Vardzia cave city Georgia monastery',
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'SouloSpotter/1.0 (soulospotter.com)' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlink(dest, () => {});
        downloadFile(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });
    req.on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function wikimediaSearch(query) {
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrnamespace: '6',
    gsrsearch: query,
    gsrlimit: '5',
    prop: 'imageinfo',
    iiprop: 'url|size|mime',
    iiurlwidth: '1200',
    format: 'json',
    origin: '*',
  });
  const url = `https://commons.wikimedia.org/w/api.php?${params}`;

  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'SouloSpotter/1.0 (soulospotter.com)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages;
          if (!pages) { resolve(null); return; }
          // Find first JPEG that isn't SVG/PNG/gif
          for (const page of Object.values(pages)) {
            const ii = page.imageinfo?.[0];
            if (!ii) continue;
            const mime = ii.mime || '';
            if (!mime.includes('jpeg') && !mime.includes('jpg')) continue;
            const thumbUrl = ii.thumburl || ii.url;
            if (thumbUrl) { resolve(thumbUrl); return; }
          }
          // Fallback: first image regardless of type
          for (const page of Object.values(pages)) {
            const ii = page.imageinfo?.[0];
            const thumbUrl = ii?.thumburl || ii?.url;
            if (thumbUrl) { resolve(thumbUrl); return; }
          }
          resolve(null);
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function main() {
  let downloaded = 0, skipped = 0, failed = 0;

  for (const [slug, query] of Object.entries(PHOTO_MAP)) {
    const dest = path.join(OUT_DIR, `${slug}.jpg`);
    if (fs.existsSync(dest)) {
      const size = fs.statSync(dest).size;
      if (size > 5000) { skipped++; continue; }
      // File exists but tiny — re-download
      fs.unlinkSync(dest);
    }

    process.stdout.write(`  ${slug}... `);
    try {
      const imgUrl = await wikimediaSearch(query);
      if (!imgUrl) {
        console.log('NO IMAGE FOUND');
        failed++;
        continue;
      }
      await downloadFile(imgUrl, dest);
      const size = fs.statSync(dest).size;
      console.log(`OK (${Math.round(size/1024)}KB)`);
      downloaded++;
    } catch(e) {
      console.log(`FAILED: ${e.message}`);
      failed++;
    }
    await sleep(300); // polite rate limit
  }

  console.log(`\nDone: ${downloaded} downloaded, ${skipped} skipped, ${failed} failed.`);
}

main().catch(e => { console.error(e); process.exit(1); });
