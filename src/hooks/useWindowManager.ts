"use client";

import { useState, useCallback } from "react";

export interface WindowState {
  openWindows: string[];
  windowOrder: string[];
  minimizedWindows: string[];
}

export function useWindowManager(...initialWindows: string[]) {
  const [state, setState] = useState<WindowState>({
    openWindows: initialWindows,
    windowOrder: initialWindows,
    minimizedWindows: [],
  });

  const openWindow = useCallback((id: string) => {
    setState((prev) => {
      // If minimized, restore it
      if (prev.minimizedWindows.includes(id)) {
        return {
          openWindows: [...prev.openWindows, id],
          windowOrder: [...prev.windowOrder, id],
          minimizedWindows: prev.minimizedWindows.filter((w) => w !== id),
        };
      }
      if (prev.openWindows.includes(id)) {
        // Window already open, just focus it
        return {
          ...prev,
          windowOrder: [...prev.windowOrder.filter((w) => w !== id), id],
        };
      }
      return {
        ...prev,
        openWindows: [...prev.openWindows, id],
        windowOrder: [...prev.windowOrder, id],
      };
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      openWindows: prev.openWindows.filter((w) => w !== id),
      windowOrder: prev.windowOrder.filter((w) => w !== id),
      minimizedWindows: prev.minimizedWindows.filter((w) => w !== id),
    }));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      openWindows: prev.openWindows.filter((w) => w !== id),
      windowOrder: prev.windowOrder.filter((w) => w !== id),
      minimizedWindows: [...prev.minimizedWindows, id],
    }));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setState((prev) => {
      if (!prev.openWindows.includes(id)) return prev;
      return {
        ...prev,
        windowOrder: [...prev.windowOrder.filter((w) => w !== id), id],
      };
    });
  }, []);

  const getZIndex = useCallback(
    (id: string) => {
      const index = state.windowOrder.indexOf(id);
      return index === -1 ? 20 : 20 + index;
    },
    [state.windowOrder]
  );

  const isOpen = useCallback(
    (id: string) => state.openWindows.includes(id),
    [state.openWindows]
  );

  const isMinimized = useCallback(
    (id: string) => state.minimizedWindows.includes(id),
    [state.minimizedWindows]
  );

  return {
    state,
    openWindow,
    closeWindow,
    minimizeWindow,
    focusWindow,
    getZIndex,
    isOpen,
    isMinimized,
  };
}
