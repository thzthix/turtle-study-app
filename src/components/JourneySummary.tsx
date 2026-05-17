type JourneySummaryProps = {
  progressRatio: number;
  selectedMinutes: number;
};

export function JourneySummary({ progressRatio, selectedMinutes }: JourneySummaryProps) {
  const walkedMinutes = Math.round(progressRatio * selectedMinutes);

  return (
    <section className="summary-card card">
      <p className="eyebrow">Journey</p>
      <h2>집중이 쌓일수록 길도 조금씩 길어져요</h2>
      <div className="summary-metrics">
        <article>
          <strong>{walkedMinutes}분</strong>
          <span>오늘 걸은 시간</span>
        </article>
        <article>
          <strong>{Math.round(progressRatio * 100)}%</strong>
          <span>현재 산책 진행률</span>
        </article>
        <article>
          <strong>잔잔함</strong>
          <span>압박 대신 동행 모드</span>
        </article>
      </div>
    </section>
  );
}
