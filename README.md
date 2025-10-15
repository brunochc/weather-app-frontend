# Weather App

A modern weather application built with React and TypeScript. Users can search for cities and view current weather details such as temperature, humidity, wind speed, and a brief description. The app supports switching between two data providers (Open‑Meteo and OpenWeather) and includes a compare mode to view multiple cities side by side.

## Repository

- GitHub: https://github.com/brunochc/weather-app-frontend

## Features

- City search with clear results display
- Current conditions: temperature (°C), humidity (%), wind speed (km/h), description
- Provider switch: Open‑Meteo or OpenWeather (reloads results on change)
- Compare mode: add multiple cities to compare simultaneously
- Responsive UI and simple, consistent UX
- Strong TypeScript models (`WeatherData`, `ForecastDay`)

## Getting Started

### Prerequisites
- Node.js 16+ (recommended) and npm or yarn
- Git and an internet connection

### Installation
```bash
# Clone the repo (SSH)
git clone git@github.com:brunochc/weather-app-frontend.git
cd weather-app

# Install dependencies
npm install
# or
yarn install
```

## Usage

- Search for a city using the input field.
- Toggle "Compare multiple" in the navbar to add more cities and compare them.
- Switch the provider (Open‑Meteo/OpenWeather) from the navbar; results reload automatically.
- Clear results at any time from the navbar.

## Environment Variables
Create a `.env` file at the project root (do not commit real secrets). See `.env.example` for reference.

```bash
REACT_APP_PROVIDER=openweather        # or openmeteo (default)
REACT_APP_OPENWEATHER_BASE=https://api.openweathermap.org
# WARNING: Any REACT_APP_* variables are exposed to the browser in CRA.
# Only use placeholder keys for local testing.
REACT_APP_OPENWEATHER_API_KEY=__set_only_for_local_testing__
```

## How It Works

- `src/App.tsx` manages global state: selected cities, results list, loading/error, provider, and compare mode. It reloads data when the provider changes.
- `src/components/Navbar.tsx` provides controls to clear results, toggle compare mode, and switch provider.
- `src/components/CityInput.tsx` handles city selection.
- `src/components/WeatherList.tsx` renders multiple weather cards.
- `src/components/WeatherDisplay.tsx` shows a city’s weather and (if present) a short multi‑day forecast using `ForecastDay`.
- `src/api/weatherService.ts` abstracts fetching from the active provider and exposes `fetchManyWeatherData()` plus `setWeatherProvider()`.
- `src/types/index.ts` defines `WeatherData` and `ForecastDay` used across components.

## Project Structure
```
src/
├── api/
│   └── weatherService.ts      # Provider abstraction and fetch helpers
├── components/
│   ├── CityInput.tsx          # City selection input
│   ├── Navbar.tsx             # Top bar controls (provider, compare, clear)
│   ├── WeatherDisplay.tsx     # Single city weather card
│   └── WeatherList.tsx        # List of weather cards
├── types/
│   └── index.ts               # Shared TypeScript models
├── App.tsx                    # Main application component
└── App.css                    # Styles
```

## Tech Stack

- React 18, TypeScript, React Hooks
- CSS3 / Bootstrap (for styling)
- Open‑Meteo and OpenWeather (as providers)

## Error Handling

- Clear error messages when API calls fail or the network is unavailable.
- The app remains usable when some results cannot be fetched (partial failures).
- Input validation helps prevent invalid queries.

## Future Improvements

- Extended forecast (5 days) consistent across providers
- Unit switching (°C/°F and km/h/mph)
- Geolocation for local weather
- Search history and recent cities
- Dark mode and accessibility improvements
- Automated tests (unit/integration)
- Internationalization (i18n)
- PWA support for offline installation

## Contributing

Contributions are welcome:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "feat: add YourFeature"`
4. Push the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

## License

MIT License.
