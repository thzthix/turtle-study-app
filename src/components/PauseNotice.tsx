type PauseNoticeProps = {
  onResumeSession: () => void;
};

export function PauseNotice({ onResumeSession }: PauseNoticeProps) {
  return (
    <section className="pause-card card">
      <p className="eyebrow">Focus Guard</p>
      <h2>거북이가 당신을 기다리고 있어요</h2>
      <p>
        화면을 벗어나 있는 동안 세션을 잠깐 멈춰두었어요. 돌아왔으면 천천히 다시 이어가면 됩니다.
      </p>
      <button type="button" className="primary-button" onClick={onResumeSession}>
        산책 이어가기
      </button>
    </section>
  );
}
