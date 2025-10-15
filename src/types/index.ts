export interface ForecastDay {
    date: string; // ISO date
    tmin: number;
    tmax: number;
    precipitation: number; // daily precipitation sum (mm)
    weathercode: number;
}

export interface WeatherData {
    temperature: number;
    humidity: number;
    windSpeed: number;
    description: string;
    city: string;
    forecast?: ForecastDay[]; // 3-5 days
}