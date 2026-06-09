"""
Download real Wikipedia photos for all famous European landmark spots.
Only includes spots with a confirmed Wikipedia article and a distinctive image
(museums, monuments, churches, famous buildings, parks).
Generic venues (cafes, hostels, coworking) are handled by category stock.
Downloads to public/spots/<slug>.jpg
"""
import urllib.request, json, os, re, urllib.parse, time, sys
sys.stdout.reconfigure(encoding="utf-8")

SPOTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "spots")
os.makedirs(SPOTS_DIR, exist_ok=True)
HEADERS = {"User-Agent": "SouloSpotter/1.0 (https://soulospotter.com; hello@soulospotter.com)"}
SUMMARY = "https://en.wikipedia.org/api/rest_v1/page/summary/{title}"

# spot slug -> Wikipedia article title
LANDMARKS = {
    # ── Amsterdam ──
    "rijksmuseum-amsterdam":                "Rijksmuseum",
    "van-gogh-museum-amsterdam":            "Van_Gogh_Museum",
    "anne-frank-house-amsterdam":           "Anne_Frank_House",
    "stedelijk-museum-amsterdam":           "Stedelijk_Museum_Amsterdam",
    "royal-palace-amsterdam":               "Royal_Palace_of_Amsterdam",
    "vondelpark-amsterdam":                 "Vondelpark",
    "hortus-botanicus-amsterdam":           "Hortus_Botanicus_Amsterdam",
    "ndsm-wharf-amsterdam":                 "NDSM",
    "albert-cuyp-market-amsterdam":         "Albert_Cuyp_Market",
    "paradiso-amsterdam":                   "Paradiso_(Amsterdam)",
    "melkweg-amsterdam":                    "Melkweg",
    "keukenhof-gardens-amsterdam":          "Keukenhof",
    "amsterdamse-bos-amsterdam":            "Amsterdamse_Bos",

    # ── Rome ──
    "colosseum-rome":                       "Colosseum",
    "vatican-museums-rome":                 "Vatican_Museums",
    "pantheon-rome":                        "Pantheon,_Rome",
    "trevi-fountain-rome":                  "Trevi_Fountain",
    "roman-forum-rome":                     "Roman_Forum",
    "borghese-gallery-rome":                "Borghese_Gallery",
    "castel-sant-angelo-rome":              "Castel_Sant'Angelo",
    "villa-borghese-rome":                  "Villa_Borghese",
    "trastevere-rome":                      "Trastevere",
    "terme-di-caracalla-rome":              "Baths_of_Caracalla",

    # ── Prague ──
    "prague-castle":                        "Prague_Castle",
    "charles-bridge-prague":               "Charles_Bridge",
    "old-town-square-prague":              "Old_Town_Square_(Prague)",
    "prague-astronomical-clock":            "Prague_astronomical_clock",
    "josefov-jewish-quarter-prague":       "Josefov",
    "vysehrad-prague":                      "Vyšehrad",
    "petrin-tower-prague":                  "Petřín_Lookout_Tower",

    # ── Budapest ──
    "hungarian-parliament-budapest":        "Hungarian_Parliament_Building",
    "szechenyi-thermal-bath-budapest":      "Széchenyi_thermal_bath",
    "fishermans-bastion-budapest":          "Fisherman's_Bastion",
    "buda-castle-budapest":                 "Buda_Castle",
    "matthias-church-budapest":             "Matthias_Church",
    "great-market-hall-budapest":           "Great_Market_Hall,_Budapest",
    "margaret-island-budapest":             "Margaret_Island",
    "gellert-thermal-bath-budapest":        "Gellért_Baths",

    # ── Athens ──
    "acropolis-athens":                     "Acropolis_of_Athens",
    "acropolis-museum-athens":              "Acropolis_Museum",
    "ancient-agora-athens":                 "Ancient_Agora_of_Athens",
    "national-archaeological-museum-athens": "National_Archaeological_Museum,_Athens",
    "syntagma-square-athens":               "Syntagma_Square",
    "monastiraki-athens":                   "Monastiraki",
    "lycabettus-hill-athens":               "Lycabettus",

    # ── Vienna ──
    "schonbrunn-palace-vienna":             "Schönbrunn_Palace",
    "belvedere-palace-vienna":              "Belvedere,_Vienna",
    "kunsthistorisches-museum-vienna":      "Kunsthistorisches_Museum",
    "vienna-state-opera":                   "Vienna_State_Opera",
    "prater-riesenrad-vienna":              "Riesenrad",
    "museumsquartier-vienna":               "MuseumsQuartier",
    "burgtheater-vienna":                   "Burgtheater",
    "naschmarkt-vienna":                    "Naschmarkt",
    "stadtpark-vienna":                     "City_Park,_Vienna",

    # ── Copenhagen ──
    "nyhavn-copenhagen":                    "Nyhavn",
    "tivoli-gardens-copenhagen":            "Tivoli_Gardens",
    "the-little-mermaid-copenhagen":        "The_Little_Mermaid_(statue)",
    "freetown-christiania-copenhagen":      "Freetown_Christiania",
    "rosenborg-castle-copenhagen":          "Rosenborg_Castle",
    "kongens-have-copenhagen":              "Kongens_Have",

    # ── Porto ──
    "dom-luis-i-bridge-porto":              "Dom_Luís_I_Bridge",
    "livraria-lello-porto":                 "Livraria_Lello",
    "clerigos-church-porto":                "Clérigos_Church",
    "porto-cathedral":                      "Porto_Cathedral",
    "palacio-da-bolsa-porto":               "Palácio_da_Bolsa",
    "ribeira-porto":                        "Ribeira",
    "mercado-do-bolhao-porto":              "Bolhão_Market",
    "serralves-museum-porto":               "Serralves_Foundation",

    # ── Edinburgh ──
    "edinburgh-castle":                     "Edinburgh_Castle",
    "arthurs-seat-edinburgh":               "Arthur's_Seat",
    "palace-of-holyroodhouse-edinburgh":    "Palace_of_Holyroodhouse",
    "national-museum-of-scotland":          "National_Museum_of_Scotland",
    "royal-mile-edinburgh":                 "Royal_Mile",
    "greyfriars-kirkyard-edinburgh":        "Greyfriars_Kirkyard",
    "calton-hill-edinburgh":                "Calton_Hill",
    "royal-botanic-garden-edinburgh":       "Royal_Botanic_Garden_Edinburgh",
    "scott-monument-edinburgh":             "Scott_Monument",

    # ── Seville ──
    "seville-cathedral":                    "Seville_Cathedral",
    "real-alcazar-seville":                 "Alcázar_of_Seville",
    "plaza-de-espana-seville":              "Plaza_de_España,_Seville",
    "torre-del-oro-seville":                "Torre_del_Oro",
    "barrio-santa-cruz-seville":            "Santa_Cruz,_Seville",
    "parque-de-maria-luisa-seville":        "Parque_de_María_Luisa",

    # ── Florence ──
    "uffizi-gallery-florence":              "Uffizi",
    "florence-cathedral-duomo":             "Florence_Cathedral",
    "galleria-accademia-florence":          "Galleria_dell'Accademia",
    "ponte-vecchio-florence":               "Ponte_Vecchio",
    "piazzale-michelangelo-florence":       "Piazzale_Michelangelo",
    "palazzo-pitti-florence":               "Palazzo_Pitti",
    "boboli-gardens-florence":              "Boboli_Gardens",

    # ── Dubrovnik ──
    "dubrovnik-city-walls":                 "Walls_of_Dubrovnik",
    "old-town-dubrovnik":                   "Old_City_of_Dubrovnik",
    "rectors-palace-dubrovnik":             "Rector's_Palace,_Dubrovnik",
    "lokrum-island-dubrovnik":              "Lokrum",
    "fort-lovrijenac-dubrovnik":            "Lovrijenac",
    "stradun-dubrovnik":                    "Placa_(Stradun)",

    # ── Tallinn ──
    "tallinn-old-town":                     "Tallinn_Old_Town",
    "toompea-castle-tallinn":               "Toompea_Castle",
    "kadriorg-palace-tallinn":              "Kadriorg_Palace",
    "kumu-art-museum-tallinn":              "Kumu_Art_Museum",
    "tallinn-town-hall":                    "Tallinn_Town_Hall",
    "estonian-open-air-museum-tallinn":     "Rocca_al_Mare",
    "lahemaa-national-park-tallinn":        "Lahemaa_National_Park",

    # ── Ljubljana ──
    "ljubljana-castle":                     "Ljubljana_Castle",
    "triple-bridge-ljubljana":              "Triple_Bridge",
    "ljubljana-cathedral":                  "Ljubljana_Cathedral",
    "metelkova-city-ljubljana":             "Metelkova",
    "tivoli-park-ljubljana":                "Tivoli_Park,_Ljubljana",
    "lake-bled-day-trip-ljubljana":         "Lake_Bled",
    "plecnik-house-ljubljana":              "Jože_Plečnik",

    # ── Kraków ──
    "wawel-castle-krakow":                  "Wawel_Castle",
    "rynek-glowny-krakow":                  "Main_Market_Square,_Kraków",
    "wieliczka-salt-mine-krakow":           "Wieliczka_Salt_Mine",
    "st-marys-basilica-krakow":             "St._Mary's_Basilica,_Kraków",
    "kazimierz-krakow":                     "Kazimierz",
    "wawel-cathedral-krakow":               "Wawel_Cathedral",
    "auschwitz-birkenau-krakow":            "Auschwitz_concentration_camp",
    "zakopane-day-trip-krakow":             "Zakopane",
}

def widen(url, width=1280):
    m = re.search(r"/(\d+)px-", url)
    return url.replace(m.group(0), f"/{width}px-") if m else url

ok = 0; skipped = 0; failed = []

for slug, title in LANDMARKS.items():
    dest = os.path.join(SPOTS_DIR, f"{slug}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 5000:
        print(f"  SKIP {slug}")
        skipped += 1
        continue

    try:
        req = urllib.request.Request(
            SUMMARY.format(title=urllib.parse.quote(title)),
            headers=HEADERS
        )
        data = json.loads(urllib.request.urlopen(req, timeout=20).read())
        thumb = (data.get("thumbnail") or {}).get("source")
        orig  = (data.get("originalimage") or {}).get("source")
        img_url = widen(thumb) if thumb else orig
        if not img_url:
            raise ValueError("no image in summary")
        img = urllib.request.urlopen(
            urllib.request.Request(img_url, headers=HEADERS), timeout=30
        ).read()
        if len(img) < 5000:
            raise ValueError(f"too small ({len(img)} b)")
        with open(dest, "wb") as f:
            f.write(img)
        ok += 1
        print(f"  OK  {slug}  <- {title}  ({len(img)//1024} KB)")
        time.sleep(0.3)
    except Exception as e:
        failed.append((slug, title, str(e)))
        print(f"  FAIL {slug} ({title}): {e}")

print(f"\nDone: {ok} downloaded, {skipped} skipped, {len(failed)} failed")
if failed:
    print("FAILED — review titles:")
    for slug, title, err in failed:
        print(f"  {slug}  ({title})  {err}")
