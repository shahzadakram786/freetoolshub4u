import { NextRequest, NextResponse } from "next/server";

// ---------- WMO Weather Code mapping (same as /api/weather) ----------
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

// ---------- Helpers ----------

async function reverseGeocode(lat: number, lon: number) {
  // Open-Meteo doesn't have a reverse-geocode endpoint, so we use a
  // lightweight free service (BigDataCloud) that needs no key.
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return {
      city: (data.city || data.locality || "Unknown") as string,
      country: (data.countryCode || data.countryName || "") as string,
    };
  } catch {
    return { city: "Unknown", country: "" };
  }
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

// ---------- GET /api/weather/by-coords?lat=33.6&lon=73.0 ----------

export async function GET(request: NextRequest) {
  try {
    const latStr = request.nextUrl.searchParams.get("lat");
    const lonStr = request.nextUrl.searchParams.get("lon");

    if (!latStr || !lonStr) {
      return NextResponse.json({ error: "lat and lon parameters are required" }, { status: 400 });
    }

    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return NextResponse.json({ error: "lat and lon must be valid numbers" }, { status: 400 });
    }

    const [geo, weather] = await Promise.all([
      reverseGeocode(lat, lon),
      fetchWeather(lat, lon),
    ]);

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
      visibility: 10000,
      pressure: c.surface_pressure,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
