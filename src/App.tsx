import React, { useEffect, useState } from 'react';
import './App.css';
import CityInput from './components/CityInput';
import WeatherList from './components/WeatherList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { fetchManyWeatherData, setWeatherProvider } from './api/weatherService';
import { WeatherData } from './types';
import { CityOption } from './data/cities';

const App: React.FC = () => {
    const [cities, setCities] = useState<CityOption[]>([]);
    const [weatherDataList, setWeatherDataList] = useState<WeatherData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [compareMode, setCompareMode] = useState<boolean>(false);
    function initialProvider(): 'openmeteo' | 'openweather' {
        const raw = String(process.env.REACT_APP_PROVIDER || 'openmeteo').toLowerCase();
        return raw === 'openweather' ? 'openweather' : 'openmeteo';
    }
    const [provider, setProvider] = useState<'openmeteo' | 'openweather'>(initialProvider());

    const loadCities = async (list: CityOption[]) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchManyWeatherData(list);
            setWeatherDataList(data);
        } catch (err) {
            setError('Error fetching weather data. Some results may be unavailable offline.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // No auto-load on mount. We only load on user selection.
    }, []);

    // Apply provider to service and refresh current results when it changes
    useEffect(() => {
        setWeatherProvider(provider);
        if (cities.length > 0) {
            // Reload with the new provider
            loadCities(cities);
        }
        // eslint-disable-next-line
    }, [provider]);

    const handleCitySelect = async (option: CityOption) => {
        const key = (c: CityOption) => `${c.latitude},${c.longitude}`;
        let next: CityOption[];
        if (compareMode) {
            const exists = cities.some(c => key(c) === key(option));
            next = exists ? cities : [...cities, option];
        } else {
            next = [option];
        }
        setCities(next);
        await loadCities(next);
    };

    return (
        <div className="container-fluid app-container">
            <Navbar
              onClear={() => { setCities([]); setWeatherDataList([]); setError(null); }}
              compareMode={compareMode}
              onToggleCompare={setCompareMode}
              provider={provider}
              onProviderChange={setProvider}
            />
            <h1 className="mb-4 text-center">Weather App</h1>
            <CityInput onSelect={handleCitySelect} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {weatherDataList.length > 0 && <WeatherList items={weatherDataList} />}
            <Footer />
        </div>
    );
};

export default App;
