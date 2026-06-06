"""
Download and verify Pexels photos for Hanoi spots.
Run: python scripts/download-hanoi-photos.py
Creates public/spots/<slug>.jpg for each Hanoi spot.
"""
import urllib.request
import os
import sys

PEXELS_KEY = os.environ.get("PEXELS_API_KEY", "")
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "spots")
os.makedirs(OUT_DIR, exist_ok=True)

# slug -> Pexels photo ID (manually verified for visual accuracy)
# Using broad category photos since Pexels has limited Hanoi-specific content
PHOTOS = {
    # Luxury hotels - grand colonial / modern hotel lobby / rooftop pool
    "sofitel-legend-metropole-hanoi":   3155666,   # grand colonial hotel exterior
    "lotte-hotel-hanoi":                1134166,   # city skyline rooftop pool
    "pan-pacific-hanoi":                2034335,   # waterfront luxury hotel
    "movenpick-hotel-hanoi":            2507025,   # elegant hotel lobby
    # Budget hotels - clean boutique hotel room
    "hanoi-la-siesta-classic-hotel":    271624,    # boutique hotel room
    "hanoi-elegance-emerald-hotel":     164595,    # hotel room clean minimal
    "little-charm-hanoi":               1579253,   # guesthouse warm interior
    "cozy-hanoi-hotel":                 2631983,   # cozy hotel room
    # Hostels - social hostel bunk dorm
    "vietnam-backpacker-hostels-downtown": 1579252, # hostel dorm beds
    "the-hanoi-social-hostel":          1743229,   # modern hostel common area
    "old-quarter-view-hostel":          2507010,   # rooftop view city
    "hanoi-hostel":                     3049121,   # budget hostel corridor
    # Cafes - Vietnamese coffee, egg coffee, cozy cafes
    "giang-cafe-hanoi":                 312418,    # Vietnamese coffee egg foam
    "cafe-pho-co-hanoi":                3338952,   # rooftop cafe city view
    "the-note-coffee-hanoi":            302899,    # sticky notes wall colorful
    "tranquil-books-coffee-hanoi":      2883048,   # book cafe cozy reading
    "loading-t-cafe-hanoi":             1995842,   # minimalist specialty coffee
    "cong-caphe-hanoi":                 373639,    # retro vintage cafe interior
    # Restaurants
    "bun-cha-huong-lien-hanoi":         958545,    # Vietnamese noodle dish bowl
    "cha-ca-la-vong-hanoi":             1640777,   # fish dish pan tableside
    "quan-an-ngon-hanoi":               1640775,   # vietnamese food court stalls
    "la-verticale-hanoi":               262978,    # fine dining restaurant table
    "pho-gia-truyen-bat-dan-hanoi":     1437587,   # pho noodle soup bowl
    "home-hanoi-restaurant":            696218,    # vietnamese home cooked food
    # Markets
    "dong-xuan-market-hanoi":           2292953,   # indoor market stalls
    "old-quarter-night-market-hanoi":   1581895,   # night market lanterns street
    "quang-ba-flower-market-hanoi":     931177,    # wholesale flower market
    "hang-da-market-hanoi":             264636,    # local wet market produce
    "long-bien-market-hanoi":           2252573,   # wholesale vegetable market
    # Tourist sites
    "hoan-kiem-lake-ngoc-son-temple":   1132047,   # temple island lake reflection
    "temple-of-literature-hanoi":       2641189,   # traditional vietnamese temple
    "ho-chi-minh-mausoleum-hanoi":      2261395,   # monumental stone building
    "hoa-lo-prison-hanoi":              2422278,   # old prison stone walls
    "vietnam-museum-of-ethnology-hanoi":2361952,   # museum colonial building
    "one-pillar-pagoda-hanoi":          2916450,   # pagoda on water lotus pond
    "tran-quoc-pagoda-hanoi":           1004409,   # tall pagoda tower sunset
    "st-josephs-cathedral-hanoi":       208701,    # gothic cathedral facade
    "west-lake-hanoi":                  460621,    # large lake promenade sunrise
    "vietnam-fine-arts-museum-hanoi":   3631711,   # art museum colonial building
    # Coworking
    "toong-coworking-hanoi":            1181406,   # modern coworking open plan
    "circo-coworking-hanoi":            3184291,   # creative coworking exposed brick
    "up-coworking-hanoi":               1181304,   # flexible coworking desks
    "hanoi-creative-city":              3810788,   # creative hub industrial space
    "workspace-hanoi":                  4050291,   # budget clean coworking
    "nest-by-aia-hanoi":                3182812,   # premium coworking office
}

def download(slug, photo_id):
    out_path = os.path.join(OUT_DIR, slug + ".jpg")
    if os.path.exists(out_path):
        print(f"SKIP  {slug}")
        return True

    url = f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
        if len(data) < 5000:
            print(f"FAIL  {slug} (too small: {len(data)} bytes)")
            return False
        with open(out_path, "wb") as f:
            f.write(data)
        print(f"OK    {slug} ({len(data)//1024}KB)")
        return True
    except Exception as e:
        print(f"FAIL  {slug}: {e}")
        return False

ok = fail = 0
for slug, pid in PHOTOS.items():
    if download(slug, pid):
        ok += 1
    else:
        fail += 1

print(f"\nDone: {ok} OK, {fail} failed")
