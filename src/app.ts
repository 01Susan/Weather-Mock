import express, { Request, Response } from 'express';
import AppDataSource from './data-source';
import { Location } from './entities/Location';
import { WeatherRealtime } from './entities/WeatherRealTime';
import { WeatherForecast } from './entities/WeatherForecast';
import { AirQuality } from './entities/AirQuality';
import { generateMockData } from './servcies/mockDataService';

const app = express();
const port = 3000;

app.use(express.json());

// Define custom types for async request handlers
type AsyncRequestHandler = (
  req: Request,
  res: Response
) => Promise<void | Response<any, Record<string, any>>>;

// Middleware to handle async errors
const asyncHandler = (fn: AsyncRequestHandler) => (
  req: Request,
  res: Response
) => {
  Promise.resolve(fn(req, res)).catch((error) => {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  });
};

// Database connection initialization
AppDataSource.initialize()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.log('Error connecting to database:', error));


  app.get(
    '/healthcheck',
    asyncHandler(async (req: Request, res: Response) => {
      const serverStatus = {
        status: 'OK',
        message: 'Server is up and running',
      };
  
      res.json(serverStatus);
    })
  );


// 1. Fetch real-time weather data for a location
app.get(
  '/weather/realtime',
  asyncHandler(async (req: Request, res: Response) => {
    const locationName = req.query.location as string;
    const locationRepository = AppDataSource.getRepository(Location);
    const weatherRealtimeRepository = AppDataSource.getRepository(WeatherRealtime);

    if (!locationName){
      return res.status(404).json({ message: 'Please enter the location' });
    }
    const location = await locationRepository.findOne({ 
      where: { name: locationName } 
    });

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const weatherData = await weatherRealtimeRepository.findOne({
      where: { location: { id: location.id } },
      relations: ['location']
    });
    res.json(weatherData);
  })
);

// 4. Insert new mock data into the database
app.post(
  '/weather/generate',
  asyncHandler(async (req: Request, res: Response) => {
    try {
      await generateMockData();
      res.status(200).json({ message: 'Mock data generated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error generating mock data' });
    }
  })
);

// 2. Fetch a 3-day weather forecast for a location
app.get(
  '/weather/forecast',
  asyncHandler(async (req: Request, res: Response) => {
    const locationName = req.query.location as string;
    const locationRepository = AppDataSource.getRepository(Location);
    const weatherForecastRepository = AppDataSource.getRepository(WeatherForecast);

    if (!locationName){
      return res.status(404).json({ message: 'Please enter the location' });
    }

    const location = await locationRepository.findOne({ 
      where: { name: locationName } 
    });

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const forecastData = await weatherForecastRepository.find({
      where: { location: { id: location.id } },
      relations: ['location']
    });
    res.json(forecastData);
  })
);

// 3. Fetch air quality data for a location
app.get(
  '/weather/airquality',
  asyncHandler(async (req: Request, res: Response) => {
    const locationName = req.query.location as string;
    const locationRepository = AppDataSource.getRepository(Location);
    const airQualityRepository = AppDataSource.getRepository(AirQuality);

    const location = await locationRepository.findOne({ 
      where: { name: locationName } 
    });

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const airQualityData = await airQualityRepository.findOne({
      where: { location: { id: location.id } },
      relations: ['location']
    });
    res.json(airQualityData);
  })
);



// 4. Fetch all locations
app.get(
  '/weather/locations',
  asyncHandler(async (req: Request, res: Response) => {
    const locationRepository = AppDataSource.getRepository(Location);
    const locations = await locationRepository.find();
    res.json(locations);
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;