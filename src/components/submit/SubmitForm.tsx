"use client";

import { useState } from "react";
import { SpotCategory } from "@prisma/client";

const CATEGORIES: { value: SpotCategory; label: string; emoji: string }[] = [
  { value: "ACCOMMODATION", label: "Accommodation",  emoji: "🏨" },
  { value: "CAFE",          label: "Café",           emoji: "☕" },
  { value: "COWORKING",     label: "Coworking",      emoji: "💻" },
  { value: "FOOD",          label: "Food & Drink",   emoji: "🍜" },
  { value: "WELLNESS",      label: "Wellness",       emoji: "🧘" },
  { value: "COMMUNITY",     label: "Community",      emoji: "🤝" },
  { value: "NATURE",        label: "Nature",         emoji: "🏔️" },
  { value: "CULTURE",       label: "Culture",        emoji: "🏛️" },
  { value: "NIGHTLIFE",     label: "Nightlife",      emoji: "🌙" },
  { value: "TRANSPORT",     label: "Transport",      emoji: "✈️" },
];

type FormState = "idle" | "submitting" | "success" | "error";
type SubmissionType = "NEW" | "CORRECTION";

export default function SubmitForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [submissionType, setSubmissionType] = useState<SubmissionType>("NEW");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      type:           submissionType,
      spotId:         submissionType === "CORRECTION" ? (form.spotId as HTMLInputElement)?.value.trim() || null : null,
      spotName:       (form.spotName as HTMLInputElement).value.trim(),
      category:       (form.category as HTMLSelectElement).value as SpotCategory,
      description:    (form.description as HTMLTextAreaElement).value.trim(),
      address:        (form.address as HTMLInputElement).value.trim(),
      website:        (form.website as HTMLInputElement).value.trim() || null,
      imageUrl:       (form.imageUrl as HTMLInputElement).value.trim() || null,
      cityName:       (form.cityName as HTMLInputElement).value.trim(),
      countryName:    (form.countryName as HTMLInputElement).value.trim(),
      submitterName:  (form.submitterName as HTMLInputElement).value.trim(),
      submitterEmail: (form.submitterEmail as HTMLInputElement).value.trim(),
      company:        (form.company as HTMLInputElement)?.value ?? "", // honeypot
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Submission failed");
      }
      setState("success");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "success") {
    return (
      <div className="space-y-4">
        <div className="bg-soulo-linen border border-soulo-gold/40 rounded-2xl p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-soulo-gold/20 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-soulo-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-soulo-dark mb-2">Spot submitted!</h2>
          <p className="text-soulo-grey text-sm max-w-sm mx-auto mb-6 leading-relaxed">
            We&apos;ll review your listing within 5 business days. Once approved, it will appear on the city page automatically. We may email you if we have questions.
          </p>
          <button
            onClick={() => setState("idle")}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-soulo-border text-soulo-grey hover:bg-white hover:text-soulo-dark transition-colors text-sm font-medium"
          >
            Submit another spot
          </button>
        </div>

        <div className="bg-soulo-slate rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-soulo-white font-semibold text-sm mb-0.5">Help us reach more solo travelers</p>
            <p className="text-soulo-mist text-xs">Share SouloSpotter with a solo traveler friend — every spot added makes the directory more useful for everyone.</p>
          </div>
          <a
            href="https://soulospotter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-soulo-gold hover:bg-amber-400 text-soulo-dark text-sm font-bold transition-colors whitespace-nowrap"
          >
            Share SouloSpotter →
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Honeypot — hidden from humans, catches bots that autofill every field */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Company (leave this empty)
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Section: Submission Type */}
      <fieldset className="bg-white rounded-2xl border border-soulo-border p-6 space-y-4">
        <legend className="text-base font-display font-bold text-soulo-dark px-1">What are you doing?</legend>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="NEW"
              checked={submissionType === "NEW"}
              onChange={(e) => setSubmissionType(e.target.value as SubmissionType)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-soulo-dark">
              📍 Suggesting a new venue
            </span>
          </label>
          <p className="text-xs text-soulo-grey ml-7">Add a place you love to the directory (needs approval)</p>

          <label className="flex items-center gap-3 cursor-pointer mt-4">
            <input
              type="radio"
              name="type"
              value="CORRECTION"
              checked={submissionType === "CORRECTION"}
              onChange={(e) => setSubmissionType(e.target.value as SubmissionType)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-soulo-dark">
              ✏️ Correcting info on an existing venue
            </span>
          </label>
          <p className="text-xs text-soulo-grey ml-7">Update a photo, hours, or other details (quick approval)</p>
        </div>
      </fieldset>

      {/* Section: About the spot */}
      <fieldset className="bg-white rounded-2xl border border-soulo-border p-6 space-y-5">
        <legend className="text-base font-display font-bold text-soulo-dark px-1">About the spot</legend>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-soulo-grey mb-1.5">
              Spot name <span className="text-red-500">*</span>
            </label>
            <input
              name="spotName"
              required
              placeholder="e.g. Pergamino Café"
              className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-soulo-grey mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.emoji} {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-soulo-grey mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            required
            minLength={20}
            maxLength={1000}
            rows={4}
            placeholder="Why is this spot great for solo travelers? What makes it special? (min. 20 characters)"
            className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all resize-none"
          />
        </div>

        {submissionType === "CORRECTION" && (
          <div>
            <label className="block text-sm font-medium text-soulo-grey mb-1.5">
              Venue name (to identify which listing) <span className="text-red-500">*</span>
            </label>
            <input
              name="spotId"
              placeholder="e.g. Canggu Social"
              className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
            />
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-soulo-grey mb-1.5">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              name="address"
              required
              placeholder="Street address or neighbourhood"
              className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-soulo-grey mb-1.5">
              Website <span className="text-soulo-mist font-normal">(optional)</span>
            </label>
            <input
              name="website"
              type="url"
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-soulo-grey mb-1.5">
              Photo URL <span className="text-soulo-mist font-normal">(optional)</span>
            </label>
            <input
              name="imageUrl"
              type="url"
              placeholder="https://images.example.com/photo.jpg"
              className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
            />
            <p className="text-xs text-soulo-mist mt-1.5">
              Share a direct link to a photo of this spot (we'll use a generic one if you skip this)
            </p>
          </div>
        </div>
      </fieldset>

      {/* Section: Location */}
      <fieldset className="bg-white rounded-2xl border border-soulo-border p-6 space-y-5">
        <legend className="text-base font-display font-bold text-soulo-dark px-1">Location</legend>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-soulo-grey mb-1.5">
              City <span className="text-red-500">*</span>
            </label>
            <input
              name="cityName"
              required
              placeholder="e.g. Medellín"
              className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-soulo-grey mb-1.5">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              name="countryName"
              required
              placeholder="e.g. Colombia"
              className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
            />
          </div>
        </div>

        <div className="bg-soulo-linen border border-soulo-gold/30 rounded-xl p-3.5 text-xs text-soulo-grey">
          💡 <strong>Not on our city list yet?</strong> Submit it anyway — if we get enough spots in a city, we'll add it to the directory.
        </div>
      </fieldset>

      {/* Section: About you */}
      <fieldset className="bg-white rounded-2xl border border-soulo-border p-6 space-y-5">
        <legend className="text-base font-display font-bold text-soulo-dark px-1">About you</legend>
        <p className="text-xs text-soulo-mist -mt-2">We won't publish your details — this is just so we can follow up if needed.</p>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-soulo-grey mb-1.5">
              Your name <span className="text-red-500">*</span>
            </label>
            <input
              name="submitterName"
              required
              placeholder="Your name"
              className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-soulo-grey mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="submitterEmail"
              type="email"
              required
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
            />
          </div>
        </div>
      </fieldset>

      {/* Error */}
      {state === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {errorMsg || "Something went wrong. Please try again."}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full py-3.5 bg-soulo-gold hover:bg-amber-400 disabled:bg-soulo-gold/60 text-soulo-dark font-bold rounded-xl transition-colors text-sm"
      >
        {state === "submitting" ? "Submitting..." : "Submit listing for review →"}
      </button>

      <p className="text-xs text-center text-soulo-mist">
        By submitting, you confirm this is a real place and you have no commercial interest in it (or have disclosed that you do).
      </p>
    </form>
  );
}
