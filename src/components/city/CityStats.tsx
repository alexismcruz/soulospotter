import { CostLevel } from "@prisma/client";

const COST_DISPLAY: Record<CostLevel, { label: string; symbol: string; color: string }> = {
  BUDGET:    { label: "Budget",    symbol: "$",   color: "text-green-600" },
  MID_RANGE: { label: "Mid-range", symbol: "$$",  color: "text-amber-600" },
  EXPENSIVE: { label: "Expensive", symbol: "$$$", color: "text-red-500" },
};

type Props = {
  city: {
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

  return (
    <div className="mb-10">
      {/* Description */}
      {city.description && (
        <p className="text-stone-600 leading-relaxed max-w-3xl mb-8 text-lg">
          {city.description}
        </p>
      )}

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {city.safetyScore && (
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
            <p className="text-xs text-stone-400 uppercase tracking-wide font-medium mb-1">Safety Score</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-stone-900">{city.safetyScore}/10</span>
              <span className="text-lg">{city.safetyScore >= 9 ? "🛡️" : city.safetyScore >= 7 ? "✅" : "⚠️"}</span>
            </div>
          </div>
        )}

        {cost && (
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
            <p className="text-xs text-stone-400 uppercase tracking-wide font-medium mb-1">Cost Level</p>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${cost.color}`}>{cost.symbol}</span>
              <span className="text-sm text-stone-600">{cost.label}</span>
            </div>
          </div>
        )}

        {city.language && (
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
            <p className="text-xs text-stone-400 uppercase tracking-wide font-medium mb-1">Language</p>
            <p className="text-sm font-semibold text-stone-800 leading-snug">{city.language}</p>
          </div>
        )}

        {city.currency && (
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
            <p className="text-xs text-stone-400 uppercase tracking-wide font-medium mb-1">Currency</p>
            <p className="text-sm font-semibold text-stone-800">{city.currency}</p>
          </div>
        )}
      </div>
    </div>
  );
}
