export type SessionStatus = 'idle' | 'walking' | 'care-needed' | 'cheerful' | 'paused' | 'completed';

export type CareOption = 'water' | 'carrot';

export type FriendTurtle = {
  id: number;
  name: string;
  distanceLabel: string;
  moodMessage: string;
  accent: string;
  supportCount: number;
};

export type SessionHistoryEntry = {
  id: string;
  completedAt: string;
  minutes: number;
};
