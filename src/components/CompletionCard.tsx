type CompletionCardProps = {
  completedSessions: number;
  completedMinutes: number;
  isHighlightVisible: boolean;
  onRestart: () => void;
};

export function CompletionCard({
  completedSessions,
  completedMinutes,
  isHighlightVisible,
  onRestart,
}: CompletionCardProps) {
  return (
    <section className={isHighlightVisible ? 'completion-card completion-card-highlight' : 'completion-card'}>
      <p className="eyebrow">Quiet Celebration</p>
      <h2>끝까지 같이 걸었어요</h2>
      <p>
        오늘 <strong>{completedSessions}번</strong>의 집중 산책을 마쳤고, 함께 걸은 시간은{' '}
        <strong>{completedMinutes}분</strong>이에요.
      </p>
      <p className="completion-message">
        {isHighlightVisible ? '거북이가 조용히 기뻐하고 있어요.' : '남은 온기가 다음 산책까지 이어질 거예요.'}
      </p>
      <div className="completion-actions">
        <button type="button" className="secondary-button completion-inline-button" onClick={onRestart}>
          다음 시간 정하기
        </button>
      </div>
    </section>
  );
}
