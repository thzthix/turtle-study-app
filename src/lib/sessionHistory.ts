import type { SessionHistoryEntry } from '../types';

const storageKey = 'turtle-study-app/session-history';

export function readSessionHistory(): SessionHistoryEntry[] {
  if (!isStorageAvailable()) {
    return [];
  }

  const rawValue = window.localStorage.getItem(storageKey);

  if (rawValue === null) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue) as SessionHistoryEntry[];

    return Array.isArray(parsedValue)
      ? parsedValue.filter(isValidHistoryEntry)
      : [];
  } catch {
    return [];
  }
}

export function saveSessionHistory(historyEntries: SessionHistoryEntry[]) {
  if (!isStorageAvailable()) {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(historyEntries));
}

export function isTodayEntry(historyEntry: SessionHistoryEntry) {
  const today = new Date();
  const completedDate = new Date(historyEntry.completedAt);

  return (
    today.getFullYear() === completedDate.getFullYear() &&
    today.getMonth() === completedDate.getMonth() &&
    today.getDate() === completedDate.getDate()
  );
}

function isStorageAvailable() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function isValidHistoryEntry(value: unknown): value is SessionHistoryEntry {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const entry = value as Record<string, unknown>;

  return (
    typeof entry.id === 'string' &&
    typeof entry.completedAt === 'string' &&
    typeof entry.minutes === 'number'
  );
}
