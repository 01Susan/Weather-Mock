import { DataSource } from 'typeorm';
import { Location } from './entities/Location';
import { WeatherRealtime } from './entities/WeatherRealTime';
import { WeatherForecast } from './entities/WeatherForecast';
import { AirQuality } from './entities/AirQuality';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_DATABASE || 'weatherdb',
  synchronize: true,
  logging: false,
  entities: [Location, WeatherRealtime, WeatherForecast, AirQuality],
});

export default AppDataSource;
