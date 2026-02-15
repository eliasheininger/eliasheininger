"use client";

import Image from "next/image";

interface FolderIconProps {
  label: string;
  icon?: string;
  onClick: () => void;
}

export default function FolderIcon({ label, icon = "/folders.svg", onClick }: FolderIconProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 p-2 rounded-lg folder-button"
    >
      <Image
        src={icon}
        alt="Folder"
        width={64}
        height={64}
        className="folder-icon"
      />
      <span className="text-sm font-garamond text-black/80 capitalize">{label}</span>
    </button>
  );
}
