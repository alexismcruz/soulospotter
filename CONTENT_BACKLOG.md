# SouloSpotter content backlog

_Generated 2026-09-25 by `node scripts/content-audit.js`. Do not edit by hand — re-run it. Log finished work in `scripts/content-done.json`._

## How to enrich (rules)
- Use **first-party facts** only: the venue's own website, the park/tourism-board site, the operator's contact page. Cite the source in the script header, like `scripts/add-simien-accommodation.js`.
- **Never mass-generate** descriptions/claims about specific businesses (hours, menus, prices, awards). If it can't be verified, leave it out or ask Alexis.
- Every enriched spot needs: a real `website` **or** `googleMapsUrl`, a real `address`, and a description over ~250 chars from verified facts. No placeholder links.
- Also check the searched intent (solo dining / going out alone / cafes to meet people) — see `project_soulospotter_seo_baseline` memory.

## Where we stand
- Published cities: **321** · spots: **2638**
- Spots with description under 150 chars: **460** (17%)
- Spots with **no website and no Maps link** (nothing to click): **471** (18%)
- Spots with a generic/missing address: **339** (13%)
- Cities with fewer than 3 accommodation spots: **271** · cities with no solo tips: **36**
- Cities marked done: simien-mountains (2026-09-21), osaka (2026-09-22), guilin (2026-09-23), (site-wide, COWORKING category) (2026-09-23), (13 cities, CAFE category) (2026-09-23), (13 cities, ACCOMMODATION category) (2026-09-23), (site-wide, all categories) + (13 cities, FOOD/NATURE/CULTURE) (2026-09-23), seoul (2026-09-23), kyoto (2026-09-23), rishikesh (2026-09-23), kathmandu (2026-09-23), tokyo (2026-09-23), jaipur (2026-09-23), udaipur (2026-09-23), hong-kong (2026-09-23), jeju (2026-09-23), busan (2026-09-23), gyeongju (2026-09-23), varanasi (2026-09-23), nara (2026-09-23), great-zimbabwe (2026-09-23), victoria-falls (2026-09-23), panajachel (2026-09-23), luxor (2026-09-23), jinja (2026-09-23), accra (2026-09-23), maputo (2026-09-23), queenstown (2026-09-23), boquete (2026-09-25), el-tunco (2026-09-25), dakar (2026-09-25), las-terrenas (2026-09-25), maun (2026-09-25), musanze (2026-09-25), managua (2026-09-25), kigali (2026-09-25), el-yunque (2026-09-25), jarabacoa (2026-09-25), santo-domingo (2026-09-25), quetzaltenango (2026-09-25), ponce (2026-09-25), maracas-bay (2026-09-25), port-of-spain (2026-09-25), cienfuegos (2026-09-25), havana (2026-09-25), rincon (2026-09-25), santiago-de-cuba (2026-09-25), san-juan (2026-09-25), cabarete (2026-09-25), samana (2026-09-25), kingston (2026-09-25), negril (2026-09-25), port-antonio (2026-09-25), ocho-rios (2026-09-25), vinales (2026-09-25), vieques (2026-09-25), trinidad-cuba (2026-09-25), blue-mountains (2026-09-25), bridgetown (2026-09-25), cap-haitien (2026-09-25), holetown (2026-09-25), jacmel (2026-09-25), bathsheba (2026-09-25), port-au-prince (2026-09-25), crown-point (2026-09-25), speyside-tobago (2026-09-25), speightstown (2026-09-25), labadee (2026-09-25)

## Top 40 cities to enrich next (re-run with --gsc for demand weighting)

| # | City | Country | Spots | Avg desc | Thin desc | No link | Generic addr | Accom (no site) | Solo tips | GSC impr | Score |
|--:|---|---|--:|--:|--:|--:|--:|--:|:-:|--:|--:|
| 1 | Oistins | Barbados | 3 | 111 | 3 | 3 | 0 | 0 (0) | ✗ | – | 15 |
| 2 | Pétion-Ville | Haiti | 3 | 99 | 3 | 3 | 1 | 0 (0) | ✗ | – | 15 |
| 3 | Asa Wright | Trinidad and Tobago | 3 | 106 | 3 | 3 | 0 | 0 (0) | ✗ | – | 15 |
| 4 | Ambergris Caye | Belize | 3 | 121 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 5 | Santa Marta | Colombia | 3 | 132 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 6 | Gondar | Ethiopia | 3 | 109 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 7 | Mombasa | Kenya | 3 | 111 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 8 | Paysandú | Uruguay | 3 | 123 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 9 | San Bernardino | Paraguay | 3 | 122 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 10 | Cabo Polonio | Uruguay | 3 | 131 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 11 | Puerto Escondido | Mexico | 3 | 117 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 12 | Guadalajara | Mexico | 3 | 120 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 13 | Utila | Honduras | 3 | 116 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 14 | Tulum | Mexico | 3 | 120 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 15 | León | Nicaragua | 3 | 119 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 16 | San Juan del Sur | Nicaragua | 3 | 112 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 17 | Santa Ana | El Salvador | 3 | 115 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 18 | Copán Ruinas | Honduras | 3 | 115 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 19 | Santa Catalina | Panama | 3 | 122 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 20 | Areguá | Paraguay | 3 | 121 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 21 | San Ignacio | Belize | 3 | 123 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 22 | Choroni | Venezuela | 3 | 120 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 23 | Morrocoy | Venezuela | 3 | 114 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 24 | Mérida | Venezuela | 3 | 122 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 25 | Manuel Antonio | Costa Rica | 3 | 121 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 26 | San Gil | Colombia | 3 | 125 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 27 | Flores | Guatemala | 3 | 116 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 28 | Puerto Ayora | Ecuador | 3 | 137 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 29 | Semuc Champey | Guatemala | 3 | 120 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 30 | Suchitoto | El Salvador | 3 | 123 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 31 | Montañita | Ecuador | 3 | 129 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 32 | Canaima | Venezuela | 3 | 126 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 33 | Roraima | Venezuela | 3 | 126 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 34 | Concepción | Paraguay | 3 | 124 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 35 | La Ceiba | Honduras | 3 | 121 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 36 | Ometepe | Nicaragua | 3 | 119 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 37 | Roatán | Honduras | 3 | 121 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 38 | Hopkins | Belize | 3 | 119 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 39 | Nata | Botswana | 3 | 116 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 40 | Placencia | Belize | 3 | 122 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |

## Accommodation gaps (fewer than 3 listings — the Simien Mountains problem)

- **Oistins**, Barbados: 0 accommodation listing(s)
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
- **Ambergris Caye**, Belize: 1 accommodation listing(s)
- **Santa Marta**, Colombia: 1 accommodation listing(s)
- **Gondar**, Ethiopia: 1 accommodation listing(s)
- **Mombasa**, Kenya: 1 accommodation listing(s)
- **Paysandú**, Uruguay: 1 accommodation listing(s)
- **San Bernardino**, Paraguay: 1 accommodation listing(s)
- **Cabo Polonio**, Uruguay: 1 accommodation listing(s)
- **Puerto Escondido**, Mexico: 1 accommodation listing(s)
- **Guadalajara**, Mexico: 1 accommodation listing(s)
- **Utila**, Honduras: 1 accommodation listing(s)
- **Tulum**, Mexico: 1 accommodation listing(s)
- **León**, Nicaragua: 1 accommodation listing(s)

## Countries without a full country guide

_(guides are the best pages for 'solo travel <country>' searches; see `src/lib/guideContent.ts`)_

- United States — 6 cities, 18 spots
- Brazil — 6 cities, 18 spots
- Belize — 5 cities, 15 spots
- Paraguay — 5 cities, 15 spots
- Dominican Republic — 5 cities, 14 spots
- Ecuador — 5 cities, 15 spots
- Argentina — 5 cities, 21 spots
- Ethiopia — 5 cities, 20 spots
- Egypt — 5 cities, 15 spots
- Kenya — 5 cities, 15 spots
- Costa Rica — 5 cities, 15 spots
- Uruguay — 5 cities, 15 spots
- Uganda — 5 cities, 15 spots
- Cuba — 5 cities, 14 spots
- Puerto Rico — 5 cities, 15 spots
- Guatemala — 5 cities, 17 spots
- Nicaragua — 5 cities, 15 spots
- Peru — 5 cities, 19 spots
- Honduras — 5 cities, 15 spots
- Panama — 5 cities, 16 spots
- El Salvador — 5 cities, 14 spots
- Canada — 5 cities, 15 spots
- Bolivia — 5 cities, 15 spots
- Venezuela — 5 cities, 15 spots
- Chile — 5 cities, 15 spots
- Senegal — 5 cities, 15 spots
- Botswana — 5 cities, 15 spots
- Namibia — 5 cities, 15 spots
- Tanzania — 5 cities, 15 spots
- Morocco — 5 cities, 60 spots
