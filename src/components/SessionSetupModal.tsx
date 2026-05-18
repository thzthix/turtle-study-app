type SessionSetupModalProps = {
  selectedMinutes: number;
  onSelectMinutes: (minutes: number) => void;
  onStartSession: () => void;
  onClose: () => void;
};

const presets = [15, 25, 35, 45, 60];

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
        <p className="eyebrow">Time Picker</p>
        <h2 id="session-setup-title">집중할 시간을 선택해요</h2>
        <p className="setup-description">시간을 정하면 거북이가 조용히 함께 걸어요.</p>

        <div className="setup-preset-list" aria-label="집중 시간 선택">
          {presets.map((minutes) => (
            <button
              key={minutes}
              type="button"
              className={minutes === selectedMinutes ? 'setup-choice-button setup-choice-button-active' : 'setup-choice-button'}
              onClick={() => onSelectMinutes(minutes)}
            >
              <span>{minutes}</span>
              <small>분</small>
            </button>
          ))}
        </div>

        <div className="setup-selection-note" aria-live="polite">
          <strong>{selectedMinutes}분</strong>
          <span>천천히 같이 걷는 오늘의 집중 시간</span>
        </div>

        <div className="setup-actions">
          <button type="button" className="primary-button" onClick={onStartSession}>
            시작하기
          </button>
        </div>
      </section>
    </div>
  );
}
