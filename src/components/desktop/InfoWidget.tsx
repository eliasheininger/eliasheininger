"use client";

import { MapPin, Sparkles } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function InfoWidget() {
  return (
    <div className="fixed top-12 right-4 z-30">
      <div className="bg-white rounded-lg border  p-4  min-w-[180px]">
        <div className="flex items-center gap-2 mb-3">
          
          <span className="text-md font-medium text-black">{siteData.location}</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-4xl font-light text-black">
            {siteData.temperature}
          </span>
        </div>
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
           
            <span className="text-sm text-black font-medium">Current focus</span>
          </div>
          <p className="text-sm text-black mt-1">{siteData.currentFocus}</p>
        </div>
      </div>
    </div>
  );
}
