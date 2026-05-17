import { useEffect, useMemo, useRef, useState } from 'react';
import type { CareOption, SessionStatus } from '../types';

const careCheckpoints = [0.4, 0.78];
const cheerfulDuration = 1800;
const completionHighlightDuration = 2600;

type FocusSessionState = {
  selectedMinutes: number;
  secondsLeft: number;
  progressRatio: number;
  status: SessionStatus;
  activeCareOption: CareOption | null;
  completedSessions: number;
  completedMinutes: number;
  lastCompletedMinutes: number | null;
  completedSignal: number;
  isCompletionHighlightVisible: boolean;
  encouragementMessage: string;
  selectMinutes: (minutes: number) => void;
  startSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  resetSession: () => void;
  sootheTurtle: (option: CareOption) => void;
};

const idleMessage = '거북이가 준비를 마쳤어요. 오늘도 천천히, 끝까지 가봐요.';
const walkingMessage = '거북이가 당신의 호흡에 맞춰 걸어요. 지금은 흐름만 지켜주세요.';
const pausedMessage = '잠깐 화면을 벗어나 있는 동안 거북이가 조용히 기다리고 있어요.';
const careMessages: Record<CareOption, string> = {
  water: '조금 목이 말라 보여요. 물 한 모금이면 다시 힘이 날 거예요.',
  carrot: '조용히 잘 버티고 있어요. 당근으로 다정하게 응원해줄까요?',
};
const cheerfulMessages: Record<CareOption, string> = {
  water: '시원한 물 덕분에 다시 경쾌하게 걸어요.',
  carrot: '당근을 먹고 기분 좋게 고개를 흔들어요.',
};

export function useFocusSession(): FocusSessionState {
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [status, setStatus] = useState<SessionStatus>('idle');
  const [activeCareOption, setActiveCareOption] = useState<CareOption | null>(null);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [completedMinutes, setCompletedMinutes] = useState(0);
  const [lastCompletedMinutes, setLastCompletedMinutes] = useState<number | null>(null);
  const [completedSignal, setCompletedSignal] = useState(0);
  const [isCompletionHighlightVisible, setIsCompletionHighlightVisible] = useState(false);
  const [encouragementMessage, setEncouragementMessage] = useState(idleMessage);
  const handledCheckpointCountRef = useRef(0);
  const cheerfulTimeoutRef = useRef<number | null>(null);
  const completionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (status !== 'walking') {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          window.clearInterval(timerId);
          setStatus('completed');
          setCompletedSessions((value) => value + 1);
          setCompletedMinutes((value) => value + selectedMinutes);
          setLastCompletedMinutes(selectedMinutes);
          setCompletedSignal((value) => value + 1);
          setIsCompletionHighlightVisible(true);
          setEncouragementMessage('끝까지 걸었어요. 거북이가 작은 애교로 당신을 반겨요.');
          return 0;
        }

        return currentSeconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [selectedMinutes, status]);

  useEffect(() => {
    if (status !== 'walking') {
      return;
    }

    const elapsedRatio = 1 - secondsLeft / (selectedMinutes * 60);
    const nextCheckpoint = careCheckpoints[handledCheckpointCountRef.current];

    if (nextCheckpoint !== undefined && elapsedRatio >= nextCheckpoint) {
      const careOption: CareOption =
        handledCheckpointCountRef.current % 2 === 0 ? 'water' : 'carrot';

      handledCheckpointCountRef.current += 1;
      setActiveCareOption(careOption);
      setStatus('care-needed');
      setEncouragementMessage(careMessages[careOption]);
    }
  }, [secondsLeft, selectedMinutes, status]);

  useEffect(() => {
    return () => {
      if (cheerfulTimeoutRef.current !== null) {
        window.clearTimeout(cheerfulTimeoutRef.current);
      }

      if (completionTimeoutRef.current !== null) {
        window.clearTimeout(completionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isCompletionHighlightVisible) {
      return undefined;
    }

    completionTimeoutRef.current = window.setTimeout(() => {
      setIsCompletionHighlightVisible(false);
    }, completionHighlightDuration);

    return () => {
      if (completionTimeoutRef.current !== null) {
        window.clearTimeout(completionTimeoutRef.current);
      }
    };
  }, [isCompletionHighlightVisible]);

  const progressRatio = useMemo(() => {
    const totalSeconds = selectedMinutes * 60;
    return Math.min(1, Math.max(0, 1 - secondsLeft / totalSeconds));
  }, [secondsLeft, selectedMinutes]);

  const selectMinutes = (minutes: number) => {
    if (status !== 'idle' && status !== 'completed') {
      return;
    }

    setSelectedMinutes(minutes);
    setSecondsLeft(minutes * 60);
  };

  const startSession = () => {
    handledCheckpointCountRef.current = 0;
    setSecondsLeft(selectedMinutes * 60);
    setActiveCareOption(null);
    setIsCompletionHighlightVisible(false);
    setStatus('walking');
    setEncouragementMessage(walkingMessage);
  };

  const pauseSession = () => {
    if (status === 'walking' || status === 'care-needed' || status === 'cheerful') {
      setStatus('paused');
      setEncouragementMessage(pausedMessage);
    }
  };

  const resumeSession = () => {
    if (status !== 'paused') {
      return;
    }

    const nextStatus = activeCareOption === null ? 'walking' : 'care-needed';
    setStatus(nextStatus);
    setEncouragementMessage(activeCareOption === null ? walkingMessage : careMessages[activeCareOption]);
  };

  const resetSession = () => {
    if (cheerfulTimeoutRef.current !== null) {
      window.clearTimeout(cheerfulTimeoutRef.current);
    }

    handledCheckpointCountRef.current = 0;
    setSecondsLeft(selectedMinutes * 60);
    setStatus('idle');
    setActiveCareOption(null);
    setIsCompletionHighlightVisible(false);
    setEncouragementMessage(idleMessage);
  };

  const sootheTurtle = (option: CareOption) => {
    setActiveCareOption(null);
    setStatus('cheerful');
    setEncouragementMessage(cheerfulMessages[option]);

    cheerfulTimeoutRef.current = window.setTimeout(() => {
      setStatus('walking');
      setEncouragementMessage(walkingMessage);
    }, cheerfulDuration);
  };

  return {
    selectedMinutes,
    secondsLeft,
    progressRatio,
    status,
    activeCareOption,
    completedSessions,
    completedMinutes,
    lastCompletedMinutes,
    completedSignal,
    isCompletionHighlightVisible,
    encouragementMessage,
    selectMinutes,
    startSession,
    pauseSession,
    resumeSession,
    resetSession,
    sootheTurtle,
  };
}
