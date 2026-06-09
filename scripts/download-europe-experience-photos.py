"""
Download / copy photos for the 75 Europe experiences.

  activity:<key>  → download from Unsplash (verified photo IDs in europe-experiences-data.js)
  landmark:<slug> → copy from public/spots/<slug>.jpg  (real Wikipedia landmark photos)

Output: public/experiences/<experience-slug>.jpg

Run from the project root:
  python scripts/download-europe-experience-photos.py
"""

import os, re, shutil, time, urllib.request, sys

sys.stdout.reconfigure(encoding="utf-8")

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
SPOTS_DIR    = os.path.join(PROJECT_ROOT, "public", "spots")
OUT_DIR      = os.path.join(PROJECT_ROOT, "public", "experiences")
os.makedirs(OUT_DIR, exist_ok=True)

data_path = os.path.join(SCRIPT_DIR, "europe-experiences-data.js")

# ── Parse ACTIVITY_PHOTOS ─────────────────────────────────────────────────────
activity_photos = {}
with open(data_path, encoding="utf-8") as f:
    in_block = False
    for line in f:
        if "const ACTIVITY_PHOTOS" in line:
            in_block = True
        if in_block:
            m = re.search(r'"?(\w+)"?\s*:\s*"([^"]+)"', line)
            if m:
                activity_photos[m.group(1)] = m.group(2)
            if in_block and "};" in line:
                break
print(f"Loaded {len(activity_photos)} activity photo IDs")

# ── Parse EXPERIENCES list ────────────────────────────────────────────────────
with open(data_path, encoding="utf-8") as f:
    content = f.read()

experiences = []
for m in re.finditer(r'E\("[^"]+",\s*"([^"]+)",\s*"[^"]+",\s*"[^"]+",\s*"([^"]+)"', content):
    experiences.append((m.group(1), m.group(2)))
print(f"Found {len(experiences)} experiences\n")

UA = "Mozilla/5.0 SouloSpotter-bot/1.0 (+https://soulospotter.com)"

def download_unsplash(photo_id, dest):
    url = f"https://images.unsplash.com/photo-{photo_id}?w=1280&q=85&auto=format&fit=crop"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=20) as r, open(dest, "wb") as f:
            f.write(r.read())
        return os.path.getsize(dest) > 5000
    except Exception as e:
        print(f"    x Unsplash error: {e}")
        return False

ok = skipped = failed = 0
fail_list = []

for slug, img in experiences:
    dest = os.path.join(OUT_DIR, f"{slug}.jpg")

    if os.path.exists(dest) and os.path.getsize(dest) > 5000:
        print(f"  skip  {slug}")
        skipped += 1
        continue

    if img.startswith("activity:"):
        key = img[len("activity:"):]
        photo_id = activity_photos.get(key)
        if not photo_id:
            print(f"  x unknown activity key '{key}' for {slug}")
            failed += 1; fail_list.append(slug); continue
        print(f"  dl    {slug}  [unsplash:{key}]")
        if download_unsplash(photo_id, dest):
            ok += 1
        else:
            failed += 1; fail_list.append(slug)
        time.sleep(0.4)

    elif img.startswith("landmark:"):
        spot_slug = img[len("landmark:"):]
        src = os.path.join(SPOTS_DIR, f"{spot_slug}.jpg")
        if not os.path.exists(src):
            print(f"  x spot photo not found: {src}")
            failed += 1; fail_list.append(slug); continue
        shutil.copy2(src, dest)
        print(f"  copy  {slug}  [spot:{spot_slug}]")
        ok += 1

    else:
        print(f"  x unknown img format '{img}' for {slug}")
        failed += 1; fail_list.append(slug)

print(f"\nDone: {ok} ok, {skipped} skipped, {failed} failed.")
if fail_list:
    print("FAILED:", ", ".join(fail_list))
