# SouloSpotter content backlog

_Generated 2026-09-27 by `node scripts/content-audit.js`. Do not edit by hand — re-run it. Log finished work in `scripts/content-done.json`._

## How to enrich (rules)
- Use **first-party facts** only: the venue's own website, the park/tourism-board site, the operator's contact page. Cite the source in the script header, like `scripts/add-simien-accommodation.js`.
- **Never mass-generate** descriptions/claims about specific businesses (hours, menus, prices, awards). If it can't be verified, leave it out or ask Alexis.
- Every enriched spot needs: a real `website` **or** `googleMapsUrl`, a real `address`, and a description over ~250 chars from verified facts. No placeholder links.
- Also check the searched intent (solo dining / going out alone / cafes to meet people) — see `project_soulospotter_seo_baseline` memory.

## Where we stand
- Published cities: **321** · spots: **2615**
- Spots with description under 150 chars: **244** (9%)
- Spots with **no website and no Maps link** (nothing to click): **255** (10%)
- Spots with a generic/missing address: **154** (6%)
- Cities with fewer than 3 accommodation spots: **271** · cities with no solo tips: **36**
- Cities marked done: simien-mountains (2026-09-21), osaka (2026-09-22), guilin (2026-09-23), (site-wide, COWORKING category) (2026-09-23), (13 cities, CAFE category) (2026-09-23), (13 cities, ACCOMMODATION category) (2026-09-23), (site-wide, all categories) + (13 cities, FOOD/NATURE/CULTURE) (2026-09-23), seoul (2026-09-23), kyoto (2026-09-23), rishikesh (2026-09-23), kathmandu (2026-09-23), tokyo (2026-09-23), jaipur (2026-09-23), udaipur (2026-09-23), hong-kong (2026-09-23), jeju (2026-09-23), busan (2026-09-23), gyeongju (2026-09-23), varanasi (2026-09-23), nara (2026-09-23), great-zimbabwe (2026-09-23), victoria-falls (2026-09-23), panajachel (2026-09-23), luxor (2026-09-23), jinja (2026-09-23), accra (2026-09-23), maputo (2026-09-23), queenstown (2026-09-23), boquete (2026-09-25), el-tunco (2026-09-25), dakar (2026-09-25), las-terrenas (2026-09-25), maun (2026-09-25), musanze (2026-09-25), managua (2026-09-25), kigali (2026-09-25), el-yunque (2026-09-25), jarabacoa (2026-09-25), santo-domingo (2026-09-25), quetzaltenango (2026-09-25), ponce (2026-09-25), maracas-bay (2026-09-25), port-of-spain (2026-09-25), cienfuegos (2026-09-25), havana (2026-09-25), rincon (2026-09-25), santiago-de-cuba (2026-09-25), san-juan (2026-09-25), cabarete (2026-09-25), samana (2026-09-25), kingston (2026-09-25), negril (2026-09-25), port-antonio (2026-09-25), ocho-rios (2026-09-25), vinales (2026-09-25), vieques (2026-09-25), trinidad-cuba (2026-09-25), blue-mountains (2026-09-25), bridgetown (2026-09-25), cap-haitien (2026-09-25), holetown (2026-09-25), jacmel (2026-09-25), bathsheba (2026-09-25), port-au-prince (2026-09-25), crown-point (2026-09-25), speyside-tobago (2026-09-25), speightstown (2026-09-25), labadee (2026-09-25), oistins (2026-09-25), petion-ville (2026-09-25), asa-wright (2026-09-25), ambergris-caye (2026-09-25), santa-marta (2026-09-25), gondar (2026-09-25), mombasa (2026-09-25), paysandu (2026-09-25), san-bernardino (2026-09-25), cabo-polonio (2026-09-25), puerto-escondido (2026-09-25), guadalajara (2026-09-25), utila (2026-09-25), tulum (2026-09-25), leon-nicaragua (2026-09-25), san-juan-del-sur (2026-09-25), santa-ana (2026-09-25), copan-ruinas (2026-09-25), santa-catalina-panama (2026-09-25), aregua (2026-09-25), san-ignacio (2026-09-25), choroni (2026-09-25), morrocoy (2026-09-25), merida-venezuela (2026-09-25), manuel-antonio (2026-09-25), san-gil (2026-09-25), flores (2026-09-25), puerto-ayora (2026-09-25), semuc-champey (2026-09-25), suchitoto (2026-09-25), montanita (2026-09-25), canaima (2026-09-25), roraima-venezuela (2026-09-25), concepcion-paraguay (2026-09-25), la-ceiba (2026-09-25), ometepe (2026-09-25), roatan (2026-09-25), hopkins (2026-09-25), nata (2026-09-25), placencia (2026-09-25), kasane (2026-09-27), sossusvlei (2026-09-27), arusha (2026-09-27), dar-es-salaam (2026-09-27), essaouira (2026-09-27), thies (2026-09-27), zanzibar (2026-09-27), tamale (2026-09-27), toubab-dialaw (2026-09-27), harar (2026-09-27), dahab (2026-09-27), kampala (2026-09-27), lalibela (2026-09-27), fes (2026-09-27), vilanculos (2026-09-27), francistown (2026-09-27), el-zonte (2026-09-27), el-valle-de-anton (2026-09-27), cairo (2026-09-27), chefchaouen (2026-09-27), lamu (2026-09-27), masai-mara (2026-09-27), moshi (2026-09-27), nairobi (2026-09-27), pemba (2026-09-27), stone-town (2026-09-27), butare (2026-09-27), kidepo-valley (2026-09-27), kumasi (2026-09-27), nyungwe (2026-09-27), saint-louis-senegal (2026-09-27), volta-region (2026-09-27)

## Top 40 cities to enrich next (re-run with --gsc for demand weighting)

| # | City | Country | Spots | Avg desc | Thin desc | No link | Generic addr | Accom (no site) | Solo tips | GSC impr | Score |
|--:|---|---|--:|--:|--:|--:|--:|--:|:-:|--:|--:|
| 1 | Drakensberg | South Africa | 3 | 115 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 2 | Gaborone | Botswana | 3 | 116 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 3 | Johannesburg | South Africa | 3 | 110 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 4 | Lüderitz | Namibia | 3 | 114 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 5 | Ziguinchor | Senegal | 3 | 108 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 6 | Windhoek | Namibia | 3 | 112 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 7 | Addis Ababa | Ethiopia | 3 | 111 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 8 | Alexandria | Egypt | 3 | 112 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 9 | Ilha de Moçambique | Mozambique | 3 | 120 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 10 | Tofo | Mozambique | 3 | 110 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 11 | Aswan | Egypt | 3 | 113 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 12 | Bulawayo | Zimbabwe | 3 | 116 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 13 | Bwindi | Uganda | 3 | 115 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 14 | Cape Coast | Ghana | 3 | 111 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 15 | Gisenyi | Rwanda | 3 | 106 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 16 | Harare | Zimbabwe | 3 | 107 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 17 | Merzouga | Morocco | 3 | 111 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 18 | Monteverde | Costa Rica | 3 | 116 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 19 | Swakopmund | Namibia | 3 | 113 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 20 | Tegucigalpa | Honduras | 3 | 122 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 21 | San Cristóbal de las Casas | Mexico | 3 | 115 | 3 | 3 | 3 | 1 (1) | ✓ | – | 13 |
| 22 | Encarnación | Paraguay | 3 | 124 | 3 | 3 | 2 | 1 (1) | ✓ | – | 13 |
| 23 | Portland | United States | 3 | 127 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 24 | Byron Bay | Australia | 3 | 125 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 25 | Asunción | Paraguay | 3 | 126 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 26 | Baños | Ecuador | 3 | 128 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 27 | Puerto Viejo | Costa Rica | 3 | 120 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 28 | Queen Elizabeth NP | Uganda | 3 | 115 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 29 | Iquitos | Peru | 3 | 129 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 30 | New York City | United States | 3 | 131 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 31 | Florianópolis | Brazil | 3 | 134 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 32 | Punta del Este | Uruguay | 3 | 124 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 33 | Huaraz | Peru | 3 | 127 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 34 | Pucón | Chile | 3 | 145 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 35 | San Pedro de Atacama | Chile | 3 | 138 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 36 | Cali | Colombia | 3 | 127 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 37 | Quito | Ecuador | 3 | 133 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 38 | Potosí | Bolivia | 3 | 145 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 39 | Salvador | Brazil | 3 | 129 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 40 | Colonia del Sacramento | Uruguay | 3 | 130 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |

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
- **Drakensberg**, South Africa: 1 accommodation listing(s)
- **Gaborone**, Botswana: 1 accommodation listing(s)
- **Johannesburg**, South Africa: 1 accommodation listing(s)
- **Lüderitz**, Namibia: 1 accommodation listing(s)
- **Ziguinchor**, Senegal: 1 accommodation listing(s)
- **Windhoek**, Namibia: 1 accommodation listing(s)
- **Addis Ababa**, Ethiopia: 1 accommodation listing(s)
- **Alexandria**, Egypt: 1 accommodation listing(s)
- **Ilha de Moçambique**, Mozambique: 1 accommodation listing(s)
- **Tofo**, Mozambique: 1 accommodation listing(s)
- **Aswan**, Egypt: 1 accommodation listing(s)
- **Bulawayo**, Zimbabwe: 1 accommodation listing(s)
- **Bwindi**, Uganda: 1 accommodation listing(s)
- **Cape Coast**, Ghana: 1 accommodation listing(s)
- **Gisenyi**, Rwanda: 1 accommodation listing(s)

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
- Kenya — 5 cities, 14 spots
- Costa Rica — 5 cities, 14 spots
- Uruguay — 5 cities, 12 spots
- Uganda — 5 cities, 14 spots
- Cuba — 5 cities, 14 spots
- Puerto Rico — 5 cities, 15 spots
- Guatemala — 5 cities, 16 spots
- Nicaragua — 5 cities, 14 spots
- Peru — 5 cities, 19 spots
- Honduras — 5 cities, 14 spots
- Panama — 5 cities, 16 spots
- El Salvador — 5 cities, 12 spots
- Canada — 5 cities, 15 spots
- Bolivia — 5 cities, 15 spots
- Venezuela — 5 cities, 12 spots
- Chile — 5 cities, 15 spots
- Senegal — 5 cities, 13 spots
- Botswana — 5 cities, 15 spots
- Namibia — 5 cities, 15 spots
- Tanzania — 5 cities, 14 spots
- Morocco — 5 cities, 60 spots
