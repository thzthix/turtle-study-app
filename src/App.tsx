import { useEffect, useRef } from 'react';
import { CarePrompt } from './components/CarePrompt';
import { CompletionCard } from './components/CompletionCard';
import { FriendBoard } from './components/FriendBoard';
import { HistoryPanel } from './components/HistoryPanel';
import { JourneySummary } from './components/JourneySummary';
import { PauseNotice } from './components/PauseNotice';
import { SessionPanel } from './components/SessionPanel';
import { TurtleScene } from './components/TurtleScene';
import { useFocusSession } from './hooks/useFocusSession';
import { useSessionHistory } from './hooks/useSessionHistory';

export default function App() {
  const {
    selectedMinutes,
    secondsLeft,
    progressRatio,
    status,
    activeCareOption,
    completedSessions,
    completedMinutes,
    lastCompletedMinutes,
    completedSignal,
    encouragementMessage,
    selectMinutes,
    startSession,
    pauseSession,
    resumeSession,
    resetSession,
    sootheTurtle,
  } = useFocusSession();
  const { todaySessions, todayMinutes, recentEntries, addCompletedSession } = useSessionHistory();
  const handledCompletedSignalRef = useRef(0);

  useEffect(() => {
    if (completedSignal === 0 || completedSignal === handledCompletedSignalRef.current) {
      return;
    }

    handledCompletedSignalRef.current = completedSignal;

    if (lastCompletedMinutes !== null) {
      addCompletedSession(lastCompletedMinutes);
    }
  }, [addCompletedSession, completedSignal, lastCompletedMinutes]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        pauseSession();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pauseSession]);

  return (
    <main className="app-shell">
      <div className="background-orb orb-left" />
      <div className="background-orb orb-right" />

      <section className="hero-layout">
        <SessionPanel
          selectedMinutes={selectedMinutes}
          secondsLeft={secondsLeft}
          status={status}
          encouragementMessage={encouragementMessage}
          onSelectMinutes={selectMinutes}
          onStartSession={startSession}
          onResumeSession={resumeSession}
          onResetSession={resetSession}
        />
        <TurtleScene progressRatio={progressRatio} status={status} />
      </section>

      <section className="secondary-layout">
        <JourneySummary progressRatio={progressRatio} selectedMinutes={selectedMinutes} />
        <HistoryPanel
          todaySessions={todaySessions}
          todayMinutes={todayMinutes}
          recentEntries={recentEntries}
        />
        <CarePrompt activeCareOption={activeCareOption} status={status} onSoothe={sootheTurtle} />
        {status === 'paused' ? <PauseNotice onResumeSession={resumeSession} /> : null}
        {status === 'completed' ? (
          <CompletionCard completedSessions={completedSessions} completedMinutes={completedMinutes} />
        ) : null}
      </section>

      <FriendBoard />
    </main>
  );
}
