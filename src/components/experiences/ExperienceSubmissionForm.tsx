"use client";

import { useState } from "react";
import { z } from "zod";
import { ExperienceCategory } from "@prisma/client";

interface City {
  slug: string;
  name: string;
}

interface ExperienceSubmissionFormProps {
  cities: City[];
}

type FormState = "idle" | "submitting" | "success" | "error";

const CATEGORIES = [
  { value: "OUTDOOR_ADVENTURE", label: "Outdoor & Adventure 🥾" },
  { value: "FOOD_DRINK", label: "Food & Drink 🍜" },
  { value: "ARTS_CULTURE", label: "Arts & Culture 🎨" },
  { value: "WELLNESS_MINDFULNESS", label: "Wellness & Mindfulness 🧘" },
  { value: "NIGHTLIFE_SOCIAL", label: "Nightlife & Social 🌙" },
  { value: "DAY_TRIPS", label: "Day Trips 🚌" },
  { value: "PHOTOGRAPHY_WALKS", label: "Photography Walks 📸" },
  { value: "FITNESS_SPORTS", label: "Fitness & Sports 🥊" },
];

const FREQUENCIES = [
  { value: "one-time", label: "One-time" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "seasonal", label: "Seasonal" },
];

export default function ExperienceSubmissionForm({ cities }: ExperienceSubmissionFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    category: "",
    description: "",
    price: "",
    groupSizeMin: "",
    groupSizeMax: "",
    duration: "",
    frequency: "",
    bookingUrl: "",
    photoUrl: "",
    organizerName: "",
    organizerEmail: "",
    package: "basic",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");
    setError(null);
    setValidationErrors({});

    // Read honeypot straight from the DOM (this form posts from React state, so a
    // bot that fills the hidden field via the DOM wouldn't otherwise be caught).
    const company = (e.currentTarget.elements.namedItem("company") as HTMLInputElement)?.value ?? "";

    try {
      const response = await fetch("/api/experiences/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          groupSizeMin: parseInt(formData.groupSizeMin),
          groupSizeMax: parseInt(formData.groupSizeMax),
          company, // honeypot
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.issues) {
          const errors: Record<string, string> = {};
          data.issues.forEach((issue: any) => {
            const path = issue.path?.[0];
            if (path) {
              errors[path] = issue.message;
            }
          });
          setValidationErrors(errors);
        }
        setError(data.error || "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setState("success");
    } catch (err) {
      setError("Failed to submit form. Please try again.");
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="max-w-2xl mx-auto bg-soulo-linen border-2 border-soulo-gold rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="font-display text-2xl font-bold text-soulo-dark mb-2">
          Thanks for submitting!
        </h3>
        <p className="text-soulo-grey mb-4">
          We'll review your experience within 5 business days. Check your email ({formData.organizerEmail}) for updates.
        </p>
        <button
          onClick={() => {
            setState("idle");
            setFormData({
              name: "",
              city: "",
              category: "",
              description: "",
              price: "",
              groupSizeMin: "",
              groupSizeMax: "",
              duration: "",
              frequency: "",
              bookingUrl: "",
              photoUrl: "",
              organizerName: "",
              organizerEmail: "",
              package: "basic",
              notes: "",
            });
          }}
          className="px-6 py-2.5 bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold rounded-xl transition-colors"
        >
          Submit Another Experience
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      {/* Honeypot — hidden from humans, catches bots that autofill every field */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Company (leave this empty)
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-red-700 text-sm font-semibold">{error}</p>
        </div>
      )}

      {/* Section 1: About Your Experience */}
      <fieldset className="space-y-5 pb-8 border-b border-soulo-border">
        <legend className="text-lg font-display font-bold text-soulo-dark mb-5">
          About Your Experience
        </legend>

        <div>
          <label className="block text-xs text-soulo-mist uppercase font-semibold mb-1.5">
            Experience Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Bangkok Thai Cooking Class"
            className={`w-full px-4 py-2.5 border rounded-xl text-soulo-dark placeholder-soulo-grey focus:ring-2 focus:outline-none ${
              validationErrors.name ? "border-red-400 focus:ring-red-200" : "border-soulo-border focus:ring-soulo-gold"
            }`}
            required
          />
          {validationErrors.name && (
            <p className="text-red-600 text-xs mt-1">{validationErrors.name}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-soulo-mist uppercase font-semibold mb-1.5">
              City *
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-xl text-soulo-dark focus:ring-2 focus:outline-none ${
                validationErrors.city ? "border-red-400 focus:ring-red-200" : "border-soulo-border focus:ring-soulo-gold"
              }`}
              required
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.slug} value={city.slug}>
                  {city.name}
                </option>
              ))}
            </select>
            {validationErrors.city && (
              <p className="text-red-600 text-xs mt-1">{validationErrors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-soulo-mist uppercase font-semibold mb-1.5">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-xl text-soulo-dark focus:ring-2 focus:outline-none ${
                validationErrors.category ? "border-red-400 focus:ring-red-200" : "border-soulo-border focus:ring-soulo-gold"
              }`}
              required
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {validationErrors.category && (
              <p className="text-red-600 text-xs mt-1">{validationErrors.category}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs text-soulo-mist uppercase font-semibold mb-1.5">
            Description (50-500 characters) *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell solo travelers what makes this experience special..."
            rows={5}
            className={`w-full px-4 py-2.5 border rounded-xl text-soulo-dark placeholder-soulo-grey focus:ring-2 focus:outline-none resize-none ${
              validationErrors.description ? "border-red-400 focus:ring-red-200" : "border-soulo-border focus:ring-soulo-gold"
            }`}
            required
          />
          <p className="text-xs text-soulo-grey mt-1">
            {formData.description.length}/500 characters
          </p>
          {validationErrors.description && (
            <p className="text-red-600 text-xs mt-1">{validationErrors.description}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-soulo-mist uppercase font-semibold mb-1.5">
              Price per Person ($) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="45"
              min="0"
              step="0.01"
              className={`w-full px-4 py-2.5 border rounded-xl text-soulo-dark placeholder-soulo-grey focus:ring-2 focus:outline-none ${
                validationErrors.price ? "border-red-400 focus:ring-red-200" : "border-soulo-border focus:ring-soulo-gold"
              }`}
              required
            />
            {validationErrors.price && (
              <p className="text-red-600 text-xs mt-1">{validationErrors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-soulo-mist uppercase font-semibold mb-1.5">
              Duration (e.g., "2 hours", "Full day") *
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="3 hours"
              className={`w-full px-4 py-2.5 border rounded-xl text-soulo-dark placeholder-soulo-grey focus:ring-2 focus:outline-none ${
                validationErrors.duration ? "border-red-400 focus:ring-red-200" : "border-soulo-border focus:ring-soulo-gold"
              }`}
              required
            />
            {validationErrors.duration && (
              <p className="text-red-600 text-xs mt-1">{validationErrors.duration}</p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-soulo-mist uppercase font-semibold mb-1.5">
              Group Size Min *
            </label>
            <input
              type="number"
              name="groupSizeMin"
              value={formData.groupSizeMin}
              onChange={handleChange}
              placeholder="1"
              min="1"
              className={`w-full px-4 py-2.5 border rounded-xl text-soulo-dark placeholder-soulo-grey focus:ring-2 focus:outline-none ${
                validationErrors.groupSizeMin ? "border-red-400 focus:ring-red-200" : "border-soulo-border focus:ring-soulo-gold"
              }`}
              required
            />
            {validationErrors.groupSizeMin && (
              <p className="text-red-600 text-xs mt-1">{validationErrors.groupSizeMin}</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-soulo-mist uppercase font-semibold mb-1.5">
              Group Size Max *
            </label>
            <input
              type="number"
              name="groupSizeMax"
              value={formData.groupSizeMax}
              onChange={handleChange}
              placeholder="6"
              min="1"
              className={`w-full px-4 py-2.5 border rounded-xl text-soulo-dark placeholder-soulo-grey focus:ring-2 focus:outline-none ${
                validationErrors.groupSizeMax ? "border-red-400 focus:ring-red-200" : "border-soulo-border focus:ring-soulo-gold"
              }`}
              required
            />
            {validationErrors.groupSizeMax && (
              <p className="text-red-600 text-xs mt-1">{validationErrors.groupSizeMax}</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-soulo-mist uppercase font-semibold mb-1.5">
              Frequency *
            </label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-xl text-soulo-dark focus:ring-2 focus:outline-none ${
                validationErrors.frequency ? "border-red-400 focus:ring-red-200" : "border-soulo-border focus:ring-soulo-gold"
              }`}
              required
            >
              <option value="">Select frequency</option>
              {FREQUENCIES.map((freq) => (
                <option key={freq.value} value={freq.value}>
                  {freq.label}
                </option>
              ))}
            </select>
            {validationErrors.frequency && (
              <p className="text-red-600 text-xs mt-1">{validationErrors.frequency}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs text-soulo-mist uppercase font-semibold mb-1.5">
            External Booking URL *
          </label>
          <input
            type="url"
            name="bookingUrl"
            value={formData.bookingUrl}
            onChange={handleChange}
            placeholder="https://www.getyourguide.com/..."
            className={`w-full px-4 py-2.5 border rounded-xl text-soulo-dark placeholder-soulo-grey focus:ring-2 focus:outline-none ${
              validationErrors.bookingUrl ? "border-red-400 focus:ring-red-200" : "border-soulo-border focus:ring-soulo-gold"
            }`}
            required
          />
          {validationErrors.bookingUrl && (
            <p className="text-red-600 text-xs mt-1">{validationErrors.bookingUrl}</p>
          )}
        </div>

        <div>
          <label className="block text-xs text-soulo-mist uppercase font-semibold mb-1.5">
            Cover Photo URL (Optional - Unsplash or Cloudinary)
          </label>
          <input
            type="url"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-4 py-2.5 border border-soulo-border rounded-xl text-soulo-dark placeholder-soulo-grey focus:ring-2 focus:ring-soulo-gold focus:outline-none"
          />
        </div>
      </fieldset>

      {/* Section 2: About You */}
      <fieldset className="space-y-5 pb-8 border-b border-soulo-border">
        <legend className="text-lg font-display font-bold text-soulo-dark mb-5">
          About You
        </legend>

        <div>
          <label className="block text-xs text-soulo-mist uppercase font-semibold mb-1.5">
            Organizer Name *
          </label>
          <input
            type="text"
            name="organizerName"
            value={formData.organizerName}
            onChange={handleChange}
            placeholder="Your name"
            className={`w-full px-4 py-2.5 border rounded-xl text-soulo-dark placeholder-soulo-grey focus:ring-2 focus:outline-none ${
              validationErrors.organizerName ? "border-red-400 focus:ring-red-200" : "border-soulo-border focus:ring-soulo-gold"
            }`}
            required
          />
          {validationErrors.organizerName && (
            <p className="text-red-600 text-xs mt-1">{validationErrors.organizerName}</p>
          )}
        </div>

        <div>
          <label className="block text-xs text-soulo-mist uppercase font-semibold mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            name="organizerEmail"
            value={formData.organizerEmail}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full px-4 py-2.5 border rounded-xl text-soulo-dark placeholder-soulo-grey focus:ring-2 focus:outline-none ${
              validationErrors.organizerEmail ? "border-red-400 focus:ring-red-200" : "border-soulo-border focus:ring-soulo-gold"
            }`}
            required
          />
          {validationErrors.organizerEmail && (
            <p className="text-red-600 text-xs mt-1">{validationErrors.organizerEmail}</p>
          )}
        </div>
      </fieldset>

      {/* Section 3: Package Selection */}
      <fieldset className="space-y-5">
        <legend className="text-lg font-display font-bold text-soulo-dark mb-5">
          Choose Your Package
        </legend>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Basic Package */}
          <label className={`relative p-5 border-2 rounded-2xl cursor-pointer transition-all ${
            formData.package === "basic" ? "border-soulo-gold bg-soulo-linen" : "border-soulo-border hover:border-soulo-gold"
          }`}>
            <input
              type="radio"
              name="package"
              value="basic"
              checked={formData.package === "basic"}
              onChange={handleChange}
              className="sr-only"
            />
            <div className="font-display font-bold text-soulo-dark text-lg">Basic Listing</div>
            <p className="text-soulo-gold font-bold text-xl mt-1">$29/mo</p>
            <ul className="mt-3 space-y-1 text-sm text-soulo-grey">
              <li>✓ Listed in city + category</li>
              <li>✓ Standard card design</li>
              <li>✓ External booking link</li>
            </ul>
          </label>

          {/* Featured Package */}
          <label className={`relative p-5 border-2 rounded-2xl cursor-pointer transition-all ring-2 ring-soulo-gold ring-opacity-30 ${
            formData.package === "featured" ? "border-soulo-gold bg-soulo-linen" : "border-soulo-border hover:border-soulo-gold"
          }`}>
            <input
              type="radio"
              name="package"
              value="featured"
              checked={formData.package === "featured"}
              onChange={handleChange}
              className="sr-only"
            />
            <div className="flex items-center gap-2">
              <span className="text-lg">⭐</span>
              <span className="font-display font-bold text-soulo-dark text-lg">Featured</span>
            </div>
            <p className="text-soulo-gold font-bold text-xl mt-1">$79/mo</p>
            <ul className="mt-3 space-y-1 text-sm text-soulo-grey">
              <li>✓ Everything in Basic</li>
              <li>✓ Featured badge & priority</li>
              <li>✓ Photo on card</li>
              <li>✓ Bold card styling</li>
            </ul>
          </label>
        </div>

        <div>
          <label className="block text-xs text-soulo-mist uppercase font-semibold mb-1.5">
            Additional Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Anything else we should know about your experience?"
            rows={3}
            className="w-full px-4 py-2.5 border border-soulo-border rounded-xl text-soulo-dark placeholder-soulo-grey focus:ring-2 focus:ring-soulo-gold focus:outline-none resize-none"
          />
        </div>
      </fieldset>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full px-6 py-3 bg-soulo-gold hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-soulo-dark font-bold rounded-2xl transition-colors text-lg"
      >
        {state === "submitting" ? "Submitting..." : "Submit Your Experience"}
      </button>

      <p className="text-xs text-soulo-grey text-center">
        We'll review within 5 business days and send you an update at {formData.organizerEmail || "your email"}
      </p>
    </form>
  );
}
