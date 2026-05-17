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
        <p className="eyebrow">Walk Setup</p>
        <h2 id="session-setup-title">얼마나 같이 걸을까요?</h2>
        <p className="setup-description">
          시간을 정하면 거북이가 길을 따라 천천히 걸어요. 중간에 잠깐 다정함이 필요할 때만 짧게 살펴보면 됩니다.
        </p>

        <div className="setup-minute-display" aria-live="polite">
          <strong>{selectedMinutes}분</strong>
          <span>오늘의 집중 산책 길이</span>
        </div>

        <div className="setup-preset-list" aria-label="집중 시간 선택">
          {presets.map((minutes) => (
            <button
              key={minutes}
              type="button"
              className={minutes === selectedMinutes ? 'preset-button active' : 'preset-button'}
              onClick={() => onSelectMinutes(minutes)}
            >
              {minutes}분
            </button>
          ))}
        </div>

        <div className="setup-actions">
          <button type="button" className="secondary-button" onClick={onClose}>
            조금 더 볼래요
          </button>
          <button type="button" className="primary-button" onClick={onStartSession}>
            이 시간으로 시작
          </button>
        </div>
      </section>
    </div>
  );
}
