export interface CityOption {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const CITIES: CityOption[] = [
  { name: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278 },
  { name: "New York", country: "United States", latitude: 40.7128, longitude: -74.0060 },
  { name: "Tokyo", country: "Japan", latitude: 35.6895, longitude: 139.6917 },
  { name: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093 },
  { name: "Madrid", country: "Spain", latitude: 40.4168, longitude: -3.7038 },
  { name: "Barcelona", country: "Spain", latitude: 41.3851, longitude: 2.1734 },
  { name: "Ciudad de México", country: "Mexico", latitude: 19.4326, longitude: -99.1332 },
  { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522 },
  { name: "Berlin", country: "Germany", latitude: 52.52, longitude: 13.405 },
  { name: "Buenos Aires", country: "Argentina", latitude: -34.6037, longitude: -58.3816 },
];

export const formatCityLabel = (c: CityOption) => `${c.name}, ${c.country}`;
