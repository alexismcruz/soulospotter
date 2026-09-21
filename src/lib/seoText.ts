/**
 * Small text helpers for search snippets and on-page solo-traveller copy, built ONLY from
 * real per-spot data (the comfortableAlone / meetPeople flags, price range) — nothing here
 * invents facts about a venue.
 */

/** First sentence of `text`, capped at `max` chars (cut at a word boundary), ending in a period. */
export function firstSentence(text: string, max = 115): string {
  const clean = text.replace(/\s+/g, " ").trim();
  const m = clean.match(/^.*?[.!?](?=\s|$)/);
  let s = m ? m[0] : clean;
  if (s.length > max) {
    // Too long: end at the last comma if there's a sensible one (reads as a complete clause),
    // otherwise cut at a word boundary and be honest about it with an ellipsis.
    const cut = s.slice(0, max);
    const comma = cut.lastIndexOf(",");
    if (comma > max * 0.5) return cut.slice(0, comma).replace(/[\s;:–—-]+$/, "") + ".";
    return cut.replace(/\s+\S*$/, "").replace(/[\s,;:–—-]+$/, "") + "…";
  }
  s = s.replace(/[\s,;:–—-]+$/, "");
  return /[.!?]$/.test(s) ? s : s + ".";
}

/** "Comfortable to X on your own" wording, by category (matches how the flag is defined). */
export function aloneSentence(category: string): string {
  switch (category) {
    case "FOOD":
      return "Comfortable to eat here on your own — you won't feel out of place dining solo.";
    case "NIGHTLIFE":
      return "Comfortable to go out here on your own.";
    case "CAFE":
      return "Comfortable to sit here on your own, whether you're reading, working or people-watching.";
    case "COWORKING":
      return "Comfortable to work from on your own.";
    case "ACCOMMODATION":
      return "Comfortable for solo guests.";
    default:
      return "Comfortable to visit on your own.";
  }
}

/** Short hook for the meta description, from the real flags. Empty string if neither applies. */
export function soloHook(category: string, comfortableAlone: boolean, meetPeople: boolean): string {
  const place =
    category === "FOOD" ? "to eat" : category === "NIGHTLIFE" ? "to go out" : category === "CAFE" ? "to sit" : "to visit";
  if (comfortableAlone && meetPeople) return `Easy ${place} alone and good for meeting people.`;
  if (comfortableAlone) return `Comfortable ${place} alone.`;
  if (meetPeople) return "Good for meeting other travelers.";
  return "";
}

/**
 * Meta description for a spot: its own first sentence + the solo hook, kept under ~158 chars.
 * Returns null if the spot has no description (caller falls back to a generic line).
 */
export function spotMetaDescription(opts: {
  description: string | null;
  category: string;
  comfortableAlone: boolean;
  meetPeople: boolean;
}): string | null {
  if (!opts.description) return null;
  const hook = soloHook(opts.category, opts.comfortableAlone, opts.meetPeople);
  const room = 158 - (hook ? hook.length + 1 : 0);
  const lead = firstSentence(opts.description, Math.max(60, Math.min(120, room)));
  return hook ? `${lead} ${hook}` : lead;
}

/** Intent phrase people actually search for, by category, for category-page descriptions. */
export function categoryIntent(category: string, cityName: string, count: number): string | null {
  const n = count === 1 ? "the best" : `the ${count} best`;
  switch (category) {
    case "FOOD":
      return `Solo dining in ${cityName}: ${n} places to eat alone — restaurants, street food and bars where you'll feel comfortable on your own.`;
    case "NIGHTLIFE":
      return `Going out alone in ${cityName}? ${n === "the best" ? "The best" : `The ${count} best`} bars, clubs and nightlife spots for solo travelers — friendly places where it's easy to meet people.`;
    case "CAFE":
      return `${n === "the best" ? "The best" : `The ${count} best`} cafes in ${cityName} for solo travelers — quiet spots to read, work or meet people on your own.`;
    case "COWORKING":
      return `${n === "the best" ? "The best" : `The ${count} best`} coworking spaces in ${cityName} for solo travelers and remote workers — hand-picked places to work and meet people.`;
    default:
      return null;
  }
}
