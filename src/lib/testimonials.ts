/**
 * Homepage social-proof content.
 *
 * SouloSpotter markets itself as honest and editorially independent, so this
 * section must never show fabricated quotes. The homepage renders REAL
 * testimonials only when `TESTIMONIALS` is non-empty; until then it falls back
 * to the editorial value-prop band (`VALUE_PROPS`) — an honest "why this works"
 * rather than invented endorsements.
 */

export type Testimonial = {
  /** The quote, verbatim, with permission to publish. */
  quote: string;
  /** Full attributable name — NOT a single-initial placeholder ("Maya R."). */
  name: string;
  /** Context line, e.g. "Solo trip to Lisbon, Portugal". */
  detail: string;
  /**
   * Where it came from — a link to the original public post/review, or a note
   * like "shared via email, published with permission". Required so every quote
   * is genuinely attributable. Never add a testimonial without this.
   */
  source: string;
  /** One or two letters for the avatar chip. */
  avatar: string;
  /** Tailwind classes for the avatar chip colour. */
  color: string;
};

/**
 * REAL, attributable testimonials only. Empty until we have genuine ones with
 * permission to publish. Do not add placeholders — an empty array is honest; a
 * fake quote is not. When you add the first real entry, the homepage switches
 * from the value-prop band to showing these automatically.
 */
export const TESTIMONIALS: Testimonial[] = [];

export type ValueProp = {
  emoji: string;
  title: string;
  body: string;
};

/**
 * Editorial value props shown while there are no real testimonials. Every claim
 * here maps to an actual product feature (solo-first curation, safety/cost data,
 * no pay-to-rank), so it stays true to the "editorially independent" positioning.
 */
export const VALUE_PROPS: ValueProp[] = [
  {
    emoji: "🧭",
    title: "Built for solo travelers",
    body: "Every spot is chosen for people traveling alone — cafés you can actually work in, hostels with real social energy, and places you won't feel out of place eating solo.",
  },
  {
    emoji: "🛡️",
    title: "Plan with real data",
    body: "Safety scores, cost levels, and solo-friendliness on every city — so you decide where to go with facts, not guesswork or sponsored fluff.",
  },
  {
    emoji: "🎯",
    title: "Editorially independent",
    body: "We never take payment to rank a spot higher, and there are no ads in our results. Every recommendation is here because it's genuinely useful for solo travelers.",
  },
];
