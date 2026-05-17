import { useMemo, useState } from 'react';
import { friendTurtles } from '../data/friends';

export function FriendBoard() {
  const [cheeredFriendIds, setCheeredFriendIds] = useState<number[]>([]);

  const totalCheers = useMemo(() => {
    return friendTurtles.reduce((sum, turtle) => {
      const bonus = cheeredFriendIds.includes(turtle.id) ? 1 : 0;
      return sum + turtle.supportCount + bonus;
    }, 0);
  }, [cheeredFriendIds]);

  const handleCheerClick = (friendId: number) => {
    setCheeredFriendIds((currentIds) => {
      if (currentIds.includes(friendId)) {
        return currentIds;
      }

      return [...currentIds, friendId];
    });
  };

  return (
    <section className="friend-board card">
      <div className="board-header">
        <div>
          <p className="eyebrow">Friends</p>
          <h2>다른 거북이들도 오늘을 버티는 중</h2>
        </div>
        <p className="board-caption">승부보다 응원에 가까운 작은 산책 보드</p>
      </div>

      <div className="cheer-summary">
        <strong>{totalCheers}개의 조용한 응원</strong>
        <span>친구 거북이에게 짧게 응원을 보내도, 다시 바로 내 흐름으로 돌아올 수 있어요.</span>
      </div>

      <div className="friend-grid">
        {friendTurtles.map((friendTurtle) => (
          <article key={friendTurtle.id} className="friend-card">
            <div className="friend-avatar" style={{ backgroundColor: friendTurtle.accent }}>
              <span />
            </div>
            <div className="friend-content">
              <h3>{friendTurtle.name}</h3>
              <p className="friend-distance">{friendTurtle.distanceLabel}</p>
              <p className="friend-message">{friendTurtle.moodMessage}</p>
              <div className="friend-footer">
                <span className="friend-supports">응원 {friendTurtle.supportCount + Number(cheeredFriendIds.includes(friendTurtle.id))}</span>
                <button
                  type="button"
                  className={cheeredFriendIds.includes(friendTurtle.id) ? 'cheer-button active' : 'cheer-button'}
                  onClick={() => handleCheerClick(friendTurtle.id)}
                >
                  {cheeredFriendIds.includes(friendTurtle.id) ? '응원 보냈어요' : '응원 보내기'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
