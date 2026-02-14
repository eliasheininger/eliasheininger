"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";
import InfoWidget from "@/components/desktop/InfoWidget";

function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-transparent">
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" strokeWidth="2"/>
          <path strokeWidth="2" strokeLinecap="round" d="M21 21l-4.35-4.35"/>
        </svg>
        <span className="text-sm font-medium text-black">
          {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-black">
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </span>
        {/* Signal bars */}
        <svg className="w-4 h-4 text-black ml-1" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="16" width="4" height="6" rx="1"/>
          <rect x="8" y="12" width="4" height="10" rx="1"/>
          <rect x="14" y="8" width="4" height="14" rx="1"/>
          <rect x="20" y="4" width="4" height="18" rx="1"/>
        </svg>
        {/* Battery */}
        <svg className="w-6 h-4 text-black" viewBox="0 0 28 14" fill="currentColor">
          <rect x="0" y="0" width="24" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <rect x="2" y="2" width="18" height="10" rx="1.5"/>
          <rect x="25" y="4" width="2" height="6" rx="1"/>
        </svg>
      </div>
    </div>
  );
}

// Icon mapping for dock items
const dockIcons: Record<string, string> = {
  gmail: "/gmail.png",
  instagram: "/instagram.png",
  x: "/x.png",
  github: "/github.png",
  cal: "/cal.png",
};

// Icons that need white background
const iconsWithWhiteBg = ["gmail", "cal"];

interface ScreenProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

function Screen({ title, content, isOpen, onClose }: ScreenProps) {
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Only start from bottom area (home indicator region)
    if (e.touches[0].clientY < window.innerHeight - 100) return;
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    currentY.current = e.touches[0].clientY;
    const diff = startY.current - currentY.current;
    // Only allow dragging up (positive diff means swiping up)
    if (diff > 0) {
      setTranslateY(diff);
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    // If swiped up more than 100px, close the screen with animation
    if (translateY > 100) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
        setIsClosing(false);
        setTranslateY(0);
      }, 300);
    } else {
      setTranslateY(0);
    }
  }, [translateY, onClose]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-white flex flex-col ${isClosing ? 'transition-transform duration-300 ease-in' : isDragging ? '' : 'transition-transform duration-150 ease-out'}`}
      style={{
        transform: isClosing
          ? 'translateY(100%)'
          : `translateY(${-translateY * 0.3}px) scale(${1 - translateY * 0.0005})`,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Status Bar */}
      <StatusBar />

      {/* Screen Content */}
      <div className="flex-1 flex flex-col px-6 pb-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-black mb-4 mt-8">{title}</h1>
        <p className="text-black leading-relaxed whitespace-pre-wrap flex-1">
          {content}
        </p>
      </div>

      {/* Home Indicator */}
      <div className="pb-2 pt-1">
        <div className="w-32 h-1 bg-black rounded-full mx-auto" />
      </div>
    </div>
  );
}

export default function MobileLayout() {
  const [openScreen, setOpenScreen] = useState<string | null>(null);

  const handleFolderClick = (id: string) => {
    setOpenScreen(id);
  };

  const handleCloseScreen = () => {
    setOpenScreen(null);
  };

  const handleDockClick = (item: typeof siteData.dockItems[0]) => {
    if (item.type === "link" && item.url) {
      window.open(item.url, "_blank");
    } else if (item.type === "window" && item.windowId) {
      setOpenScreen(item.windowId);
    }
  };

  // Filter dock items for mobile (only show 4)
  const mobileDockItems = siteData.dockItems.filter(
    (item) => ["gmail", "cal", "instagram", "github"].includes(item.icon)
  );

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/vision.png')" }}
    >
      {/* Status Bar */}
      <StatusBar />

      {/* Main Content */}
      <div className="flex-1 px-5 pb-28">
        {/* Top Row - Widget and Folders */}
        <div className="flex gap-4 mb-8">
          {/* Info Widget */}
          <InfoWidget className="w-1/2" />

          {/* Folders Grid */}
          <div className="w-1/2 grid grid-cols-2 gap-x-4 gap-y-3 content-start justify-items-center pt-2">
            {siteData.folders.slice(0, 4).map((folder) => (
              <button
                key={folder.id}
                onClick={() => handleFolderClick(folder.id)}
                className="flex flex-col items-center"
              >
                <Image
                  src="/folder2.svg"
                  alt="Folder"
                  width={60}
                  height={60}
                />
                <span className="text-sm font-medium text-black/80 capitalize mt-1.5">{folder.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Dock - iOS style */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-5 px-5 py-4 bg-white/70 backdrop-blur-2xl rounded-[28px] shadow-lg">
          {mobileDockItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleDockClick(item)}
              className={`w-[60px] h-[60px] rounded-[14px] overflow-hidden flex items-center justify-center ${
                iconsWithWhiteBg.includes(item.icon) ? "bg-white" : ""
              }`}
            >
              {dockIcons[item.icon] ? (
                <Image
                  src={dockIcons[item.icon]}
                  alt={item.label || item.icon}
                  width={iconsWithWhiteBg.includes(item.icon) ? 40 : 60}
                  height={iconsWithWhiteBg.includes(item.icon) ? 40 : 60}
                  className={iconsWithWhiteBg.includes(item.icon) ? "object-contain" : "w-full h-full object-cover"}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-500">{item.icon}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Screens */}
      {siteData.folders.map((folder) => {
        const windowConfig = siteData.windows[folder.id];
        if (!windowConfig) return null;
        return (
          <Screen
            key={folder.id}
            title={windowConfig.title}
            content={windowConfig.content || ""}
            isOpen={openScreen === folder.id}
            onClose={handleCloseScreen}
          />
        );
      })}

      {/* Cal Screen */}
      {openScreen === "cal" && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          {/* Status Bar */}
          <StatusBar />
          {/* Cal.com iframe */}
          <iframe
            src={siteData.windows.cal?.url}
            className="flex-1 w-full border-0"
            title="Cal.com"
          />
          {/* Home Indicator - tap to close */}
          <button onClick={handleCloseScreen} className="pb-2 pt-1 bg-white">
            <div className="w-32 h-1 bg-black rounded-full mx-auto" />
          </button>
        </div>
      )}
    </div>
  );
}
