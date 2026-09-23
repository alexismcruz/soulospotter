# SouloSpotter content backlog

_Generated 2026-09-23 by `node scripts/content-audit.js`. Do not edit by hand — re-run it. Log finished work in `scripts/content-done.json`._

## How to enrich (rules)
- Use **first-party facts** only: the venue's own website, the park/tourism-board site, the operator's contact page. Cite the source in the script header, like `scripts/add-simien-accommodation.js`.
- **Never mass-generate** descriptions/claims about specific businesses (hours, menus, prices, awards). If it can't be verified, leave it out or ask Alexis.
- Every enriched spot needs: a real `website` **or** `googleMapsUrl`, a real `address`, and a description over ~250 chars from verified facts. No placeholder links.
- Also check the searched intent (solo dining / going out alone / cafes to meet people) — see `project_soulospotter_seo_baseline` memory.

## Where we stand
- Published cities: **321** · spots: **2658**
- Spots with description under 150 chars: **689** (26%)
- Spots with **no website and no Maps link** (nothing to click): **634** (24%)
- Spots with a generic/missing address: **530** (20%)
- Cities with fewer than 3 accommodation spots: **269** · cities with no solo tips: **36**
- Cities marked done: simien-mountains (2026-09-21), osaka (2026-09-22), guilin (2026-09-23), (site-wide, COWORKING category) (2026-09-23), (13 cities, CAFE category) (2026-09-23), (13 cities, ACCOMMODATION category) (2026-09-23), (site-wide, all categories) + (13 cities, FOOD/NATURE/CULTURE) (2026-09-23), seoul (2026-09-23), kyoto (2026-09-23), rishikesh (2026-09-23), kathmandu (2026-09-23), tokyo (2026-09-23), jaipur (2026-09-23), udaipur (2026-09-23)

## Top 40 cities to enrich next (re-run with --gsc for demand weighting)

| # | City | Country | Spots | Avg desc | Thin desc | No link | Generic addr | Accom (no site) | Solo tips | GSC impr | Score |
|--:|---|---|--:|--:|--:|--:|--:|--:|:-:|--:|--:|
| 1 | Hong Kong | Hong Kong | 45 | 266 | 0 | 19 | 0 | 12 (2) | ✓ | – | 31 |
| 2 | Jeju | South Korea | 18 | 104 | 18 | 0 | 18 | 3 (3) | ✓ | – | 30 |
| 3 | Busan | South Korea | 18 | 104 | 18 | 0 | 18 | 3 (3) | ✓ | – | 30 |
| 4 | Gyeongju | South Korea | 18 | 105 | 18 | 0 | 18 | 3 (3) | ✓ | – | 30 |
| 5 | Varanasi | India | 17 | 109 | 17 | 0 | 17 | 3 (3) | ✓ | – | 29 |
| 6 | Nara | Japan | 14 | 104 | 14 | 0 | 14 | 2 (2) | ✓ | – | 26 |
| 7 | Jarabacoa | Dominican Republic | 3 | 106 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 8 | Havana | Cuba | 3 | 111 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 9 | Rincón | Puerto Rico | 3 | 105 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 10 | Santiago de Cuba | Cuba | 3 | 107 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 11 | San Juan | Puerto Rico | 3 | 114 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 12 | Cabarete | Dominican Republic | 3 | 106 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 13 | Cienfuegos | Cuba | 3 | 113 | 3 | 3 | 2 | 1 (1) | ✗ | – | 17 |
| 14 | Samaná | Dominican Republic | 3 | 111 | 3 | 3 | 2 | 1 (1) | ✗ | – | 17 |
| 15 | El Yunque | Puerto Rico | 3 | 103 | 3 | 3 | 2 | 1 (1) | ✗ | – | 17 |
| 16 | Kingston | Jamaica | 3 | 108 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 17 | Las Terrenas | Dominican Republic | 3 | 106 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 18 | Negril | Jamaica | 3 | 112 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 19 | Ponce | Puerto Rico | 3 | 109 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 20 | Port Antonio | Jamaica | 3 | 106 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 21 | Ocho Rios | Jamaica | 3 | 109 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 22 | Viñales | Cuba | 3 | 110 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 23 | Vieques | Puerto Rico | 3 | 112 | 3 | 3 | 2 | 1 (1) | ✗ | – | 17 |
| 24 | Trinidad | Cuba | 3 | 108 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 25 | Blue Mountains | Jamaica | 3 | 115 | 3 | 3 | 3 | 1 (1) | ✗ | – | 17 |
| 26 | Queenstown | New Zealand | 3 | 136 | 3 | 3 | 0 | 1 (1) | ✗ | – | 16 |
| 27 | Santo Domingo | Dominican Republic | 3 | 113 | 3 | 3 | 1 | 1 (1) | ✗ | – | 16 |
| 28 | Bridgetown | Barbados | 3 | 108 | 3 | 3 | 3 | 0 (0) | ✗ | – | 16 |
| 29 | Cap-Haïtien | Haiti | 3 | 91 | 3 | 3 | 2 | 0 (0) | ✗ | – | 16 |
| 30 | Holetown | Barbados | 3 | 113 | 3 | 3 | 2 | 0 (0) | ✗ | – | 16 |
| 31 | Jacmel | Haiti | 3 | 106 | 3 | 3 | 2 | 0 (0) | ✗ | – | 16 |
| 32 | Bathsheba | Barbados | 3 | 110 | 3 | 3 | 2 | 0 (0) | ✗ | – | 16 |
| 33 | Port-au-Prince | Haiti | 3 | 107 | 3 | 3 | 1 | 0 (0) | ✗ | – | 15 |
| 34 | Crown Point | Trinidad and Tobago | 3 | 99 | 3 | 3 | 0 | 0 (0) | ✗ | – | 15 |
| 35 | Port of Spain | Trinidad and Tobago | 3 | 112 | 3 | 3 | 0 | 0 (0) | ✗ | – | 15 |
| 36 | Speyside | Trinidad and Tobago | 3 | 112 | 3 | 3 | 1 | 0 (0) | ✗ | – | 15 |
| 37 | Speightstown | Barbados | 3 | 105 | 3 | 3 | 0 | 0 (0) | ✗ | – | 15 |
| 38 | Labadee | Haiti | 3 | 95 | 3 | 3 | 1 | 0 (0) | ✗ | – | 15 |
| 39 | Oistins | Barbados | 3 | 111 | 3 | 3 | 0 | 0 (0) | ✗ | – | 15 |
| 40 | Maracas Bay | Trinidad and Tobago | 3 | 105 | 3 | 3 | 1 | 0 (0) | ✗ | – | 15 |

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
