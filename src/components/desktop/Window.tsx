"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { X, Minus, Maximize2 } from "lucide-react";
import { WindowConfig } from "@/data/siteData";

interface WindowProps {
  config: WindowConfig;
  isOpen: boolean;
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
}

export default function Window({
  config,
  isOpen,
  zIndex,
  onClose,
  onFocus,
  onMinimize,
}: WindowProps) {
  const defaultPos = config.defaultPosition || { x: 120, y: 80 };
  const [position, setPosition] = useState({ x: defaultPos.x, y: defaultPos.y });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [preFullscreenState, setPreFullscreenState] = useState({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest(".window-content")) return;
      if (isFullscreen) return;

      e.preventDefault();
      setIsDragging(true);
      onFocus();
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [position, onFocus, isFullscreen]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;

      const clampedX = Math.max(0, Math.min(newX, window.innerWidth - 100));
      const clampedY = Math.max(32, Math.min(newY, window.innerHeight - 100));

      setPosition({ x: clampedX, y: clampedY });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimizing(true);
    // After animation completes, actually minimize
    setTimeout(() => {
      setIsMinimizing(false);
      onMinimize();
    }, 400);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFullscreen) {
      setPreFullscreenState({ x: position.x, y: position.y });
      setPosition({ x: 0, y: 32 });
    } else {
      setPosition(preFullscreenState);
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!isOpen) return null;

  const windowWidth = isFullscreen
    ? "100vw"
    : config.width
      ? `${config.width}px`
      : "480px";

  const windowHeight = isFullscreen
    ? "calc(100vh - 32px)"
    : "auto";

  // Calculate target position for minimize animation (center bottom of screen)
  const dockY = typeof window !== "undefined" ? window.innerHeight - 40 : 800;
  const dockX = typeof window !== "undefined" ? window.innerWidth / 2 : 500;

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white shadow-2xl overflow-hidden flex flex-col ${
        isDragging ? "cursor-grabbing" : ""
      } ${isFullscreen ? "rounded-none" : "rounded-4xl"} ${
        isMinimizing ? "pointer-events-none" : "animate-window-open"
      }`}
      style={{
        left: isMinimizing ? dockX : position.x,
        top: isMinimizing ? dockY : position.y,
        zIndex: isMinimizing ? 100 : zIndex,
        width: windowWidth,
        height: windowHeight,
        maxWidth: isFullscreen ? "100vw" : "calc(100vw - 240px)",
        transform: isMinimizing ? "scale(0.1) translateX(-50%)" : "scale(1)",
        opacity: isMinimizing ? 0 : 1,
        transition: isMinimizing
          ? "all 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out"
          : undefined,
        transformOrigin: "bottom center",
      }}
      onClick={onFocus}
    >
      {/* Window Header - Draggable */}
      <div
        className="flex items-center gap-2 px-4 py-3 bg-white cursor-grab active:cursor-grabbing select-none group/header flex-shrink-0"
        onMouseDown={handleMouseDown}
      >
        {/* Traffic Light Buttons */}
        <div
          className="flex items-center gap-2 cursor-default"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57] transition-colors flex items-center justify-center cursor-default"
            aria-label="Close window"
          >
            <X className="w-2.5 h-2.5 text-[#880000] opacity-0 group-hover/header:opacity-100 transition-opacity" strokeWidth={2.5} />
          </button>
          <button
            onClick={handleMinimize}
            className="w-3.5 h-3.5 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E] transition-colors flex items-center justify-center cursor-default"
            aria-label="Minimize window"
          >
            <Minus className="w-2.5 h-2.5 text-[#885500] opacity-0 group-hover/header:opacity-100 transition-opacity" strokeWidth={2.5} />
          </button>
          <button
            onClick={handleFullscreen}
            className="w-3.5 h-3.5 rounded-full bg-[#28C840] hover:bg-[#28C840] transition-colors flex items-center justify-center cursor-default"
            aria-label="Fullscreen window"
          >
            <Maximize2 className="w-2 h-2 text-[#006600] opacity-0 group-hover/header:opacity-100 transition-opacity" strokeWidth={2.5} />
          </button>
        </div>
        <span className="ml-2 text-sm text-black font-medium">
          {config.title}
        </span>
      </div>

      {/* Window Content */}
      <div
        className={`window-content ${config.type === "embed" ? "p-0" : "p-6"} overflow-y-auto ${isFullscreen ? "flex-1" : ""}`}
        style={{
          maxHeight: isFullscreen ? "none" : "80vh",
        }}
      >
        {config.type === "text" && (
          <div className="text-black text-sm leading-relaxed whitespace-pre-wrap">
            {config.content}
          </div>
        )}
        {config.type === "embed" && config.url && (
          <iframe
            src={config.url}
            className="w-full border-0"
            style={{
              height: isFullscreen
                ? "100%"
                : config.height
                  ? `${config.height}px`
                  : "384px",
              minHeight: isFullscreen ? "100%" : undefined,
            }}
            title={config.title}
          />
        )}
      </div>
    </div>
  );
}
