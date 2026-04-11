import { NextRequest, NextResponse } from "next/server";

// ---------- WMO Weather Code mapping ----------
// Maps WMO weather codes (used by Open-Meteo) to
// OpenWeatherMap icon codes (used by the frontend) + descriptions.
const WMO_MAP: Record<number, { description: string; icon: string }> = {
  0:  { description: "Clear sky",            icon: "01d" },
  1:  { description: "Mainly clear",         icon: "02d" },
  2:  { description: "Partly cloudy",        icon: "03d" },
  3:  { description: "Overcast",             icon: "04d" },
  45: { description: "Foggy",                icon: "50d" },
  48: { description: "Depositing rime fog",  icon: "50d" },
  51: { description: "Light drizzle",        icon: "09d" },
  53: { description: "Moderate drizzle",     icon: "09d" },
  55: { description: "Dense drizzle",        icon: "09d" },
  61: { description: "Slight rain",          icon: "10d" },
  63: { description: "Moderate rain",        icon: "10d" },
  65: { description: "Heavy rain",           icon: "10d" },
  66: { description: "Light freezing rain",  icon: "13d" },
  67: { description: "Heavy freezing rain",  icon: "13d" },
  71: { description: "Slight snowfall",      icon: "13d" },
  73: { description: "Moderate snowfall",    icon: "13d" },
  75: { description: "Heavy snowfall",       icon: "13d" },
  77: { description: "Snow grains",          icon: "13d" },
  80: { description: "Slight rain showers",  icon: "09d" },
  81: { description: "Moderate rain showers",icon: "09d" },
  82: { description: "Violent rain showers", icon: "09d" },
  85: { description: "Slight snow showers",  icon: "13d" },
  86: { description: "Heavy snow showers",   icon: "13d" },
  95: { description: "Thunderstorm",         icon: "11d" },
  96: { description: "Thunderstorm with slight hail", icon: "11d" },
  99: { description: "Thunderstorm with heavy hail",  icon: "11d" },
};

function getWeatherInfo(code: number) {
  return WMO_MAP[code] ?? { description: "Unknown", icon: "01d" };
}

// ---------- Open-Meteo helpers ----------

async function geocodeCity(city: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
  if (!data.results?.length) throw new Error("City not found");
  const r = data.results[0];
  return {
    lat: r.latitude as number,
    lon: r.longitude as number,
    city: r.name as string,
    country: (r.country_code ?? r.country ?? "") as string,
  };
}

async function fetchWeather(lat: number, lon: number) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure` +
    `&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json();
}

// ---------- GET /api/weather?city=London ----------

export async function GET(request: NextRequest) {
  try {
    const city = request.nextUrl.searchParams.get("city");
    if (!city) {
      return NextResponse.json({ error: "city parameter is required" }, { status: 400 });
    }

    const geo = await geocodeCity(city);
    const weather = await fetchWeather(geo.lat, geo.lon);
    const c = weather.current;
    const info = getWeatherInfo(c.weather_code);

    return NextResponse.json({
      city: geo.city,
      country: geo.country,
      temperature: c.temperature_2m,
      feelsLike: c.apparent_temperature,
      humidity: c.relative_humidity_2m,
      windSpeed: c.wind_speed_10m,
      description: info.description,
      icon: info.icon,
      visibility: 10000, // Open-Meteo free tier doesn't include visibility; default 10 km
      pressure: c.surface_pressure,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    const status = message === "City not found" ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
