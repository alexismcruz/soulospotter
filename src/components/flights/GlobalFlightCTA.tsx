"use client";

import { useState } from "react";
import { ALL_AIRPORTS, buildFlightAffiliateLink } from "@/lib/flights";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function GlobalFlightCTA() {
  const [open, setOpen] = useState(false);
  const [roundTrip, setRoundTrip] = useState(true);
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [depart, setDepart] = useState("");
  const [ret, setRet] = useState("");
  const [adults, setAdults] = useState(1);

  const today = todayISO();
  const canSearch =
    origin.trim().length >= 3 && dest.trim().length >= 3 && depart && (!roundTrip || ret);

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
    <>
      {/* Floating CTA button — fixed, scrolls with viewport */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Check flights"
        className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 px-5 py-3.5 rounded-full bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold shadow-xl transition-all hover:scale-105"
      >
        <span className="text-lg">✈️</span>
        <span className="text-sm">Check Flights</span>
      </button>

      {/* Panel */}
      {open && (
        <>
          {/* Backdrop (mobile) */}
          <div
            className="fixed inset-0 z-[60] bg-black/20 sm:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed bottom-20 right-5 z-[61] w-[calc(100vw-2.5rem)] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-soulo-border p-5">
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">✈️</span>
                <h2 className="font-display text-base font-bold text-soulo-dark">Check flights</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-soulo-mist hover:text-soulo-grey p-1 -m-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Trip type */}
            <div className="flex gap-2 my-3">
              {[
                { v: true, label: "Round-trip" },
                { v: false, label: "One-way" },
              ].map((t) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setRoundTrip(t.v)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    roundTrip === t.v
                      ? "bg-soulo-slate text-white"
                      : "bg-soulo-linen text-soulo-grey hover:bg-soulo-border"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-soulo-grey mb-1">From</label>
                <input
                  list="global-airports"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="e.g. JFK"
                  className="w-full px-3 py-2 rounded-xl border border-soulo-border bg-white text-sm text-soulo-dark placeholder-soulo-mist focus:outline-none focus:ring-2 focus:ring-soulo-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-soulo-grey mb-1">To</label>
                <input
                  list="global-airports"
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  placeholder="e.g. BKK"
                  className="w-full px-3 py-2 rounded-xl border border-soulo-border bg-white text-sm text-soulo-dark placeholder-soulo-mist focus:outline-none focus:ring-2 focus:ring-soulo-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-soulo-grey mb-1">Depart</label>
                <input
                  type="date"
                  min={today}
                  value={depart}
                  onChange={(e) => setDepart(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-soulo-border bg-white text-sm text-soulo-dark focus:outline-none focus:ring-2 focus:ring-soulo-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-soulo-grey mb-1">
                  Return
                </label>
                <input
                  type="date"
                  min={depart || today}
                  value={ret}
                  disabled={!roundTrip}
                  onChange={(e) => setRet(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-soulo-border bg-white text-sm text-soulo-dark focus:outline-none focus:ring-2 focus:ring-soulo-gold disabled:bg-soulo-linen disabled:text-soulo-mist"
                />
              </div>
            </div>

            <div className="mt-2.5">
              <label className="block text-xs font-semibold text-soulo-grey mb-1">Travelers</label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-soulo-border bg-white text-sm text-soulo-dark focus:outline-none focus:ring-2 focus:ring-soulo-gold cursor-pointer"
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
              className="mt-3 w-full px-5 py-2.5 rounded-xl bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Search flights →
            </button>

            <p className="text-[11px] text-soulo-mist mt-2.5 leading-relaxed">
              Flights are booked through <span className="font-semibold text-soulo-grey">Expedia</span>,
              the world&apos;s leading online travel booking platform. SouloSpotter may earn a
              commission — at no extra cost to you.
            </p>
          </div>
        </>
      )}

      {/* Shared airport datalist */}
      <datalist id="global-airports">
        {ALL_AIRPORTS.map((a) => (
          <option key={a.code} value={a.code}>{`${a.city} (${a.code})`}</option>
        ))}
      </datalist>
    </>
  );
}
