"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const TIERS = [
  { value: "featured",  label: "Featured Listing — $29/month" },
  { value: "spotlight", label: "City Spotlight — $79/month" },
  { value: "homepage",  label: "Homepage Feature — $149/month" },
];

export default function AdvertiseForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name:     (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email:    (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      business: (form.elements.namedItem("business") as HTMLInputElement).value.trim(),
      city:     (form.elements.namedItem("city") as HTMLInputElement).value.trim(),
      tier:     (form.elements.namedItem("tier") as HTMLSelectElement).value,
      message:  (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
      company:  (form.elements.namedItem("company") as HTMLInputElement)?.value ?? "", // honeypot
    };

    try {
      const res = await fetch("/api/advertise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setState("success");
    } catch {
      setState("error");
      setErrorMsg("Something went wrong. Please email us at hello@soulospotter.com");
    }
  }

  if (state === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">🚀</div>
        <h2 className="text-xl font-bold text-stone-900 mb-2">Inquiry received!</h2>
        <p className="text-soulo-grey text-sm max-w-sm mx-auto">
          We'll be in touch within 24 hours to confirm your listing details and get you set up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-soulo-border p-7 space-y-5">
      {/* Honeypot — hidden from humans, catches bots that autofill every field */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Company (leave this empty)
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-soulo-grey mb-1.5">
            Your name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            required
            placeholder="Alex Cruz"
            className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-soulo-grey mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@yourbusiness.com"
            className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-soulo-grey mb-1.5">
            Business name <span className="text-red-500">*</span>
          </label>
          <input
            name="business"
            required
            placeholder="Your hostel, café, or tour"
            className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-soulo-grey mb-1.5">
            City <span className="text-red-500">*</span>
          </label>
          <input
            name="city"
            required
            placeholder="e.g. Bali, Lisbon, Seoul"
            className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-soulo-grey mb-1.5">
          Package <span className="text-red-500">*</span>
        </label>
        <select
          name="tier"
          required
          className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all"
        >
          <option value="">Select a package</option>
          {TIERS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-soulo-grey mb-1.5">
          Anything else? <span className="text-soulo-mist font-normal">(optional)</span>
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Multiple locations, special requests, questions..."
          className="w-full px-4 py-2.5 rounded-xl border border-soulo-border text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold transition-all resize-none"
        />
      </div>

      {state === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full py-3.5 bg-soulo-gold hover:bg-amber-400 disabled:bg-soulo-gold/60 text-soulo-dark font-bold rounded-xl transition-colors text-sm"
      >
        {state === "submitting" ? "Sending..." : "Send inquiry →"}
      </button>

      <p className="text-xs text-center text-soulo-mist">
        We'll reply within 24 hours. No automated sales sequences — a real human will respond.
      </p>
    </form>
  );
}
