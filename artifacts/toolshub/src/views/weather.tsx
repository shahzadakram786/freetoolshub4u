"use client";

import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { SeoHead, toolJsonLd } from "@/components/seo-head";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Wind, Droplets, Thermometer, Eye, Gauge, MapPin, RefreshCw, Cloud } from "lucide-react";
import { useGetWeather, useGetWeatherByCoords } from "@workspace/api-client-react";

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/20 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-2xl rounded-3xl ${className}`}>
      {children}
    </div>
  );
}

export function Weather() {
  const [city, setCity] = useState("London");
  const [searchInput, setSearchInput] = useState("");
  const [geoCoords, setGeoCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [mode, setMode] = useState<"city" | "coords">("city");

  const { data: cityWeather, isLoading: cityLoading, error: cityError, refetch: refetchCity } = useGetWeather(
    { city },
    { query: { enabled: mode === "city" && !!city, retry: false, refetchInterval: 5 * 60 * 1000 } as any }
  );
  const { data: coordWeather, isLoading: coordLoading, refetch: refetchCoords } = useGetWeatherByCoords(
    { lat: geoCoords?.lat ?? 0, lon: geoCoords?.lon ?? 0 },
    { query: { enabled: mode === "coords" && !!geoCoords, retry: false, refetchInterval: 5 * 60 * 1000 } as any }
  );

  const weather = mode === "coords" ? coordWeather : cityWeather;
  const isLoading = mode === "coords" ? coordLoading : cityLoading;
  const error = mode === "coords" ? null : cityError;

  const detectLocation = () => {
    if (!navigator.geolocation) { setGeoError("Geolocation not supported."); return; }
    setGeoLoading(true); setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => { setGeoCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }); setMode("coords"); setGeoLoading(false); },
      () => { setGeoError("Location access denied. Search by city below."); setGeoLoading(false); },
      { timeout: 10000 }
    );
  };

  useEffect(() => { detectLocation(); }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) { setCity(searchInput.trim()); setMode("city"); }
  };

  const handleRefresh = () => { if (mode === "coords") refetchCoords(); else refetchCity(); };

  const getIconUrl = (icon: string) => `https://openweathermap.org/img/wn/${icon}@4x.png`;

  // Dynamic gradient background based on weather
  const getBg = () => {
    if (!weather) return "from-blue-600 via-blue-500 to-sky-400";
    const desc = weather.description.toLowerCase();
    if (desc.includes("rain") || desc.includes("drizzle")) return "from-slate-600 via-blue-600 to-blue-500";
    if (desc.includes("cloud")) return "from-slate-500 via-slate-400 to-blue-400";
    if (desc.includes("snow")) return "from-sky-200 via-blue-100 to-white";
    if (desc.includes("thunder")) return "from-slate-800 via-purple-800 to-slate-600";
    if (desc.includes("clear")) return weather.temperature > 20 ? "from-orange-400 via-amber-400 to-yellow-300" : "from-blue-500 via-sky-400 to-cyan-300";
    return "from-blue-600 via-blue-500 to-sky-400";
  };

  return (
    <Layout>
      <SeoHead
        title="Live Weather Report — Real-Time Weather Worldwide"
        description="Get real-time weather conditions, temperature, humidity, wind speed, and more for any city. Auto-detects your location."
        keywords="weather report, live weather, weather forecast, temperature, humidity, wind speed"
        canonicalPath="/weather"
        jsonLd={toolJsonLd("Live Weather Report", "Real-time weather data for any city worldwide with auto-location detection.", "/weather")}
      />

      {/* Full-page gradient background */}
      <div className={`w-full min-h-screen bg-linear-to-br ${getBg()} transition-all duration-1000`}>
        <div className="w-full max-w-2xl mx-auto px-4 py-12">

          {/* Header */}
          <motion.div className="text-center mb-8 text-white" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-2 drop-shadow">Live Weather Report</h1>
            <p className="text-white/70 text-sm">Real-time conditions worldwide · Auto-detects your location</p>
          </motion.div>

          {/* Search bar */}
          <motion.form onSubmit={handleSearch} className="flex gap-3 mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                placeholder="Search any city..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 text-base"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button type="submit" className="px-5 py-3.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-white/30 transition-all">
              Search
            </button>
            <button type="button" onClick={detectLocation} disabled={geoLoading}
              className="px-4 py-3.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all"
              title="Use my location">
              <MapPin className="w-5 h-5" />
            </button>
          </motion.form>

          {geoError && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mb-4 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white/80 text-sm border border-white/20">
              {geoError}
            </motion.div>
          )}

          {/* Loading */}
          {(isLoading || geoLoading) && (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" style={{ borderWidth: 3 }} />
              <p className="text-white/70 text-sm">Fetching weather data...</p>
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <GlassCard className="p-6 text-center text-white">
              <p className="font-semibold">Could not load weather data.</p>
              <p className="text-sm text-white/70 mt-1">Try another city name.</p>
            </GlassCard>
          )}

          {/* Weather Card */}
          <AnimatePresence>
            {weather && !isLoading && (
              <motion.div key={weather.city} initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                {/* Main card */}
                <GlassCard className="p-8 text-white text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-white/70" />
                    <span className="text-lg font-semibold text-white/90">{weather.city}, {weather.country}</span>
                    <button onClick={handleRefresh} className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors">
                      <RefreshCw className="w-3.5 h-3.5 text-white/60" />
                    </button>
                  </div>

                  {weather.icon && (
                    <img src={getIconUrl(weather.icon)} alt={weather.description}
                      className="w-32 h-32 mx-auto drop-shadow-2xl" loading="lazy" decoding="async" />
                  )}

                  <div className="text-8xl font-bold tracking-tighter mb-2 drop-shadow">
                    {Math.round(weather.temperature)}°
                  </div>
                  <p className="text-xl capitalize text-white/80 mb-4">{weather.description}</p>

                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <Thermometer className="w-4 h-4 text-orange-300" />
                    <span className="text-sm text-white/80">Feels like <strong className="text-white">{Math.round(weather.feelsLike)}°C</strong></span>
                  </div>
                </GlassCard>

                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: Droplets, label: "Humidity", value: `${weather.humidity}%`, color: "text-blue-200" },
                    { icon: Wind, label: "Wind", value: `${weather.windSpeed} m/s`, color: "text-teal-200" },
                    { icon: Eye, label: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km`, color: "text-indigo-200" },
                    { icon: Gauge, label: "Pressure", value: `${weather.pressure} hPa`, color: "text-purple-200" },
                  ].map(({ icon: Icon, label, value, color }, i) => (
                    <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                      <GlassCard className="p-4 text-center text-white">
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
                        <p className="text-xs text-white/60 mb-0.5">{label}</p>
                        <p className="font-bold">{value}</p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>

                <p className="text-center text-white/40 text-xs mt-4">
                  Refreshes every 5 min · Last updated {new Date().toLocaleTimeString()}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
