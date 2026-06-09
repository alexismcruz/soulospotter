"""
Download real Wikipedia photos for landmark spots newly added to
Kyoto, Seoul, Rishikesh and Kathmandu. Uses pageimages query API with a
search fallback, widening thumbs to 1280px. Output: public/spots/<slug>.jpg
Generic venues (hotels/cafes/coworking) are left for category stock.
"""
import urllib.request, json, urllib.parse, re, os, time, sys
sys.stdout.reconfigure(encoding="utf-8")

SPOTS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "spots")
os.makedirs(SPOTS, exist_ok=True)
H = {"User-Agent": "SouloSpotter/1.0 (https://soulospotter.com; hello@soulospotter.com)"}

LANDMARKS = {
    # ── Kyoto ──
    "kinkakuji-golden-pavilion":   "Kinkaku-ji",
    "ginkakuji-silver-pavilion":   "Ginkaku-ji",
    "kiyomizu-dera":               "Kiyomizu-dera",
    "nijo-castle-kyoto":           "Nijō_Castle",
    "ryoanji-kyoto":               "Ryōan-ji",
    "tenryuji-kyoto":              "Tenryū-ji",
    "toji-temple-kyoto":           "Tō-ji",
    "sanjusangendo-kyoto":         "Sanjūsangen-dō",
    "yasaka-shrine-kyoto":         "Yasaka_Shrine",
    "heian-shrine-kyoto":          "Heian_Shrine",
    "nanzenji-kyoto":              "Nanzen-ji",
    "kyoto-imperial-palace":       "Kyoto_Imperial_Palace",
    "kyoto-national-museum":       "Kyoto_National_Museum",
    "philosophers-path-kyoto":     "Philosopher's_Walk",
    "maruyama-park-kyoto":         "Maruyama_Park_(Kyoto)",
    "kamo-river-delta-kyoto":      "Kamo_River",
    "kyoto-botanical-gardens":     "Kyoto_Botanical_Garden",
    "gion-district-kyoto":         "Gion",
    # ── Seoul ──
    "gyeongbokgung-palace-seoul":  "Gyeongbokgung",
    "changdeokgung-palace-seoul":  "Changdeokgung",
    "bukchon-hanok-village-seoul": "Bukchon_Hanok_Village",
    "n-seoul-tower":               "N_Seoul_Tower",
    "jogyesa-temple-seoul":        "Jogyesa",
    "deoksugung-palace-seoul":     "Deoksugung",
    "dongdaemun-design-plaza-seoul":"Dongdaemun_Design_Plaza",
    "national-museum-of-korea-seoul":"National_Museum_of_Korea",
    "war-memorial-of-korea-seoul": "War_Memorial_of_Korea",
    "namsan-park-seoul":           "Namsan_(Seoul)",
    "cheonggyecheon-stream-seoul": "Cheonggyecheon",
    "seoul-forest-park":           "Seoul_Forest",
    "insadong-seoul":              "Insadong",
    "hongdae-seoul":               "Hongdae",
    # ── Rishikesh ──
    "lakshman-jhula-rishikesh":    "Lakshman_Jhula",
    "ram-jhula-rishikesh":         "Ram_Jhula",
    "triveni-ghat-rishikesh":      "Triveni_Ghat,_Rishikesh",
    "neelkanth-mahadev-temple-rishikesh":"Neelkanth_Mahadev_Temple",
    "kunjapuri-devi-temple-rishikesh":"Kunjapuri_Devi_Temple",
    "rajaji-national-park-rishikesh":"Rajaji_National_Park",
    "parmarth-niketan-rishikesh":  "Parmarth_Niketan",
    # ── Kathmandu ──
    "boudhanath-stupa-kathmandu":  "Boudhanath",
    "swayambhunath-kathmandu":     "Swayambhu",
    "kathmandu-durbar-square":     "Kathmandu_Durbar_Square",
    "patan-durbar-square-kathmandu":"Patan_Durbar_Square",
    "bhaktapur-durbar-square-kathmandu":"Bhaktapur_Durbar_Square",
    "kopan-monastery-kathmandu":   "Kopan_Monastery",
    "garden-of-dreams-kathmandu":  "Garden_of_Dreams_(Nepal)",
    "shivapuri-national-park-kathmandu":"Shivapuri_Nagarjun_National_Park",
    "asan-bazaar-kathmandu":       "Asan,_Kathmandu",
}

# slug -> search query, for entries with no clean article title
SEARCH_FALLBACK = {
    "philosophers-path-kyoto": "Philosopher's Path Kyoto",
    "ram-jhula-rishikesh": "Ram Jhula Rishikesh bridge",
    "triveni-ghat-rishikesh": "Triveni Ghat Rishikesh",
    "kunjapuri-devi-temple-rishikesh": "Kunjapuri Devi Temple Rishikesh",
    "garden-of-dreams-kathmandu": "Garden of Dreams Kathmandu",
}

def widen(u, w=1280):
    m = re.search(r"/(\d+)px-", u)
    return u.replace(m.group(0), f"/{w}px-") if m else u

def query_img(title):
    # Always prefer the capped 1280px thumbnail to avoid multi-MB originals.
    url = ("https://en.wikipedia.org/w/api.php?action=query&format=json"
           "&prop=pageimages&piprop=thumbnail|original&pithumbsize=1280&titles="
           + urllib.parse.quote(title))
    d = json.loads(urllib.request.urlopen(urllib.request.Request(url, headers=H), timeout=20).read())
    for p in d.get("query", {}).get("pages", {}).values():
        t = (p.get("thumbnail") or {}).get("source")
        o = (p.get("original") or {}).get("source")
        if t: return t
        if o and not o.lower().endswith(".svg"): return widen(o)
    return None

def search_img(q):
    url = ("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search"
           "&srnamespace=0&srlimit=1&srsearch=" + urllib.parse.quote(q))
    d = json.loads(urllib.request.urlopen(urllib.request.Request(url, headers=H), timeout=20).read())
    hits = d.get("query", {}).get("search", [])
    if not hits: return None, None
    t = hits[0]["title"]
    return t, query_img(t)

ok = 0; failed = []
for slug, title in LANDMARKS.items():
    dest = os.path.join(SPOTS, f"{slug}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 5000:
        print(f"  SKIP {slug}"); ok += 1; continue
    try:
        u = query_img(title)
        used = title
        if not u and slug in SEARCH_FALLBACK:
            used, u = search_img(SEARCH_FALLBACK[slug])
        if not u:
            used, u = search_img(title.replace("_", " "))
        if not u:
            raise ValueError("no image")
        u = widen(u)
        img = urllib.request.urlopen(urllib.request.Request(u, headers=H), timeout=30).read()
        if len(img) < 5000: raise ValueError(f"too small {len(img)}")
        open(dest, "wb").write(img)
        ok += 1
        print(f"  OK  {slug} <- {used} ({len(img)//1024} KB)")
        time.sleep(0.3)
    except Exception as e:
        failed.append((slug, title, str(e)))
        print(f"  FAIL {slug} ({title}): {e}")

print(f"\nDone: {ok} ok, {len(failed)} failed")
for s, t, e in failed:
    print(f"  FAILED {s} ({t}) {e}")
