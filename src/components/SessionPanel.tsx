import type { SessionStatus } from '../types';

type SessionPanelProps = {
  selectedMinutes: number;
  status: SessionStatus;
  onSelectMinutes: (minutes: number) => void;
  onStartSession: () => void;
};

const presets = [15, 25, 40, 55];

export function SessionPanel({
  selectedMinutes,
  status,
  onSelectMinutes,
  onStartSession,
}: SessionPanelProps) {
  const isIdle = status === 'idle';

  return (
    <section className="session-panel card">
      <div className="panel-copy">
        <p className="eyebrow">Start Session</p>
        <h1>얼마나 같이 걸을까요?</h1>
        <p className="panel-description">
          시간을 정하면 거북이가 길을 걷기 시작해요. 시작하고 나면 화면은 산책길과 거북이 중심으로 바뀝니다.
        </p>
      </div>

      <div className="preset-list" aria-label="집중 시간 선택">
        {presets.map((minutes) => (
          <button
            key={minutes}
            type="button"
            className={minutes === selectedMinutes ? 'preset-button active' : 'preset-button'}
            onClick={() => onSelectMinutes(minutes)}
            disabled={!isIdle}
          >
            {minutes}분
          </button>
        ))}
      </div>

      <div className="panel-actions">
        <button type="button" className="primary-button" onClick={onStartSession} disabled={!isIdle}>
          산책 시작하기
        </button>
      </div>
    </section>
  );
}
