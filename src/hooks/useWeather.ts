"use client";

import { useState, useEffect } from "react";

export type WeatherIconType =
  | "sun"
  | "moon"
  | "cloud-sun"
  | "cloud-moon"
  | "cloud"
  | "cloud-fog"
  | "cloud-drizzle"
  | "cloud-rain"
  | "cloud-snow"
  | "cloud-lightning";

interface WeatherData {
  temperature: string;
  location: string;
  weatherCode: number;
  isDay: boolean;
  icon: WeatherIconType;
  isLoading: boolean;
  error: string | null;
}

// Map WMO weather codes to icon types
export function getWeatherIconType(code: number, isDay: boolean): WeatherIconType {
  // Clear
  if (code === 0) return isDay ? "sun" : "moon";
  // Partly cloudy
  if (code >= 1 && code <= 3) return isDay ? "cloud-sun" : "cloud-moon";
  // Fog
  if (code === 45 || code === 48) return "cloud-fog";
  // Drizzle
  if (code >= 51 && code <= 57) return "cloud-drizzle";
  // Rain
  if (code >= 61 && code <= 67) return "cloud-rain";
  // Snow
  if (code >= 71 && code <= 77) return "cloud-snow";
  // Rain showers
  if (code >= 80 && code <= 82) return "cloud-rain";
  // Snow showers
  if (code === 85 || code === 86) return "cloud-snow";
  // Thunderstorm
  if (code >= 95 && code <= 99) return "cloud-lightning";

  return "cloud";
}

const CACHE_KEY = "weather_cache";
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

interface CachedData {
  data: WeatherData;
  timestamp: number;
  coords: { lat: number; lon: number };
}

function getCachedData(): CachedData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const parsed = JSON.parse(cached) as CachedData;
    if (Date.now() - parsed.timestamp < CACHE_DURATION) {
      return parsed;
    }
  } catch {
    // Ignore cache errors
  }
  return null;
}

function setCachedData(data: WeatherData, coords: { lat: number; lon: number }) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now(),
      coords,
    }));
  } catch {
    // Ignore cache errors
  }
}

export function useWeather(): WeatherData {
  const [data, setData] = useState<WeatherData>(() => {
    // Try to load from cache immediately
    const cached = typeof window !== "undefined" ? getCachedData() : null;
    if (cached) {
      return { ...cached.data, isLoading: false };
    }
    return {
      temperature: "--°",
      location: "Loading...",
      weatherCode: 0,
      isDay: true,
      icon: "sun",
      isLoading: true,
      error: null,
    };
  });

  useEffect(() => {
    async function fetchWeather(latitude: number, longitude: number) {
      try {
        // Fetch weather and location in parallel
        const [weatherRes, geoRes] = await Promise.all([
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,is_day`
          ),
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { "User-Agent": "eliasheininger.com" } }
          ),
        ]);

        const [weatherData, geoData] = await Promise.all([
          weatherRes.json(),
          geoRes.json(),
        ]);

        const temp = Math.round(weatherData.current.temperature_2m);
        const weatherCode = weatherData.current.weather_code;
        const isDay = weatherData.current.is_day === 1;

        const city = geoData.address?.city || geoData.address?.town || geoData.address?.village || "Unknown";

        const newData: WeatherData = {
          temperature: `${temp}°`,
          location: city,
          weatherCode,
          isDay,
          icon: getWeatherIconType(weatherCode, isDay),
          isLoading: false,
          error: null,
        };

        setData(newData);
        setCachedData(newData, { lat: latitude, lon: longitude });
      } catch {
        setData({
          temperature: "8°",
          location: "Berlin",
          weatherCode: 3,
          isDay: true,
          icon: "cloud-sun",
          isLoading: false,
          error: "Failed to fetch weather",
        });
      }
    }

    function getLocation() {
      if (!navigator.geolocation) {
        // No geolocation support - use cached coords or fallback
        const cached = getCachedData();
        fetchWeather(cached?.coords.lat ?? 52.52, cached?.coords.lon ?? 13.405);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Permission denied - use cached coords or fallback
          const cached = getCachedData();
          fetchWeather(cached?.coords.lat ?? 52.52, cached?.coords.lon ?? 13.405);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000, // 10 second timeout
          maximumAge: 60000, // Accept 1 min old position
        }
      );
    }

    getLocation();
  }, []);

  return data;
}
