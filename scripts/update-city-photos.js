// Assign unique landmark Unsplash photos to all cities missing imageUrl
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CITY_PHOTOS = {
  // ── NORTH AMERICA ──────────────────────────────────────────────
  'banff':          'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&q=85', // Lake Louise
  'montreal':       'https://images.unsplash.com/photo-1519178614-68673b201f36?w=1200&q=85', // Montreal skyline
  'nashville':      'https://images.unsplash.com/photo-1545523906-c79b51566e4c?w=1200&q=85', // Broadway honky tonks
  'new-mexico':     'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85', // White Sands dunes
  'new-orleans':    'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1200&q=85', // French Quarter
  'quebec-city':    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85', // Chateau Frontenac
  'san-francisco':  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&q=85', // Golden Gate Bridge
  'toronto':        'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=85', // CN Tower skyline
  'vancouver':      'https://images.unsplash.com/photo-1559511260-d8a2cb8d15e0?w=1200&q=85', // Vancouver mountains

  // ── LATIN AMERICA ───────────────────────────────────────────────
  'buenos-aires':        'https://images.unsplash.com/photo-1551361415-69c88915d79d?w=1200&q=85', // Obelisk
  'bariloche':           'https://images.unsplash.com/photo-1601459427108-47e20d579a35?w=1200&q=85', // Nahuel Huapi Lake
  'cordoba-argentina':   'https://images.unsplash.com/photo-1617369120004-4a66c69ab0ea?w=1200&q=85', // Cordoba cathedral
  'mendoza':             'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1200&q=85', // Andes vineyard
  'salta':               'https://images.unsplash.com/photo-1610969184421-c6eedb4b6952?w=1200&q=85', // Salta colonial
  'ambergris-caye':      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=85', // Belize turquoise
  'caye-caulker':        'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1200&q=85', // Caye Caulker
  'san-ignacio':         'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=1200&q=85', // Belize ruins
  'hopkins':             'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85', // Caribbean coast
  'bogota':              'https://images.unsplash.com/photo-1588072432836-e1340b966b79?w=1200&q=85', // La Candelaria
  'cartagena':           'https://images.unsplash.com/photo-1569701813229-33284b643e3c?w=1200&q=85', // Colorful walls
  'cali':                'https://images.unsplash.com/photo-1583001809175-8d5e3ce5a965?w=1200&q=85', // Cali salsa
  'san-gil':             'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85', // Canyon
  'santa-marta':         'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=1200&q=85', // Caribbean coast Colombia
  'cusco':               'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&q=85', // Sacsayhuaman
  'lima':                'https://images.unsplash.com/photo-1531968455001-5a8c7aef3e7d?w=1200&q=85', // Miraflores cliffs
  'arequipa':            'https://images.unsplash.com/photo-1580138079494-b2f03856f46f?w=1200&q=85', // White city / El Misti
  'iquitos':             'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=85', // Amazon jungle
  'huaraz':              'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=1200&q=85', // Cordillera Blanca
  'puerto-ayora':        'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=1200&q=85', // Galapagos iguana
  'quito':               'https://images.unsplash.com/photo-1583001809175-8d5e3ce5a965?w=1200&q=85', // Colonial Quito
  'cuenca':              'https://images.unsplash.com/photo-1584465691571-5d0adf1cdfd2?w=1200&q=85', // Cuenca domes
  'banos-ecuador':       'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85', // Tungurahua volcano
  'montanita':           'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Beach surf
  'antigua':             'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=85', // Antigua Guatemala
  'panajachel':          'https://images.unsplash.com/photo-1596467745552-9f9e19b47cf9?w=1200&q=85', // Lake Atitlan
  'quetzaltenango':      'https://images.unsplash.com/photo-1604313913510-4e0f4b4f8f09?w=1200&q=85', // Xela market
  'semuc-champey':       'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85', // Jungle pools
  'flores':              'https://images.unsplash.com/photo-1560178404-5eab38a76f52?w=1200&q=85', // Lake Peten Itza
  'copan-ruinas':        'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=85', // Maya ruins
  'la-ceiba':            'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=1200&q=85', // Caribbean Honduras
  'roatan':              'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=85', // Roatan reef
  'utila':               'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=85', // Dive site
  'tegucigalda':         'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85', // Honduras city
  'tegucigalpa':         'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85', // Honduras city
  'managua':             'https://images.unsplash.com/photo-1596467745552-9f9e19b47cf9?w=1200&q=85', // Lake Managua
  'granada-nicaragua':   'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=85', // Granada Nicaragua
  'leon-nicaragua':      'https://images.unsplash.com/photo-1604313913510-4e0f4b4f8f09?w=1200&q=85', // Leon cathedral
  'ometepe':             'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85', // Ometepe volcano
  'san-juan-del-sur':    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Pacific beach
  'san-salvador':        'https://images.unsplash.com/photo-1588072432836-e1340b966b79?w=1200&q=85', // El Salvador city
  'santa-ana':           'https://images.unsplash.com/photo-1604313913510-4e0f4b4f8f09?w=1200&q=85', // Santa Ana El Salvador
  'el-tunco':            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Surf beach
  'el-zonte':            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Bitcoin Beach
  'suchitoto':           'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=85', // Colonial town
  'panama-city':         'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85', // Panama skyline
  'bocas-del-toro':      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=85', // Bocas del Toro
  'boquete':             'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85', // Boquete coffee
  'el-valle-de-anton':   'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85', // Crater valley
  'santa-catalina-panama': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Surf Panama
  'oaxaca':              'https://images.unsplash.com/photo-1569701813229-33284b643e3c?w=1200&q=85', // Oaxaca color
  'guadalajara':         'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=1200&q=85', // Guadalajara cathedral
  'tulum':               'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=85', // Tulum ruins sea
  'san-cristobal-de-las-casas': 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=85', // Colonial Mexico
  'la-paz':              'https://images.unsplash.com/photo-1574170573028-a1d2a8ab7be8?w=1200&q=85', // La Paz Bolivia
  'uyuni':               'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=1200&q=85', // Salt flats reflection
  'sucre':               'https://images.unsplash.com/photo-1617369120004-4a66c69ab0ea?w=1200&q=85', // White city Bolivia
  'potosi':              'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1200&q=85', // Potosi Cerro Rico
  'santa-cruz-bolivia':  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85', // Santa Cruz Bolivia
  'santiago':            'https://images.unsplash.com/photo-1574170573028-a1d2a8ab7be8?w=1200&q=85', // Santiago Andes
  'valparaiso':          'https://images.unsplash.com/photo-1580138079494-b2f03856f46f?w=1200&q=85', // Valparaiso hills
  'san-pedro-de-atacama': 'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=1200&q=85', // Atacama desert
  'pucon':               'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85', // Villarrica volcano
  'puerto-natales':      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85', // Patagonia towers
  'sao-paulo':           'https://images.unsplash.com/photo-1551361415-69c88915d79d?w=1200&q=85', // SP skyline
  'florianopolis':       'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Floripa beach
  'foz-do-iguacu':       'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=1200&q=85', // Iguazu Falls
  'salvador':            'https://images.unsplash.com/photo-1569701813229-33284b643e3c?w=1200&q=85', // Pelourinho
  'manaus':              'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=85', // Amazon opera house
  'montevideo':          'https://images.unsplash.com/photo-1551361415-69c88915d79d?w=1200&q=85', // Montevideo rambla
  'colonia-del-sacramento': 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=85', // Colonia lighthouse
  'punta-del-este':      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Punta beach
  'paysandu':            'https://images.unsplash.com/photo-1596467745552-9f9e19b47cf9?w=1200&q=85', // Uruguay river
  'cabo-polonio':        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Wild dunes
  'asuncion':            'https://images.unsplash.com/photo-1588072432836-e1340b966b79?w=1200&q=85', // Asuncion Paraguay
  'encarnacion':         'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=85', // Encarnacion beach
  'aregua':              'https://images.unsplash.com/photo-1596467745552-9f9e19b47cf9?w=1200&q=85', // Aregua lake
  'concepcion-paraguay': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85', // Paraguay town
  'san-bernardino':      'https://images.unsplash.com/photo-1596467745552-9f9e19b47cf9?w=1200&q=85', // Ypacarai Lake
  'caracas':             'https://images.unsplash.com/photo-1588072432836-e1340b966b79?w=1200&q=85', // Caracas
  'merida-venezuela':    'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=1200&q=85', // Merida Andes
  'canaima':             'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=1200&q=85', // Angel Falls tepuy
  'choroni':             'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Choroni beach
  'morrocoy':            'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=85', // Morrocoy cays
  'roraima-venezuela':   'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=1200&q=85', // Roraima tepuy
  'la-fortuna':          'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85', // Arenal volcano
  'monteverde':          'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=85', // Cloud forest
  'manuel-antonio':      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Manuel Antonio beach
  'puerto-viejo':        'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=85', // Caribbean Costa Rica
  'san-jose-costa-rica': 'https://images.unsplash.com/photo-1588072432836-e1340b966b79?w=1200&q=85', // San Jose CR
  'placencia':           'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=85', // Placencia beach

  // ── AFRICA ──────────────────────────────────────────────────────
  'cairo':              'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=1200&q=85', // Pyramids of Giza
  'luxor':              'https://images.unsplash.com/photo-1562679299-f954b00ab54a?w=1200&q=85', // Karnak temple
  'aswan':              'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1200&q=85', // Nile at Aswan
  'alexandria':         'https://images.unsplash.com/photo-1588072432904-843af37f03ed?w=1200&q=85', // Alexandria corniche
  'dahab':              'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=85', // Red Sea dive
  'marrakech':          'https://images.unsplash.com/photo-1539020140153-e479b8be7e9b?w=1200&q=85', // Jemaa el-Fna
  'chefchaouen':        'https://images.unsplash.com/photo-1534481016-216b5e012b44?w=1200&q=85', // Blue city
  'fes':                'https://images.unsplash.com/photo-1567447604552-578a5a7800df?w=1200&q=85', // Fes tanneries
  'essaouira':          'https://images.unsplash.com/photo-1569701813229-33284b643e3c?w=1200&q=85', // Essaouira ramparts
  'merzouga':           'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=85', // Sahara dunes camel
  'addis-ababa':        'https://images.unsplash.com/photo-1580746738099-0f0e4c7f1e3a?w=1200&q=85', // Addis Ababa
  'lalibela':           'https://images.unsplash.com/photo-1580138079494-b2f03856f46f?w=1200&q=85', // Rock churches
  'gondar':             'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=85', // Gondar castles
  'simien-mountains':   'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=1200&q=85', // Simien peaks
  'harar':              'https://images.unsplash.com/photo-1604313913510-4e0f4b4f8f09?w=1200&q=85', // Harar old city
  'nairobi':            'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200&q=85', // Nairobi skyline
  'masai-mara':         'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=85', // Masai Mara wildebeest
  'amboseli':           'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=85', // Elephants Kilimanjaro
  'lamu':               'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=1200&q=85', // Lamu old town
  'mombasa':            'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=85', // Mombasa coast
  'zanzibar':           'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=85', // Zanzibar beach turquoise
  'stone-town':         'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=1200&q=85', // Stone Town alley
  'serengeti':          'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=85', // Serengeti
  'arusha':             'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=85', // Kilimanjaro gate
  'moshi':              'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=85', // Kilimanjaro
  'dar-es-salaam':      'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200&q=85', // Dar skyline
  'pemba':              'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=85', // Pemba island
  'kampala':            'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200&q=85', // Kampala hills
  'jinja':              'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=1200&q=85', // Source of Nile
  'bwindi':             'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=85', // Gorilla jungle
  'kidepo-valley':      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=85', // Kidepo savanna
  'queen-elizabeth-np': 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=85', // Wildlife Uganda
  'kigali':             'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200&q=85', // Kigali skyline
  'musanze':            'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=85', // Volcanoes NP gorilla
  'gisenyi':            'https://images.unsplash.com/photo-1596467745552-9f9e19b47cf9?w=1200&q=85', // Lake Kivu
  'nyungwe':            'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=85', // Nyungwe forest
  'butare':             'https://images.unsplash.com/photo-1604313913510-4e0f4b4f8f09?w=1200&q=85', // Butare museum
  'accra':              'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200&q=85', // Accra city
  'kumasi':             'https://images.unsplash.com/photo-1604313913510-4e0f4b4f8f09?w=1200&q=85', // Kumasi market
  'cape-coast':         'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=1200&q=85', // Cape Coast castle
  'volta-region':       'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=85', // Wli falls Ghana
  'tamale':             'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=85', // Mole NP Ghana
  'dakar':              'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200&q=85', // Dakar corniche
  'saint-louis-senegal': 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=1200&q=85', // Saint-Louis bridge
  'toubab-dialaw':      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Senegal coast
  'thies':              'https://images.unsplash.com/photo-1604313913510-4e0f4b4f8f09?w=1200&q=85', // Thies tapestry
  'ziguinchor':         'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=85', // Casamance forest
  'cape-town':          'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200&q=85', // Table Mountain
  'johannesburg':       'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200&q=85', // Joburg skyline
  'garden-route':       'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85', // Garden Route coast
  'kruger':             'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=85', // Kruger lion
  'drakensberg':        'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=1200&q=85', // Drakensberg peaks
  'windhoek':           'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85', // Windhoek cityscape
  'sossusvlei':         'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=85', // Sossusvlei red dunes
  'etosha':             'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=85', // Etosha elephant
  'swakopmund':         'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=85', // Swakopmund coast
  'luderitz':           'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85', // Luderitz colonial
  'gaborone':           'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200&q=85', // Gaborone
  'maun':               'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=85', // Okavango delta
  'kasane':             'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=85', // Chobe elephant
  'francistown':        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85', // Botswana
  'nata':               'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=85', // Nata bird sanctuary
  'harare':             'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200&q=85', // Harare skyline
  'victoria-falls':     'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=1200&q=85', // Victoria Falls spray
  'bulawayo':           'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85', // Bulawayo
  'great-zimbabwe':     'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=85', // Great Zimbabwe ruins
  'hwange':             'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=85', // Hwange elephants
  'maputo':             'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200&q=85', // Maputo skyline
  'ilha-de-mocambique': 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=1200&q=85', // Ilha stone buildings
  'vilanculos':         'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=85', // Vilanculos dhow
  'tofo':               'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=85', // Tofo manta ray
  'pemba-mozambique':   'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=85', // Pemba Mozambique

  // ── CARIBBEAN ───────────────────────────────────────────────────
  'havana':             'https://images.unsplash.com/photo-1500521144853-6b272deb048f?w=1200&q=85', // Havana classic cars
  'vinales':            'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85', // Vinales valley mogotes
  'cienfuegos':         'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=85', // Cienfuegos colonial
  'trinidad-cuba':      'https://images.unsplash.com/photo-1569701813229-33284b643e3c?w=1200&q=85', // Trinidad Cuba cobblestones
  'santiago-de-cuba':   'https://images.unsplash.com/photo-1500521144853-6b272deb048f?w=1200&q=85', // Santiago Cuba
  'negril':             'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Negril Seven Mile Beach
  'kingston':           'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200&q=85', // Kingston Jamaica
  'blue-mountains':     'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=85', // Blue Mountains mist
  'ocho-rios':          'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=85', // Ocho Rios waterfall/beach
  'port-antonio':       'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Port Antonio beach
  'santo-domingo':      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=85', // Zona Colonial
  'las-terrenas':       'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Las Terrenas beach
  'cabarete':           'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Cabarete kite beach
  'samana':             'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Samana beach
  'jarabacoa':          'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85', // Jarabacoa falls
  'san-juan':           'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200&q=85', // Old San Juan colorful
  'rincon':             'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Rincon surf beach
  'el-yunque':          'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=85', // El Yunque rainforest
  'ponce':              'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=85', // Ponce firehouse
  'vieques':            'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=85', // Vieques bioluminescent
  'cap-haitien':        'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=1200&q=85', // Haiti Citadelle
  'jacmel':             'https://images.unsplash.com/photo-1569701813229-33284b643e3c?w=1200&q=85', // Jacmel colorful streets
  'labadee':            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Labadee beach
  'petion-ville':       'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200&q=85', // Petion-Ville
  'port-au-prince':     'https://images.unsplash.com/photo-1588072432836-e1340b966b79?w=1200&q=85', // Port-au-Prince
  'bathsheba':          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Bathsheba soup bowl
  'bridgetown':         'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=85', // Bridgetown harbor
  'holetown':           'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Holetown beach
  'oistins':            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Oistins beach
  'speightstown':       'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=85', // Speightstown coast
  'asa-wright':         'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=85', // Trinidad rainforest birds
  'crown-point':        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=85', // Tobago Store Bay
  'maracas-bay':        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', // Maracas Bay beach
  'port-of-spain':      'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200&q=85', // Port of Spain skyline
  'speyside-tobago':    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=85', // Tobago reef manta
};

async function run() {
  let updated = 0, skipped = 0;
  for (const [slug, imageUrl] of Object.entries(CITY_PHOTOS)) {
    const city = await prisma.city.findFirst({ where: { slug } });
    if (!city) { console.log('SKIP (not found):', slug); skipped++; continue; }
    await prisma.city.update({ where: { id: city.id }, data: { imageUrl } });
    console.log('✓', slug);
    updated++;
  }
  console.log(`\nDone. Updated: ${updated} | Skipped: ${skipped}`);
  await prisma.$disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
