import { useEffect, useMemo, useState } from 'react';
import { isTodayEntry, readSessionHistory, saveSessionHistory } from '../lib/sessionHistory';
import type { SessionHistoryEntry } from '../types';

type SessionHistoryState = {
  historyEntries: SessionHistoryEntry[];
  todaySessions: number;
  todayMinutes: number;
  recentEntries: SessionHistoryEntry[];
  addCompletedSession: (minutes: number) => void;
};

export function useSessionHistory(): SessionHistoryState {
  const [historyEntries, setHistoryEntries] = useState<SessionHistoryEntry[]>([]);

  useEffect(() => {
    setHistoryEntries(readSessionHistory());
  }, []);

  useEffect(() => {
    saveSessionHistory(historyEntries);
  }, [historyEntries]);

  const todayEntries = useMemo(() => {
    return historyEntries.filter(isTodayEntry);
  }, [historyEntries]);

  const recentEntries = useMemo(() => {
    return [...todayEntries].reverse().slice(0, 4);
  }, [todayEntries]);

  const todayMinutes = useMemo(() => {
    return todayEntries.reduce((sum, entry) => sum + entry.minutes, 0);
  }, [todayEntries]);

  const addCompletedSession = (minutes: number) => {
    const nextEntry: SessionHistoryEntry = {
      id: crypto.randomUUID(),
      completedAt: new Date().toISOString(),
      minutes,
    };

    setHistoryEntries((currentEntries) => [...currentEntries, nextEntry]);
  };

  return {
    historyEntries,
    todaySessions: todayEntries.length,
    todayMinutes,
    recentEntries,
    addCompletedSession,
  };
}
