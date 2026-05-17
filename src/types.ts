export type SessionStatus = 'idle' | 'walking' | 'care-needed' | 'cheerful' | 'completed';

export type CareOption = 'water' | 'carrot';

export type FriendTurtle = {
  id: number;
  name: string;
  distanceLabel: string;
  moodMessage: string;
  accent: string;
};
