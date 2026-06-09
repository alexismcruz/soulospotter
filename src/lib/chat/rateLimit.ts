// Simple in-memory sliding-window rate limiter, keyed by client IP.
// Railway runs a long-lived Node server, so module state persists across requests.

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 20;        // messages per IP per window

export function checkRateLimit(ip: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const b = buckets.get(ip);

  if (!b || now > b.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  if (b.count >= MAX_PER_WINDOW) {
    return { ok: false, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count += 1;
  return { ok: true };
}

// Occasionally evict expired buckets so the map can't grow unbounded.
let lastSweep = 0;
export function sweepRateLimit() {
  const now = Date.now();
  if (now - lastSweep < WINDOW_MS) return;
  lastSweep = now;
  for (const [ip, b] of buckets) if (now > b.resetAt) buckets.delete(ip);
}
