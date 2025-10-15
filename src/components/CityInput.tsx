import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CITIES, CityOption, formatCityLabel } from '../data/cities';
import { searchCities } from '../api/geocodingService';

interface Props {
    onSelect: (option: CityOption) => void;
}

const CityInput: React.FC<Props> = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<CityOption[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debounceRef = useRef<number | null>(null);

    const handleFilter = useMemo<((input: string) => CityOption[])>(() => (input: string) => {
        const q = String(input).trim().toLowerCase();
        if (!q) return [];
        return CITIES.filter(c =>
            c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
        ).slice(0, 10);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setQuery(input);

        if (debounceRef.current) window.clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
            (async () => {
                // Try geocoding API first
                const apiResults = await searchCities(input, 10, 'es');
                let results: CityOption[] = apiResults;
                // Fallback to local dataset if API returns empty
                if (!results || results.length === 0) {
                    results = handleFilter(input);
                }
                setSuggestions(results);
                setShowSuggestions(!!input && results.length > 0);
            })();
        }, 300);
    };

    useEffect(() => () => { if (debounceRef.current) window.clearTimeout(debounceRef.current); }, []);

    const handleSuggestionClick = (option: CityOption) => {
        onSelect(option);
        setQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (suggestions.length > 0) {
            handleSuggestionClick(suggestions[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="d-flex position-relative">
            <input
                className="form-control"
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search city (e.g., Madrid, Spain)"
                onFocus={() => query.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            />
            <button type="submit" className="btn btn-primary ms-2">Add</button>
            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list list-group">
                    {suggestions.map((option) => (
                        <li
                            key={`${option.name}-${option.country}`}
                            onClick={() => handleSuggestionClick(option)}
                            className="suggestion-item list-group-item list-group-item-action"
                        >
                            {formatCityLabel(option)}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default CityInput;
