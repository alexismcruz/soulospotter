"""
Re-download city thumbnails using Wikipedia lead images, which are
guaranteed to actually depict the city (skyline montages, landmarks).

Uses the Wikipedia REST summary API to get each article's page image,
then downloads a 1200px-wide Wikimedia thumbnail.
"""
import urllib.request, json, os, time

CITIES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "cities")
os.makedirs(CITIES_DIR, exist_ok=True)

HEADERS = {"User-Agent": "SouloSpotter/1.0 (https://soulospotter.com; contact@soulospotter.com)"}
SUMMARY = "https://en.wikipedia.org/api/rest_v1/page/summary/{title}"

# city slug → Wikipedia article title
CITIES = {
    "bangkok":          "Bangkok",
    "cebu":             "Cebu_City",
    "chengdu":          "Chengdu",
    "el-nido":          "El_Nido,_Palawan",
    "guilin":           "Guilin",
    "ho-chi-minh-city": "Ho_Chi_Minh_City",
    "koh-tao":          "Ko_Tao",
    "kuala-lumpur":     "Kuala_Lumpur",
    "luang-prabang":    "Luang_Prabang",
    "pai":              "Pai_District",
    "penang":           "George_Town,_Penang",
    "phuket":           "Phuket_(city)",
    "siem-reap":        "Siem_Reap",
    "singapore":        "Singapore",
    "ubud":             "Ubud",
    "ulaanbaatar":      "Ulaanbaatar",
    "xian":             "Xi'an",
    "hong-kong":        "Hong_Kong",
}

def widen(thumb_url, width=1280):
    """Rewrite a Wikimedia thumb URL to a larger width."""
    # e.g. .../thumb/a/ab/File.jpg/320px-File.jpg  ->  .../1200px-File.jpg
    import re
    m = re.search(r"/(\d+)px-", thumb_url)
    if m:
        return thumb_url.replace(m.group(0), f"/{width}px-")
    return thumb_url

ok = 0; failed = []

for slug, title in CITIES.items():
    try:
        req = urllib.request.Request(SUMMARY.format(title=urllib.parse.quote(title)), headers=HEADERS)
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read())

        thumb = (data.get("thumbnail") or {}).get("source")
        orig = (data.get("originalimage") or {}).get("source")
        img_url = widen(thumb) if thumb else orig

        if not img_url:
            raise ValueError("No image in Wikipedia summary")

        # Download the image
        ireq = urllib.request.Request(img_url, headers=HEADERS)
        with urllib.request.urlopen(ireq, timeout=30) as iresp:
            img = iresp.read()
        if len(img) < 5000:
            raise ValueError(f"Image too small ({len(img)} b)")

        # Wikimedia may serve .png/.svg — save as .jpg regardless (browsers don't care)
        dest = os.path.join(CITIES_DIR, f"{slug}.jpg")
        with open(dest, "wb") as f:
            f.write(img)
        print(f"  OK  {slug}  <- {title}  ({len(img)//1024} KB)")
        ok += 1
        time.sleep(0.3)
    except Exception as e:
        failed.append((slug, title, str(e)))
        print(f"  FAIL {slug} ({title}): {e}")

print(f"\nDone: {ok}/{len(CITIES)}")
if failed:
    print("Failed:")
    for slug, title, err in failed:
        print(f"  {slug} ({title}): {err}")
