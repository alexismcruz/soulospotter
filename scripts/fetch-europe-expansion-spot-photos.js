/**
 * Downloads or assigns photos for all new European expansion spots
 * that are missing files in public/spots/.
 *
 * Strategy:
 * - For CULTURE/NATURE spots: search Wikimedia Commons by name
 * - For ACCOMMODATION/CAFE/FOOD/NIGHTLIFE/WELLNESS/COWORKING/COMMUNITY/TRANSPORT:
 *   copy a category fallback image if no specific image is found
 *
 * Run: node scripts/fetch-europe-expansion-spot-photos.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SPOTS_DIR = path.join(__dirname, '..', 'public', 'spots');
const CATEGORY_DIR = path.join(SPOTS_DIR, '_category');

// Category fallback map (uses existing category stock images)
const CATEGORY_FALLBACK = {
  ACCOMMODATION: ['accommodation-1.jpg', 'accommodation-2.jpg'],
  CAFE:          ['cafe-1.jpg', 'cafe-2.jpg'],
  FOOD:          ['food-1.jpg', 'food-2.jpg'],
  COWORKING:     ['coworking-1.jpg', 'coworking-2.jpg'],
  NIGHTLIFE:     ['nightlife-1.jpg', 'nightlife-2.jpg'],
  WELLNESS:      ['wellness-1.jpg', 'wellness-2.jpg'],
  COMMUNITY:     ['community-1.jpg', 'community-2.jpg'],
  TRANSPORT:     ['transport-1.jpg', 'transport-2.jpg'],
  CULTURE:       ['culture-1.jpg', 'culture-2.jpg'],
  NATURE:        ['nature-1.jpg', 'nature-2.jpg'],
};

// Spots where we want a real Wikimedia photo (landmarks, museums, markets, parks)
// Key: slug suffix pattern, Value: Wikimedia search term
const WIKIMEDIA_SEARCH = {
  // Paris
  'eiffel-tower-paris': 'Eiffel Tower Paris',
  'louvre-museum-paris': 'Louvre Museum Paris interior',
  'montmartre-paris': 'Montmartre Sacre Coeur Paris',
  'le-marais-paris': 'Le Marais Paris',
  'seine-promenade-paris': 'Paris Seine riverside walk',
  'notre-dame-de-paris': 'Notre-Dame de Paris cathedral',
  'versailles-day-trip-paris': 'Palace of Versailles garden',
  'jardin-du-luxembourg-paris': 'Luxembourg Gardens Paris',
  'musee-dorsay-paris': 'Musée d\'Orsay Paris',
  'rue-montorgueil-paris': 'Rue Montorgueil Paris market street',
  // Lyon
  'basilique-notre-dame-de-fourviere-lyon': 'Basilique Fourvière Lyon',
  'vieux-lyon-old-town': 'Vieux Lyon old town',
  'rhone-riverfront-lyon': 'Lyon Rhône riverfront',
  'cite-internationale-gastronomie-lyon': 'Lyon gastronomy',
  // Nice
  'promenade-des-anglais-nice': 'Promenade des Anglais Nice',
  'vieux-nice-old-town': 'Vieux Nice old town colorful',
  'castle-hill-nice': 'Castle Hill Nice Colline du Château',
  'cours-saleya-market-nice': 'Cours Saleya flower market Nice',
  // Brussels
  'grand-place-brussels': 'Grand-Place Brussels',
  'manneken-pis-brussels': 'Manneken Pis Brussels',
  'royal-palace-brussels': 'Royal Palace Brussels',
  'atomium-brussels': 'Atomium Brussels',
  // Bruges
  'belfry-bruges': 'Belfry Bruges Belfort',
  'minnewater-bruges': 'Minnewater Lake Bruges',
  'market-square-bruges': 'Bruges Market Square Markt',
  'basilica-holy-blood-bruges': 'Basilica of Holy Blood Bruges',
  // Zurich
  'fraumunster-church-zurich': 'Fraumünster church Zurich',
  'kunsthaus-zurich': 'Kunsthaus Zurich',
  'uetliberg-mountain-zurich': 'Uetliberg mountain Zurich view',
  'zurich-old-town': 'Zurich Altstadt Limmat',
  // Lucerne
  'chapel-bridge-lucerne': 'Chapel Bridge Kapellbrücke Lucerne',
  'swiss-transport-museum-lucerne': 'Swiss Museum of Transport Lucerne',
  'lion-monument-lucerne': 'Lion Monument Lucerne',
  // Oslo
  'akershus-fortress-oslo': 'Akershus Fortress Oslo',
  'opera-house-oslo': 'Oslo Opera House',
  'vigeland-sculpture-park-oslo': 'Vigeland sculpture park Oslo',
  'national-gallery-oslo': 'National Gallery Oslo Norway',
  // Bergen
  'bryggen-wharf-bergen': 'Bryggen wharf Bergen Norway',
  'floibanen-funicular-bergen': 'Fløibanen funicular Bergen',
  // Stockholm
  'gamla-stan-stockholm': 'Gamla Stan Stockholm old town',
  'vasa-museum-stockholm': 'Vasa Museum Stockholm warship',
  'skansen-stockholm': 'Skansen open-air museum Stockholm',
  'royal-palace-stockholm': 'Royal Palace Stockholm',
  // Helsinki
  'helsinki-cathedral': 'Helsinki Cathedral Senate Square',
  'suomenlinna-fortress-helsinki': 'Suomenlinna fortress Helsinki',
  'temppeliaukio-church-helsinki': 'Temppeliaukio church Helsinki rock',
  // Reykjavik
  'hallgrimskirkja-reykjavik': 'Hallgrímskirkja church Reykjavik',
  'golden-circle-day-tour-reykjavik': 'Gullfoss waterfall Iceland',
  'sky-lagoon-reykjavik': 'Sky Lagoon Reykjavik Iceland',
  'northern-lights-tour-reykjavik': 'Aurora borealis Iceland',
  // Warsaw
  'warsaw-old-town': 'Warsaw old town Stare Miasto',
  'polin-museum-warsaw': 'POLIN Museum Warsaw',
  'warsaw-rising-museum': 'Warsaw Rising Museum',
  'royal-castle-warsaw': 'Royal Castle Warsaw',
  // Gdańsk
  'long-lane-gdansk': 'Gdańsk Długa Street Ulica Długa',
  'european-solidarity-centre-gdansk': 'European Solidarity Centre Gdańsk',
  'gdansk-crane': 'Gdańsk Crane Żuraw medieval',
  // Rotterdam
  'markthal-rotterdam': 'Markthal Rotterdam food market',
  'cube-houses-rotterdam': 'Cube Houses Rotterdam Kubuswoningen',
  'museum-boijmans-depot-rotterdam': 'Museum Boijmans Depot Rotterdam',
  // The Hague
  'mauritshuis-the-hague': 'Mauritshuis museum The Hague',
  'binnenhof-the-hague': 'Binnenhof The Hague parliament',
  // Split
  'diocletian-palace-split': 'Diocletian Palace Split Croatia',
  'st-domnius-cathedral-split': 'Cathedral of Saint Domnius Split',
  // Zagreb
  'st-marks-church-zagreb': 'Saint Mark\'s Church Zagreb',
  'lotrscak-tower-zagreb': 'Lotrščak Tower Zagreb',
  'dolac-market-zagreb': 'Dolac market Zagreb Croatia',
  // Salzburg
  'hohensalzburg-fortress-salzburg': 'Hohensalzburg Fortress Salzburg',
  'mozarts-birthplace-salzburg': 'Mozart birthplace Salzburg museum',
  'mirabell-gardens-salzburg': 'Mirabell Gardens Salzburg',
  // Munich
  'english-garden-munich': 'English Garden Munich Eisbach',
  'marienplatz-munich': 'Marienplatz Munich Glockenspiel',
  'deutsches-museum-munich': 'Deutsches Museum Munich',
  'nymphenburg-palace-munich': 'Nymphenburg Palace Munich',
  'alte-pinakothek-munich': 'Alte Pinakothek Munich',
  'neuschwanstein-castle-day-trip-munich': 'Neuschwanstein Castle Bavaria',
  // Madrid
  'museo-del-prado-madrid': 'Prado Museum Madrid',
  'retiro-park-madrid': 'Retiro Park Madrid Palacio Cristal',
  'gran-via-madrid': 'Gran Vía Madrid Metropolis building',
  'museo-reina-sofia-madrid': 'Reina Sofía Museum Madrid Guernica',
  // Venice
  'st-marks-basilica-venice': 'St Mark\'s Basilica Venice',
  'gallerie-accademia-venice': 'Gallerie dell\'Accademia Venice',
  'burano-island-day-trip-venice': 'Burano island colorful Venice',
  'rialto-market-venice': 'Rialto Market Venice fish',
  // London
  'tate-modern-london': 'Tate Modern London Turbine Hall',
  'v-and-a-museum-london': 'Victoria Albert Museum London',
  'hampstead-heath-london': 'Hampstead Heath London ponds',
  'columbia-road-flower-market-london': 'Columbia Road Flower Market London',
  // Manchester
  'northern-quarter-manchester': 'Northern Quarter Manchester street',
  'manchester-art-gallery': 'Manchester Art Gallery',
  'ancoats-manchester': 'Ancoats Manchester canal',
  'mackie-mayor-manchester': 'Mackie Mayor food hall Manchester',
  // Thessaloniki
  'white-tower-thessaloniki': 'White Tower Thessaloniki',
  'ano-poli-thessaloniki': 'Ano Poli upper city Thessaloniki',
  'modiano-market-thessaloniki': 'Modiano Market Thessaloniki',
  // Santorini
  'oia-sunset-santorini': 'Oia sunset Santorini Greece',
  'akrotiri-archaeological-site-santorini': 'Akrotiri archaeological site Santorini',
  'perissa-black-sand-beach-santorini': 'Perissa black sand beach Santorini',
  // Riga
  'art-nouveau-district-riga': 'Riga Art Nouveau Alberta street facades',
  'riga-old-town': 'Riga old town Dome Cathedral',
  'riga-central-market': 'Riga Central Market zeppelin hangars',
  'jurmala-beach-day-trip-riga': 'Jūrmala beach Baltic Latvia',
  'latvian-national-museum-of-art-riga': 'Latvian National Museum of Art Riga',
  // Vilnius
  'uzupis-republic-vilnius': 'Užupis Vilnius republic',
  'vilnius-old-town': 'Vilnius old town cathedral square',
  'gediminas-tower-vilnius': 'Gediminas Castle Tower Vilnius',
  'trakai-castle-day-trip-vilnius': 'Trakai Castle Lake Lithuania',
  // Sarajevo
  'bascarsija-old-bazaar-sarajevo': 'Baščaršija Sarajevo bazaar',
  'latin-bridge-sarajevo': 'Latin Bridge Sarajevo assassination',
  'tunnel-of-hope-museum-sarajevo': 'Tunnel of Hope Sarajevo museum',
  'stari-grad-sarajevo': 'Sarajevo old town multicultural',
  // Tirana
  'skanderbeg-square-tirana': 'Skanderbeg Square Tirana Albania',
  'bunkart-tirana': 'BunkArt museum Tirana bunker',
  'national-historical-museum-tirana': 'National Historical Museum Tirana mosaic',
  // Berat
  'berat-castle': 'Berat Castle Byzantine Albania',
  'mangalem-quarter-berat': 'Mangalem quarter Berat thousand windows',
  'osum-canyon-day-trip-berat': 'Osum Canyon Albania gorge',
  // Valletta
  'st-johns-co-cathedral-valletta': 'St John\'s Co-Cathedral Valletta Caravaggio',
  'upper-barrakka-gardens-valletta': 'Upper Barrakka Gardens Valletta Grand Harbour',
  'blue-grotto-valletta': 'Blue Grotto Malta sea cave',
  // Ohrid
  'lake-ohrid': 'Lake Ohrid North Macedonia',
  'church-st-john-kaneo-ohrid': 'Church of St John at Kaneo Ohrid',
  'ohrid-fortress': 'Ohrid Fortress Castle Samoil',
  // Skopje
  'old-bazaar-carsija-skopje': 'Old Bazaar Čaršija Skopje Ottoman',
  'skopje-2014-district': 'Skopje 2014 statues Macedonia Square',
  'mother-teresa-memorial-house-skopje': 'Mother Teresa Memorial House Skopje',
  // Hamburg
  'elbphilharmonie-hamburg': 'Elbphilharmonie Hamburg concert hall',
  'speicherstadt-hafencity-hamburg': 'Speicherstadt Hamburg canal warehouse',
  'deichtorhallen-hamburg': 'Deichtorhallen Hamburg contemporary art',
  // Faro
  'faro-old-town': 'Faro Old Town Cidade Velha Portugal',
  'ria-formosa-natural-park-faro': 'Ria Formosa lagoon Portugal',
  'ilha-deserta-faro': 'Ilha Deserta Faro Portugal beach',
  'faro-bone-chapel': 'Faro Bone Chapel Nossa Senhora Carmo',
  // Brno
  'spilberk-castle-brno': 'Špilberk Castle Brno',
  'villa-tugendhat-brno': 'Villa Tugendhat Brno',
  'brno-ossuary': 'Brno ossuary St James bones',
  // Pécs
  'pecs-cathedral-necropolis': 'Pécs Cathedral early Christian necropolis',
  'gazi-kasim-pasha-mosque-pecs': 'Gazi Kasim Pasha Mosque Pécs Hungary',
  'zsolnay-cultural-quarter-pecs': 'Zsolnay Cultural Quarter Pécs factory',
  // Tartu
  'tartu-university-main-building': 'Tartu University main building Estonia',
  'estonian-national-museum-tartu': 'Estonian National Museum Tartu',
  'tartu-town-hall-square': 'Tartu Town Hall Square Estonia',
  // Bled
  'lake-bled-island-church': 'Bled Island church Slovenia',
  'bled-castle': 'Bled Castle cliff Slovenia',
  'vintgar-gorge-bled': 'Vintgar Gorge walkway Slovenia',
  // Batumi
  'batumi-boulevard': 'Batumi Boulevard Black Sea Georgia',
  'batumi-old-town': 'Batumi old town Georgia',
  'batumi-botanical-garden': 'Batumi Botanical Garden Georgia',
  // Aarhus
  'aros-art-museum-aarhus': 'ARoS Rainbow Panorama Aarhus Denmark',
  'den-gamle-by-aarhus': 'Den Gamle By open air museum Aarhus',
  // Salzburg extra
  'salzburg-festival': 'Salzburg Festival opera Felsenreitschule',
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'SouloSpotter/1.0 (soulospotter.com)' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close(); fs.unlink(dest, () => {});
        downloadFile(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close(); fs.unlink(dest, () => {});
        reject(new Error(`HTTP ${res.statusCode}`)); return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });
    req.on('error', err => { fs.unlink(dest, () => {}); reject(err); });
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function wikimediaSearch(query) {
  const params = new URLSearchParams({
    action: 'query', generator: 'search', gsrnamespace: '6',
    gsrsearch: query, gsrlimit: '6', prop: 'imageinfo',
    iiprop: 'url|size|mime', iiurlwidth: '1200', format: 'json', origin: '*',
  });
  const url = `https://commons.wikimedia.org/w/api.php?${params}`;
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'SouloSpotter/1.0' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages;
          if (!pages) { resolve(null); return; }
          for (const page of Object.values(pages)) {
            const ii = page.imageinfo?.[0];
            if (!ii) continue;
            const mime = ii.mime || '';
            if (!mime.includes('jpeg') && !mime.includes('jpg')) continue;
            const thumbUrl = ii.thumburl || ii.url;
            if (thumbUrl) { resolve(thumbUrl); return; }
          }
          // fallback: any image
          for (const page of Object.values(pages)) {
            const ii = page.imageinfo?.[0];
            const thumbUrl = ii?.thumburl || ii?.url;
            if (thumbUrl && !thumbUrl.includes('.svg')) { resolve(thumbUrl); return; }
          }
          resolve(null);
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function getCategoryFallback(category, slug) {
  const options = CATEGORY_FALLBACK[category] || CATEGORY_FALLBACK['CULTURE'];
  // deterministically pick 1 or 2 based on slug length
  const idx = slug.length % 2;
  return path.join(CATEGORY_DIR, options[idx]);
}

async function main() {
  // Get all new spots missing photos
  const newCitySlugs = [
    'paris','lyon','nice','brussels','bruges','zurich','lucerne',
    'oslo','bergen','stockholm','gothenburg','helsinki','tampere',
    'bucharest','cluj-napoca','brasov','belgrade','novi-sad','sofia','plovdiv',
    'kotor','budva','bratislava','kosice',
    'riga','vilnius','reykjavik','sarajevo','tirana','berat','valletta','ohrid','skopje',
    'munich','hamburg','madrid','faro','venice','london','manchester',
    'thessaloniki','santorini','warsaw','gdansk','rotterdam','the-hague',
    'split','zagreb','salzburg','aarhus','brno','pecs','tartu','bled','batumi',
  ];

  const spots = await prisma.spot.findMany({
    where: { city: { slug: { in: newCitySlugs } } },
    select: { slug: true, imageUrl: true, category: true },
  });

  const missing = spots.filter(s => {
    if (!s.imageUrl || s.imageUrl.startsWith('/spots/_category')) return false;
    const p2 = path.join(__dirname, '..', 'public', s.imageUrl.replace(/^\//, ''));
    return !fs.existsSync(p2);
  });

  console.log(`Total new city spots: ${spots.length}`);
  console.log(`Missing photos: ${missing.length}`);

  let downloaded = 0, copied = 0, failed = 0, skipped = 0;

  for (const spot of missing) {
    const dest = path.join(SPOTS_DIR, `${spot.slug}.jpg`);
    if (fs.existsSync(dest)) { skipped++; continue; }

    const query = WIKIMEDIA_SEARCH[spot.slug];
    let success = false;

    if (query) {
      process.stdout.write(`  [WIKI] ${spot.slug}... `);
      try {
        const imgUrl = await wikimediaSearch(query);
        if (imgUrl) {
          await downloadFile(imgUrl, dest);
          const size = fs.statSync(dest).size;
          if (size > 5000) {
            console.log(`OK (${Math.round(size/1024)}KB)`);
            downloaded++;
            success = true;
          } else {
            fs.unlinkSync(dest);
          }
        }
      } catch(e) {
        console.log(`FAILED: ${e.message}`);
      }
      await sleep(200);
    }

    if (!success) {
      // Use category fallback
      const fallback = getCategoryFallback(spot.category, spot.slug);
      if (fs.existsSync(fallback)) {
        fs.copyFileSync(fallback, dest);
        if (!query) process.stdout.write(`  [CAT]  ${spot.slug}... `);
        console.log(`copied ${path.basename(fallback)}`);
        copied++;
      } else {
        if (!query) process.stdout.write(`  [CAT]  ${spot.slug}... `);
        console.log(`NO FALLBACK for category ${spot.category}`);
        failed++;
      }
    }
  }

  console.log(`\nDone: ${downloaded} downloaded, ${copied} category-copy, ${failed} failed, ${skipped} already existed.`);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
