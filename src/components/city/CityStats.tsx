import { CostLevel } from "@prisma/client";
import { getSafetySourcesText } from "@/lib/safetySourcesByCity";

const COST_DISPLAY: Record<CostLevel, { label: string; symbol: string; color: string }> = {
  BUDGET:    { label: "Budget",    symbol: "$",   color: "text-soulo-gold" },
  MID_RANGE: { label: "Mid-range", symbol: "$$",  color: "text-amber-500" },
  EXPENSIVE: { label: "Expensive", symbol: "$$$", color: "text-purple-500" },
};

type Props = {
  city: {
    name: string;
    slug: string;
    description: string | null;
    safetyScore: number | null;
    costLevel: CostLevel | null;
    currency: string | null;
    language: string | null;
    timezone: string | null;
    spots: unknown[];
  };
};

export default function CityStats({ city }: Props) {
  const cost = city.costLevel ? COST_DISPLAY[city.costLevel] : null;

  const safetySourcesText = getSafetySourcesText(city.slug);

  return (
    <div className="mb-10">
      {city.description && (
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-soulo-dark mb-3">
            About {city.name} for Solo Travelers
          </h2>
          <p className="text-soulo-grey leading-relaxed max-w-3xl text-lg">
            {city.description}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {city.safetyScore && (
          <div className="bg-white rounded-2xl p-4 border border-soulo-border">
            <p className="text-xs text-soulo-mist uppercase tracking-wide font-medium mb-1">Safety Score</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-soulo-dark">{city.safetyScore}/10</span>
              <span
                className="text-lg cursor-help hover:opacity-75 transition-opacity"
                title={`${safetySourcesText}\n\nScale: 9–10 = Very Safe · 7–8 = Generally Safe · 5–6 = Exercise Caution · Below 5 = High Caution`}
              >
                {city.safetyScore >= 9 ? "🛡️" : city.safetyScore >= 7 ? "✅" : "⚠️"}
              </span>
            </div>
            {city.safetyScore >= 9 ? (
              <span
                className="inline-block mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-soulo-teal text-soulo-dark cursor-help"
                title="Score 9–10: Very Safe — consistently rated among the safest cities for solo travel based on crime index, solo traveler reports, and safety rankings."
              >
                Very Safe
              </span>
            ) : city.safetyScore >= 7 ? (
              <span className="inline-block mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Generally Safe
              </span>
            ) : (
              <span className="inline-block mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700">
                Exercise Caution
              </span>
            )}
            <p className="text-xs text-soulo-mist mt-2">Hover icon for sources</p>
          </div>
        )}

        {cost && (
          <div className="bg-white rounded-2xl p-4 border border-soulo-border">
            <p className="text-xs text-soulo-mist uppercase tracking-wide font-medium mb-1">Cost Level</p>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${cost.color}`}>{cost.symbol}</span>
              <span className="text-sm text-soulo-grey">{cost.label}</span>
            </div>
          </div>
        )}

        {city.language && (
          <div className="bg-white rounded-2xl p-4 border border-soulo-border">
            <p className="text-xs text-soulo-mist uppercase tracking-wide font-medium mb-1">Language</p>
            <p className="text-sm font-semibold text-soulo-dark leading-snug">{city.language}</p>
          </div>
        )}

        {city.currency && (
          <div className="bg-white rounded-2xl p-4 border border-soulo-border">
            <p className="text-xs text-soulo-mist uppercase tracking-wide font-medium mb-1">Currency</p>
            <p className="text-sm font-semibold text-soulo-dark">{city.currency}</p>
          </div>
        )}
      </div>
    </div>
  );
}
