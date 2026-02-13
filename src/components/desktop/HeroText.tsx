"use client";

import { siteData } from "@/data/siteData";

export default function HeroText() {
  const [firstName] = siteData.name.split(" ");

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-black tracking-tight">
          {firstName}.
        </h1>
        <p className="text-xl text-black mt-2 font-light">
          {siteData.tagline}
        </p>
      </div>
    </div>
  );
}
