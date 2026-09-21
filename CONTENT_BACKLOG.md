# SouloSpotter content backlog

_Generated 2026-09-21 by `node scripts/content-audit.js --gsc <Pages.csv>`. Do not edit by hand — re-run it. Log finished work in `scripts/content-done.json`._

## How to enrich (rules)
- Use **first-party facts** only: the venue's own website, the park/tourism-board site, the operator's contact page. Cite the source in the script header, like `scripts/add-simien-accommodation.js`.
- **Never mass-generate** descriptions/claims about specific businesses (hours, menus, prices, awards). If it can't be verified, leave it out or ask Alexis.
- Every enriched spot needs: a real `website` **or** `googleMapsUrl`, a real `address`, and a description over ~250 chars from verified facts. No placeholder links.
- Also check the searched intent (solo dining / going out alone / cafes to meet people) — see `project_soulospotter_seo_baseline` memory.

## Where we stand
- Published cities: **321** · spots: **2811**
- Spots with description under 150 chars: **872** (31%)
- Spots with **no website and no Maps link** (nothing to click): **678** (24%)
- Spots with a generic/missing address: **627** (22%)
- Cities with fewer than 3 accommodation spots: **269** · cities with no solo tips: **36**
- Cities marked done: simien-mountains (2026-09-21)

## Top 40 cities to enrich next (weighted by Search Console impressions)

| # | City | Country | Spots | Avg desc | Thin desc | No link | Generic addr | Accom (no site) | Solo tips | GSC impr | Score |
|--:|---|---|--:|--:|--:|--:|--:|--:|:-:|--:|--:|
| 1 | Guilin | China | 45 | 174 | 0 | 39 | 2 | 12 (8) | ✓ | 558 | 253 |
| 2 | Kyoto | Japan | 46 | 137 | 40 | 0 | 2 | 5 (0) | ✓ | 1204 | 167 |
| 3 | Seoul | South Korea | 36 | 134 | 34 | 3 | 0 | 4 (3) | ✓ | 865 | 163 |
| 4 | Kathmandu | Nepal | 25 | 131 | 23 | 3 | 12 | 4 (0) | ✓ | 761 | 130 |
| 5 | Tokyo | Japan | 20 | 105 | 20 | 0 | 20 | 3 (3) | ✓ | 340 | 117 |
| 6 | Rishikesh | India | 26 | 124 | 26 | 3 | 6 | 4 (2) | ✓ | 159 | 114 |
| 7 | Osaka | Japan | 18 | 105 | 18 | 0 | 18 | 3 (3) | ✓ | 434 | 109 |
| 8 | Udaipur | India | 19 | 104 | 19 | 0 | 19 | 3 (3) | ✓ | 241 | 107 |
| 9 | Hong Kong | Hong Kong | 45 | 266 | 0 | 20 | 0 | 12 (2) | ✓ | 150 | 102 |
| 10 | Busan | South Korea | 18 | 104 | 18 | 0 | 18 | 3 (3) | ✓ | 166 | 97 |
| 11 | Jaipur | India | 20 | 114 | 19 | 0 | 20 | 3 (3) | ✓ | 100 | 96 |
| 12 | Jeju | South Korea | 18 | 104 | 18 | 0 | 18 | 3 (3) | ✓ | 132 | 94 |
| 13 | Varanasi | India | 17 | 109 | 17 | 0 | 17 | 3 (3) | ✓ | 135 | 89 |
| 14 | Gyeongju | South Korea | 18 | 105 | 18 | 0 | 18 | 3 (3) | ✓ | 79 | 87 |
| 15 | Nara | Japan | 14 | 104 | 14 | 0 | 14 | 2 (2) | ✓ | 76 | 75 |
| 16 | Las Terrenas | Dominican Republic | 3 | 106 | 3 | 3 | 3 | 1 (1) | ✗ | 190 | 56 |
| 17 | Queenstown | New Zealand | 3 | 136 | 3 | 3 | 0 | 1 (1) | ✗ | 222 | 52 |
| 18 | Jarabacoa | Dominican Republic | 3 | 106 | 3 | 3 | 3 | 1 (1) | ✗ | 120 | 52 |
| 19 | El Yunque | Puerto Rico | 3 | 103 | 3 | 3 | 2 | 1 (1) | ✗ | 122 | 51 |
| 20 | Ponce | Puerto Rico | 3 | 109 | 3 | 3 | 3 | 1 (1) | ✗ | 95 | 51 |
| 21 | Great Zimbabwe | Zimbabwe | 3 | 117 | 3 | 3 | 3 | 1 (1) | ✓ | 708 | 50 |
| 22 | Santo Domingo | Dominican Republic | 3 | 113 | 3 | 3 | 1 | 1 (1) | ✗ | 109 | 49 |
| 23 | Victoria Falls | Zimbabwe | 3 | 119 | 3 | 3 | 3 | 1 (1) | ✓ | 489 | 48 |
| 24 | Luxor | Egypt | 3 | 112 | 3 | 3 | 3 | 1 (1) | ✓ | 274 | 45 |
| 25 | Jinja | Uganda | 3 | 109 | 3 | 3 | 3 | 1 (1) | ✓ | 269 | 45 |
| 26 | Panajachel | Guatemala | 3 | 116 | 3 | 3 | 2 | 1 (1) | ✓ | 398 | 45 |
| 27 | Cienfuegos | Cuba | 3 | 113 | 3 | 3 | 2 | 1 (1) | ✗ | 50 | 45 |
| 28 | Maputo | Mozambique | 3 | 105 | 3 | 3 | 3 | 1 (1) | ✓ | 255 | 44 |
| 29 | Negril | Jamaica | 3 | 112 | 3 | 3 | 3 | 1 (1) | ✗ | 40 | 44 |
| 30 | Maracas Bay | Trinidad and Tobago | 3 | 105 | 3 | 3 | 1 | 0 (0) | ✗ | 82 | 44 |
| 31 | Accra | Ghana | 3 | 112 | 3 | 3 | 3 | 1 (1) | ✓ | 262 | 44 |
| 32 | El Tunco | El Salvador | 3 | 115 | 3 | 3 | 3 | 1 (1) | ✓ | 197 | 43 |
| 33 | Boquete | Panama | 3 | 120 | 3 | 3 | 2 | 1 (1) | ✓ | 209 | 42 |
| 34 | Kingston | Jamaica | 3 | 108 | 3 | 3 | 3 | 1 (1) | ✗ | 27 | 42 |
| 35 | Musanze | Rwanda | 3 | 115 | 3 | 3 | 3 | 1 (1) | ✓ | 164 | 42 |
| 36 | Dakar | Senegal | 3 | 112 | 3 | 3 | 2 | 1 (1) | ✓ | 191 | 41 |
| 37 | Maun | Botswana | 3 | 119 | 3 | 3 | 2 | 1 (1) | ✓ | 177 | 41 |
| 38 | Port of Spain | Trinidad and Tobago | 3 | 112 | 3 | 3 | 0 | 0 (0) | ✗ | 71 | 41 |
| 39 | Kigali | Rwanda | 3 | 111 | 3 | 3 | 3 | 1 (1) | ✓ | 140 | 41 |
| 40 | Quetzaltenango | Guatemala | 3 | 117 | 3 | 3 | 3 | 1 (1) | ✓ | 109 | 40 |

## Accommodation gaps (fewer than 3 listings — the Simien Mountains problem)

- **Berat**, Albania: 1 accommodation listing(s) · 1712 GSC impressions
- **Riga**, Latvia: 2 accommodation listing(s) · 955 GSC impressions
- **Reykjavik**, Iceland: 2 accommodation listing(s) · 892 GSC impressions
- **Oslo**, Norway: 2 accommodation listing(s) · 845 GSC impressions
- **Zurich**, Switzerland: 2 accommodation listing(s) · 754 GSC impressions
- **Great Zimbabwe**, Zimbabwe: 1 accommodation listing(s) · 708 GSC impressions
- **Vilnius**, Lithuania: 2 accommodation listing(s) · 638 GSC impressions
- **Budva**, Montenegro: 1 accommodation listing(s) · 621 GSC impressions
- **Helsinki**, Finland: 2 accommodation listing(s) · 614 GSC impressions
- **Thessaloniki**, Greece: 1 accommodation listing(s) · 528 GSC impressions
- **Sarajevo**, Bosnia and Herzegovina: 1 accommodation listing(s) · 508 GSC impressions
- **Nice**, France: 2 accommodation listing(s) · 507 GSC impressions
- **Victoria Falls**, Zimbabwe: 1 accommodation listing(s) · 489 GSC impressions
- **Panama City**, Panama: 1 accommodation listing(s) · 462 GSC impressions
- **Brussels**, Belgium: 2 accommodation listing(s) · 456 GSC impressions
- **Panajachel**, Guatemala: 1 accommodation listing(s) · 398 GSC impressions
- **Lyon**, France: 2 accommodation listing(s) · 371 GSC impressions
- **Tirana**, Albania: 1 accommodation listing(s) · 368 GSC impressions
- **Aarhus**, Denmark: 1 accommodation listing(s) · 364 GSC impressions
- **Stockholm**, Sweden: 2 accommodation listing(s) · 363 GSC impressions
- **Bled**, Slovenia: 1 accommodation listing(s) · 357 GSC impressions
- **Lucerne**, Switzerland: 2 accommodation listing(s) · 312 GSC impressions
- **Kotor**, Montenegro: 2 accommodation listing(s) · 308 GSC impressions
- **Belgrade**, Serbia: 2 accommodation listing(s) · 305 GSC impressions
- **Berlin**, Germany: 1 accommodation listing(s) · 302 GSC impressions
- **Valletta**, Malta: 1 accommodation listing(s) · 302 GSC impressions
- **Madrid**, Spain: 1 accommodation listing(s) · 296 GSC impressions
- **Sofia**, Bulgaria: 2 accommodation listing(s) · 288 GSC impressions
- **Bergen**, Norway: 2 accommodation listing(s) · 280 GSC impressions
- **Luxor**, Egypt: 1 accommodation listing(s) · 274 GSC impressions

## Countries without a full country guide

_(guides are the best pages for 'solo travel <country>' searches; see `src/lib/guideContent.ts`)_

- Mongolia — 1 cities, 45 spots, 2720 GSC impressions
- China — 3 cities, 135 spots, 2473 GSC impressions
- Denmark — 2 cities, 26 spots, 2288 GSC impressions
- Albania — 2 cities, 11 spots, 2080 GSC impressions
- Ethiopia — 5 cities, 20 spots, 1570 GSC impressions
- Zimbabwe — 5 cities, 15 spots, 1434 GSC impressions
- France — 3 cities, 50 spots, 1386 GSC impressions
- South Korea — 4 cities, 90 spots, 1242 GSC impressions
- Norway — 2 cities, 22 spots, 1125 GSC impressions
- Philippines — 3 cities, 138 spots, 1120 GSC impressions
- Switzerland — 2 cities, 21 spots, 1066 GSC impressions
- Estonia — 2 cities, 24 spots, 959 GSC impressions
- Latvia — 1 cities, 10 spots, 955 GSC impressions
- Montenegro — 2 cities, 12 spots, 929 GSC impressions
- Greece — 3 cities, 36 spots, 919 GSC impressions
- Vietnam — 2 cities, 90 spots, 905 GSC impressions
- Iceland — 1 cities, 10 spots, 892 GSC impressions
- Malaysia — 2 cities, 90 spots, 869 GSC impressions
- Morocco — 5 cities, 60 spots, 792 GSC impressions
- Finland — 2 cities, 20 spots, 778 GSC impressions
- Nepal — 1 cities, 25 spots, 761 GSC impressions
- Panama — 5 cities, 16 spots, 717 GSC impressions
- Lithuania — 1 cities, 9 spots, 638 GSC impressions
- India — 4 cities, 82 spots, 635 GSC impressions
- Netherlands — 3 cities, 44 spots, 626 GSC impressions
- Guatemala — 5 cities, 17 spots, 622 GSC impressions
- Sweden — 2 cities, 21 spots, 615 GSC impressions
- United Kingdom — 3 cities, 39 spots, 611 GSC impressions
- Singapore — 1 cities, 45 spots, 589 GSC impressions
- Czech Republic — 2 cities, 29 spots, 586 GSC impressions
