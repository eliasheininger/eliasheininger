"use client";

import Image from "next/image";

interface DockItemProps {
  icon: string;
  label?: string;
  isOpen?: boolean;
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
  shitcheck: "/shitcheck.png",
  terminal: "/terminal.png",
};

export default function DockItem({ icon, label, isOpen, onClick }: DockItemProps) {
  const imageSrc = imageIcons[icon];

  return (
    <button
      onClick={onClick}
      className="relative group"
    >
      {/* Tooltip */}
      {label && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="relative bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg">
            <span className="text-md text-gray-800 whitespace-nowrap font-regular">{label}</span>
            {/* Triangle pointer */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 rotate-45" />
          </div>
        </div>
      )}

      <div className="w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center hover:scale-105 transition-transform">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={label || icon}
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
        ) : (
          <div className="w-full h-full bg-white flex items-center justify-center rounded-2xl">
            <span className="text-gray-500 text-xs">{icon}</span>
          </div>
        )}
      </div>

      {/* Open indicator dot */}
      {isOpen && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-black/60 rounded-full" />
      )}
    </button>
  );
}
