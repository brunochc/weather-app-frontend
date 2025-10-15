import axios from 'axios';
import { fetchWeatherData } from '../api/weatherService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchWeatherData', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  it('should return weather data for supported city', async () => {
    const mockResponse = {
      status: 200,
      data: {
        current_weather: {
          temperature: 15,
          windspeed: 10,
        },
        hourly: {
          relativehumidity_2m: [60],
        },
      },
    };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const data = await fetchWeatherData('London');
    expect(data.city).toBe('London');
    expect(data.temperature).toBe(15);
    expect(data.humidity).toBe(60);
    expect(data.windSpeed).toBe(10);
  });

  it('should default to London coordinates for unsupported city', async () => {
    const mockResponse = {
      status: 200,
      data: {
        current_weather: {
          temperature: 20,
          windspeed: 5,
        },
        hourly: {
          relativehumidity_2m: [50],
        },
      },
    };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const data = await fetchWeatherData('UnsupportedCity');
    expect(data.city).toBe('UnsupportedCity');
    expect(data.temperature).toBe(20);
  });

  it('should throw error on API failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API Error'));

    await expect(fetchWeatherData('London')).rejects.toThrow('API Error');
  });
});
