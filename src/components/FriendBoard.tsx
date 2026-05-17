import { friendTurtles } from '../data/friends';

export function FriendBoard() {
  return (
    <section className="friend-board card">
      <div className="board-header">
        <div>
          <p className="eyebrow">Friends</p>
          <h2>다른 거북이들도 오늘을 버티는 중</h2>
        </div>
        <p className="board-caption">승부보다 응원에 가까운 작은 산책 보드</p>
      </div>

      <div className="friend-grid">
        {friendTurtles.map((friendTurtle) => (
          <article key={friendTurtle.id} className="friend-card">
            <div className="friend-avatar" style={{ backgroundColor: friendTurtle.accent }}>
              <span />
            </div>
            <div>
              <h3>{friendTurtle.name}</h3>
              <p className="friend-distance">{friendTurtle.distanceLabel}</p>
              <p className="friend-message">{friendTurtle.moodMessage}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
