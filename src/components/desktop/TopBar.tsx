"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { siteData } from "@/data/siteData";

interface TopBarProps {
  onNavClick: (id: string) => void;
}

export default function TopBar({ onNavClick }: TopBarProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }) +
          " " +
          now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-white/10 backdrop-blur-md  flex items-center justify-between px-4 z-50">
      {/* Left side - Name and nav */}
      <div className="flex items-center gap-6">
        <span className="font-semibold text-sm text-black">
          {siteData.name}
        </span>
        <nav className="flex items-center gap-4">
          {siteData.navItems.map((item) => (
            <button
              key={item}
              onClick={() => onNavClick(item)}
              className="text-sm text-black hover:text-black transition-colors capitalize"
            >
              {item}
            </button>
          ))}
          <Link
            href="/blog"
            className="text-sm text-black hover:text-black transition-colors"
          >
            blog
          </Link>
        </nav>
      </div>

      {/* Right side - Search and time */}
      <div className="flex items-center gap-4">
        <Search className="w-4 h-4 text-black" />
        <span className="text-sm text-black">{time}</span>
      </div>
    </div>
  );
}
