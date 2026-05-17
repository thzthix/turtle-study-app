import { useEffect, useRef, useState } from 'react';
import { CarePrompt } from './components/CarePrompt';
import { CompletionCard } from './components/CompletionCard';
import { FocusHud } from './components/FocusHud';
import { FriendBoard } from './components/FriendBoard';
import { HistoryPanel } from './components/HistoryPanel';
import { JourneySummary } from './components/JourneySummary';
import { PauseNotice } from './components/PauseNotice';
import { SessionSetupModal } from './components/SessionSetupModal';
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
  const [isSetupOpen, setIsSetupOpen] = useState(true);
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

  useEffect(() => {
    if (status === 'walking' || status === 'care-needed' || status === 'cheerful' || status === 'paused') {
      setIsSetupOpen(false);
    }
  }, [status]);

  const handleStartSession = () => {
    setIsSetupOpen(false);
    startSession();
  };

  const handleResetSession = () => {
    resetSession();
    setIsSetupOpen(true);
  };

  const handleOpenSetup = () => {
    setIsSetupOpen(true);
  };

  return (
    <main className="app-shell app-shell-immersive">
      <div className="background-orb orb-left" />
      <div className="background-orb orb-right" />

      <header className="scene-topbar">
        <div>
          <p className="scene-kicker">Turtle Study Walk</p>
          <h1>거북이랑 천천히 끝까지</h1>
        </div>
        {status === 'idle' || status === 'completed' ? (
          <button type="button" className="primary-button" onClick={handleOpenSetup}>
            시간 정하기
          </button>
        ) : null}
      </header>

      <section className="experience-stage">
        <TurtleScene
          progressRatio={progressRatio}
          selectedMinutes={selectedMinutes}
          secondsLeft={secondsLeft}
          status={status}
        />

        {status === 'idle' ? (
          <section className="idle-invitation">
            <p className="eyebrow">Gentle Start</p>
            <h2>먼저 시간만 정하면, 그다음은 길과 거북이가 대신 흐름을 잡아줘요.</h2>
            <p>
              시작하고 나면 메인 화면은 산책길과 거북이 중심으로 바뀌고, 중간에는 짧은 돌봄만 남아요.
            </p>
            <button type="button" className="primary-button" onClick={handleOpenSetup}>
              산책 시간 고르기
            </button>
          </section>
        ) : null}

        {isFocusMode ? (
          <FocusHud
            secondsLeft={secondsLeft}
            progressRatio={progressRatio}
            status={status}
            encouragementMessage={encouragementMessage}
            onResumeSession={resumeSession}
            onResetSession={handleResetSession}
          />
        ) : null}

        <CarePrompt activeCareOption={activeCareOption} status={status} onSoothe={sootheTurtle} />
        {status === 'paused' ? <PauseNotice onResumeSession={resumeSession} /> : null}

        {status === 'completed' ? (
          <CompletionCard
            completedSessions={completedSessions}
            completedMinutes={completedMinutes}
            isHighlightVisible={isCompletionHighlightVisible}
            onRestart={handleOpenSetup}
          />
        ) : null}

        {(status === 'idle' || status === 'completed') && isSetupOpen ? (
          <SessionSetupModal
            selectedMinutes={selectedMinutes}
            onSelectMinutes={selectMinutes}
            onStartSession={handleStartSession}
            onClose={() => setIsSetupOpen(false)}
          />
        ) : null}
      </section>

      {status === 'completed' ? (
        <section className="reflection-layout">
          <HistoryPanel todaySessions={todaySessions} todayMinutes={todayMinutes} recentEntries={recentEntries} />
          <JourneySummary progressRatio={progressRatio} selectedMinutes={selectedMinutes} />
          <FriendBoard />
        </section>
      ) : null}
    </main>
  );
}
