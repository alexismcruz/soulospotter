# SouloSpotter content backlog

_Generated 2026-09-27 by `node scripts/content-audit.js`. Do not edit by hand — re-run it. Log finished work in `scripts/content-done.json`._

## How to enrich (rules)
- Use **first-party facts** only: the venue's own website, the park/tourism-board site, the operator's contact page. Cite the source in the script header, like `scripts/add-simien-accommodation.js`.
- **Never mass-generate** descriptions/claims about specific businesses (hours, menus, prices, awards). If it can't be verified, leave it out or ask Alexis.
- Every enriched spot needs: a real `website` **or** `googleMapsUrl`, a real `address`, and a description over ~250 chars from verified facts. No placeholder links.
- Also check the searched intent (solo dining / going out alone / cafes to meet people) — see `project_soulospotter_seo_baseline` memory.

## Where we stand
- Published cities: **321** · spots: **2606**
- Spots with description under 150 chars: **124** (5%)
- Spots with **no website and no Maps link** (nothing to click): **135** (5%)
- Spots with a generic/missing address: **84** (3%)
- Cities with fewer than 3 accommodation spots: **271** · cities with no solo tips: **36**
- Cities marked done: simien-mountains (2026-09-21), osaka (2026-09-22), guilin (2026-09-23), (site-wide, COWORKING category) (2026-09-23), (13 cities, CAFE category) (2026-09-23), (13 cities, ACCOMMODATION category) (2026-09-23), (site-wide, all categories) + (13 cities, FOOD/NATURE/CULTURE) (2026-09-23), seoul (2026-09-23), kyoto (2026-09-23), rishikesh (2026-09-23), kathmandu (2026-09-23), tokyo (2026-09-23), jaipur (2026-09-23), udaipur (2026-09-23), hong-kong (2026-09-23), jeju (2026-09-23), busan (2026-09-23), gyeongju (2026-09-23), varanasi (2026-09-23), nara (2026-09-23), great-zimbabwe (2026-09-23), victoria-falls (2026-09-23), panajachel (2026-09-23), luxor (2026-09-23), jinja (2026-09-23), accra (2026-09-23), maputo (2026-09-23), queenstown (2026-09-23), boquete (2026-09-25), el-tunco (2026-09-25), dakar (2026-09-25), las-terrenas (2026-09-25), maun (2026-09-25), musanze (2026-09-25), managua (2026-09-25), kigali (2026-09-25), el-yunque (2026-09-25), jarabacoa (2026-09-25), santo-domingo (2026-09-25), quetzaltenango (2026-09-25), ponce (2026-09-25), maracas-bay (2026-09-25), port-of-spain (2026-09-25), cienfuegos (2026-09-25), havana (2026-09-25), rincon (2026-09-25), santiago-de-cuba (2026-09-25), san-juan (2026-09-25), cabarete (2026-09-25), samana (2026-09-25), kingston (2026-09-25), negril (2026-09-25), port-antonio (2026-09-25), ocho-rios (2026-09-25), vinales (2026-09-25), vieques (2026-09-25), trinidad-cuba (2026-09-25), blue-mountains (2026-09-25), bridgetown (2026-09-25), cap-haitien (2026-09-25), holetown (2026-09-25), jacmel (2026-09-25), bathsheba (2026-09-25), port-au-prince (2026-09-25), crown-point (2026-09-25), speyside-tobago (2026-09-25), speightstown (2026-09-25), labadee (2026-09-25), oistins (2026-09-25), petion-ville (2026-09-25), asa-wright (2026-09-25), ambergris-caye (2026-09-25), santa-marta (2026-09-25), gondar (2026-09-25), mombasa (2026-09-25), paysandu (2026-09-25), san-bernardino (2026-09-25), cabo-polonio (2026-09-25), puerto-escondido (2026-09-25), guadalajara (2026-09-25), utila (2026-09-25), tulum (2026-09-25), leon-nicaragua (2026-09-25), san-juan-del-sur (2026-09-25), santa-ana (2026-09-25), copan-ruinas (2026-09-25), santa-catalina-panama (2026-09-25), aregua (2026-09-25), san-ignacio (2026-09-25), choroni (2026-09-25), morrocoy (2026-09-25), merida-venezuela (2026-09-25), manuel-antonio (2026-09-25), san-gil (2026-09-25), flores (2026-09-25), puerto-ayora (2026-09-25), semuc-champey (2026-09-25), suchitoto (2026-09-25), montanita (2026-09-25), canaima (2026-09-25), roraima-venezuela (2026-09-25), concepcion-paraguay (2026-09-25), la-ceiba (2026-09-25), ometepe (2026-09-25), roatan (2026-09-25), hopkins (2026-09-25), nata (2026-09-25), placencia (2026-09-25), kasane (2026-09-27), sossusvlei (2026-09-27), arusha (2026-09-27), dar-es-salaam (2026-09-27), essaouira (2026-09-27), thies (2026-09-27), zanzibar (2026-09-27), tamale (2026-09-27), toubab-dialaw (2026-09-27), harar (2026-09-27), dahab (2026-09-27), kampala (2026-09-27), lalibela (2026-09-27), fes (2026-09-27), vilanculos (2026-09-27), francistown (2026-09-27), el-zonte (2026-09-27), el-valle-de-anton (2026-09-27), cairo (2026-09-27), chefchaouen (2026-09-27), lamu (2026-09-27), masai-mara (2026-09-27), moshi (2026-09-27), nairobi (2026-09-27), pemba (2026-09-27), stone-town (2026-09-27), butare (2026-09-27), kidepo-valley (2026-09-27), kumasi (2026-09-27), nyungwe (2026-09-27), saint-louis-senegal (2026-09-27), volta-region (2026-09-27), drakensberg (2026-09-27), gaborone (2026-09-27), johannesburg (2026-09-27), luderitz (2026-09-27), ziguinchor (2026-09-27), windhoek (2026-09-27), addis-ababa (2026-09-27), alexandria (2026-09-27), ilha-de-mocambique (2026-09-27), tofo (2026-09-27), aswan (2026-09-27), bulawayo (2026-09-27), bwindi (2026-09-27), cape-coast (2026-09-27), gisenyi (2026-09-27), harare (2026-09-27), merzouga (2026-09-27), monteverde (2026-09-27), swakopmund (2026-09-27), tegucigalpa (2026-09-27), san-cristobal-de-las-casas (2026-09-27), encarnacion (2026-09-27), portland (2026-09-27), byron-bay (2026-09-27), asuncion (2026-09-27), banos-ecuador (2026-09-27), puerto-viejo (2026-09-27), queen-elizabeth-np (2026-09-27), iquitos (2026-09-27), new-york-city (2026-09-27), florianopolis (2026-09-27), punta-del-este (2026-09-27), huaraz (2026-09-27), pucon (2026-09-27), san-pedro-de-atacama (2026-09-27), cali (2026-09-27), quito (2026-09-27), potosi (2026-09-27), salvador (2026-09-27), colonia-del-sacramento (2026-09-27)

## Top 40 cities to enrich next (re-run with --gsc for demand weighting)

| # | City | Country | Spots | Avg desc | Thin desc | No link | Generic addr | Accom (no site) | Solo tips | GSC impr | Score |
|--:|---|---|--:|--:|--:|--:|--:|--:|:-:|--:|--:|
| 1 | Cuenca | Ecuador | 3 | 132 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 2 | Montevideo | Uruguay | 3 | 124 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 3 | San Salvador | El Salvador | 3 | 124 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 4 | Etosha | Namibia | 3 | 113 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 5 | Amboseli | Kenya | 3 | 108 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 6 | Berlin | Germany | 3 | 131 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 7 | Garden Route | South Africa | 3 | 118 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 8 | Hwange | Zimbabwe | 3 | 118 | 3 | 3 | 0 | 1 (1) | ✓ | – | 12 |
| 9 | Arequipa | Peru | 3 | 132 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 10 | Cape Town | South Africa | 3 | 118 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 11 | Kruger National Park | South Africa | 3 | 114 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 12 | Foz do Iguaçu | Brazil | 3 | 124 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 13 | Puerto Natales | Chile | 3 | 138 | 3 | 3 | 1 | 1 (1) | ✓ | – | 12 |
| 14 | Manaus | Brazil | 3 | 140 | 2 | 3 | 1 | 1 (1) | ✓ | – | 11 |
| 15 | Zagreb | Croatia | 3 | 132 | 3 | 3 | 1 | 0 (0) | ✓ | – | 11 |
| 16 | Mexico City | Mexico | 3 | 124 | 3 | 3 | 0 | 0 (0) | ✓ | – | 11 |
| 17 | New Mexico | United States | 3 | 127 | 3 | 3 | 0 | 0 (0) | ✓ | – | 11 |
| 18 | San Francisco | United States | 3 | 129 | 3 | 3 | 0 | 0 (0) | ✓ | – | 11 |
| 19 | Quebec City | Canada | 3 | 127 | 3 | 3 | 0 | 0 (0) | ✓ | – | 11 |
| 20 | Santa Cruz | Bolivia | 3 | 146 | 2 | 3 | 0 | 1 (1) | ✓ | – | 11 |
| 21 | Sucre | Bolivia | 3 | 143 | 2 | 3 | 0 | 1 (1) | ✓ | – | 11 |
| 22 | Split | Croatia | 3 | 119 | 3 | 3 | 0 | 0 (0) | ✓ | – | 11 |
| 23 | Nashville | United States | 3 | 125 | 3 | 3 | 0 | 0 (0) | ✓ | – | 11 |
| 24 | New Orleans | United States | 3 | 126 | 3 | 3 | 0 | 0 (0) | ✓ | – | 11 |
| 25 | Vancouver | Canada | 3 | 130 | 3 | 3 | 0 | 0 (0) | ✓ | – | 11 |
| 26 | Banff | Canada | 3 | 119 | 3 | 3 | 0 | 0 (0) | ✓ | – | 11 |
| 27 | Toronto | Canada | 3 | 126 | 3 | 3 | 0 | 0 (0) | ✓ | – | 11 |
| 28 | La Paz | Bolivia | 3 | 146 | 2 | 3 | 0 | 1 (1) | ✓ | – | 11 |
| 29 | Rio de Janeiro | Brazil | 3 | 133 | 2 | 3 | 0 | 1 (1) | ✓ | – | 11 |
| 30 | São Paulo | Brazil | 3 | 143 | 2 | 3 | 0 | 1 (1) | ✓ | – | 11 |
| 31 | Barcelona | Spain | 3 | 152 | 1 | 3 | 0 | 1 (1) | ✓ | – | 10 |
| 32 | Montreal | Canada | 3 | 138 | 2 | 3 | 0 | 0 (0) | ✓ | – | 10 |
| 33 | Melbourne | Australia | 3 | 150 | 1 | 3 | 0 | 1 (1) | ✓ | – | 10 |
| 34 | Córdoba | Argentina | 3 | 155 | 1 | 3 | 0 | 1 (1) | ✓ | – | 10 |
| 35 | Uyuni | Bolivia | 3 | 151 | 1 | 3 | 1 | 1 (1) | ✓ | – | 10 |
| 36 | Salta | Argentina | 3 | 147 | 1 | 3 | 1 | 1 (1) | ✓ | – | 10 |
| 37 | Santiago | Chile | 3 | 150 | 1 | 3 | 0 | 1 (1) | ✓ | – | 10 |
| 38 | Valparaíso | Chile | 3 | 143 | 1 | 3 | 0 | 1 (1) | ✓ | – | 10 |
| 39 | Medellín | Colombia | 3 | 124 | 3 | 2 | 0 | 0 (0) | ✓ | – | 9 |
| 40 | Tbilisi | Georgia | 3 | 156 | 0 | 3 | 0 | 0 (0) | ✓ | – | 8 |

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
- **Cuenca**, Ecuador: 1 accommodation listing(s)
- **Montevideo**, Uruguay: 1 accommodation listing(s)
- **San Salvador**, El Salvador: 1 accommodation listing(s)
- **Etosha**, Namibia: 1 accommodation listing(s)
- **Amboseli**, Kenya: 1 accommodation listing(s)
- **Berlin**, Germany: 1 accommodation listing(s)
- **Garden Route**, South Africa: 1 accommodation listing(s)
- **Hwange**, Zimbabwe: 1 accommodation listing(s)
- **Arequipa**, Peru: 1 accommodation listing(s)
- **Cape Town**, South Africa: 1 accommodation listing(s)
- **Kruger National Park**, South Africa: 1 accommodation listing(s)
- **Foz do Iguaçu**, Brazil: 1 accommodation listing(s)
- **Puerto Natales**, Chile: 1 accommodation listing(s)
- **Manaus**, Brazil: 1 accommodation listing(s)
- **Santa Cruz**, Bolivia: 1 accommodation listing(s)

## Countries without a full country guide

_(guides are the best pages for 'solo travel <country>' searches; see `src/lib/guideContent.ts`)_

- United States — 6 cities, 18 spots
- Brazil — 6 cities, 17 spots
- Belize — 5 cities, 15 spots
- Paraguay — 5 cities, 10 spots
- Dominican Republic — 5 cities, 14 spots
- Ecuador — 5 cities, 15 spots
- Argentina — 5 cities, 21 spots
- Ethiopia — 5 cities, 20 spots
- Egypt — 5 cities, 15 spots
- Kenya — 5 cities, 14 spots
- Costa Rica — 5 cities, 14 spots
- Uruguay — 5 cities, 12 spots
- Uganda — 5 cities, 13 spots
- Cuba — 5 cities, 14 spots
- Puerto Rico — 5 cities, 15 spots
- Guatemala — 5 cities, 16 spots
- Nicaragua — 5 cities, 14 spots
- Peru — 5 cities, 19 spots
- Honduras — 5 cities, 13 spots
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
- Morocco — 5 cities, 59 spots
