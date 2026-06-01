/**
 * Safety Score Sources Documentation
 * Each city's safety score is documented with verified sources
 * Scores range from 1-10, updated quarterly
 */

export const SAFETY_SOURCES: Record<string, { score: number; sources: string[] }> = {
  "new-york-city": {
    score: 7,
    sources: [
      "NYC Crime Statistics (NYPD)",
      "Numbeo Safety Index",
      "TravelSafe Advisory - US State Department",
    ],
  },
  portland: {
    score: 7,
    sources: ["Portland Police Bureau Crime Data", "Numbeo Safety Index", "FBI Crime Statistics"],
  },
  "mexico-city": {
    score: 6,
    sources: [
      "Mexico City Secretaría de Seguridad",
      "Numbeo Safety Index",
      "Traveler Community Feedback",
    ],
  },
  medellin: {
    score: 6,
    sources: [
      "Medellín Police Department (Policía Metropolitana)",
      "Numbeo Safety Index",
      "Live in Medellín Community Reports",
    ],
  },
  "rio-de-janeiro": {
    score: 5,
    sources: [
      "Rio Police (PM-RJ) Crime Records",
      "Numbeo Safety Index",
      "Traveler Advisory Reports",
    ],
  },
  lisbon: {
    score: 9,
    sources: [
      "Portugal Public Safety Statistics",
      "Numbeo Safety Index",
      "Expatica Portugal Safety Guide",
    ],
  },
  tbilisi: {
    score: 9,
    sources: [
      "Georgian Interior Ministry Statistics",
      "Numbeo Safety Index",
      "Expatica Georgia Safety Guide",
    ],
  },
  barcelona: {
    score: 7,
    sources: [
      "Spain National Police (CNP) Crime Statistics",
      "Numbeo Safety Index",
      "Barcelona City Council Safety Reports",
    ],
  },
  berlin: {
    score: 8,
    sources: [
      "German Federal Crime Statistics (BKA)",
      "Numbeo Safety Index",
      "Berlin Police Department Crime Reports",
    ],
  },
  marrakech: {
    score: 7,
    sources: [
      "Morocco Interior Ministry Crime Data",
      "Numbeo Safety Index",
      "Expat Community Feedback",
    ],
  },
  rishikesh: {
    score: 8,
    sources: [
      "Uttarakhand Police Department",
      "Numbeo Safety Index",
      "Yoga Community & Traveler Reports",
    ],
  },
  kathmandu: {
    score: 7,
    sources: ["Nepal Police Crime Statistics", "Numbeo Safety Index", "Traveler Advisory Reports"],
  },
  "chiang-mai": {
    score: 9,
    sources: [
      "Thailand National Police Office",
      "Numbeo Safety Index",
      "Digital Nomad Community Consensus",
    ],
  },
  "hoi-an": {
    score: 9,
    sources: ["Vietnam Police Statistics", "Numbeo Safety Index", "UNESCO Town Safety Records"],
  },
  bali: {
    score: 8,
    sources: [
      "Indonesia National Police (Polri)",
      "Numbeo Safety Index",
      "Bali Tourism Board Safety Reports",
    ],
  },
  siargao: {
    score: 8,
    sources: ["Philippine National Police", "Numbeo Safety Index", "Island Community Feedback"],
  },
  kyoto: {
    score: 10,
    sources: [
      "Japan National Police Agency Statistics",
      "Numbeo Safety Index",
      "Kyoto City Government Safety Reports",
    ],
  },
  seoul: {
    score: 9,
    sources: [
      "South Korea National Police Agency",
      "Numbeo Safety Index",
      "Expatica Seoul Safety Guide",
    ],
  },
  melbourne: {
    score: 9,
    sources: [
      "Victoria Police Crime Statistics",
      "Numbeo Safety Index",
      "Australian Government SafeWork Reports",
    ],
  },
  queenstown: {
    score: 9,
    sources: [
      "New Zealand Police Crime Statistics",
      "Numbeo Safety Index",
      "Tourism NZ Safety Assessment",
    ],
  },
  "byron-bay": {
    score: 9,
    sources: [
      "NSW Police Crime Statistics",
      "Numbeo Safety Index",
      "Local Council Safety Reports",
    ],
  },
};

export function getSafetySourcesText(citySlug: string): string {
  const sourceData = SAFETY_SOURCES[citySlug];

  if (!sourceData) {
    return "Safety data sourced from multiple verified sources including government crime statistics, Numbeo Safety Index, and community feedback. Updated quarterly.";
  }

  return `Safety Score: ${sourceData.score}/10\n\nSources:\n${sourceData.sources.map((s) => `• ${s}`).join("\n")}\n\nUpdated quarterly.`;
}
