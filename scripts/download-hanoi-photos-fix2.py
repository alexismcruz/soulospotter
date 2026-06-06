import urllib.request, os

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "spots")

FIXES = {
    "long-bien-market-hanoi": 1435752,  # bustling market food stalls
}

for slug, pid in FIXES.items():
    out_path = os.path.join(OUT_DIR, slug + ".jpg")
    url = f"https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
        if len(data) < 5000:
            print(f"FAIL  {slug} too small")
            continue
        with open(out_path, "wb") as f:
            f.write(data)
        print(f"OK    {slug} ({len(data)//1024}KB)")
    except Exception as e:
        print(f"FAIL  {slug}: {e}")
