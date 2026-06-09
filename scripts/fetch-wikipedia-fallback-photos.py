"""
Fallback: uses Wikipedia's action=query prop=pageimages API to find lead images
for spots where the REST summary API failed (no image or 404).
"""
import urllib.request, json, os, re, urllib.parse, sys, time
sys.stdout.reconfigure(encoding="utf-8")

SPOTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "spots")
HEADERS = {"User-Agent": "SouloSpotter/1.0 (https://soulospotter.com; hello@soulospotter.com)"}

def get_image_via_query_api(title):
    """Use the MediaWiki action=query prop=pageimages API to get the lead image."""
    url = (
        "https://en.wikipedia.org/w/api.php"
        "?action=query&format=json&prop=pageimages"
        "&piprop=original&titles=" + urllib.parse.quote(title)
    )
    req = urllib.request.Request(url, headers=HEADERS)
    data = json.loads(urllib.request.urlopen(req, timeout=20).read())
    pages = data.get("query", {}).get("pages", {})
    for page in pages.values():
        orig = (page.get("original") or {}).get("source")
        if orig:
            return orig
    return None

def get_image_via_search(query_term):
    """Fall back to Wikipedia search, then grab the lead image of the first hit."""
    url = (
        "https://en.wikipedia.org/w/api.php"
        "?action=query&format=json&list=search&srsearch=" + urllib.parse.quote(query_term)
        + "&srnamespace=0&srlimit=1"
    )
    req = urllib.request.Request(url, headers=HEADERS)
    data = json.loads(urllib.request.urlopen(req, timeout=20).read())
    hits = data.get("query", {}).get("search", [])
    if not hits:
        return None, None
    first_title = hits[0]["title"]
    return first_title, get_image_via_query_api(first_title)

FALLBACKS = {
    # Stadtpark, Vienna — city park in Vienna (Viennese City Park)
    "stadtpark-vienna":         ("Stadtpark", "Stadtpark Vienna"),
    # Ribeira waterfront, Porto
    "ribeira-porto":            ("Ribeira", "Ribeira Porto waterfront"),
    # Bolhão Market, Porto
    "mercado-do-bolhao-porto":  ("Bolhão_Market", "Bolhão market Porto"),
    # Piazzale Michelangelo, Florence
    "piazzale-michelangelo-florence": ("Piazzale_Michelangelo", "Piazzale Michelangelo Florence"),
    # Stradun (Placa), Dubrovnik
    "stradun-dubrovnik":        ("Stradun", "Stradun Dubrovnik main street"),
}

ok = 0; failed = []

for slug, (title, search_query) in FALLBACKS.items():
    dest = os.path.join(SPOTS_DIR, f"{slug}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 5000:
        print(f"  SKIP {slug}")
        continue

    # Try direct title first
    img_url = get_image_via_query_api(title)
    used_title = title

    # Fall back to search if no image found
    if not img_url:
        found_title, img_url = get_image_via_search(search_query)
        used_title = found_title or title
        print(f"  ... search fallback for {slug} -> {used_title}")

    if not img_url:
        failed.append((slug, "no image found"))
        print(f"  FAIL {slug}: no image found")
        continue

    try:
        img = urllib.request.urlopen(
            urllib.request.Request(img_url, headers=HEADERS), timeout=30
        ).read()
        if len(img) < 5000:
            raise ValueError(f"too small ({len(img)} b)")
        with open(dest, "wb") as f:
            f.write(img)
        ok += 1
        print(f"  OK  {slug}  <- {used_title}  ({len(img)//1024} KB)")
        time.sleep(0.3)
    except Exception as e:
        failed.append((slug, str(e)))
        print(f"  FAIL {slug}: {e}")

print(f"\nDone: {ok} downloaded, {len(failed)} failed")
for slug, err in failed:
    print(f"  {slug}: {err}")
