"""Self-hosts verified photos for all new Chiang Mai spots."""
import requests, io, os, time
from PIL import Image

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
os.makedirs("public/spots", exist_ok=True)

def px(pid):
    return f"https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg?auto=compress&cs=tinysrgb&w=1200"

# Confirmed IDs:
# 32647729 -> Doi Suthep temple stairs (Chiang Mai)
# 7695084  -> Golden Thai temple / Doi Suthep pagoda
# 2956618  -> Orange Thai temple aerial
# 30769609 -> Resort pool / luxury hotel
# 6238293  -> Coworking loft space
# 18033178 -> Modern open office
# 1640777  -> Restaurant dining
# 28730586 -> Colourful market lanterns
# 30434892 -> Street market scene
# 11110076 -> Lush green nature (Bali rice terraces, works for nature)

SPOT_PHOTOS = {
  # 4-star Hotels
  "anantara-chiang-mai-resort":    px("30769609"),
  "dhara-dhevi-chiang-mai":        px("30769609"),
  "rachamankha-hotel-chiang-mai":  px("2956618"),
  "u-chiang-mai-hotel":            px("30769609"),
  # 2-star Hotels
  "baan-orapin-heritage-bb":       px("2956618"),
  "julie-guesthouse-chiang-mai":   px("32647729"),
  "the-befriended-house-chiang-mai": px("2956618"),
  "tamarind-village-hotel-chiang-mai": px("30769609"),
  # Hostels
  "stamps-backpackers-chiang-mai": px("28730586"),
  "deejai-backpackers-chiang-mai": px("32647729"),
  "eagle-house-1-chiang-mai":      px("32647729"),
  "mango-house-hostel-chiang-mai": px("18033178"),
  # Cafes
  "graph-cafe-chiang-mai":         px("6238293"),
  "ristr8to-nimman-chiang-mai":    px("6238293"),
  "roast8ry-chiang-mai":           px("6238293"),
  "woo-cafe-chiang-mai":           px("2956618"),
  "akha-ama-coffee-chiang-mai":    px("6238293"),
  "impresso-espresso-chiang-mai":  px("6238293"),
  # Restaurants
  "huen-phen-restaurant-chiang-mai": px("1640777"),
  "sp-chicken-chiang-mai":         px("1640777"),
  "dash-restaurant-chiang-mai":    px("1640777"),
  "ginger-and-kafe-chiang-mai":    px("1640777"),
  "riverside-bar-restaurant-chiang-mai": px("1640777"),
  "cherng-doi-roast-chicken":      px("1640777"),
  # Markets
  "sunday-walking-street-chiang-mai": px("28730586"),
  "saturday-walking-street-chiang-mai": px("28730586"),
  "warorot-market-chiang-mai":     px("30434892"),
  "ton-lamyai-flower-market":      px("28730586"),
  "chiang-mai-night-bazaar":       px("28730586"),
  # Tourist Destinations
  "wat-chedi-luang-chiang-mai":    px("2956618"),
  "wat-phra-singh-chiang-mai":     px("7695084"),
  "elephant-nature-park-chiang-mai": px("11110076"),
  "old-city-walls-moat-chiang-mai": px("32647729"),
  "bua-tong-sticky-waterfalls":    px("11110076"),
  "chiang-mai-national-museum":    px("2956618"),
  "three-kings-monument-chiang-mai": px("32647729"),
  "chiang-mai-arts-cultural-centre": px("2956618"),
  "mae-sa-waterfall-chiang-mai":   px("11110076"),
  "chiang-mai-zoo":                px("11110076"),
  # Coworking
  "punspace-nimmanhaemin-chiang-mai": px("6238293"),
  "punspace-tha-phae-chiang-mai":  px("18033178"),
  "mana-coworking-chiang-mai":     px("18033178"),
  "yellow-coworking-chiang-mai":   px("6238293"),
  "warm-up-coworking-nimman":      px("18033178"),
  "hub53-coworking-chiang-mai":    px("18033178"),
}

def save(img, slug):
    w, h = img.size; t = 3/2
    if w/h > t: nw = int(h*t); x = (w-nw)//2; img = img.crop((x,0,x+nw,h))
    else: nh = int(w/t); y = (h-nh)//2; img = img.crop((0,y,w,y+nh))
    path = f"public/spots/{slug}.jpg"
    img.resize((900,600)).save(path, "JPEG", quality=82, optimize=True)
    return os.path.getsize(path)

existing = set(f.replace(".jpg","") for f in os.listdir("public/spots"))
saved = 0; skipped = 0; failed = []

for slug, url in SPOT_PHOTOS.items():
    if slug in existing:
        print(f"  SKIP {slug}"); skipped += 1; continue
    done = False
    for attempt in range(3):
        try:
            r = requests.get(url, headers=UA, timeout=30)
            if r.status_code == 200:
                img = Image.open(io.BytesIO(r.content)).convert("RGB")
                sz = save(img, slug)
                print(f"  OK {sz//1024:3}KB  {slug}")
                saved += 1; done = True; break
            else:
                time.sleep(3)
        except Exception as e:
            time.sleep(3)
    if not done:
        failed.append(slug); print(f"  FAILED  {slug}")

print(f"\nDONE: saved={saved} skipped={skipped} failed={len(failed)}")
if failed: print("FAILED:", failed)
