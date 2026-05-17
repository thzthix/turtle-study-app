import type { SessionHistoryEntry } from '../types';

type HistoryPanelProps = {
  todaySessions: number;
  todayMinutes: number;
  recentEntries: SessionHistoryEntry[];
};

export function HistoryPanel({ todaySessions, todayMinutes, recentEntries }: HistoryPanelProps) {
  return (
    <section className="history-card card">
      <p className="eyebrow">Today Log</p>
      <h2>오늘의 집중 기록</h2>

      <div className="history-metrics">
        <article>
          <strong>{todaySessions}</strong>
          <span>완료한 산책</span>
        </article>
        <article>
          <strong>{todayMinutes}분</strong>
          <span>함께 걸은 시간</span>
        </article>
      </div>

      <div className="history-list">
        {recentEntries.length > 0 ? (
          recentEntries.map((entry) => (
            <div key={entry.id} className="history-item">
              <strong>{entry.minutes}분 세션</strong>
              <span>{formatCompletedTime(entry.completedAt)} 완료</span>
            </div>
          ))
        ) : (
          <p className="history-empty">아직 오늘의 산책 기록이 없어요. 첫 세션을 시작해볼까요?</p>
        )}
      </div>
    </section>
  );
}

function formatCompletedTime(completedAt: string) {
  const date = new Date(completedAt);

  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
