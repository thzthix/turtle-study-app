type PauseNoticeProps = {
  onResumeSession: () => void;
};

export function PauseNotice({ onResumeSession }: PauseNoticeProps) {
  return (
    <section className="pause-card">
      <p className="eyebrow">Pause</p>
      <h2>잠깐 기다리고 있어요</h2>
      <p>돌아오면 천천히 다시 이어가면 됩니다.</p>
      <button type="button" className="secondary-button completion-inline-button" onClick={onResumeSession}>
        다시 이어가기
      </button>
    </section>
  );
}
