"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { X, Minus, Maximize2 } from "lucide-react";
import { WindowConfig } from "@/data/siteData";

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null;

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
  const defaultWidth = config.width || 480;
  const defaultHeight = config.height || 400;

  const [position, setPosition] = useState({ x: defaultPos.x, y: defaultPos.y });
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<ResizeDirection>(null);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [preFullscreenState, setPreFullscreenState] = useState({ x: 0, y: 0, width: defaultWidth, height: defaultHeight });
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 });
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

  const handleResizeStart = useCallback(
    (direction: ResizeDirection) => (e: React.MouseEvent) => {
      if (isFullscreen) return;
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(direction);
      onFocus();
      resizeStart.current = {
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
        posX: position.x,
        posY: position.y,
      };
    },
    [isFullscreen, onFocus, size, position]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;
        const clampedX = Math.max(0, Math.min(newX, window.innerWidth - 100));
        const clampedY = Math.max(32, Math.min(newY, window.innerHeight - 100));
        setPosition({ x: clampedX, y: clampedY });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.current.x;
        const deltaY = e.clientY - resizeStart.current.y;
        const minWidth = 200;
        const minHeight = 150;

        let newWidth = resizeStart.current.width;
        let newHeight = resizeStart.current.height;
        let newX = resizeStart.current.posX;
        let newY = resizeStart.current.posY;

        if (isResizing.includes("e")) {
          newWidth = Math.max(minWidth, resizeStart.current.width + deltaX);
        }
        if (isResizing.includes("w")) {
          const widthDelta = Math.min(deltaX, resizeStart.current.width - minWidth);
          newWidth = resizeStart.current.width - widthDelta;
          newX = resizeStart.current.posX + widthDelta;
        }
        if (isResizing.includes("s")) {
          newHeight = Math.max(minHeight, resizeStart.current.height + deltaY);
        }
        if (isResizing.includes("n")) {
          const heightDelta = Math.min(deltaY, resizeStart.current.height - minHeight);
          newHeight = resizeStart.current.height - heightDelta;
          newY = Math.max(32, resizeStart.current.posY + heightDelta);
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    },
    [isDragging, isResizing]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(null);
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
      setPreFullscreenState({ x: position.x, y: position.y, width: size.width, height: size.height });
      setPosition({ x: 0, y: 32 });
    } else {
      setPosition({ x: preFullscreenState.x, y: preFullscreenState.y });
      setSize({ width: preFullscreenState.width, height: preFullscreenState.height });
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  if (!isOpen) return null;

  const windowWidth = isFullscreen ? "100vw" : `${size.width}px`;
  const windowHeight = isFullscreen ? "calc(100vh - 32px)" : `${size.height}px`;

  // Calculate target position for minimize animation (center bottom of screen)
  const dockY = typeof window !== "undefined" ? window.innerHeight - 40 : 800;
  const dockX = typeof window !== "undefined" ? window.innerWidth / 2 : 500;

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white shadow-2xl overflow-hidden border rounded flex flex-col ${
        isDragging ? "cursor-grabbing" : ""
      } ${isResizing ? "select-none" : ""} ${
        isMinimizing ? "pointer-events-none" : "animate-window-open"
      }`}
      style={{
        left: isMinimizing ? dockX : position.x,
        top: isMinimizing ? dockY : position.y,
        zIndex: isMinimizing ? 100 : zIndex,
        width: windowWidth,
        height: windowHeight,
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
        <span className="ml-2 text-sm text-black font-garamond">
          {config.title}
        </span>
      </div>

      {/* Window Content */}
      <div
        className={`window-content ${config.type === "embed" ? "p-0 flex flex-col" : "p-6"} overflow-y-auto flex-1`}
      >
        {config.type === "text" && (
          <div className="text-black text-sm leading-relaxed whitespace-pre-wrap">
            {config.image && (
              <div className="mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={config.image}
                  alt=""
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            {config.content}
          </div>
        )}
        {config.type === "embed" && config.url && (
          <iframe
            src={config.url}
            className="w-full h-full border-0"
            style={{ minHeight: "100%" }}
            title={config.title}
          />
        )}
      </div>

      {/* Resize Handles */}
      {!isFullscreen && (
        <>
          {/* Edges */}
          <div
            className="absolute top-0 left-2 right-2 h-1 cursor-n-resize"
            onMouseDown={handleResizeStart("n")}
          />
          <div
            className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize"
            onMouseDown={handleResizeStart("s")}
          />
          <div
            className="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize"
            onMouseDown={handleResizeStart("w")}
          />
          <div
            className="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize"
            onMouseDown={handleResizeStart("e")}
          />
          {/* Corners */}
          <div
            className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize"
            onMouseDown={handleResizeStart("nw")}
          />
          <div
            className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize"
            onMouseDown={handleResizeStart("ne")}
          />
          <div
            className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize"
            onMouseDown={handleResizeStart("sw")}
          />
          <div
            className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize"
            onMouseDown={handleResizeStart("se")}
          />
        </>
      )}
    </div>
  );
}
