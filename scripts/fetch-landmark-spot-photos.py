"""
Fetch REAL photos for famous landmark spots (temples, towers, museums,
monuments, famous natural sites) from Wikipedia lead images.

Only includes spots with a confident, unique Wikipedia article. Beaches,
lagoons, dive sites, viewpoints and generic scenery are intentionally
left out — those get high-quality category stock instead (handled by a
separate script), since a generic turquoise-lagoon photo is more
representative than repeating one island shot 8 times.

Downloads to public/spots/<slug>.jpg
"""
import urllib.request, json, os, re, urllib.parse, time, sys
sys.stdout.reconfigure(encoding="utf-8")

SPOTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "spots")
os.makedirs(SPOTS_DIR, exist_ok=True)
HEADERS = {"User-Agent": "SouloSpotter/1.0 (https://soulospotter.com; hello@soulospotter.com)"}
SUMMARY = "https://en.wikipedia.org/api/rest_v1/page/summary/{title}"

# spot slug -> Wikipedia article title (exact)
LANDMARKS = {
    # ── Bangkok ──
    "wat-phra-kaew-grand-palace-bangkok": "Wat_Phra_Kaew",
    "wat-pho-bangkok": "Wat_Pho",
    "wat-arun-bangkok": "Wat_Arun",
    "jim-thompson-house-bangkok": "Jim_Thompson_House",
    "khao-san-road-bangkok": "Khaosan_Road",
    "lumphini-park-bangkok": "Lumphini_Park",
    "chao-phraya-river-boat-bangkok": "Chao_Phraya",
    "chatuchak-park-area-bangkok": "Chatuchak_Weekend_Market",
    "banglamphu-old-quarter-bangkok": "Banglamphu",
    # ── Cebu ──
    "basilica-del-santo-nino-cebu": "Minor_Basilica_of_the_Holy_Child",
    "fort-san-pedro-cebu": "Fort_San_Pedro",
    "kawasan-falls-moalboal-cebu": "Kawasan_Falls",
    "magellans-cross-cebu": "Magellan's_Cross",
    "heritage-of-cebu-monument": "Heritage_of_Cebu_Monument",
    "mactan-shrine-cebu": "Lapu-Lapu_Shrine",
    # ── Chengdu ──
    "giant-panda-base-chengdu": "Chengdu_Research_Base_of_Giant_Panda_Breeding",
    "wuhou-shrine-chengdu": "Wuhou_District",
    "dujiangyan-irrigation-system-chengdu": "Dujiangyan",
    "mount-emei-day-trip-chengdu": "Mount_Emei",
    "leshan-giant-buddha-chengdu": "Leshan_Giant_Buddha",
    "sanxingdui-museum-chengdu": "Sanxingdui",
    "qingcheng-mountain-national-park-chengdu": "Mount_Qingcheng",
    "tianfu-square-mao-statue-chengdu": "Tianfu_Square",
    "jinsha-site-museum-chengdu": "Jinsha_site",
    # ── Guilin ──
    "li-river-cruise": "Li_River",
    "reed-flute-cave": "Reed_Flute_Cave",
    "elephant-trunk-hill": "Elephant_Trunk_Hill",
    "jingjiang-prince-city": "Jingjiang_Princes'_City",
    "seven-star-park": "Seven_Star_Park",
    "longji-rice-terraces": "Longsheng_Rice_Terraces",
    "moon-hill-yangshuo": "Moon_Hill",
    # ── Ho Chi Minh City ──
    "war-remnants-museum-hcmc": "War_Remnants_Museum",
    "cu-chi-tunnels-hcmc": "Củ_Chi_tunnels",
    "reunification-palace-hcmc": "Independence_Palace",
    "notre-dame-cathedral-hcmc": "Saigon_Notre-Dame_Basilica",
    "jade-emperor-pagoda-hcmc": "Jade_Emperor_Pagoda",
    "mekong-delta-day-trip-hcmc": "Mekong_Delta",
    "thien-hau-temple-hcmc": "Thien_Hau_Temple,_Ho_Chi_Minh_City",
    "saigon-skydeck-bitexco": "Bitexco_Financial_Tower",
    # ── Hong Kong ──
    "victoria-peak-tram-hong-kong": "Victoria_Peak",
    "star-ferry-hong-kong": "Star_Ferry",
    "big-buddha-lantau-hong-kong": "Tian_Tan_Buddha",
    "wong-tai-sin-temple-hong-kong": "Wong_Tai_Sin_Temple",
    "hong-kong-museum-of-history": "Hong_Kong_Museum_of_History",
    "nan-lian-garden-hong-kong": "Nan_Lian_Garden",
    "tai-o-fishing-village-hong-kong": "Tai_O",
    # ── Koh Tao ──
    "koh-nang-yuan-koh-tao": "Ko_Nang_Yuan",
    # ── Kuala Lumpur ──
    "petronas-twin-towers-kl": "Petronas_Towers",
    "batu-caves-kl": "Batu_Caves",
    "menara-kl-tower": "Kuala_Lumpur_Tower",
    "islamic-arts-museum-kl": "Islamic_Arts_Museum_Malaysia",
    "merdeka-square-kl": "Merdeka_Square,_Kuala_Lumpur",
    "national-museum-kl": "National_Museum_(Malaysia)",
    "thean-hou-temple-kl": "Thean_Hou_Temple",
    # ── Luang Prabang ──
    "wat-xieng-thong-temple-luang-prabang": "Wat_Xieng_Thong",
    "kuang-si-waterfall-luang-prabang": "Kuang_Si_Falls",
    "mount-phousi-luang-prabang": "Mount_Phou_Si",
    "royal-palace-museum-luang-prabang": "Royal_Palace,_Luang_Prabang",
    "pak-ou-caves-luang-prabang": "Pak_Ou_Caves",
    # ── Pai ──
    "pai-canyon-kong-lan": "Pai,_Thailand",
    "pai-memorial-bridge": "Pai,_Thailand",
    # ── Penang ──
    "george-town-street-art-penang": "George_Town,_Penang",
    "khoo-kongsi-penang": "Khoo_Kongsi",
    "pinang-peranakan-mansion-penang": "Pinang_Peranakan_Mansion",
    "penang-hill-penang": "Penang_Hill",
    "sri-mahamariamman-temple-penang": "Sri_Mahamariamman_Temple,_Penang",
    "clan-jetties-penang": "Clan_jetties_of_Penang",
    "kek-lok-si-temple-penang": "Kek_Lok_Si",
    "penang-national-park": "Penang_National_Park",
    # ── Phuket ──
    "phuket-old-town-heritage-zone": "Phuket_(city)",
    "big-buddha-phuket": "Big_Buddha_(Phuket)",
    "phang-nga-bay-phuket": "Phang_Nga_Bay",
    "patong-beach-phuket": "Patong_Beach",
    "wat-chalong-phuket": "Wat_Chalong",
    "promthep-cape-phuket": "Laem_Phromthep",
    # ── Siem Reap ──
    "angkor-wat-siem-reap": "Angkor_Wat",
    "bayon-temple-siem-reap": "Bayon",
    "ta-prohm-temple-siem-reap": "Ta_Prohm",
    "preah-khan-temple-siem-reap": "Preah_Khan",
    "tonle-sap-lake-siem-reap": "Tonlé_Sap",
    "banteay-srei-temple-siem-reap": "Banteay_Srei",
    "phnom-bakheng-sunset-siem-reap": "Phnom_Bakheng",
    "angkor-national-museum-siem-reap": "Angkor_National_Museum",
    # ── Singapore ──
    "gardens-by-the-bay-singapore": "Gardens_by_the_Bay",
    "singapore-botanic-gardens": "Singapore_Botanic_Gardens",
    "sentosa-island-singapore": "Sentosa",
    "haw-par-villa-singapore": "Haw_Par_Villa",
    "kampong-glam-heritage-singapore": "Kampong_Glam",
    "artscience-museum-singapore": "ArtScience_Museum",
    "macritchie-reservoir-park-singapore": "MacRitchie_Reservoir",
    "national-museum-singapore": "National_Museum_of_Singapore",
    "little-india-singapore": "Little_India,_Singapore",
    "sri-srinivasa-perumal-temple-singapore": "Sri_Srinivasa_Perumal_Temple",
    # ── Ubud ──
    "tegallalang-rice-terraces-ubud": "Tegallalang",
    "sacred-monkey-forest-ubud": "Ubud_Monkey_Forest",
    "pura-tirta-empul-ubud": "Tirta_Empul",
    "ubud-palace-puri-saren-agung": "Ubud",
    "goa-gajah-ubud": "Goa_Gajah",
    "mount-batur-sunrise-trek-ubud": "Mount_Batur",
    # ── Ulaanbaatar ──
    "gandan-monastery-ulaanbaatar": "Gandantegchinlen_Monastery",
    "national-museum-of-mongolia": "National_Museum_of_Mongolia",
    "sukhbaatar-square-ulaanbaatar": "Sükhbaatar_Square",
    "bogd-khan-mountain-national-park-ulaanbaatar": "Bogd_Khan_Uul",
    "zaisan-memorial-ulaanbaatar": "Zaisan_Memorial",
    "winter-palace-bogd-khan-ulaanbaatar": "Bogd_Khan_Palace_Museum",
    "chinggis-khan-equestrian-statue-ulaanbaatar": "Equestrian_statue_of_Genghis_Khan",
    "choijin-lama-temple-museum-ulaanbaatar": "Choijin_Lama_Temple",
    "hustai-national-park-ulaanbaatar": "Khustain_Nuruu_National_Park",
    # ── Xi'an ──
    "terracotta-army-museum-xian": "Terracotta_Army",
    "ancient-city-wall-xian": "Fortifications_of_Xi'an",
    "shaanxi-history-museum-xian": "Shaanxi_History_Museum",
    "big-wild-goose-pagoda-xian": "Giant_Wild_Goose_Pagoda",
    "bell-tower-drum-tower-xian": "Bell_Tower_of_Xi'an",
    "huaqing-palace-xian": "Huaqing_Pool",
    "small-wild-goose-pagoda-xian": "Small_Wild_Goose_Pagoda",
    "great-mosque-xian": "Great_Mosque_of_Xi'an",
    "qianling-mausoleum-xian": "Qianling_Mausoleum",
    "hanyangling-museum-xian": "Han_Yang_Ling",
}

def widen(url, width=1280):
    m = re.search(r"/(\d+)px-", url)
    return url.replace(m.group(0), f"/{width}px-") if m else url

ok = 0; failed = []
for slug, title in LANDMARKS.items():
    try:
        req = urllib.request.Request(SUMMARY.format(title=urllib.parse.quote(title)), headers=HEADERS)
        data = json.loads(urllib.request.urlopen(req, timeout=20).read())
        thumb = (data.get("thumbnail") or {}).get("source")
        orig = (data.get("originalimage") or {}).get("source")
        img_url = widen(thumb) if thumb else orig
        if not img_url:
            raise ValueError("no image in summary")
        img = urllib.request.urlopen(urllib.request.Request(img_url, headers=HEADERS), timeout=30).read()
        if len(img) < 5000:
            raise ValueError(f"too small ({len(img)} b)")
        with open(os.path.join(SPOTS_DIR, f"{slug}.jpg"), "wb") as f:
            f.write(img)
        ok += 1
        print(f"  OK  {slug}  <- {title}  ({len(img)//1024} KB)")
        time.sleep(0.25)
    except Exception as e:
        failed.append((slug, title, str(e)))
        print(f"  FAIL {slug} ({title}): {e}")

print(f"\nDone: {ok}/{len(LANDMARKS)}")
if failed:
    print("FAILED — review titles:")
    for slug, title, err in failed:
        print(f"  {slug}  ({title})  {err}")
