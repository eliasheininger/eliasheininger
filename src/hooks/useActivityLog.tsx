"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface LogEntry {
  id: number;
  message: string;
  timestamp: Date;
}

interface ActivityLogContextType {
  logs: LogEntry[];
  addLog: (message: string) => void;
}

const ActivityLogContext = createContext<ActivityLogContextType | null>(null);

let logId = 0;

export function ActivityLogProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: logId++, message: "Session started", timestamp: new Date() },
  ]);

  const addLog = useCallback((message: string) => {
    setLogs((prev) => [
      ...prev.slice(-9), // Keep last 10 entries
      { id: logId++, message, timestamp: new Date() },
    ]);
  }, []);

  return (
    <ActivityLogContext.Provider value={{ logs, addLog }}>
      {children}
    </ActivityLogContext.Provider>
  );
}

export function useActivityLog() {
  const context = useContext(ActivityLogContext);
  if (!context) {
    throw new Error("useActivityLog must be used within ActivityLogProvider");
  }
  return context;
}
