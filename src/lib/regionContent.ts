/**
 * Editorial for region hub pages (/regions/[slug]). Only regions with real content appear here;
 * others simply render the city grid. Written to be accurate at continent level — specifics live
 * in the country guides. Search Console (Sep 2026) showed 'solo travelling in africa' (~260
 * impressions, position ~41) landing on a page that was only a city grid.
 */

export type RegionEditorial = {
  heading: string;
  paragraphs: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export const REGION_EDITORIAL: Record<string, RegionEditorial> = {
  africa: {
    heading: "Solo travel in Africa: what to know before you go",
    paragraphs: [
      {
        title: "Africa is 54 countries, not one destination",
        body:
          "Safety, costs, infrastructure and visa rules vary enormously from one country to the next, and even between regions of the same country. That's a good reason to plan by country rather than by continent. Solo travel in Africa is very achievable, and established routes make it easier: well-trodden circuits in South Africa, Morocco, Egypt, Kenya, Tanzania and Namibia have good tourism infrastructure, plenty of other travellers and a strong network of guides and small-group operators.",
      },
      {
        title: "Where to start",
        body:
          "For a first solo trip, South Africa is the most straightforward all-rounder: easy transport, English widely spoken, safari, hiking, wine and beaches in one country (see our South Africa guide). Morocco is close to Europe and rewards solo travellers with medinas, mountains and the desert, though you'll want to be ready for persistent touts. Egypt offers unmatched ancient history and Red Sea diving, and East Africa (Kenya and Tanzania) is the classic safari and Zanzibar combination, best done with a small-group tour or reputable local operator.",
      },
      {
        title: "Safaris on a solo budget",
        body:
          "Safaris are usually priced per person sharing, so solo travellers can be hit with a 'single supplement'. To keep costs down, look for small-group departures where you're matched with other travellers, consider self-drive options in parks such as Kruger in South Africa, choose camping or mobile-camp safaris over private lodges, and travel in the shoulder seasons. Read what's included (park fees, meals, transfers) before comparing prices, and book with operators that publish clear terms and reviews.",
      },
      {
        title: "Health, visas and practicalities",
        body:
          "Requirements change by country, so check each destination's official government site: many countries offer an e-Visa or visa on arrival, and some require a yellow fever vaccination certificate depending on where you've travelled from. Malaria risk exists in large parts of sub-Saharan Africa, so see a travel health clinic several weeks before you go. Take travel insurance that covers medical treatment and evacuation, carry some cash for smaller towns, avoid driving at night outside cities, and dress modestly in conservative regions. Our visa guide summarises entry rules for popular destinations, and an eSIM bought before you fly gives you data from the airport.",
      },
    ],
    faqs: [
      {
        question: "Is Africa safe for solo travellers?",
        answer:
          "It depends on the country and the area. Many popular routes are safe with sensible precautions — using ride-hailing or trusted drivers at night, keeping valuables out of sight, and avoiding isolated areas alone — while some regions carry serious risks, so check your government's current travel advice for each country before you book.",
      },
      {
        question: "Which African country is best for a first solo trip?",
        answer:
          "South Africa, Morocco and (with an organised tour or good local operator) Kenya and Tanzania are common starting points. South Africa is generally the easiest for independent travel, thanks to its transport, infrastructure and wide English use.",
      },
      {
        question: "How can I do a safari alone without paying a huge single supplement?",
        answer:
          "Join a small-group departure, try a self-drive safari in a park like Kruger, or look at camping and mobile-camp options. Travelling outside peak season and booking early can also reduce the price, and it's worth checking whether park fees and transfers are included.",
      },
      {
        question: "Do I need vaccinations to travel in Africa?",
        answer:
          "Requirements depend on where you're going and where you've been. Some countries require proof of yellow fever vaccination for arrivals from risk areas, and malaria prevention is advised in many regions. See a travel health clinic or your doctor six to eight weeks before you leave.",
      },
      {
        question: "When is the best time to visit Africa?",
        answer:
          "It varies by region. North Africa is most comfortable in spring and autumn. In East Africa the main dry season (roughly June to October) is best for safari, with a shorter dry spell around January and February. In southern Africa, the dry southern winter (roughly May to September) is the classic safari season, while Cape Town is best in the southern summer.",
      },
    ],
  },
};
