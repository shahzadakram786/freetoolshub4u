import { Router, type IRouter } from "express";
import { GetWeatherQueryParams, GetWeatherResponse, GetWeatherByCoordsQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

async function fetchWeatherFromAPI(params: string): Promise<ReturnType<typeof GetWeatherResponse.parse> | null> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) return null;

  const url = `https://api.openweathermap.org/data/2.5/weather?${params}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) return null;

  const data = await response.json() as Record<string, unknown>;
  const mainData = data.main as Record<string, number>;
  const windData = data.wind as Record<string, number>;
  const weatherArr = data.weather as Array<Record<string, string>>;
  const sysData = data.sys as Record<string, string>;

  return GetWeatherResponse.parse({
    city: data.name as string,
    country: sysData.country,
    temperature: Math.round(mainData.temp),
    feelsLike: Math.round(mainData.feels_like),
    humidity: mainData.humidity,
    windSpeed: windData.speed,
    description: weatherArr[0].description,
    icon: weatherArr[0].icon,
    visibility: (data.visibility as number) || 10000,
    pressure: mainData.pressure,
  });
}

router.get("/weather", async (req, res) => {
  const query = GetWeatherQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: "City parameter is required" });
    return;
  }

  const { city } = query.data;

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (apiKey) {
      const data = await fetchWeatherFromAPI(`q=${encodeURIComponent(city)}`);
      if (data) {
        res.json(data);
        return;
      }
      const testUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
      const testRes = await fetch(testUrl);
      if (!testRes.ok) {
        if (testRes.status === 404) {
          res.status(400).json({ error: "City not found. Please check the city name." });
        } else {
          res.status(500).json({ error: "Weather service unavailable" });
        }
        return;
      }
    }

    const mockData = GetWeatherResponse.parse({
      city: city,
      country: "US",
      temperature: 22,
      feelsLike: 20,
      humidity: 65,
      windSpeed: 5.5,
      description: "partly cloudy",
      icon: "02d",
      visibility: 10000,
      pressure: 1013,
    });
    res.json(mockData);
  } catch (err) {
    req.log.error({ err }, "Weather API error");
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

router.get("/weather/by-coords", async (req, res) => {
  const query = GetWeatherByCoordsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: "lat and lon parameters are required" });
    return;
  }

  const { lat, lon } = query.data;

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (apiKey) {
      const data = await fetchWeatherFromAPI(`lat=${lat}&lon=${lon}`);
      if (data) {
        res.json(data);
        return;
      }
    }

    const mockData = GetWeatherResponse.parse({
      city: "Your Location",
      country: "Local",
      temperature: 24,
      feelsLike: 22,
      humidity: 60,
      windSpeed: 4.2,
      description: "clear sky",
      icon: "01d",
      visibility: 10000,
      pressure: 1015,
    });
    res.json(mockData);
  } catch (err) {
    req.log.error({ err }, "Weather by coords error");
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
