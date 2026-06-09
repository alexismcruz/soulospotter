"""Real Wikipedia city hero photos for the 9 new Asian cities (capped 1280px)."""
import urllib.request, json, urllib.parse, re, os, time, sys
sys.stdout.reconfigure(encoding="utf-8")
CITIES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "cities")
os.makedirs(CITIES_DIR, exist_ok=True)
H = {"User-Agent": "SouloSpotter/1.0 (https://soulospotter.com; hello@soulospotter.com)"}

CITIES = {
    "jaipur": "Jaipur", "udaipur": "Udaipur", "varanasi": "Varanasi",
    "tokyo": "Tokyo", "osaka": "Osaka", "nara": "Nara,_Nara",
    "busan": "Busan", "jeju": "Jeju_Island", "gyeongju": "Gyeongju",
}

def widen(u, w=1280):
    m = re.search(r"/(\d+)px-", u)
    return u.replace(m.group(0), f"/{w}px-") if m else u

def query_img(title):
    url = ("https://en.wikipedia.org/w/api.php?action=query&format=json"
           "&prop=pageimages&piprop=thumbnail|original&pithumbsize=1280&titles=" + urllib.parse.quote(title))
    d = json.loads(urllib.request.urlopen(urllib.request.Request(url, headers=H), timeout=20).read())
    for p in d.get("query", {}).get("pages", {}).values():
        t = (p.get("thumbnail") or {}).get("source")
        o = (p.get("original") or {}).get("source")
        if t: return t
        if o and not o.lower().endswith(".svg"): return widen(o)
    return None

ok = 0; failed = []
for slug, title in CITIES.items():
    dest = os.path.join(CITIES_DIR, f"{slug}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 10000:
        print(f"  SKIP {slug}"); ok += 1; continue
    try:
        u = query_img(title)
        if not u: raise ValueError("no image")
        img = urllib.request.urlopen(urllib.request.Request(u, headers=H), timeout=30).read()
        if len(img) < 5000: raise ValueError("too small")
        open(dest, "wb").write(img); ok += 1
        print(f"  OK  {slug} <- {title} ({len(img)//1024} KB)")
        time.sleep(0.3)
    except Exception as e:
        failed.append((slug, str(e))); print(f"  FAIL {slug}: {e}")
print(f"\nDone: {ok}/{len(CITIES)}")
for s, e in failed: print(f"  FAILED {s}: {e}")
