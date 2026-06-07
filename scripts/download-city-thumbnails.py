"""Download missing city thumbnail images to public/cities/"""
import urllib.request, os, time

CITIES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "cities")
os.makedirs(CITIES_DIR, exist_ok=True)

PEXELS = "https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

# slug → Pexels photo ID  (city-level wide shots)
CITIES = {
    "bangkok":          1519088,  # Bangkok skyline/temples
    "cebu":             1166587,  # Philippine coastal city
    "chengdu":          2412510,  # Chinese city with lights
    "el-nido":          3155666,  # Palawan islands
    "guilin":           2387873,  # Li River + karst peaks
    "ho-chi-minh-city": 1458457,  # Vietnam city
    "koh-tao":          1179230,  # Thai island water
    "kuala-lumpur":     2833040,  # KL skyline (Petronas)
    "luang-prabang":    3889843,  # Mekong / temple
    "pai":              3601425,  # Mountain valley
    "penang":           1007426,  # George Town streets
    "phuket":           1287460,  # Phuket beach
    "siem-reap":        2161467,  # Angkor Wat
    "singapore":        2736388,  # Singapore skyline
    "ubud":             3601427,  # Rice terraces
    "ulaanbaatar":      2833040,  # City / steppe
    "xian":             1031641,  # Ancient wall / terracotta
}

ok = 0; failed = []

for slug, pid in CITIES.items():
    dest = os.path.join(CITIES_DIR, f"{slug}.jpg")
    if os.path.exists(dest):
        print(f"  SKIP {slug} (exists)")
        ok += 1
        continue
    url = PEXELS.format(id=pid)
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
        if len(data) < 5000:
            raise ValueError(f"Too small ({len(data)} b)")
        with open(dest, "wb") as f:
            f.write(data)
        print(f"  OK  {slug}")
        ok += 1
        time.sleep(0.2)
    except Exception as e:
        failed.append((slug, pid, str(e)))
        print(f"  FAIL {slug} (id={pid}): {e}")

print(f"\nDone: {ok}/{len(CITIES)}")
if failed:
    print("Failed:", [(s, pid) for s, pid, _ in failed])
