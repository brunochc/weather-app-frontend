export interface WeatherCodeInfo {
  label: string;
  icon: string; // simple emoji for now; can swap to icons later
}

const MAP: Record<number, WeatherCodeInfo> = {
  0: { label: 'Despejado', icon: '☀️' },
  1: { label: 'Mayormente despejado', icon: '🌤️' },
  2: { label: 'Parcialmente nublado', icon: '⛅' },
  3: { label: 'Nublado', icon: '☁️' },
  45: { label: 'Niebla', icon: '🌫️' },
  48: { label: 'Niebla escarchada', icon: '🌫️' },
  51: { label: 'Llovizna ligera', icon: '🌦️' },
  53: { label: 'Llovizna', icon: '🌦️' },
  55: { label: 'Llovizna intensa', icon: '🌧️' },
  61: { label: 'Lluvia ligera', icon: '🌧️' },
  63: { label: 'Lluvia', icon: '🌧️' },
  65: { label: 'Lluvia intensa', icon: '🌧️' },
  71: { label: 'Nieve ligera', icon: '🌨️' },
  73: { label: 'Nieve', icon: '🌨️' },
  75: { label: 'Nieve intensa', icon: '❄️' },
  80: { label: 'Chubascos ligeros', icon: '🌦️' },
  81: { label: 'Chubascos', icon: '🌦️' },
  82: { label: 'Chubascos intensos', icon: '⛈️' },
  95: { label: 'Tormenta', icon: '⛈️' },
  96: { label: 'Tormenta con granizo', icon: '⛈️' },
  99: { label: 'Tormenta fuerte con granizo', icon: '⛈️' },
};

export function getWeatherCodeInfo(code?: number): WeatherCodeInfo {
  if (typeof code !== 'number') return { label: 'N/D', icon: 'ℹ️' };
  return MAP[code] || { label: `Código ${code}`, icon: 'ℹ️' };
}
