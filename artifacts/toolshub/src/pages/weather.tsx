import { useState } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card, Input, Button } from "@/components/ui";
import { Search, Wind, Droplets, Thermometer, Cloud, Eye, Gauge } from "lucide-react";
import { useGetWeather } from "@workspace/api-client-react";

export function Weather() {
  const [city, setCity] = useState("London");
  const [searchInput, setSearchInput] = useState("");

  const { data: weather, isLoading, error } = useGetWeather({ city }, { query: { enabled: !!city, retry: false } });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
    }
  };

  return (
    <Layout>
      <SeoHead title="Live Weather Report" description="Get real-time weather reports, temperature, humidity, and forecasts for any city." />
      
      <div className="w-full max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Weather Report</h1>
          <p className="text-muted-foreground">Check real-time weather conditions anywhere in the world.</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Enter city name..." 
              className="pl-12 h-14 text-lg rounded-2xl"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" className="rounded-2xl w-32" isLoading={isLoading}>Search</Button>
        </form>

        <div className="ad-banner">
          [ Ad Placeholder ]
        </div>

        {error && (
          <div className="p-6 bg-destructive/10 text-destructive rounded-2xl border border-destructive/20 text-center">
            <p className="font-semibold">City not found or API error.</p>
            <p className="text-sm mt-1">Please try another location.</p>
          </div>
        )}

        {weather && !isLoading && !error && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 via-primary/10 to-transparent border-primary/20">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">{weather.city}, {weather.country}</h2>
              <p className="text-xl text-muted-foreground capitalize mb-8">{weather.description}</p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                <div className="text-7xl md:text-9xl font-display font-bold text-foreground">
                  {Math.round(weather.temperature)}°
                </div>
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-3 bg-white/50 dark:bg-black/20 p-3 rounded-xl">
                    <Thermometer className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Feels Like</p>
                      <p className="font-bold text-lg">{Math.round(weather.feelsLike)}°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-6 flex flex-col items-center justify-center text-center">
                <Droplets className="w-8 h-8 text-blue-500 mb-3" />
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="font-bold text-xl">{weather.humidity}%</p>
              </Card>
              <Card className="p-6 flex flex-col items-center justify-center text-center">
                <Wind className="w-8 h-8 text-teal-500 mb-3" />
                <p className="text-sm text-muted-foreground">Wind Speed</p>
                <p className="font-bold text-xl">{weather.windSpeed} km/h</p>
              </Card>
              <Card className="p-6 flex flex-col items-center justify-center text-center">
                <Eye className="w-8 h-8 text-indigo-500 mb-3" />
                <p className="text-sm text-muted-foreground">Visibility</p>
                <p className="font-bold text-xl">{(weather.visibility / 1000).toFixed(1)} km</p>
              </Card>
              <Card className="p-6 flex flex-col items-center justify-center text-center">
                <Gauge className="w-8 h-8 text-purple-500 mb-3" />
                <p className="text-sm text-muted-foreground">Pressure</p>
                <p className="font-bold text-xl">{weather.pressure} hPa</p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
