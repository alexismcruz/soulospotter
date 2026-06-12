// Region-agnostic content seeder (city slugs are globally unique).
// Usage: const { seed } = require('./_content-seed-helper'); seed({ SPOTS, EXPERIENCES });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const EXP_IMG = {
  OUTDOOR_ADVENTURE: ['/spots/_category/nature-1.jpg', '/spots/_category/nature-2.jpg'],
  FOOD_DRINK: ['/spots/_category/food-1.jpg', '/spots/_category/food-2.jpg'],
  ARTS_CULTURE: ['/spots/_category/culture-1.jpg', '/spots/_category/culture-2.jpg'],
  WELLNESS_MINDFULNESS: ['/spots/_category/wellness-1.jpg', '/spots/_category/wellness-2.jpg'],
  NIGHTLIFE_SOCIAL: ['/spots/_category/nightlife-1.jpg', '/spots/_category/nightlife-2.jpg'],
  DAY_TRIPS: ['/spots/_category/nature-1.jpg', '/spots/_category/nature-2.jpg'],
  PHOTOGRAPHY_WALKS: ['/spots/_category/culture-1.jpg', '/spots/_category/culture-2.jpg'],
  FITNESS_SPORTS: ['/spots/_category/nature-1.jpg', '/spots/_category/nature-2.jpg'],
};

const SPOT_IMG = {
  ACCOMMODATION: ['/spots/_category/accommodation-1.jpg', '/spots/_category/accommodation-2.jpg'],
  CAFE: ['/spots/_category/cafe-1.jpg', '/spots/_category/cafe-2.jpg'],
  COWORKING: ['/spots/_category/coworking-1.jpg', '/spots/_category/coworking-2.jpg'],
  FOOD: ['/spots/_category/food-1.jpg', '/spots/_category/food-2.jpg'],
  WELLNESS: ['/spots/_category/wellness-1.jpg', '/spots/_category/wellness-2.jpg'],
  COMMUNITY: ['/spots/_category/coworking-1.jpg', '/spots/_category/coworking-2.jpg'],
  NATURE: ['/spots/_category/nature-1.jpg', '/spots/_category/nature-2.jpg'],
  CULTURE: ['/spots/_category/culture-1.jpg', '/spots/_category/culture-2.jpg'],
  NIGHTLIFE: ['/spots/_category/nightlife-1.jpg', '/spots/_category/nightlife-2.jpg'],
  TRANSPORT: ['/spots/_category/culture-1.jpg', '/spots/_category/culture-2.jpg'],
};

function pickImg(map, category, idx) {
  const arr = map[category] || map.CULTURE;
  return arr[idx % arr.length];
}

async function withRetry(fn, label, tries = 5) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      return await fn();
    } catch (e) {
      const transient = /closed the connection|P1017|P1001|Can't reach database/i.test(e.message || '');
      if (!transient || attempt === tries) throw e;
      const wait = 1500 * attempt;
      console.log('  …retry ' + label + ' (attempt ' + attempt + ') after ' + wait + 'ms');
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

async function seed({ SPOTS = {}, EXPERIENCES = {} }) {
  const slugs = [...new Set([...Object.keys(SPOTS), ...Object.keys(EXPERIENCES)])];
  const cities = await withRetry(
    () => prisma.city.findMany({ where: { slug: { in: slugs } }, select: { id: true, slug: true } }),
    'lookup cities'
  );
  const cityMap = {};
  cities.forEach((c) => (cityMap[c.slug] = c.id));

  const organizer = await withRetry(() => prisma.experienceOrganizer.findFirst(), 'find organizer');
  if (!organizer) throw new Error('No ExperienceOrganizer found — run base seed first');

  let spotCreated = 0, spotSkipped = 0, expCreated = 0, expSkipped = 0;

  for (const [slug, spots] of Object.entries(SPOTS)) {
    const cityId = cityMap[slug];
    if (!cityId) { console.log('SKIP spots (no city): ' + slug); continue; }
    let i = 0;
    for (const s of spots) {
      const { tags = [], ...data } = s;
      const exists = await withRetry(() => prisma.spot.findFirst({ where: { cityId, slug: data.slug } }), 'find spot ' + data.slug);
      if (exists) { spotSkipped++; i++; continue; }
      const img = data.imageUrl || pickImg(SPOT_IMG, data.category, i);
      await withRetry(() => prisma.spot.create({
        data: { ...data, imageUrl: img, cityId, published: true, tags: { create: tags.map((t) => ({ tag: t })) } },
      }), 'create spot ' + data.slug);
      spotCreated++; i++;
      console.log('  spot: ' + slug + ' / ' + data.name);
    }
  }

  for (const [slug, exps] of Object.entries(EXPERIENCES)) {
    const cityId = cityMap[slug];
    if (!cityId) { console.log('SKIP experiences (no city): ' + slug); continue; }
    let i = 0;
    for (const e of exps) {
      const exists = await withRetry(() => prisma.experience.findFirst({ where: { cityId, slug: e.slug } }), 'find exp ' + e.slug);
      if (exists) { expSkipped++; i++; continue; }
      const photo = e.photoUrl || pickImg(EXP_IMG, e.category, i);
      await withRetry(() => prisma.experience.create({
        data: {
          slug: e.slug, name: e.name, description: e.description, price: e.price, category: e.category,
          duration: e.duration, groupSizeMin: e.groupSizeMin ?? 1, groupSizeMax: e.groupSizeMax ?? 12,
          frequency: e.frequency || 'daily', bookingUrl: e.bookingUrl || '', photoUrl: photo,
          cityId, organizerId: organizer.id, isActive: true,
        },
      }), 'create exp ' + e.slug);
      expCreated++; i++;
      console.log('  exp:  ' + slug + ' / ' + e.name);
    }
  }

  console.log('\nDone. Spots: created=' + spotCreated + ' skipped=' + spotSkipped +
              ' | Experiences: created=' + expCreated + ' skipped=' + expSkipped);
  await prisma.$disconnect();
}

module.exports = { seed };
