"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { WindowConfig } from "@/data/siteData";

interface WindowProps {
  config: WindowConfig;
  isOpen: boolean;
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
}

export default function Window({
  config,
  isOpen,
  zIndex,
  onClose,
  onFocus,
}: WindowProps) {
  const defaultPos = config.defaultPosition || { x: 120, y: 80 };
  const [position, setPosition] = useState({ x: defaultPos.x, y: defaultPos.y });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Only drag from the header area
      if ((e.target as HTMLElement).closest(".window-content")) return;

      e.preventDefault();
      setIsDragging(true);
      onFocus();
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [position, onFocus]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;

      // Keep window within viewport bounds
      const clampedX = Math.max(0, Math.min(newX, window.innerWidth - 100));
      const clampedY = Math.max(32, Math.min(newY, window.innerHeight - 100)); // 32px for top bar

      setPosition({ x: clampedX, y: clampedY });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

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

  return (
    <div
      className={`absolute bg-white border rounded-lg shadow-2xl overflow-hidden animate-window-open ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      style={{
        left: position.x,
        top: position.y,
        zIndex,
        width: config.width ? `${config.width}px` : "480px",
        maxWidth: "calc(100vw - 240px)",
      }}
      onClick={onFocus}
    >
      {/* Window Header - Draggable */}
      <div
        className="flex items-center gap-2 px-4 py-3 bg-white cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
      >
        {/* Traffic Light Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          aria-label="Close window"
        />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-sm text-black font-medium">
          {config.title}
        </span>
      </div>

      {/* Window Content */}
      <div className={`window-content ${config.type === "embed" ? "p-0" : "p-6"} max-h-[80vh] overflow-y-auto`}>
        {config.type === "text" && (
          <div className="text-black text-sm leading-relaxed whitespace-pre-wrap">
            {config.content}
          </div>
        )}
        {config.type === "embed" && config.url && (
          <iframe
            src={config.url}
            className="w-full border-0"
            style={{ height: config.height ? `${config.height}px` : "384px" }}
            title={config.title}
          />
        )}
      </div>
    </div>
  );
}
