"""Real Wikipedia photos (capped 1280px) for landmark spots in the 9 new Asian cities.
Generic venues (cafes/hotels/coworking/most food) are left for category stock."""
import urllib.request, json, urllib.parse, re, os, time, sys
sys.stdout.reconfigure(encoding="utf-8")
SPOTS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "spots")
H = {"User-Agent": "SouloSpotter/1.0 (https://soulospotter.com; hello@soulospotter.com)"}

LANDMARKS = {
  # Jaipur
  "hawa-mahal-jaipur":"Hawa_Mahal","amber-fort-jaipur":"Amer_Fort","city-palace-jaipur":"City_Palace,_Jaipur",
  "jantar-mantar-jaipur":"Jantar_Mantar,_Jaipur","nahargarh-fort-jaipur":"Nahargarh_Fort","jal-mahal-jaipur":"Jal_Mahal",
  "albert-hall-museum-jaipur":"Albert_Hall_Museum","galtaji-monkey-temple-jaipur":"Galtaji",
  # Udaipur
  "city-palace-udaipur":"City_Palace,_Udaipur","lake-pichola-udaipur":"Lake_Pichola","jagdish-temple-udaipur":"Jagdish_Temple,_Udaipur",
  "saheliyon-ki-bari-udaipur":"Saheliyon_ki_Bari","fateh-sagar-lake-udaipur":"Fateh_Sagar_Lake","monsoon-palace-udaipur":"Monsoon_Palace",
  "bagore-ki-haveli-udaipur":"Bagore-ki-Haveli","jag-mandir-udaipur":"Jag_Mandir","badi-lake-udaipur":"Badi_Lake",
  # Varanasi
  "dashashwamedh-ghat-varanasi":"Dashashwamedh_Ghat","kashi-vishwanath-varanasi":"Kashi_Vishwanath_Temple",
  "assi-ghat-varanasi":"Assi_Ghat","manikarnika-ghat-varanasi":"Manikarnika_Ghat","sarnath-varanasi":"Sarnath",
  "ramnagar-fort-varanasi":"Ramnagar_Fort","banaras-hindu-university-varanasi":"Banaras_Hindu_University",
  # Tokyo
  "senso-ji-tokyo":"Sensō-ji","meiji-shrine-tokyo":"Meiji_Shrine","tokyo-skytree":"Tokyo_Skytree",
  "shibuya-crossing-tokyo":"Shibuya_Crossing","tokyo-tower":"Tokyo_Tower","ueno-park-tokyo":"Ueno_Park",
  "shinjuku-gyoen-tokyo":"Shinjuku_Gyoen_National_Garden","akihabara-tokyo":"Akihabara",
  "harajuku-takeshita-tokyo":"Takeshita_Street","golden-gai-tokyo":"Golden_Gai","omoide-yokocho-tokyo":"Omoide_Yokocho",
  "the-imperial-palace-tokyo":"Tokyo_Imperial_Palace","tsukiji-outer-market-tokyo":"Tsukiji_fish_market",
  # Osaka
  "osaka-castle":"Osaka_Castle","dotonbori-osaka":"Dōtonbori","shitennoji-osaka":"Shitennō-ji",
  "sumiyoshi-taisha-osaka":"Sumiyoshi-taisha","umeda-sky-building-osaka":"Umeda_Sky_Building",
  "shinsekai-tsutenkaku-osaka":"Tsūtenkaku","namba-yasaka-shrine-osaka":"Namba_Yasaka_Shrine",
  "namba-parks-osaka":"Namba_Parks","amerikamura-osaka":"Amerikamura",
  # Nara
  "todai-ji-nara":"Tōdai-ji","nara-park-deer":"Nara_Park","kasuga-taisha-nara":"Kasuga-taisha",
  "kofuku-ji-nara":"Kōfuku-ji","isuien-garden-nara":"Isuien","mount-wakakusa-nara":"Mount_Wakakusa",
  "kasuga-primeval-forest-nara":"Kasugayama_Primeval_Forest",
  # Busan
  "haeundae-beach-busan":"Haeundae_Beach","gamcheon-culture-village-busan":"Gamcheon_Culture_Village",
  "haedong-yonggungsa-busan":"Haedong_Yonggungsa","gwangalli-beach-busan":"Gwangalli_Beach",
  "jagalchi-market-busan":"Jagalchi_Market","beomeosa-temple-busan":"Beomeosa","taejongdae-busan":"Taejongdae",
  "oryukdo-skywalk-busan":"Oryukdo","busan-cinema-center":"Busan_Cinema_Center",
  # Jeju
  "seongsan-ilchulbong-jeju":"Seongsan_Ilchulbong","hallasan-jeju":"Hallasan","manjanggul-cave-jeju":"Manjanggul",
  "cheonjeyeon-falls-jeju":"Cheonjeyeon_Falls","jusangjeolli-cliffs-jeju":"Jusangjeolli","udo-island-jeju":"Udo_(island)",
  "jeongbang-falls-jeju":"Jeongbang_Falls","seopjikoji-jeju":"Seopjikoji","jeju-olle-trail":"Jeju_Olle_Trail",
  # Gyeongju
  "bulguksa-gyeongju":"Bulguksa","seokguram-gyeongju":"Seokguram","donggung-wolji-gyeongju":"Donggung_Palace_and_Wolji_Pond",
  "cheomseongdae-gyeongju":"Cheomseongdae","gyeongju-national-museum":"Gyeongju_National_Museum",
  "yangdong-village-gyeongju":"Yangdong_Folk_Village","bunhwangsa-gyeongju":"Bunhwangsa",
}

# slug -> search query for ones likely missing a clean article lead image
SEARCH = {
  "johari-bazaar-jaipur":"Johari Bazaar Jaipur","ambrai-ghat-udaipur":"Ambrai Ghat Udaipur",
  "huinnyeoul-village-busan":"Huinnyeoul Culture Village","songdo-skywalk-busan":"Songdo Beach Busan",
  "hyeopjae-beach-jeju":"Hyeopjae Beach Jeju","osulloc-tea-museum-jeju":"Osulloc Tea Museum",
  "hamdeok-beach-jeju":"Hamdeok Beach Jeju","daereungwon-gyeongju":"Daereungwon Cheonmachong tomb",
  "woljeonggyo-bridge-gyeongju":"Woljeonggyo bridge Gyeongju","bomun-lake-gyeongju":"Bomun Lake Gyeongju",
}

def widen(u, w=1280):
    m = re.search(r"/(\d+)px-", u); return u.replace(m.group(0), f"/{w}px-") if m else u
def query_img(title):
    url=("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages"
         "&piprop=thumbnail|original&pithumbsize=1280&titles="+urllib.parse.quote(title))
    d=json.loads(urllib.request.urlopen(urllib.request.Request(url,headers=H),timeout=20).read())
    for p in d.get("query",{}).get("pages",{}).values():
        t=(p.get("thumbnail") or {}).get("source"); o=(p.get("original") or {}).get("source")
        if t: return t
        if o and not o.lower().endswith(".svg"): return widen(o)
    return None
def search_img(q):
    url=("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srnamespace=0&srlimit=1&srsearch="+urllib.parse.quote(q))
    d=json.loads(urllib.request.urlopen(urllib.request.Request(url,headers=H),timeout=20).read())
    hits=d.get("query",{}).get("search",[])
    if not hits: return None,None
    return hits[0]["title"], query_img(hits[0]["title"])

allmap = dict(LANDMARKS)
ok=0; failed=[]
for slug in list(LANDMARKS) + list(SEARCH):
    dest=os.path.join(SPOTS,f"{slug}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest)>5000:
        print(f"  SKIP {slug}"); ok+=1; continue
    try:
        if slug in LANDMARKS:
            u=query_img(LANDMARKS[slug]); used=LANDMARKS[slug]
            if not u and slug in SEARCH: used,u=search_img(SEARCH[slug])
            if not u: used,u=search_img(LANDMARKS[slug].replace("_"," "))
        else:
            used,u=search_img(SEARCH[slug])
        if not u: raise ValueError("no image")
        img=urllib.request.urlopen(urllib.request.Request(widen(u),headers=H),timeout=30).read()
        if len(img)<5000: raise ValueError("too small")
        open(dest,"wb").write(img); ok+=1
        print(f"  OK  {slug} <- {used} ({len(img)//1024} KB)"); time.sleep(0.25)
    except Exception as e:
        failed.append((slug,str(e))); print(f"  FAIL {slug}: {e}")
print(f"\nDone: {ok} ok, {len(failed)} failed")
for s,e in failed: print(f"  FAILED {s}: {e}")
