# SouloSpotter content backlog

_Generated 2026-09-23 by `node scripts/content-audit.js`. Do not edit by hand — re-run it. Log finished work in `scripts/content-done.json`._

## How to enrich (rules)
- Use **first-party facts** only: the venue's own website, the park/tourism-board site, the operator's contact page. Cite the source in the script header, like `scripts/add-simien-accommodation.js`.
- **Never mass-generate** descriptions/claims about specific businesses (hours, menus, prices, awards). If it can't be verified, leave it out or ask Alexis.
- Every enriched spot needs: a real `website` **or** `googleMapsUrl`, a real `address`, and a description over ~250 chars from verified facts. No placeholder links.
- Also check the searched intent (solo dining / going out alone / cafes to meet people) — see `project_soulospotter_seo_baseline` memory.

## Where we stand
- Published cities: **321** · spots: **2644**
- Spots with description under 150 chars: **580** (22%)
- Spots with **no website and no Maps link** (nothing to click): **591** (22%)
- Spots with a generic/missing address: **425** (16%)
- Cities with fewer than 3 accommodation spots: **271** · cities with no solo tips: **36**
- Cities marked done: simien-mountains (2026-09-21), osaka (2026-09-22), guilin (2026-09-23), (site-wide, COWORKING category) (2026-09-23), (13 cities, CAFE category) (2026-09-23), (13 cities, ACCOMMODATION category) (2026-09-23), (site-wide, all categories) + (13 cities, FOOD/NATURE/CULTURE) (2026-09-23), seoul (2026-09-23), kyoto (2026-09-23), rishikesh (2026-09-23), kathmandu (2026-09-23), tokyo (2026-09-23), jaipur (2026-09-23), udaipur (2026-09-23), hong-kong (2026-09-23), jeju (2026-09-23), busan (2026-09-23), gyeongju (2026-09-23), varanasi (2026-09-23), nara (2026-09-23), great-zimbabwe (2026-09-23), victoria-falls (2026-09-23), panajachel (2026-09-23), luxor (2026-09-23), jinja (2026-09-23), accra (2026-09-23), maputo (2026-09-23), queenstown (2026-09-23)

## Top 40 cities to enrich next (re-run with --gsc for demand weighting)

| # | City | Country | Spots | Avg desc | Thin desc | No link | Generic addr | Accom (no site) | Solo tips | GSC impr | Score |
|--:|---|---|--:|--:|--:|--:|--:|--:|:-:|--:|--:|
| 1 | Jarabacoa | Dominican Republic | 3 | 106 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 2 | Havana | Cuba | 3 | 111 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 3 | Rincón | Puerto Rico | 3 | 105 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 4 | Santiago de Cuba | Cuba | 3 | 107 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 5 | San Juan | Puerto Rico | 3 | 114 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 6 | Cabarete | Dominican Republic | 3 | 106 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 7 | Cienfuegos | Cuba | 3 | 113 | 3 | 3 | 2 | 1 (1) | ✗ | – | 17 |
| 8 | Samaná | Dominican Republic | 3 | 111 | 3 | 3 | 2 | 1 (1) | ✗ | – | 17 |
| 9 | El Yunque | Puerto Rico | 3 | 103 | 3 | 3 | 2 | 1 (1) | ✗ | – | 17 |
| 10 | Kingston | Jamaica | 3 | 108 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 11 | Las Terrenas | Dominican Republic | 3 | 106 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 12 | Negril | Jamaica | 3 | 112 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 13 | Ponce | Puerto Rico | 3 | 109 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 14 | Port Antonio | Jamaica | 3 | 106 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 15 | Ocho Rios | Jamaica | 3 | 109 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 16 | Viñales | Cuba | 3 | 110 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 17 | Vieques | Puerto Rico | 3 | 112 | 3 | 3 | 2 | 1 (1) | ✗ | – | 17 |
| 18 | Trinidad | Cuba | 3 | 108 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 19 | Blue Mountains | Jamaica | 3 | 115 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 20 | Santo Domingo | Dominican Republic | 3 | 113 | 3 | 3 | 1 | 1 (1) | ✗ | – | 16 |
| 21 | Bridgetown | Barbados | 3 | 108 | 3 | 3 | 3 | 0 (0) | ✗ | – | 16 |
| 22 | Cap-Haïtien | Haiti | 3 | 91 | 3 | 3 | 2 | 0 (0) | ✗ | – | 16 |
| 23 | Holetown | Barbados | 3 | 113 | 3 | 3 | 2 | 0 (0) | ✗ | – | 16 |
| 24 | Jacmel | Haiti | 3 | 106 | 3 | 3 | 2 | 0 (0) | ✗ | – | 16 |
| 25 | Bathsheba | Barbados | 3 | 110 | 3 | 3 | 2 | 0 (0) | ✗ | – | 16 |
| 26 | Port-au-Prince | Haiti | 3 | 107 | 3 | 3 | 1 | 0 (0) | ✗ | – | 15 |
| 27 | Crown Point | Trinidad and Tobago | 3 | 99 | 3 | 3 | 0 | 0 (0) | ✗ | – | 15 |
| 28 | Port of Spain | Trinidad and Tobago | 3 | 112 | 3 | 3 | 0 | 0 (0) | ✗ | – | 15 |
| 29 | Speyside | Trinidad and Tobago | 3 | 112 | 3 | 3 | 1 | 0 (0) | ✗ | – | 15 |
| 30 | Speightstown | Barbados | 3 | 105 | 3 | 3 | 0 | 0 (0) | ✗ | – | 15 |
| 31 | Labadee | Haiti | 3 | 95 | 3 | 3 | 1 | 0 (0) | ✗ | – | 15 |
| 32 | Oistins | Barbados | 3 | 111 | 3 | 3 | 0 | 0 (0) | ✗ | – | 15 |
| 33 | Maracas Bay | Trinidad and Tobago | 3 | 105 | 3 | 3 | 1 | 0 (0) | ✗ | – | 15 |
| 34 | Pétion-Ville | Haiti | 3 | 99 | 3 | 3 | 1 | 0 (0) | ✗ | – | 15 |
| 35 | Asa Wright | Trinidad and Tobago | 3 | 106 | 3 | 3 | 0 | 0 (0) | ✗ | – | 15 |
| 36 | Ambergris Caye | Belize | 3 | 121 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 37 | Santa Marta | Colombia | 3 | 132 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 38 | Gondar | Ethiopia | 3 | 109 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 39 | Mombasa | Kenya | 3 | 111 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 40 | Paysandú | Uruguay | 3 | 123 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |

## Accommodation gaps (fewer than 3 listings — the Simien Mountains problem)

- **Bridgetown**, Barbados: 0 accommodation listing(s)
- **Cap-Haïtien**, Haiti: 0 accommodation listing(s)
- **Holetown**, Barbados: 0 accommodation listing(s)
- **Jacmel**, Haiti: 0 accommodation listing(s)
- **Bathsheba**, Barbados: 0 accommodation listing(s)
- **Port-au-Prince**, Haiti: 0 accommodation listing(s)
- **Crown Point**, Trinidad and Tobago: 0 accommodation listing(s)
- **Port of Spain**, Trinidad and Tobago: 0 accommodation listing(s)
- **Speyside**, Trinidad and Tobago: 0 accommodation listing(s)
- **Speightstown**, Barbados: 0 accommodation listing(s)
- **Labadee**, Haiti: 0 accommodation listing(s)
- **Oistins**, Barbados: 0 accommodation listing(s)
- **Maracas Bay**, Trinidad and Tobago: 0 accommodation listing(s)
- **Pétion-Ville**, Haiti: 0 accommodation listing(s)
- **Asa Wright**, Trinidad and Tobago: 0 accommodation listing(s)
- **Zagreb**, Croatia: 0 accommodation listing(s)
- **Mexico City**, Mexico: 0 accommodation listing(s)
- **New Mexico**, United States: 0 accommodation listing(s)
- **San Francisco**, United States: 0 accommodation listing(s)
- **Quebec City**, Canada: 0 accommodation listing(s)
- **Split**, Croatia: 0 accommodation listing(s)
- **Nashville**, United States: 0 accommodation listing(s)
- **New Orleans**, United States: 0 accommodation listing(s)
- **Vancouver**, Canada: 0 accommodation listing(s)
- **Banff**, Canada: 0 accommodation listing(s)
- **Toronto**, Canada: 0 accommodation listing(s)
- **Montreal**, Canada: 0 accommodation listing(s)
- **Medellín**, Colombia: 0 accommodation listing(s)
- **Tbilisi**, Georgia: 0 accommodation listing(s)
- **Novi Sad**, Serbia: 0 accommodation listing(s)

## Countries without a full country guide

_(guides are the best pages for 'solo travel <country>' searches; see `src/lib/guideContent.ts`)_

- United States — 6 cities, 18 spots
- Brazil — 6 cities, 18 spots
- Belize — 5 cities, 15 spots
- Paraguay — 5 cities, 15 spots
- Dominican Republic — 5 cities, 15 spots
- Ecuador — 5 cities, 15 spots
- Argentina — 5 cities, 21 spots
- Ethiopia — 5 cities, 20 spots
- Egypt — 5 cities, 15 spots
- Kenya — 5 cities, 15 spots
- Costa Rica — 5 cities, 15 spots
- Uruguay — 5 cities, 15 spots
- Uganda — 5 cities, 15 spots
- Cuba — 5 cities, 15 spots
- Puerto Rico — 5 cities, 15 spots
- Guatemala — 5 cities, 17 spots
- Nicaragua — 5 cities, 15 spots
- Peru — 5 cities, 19 spots
- Honduras — 5 cities, 15 spots
- Panama — 5 cities, 16 spots
- El Salvador — 5 cities, 15 spots
- Canada — 5 cities, 15 spots
- Bolivia — 5 cities, 15 spots
- Venezuela — 5 cities, 15 spots
- Chile — 5 cities, 15 spots
- Senegal — 5 cities, 15 spots
- Botswana — 5 cities, 15 spots
- Namibia — 5 cities, 15 spots
- Tanzania — 5 cities, 15 spots
- Morocco — 5 cities, 60 spots
