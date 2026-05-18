import type { SessionStatus } from '../types';

type FocusHudProps = {
  secondsLeft: number;
  progressRatio: number;
  status: SessionStatus;
  encouragementMessage: string;
  onResumeSession: () => void;
  onResetSession: () => void;
};

export function FocusHud({
  secondsLeft,
  progressRatio,
  status,
  encouragementMessage,
  onResumeSession,
  onResetSession,
}: FocusHudProps) {
  return (
    <section className="focus-hud">
      <span className="focus-hud-leaf" aria-hidden="true">
        🌿
      </span>
      <strong className="focus-hud-time">{formatTime(secondsLeft)}</strong>
      <div className="focus-hud-progress" aria-hidden="true">
        <span style={{ width: `${Math.max(8, progressRatio * 100)}%` }} />
      </div>
      <div className="focus-hud-actions">
        {status === 'paused' ? (
          <button type="button" className="focus-hud-icon-button" onClick={onResumeSession} aria-label="이어가기">
            ▶
          </button>
        ) : null}
        <button type="button" className="focus-hud-icon-button" onClick={onResetSession} aria-label="그만하기">
          ×
        </button>
      </div>
      <p className="focus-hud-message">{encouragementMessage}</p>
    </section>
  );
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
}
