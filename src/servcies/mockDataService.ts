
import { Location } from '../entities/Location';
import { WeatherRealtime } from '../entities/WeatherRealTime';
import { WeatherForecast } from '../entities/WeatherForecast';
import { AirQuality } from '../entities/AirQuality';
import AppDataSource from '../data-source';

// Helper function to generate random data for mock purposes
const getRandomTemperature = () => (Math.random() * 40 - 10).toFixed(2); 
const getRandomHumidity = () => Math.floor(Math.random() * 100);
const getRandomWindSpeed = () => (Math.random() * 50).toFixed(2);
const getRandomCondition = () => {
  const conditions = ['Clear', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Stormy'];
  return conditions[Math.floor(Math.random() * conditions.length)];
};

export const generateMockData = async () => {
  const locationRepository = AppDataSource.getRepository(Location);
  const weatherRealtimeRepository = AppDataSource.getRepository(WeatherRealtime);
  const weatherForecastRepository = AppDataSource.getRepository(WeatherForecast);
  const airQualityRepository = AppDataSource.getRepository(AirQuality);

  // Create and insert a few mock locations
  const location = new Location();
  location.name = "Kathmandu";
  location.latitude = 27.7000;
  location.longitude = 85.3000;

  await locationRepository.save(location);

  // Generate and insert mock weather data for "Kathmandu"
  const weatherRealtime = new WeatherRealtime();
  weatherRealtime.location = location;
  weatherRealtime.temperature = parseFloat(getRandomTemperature());
  weatherRealtime.condition = getRandomCondition();
  weatherRealtime.humidity = getRandomHumidity();
  weatherRealtime.wind_speed = parseFloat(getRandomWindSpeed());
  await weatherRealtimeRepository.save(weatherRealtime);

  for (let i = 0; i < 3; i++) {
    const forecast = new WeatherForecast();
    forecast.location = location;
    forecast.date = new Date(Date.now() + (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    forecast.min_temp = parseFloat(getRandomTemperature());
    forecast.max_temp = parseFloat(getRandomTemperature());
    forecast.condition = getRandomCondition();
    await weatherForecastRepository.save(forecast);
  }

  // Generate and insert mock air quality data
  const airQuality = new AirQuality();
  airQuality.location = location;
  airQuality.aqi = Math.floor(Math.random() * 500); 
  airQuality.description = "Good";
  await airQualityRepository.save(airQuality);

  console.log('Mock data generated successfully!');
};
