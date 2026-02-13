"use client";

import { useState, useCallback } from "react";

export interface WindowState {
  openWindows: string[];
  windowOrder: string[];
}

export function useWindowManager(initialWindow?: string) {
  const [state, setState] = useState<WindowState>({
    openWindows: initialWindow ? [initialWindow] : [],
    windowOrder: initialWindow ? [initialWindow] : [],
  });

  const openWindow = useCallback((id: string) => {
    setState((prev) => {
      if (prev.openWindows.includes(id)) {
        // Window already open, just focus it
        return {
          ...prev,
          windowOrder: [...prev.windowOrder.filter((w) => w !== id), id],
        };
      }
      return {
        openWindows: [...prev.openWindows, id],
        windowOrder: [...prev.windowOrder, id],
      };
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setState((prev) => ({
      openWindows: prev.openWindows.filter((w) => w !== id),
      windowOrder: prev.windowOrder.filter((w) => w !== id),
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

  return {
    state,
    openWindow,
    closeWindow,
    focusWindow,
    getZIndex,
    isOpen,
  };
}
