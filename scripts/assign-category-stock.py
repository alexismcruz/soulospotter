"""
Assign VERIFIED category-stock images to business spots that currently have
wrong/weak photos. Every Unsplash ID below was visually verified.

Rebuilds:  ACCOMMODATION (hotel/hostel/budget), COWORKING, tropical NATURE
Leaves alone:  CAFE, FOOD (already good), and all real landmark photos.

Deterministic assignment by slug hash => good variety, stable across re-runs.
Downloads to public/spots/<slug>.jpg
"""
import urllib.request, os, hashlib, csv, sys, time
sys.stdout.reconfigure(encoding="utf-8")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPOTS_DIR = os.path.join(ROOT, "public", "spots")
TSV = os.path.join(ROOT, "scripts", "all-spots.tsv")
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
UNSPLASH = "https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w=900&h=600&q=80"

NEW_CITIES = {"bangkok","cebu","chengdu","el-nido","guilin","ho-chi-minh-city","koh-tao",
    "kuala-lumpur","luang-prabang","pai","penang","phuket","siem-reap","singapore",
    "ubud","ulaanbaatar","xian","hong-kong"}

# Verified Unsplash photo IDs (all eyeballed)
POOLS = {
    "LUX":    ["1566073771259-6a8506099945","1611892440504-42a792e24d32","1582719478250-c89cae4dc85b",
               "1564501049412-61c2a3083791","1551882547-ff40c63fe5fa","1520250497591-112f2f40a3f4",
               "1445019980597-93fa8acb246c"],
    "BUDGET": ["1631049307264-da0ec9d70304","1522771739844-6a9f6d5f14af","1505693416388-ac5ce068fe85",
               "1611892440504-42a792e24d32"],
    "HOSTEL": ["1555854877-bab0e564b8d5","1626265774643-f1943311a86b","1522771739844-6a9f6d5f14af",
               "1631049307264-da0ec9d70304"],
    "COWORK": ["1497366811353-6870744d04b2","1524758631624-e2822e304c36","1542744173-8e7e53415bb0",
               "1556761175-5973dc0f32e7","1497366216548-37526070297c"],
    "TROPICAL": ["1505228395891-9a51e7e86bf6","1518509562904-e7ef99cdcc86","1559827260-dc66d52bef19",
                 "1583212292454-1fe6229603b7","1540202404-a2f29016b523"],
}

# Landmark slugs that now hold REAL photos — never overwrite these.
import importlib.util
spec = importlib.util.spec_from_file_location("lm", os.path.join(ROOT, "scripts", "fetch-landmark-spot-photos.py"))
# We can't import (it runs network). Instead hardcode the failed ones; everything else in the
# landmark map succeeded and must be excluded.
LANDMARK_FAILED = {"thien-hau-temple-hcmc","wong-tai-sin-temple-hong-kong","clan-jetties-penang",
                   "winter-palace-bogd-khan-ulaanbaatar"}  # promthep-cape allowed (tropical cape)

def read_landmark_slugs():
    """Parse the LANDMARKS dict keys from the landmark script without executing it."""
    slugs = set()
    path = os.path.join(ROOT, "scripts", "fetch-landmark-spot-photos.py")
    in_dict = False
    with open(path, encoding="utf-8") as f:
        for line in f:
            if line.strip().startswith("LANDMARKS = {"):
                in_dict = True; continue
            if in_dict:
                if line.strip() == "}":
                    break
                s = line.strip()
                if s.startswith('"'):
                    slug = s.split('"')[1]
                    slugs.add(slug)
    return slugs

LANDMARK_SLUGS = read_landmark_slugs()
EXCLUDE = (LANDMARK_SLUGS - LANDMARK_FAILED)  # successful landmarks => keep real photos

TROPICAL_KW = ("beach","lagoon","island","bay","reef","dive","snorkel","cape","nang-yuan",
               "sairee","tanote","shark","nacpan","lio","cadlao","helicopter","secret","big-lagoon",
               "small-lagoon","twin-lagoon","pinnacle")

def pool_for(category, slug):
    s = slug.lower()
    if category == "ACCOMMODATION":
        if any(k in s for k in ("hostel","backpacker","dorm","mingle","yesinn","yha","flying-tiger","mix-hostel","papa","pak-up","monkey")):
            return "HOSTEL"
        if any(k in s for k in ("guesthouse","guest-house","pension","-inn","inn-","budget","hostal","melody","stanford","citadines","butterfly","sayo","lotus","oasis","ub-guest","lg-guest")):
            return "BUDGET"
        return "LUX"
    if category == "COWORKING":
        return "COWORK"
    if category == "NATURE":
        if any(k in s for k in TROPICAL_KW):
            return "TROPICAL"
        return None  # mountains/parks/waterfalls/terraces -> leave existing
    return None

def pick(pool, slug):
    h = int(hashlib.md5(slug.encode()).hexdigest(), 16)
    return POOLS[pool][h % len(POOLS[pool])]

ok = 0; skipped = 0; left = 0
with open(TSV, encoding="utf-8") as f:
    for row in csv.reader(f, delimiter="\t"):
        if len(row) < 4:
            continue
        city, cat, slug, name = row[0], row[1], row[2], row[3]
        if city not in NEW_CITIES:
            continue
        if slug in EXCLUDE:
            skipped += 1; continue
        pool = pool_for(cat, slug)
        if not pool:
            left += 1; continue
        pid = pick(pool, slug)
        url = UNSPLASH.format(id=pid)
        dest = os.path.join(SPOTS_DIR, f"{slug}.jpg")
        try:
            data = urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=25).read()
            if len(data) < 4000:
                raise ValueError(f"too small ({len(data)} b)")
            with open(dest, "wb") as out:
                out.write(data)
            ok += 1
            if ok % 40 == 0:
                print(f"  ...{ok} assigned")
            time.sleep(0.1)
        except Exception as e:
            print(f"  FAIL {slug} ({pool}): {e}")

print(f"\nDone: {ok} reassigned, {skipped} landmarks kept, {left} left as-is (cafe/food/other-nature)")
