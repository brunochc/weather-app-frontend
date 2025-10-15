import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherDisplay from '../components/WeatherDisplay';

describe('WeatherDisplay', () => {
  it('renders weather data correctly', () => {
    const weatherData = {
      temperature: 22,
      humidity: 65,
      windSpeed: 12,
      description: 'Sunny',
      city: 'London',
    };
    const { getByText } = render(<WeatherDisplay data={weatherData} />);
    expect(getByText('Weather in London')).toBeInTheDocument();
    expect(getByText('Temperature: 22°C')).toBeInTheDocument();
    expect(getByText('Humidity: 65%')).toBeInTheDocument();
    expect(getByText('Wind Speed: 12 km/h')).toBeInTheDocument();
    expect(getByText('Description: Sunny')).toBeInTheDocument();
  });

  it('renders no data message when data is null', () => {
    const { getByText } = render(<WeatherDisplay data={null} />);
    expect(getByText('No weather data available. Please enter a city.')).toBeInTheDocument();
  });
});
