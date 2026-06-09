"""
Download city hero photos for all 15 European cities from Wikipedia lead images.
These are real, actual photos of each city (skylines, landmarks, aerial views).
Downloads to public/cities/<slug>.jpg
"""
import urllib.request, json, os, re, urllib.parse, time

CITIES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "cities")
os.makedirs(CITIES_DIR, exist_ok=True)

HEADERS = {"User-Agent": "SouloSpotter/1.0 (https://soulospotter.com; contact@soulospotter.com)"}
SUMMARY = "https://en.wikipedia.org/api/rest_v1/page/summary/{title}"

# city slug → Wikipedia article title (lead image = actual photo of the place)
CITIES = {
    "amsterdam":   "Amsterdam",
    "rome":        "Rome",
    "prague":      "Prague",
    "budapest":    "Budapest",
    "athens":      "Athens",
    "vienna":      "Vienna",
    "copenhagen":  "Copenhagen",
    "porto":       "Porto",
    "edinburgh":   "Edinburgh",
    "seville":     "Seville",
    "florence":    "Florence",
    "dubrovnik":   "Dubrovnik",
    "tallinn":     "Tallinn",
    "ljubljana":   "Ljubljana",
    "krakow":      "Kraków",
}

def widen(thumb_url, width=1280):
    m = re.search(r"/(\d+)px-", thumb_url)
    if m:
        return thumb_url.replace(m.group(0), f"/{width}px-")
    return thumb_url

ok = 0; failed = []

for slug, title in CITIES.items():
    dest = os.path.join(CITIES_DIR, f"{slug}.jpg")
    if os.path.exists(dest):
        size = os.path.getsize(dest)
        if size > 10000:
            print(f"  SKIP {slug} (already {size//1024} KB)")
            ok += 1
            continue

    try:
        req = urllib.request.Request(
            SUMMARY.format(title=urllib.parse.quote(title)),
            headers=HEADERS
        )
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read())

        thumb = (data.get("thumbnail") or {}).get("source")
        orig  = (data.get("originalimage") or {}).get("source")
        img_url = widen(thumb) if thumb else orig

        if not img_url:
            raise ValueError("No image in Wikipedia summary")

        ireq = urllib.request.Request(img_url, headers=HEADERS)
        with urllib.request.urlopen(ireq, timeout=30) as iresp:
            img = iresp.read()

        if len(img) < 5000:
            raise ValueError(f"Image too small ({len(img)} b)")

        with open(dest, "wb") as f:
            f.write(img)

        print(f"  OK  {slug}  <- {title}  ({len(img)//1024} KB)  {img_url[:80]}")
        ok += 1
        time.sleep(0.4)

    except Exception as e:
        failed.append((slug, title, str(e)))
        print(f"  FAIL {slug} ({title}): {e}")

print(f"\nDone: {ok}/{len(CITIES)}")
if failed:
    print("Failed:")
    for slug, title, err in failed:
        print(f"  {slug} ({title}): {err}")
