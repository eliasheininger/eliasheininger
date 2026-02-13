"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

interface DockItemProps {
  icon: string;
  label?: string;
  onClick: () => void;
}

// Icons that have image files in /public
const imageIcons: Record<string, string> = {
  gmail: "/gmail.png",
  cal: "/cal.png",
  x: "/x.png",
  github: "/github.png",
  chrome: "/chrome.png",
  instagram: "/instagram.png",
  nova: "/nova.png",
};

export default function DockItem({ icon, label, onClick }: DockItemProps) {
  const imageSrc = imageIcons[icon];

  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/20 transition-all group"
    >
      {/* Tooltip */}
      {label && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="relative bg-white border px-3 py-1.5 rounded-lg">
            <span className="text-sm text-black whitespace-nowrap">{label}</span>
            {/* Triangle pointer */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r  rotate-45" />
          </div>
        </div>
      )}

      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform overflow-hidden ${icon === "cal" || icon === "gmail" ? "bg-white" : ""}`}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={label || icon}
            width={48}
            height={48}
            className={`${icon === "cal" || icon === "gmail" ? "w-10 h-10 object-contain" : "w-full h-full object-cover"}`}
          />
        ) : icon === "nova" ? (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-white text-xs">{icon}</span>
          </div>
        )}
      </div>
    </button>
  );
}
