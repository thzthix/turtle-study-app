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
      <span className="focus-hud-leaf" aria-hidden="true" />
      <div className="focus-hud-time-block">
        <strong className="focus-hud-time">{formatTime(secondsLeft)}</strong>
        <p className="focus-hud-label">남은 시간</p>
      </div>
      <div className="focus-hud-center">
        <p className="focus-hud-message">{encouragementMessage}</p>
        <div className="focus-hud-progress" aria-hidden="true">
          <span style={{ width: `${Math.max(6, progressRatio * 100)}%` }} />
        </div>
      </div>
      <div className="focus-hud-actions">
        {status === 'paused' ? (
          <button type="button" className="secondary-button hud-action-button" onClick={onResumeSession}>
            이어가기
          </button>
        ) : null}
        <button type="button" className="secondary-button hud-action-button hud-action-button-quiet" onClick={onResetSession}>
          종료
        </button>
      </div>
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
