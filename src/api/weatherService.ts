/* eslint-disable */
import axios from 'axios';
import { ForecastDay, WeatherData } from '../types';
import { CACHE_TTL_MS, getCache, getStaleCache, makeWeatherKey, setCache } from '../utils/cache';
import { CityOption, formatCityLabel } from '../data/cities';
import { getWeatherCodeInfo } from '../utils/weatherCode';

const API_URL = 'https://api.open-meteo.com/v1/forecast';
// OpenWeather configurable endpoints (note: REACT_APP_* are exposed to the client bundle)
const OW_BASE = process.env.REACT_APP_OPENWEATHER_BASE || 'https://api.openweathermap.org';
const OW_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
type Provider = 'openmeteo' | 'openweather';
function envProvider(): Provider {
    const raw = String(process.env.REACT_APP_PROVIDER || 'openmeteo').toLowerCase();
    return raw === 'openweather' ? 'openweather' : 'openmeteo';
}
let currentProvider: Provider = envProvider();
export function setWeatherProvider(provider: Provider) {
    currentProvider = provider;
}

// Open-Meteo: Fetch current weather by coordinates (existing implementation, kept as default)
const fetchWeatherByCoordsOpenMeteo = async (option: CityOption): Promise<WeatherData> => {
    const label = formatCityLabel(option);
    const cacheKey = makeWeatherKey(label);
    const cached = getCache(cacheKey, CACHE_TTL_MS);
    if (cached) return cached;

    const { latitude, longitude } = option;
    try {
        const response = await axios.get(API_URL, {
            params: {
                latitude,
                longitude,
                current_weather: true,
                hourly: 'relativehumidity_2m',
                daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode',
                forecast_days: 5,
                timezone: 'auto',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to fetch weather data');
        }

        const currentWeather = response.data.current_weather;
        if (!currentWeather) {
            throw new Error('No current weather data available');
        }

        // Map daily forecast if present
        let forecast: ForecastDay[] | undefined = undefined;
        const daily = response.data.daily;
        if (daily && Array.isArray(daily.time)) {
            const len = Math.min(
                daily.time.length || 0,
                (daily.temperature_2m_max || []).length,
                (daily.temperature_2m_min || []).length,
                (daily.precipitation_sum || []).length,
                (daily.weathercode || []).length,
            );
            forecast = Array.from({ length: len }).map((_, i) => ({
                date: String(daily.time[i]),
                tmax: Number(daily.temperature_2m_max[i]),
                tmin: Number(daily.temperature_2m_min[i]),
                precipitation: Number(daily.precipitation_sum[i] || 0),
                weathercode: Number(daily.weathercode[i]),
            }));
        }

        const currentInfo = getWeatherCodeInfo(currentWeather.weathercode);
        const humidityArr = response.data.hourly && response.data.hourly.relativehumidity_2m;
        const humidity = Array.isArray(humidityArr) && humidityArr.length > 0 ? Number(humidityArr[0]) : 0;

        const weatherData: WeatherData = {
            temperature: currentWeather.temperature,
            humidity,
            windSpeed: currentWeather.windspeed,
            description: currentInfo.label,
            city: label,
            forecast,
        };

        setCache(cacheKey, weatherData);
        return weatherData;
    } catch (err) {
        const stale = getStaleCache(cacheKey);
        if (stale) return stale;
        throw err;
    }
};

// OpenWeather: current weather by coordinates (maps to WeatherData)
async function fetchOWCurrentByCoords(option: CityOption): Promise<WeatherData> {
    if (!OW_KEY) throw new Error('Missing REACT_APP_OPENWEATHER_API_KEY');
    const label = formatCityLabel(option);
    const cacheKey = makeWeatherKey(`ow_${label}`);
    const cached = getCache(cacheKey, CACHE_TTL_MS);
    if (cached) return cached;

    const { latitude, longitude } = option;
    const url = `${OW_BASE}/data/2.5/weather`;
    const params = {
        lat: latitude,
        lon: longitude,
        appid: OW_KEY,
        units: 'metric',
        lang: 'es',
    };

    try {
        const response = await axios.get(url, { params });
        if (response.status !== 200) throw new Error('Failed to fetch OpenWeather current');
        const d = response.data || {};

        const temperature = Number(d?.main?.temp ?? 0);
        const humidity = Number(d?.main?.humidity ?? 0);
        // OpenWeather wind speed is in m/s with units=metric; convert to km/h
        const windSpeed = typeof d?.wind?.speed === 'number' ? Math.round(d.wind.speed * 3.6) : 0;
        const description = Array.isArray(d?.weather) && d.weather[0]?.description
            ? String(d.weather[0].description)
            : 'N/D';

        const base: WeatherData = {
            temperature,
            humidity,
            windSpeed,
            description,
            city: label,
            forecast: undefined,
        };

        setCache(cacheKey, base);
        return base;
    } catch (err) {
        const stale = getStaleCache(cacheKey);
        if (stale) return stale;
        throw err;
    }
}

// Optional: OpenWeather One Call 3.0 forecast (5 days slice)
async function fetchOWForecast(option: CityOption): Promise<ForecastDay[] | undefined> {
    if (!OW_KEY) return undefined;
    const { latitude, longitude } = option;
    const url = `${OW_BASE}/data/3.0/onecall`;
    const params = {
        lat: latitude,
        lon: longitude,
        appid: OW_KEY,
        units: 'metric',
        lang: 'es',
        exclude: 'minutely,hourly,alerts',
    };

    const r = await axios.get(url, { params });
    const daily = r?.data?.daily;
    if (!Array.isArray(daily)) return undefined;
    return daily.slice(0, 5).map((d: any) => ({
        date: new Date(Number(d?.dt ?? 0) * 1000).toISOString(),
        tmax: Number(d?.temp?.max ?? 0),
        tmin: Number(d?.temp?.min ?? 0),
        precipitation: Number(d?.rain ?? 0),
        // OpenWeather weather.id is different from Open-Meteo codes; use 0 to render generic icon/label
        weathercode: Number(d?.weather?.[0]?.id ?? 0),
    }));
}

// Provider-switching wrapper
export const fetchWeatherByCoords = async (option: CityOption): Promise<WeatherData> => {
    if (currentProvider === 'openweather') {
        const current = await fetchOWCurrentByCoords(option);
        // Try to augment with forecast; ignore errors to keep current weather working
        try {
            const forecast = await fetchOWForecast(option);
            return { ...current, forecast };
        } catch (_) {
            return current;
        }
    }
    return fetchWeatherByCoordsOpenMeteo(option);
};

// Backward-compatible string-based fetch (maps to first matching city by name)
export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
    const normalized = city.trim().toLowerCase();
    // Lazy import to avoid circular deps
    const { CITIES } = await import('../data/cities');
    const match = CITIES.find(
        c => c.name.toLowerCase() === normalized || `${c.name}, ${c.country}`.toLowerCase() === normalized
    );
    if (!match) {
        // Fallback to first city to avoid undefined; better to throw in strict mode
        return fetchWeatherByCoords(CITIES[0]);
    }
    return fetchWeatherByCoords(match);
};

export const fetchManyWeatherData = async (cities: CityOption[]): Promise<WeatherData[]> => {
    // Unique by coordinates to avoid duplicates
    const unique = Array.from(new Map(cities.map(c => [`${c.latitude},${c.longitude}`, c])).values());

    const results = await Promise.allSettled(unique.map((c) => fetchWeatherByCoords(c)));
    const fulfilled: WeatherData[] = [];
    results.forEach((r) => {
        if (r.status === 'fulfilled') fulfilled.push(r.value);
    });
    return fulfilled;
};
