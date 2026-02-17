"use client";

import { useWindowManager } from "@/hooks/useWindowManager";
import { useActivityLog } from "@/hooks/useActivityLog";
import { siteData, DockItem as DockItemType } from "@/data/siteData";
import TopBar from "./TopBar";
import FolderIcon from "./FolderIcon";
import Dock from "./Dock";
import InfoWidget from "./InfoWidget";
import Window from "./Window";
import Terminal from "./Terminal";

export default function Desktop() {
  const { openWindow, closeWindow, minimizeWindow, focusWindow, getZIndex, isOpen, state } =
    useWindowManager("story", "terminal"); // Terminal open by default
  const { addLog } = useActivityLog();

  const handleMinimizeWindow = (id: string) => {
    if (id === "terminal") {
      addLog(`Minimized Terminal`);
    } else {
      const windowConfig = siteData.windows[id];
      addLog(`Minimized ${windowConfig?.title || id}`);
    }
    minimizeWindow(id);
  };

  const handleNavClick = (id: string) => {
    const windowConfig = siteData.windows[id];
    addLog(`Navigated to ${windowConfig?.title || id}`);
    openWindow(id);
  };

  const handleFolderClick = (id: string) => {
    const windowConfig = siteData.windows[id];
    addLog(`Opened ${windowConfig?.title || id}`);
    openWindow(id);
  };

  const handleDockClick = (item: DockItemType) => {
    if (item.type === "link" && item.url) {
      addLog(`Visiting ${item.label || item.icon}`);
      window.open(item.url, "_blank");
    } else if (item.type === "window" && item.windowId) {
      if (item.windowId === "terminal") {
        addLog(`Opened Terminal`);
      } else {
        const windowConfig = siteData.windows[item.windowId];
        addLog(`Opened ${windowConfig?.title || item.label}`);
      }
      openWindow(item.windowId);
    }
  };

  const handleCloseWindow = (id: string) => {
    if (id === "terminal") {
      addLog(`Closed Terminal`);
    } else {
      const windowConfig = siteData.windows[id];
      addLog(`Closed ${windowConfig?.title || id}`);
    }
    closeWindow(id);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-fit bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/vision2.png')" }}
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
            icon={folder.icon}
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
            onClose={() => handleCloseWindow(id)}
            onFocus={() => focusWindow(id)}
            onMinimize={() => handleMinimizeWindow(id)}
            onOpenWindow={openWindow}
          />
        ))}
      </div>

      {/* Dock */}
      <Dock
        items={siteData.dockItems}
        onItemClick={handleDockClick}
        openWindows={state.openWindows}
        minimizedWindows={state.minimizedWindows}
        onRestoreWindow={openWindow}
      />

      {/* Terminal Log */}
      <Terminal
        isOpen={isOpen("terminal")}
        zIndex={getZIndex("terminal")}
        onClose={() => handleCloseWindow("terminal")}
        onFocus={() => focusWindow("terminal")}
        onMinimize={() => handleMinimizeWindow("terminal")}
      />
    </div>
  );
}
