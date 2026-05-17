import { useEffect, useRef } from 'react';
import { CarePrompt } from './components/CarePrompt';
import { CompletionCard } from './components/CompletionCard';
import { FocusHud } from './components/FocusHud';
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
    isCompletionHighlightVisible,
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
  const isFocusMode = status !== 'idle' && status !== 'completed';

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

      {status === 'idle' ? (
        <section className="hero-layout">
          <SessionPanel
            selectedMinutes={selectedMinutes}
            status={status}
            onSelectMinutes={selectMinutes}
            onStartSession={startSession}
          />
          <TurtleScene progressRatio={progressRatio} status={status} mode="preview" />
        </section>
      ) : null}

      {isFocusMode ? (
        <section className="focus-layout">
          <FocusHud
            secondsLeft={secondsLeft}
            status={status}
            encouragementMessage={encouragementMessage}
            onResumeSession={resumeSession}
            onResetSession={resetSession}
          />
          <TurtleScene progressRatio={progressRatio} status={status} mode="focus" />
          <section className="focus-support">
            <CarePrompt activeCareOption={activeCareOption} status={status} onSoothe={sootheTurtle} />
            {status === 'paused' ? <PauseNotice onResumeSession={resumeSession} /> : null}
          </section>
        </section>
      ) : null}

      {status === 'completed' ? (
        <>
          <section className="hero-layout">
            <SessionPanel
              selectedMinutes={selectedMinutes}
              status="idle"
              onSelectMinutes={selectMinutes}
              onStartSession={startSession}
            />
            <TurtleScene progressRatio={progressRatio} status={status} mode="preview" />
          </section>

          <section className="secondary-layout">
            <CompletionCard
              completedSessions={completedSessions}
              completedMinutes={completedMinutes}
              isHighlightVisible={isCompletionHighlightVisible}
            />
            <HistoryPanel
              todaySessions={todaySessions}
              todayMinutes={todayMinutes}
              recentEntries={recentEntries}
            />
            <JourneySummary progressRatio={progressRatio} selectedMinutes={selectedMinutes} />
          </section>

          <FriendBoard />
        </>
      ) : null}
    </main>
  );
}
