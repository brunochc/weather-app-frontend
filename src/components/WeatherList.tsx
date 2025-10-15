import React from 'react';
import { WeatherData } from '../types';
import WeatherDisplay from './WeatherDisplay';

interface WeatherListProps {
  items: WeatherData[];
}

const WeatherList: React.FC<WeatherListProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return <div className="text-center text-light">No weather data available. Add a city to begin.</div>;
  }

  return (
    <div className="row g-3 mt-3 justify-content-center">
      {items.map((item) => (
        <div key={item.city} className="col-12 col-md-8 col-lg-6 d-flex justify-content-center">
          <div className="card shadow-sm w-100" style={{ maxWidth: 560 }}>
            <div className="card-body">
              <WeatherDisplay data={item} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherList;
