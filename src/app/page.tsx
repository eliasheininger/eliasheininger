"use client";

import { useEffect, useState } from "react";
import Desktop from "@/components/desktop/Desktop";
import MobileLayout from "@/components/mobile/MobileLayout";
import { ActivityLogProvider } from "@/hooks/useActivityLog";

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show loading state until we know the viewport size
  if (isMobile === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <ActivityLogProvider>
      {isMobile ? <MobileLayout /> : <Desktop />}
    </ActivityLogProvider>
  );
}
