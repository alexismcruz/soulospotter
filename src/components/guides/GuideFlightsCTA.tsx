"use client";

import { useState } from "react";
import { ALL_AIRPORTS, buildFlightAffiliateLink } from "@/lib/flights";

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

type Props = {
  destCode: string;   // gateway IATA, e.g. "BKK"
  destCity: string;   // e.g. "Bangkok"
  countryName: string;
};

/**
 * Big-ticket flights CTA for country guides. Destination is pre-set to the
 * country's gateway; the traveller picks their origin + dates, and we open the
 * tracked Expedia (Partnerize) affiliate flight search.
 */
export default function GuideFlightsCTA({ destCode, destCity, countryName }: Props) {
  const [origin, setOrigin] = useState("");
  const [depart, setDepart] = useState(todayPlus(30));
  const [ret, setRet] = useState(todayPlus(44));

  const originCode = origin.trim().slice(0, 3).toUpperCase();
  const valid = originCode.length === 3 && depart && ret;

  function search() {
    if (!valid) return;
    const url = buildFlightAffiliateLink({ origin: originCode, dest: destCode, depart, ret, adults: 1 });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="rounded-2xl border border-soulo-border bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl" aria-hidden>✈️</span>
        <p className="font-display font-bold text-soulo-dark">Find flights to {countryName}</p>
      </div>
      <div className="grid sm:grid-cols-[1fr_auto_auto_auto] gap-2 items-end">
        <div>
          <label className="block text-xs text-soulo-mist mb-1">From (airport code)</label>
          <input
            list="guide-airports"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="e.g. LHR, JFK, SIN"
            className="w-full px-3 py-2 rounded-lg border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold"
          />
          <datalist id="guide-airports">
            {ALL_AIRPORTS.slice(0, 120).map((a) => (
              <option key={a.code} value={a.code}>{`${a.city} (${a.code})`}</option>
            ))}
          </datalist>
        </div>
        <div>
          <label className="block text-xs text-soulo-mist mb-1">Depart</label>
          <input type="date" value={depart} min={todayPlus(0)} onChange={(e) => setDepart(e.target.value)}
            className="px-3 py-2 rounded-lg border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold" />
        </div>
        <div>
          <label className="block text-xs text-soulo-mist mb-1">Return</label>
          <input type="date" value={ret} min={depart} onChange={(e) => setRet(e.target.value)}
            className="px-3 py-2 rounded-lg border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold" />
        </div>
        <button
          onClick={search}
          disabled={!valid}
          className="px-5 py-2 rounded-lg bg-soulo-gold hover:bg-amber-400 disabled:bg-soulo-gold/50 disabled:cursor-not-allowed text-soulo-dark font-bold text-sm transition-colors whitespace-nowrap"
        >
          Search flights →
        </button>
      </div>
      <p className="text-xs text-soulo-mist mt-2">
        Flights to {destCity} ({destCode}) via Expedia. We may earn a commission — at no extra cost to you.
      </p>
    </div>
  );
}
