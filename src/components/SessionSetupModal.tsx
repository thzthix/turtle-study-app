type SessionSetupModalProps = {
  selectedMinutes: number;
  onSelectMinutes: (minutes: number) => void;
  onStartSession: () => void;
  onClose: () => void;
};

const presets = [15, 25, 40, 55];

export function SessionSetupModal({
  selectedMinutes,
  onSelectMinutes,
  onStartSession,
  onClose,
}: SessionSetupModalProps) {
  return (
    <div className="setup-modal" role="dialog" aria-modal="true" aria-labelledby="session-setup-title">
      <button type="button" className="setup-backdrop" aria-label="시간 선택 닫기" onClick={onClose} />
      <section className="setup-panel">
        <button type="button" className="setup-close" aria-label="닫기" onClick={onClose}>
          ×
        </button>
        <p className="eyebrow">Time Selection</p>
        <h2 id="session-setup-title">집중할 시간을 선택해요</h2>
        <p className="setup-description">오늘도, 너의 속도로 충분해.</p>

        <div className="setup-preset-list" aria-label="집중 시간 선택">
          {presets.map((minutes) => (
            <button
              key={minutes}
              type="button"
              className={minutes === selectedMinutes ? 'setup-preset-button active' : 'setup-preset-button'}
              onClick={() => onSelectMinutes(minutes)}
            >
              <strong>{minutes}</strong>
              <span>분</span>
            </button>
          ))}
        </div>

        <div className="setup-actions">
          <div className="setup-corner setup-corner-left" aria-hidden="true">
            🌼
          </div>
          <button type="button" className="setup-start-button" onClick={onStartSession}>
            이 시간으로 시작
          </button>
          <div className="setup-corner setup-corner-right" aria-hidden="true">
            🐢
          </div>
        </div>
      </section>
    </div>
  );
}
