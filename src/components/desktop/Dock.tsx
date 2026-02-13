"use client";

import DockItem from "./DockItem";
import { DockItem as DockItemType } from "@/data/siteData";

interface DockProps {
  items: DockItemType[];
  onItemClick: (item: DockItemType) => void;
}

export default function Dock({ items, onItemClick }: DockProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-1 px-3 py-2 bg-white/30 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <DockItem
              icon={item.icon}
              label={item.label}
              onClick={() => onItemClick(item)}
            />
            {/* Dividers between groups */}
            {(index === 0 || index === 2) && index < items.length - 1 && (
              <div className="w-px h-8 bg-gray-400/30 mx-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
