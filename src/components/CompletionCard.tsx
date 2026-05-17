type CompletionCardProps = {
  completedSessions: number;
  completedMinutes: number;
};

export function CompletionCard({ completedSessions, completedMinutes }: CompletionCardProps) {
  return (
    <section className="completion-card card">
      <p className="eyebrow">Little Celebration</p>
      <h2>거북이가 배를 살짝 흔들며 반가워해요</h2>
      <p>
        오늘은 <strong>{completedSessions}번</strong>의 집중 산책을 마쳤고, 함께 걸은 시간은{' '}
        <strong>{completedMinutes}분</strong>이에요.
      </p>
      <div className="completion-badges">
        <span>오늘의 인내심 +1</span>
        <span>거북이 애정도 +1</span>
      </div>
    </section>
  );
}
