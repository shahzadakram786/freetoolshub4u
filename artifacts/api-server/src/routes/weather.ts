import { Router, type IRouter } from "express";
import { GetWeatherQueryParams, GetWeatherResponse } from "@workspace/api-zod";
import { z } from "zod/v4";

const router: IRouter = Router();

router.get("/weather", async (req, res) => {
  const query = GetWeatherQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: "City parameter is required" });
    return;
  }

  const { city } = query.data;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
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
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        res.status(400).json({ error: "City not found. Please check the city name." });
      } else {
        res.status(500).json({ error: "Weather service unavailable" });
      }
      return;
    }

    const data = await response.json() as Record<string, unknown>;
    const mainData = data.main as Record<string, number>;
    const windData = data.wind as Record<string, number>;
    const weatherArr = data.weather as Array<Record<string, string>>;
    const sysData = data.sys as Record<string, string>;

    const weatherData = GetWeatherResponse.parse({
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

    res.json(weatherData);
  } catch (err) {
    req.log.error({ err }, "Weather API error");
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
