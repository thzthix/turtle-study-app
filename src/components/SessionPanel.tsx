import type { SessionStatus } from '../types';

type SessionPanelProps = {
  selectedMinutes: number;
  secondsLeft: number;
  status: SessionStatus;
  encouragementMessage: string;
  onSelectMinutes: (minutes: number) => void;
  onStartSession: () => void;
  onResumeSession: () => void;
  onResetSession: () => void;
};

const presets = [15, 25, 40, 55];

export function SessionPanel({
  selectedMinutes,
  secondsLeft,
  status,
  encouragementMessage,
  onSelectMinutes,
  onStartSession,
  onResumeSession,
  onResetSession,
}: SessionPanelProps) {
  const isSessionActive = status === 'walking' || status === 'care-needed' || status === 'cheerful';
  const canStartSession = status === 'idle' || status === 'completed';
  const isPaused = status === 'paused';
  const statusLabel = getStatusLabel(status);

  return (
    <section className="session-panel card">
      <div className="panel-copy">
        <p className="eyebrow">Focus Session</p>
        <span className={`status-pill status-pill-${status}`}>{statusLabel}</span>
        <h1>거북이와 조용히 버티는 집중 루프</h1>
        <p className="panel-description">
          화면은 당신을 재촉하지 않고, 거북이는 당신이 끝까지 가는 동안 옆에서 천천히 함께 걸어요.
        </p>
      </div>

      <div className="timer-box">
        <p className="timer-label">남은 시간</p>
        <strong className="timer-value">{formatTime(secondsLeft)}</strong>
        <p className="timer-message">{encouragementMessage}</p>
      </div>

      <div className="preset-list" aria-label="집중 시간 선택">
        {presets.map((minutes) => (
          <button
            key={minutes}
            type="button"
            className={minutes === selectedMinutes ? 'preset-button active' : 'preset-button'}
            onClick={() => onSelectMinutes(minutes)}
            disabled={isSessionActive || isPaused}
          >
            {minutes}분
          </button>
        ))}
      </div>

      <div className="panel-actions">
        {isPaused ? (
          <button type="button" className="primary-button" onClick={onResumeSession}>
            산책 이어가기
          </button>
        ) : (
          <button type="button" className="primary-button" onClick={onStartSession} disabled={!canStartSession}>
            {status === 'completed' ? '다시 산책 시작하기' : '집중 산책 시작하기'}
          </button>
        )}
        <button type="button" className="secondary-button" onClick={onResetSession}>
          처음으로
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

function getStatusLabel(status: SessionStatus) {
  switch (status) {
    case 'idle':
      return '준비 완료';
    case 'walking':
      return '집중 산책 중';
    case 'care-needed':
      return '돌봄 체크인';
    case 'cheerful':
      return '기분 회복 중';
    case 'paused':
      return '잠깐 멈춤';
    case 'completed':
      return '세션 완료';
    default:
      return '';
  }
}
