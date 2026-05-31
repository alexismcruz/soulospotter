export const CITY_IMAGES: Record<string, string> = {
  "bali":           "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  "chiang-mai":     "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80",
  "lisbon":         "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80",
  "kyoto":          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
  "tbilisi":        "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&q=80",
  "barcelona":      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  "mexico-city":    "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=600&q=80",
  "medellin":       "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=600&q=80",
  "hoi-an":         "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80",
  "marrakech":      "https://images.unsplash.com/photo-1597212618440-806262de4f2b?w=600&q=80",
  "seoul":          "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&q=80",
  "melbourne":      "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=600&q=80",
  "berlin":         "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=80",
  "rishikesh":      "https://images.unsplash.com/photo-1590123552938-7cc5e66cf5f7?w=600&q=80",
  "kathmandu":      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80",
  "siargao":        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80",
  "new-york-city":  "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
  "portland":       "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
  "rio-de-janeiro": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80",
  "byron-bay":      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  "queenstown":     "https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=80",
};

export const CITY_IMAGE_LG: Record<string, string> = Object.fromEntries(
  Object.entries(CITY_IMAGES).map(([k, v]) => [k, v.replace("w=600", "w=1200").replace("q=80", "q=85")])
);

export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80";
