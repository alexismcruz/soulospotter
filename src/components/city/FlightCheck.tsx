"use client";

import { useState } from "react";
import { CITY_AIRPORTS, COMMON_ORIGINS, buildFlightAffiliateLink } from "@/lib/flights";

type Props = {
  citySlug: string;
  cityName: string;
};

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function FlightCheck({ citySlug, cityName }: Props) {
  const destAirport = CITY_AIRPORTS[citySlug];
  const [roundTrip, setRoundTrip] = useState(true);
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState(destAirport?.code ?? "");
  const [depart, setDepart] = useState("");
  const [ret, setRet] = useState("");
  const [adults, setAdults] = useState(1);

  const today = todayISO();
  const canSearch = origin.trim().length >= 3 && dest.trim().length >= 3 && depart && (!roundTrip || ret);

  function handleSearch() {
    if (!canSearch) return;
    const url = buildFlightAffiliateLink({
      origin,
      dest,
      depart,
      ret: roundTrip ? ret : undefined,
      adults,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="my-10 p-6 bg-white rounded-2xl border border-soulo-border">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">✈️</span>
        <h2 className="font-display text-base font-bold text-soulo-dark">
          Check flights to {cityName}
        </h2>
      </div>
      <p className="text-xs text-soulo-mist mb-5">
        Compare live fares on Expedia for your dates. We search — you book directly with Expedia.
      </p>

      {/* Trip type */}
      <div className="flex gap-2 mb-4">
        {[
          { v: true, label: "Round-trip" },
          { v: false, label: "One-way" },
        ].map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={() => setRoundTrip(t.v)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              roundTrip === t.v
                ? "bg-soulo-slate text-white"
                : "bg-soulo-linen text-soulo-grey hover:bg-soulo-border"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* From */}
        <div>
          <label className="block text-xs font-semibold text-soulo-grey mb-1">From</label>
          <input
            list="origin-airports"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="City or code (e.g. JFK)"
            className="w-full px-3 py-2.5 rounded-xl border border-soulo-border bg-white text-sm text-soulo-dark placeholder-soulo-mist focus:outline-none focus:ring-2 focus:ring-soulo-gold"
          />
          <datalist id="origin-airports">
            {COMMON_ORIGINS.map((a) => (
              <option key={a.code} value={a.code}>{`${a.city} (${a.code})`}</option>
            ))}
          </datalist>
        </div>

        {/* To */}
        <div>
          <label className="block text-xs font-semibold text-soulo-grey mb-1">To</label>
          <input
            value={dest}
            onChange={(e) => setDest(e.target.value)}
            placeholder="Airport code"
            className="w-full px-3 py-2.5 rounded-xl border border-soulo-border bg-white text-sm text-soulo-dark placeholder-soulo-mist focus:outline-none focus:ring-2 focus:ring-soulo-gold"
          />
          {destAirport && (
            <p className="text-[11px] text-soulo-mist mt-1">{destAirport.city}</p>
          )}
        </div>

        {/* Depart */}
        <div>
          <label className="block text-xs font-semibold text-soulo-grey mb-1">Depart</label>
          <input
            type="date"
            min={today}
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-soulo-border bg-white text-sm text-soulo-dark focus:outline-none focus:ring-2 focus:ring-soulo-gold"
          />
        </div>

        {/* Return */}
        <div>
          <label className="block text-xs font-semibold text-soulo-grey mb-1">
            Return {roundTrip ? "" : "(one-way)"}
          </label>
          <input
            type="date"
            min={depart || today}
            value={ret}
            disabled={!roundTrip}
            onChange={(e) => setRet(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-soulo-border bg-white text-sm text-soulo-dark focus:outline-none focus:ring-2 focus:ring-soulo-gold disabled:bg-soulo-linen disabled:text-soulo-mist"
          />
        </div>
      </div>

      {/* Travelers + CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-3 mt-3">
        <div className="sm:w-40">
          <label className="block text-xs font-semibold text-soulo-grey mb-1">Travelers</label>
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="w-full px-3 py-2.5 rounded-xl border border-soulo-border bg-white text-sm text-soulo-dark focus:outline-none focus:ring-2 focus:ring-soulo-gold cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "adult" : "adults"}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleSearch}
          disabled={!canSearch}
          className="flex-1 px-6 py-3 rounded-xl bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search flights on Expedia →
        </button>
      </div>

      <p className="text-[11px] text-soulo-mist mt-3">
        Opens Expedia in a new tab. SouloSpotter may earn a commission — at no extra cost to you.
      </p>
    </div>
  );
}
