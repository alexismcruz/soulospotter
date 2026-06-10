/**
 * For all new experiences missing a photo file, copy the best category-match
 * from an existing experience photo. This gives every experience a real photo
 * instead of a broken image. Can be replaced with unique photos later.
 *
 * Run: node scripts/assign-experience-photo-fallbacks.js
 */
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const EXP_DIR = path.join(__dirname, '..', 'public', 'experiences');

// Best category-match existing photos to copy from
// These are real photographs already in public/experiences/
const CATEGORY_TEMPLATE = {
  FOOD_DRINK:           'amsterdam-cheese-jenever-tasting.jpg',
  ARTS_CULTURE:         'athens-acropolis-tour.jpg',
  DAY_TRIPS:            'amsterdam-keukenhof-day-trip.jpg',
  OUTDOOR_ADVENTURE:    'bali-mount-batur-sunrise-hike.jpg',
  FITNESS_SPORTS:       'barcelona-bike-tour.jpg',
  NIGHTLIFE_SOCIAL:     'bangkok-rooftop-bar-night.jpg',
  WELLNESS_MINDFULNESS: 'bali-yoga-and-rice-field-sunrise.jpg',
  PHOTOGRAPHY_WALKS:    'amsterdam-canal-history-walk.jpg',
};

// More specific overrides by slug keyword
const SLUG_OVERRIDES = {
  'cooking-class':    'bali-traditional-balinese-cooking.jpg',
  'food-tour':        'bangkok-street-food-night-tour.jpg',
  'wine-tasting':     'amsterdam-cheese-jenever-tasting.jpg',
  'beer-tasting':     'amsterdam-brown-cafe-crawl.jpg',
  'kayak':            'bali-mount-batur-sunrise-hike.jpg',
  'hiking':           'bali-mount-batur-sunrise-hike.jpg',
  'cycling':          'amsterdam-bike-tour.jpg',
  'bike-tour':        'amsterdam-bike-tour.jpg',
  'museum':           'athens-museum-tour.jpg',
  'art-tour':         'athens-museum-tour.jpg',
  'history-tour':     'athens-acropolis-tour.jpg',
  'walking-tour':     'athens-food-tour.jpg',
  'photography-walk': 'amsterdam-canal-history-walk.jpg',
  'day-trip':         'amsterdam-keukenhof-day-trip.jpg',
  'boat-tour':        'amsterdam-canal-history-walk.jpg',
  'sailing':          'amsterdam-canal-history-walk.jpg',
  'sauna':            'bali-yoga-and-rice-field-sunrise.jpg',
  'yoga':             'bali-yoga-and-rice-field-sunrise.jpg',
  'northern-lights':  'bali-mount-batur-sunrise-hike.jpg',
  'glacier':          'bali-mount-batur-sunrise-hike.jpg',
  'nightlife':        'bangkok-rooftop-bar-night.jpg',
  'bar-crawl':        'bangkok-rooftop-bar-night.jpg',
  'festival':         'bangkok-rooftop-bar-night.jpg',
};

async function main() {
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

  const experiences = await prisma.experience.findMany({
    where: { city: { slug: { in: newCitySlugs } } },
    select: { slug: true, category: true },
  });

  let copied = 0, skipped = 0, missing = 0;

  for (const exp of experiences) {
    const dest = path.join(EXP_DIR, `${exp.slug}.jpg`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
      skipped++;
      continue;
    }

    // Find best source
    let src = null;

    // Check slug keyword overrides first
    for (const [keyword, file] of Object.entries(SLUG_OVERRIDES)) {
      if (exp.slug.includes(keyword)) {
        const candidate = path.join(EXP_DIR, file);
        if (fs.existsSync(candidate)) { src = candidate; break; }
      }
    }

    // Fall back to category template
    if (!src) {
      const templateFile = CATEGORY_TEMPLATE[exp.category] || CATEGORY_TEMPLATE['ARTS_CULTURE'];
      const candidate = path.join(EXP_DIR, templateFile);
      if (fs.existsSync(candidate)) src = candidate;
    }

    if (!src) {
      console.log(`  NO SOURCE for ${exp.slug} (${exp.category})`);
      missing++;
      continue;
    }

    fs.copyFileSync(src, dest);
    console.log(`  ${exp.slug} ← ${path.basename(src)}`);
    copied++;
  }

  console.log(`\nDone: ${copied} copied, ${skipped} already existed, ${missing} missing source.`);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
