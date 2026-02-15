"use client";

import Image from "next/image";

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
  terminal: "/terminal.png",
};

export default function DockItem({ icon, label, onClick }: DockItemProps) {
  const imageSrc = imageIcons[icon];

  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center gap-1 p-1 rounded-xl hover:bg-white/20 transition-all group"
    >
      {/* Tooltip */}
      {label && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="relative bg-white border px-3 py-1.5 rounded-lg">
            <span className="text-sm text-black whitespace-nowrap">{label}</span>
            {/* Triangle pointer */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r rotate-45" />
          </div>
        </div>
      )}

      <div className="w-18 h-18 flex items-center justify-center  group-hover:scale-110 transition-transform overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={label || icon}
            width={48}
            height={48}
            className="w-14 h-14 object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-500 text-xs">{icon}</span>
          </div>
        )}
      </div>
    </button>
  );
}
