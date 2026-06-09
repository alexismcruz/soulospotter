"""Photos for the 45 batch-2 Asia experiences. landmark: copies a real /public/spots
photo; activity: downloads a verified Unsplash photo. Out: public/experiences/<slug>.jpg"""
import os, re, shutil, time, urllib.request, sys
sys.stdout.reconfigure(encoding="utf-8")

SCRIPT = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(SCRIPT)
SPOTS = os.path.join(ROOT, "public", "spots")
OUT = os.path.join(ROOT, "public", "experiences")
os.makedirs(OUT, exist_ok=True)
data = os.path.join(SCRIPT, "asia-batch2-experiences-data.js")

activity = {}
with open(data, encoding="utf-8") as f:
    blk = False
    for line in f:
        if "const ACTIVITY_PHOTOS" in line: blk = True
        if blk:
            m = re.search(r'"?(\w+)"?\s*:\s*"([^"]+)"', line)
            if m: activity[m.group(1)] = m.group(2)
            if "};" in line: break

with open(data, encoding="utf-8") as f: content = f.read()
exps = re.findall(r'E\("[^"]+",\s*"([^"]+)",\s*"[^"]+",\s*"[^"]+",\s*"([^"]+)"', content)

UA = "Mozilla/5.0 SouloSpotter-bot/1.0"
ok = skipped = failed = 0
for slug, img in exps:
    dest = os.path.join(OUT, f"{slug}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 5000:
        print(f"  skip {slug}"); skipped += 1; continue
    if img.startswith("activity:"):
        pid = activity.get(img[9:])
        url = f"https://images.unsplash.com/photo-{pid}?w=1280&q=85&auto=format&fit=crop"
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=20) as r, open(dest, "wb") as f:
                f.write(r.read())
            print(f"  dl   {slug} [unsplash:{img[9:]}]"); ok += 1; time.sleep(0.4)
        except Exception as e:
            print(f"  FAIL {slug}: {e}"); failed += 1
    elif img.startswith("landmark:"):
        src = os.path.join(SPOTS, f"{img[9:]}.jpg")
        if os.path.exists(src):
            shutil.copy2(src, dest); print(f"  copy {slug} [spot:{img[9:]}]"); ok += 1
        else:
            print(f"  FAIL {slug}: missing {src}"); failed += 1

print(f"\nDone: {ok} ok, {skipped} skipped, {failed} failed.")
