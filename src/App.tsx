import { CarePrompt } from './components/CarePrompt';
import { CompletionCard } from './components/CompletionCard';
import { FriendBoard } from './components/FriendBoard';
import { JourneySummary } from './components/JourneySummary';
import { SessionPanel } from './components/SessionPanel';
import { TurtleScene } from './components/TurtleScene';
import { useFocusSession } from './hooks/useFocusSession';

export default function App() {
  const {
    selectedMinutes,
    secondsLeft,
    progressRatio,
    status,
    activeCareOption,
    completedSessions,
    completedMinutes,
    encouragementMessage,
    selectMinutes,
    startSession,
    resetSession,
    sootheTurtle,
  } = useFocusSession();

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
          onResetSession={resetSession}
        />
        <TurtleScene progressRatio={progressRatio} status={status} />
      </section>

      <section className="secondary-layout">
        <JourneySummary progressRatio={progressRatio} selectedMinutes={selectedMinutes} />
        <CarePrompt activeCareOption={activeCareOption} onSoothe={sootheTurtle} />
        {status === 'completed' ? (
          <CompletionCard completedSessions={completedSessions} completedMinutes={completedMinutes} />
        ) : null}
      </section>

      <FriendBoard />
    </main>
  );
}
