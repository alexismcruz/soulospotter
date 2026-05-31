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

export default function SubmitForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      spotName:       (form.spotName as HTMLInputElement).value.trim(),
      category:       (form.category as HTMLSelectElement).value as SpotCategory,
      description:    (form.description as HTMLTextAreaElement).value.trim(),
      address:        (form.address as HTMLInputElement).value.trim(),
      website:        (form.website as HTMLInputElement).value.trim(),
      cityName:       (form.cityName as HTMLInputElement).value.trim(),
      countryName:    (form.countryName as HTMLInputElement).value.trim(),
      submitterName:  (form.submitterName as HTMLInputElement).value.trim(),
      submitterEmail: (form.submitterEmail as HTMLInputElement).value.trim(),
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
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-xl font-bold text-soulo-dark mb-2">Thanks for your submission!</h2>
        <p className="text-soulo-grey text-sm max-w-sm mx-auto">
          We'll review your listing within 5 business days. If approved, it will appear on the city page automatically.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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
