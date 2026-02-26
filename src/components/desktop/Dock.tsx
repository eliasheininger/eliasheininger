"use client";

import Image from "next/image";
import DockItem from "./DockItem";
import { DockItem as DockItemType, siteData } from "@/data/siteData";

interface DockProps {
  items: DockItemType[];
  onItemClick: (item: DockItemType) => void;
  openWindows?: string[];
  minimizedWindows?: string[];
  onRestoreWindow?: (id: string) => void;
}

export default function Dock({ items, onItemClick, openWindows = [], minimizedWindows = [], onRestoreWindow }: DockProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-200/80 backdrop-blur-4xl rounded-2xl">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2">
            <DockItem
              icon={item.icon}
              label={item.label}
              isOpen={item.windowId ? openWindows.includes(item.windowId) || minimizedWindows.includes(item.windowId) : false}
              onClick={() => onItemClick(item)}
            />
            {/* Dividers between groups */}
            {(index === 2 || index === 4) && index < items.length - 1 && (
              <div className="w-px h-12 bg-gray-300/60" />
            )}
          </div>
        ))}

        {/* Minimized Windows */}
        {minimizedWindows.length > 0 && (
          <>
            <div className="w-px h-12 bg-gray-300/60 mx-1" />
            {minimizedWindows.map((windowId) => {
              const windowConfig = windowId === "terminal"
                ? { title: "Terminal" }
                : siteData.windows[windowId];
              const isDark = windowId === "terminal";
              return (
                <button
                  key={windowId}
                  onClick={() => onRestoreWindow?.(windowId)}
                  className="relative group"
                >
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="relative bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg">
                      <span className="text-sm text-gray-800 whitespace-nowrap font-medium">{windowConfig?.title || windowId}</span>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 rotate-45" />
                    </div>
                  </div>
                  {/* Minimized window preview using SVG */}
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center hover:scale-105 transition-transform">
                    <Image
                      src={isDark ? "/mini-window-dark.svg" : "/mini-window-light.svg"}
                      alt={windowConfig?.title || windowId}
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  </div>
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
