import SeasonalGuidePage, { seasonalMetadata } from "@/components/guides/SeasonalGuide";

export const revalidate = 86400; // ISR: refresh daily (title carries the current year)

export function generateMetadata() {
  return seasonalMetadata("escape-winter");
}

export default function EscapeWinterPage() {
  return <SeasonalGuidePage slug="escape-winter" />;
}
