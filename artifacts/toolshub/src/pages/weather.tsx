import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card, Input, Button } from "@/components/ui";
import { Search, Wind, Droplets, Thermometer, Cloud, Eye, Gauge, MapPin, RefreshCw } from "lucide-react";
import { useGetWeather, useGetWeatherByCoords } from "@workspace/api-client-react";

export function Weather() {
  const [city, setCity] = useState("London");
  const [searchInput, setSearchInput] = useState("");
  const [geoCoords, setGeoCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [mode, setMode] = useState<"city" | "coords">("city");

  const { data: cityWeather, isLoading: cityLoading, error: cityError, refetch: refetchCity } = useGetWeather(
    { city },
    { query: { enabled: mode === "city" && !!city, retry: false, refetchInterval: 5 * 60 * 1000 } }
  );

  const { data: coordWeather, isLoading: coordLoading, error: coordError, refetch: refetchCoords } = useGetWeatherByCoords(
    { lat: geoCoords?.lat ?? 0, lon: geoCoords?.lon ?? 0 },
    { query: { enabled: mode === "coords" && !!geoCoords, retry: false, refetchInterval: 5 * 60 * 1000 } }
  );

  const weather = mode === "coords" ? coordWeather : cityWeather;
  const isLoading = mode === "coords" ? coordLoading : cityLoading;
  const error = mode === "coords" ? coordError : cityError;

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser");
      return;
    }
    setGeoLoading(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
        setMode("coords");
        setGeoLoading(false);
      },
      (err) => {
        setGeoError("Location access denied. Please search by city name.");
        setGeoLoading(false);
      },
      { timeout: 10000 }
    );
  };

  useEffect(() => {
    detectLocation();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setMode("city");
    }
  };

  const handleRefresh = () => {
    if (mode === "coords") refetchCoords();
    else refetchCity();
  };

  const getWeatherIconUrl = (icon: string) =>
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <Layout>
      <SeoHead
        title="Live Weather Report - Real-Time Weather for Any City | ToolsHub"
        description="Get accurate, real-time weather reports including temperature, humidity, wind speed, and forecasts for any city in the world. Auto-detects your location."
        keywords="weather report, live weather, weather forecast, temperature today, humidity, wind speed"
      />

      <div className="w-full max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-4">
            <Cloud className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Live Weather Report</h1>
          <p className="text-muted-foreground">Real-time weather conditions worldwide. Auto-detects your location.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button
            variant={mode === "coords" && geoCoords ? "default" : "outline"}
            onClick={detectLocation}
            disabled={geoLoading}
            className="flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            {geoLoading ? "Detecting..." : "Use My Location"}
          </Button>
          {weather && (
            <Button variant="outline" onClick={handleRefresh} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Refresh
            </Button>
          )}
        </div>

        {geoError && (
          <div className="mb-4 p-3 bg-amber-50 text-amber-700 rounded-xl border border-amber-200 text-sm">
            {geoError}
          </div>
        )}

        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search any city..."
              className="pl-12 h-12 text-base rounded-xl"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <Button type="submit" className="rounded-xl px-6" disabled={cityLoading && mode === "city"}>
            Search
          </Button>
        </form>

        <div className="ad-banner mb-8 p-4 rounded-xl bg-muted/30 border text-center text-muted-foreground text-sm">
          [ Ad Placeholder — Google AdSense ]
        </div>

        {(isLoading || geoLoading) && (
          <div className="text-center py-16 text-muted-foreground">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
            Fetching weather data...
          </div>
        )}

        {error && !isLoading && (
          <div className="p-6 bg-destructive/10 text-destructive rounded-2xl border border-destructive/20 text-center">
            <p className="font-semibold">Could not load weather data.</p>
            <p className="text-sm mt-1">Please try another city name or check your connection.</p>
          </div>
        )}

        {weather && !isLoading && !error && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="p-8 text-center bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-transparent border-blue-200/50">
              <div className="flex items-center justify-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-2xl md:text-4xl font-bold">{weather.city}, {weather.country}</h2>
              </div>

              <div className="flex items-center justify-center gap-3 mt-4">
                {weather.icon && (
                  <img
                    src={getWeatherIconUrl(weather.icon)}
                    alt={weather.description}
                    className="w-16 h-16"
                  />
                )}
                <div className="text-left">
                  <p className="text-6xl font-bold">{Math.round(weather.temperature)}°C</p>
                  <p className="text-muted-foreground capitalize mt-1">{weather.description}</p>
                </div>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 bg-white/60 dark:bg-black/20 px-4 py-2 rounded-xl">
                <Thermometer className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Feels like <strong>{Math.round(weather.feelsLike)}°C</strong></span>
              </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Droplets, label: "Humidity", value: `${weather.humidity}%`, color: "text-blue-500" },
                { icon: Wind, label: "Wind Speed", value: `${weather.windSpeed} m/s`, color: "text-teal-500" },
                { icon: Eye, label: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km`, color: "text-indigo-500" },
                { icon: Gauge, label: "Pressure", value: `${weather.pressure} hPa`, color: "text-purple-500" },
              ].map(({ icon: Icon, label, value, color }) => (
                <Card key={label} className="p-5 flex flex-col items-center text-center">
                  <Icon className={`w-7 h-7 ${color} mb-2`} />
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-bold text-lg">{value}</p>
                </Card>
              ))}
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Data refreshes every 5 minutes. Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
