"""Download Pexels photos for Hong Kong spots."""
import urllib.request, os, time

PUBLIC_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "spots")
os.makedirs(PUBLIC_DIR, exist_ok=True)
URL = "https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop"
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

PHOTOS = {
    # Luxury hotels
    "peninsula-hong-kong":              2736388,
    "four-seasons-hong-kong":           1134166,
    "mandarin-oriental-hong-kong":      271618,
    "rosewood-hong-kong":               1579253,
    # Budget hotels
    "butterfly-on-waterfront-hong-kong": 258154,
    "stanford-hotel-hong-kong":         2507010,
    "citadines-ashley-hong-kong":       1743229,
    "mingle-place-hong-kong":           3225528,
    # Hostels
    "yesinn-at-causeway-bay":           271643,
    "ming-fat-house-hong-kong":         2869215,
    "tuve-hotel-hong-kong":             1268683,  # mountain view
    "madera-hollywood-hong-kong":       976866,   # nightlife street
    # Cafes
    "cafe-deadend-hong-kong":           302899,
    "cupping-room-hong-kong":           1307698,
    "cafe-gray-deluxe-hong-kong":       2387873,  # harbour view
    "tram-café-hong-kong":              373639,
    "the-press-room-hong-kong":         887723,
    "artisan-cafe-hong-kong":           350478,
    # Restaurants
    "tim-ho-wan-hong-kong":             1640777,
    "mak-noodle-hong-kong":             2347311,
    "lung-king-heen-hong-kong":         699953,
    "ye-shanghai-hong-kong":            958545,
    "law-fu-kee-hong-kong":             1279330,
    "ifc-mall-food-republic-hong-kong": 1640771,
    # Markets
    "ladies-market-hong-kong":          1640771,
    "jade-market-hong-kong":            1007426,
    "stanley-market-hong-kong":         1179229,
    "wet-market-graham-street-hong-kong": 1640777,
    "night-market-apliu-street-hong-kong": 976867,
    # Tourist sites
    "victoria-peak-tram-hong-kong":     2833040,
    "tsim-sha-tsui-promenade-hong-kong": 2387873,
    "star-ferry-hong-kong":             2387872,
    "big-buddha-lantau-hong-kong":      3889843,
    "dragon-back-trail-hong-kong":      3601425,
    "wong-tai-sin-temple-hong-kong":    2161467,
    "hong-kong-museum-of-history":      1031641,
    "nan-lian-garden-hong-kong":        3601424,
    "tai-o-fishing-village-hong-kong":  1802268,
    "lan-kwai-fong-soho-hong-kong":     976866,
    # Coworking
    "campfire-coworking-hong-kong":     1181671,
    "wework-hong-kong-central":         3182812,
    "just-co-hong-kong":                1181248,
    "the-hive-wan-chai-hong-kong":      4974038,
    "garage-society-hong-kong":         3182773,
    "blueprint-coworking-hong-kong":    1181249,
}

# Also download city thumbnail
CITY_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "cities")
os.makedirs(CITY_DIR, exist_ok=True)
CITY_PHOTO = {
    "hong-kong": 2833040,  # dramatic HK skyline
}

ok = 0; failed = []

for slug, pid in PHOTOS.items():
    dest = os.path.join(PUBLIC_DIR, f"{slug}.jpg")
    if os.path.exists(dest):
        ok += 1; continue
    url = URL.format(id=pid)
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
        if len(data) < 5000:
            raise ValueError(f"Too small ({len(data)} b)")
        open(dest, "wb").write(data)
        ok += 1; print(f"  OK  {slug}")
        time.sleep(0.15)
    except Exception as e:
        failed.append((slug, pid, str(e))); print(f"  FAIL {slug}: {e}")

for slug, pid in CITY_PHOTO.items():
    dest = os.path.join(CITY_DIR, f"{slug}.jpg")
    if os.path.exists(dest):
        continue
    url = URL.format(id=pid)
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
        open(dest, "wb").write(data)
        print(f"  OK  cities/{slug}.jpg")
    except Exception as e:
        print(f"  FAIL cities/{slug}: {e}")

print(f"\nDone: {ok}/{len(PHOTOS)} spot photos")
if failed:
    print("Failed:", [s for s,_,_ in failed])
