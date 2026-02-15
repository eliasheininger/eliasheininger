"use client";

import Image from "next/image";
import DockItem from "./DockItem";
import { DockItem as DockItemType, siteData } from "@/data/siteData";

interface DockProps {
  items: DockItemType[];
  onItemClick: (item: DockItemType) => void;
  minimizedWindows?: string[];
  onRestoreWindow?: (id: string) => void;
}

export default function Dock({ items, onItemClick, minimizedWindows = [], onRestoreWindow }: DockProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-1 px-4 py-3 rounded-2xl ">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <DockItem
              icon={item.icon}
              label={item.label}
              onClick={() => onItemClick(item)}
            />
            {/* Dividers between groups */}
            {(index === 1 || index === 3) && index < items.length - 1 && (
              <div className="w-px h-8 bg-gray-400/30 mx-1" />
            )}
          </div>
        ))}

        {/* Minimized Windows */}
        {minimizedWindows.length > 0 && (
          <>
            <div className="w-px h-8 bg-gray-400/30 mx-1" />
            {minimizedWindows.map((windowId) => {
              const windowConfig = windowId === "terminal"
                ? { title: "Terminal" }
                : siteData.windows[windowId];
              const isDark = windowId === "terminal";
              return (
                <button
                  key={windowId}
                  onClick={() => onRestoreWindow?.(windowId)}
                  className="relative group p-2 rounded-xl hover:bg-white/20 transition-all"
                >
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="relative bg-white border px-3 py-1.5 rounded-lg">
                      <span className="text-sm text-black whitespace-nowrap">{windowConfig?.title || windowId}</span>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r rotate-45" />
                    </div>
                  </div>
                  {/* Minimized window preview using SVG */}
                  <div className="w-12 h-12 group-hover:scale-110 transition-transform">
                    <Image
                      src={isDark ? "/mini-window-dark.svg" : "/mini-window-light.svg"}
                      alt={windowConfig?.title || windowId}
                      width={48}
                      height={48}
                      className="w-full h-full"
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
