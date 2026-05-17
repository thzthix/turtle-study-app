import type { SessionStatus } from '../types';

type TurtleSceneProps = {
  progressRatio: number;
  status: SessionStatus;
};

export function TurtleScene({ progressRatio, status }: TurtleSceneProps) {
  const turtleStyle = {
    transform: `translateX(${progressRatio * 100}%)`,
  };

  const bubbleMessage = getBubbleMessage(status);

  return (
    <section className="scene-card">
      <div className="scene-header">
        <p className="eyebrow">Turtle Companion</p>
        <h2>오늘의 산책길</h2>
      </div>

      <div className="scene">
        <div className="scene-glow" />
        <div className="sun" />
        <div className="hill hill-back" />
        <div className="hill hill-front" />
        <div className="path">
          <div className="path-progress" style={{ width: `${Math.max(12, progressRatio * 100)}%` }} />
        </div>

        <div className={`speech-bubble speech-bubble-${status}`}>{bubbleMessage}</div>

        <div className={`turtle turtle-${status}`} style={turtleStyle}>
          <svg viewBox="0 0 360 230" aria-hidden="true" className="turtle-illustration">
            <ellipse cx="145" cy="122" rx="110" ry="76" fill="#7fa16c" />
            <ellipse cx="145" cy="143" rx="118" ry="30" fill="#89a96f" />
            <ellipse cx="252" cy="90" rx="54" ry="64" fill="#d7dda1" />
            <path
              d="M248 142c18 12 30 36 32 68 1 12-11 19-21 12-29-18-41-49-39-76 1-12 17-14 28-4Z"
              fill="#c7cd90"
            />
            <path
              d="M124 174c-14 23-31 37-52 43-17 5-31-11-24-27 10-21 29-37 57-48 18-7 30 16 19 32Z"
              fill="#d7dda1"
            />
            <path
              d="M216 176c-14 27-34 44-60 51-16 4-28-13-19-28 14-24 35-41 66-50 17-5 23 13 13 27Z"
              fill="#d7dda1"
            />
            <path
              d="M18 164c17-2 31 0 43 7 8 4 10 14 4 20-16 16-36 22-62 17-13-2-17-18-6-27 6-5 13-12 21-17Z"
              fill="#d7dda1"
            />
            <circle cx="266" cy="82" r="10" fill="#3f2317" />
            <path
              d="M73 98l38-29 57-12 48 16 18 38-18 40-55 18-58-19-24-33 6-19-21-10 9-16Z"
              fill="#6f8f65"
            />
            <path d="M121 76 154 67 186 77 170 109 133 115 108 95Z" fill="#7d9c73" />
            <path d="M186 77 216 88 207 127 170 109Z" fill="#75956d" />
            <path d="M133 115 170 109 165 148 122 148 100 126Z" fill="#6d8c63" />
            <path d="M170 109 207 127 195 157 165 148Z" fill="#67885f" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function getBubbleMessage(status: SessionStatus) {
  switch (status) {
    case 'idle':
      return '출발할 준비 끝';
    case 'walking':
      return '같이 천천히 가요';
    case 'care-needed':
      return '잠깐 다정함이 필요해요';
    case 'cheerful':
      return '기분이 다시 말랑해졌어요';
    case 'completed':
      return '오늘 산책 완주!';
    default:
      return '';
  }
}
