import SeasonalGuidePage, { seasonalMetadata } from "@/components/guides/SeasonalGuide";

export const revalidate = 86400; // ISR: refresh daily (title carries the current year)

export function generateMetadata() {
  return seasonalMetadata("winter-wonderland");
}

export default function WinterWonderlandPage() {
  return <SeasonalGuidePage slug="winter-wonderland" />;
}
