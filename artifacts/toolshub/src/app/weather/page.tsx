import { Weather } from "@/views/weather";

export default function Page() {
  return <Weather />;
}

export const metadata = {
  title: "Live Weather Report — Real-Time Weather Worldwide",
  description: "Get real-time weather conditions, temperature, humidity, wind speed, and more for any city. Auto-detects your location.",
};
