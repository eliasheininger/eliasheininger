"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";
import { X } from "lucide-react";
import InfoWidget from "@/components/desktop/InfoWidget";

function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white/10 backdrop-blur-md">
      <span className="font-garamond text-sm text-black">
        {siteData.name}
      </span>
      <span className="text-sm text-black">
        {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
      </span>
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
  nova: "/nova.png",
  terminal: "/terminal.png",
};

// Icons that need white background
const iconsWithWhiteBg = ["gmail", "cal"];

interface ScreenProps {
  title: string;
  content: string;
  image?: string;
  isOpen: boolean;
  onClose: () => void;
}

function Screen({ title, content, image, isOpen, onClose }: ScreenProps) {
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
      {/* Window Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white flex-shrink-0">
        <button
          onClick={onClose}
          className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] flex items-center justify-center"
        >
          <X className="w-2.5 h-2.5 text-[#880000]" strokeWidth={2.5} />
        </button>
        <div className="w-3.5 h-3.5 rounded-full bg-[#FEBC2E]" />
        <div className="w-3.5 h-3.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-sm text-black font-garamond">{title}</span>
      </div>

      {/* Screen Content */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        {image && (
          <div className="mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt=""
              className="w-[60%] h-auto object-contain"
            />
          </div>
        )}
        <p className="text-black text-sm leading-relaxed whitespace-pre-wrap flex-1">
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

  // Filter dock items for mobile
  const mobileDockItems = siteData.dockItems.filter(
    (item) => ["gmail", "cal", "instagram", "x", "github"].includes(item.icon)
  );

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden bg-no-repeat"
      style={{
        backgroundImage: "url('/vision2.png')",
        backgroundSize: "100%",
        backgroundPosition: "center 60%"
      }}
    >
      {/* Status Bar */}
      <StatusBar />

      {/* Main Content */}
      <div className="flex-1 px-4 pb-28 pt-4">
        {/* Info Widget */}
        <InfoWidget className="mb-4" />

        {/* Folders Grid */}
        <div className="justify-between flex gap-2 pt-4">
          {siteData.folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => handleFolderClick(folder.id)}
              className="flex flex-col items-center gap-2"
            >
              <Image
                src={folder.icon || "/folders.svg"}
                alt="Folder"
                width={64}
                height={64}
              />
              <span className="text-xs font-garamond text-black/80 capitalize mt-1">{folder.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Apps Row - same layout as folders */}
      <div className="fixed bottom-8 left-0 right-0 px-4 z-40">
        <div className="justify-between flex gap-2">
          {mobileDockItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleDockClick(item)}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-16 h-16 overflow-hidden flex items-center justify-center ${
                iconsWithWhiteBg.includes(item.icon) ? "" : ""
              }`}>
                {dockIcons[item.icon] ? (
                  <Image
                    src={dockIcons[item.icon]}
                    alt={item.label || item.icon}
                    width={iconsWithWhiteBg.includes(item.icon) ? 40 : 64}
                    height={iconsWithWhiteBg.includes(item.icon) ? 40 : 64}
                    className={iconsWithWhiteBg.includes(item.icon) ? "object-contain" : "w-full h-full object-cover p-2"}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-500">{item.icon}</span>
                  </div>
                )}
              </div>
            
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
            image={windowConfig.image}
            isOpen={openScreen === folder.id}
            onClose={handleCloseScreen}
          />
        );
      })}

      {/* Cal Screen */}
      {openScreen === "cal" && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          {/* Window Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white flex-shrink-0">
            <button
              onClick={handleCloseScreen}
              className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] flex items-center justify-center"
            >
              <X className="w-2.5 h-2.5 text-[#880000]" strokeWidth={2.5} />
            </button>
            <div className="w-3.5 h-3.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#28C840]" />
            <span className="ml-2 text-sm text-black font-garamond">Cal.com</span>
          </div>
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

      {/* Email Screen */}
      {openScreen === "email" && (
        <Screen
          title={siteData.windows.email?.title || "Contact"}
          content={siteData.windows.email?.content || ""}
          isOpen={true}
          onClose={handleCloseScreen}
        />
      )}

      {/* Instagram Screen */}
      {openScreen === "instagram" && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="flex items-center gap-2 px-4 py-3 bg-white flex-shrink-0">
            <button
              onClick={handleCloseScreen}
              className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] flex items-center justify-center"
            >
              <X className="w-2.5 h-2.5 text-[#880000]" strokeWidth={2.5} />
            </button>
            <div className="w-3.5 h-3.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#28C840]" />
            <span className="ml-2 text-sm text-black font-garamond">Instagram</span>
          </div>
          <iframe
            src={siteData.windows.instagram?.url}
            className="flex-1 w-full border-0"
            title="Instagram"
          />
          <button onClick={handleCloseScreen} className="pb-2 pt-1 bg-white">
            <div className="w-32 h-1 bg-black rounded-full mx-auto" />
          </button>
        </div>
      )}

    </div>
  );
}
