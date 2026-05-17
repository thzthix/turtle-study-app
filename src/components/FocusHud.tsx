import type { SessionStatus } from '../types';

type FocusHudProps = {
  secondsLeft: number;
  status: SessionStatus;
  encouragementMessage: string;
  onResumeSession: () => void;
  onResetSession: () => void;
};

export function FocusHud({
  secondsLeft,
  status,
  encouragementMessage,
  onResumeSession,
  onResetSession,
}: FocusHudProps) {
  return (
    <section className="focus-hud">
      <div>
        <p className="focus-hud-label">남은 시간</p>
        <strong className="focus-hud-time">{formatTime(secondsLeft)}</strong>
      </div>
      <p className="focus-hud-message">{encouragementMessage}</p>
      <div className="focus-hud-actions">
        {status === 'paused' ? (
          <button type="button" className="primary-button" onClick={onResumeSession}>
            이어가기
          </button>
        ) : null}
        <button type="button" className="secondary-button" onClick={onResetSession}>
          그만하기
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
