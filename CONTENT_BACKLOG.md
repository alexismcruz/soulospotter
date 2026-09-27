# SouloSpotter content backlog

_Generated 2026-09-27 by `node scripts/content-audit.js`. Do not edit by hand — re-run it. Log finished work in `scripts/content-done.json`._

## How to enrich (rules)
- Use **first-party facts** only: the venue's own website, the park/tourism-board site, the operator's contact page. Cite the source in the script header, like `scripts/add-simien-accommodation.js`.
- **Never mass-generate** descriptions/claims about specific businesses (hours, menus, prices, awards). If it can't be verified, leave it out or ask Alexis.
- Every enriched spot needs: a real `website` **or** `googleMapsUrl`, a real `address`, and a description over ~250 chars from verified facts. No placeholder links.
- Also check the searched intent (solo dining / going out alone / cafes to meet people) — see `project_soulospotter_seo_baseline` memory.

## Where we stand
- Published cities: **321** · spots: **2620**
- Spots with description under 150 chars: **316** (12%)
- Spots with **no website and no Maps link** (nothing to click): **327** (12%)
- Spots with a generic/missing address: **224** (9%)
- Cities with fewer than 3 accommodation spots: **271** · cities with no solo tips: **36**
- Cities marked done: simien-mountains (2026-09-21), osaka (2026-09-22), guilin (2026-09-23), (site-wide, COWORKING category) (2026-09-23), (13 cities, CAFE category) (2026-09-23), (13 cities, ACCOMMODATION category) (2026-09-23), (site-wide, all categories) + (13 cities, FOOD/NATURE/CULTURE) (2026-09-23), seoul (2026-09-23), kyoto (2026-09-23), rishikesh (2026-09-23), kathmandu (2026-09-23), tokyo (2026-09-23), jaipur (2026-09-23), udaipur (2026-09-23), hong-kong (2026-09-23), jeju (2026-09-23), busan (2026-09-23), gyeongju (2026-09-23), varanasi (2026-09-23), nara (2026-09-23), great-zimbabwe (2026-09-23), victoria-falls (2026-09-23), panajachel (2026-09-23), luxor (2026-09-23), jinja (2026-09-23), accra (2026-09-23), maputo (2026-09-23), queenstown (2026-09-23), boquete (2026-09-25), el-tunco (2026-09-25), dakar (2026-09-25), las-terrenas (2026-09-25), maun (2026-09-25), musanze (2026-09-25), managua (2026-09-25), kigali (2026-09-25), el-yunque (2026-09-25), jarabacoa (2026-09-25), santo-domingo (2026-09-25), quetzaltenango (2026-09-25), ponce (2026-09-25), maracas-bay (2026-09-25), port-of-spain (2026-09-25), cienfuegos (2026-09-25), havana (2026-09-25), rincon (2026-09-25), santiago-de-cuba (2026-09-25), san-juan (2026-09-25), cabarete (2026-09-25), samana (2026-09-25), kingston (2026-09-25), negril (2026-09-25), port-antonio (2026-09-25), ocho-rios (2026-09-25), vinales (2026-09-25), vieques (2026-09-25), trinidad-cuba (2026-09-25), blue-mountains (2026-09-25), bridgetown (2026-09-25), cap-haitien (2026-09-25), holetown (2026-09-25), jacmel (2026-09-25), bathsheba (2026-09-25), port-au-prince (2026-09-25), crown-point (2026-09-25), speyside-tobago (2026-09-25), speightstown (2026-09-25), labadee (2026-09-25), oistins (2026-09-25), petion-ville (2026-09-25), asa-wright (2026-09-25), ambergris-caye (2026-09-25), santa-marta (2026-09-25), gondar (2026-09-25), mombasa (2026-09-25), paysandu (2026-09-25), san-bernardino (2026-09-25), cabo-polonio (2026-09-25), puerto-escondido (2026-09-25), guadalajara (2026-09-25), utila (2026-09-25), tulum (2026-09-25), leon-nicaragua (2026-09-25), san-juan-del-sur (2026-09-25), santa-ana (2026-09-25), copan-ruinas (2026-09-25), santa-catalina-panama (2026-09-25), aregua (2026-09-25), san-ignacio (2026-09-25), choroni (2026-09-25), morrocoy (2026-09-25), merida-venezuela (2026-09-25), manuel-antonio (2026-09-25), san-gil (2026-09-25), flores (2026-09-25), puerto-ayora (2026-09-25), semuc-champey (2026-09-25), suchitoto (2026-09-25), montanita (2026-09-25), canaima (2026-09-25), roraima-venezuela (2026-09-25), concepcion-paraguay (2026-09-25), la-ceiba (2026-09-25), ometepe (2026-09-25), roatan (2026-09-25), hopkins (2026-09-25), nata (2026-09-25), placencia (2026-09-25), kasane (2026-09-27), sossusvlei (2026-09-27), arusha (2026-09-27), dar-es-salaam (2026-09-27), essaouira (2026-09-27), thies (2026-09-27), zanzibar (2026-09-27), tamale (2026-09-27)

## Top 40 cities to enrich next (re-run with --gsc for demand weighting)

| # | City | Country | Spots | Avg desc | Thin desc | No link | Generic addr | Accom (no site) | Solo tips | GSC impr | Score |
|--:|---|---|--:|--:|--:|--:|--:|--:|:-:|--:|--:|
| 1 | Toubab Dialaw | Senegal | 3 | 109 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 2 | Harar | Ethiopia | 3 | 114 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 3 | Dahab | Egypt | 3 | 110 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 4 | Kampala | Uganda | 3 | 111 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 5 | Lalibela | Ethiopia | 3 | 112 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 6 | Fes | Morocco | 3 | 108 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 7 | Vilanculos | Mozambique | 3 | 110 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 8 | Francistown | Botswana | 3 | 112 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 9 | El Zonte | El Salvador | 3 | 113 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 10 | El Valle de Antón | Panama | 3 | 118 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 11 | Cairo | Egypt | 3 | 118 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 12 | Chefchaouen | Morocco | 3 | 110 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 13 | Lamu | Kenya | 3 | 118 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 14 | Masai Mara | Kenya | 3 | 106 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 15 | Moshi | Tanzania | 3 | 108 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 16 | Nairobi | Kenya | 3 | 113 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 17 | Pemba | Mozambique | 3 | 107 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 18 | Stone Town | Tanzania | 3 | 113 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 19 | Butare | Rwanda | 3 | 105 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 20 | Kidepo Valley | Uganda | 3 | 109 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 21 | Kumasi | Ghana | 3 | 108 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 22 | Nyungwe | Rwanda | 3 | 109 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 23 | Saint-Louis | Senegal | 3 | 108 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 24 | Volta Region | Ghana | 3 | 109 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 25 | Drakensberg | South Africa | 3 | 115 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 26 | Gaborone | Botswana | 3 | 116 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 27 | Johannesburg | South Africa | 3 | 110 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 28 | Lüderitz | Namibia | 3 | 114 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 29 | Ziguinchor | Senegal | 3 | 108 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 30 | Windhoek | Namibia | 3 | 112 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 31 | Addis Ababa | Ethiopia | 3 | 111 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 32 | Alexandria | Egypt | 3 | 112 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 33 | Ilha de Moçambique | Mozambique | 3 | 120 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 34 | Tofo | Mozambique | 3 | 110 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 35 | Aswan | Egypt | 3 | 113 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 36 | Bulawayo | Zimbabwe | 3 | 116 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 37 | Bwindi | Uganda | 3 | 115 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 38 | Cape Coast | Ghana | 3 | 111 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 39 | Gisenyi | Rwanda | 3 | 106 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 40 | Harare | Zimbabwe | 3 | 107 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |

## Accommodation gaps (fewer than 3 listings — the Simien Mountains problem)

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
- **Toubab Dialaw**, Senegal: 1 accommodation listing(s)
- **Harar**, Ethiopia: 1 accommodation listing(s)
- **Dahab**, Egypt: 1 accommodation listing(s)
- **Kampala**, Uganda: 1 accommodation listing(s)
- **Lalibela**, Ethiopia: 1 accommodation listing(s)
- **Fes**, Morocco: 1 accommodation listing(s)
- **Vilanculos**, Mozambique: 1 accommodation listing(s)
- **Francistown**, Botswana: 1 accommodation listing(s)
- **El Zonte**, El Salvador: 1 accommodation listing(s)
- **El Valle de Antón**, Panama: 1 accommodation listing(s)
- **Cairo**, Egypt: 1 accommodation listing(s)
- **Chefchaouen**, Morocco: 1 accommodation listing(s)
- **Lamu**, Kenya: 1 accommodation listing(s)
- **Masai Mara**, Kenya: 1 accommodation listing(s)
- **Moshi**, Tanzania: 1 accommodation listing(s)

## Countries without a full country guide

_(guides are the best pages for 'solo travel <country>' searches; see `src/lib/guideContent.ts`)_

- United States — 6 cities, 18 spots
- Brazil — 6 cities, 18 spots
- Belize — 5 cities, 15 spots
- Paraguay — 5 cities, 12 spots
- Dominican Republic — 5 cities, 14 spots
- Ecuador — 5 cities, 15 spots
- Argentina — 5 cities, 21 spots
- Ethiopia — 5 cities, 20 spots
- Egypt — 5 cities, 15 spots
- Kenya — 5 cities, 15 spots
- Costa Rica — 5 cities, 14 spots
- Uruguay — 5 cities, 12 spots
- Uganda — 5 cities, 15 spots
- Cuba — 5 cities, 14 spots
- Puerto Rico — 5 cities, 15 spots
- Guatemala — 5 cities, 16 spots
- Nicaragua — 5 cities, 14 spots
- Peru — 5 cities, 19 spots
- Honduras — 5 cities, 14 spots
- Panama — 5 cities, 16 spots
- El Salvador — 5 cities, 13 spots
- Canada — 5 cities, 15 spots
- Bolivia — 5 cities, 15 spots
- Venezuela — 5 cities, 12 spots
- Chile — 5 cities, 15 spots
- Senegal — 5 cities, 14 spots
- Botswana — 5 cities, 15 spots
- Namibia — 5 cities, 15 spots
- Tanzania — 5 cities, 14 spots
- Morocco — 5 cities, 60 spots
