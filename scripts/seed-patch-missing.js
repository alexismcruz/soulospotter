// Patch: add missing spots to Split & Zagreb; add experiences to Byron Bay
const { seed } = require('./_content-seed-helper');

const SPOTS = {
  'split': [
    { name: 'Diocletian\'s Palace', category: 'culture', description: 'One of the world\'s most impressive Roman monuments — a living palace where people still live inside 1,700-year-old walls.', costLevel: 'BUDGET', address: 'Dioklecijanova ul., Split' },
    { name: 'Marjan Hill Park', category: 'nature', description: 'Forested peninsula above Split with pine-shaded walking paths, rocky coves for swimming, and panoramic views of the Adriatic.', costLevel: 'BUDGET', address: 'Šetalište Ivana Meštrovića, Split' },
    { name: 'Pazar Market', category: 'food', description: 'Split\'s daily open-air market just outside the palace walls — local produce, cheese, dried figs, and lavender.', costLevel: 'BUDGET', address: 'Hrvojeva ul., Split' },
  ],
  'zagreb': [
    { name: 'Museum of Broken Relationships', category: 'culture', description: 'Internationally acclaimed museum displaying personal objects donated by people from failed relationships — moving, funny, and utterly unique.', costLevel: 'BUDGET', address: 'Ćirilometodska ul. 2, Zagreb' },
    { name: 'Dolac Market', category: 'food', description: 'Zagreb\'s beloved red-umbrella market above the main square — Croatian cheese, truffle products, fresh fruit, and flower stalls.', costLevel: 'BUDGET', address: 'Dolac, Zagreb' },
    { name: 'Strossmayer Promenade (Stross)', category: 'nightlife', description: 'Atmospheric terrace walkway along the Upper Town walls — buskers, outdoor bars, Zagreb city views below, and the Lotrščak Tower.', costLevel: 'BUDGET', address: 'Strossmayerovo šetalište, Zagreb' },
  ],
};

const EXPERIENCES = {
  'byron-bay': [
    { title: 'Cape Byron Sunrise Walk & Lighthouse', category: 'OUTDOOR_ADVENTURE', description: 'Walk to Australia\'s most easterly point at dawn — watch the sun rise from the Cape Byron Lighthouse before the crowds arrive.', price: 0, priceRange: 'FREE', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 10, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/byron-bay-l984/?partner_id=CDE4NF2' },
    { title: 'Byron Bay Surf Lesson', category: 'OUTDOOR_ADVENTURE', description: 'Learn to surf Byron\'s beginner-friendly breaks with a certified local instructor — equipment included, lessons run year-round.', price: 65, priceRange: 'MID', duration: '2 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'DAILY', bookingUrl: 'https://www.getyourguide.com/byron-bay-l984/?partner_id=CDE4NF2' },
    { title: 'Byron Hinterland & Rainforest Day Trip', category: 'OUTDOOR_ADVENTURE', description: 'Guided trip to the Nightcap Range — Protestors Falls, Cedar Creek Falls, and ancient subtropical rainforest.', price: 85, priceRange: 'MID', duration: '7 hours', groupSizeMin: 1, groupSizeMax: 8, frequency: 'WEEKLY', bookingUrl: 'https://www.getyourguide.com/byron-bay-l984/?partner_id=CDE4NF2' },
  ],
};

seed({ SPOTS, EXPERIENCES })
  .then(() => process.exit(0))
  .catch((e) => { console.error(e); process.exit(1); });
