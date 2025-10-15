import { CITIES, CityOption } from './data/cities';

// Choose a few popular defaults without TS non-null assertions to keep parser happy
const defaults: CityOption[] = [];
const london = CITIES.find(c => c.name === 'London');
if (london) defaults.push(london);
const newYork = CITIES.find(c => c.name === 'New York');
if (newYork) defaults.push(newYork);
const tokyo = CITIES.find(c => c.name === 'Tokyo');
if (tokyo) defaults.push(tokyo);

export const DEFAULT_CITY_OPTIONS: CityOption[] = defaults;
