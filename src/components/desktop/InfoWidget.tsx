"use client";

import { siteData } from "@/data/siteData";
import { useWeather, WeatherIconType } from "@/hooks/useWeather";
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

const weatherIcons: Record<WeatherIconType, React.ComponentType<{ className?: string }>> = {
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  "cloud-sun": CloudSun,
  "cloud-moon": CloudMoon,
  "cloud-fog": CloudFog,
  "cloud-drizzle": CloudDrizzle,
  "cloud-rain": CloudRain,
  "cloud-snow": CloudSnow,
  "cloud-lightning": CloudLightning,
};

interface InfoWidgetProps {
  className?: string;
}

export default function InfoWidget({ className }: InfoWidgetProps) {
  const { temperature, location, icon, isLoading } = useWeather();
  const WeatherIcon = weatherIcons[icon];

  return (
    <div className={className || "fixed top-12 right-4 z-0"}>
      <div className="bg-white rounded-4xl  p-5 min-w-[180px] lg:min-w-[200px]  shadow-lg">
        <div className="flex items-center gap-2 mb-1">
          <span className={`md:text-xl text-base font-medium text-black ${isLoading ? "animate-pulse" : ""}`}>
            {location}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-5">
          <span className={`text-4xl font-regular text-black ${isLoading ? "animate-pulse" : ""}`}>
            {temperature}
          </span>
          <WeatherIcon className="w-6 h-6 text-black" />
        </div>
        <div className="pt-3">
          <div className="flex items-center gap-2">
            <span className="text-base text-black font-medium">Current focus</span>
          </div>
          <p className="text-sm text-black">{siteData.currentFocus}</p>
        </div>
      </div>
    </div>
  );
}
