type CompletionCardProps = {
  completedSessions: number;
  completedMinutes: number;
  isHighlightVisible: boolean;
};

export function CompletionCard({
  completedSessions,
  completedMinutes,
  isHighlightVisible,
}: CompletionCardProps) {
  return (
    <section className={isHighlightVisible ? 'completion-card card completion-card-highlight' : 'completion-card card'}>
      <p className="eyebrow">Little Celebration</p>
      <h2>거북이가 배를 살짝 흔들며 반가워해요</h2>
      <p>
        오늘은 <strong>{completedSessions}번</strong>의 집중 산책을 마쳤고, 함께 걸은 시간은{' '}
        <strong>{completedMinutes}분</strong>이에요.
      </p>
      <div className={isHighlightVisible ? 'celebration-strip celebration-strip-burst' : 'celebration-strip'} aria-hidden="true">
        <span>♥</span>
        <span>★</span>
        <span>♥</span>
      </div>
      <p className="completion-message">
        {isHighlightVisible
          ? '작게 반짝이는 순간이에요. 지금의 집중을 거북이가 분명하게 기억했어요.'
          : '조용히 남은 온기가 오늘의 다음 세션으로 이어질 거예요.'}
      </p>
      <div className="completion-badges">
        <span>오늘의 인내심 +1</span>
        <span>거북이 애정도 +1</span>
      </div>
    </section>
  );
}
