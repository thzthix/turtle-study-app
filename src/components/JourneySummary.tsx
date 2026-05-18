type JourneySummaryProps = {
  progressRatio: number;
  selectedMinutes: number;
};

export function JourneySummary({ progressRatio, selectedMinutes }: JourneySummaryProps) {
  const walkedMinutes = Math.round(progressRatio * selectedMinutes);

  return (
    <section className="summary-card card">
      <p className="eyebrow">Journey Note</p>
      <h2>이번 산책의 잔상</h2>
      <div className="summary-metrics">
        <article>
          <strong>{walkedMinutes}분</strong>
          <span>걸은 시간</span>
        </article>
        <article>
          <strong>{Math.round(progressRatio * 100)}%</strong>
          <span>남긴 흔적</span>
        </article>
      </div>
      <p className="summary-note">압박보다 동행의 감각이 남도록, 기록도 조용하게 정리합니다.</p>
    </section>
  );
}
