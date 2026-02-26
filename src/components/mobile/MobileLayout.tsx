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
  shitcheck: "/shitcheck.png",
  terminal: "/terminal.png",
};

interface ScreenProps {
  title: string;
  content: string;
  image?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenScreen?: (screenId: string) => void;
}

function Screen({ title, content, image, isOpen, onClose, onOpenScreen }: ScreenProps) {
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
        <span className="ml-2 text-base text-black font-garamond">{title}</span>
      </div>

      {/* Screen Content */}
      <div className="flex-1 flex flex-col px-4 py-4 overflow-y-auto">
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
        <div
          className="text-black text-base leading-relaxed whitespace-pre-wrap flex-1"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' && target.dataset.window) {
              e.preventDefault();
              onOpenScreen?.(target.dataset.window);
            }
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Home Indicator */}
      <div className="pb-2 pt-1">
        <div className="w-32 h-1 bg-black rounded-full mx-auto" />
      </div>
    </div>
  );
}

export default function MobileLayout() {
  const [openScreen, setOpenScreen] = useState<string | null>("story");

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

  // Filter dock items for mobile - only core apps
  const mobileDockItems = siteData.dockItems.filter(
    (item) => ["nova", "shitcheck", "cal", "github"].includes(item.icon)
  );

  // Mobile folders - same as desktop now that work is replaced with socials
  const mobileFolders = siteData.folders;

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
        <div className="flex justify-start gap-8 pt-4">
          {mobileFolders.map((folder) => (
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

      {/* Apps Row - matching desktop dock style */}
      <div className="fixed bottom-6 left-0 right-0 px-4 z-40">
        <div className="flex items-center justify-between px-4 py-4 bg-white/80 backdrop-blur-sm rounded border">
          {mobileDockItems.map((item) => {
            const isItemOpen = item.windowId ? openScreen === item.windowId : false;
            return (
              <button
                key={item.id}
                onClick={() => handleDockClick(item)}
                className="relative"
              >
                <div className="w-18 h-18 rounded border bg-white flex items-center justify-center active:scale-95 transition-transform">
                  {dockIcons[item.icon] ? (
                    <Image
                      src={dockIcons[item.icon]}
                      alt={item.label || item.icon}
                      width={36}
                      height={36}
                      className="w-9 h-9 object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded">
                      <span className="text-xs text-gray-500">{item.icon}</span>
                    </div>
                  )}
                </div>
                {/* Open indicator dot */}
                {isItemOpen && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-black/60 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Screens */}
      {mobileFolders.map((folder) => {
        const windowConfig = siteData.windows[folder.id];
        if (!windowConfig || windowConfig.type !== "text") return null;
        return (
          <Screen
            key={folder.id}
            title={windowConfig.title}
            content={windowConfig.content || ""}
            image={windowConfig.image}
            isOpen={openScreen === folder.id}
            onClose={handleCloseScreen}
            onOpenScreen={setOpenScreen}
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
          onOpenScreen={setOpenScreen}
        />
      )}

      {/* Nova Screen */}
      {openScreen === "nova" && (
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
            <span className="ml-2 text-sm text-black font-garamond">Nova</span>
          </div>
          <iframe
            src={siteData.windows.nova?.url}
            className="flex-1 w-full border-0"
            title="Nova"
          />
          <button onClick={handleCloseScreen} className="pb-2 pt-1 bg-white">
            <div className="w-32 h-1 bg-black rounded-full mx-auto" />
          </button>
        </div>
      )}

      {/* ShitCheck Screen */}
      {openScreen === "shitcheck" && (
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
            <span className="ml-2 text-sm text-black font-garamond">ShitCheck</span>
          </div>
          <iframe
            src={siteData.windows.shitcheck?.url}
            className="flex-1 w-full border-0"
            title="ShitCheck"
          />
          <button onClick={handleCloseScreen} className="pb-2 pt-1 bg-white">
            <div className="w-32 h-1 bg-black rounded-full mx-auto" />
          </button>
        </div>
      )}
    </div>
  );
}
