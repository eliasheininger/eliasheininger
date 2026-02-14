"use client";

import { useActivityLog } from "@/hooks/useActivityLog";
import { useEffect, useRef, useState, useCallback } from "react";
import { X, Minus, Maximize2 } from "lucide-react";

interface TerminalProps {
  isOpen: boolean;
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
}

export default function Terminal({ isOpen, zIndex, onClose, onFocus, onMinimize }: TerminalProps) {
  const { logs } = useActivityLog();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 20, y: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".terminal-content")) return;
    e.preventDefault();
    setIsDragging(true);
    onFocus();
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  }, [position, onFocus]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragOffset.current.x;
    const newY = e.clientY - dragOffset.current.y;
    const clampedX = Math.max(0, Math.min(newX, window.innerWidth - 100));
    const clampedY = Math.max(32, Math.min(newY, window.innerHeight - 100));
    setPosition({ x: clampedX, y: clampedY });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimizing(true);
    setTimeout(() => {
      setIsMinimizing(false);
      onMinimize();
    }, 400);
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

  // Calculate target position for minimize animation
  const dockY = typeof window !== "undefined" ? window.innerHeight - 40 : 800;
  const dockX = typeof window !== "undefined" ? window.innerWidth / 2 : 500;

  return (
    <div
      className={`absolute w-[380px] bg-[#1e1e1e] shadow-2xl overflow-hidden rounded-4xl flex flex-col ${
        isDragging ? "cursor-grabbing" : ""
      } ${isMinimizing ? "pointer-events-none" : ""}`}
      style={{
        left: isMinimizing ? dockX : position.x,
        top: isMinimizing ? dockY : position.y,
        zIndex: isMinimizing ? 100 : zIndex,
        transform: isMinimizing ? "scale(0.1) translateX(-50%)" : "scale(1)",
        opacity: isMinimizing ? 0 : 1,
        transition: isMinimizing
          ? "all 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out"
          : undefined,
        transformOrigin: "bottom center",
      }}
      onClick={onFocus}
    >
      {/* Terminal Header - Draggable */}
      <div
        className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] cursor-grab active:cursor-grabbing select-none group/header flex-shrink-0"
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
            className="w-3.5 h-3.5 rounded-full bg-[#28C840] hover:bg-[#28C840] transition-colors flex items-center justify-center cursor-default"
            aria-label="Fullscreen window"
          >
            <Maximize2 className="w-2 h-2 text-[#006600] opacity-0 group-hover/header:opacity-100 transition-opacity" strokeWidth={2.5} />
          </button>
        </div>
        <span className="ml-2 text-sm text-gray-300 font-medium">
          Terminal — system.log
        </span>
      </div>

      {/* Terminal Content */}
      <div
        ref={scrollRef}
        className="terminal-content px-4 py-3 h-48 overflow-y-auto font-mono text-sm"
      >
        {logs.map((log, index) => (
          <div key={log.id} className="flex gap-2 leading-relaxed">
            <span className="text-gray-500 select-none">[{String(index).padStart(2, '0')}]</span>
            <span className="text-green-400">{log.message}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-500 select-none">$</span>
          <span className="text-green-400 animate-pulse">▋</span>
        </div>
      </div>
    </div>
  );
}
