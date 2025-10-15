import React from 'react';
import { WeatherData } from '../types';
import { getWeatherCodeInfo } from '../utils/weatherCode';

interface WeatherDisplayProps {
    data: WeatherData | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
    if (!data) {
        return <div>No weather data available. Please enter a city.</div>;
    }

    const info = getWeatherCodeInfo(); // description already in data, icon via forecast or current code unknown here
    return (
        <div className="weather-display">
            <h5 className="card-title mb-2">{data.city}</h5>
            <div className="d-flex align-items-center mb-2">
                <span className="me-2" aria-hidden>🌡️</span>
                <span className="me-3">{data.temperature}°C</span>
                <span className="me-2" aria-hidden>💧</span>
                <span className="me-3">{data.humidity}%</span>
                <span className="me-2" aria-hidden>💨</span>
                <span>{data.windSpeed} km/h</span>
            </div>
            <div className="mb-3">
                <span className="badge bg-primary">{data.description}</span>
            </div>

            {Array.isArray(data.forecast) && data.forecast.length > 0 && (
                <div>
                    <h6 className="mb-2">Pronóstico 5 días</h6>
                    <div className="row g-2">
                        {data.forecast.slice(0, 5).map((d) => {
                            const fInfo = getWeatherCodeInfo(d.weathercode);
                            return (
                                <div key={d.date} className="col-6 col-md-4 col-lg-3">
                                    <div className="border rounded p-2 bg-light text-dark">
                                        <div className="small fw-bold">{new Date(d.date).toLocaleDateString()}</div>
                                        <div className="fs-5" aria-hidden>{fInfo.icon}</div>
                                        <div className="small">{fInfo.label}</div>
                                        <div className="small">Máx: {d.tmax}°C</div>
                                        <div className="small">Mín: {d.tmin}°C</div>
                                        <div className="small">🌧️ {d.precipitation} mm</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherDisplay;
