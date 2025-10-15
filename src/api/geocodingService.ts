/* eslint-disable */
import axios from 'axios';
import { CityOption } from '../data/cities';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

// simple in-memory cache for search results to avoid excessive requests
const memoryCache = new Map<string, CityOption[]>();

function makeKey(q: string): string {
  return `geocode_${q.trim().toLowerCase()}`;
}

export async function searchCities(query: string, count: number = 10, language: string = 'es'): Promise<CityOption[]> {
  const q = query.trim();
  if (!q) return [];

  const key = makeKey(`${q}_${count}_${language}`);
  const cached = memoryCache.get(key);
  if (cached) return cached;

  try {
    const response = await axios.get(GEOCODING_URL, {
      params: { name: q, count, language, format: 'json' },
    });

    const raw = response && response.data && response.data.results ? response.data.results : [];
    const results = Array.isArray(raw) ? raw : [];
    const mapped: CityOption[] = results
      .filter((r: any) => r && typeof r.latitude === 'number' && typeof r.longitude === 'number')
      .map((r: any) => ({
        name: String((r && r.name) || ''),
        country: String((r && (r.country || r.country_code)) || ''),
        latitude: r.latitude,
        longitude: r.longitude,
      }));

    memoryCache.set(key, mapped);
    return mapped;
  } catch (_) {
    return [];
  }
}
