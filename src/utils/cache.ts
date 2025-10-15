/* eslint-disable */
export interface CacheEntry<T> {
  value: T;
  timestamp: number; // epoch ms
}

const ONE_HOUR_MS = 60 * 60 * 1000;

export const makeWeatherKey = (city: string) => `weather_${city.trim().toLowerCase()}`;

export function setCache<T>(key: string, value: T): void {
  try {
    const entry: CacheEntry<T> = { value, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (_) {
    // Ignore storage errors (e.g., quota, SSR)
  }
}

export function getCache(key: string, maxAgeMs: number = ONE_HOUR_MS): any | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: any = JSON.parse(raw);
    if (!entry || typeof entry.timestamp !== 'number') return null;
    if (Date.now() - entry.timestamp > maxAgeMs) return null;
    return entry.value;
  } catch (_) {
    return null;
  }
}

export function getStaleCache(key: string): any | null {
  // Returns cached value ignoring expiration
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: any = JSON.parse(raw);
    return entry && 'value' in entry ? entry.value : null;
  } catch (_) {
    return null;
  }
}

export const CACHE_TTL_MS = ONE_HOUR_MS;
