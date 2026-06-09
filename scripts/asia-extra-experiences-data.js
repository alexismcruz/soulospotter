// 12 extra experiences (3 each) for Kyoto, Seoul, Kathmandu, Rishikesh.
// img: "landmark:<spot-slug>" reuses a real Wikipedia landmark photo from /public/spots,
//      "activity:<key>" downloads a verified activity Unsplash photo.

const ACTIVITY_PHOTOS = {
  cooking:    "1556909114-f6e7ad7d3136",
  streetfood: "1504674900247-0877df9cc836",
  bar:        "1514933651103-005eec06c04b",
  trek:       "1551632811-561732d1e306",
};

const CITY_NAMES = { kyoto: "Kyoto", seoul: "Seoul", kathmandu: "Kathmandu", rishikesh: "Rishikesh" };

const E = (city, slug, name, category, img, price, duration, desc, freq = "daily", min = 1, max = 12) =>
  ({ city, slug, name, category, img, price, duration, description: desc, frequency: freq, groupSizeMin: min, groupSizeMax: max });

const EXPERIENCES = [
  // ── Kyoto ──
  E("kyoto","kyoto-gion-geisha-evening-walk","Gion Geisha District Evening Walk","ARTS_CULTURE","landmark:gion-district-kyoto",40,"2 hours","Wander Gion's lantern-lit lanes at dusk with a local guide, learning the world of geiko and maiko and spotting the wooden teahouses of old Kyoto."),
  E("kyoto","kyoto-arashiyama-bamboo-tenryuji-tour","Arashiyama Bamboo & Tenryu-ji Tour","OUTDOOR_ADVENTURE","landmark:tenryuji-kyoto",50,"Half day","Walk the famous bamboo grove, the Zen gardens of Tenryu-ji, and the Togetsukyo bridge on a guided morning in Arashiyama before the crowds."),
  E("kyoto","kyoto-fushimi-sake-tasting","Fushimi Sake Brewery Tasting","FOOD_DRINK","activity:bar",45,"3 hours","Explore the historic Fushimi sake district and taste premium Kyoto sake straight from the breweries with a knowledgeable guide."),

  // ── Seoul ──
  E("seoul","seoul-gyeongbokgung-hanbok-experience","Gyeongbokgung Palace & Hanbok Experience","ARTS_CULTURE","landmark:gyeongbokgung-palace-seoul",40,"Half day","Rent a colourful hanbok, enter the palace free, and tour Gyeongbokgung's halls and the changing-of-the-guard with a local guide."),
  E("seoul","seoul-bukchon-insadong-walk","Bukchon Hanok Village & Insadong Walk","ARTS_CULTURE","landmark:bukchon-hanok-village-seoul",30,"3 hours","Stroll the hillside hanok lanes of Bukchon and the craft galleries and teahouses of Insadong with a guide to old and new Seoul."),
  E("seoul","seoul-street-food-night-tour","Seoul Street Food Night Tour","FOOD_DRINK","activity:streetfood",48,"3.5 hours","Eat through Gwangjang Market and Myeongdong's night stalls — tteokbokki, mandu, hotteok and more — with a food-loving local guide."),

  // ── Kathmandu ──
  E("kathmandu","kathmandu-stupa-temple-tour","Boudhanath & Swayambhunath Stupa Tour","ARTS_CULTURE","landmark:boudhanath-stupa-kathmandu",45,"Half day","Visit the great stupa of Boudhanath and the hilltop Monkey Temple of Swayambhunath with a guide to Kathmandu's living Buddhist culture."),
  E("kathmandu","kathmandu-bhaktapur-heritage-day-trip","Bhaktapur Heritage Day Trip","DAY_TRIPS","landmark:bhaktapur-durbar-square-kathmandu",55,"Full day","Step into the medieval city of Bhaktapur — its Durbar Square, Nyatapola pagoda, potters' square and famous king curd — on a guided day trip."),
  E("kathmandu","kathmandu-momo-cooking-class","Nepali Momo Cooking Class","FOOD_DRINK","activity:cooking",35,"3 hours","Learn to fold and steam Nepal's beloved momos, plus a dal bhat set, in a hands-on class with a local family cook."),

  // ── Rishikesh ──
  E("rishikesh","rishikesh-kunjapuri-sunrise-trek","Sunrise Kunjapuri Temple Trek","OUTDOOR_ADVENTURE","landmark:kunjapuri-devi-temple-rishikesh",30,"Half day","Drive and hike to the hilltop Kunjapuri temple before dawn for a breathtaking sunrise over the snow-capped Himalayas and the Ganges valley.","daily",1,10),
  E("rishikesh","rishikesh-ganga-aarti-ceremony","Evening Ganga Aarti at Triveni Ghat","ARTS_CULTURE","landmark:triveni-ghat-rishikesh",15,"1.5 hours","Witness the mesmerising fire-and-chant Ganga Aarti at the riverside with a guide who explains the ritual and floats a lamp on the holy river."),
  E("rishikesh","rishikesh-waterfall-cliff-jump-hike","Waterfall Hike & Cliff Jumping","OUTDOOR_ADVENTURE","activity:trek",40,"Half day","Trek through the Himalayan foothills to hidden waterfalls and natural pools for a refreshing swim and optional cliff jumps.","daily",1,10),
];

module.exports = { EXPERIENCES, ACTIVITY_PHOTOS, CITY_NAMES };
