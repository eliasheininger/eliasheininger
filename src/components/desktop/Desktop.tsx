"use client";

import { useWindowManager } from "@/hooks/useWindowManager";
import { siteData, DockItem as DockItemType } from "@/data/siteData";
import TopBar from "./TopBar";
import FolderIcon from "./FolderIcon";
import Dock from "./Dock";
import InfoWidget from "./InfoWidget";
import HeroText from "./HeroText";
import Window from "./Window";

export default function Desktop() {
  const { openWindow, closeWindow, focusWindow, getZIndex, isOpen } =
    useWindowManager("story");

  const handleNavClick = (id: string) => {
    openWindow(id);
  };

  const handleFolderClick = (id: string) => {
    openWindow(id);
  };

  const handleDockClick = (item: DockItemType) => {
    if (item.type === "link" && item.url) {
      window.open(item.url, "_blank");
    } else if (item.type === "window" && item.windowId) {
      openWindow(item.windowId);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-fit bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/vision.png')" }}
    >
      {/* Top Menu Bar */}
      <TopBar onNavClick={handleNavClick} />

      {/* Hero Text (centered background) */}
    

      {/* Left Sidebar - Folders */}
      <div className="fixed left-4 top-16 z-10 flex flex-col gap-2">
        {siteData.folders.map((folder) => (
          <FolderIcon
            key={folder.id}
            label={folder.label}
            onClick={() => handleFolderClick(folder.id)}
          />
        ))}
      </div>

      {/* Info Widget - Top Right */}
      <InfoWidget />

      {/* Windows */}
      <div className="pt-8">
        {Object.entries(siteData.windows).map(([id, config]) => (
          <Window
            key={id}
            config={config}
            isOpen={isOpen(id)}
            zIndex={getZIndex(id)}
            onClose={() => closeWindow(id)}
            onFocus={() => focusWindow(id)}
          />
        ))}
      </div>

      {/* Dock */}
      <Dock items={siteData.dockItems} onItemClick={handleDockClick} />
    </div>
  );
}
