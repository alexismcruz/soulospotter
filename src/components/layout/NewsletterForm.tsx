"use client";

import { useState } from "react";

type State = "idle" | "submitting" | "success" | "error";

export default function NewsletterForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setMessage("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const company = (form.elements.namedItem("company") as HTMLInputElement)?.value ?? ""; // honeypot

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json.error ?? "Something went wrong. Please try again.");
      }

      setState("success");
      setMessage(
        json.alreadySubscribed
          ? "You're already on the list — thanks for the enthusiasm!"
          : "You're in. Check your inbox to confirm.",
      );
      form.reset();
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (state === "success") {
    return (
      <div className="w-full sm:w-auto flex items-center gap-2 text-sm text-soulo-white">
        <span className="text-soulo-gold text-lg leading-none" aria-hidden>✓</span>
        <p role="status">{message}</p>
      </div>
    );
  }

  return (
    <div className="w-full sm:w-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto" aria-label="Newsletter signup">
        {/* Honeypot — hidden from humans, catches bots that autofill every field */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
          <label>
            Company (leave this empty)
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          aria-label="Email address"
          disabled={state === "submitting"}
          className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-soulo-white placeholder-soulo-mist text-sm focus:outline-none focus:ring-2 focus:ring-soulo-gold focus:border-transparent transition-all disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="px-5 py-2.5 bg-soulo-gold hover:bg-amber-400 disabled:bg-soulo-gold/60 text-soulo-dark text-sm font-bold rounded-xl transition-colors whitespace-nowrap"
        >
          {state === "submitting" ? "Signing up…" : "Subscribe"}
        </button>
      </form>

      {state === "error" && (
        <p role="alert" className="mt-2 text-xs text-red-300 max-w-xs">
          {message}
        </p>
      )}
    </div>
  );
}
