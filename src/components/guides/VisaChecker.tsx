"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NATIONALITIES } from "@/lib/nationalities";
import { getVisaNotes, getCountryGuide } from "@/lib/countryGuides";
import { visahqUrl, AFFILIATES } from "@/lib/affiliates";

const DURATIONS = ["Under 15 days", "15–30 days", "31–90 days", "More than 90 days"];
const PURPOSES = ["Leisure / tourism", "Business", "Visiting family or friends", "Remote work / digital nomad", "Other"];

export type VisaDestination = { slug: string; name: string; flag: string | null };

type Props = {
  destinations: VisaDestination[];
  /** Pre-fill "Going to" when launched from a specific country's guide page. */
  presetDestinationSlug?: string;
  triggerLabel?: string;
  triggerClassName?: string;
};

export default function VisaChecker({
  destinations,
  presetDestinationSlug,
  triggerLabel = "🛂 Check my visa requirement",
  triggerClassName,
}: Props) {
  const [open, setOpen] = useState(false);
  const [residentOf, setResidentOf] = useState("");
  const [citizenOf, setCitizenOf] = useState("");
  const [destSlug, setDestSlug] = useState(presetDestinationSlug ?? "");
  const [duration, setDuration] = useState(DURATIONS[0]);
  const [purpose, setPurpose] = useState(PURPOSES[0]);
  const [result, setResult] = useState<null | {
    dest: VisaDestination;
    hasVisaNotes: boolean;
    /** Whether /guides/<slug> exists to deep-link "Full guide" to — separate
        from hasVisaNotes, since visa data can exist without a full guide. */
    hasFullGuide: boolean;
    matchedRule?: string;
    matchedWho?: string;
    officialUrl?: string;
    officialLabel?: string;
    updated?: string;
    extraNote?: string;
  }>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const valid = residentOf && citizenOf && destSlug && duration && purpose;

  function handleCheck() {
    if (!valid) return;
    const dest = destinations.find((d) => d.slug === destSlug);
    if (!dest) return;

    const visa = getVisaNotes(destSlug);
    const hasFullGuide = !!getCountryGuide(destSlug);
    if (!visa) {
      setResult({ dest, hasVisaNotes: false, hasFullGuide });
      return;
    }

    const matched =
      visa.cases.find((c) => c.matchCodes?.includes(citizenOf)) ??
      visa.cases.find((c) => !c.matchCodes || c.matchCodes.length === 0);

    const extraNote =
      purpose !== "Leisure / tourism" || duration === "More than 90 days"
        ? "Business, family, remote-work, and longer stays often follow different rules than short tourist visits — confirm the requirement for your specific purpose and length of stay."
        : undefined;

    setResult({
      dest,
      hasVisaNotes: true,
      hasFullGuide,
      matchedRule: matched?.rule,
      matchedWho: matched?.who,
      officialUrl: visa.officialUrl,
      officialLabel: visa.officialLabel,
      updated: visa.updated,
      extraNote,
    });
  }

  function reset() {
    setResult(null);
  }

  function close() {
    setOpen(false);
    setResult(null);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          triggerClassName ??
          "px-5 py-2.5 rounded-xl bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold text-sm transition-colors"
        }
      >
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={close} aria-hidden />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Visa requirement checker"
            // Explicit text-soulo-dark so this never inherits a light/white
            // color from wherever the trigger happens to be mounted (e.g. the
            // dark hero section on /guides/visas) — the dialog is a DOM child
            // of its trigger's position even though it visually escapes via
            // fixed positioning, so it was inheriting near-white text into the
            // dropdowns and making the country picker unreadable.
            className="relative w-full max-w-lg bg-white text-soulo-dark rounded-2xl shadow-2xl border border-soulo-border max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-soulo-border">
              <p className="font-display font-bold text-soulo-dark">🛂 Visa Checker</p>
              <button onClick={close} aria-label="Close" className="text-soulo-mist hover:text-soulo-dark p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {!result ? (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-soulo-grey mb-1.5">I'm a resident of</label>
                  <select
                    value={residentOf}
                    onChange={(e) => setResidentOf(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-soulo-border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-soulo-gold"
                  >
                    <option value="">Select a country</option>
                    {NATIONALITIES.map((n) => (
                      <option key={n.code} value={n.code}>{n.flag} {n.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-soulo-grey mb-1.5">I'm a citizen of</label>
                  <select
                    value={citizenOf}
                    onChange={(e) => setCitizenOf(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-soulo-border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-soulo-gold"
                  >
                    <option value="">Select a country</option>
                    {NATIONALITIES.map((n) => (
                      <option key={n.code} value={n.code}>{n.flag} {n.name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-soulo-mist mt-1">Visa rules almost always go by your passport (citizenship), not where you live.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-soulo-grey mb-1.5">I'm going to</label>
                  <select
                    value={destSlug}
                    onChange={(e) => setDestSlug(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-soulo-border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-soulo-gold"
                  >
                    <option value="">Select a country</option>
                    {destinations.map((d) => (
                      <option key={d.slug} value={d.slug}>{d.flag} {d.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-soulo-grey mb-1.5">For this long</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-soulo-border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-soulo-gold"
                    >
                      {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soulo-grey mb-1.5">I will be doing</label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-soulo-border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-soulo-gold"
                    >
                      {PURPOSES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleCheck}
                  disabled={!valid}
                  className="w-full py-3 rounded-xl bg-soulo-gold hover:bg-amber-400 disabled:bg-soulo-gold/50 disabled:cursor-not-allowed text-soulo-dark font-bold text-sm transition-colors"
                >
                  Check requirement →
                </button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{result.dest.flag}</span>
                  <p className="font-display font-bold text-lg text-soulo-dark">{result.dest.name}</p>
                </div>

                {result.hasVisaNotes ? (
                  <>
                    <div className="bg-soulo-linen border border-soulo-gold/30 rounded-xl p-4">
                      <p className="text-xs font-semibold text-soulo-gold uppercase tracking-wide mb-1.5">
                        {result.matchedWho}
                      </p>
                      <p className="text-sm text-soulo-dark leading-relaxed">{result.matchedRule}</p>
                    </div>
                    {result.extraNote && (
                      <p className="text-sm text-soulo-grey leading-relaxed">{result.extraNote}</p>
                    )}
                    <p className="text-xs text-soulo-mist">
                      This is general guidance for your passport group, reviewed {result.updated} — not a determination
                      for your exact circumstances. Confirm before booking at the{" "}
                      <a href={result.officialUrl} target="_blank" rel="noopener noreferrer" className="text-soulo-gold hover:underline font-medium">
                        {result.officialLabel}
                      </a>.
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-soulo-grey leading-relaxed">
                    We don't have visa notes for {result.dest.name} yet — but VisaHQ can look up the exact
                    requirement for your specific passport and handle the application if you need one.
                  </p>
                )}

                {/* VisaHQ: a real, per-passport checker/applier — the genuinely
                    actionable next step, especially when we have no written
                    guide for this destination. */}
                <a
                  href={visahqUrl(result.dest.name)}
                  target="_blank"
                  rel={AFFILIATES.visahq.status === "live" ? "noopener noreferrer sponsored" : "noopener noreferrer"}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-soulo-slate hover:bg-soulo-dark text-white transition-colors"
                >
                  <span className="text-sm font-medium">
                    🛂 Check my exact requirement &amp; apply via VisaHQ
                  </span>
                  <span className="text-soulo-gold font-bold text-sm whitespace-nowrap">Go →</span>
                </a>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={reset}
                    className="flex-1 py-2.5 rounded-xl border border-soulo-border text-soulo-grey hover:bg-soulo-linen text-sm font-medium transition-colors"
                  >
                    ← Check another
                  </button>
                  {result.hasFullGuide && (
                    <Link
                      href={`/guides/${result.dest.slug}#visa`}
                      onClick={close}
                      className="flex-1 text-center py-2.5 rounded-xl bg-soulo-gold hover:bg-amber-400 text-soulo-dark text-sm font-bold transition-colors"
                    >
                      Full guide →
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Persistent source/methodology footer — shown in both the form and
                result states, matching the same note on /guides/visas. */}
            <div className="px-6 py-3 border-t border-soulo-border bg-soulo-linen/60">
              <p className="text-[11px] text-soulo-mist leading-relaxed">
                <strong className="text-soulo-grey">Source:</strong> General guidance written and reviewed by the
                SouloSpotter team using each destination's official immigration portal, cross-referenced with the{" "}
                <a href="https://www.iatatravelcentre.com/" target="_blank" rel="noopener noreferrer" className="text-soulo-gold hover:underline">
                  IATA Travel Centre
                </a>
                . For your exact, personal requirement, use the VisaHQ link above or the official portal — not a
                substitute for official advice.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
